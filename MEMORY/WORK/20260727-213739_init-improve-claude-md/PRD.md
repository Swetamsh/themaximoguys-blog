---
task: Analyze repo, improve existing CLAUDE.md guidance file
slug: 20260727-213739_init-improve-claude-md
effort: extended
phase: complete
progress: 22/22
mode: algorithm
started: 2026-07-27T21:37:39-04:00
updated: 2026-07-27T21:52:00-04:00
---

## Context

`/init` was run against a repo that already had a CLAUDE.md. Per /init's own instructions, the job was to audit that file against actual repo state and correct/extend it, not rewrite from scratch. Read: package.json, README.md, scripts/sync-blog-to-sanity.ts header, automation/off-hours/README.md, .claude/settings.json, .claude/skills/, sanity-studio/schemas/.

### Risks
- Stale facts already baked into the existing CLAUDE.md (post counts, runtime claims) could be copied forward uncritically. Mitigated by spot-checking every concrete claim (`find`/`grep` counts) instead of trusting existing prose.
- Over-documenting (listing every skill/file) would violate /init's explicit "don't list every component" instruction — kept the skill table as the curated slash-command subset it already was.

## Criteria

- [x] ISC-1: File starts with mandated "guidance to Claude Code" prefix line
- [x] ISC-2: Documents `npm run sync` with content-hash-diff behavior
- [x] ISC-3: Documents `npm run sync:dry-run`
- [x] ISC-4: Documents `npm run sync:force`
- [x] ISC-5: Documents `npm run sync:validate`
- [x] ISC-6: Documents `npm run sync:authors` and `sync:authors:prod` schema distinction
- [x] ISC-7: Documents `cd sanity-studio && npm run dev` for local Studio
- [x] ISC-8: Documents `bash scripts/install-git-hooks.sh`
- [x] ISC-9: States explicitly no test/lint suite is configured (verified via package.json grep)
- [x] ISC-10: Anti-criterion — no fabricated test/lint commands added
- [x] ISC-11: Corrects inaccurate "Bun preferred runtime" claim (no bun.lockb, scripts run via npm+tsx)
- [x] ISC-12: Corrects post count 103 → 197 (verified via `find posts -name "*.mdx" | wc -l`)
- [x] ISC-13: Verifies sanity-studio schema count (30) matches existing claim
- [x] ISC-14: Adds Architecture section describing one-way pipeline (posts → sync script → Sanity → Next.js)
- [x] ISC-15: Documents content-hash mechanism in sync-blog-to-sanity.ts
- [x] ISC-16: Documents automation/off-hours night-shift system (previously undocumented)
- [x] ISC-17: Documents night-shift guardrails (draft:true, no auto-publish/sync)
- [x] ISC-18: Adds knowledge_base/, content-planning/, automation/off-hours/ to Key Directories table
- [x] ISC-19: Preserves existing accurate Hooks section unchanged
- [x] ISC-20: Preserves existing accurate frontmatter schema unchanged
- [x] ISC-21: Anti-criterion — no invented "Common Development Tasks" or "Tips" sections
- [x] ISC-22: File written successfully to /root/themaximoguys-blog/CLAUDE.md

## Decisions

- Kept the existing "Available Skills" table as-is (curated slash-command subset) rather than expanding to all ~19 skills in `.claude/skills/` — /init explicitly warns against listing every component.
- Did not add a test/lint command section — none exists in this repo (no `test`/`lint` script, no test framework in dependencies); adding one would be fabrication.
- Added a new "Architecture" section rather than folding pipeline details into "Integration" — the existing Integration section is a short fact list, the pipeline/automation explanation needed prose + a diagram.

## Verification

- `npm run sync*` commands cross-checked against `package.json` scripts block directly.
- Post count (197) and schema count (30) obtained via `find`, not estimated.
- Bun claim removed after confirming no `bun.lockb` and no bun usage in this repo's own scripts (only in unrelated global `.claude/skills/*` docs).
- Final file read in full after edits to confirm no broken structure/duplication.
