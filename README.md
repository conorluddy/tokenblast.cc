# TokenBlast

Interactive config generator for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) environment flags. Find your preferred balance of cost, tokens, and thinking.

**[www.tokenblast.cc](https://www.tokenblast.cc)**

Generated from Claude Code **v2.1.143** — 288 flags across 18 categories.

## Authentication & Identity

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_API_KEY` | text | Direct API key for Anthropic inference — bypasses OAuth flow entirely. |
| `ANTHROPIC_AUTH_TOKEN` | text | Bearer token used as an alternative credential, checked before OAuth sources. |
| `ANTHROPIC_BASE_URL` | text | Reroutes all API traffic to a custom endpoint, overriding the default api.anthropic.com. |
| `ANTHROPIC_IDENTITY_TOKEN` | text | Inline OIDC federation identity token used for token-exchange auth when no identity_token_file path is configured. |
| `ANTHROPIC_UNIX_SOCKET` | text | Routes Anthropic API requests through a local Unix domain socket instead of TCP. |
| `CLAUDE_CODE_ACCOUNT_TAGGED_ID` | text | Overrides the OTEL account ID tag used in telemetry metrics, falls back to a derived value. |
| `CLAUDE_CODE_ACCOUNT_UUID` | text | Injects account UUID to pre-populate OAuth session without interactive login. |
| `CLAUDE_CODE_API_BASE_URL` | text | Reroutes Files API calls to a custom base URL, falling back to ANTHROPIC_BASE_URL. |
| `CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR` | text | Reads the API key from a file descriptor, enabling secure secret injection without env-var exposure. |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | number | Controls how long the API key helper script result is cached before re-executing. |
| `CLAUDE_CODE_ATTRIBUTION_HEADER` | boolean | Suppresses the Claude Code attribution header appended to API requests when set. |
| `CLAUDE_CODE_CUSTOM_OAUTH_URL` | text | Overrides the OAuth base URL to an approved custom endpoint for non-production auth flows. |
| `CLAUDE_CODE_OAUTH_CLIENT_ID` | text | Overrides the default OAuth client ID used during the authorization code flow. |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | text | Seeds an OAuth refresh token directly, skipping the interactive browser login step. |
| `CLAUDE_CODE_OAUTH_SCOPES` | text | Declares space-separated OAuth scopes required when bootstrapping via a refresh token. |
| `CLAUDE_CODE_OAUTH_TOKEN` | text | Provides a pre-issued OAuth access token, bypassing device-flow login entirely. |
| `CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR` | text | Reads the OAuth access token from a file descriptor for secure secret injection. |
| `CLAUDE_CODE_ORGANIZATION_UUID` | text | Pins requests to a specific organization UUID, bypassing the profile-fetch lookup. |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | text | Provides a session-scoped access token used by remote/bridge entrypoints instead of OAuth. |
| `CLAUDE_CODE_USER_EMAIL` | text | Injects user email to pre-populate OAuth session alongside account UUID and org UUID. |
| `CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR` | text | Reads the WebSocket session ingress token from a file descriptor for remote mode auth. |

## Context & Memory

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | text | Adds extra directories to scan for CLAUDE.md and rules files, expanding the system-prompt context. |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | number | Token threshold for auto-compaction. Lower = more aggressive compaction. |
| `CLAUDE_CODE_COLD_COMPACT` | text | Forces a cold compaction run regardless of current context fill level. |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | boolean | Disables automatic memory reads and writes, removing memory content from each turn's context. |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | boolean | Strips all CLAUDE.md file content from the system prompt entirely. |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | boolean | Strips built-in git workflow instructions from the system prompt. |
| `CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP` | boolean | Forces the full compaction pipeline, disabling the fast-path short-circuit for large contexts. |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | boolean | Enables an idle-return summary notification when resuming after an away period. |
| `CLAUDE_CODE_IDLE_THRESHOLD_MINUTES` | number | Controls the inactivity window (in minutes) before idle-state detection fires. Default 75. |
| `CLAUDE_CODE_IDLE_TOKEN_THRESHOLD` | number | Sets the minimum context token count required before idle-state detection activates. Default 100000. |
| `CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES` | boolean | Includes incomplete in-flight messages in the context window during streaming. |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | number | Overrides the model context window size, active only when DISABLE_COMPACT is also set. |
| `CLAUDE_CODE_REMOTE_MEMORY_DIR` | text | Redirects memory and session storage to an alternative directory for remote deployments. |
| `CLAUDE_CODE_RESUME_FROM_SESSION` | text | Hydrates conversation context from a specific prior session ID via the Sessions API. |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` | boolean | Automatically resumes an interrupted turn by re-injecting its message content. |
| `CLAUDE_CODE_RESUME_PROMPT` | text | Overrides the default message injected when resuming an interrupted session. |
| `CLAUDE_CODE_RESUME_THRESHOLD_MINUTES` | number | Sets minutes since the last message before the resume-session flow is offered. Default 70. |
| `CLAUDE_CODE_RESUME_TOKEN_THRESHOLD` | number | Sets the minimum token count required before the resume-session prompt appears. Default 100000. |
| `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | boolean | Skips loading persisted prompt history at session start, suppressing prior-turn entries. |

## Debugging & Diagnostics

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_PROFILE` | text | Selects which profile file to load from <config_dir>/configs/<profile>.json, overriding the active_config pointer and defaulting to "default". |
| `CLAUDE_CODE_DEBUG_LOG_LEVEL` | select | Controls the minimum log severity written to the debug log file (verbose/debug/info/warn/error). |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | text | Redirects debug log output to a specific file path instead of the default session log. |
| `CLAUDE_CODE_DEBUG_REPAINTS` | boolean | Enables UI repaint cycle tracking, surfacing which React components are re-rendering. |
| `CLAUDE_CODE_DIAGNOSTICS_FILE` | text | Writes structured diagnostic events to a specified file path for external analysis. |
| `CLAUDE_CODE_FRAME_TIMING_LOG` | boolean | Logs per-frame render timing including phase breakdowns and RSS memory usage. |
| `CLAUDE_CODE_PERFETTO_TRACE` | boolean | Enables Perfetto-format performance tracing for agent process and thread activity. |
| `CLAUDE_CODE_PROFILE_QUERY` | boolean | Enables per-query profiling checkpoints, surfacing a timing report on demand. |
| `CLAUDE_CODE_PROFILE_STARTUP` | boolean | Enables detailed startup phase profiling and emits a startup-perf telemetry event. |
| `CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS` | number | Sets the threshold (ms) above which operations are flagged as slow in diagnostics. |
| `CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING` | number | Overrides the stall-detection abort timeout for test harnesses. |

## IDE & Editor Integration

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_IDENTITY_TOKEN_FILE` | text | Path to a file containing the OIDC federation identity token, preferred over the inline ANTHROPIC_IDENTITY_TOKEN value. |
| `CLAUDE_CODE_AUTO_CONNECT_IDE` | boolean | Forces automatic IDE extension connection on startup, or explicitly disables it when false. |
| `CLAUDE_CODE_HIDE_CWD` | text | Hides the current working directory from the TUI status header. |
| `CLAUDE_CODE_IDE_HOST_OVERRIDE` | text | Overrides the IDE host address, bypassing WSL gateway detection entirely. |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | boolean | Prevents automatic IDE extension installation on startup. |
| `CLAUDE_CODE_IDE_SKIP_VALID_CHECK` | boolean | Skips workspace-folder validation when discovering IDE connections. |

## Model & Effort

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_BETAS` | text | Appends comma-separated beta feature identifiers to every API request's beta header. |
| `ANTHROPIC_CUSTOM_HEADERS` | text | Injects newline-delimited HTTP headers into every Anthropic API request. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | text | Adds a custom model ID to the CLI model picker as a selectable option. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` | text | Sets the picker description string shown for the custom model option. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | text | Sets the display label shown for the custom model in the CLI model picker. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` | text | Declares a comma-separated capability list for the custom model, enabling feature routing. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | text | Remaps the 'haiku' model alias to a custom model ID, including Bedrock fallback IDs. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` | text | Sets the description shown in the model picker for the overridden Haiku model. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` | text | Sets the display label shown in the model picker for the overridden Haiku model. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES` | text | Declares capabilities for the overridden Haiku model, controlling feature routing. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | text | Remaps the 'opus' model alias to a custom model ID, including Bedrock fallback IDs. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION` | text | Sets the description shown in the model picker for the overridden Opus model. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME` | text | Sets the display label shown in the model picker for the overridden Opus model. |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES` | text | Declares feature capabilities for the custom Opus model, overriding built-in detection. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | text | Overrides which model ID resolves when 'sonnet' tier is requested. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION` | text | Sets the display description shown in the model picker for a custom Sonnet model. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_NAME` | text | Sets the display name shown in the model picker for a custom Sonnet model. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES` | text | Declares feature capabilities for the custom Sonnet model, overriding built-in detection. |
| `ANTHROPIC_LOG` | select | Controls Anthropic SDK log verbosity (error / warn / info / debug). |
| `ANTHROPIC_MODEL` | text | Overrides the primary model entirely, replacing the default Sonnet selection. |
| `ANTHROPIC_SMALL_FAST_MODEL` | text | Overrides the lightweight model used for hooks, classifiers, and background utility calls. |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | text | Pins the small/fast model to a specific AWS Bedrock region, independent of the main model region. |
| `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` | boolean | Forces effort-level controls on all models, bypassing the Opus/Sonnet-only gate. |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | boolean | Forces fixed thinking budgets on Opus/Sonnet-4-6, disabling the adaptive budget algorithm. |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | boolean | Disables fast-mode inference, forcing the standard (slower) API path. |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | boolean | Prevents automatic remapping of legacy model names (e.g. old Opus IDs) to current equivalents. |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | boolean | Prevents falling back to non-streaming API calls on stream timeout or idle errors. |
| `CLAUDE_CODE_DISABLE_THINKING` | boolean | Eliminates extended-thinking tokens entirely by hard-disabling the thinking budget. |
| `CLAUDE_CODE_EFFORT_LEVEL` | select | Sets reasoning effort for supported models: low / medium / high / xhigh; overrides per-session effort. |
| `CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT` | boolean | Enables appending an extra system prompt to every Task-tool subagent and its nested descendants. |
| `CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL` | boolean | Force-enables the experimental advisor server tool, bypassing the GrowthBook feature flag. |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | boolean | Enables fetching available models from a gateway endpoint via /v1/models. |
| `CLAUDE_CODE_FORK_SUBAGENT` | text | Force-enables the fork-subagent feature, bypassing the GrowthBook rollout gate. |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | number | Caps output tokens per response, applied as a hard upper limit before the model default. |
| `CLAUDE_CODE_SUBAGENT_MODEL` | select | Overrides the model used for all subagent Task calls; set to 'haiku' or 'sonnet' to reduce cost. |

## MCP, Plugins & Features

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_AGENT_LIST_IN_MESSAGES` | boolean | Injects agent-type and tool availability summaries into every message. |
| `CLAUDE_CODE_DISABLE_ADVISOR_TOOL` | boolean | Removes the advisor tool definition, preventing it from appearing in the tool list. |
| `CLAUDE_CODE_DISABLE_ATTACHMENTS` | boolean | Strips @-mentioned files, MCP resources, and agent-mention attachments from context. |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | boolean | Disables background agent execution and removes the run_in_background tool parameter. |
| `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL` | boolean | Skips registration of the built-in claude-api skill at startup. |
| `CLAUDE_CODE_DISABLE_CRON` | boolean | Disables scheduled and recurring cron task tools entirely. |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | boolean | Disables all experimental beta API features, including context management and tool streaming. |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | boolean | Suppresses in-session feedback survey prompts regardless of timing conditions. |
| `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | boolean | Disables file-state snapshot tracking, preventing undo/restore for file edits. |
| `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` | boolean | Prevents automatic installation of plugins from the official marketplace on startup. |
| `CLAUDE_CODE_DISABLE_POLICY_SKILLS` | boolean | Skips loading admin/org-managed policy skills from policySettings directories. |
| `CLAUDE_CODE_ENABLE_BACKGROUND_PLUGIN_REFRESH` | boolean | Triggers a plugin reload in the background after an install completes, instead of blocking. |
| `CLAUDE_CODE_ENABLE_CFC` | boolean | Enables Claude-in-Chrome (CFC) mode, overriding the config-file default. |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | boolean | Enables eager input streaming on tool calls, sending partial inputs before completion. |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | boolean | Controls AI-generated next-prompt suggestions; overrides the GrowthBook feature flag. |
| `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING` | boolean | Enables file-state checkpointing in SDK (headless) mode, where it is otherwise off. |
| `CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT` | boolean | Appends a token-usage block to every message, showing used/total/remaining counts. |
| `CLAUDE_CODE_ENABLE_XAA` | boolean | Enables XAA (external agent authentication) OIDC flow for MCP server OAuth. |
| `CLAUDE_CODE_EXTRA_BODY` | text | Merges a JSON object into every API request body, enabling unsupported API fields. |
| `CLAUDE_CODE_EXTRA_METADATA` | text | Injects custom JSON fields into the metadata object sent with every API request. |
| `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` | number | Caps the number of tool calls that execute in parallel per turn; defaults to 10. |
| `CLAUDE_CODE_MCP_ALLOWLIST_ENV` | boolean | Passes the full host environment to MCP servers instead of a scrubbed subset. |
| `CLAUDE_CODE_MCP_SERVER_NAME` | text | Set internally by the CLI and passed to headersHelper subprocesses as the current MCP server name. |
| `CLAUDE_CODE_MCP_SERVER_URL` | text | Set internally by the CLI and passed to headersHelper subprocesses as the current MCP server URL. |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | text | Overrides the directory where downloaded plugin archives are cached. |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | number | Sets the timeout for git clone/pull operations when installing marketplace plugins. |
| `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` | text | Forces plugin Git clones to use HTTPS instead of SSH. |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | text | Adds colon-delimited directories as local plugin seed sources, bypassing marketplace downloads. |
| `CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE` | boolean | Switches plugin storage to a ZIP-based cache, enabling faster cold installs. |
| `CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V` | text | Set internally when spawning bridge sessions to select the v2 POST-based ingress transport. |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | boolean | Enables environment-variable scrubbing and bubblewrap isolation for all subprocesses. |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | boolean | Forces synchronous plugin installation, blocking the first prompt until all plugins load. |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS` | number | Caps how long synchronous plugin installation may block before being aborted. |

## Networking & Proxy

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_CERT_STORE` | text | Specifies CA certificate sources (comma-separated 'bundled' and/or 'system') for TLS validation. |
| `CLAUDE_CODE_CLIENT_CERT` | text | Loads a PEM client certificate from the given path to enable mTLS for outbound API requests. |
| `CLAUDE_CODE_CLIENT_KEY` | text | Loads a PEM private key from the given path to pair with the mTLS client certificate. |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | text | Supplies the passphrase to decrypt an encrypted mTLS client private key. |
| `CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER` | boolean | Activates the proxy auth helper subprocess that fetches credentials on demand; requires value '1'. |
| `CLAUDE_CODE_HOST_HTTP_PROXY_PORT` | number | Sets the HTTP proxy port forwarded into the sandbox environment for host network access. |
| `CLAUDE_CODE_HOST_SOCKS_PROXY_PORT` | number | Sets the SOCKS proxy port forwarded into the sandbox environment for host network access. |
| `CLAUDE_CODE_HTTP_PROXY` | text | Fallback HTTP proxy URL used when HTTP_PROXY/http_proxy are unset, and propagated to subprocess tooling (npm, Yarn, Docker, JVM). |
| `CLAUDE_CODE_HTTPS_PROXY` | text | Fallback HTTPS proxy URL used when HTTPS_PROXY/https_proxy are unset, and propagated to subprocess tooling (npm, Yarn, Docker, JVM). |
| `CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS` | number | Controls how long (ms) proxy auth credentials are cached before the helper subprocess is re-invoked. |
| `CLAUDE_CODE_PROXY_AUTHENTICATE` | text | Passes an authentication credential into the proxy auth helper subprocess as an environment variable. |
| `CLAUDE_CODE_PROXY_HOST` | text | Forwards the proxy hostname to the auth helper subprocess; auto-derived from CLAUDE_CODE_PROXY_URL when unset. |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | boolean | Delegates DNS resolution to the proxy agent, bypassing local resolver for outbound requests. |
| `CLAUDE_CODE_PROXY_URL` | text | Reroutes all outbound API traffic through the specified proxy server URL. |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | boolean | Bypasses AWS Bedrock credential resolution, allowing unauthenticated or pre-signed requests. |
| `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS` | boolean | Suppresses the fast-mode unavailable warning when the status check returns a network error. |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | boolean | Bypasses Azure AD token acquisition for Microsoft Foundry, skipping DefaultAzureCredential flow. |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | boolean | Bypasses AWS credential resolution for the Amazon Bedrock Mantle endpoint. |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | boolean | Bypasses Google Cloud application-default credential acquisition for Vertex AI. |

## Output & Display

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ACCESSIBILITY` | boolean | Enables accessibility mode, suppressing animated TUI elements for screen-reader compatibility. |
| `CLAUDE_CODE_BRIEF` | boolean | Activates brief-only display mode, collapsing long assistant responses to head+tail summaries. |
| `CLAUDE_CODE_BRIEF_UPLOAD` | boolean | Routes file attachment uploads through the compact REPL bridge path instead of the standard uploader. |
| `CLAUDE_CODE_BS_AS_CTRL_BACKSPACE` | text | TUI input tweak: maps a plain Backspace keypress to Ctrl+Backspace (delete-previous-word) in the prompt editor. Intended for terminals — notably mintty/cygwin on Windows — that can't distinguish the two key events, letting word-delete work without a custom keymap. |
| `CLAUDE_CODE_COMMIT_LOG` | text | Enables React render commit timing logs to the specified path, for UI performance profiling. |
| `CLAUDE_CODE_DECSTBM` | text | Gates the DECSTBM (VT 'Set Top and Bottom Margins' / scroll-region) fast path in the new marlin_porch TUI renderer. When enabled, the renderer uses scroll-region escapes for partial screen updates instead of full redraws; when gated, it falls back to the safe redraw path. Emits 'DECSTBM: enabled' or 'DECSTBM: gated' at startup based on terminal capability probing. |
| `CLAUDE_CODE_DISABLE_MOUSE` | boolean | Disables mouse event handling in the terminal UI, preventing click and scroll capture. |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | boolean | Prevents Claude Code from updating the terminal window or tab title during sessions. |
| `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL` | boolean | Disables virtualised transcript rendering, forcing all messages to render simultaneously. |
| `CLAUDE_CODE_EAGER_FLUSH` | boolean | Forces immediate stdout flush after each response chunk, useful for piped or cowork sessions. |
| `CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER` | boolean | Exits the process immediately after the first UI render cycle completes, for startup testing. |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | number | Auto-exits the CLI after the specified idle milliseconds following the last response stop. |
| `CLAUDE_CODE_FORCE_FULL_LOGO` | boolean | Forces the full ASCII logo to render regardless of terminal width or context. |
| `CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL` | boolean | Forces the fullscreen-mode upsell prompt regardless of seen-count or feature-flag gate. |
| `CLAUDE_CODE_NO_FLICKER` | boolean | Enables the flicker-free alt-screen renderer, overriding tmux/iTerm2 detection that would disable it. |
| `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` | text | Sets question preview rendering format to markdown or html, overriding per-entrypoint defaults. |
| `CLAUDE_CODE_SCROLL_SPEED` | number | Overrides terminal scroll speed multiplier; capped at 20, defaults to 1 (3 on Windows). |
| `CLAUDE_CODE_SIMPLE` | boolean | Enables bare/minimal output mode, suppressing decorations and disabling auto-memory. |
| `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT` | text | Swaps the full system prompt for a minimal identity-only prompt, dropping all dynamic sections (alias of CLAUDE_CODE_SIMPLE). |
| `CLAUDE_CODE_SYNTAX_HIGHLIGHT` | boolean | Controls syntax highlighting for code blocks; set to falsy to disable, or a BAT theme name to override. |

## Planning & Tasks

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE` | number | Overrides the token count at which the CLI blocks and refuses further turns. |
| `CLAUDE_CODE_ENABLE_TASKS` | boolean | Forces the task-tracking system on, bypassing the feature-flag gate. |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | boolean | Enables multi-agent team spawning; multiplies token usage proportionally to team size. |
| `CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE` | boolean | Enables the interview/clarification phase at the start of plan mode, overriding the feature flag. |
| `CLAUDE_CODE_PLAN_MODE_REQUIRED` | boolean | Forces plan mode before any execution, blocking agentic tool use until a plan is approved. |
| `CLAUDE_CODE_PLAN_V` | text | Selects the plan-mode implementation version or variant (e.g. v2). |
| `CLAUDE_CODE_TASK_LIST_ID` | text | Pins the task-list namespace to a specific ID, overriding the team or session default. |

## Provider Routing

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_AWS_API_KEY` | text | API key for the Anthropic-on-AWS platform, bypassing AWS credential chain resolution. |
| `ANTHROPIC_AWS_BASE_URL` | text | Reroutes Anthropic-on-AWS traffic to a custom endpoint, overriding the region-derived default. |
| `ANTHROPIC_AWS_WORKSPACE_ID` | text | Required workspace ID sent as the anthropic-workspace-id header for Anthropic-on-AWS requests. |
| `ANTHROPIC_BEDROCK_BASE_URL` | text | Reroutes AWS Bedrock traffic to a custom endpoint, overriding the region-derived default. |
| `ANTHROPIC_BEDROCK_MANTLE_API_KEY` | text | API key for the Amazon Bedrock Mantle managed-access backend. |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | text | Reroutes Bedrock Mantle traffic to a custom endpoint, overriding the region-derived default. |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | text | Sets the AWS Bedrock service tier header for capacity and priority routing. |
| `ANTHROPIC_FOUNDRY_API_KEY` | text | API key for Microsoft Azure Foundry; mutually exclusive with Azure AD token provider. |
| `ANTHROPIC_FOUNDRY_AUTH_TOKEN` | text | Auth token for Microsoft Azure Foundry client construction. |
| `ANTHROPIC_FOUNDRY_BASE_URL` | text | Reroutes Microsoft Azure Foundry traffic to a custom endpoint; required if no resource name is set. |
| `ANTHROPIC_FOUNDRY_RESOURCE` | text | Sets the Azure Foundry resource name, used to construct the base URL when no explicit URL is provided. |
| `ANTHROPIC_VERTEX_BASE_URL` | text | Reroutes Google Vertex AI traffic to a custom endpoint, overriding the region-derived default. |
| `ANTHROPIC_VERTEX_PROJECT_ID` | text | Specifies the GCP project for Vertex AI when no GCLOUD_PROJECT env var is present. |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | boolean | Signals that the host environment manages provider config, stripping auth env vars from subprocesses. |
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | boolean | Routes all API calls through Anthropic's AWS platform (distinct from native Bedrock). |
| `CLAUDE_CODE_USE_BEDROCK` | boolean | Routes all API calls through AWS Bedrock, disabling first-party error reporting. |
| `CLAUDE_CODE_USE_CCR_V` | text | Selects the CCR transport version (e.g. v2 switches to SSE-based streaming over WebSocket). |
| `CLAUDE_CODE_USE_FOUNDRY` | boolean | Routes all API calls through Microsoft Azure Foundry, disabling first-party error reporting. |
| `CLAUDE_CODE_USE_MANTLE` | boolean | Routes all API calls through Bedrock Mantle managed-access layer. |
| `CLAUDE_CODE_USE_VERTEX` | boolean | Routes all API calls through Google Vertex AI, disabling first-party error reporting. |

## Remote & Containers

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_CONTAINER_ID` | text | Sets the container ID forwarded as the x-claude-remote-container-id request header. |
| `CLAUDE_CODE_ENVIRONMENT_KIND` | select | Declares the environment type (e.g. bridge, byoc, anthropic_cloud), affecting transport and control-flow. |
| `CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION` | text | Forwards a runner version string as the x-environment-runner-version header on remote connections. |
| `CLAUDE_CODE_HOST_PLATFORM` | text | Overrides the detected host OS platform (win32, darwin, linux) for environment fingerprinting. |
| `CLAUDE_CODE_REMOTE` | boolean | Marks the session as remote, enabling disk persistence of credentials for subprocess access. |
| `CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE` | text | Forwards the remote environment type in telemetry and enables brief-upload mode for attachments. |
| `CLAUDE_CODE_REMOTE_SEND_KEEPALIVES` | boolean | Enables periodic keepalive heartbeats on the remote session connection to prevent idle disconnects. |
| `CLAUDE_CODE_REMOTE_SESSION_ID` | text | Sets the remote session ID forwarded as the x-claude-remote-session-id request header. |
| `CLAUDE_CODE_REMOTE_SETTINGS_PATH` | text | Overrides remote settings with a local file path, bypassing the settings API fetch. |
| `CLAUDE_CODE_WORKSPACE_HOST_PATHS` | text | Pipe-separated host path mappings attached to telemetry events as workspace.host_paths. |

## Sandbox & Security

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ADDITIONAL_PROTECTION` | boolean | Adds the x-anthropic-additional-protection header to all API requests for enhanced server-side checks. |
| `CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR` | boolean | Renames the Bash tool to SandboxedBash in the UI when sandbox mode is active. |
| `CLAUDE_CODE_BUBBLEWRAP` | text | Enables Bubblewrap sandbox isolation on Linux, blocking root bypass of permission checks. |
| `CLAUDE_CODE_FORCE_SANDBOX` | boolean | Forces sandbox mode on for bridge/remote sessions regardless of the sandbox option passed. |

## Search & File System

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | number | Caps the token output from file-read operations. Default 25,000. |
| `CLAUDE_CODE_GLOB_HIDDEN` | boolean | Forces glob searches to include dotfiles and hidden directories. |
| `CLAUDE_CODE_GLOB_NO_IGNORE` | boolean | Bypasses .gitignore rules during glob file searches. |
| `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS` | number | Overrides the default ripgrep glob timeout in seconds. |

## Session & Lifecycle

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ACTION` | text | Signals that Claude Code is running as a GitHub Actions workflow step. |
| `CLAUDE_CODE_DONT_INHERIT_ENV` | boolean | Strips the parent shell's environment variables from subprocess execution. |
| `CLAUDE_CODE_ENTRYPOINT` | select | Identifies the launch surface (cli, sdk-cli, mcp, claude-desktop) used in version strings and telemetry. |
| `CLAUDE_CODE_GIT_BASH_PATH` | text | Overrides the auto-detected Git Bash executable path on Windows. |
| `CLAUDE_CODE_MAX_RETRIES` | number | Overrides the default maximum retry count for failed Anthropic API calls. |
| `CLAUDE_CODE_NEW_INIT` | boolean | Switches the /init command to generate multiple scoped CLAUDE.md files instead of one. |
| `CLAUDE_CODE_PERFORCE_MODE` | boolean | Enables Perforce VCS mode, injecting p4 checkout instructions into the system context. |
| `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` 🆕 | text | Prevents bypassing Windows PowerShell execution policy when running commands. |
| `CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS` | number | Overrides the timeout for PowerShell command parsing and result classification. |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | number | Caps the maximum wait time for session-end hooks before the process exits. |
| `CLAUDE_CODE_SHELL` | text | Forces Claude Code to use a specific bash or zsh binary instead of auto-detecting. |
| `CLAUDE_CODE_SHELL_PREFIX` | text | Prepends a custom command string before every shell invocation, including MCP stdio servers. |
| `CLAUDE_CODE_TMPDIR` | text | Overrides the temporary directory used for prompt files and shell snapshots. |

## Teams & Collaboration

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_BASE_REF` | text | Sets the git ref used as the merge-base for diff and PR review operations. |
| `CLAUDE_CODE_BASE_REFS` | text | Provides a map of repo-path → base-ref pairs for multi-checkout diff operations. |
| `CLAUDE_CODE_IS_COWORK` | boolean | Enables cowork collaboration mode, triggering eager cache flushes and shared settings. |
| `CLAUDE_CODE_SSE_PORT` | number | Pins the IDE SSE port used for auto-connecting to a running editor extension. |
| `CLAUDE_CODE_TEAM_ONBOARDING` | boolean | Controls team onboarding UI mode; accepts "banner" or "step" to activate the onboarding flow. |
| `CLAUDE_CODE_TEAMMATE_COMMAND` | text | Overrides the shell command used to spawn teammate sub-agents in a swarm. |
| `CLAUDE_CODE_USE_COWORK_PLUGINS` | boolean | Switches the plugin and settings file paths to the cowork-specific variants. |
| `CLAUDE_CODE_WORKER_EPOCH` | text | Supplies the worker epoch integer required to register a CCR bridge worker session. |

## Telemetry & Observability

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_BYOC_ENABLE_DATADOG` | boolean | Enables Datadog telemetry in BYOC environment mode. |
| `CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS` | number | Overrides the Datadog log-batch flush interval in milliseconds. Default 15,000. |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | boolean | Blocks all non-essential outbound network calls, including telemetry and analytics. |
| `CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS` | boolean | Enables emission of session-state-changed events on the SDK output stream. |
| `CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES` | boolean | Enables tool-use summary emission for SDK consumers tracking tool activity. |
| `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` | boolean | Enables in-session feedback survey events sent via OpenTelemetry. |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | boolean | Activates third-party OpenTelemetry trace and metric export for the session. |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | boolean | Opts into the enhanced beta tracing pipeline alongside ENABLE_ENHANCED_TELEMETRY_BETA. |
| `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` | number | Caps the time allotted for OpenTelemetry to flush all spans before process exit. Default 5,000ms. |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | number | Sets the debounce window for re-executing the OTel headers helper script. |
| `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS` | number | Caps the time allotted for graceful OpenTelemetry provider shutdown. Default 2,000ms. |
| `CLAUDE_CODE_TAGS` | text | Attaches arbitrary tag strings to the session metadata sent with each API request. |

## Terminal Multiplexer

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_TMUX_PREFIX` | text | Records the active tmux prefix key for display in the detach hint UI. |
| `CLAUDE_CODE_TMUX_PREFIX_CONFLICTS` | boolean | Signals that the tmux prefix conflicts with a Claude keybinding, adjusting the detach hint. |
| `CLAUDE_CODE_TMUX_SESSION` | text | Stores the name of the active tmux session for display in the status bar. |
| `CLAUDE_CODE_TMUX_TRUECOLOR` | boolean | Prevents Claude from downgrading color depth to 256 colours inside a tmux session. |

## Uncategorised

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_CONFIG_DIR` | text | Overrides the Anthropic config directory root, bypassing the default XDG_CONFIG_HOME/APPDATA-derived path used to locate profiles and credentials. |
| `ANTHROPIC_FEDERATION_RULE_ID` | text | Sets the OIDC federation rule ID for token exchange; profile-level authentication.federation_rule_id takes precedence. |
| `ANTHROPIC_ORGANIZATION_ID` | text | Pins the organization ID used for OIDC federation auth when config.organization_id is not set in the profile. |
| `ANTHROPIC_SCOPE` | text | Sets the OAuth scope sent during token exchange, used as a fallback when authentication.scope is not defined in the profile. |
| `ANTHROPIC_SERVICE_ACCOUNT_ID` | text | Service account ID exchanged at the OIDC federation token endpoint alongside the identity token to mint an access token. |
| `ANTHROPIC_WEBHOOK_SIGNING_KEY` | text | Webhook secret for verifying incoming Anthropic webhook payload signatures. |
| `ANTHROPIC_WORKSPACE_ID` | text | Scopes OIDC federation authentication to a specific Anthropic workspace. |
| `CLAUDE_CODE_AGENT` | text | Labels the current session with its parent agent name during concurrent-session registration. |
| `CLAUDE_CODE_AGENT_RULE_DISABLED` | text | Bun-runtime sentinel set by the Claude Code binary so that tools the CLI shells out to (Bun, and sibling coding agents like Cursor) recognise an AI agent is driving the session and skip interactive 'agent auto-rule' heuristics. Not a user-tunable feature — set automatically at process start. |
| `CLAUDE_CODE_AGENT_VIEW_RELAUNCH` | text | Internal marker consumed on relaunch to restore agent view state. |
| `CLAUDE_CODE_BENCH_LIVE_COUNTS` | text | Enables live token/turn counters in the terminal UI for benchmarking. |
| `CLAUDE_CODE_CLASSIFIER_SUMMARY` | text | Forces the post-turn classifier into LLM mode when truthy, heuristic when falsy. |
| `CLAUDE_CODE_DAEMON_COLD_START` | text | Overrides daemon cold-start behaviour — accepts 'transient' or 'ask'. |
| `CLAUDE_CODE_DISABLE_AGENT_VIEW` | boolean | Disables the agent view including background daemon and /background command. |
| `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` | boolean | Disables alternate terminal screen buffer, preventing fullscreen TUI mode. |
| `CLAUDE_CODE_FORCE_SYNC_OUTPUT` | boolean | Forces synchronous terminal output rendering, bypassing async buffering. |
| `CLAUDE_CODE_INVESTIGATE_FIRST` | text | Controls Opus 4.7 investigate-first mode; accepts additive, compact, or on/off. |
| `CLAUDE_CODE_LOOP_PERSISTENT` | text | Enables persistent autonomous loop mode, continuing across blocked decisions. |
| `CLAUDE_CODE_MAX_TURNS` | number | Caps the maximum number of agentic turns before the session halts. |
| `CLAUDE_CODE_MID_CONVERSATION_SYSTEM` | text | Specifies a model name substring to enable mid-conversation system prompt injection. |
| `CLAUDE_CODE_NATIVE_CURSOR` | text | Enables native terminal cursor when accessibility mode is not already active. |
| `CLAUDE_CODE_OPUS_` | text | Selects Opus 4.6 fast-mode override; trailing underscore indicates version suffix variant. |
| `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` | text | Enables automatic Claude Code self-update via Homebrew or winget. |
| `CLAUDE_CODE_PROACTIVE` | text | Enables Kairos proactive/assistant mode for idle-triggered suggestions. |
| `CLAUDE_CODE_RATE_LIMIT_TIER` | text | Pins the OAuth rate-limit tier passed to forked background sessions. |
| `CLAUDE_CODE_REPL` | text | Forces REPL mode on or off, overriding the GrowthBook feature-flag default. |
| `CLAUDE_CODE_RETRY_WATCHDOG` | text | Enables a retry watchdog on Linux remote entrypoints that forces retries on ECONNRESET/EPIPE and other transient network errors. |
| `CLAUDE_CODE_SESSION_ID` | text | Internal session identifier propagated to child processes for telemetry. |
| `CLAUDE_CODE_SESSION_KIND` | text | Marks the session as 'bg', 'daemon', or 'daemon-worker' for forked children. |
| `CLAUDE_CODE_SESSION_LOG` | text | Path to the per-session log file; set when forking background sessions. |
| `CLAUDE_CODE_SESSION_NAME` | text | Human-readable name attached to a forked background session. |
| `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` 🆕 | text | Raises the maximum number of times a stop hook can block turn completion. |
| `CLAUDE_CODE_SUBSCRIPTION_TYPE` | text | Pins the OAuth subscription tier passed to forked background sessions. |
| `CLAUDE_CODE_SUPERVISED` | text | Marks session as supervised, causing clean exit on uncaught exceptions. |
| `CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE` | text | Overrides the remote-mode system prompt via a GrowthBook feature-flag key. |
| `CLAUDE_CODE_TEE_SDK_STDOUT` | text | Mirrors SDK bridge stdout to stderr for debugging in bridge environment mode. |
| `CLAUDE_CODE_TEST_FIXTURES_ROOT` | text | Points the VCR fixture loader to a custom root directory for test recordings. |
| `CLAUDE_CODE_TUI_JUST_SWITCHED` | text | Internal marker set by the CLI when relaunching into a new TUI mode such as fullscreen. |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | boolean | Enables the PowerShell tool as a Bash alternative; auto-enabled on Windows if no deny rule exists. |
| `CLAUDE_CODE_VERIFY_PROMPT` | text | Arms an experimental verify-prompt pass that re-checks the model's response. |
| `CLAUDE_CODE_VERSION` | text | Exposes the current CLI version string to policy helper subprocesses. |
| `CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED` | text | Enables typed interim transcription results from the voice stream connection. |

## Deprecated

These flags were present in earlier versions but have been removed.

| Flag | Removed in |
|------|------------|
| `CLAUDE_CODE_AGENT_COST_STEER` | 2.1.143 |
| `CLAUDE_CODE_AGENT_NAME` | 2.1.143 |
| `CLAUDE_CODE_DISABLE_AGENTS_FLEET` | 2.1.143 |
| `CLAUDE_CODE_ENABLE_OPUS_` | 2.1.143 |
| `CLAUDE_CODE_TEAM_NAME` | 2.1.143 |
| `CLAUDE_CODE_USE_NATIVE_FILE_SEARCH` | 2.1.143 |

---

*This file is auto-generated from [`flags/manifest.json`](flags/manifest.json) by [`scripts/generate-readme.js`](scripts/generate-readme.js). Do not edit manually.*
