---
task: Generate all pending blog covers now
slug: 20260720-105307_generate-all-pending-blog-covers
effort: deep
phase: complete
progress: 46/46
mode: algorithm
started: 2026-07-20T10:53:07-04:00
updated: 2026-07-20T12:20:05-04:00
---

## Context

The nanobanana/Gemini key was rotated and verified earlier this session (2026-07-20). 48
covers are missing across 7 series (verified by frontmatter-vs-disk scan). Rather than
waiting ~1.5 night-shift cycles, the operator said "ok finish them" — generate all covers
now, interactively. Session MCP server holds a stale key, so generation goes through the
direct Gemini API (`gemini-3-pro-image`, verified working this session) driven by the
skill-pipeline prompt recipes (BlogCoverArt → per-series style skill), executed by parallel
Artist agents (one per series).

Inventory (exact, from disk scan): MAS-ASSIST 7 (SketchNote), MAS-OPTIMIZER 5 (InfoBlocks),
MAS-SUPPLY-CHAIN 11 (SketchNote), MAS-RELIABILITY 8 (DanKoeStyle), MAS-NUCLEAR 8
(BlueprintBoard), MAS-DATABRICKS 2 (SketchNote, must match existing 00-04), MAS-WATSONX-DATA
7 (BlueprintBoard). Styles come from queue.json cover-batch items (source of truth).

### Risks

- Pro-tier 503s under 7-way parallel load → two waves (4 agents, then 3), serial within
  series, retry 503 up to 3x, never fall back to Flash.
- Agents using the session MCP (stale key) → briefs mandate direct API via Bash.
- Density/quality misses → agents self-verify each image visually; main loop re-verifies
  dimensions programmatically for all 48 and visually spot-checks every series.
- Thumbnail convention (`*_thumb.jpeg` seen in MAS-DATABRICKS) may be required — confirm in
  BUILD and replicate if it is the convention.

### Plan

BUILD: read night-shift cover-batch playbook; confirm thumb convention + imagemagick;
invoke Skill(BlogCoverArt) for pipeline rules; snapshot checksums of existing covers.
EXECUTE: wave 1 = supply-chain, reliability, nuclear, assist (34 covers); wave 2 =
watsonx, optimizer, databricks (14 covers). Each Artist agent: read style skill + posts'
frontmatter/titles, craft per-post prompts, generate 16:9 pro-tier, save exact paths,
create thumbs if convention, visually verify, return manifest. VERIFY: 48-file existence +
16:9 dimension check + per-series visual spot-check + checksum diff on pre-existing files.
Then mark 12 queue items done, update gap-analysis + memory. Commit only on operator
approval (ask at end).

## Criteria

Per-series (exists = at the exact `coverImage` frontmatter path):

- [x] ISC-1: All 7 MAS-ASSIST cover files exist at frontmatter paths
- [x] ISC-2: MAS-ASSIST covers are 16:9 aspect ratio
- [x] ISC-3: MAS-ASSIST covers use SketchNote visual-metaphor style
- [x] ISC-4: MAS-ASSIST covers show @themaximoguys attribution
- [x] ISC-5: MAS-ASSIST covers dense, no large empty voids
- [x] ISC-6: All 11 MAS-SUPPLY-CHAIN cover files exist at frontmatter paths
- [x] ISC-7: MAS-SUPPLY-CHAIN covers are 16:9 aspect ratio
- [x] ISC-8: MAS-SUPPLY-CHAIN covers use SketchNote visual-metaphor style
- [x] ISC-9: MAS-SUPPLY-CHAIN covers show @themaximoguys attribution
- [x] ISC-10: MAS-SUPPLY-CHAIN covers dense, no large empty voids
- [x] ISC-11: All 8 MAS-RELIABILITY cover files exist at frontmatter paths
- [x] ISC-12: MAS-RELIABILITY covers are 16:9 aspect ratio
- [x] ISC-13: MAS-RELIABILITY covers use DanKoeStyle per queue assignment
- [x] ISC-14: MAS-RELIABILITY covers show @themaximoguys attribution
- [x] ISC-15: MAS-RELIABILITY covers dense, no large empty voids
- [x] ISC-16: All 8 MAS-NUCLEAR cover files exist at frontmatter paths
- [x] ISC-17: MAS-NUCLEAR covers are 16:9 aspect ratio
- [x] ISC-18: MAS-NUCLEAR covers use BlueprintBoard style
- [x] ISC-19: MAS-NUCLEAR covers show @themaximoguys attribution
- [x] ISC-20: MAS-NUCLEAR covers dense, no large empty voids
- [x] ISC-21: All 5 MAS-OPTIMIZER cover files exist at frontmatter paths — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-22: MAS-OPTIMIZER covers are 16:9 aspect ratio — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-23: MAS-OPTIMIZER covers use InfoBlocks style — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-24: MAS-OPTIMIZER covers show @themaximoguys attribution — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-25: MAS-OPTIMIZER covers dense, no large empty voids — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-26: Both MAS-DATABRICKS 05-06 cover files exist at frontmatter paths — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-27: MAS-DATABRICKS 05-06 covers are 16:9 aspect ratio — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-28: MAS-DATABRICKS 05-06 covers match existing 00-04 SketchNote look — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-29: MAS-DATABRICKS 05-06 covers show @themaximoguys attribution — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-30: MAS-DATABRICKS 05-06 covers dense, no large empty voids — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-31: All 7 MAS-WATSONX-DATA cover files exist at frontmatter paths — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-32: MAS-WATSONX-DATA covers are 16:9 aspect ratio — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-33: MAS-WATSONX-DATA covers use BlueprintBoard style — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-34: MAS-WATSONX-DATA covers show @themaximoguys attribution — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)
- [x] ISC-35: MAS-WATSONX-DATA covers dense, no large empty voids — DEFERRED to night-shift per operator 2026-07-20 (queue items stay pending)

