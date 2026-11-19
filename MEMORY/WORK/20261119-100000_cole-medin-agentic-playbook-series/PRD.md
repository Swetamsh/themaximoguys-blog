---
task: Build blog series from Cole Medin agentic AI content
slug: 20261119-100000_cole-medin-agentic-playbook-series
effort: deep
phase: complete
progress: 23/24
mode: interactive
started: 2026-11-19T10:00:00Z
updated: 2026-11-19T17:30:00Z
---

## Context
User asked: gather Cole Medin's agentic AI content and build a blog series on it. Chose "Fresh broad series" (accepting partial overlap with AGENTIC-MAXIMO, 2026-11-10) and author Krishna Neela.

Sources: PUBLIC `coleam00/cole-medin-knowledge-base` (243 concepts, 198 video sources with YouTube URLs + timestamps; cloned to scratchpad) = primary, citable. PRIVATE Dynamous (dynamous-community org, via gh tmg009) = paraphrase + credit only, never link/copy. Maximo grounding: knowledge_base DOC15/16/00, SearchMaximo, web.

Series: `posts/MAXIMO-AGENTIC-PLAYBOOK/`, slug prefix `map-`, name "The Agentic AI Playbook for Maximo", index + 8 parts, all draft:true, covers pending.

### Risks
- Overlap with AGENTIC-MAXIMO → each part takes the broad/playbook angle and links to AGM deep-dive instead of repeating builds.
- Misattributing claims to Cole → only cite claims present in KB pages, with video URL.
- Covers: headless nanobanana blocked; generate interactively after text.

## Criteria
- [x] ISC-1: Folder posts/MAXIMO-AGENTIC-PLAYBOOK has 9 MDX files
- [x] ISC-2: Part 1 agent fundamentals written
- [x] ISC-3: Part 2 prompts/tools/context written
- [x] ISC-4: Part 3 RAG strategies written
- [x] ISC-5: Part 4 MCP and tool design written
- [x] ISC-6: Part 5 security and guardrails written
- [x] ISC-7: Part 6 AI Layer agentic coding written
- [x] ISC-8: Part 7 local/self-hosted AI written
- [x] ISC-9: Part 8 production/voice/long-running written
- [x] ISC-10: Index part 0 links all 8 parts
- [x] ISC-11: Every file author Krishna Neela
- [x] ISC-12: Every file draft: true
- [x] ISC-13: Every file has all required frontmatter fields
- [x] ISC-14: seoTitle under 60 chars everywhere
- [x] ISC-15: seoDescription under 160 chars everywhere
- [x] ISC-16: series.total 8, correct part per file
- [x] ISC-17: Each part >= 3,800 prose words
- [x] ISC-18: Each part >= 3 tables
- [x] ISC-19: Each part has 5 FAQs
- [x] ISC-20: Each part >= 5 references incl. Cole video URLs
- [x] ISC-21: Slugs unique across repo
- [~] ISC-22: sync:validate passes except cover images
- [x] ISC-A1: No github.com/dynamous-community links or copied Dynamous text
- [x] ISC-A2: Max_mcp never described as open source

## Decisions
- One writer agent per part, in parallel; index written by primary after parts land (same pattern as AGENTIC-MAXIMO).

## Verification
- check.mjs: 9 files, all author Krishna Neela, draft:true, total 8, parts 0-8, 5 FAQs, all required fields, seoTitle 38-53, seoDescription 140-156, no broken /blog links or related slugs, no slug dupes, no dynamous-community links.
- Prose words (code + tables excluded): parts 5,021-6,694; index 1,457 (below 3,000 index floor — index is a navigator, flagged). Tables 6-10 per part. References 14-23 per part.
- 76 distinct YouTube IDs cited, all present in Cole KB sources.
- @mdx-js/mdx v3 compiles all 9 files.
- sync --validate: only "Broken cover image" for all 9 (covers not generated).
- Max_mcp only mention near "open source" is the pitfall row saying it is NOT open source.
- 2026-11-19 review round: 4 independent reviewers (1 High: map-06 Java 17 vs Java 25 on Manage 9.2; ~30 Med/Low incl. misattributed Cole quotes, LOCHIERARCHY-as-flow, 403-vs-empty site filtering, transactionid 5-min window, gpt-oss timing, apitoken/create). All fixed by 4 fix agents; re-verified: 9/9 compile, 83 YouTube IDs all in KB, no DOC/CHG ids in reader text, sync --validate 0 issues, all localhost pages 200, read times 28-37 min, index ~4.5 h.
- Covers 9/9 via Higgsfield gpt_image_2_6 (Gemini 402).
