#!/usr/bin/env node
// Regenerate the inline FLAG_REGISTRY block in index.html from an enriched
// flags snapshot JSON. Preserves JS-literal one-line-per-flag style and
// the category section comments. Run this after enriching the INLINE_VERSION
// snapshot so the pre-fetch render reflects the latest descriptions and
// picks up new fields (tokenEffect, internal).
//
// Usage:
//   node scripts/sync-inline-registry.mjs --source flags/2.1.109.json --target index.html

import fs from 'node:fs';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--source') out.source = argv[++i];
    else if (a === '--target') out.target = argv[++i];
  }
  if (!out.source || !out.target) throw new Error('--source and --target required');
  return out;
}

const FIELD_ORDER = [
  'key', 'label', 'description', 'category', 'type',
  'defaultValue', 'options', 'placeholder',
  'affectsUsage', 'impact', 'costDirection',
  'tokenEffect', 'internal',
];

// Matches legal JS identifier names that can appear unquoted as object keys.
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function jsValue(v) {
  if (v === null) return 'null';
  if (v === undefined) return 'null';
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(jsValue).join(', ') + ']';
  if (typeof v === 'object') {
    const parts = [];
    for (const [k, val] of Object.entries(v)) {
      const key = IDENT.test(k) ? k : JSON.stringify(k);
      parts.push(`${key}: ${jsValue(val)}`);
    }
    return '{ ' + parts.join(', ') + ' }';
  }
  return 'null';
}

function flagLiteral(flag) {
  const parts = [];
  for (const field of FIELD_ORDER) {
    if (!(field in flag)) continue;
    parts.push(`${field}: ${jsValue(flag[field])}`);
  }
  return `  { ${parts.join(', ')} },`;
}

// Section comment format from existing index.html:
//   // === Authentication and Identity ===
// Categories don't have hand-written section titles in the JSON, so we
// derive them from the CATEGORIES map inside the source snapshot.
function sectionTitle(categoryId, categories) {
  const def = categories[categoryId];
  if (!def) return categoryId;
  return def.label.replace(/&/g, 'and');
}

function groupByCategory(flags) {
  const groups = new Map();
  for (const f of flags) {
    const cat = f.category || 'uncategorised';
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(f);
  }
  return groups;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const snapshot = JSON.parse(fs.readFileSync(args.source, 'utf8'));
  const html = fs.readFileSync(args.target, 'utf8');

  const startRe = /^let FLAG_REGISTRY = \[\s*\n/m;
  const endRe = /^\];\s*\n/m;
  const startMatch = html.match(startRe);
  if (!startMatch) throw new Error('Could not find `let FLAG_REGISTRY = [` start');
  const startIdx = startMatch.index + startMatch[0].length;
  const remainder = html.slice(startIdx);
  const endMatch = remainder.match(endRe);
  if (!endMatch) throw new Error('Could not find closing `];` for FLAG_REGISTRY');
  const endIdx = startIdx + endMatch.index;

  const groups = groupByCategory(snapshot.flags);
  const categories = snapshot.categories || {};
  const lines = [];
  let first = true;
  // Preserve category order from the CATEGORIES map (the original file was
  // grouped by category already — this keeps diffs sane).
  const catOrder = Object.keys(categories).length > 0
    ? Object.keys(categories)
    : [...new Set(snapshot.flags.map(f => f.category))];
  for (const cat of catOrder) {
    const flags = groups.get(cat);
    if (!flags || flags.length === 0) continue;
    if (!first) lines.push('');
    first = false;
    lines.push(`  // === ${sectionTitle(cat, categories)} ===`);
    for (const f of flags) lines.push(flagLiteral(f));
  }
  // Any uncategorised catch-alls not in CATEGORIES
  for (const [cat, flags] of groups) {
    if (catOrder.includes(cat)) continue;
    if (!first) lines.push('');
    first = false;
    lines.push(`  // === ${sectionTitle(cat, categories)} ===`);
    for (const f of flags) lines.push(flagLiteral(f));
  }

  const newBlock = lines.join('\n') + '\n';
  const next = html.slice(0, startIdx) + newBlock + html.slice(endIdx);
  fs.writeFileSync(args.target, next);
  console.error(`Rewrote FLAG_REGISTRY in ${args.target} — ${snapshot.flags.length} flags across ${groups.size} categories`);
}

main();
