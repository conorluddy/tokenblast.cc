#!/usr/bin/env node
// extract-defaults.mjs — Scan cli.js for each flag in a snapshot and classify
// its default value. Writes a report and optionally patches the snapshot.
//
// Usage:
//   node scripts/extract-defaults.mjs --cli <path/to/cli.js> --target flags/X.Y.Z.json [--write]

import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, tok, i, arr) => {
    if (tok.startsWith('--')) {
      const key = tok.slice(2);
      const next = arr[i + 1];
      acc.push([key, !next || next.startsWith('--') ? true : next]);
    }
    return acc;
  }, [])
);

const CLI_PATH = args.cli;
const TARGET = args.target;
const WRITE = Boolean(args.write);

if (!CLI_PATH || !TARGET) {
  console.error('Usage: node scripts/extract-defaults.mjs --cli <cli.js> --target <snapshot.json> [--write]');
  process.exit(1);
}

const cli = fs.readFileSync(CLI_PATH, 'utf8');
const snapshot = JSON.parse(fs.readFileSync(TARGET, 'utf8'));

// Auto-detect the minified identifier of Claude Code's truthy-string helper,
// which varies per version (e.g. B6, R6, S6). Signature contains "true","yes","on".
const GATE_HELPER = (() => {
  const m = cli.match(/function\s+([A-Za-z_$][\w$]{0,4})\s*\(q\)\s*\{[^{}]{0,200}"true","yes","on"/);
  return m ? m[1] : null;
})();
console.error(`Detected boolean gate helper: ${GATE_HELPER ?? '(none — all booleans fall back to name heuristic)'}`);

const ENABLE_BOOLEAN_RE = /(?:ENABLE|DISABLE|SKIP|FORCE|USE|IS)_/;

// Resolve a minified module constant like `cw_ = 300000` or `CB3 = 1e5` to its
// numeric literal. Rejects single-letter idents (almost always local vars) and
// anything that looks like a function (`function X(` or `X=()=>`).
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveNumericConst(ident) {
  if (ident.length < 2) return null;
  const esc = escapeRegex(ident);
  // `$` is not a word char, so `\b` doesn't anchor to identifiers containing `$`.
  // Use an explicit non-identifier lookbehind/lookahead instead.
  const boundary = `(?<![\\w$])${esc}(?![\\w$])`;
  if (new RegExp(`function\\s+${esc}[\\s(]`).test(cli)) return null;
  if (new RegExp(`${boundary}\\s*=\\s*(?:async\\s+)?(?:\\(|function)`).test(cli)) return null;
  const re = new RegExp(`${boundary}\\s*=\\s*(\\d+(?:\\.\\d+)?(?:e\\d+)?)(?![\\w$])`);
  const m = cli.match(re);
  return m ? Number(m[1]) : null;
}

function findContexts(key) {
  const needle = `process.env.${key}`;
  const out = [];
  let idx = 0;
  while ((idx = cli.indexOf(needle, idx)) !== -1) {
    const start = Math.max(0, idx - 120);
    const end = Math.min(cli.length, idx + needle.length + 220);
    out.push(cli.slice(start, end));
    idx += needle.length;
    if (out.length >= 5) break;
  }
  return out;
}

function classify(flag) {
  const { key, type } = flag;
  const contexts = findContexts(key);
  if (contexts.length === 0) {
    return { status: 'not-found', value: null, source: null, contexts };
  }

  const joined = contexts.join('\n---\n');

  if (type === 'boolean') {
    const gateRe = GATE_HELPER
      ? new RegExp(`\\b${GATE_HELPER}\\(process\\.env\\.${key}\\b`)
      : null;
    const gated =
      (gateRe && gateRe.test(joined)) ||
      new RegExp(`Boolean\\(process\\.env\\.${key}\\b`).test(joined) ||
      new RegExp(`process\\.env\\.${key}\\s*===\\s*['"]?1['"]?`).test(joined) ||
      new RegExp(`process\\.env\\.${key}\\s*===\\s*['"]true['"]`).test(joined);
    if (gated || ENABLE_BOOLEAN_RE.test(key)) {
      return { status: 'inferred', value: false, source: 'boolean-gate-default-off', contexts };
    }
    return { status: 'unknown', value: null, source: 'boolean-unrecognized-pattern', contexts };
  }

  // Build a regex that anchors on this exact key.
  const envExpr = `process\\.env\\.${key}`;

  // Number with literal fallback adjacent to THIS flag
  if (type === 'number') {
    const NUM = '(\\d+(?:\\.\\d+)?(?:e\\d+)?)';
    const inline = new RegExp(`${envExpr}\\s*(?:\\|\\|\\s*|\\?\\?\\s*)${NUM}\\b`);
    const parsed = new RegExp(`parseInt\\s*\\(\\s*${envExpr}[^)]*\\)\\s*(?:\\|\\|\\s*|\\?\\?\\s*)${NUM}\\b`);
    const numCast = new RegExp(`Number\\s*\\(\\s*${envExpr}\\s*(?:\\?\\?\\s*${NUM})?\\s*\\)(?:\\s*(?:\\|\\|\\s*|\\?\\?\\s*)${NUM})?`);
    for (const re of [parsed, numCast, inline]) {
      const m = joined.match(re);
      if (m) {
        const raw = m.slice(1).find(x => x !== undefined);
        if (raw) return { status: 'extracted', value: Number(raw), source: 'number-literal', contexts };
      }
    }
    // Named constant fallback: any `return <ident>` within ~300 chars of THIS key.
    // The first match may be a local var (e.g. the parsed value K); try every
    // candidate until one resolves to a module-scoped numeric constant.
    const window = joined.match(new RegExp(`${envExpr}[\\s\\S]{0,300}`))?.[0] ?? '';
    const candidateRe = /return\s+([a-zA-Z_$][\w$]*)\b(?!\s*[=(])/g;
    let cm;
    const candidates = [];
    while ((cm = candidateRe.exec(window))) candidates.push(cm[1]);
    for (const ident of candidates) {
      const resolved = resolveNumericConst(ident);
      if (resolved !== null) {
        return { status: 'extracted', value: resolved, source: `number-named-const:${ident}`, contexts };
      }
    }
    if (candidates.length) {
      return { status: 'unknown', value: null, source: `number-named-const-unresolved:${candidates.join(',')}`, contexts };
    }
    return { status: 'unknown', value: null, source: 'number-no-fallback', contexts };
  }

  // Text with inline fallback adjacent to THIS flag
  if (type === 'text') {
    // Skip if the fallback is a template literal (dynamic — resolves at runtime)
    const template = new RegExp(`${envExpr}\\s*(?:\\|\\||\\?\\?)\\s*\``);
    if (template.test(joined)) {
      return { status: 'unknown', value: null, source: 'text-template-literal', contexts };
    }
    // Only match plain string literals ("..." or '...', no backticks)
    const strOr = new RegExp(`${envExpr}\\s*\\|\\|\\s*(["'])((?:\\\\.|(?!\\1).){1,120})\\1`);
    const strNullish = new RegExp(`${envExpr}\\s*\\?\\?\\s*(["'])((?:\\\\.|(?!\\1).){1,120})\\1`);
    for (const re of [strOr, strNullish]) {
      const m = joined.match(re);
      if (m) return { status: 'extracted', value: m[2], source: 'text-literal', contexts };
    }
    return { status: 'unknown', value: null, source: 'text-no-fallback', contexts };
  }

  return { status: 'unknown', value: null, source: `unhandled-type:${type}`, contexts };
}

const report = { extracted: [], inferred: [], unknown: [], notFound: [] };
const patches = [];

for (const flag of snapshot.flags) {
  if (flag.deprecated) continue;
  const result = classify(flag);
  const entry = {
    key: flag.key,
    type: flag.type,
    currentDefault: flag.defaultValue,
    newDefault: result.value,
    source: result.source,
  };
  if (result.status === 'extracted') report.extracted.push(entry);
  else if (result.status === 'inferred') report.inferred.push(entry);
  else if (result.status === 'not-found') report.notFound.push(entry);
  else report.unknown.push({ ...entry, sampleContext: result.contexts[0]?.slice(0, 200) });

  if ((result.status === 'extracted' || result.status === 'inferred') && flag.defaultValue === null) {
    patches.push({ key: flag.key, defaultValue: result.value });
  }
}

console.log(`\n=== DEFAULT EXTRACTION: ${snapshot.version} ===`);
console.log(`Total flags (non-deprecated): ${snapshot.flags.filter(f => !f.deprecated).length}`);
console.log(`  Extracted from literal:   ${report.extracted.length}`);
console.log(`  Inferred (boolean gate):  ${report.inferred.length}`);
console.log(`  Unknown (needs manual):   ${report.unknown.length}`);
console.log(`  Not found in source:      ${report.notFound.length}`);
console.log(`  Patches to apply (was null): ${patches.length}`);

if (report.extracted.length) {
  console.log('\n--- EXTRACTED LITERALS ---');
  for (const e of report.extracted) console.log(`  ${e.key} = ${JSON.stringify(e.newDefault)} (${e.source})`);
}
if (report.unknown.length) {
  console.log('\n--- UNKNOWN (first 20) ---');
  for (const e of report.unknown.slice(0, 20)) console.log(`  ${e.key} — ${e.source}`);
}
if (report.notFound.length) {
  console.log('\n--- NOT FOUND IN SOURCE (first 20) ---');
  for (const e of report.notFound.slice(0, 20)) console.log(`  ${e.key}`);
}

const reportPath = path.join(path.dirname(TARGET), `.defaults-${snapshot.version}.json`);
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nReport written: ${reportPath}`);

if (WRITE) {
  const patchMap = new Map(patches.map(p => [p.key, p.defaultValue]));
  for (const flag of snapshot.flags) {
    if (patchMap.has(flag.key)) flag.defaultValue = patchMap.get(flag.key);
  }
  fs.writeFileSync(TARGET, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`Patched ${patches.length} defaults into ${TARGET}`);
} else {
  console.log('\n(dry run — pass --write to patch the snapshot)');
}
