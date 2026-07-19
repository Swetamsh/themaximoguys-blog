---
task: Write MAS-WATSONX-DATA Part 3 Iceberg medallion blog post
slug: 20260719-071038_watsonx-data-03-iceberg-medallion
effort: advanced
phase: execute
progress: 31/34
mode: interactive
started: 2026-07-19T07:10:38Z
updated: 2026-07-19T07:12:00Z
---

## Context

Night-shift headless job (unattended, no human answering questions). Queue item
`watsonx-data-03-iceberg-medallion`, priority 3, part 3 of 6 in MAS-WATSONX-DATA
(IBM-native lakehouse series, companion to MAS-DATABRICKS). Brief: map the medallion
architecture (Bronze/Silver/Gold) onto Apache Iceberg for Maximo EAM objects, sourced from
DOC13 §5.3-5.4 (+ §4.3 Iceberg specifics) — ACID, schema evolution, time-travel snapshots,
Db2 `CREATE DATALAKE TABLE ... STORED BY ICEBERG` syntax, bucket-level vs table-level
registration, Sync metadata's three modes.

Prior series posts (index, Part 1, Part 2) are already committed as drafts; all three had
their cover generation FAIL identically with `403 PERMISSION_DENIED: API key reported as
leaked` on nanobanana Pro (see project memory `project_nanobanana_key_leaked_blocker`).
Part 2's frontmatter/index already forward-reference this post's exact slug and content
scope (`/blog/mas-watsonx-data-03-iceberg-medallion`, "the full WORKORDER-to-ASSET
enrichment example"), and the index's Part 3 blurb previews: `ASSET_DIM`, `WORKORDER_FACT`,
`FAILURE_FACT`, `MEASUREMENT_FACT` silver entities; Iceberg schema evolution; bucket- vs
table-level registration; Sync metadata's three modes. Those are load-bearing commitments
this post must actually deliver on, not just gesture at.

### Risks

- Nanobanana 403 leaked-key blocker is very likely still active — cover generation may fail
  again exactly as it did on the prior 3 posts in this series. Plan: attempt once through the
  mandated pipeline, document the failure, still commit content, report job outcome honestly.
- DOC13 §5.3-5.4 is fairly compact (a reference diagram + one medallion table + write-back
  section) — hitting 3,800 words requires real elaboration (worked examples, FAQs, scenarios)
  grounded in facts, not padding. SearchMaximo + web round need to add genuine substance.
- Series index and Part 2 already forward-reference specific claims about this post's content
  (named silver entities, registration distinction, Sync metadata modes) — must not contradict
  those previews.
- Part 2's "next" nav already points to this slug — must confirm slug matches exactly
  (`mas-watsonx-data-03-iceberg-medallion`) so the link isn't broken.

### Plan

Research complete: DOC13 §4.3/5.3/5.4 read; SearchMaximo sweep (Iceberg/medallion terms — no hits, expected, that's watsonx.data-product territory not Maximo-product territory; synonym-domain/FAILUREREPORT/ASSET/object-structure terms — hits used to ground the Silver-layer synonym-decoding explanation); 5 web searches yielding 7 candidate real URLs (IBM Db2 Warehouse Iceberg-table docs, IBM watsonx.data Sync-metadata docs, IBM Think Iceberg overview, IBM MAS 9.1 what's-new doc, 2 IBM-staff Medium walkthroughs, Maximo Secrets community post).

Headless/unattended run — no user present to approve an interactive plan, so per Advanced+ guidance the plan is written directly here rather than via EnterPlanMode.

Content backbone: Bronze (named tables) → Silver (ASSET_DIM/WORKORDER_FACT/FAILURE_FACT/MEASUREMENT_FACT + synonym-decoding mechanics) → Gold (feature/KPI tables) → Iceberg mechanics (ACID/schema evolution/time travel, each with a Maximo scenario) → worked WORKORDER→ASSET enrichment example extending the index's CREATE DATALAKE TABLE snippet → bucket-vs-table registration + Sync metadata's 3 modes → worked scenarios → FAQs/takeaways/references/nav. Write via MaximoBlog skill's TechnicalDeepDive workflow. Cover via BlogCoverArt→BlueprintBoard Architecture workflow→Art pipeline→nanobanana Pro/2k/16:9/high, attempted once given the known leaked-key blocker from the prior 3 series posts.

## Criteria

- [x] ISC-1: MDX file created at posts/MAS-WATSONX-DATA/2026-07-19-mas-watsonx-data-03-iceberg-medallion.mdx
- [x] ISC-2: Frontmatter includes title, description, date 2026-07-19, slug mas-watsonx-data-03-iceberg-medallion
- [x] ISC-3: Frontmatter sets draft: true
- [x] ISC-4: Frontmatter sets tier and author matching series convention
- [x] ISC-5: seoTitle field present and under 60 characters (49 chars)
- [x] ISC-6: seoDescription field present and under 160 characters (157 chars)
- [x] ISC-7: targetQuestions field present with 5 practitioner questions
- [x] ISC-8: semanticKeywords field present matching sibling depth (10 entries)
- [x] ISC-9: series block present with name, part: 3, total: 6
- [x] ISC-10: coverImage frontmatter path is ./images/mas-watsonx-data-03-iceberg-medallion.png
- [x] ISC-11: faqs field has 5 entries with multi-sentence practitioner answers
- [x] ISC-12: keyTakeaways field has 5 entries
- [x] ISC-13: tldr field present summarizing the post
- [x] ISC-14: Body word count is 3,800 words or more (4,629 words)
- [x] ISC-15: Body has at least 7 substantive H2 content sections (14)
- [x] ISC-16: Body has at least 3 markdown tables (7)
- [x] ISC-17: Body has at least 1 SQL/code block (Db2 CREATE DATALAKE TABLE Iceberg syntax) (3 code blocks)
- [x] ISC-18: Body covers Bronze layer contents mapped to named Maximo tables
- [x] ISC-19: Body covers Silver layer with ASSET_DIM, WORKORDER_FACT, FAILURE_FACT, MEASUREMENT_FACT conformed entities
- [x] ISC-20: Body covers Gold layer feature/KPI tables
- [x] ISC-21: Body explains Iceberg ACID transactions in the Maximo concurrent-write context
- [x] ISC-22: Body explains Iceberg schema evolution absorbing a Maximo attribute change
- [x] ISC-23: Body explains Iceberg time-travel snapshots with a Maximo audit/trend use case
- [x] ISC-24: Body includes a worked WORKORDER-to-ASSET enrichment example building on Db2 CREATE DATALAKE TABLE syntax
- [x] ISC-25: Body explains bucket-level vs table-level registration (Iceberg vs Delta/Hudi)
- [x] ISC-26: Body explains Sync metadata's three modes (register-new, update-existing, synchronize-all)
- [x] ISC-27: References section has 5+ entries with 3+ real verified web URLs (9 entries, 7 real URLs)
- [x] ISC-28: DOC13 knowledge base sections 4.3, 5.3, 5.4 read and cited as primary source
- [x] ISC-29: SearchMaximo skill invoked for at least 2 core-topic searches
- [x] ISC-30: MaximoBlog skill invoked and its TechnicalDeepDive workflow followed
- [x] ISC-31: Series navigation confirmed consistent (Part 2 next-link and index Part 3 section already point to this exact slug; no edits needed)
- [x] ISC-32: Cover image attempted via BlogCoverArt analysis + BlueprintBoard skill + Art pipeline + nanobanana model_tier pro/2k/16:9/high, outcome documented (success or honest failure) — FAILED: `403 PERMISSION_DENIED: API key reported as leaked`, identical to the prior 3 series posts (index, Part 1, Part 2); not retried since this is a non-transient auth failure, not a 503
- [ ] ISC-33: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md updated to reflect this post's existence and status
- [ ] ISC-34: New files (+ gap-analysis doc) committed locally with night-shift commit message, no push

