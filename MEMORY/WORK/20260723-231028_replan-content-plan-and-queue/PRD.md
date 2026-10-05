---
task: audit content plan and refill night-shift queue
slug: 20260723-231028_replan-content-plan-and-queue
effort: standard
phase: complete
progress: 8/8
mode: interactive
started: 2026-07-23T23:10:28-04:00
updated: 2026-07-23T23:14:02-04:00
---

## Context

Night-shift job `replan-20260723`. Queue has 0 pending items; assigned to audit
`knowledge_base/` (14 DOCs), `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`, `posts/` on-disk
state, and `automation/off-hours/queue.json` (50 items: 17 done, 26 failed, 7 skipped, 0 pending),
then refill the queue for any remaining gaps, in strict priority order (structural fixes >
missing posts in partial series > cover batches > net-new series). Hard rules: no publish/sync/
push, no writing posts or images this job, no duplicate queue ids, only re-add failed items with
transient failure causes.

The gap-analysis doc (last updated 2026-07-22, two same-night runs) already claims a fully
reconciled state: all 14 knowledge-base docs have blog coverage, all 5 partially-built series
have contiguous part numbering, and the entire remaining backlog (27 covers across 6
series/standalone posts) is represented by non-transient `failed` cover-batch items blocked on
the documented nanobanana `API_KEY_INVALID` credential issue (21-22+ confirmations). This run's
job is to independently re-verify that claim against current disk/queue state rather than trust
it blindly, since a day has passed and content could have changed.

## Criteria

- [x] ISC-1: all 14 knowledge_base docs (DOC1-DOC14) re-confirmed to have blog series coverage
- [x] ISC-2: posts/ mdx file counts per series re-confirmed against gap-analysis tables
- [x] ISC-3: posts/ cover PNG counts per series re-confirmed against gap-analysis tables
- [x] ISC-4: queue.json item count and status breakdown re-confirmed (50 items, 0 pending)
- [x] ISC-5: every failed queue item's failure cause classified transient vs non-transient
- [x] ISC-6: no duplicate queue ids would be introduced by any new item
- [x] ISC-7: gap-analysis doc's "Updated" note refreshed with this run's confirmation or corrections
- [x] ISC-8: commit created only if queue.json and/or gap-analysis doc actually changed

## Verification

- ISC-1: `ls knowledge_base/` shows DOC1-DOC14 + supply-chain email, all 14 confirmed covered by the doc's Coverage Matrix (§2) — no diff from 2026-07-22.
- ISC-2/3: direct `find`/`ls` scan of all 18 `posts/MAS-*` dirs + 4 standalone posts matched every count in the gap-analysis tables (mdx counts, image counts, `posts/images/` empty).
- ISC-4: `jq` on queue.json confirmed 50 items, 17 done / 26 failed / 7 skipped / 0 pending.
- ISC-5: reviewed all 26 failed items by id — cover-batch failures are the documented nanobanana `API_KEY_INVALID` non-transient block; `parts-id-01..05` are non-transient content-duplicate declines; `databricks-05/06` and `watsonx-data-00..06` are content-complete but queue-failed on the cover-mandatory rule. None are transient (timeout/503) — none re-queued.
- ISC-6: no new items proposed, so no id-collision risk this run.
- ISC-7: added a new dated entry at the top of `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`.
- ISC-8: committed as `33f51c8` (gap-analysis doc only — `queue.json` unchanged by this job, so not touched or staged; a pre-existing unrelated uncommitted diff in `queue.json` predates this session and was left alone).

Capability check: Explore agent (selected in OBSERVE) was invoked via `Agent` tool in BUILD — confirmed nav/contiguity independently rather than trusting the prior audit's text claim.
