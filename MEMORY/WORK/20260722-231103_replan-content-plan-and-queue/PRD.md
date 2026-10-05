---
task: audit content plan and refill night-shift queue
slug: 20260722-231103_replan-content-plan-and-queue
effort: advanced
phase: complete
progress: 1/1
mode: interactive
started: 2026-07-22T23:11:03-04:00
updated: 2026-07-22T23:11:03-04:00
---

## Context

Night-shift job `replan-20260722` (second invocation same night — the first already ran and
committed as `9105d50`). Assigned to audit `knowledge_base/`, `content-planning/`, `posts/`, and
`automation/off-hours/queue.json`, then refill the queue for any remaining gaps.

## Criteria

- [x] ISC-1: all 14 knowledge_base docs confirmed to have blog coverage
- [x] ISC-2: content-planning tables cross-checked against posts/ on-disk state
- [x] ISC-3: all partial series checked for contiguous part numbering
- [x] ISC-4: queue.json failed items reviewed for transient vs non-transient failures
- [x] ISC-5: no duplicate queue ids introduced
- [x] ISC-6: queue.json validated with jq empty
- [x] ISC-7: gap-analysis doc updated with dated confirmation note
- [x] ISC-8: commit created for the doc change only

## Verification

Audit found the plan already matched disk reality (it had just been reconciled by the prior
same-night run). All 27 remaining cover gaps are already represented by non-transient
`failed` queue items blocked on the documented nanobanana `API_KEY_INVALID` credential issue.
0 new queue items added. Gap-analysis doc updated with a dated confirmation note and committed
(`2820520`).

