#!/usr/bin/env node
// Merge a subagent-produced enrichment JSON into a target flags snapshot.
//
// Usage:
//   node scripts/apply-enrichment.mjs --target flags/2.1.111.json --enrichment flags/.enrichment/2.1.111.json
//
// The enrichment file must be an object mapping flag key to
// { description, tokenEffect, internal }. Unrecognized keys are ignored;
// flags missing from the file are left untouched.
//
// Also supports --reuse-canonical <path>: after applying the enrichment
// file, any remaining unenriched flags inherit their enrichment from the
// canonical snapshot (matched by key).

import fs from 'node:fs';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target') out.target = argv[++i];
    else if (a === '--enrichment') out.enrichment = argv[++i];
    else if (a === '--reuse-canonical') out.reuseCanonical = argv[++i];
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node scripts/apply-enrichment.mjs --target <file.json> [--enrichment <file.json>] [--reuse-canonical <file.json>] [--dry-run]');
      process.exit(0);
    }
  }
  if (!out.target) throw new Error('--target is required');
  if (!out.enrichment && !out.reuseCanonical) throw new Error('provide at least one of --enrichment or --reuse-canonical');
  return out;
}

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function isEnriched(flag) {
  return flag && flag.description && flag.tokenEffect && typeof flag.internal === 'boolean';
}

function applyEntry(flag, entry) {
  return {
    ...flag,
    description: entry.description,
    tokenEffect: entry.tokenEffect,
    internal: entry.internal,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const target = readJson(args.target);

  const enrichment = args.enrichment ? readJson(args.enrichment) : {};
  const canonical = args.reuseCanonical ? readJson(args.reuseCanonical) : null;
  const canonicalByKey = canonical
    ? new Map(canonical.flags.filter(isEnriched).map(f => [f.key, { description: f.description, tokenEffect: f.tokenEffect, internal: f.internal }]))
    : null;

  let enrichedCount = 0;
  let canonicalCount = 0;
  let missingCount = 0;
  const missing = [];

  target.flags = target.flags.map(f => {
    const entry = enrichment[f.key];
    if (entry && entry.description && entry.tokenEffect) {
      enrichedCount++;
      return applyEntry(f, entry);
    }
    if (canonicalByKey && canonicalByKey.has(f.key)) {
      canonicalCount++;
      return applyEntry(f, canonicalByKey.get(f.key));
    }
    if (!isEnriched(f)) {
      missingCount++;
      missing.push(f.key);
    }
    return f;
  });

  console.error(`Applied enrichment: ${enrichedCount} from --enrichment, ${canonicalCount} from --reuse-canonical`);
  if (missingCount > 0) {
    console.error(`WARNING: ${missingCount} flags still unenriched:`);
    for (const k of missing.slice(0, 20)) console.error(`  - ${k}`);
    if (missing.length > 20) console.error(`  ...and ${missing.length - 20} more`);
  }

  if (args.dryRun) {
    console.log(JSON.stringify(target, null, 2));
  } else {
    fs.writeFileSync(args.target, JSON.stringify(target, null, 2) + '\n');
    console.error(`Wrote ${args.target}`);
  }
}

main();
