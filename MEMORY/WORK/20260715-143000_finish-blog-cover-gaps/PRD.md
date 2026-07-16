---
task: Finish all remaining blogs that have gaps
slug: 20260715-143000_finish-blog-cover-gaps
effort: Advanced
phase: execute
progress: 3/4
mode: ALGORITHM
started: 2026-07-15T14:30:00-05:00
updated: 2026-07-15T14:45:00-05:00
---

## Context
Full-repo gap scan of posts/ (11 series). Resolved every coverImage frontmatter
ref against disk. Result: the ONLY remaining gap across all blogs is MAS-MANAGE,
whose 12 posts borrow MAS-FEATURES placeholder covers (own images/ dir empty).
All other series complete (text + dedicated covers). No thin/stub content.
User instruction: prepare everything but HOLD for image generation ("I will review and start").

### Risks
- Rewiring frontmatter to dedicated paths BEFORE images exist would break site → deferred to post-gen step.
- Image gen is expensive/Pro-503-prone → held for user to start.

## Criteria
- [x] ISC-1: All 11 series scanned; every coverImage ref resolved against disk
- [x] ISC-2: Sole gap identified — MAS-MANAGE 12 dedicated covers
- [x] ISC-3: 12-cover generation manifest written with per-post prompts + filenames
- [ ] ISC-4: 12 covers generated + frontmatter rewired (HELD — awaiting user start)

## Verification
- Gap scan: 12 flagged refs were MAS-ADMIN false-positives (public/images/mas-admin) + 2 intentional Unsplash + MANAGE borrowed.
- Manifest: posts/MAS-MANAGE/COVER-MANIFEST.md (16:9, MarkerBoard, @themaximoguys, rewire commands included).
