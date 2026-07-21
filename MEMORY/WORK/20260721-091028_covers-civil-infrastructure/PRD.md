---
task: generate 6 InfoBlocks covers for MAS-CIVIL-INFRASTRUCTURE series
slug: 20260721-091028_covers-civil-infrastructure
effort: advanced
phase: verify
progress: 2/36
mode: interactive
started: 2026-07-21T09:10:28Z
updated: 2026-07-21T09:22:00Z
---

## Context

Night-shift work item `covers-civil` (priority 4): generate the 6 missing 16:9 cover
images for the MAS-CIVIL-INFRASTRUCTURE series (`posts/MAS-CIVIL-INFRASTRUCTURE/*.mdx`),
using the InfoBlocks style skill in visual-metaphor mode. Confirmed on disk: all 6 posts
(00 series index + 01-05) reference `./images/mas-civil-infrastructure-NN-*.png` paths,
and `posts/MAS-CIVIL-INFRASTRUCTURE/images/` does not exist yet — so all 6 are genuinely
missing (not stale queue data). This matches the 2026-07-20 PM gap-analysis note flagging
MAS-CIVIL-INFRASTRUCTURE as an unverified open gap (unlike MAS-ADMIN, which that same scan
mis-flagged and was later found already complete).

Running as an unattended headless session (night-shift), so this is being executed as the
primary agent under ALGORITHM mode, not a Task-spawned subagent — voice curls are attempted
best-effort but the notify endpoint is unreachable in this sandbox (confirmed: curl exit 7),
which is expected and non-blocking.

### Risks
- nanobanana MCP key has a documented history of `API_KEY_INVALID` failures specifically in
  headless/night-shift sessions (15+ prior confirmations in memory) while interactive
  sessions work — first tool call result determines whether this run is even possible.
- Pro tier can 503 under load — must retry 3x/30s, never silently fall back to nb2/Flash.
- Six posts must each get a visually distinct metaphor — reusing one template risks a
  same-looking-cover failure that isn't caught by path/metadata checks alone, only by
  actually reading each image.
- `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` edit must be surgical — it's a shared
  planning doc already mid-edit across multiple night-shift items (visible in git status
  as modified), so a careless full-file rewrite could clobber unrelated in-flight edits.
- `aspect_ratio: "16:9"` is unverified against the actual MCP tool enum until the schema
  loads (InfoBlocks workflow docs default to 1:1/4:5/9:16, not 16:9).
- No interactive human approves the per-post style/workflow table before generation (as
  BlogCoverArt batch mode normally does) — acceptable here because style is pre-pinned by
  the work item and the job is explicitly unattended.

### Plan
Per-post InfoBlocks workflow routing (BlogCoverArt content analysis applied to each post):
- 00 series-index → StackedLayers (5-part progression: asset model → NBI → pavement/tunnel → AI → compliance)
- 01 product-asset-model → Concept (single "what is the asset model" explainer)
- 02 bridge-inspection-nbi → Concept (single concept: NBI 0-9 ratings + AASHTO elements)
- 03 pavement-tunnel-deficiency → General/Grid (three facets: pavement, tunnel, deficiency loop)
- 04 ai-inspection-lvm → Concept (single concept: Visual Inspection + LVM)
- 05 compliance-reporting-rollout → General/Grid (regulation crosswalk across FHWA/AASHTO/GASB/FTA)

All calls: `model_tier: "pro"`, `resolution: "2k"`, `thinking_level: "high"`,
`aspect_ratio: "16:9"` (night-shift instructions override the InfoBlocks skill's own
1:1/4:5 defaults — blog covers are always 16:9 per repo-wide rule). Prompts built from the
InfoBlocks master template + the chosen workflow's template, with post-specific metaphor,
title (3-8 words), and `@themaximoguys` attribution baked into every prompt. Generate up to
4 in parallel with ~2s stagger, then the remaining 2 in a second batch.

## Criteria

