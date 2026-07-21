---
task: generate four MAS-WATSONX-DATA BlueprintBoard covers for night-shift queue
slug: 20260721-071500_covers-watsonx-a
effort: standard
phase: complete
progress: 6/10
mode: interactive
started: 2026-07-21T07:15:00Z
updated: 2026-07-21T07:20:00Z
---

## Context

Night-shift automation queue item `covers-watsonx-a` (priority 4). MAS-WATSONX-DATA series
(posts/MAS-WATSONX-DATA/) has 7 posts (00-06), all missing cover PNGs (images/ directory
exists but is empty). This item scopes parts 00-03 (first 4 by filename), style pinned to
BlueprintBoard visual-metaphor mode.

This exact job (nanobanana cover generation in a headless night-shift session) has a long,
well-documented failure history — see memory `project_nanobanana_key_leaked_blocker`: 15+
confirmations from 2026-07-17 through 2026-07-21 of headless sessions receiving
`400 API_KEY_INVALID` from the nanobanana MCP server even when the underlying key is valid
and file-level checks (`.env` vs `.claude.json`, direct Google API test) pass cleanly.
Interactive sessions the same days succeeded. Established guidance: run pre-flight
diagnostics, attempt generation with a ≤2-retry cap, and fail fast rather than looping,
since a blocked cover-batch job has no fallback work (can't write post content instead).

### Risks

- Nanobanana MCP may serve a stale cached key in this headless process despite file-level
  checks passing — no in-session remediation exists (confirmed true again this run).
- Burning more than 2 retries wastes the job's time budget on a failure mode already proven
  100% reproducible across 15+ prior confirmations.

## Criteria

- [x] ISC-1: Pre-flight diagnostic — direct API call to generativelanguage.googleapis.com with $GOOGLE_API_KEY returns 200
- [x] ISC-2: Pre-flight diagnostic — .env GOOGLE_API_KEY byte-identical to .claude.json mcpServers.nanobanana.env.GEMINI_API_KEY
- [x] ISC-3: MAS-WATSONX-DATA posts 00-03 identified as missing cover PNGs on disk
- [x] ISC-4: mcp__nanobanana__generate_image sanity call attempted with model_tier="pro" explicitly set (attempt 1)
- [x] ISC-5: mcp__nanobanana__generate_image sanity call retried once (attempt 2, cap reached)
- [ ] ISC-6: Image for part 00 generated, saved, and verified — BLOCKED, MCP process returns 400 API_KEY_INVALID on every call
- [ ] ISC-7: Image for part 01 generated, saved, and verified — BLOCKED, same cause
- [ ] ISC-8: Image for part 02 generated, saved, and verified — BLOCKED, same cause
- [ ] ISC-9: Image for part 03 generated, saved, and verified — BLOCKED, same cause
- [x] ISC-10: No MDX post content or frontmatter files modified during the job

## Decisions

- Capped retries at 2 (both minimal sanity-check calls, not full-prompt calls) per
  established guidance in memory — the failure signature is already proven identical across
  15+ prior confirmations, so spending the full budget re-diagnosing or attempting all 4
  real prompts would only burn job time for a certain failure. Reported FAILED immediately
  instead of attempting the actual per-post prompts.

## Verification

- ISC-1: `curl -s -o /dev/null -w "%{http_code}" ".../v1beta/models?key=$GOOGLE_API_KEY"` → `200`.
- ISC-2: direct string comparison of sourced `.env` key vs `.claude.json` key in this shell → `MATCH`.
- ISC-3: `ls posts/MAS-WATSONX-DATA/images/` → empty directory; all 7 posts lack cover PNGs.
- ISC-4/5: `mcp__nanobanana__generate_image` called twice (model_tier="pro", 1k, 1:1, minimal prompts) — both returned `400 API_KEY_INVALID`, identical to the documented MCP-process-level stale-key pattern. This is the 16th+ confirmation of this exact blocker.
- ISC-6..9: not attempted beyond the sanity check — blocked transitively, no point sending the real per-post prompts against a process returning API_KEY_INVALID on trivial input.
- ISC-10: verified via `git status` — no post files touched this session.
- **Capability invocation check:** BlueprintBoard skill and Art skill were NOT invoked — correctly skipped, since the blocking failure occurs at the image-generation call itself (before any style-skill prompt engineering would matter) and this session's real work was diagnosis, not composition. Selecting them upfront would have been premature given the known recurring blocker; noted here rather than as a phantom selection.
