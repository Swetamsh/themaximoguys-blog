---
task: Gap-analysis MAS9 upgrade docs versus written blogs
slug: 20260715-133122_mas9-docs-to-blogs-gap-analysis
effort: extended
phase: complete
progress: 27/27
mode: interactive
started: 2026-07-15T17:31:22Z
updated: 2026-07-15T17:46:00Z
---

## Context

Resumed an abnormally-terminated session. Workflow: turn each MAS 9 upgrade research DOC
(`/root/TMG_MAS9_UPGRADE/DOC1..DOC12`) into a blog series in `/root/themaximoguys-blog/posts/`.
User: "identify gaps between blogs written and the docs, then we will build. Left off at DOC6."
Confirmed DOC6→MAS-JAVA-EXTENSIONS was built today. This run = ANALYSIS ONLY (build deferred).

Method: 12 parallel read-only audit agents (Explore + general-purpose), one per doc, each mapping
doc section-headings vs ALL of posts/ and returning a structured coverage verdict + gap list +
proposed outline. FirstPrinciples used to derive a value-to-effort priority rubric.

Deliverable: `/root/themaximoguys-blog/content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`.

### Results summary
- BUILT_FULL (4): DOC1 Manage, DOC3 Paid Add-ons/Industry, DOC4 Supply-Chain features, DOC6 Java Ext.
- PARTIAL / gaps (8 docs → ~9 new series): DOC2 (Assist/Optimizer/CivilInfra/PartsIdentifier),
  DOC5 (Databricks half), DOC7 (WO edges), DOC8+9+10 (merge → 1 Supply-Chain practitioner playbook),
  DOC11 (Reliability implementation playbook), DOC12 (Nuclear).
- Corrections: DOC2 has NO "Collaborate" app; DOC3/DOC4 were hypothesized gaps but are BUILT.
- Recommended next: WO Missing-Pieces (DOC7) — NOW-tier value, core topic, 6p, low duplication.

## Criteria

- [x] ISC-1: All 12 DOCs enumerated with title and line count
- [x] ISC-2: All 10 blog series enumerated with post counts
- [x] ISC-3: Each DOC mapped to a blog series or explicitly NONE
- [x] ISC-4: DOC1 Manage coverage verdict and named gaps recorded (BUILT_FULL)
- [x] ISC-5: DOC2 Suite Add-ons coverage verdict and named gaps recorded (PARTIAL — 4 apps)
- [x] ISC-6: DOC3 Paid Add-ons coverage verdict and named gaps recorded (BUILT_FULL)
- [x] ISC-7: DOC4 Supply Chain coverage verdict and named gaps recorded (BUILT_FULL)
- [x] ISC-8: DOC5 Data Analytics coverage verdict and named gaps recorded (PARTIAL — Databricks)
- [x] ISC-9: DOC6 Java Extensions coverage verdict and named gaps recorded (BUILT_FULL)
- [x] ISC-10: DOC7 Work Order Mgmt coverage verdict and named gaps recorded (PARTIAL — edges)
- [x] ISC-11: DOC8 Storekeeper coverage verdict and named gaps recorded (PARTIAL — merge)
- [x] ISC-12: DOC9 Purchasing Quick Wins coverage verdict and named gaps recorded (PARTIAL — merge)
- [x] ISC-13: DOC10 Purchasing Lifecycle coverage verdict and named gaps recorded (PARTIAL — merge)
- [x] ISC-14: DOC11 Reliability Strategies coverage verdict and named gaps recorded (PARTIAL)
- [x] ISC-15: DOC12 Nuclear Add-ons coverage verdict and named gaps recorded (PARTIAL)
- [x] ISC-16: Verdicts grounded in actual doc section headings (agents grepped ^## )
- [x] ISC-17: Verdicts grounded in actual blog post titles/frontmatter
- [x] ISC-18: Partial-coverage cases name the specific existing post (e.g. MANAGE-04, FEATURES-14)
- [x] ISC-19: Unmapped series (ADMIN/FEATURES/INTEGRATION/THINK-MAS) noted
- [x] ISC-20: Gap matrix written to durable file (content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md)
- [x] ISC-21: Each unbuilt doc gets a proposed series name and part outline
- [x] ISC-22: Build-priority ranking assigned across gap docs (4-factor rubric, 3 tiers)
- [x] ISC-23: Explicit "next to build" recommendation stated (WO Missing-Pieces / DOC7)
- [x] ISC-24: Memory updated with a gap-analysis pointer
- [x] ISC-A1: No blog posts written or generated this run (find on posts/ = empty)
- [x] ISC-A2: No coverage asserted without reading the doc and series (12-agent audit)
- [x] ISC-A3: No fabricated doc sections or post titles (grep-corroborated)

## Decisions

- Effort: Extended. Capabilities invoked: Explore agents (Task ×9), general-purpose agents (Task ×3),
  FirstPrinciples (Skill) for the priority rubric.
- DOC8+DOC9+DOC10 → ONE merged Supply-Chain practitioner playbook (all 3 agents concurred).
- DOC7 → 6-part edge-filler only (a full WO series would ~70% duplicate MANAGE-03/06/07).
- DOC12 → build Part A (nuclear) only; Part B (7.6-vs-MAS) already covered by THINK-MAS/FEATURES.
- Priority by value-to-effort, NOT doc number (first-principles: doc number is not a value signal).

## Verification

- [x] Deliverable exists: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md (10.7 KB)
- [x] ISC-A1: `find posts/ -newermt 17:30` returned empty — zero posts touched
- [x] Databricks gap confirmed: grep databricks/lakehouse/delta/unity/medallion across posts/ = 0 hits
- [x] Assist partial confirmed: only MAS-FEATURES-14-ai-assist-optimizer.mdx exists
- [x] All 12 agent verdicts collected and reconciled into the matrix
