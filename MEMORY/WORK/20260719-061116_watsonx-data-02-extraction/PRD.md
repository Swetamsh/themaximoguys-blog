---
task: write MAS-WATSONX-DATA Part 2 — MIF/Kafka/bulk export extraction patterns
slug: 20260719-061116_watsonx-data-02-extraction
effort: advanced
phase: complete
progress: 30/31
mode: interactive
started: 2026-07-19T06:11:16Z
updated: 2026-07-19T06:20:46Z
---

## Context

Night-shift automation job (queue item `watsonx-data-02-data-extraction`, priority 3,
`automation/off-hours/queue.json`). Write Part 2 of the 6-part MAS-WATSONX-DATA series —
"Getting Maximo Data into watsonx.data: MIF, Kafka, and Bulk Export" — built from
`knowledge_base/DOC13_IBM_WATSONX_DATA_MAXIMO_ROADMAP.md` §5.1-5.2 (Cloud Pak for Data as
integration fabric; three sanctioned extraction patterns: MIF REST/JSON, Kafka source
connector, MAS 9.1 async bulk export). Follow the pattern already established by
`posts/MAS-WATSONX-DATA/2026-07-19-mas-watsonx-data-01-why-open-lakehouse.mdx` (Part 1,
already written) and its analog `posts/MAS-DATABRICKS/2026-07-17-mas-databricks-02-data-flows.mdx`.
Part 1's "Next" already points to this slug; the series index (Part 0) already lists this
part's description and forward-links to Part 3 — no index/navigation edits needed beyond
confirming the chain. Draft only (`draft: true`); no publish/sync; local git commit at the
end only.

### Risks
- **Cover image risk (materialized):** a pre-write nanobanana Pro probe (1k, simple test prompt) returned the same `403 PERMISSION_DENIED: API key reported as leaked` error that blocked the last two watsonx-data sessions (00-index, 01-why-open-lakehouse) on 2026-07-17/18/19. This is a confirmed credential-level block, not transient — no further retries planned per `project_nanobanana_key_leaked_blocker` memory. The post will be written and committed regardless; cover generation will be reported as a documented, non-blocking-for-commit failure.
- Word count risk: series parts run ~4,000-4,500 words (Part 1: 4,066); the MAS-DATABRICKS analog (Part 2, data-flows) ran 5,233 — target the series' own range, not the heavier analog's.
- Accuracy risk: DOC13 flags IBM price/performance figures as internal benchmarks; this topic (extraction mechanics) is mostly factual/architectural, lower risk than Part 1's ROI claims, but any IBM-stated capability (e.g. "synonym-domain internal values") should still be attributed to IBM documentation, not asserted as universally true across all MAS versions.
- Scope risk: must not touch queue.json (runner-owned) or rewrite Part 1/Part 0 beyond navigation confirmation.

### Think-phase additions
- **Distinct-mechanism risk (surfaced in THINK):** IBM's own docs describe TWO separate MAS 9.1 export mechanisms — a UI-triggered download capped at 60K rows (`ibm.com/docs/en/masv-and-l/cd?topic=data-exporting`), and DOC13's "asynchronous, page-by-page export to S3/MIF global directory" for larger extracts. Must present both distinctly, not conflate them.
- **Preview-feature risk:** IBM's 2026 Confluent acquisition (Kafka/Flink real-time streaming folded into watsonx.data, "Context in watsonx.data") is private-preview per web research as of May 2026 — mention only as forward direction, not shipped GA capability.
- Research complete: DOC13 §5.1-5.2 (primary), SearchMaximo KB (Kafka event-streams config doc, bulk-export/object-structure doc), 3 web searches with resolved URLs (watsonx.data Kafka connector docs, Maximo REST/OSLC docs, MAS 9.1 exporting-data doc).

