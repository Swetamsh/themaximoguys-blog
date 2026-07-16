---
task: Build WO Missing-Pieces blog series from DOC7
slug: 20260715-134700_wo-missing-pieces-series
effort: extended
phase: complete
progress: 22/22
mode: interactive
iteration: batch-parts-2-6
started: 2026-07-15T19:27:13Z
updated: 2026-07-15T19:52:00Z
---

## Batch Update (Parts 2-6) — 2026-07-15T19:52Z

User approved batching the remaining parts. 5 parallel general-purpose writers each mirrored the
Part 1 exemplar and wrote directly to disk, grounded in their DOC7 section:
- Part 2 Approvals (§7) · Part 3 Operational Dashboard (§8) · Part 4 Custom WO KPIs (§8.5+DOC1 §5.3)
- Part 5 Reporting BIRT→KPI (§18) · Part 6 Integration REST/Kafka (§17, finale)

VERIFIED (python across all 7): parts 0-6 present, total 6, every seoTitle<60 & seoDescription<160,
all coverImage ./images/, author "Swetansh Kumar", nav chain resolves, each content part has
audience callout + Key Takeaways + References + Series Navigation + brand footer (2,300-3,144 words).
Anti-dup confirmed: all 6 content parts reference-out to MAS-MANAGE/sibling content, none duplicate.
Cover images still deferred (images/ empty). SERIES DRAFT COMPLETE; covers = separate step.

## Context

Build the "WO Missing-Pieces" series (DOC7 gap-filler from the gap analysis). Series = index + 6
parts. THIS RUN = index (00) + Part 1 (Service Requests) only; parts 2-6 batched next run (user's
MAS-MANAGE cadence). Folder `posts/MAS-WORK-ORDER-OPS/`, series.name "MAS WORK ORDER OPS", total 6.
Author "Swetansh Kumar". Cover images skipped (./images/ paths referenced). EDGE-FILLER: no overlap
with MANAGE-03/06/07. Grounded in DOC7 §6; MaximoBlog skill (ConceptExplainer) invoked; repo MDX schema.

Files written this run:
- posts/MAS-WORK-ORDER-OPS/2026-07-15-wo-missing-pieces-00-series-index.mdx
- posts/MAS-WORK-ORDER-OPS/2026-07-15-wo-missing-pieces-01-service-requests.mdx

## Criteria

- [x] ISC-1: Index file created in posts/MAS-WORK-ORDER-OPS/
- [x] ISC-2: Index frontmatter series.name="MAS WORK ORDER OPS", part=0, total=6
- [x] ISC-3: Index lists all 6 parts with title + focus + read time
- [x] ISC-4: Index frontmatter is valid YAML (PyYAML parsed)
- [x] ISC-5: Index seoTitle <60 (48)
- [x] ISC-6: Index seoDescription <160 (155 after fix)
- [x] ISC-7: Part 1 named 2026-07-15-wo-missing-pieces-01-service-requests.mdx
- [x] ISC-8: Part 1 has full required MDX frontmatter (parsed)
- [x] ISC-9: Part 1 series.part=1, total=6
- [x] ISC-10: Part 1 covers SR application changes (§6.1 old-vs-new table)
- [x] ISC-11: Part 1 covers Service Request RBA (§6.2)
- [x] ISC-12: Part 1 covers SR Mobile 9.0/9.1 (§6.3)
- [x] ISC-13: Part 1 edge-filler — no MANAGE-03/06/07 duplication (SR-specific; links out to them)
- [x] ISC-14: Part 1 version-explicit (9.0 and 9.1 sections)
- [x] ISC-15: Part 1 has audience callout + Key Takeaways
- [x] ISC-16: Part 1 References section cites IBM docs
- [x] ISC-17: Part 1 TMG second-person voice (audience callout, old-vs-new, key insights)
- [x] ISC-18: Both files coverImage use ./images/ relative path
- [x] ISC-19: Nav chain index→01 set (5 blog/ links found)
- [x] ISC-20: Both files author "Swetansh Kumar"
- [x] ISC-A1: Cover images NOT generated (images/ empty)
- [x] ISC-A2: Parts 2-6 NOT written this run (only 2 .mdx files present)

## Verification

- [x] PyYAML parsed both frontmatters cleanly (no YAML errors)
- [x] seoTitle 48/50 <60; seoDescription 155/156 <160
- [x] series.part 0/1, total 6 correct; author correct on both
- [x] anti-criteria: `ls *.mdx` = 2, `ls images/` = 0 (parts 2-6 + covers deferred)
- [x] Capability invoked: Skill("MaximoBlog") ConceptExplainer workflow

## Decisions

- Edge-filler framing enforced throughout; "Where This Series Fits" table in index routes core WO
  topics back to MAS MANAGE parts 3/6/7 to avoid duplication.
- Honest-gap emphasis: SR-to-WO single-screen conversion removed (DOC7 §6.2) is the anchor insight.
- Remaining: batch parts 2-6 (Approvals, Operational Dashboard, Custom WO KPIs, Reporting, Integration)
  next run; then generate 7 cover images via BlogCoverArt (16:9, @themaximoguys).
