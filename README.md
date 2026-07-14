# TokenBlast

Interactive config generator for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) environment flags. Find your preferred balance of cost, tokens, and thinking.

**[www.tokenblast.cc](https://www.tokenblast.cc)**

Generated from Claude Code **v2.1.209** — 443 flags across 18 categories.

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
| `CLAUDE_CODE_AUTH_FAIL_EXIT_MS` | number | Forces remote child sessions to exit after sustained auth failure; default ten minutes. |
| `CLAUDE_CODE_CUSTOM_OAUTH_URL` | text | Overrides the OAuth base URL to an approved custom endpoint for non-production auth flows. |
| `CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID` | text | Overrides the registered OAuth client id used for Claude Design login. |
| `CLAUDE_CODE_HFI_BEARER_TOKEN` | text | Authenticates requests to the Human Feedback Interface service via bearer token. |
| `CLAUDE_CODE_HOST_AUTH_ENV_VAR` | text | Names the environment variable holding the host authentication token. |
| `CLAUDE_CODE_HOST_AUTH_REFRESH_TIMEOUT_MS` | number | Controls how long to wait for a host auth token refresh before timing out. |
| `CLAUDE_CODE_OAUTH_` | text | Overrides OAuth credentials (token, client ID, scopes) used for authentication. |
| `CLAUDE_CODE_OAUTH_CLIENT_ID` | text | Overrides the default OAuth client ID used during the authorization code flow. |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | text | Seeds an OAuth refresh token directly, skipping the interactive browser login step. |
| `CLAUDE_CODE_OAUTH_SCOPES` | text | Declares space-separated OAuth scopes required when bootstrapping via a refresh token. |
| `CLAUDE_CODE_OAUTH_TOKEN` | text | Provides a pre-issued OAuth access token, bypassing device-flow login entirely. |
| `CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR` | text | Reads the OAuth access token from a file descriptor for secure secret injection. |
| `CLAUDE_CODE_ORGANIZATION_UUID` | text | Pins requests to a specific organization UUID, bypassing the profile-fetch lookup. |
| `CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH` | text | Signals that the embedding SDK provides a host auth token refresh callback. |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | text | Provides a session-scoped access token used by remote/bridge entrypoints instead of OAuth. |
| `CLAUDE_CODE_USER_EMAIL` | text | Injects user email to pre-populate OAuth session alongside account UUID and org UUID. |
| `CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR` | text | Reads the WebSocket session ingress token from a file descriptor for remote mode auth. |

## Context & Memory

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | text | Adds extra directories to scan for CLAUDE.md and rules files, expanding the system-prompt context. |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | number | Token threshold for auto-compaction. Lower = more aggressive compaction. |
| `CLAUDE_CODE_AUTO_MODE_PRIOR_ASSISTANT_CONTEXT` | text | Includes prior assistant turns in auto-mode permission evaluation. |
| `CLAUDE_CODE_AUTO_MODE_SIBLING_CONTEXT` | text | Shares same-turn sibling agent context during auto-mode permission decisions. |
| `CLAUDE_CODE_COLD_COMPACT` | text | Forces a cold compaction run regardless of current context fill level. |
| `CLAUDE_CODE_COORDINATOR_PROPAGATE_NESTED_MEMORY` | text | Propagates nested CLAUDE.md files loaded by subagents into the coordinator's context. |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | boolean | Disables automatic memory reads and writes, removing memory content from each turn's context. |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | boolean | Strips all CLAUDE.md file content from the system prompt entirely. |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | boolean | Strips built-in git workflow instructions from the system prompt. |
| `CLAUDE_CODE_DISABLE_MEMORY_BULK_INFLATE` | boolean | Disables bulk pre-loading of memory entries into context, reducing upfront token usage. |
| `CLAUDE_CODE_DISABLE_MEMORY_PERIODIC_RESYNC` | boolean | Disables the periodic background resync of the on-disk memory store. |
| `CLAUDE_CODE_DISABLE_NESTED_CHAIN_IDLE` | boolean | Disables idle-state tracking for nested agent chains blocked on user input. |
| `CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP` | boolean | Forces the full compaction pipeline, disabling the fast-path short-circuit for large contexts. |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | boolean | Enables an idle-return summary notification when resuming after an away period. |
| `CLAUDE_CODE_FORCE_EVALUATE_MEMORY` | boolean | Forces memory evaluation on every turn, bypassing normal trigger conditions. |
| `CLAUDE_CODE_FORCE_MEMORY_SURVEY` | boolean | Forces the memory-save survey to appear regardless of normal eligibility checks. |
| `CLAUDE_CODE_IDLE_THRESHOLD_MINUTES` | number | Controls the inactivity window (in minutes) before idle-state detection fires. Default 75. |
| `CLAUDE_CODE_IDLE_TOKEN_THRESHOLD` | number | Sets the minimum context token count required before idle-state detection activates. Default 100000. |
| `CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES` | boolean | Includes incomplete in-flight messages in the context window during streaming. |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | number | Overrides the model context window size, active only when DISABLE_COMPACT is also set. |
| `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` | number | Caps silent MCP tool runtime in milliseconds; 0 disables the timeout. |
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
| `CLAUDE_CODE_FRAME_TIMING_SAMPLE_EVERY` | text | Samples every Nth frame when frame-timing logging is enabled. |
| `CLAUDE_CODE_PERFETTO_TRACE` | boolean | Enables Perfetto-format performance tracing for agent process and thread activity. |
| `CLAUDE_CODE_PERFETTO_WRITE_INTERVAL_S` | number | Controls the flush interval in seconds for Perfetto performance trace output. |
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
| `CLAUDE_CODE_HIDE_SETTINGS_HINT` | text | Hides the settings hint from the startup interface. |
| `CLAUDE_CODE_IDE_HOST_OVERRIDE` | text | Overrides the IDE host address, bypassing WSL gateway detection entirely. |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | boolean | Prevents automatic IDE extension installation on startup. |
| `CLAUDE_CODE_IDE_SKIP_VALID_CHECK` | boolean | Skips workspace-folder validation when discovering IDE connections. |
| `CLAUDE_CODE_OVERRIDE_DATE` | text | Overrides the current date used by the CLI, enabling time-dependent behaviour testing. |

## Model & Effort

| Flag | Type | Description |
|------|------|-------------|
| `ANTHROPIC_BETAS` | text | Appends comma-separated beta feature identifiers to every API request's beta header. |
| `ANTHROPIC_CUSTOM_HEADERS` | text | Injects newline-delimited HTTP headers into every Anthropic API request. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | text | Adds a custom model ID to the CLI model picker as a selectable option. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` | text | Sets the picker description string shown for the custom model option. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | text | Sets the display label shown for the custom model in the CLI model picker. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` | text | Declares a comma-separated capability list for the custom model, enabling feature routing. |
| `ANTHROPIC_DEFAULT_FABLE_MODEL` | text | Overrides the model ID used for the Fable model tier. |
| `ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION` | text | Overrides model-picker description text for a custom Fable model. |
| `ANTHROPIC_DEFAULT_FABLE_MODEL_NAME` | text | Overrides the display label shown for a custom Fable model in the picker. |
| `ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES` | text | Declares supported capabilities for a custom Fable model override. |
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
| `CLAUDE_CODE_AUTO_MODE_MODEL` | text | Overrides the model used when Claude Code operates in auto mode. |
| `CLAUDE_CODE_BG_CLASSIFIER_MODEL` | text | Overrides the model used for background intent-classification inference. |
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
| `CLAUDE_CODE_SUBAGENT_CACHE_EVICT` | text | Forces prompt-cache eviction for completed subagent transcripts. |
| `CLAUDE_CODE_SUBAGENT_MODEL` | select | Overrides the model used for all subagent Task calls; set to 'haiku' or 'sonnet' to reduce cost. |

## MCP, Plugins & Features

| Flag | Type | Description |
|------|------|-------------|
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
| `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` | number | Controls how long MCP tool calls run before auto-backgrounding, in milliseconds. |
| `CLAUDE_CODE_MCP_SERVER_NAME` | text | Set internally by the CLI and passed to headersHelper subprocesses as the current MCP server name. |
| `CLAUDE_CODE_MCP_SERVER_URL` | text | Set internally by the CLI and passed to headersHelper subprocesses as the current MCP server URL. |
| `CLAUDE_CODE_PLUGIN_BINARY_ASSETS` | text | Enables downloading platform-specific binary assets bundled with plugins. |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | text | Overrides the directory where downloaded plugin archives are cached. |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | number | Sets the timeout for git clone/pull operations when installing marketplace plugins. |
| `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` | text | Forces plugin Git clones to use HTTPS instead of SSH. |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | text | Adds colon-delimited directories as local plugin seed sources, bypassing marketplace downloads. |
| `CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE` | boolean | Switches plugin storage to a ZIP-based cache, enabling faster cold installs. |
| `CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V` | text | Set internally when spawning bridge sessions to select the v2 POST-based ingress transport. |
| `CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS` | boolean | Skips plugin MCP server discovery, dropping their tool schemas. |
| `CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS_EXCEPT` | boolean | Exempts named plugins when plugin MCP server loading is skipped. |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | boolean | Enables environment-variable scrubbing and bubblewrap isolation for all subprocesses. |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | boolean | Forces synchronous plugin installation, blocking the first prompt until all plugins load. |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS` | number | Caps how long synchronous plugin installation may block before being aborted. |
| `CLAUDE_CODE_SYNC_PLUGINS` | text | Controls which plugins are synced synchronously at startup, alongside install and MCP timeout settings. |
| `CLAUDE_CODE_SYNC_PLUGINS_BUFFERED_DOWNLOAD` | text | Forces plugin sync downloads to buffer fully instead of streaming. |
| `CLAUDE_CODE_SYNC_PLUGINS_DOWNLOAD_STALL_MS` | number | Overrides the stall timeout for synced plugin downloads, in milliseconds. |
| `CLAUDE_CODE_SYNC_PLUGINS_INSTALL_TIMEOUT_MS` | number | Caps the millisecond timeout for plugin package installation during sync. |
| `CLAUDE_CODE_SYNC_PLUGINS_MCP_TIMEOUT_MS` | number | Caps the millisecond timeout for MCP server startup during plugin sync. |
| `CLAUDE_CODE_TERMINAL_MCP_TOOLS` | text | Designates MCP tools whose text input streams to the interactive terminal. |

## Networking & Proxy

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_AGENT_PROXY_GH_SHIM` | text | Enables a gh CLI shim routing GitHub calls through the agent proxy. |
| `CLAUDE_CODE_AGENT_PROXY_GIT_CONFIG` | text | Appends governed agent-proxy settings to git configuration. |
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
| `CLAUDE_CODE_WEBFETCH_USE_CCR_PROXY` | text | Reroutes WebFetch traffic through the Claude Code Remote proxy. |
| `CLAUDE_CODE_WEBSEARCH_USE_CCR_PROXY` | text | Reroutes WebSearch traffic through the Claude Code Remote agent proxy. |

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
| `CLAUDE_CODE_ENABLE_MORNING_BRIEF` | boolean | Enables a morning brief summary generated at session start. |
| `CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER` | boolean | Exits the process immediately after the first UI render cycle completes, for startup testing. |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | number | Auto-exits the CLI after the specified idle milliseconds following the last response stop. |
| `CLAUDE_CODE_FORCE_FULL_LOGO` | boolean | Forces the full ASCII logo to render regardless of terminal width or context. |
| `CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL` | boolean | Forces the fullscreen-mode upsell prompt regardless of seen-count or feature-flag gate. |
| `CLAUDE_CODE_MORNING_BRIEF_PROMPT` | text | Overrides the prompt used for scheduled morning brief sessions. |
| `CLAUDE_CODE_NO_FLICKER` | boolean | Enables the flicker-free alt-screen renderer, overriding tmux/iTerm2 detection that would disable it. |
| `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT` | text | Sets question preview rendering format to markdown or html, overriding per-entrypoint defaults. |
| `CLAUDE_CODE_RELAUNCH_TERMINAL_SIZE` | text | Internal marker preserving terminal dimensions across CLI relaunch. |
| `CLAUDE_CODE_SCROLL_SPEED` | number | Overrides terminal scroll speed multiplier; capped at 20, defaults to 1 (3 on Windows). |
| `CLAUDE_CODE_SIMPLE` | boolean | Enables bare/minimal output mode, suppressing decorations and disabling auto-memory. |
| `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT` | text | Swaps the full system prompt for a minimal identity-only prompt, dropping all dynamic sections (alias of CLAUDE_CODE_SIMPLE). |
| `CLAUDE_CODE_SYNTAX_HIGHLIGHT` | boolean | Controls syntax highlighting for code blocks; set to falsy to disable, or a BAT theme name to override. |
| `CLAUDE_CODE_TERMINAL_RECORDING` | text | Enables terminal session recording to a file for replay or audit. |

## Planning & Tasks

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_BG_TASKS_REPORT_RUNNING` | text | Reports sessions with running background tasks or teammates as still active. |
| `CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE` | number | Overrides the token count at which the CLI blocks and refuses further turns. |
| `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS` | boolean | Disables built-in Explore and Plan subagents, forcing inline exploration instead. |
| `CLAUDE_CODE_ENABLE_TASKS` | boolean | Forces the task-tracking system on, bypassing the feature-flag gate. |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | boolean | Enables multi-agent team spawning; multiplies token usage proportionally to team size. |
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
| `ANTHROPIC_FOUNDRY_BASE_URL` | text | Reroutes Microsoft Azure Foundry traffic to a custom endpoint; required if no resource name is set. |
| `ANTHROPIC_FOUNDRY_RESOURCE` | text | Sets the Azure Foundry resource name, used to construct the base URL when no explicit URL is provided. |
| `ANTHROPIC_VERTEX_BASE_URL` | text | Reroutes Google Vertex AI traffic to a custom endpoint, overriding the region-derived default. |
| `ANTHROPIC_VERTEX_PROJECT_ID` | text | Specifies the GCP project for Vertex AI when no GCLOUD_PROJECT env var is present. |
| `CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD` 🆕 | boolean | — |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | boolean | Signals that the host environment manages provider config, stripping auth env vars from subprocesses. |
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | boolean | Routes all API calls through Anthropic's AWS platform (distinct from native Bedrock). |
| `CLAUDE_CODE_USE_BEDROCK` | boolean | Routes all API calls through AWS Bedrock, disabling first-party error reporting. |
| `CLAUDE_CODE_USE_FOUNDRY` | boolean | Routes all API calls through Microsoft Azure Foundry, disabling first-party error reporting. |
| `CLAUDE_CODE_USE_MANTLE` | boolean | Routes all API calls through Bedrock Mantle managed-access layer. |
| `CLAUDE_CODE_USE_VERTEX` | boolean | Routes all API calls through Google Vertex AI, disabling first-party error reporting. |

## Remote & Containers

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_CONTAINER_ID` | text | Sets the container ID forwarded as the x-claude-remote-container-id request header. |
| `CLAUDE_CODE_ENABLE_REMOTE_RECAP` | boolean | Enables recap generation for remote (CCR) Claude Code sessions. |
| `CLAUDE_CODE_ENVIRONMENT_KIND` | select | Declares the environment type (e.g. bridge, byoc, anthropic_cloud), affecting transport and control-flow. |
| `CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION` | text | Forwards a runner version string as the x-environment-runner-version header on remote connections. |
| `CLAUDE_CODE_HOST_PLATFORM` | text | Overrides the detected host OS platform (win32, darwin, linux) for environment fingerprinting. |
| `CLAUDE_CODE_MOCK_REMOTE_SETTINGS` | text | Injects mock remote-settings payload, bypassing live remote-config fetch. |
| `CLAUDE_CODE_REMOTE` | boolean | Marks the session as remote, enabling disk persistence of credentials for subprocess access. |
| `CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE` | text | Forwards the remote environment type in telemetry and enables brief-upload mode for attachments. |
| `CLAUDE_CODE_REMOTE_HERMETIC_MODE` | text | Restricts remote sessions to SDK MCP servers, dropping external ones. |
| `CLAUDE_CODE_REMOTE_RAW_EVENTS_FILE` | text | Redirects raw remote-container events to a file path for offline inspection. |
| `CLAUDE_CODE_REMOTE_SEND_KEEPALIVES` | boolean | Enables periodic keepalive heartbeats on the remote session connection to prevent idle disconnects. |
| `CLAUDE_CODE_REMOTE_SESSION_ID` | text | Sets the remote session ID forwarded as the x-claude-remote-session-id request header. |
| `CLAUDE_CODE_REMOTE_SETTINGS_PATH` | text | Overrides remote settings with a local file path, bypassing the settings API fetch. |
| `CLAUDE_CODE_REMOTE_SETTINGS_POLL_MS` | number | Controls polling interval in milliseconds for remote-settings refresh. |
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
| `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP` | boolean | Disables killing idle background shells under memory pressure. |
| `CLAUDE_CODE_DONT_INHERIT_ENV` | boolean | Strips the parent shell's environment variables from subprocess execution. |
| `CLAUDE_CODE_ENTRYPOINT` | select | Identifies the launch surface (cli, sdk-cli, mcp, claude-desktop) used in version strings and telemetry. |
| `CLAUDE_CODE_GIT_BASH_PATH` | text | Overrides the auto-detected Git Bash executable path on Windows. |
| `CLAUDE_CODE_MAX_RETRIES` | number | Overrides the default maximum retry count for failed Anthropic API calls. |
| `CLAUDE_CODE_NEW_INIT` | boolean | Switches the /init command to generate multiple scoped CLAUDE.md files instead of one. |
| `CLAUDE_CODE_PERFORCE_MODE` | boolean | Enables Perforce VCS mode, injecting p4 checkout instructions into the system context. |
| `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` | text | Prevents bypassing Windows PowerShell execution policy when running commands. |
| `CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS` | number | Overrides the timeout for PowerShell command parsing and result classification. |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | number | Caps the maximum wait time for session-end hooks before the process exits. |
| `CLAUDE_CODE_SHELL` | text | Forces Claude Code to use a specific bash or zsh binary instead of auto-detecting. |
| `CLAUDE_CODE_SHELL_PREFIX` | text | Prepends a custom command string before every shell invocation, including MCP stdio servers. |
| `CLAUDE_CODE_TEST_NO_GIT_BASH` | text | Disables git-bash detection in tests, simulating a non-git-bash environment. |
| `CLAUDE_CODE_TMPDIR` | text | Overrides the temporary directory used for prompt files and shell snapshots. |

## Teams & Collaboration

| Flag | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_BASE_REF` | text | Sets the git ref used as the merge-base for diff and PR review operations. |
| `CLAUDE_CODE_BASE_REFS` | text | Provides a map of repo-path → base-ref pairs for multi-checkout diff operations. |
| `CLAUDE_CODE_IS_COWORK` | boolean | Enables cowork collaboration mode, triggering eager cache flushes and shared settings. |
| `CLAUDE_CODE_SSE_PORT` | number | Pins the IDE SSE port used for auto-connecting to a running editor extension. |
| `CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS` | number | Caps how long team teardown waits for parked teammates; default ten seconds. |
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
| `CLAUDE_CODE_OTEL_DIAG_STDERR` | text | Enables OpenTelemetry diagnostic logging to stderr for debugging exporters. |
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
| `ANTHROPIC_ENVIRONMENT_ID` | text | Identifies the managed-agents environment; injected into worker containers by the orchestrator. |
| `ANTHROPIC_ENVIRONMENT_KEY` | text | Authentication key for the EnvironmentWorker API, scoped to a specific managed environment. |
| `ANTHROPIC_FEDERATION_RULE_ID` | text | Sets the OIDC federation rule ID for token exchange; profile-level authentication.federation_rule_id takes precedence. |
| `ANTHROPIC_ORGANIZATION_ID` | text | Pins the organization ID used for OIDC federation auth when config.organization_id is not set in the profile. |
| `ANTHROPIC_SCOPE` | text | Sets the OAuth scope sent during token exchange, used as a fallback when authentication.scope is not defined in the profile. |
| `ANTHROPIC_SERVICE_ACCOUNT_ID` | text | Service account ID exchanged at the OIDC federation token endpoint alongside the identity token to mint an access token. |
| `ANTHROPIC_SESSION_ID` | text | Identifies the active session inside a managed-agents worker container. |
| `ANTHROPIC_WEBHOOK_SIGNING_KEY` | text | Webhook secret for verifying incoming Anthropic webhook payload signatures. |
| `ANTHROPIC_WORK_ID` | text | Identifies the work-queue item being processed inside a managed-agents worker container. |
| `ANTHROPIC_WORKSPACE_ID` | text | Scopes OIDC federation authentication to a specific Anthropic workspace. |
| `CLAUDE_CODE_ACT_DONT_REDERIVE` | text | Skips re-deriving the agentic action plan between turns, trading plan freshness for speed. |
| `CLAUDE_CODE_AGENT` | text | Labels the current session with its parent agent name during concurrent-session registration. |
| `CLAUDE_CODE_AGENT_RULE_DISABLED` | text | Bun-runtime sentinel set by the Claude Code binary so that tools the CLI shells out to (Bun, and sibling coding agents like Cursor) recognise an AI agent is driving the session and skip interactive 'agent auto-rule' heuristics. Not a user-tunable feature — set automatically at process start. |
| `CLAUDE_CODE_AGENT_VIEW_RELAUNCH` | text | Internal marker consumed on relaunch to restore agent view state. |
| `CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT` | text | Forces full repaints in alt-screen mode instead of incremental diff-based updates. |
| `CLAUDE_CODE_ALTGR_AS_TEXT` | text | Forces AltGr keypresses to insert literal text instead of shortcuts. |
| `CLAUDE_CODE_ARTIFACT` | text | Enables Artifact publishing support for the current session. |
| `CLAUDE_CODE_ARTIFACT_AUTO_OPEN` | text | Controls automatic browser opening of freshly published artifacts. |
| `CLAUDE_CODE_ARTIFACT_DIRECT_UPLOAD` | text | Forces artifact deploys onto the inline direct-upload path, skipping signed-URL init. |
| `CLAUDE_CODE_ARTIFACTS_API_BASE_URL` | text | Reroutes artifact upload traffic to a custom API endpoint. |
| `CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL` | text | Treats a custom base URL as first-party Anthropic infrastructure. |
| `CLAUDE_CODE_AUTO_BACKGROUND_TIMEOUT_MS` | number | Caps foreground wait before bash commands auto-background; minimum two seconds. |
| `CLAUDE_CODE_AUTO_MODE_CLASSIFY_EDITS` | text | Enables classifier checks catching edits that circumvent deny rules. |
| `CLAUDE_CODE_AUTO_MODE_EDIT_REMOVAL` | text | Overrides the GrowthBook gate controlling auto-mode edit-removal visibility. |
| `CLAUDE_CODE_AUTO_MODE_EDIT_REMOVAL_CAP` | text | Caps how much auto-mode edits may remove before extra visibility triggers. |
| `CLAUDE_CODE_AUTO_MODE_EXTERNAL_PERMISSIONS` | text | Controls which external tool permissions are granted automatically in auto mode. |
| `CLAUDE_CODE_AUTO_MODE_GIT_STATUS` | text | Injects git status into the auto-mode classifier prompt. |
| `CLAUDE_CODE_AUTO_MODE_GIT_STATUS_LIMIT` | text | Caps git-status lines injected into auto-mode context. |
| `CLAUDE_CODE_AUTO_MODE_GIT_STATUS_UPLOADS` | text | Enables uploading git status snapshots in auto mode. |
| `CLAUDE_CODE_AUTO_MODE_OUTCOME_CODES` | text | Overrides the GrowthBook gate controlling auto-mode permission outcome-code visibility. |
| `CLAUDE_CODE_AUTO_MODE_REPO_VISIBILITY` | text | Enables repo visibility lookups when auto mode evaluates permission safety. |
| `CLAUDE_CODE_AUTO_MODE_TEMPERATURE` | text | Overrides sampling temperature for the auto-mode classifier model. |
| `CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS` | number | Caps AWS default-chain credential resolution time; defaults to 60 seconds. |
| `CLAUDE_CODE_BASALT_COVE` | text | Force-enables the experimental basalt_cove per-model prompt behaviour gate. |
| `CLAUDE_CODE_BENCH_LIVE_COUNTS` | text | Enables live token/turn counters in the terminal UI for benchmarking. |
| `CLAUDE_CODE_BRIDGE_SESSION_ID` | text | Set internally to link child processes to their bridge session. |
| `CLAUDE_CODE_CHILD_SESSION` | text | Internal marker identifying tmux child sessions spawned by Claude Code. |
| `CLAUDE_CODE_CLASSIFIER_SUMMARY` | text | Forces the post-turn classifier into LLM mode when truthy, heuristic when falsy. |
| `CLAUDE_CODE_COORDINATOR_EXTRA_TOOLS` | text | Whitelists extra tools past the coordinator agent's tool filter. |
| `CLAUDE_CODE_COORDINATOR_MODE` | text | Switches the instance into coordinator role, loading a multi-agent orchestration system prompt. |
| `CLAUDE_CODE_DAEMON_COLD_START` | text | Overrides daemon cold-start behaviour — accepts 'transient' or 'ask'. |
| `CLAUDE_CODE_DD_ERROR_TRACKING_FLUSH_INTERVAL_MS` | number | Controls the flush interval in milliseconds for Datadog error-tracking batches. |
| `CLAUDE_CODE_DEV_RAW_CHANGELOG_URL` | text | Overrides the raw changelog URL fetched at startup, pointing to a dev endpoint. |
| `CLAUDE_CODE_DISABLE_AGENT_VIEW` | boolean | Disables the agent view including background daemon and /background command. |
| `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` | boolean | Disables alternate terminal screen buffer, preventing fullscreen TUI mode. |
| `CLAUDE_CODE_DISABLE_ARTIFACT` | boolean | Disables the Artifact tool, removing its schema from requests. |
| `CLAUDE_CODE_DISABLE_BG_EXIT_HANDOFF` | boolean | Disables handing off running background tasks when exiting. |
| `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` | boolean | Strips bundled skills and workflows, hiding built-in slash commands from the model. |
| `CLAUDE_CODE_DISABLE_CLAUDE_CODE_SKILL` | boolean | Disables the built-in slash command for Claude Code documentation. |
| `CLAUDE_CODE_DISABLE_LAUNCH_COMPOSER` | boolean | Disables the launch composer UI at startup. |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` | boolean | Disables mouse click handling while keeping scroll support. |
| `CLAUDE_CODE_DISABLE_NOTIFICATION_PRESENCE_CHECK` | boolean | Sends push notifications even when the user appears present. |
| `CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK` | boolean | Disables automatic retry or alternative handling when a model refuses a request. |
| `CLAUDE_CODE_DISABLE_WORKFLOWS` | boolean | Disables the Workflows feature entirely, removing workflow instructions from the system prompt. |
| `CLAUDE_CODE_DISABLE_WORKING_SYNC` | boolean | Disables working-file sync for remote SDK sessions. |
| `CLAUDE_CODE_DOWNLOAD_DEADLINE_MS_FOR_TESTING` | text | Testing-only override for the update download deadline in milliseconds. |
| `CLAUDE_CODE_ENABLE_AUTO_MODE` | boolean | Enables automatic model-selection mode, allowing the CLI to pick the optimal Claude model. |
| `CLAUDE_CODE_ENABLE_DESIGN_SYNC` | boolean | Enables syncing Claude Design assets, requiring a separate design login. |
| `CLAUDE_CODE_ENABLE_LAUNCH_COMPOSER` | boolean | Enables the experimental launch composer startup interface. |
| `CLAUDE_CODE_ENABLE_MENU_KIND_LANES` | boolean | Enables grouped kind lanes in slash-command menu listings. |
| `CLAUDE_CODE_EXPERIMENTAL_OBSERVER_AGENTS` | text | Enables background observer agents that watch active agents. |
| `CLAUDE_CODE_FABLE_BRIDGE_DIALOG_TIMEOUT_MS` | number | Caps how long the Fable bridge classifier dialog waits; default sixty seconds. |
| `CLAUDE_CODE_FLEET_PAST_SESSIONS` | text | Enables past-session history in the fleet sessions view. |
| `CLAUDE_CODE_FORCE_BRIDGE` | boolean | Forces the REPL bridge transport path regardless of environment detection. |
| `CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM` | boolean | Forces mid-conversation system prompt re-injection on all model versions. |
| `CLAUDE_CODE_FORCE_RC_LONG_TURN_NUDGE` 🆕 | boolean | — |
| `CLAUDE_CODE_FORCE_STRIKETHROUGH` | boolean | Forces strikethrough rendering regardless of terminal capability detection. |
| `CLAUDE_CODE_FORCE_SYNC_OUTPUT` | boolean | Forces synchronous terminal output rendering, bypassing async buffering. |
| `CLAUDE_CODE_FORCE_TIP_ID` | boolean | Forces a specific onboarding tip to display, bypassing seen-state checks. |
| `CLAUDE_CODE_GB_BASE_URL` | text | Overrides the GrowthBook feature-flag server base URL for experimentation. |
| `CLAUDE_CODE_GB_REFRESH_INTERVAL_MS` | number | Controls how often GrowthBook feature flags are re-fetched in milliseconds. |
| `CLAUDE_CODE_GZIP_REQUEST_BODIES` | text | Compresses API request bodies with gzip, cutting upload bandwidth only. |
| `CLAUDE_CODE_HOST_CREDS_FILE` | text | Points to a host-supplied credentials file for provider auth. |
| `CLAUDE_CODE_INVESTIGATE_FIRST` | text | Controls Opus 4.7 investigate-first mode; accepts additive, compact, or on/off. |
| `CLAUDE_CODE_INVOKED_SKILLS` | text | Internal runtime register tracking which skills have fired and their per-invoke costs. |
| `CLAUDE_CODE_JSONL_TRANSCRIPT` | text | Writes full conversation transcript as JSONL to the specified file path. |
| `CLAUDE_CODE_KB_COHESION_FIXES` | text | Enables cohesion patches for knowledge-base content injected into the system prompt. |
| `CLAUDE_CODE_LANTERN_PRISM` | text | Force-enables the codenamed lantern-prism experiment, bypassing its GrowthBook gate. |
| `CLAUDE_CODE_LOOP_KEEPALIVE` | text | Enables keepalive pings in the autonomous loop to prevent idle-timeout disconnection. |
| `CLAUDE_CODE_LOOP_PERSISTENT` | text | Enables persistent autonomous loop mode, continuing across blocked decisions. |
| `CLAUDE_CODE_MANAGED_SETTINGS_PATH` | text | Loads org-managed settings from a custom path, overriding user-level config. |
| `CLAUDE_CODE_MAX_TURNS` | number | Caps the maximum number of agentic turns before the session halts. |
| `CLAUDE_CODE_METRICS_ENDPOINT` | text | Reroutes usage and telemetry metrics to a custom endpoint URL. |
| `CLAUDE_CODE_MOCK_TRIAL` | text | Simulates a trial subscription state, bypassing live entitlement checks. |
| `CLAUDE_CODE_NATIVE_CURSOR` | text | Enables native terminal cursor when accessibility mode is not already active. |
| `CLAUDE_CODE_OPUS_` | text | Selects Opus 4.6 fast-mode override; trailing underscore indicates version suffix variant. |
| `CLAUDE_CODE_OWNERSHIP_FRAME` | text | Injects a custom ownership framing string into the system prompt for org or project identity. |
| `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` | text | Enables automatic Claude Code self-update via Homebrew or winget. |
| `CLAUDE_CODE_PARKED_PERMISSION_WAIT_MS` | number | Controls how long parked permission requests wait before proceeding, in milliseconds. |
| `CLAUDE_CODE_PEWTER_OWL` | text | Activates the Pewter Owl experiment cohort, enabling its associated feature variant. |
| `CLAUDE_CODE_PEWTER_OWL_TOOL` | text | Overrides the GrowthBook gate for the experimental pewter-owl tool. |
| `CLAUDE_CODE_POWERUP_ONBOARDING` | text | Forces the power-user onboarding experiment arm: banner or step. |
| `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` | number | Caps background-task wait in print mode; 0 waits indefinitely. |
| `CLAUDE_CODE_PROACTIVE` | text | Enables Kairos proactive/assistant mode for idle-triggered suggestions. |
| `CLAUDE_CODE_PROCESS_WRAPPER` 🆕 | text | — |
| `CLAUDE_CODE_PROPAGATE_TRACEPARENT` | text | Forwards a W3C traceparent header on outbound API requests for distributed trace correlation. |
| `CLAUDE_CODE_RATE_LIMIT_TIER` | text | Pins the OAuth rate-limit tier passed to forked background sessions. |
| `CLAUDE_CODE_RC_PERMISSION_NUDGE` 🆕 | text | — |
| `CLAUDE_CODE_REFUSAL_FALLBACK_CATCH_ALL` | text | Enables catch-all fallback-model rerouting when the API refuses a request. |
| `CLAUDE_CODE_REPL` | text | Forces REPL mode on or off, overriding the GrowthBook feature-flag default. |
| `CLAUDE_CODE_REPORT_FINDINGS` | text | Forces the structured findings-report tool during code review runs. |
| `CLAUDE_CODE_RETRY_WATCHDOG` | text | Enables a retry watchdog on Linux remote entrypoints that forces retries on ECONNRESET/EPIPE and other transient network errors. |
| `CLAUDE_CODE_SAFE_MODE` | text | Disables all customizations (CLAUDE.md, hooks, skills) for troubleshooting broken configs. |
| `CLAUDE_CODE_SESSION_ID` | text | Internal session identifier propagated to child processes for telemetry. |
| `CLAUDE_CODE_SESSION_KIND` | text | Marks the session as 'bg', 'daemon', or 'daemon-worker' for forked children. |
| `CLAUDE_CODE_SESSION_LOG` | text | Path to the per-session log file; set when forking background sessions. |
| `CLAUDE_CODE_SESSION_NAME` | text | Human-readable name attached to a forked background session. |
| `CLAUDE_CODE_SKILL_DESC_REFRAME` | text | Rewrites skill descriptions with experimental reframed wording. |
| `CLAUDE_CODE_SKILL_DESCRIPTION` | text | Overrides the trigger description text injected for the Claude Code docs skill. |
| `CLAUDE_CODE_SKILL_NAME` | text | Overrides the default slash command name for the Claude Code docs skill. |
| `CLAUDE_CODE_SKIP_AWS_CRED_CACHE` | boolean | Bypasses cached AWS credentials when authenticating to Bedrock. |
| `CLAUDE_CODE_SKIP_HFI_VERSION_CHECK` | boolean | Skips HFI protocol version compatibility check on startup. |
| `CLAUDE_CODE_SKIP_PROJECT_BACKFILL` | boolean | Disables automatic backfill of project metadata at session start. |
| `CLAUDE_CODE_SKIP_REPO_UPLOAD` | boolean | Prevents repository content from being uploaded to remote context store. |
| `CLAUDE_CODE_SPAWN_TIMESTAMP_MS` | number | Records the Unix millisecond timestamp at process spawn for startup-latency telemetry. |
| `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` | text | Raises the maximum number of times a stop hook can block turn completion. |
| `CLAUDE_CODE_SUBSCRIPTION_TYPE` | text | Pins the OAuth subscription tier passed to forked background sessions. |
| `CLAUDE_CODE_SUPERVISED` | text | Marks session as supervised, causing clean exit on uncaught exceptions. |
| `CLAUDE_CODE_SUPPRESS_SESSION_ATTRIBUTION` | text | Strips or replaces session attribution metadata injected into context by the CLI. |
| `CLAUDE_CODE_SYNC_SKILLS` | text | Triggers skill synchronisation at session start, pulling skill definitions from a remote source. |
| `CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS` | number | Caps skill installation time during workspace sync; default thirty seconds. |
| `CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS` | number | Caps the startup wait for skill sync; session proceeds without skills once exceeded. |
| `CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE` | text | Overrides the remote-mode system prompt via a GrowthBook feature-flag key. |
| `CLAUDE_CODE_TAG_ISMETA_MESSAGES` | text | Tags specified message types as isMeta to exclude them from context. |
| `CLAUDE_CODE_TEE_SDK_STDOUT` | text | Mirrors SDK bridge stdout to stderr for debugging in bridge environment mode. |
| `CLAUDE_CODE_TEST_FIXTURES_ROOT` | text | Points the VCR fixture loader to a custom root directory for test recordings. |
| `CLAUDE_CODE_TEST_FORCE_DENY` | boolean | Forces all permission checks to deny — used in test harnesses only. |
| `CLAUDE_CODE_TEST_NO_PWSH` | text | Disables PowerShell detection in tests, simulating a non-Windows environment. |
| `CLAUDE_CODE_TODO_REMINDER_MODE` | text | Controls per-turn todo reminder nudges; set off to silence them. |
| `CLAUDE_CODE_TOTAL_TOKENS_REMINDER` | text | Controls the token-usage reminder mode injected into prompts. |
| `CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN` | text | Resets total-tokens reminder budget at the start of each user turn. |
| `CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET` | text | Sets starting token budget for padded-countdown usage reminders. |
| `CLAUDE_CODE_TRIGGER_ID` | text | Set internally to record which scheduled trigger spawned the remote session. |
| `CLAUDE_CODE_TUI_JUST_SWITCHED` | text | Internal marker set by the CLI when relaunching into a new TUI mode such as fullscreen. |
| `CLAUDE_CODE_TWO_STAGE_CLASSIFIER` | text | Enables two-stage intent classification pipeline for permission decisions. |
| `CLAUDE_CODE_USE_GATEWAY` | text | Routes inference traffic through an Anthropic LLM gateway instead of the direct API. |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | boolean | Enables the PowerShell tool as a Bash alternative; auto-enabled on Windows if no deny rule exists. |
| `CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS` | number | Overrides how long user dialogs wait before timing out, in milliseconds. |
| `CLAUDE_CODE_VERSION` | text | Exposes the current CLI version string to policy helper subprocesses. |
| `CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED` | text | Enables typed interim transcription results from the voice stream connection. |
| `CLAUDE_CODE_WALNUT_SPIRE` | text | Overrides the GrowthBook gate for the experimental walnut-spire feature. |
| `CLAUDE_CODE_WORKFLOW_SIZE_WARNING_AGENTS` | text | Overrides the agent-count threshold that triggers workflow size warnings. |
| `CLAUDE_CODE_WORKFLOW_SIZE_WARNING_TOKENS` | text | Overrides token threshold that triggers workflow size warnings. |
| `CLAUDE_CODE_WORKFLOWS` | text | Enables the Workflows feature and specifies which workflow definitions are active. |

## Deprecated

These flags were present in earlier versions but have been removed.

| Flag | Removed in |
|------|------------|
| `ANTHROPIC_FOUNDRY_AUTH_TOKEN` | 2.1.182 |
| `CLAUDE_CODE_AGENT_COST_STEER` | 2.1.162 |
| `CLAUDE_CODE_AGENT_LIST_IN_MESSAGES` | 2.1.178 |
| `CLAUDE_CODE_AGENT_NAME` | 2.1.162 |
| `CLAUDE_CODE_ARTIFACT_MCP` | 2.1.174 |
| `CLAUDE_CODE_CONNECT_TIMEOUT_MS` | 2.1.186 |
| `CLAUDE_CODE_DISABLE_AGENTS_FLEET` | 2.1.162 |
| `CLAUDE_CODE_ENABLE_DESIGN_MCP` | 2.1.206 |
| `CLAUDE_CODE_ENABLE_OPUS_` | 2.1.159 |
| `CLAUDE_CODE_FORCE_MEMORY_WRITE_SURVEY` | 2.1.162 |
| `CLAUDE_CODE_FORCE_SESSION_PERSISTENCE` | 2.1.170 |
| `CLAUDE_CODE_FORK_SUBAGENT_DEFAULT_ON` | 2.1.163 |
| `CLAUDE_CODE_FRAME` | 2.1.172 |
| `CLAUDE_CODE_FRAME_AUTO_OPEN` | 2.1.172 |
| `CLAUDE_CODE_FRAME_MCP` | 2.1.172 |
| `CLAUDE_CODE_FRAME_MODE` | 2.1.163 |
| `CLAUDE_CODE_MEMORY_WRITE_SURVEY_TIMEOUT_MS` | 2.1.162 |
| `CLAUDE_CODE_MID_CONVERSATION_SYSTEM` | 2.1.159 |
| `CLAUDE_CODE_OTEL_DIAG_STDERRT` | 2.1.202 |
| `CLAUDE_CODE_PERFETTO_TRACEY` | 2.1.162 |
| `CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE` | 2.1.159 |
| `CLAUDE_CODE_SHOJI_ENGINE` | 2.1.203 |
| `CLAUDE_CODE_TEAM_NAME` | 2.1.162 |
| `CLAUDE_CODE_TEAM_ONBOARDING` | 2.1.181 |
| `CLAUDE_CODE_USE_CCR_V` | 2.1.203 |
| `CLAUDE_CODE_USE_NATIVE_FILE_SEARCH` | 2.1.159 |
| `CLAUDE_CODE_VELVET_FALCON` | 2.1.174 |
| `CLAUDE_CODE_VERIFY_PROMPT` | 2.1.206 |
| `CLAUDE_CODE_WEBFETCH_PROXY_PATH` | 2.1.169 |

---

*This file is auto-generated from [`flags/manifest.json`](flags/manifest.json) by [`scripts/generate-readme.js`](scripts/generate-readme.js). Do not edit manually.*
