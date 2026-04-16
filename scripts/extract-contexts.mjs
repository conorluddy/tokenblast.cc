#!/usr/bin/env node
// Extract source-code context snippets for every flag in a snapshot.
// Produces a sidecar JSON at flags/.contexts/<version>.json mapping
// { "FLAG_KEY": ["snippet", "snippet", ...] } — consumed by the
// subagent-driven enrichment pass.
//
// Usage:
//   node scripts/extract-contexts.mjs --target flags/2.1.111.json
//   node scripts/extract-contexts.mjs --target flags/2.1.111.json --cli-js /path/to/cli.js
//
// If --cli-js is omitted, the script installs @anthropic-ai/claude-code
// into a temp dir and reads its bundled cli.js.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, spawnSync } from 'node:child_process';

const CONTEXT_WINDOW = 240;
const MAX_HITS_PER_PATTERN = 3;
const MAX_TOTAL_HITS = 6;

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target') out.target = argv[++i];
    else if (a === '--cli-js') out.cliJs = argv[++i];
    else if (a === '--out') out.out = argv[++i];
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node scripts/extract-contexts.mjs --target <file.json> [--cli-js <path>] [--out <path>]');
      process.exit(0);
    }
  }
  if (!out.target) throw new Error('--target is required');
  return out;
}

function acquireCliJs(providedPath) {
  if (providedPath) {
    if (!fs.existsSync(providedPath)) throw new Error(`--cli-js path not found: ${providedPath}`);
    return { path: providedPath, text: fs.readFileSync(providedPath, 'utf8') };
  }
  console.error('Installing @anthropic-ai/claude-code to extract cli.js (this takes ~20s)...');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-bundle-'));
  execSync('npm init -y --silent', { cwd: tmp, stdio: 'ignore' });
  const r = spawnSync('npm', ['install', '@anthropic-ai/claude-code', '--silent'], { cwd: tmp, stdio: 'inherit' });
  if (r.status !== 0) throw new Error('npm install of @anthropic-ai/claude-code failed');
  const cliPath = path.join(tmp, 'node_modules/@anthropic-ai/claude-code/cli.js');
  if (!fs.existsSync(cliPath)) throw new Error('cli.js not found after install');
  return { path: cliPath, text: fs.readFileSync(cliPath, 'utf8') };
}

function extractSnippets(cliJs, key) {
  const snippets = [];
  const seen = new Set();
  const patterns = [
    `process.env.${key}`,
    `process.env["${key}"]`,
    `process.env['${key}']`,
    `"${key}"`,
    `'${key}'`,
    key,
  ];
  for (const pattern of patterns) {
    if (snippets.length >= MAX_TOTAL_HITS) break;
    let idx = 0;
    let hitsThisPattern = 0;
    while ((idx = cliJs.indexOf(pattern, idx)) !== -1 && hitsThisPattern < MAX_HITS_PER_PATTERN && snippets.length < MAX_TOTAL_HITS) {
      const start = Math.max(0, idx - CONTEXT_WINDOW);
      const end = Math.min(cliJs.length, idx + pattern.length + CONTEXT_WINDOW);
      const raw = cliJs.slice(start, end);
      const cleaned = raw.replace(/\s+/g, ' ').trim();
      // Dedupe on a prefix of the cleaned snippet to avoid near-duplicates
      const fingerprint = cleaned.slice(0, 120);
      if (!seen.has(fingerprint)) {
        seen.add(fingerprint);
        snippets.push(cleaned);
        hitsThisPattern++;
      }
      idx = end;
    }
  }
  return snippets;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const target = JSON.parse(fs.readFileSync(args.target, 'utf8'));
  const version = target.version || path.basename(args.target, '.json');

  const { path: cliPath, text: cliJs } = acquireCliJs(args.cliJs);
  console.error(`cli.js at ${cliPath} (${(cliJs.length / 1024 / 1024).toFixed(1)} MB)`);

  const contexts = {};
  let noHits = 0;
  for (const flag of target.flags) {
    const snippets = extractSnippets(cliJs, flag.key);
    contexts[flag.key] = snippets;
    if (snippets.length === 0) noHits++;
  }

  const outPath = args.out || path.join(path.dirname(args.target), '.contexts', `${version}.json`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ version, cliJsPath: cliPath, contexts }, null, 2) + '\n');
  console.error(`Wrote ${outPath} — ${target.flags.length} flags, ${noHits} with no source hits`);
}

main();
