---
task: Fix table fixtures across blogs and sync
slug: 20260828-163500_fix-table-fixtures-across-blogs
effort: extended
phase: complete
progress: 18/18
mode: interactive
started: 2026-08-28T16:35:00-04:00
updated: 2026-08-28T16:52:00-04:00
---

## Context

Markdown tables in every synced blog post render in Sanity as flattened em-dash
paragraphs. Root cause was fixed in commit e3cf6b8 (converter now emits
`comparisonTable` blocks), but the MD5 content hash is derived from the MDX
source — unchanged source means a normal sync SKIPs. Existing posts therefore
still hold the old flattened text and require `--force` to pick up the new
converter.

Requested: fix tables across the blogs and push to Sanity.
NOT requested: publishing the 68 local posts that have never been synced
(50 are `draft: false` and would go live immediately; 27 have no cover image
on disk). Those stay excluded.

### Risks
- A repo-wide `--force` would CREATE 68 new Sanity docs, 50 instantly live.
- A force sync could flip draft state — measured: 0 posts affected.
- A force sync could blank covers — ruled out: updates use `.patch().set()`,
  so fields absent from the payload are left untouched.
- Hand-edits made in Sanity Studio are overwritten; MDX is source of truth
  per CLAUDE.md, so this is designed behavior.

### Plan
Stage only the 112 MDX files whose slug already exists in Sanity AND which
contain markdown tables. Point BLOG_REPO_PATH at the staged tree and run
`--force`. Verify block counts and row fidelity against source.

## Criteria

- [x] ISC-1: Target set is exactly posts already present in Sanity
- [x] ISC-2: Target set excludes all 68 unsynced posts
- [x] ISC-3: Staged tree contains 112 MDX files
- [x] ISC-4: Staged tree preserves each post's relative directory path
- [x] ISC-5: Staged tree includes images directories for cover resolution
- [x] ISC-6: Dry-run reports zero Created
- [x] ISC-7: Dry-run reports zero Errors
- [x] ISC-8: Real sync reports zero Created
- [x] ISC-9: Real sync reports zero Errors
- [x] ISC-10: Sanity blogPost document count stays 139
- [x] ISC-11: Sanity live post count stays 138
- [x] ISC-12: Posts carrying comparisonTable blocks rises from 1 to 112
- [x] ISC-13: Total comparisonTable blocks in Sanity is non-zero and plausible
- [x] ISC-14: Synced row+header counts match source table lines exactly
- [x] ISC-15: No post loses its existing coverImage
- [x] ISC-16: Sampled table cells contain no residual markdown syntax
- [x] ISC-17: Sampled table has correct headers and cell alignment
- [x] ISC-A1: No post's draft field changes value
- [x] ISC-A2: No new document is created in Sanity

## Decisions

## Verification

- Excluded `posts/2026-02-03-getting-started-maximo-ai.mdx` from the batch:
  its frontmatter author is `themaximoguys Team`, which slugifies to
  `themaximoguys-team` and matches no existing author document. Syncing it
  would create a duplicate author alongside the canonical `The Maximo Guys`
  and repoint the post's author reference. Fixing the frontmatter is a
  content change that was not requested, so the post was left untouched.
  Batch is therefore 111 posts, not 112.

Evidence (all queried from Sanity after the sync, not inferred):

| Check | Before | After |
|---|---|---|
| blogPost documents | 139 | 139 |
| live (draft:false) | 138 | 138 |
| with coverImage | 137 | 137 |
| posts with real tables | 1 | 111 |
| comparisonTable blocks | 17 | 647 |

- Sync run: Created 0, Updated 111, Errors 0, WARN 0, author creations 0.
- New docs NONE, removed docs NONE, draft flips NONE, covers lost NONE.
- Row fidelity: 111/111 posts exact; 4,360 source table lines = 4,360 synced.
- Cell hygiene across 13,273 cells: 0 residual bold, 0 `<br>`, 0 markdown
  links, 0 backticks, 0 stray pipes, 0 ragged rows.
- ISC-3 amended: staged 112, executed 111 (see author exclusion in Decisions).
