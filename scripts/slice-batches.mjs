#!/usr/bin/env node
// Slice a flags snapshot + its extracted contexts into N batch files
// that subagents can consume. Each batch file contains:
//   { rubric, flags: [{key, label, category, type, currentDescription, contexts}] }
//
// Usage:
//   node scripts/slice-batches.mjs --target flags/2.1.111.json --contexts flags/.contexts/2.1.111.json --batches 5

import fs from 'node:fs';
import path from 'node:path';

const RUBRIC = `Enrich environment-variable flag metadata for TokenBlast, a config-generator for Claude Code's undocumented flags. For each flag, produce exactly three fields: \`description\`, \`tokenEffect\`, \`internal\`.

## description (string)
One sentence, 6–15 words, ending in a period. Lead with operational behaviour using verbs like *Controls*, *Caps*, *Forces*, *Strips*, *Caches*, *Overrides*, *Enables*, *Disables*, *Reroutes*. Include a concrete trade-off or side effect when meaningful ("Lower = more aggressive"). Do not restate the label. Do not use second person. If the source snippets don't fully explain the flag, make your best inference from key, label, category, type, and currentDescription.

Good examples:
- "Token threshold for auto-compaction. Lower = more aggressive."
- "Caps output tokens per response."
- "Strips built-in git workflow instructions from system prompt."
- "Eliminates extended-thinking tokens entirely."

Bad examples (too generic, don't produce these):
- "Anthropic API key for direct access." → instead: "Direct API key for Anthropic inference — bypasses OAuth."
- "Override the API endpoint URL." → instead: "Reroutes API traffic to a custom endpoint."

## tokenEffect (object)
Two required fields plus one optional:
- "surface" (enum): where tokens land. Exactly one of:
  - "system-prompt" — pre-conversation system text (CLAUDE.md, instruction blocks, personality)
  - "context" — inside the conversation window (memory, prior messages, file reads)
  - "output" — response tokens
  - "thinking" — extended-thinking budget
  - "tools" — tool-call traffic (tool schemas, tool results)
  - "none" — no token impact (auth, networking, UI chrome, telemetry, debug)
- "magnitude" (enum): rough size of the effect:
  - "negligible" — near-zero, e.g. a single log line
  - "low" — a few hundred tokens (one-off small strings)
  - "medium" — thousands of tokens, or repeatable per-turn
  - "high" — tens of thousands, or full context categories (CLAUDE.md, memory)
  - "variable" — user-supplied value dictates size (MAX_OUTPUT_TOKENS, MAX_CONTEXT_TOKENS)
- "notes" (optional string, 3–15 words): include only when surface+magnitude alone don't convey it. Keep terse.

If the flag doesn't affect tokens at all, use {"surface": "none", "magnitude": "negligible"} and omit notes.

## internal (boolean)
Set true when the flag is one of:
- Testing-only — key contains _FOR_TESTING or _FIXTURE
- Set internally by the CLI (appears as left-hand side of assignment in source, never read as user input). Transient markers like _JUST_SWITCHED, _SANDBOXED belong here.
- Experimental GrowthBook machinery — key contains _GB_ or _GROWTHBOOK_, or description mentions GrowthBook override
- Diagnostic markers unused by end users

Otherwise false. When in doubt prefer false — users can still be told about rare flags.

## Output format
Return a SINGLE JSON object in your final message, mapping each flag key to its enrichment. Match by key. Don't wrap in prose — emit the JSON object directly so it can be parsed.

Example:
{
  "CLAUDE_CODE_DISABLE_THINKING": {
    "description": "Eliminates extended-thinking tokens entirely.",
    "tokenEffect": { "surface": "thinking", "magnitude": "high", "notes": "Cuts all thinking budget" },
    "internal": false
  },
  "CLAUDE_CODE_TUI_JUST_SWITCHED": {
    "description": "Internal marker set during TUI mode relaunch.",
    "tokenEffect": { "surface": "none", "magnitude": "negligible" },
    "internal": true
  }
}`;

function parseArgs(argv) {
  const out = { batches: 5 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target') out.target = argv[++i];
    else if (a === '--contexts') out.contexts = argv[++i];
    else if (a === '--batches') out.batches = Number(argv[++i]);
    else if (a === '--out-dir') out.outDir = argv[++i];
  }
  if (!out.target || !out.contexts) throw new Error('--target and --contexts are required');
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const target = JSON.parse(fs.readFileSync(args.target, 'utf8'));
  const contextsDoc = JSON.parse(fs.readFileSync(args.contexts, 'utf8'));
  const contexts = contextsDoc.contexts;

  const flags = target.flags.map(f => ({
    key: f.key,
    label: f.label,
    category: f.category,
    type: f.type,
    currentDescription: f.description,
    contexts: contexts[f.key] || [],
  }));

  const outDir = args.outDir || path.join(path.dirname(args.target), '.batches');
  fs.mkdirSync(outDir, { recursive: true });

  const batchSize = Math.ceil(flags.length / args.batches);
  for (let i = 0; i < args.batches; i++) {
    const slice = flags.slice(i * batchSize, (i + 1) * batchSize);
    if (slice.length === 0) break;
    const payload = { rubric: RUBRIC, flags: slice };
    const file = path.join(outDir, `batch-${i + 1}.json`);
    fs.writeFileSync(file, JSON.stringify(payload, null, 2) + '\n');
    console.error(`Wrote ${file} — ${slice.length} flags`);
  }
}

main();
