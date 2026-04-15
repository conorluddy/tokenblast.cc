#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const FLAGS_DIR = path.join(ROOT, "flags");
const MANIFEST = JSON.parse(
  fs.readFileSync(path.join(FLAGS_DIR, "manifest.json"), "utf8")
);

const latestVersion = MANIFEST.latest;
const latestFile = MANIFEST.snapshots.find(
  (s) => s.version === latestVersion
).file;
const data = JSON.parse(
  fs.readFileSync(path.join(FLAGS_DIR, latestFile), "utf8")
);

const activeFlags = data.flags.filter((f) => !f.deprecated);
const categories = data.categories;

// === Build README ===

const lines = [];

lines.push("# TokenBlast");
lines.push("");
lines.push(
  "Interactive config generator for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) environment flags. Find your preferred balance of cost, tokens, and thinking."
);
lines.push("");
lines.push("**[www.tokenblast.cc](https://www.tokenblast.cc)**");
lines.push("");
lines.push(
  `Generated from Claude Code **v${latestVersion}** — ${activeFlags.length} flags across ${Object.keys(categories).length} categories.`
);
lines.push("");

// Group flags by category
const grouped = {};
for (const flag of activeFlags) {
  const cat = flag.category || "uncategorised";
  if (!grouped[cat]) grouped[cat] = [];
  grouped[cat].push(flag);
}

// Render each category
const categoryOrder = Object.keys(categories);
for (const catKey of categoryOrder) {
  const cat = categories[catKey];
  const flags = grouped[catKey];
  if (!flags || flags.length === 0) continue;

  lines.push(`## ${cat.label}`);
  lines.push("");
  lines.push("| Flag | Type | Description |");
  lines.push("|------|------|-------------|");

  for (const f of flags.sort((a, b) => a.key.localeCompare(b.key))) {
    const name = f.isNew ? `\`${f.key}\` 🆕` : `\`${f.key}\``;
    const desc = f.description === "TODO: Add description" ? "—" : f.description;
    lines.push(`| ${name} | ${f.type} | ${desc} |`);
  }

  lines.push("");
}

// Deprecated flags section
const deprecated = data.flags.filter((f) => f.deprecated);
if (deprecated.length > 0) {
  lines.push("## Deprecated");
  lines.push("");
  lines.push(
    "These flags were present in earlier versions but have been removed."
  );
  lines.push("");
  lines.push("| Flag | Removed in |");
  lines.push("|------|------------|");
  for (const f of deprecated.sort((a, b) => a.key.localeCompare(b.key))) {
    lines.push(
      `| \`${f.key}\` | ${f.deprecatedInVersion || "unknown"} |`
    );
  }
  lines.push("");
}

// Footer
lines.push("---");
lines.push("");
lines.push(
  "*This file is auto-generated from [`flags/manifest.json`](flags/manifest.json) by [`scripts/generate-readme.js`](scripts/generate-readme.js). Do not edit manually.*"
);
lines.push("");

const readme = lines.join("\n");
const readmePath = path.join(ROOT, "README.md");

// Only write if changed
const existing = fs.existsSync(readmePath)
  ? fs.readFileSync(readmePath, "utf8")
  : "";

if (readme === existing) {
  console.log("README.md is up to date — no changes needed.");
  process.exit(0);
}

fs.writeFileSync(readmePath, readme);
console.log(
  `README.md updated (${activeFlags.length} flags, v${latestVersion}).`
);