### Plan
9-section outline: (1) Why extraction architecture is the first real decision, (2) three patterns at a glance (table), (3) Method 1 MIF REST/JSON with OSLC query example, (4) Method 2 Kafka streaming with real Event Streams config specifics (6 brokers, SASL plain, port 9093, cert chain), (5) Method 3 bulk export — UI 60K-row cap vs. async paginated S3/MIF-global-dir kept distinct, (6) Cloud Pak for Data fabric (Presto connection port 443/8443, Db2 Warehouse operator), (7) core Maximo tables + named bronze columns (table), (8) SaaS vs. self-managed DB-direct constraint, (9) worked example + practical notes before Part 3. No EnterPlanMode — unattended night-shift job with no human to approve a plan; Plan is recorded here for accountability instead.

## Verification

- ISC-1..16 (frontmatter): confirmed via `python3`/`yaml.safe_load` parse — all required fields present, no missing keys against the CLAUDE.md required-frontmatter list.
- ISC-17..21 (body depth): word count 3,956 (Python word split on body after frontmatter, after the seoDescription trim), 13 `^## ` H2 headers, 5 markdown tables (`^\|---` count), 3 fenced code/diagram blocks (MIF OSLC query, Kafka pipeline ASCII, bulk-export pipeline ASCII).
- ISC-22..25: confirmed by direct read of the written sections — Method 1/2/3 each get a dedicated H2 with named IBM specifics (OSLC query syntax, 6-broker Kafka config with SASL/cert details, 60K-row-vs-async-export distinction), CPD section names port 443/engine 8443 explicitly, core-tables table names WORKORDER/ASSET/FAILUREREPORT/MEASUREMENT plus named bronze columns, and a dedicated "SaaS Constraint" H2 section states the DB-sealed rule explicitly.
- ISC-26: References section has 7 entries, 5 verified web URLs (extracted via regex from the References block) plus 2 internal-KB citations converted to plain-text (non-broken-link) citations after an initial draft used empty `()` markdown links.
- ISC-27..28: confirmed via file existence check and direct read of the Series Navigation table.
- ISC-29: FAILED — nanobanana Pro rejected both the pre-write probe (1k test prompt) and the full BlueprintBoard-Architecture-engineered prompt with the identical `403 PERMISSION_DENIED: leaked API key` error. Non-transient credential block, third consecutive watsonx-data session to hit it — no further retries attempted.
- ISC-30: confirmed via Edit tool diffs to the content-planning doc (new dated entry pushing the prior Part 1 entry to "Prior update," Executive Status bucket row updated from "Index + Part 1" to "Index + Parts 1-2," DOC13 row updated to reflect Part 2).
- ISC-31: pending — commit executed next.
- **Capability invocation check:** SearchMaximo skill — invoked via `Skill("SearchMaximo", ...)` in OBSERVE ✓. WebSearch — 3 real tool calls in OBSERVE ✓. MaximoBlog skill — invoked via `Skill("MaximoBlog", ...)` in BUILD ✓ (its TechnicalDeepDive workflow read and applied, adapted to match the series' own established richer frontmatter convention rather than the skill's generic template, consistent with how Parts 0/1 were built). BlueprintBoard skill — invoked via `Skill("BlueprintBoard", ...)` in EXECUTE ✓, its Architecture workflow template read and used to engineer the actual nanobanana prompt (post-specific metaphor/labels substituted into the skill's own composition/color/prompt-template language, not an ad-hoc prompt) — the downstream `mcp__nanobanana__generate_image` call then failed on the credential error, but the skill invocation and prompt-engineering step were both genuine, not phantom.

## Learning

- Should have treated the pre-write nanobanana probe result as sufficient confirmation and skipped the second full-prompt Pro-tier attempt later in EXECUTE — the hard rules require the skill pipeline for the *attempt that counts*, but re-spending a full Pro call on an already-confirmed-dead credential within the same session added no new information.
- A smarter algorithm would cache "external tool health" as session-level state (probe once, reuse the result for every subsequent item in the same night-shift run) rather than each queue item rediscovering the same blocker independently — this is the third consecutive watsonx-data session to hit and re-document the identical `403 leaked key` error.
- The distinct-mechanism catch in THINK (UI 60K-row export vs. DOC13's async pipeline export) was the single highest-value research finding this session — it came from web verification, not the primary DOC13 source, reinforcing that the mandatory 3-search web round earns its place even when the primary knowledge-base source is already rich.
- Recorded no new persistent memory — the existing `project_nanobanana_key_leaked_blocker` memory already covers this exact recurrence; a fourth independent memory write would be redundant. Worth updating that memory's "confirmed still active" language with today's third reconfirmation instead of creating a new entry, if continuing past this session.

## Criteria

- [x] ISC-1: Frontmatter title present and matches Part 2 topic
- [x] ISC-2: Frontmatter description present, meta-description length
- [x] ISC-3: Frontmatter date set to 2026-07-19
- [x] ISC-4: Frontmatter slug is mas-watsonx-data-02-data-extraction
- [x] ISC-5: Frontmatter tags array present with relevant IBM/watsonx/Maximo/MIF/Kafka tags
- [x] ISC-6: Frontmatter draft is true
- [x] ISC-7: Frontmatter tier field present matching sibling convention (developer)
- [x] ISC-8: Frontmatter author and author* fields present matching Part 1's convention
- [x] ISC-9: seoTitle present and under 60 characters (54 chars)
- [x] ISC-10: seoDescription present and under 160 characters (156 chars, fixed from initial 160)
- [x] ISC-11: targetQuestions present with 5 entries
- [x] ISC-12: series.name set to MAS WATSONX-DATA, series.part set to 2, series.total set to 6
- [x] ISC-13: coverImage frontmatter path is ./images/mas-watsonx-data-02-data-extraction.png
- [x] ISC-14: faqs array present with 5 multi-sentence Q&A entries
- [x] ISC-15: keyTakeaways array present with 5 entries
- [x] ISC-16: tldr, semanticKeywords, dependencies, clusterSlugs, relatedSlugs fields present
- [x] ISC-17: body word count is at least 3,800 words (3,956 confirmed)
- [x] ISC-18: body word count lands within 10% of series' own upper range (3,956 vs. Part 1's 4,066 — well within range)
- [x] ISC-19: body has at least 7 substantive content sections (13 H2 sections confirmed)
- [x] ISC-20: body has at least 3 tables (5 confirmed)
- [x] ISC-21: body has at least one code/config block (3 confirmed: MIF OSLC query, Kafka pipeline diagram, bulk-export pipeline diagram)
- [x] ISC-22: body covers all 3 extraction methods (MIF REST/JSON, Kafka connector, bulk export) with named IBM specifics
- [x] ISC-23: body names Cloud Pak for Data as integration fabric with connection parameters (port 443, engine 8443)
- [x] ISC-24: body names core Maximo tables (WORKORDER/ASSET/FAILUREREPORT/MEASUREMENT) with real column names
- [x] ISC-25: body notes the SaaS-vs-self-managed DB-direct constraint explicitly (dedicated section)
- [x] ISC-26: References section has at least 5 entries, 3+ verified web URLs (7 entries, 5 verified web URLs)
- [x] ISC-27: Series navigation table links back to Part 1 and forward to Part 3 (mas-watsonx-data-03-iceberg-medallion)
- [x] ISC-28: MDX file exists at posts/MAS-WATSONX-DATA/2026-07-19-mas-watsonx-data-02-data-extraction.mdx
- [ ] ISC-29: BLOCKED — nanobanana Pro probe call AND the full BlueprintBoard-Architecture-engineered prompt both failed with `403 PERMISSION_DENIED: API key reported as leaked`, same unrotated key confirmed still active a third time (blocked MAS-DATABRICKS Parts 5-6, watsonx-data-00, watsonx-data-01). No cover image generated; no further retries per project memory (non-transient credential error).
- [x] ISC-30: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md updated surgically (new top "Updated" entry, Executive Status bucket row, DOC13 row) to reflect Part 2 now existing
- [ ] ISC-31: pending — commit executed next
