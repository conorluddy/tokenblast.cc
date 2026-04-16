#!/usr/bin/env node
// Merge N subagent-produced batch enrichment files into a single enrichment JSON.
//
// Usage:
//   node scripts/merge-enrichment.mjs --in flags/.enrichment/batch-*.json --out flags/.enrichment/2.1.111.json

import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const out = { in: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--in') out.in.push(argv[++i]);
    else if (a === '--out') out.out = argv[++i];
  }
  if (out.in.length === 0 || !out.out) throw new Error('--in (repeatable) and --out required');
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const merged = {};
  let totalEntries = 0;
  const collisions = [];
  for (const p of args.in) {
    const obj = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const [k, v] of Object.entries(obj)) {
      if (k in merged) collisions.push(k);
      merged[k] = v;
      totalEntries++;
    }
    console.error(`Loaded ${p} — ${Object.keys(obj).length} entries`);
  }
  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, JSON.stringify(merged, null, 2) + '\n');
  console.error(`Wrote ${args.out} — ${Object.keys(merged).length} unique keys (${totalEntries} total reads, ${collisions.length} collisions)`);
  if (collisions.length > 0) console.error(`  duplicate keys: ${collisions.slice(0, 10).join(', ')}${collisions.length > 10 ? '...' : ''}`);
}

main();