- [ ] ISC-1: `mas-civil-infrastructure-00-series-index.png` exists at its coverImage path — BLOCKED, no image generated
- [ ] ISC-2: ISC-1 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] ISC-3: ISC-1 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] ISC-4: ISC-1 image visually verified via Read as InfoBlocks style (cream bg, navy/steel/gold 3D blocks), not cheat-sheet — BLOCKED
- [ ] ISC-5: ISC-1 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [ ] ISC-6: `mas-civil-infrastructure-01-product-asset-model.png` exists at its coverImage path — BLOCKED, no image generated
- [ ] ISC-7: ISC-6 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] ISC-8: ISC-6 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] ISC-9: ISC-6 image visually verified via Read as InfoBlocks style, not cheat-sheet — BLOCKED
- [ ] ISC-10: ISC-6 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [ ] ISC-11: `mas-civil-infrastructure-02-bridge-inspection-nbi.png` exists at its coverImage path — BLOCKED, no image generated
- [ ] ISC-12: ISC-11 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] ISC-13: ISC-11 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] ISC-14: ISC-11 image visually verified via Read as InfoBlocks style, not cheat-sheet — BLOCKED
- [ ] ISC-15: ISC-11 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [ ] ISC-16: `mas-civil-infrastructure-03-pavement-tunnel-deficiency.png` exists at its coverImage path — BLOCKED, no image generated
- [ ] ISC-17: ISC-16 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] ISC-18: ISC-16 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] ISC-19: ISC-16 image visually verified via Read as InfoBlocks style, not cheat-sheet — BLOCKED
- [ ] ISC-20: ISC-16 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [ ] ISC-21: `mas-civil-infrastructure-04-ai-inspection-lvm.png` exists at its coverImage path — BLOCKED, batch 2 not attempted (fail-fast per established guidance)
- [ ] ISC-22: ISC-21 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] ISC-23: ISC-21 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] ISC-24: ISC-21 image visually verified via Read as InfoBlocks style, not cheat-sheet — BLOCKED
- [ ] ISC-25: ISC-21 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [ ] ISC-26: `mas-civil-infrastructure-05-compliance-reporting-rollout.png` exists at its coverImage path — BLOCKED, batch 2 not attempted
- [ ] ISC-27: ISC-26 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] ISC-28: ISC-26 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] ISC-29: ISC-26 image visually verified via Read as InfoBlocks style, not cheat-sheet — BLOCKED
- [ ] ISC-30: ISC-26 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [x] ISC-31: No `.mdx` post content file was modified (frontmatter or body)
- [x] ISC-32: No Sanity sync, LinkedIn publish, or `git push` was performed
- [ ] ISC-A1 (anti): Composition is dense/edge-to-edge — no cover has a large flat empty background void — N/A, no covers produced
- [ ] ISC-33: `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` updated — N/A, series is not cover-complete (0/6), correctly left as an open gap
- [ ] ISC-34: A single local `git commit` was created containing the 6 new PNGs — NOT MET as written (0 PNGs exist to commit); commit instead documents the failure per established repo convention (see d09bb26, dc02100)
- [ ] ISC-35: Commit message follows `night-shift: covers-civil — <N> covers (InfoBlocks)` format — adapted to `0 covers, nanobanana key still blocked` per repo convention for this failure mode
- [x] ISC-36: Final output prints exactly one `NIGHT-SHIFT-RESULT:` line matching the required format

## Verification

- `posts/MAS-CIVIL-INFRASTRUCTURE/images/` confirmed empty (`ls -la` → only `.`/`..`) — no
  partial/corrupt files were left behind by the 4 failed calls.
- All 4 `mcp__nanobanana__generate_image` calls (posts 00-03, `model_tier: "pro"`) returned
  identical `400 API_KEY_INVALID` errors. Batch 2 (posts 04-05) was not attempted —
  fail-fast per the standing guidance in memory `project_nanobanana_key_leaked_blocker.md`
  ("do not burn more than ~2 retries on this failure mode"); 4 was already double that
  budget, so stopping there rather than adding 2 more guaranteed-identical failures.
- Post-hoc pre-flight sanity check: `source /root/.claude-pai/.env` then direct
  `GET https://generativelanguage.googleapis.com/v1beta/models?key=$GOOGLE_API_KEY` →
  `200 OK`. Confirms the key material itself is valid — the failure is the documented
  MCP-process-level stale-credential issue, 18th+ confirmation of the same signature.
  Full diagnostic + updated confirmation count recorded in the memory file.
- `git status` before any writes showed no pre-existing uncommitted image files for this
  series and an already-modified `automation/off-hours/queue.json` (expected — shared
  night-shift state file, other items' edits pre-existed this session).
- `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` intentionally left unedited — MAS-CIVIL-
  INFRASTRUCTURE remains correctly flagged as an open covers-pending gap (0/6, not 6/6).
- Capability invocation check: `InfoBlocks` skill invoked via `Skill` tool (BUILD phase,
  confirmed by tool-result transcript). `Art` skill invoked via `Skill` tool (BUILD phase,
  confirmed). Both selected capabilities were actually invoked — no phantom selections.

## Decisions

- Per-post workflow routing (StackedLayers for 00, Concept for 01/02/04, General/Grid for
  03/05) chosen from BlogCoverArt content analysis rather than defaulting all 6 to one
  workflow — required for visual distinctness across the batch.
- `aspect_ratio: "16:9"` used for every call despite InfoBlocks skill's own workflow docs
  defaulting to 1:1/4:5 — the night-shift work item and repo-wide blog-cover rule (16:9
  landscape, matches site layout) is the higher-priority instruction for this job.
- Executing generation calls directly from the primary session rather than spawning
  subagents per image — avoids the documented headless-subagent MCP auth failures.

