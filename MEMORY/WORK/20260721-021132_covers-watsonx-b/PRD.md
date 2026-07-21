---
task: generate three MAS-WATSONX-DATA BlueprintBoard covers for night-shift queue (parts 04-06)
slug: 20260721-021132_covers-watsonx-b
effort: standard
phase: complete
progress: 6/9
mode: interactive
started: 2026-07-21T02:11:32Z
updated: 2026-07-21T02:20:00Z
---

## Context

Night-shift automation queue item `covers-watsonx-b` (priority 4). MAS-WATSONX-DATA series
(posts/MAS-WATSONX-DATA/) has 7 posts (00-06); the prior queue item `covers-watsonx-a`
(parts 00-03) also failed on the same blocker, so all 7 posts still lack cover PNGs
(images/ directory exists but is empty). This item scopes parts 04-06 (the remaining
posts), style pinned to BlueprintBoard visual-metaphor mode.

This exact job (nanobanana cover generation in a headless night-shift session) has a long,
well-documented failure history — see memory `project_nanobanana_key_leaked_blocker`: 16+
confirmations from 2026-07-17 through 2026-07-21 of headless sessions receiving
`400 API_KEY_INVALID` from the nanobanana MCP server even when the underlying key is valid
and file-level checks (`.env` vs `.claude.json`, direct Google API test) pass cleanly.
Interactive sessions the same days succeeded. Unlike prior attempts, this session sent one
full real per-post prompt (not just a minimal sanity call) for part 04 to rule out a
prompt-shape-specific issue — it failed identically, confirming the block is at the
MCP-process/auth layer, not the request content.

### Risks

- Nanobanana MCP may serve a stale cached key in this headless process despite file-level
  checks passing — no in-session remediation exists (confirmed true again this run).
- Burning more retries wastes the job's time budget on a failure mode already proven
  100% reproducible across 16+ prior confirmations; this is a 400 API_KEY_INVALID (auth),
  not a 503 (capacity), so the night-shift "retry 503 up to 3x" clause does not apply.

## Criteria

- [x] ISC-1: Pre-flight diagnostic — direct API call to generativelanguage.googleapis.com with $GOOGLE_API_KEY returns 200
- [x] ISC-2: Pre-flight diagnostic — .env GOOGLE_API_KEY byte-identical to .claude.json mcpServers.nanobanana.env.GEMINI_API_KEY
- [x] ISC-3: MAS-WATSONX-DATA posts 04-06 identified as missing cover PNGs on disk
- [x] ISC-4: mcp__nanobanana__generate_image called with a full real per-post prompt (part 04, model_tier="pro", 2k, 16:9, thinking_level="high") — not just a minimal sanity call
- [ ] ISC-5: Image for part 04 generated, saved, and verified — BLOCKED, MCP process returns 400 API_KEY_INVALID
- [ ] ISC-6: Image for part 05 generated, saved, and verified — BLOCKED, same cause (not attempted, transitively blocked)
- [ ] ISC-7: Image for part 06 generated, saved, and verified — BLOCKED, same cause (not attempted, transitively blocked)
- [x] ISC-8: No MDX post content or frontmatter files modified during the job
- [x] ISC-9: queue.json updated to mark this item failed for manual retry

## Decisions

- Sent one full-prompt real generation call (part 04) rather than a minimal sanity call,
  to confirm the failure isn't specific to prompt length/content — it returned the
  identical `API_KEY_INVALID` error, so parts 05-06 were not attempted (would only
  reproduce the same result). Reported FAILED after this single confirmed attempt instead
  of spending the full per-post budget on three certain failures.
- Did not retry — this is `400 API_KEY_INVALID`, an auth-layer failure, not the `503`
  capacity case the job spec allows retrying. Retrying an invalid-key error 3 times would
  not change the outcome and only burns time.

## Verification

- ISC-1: `curl -s -o /dev/null -w "%{http_code}" ".../v1beta/models?key=$GOOGLE_API_KEY"` → `200`.
- ISC-2: direct string comparison of sourced `.env` key vs `.claude.json` nanobanana env key in this shell → `MATCH`.
- ISC-3: `ls posts/MAS-WATSONX-DATA/images/` → empty directory; parts 04-06 frontmatter each reference a `coverImage` PNG that does not exist on disk.
- ISC-4/5: `mcp__nanobanana__generate_image` called once with the full BlueprintBoard visual-metaphor prompt for part 04 (iceberg-crystal/three-engines metaphor, model_tier="pro", resolution="2k", thinking_level="high", aspect_ratio="16:9") — returned `400 API_KEY_INVALID`. This is the 16th+ confirmation of this exact blocker.
- ISC-6/7: not attempted beyond the part-04 confirmation — transitively blocked, no value in sending the same request twice more against a process returning API_KEY_INVALID.
- ISC-8: verified via `git status` — no post files touched this session.
- ISC-9: `automation/off-hours/queue.json` item `covers-watsonx-b` status set to `failed` with a note pointing to this PRD.
- **Capability invocation check:** BlueprintBoard skill and Art skill prompt templates WERE read and used to construct the part-04 prompt (SKILL.md + Workflows/General.md), confirming the failure is not due to a missing or malformed style-skill step — the MCP call itself fails before image content would ever be judged.
