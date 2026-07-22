---
task: generate 5 MarkerBoard covers for MAS-PARTS-IDENTIFIER series
slug: 20260721-231046_covers-parts-identifier
effort: advanced
phase: complete
progress: 1/6
mode: interactive
started: 2026-07-21T23:10:46Z
updated: 2026-07-21T23:15:00Z
---

## Context

Night-shift work item `covers-parts-id` (priority 4): generate the 5 missing 16:9 cover
images for the MAS-PARTS-IDENTIFIER series (`posts/MAS-PARTS-IDENTIFIER/*.mdx`), using the
MarkerBoard style skill in Concept/visual-metaphor mode (not cheat-sheet layout). Confirmed
on disk: all 5 posts (00 series index + 01-04) exist, `posts/MAS-PARTS-IDENTIFIER/images/`
does not exist at all, so all 5 covers are genuinely missing.

### Risks
- nanobanana MCP key has a documented history of `API_KEY_INVALID` failures specifically in
  headless/night-shift sessions (18+ prior confirmations in memory
  `project_nanobanana_key_leaked_blocker.md`) while interactive sessions work — first tool
  call result determines whether this run is even possible.

### Plan
Per standing guidance ("do not burn more than ~2 retries on this failure mode"), run a
single minimal pre-flight `mcp__nanobanana__generate_image` test call (`model_tier: "pro"`,
`resolution: "2k"`, `thinking_level: "high"`, `aspect_ratio: "16:9"`) before investing effort
in per-post prompt engineering. If it fails with the same `API_KEY_INVALID` signature,
fail-fast and log rather than attempting all 5 posts against a known-broken credential path.

## Checklist

- [x] PFC-1: Confirmed all 5 MAS-PARTS-IDENTIFIER posts have no cover on disk (`images/`
      dir does not exist)
- [ ] PFC-2: `mas-parts-identifier-00-*.png` exists at its coverImage path — BLOCKED
- [ ] PFC-3: PFC-2 image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] PFC-4: PFC-2 image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] PFC-5: PFC-2 image visually verified via Read as MarkerBoard style, not cheat-sheet — BLOCKED
- [ ] PFC-6: PFC-2 image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [ ] PFC-7: `mas-parts-identifier-01-*.png` exists — BLOCKED, batch not attempted (fail-fast)
- [ ] PFC-8: `mas-parts-identifier-02-*.png` exists — BLOCKED, batch not attempted
- [ ] PFC-9: `mas-parts-identifier-03-*.png` exists — BLOCKED, batch not attempted
- [ ] PFC-10: `mas-parts-identifier-04-*.png` exists — BLOCKED, batch not attempted
- [x] PFC-11: No `.mdx` post content file was modified (frontmatter or body)
- [x] PFC-12: No Sanity sync, LinkedIn publish, or `git push` was performed
- [ ] PFC-A1 (anti): Composition dense/edge-to-edge, no empty voids — N/A, no covers produced
- [ ] PFC-13: `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` updated — N/A, series is not
      cover-complete (0/5), correctly left as an open gap
- [ ] PFC-14: A local `git commit` created containing the 5 new PNGs — NOT MET as written
      (0 PNGs exist to commit); commit instead documents the failure per established repo
      convention (see d09bb26, dc02100, 35b6b70)
- [x] PFC-15: Final output prints exactly one `NIGHT-SHIFT-RESULT:` line matching format

## Verification

- `posts/MAS-PARTS-IDENTIFIER/images/` confirmed absent before any write attempt.
- Single pre-flight `mcp__nanobanana__generate_image` call (`model_tier: "pro"`,
  `resolution: "2k"`, `thinking_level: "high"`, `aspect_ratio: "16:9"`, minimal test prompt)
  returned `400 API_KEY_INVALID`, matching every headless night-shift cover-batch attempt
  since the 2026-07-20 key rotation. Stopped after 1 call rather than attempting all 5
  posts against a credential path already confirmed broken 18+ times — no value in
  reproducing the identical failure 5 more times.
- `git status` before any writes showed pre-existing uncommitted changes in other in-flight
  work items' PRD.md files and `automation/off-hours/queue.json` (expected — shared
  night-shift state, other items' edits pre-existed this session). None of those files were
  touched by this item except the `covers-parts-id` entry in `queue.json`.
- `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` intentionally left unedited —
  MAS-PARTS-IDENTIFIER remains correctly flagged as an open covers-pending gap (0/5).

## Decisions

- Did not invoke the MarkerBoard or Art skills for prompt engineering — pre-flight test
  call failed before any per-post work would have been useful, so skill invocation was
  skipped entirely for this run (consistent with "fail fast, don't burn effort" guidance).
- Queue item `covers-parts-id` marked `failed` for manual retry once the MCP process is
  reconnected with a working key, matching the disposition used for prior blocked batches.
