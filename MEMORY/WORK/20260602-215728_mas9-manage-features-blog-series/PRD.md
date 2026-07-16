---
task: MAS 9 Manage features deep-research blog series
slug: 20260602-215728_mas9-manage-features-blog-series
effort: advanced
phase: complete
progress: 18/26
mode: interactive
started: 2026-06-02T21:57:28Z
updated: 2026-06-02T21:57:28Z
---

## Context

User wants a blog series strictly on **IBM Maximo Manage (MAS 9) features** — the Manage
application itself: Work Centers, Reliability Strategies, Inspections, Work Management,
Scheduling, Inventory/Procurement, Mobile, Asset/Location, automation/config. NOT the AI
add-on suites (Health, Monitor, Predict, MVI) which already have their own series, and NOT
generic integration (already covered by MAS-INTEGRATION series).

Deliverable: new folder `posts/manage-features/`, MaximoBlog-skill voice, repo's rich MDX
frontmatter schema (series.name/part/total, SEO fields, faqs, keyTakeaways, coverImage
`./images/...`), series index (00) + part files using `YYYY-MM-DD-manage-NN-slug.mdx`.

Deep research required (IBM docs + community) to ground every part in real MAS 9.x Manage
behavior. "We can take it from there" → lay a strong foundation, confirm structure first.

### Requested
- Series on MAS 9 Manage features only (reliability strategies, work centers, etc.)
- New folder `manage-features`
- Deep research, real technical implementation detail
- Use the blog skill (MaximoBlog) voice + repo MDX schema

### NOT requested / out of scope
- Health / Monitor / Predict / Visual Inspection AI suites (own series exist)
- Generic integration framework topics (MAS-INTEGRATION series owns these)
- Marketing fluff; unsupported claims

## Criteria

- [ ] ISC-1: New folder posts/manage-features/ created
- [ ] ISC-2: posts/manage-features/images/ subfolder created
- [ ] ISC-3: Series outline grounded in verified MAS 9 Manage feature set
- [ ] ISC-4: User confirms series scope/part-list before mass generation
- [ ] ISC-5: Series index (00) file created with repo MDX frontmatter schema
- [ ] ISC-6: Index lists every part with title, focus, read time
- [ ] ISC-7: Index frontmatter series.name="MAS MANAGE", part=0, total=N
- [ ] ISC-8: Each part file named YYYY-MM-DD-manage-NN-slug.mdx
- [ ] ISC-9: Each part has complete required MDX frontmatter
- [ ] ISC-10: Each part frontmatter coverImage uses ./images/ relative path
- [ ] ISC-11: Each part has correct series.part and series.total
- [ ] ISC-12: Navigation chain prev/next correct across all parts
- [ ] ISC-13: Work Centers part covers Supervisor/Technician/Inspection/Inventory/Procurement
- [ ] ISC-14: Reliability Strategies part covers FMEA/RCM/failure modes/strategy library
- [ ] ISC-15: Inspections part covers digital forms, inspection work center, mobile
- [ ] ISC-16: Work Management part covers WO/Job Plan/PM/routes
- [ ] ISC-17: Scheduling part covers Graphical Scheduling + Assignment
- [ ] ISC-18: Mobile part covers Maximo Mobile technician/inspection, offline
- [ ] ISC-19: Each part is version-explicit (MAS 9.x Manage)
- [ ] ISC-20: Each part cites IBM docs / sources in References section
- [ ] ISC-21: Each part uses TheMaximoGuys voice (second-person, empathetic hook)
- [ ] ISC-22: Each part includes technical implementation detail (config/steps/code)
- [ ] ISC-23: Each part includes Key Takeaways and audience callout
- [ ] ISC-24: Research conducted via Research/perplexity tool, not from memory alone
- [ ] ISC-25: No content references out-of-scope AI suites as primary topic
- [ ] ISC-26: MaximoBlog skill invoked for blog generation

## Decisions

