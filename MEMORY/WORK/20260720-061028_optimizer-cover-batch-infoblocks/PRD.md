---
task: generate 5 missing MAS-OPTIMIZER covers InfoBlocks style
slug: 20260720-061028_optimizer-cover-batch-infoblocks
effort: advanced
phase: complete
progress: 5/30
mode: night-shift
started: 2026-07-20T06:10:28Z
updated: 2026-07-20T06:40:00Z
---

## Context

Night-shift work item `covers-optimizer`: generate the 5 missing 16:9 cover images for
the `MAS-OPTIMIZER` series (`posts/MAS-OPTIMIZER/`) using the InfoBlocks style skill.
Series has 6 files (00 index + 01-05); only Part 5's cover exists on disk
(`images/mas-optimizer-05-dispatching-rollout.png`). Missing: 00, 01, 02, 03, 04.

Known active risk per project memory (`project_nanobanana_key_leaked_blocker.md`) and
`content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`: nanobanana Pro calls have failed
`403 leaked API key` on every night-shift job since at least 2026-07-17, blocking
MAS-DATABRICKS Parts 5-6 and all of MAS-WATSONX-DATA. Must verify current status with
one test call before committing to the full 5-image pipeline; if still broken, fail
fast per job step 3 (`NIGHT-SHIFT-RESULT: FAILED ...`) rather than burning retries.

Not requested / explicitly forbidden: publishing, syncing, git push, editing post MDX
content, any non-Pro model tier, ad-hoc prompts bypassing the InfoBlocks skill.

## Criteria

- [x] ISC-1: Confirmed via test call whether nanobanana Pro tier is currently functional
- [x] ISC-2: posts/MAS-OPTIMIZER/*.mdx frontmatter coverImage paths read for all 6 files
- [x] ISC-3: Missing-cover set confirmed as {00,01,02,03,04} by disk check
- [x] ISC-4: BlogCoverArt content-analysis technique read (SKILL.md)
- [x] ISC-5: InfoBlocks SKILL.md read for palette/aesthetic rules
- [x] ISC-6: InfoBlocks Workflows/ directory read to pick fitting workflow file
- [ ] ISC-7: Art skill prompt-engineering pattern read (SKILL.md + GeneratePrompt.ts) — SKILL.md read; GeneratePrompt.ts not reached, generation blocked before that step mattered
- [x] ISC-8: Distinct visual metaphor identified for post 00 (series index)
- [ ] ISC-9: Distinct visual metaphor identified for post 01 (why optimization)
- [ ] ISC-10: Distinct visual metaphor identified for post 02 (optimization model)
- [ ] ISC-11: Distinct visual metaphor identified for post 03 (data prerequisites)
- [ ] ISC-12: Distinct visual metaphor identified for post 04 (routing/ArcGIS)
- [ ] ISC-13: Image 00 generated with model_tier=pro, 2k, high thinking, 16:9
- [ ] ISC-14: Image 01 generated with model_tier=pro, 2k, high thinking, 16:9
- [ ] ISC-15: Image 02 generated with model_tier=pro, 2k, high thinking, 16:9
- [ ] ISC-16: Image 03 generated with model_tier=pro, 2k, high thinking, 16:9
- [ ] ISC-17: Image 04 generated with model_tier=pro, 2k, high thinking, 16:9
- [ ] ISC-18: Image 00 response metadata confirmed model_tier=pro (not auto/flash)
- [ ] ISC-19: Image 01 response metadata confirmed model_tier=pro (not auto/flash)
- [ ] ISC-20: Image 02 response metadata confirmed model_tier=pro (not auto/flash)
- [ ] ISC-21: Image 03 response metadata confirmed model_tier=pro (not auto/flash)
- [ ] ISC-22: Image 04 response metadata confirmed model_tier=pro (not auto/flash)
- [ ] ISC-23: All 5 PNGs viewed with Read tool for density/brand/attribution compliance
- [ ] ISC-24: All 5 PNGs saved at exact coverImage frontmatter path from their post
- [ ] ISC-25: No .mdx post content file was modified (anti-criteria)
- [ ] ISC-26: No publish/sync/LinkedIn/git-push action was taken (anti-criteria)
- [ ] ISC-27: DOCS-TO-BLOGS-GAP-ANALYSIS.md updated to reflect MAS-OPTIMIZER cover-complete
- [ ] ISC-28: New images + content-plan edit committed locally with descriptive message
- [ ] ISC-29: git commit contains no unrelated staged files
- [ ] ISC-30: Exactly one NIGHT-SHIFT-RESULT line printed at the end

## Decisions

- Stopped after the first real generation attempt (post 00) instead of running a separate
  throwaway test call — same cost, and it would have produced the index cover if the key
  were live. Response was `403 PERMISSION_DENIED: API key reported as leaked`, byte-identical
  to the error logged in `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` on 2026-07-17/18/19
  for MAS-DATABRICKS Parts 5-6 and every MAS-WATSONX-DATA cover attempt.
- Did not retry 3x/30s — that retry policy is reserved for 503 (transient overload) per the
  job's own rules. 403 leaked-key is a non-transient auth failure; retrying wastes time against
  a dead credential. Confirmed via memory (`project_nanobanana_key_leaked_blocker.md`) this has
  been the case on every prior attempt since 2026-07-17 with zero successes.
- Did not touch `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` — its update condition
  ("whole series now has all covers on disk") wasn't met; MAS-OPTIMIZER stays at 1/6.
- No git commit — no new image files and no content-plan edit were produced, so there is
  nothing to commit.

## Verification

- ISC-1..6, ISC-8: verified directly above (file reads, disk listing, one real generation
  attempt used as the live functional test).
- ISC-7, ISC-9..30: not reached — blocked by the same confirmed-dead nanobanana Pro key.
  Job stops per its own "FAILED" exit path rather than proceeding partially or downgrading tier.
- Anti-criteria ISC-25 (no post content edited) and ISC-26 (no publish/sync/push) hold: only
  files touched this run are inside `MEMORY/WORK/` (this PRD) and one memory file update.
