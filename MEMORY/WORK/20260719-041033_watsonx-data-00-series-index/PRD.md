---
task: write MAS-WATSONX-DATA series index blog post
slug: 20260719-041033_watsonx-data-00-series-index
effort: advanced
phase: verify
progress: 35/39
mode: interactive
started: 2026-07-19T04:10:33Z
updated: 2026-07-19T04:15:00Z
---

## Context

Night-shift automation job (queue item `watsonx-data-00-index`, priority 3, `automation/off-hours/queue.json`).
Write the series index (Part 0) for a new 6-part MAS-WATSONX-DATA series — the IBM-native
counterpart to the existing MAS-DATABRICKS series (`posts/MAS-DATABRICKS/`), built from
`knowledge_base/DOC13_IBM_WATSONX_DATA_MAXIMO_ROADMAP.md`. Follow the pattern of
`posts/MAS-DATABRICKS/2026-07-17-mas-databricks-00-series-index.mdx` and
`posts/MAS-NUCLEAR/2026-07-16-mas-nuclear-00-series-index.mdx`: an outline index drafted before
Parts 1-6 exist (their planned topics are already specified in `queue.json` items
`watsonx-data-01` through `watsonx-data-06`), linking forward to those planned slugs. Must
explicitly cross-reference MAS-DATABRICKS as the non-IBM lakehouse alternative for the same gap.
Draft only (`draft: true`); no publish/sync; local git commit at the end only.

### Risks
- Word count risk: index floor is 3,000 words; sibling indexes (Databricks, Nuclear) run ~3,500-4,000 words — must match that density, not just clear the floor.
- Image risk: DanKoeStyle is pinned as cover_style; must pick the workflow (Concept/Comparison/General) that fits an index/overview post, and nanobanana Pro can 503 — retry up to 3x, never downgrade tier.
- Content-planning doc risk: the doc's DOC5/Databricks section is known-stale from prior corrections; edit must be surgical — add the new MAS-WATSONX-DATA series without restructuring or re-litigating unrelated stale sections.
- Accuracy risk: DOC13 flags some claims as IBM-internal benchmarks (price/performance vs Photon) and some provenance as community-sourced, not primary IBM docs — must carry those caveats into the post rather than stating them as fact.
- Scope risk: must not touch queue.json (owned by the runner script) or any existing published post.

## Criteria

- [x] ISC-1: Frontmatter title present and matches series topic
- [x] ISC-2: Frontmatter description present, meta-description length
- [x] ISC-3: Frontmatter date set to 2026-07-19
- [x] ISC-4: Frontmatter slug is mas-watsonx-data-00-series-index
- [x] ISC-5: Frontmatter tags array present with relevant IBM/watsonx/Maximo tags
- [x] ISC-6: Frontmatter draft is true
- [x] ISC-7: Frontmatter tier field present matching sibling convention (executive)
- [x] ISC-8: Frontmatter author and author* fields present matching sibling convention
- [x] ISC-9: seoTitle present and under 60 characters (49 chars)
- [x] ISC-10: seoDescription present and under 160 characters (145 chars, fixed from initial 162)
- [x] ISC-11: targetQuestions present with 5 entries
- [x] ISC-12: series.name set to MAS WATSONX-DATA
- [x] ISC-13: series.part set to 0
- [x] ISC-14: series.total set to 6
- [x] ISC-15: coverImage frontmatter path is ./images/mas-watsonx-data-00-series-index.png
- [x] ISC-16: faqs array present with 5 multi-sentence Q&A entries
- [x] ISC-17: keyTakeaways array present with 5 entries
- [x] ISC-18: tldr field present summarizing all 6 parts
- [x] ISC-19: semanticKeywords array present
- [x] ISC-20: clusterSlugs array lists all 6 planned part slugs
- [x] ISC-21: relatedSlugs includes mas-databricks-series-index as cross-reference
- [x] ISC-22: dependencies array present
- [x] ISC-23: speakableSections array present
- [x] ISC-24: body word count is at least 3,000 words (3,832 confirmed)
- [x] ISC-25: body word count lands within 10% of sibling index upper range (~3,500-4,000)
- [x] ISC-26: body has at least 7 substantive content sections (13 H2 sections confirmed)
- [x] ISC-27: body has at least 3 tables (4 confirmed)
- [x] ISC-28: body has at least one code/SQL/architecture block (Iceberg SQL block confirmed)
- [x] ISC-29: body explicitly names watsonx.data's IBM-benchmark claims as IBM-internal, not independently verified
- [x] ISC-30: body cross-references MAS-DATABRICKS series by name as the non-IBM alternative
- [x] ISC-31: body links all 6 planned parts with part-by-part descriptions
- [x] ISC-32: References section has at least 5 entries (6 present)
- [x] ISC-33: References section has at least 3 verified web URLs from DOC13's own reference list
- [x] ISC-34: MDX file exists at posts/MAS-WATSONX-DATA/2026-07-19-mas-watsonx-data-00-series-index.mdx
- [x] ISC-35: images/ directory exists at posts/MAS-WATSONX-DATA/images/
- [ ] ISC-36: BLOCKED — nanobanana Pro call failed twice with `403 PERMISSION_DENIED: API key reported as leaked`, same unrotated key blocking MAS-DATABRICKS Parts 5-6. Not a 503 (no benefit from further retry); no cover image exists. Per hard rule, no ad-hoc/lower-tier fallback used.
- [ ] ISC-37: BLOCKED — no PNG was generated (see ISC-36), so nothing to view/confirm
- [x] ISC-38: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md updated surgically to reflect the new MAS-WATSONX-DATA series index and the confirmed-still-active key blocker
- [ ] ISC-39: git commit pending — will include new MDX + content-planning doc edit (no image to commit)

