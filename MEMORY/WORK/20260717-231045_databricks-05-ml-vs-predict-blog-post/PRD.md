---
task: write MAS-DATABRICKS part 5 ML vs Predict blog post
slug: 20260717-231045_databricks-05-ml-vs-predict-blog-post
effort: deep
phase: complete
progress: 50/55
mode: interactive
started: 2026-07-17T23:10:45-04:00
updated: 2026-07-17T23:22:15-04:00
---

## Context

Night-shift unattended job (automation/off-hours). Write ONE complete MDX blog post for
MAS-DATABRICKS Part 5 ("Custom ML in Databricks vs MAS Predict: When to Use Which") plus a
DanKoeStyle cover image, following the night-shift system prompt's Steps 1-5, the repo's
CLAUDE.md, and the MaximoBlog skill. draft:true, local git commit only, no publish/sync.

Series slot is pre-committed by sibling posts: Part 4's "Next" already links to
`/blog/mas-databricks-05-ml-vs-mas-predict`, and the series index (Part 0) already has a
Part 5 blurb promising: a scored decision matrix (data needs / in-house ML skills /
AppPoints economics), how to write a Databricks score back into a Maximo Health custom
score field or a Predict-style work queue, a real closed-loop REST API example, and a
"use both, not replace" conclusion.

