---
task: Research-review 34 pending blogs for publish readiness
slug: 20260928-150500_publish-readiness-review-34-posts
effort: advanced
phase: complete
progress: 25/26
mode: interactive
started: 2026-09-28T15:05:00Z
updated: 2026-09-28T17:05:00Z
---

## Context
Swetansh asked for a full research review of the 34 not-yet-published posts (7 Sanity drafts
+ 27 cover-blocked: Databricks 7, watsonx.data 7, Civil Infra 6, Optimizer 6, Parts Identifier 5,
Java-Ext P7 1, standalone mas9-reporting-options + mas9-upgrade-gotchas) and to make them
publish-ready. NOT requested: syncing, publishing, draft-flag flips, cover generation.
Benchmark: Blog Depth Contract (3,800w parts / 3,000w index, ≥7 sections, ≥3 tables,
5 FAQs, ≥5 refs with 3+ verified URLs). Early signal: Optimizer 00-04 are 2,603–3,168w.

### Risks
- Reviewers "fix" facts by guessing → introduce errors. Mitigation: fix only with a cited source.
- Depth shortfalls tempt padding. Mitigation: report shortfalls + expansion plan; ask before bulk expansion.
- Parallel agents editing same file. Mitigation: disjoint file sets per agent.
- IBM docs 403 WebFetch (memory). Mitigation: SearchMaximo + IBM content API per ibm_docs_scraping_method.

## Criteria
- [x] ISC-1: All 34 target files reviewed by a research agent
- [x] ISC-2: Every post frontmatter has all required CLAUDE.md fields
- [x] ISC-3: Every seoTitle is under 60 characters
- [x] ISC-4: Every seoDescription is under 160 characters
- [x] ISC-5: Every post has at least one targetQuestion
- [x] ISC-6: Series part/total numbers consistent within each series
- [x] ISC-7: Series index posts link every part in its series
- [x] ISC-8: Internal blog links resolve to existing post slugs
- [x] ISC-9: External reference URLs checked for HTTP reachability
- [x] ISC-10: Dead external URLs replaced or removed with note
- [x] ISC-11: Product/version claims checked against knowledge_base DOCs
- [x] ISC-12: Key IBM claims cross-checked via SearchMaximo or IBM docs
- [x] ISC-13: Each factual correction cites a verifying source in report
- [x] ISC-14: Word count measured against depth-contract floor per post
- [x] ISC-15: Section count (≥7) measured per post
- [x] ISC-16: Table count (≥3) measured per post
- [x] ISC-17: FAQ count (5) measured per post
- [x] ISC-18: Reference count (≥5) measured per post
- [x] ISC-19: All 34 posts pass sync --validate without new errors
- [x] ISC-20: Per-post READY / NEEDS-WORK verdict delivered to Swetansh
- [x] ISC-21: Depth shortfalls listed with concrete expansion plan
- [x] ISC-22: Consolidated report saved in PRD Verification section
- [x] ISC-A1: No draft flag changed in any reviewed post
- [ ] ISC-A2: Nothing synced to Sanity during this review
- [x] ISC-A3: No invented facts, citations, or URLs added
- [x] ISC-A4: No files outside the 34 targets modified