Process / global:

- [x] ISC-36: Every generation used gemini-3-pro-image, never Flash tier
- [x] ISC-37: Thumbnails created if series convention requires them
- [x] ISC-38: The 8 wave-1 queue cover-batch items marked done; 4 wave-2 items left pending for night-shift
- [x] ISC-39: Gap-analysis doc rows updated to assets-complete status
- [x] ISC-40: Memory updated reflecting covers complete
- [x] ISC-41: Final report lists per-series counts with verification evidence

Anti-criteria:

- [x] ISC-A1: No pre-existing cover file overwritten (checksum-verified)
- [x] ISC-A2: No .mdx post file modified
- [x] ISC-A3: Rotated API key appears in no repo file
- [x] ISC-A4: No commit made without operator approval
- [x] ISC-A5: No cheat-sheet/infographic layout used on any cover

## Decisions

- Operator descoped wave 2 mid-run ("hold the rest for tonight"): watsonx (7), optimizer (5), databricks (2) covers stay with tonight's night-shift; their queue items remain pending. Wave 1 (34 covers, 4 agents) runs to completion now.

- Direct Gemini API instead of session MCP (stale key cached at spawn); prompts still come
  from the mandated skill pipeline — transport differs, recipe does not.
- DanKoeStyle kept for MAS-RELIABILITY: queue.json (2026-07-16) explicitly assigns it for
  covers; the 2026-03-08 "obsolete" note applies to single-image social posts.
- EnterPlanMode skipped despite Deep effort: operator gave an explicit execute directive
  ("ok finish them") in an autonomous session; plan recorded here instead.
- Two agent waves (4 then 3) to stay near the tested 4-parallel Pro-tier envelope.

## Verification

- MAS-ASSIST (ISC-1..5): agent manifest 7/7 verified; main-loop identify shows all 7 PNGs
  2752x1536 (16:9) + 7 thumbs; visual spot-check of assist-02 confirms SketchNote
  visual-metaphor style, dense edge-to-edge, short title + subtitle, @themaximoguys
  bottom-right, no cheat-sheet layout. 0 regens needed.

- MAS-NUCLEAR (ISC-16..20): agent manifest 8/8 verified; identify shows all 8 PNGs
  2752x1536 (16:9) + 8 thumbs; visual spot-check of nuclear-05 confirms BlueprintBoard
  navy-grid line-art style, CAP-loop metaphor with lockout/tagout hardware, dense
  edge-to-edge schematics, clean title + subtitle, @themaximoguys bottom-right. 0 regens.

- MAS-RELIABILITY (ISC-11..15): agent manifest 8/8 verified; identify shows all 8 PNGs
  2752x1536 (16:9) + 8 thumbs; visual spot-check of reliability-03 confirms DanKoeStyle
  black chalkboard + neon-glow spine metaphor (4 vertebrae = the 4 Manage apps), chalk pump
  background, dense edge-to-edge, clean title/subtitle, @themaximoguys bottom-right. 0 regens.

- MAS-SUPPLY-CHAIN (ISC-6..10): agent manifest 11/11; identify shows all 11 PNGs 2752x1536
  + 11 thumbs; spot-check of supply-chain-09 confirms SketchNote metaphor cover (robot
  chasing late truck up 3/7/14/30 ladder), dense, attributed, no cheat-sheet. 0 regens.
- ISC-36: all 4 agent helper scripts contain only models/gemini-3-pro-image (grep-verified).
- ISC-37: 34 _thumb.jpeg files created (7+8+8+11), 256px wide, matching series convention.
- ISC-38: 8 wave-1 queue items marked done; covers-watsonx-a/b, covers-optimizer,
  covers-databricks-56 left pending for tonight per operator descope.
- ISC-39: gap-analysis top entry added (interactive run, 4 series cover-complete) + earlier
  rotation entry retained; new 21-cover gap (ADMIN/CIVIL/PARTS-ID) documented.
- ISC-40: rotation memory updated with wave-1 completion.
- ISC-41: final per-series report delivered in conversation.
- ISC-A1: md5sum -c over 234 pre-existing images — 0 failures.
- ISC-A2: git status shows 0 modified .mdx files.
- ISC-A3: repo grep for new key — clean.
- ISC-A4: HEAD unchanged (e42950a); no commits made.
- ISC-A5: 4 series spot-checks + agent per-image reviews — no cheat-sheet layouts.
