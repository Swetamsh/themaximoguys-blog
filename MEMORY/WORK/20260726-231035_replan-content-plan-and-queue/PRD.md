---
task: audit content plan and refill night-shift queue
slug: 20260726-231035_replan-content-plan-and-queue
effort: standard
phase: complete
progress: 8/8
mode: interactive
started: 2026-07-26T23:10:35-04:00
updated: 2026-07-26T23:10:35-04:00
---

## Context

Night-shift job `replan-20260726`. Queue has 0 pending items; assigned to independently
re-audit `knowledge_base/` (14 DOCs + supply-chain email), `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`,
`posts/` on-disk state, and `automation/off-hours/queue.json` (50 items: 17 done, 26 failed,
7 skipped, 0 pending) against the gap-analysis doc's 2026-07-25 claim that the plan is fully
reconciled and every open item is correctly parked on the nanobanana `API_KEY_INVALID` blocker
(24+ confirmations, unrotated since 2026-07-20). This is the 5th consecutive replan run with no
disk changes reported; the job is to verify rather than assume that streak continues, and to
add gap coverage or queue items if reality has actually drifted.

`git diff --stat` between the last replan commit (`5ccd6d5`→`7884ff7`) and HEAD shows only
`queue.json`/gap-analysis-doc changes from the replan commit itself — no `posts/`,
`knowledge_base/`, or other `content-planning/` files touched since. Direct bash re-scan of
every series dir's mdx/png counts and coverImage-target existence reproduced the documented
27-cover gap exactly (Optimizer 5, Parts-Identifier 5, Databricks 05/06, watsonx-data 7,
Civil-Infrastructure 6, 2 standalone DOC1 posts). MAS-ADMIN's apparent "missing" covers were a
false positive from resolving root-relative `/images/mas-admin/...` paths against the wrong
base — confirmed present under `public/images/mas-admin/`.

## Criteria

- [x] ISC-1: all 14 knowledge_base docs (DOC1-DOC14) + supply-chain email re-confirmed present, no new docs
- [x] ISC-2: posts/ mdx file counts per series re-confirmed against gap-analysis tables
- [x] ISC-3: posts/ cover PNG counts per series re-confirmed against gap-analysis tables
- [x] ISC-4: queue.json item count and status breakdown re-confirmed (50 items, 0 pending)
- [x] ISC-5: every failed queue item's failure cause re-classified transient vs non-transient
- [x] ISC-6: series.part/series.total frontmatter contiguity independently re-checked via Explore agent
- [x] ISC-7: gap-analysis doc's "Updated" note refreshed with this run's confirmation or corrections
- [x] ISC-8: commit created only if queue.json and/or gap-analysis doc actually changed

### Risks

- A series could gain a new part without a matching cover queue item — mitigated by re-scanning
  mdx counts per series this run, not just trusting the doc's tables.
- A knowledge_base doc could be added mid-week and missed by a simple count — mitigated by
  `ls knowledge_base/*.md | wc -l` cross-checked against the doc's Coverage Matrix list.
- A failed item's cause could become transient (timeout/503) and get left un-requeued — mitigated
  by re-reading every failed item's `.note` field this run (all `exit=0` content-complete-but-cover-blocked
  or explicit `API_KEY_INVALID`, none transient).
- The gap-analysis doc's cover tally could silently drift from queue.json's actual failed list —
  mitigated by the direct coverImage-target existence scan reproducing the exact 27-cover count.

No ISC changes needed after premortem — the 8 criteria already cover every failure mode found.

## Verification

- ISC-1: `ls knowledge_base/*.md | wc -l` = 15 = 14 DOCs + supply-chain email, matches gap-analysis Coverage Matrix, no new docs.
- ISC-2/3: direct `find`/`ls` scan of all 20 `posts/MAS-*` dirs + 4 standalone posts; every mdx/png count matched the gap-analysis tables exactly.
- ISC-4: `jq` on queue.json confirmed 50 items, 17 done / 26 failed / 7 skipped / 0 pending.
- ISC-5: re-read `.note` field on all 26 failed items — all `exit=0` content-complete-but-cover-blocked, or explicit `API_KEY_INVALID` (covers-watsonx-a); none transient, none re-queued.
- ISC-6: Explore agent (`select:` general-purpose Explore, invoked via `Agent` tool) independently checked `series.part`/`series.total` across all 5 partial series — PASS on all five, plus a coverImage-target existence scan reproduced the exact documented 27-cover gap and caught a false-positive (MAS-ADMIN root-relative paths resolve correctly under `public/images/mas-admin/`).
- ISC-7: added a new dated 2026-07-26 entry at the top of `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`, prior 2026-07-25 entry preserved as "Prior update".
- ISC-8: committed as `b6240c6` (gap-analysis doc only — `queue.json` unchanged this run, no gaps found, so not staged; pre-existing unrelated uncommitted diffs elsewhere in the repo predate this session and were left untouched).

Capability check: Explore agent (selected in OBSERVE) was invoked via `Agent` tool in BUILD — confirmed frontmatter contiguity independently rather than trusting the prior audit's claim. No phantom capabilities.
