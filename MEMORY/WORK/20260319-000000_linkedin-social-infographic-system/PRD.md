---
task: Build LinkedIn social media infographic post system
slug: 20260319-000000_linkedin-social-infographic-system
effort: extended
phase: complete
progress: 18/18
mode: interactive
started: 2026-03-19T00:00:00Z
updated: 2026-03-19T00:00:01Z
---

## Context

Mahmoud has a complete blog system (80+ posts across 8 series) and existing visual style skills (SketchNote, BlueprintBoard, MarkerBoard, InfoBlocks, DanKoeStyle) plus a BlogCoverArt orchestrator for cover images. He now wants a NEW skill that generates detailed, information-dense LinkedIn infographic posts from blog content.

**Key difference from BlogCoverArt:** Blog covers are 80% visual, 20% text. These LinkedIn infographics are the OPPOSITE — 80% text/information, 20% visual styling. They pack the entire blog's value into a single shareable image.

**Examples provided (7 images):**
1. Maximo Keyboard Shortcuts (SketchNote CheatSheet) — dense keyboard shortcut reference
2. Maximo Survival Guide (SketchNote CheatSheet) — End User | Admin tips two-column
3. HxGN EAM Survival Guide (BlueprintBoard CheatSheet) — dark blueprint technical guide
4. SAP S/4HANA AM Survival Guide (SketchNote CheatSheet) — Fiori-era feature guide
5. IAM Certificate Cheat Sheet (SketchNote Guide) — certification exam breakdown
6. AI Agent Protocols Cheatsheet (grid/clean style) — protocol comparison grid
7. CMMS vs EAM (BlueprintBoard Comparison) — detailed side-by-side with integration layer

**Not requested:** Execution/image generation now. This is skill DESIGN and BUILD.

### Risks
- Content extraction from blogs is the hardest part — blogs are narrative, infographics need structured bullet points
- LinkedIn images have text readability limits — too much content = unreadable at feed size
- Risk of creating prompts that are too long for Gemini Pro to handle accurately

## Criteria

- [x] ISC-1: SKILL.md exists with complete routing logic and content extraction methodology
- [x] ISC-2: Content extraction section defines how to pull structured data from blog MDX frontmatter
- [x] ISC-3: Content extraction section defines how to distill blog body into infographic-ready bullets
- [x] ISC-4: Decision matrix maps content types to visual styles (SketchNote, BlueprintBoard, MarkerBoard, InfoBlocks)
- [x] ISC-5: Decision matrix maps content types to specific workflows (CheatSheet, Comparison, Process, etc.)
- [x] ISC-6: CheatSheet workflow file exists with blog-to-infographic prompt template
- [x] ISC-7: Comparison workflow file exists with blog-to-infographic prompt template
- [x] ISC-8: ProcessFlow workflow file exists with blog-to-infographic prompt template
- [x] ISC-9: QuickReference workflow file exists with blog-to-infographic prompt template
- [x] ISC-10: ConceptBreakdown workflow file exists with blog-to-infographic prompt template
- [x] ISC-11: Each workflow specifies 4:5 portrait aspect ratio for LinkedIn
- [x] ISC-12: LinkedIn post copy template exists with hook/body/CTA/hashtags structure
- [x] ISC-13: Batch mode documented for processing multiple blogs
- [x] ISC-14: Skill follows same file structure pattern as existing skills (BlogCoverArt, SketchNote)
- [x] ISC-15: Attribution "@themaximoguys" included in all image prompt templates
- [x] ISC-16: Author "by Mahmoud Ossman — Sr. EAM Program Manager" in all templates
- [x] ISC-17: All workflows reference existing visual style skills (not duplicate their prompts)
- [x] ISC-18: Skill description in SKILL.md matches system prompt trigger format

## Decisions

## Verification