## Decisions

- Workflow: TechnicalDeepDive (per night-shift routing table — architecture/overview content, no clean fit for AIModuleGuide or MigrationSeries).
- Part-by-part descriptions for Parts 1-6 sourced directly from queue.json's already-written briefs for watsonx-data-01..06, matching how the Databricks index pre-described its own unbuilt parts.
- DanKoeStyle workflow: Concept.md (index/overview post, not a head-to-head comparison — that's Part 6's job).
- On the confirmed nanobanana leaked-key blocker: did not fall back to a different model_tier or an ad-hoc non-skill prompt (both forbidden by the night-shift hard rules); did not touch queue.json (runner-owned); committed the completed MDX + content-planning edit anyway since local commits of new/updated files are explicitly allowed and the content work has standalone value for human review.

## Verification

- ISC-1..23 (frontmatter): confirmed via `python3 -c "import yaml..."` parse of the MDX frontmatter — seoTitle 49 chars, seoDescription 145 chars (fixed from an initial 162), faqs/keyTakeaways/targetQuestions all length 5, clusterSlugs length 6, draft=True, series={name: MAS WATSONX-DATA, part: 0, total: 6}.
- ISC-24..28 (body depth): word count 3,832 (`python3` word split on body after frontmatter), 13 `^## ` headers, 4 markdown tables (`grep -n "^|---"`), 1 fenced SQL code block (Iceberg `CREATE DATALAKE TABLE` example, sourced verbatim from DOC13 §4.3).
- ISC-29..31: verified by direct read of the written file — the "IBM's own benchmark claims are labeled as IBM-internal" theme paragraph, the MAS-DATABRICKS cross-reference in "Where This Series Fits" + "Start the Series" + FAQ 2, and the full 6-part guide section.
- ISC-32..33: References section has 6 entries, all sourced from DOC13 §12's own already-resolved URL list.
- ISC-34..35: confirmed via file creation success and `mkdir -p` output.
- ISC-36..37: FAILED — two nanobanana Pro calls both returned `403 PERMISSION_DENIED: API key reported as leaked`. This matches the exact, still-unresolved blocker documented in `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` for MAS-DATABRICKS Parts 5-6. Confirmed non-transient (permission/credential error, not a 503 capacity error) — further retries would not help.
- ISC-38: confirmed via Edit tool diffs to the gap-analysis doc (new DOC13 row, updated Executive Status bucket, updated header timeline).
- ISC-39: pending — commit executed next.
- **Capability invocation check:** MaximoBlog skill — invoked via `Skill("MaximoBlog", ...)` in BUILD ✓. DanKoeStyle skill — invoked via `Skill("DanKoeStyle", ...)` in BUILD ✓ (its Concept workflow prompt template was then sent to nanobanana, which failed on the leaked-key error — the skill itself was invoked correctly; the downstream tool call failed). Art skill's prompt-engineering technique was applied inline (structured prompt following the Concept.md template) rather than via a separate `Skill("Art")` call — noted as a minor deviation in LEARN.
