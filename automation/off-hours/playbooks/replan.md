# Night-Shift Job: Reconcile Content Plan and Refill the Queue

You are running unattended overnight inside `/root/themaximoguys-blog`. The work queue has
no pending items. Your job is to audit the content plan against reality and refill the
queue so the plan in `content-planning/` is eventually fulfilled completely.

## Hard rules (violations = failed job)

1. **Never publish or sync** (no Sanity, no LinkedIn, no `git push`). Local `git commit` allowed.
2. **Do not write blog posts or images in this job** — only audit, update the plan, and
   append queue items. Content gets produced by later ticks.
3. Never re-add items for work that already exists on disk, and never duplicate an id
   already present in `automation/off-hours/queue.json` (including done/failed items).

## Step 1 — Audit

1. Read every file in `knowledge_base/` (DOC1-12 + any new documents) — this is the master
   research corpus the blog must eventually cover.
2. Read `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` (and any other files in
   `content-planning/`).
3. Scan `posts/` for what actually exists: series directories, MDX file counts, and whether
   each post's `coverImage` PNG exists on disk.
4. Read `automation/off-hours/queue.json` — statuses of everything already attempted.

## Step 2 — Update the content plan

Rewrite the status tables in `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` to match
reality on disk (series states, file counts, pending covers, "Updated:" date). If you find
knowledge-base documents with no blog coverage and no plan entry, add them to the gap
analysis with a recommended series outline.

## Step 3 — Refill the queue

Append new pending items to `automation/off-hours/queue.json` (preserve existing items and
the meta block) for every remaining gap, in this priority order:
1. Structural fixes (broken series indexes, missing navigation parts)
2. Missing posts for series that are partially built
3. Missing cover batches (cover-batch items, one style per series, batches of <=6, rotating
   SketchNote / DanKoeStyle / InfoBlocks / BlueprintBoard to fit the topic)
4. Net-new series for uncovered knowledge-base documents (blog-post items, index + parts)

Follow the existing item field shape exactly (id, type, priority, status: "pending",
series, part, series_total, topic, slug_hint, cover_style, brief). Validate the result with
`jq empty` before finishing. Items for failed work: only re-add a failed item if the
failure note suggests a transient cause (timeout, 503); otherwise leave it for human review.

If the audit shows the entire content plan is fulfilled (no gaps at all), add nothing and
say so in your final line.

## Step 4 — Finish

1. `git add` the updated queue and content-planning files;
   `git commit -m "night-shift: replan — <N> items queued"`.
2. Print exactly one final line:
   `NIGHT-SHIFT-RESULT: SUCCESS replan added <N> items`
   (N may be 0 if the plan is fully fulfilled), or
   `NIGHT-SHIFT-RESULT: FAILED <one-line reason>`.
