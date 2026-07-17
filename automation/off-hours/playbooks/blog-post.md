# Night-Shift Job: Write One Full Blog Post

You are running unattended overnight inside `/root/themaximoguys-blog`. Your job is to
produce ONE complete, publication-quality MDX blog post for the work item appended at the
bottom of this prompt, plus its cover image. Work autonomously; nobody will answer questions.

## Hard rules (violations = failed job)

1. **Never publish or sync.** Do NOT run `npm run sync`, any Sanity write, any LinkedIn
   script, or `git push`. A local `git commit` of the new files at the end is allowed.
2. **Do not modify existing published posts**, except: when the item explicitly says to fix
   a series index navigation chain, you may update the affected index/neighbor navigation
   fields only.
3. **Stay on the one assigned item.** Do not pull other work from the queue.
4. **Drafts are for human review** — set frontmatter `draft: true` on the new post.

## Step 1 — Study conventions (do not skip)

- Read 1-2 existing posts in the same series directory (or, for standalone posts, a recent
  `posts/2026-*.mdx` file) to absorb frontmatter shape, series block, tone, section
  structure, and References format.
- Read `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` for context on the item's source
  doc, and read the relevant source doc under `/root/TMG_MAS9_UPGRADE/` if it exists.

## Step 2 — Research

Use the SearchMaximo skill (`Skill("SearchMaximo")`) and/or web search to ground the post in
accurate MAS 9.x facts. Prefer IBM documentation. Collect real reference URLs.

## Step 3 — Write the post

- File location: `posts/{series}/{YYYY-MM-DD}-{slug_hint}.mdx` using today's date
  (standalone items with `series: null` go directly in `posts/`).
- Full required frontmatter per CLAUDE.md: title, description, date, slug, tags,
  `draft: true`, tier, author, seoTitle (<60 chars), seoDescription (<160 chars),
  targetQuestions, plus the series block (`series.name`, `series.part`, `series.total`) and
  navigation fields exactly as sibling posts do.
- `coverImage: ./images/{slug}.png` following the sibling posts' path pattern.
- Length and depth: match the series' existing posts (typically 2,500-4,000 words), with
  practical how-to detail, tables where sibling posts use them, and a References section
  with real URLs.
- Voice: TheMaximoGuys — practitioner-to-practitioner, concrete, no marketing fluff.

## Step 4 — Cover image (multi-style pipeline, mandatory)

Generate the 16:9 cover using the style skill named in the item's `cover_style` field
(SketchNote, DanKoeStyle, InfoBlocks, or BlueprintBoard). Invoke that skill via the Skill
tool and follow its workflow — do NOT write a raw one-off prompt to an image model.

Non-negotiable cover rules:
- `mcp__nanobanana__generate_image` with `model_tier: "pro"`, `resolution: "2k"`,
  `thinking_level: "high"`, `aspect_ratio: "16:9"`. NEVER Flash tier. On 503, retry Pro
  (up to 3 times, 30s apart) — never downgrade.
- 80% visual / 20% text: bold visual metaphor, title of 3-8 words, optional subtitle,
  small `@themaximoguys` attribution bottom-right. NO bullet lists, NO cheat-sheet layout.
- Save to the exact path the post's `coverImage` frontmatter references (create the
  `images/` directory if needed) and VIEW the generated file with the Read tool to confirm
  it rendered correctly before declaring success.

## Step 5 — Verify and finish

1. Confirm the MDX file exists and frontmatter parses (all required fields present).
2. Confirm the cover PNG exists at the referenced path and you viewed it.
3. If the item adds a part to an existing series: update the series index post's part list
   and the previous part's `next` navigation to chain correctly.
4. `git add` the new files and `git commit -m "night-shift: <item id> — <post title>"`.
5. Print exactly one final line:
   `NIGHT-SHIFT-RESULT: SUCCESS <path-to-mdx>`
   If you could not complete the post + cover, print instead:
   `NIGHT-SHIFT-RESULT: FAILED <one-line reason>`
