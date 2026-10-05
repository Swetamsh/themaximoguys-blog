---
task: write MAS-DATABRICKS part 6 governance/security blog post
slug: 20260718-001121_databricks-06-governance-blog-post
effort: deep
phase: complete
progress: 43/44
mode: headless
started: 2026-07-18T00:11:21-04:00
updated: 2026-07-18T00:11:21-04:00
---

## Context

Night-shift unattended job (automation/off-hours, queue id `databricks-06-governance`, priority 2).
Write ONE complete MDX blog post: MAS-DATABRICKS Part 6 (series finale, 6 of 6),
"Governance and Security for the MAS Lakehouse: Unity Catalog, Access, Lineage" — plus a
BlueprintBoard-style 16:9 cover image — following the night-shift system prompt's Steps 1-5,
repo CLAUDE.md, and the MaximoBlog skill. draft:true, local git commit only, no publish/sync.

The series index (Part 0) already carries a full Part 6 blurb: Unity Catalog fine-grained
column-level access control mapped to Maximo site/org security groups; data lineage tracing a
gold-layer failure prediction to its raw Maximo source (SOX / 10 CFR 50 audit angle); PII in
labor transaction data; what an auditor expects to see when a lakehouse score influenced a
maintenance decision. Part 5's "Next" link already points to
`/blog/mas-databricks-06-governance-security` — no nav edit needed there. Part 6 is the finale:
no forward "Next" link in this post's own nav table.

Known risk carried from last night's Part 5 run: nanobanana's Gemini API key was reported
403 PERMISSION_DENIED (leaked key) and has NOT been rotated (`/root/.claude-pai/.env` mtime
unchanged since 2026-03-07). Cover generation may fail again for the same root-cause reason —
attempt it per the hard rules, but the post content must not block on it.

### Risks
- Same nanobanana leaked-key 403 as Part 5 may recur — not a retry-fixable condition; if it
  recurs, the job's correct terminal state is FAILED (cover blocked) with post content complete
  and committed, exactly like Part 5's precedent, not silently skipping the image step.
- Must not invent an unverified specific Maximo REST attribute name for data-restriction
  conditional expressions — cite the real Expression Manager / Data Restrictions tab mechanism
  and the real `:orgid = 'value'` combination-rule example from the knowledge base, not a
  fabricated field.
- Must not modify Part 5 or the series index beyond what's already correct (verify only, no
  edit needed based on OBSERVE findings).

## Criteria

### Research
- [x] ISC-1: DOC5 section 4.4 (Unity Catalog governance bullets) read
- [x] ISC-2: DOC5 section 4.5/5.4 (medallion architecture, LABTRANS in silver.work_orders_enriched) read for the PII-in-labor-data angle
- [x] ISC-3: DOC5 reference-architecture diagram (Unity Catalog governance layer position) read
- [x] ISC-4: SearchMaximo skill invoked for Maximo security groups / site-org authorization / data restrictions
- [x] ISC-5: Maximo Data Restrictions / Expression Manager conditional-expression mechanism (real `:orgid` OR-combination example) read from knowledge base
- [x] ISC-6: At least 3 web searches run covering Unity Catalog row/column security, Unity Catalog lineage/audit, and Maximo/MAS 9.x security or governance sources (5 run)
- [x] ISC-7: Every References URL resolved (200 status or WebFetch-confirmed) during the research round, not guessed
- [x] ISC-8: Any knowledge-base/web discrepancy noted in an HTML comment at post bottom
- [x] ISC-9: Sibling posts (Part 5 in full, series index Part 6 blurb) read for tone/structure/promises before writing

### Frontmatter completeness
- [x] ISC-10: title, description, date (2026-07-18), slug (mas-databricks-06-governance-security) present
- [x] ISC-11: tags array present matching series conventions
- [x] ISC-12: draft: true set
- [x] ISC-13: tier and author fields present matching sibling rotation
- [x] ISC-14: seoTitle under 60 characters (48, fixed from initial 67-char draft)
- [x] ISC-15: seoDescription under 160 characters (145)
- [x] ISC-16: targetQuestions array with 5 entries present
- [x] ISC-17: series block has name "MAS DATABRICKS", part 6, total 6
- [x] ISC-18: coverImage frontmatter path is ./images/mas-databricks-06-governance-security.png
- [x] ISC-19: exactly 5 FAQs present, each with a multi-sentence practitioner-depth answer
- [x] ISC-20: exactly 5 keyTakeaways present in frontmatter
- [x] ISC-21: tldr, semanticKeywords, proficiencyLevel, dependencies, clusterSlugs, relatedSlugs all present (27 frontmatter keys total)