- Series name: "MAS MANAGE" — folder posts/manage-features/, total = 11 parts + index(00).
- Confirmed via user: size series to real feature set; deliver Index + Part 1 this run; skip images.
- KEY RESEARCH FINDING: Work Centers are DEPRECATED in Manage 9.0, replaced by MAF (Maximo
  Application Framework / Graphite) role-based applications. Part 2 reframed to cover this
  transition (the user's "work centres" ask, answered accurately).
- Final part list (feature-driven):
  1 The New Manage in MAS 9 (architecture, MAF, AppPoints, what changed from 7.6)
  2 From Work Centers to Role-Based Applications (deprecation + MAF/Graphite app model)
  3 Work Management (WO, Job Plans+Qualifications/milestones, PM, Routes status, WO Planning, Work Queue Mgr)
  4 Reliability Strategies (FMEA/RCM, 58k-failure-mode library, RPN, custom strategies, 9.1 AI)
  5 Inspections & Digital Forms (Inspection Forms MAF app, Form Builder, scoring, mobile)
  6 Maximo Mobile for Manage (Technician/Inspections, offline sync, replacing Anywhere)
  7 Graphical Scheduling, Assignment & FSM (Scheduler, Planning/Dispatching Dashboards, qualifications/crews)
  8 Asset & Location Management (assets, locations, meters, ACM, linear, condition monitoring)
  9 Inventory & Procurement (storerooms, reorder, POs, contracts, Issues & Transfers RBA)
  10 Maximo AI inside Manage (Work Order Intelligence/watsonx, Maximo Assistant, AI Configuration)
  11 Configuring & Administering Manage (automation scripts, workflow, escalations, App Designer, DB Config, Formulas, admin split)
- Version facts grounded: 9.0 (FSM, Emissions, Work Order Intelligence, Qualifications, deprecations),
  9.1 (Maximo Assistant, unified nav, new MAF admin apps, BIRT 4.16), 9.2 (Assistant scope, Condition
  Insight, Power arch). Anywhere EOL'd at 8.9; Digital Twin Exchange removed 9.0.

## Verification

This run = Index(00) + Part 1, per user choice. Parts 2-11 deferred to next run(s).

- [x] ISC-1: posts/manage-features/ created (ls confirmed)
- [x] ISC-2: posts/manage-features/images/ created (ls confirmed)
- [x] ISC-3: Outline grounded in 3 research passes (perplexity x2 + web/WebFetch); Work Center deprecation verified
- [x] ISC-4: User confirmed scope/batch/images via AskUserQuestion
- [x] ISC-5: Index file created, frontmatter parses (PyYAML OK)
- [x] ISC-6: Index lists all 11 parts with title/focus/read time table + per-part guide
- [x] ISC-7: Index series.name="MAS MANAGE", part=0, total=11 (verified)
- [x] ISC-8: Files named 2026-06-02-manage-00-...mdx and -01-...mdx
- [x] ISC-9: Part 1 has full required MDX frontmatter (parses OK) [parts 2-11 deferred]
- [x] ISC-10: coverImage uses ./images/ relative path in both files
- [x] ISC-11: Part 1 series.part=1, total=11 (verified)
- [~] ISC-12: index→1→2 nav set; full chain completes as parts 2-11 are written
- [~] ISC-13..18: deferred — those parts not in this run (index links them)
- [x] ISC-19: Part 1 version-explicit (7.6 vs MAS 9, 9.0/9.1 cited)
- [x] ISC-20: References section cites IBM docs + Maximo Secrets
- [x] ISC-21: TMG voice — audience callout, second-person, old-vs-new, commandments
- [x] ISC-22: Part 1 technical detail (SQL, container/CR model, tables, checklist)
- [x] ISC-23: Key Takeaways + audience callout present
- [x] ISC-24: Research done via perplexity_research + WebSearch + WebFetch subagent
- [x] ISC-25: AI suites kept out of scope; Manage-embedded AI flagged for Part 10 only
- [x] ISC-26: MaximoBlog skill invoked via Skill tool (ConceptExplainer workflow)
