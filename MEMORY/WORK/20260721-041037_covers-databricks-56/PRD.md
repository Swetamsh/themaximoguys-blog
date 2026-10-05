---
task: generate two MAS-DATABRICKS SketchNote cover images tonight
slug: 20260721-041037_covers-databricks-56
effort: extended
phase: complete
progress: 9/18
mode: interactive
started: 2026-07-21T04:10:37Z
updated: 2026-07-21T04:20:00Z
---

## Context

Night-shift automation queue item `covers-databricks-56` (priority 4). MAS-DATABRICKS
series (posts/MAS-DATABRICKS/) has parts 00-04 covers already on disk; parts 05
(`mas-databricks-05-ml-vs-mas-predict.mdx`, ML vs Maximo Predict decision framework) and 06
(`mas-databricks-06-governance-security.mdx`, Unity Catalog governance finale) are missing
their cover PNGs. Style pinned by the queue item: SketchNote, visual-metaphor mode (NOT
CheatSheet workflow), 16:9, matching 00-04 series look.

This series has a documented history of nanobanana MCP key failures (12+ confirmations
2026-07-17 through 2026-07-20 evening). Key was rotated and confirmed valid interactively
same day (34 covers generated 2026-07-20 afternoon, commit e665808), but two night-shift
attempts AFTER that rotation (covers-supply-chain-a/b) still failed with a stale cached key
in the MCP process itself. Pre-flight diagnostic run before OBSERVE: direct API call to
`generativelanguage.googleapis.com` with `$GOOGLE_API_KEY` returned 200 OK; sha256 of the key
in `/root/.claude-pai/.env` matches the key in `/root/.claude.json` →
`mcpServers.nanobanana.env.GEMINI_API_KEY` exactly. Both pass, which only rules out a stale
*file* — the MCP *process* cache can still be stale (no in-session fix exists per memory).
Plan: attempt real generation; if `generate_image` returns `API_KEY_INVALID`/403, stop after
one retry and report `NIGHT-SHIFT-RESULT: FAILED` rather than looping (per established
guidance — no fallback work exists for a blocked cover-batch job).

### Risks

- Nanobanana MCP may still serve a stale cached key despite file-level checks passing —
  no in-session remediation exists; cap at 1 retry per image, then fail fast.
- SketchNote's default associative style leans CheatSheet/tips-list; must explicitly force
  visual-metaphor mode per the queue item's constraint.
- "Governance and Security" (Part 6) is abstract/compliance-heavy — needs a concrete visual
  metaphor (e.g., a vault/gatekeeper/filter motif) rather than defaulting to icons+text.
- Series completion check (00-06 all present) determines whether content-planning doc needs
  an edit — must verify file existence, not assume.

## Criteria

- [x] ISC-1: SketchNote SKILL.md read for palette, aesthetic, and technique rules
- [x] ISC-2: SketchNote Workflows/ directory checked, visual-metaphor-appropriate workflow file read (not CheatSheet)
- [x] ISC-3: Post 05 frontmatter/content analyzed for its single strongest visual metaphor
- [x] ISC-4: Post 06 frontmatter/content analyzed for its single strongest visual metaphor
- [x] ISC-5: Art skill prompt-engineering patterns consulted for prompt construction
- [x] ISC-6: Prompt for image 05 engineered combining SketchNote template + post-05 metaphor, palette/composition intact
- [x] ISC-7: Prompt for image 06 engineered combining SketchNote template + post-06 metaphor, palette/composition intact — never sent, blocked by ISC-8 failure
- [ ] ISC-8: Image 05 generated via mcp__nanobanana__generate_image with model_tier="pro" explicitly set — FAILED: `400 API_KEY_INVALID` on both the real prompt and a minimal 1-token retry (2 attempts, per the ≤2-retry cap in memory)
- [ ] ISC-9: Image 05 response metadata confirms model_tier "pro" (not auto/flash) — regenerate if not — BLOCKED, no response returned
- [ ] ISC-10: Image 06 generated via mcp__nanobanana__generate_image with model_tier="pro" explicitly set — NOT ATTEMPTED, same MCP process would fail identically
- [ ] ISC-11: Image 06 response metadata confirms model_tier "pro" (not auto/flash) — regenerate if not — BLOCKED
- [ ] ISC-12: Image 05 saved to exact path posts/MAS-DATABRICKS/images/mas-databricks-05-ml-vs-mas-predict.png — BLOCKED
- [ ] ISC-13: Image 06 saved to exact path posts/MAS-DATABRICKS/images/mas-databricks-06-governance-security.png — BLOCKED
- [ ] ISC-14: Image 05 viewed with Read tool, confirmed dense edge-to-edge composition (no large empty voids) and @themaximoguys attribution present — BLOCKED
- [ ] ISC-15: Image 06 viewed with Read tool, confirmed dense edge-to-edge composition (no large empty voids) and @themaximoguys attribution present — BLOCKED
- [x] ISC-16: No MDX post content or frontmatter files modified during the job
- [x] ISC-17: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md updated only if series 00-06 covers are all confirmed present on disk — N/A, series still missing 05/06, correctly left untouched
- [ ] ISC-18: Local git commit created containing only the new image files (plus content-planning edit if applicable) — no push, no Sanity, no LinkedIn — N/A, nothing to commit; memory update committed separately is not part of this ISC's scope

## Decisions

## Verification

- ISC-1..7 (skill loading, content analysis, prompt engineering): confirmed done — SketchNote SKILL.md + Workflows/General.md read, Art skill read, existing `mas-databricks-04-analytics-use-cases.png` viewed for continuity, full prompts for both images composed (balance-scale metaphor for 05, vault/gatekeeper metaphor for 06).
- ISC-8: `mcp__nanobanana__generate_image` called twice (full prompt, then a minimal 1-token/1k/1:1 sanity check) — both returned `400 API_KEY_INVALID`. Pre-flight diagnostic (direct `GET .../v1beta/models?key=...` → 200 OK; sha256 of `.env` key == sha256 of `.claude.json` key) ruled out a stale *file*. This matches the documented MCP-process-level cache blocker exactly — confirmed again, no new information.
- ISC-9 through ISC-15: blocked transitively, not attempted further (2-retry cap already spent).
- ISC-16: verified via `git status`/`git diff` — no post files touched this session.
- ISC-17: verified — `posts/MAS-DATABRICKS/images/` still missing 05 and 06, so the series is correctly NOT marked complete; content-planning file left untouched.
- ISC-18: no image files exist to commit; nothing else changed in the repo this session.
- **Capability invocation check:** SketchNote and Art were both selected in OBSERVE and both invoked via `Skill` tool call in BUILD — satisfied.