### Content structure & depth
- [x] ISC-22: post body word count >= 3,800 words (4,661 verified via awk/wc)
- [x] ISC-23: at least 7 substantive H2 content sections present (12 verified)
- [x] ISC-24: at least 3 markdown tables present (5 verified)
- [x] ISC-25: at least 1 SQL/REST/config code block present (3 SQL blocks verified)
- [x] ISC-26: worked example uses real Maximo object/field/API names, not abstractions (WORKORDER, LABTRANS, mxasset, actlabcost, siteid, orgid)
- [x] ISC-27: section maps Unity Catalog fine-grained (row filter / column mask) access control to Maximo security-group site/org data restrictions
- [x] ISC-28: section explains data lineage tracing a gold-layer score back to raw Maximo source
- [x] ISC-29: section covers PII in labor transaction data (LABTRANS) and masking/tokenization treatment distinct from asset/work-order data
- [x] ISC-30: section covers what an auditor expects to see when a lakehouse-derived score influenced a maintenance decision (SOX / 10 CFR 50 / FISMA angle)
- [x] ISC-31: a Common Mistakes section is present
- [x] ISC-32: a Key Takeaways closing section (5 bullets) present in body, matching frontmatter keyTakeaways
- [x] ISC-33: References section has >= 5 entries (7)
- [x] ISC-34: References includes >= 3 verified web URLs from the research round (6, all curl-200-verified)
- [x] ISC-35: post closes the series (series-finale framing, ties back to Part 1's native-first argument, no forward Next link)

### Skill/capability invocation
- [x] ISC-36: MaximoBlog skill invoked via Skill tool and its TechnicalDeepDive workflow followed
- [x] ISC-37: SearchMaximo skill invoked via Skill tool (duplicate of ISC-4, tracked for capability-invocation check)
- [x] ISC-38: BlogCoverArt-style content analysis performed before image generation (title/tags/takeaways/metaphor extracted — vault-gate-on-a-data-pipe metaphor)
- [x] ISC-39: BlueprintBoard skill's SKILL.md and matching Architecture workflow file read for prompt template and palette

### Cover image
- [x] ISC-40: image generation attempted via mcp__nanobanana__generate_image with model_tier "pro" explicitly set (2 attempts: full 2k prompt, minimal 1k retry), thinking_level high, aspect_ratio 16:9
- [ ] ISC-41: BLOCKED — both calls failed with `403 PERMISSION_DENIED: API key reported as leaked`, identical to Part 5's precedent failure; non-transient credential failure, not a 503, so retrying the same key is futile — requires operator to rotate the nanobanana server's Gemini/Google API key (confirmed still unrotated: /root/.claude-pai/.env mtime unchanged since 2026-03-07)

### Series/nav integrity & wrap-up
- [x] ISC-42: Part 5's existing "Next" link to Part 6 confirmed correct, unmodified (git diff --stat shows zero changes to that file)
- [x] ISC-43: no existing published post content modified outside verification (only the new Part 6 MDX + surgical gap-analysis edits staged/committed)
- [x] ISC-44: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md updated surgically (5 insertions/5 deletions, 3 locations); git commit c27309b created locally (no push/sync/LinkedIn); final NIGHT-SHIFT-RESULT line to be printed

## Decisions

- Effort tier: Deep (44 ISC, floor 40) — matches sibling Part 5 job's scale; series-finale post
  carries extra structural obligations (closes the series, ties back to Part 1) beyond a normal
  mid-series part.
- Following Part 5's precedent exactly on the cover-image failure mode: attempt generation per
  hard rule 5, but if the same leaked-key 403 recurs, treat post-content-complete +
  cover-blocked as a FAILED result with full evidence, not a fabricated success.

## Verification

- Post file exists at `posts/MAS-DATABRICKS/2026-07-18-mas-databricks-06-governance-security.mdx`;
  frontmatter parsed successfully with python3/yaml (27 keys); body word count 4,661 (>=3,800
  floor); 12 H2 sections; 5 tables; 3 SQL code blocks; 5 FAQs, 5 keyTakeaways, 5 targetQuestions;
  seoTitle 48 chars, seoDescription 145 chars.
- All 4 series-index-promised Part 6 elements verified present: Unity Catalog <-> Maximo
  site/org security mapping, lineage to raw source, PII in labor data (LABTRANS), auditor
  expectations (SOX/10 CFR 50/FISMA).
- References: 7 entries, 6 real web URLs, all curl-200-verified.
- Part 5 confirmed unmodified via git diff --stat. Gap-analysis doc edited surgically (5
  insertions/5 deletions, 3 locations). Commit c27309b created locally, no push/sync/LinkedIn.
- Cover image: NOT generated. nanobanana failed twice (2k full prompt, 1k minimal retry) with
  identical 403 PERMISSION_DENIED leaked-key error, same unresolved credential as Part 5
  (.env mtime unchanged since 2026-03-07). Not a 503 — retrying further would not help.
- Capability invocation check: MaximoBlog (Skill tool) invoked; SearchMaximo (Skill tool)
  invoked; BlueprintBoard technique read and applied; WebSearch (5 calls), WebFetch (3 calls);
  nanobanana called twice per spec, both failed on credentials not spec compliance.