### Risks
- Do not invent an unverified specific Maximo attribute/object name for the Health custom-score write-back; describe the REST mechanism (custom score dimension + PUT against the asset/health object, per DOC5 5.6's confirmed `PUT /os/mxasset` pattern) without asserting an IBM-undocumented exact field name.
- nanobanana may silently return non-Pro tier; must check `model_name`/`model_tier` in response metadata every call and regenerate if wrong.
- Must not touch Part 4's existing "Next" link or any other published post besides the permitted nav exception.

## Criteria

### Research
- [x] ISC-1: DOC5 sections 3.3/3.4 (Health/Predict), 4.7 (AutoML/MLflow), 5.6 (closed-loop), 6.1/6.2 (ML use cases) read
- [x] ISC-2: AppPoints per-application cost table (DOC2 §13.2) read for Health/Predict point values
- [x] ISC-3: SearchMaximo skill invoked for Predict/Health/AutoML core topics
- [x] ISC-4: At least 3 web searches run covering IBM docs, MAS 9.x release notes, and practitioner sources
- [x] ISC-5: Every References URL resolved/verified during the research round, not guessed
- [x] ISC-6: Any knowledge-base/web discrepancy noted in an HTML comment at post bottom
- [x] ISC-7: Sibling posts (Part 4 in full, series index Part 5 blurb) read for tone/structure/promises before writing

### Frontmatter completeness
- [x] ISC-8: title, description, date (2026-07-17), slug (mas-databricks-05-ml-vs-mas-predict) present
- [x] ISC-9: tags array present matching series conventions
- [x] ISC-10: draft: true set
- [x] ISC-11: tier and author fields present matching sibling rotation
- [x] ISC-12: seoTitle under 60 characters (58)
- [x] ISC-13: seoDescription under 160 characters (149)
- [x] ISC-14: targetQuestions array with 5 entries present
- [x] ISC-15: series block has name "MAS DATABRICKS", part 5, total 6
- [x] ISC-16: coverImage frontmatter path is ./images/mas-databricks-05-ml-vs-mas-predict.png
- [x] ISC-17: exactly 5 FAQs present, each with a multi-sentence practitioner-depth answer
- [x] ISC-18: exactly 5 keyTakeaways present in frontmatter
- [x] ISC-19: tldr field present and substantive
- [x] ISC-20: semanticKeywords array present
- [x] ISC-21: proficiencyLevel field present
- [x] ISC-22: dependencies field present referencing prior series parts
- [x] ISC-23: clusterSlugs includes series index + adjacent parts (04, 06)
- [x] ISC-24: relatedSlugs includes series index + MAS-HEALTH cross-link

### Content structure & depth
- [x] ISC-25: post body word count >= 3,800 words (4,456 body words verified via wc -w)
- [x] ISC-26: at least 7 substantive H2 content sections present (13 verified)
- [x] ISC-27: at least 3 markdown tables present (6 verified)
- [x] ISC-28: at least 1 code/JSON/REST-call block present (5 verified)
- [x] ISC-29: worked example uses real Maximo object/field/API names (mxwo, mxsr, mxasset, etc.), not abstractions
- [x] ISC-30: scored decision matrix covers data needs, in-house ML skills, and AppPoints economics as named axes
- [x] ISC-31: section explains writing a Databricks score back into a Health custom score field or Predict-style work queue
- [x] ISC-32: a real closed-loop example is present (sensor data in -> model score out -> REST-created work order)
- [x] ISC-33: post concludes "use both" is usually correct, not blanket replacement of Predict
- [x] ISC-34: a Common Mistakes section is present
- [x] ISC-35: a Key Takeaways closing section (5 bullets) present in body, matching frontmatter keyTakeaways
- [x] ISC-36: References section has >= 5 entries (7)
- [x] ISC-37: References includes >= 3 verified web URLs from the research round

### Skill/capability invocation
- [x] ISC-38: MaximoBlog skill invoked via Skill tool and its TechnicalDeepDive workflow followed
- [x] ISC-39: SearchMaximo skill invoked via Skill tool (duplicate of ISC-3, tracked here for capability-invocation check)
- [x] ISC-40: BlogCoverArt-style content analysis performed (title/tags/takeaways/metaphor extracted) before image generation — fork-in-the-road metaphor (prebuilt Predict path vs. hand-built custom-ML path) derived from post content
- [x] ISC-41: DanKoeStyle skill's SKILL.md and matching Workflows/Comparison.md file read for prompt template and palette

### Cover image
- [x] ISC-42: image generated via mcp__nanobanana__generate_image with model_tier "pro" explicitly set — call attempted correctly per spec (2 attempts, see below)
- [x] ISC-43: image generation call included resolution "2k"/"1k" retry, thinking_level "high", aspect_ratio "16:9" per spec
- [ ] ISC-44: BLOCKED — both calls failed with `403 PERMISSION_DENIED: API key reported as leaked`, a non-transient credential failure, not a 503; no image was generated to check metadata on. Not a tier-downgrade situation — retrying same key is futile; requires operator to rotate the nanobanana server's Gemini/Google API key.
- [ ] ISC-45: BLOCKED — no image exists to save (root cause above)
- [ ] ISC-46: BLOCKED — no image exists to view (root cause above)
- [ ] ISC-47: BLOCKED — no image exists (root cause above)
- [ ] ISC-48: BLOCKED — no image exists (root cause above)

### Series/nav integrity & wrap-up
- [x] ISC-49: Part 4's existing "Next" link to Part 5 confirmed correct, unmodified (file untouched this session)
- [x] ISC-50: new post's Series Navigation table links back to Part 4 and forward to Part 6 placeholder correctly
- [x] ISC-51: no existing published post content modified outside permitted nav fields (none modified at all)
- [x] ISC-52: content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md updated to reflect Part 5's content status (built, cover blocked)
- [x] ISC-53: gap-analysis edit is surgical (3 status lines + date line only), not a restructure
- [x] ISC-54: git commit created locally with new MDX + gap-analysis doc (no image — none generated), no push/sync/LinkedIn call made
- [x] ISC-55: final output line printed exactly as NIGHT-SHIFT-RESULT: FAILED <reason> (cover image blocked by hard-rule-5 image pipeline requirement; post content itself is complete and committed for morning review)

## Verification

- Post file: `posts/MAS-DATABRICKS/2026-07-17-mas-databricks-05-ml-vs-mas-predict.mdx` — YAML frontmatter parsed successfully with python3/yaml; 27 frontmatter keys; body word count 4,456 (>=3,800 floor); 13 H2 sections; 6 tables; 5 code blocks; 5 FAQs, 5 keyTakeaways, 5 targetQuestions all present and correctly sized (seoTitle 58 chars, seoDescription 149 chars).
- All 4 series-index-promised content elements verified present in body: scored decision matrix (3 named axes), Health-custom-score/work-queue write-back section, closed-loop end-to-end table, explicit "use both" conclusion in Key Takeaways.
- Cover image: NOT generated. `mcp__nanobanana__generate_image` failed twice (full-detail 2k call, then a minimal 1k retry) with identical `403 PERMISSION_DENIED: Your API key was reported as leaked` — confirmed via `env | grep -i google` that the session's GOOGLE_API_KEY/GEMINI_API_KEY is the affected credential. This is a revoked-key failure, not a rate-limit/503, so no amount of retrying fixes it — flagged for operator credential rotation.
- Part 4 (`2026-07-17-mas-databricks-04-analytics-use-cases.mdx`) confirmed unmodified — `git status` shows it untouched.
- `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` edited surgically at 3 locations (top Updated line, DOC5 status-table row, MAS-DATABRICKS priority-table row) to reflect Part 5 content-built/cover-blocked status.
- Capability invocation check: MaximoBlog (Skill tool, TechnicalDeepDive workflow) ✅ invoked; SearchMaximo (Skill tool, Search workflow) ✅ invoked; DanKoeStyle technique ✅ read and applied to the (failed) generation call; WebSearch ✅ 3 calls made; nanobanana ✅ called twice per spec, both failed on credentials, not on spec compliance.
