# TokenBlast

Interactive config generator for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) environment flags. Find your preferred balance of cost, tokens, and thinking.

**[www.tokenblast.cc](https://www.tokenblast.cc)**

Generated from Claude Code **v2.1.111** — 237 flags across 18 categories.

## Authentication & Identity

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_API_KEY` | text | Anthropic API key for direct access. |
| `ANTHROPIC_AUTH_TOKEN` | text | Alternative authentication token. |
| `ANTHROPIC_BASE_URL` | text | Override Anthropic API base URL. |
| `ANTHROPIC_UNIX_SOCKET` | text | Unix socket for local API connections. |
| `CLAUDE_CODE_ACCOUNT_TAGGED_ID` | text | Internal account identifier for tagging/telemetry. |
| `CLAUDE_CODE_ACCOUNT_UUID` | text | Account UUID for auth/billing. |
| `CLAUDE_CODE_API_BASE_URL` | text | Override the API endpoint URL. |
| `CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR` | text | File descriptor for reading API key securely. |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | number | Cache TTL for the API key helper script. |
| `CLAUDE_CODE_ATTRIBUTION_HEADER` | boolean | Custom attribution header for API requests. |
| `CLAUDE_CODE_CUSTOM_OAUTH_URL` | text | Custom OAuth endpoint URL (must be approved). |
| `CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER` 🆕 | boolean | — |
| `CLAUDE_CODE_OAUTH_CLIENT_ID` | text | OAuth client ID. |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | text | OAuth refresh token. |
| `CLAUDE_CODE_OAUTH_SCOPES` | text | OAuth scopes (space-separated). |
| `CLAUDE_CODE_OAUTH_TOKEN` | text | OAuth access token. |
| `CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR` | text | File descriptor for OAuth token. |
| `CLAUDE_CODE_ORGANIZATION_UUID` | text | Organization UUID for multi-org accounts. |
| `CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS` 🆕 | number | — |
| `CLAUDE_CODE_PROXY_AUTHENTICATE` 🆕 | text | — |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | text | Session-specific access token. |
| `CLAUDE_CODE_USER_EMAIL` | text | User email for auth/attribution. |
| `CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR` | text | WebSocket authentication file descriptor. |

## Context & Memory

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | text | Extra directories to scan for CLAUDE.md files. |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | number | Token threshold for auto-compaction. Lower = more aggressive. |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | boolean | Disables auto-memory reads/writes. Removes memory from context. |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | boolean | Drops ALL CLAUDE.md content from system prompt. Nuclear option. |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | boolean | Strips built-in git workflow instructions from system prompt. |
| `CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP` | boolean | Forces full compaction pipeline instead of short-circuiting. |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | boolean | Show summary when returning from idle/away state. |
| `CLAUDE_CODE_IDLE_THRESHOLD_MINUTES` | number | Minutes of inactivity before idle detection fires. Default 75. |
| `CLAUDE_CODE_IDLE_TOKEN_THRESHOLD` | number | Token count above which idle detection activates. Default 100000. |
| `CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES` | boolean | Include incomplete messages in context. |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | number | Override max context window token limit (used with DISABLE_COMPACT). |
| `CLAUDE_CODE_REMOTE_MEMORY_DIR` | text | Alternative directory for memory/session data in remote mode. |
| `CLAUDE_CODE_RESUME_FROM_SESSION` | text | Hydrate context from a specific prior session ID. |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` | boolean | Auto-resume interrupted turns. |
| `CLAUDE_CODE_RESUME_THRESHOLD_MINUTES` | number | Minutes since last message to trigger resume flow. Default 70. |
| `CLAUDE_CODE_RESUME_TOKEN_THRESHOLD` | number | Token count above which resume is offered. Default 100000. |
| `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | boolean | Skip loading previous prompt history at session start. |

## Debugging & Diagnostics

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_DEBUG_LOG_LEVEL` | select | Debug logging verbosity (verbose/debug/info/warn/error). |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | text | Directory for debug log output. |
| `CLAUDE_CODE_DEBUG_REPAINTS` | boolean | Debug UI repaint cycles. |
| `CLAUDE_CODE_DIAGNOSTICS_FILE` | text | Path to write diagnostic output. |
| `CLAUDE_CODE_FRAME_TIMING_LOG` | boolean | Logs UI frame timing. |
| `CLAUDE_CODE_PERFETTO_TRACE` | boolean | Enables Perfetto performance tracing. |
| `CLAUDE_CODE_PROFILE_QUERY` | boolean | Enables query profiling. |
| `CLAUDE_CODE_PROFILE_STARTUP` | boolean | Enables detailed startup profiling. |
| `CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS` | number | Threshold for slow operation warnings (ms). |
| `CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING` | number | Stall detection timeout for testing. |

## IDE & Editor Integration

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_AUTO_CONNECT_IDE` | boolean | Auto-connect to IDE extensions on startup. |
| `CLAUDE_CODE_IDE_HOST_OVERRIDE` | text | Override host address for IDE connections. |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | boolean | Skip auto-install of IDE extensions. |
| `CLAUDE_CODE_IDE_SKIP_VALID_CHECK` | boolean | Skip workspace folder validation. |

## Model & Effort

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_BETAS` | text | Enable beta API features. |
| `ANTHROPIC_CUSTOM_HEADERS` | text | Custom HTTP headers for API requests. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | text | Custom model option in the CLI model picker. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` | text | Description for custom model option. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | text | Display name for custom model option. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` | text | Capabilities for custom model option. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | text | Override which model ID maps to 'haiku'. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` | text | Description for default Haiku model. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` | text | Display name for default Haiku model. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES` | text | Capabilities for default Haiku model. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | text | Override which model ID maps to 'opus'. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION` | text | Description for default Opus model. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME` | text | Display name for default Opus model. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES` | text | Capabilities for default Opus model. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | text | Override which model ID maps to 'sonnet'. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION` | text | Description for default Sonnet model. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_NAME` | text | Display name for default Sonnet model. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES` | text | Capabilities for default Sonnet model. |
| `ANTHROPIC_LOG` | select | Anthropic SDK logging level. |
| `ANTHROPIC_MODEL` | text | Override the primary model entirely. |
| `ANTHROPIC_SMALL_FAST_MODEL` | text | Model for hooks, classifiers, utility ops. |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | text | AWS region for the small/fast model. |
| `CLAUDE_CODE_AGENT_COST_STEER` | boolean | Enables cost-steering behaviour for sub-agent model selection. |
| `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` | boolean | Forces effort control on all models, not just Opus/Sonnet. |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | boolean | Switches from dynamic to fixed thinking budgets. |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | boolean | Prevents fast mode from being enabled. |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | boolean | Prevents remapping of legacy model names. |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | boolean | Disables fallback to non-streaming API calls. |
| `CLAUDE_CODE_DISABLE_THINKING` | boolean | Completely disables extended thinking. Eliminates all thinking tokens. |
| `CLAUDE_CODE_EFFORT_LEVEL` | select | Controls reasoning effort: low/medium/high/max. |
| `CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT` 🆕 | boolean | — |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | number | Hard cap on output tokens per response. |
| `CLAUDE_CODE_SUBAGENT_MODEL` | select | Model for all subagent tasks. 'haiku' or 'sonnet' saves cost. |

## MCP, Plugins & Features

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_AGENT_LIST_IN_MESSAGES` | boolean | Inject agent type/tool info into messages. |
| `CLAUDE_CODE_DISABLE_ADVISOR_TOOL` | boolean | Removes advisor tool definition from context. |
| `CLAUDE_CODE_DISABLE_ATTACHMENTS` | boolean | Prevents file attachments entering context. |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | boolean | Prevents background tasks that consume tokens. |
| `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL` | boolean | Skips registration of the built-in Claude API skill. |
| `CLAUDE_CODE_DISABLE_CRON` | boolean | Disables cron/scheduled task support. |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | boolean | Disables all experimental beta features. |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | boolean | Disables feedback survey prompts. |
| `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | boolean | Disables file state checkpointing. |
| `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` | boolean | Prevents auto-install of marketplace plugins. |
| `CLAUDE_CODE_DISABLE_POLICY_SKILLS` | boolean | Skips loading admin/org-managed policy skills. |
| `CLAUDE_CODE_ENABLE_BACKGROUND_PLUGIN_REFRESH` 🆕 | boolean | — |
| `CLAUDE_CODE_ENABLE_CFC` | boolean | Enables CFC feature (caching/function calling). |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | boolean | Fine-grained streaming for tool results. |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | boolean | AI-generated suggestions consume lightweight model calls. |
| `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING` | boolean | File checkpointing in SDK mode. |
| `CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT` | boolean | Adds token usage stats per turn. |
| `CLAUDE_CODE_ENABLE_XAA` | boolean | Enables experimental extended agent actions. |
| `CLAUDE_CODE_EXTRA_BODY` | text | Extra JSON fields for API request body. |
| `CLAUDE_CODE_EXTRA_METADATA` | text | Extra metadata attached to API requests. |
| `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` | number | Max parallel tool calls per turn. |
| `CLAUDE_CODE_MCP_ALLOWLIST_ENV` | boolean | Allow all env vars to pass through to MCP servers. |
| `CLAUDE_CODE_MCP_SERVER_NAME` | text | Server name passed to MCP headersHelper subprocess. |
| `CLAUDE_CODE_MCP_SERVER_URL` | text | Server URL passed to MCP headersHelper subprocess. |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | text | Plugin cache directory path. |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | number | Timeout for plugin git operations (ms). |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | text | Seed directory for plugins. |
| `CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE` | boolean | Use ZIP-based cache for plugins. |
| `CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V` | text | Session ingress POST version. |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | boolean | Scrub env vars from subprocesses. |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | boolean | Synchronous plugin installation. |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS` | number | Plugin install timeout (ms). |

## Networking & Proxy

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_CERT_STORE` | text | CA cert sources (comma-separated, e.g. 'system'). |
| `CLAUDE_CODE_CLIENT_CERT` | text | Client certificate for TLS/mTLS auth. |
| `CLAUDE_CODE_CLIENT_KEY` | text | Client key for mTLS auth. |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | text | Passphrase for the client key. |
| `CLAUDE_CODE_HOST_HTTP_PROXY_PORT` | number | HTTP proxy port for host networking. |
| `CLAUDE_CODE_HOST_SOCKS_PROXY_PORT` | number | SOCKS proxy port for host networking. |
| `CLAUDE_CODE_PROXY_HOST` 🆕 | text | — |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | boolean | Proxy handles DNS resolution. |
| `CLAUDE_CODE_PROXY_URL` 🆕 | text | — |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | boolean | Skip AWS Bedrock authentication. |
| `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS` | boolean | Skip network errors in fast mode. |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | boolean | Skip Foundry authentication. |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | boolean | Skip Mantle authentication. |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | boolean | Skip Vertex AI authentication. |

## Output & Display

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ACCESSIBILITY` | boolean | Enables accessibility mode for screen readers. |
| `CLAUDE_CODE_BRIEF` | boolean | Encourages terse/condensed responses. |
| `CLAUDE_CODE_BRIEF_UPLOAD` | boolean | Compact upload path for file attachments. |
| `CLAUDE_CODE_COMMIT_LOG` | text | Path or flag for commit log output during rendering. |
| `CLAUDE_CODE_DISABLE_MOUSE` | boolean | Disables mouse input support in terminal UI. |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | boolean | Prevents updating terminal tab title. |
| `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL` | boolean | Disables virtual scrolling in UI. |
| `CLAUDE_CODE_EAGER_FLUSH` | boolean | Flush output buffers immediately. |
| `CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER` | boolean | Exit after first UI render (testing). |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | number | Auto-exit delay after stop (ms). |
| `CLAUDE_CODE_FORCE_FULL_LOGO` | boolean | Forces full ASCII logo display. |
| `CLAUDE_CODE_NO_FLICKER` | boolean | Forces flicker-free fullscreen rendering mode. |
| `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` | text | Format for question previews. |
| `CLAUDE_CODE_SCROLL_SPEED` | number | Terminal scroll speed multiplier (max 20). Default 1 (3 on Windows). |
| `CLAUDE_CODE_SIMPLE` | boolean | Simplified output, minimal decorations. |
| `CLAUDE_CODE_SYNTAX_HIGHLIGHT` | boolean | Controls syntax highlighting for code blocks. |

## Planning & Tasks

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_AGENT_NAME` | text | Name/identifier for an agent instance. |
| `CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE` | number | Override turn/blocking limits. |
| `CLAUDE_CODE_ENABLE_TASKS` | boolean | Enables the task tracking system. |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | boolean | Multi-agent teams -- multiplies token usage. |
| `CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE` | boolean | Controls interview phase in plan mode. |
| `CLAUDE_CODE_PLAN_MODE_REQUIRED` | boolean | Forces plan mode before execution. |
| `CLAUDE_CODE_PLAN_V` | text | Plan mode version/variant. |
| `CLAUDE_CODE_TASK_LIST_ID` | text | Task list identifier. |

## Provider Routing

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_AWS_API_KEY` | text | API key for Anthropic-on-AWS backend. |
| `ANTHROPIC_AWS_BASE_URL` | text | Custom base URL for Anthropic AWS backend. |
| `ANTHROPIC_AWS_WORKSPACE_ID` | text | Required workspace ID for Anthropic AWS platform. |
| `ANTHROPIC_BEDROCK_BASE_URL` | text | AWS Bedrock endpoint URL. |
| `ANTHROPIC_BEDROCK_MANTLE_API_KEY` | text | API key for Bedrock Mantle backend. |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | text | Custom base URL for Bedrock Mantle. |
| `ANTHROPIC_FOUNDRY_API_KEY` | text | Foundry-specific API key. |
| `ANTHROPIC_FOUNDRY_AUTH_TOKEN` | text | Foundry auth token. |
| `ANTHROPIC_FOUNDRY_BASE_URL` | text | Foundry API endpoint. |
| `ANTHROPIC_FOUNDRY_RESOURCE` | text | Foundry resource identifier. |
| `ANTHROPIC_VERTEX_BASE_URL` | text | Vertex AI endpoint URL. |
| `ANTHROPIC_VERTEX_PROJECT_ID` | text | GCP project ID for Vertex AI. |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | boolean | Provider managed by host (enterprise). |
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | boolean | Route API calls through Anthropic's AWS platform (distinct from Bedrock). |
| `CLAUDE_CODE_USE_BEDROCK` | boolean | Route API calls through AWS Bedrock. |
| `CLAUDE_CODE_USE_CCR_V` | text | CCR version selector. |
| `CLAUDE_CODE_USE_FOUNDRY` | boolean | Route API calls through Foundry. |
| `CLAUDE_CODE_USE_MANTLE` | boolean | Route API calls through Mantle (managed access layer). |
| `CLAUDE_CODE_USE_VERTEX` | boolean | Route API calls through Vertex AI. |

## Remote & Containers

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_CONTAINER_ID` | text | Container identifier. |
| `CLAUDE_CODE_ENVIRONMENT_KIND` | select | Environment type (local/remote/container). |
| `CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION` | text | Environment runner version. |
| `CLAUDE_CODE_HOST_PLATFORM` | text | Override detected host platform. |
| `CLAUDE_CODE_REMOTE` | boolean | Indicates remote session. |
| `CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE` | text | Remote environment type. |
| `CLAUDE_CODE_REMOTE_SEND_KEEPALIVES` | boolean | Send keepalives in remote sessions. |
| `CLAUDE_CODE_REMOTE_SESSION_ID` | text | Remote session identifier. |
| `CLAUDE_CODE_REMOTE_SETTINGS_PATH` | text | Path to settings file in remote mode. |
| `CLAUDE_CODE_WORKSPACE_HOST_PATHS` | text | Workspace host path mappings. |

## Sandbox & Security

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ADDITIONAL_PROTECTION` | boolean | Enables additional safety/protection layers. |
| `CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR` | boolean | Show visual indicator when sandbox is active. |
| `CLAUDE_CODE_BUBBLEWRAP` | text | Bubblewrap sandbox configuration (Linux). |
| `CLAUDE_CODE_FORCE_SANDBOX` | boolean | Forces sandbox mode on. |

## Search & File System

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | number | Caps tokens from file reads. Default ~25,000. |
| `CLAUDE_CODE_GLOB_HIDDEN` | boolean | Include dotfiles in glob searches. |
| `CLAUDE_CODE_GLOB_NO_IGNORE` | boolean | Ignore .gitignore in glob searches. |
| `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS` | number | Timeout for glob searches (seconds). |
| `CLAUDE_CODE_USE_NATIVE_FILE_SEARCH` | boolean | Uses native file search implementation instead of CLI fallback. |

## Session & Lifecycle

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ACTION` | text | Startup action identifier. |
| `CLAUDE_CODE_DONT_INHERIT_ENV` | boolean | Don't inherit parent shell env vars. |
| `CLAUDE_CODE_ENTRYPOINT` | select | Entrypoint identifier (CLI/IDE/SDK). |
| `CLAUDE_CODE_GIT_BASH_PATH` | text | Path to git bash (Windows). |
| `CLAUDE_CODE_MAX_RETRIES` | number | Max retry attempts for failed API calls. |
| `CLAUDE_CODE_NEW_INIT` | boolean | Changes /init to create multiple CLAUDE.md files. |
| `CLAUDE_CODE_PERFORCE_MODE` | boolean | Enables Perforce VCS mode. Adjusts file-stat logic and injects Perforce context. |
| `CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS` | number | Timeout for PowerShell command parsing (ms). |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | number | Timeout for session-end hooks (ms). |
| `CLAUDE_CODE_SHELL` | text | Override detected shell. |
| `CLAUDE_CODE_SHELL_PREFIX` | text | Prefix commands run in shell. |
| `CLAUDE_CODE_TMPDIR` | text | Override temp directory. |

## Teams & Collaboration

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_BASE_REF` | text | Base git ref for diff operations. |
| `CLAUDE_CODE_BASE_REFS` | text | Multiple base git refs for diff operations. |
| `CLAUDE_CODE_IS_COWORK` | boolean | Indicates cowork/collaboration mode. |
| `CLAUDE_CODE_SSE_PORT` | number | Server-sent events port. |
| `CLAUDE_CODE_TEAM_NAME` | text | Team name for team sessions. |
| `CLAUDE_CODE_TEAM_ONBOARDING` | boolean | Enables team onboarding flow. |
| `CLAUDE_CODE_TEAMMATE_COMMAND` | text | Command for teammate agent invocation. |
| `CLAUDE_CODE_USE_COWORK_PLUGINS` | boolean | Enable cowork-specific plugins. |
| `CLAUDE_CODE_WORKER_EPOCH` | text | Worker epoch identifier. |

## Telemetry & Observability

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS` | number | Datadog telemetry flush interval (ms). |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | boolean | Disables telemetry/analytics network calls. |
| `CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS` | boolean | Emit session state events for SDK. |
| `CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES` | boolean | Emit tool usage summaries. |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | boolean | Master switch for telemetry collection. |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | boolean | Enhanced telemetry beta. |
| `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` | number | OpenTelemetry flush timeout (ms). |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | number | OTel headers helper debounce (ms). |
| `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS` | number | OTel shutdown timeout (ms). |
| `CLAUDE_CODE_TAGS` | text | Tags for session metadata. |

## Terminal Multiplexer

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_TMUX_PREFIX` | text | Custom tmux prefix key. |
| `CLAUDE_CODE_TMUX_PREFIX_CONFLICTS` | boolean | Tmux prefix conflict detection. |
| `CLAUDE_CODE_TMUX_SESSION` | text | Tmux session name. |
| `CLAUDE_CODE_TMUX_TRUECOLOR` | boolean | Enable truecolor in tmux. |

## Uncategorised

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL` 🆕 | boolean | — |
| `CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL` 🆕 | boolean | — |
| `CLAUDE_CODE_REPL` | text | — |
| `CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE` 🆕 | text | — |
| `CLAUDE_CODE_TEST_FIXTURES_ROOT` | text | Root directory for test fixtures. |
| `CLAUDE_CODE_TUI_JUST_SWITCHED` 🆕 | text | — |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | boolean | Use PowerShell instead of Bash tool. |

---

*This file is auto-generated from [`flags/manifest.json`](flags/manifest.json) by [`scripts/generate-readme.js`](scripts/generate-readme.js). Do not edit manually.*
