#!/usr/bin/env bash
set -euo pipefail

# update-flags.sh — Extract env flags from the latest Claude Code npm package,
# diff against the previous snapshot, and generate a new versioned JSON.
#
# Usage:
#   ./scripts/update-flags.sh              # auto-detect latest npm version
#   ./scripts/update-flags.sh --dry-run    # show diff only, don't write files

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FLAGS_DIR="$REPO_ROOT/flags"
MANIFEST="$FLAGS_DIR/manifest.json"
TMP_DIR=$(mktemp -d)
DRY_RUN=false

[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# === 1. Install latest Claude Code to temp dir ===
echo "Installing @anthropic-ai/claude-code to temp dir..."
cd "$TMP_DIR"
npm init -y --silent > /dev/null 2>&1
npm install @anthropic-ai/claude-code --silent 2>/dev/null

CLI_JS="$TMP_DIR/node_modules/@anthropic-ai/claude-code/cli.js"
if [[ ! -f "$CLI_JS" ]]; then
  echo "ERROR: cli.js not found. Package structure may have changed."
  exit 1
fi

# Get installed version
NEW_VERSION=$(node -e "console.log(require('./node_modules/@anthropic-ai/claude-code/package.json').version)")
echo "Installed version: $NEW_VERSION"

# === 2. Extract flag keys from source ===
echo "Extracting flag keys..."
grep -oE '(CLAUDE_CODE_|ANTHROPIC_)[A-Z_]+' "$CLI_JS" | sort -u > "$TMP_DIR/source_keys.txt"

# Filter out regex artifacts and known internal-only flags
grep -v -E '^CLAUDE_CODE_DISABLE_$|^CLAUDE_CODE_$|^CLAUDE_CODE_EXECPATH$|^CLAUDE_CODE_SANDBOXED$|^CLAUDE_CODE_SCRIPT_CAPS$|^CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH$|^CLAUDE_CODE_SIMULATE_PROXY_USAGE$|^CLAUDE_CODE_ULTRAREVIEW_PREFLIGHT_FIXTURE$|^CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH$|^CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK$|^CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE$|^CLAUDE_CODE_REPO_CHECKOUTS$|^ANTHROPIC_AWS$' \
  "$TMP_DIR/source_keys.txt" > "$TMP_DIR/source_keys_clean.txt"
mv "$TMP_DIR/source_keys_clean.txt" "$TMP_DIR/source_keys.txt"

SOURCE_COUNT=$(wc -l < "$TMP_DIR/source_keys.txt" | tr -d ' ')
echo "Found $SOURCE_COUNT keys in source"

# === 3. Load previous snapshot ===
LATEST=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$MANIFEST')).latest)")
PREV_FILE="$FLAGS_DIR/$LATEST.json"

echo "Previous snapshot: $LATEST ($PREV_FILE)"

if [[ ! -f "$PREV_FILE" ]]; then
  echo "ERROR: Previous snapshot not found at $PREV_FILE"
  exit 1
fi

# Extract keys from previous snapshot
node -e "
  const d = JSON.parse(require('fs').readFileSync('$PREV_FILE'));
  d.flags.forEach(f => console.log(f.key));
" | sort -u > "$TMP_DIR/prev_keys.txt"

# === 4. Diff ===
ADDED=$(comm -23 "$TMP_DIR/source_keys.txt" "$TMP_DIR/prev_keys.txt")
REMOVED=$(comm -13 "$TMP_DIR/source_keys.txt" "$TMP_DIR/prev_keys.txt")

ADDED_COUNT=$(echo "$ADDED" | grep -c . || true)
REMOVED_COUNT=$(echo "$REMOVED" | grep -c . || true)

echo ""
echo "=== DIFF: $LATEST → $NEW_VERSION ==="
echo "Added:   $ADDED_COUNT"
echo "Removed: $REMOVED_COUNT"

if [[ $ADDED_COUNT -eq 0 && $REMOVED_COUNT -eq 0 ]]; then
  echo ""
  echo "No flag changes detected. Nothing to do."
  exit 0
fi

if [[ $ADDED_COUNT -gt 0 ]]; then
  echo ""
  echo "--- NEW FLAGS ---"
  echo "$ADDED"
fi

if [[ $REMOVED_COUNT -gt 0 ]]; then
  echo ""
  echo "--- REMOVED FLAGS ---"
  echo "$REMOVED"
fi

# === 5. Extract context for new flags ===
if [[ $ADDED_COUNT -gt 0 ]]; then
  echo ""
  echo "--- CONTEXT FOR NEW FLAGS ---"
  while IFS= read -r key; do
    [[ -z "$key" ]] && continue
    echo ""
    echo "## $key"
    grep -o ".\{0,80\}$key.\{0,80\}" "$CLI_JS" | head -2
  done <<< "$ADDED"
fi

if $DRY_RUN; then
  echo ""
  echo "(dry run — no files written)"
  exit 0
fi

# === 6. Generate new snapshot ===
echo ""
echo "Generating new snapshot..."

NEW_FILE="$FLAGS_DIR/$NEW_VERSION.json"

node -e "
const prev = JSON.parse(require('fs').readFileSync('$PREV_FILE'));
const addedKeys = new Set(\`$ADDED\`.split('\n').filter(Boolean));
const removedKeys = new Set(\`$REMOVED\`.split('\n').filter(Boolean));

// Carry forward existing flags
const flags = prev.flags
  .map(f => {
    if (removedKeys.has(f.key)) {
      return { ...f, deprecated: true, deprecatedInVersion: '$NEW_VERSION' };
    }
    // Clear isNew from previous snapshot
    const { isNew, ...rest } = f;
    return rest;
  });

// Helper: guess a label from a flag key
function keyToLabel(key) {
  return key
    .replace(/^CLAUDE_CODE_/, '')
    .replace(/^ANTHROPIC_/, '')
    .split('_')
    .map(w => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

// Helper: guess category from key patterns
function guessCategory(key) {
  if (/AUTH|OAUTH|API_KEY|TOKEN$/.test(key)) return 'auth';
  if (/MODEL|EFFORT|THINKING|SUBAGENT|BETAS/.test(key)) return 'model-effort';
  if (/COMPACT|CONTEXT|MEMORY|RESUME|IDLE/.test(key)) return 'context-memory';
  if (/DEBUG|DIAGNOSTIC|PROFILE|PERFETTO|FRAME_TIMING/.test(key)) return 'debug';
  if (/IDE/.test(key)) return 'ide';
  if (/MCP|PLUGIN/.test(key)) return 'mcp-plugins';
  if (/PROXY|SOCKET|CERT|CLIENT_KEY|NETWORKING/.test(key)) return 'networking';
  if (/BRIEF|SIMPLE|LOGO|SCROLL|FLICKER|DISPLAY|TERMINAL/.test(key)) return 'output-display';
  if (/PLAN|TASK/.test(key)) return 'planning-tasks';
  if (/BEDROCK|VERTEX|FOUNDRY|MANTLE|PROVIDER|USE_CCR/.test(key)) return 'provider-routing';
  if (/REMOTE|CONTAINER/.test(key)) return 'remote-containers';
  if (/SANDBOX|BUBBLEWRAP|PROTECTION/.test(key)) return 'sandbox-security';
  if (/GLOB|FILE_READ|SEARCH/.test(key)) return 'search-filesystem';
  if (/SHELL|BASH|TMPDIR|ENTRYPOINT|LIFECYCLE|RETRIES/.test(key)) return 'session-lifecycle';
  if (/TEAM|COWORK|SSE_PORT/.test(key)) return 'teams-collaboration';
  if (/OTEL|DATADOG|TELEMETRY|EMIT_|TAGS$/.test(key)) return 'telemetry';
  if (/TMUX/.test(key)) return 'terminal-mux';
  return 'uncategorised';
}

// Helper: guess type from key patterns
function guessType(key) {
  if (/DISABLE_|ENABLE_|SKIP_|FORCE_|^IS_/.test(key)) return 'boolean';
  if (/TIMEOUT|_MS$|_TTL|INTERVAL|THRESHOLD|MAX_|PORT$|SPEED/.test(key)) return 'number';
  return 'text';
}

// Add new flags with placeholder metadata
for (const key of addedKeys) {
  flags.push({
    key,
    label: keyToLabel(key),
    description: 'TODO: Add description',
    category: guessCategory(key),
    type: guessType(key),
    defaultValue: null,
    options: null,
    placeholder: null,
    affectsUsage: false,
    impact: null,
    costDirection: null,
    tags: [],
    audience: 'standard',
    isNew: true,
    addedInVersion: '$NEW_VERSION',
  });
}

// Sort: non-deprecated first, then alphabetically within category
flags.sort((a, b) => {
  if (a.deprecated && !b.deprecated) return 1;
  if (!a.deprecated && b.deprecated) return 1;
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.key.localeCompare(b.key);
});

const output = {
  version: '$NEW_VERSION',
  generatedAt: new Date().toISOString().split('T')[0],
  totalFlags: flags.filter(f => !f.deprecated).length,
  deprecatedFlags: flags.filter(f => f.deprecated).length,
  categories: prev.categories,
  audienceCounts: {
    'power-user': flags.filter(f => !f.deprecated && f.audience === 'power-user').length,
    standard: flags.filter(f => !f.deprecated && f.audience === 'standard').length,
    enterprise: flags.filter(f => !f.deprecated && f.audience === 'enterprise').length,
    internal: flags.filter(f => !f.deprecated && f.audience === 'internal').length,
  },
  flags,
};

require('fs').writeFileSync('$NEW_FILE', JSON.stringify(output, null, 2));
console.log('Written: $NEW_FILE');
console.log('Active flags:', output.totalFlags);
console.log('Deprecated:', output.deprecatedFlags);
"

# === 7. Update manifest ===
node -e "
const manifest = JSON.parse(require('fs').readFileSync('$MANIFEST'));
manifest.latest = '$NEW_VERSION';
manifest.snapshots.push({
  version: '$NEW_VERSION',
  file: '$NEW_VERSION.json',
  date: new Date().toISOString().split('T')[0],
  claudeCodeVersion: '$NEW_VERSION',
  totalFlags: null, // filled by the JSON generation above
  added: $ADDED_COUNT,
  removed: $REMOVED_COUNT,
  notes: 'Auto-generated snapshot'
});

// Backfill totalFlags from the new JSON
const newData = JSON.parse(require('fs').readFileSync('$NEW_FILE'));
manifest.snapshots[manifest.snapshots.length - 1].totalFlags = newData.totalFlags;

require('fs').writeFileSync('$MANIFEST', JSON.stringify(manifest, null, 2));
console.log('Updated manifest.json');
"

echo ""
echo "Done. Review the new snapshot at: $NEW_FILE"
echo "Flags marked 'isNew: true' need descriptions."
echo "Flags marked 'deprecated: true' were removed from source."
