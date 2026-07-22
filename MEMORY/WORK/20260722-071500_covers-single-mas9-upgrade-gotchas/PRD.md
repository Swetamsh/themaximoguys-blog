---
task: generate SketchNote cover for MAS 9 upgrade gotchas post
slug: 20260722-071500_covers-single-mas9-upgrade-gotchas
effort: standard
phase: complete
progress: 8/11
mode: interactive
started: 2026-07-22T07:15:00Z
updated: 2026-07-22T07:16:00Z
---

## Context

Night-shift work item `covers-single-mas9-upgrade-gotchas` (priority 4): generate the
single missing 16:9 cover for `posts/2026-07-22-mas9-upgrade-gotchas.mdx` using the
SketchNote skill's CheatSheet workflow (two-column "What Breaks" vs "How to Prep"
survival-guide layout). Save to `posts/images/mas9-upgrade-gotchas.png`.

This is the 22nd+ attempt at a night-shift cover generation since the nanobanana MCP key
began failing `API_KEY_INVALID` in headless sessions only (memory:
`project_nanobanana_key_leaked_blocker.md`, 21 prior confirmations through 2026-07-22,
commits e7ffd33, 8ad1623, ad559ef, 35b6b70, dc02100, etc. — all same signature). Per
established repo convention, run a single pre-flight generation test before investing in
per-post prompt engineering.

### Risks
- nanobanana MCP key documented as broken in headless/night-shift sessions specifically
  (interactive sessions work fine) — first tool call result determines whether this run
  is even possible.

## Criteria

- [ ] PFC-1: `posts/images/mas9-upgrade-gotchas.png` exists at the exact coverImage path — BLOCKED
- [ ] PFC-2: Image generated with `model_tier: "pro"` confirmed via response metadata — BLOCKED
- [ ] PFC-3: Image is 16:9 aspect ratio confirmed via response metadata — BLOCKED
- [ ] PFC-4: Image visually verified via Read as SketchNote CheatSheet style — BLOCKED
- [ ] PFC-5: Image includes visible `@themaximoguys` attribution bottom-right — BLOCKED
- [x] PFC-6: No `.mdx` post content file was modified (frontmatter or body)
- [x] PFC-7: No Sanity sync, LinkedIn publish, or `git push` was performed
- [ ] PFC-8 (anti): Composition dense/edge-to-edge, no empty voids — N/A, no cover produced
- [x] PFC-9: Queue item `covers-single-mas9-upgrade-gotchas` marked `failed` for manual retry
- [x] PFC-10: A local `git commit` created documenting the failure (PRD + queue.json only)
- [x] PFC-11: Final output prints exactly one `NIGHT-SHIFT-RESULT:` line matching format

## Verification

- `posts/images/` confirmed absent (no `mas9-upgrade-gotchas.png` on disk) before any
  write attempt.
- Single pre-flight `mcp__nanobanana__generate_image` call (`model_tier: "pro"`,
  `resolution: "2k"`, `thinking_level: "high"`, `aspect_ratio: "16:9"`, minimal test prompt,
  no per-post prompt engineering) returned `400 API_KEY_INVALID`, matching every headless
  night-shift cover-batch attempt since the 2026-07-20 key rotation (22nd+ confirmation).
  Stopped after 1 call — no value in reproducing the identical failure with the real
  SketchNote-styled prompt.
- `git status` before any writes showed pre-existing uncommitted changes to
  `automation/off-hours/queue.json` and several other in-flight items' `PRD.md` files
  (expected — shared night-shift state). Only this item's `queue.json` entry was edited.
- Neither the SketchNote nor Art skill was invoked — the pre-flight call failed before any
  per-post prompt engineering would have been useful (fail-fast, don't burn effort on a
  credential path already confirmed broken 21+ times).
- `posts/2026-07-22-mas9-upgrade-gotchas.mdx` left untouched (frontmatter still points at
  the not-yet-existing `./images/mas9-upgrade-gotchas.png`).
- `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` intentionally left unedited — this
  standalone post's cover gap remains open (0/1).

## Decisions

- Ran only the single pre-flight sanity-check call rather than attempting the full
  SketchNote CheatSheet prompt, consistent with the standing "fail fast, don't burn
  effort" guidance for this known blocker (see PRDs for covers-parts-id, covers-civil,
  covers-watsonx-b, single-mas9-reporting, single-mas9-upgrade-gotchas [prior run]).
- Marked queue item `failed` (was `in_progress`) rather than leaving `pending`, so the
  scheduler/human reviewer can distinguish "attempted and blocked" from "never run."
