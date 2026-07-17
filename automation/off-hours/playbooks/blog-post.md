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
- Read `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` for context on where this item sits
  in the overall content plan.

## Step 2 — Deep research (MANDATORY, minimum THREE sources — do not thin this step)

Deep research is what separates these posts from AI slop. Budget at least a third of your
run time here, BEFORE writing a single section:

1. **Primary source: `knowledge_base/`.** Find the DOC file matching the item's source
   (e.g. DOC5 → `knowledge_base/DOC5_DATA_ANALYTICS_DATABRICKS_MAXIMO_ROADMAP.md`) and read
   ALL sections relevant to the topic — not just the first match. Extract every table,
   number, object name, and worked example you can use.
2. **SearchMaximo sweep (`Skill("SearchMaximo")`).** Search the 611-file IBM documentation
   knowledge base for the post's 2-3 core topics; read the top matching docs and pull
   version-specific facts and terminology the DOC file doesn't carry.
3. **Web verification round.** Run at least 3 web searches: (a) current IBM documentation
   pages for the feature, (b) recent MAS 9.x release notes/announcements touching it,
   (c) community/practitioner sources (Maximo Secrets, Interloc, IBM Community). Collect
   real URLs — every References entry must be a link you actually resolved.
4. Where knowledge base and web disagree, the knowledge base wins; note discrepancies in
   an HTML comment at the bottom of the post for human review.

## Depth contract (a post failing ANY of these is a failed job)

- **Word count:** minimum 3,800 words for a series part (index posts: 3,000). Before
  finishing, compare against the 2 longest sibling posts — land within 10% of the series'
  upper range, not the bottom.
- **Structure:** at least 7 substantive content sections; at least 3 tables; at least one
  code/SQL/config block wherever the topic touches anything queryable or configurable;
  worked examples with real object/field names, not abstractions.
- **Frontmatter richness:** 5 FAQs with multi-sentence practitioner answers, 5
  keyTakeaways, tldr, targetQuestions, semanticKeywords — matching sibling depth.
- **References:** minimum 5 entries, at least 3 verified web URLs from the research round.
- Length must come from researched substance (more scenarios, edge cases, tables,
  troubleshooting), never from padding or restating.

## Step 3 — Write the post (MaximoBlog skill, mandatory)

Write the post USING the MaximoBlog skill — invoke `Skill("MaximoBlog")` and follow its
system rather than free-writing:

- Load its preferences (`.claude/skills/MaximoBlog/PREFERENCES.md`) and research sources
  (`References/MaximoSources.md`).
- Route to the workflow matching this item (per the skill's routing table): AI add-on
  topics → `Workflows/AIModuleGuide.md`; how-to/configuration/architecture →
  `Workflows/TechnicalDeepDive.md`; migration/journey posts → `Workflows/MigrationSeries.md`.
  If none fits cleanly, use TechnicalDeepDive. Never stop to ask which type — decide.
- Apply its templates where relevant (`Templates/VisualPlaceholders.md`,
  `Templates/FolderStructure.md`) and honor the Blog Registry cross-linking conventions
  (`Registry/BlogRegistry.md`) when adding related/cluster slugs.

File and content rules:

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

## Step 4 — Cover image (Art-skill pipeline embedded, mandatory)

Follow the BlogCoverArt orchestration technique, with the style pre-pinned by the item's
`cover_style` field (SketchNote, DanKoeStyle, InfoBlocks, or BlueprintBoard):

1. **Analyze the post you just wrote** the way `/root/.claude/skills/BlogCoverArt/SKILL.md`
   prescribes: extract title, tags, key takeaways, content type, tone, audience, and the
   single strongest visual metaphor for the post's core idea.
2. **Load the style skill's technique:** read `/root/.claude/skills/{cover_style}/SKILL.md`
   and the matching file in its `Workflows/` directory (pick the workflow that fits the
   content type — e.g. Concept, Process, Architecture). These files contain the exact
   prompt templates, color palettes, and composition rules for the style.
3. **Engineer the prompt** using the Art skill's technique (see
   `/root/.claude/skills/Art/SKILL.md` and `Tools/GeneratePrompt.ts` for the prompt-
   engineering patterns): start from the style skill's prompt template, substitute the
   post-specific metaphor/labels, and keep the skill's palette hex codes, materials, and
   composition language intact. Do NOT improvise a from-scratch prompt.
4. **Generate** with the parameters below. (Night-shift exception to the Art skill's
   "Downloads first" rule: save directly to the post's images path — the human preview
   happens at morning review.)

Non-negotiable cover rules:
- `mcp__nanobanana__generate_image` with EXACTLY `model_tier: "pro"`, `resolution: "2k"`,
  `thinking_level: "high"`, `aspect_ratio: "16:9"`. The `model_tier` parameter is
  MANDATORY on every single call — omitting it selects "auto" (nb2/Flash-grade), which is
  FORBIDDEN. Never "auto", never "nb2", never "flash". After each call, check the returned
  metadata: `model_name` must be a Gemini Pro image model and `model_tier` must be "pro" —
  if not, delete the image and regenerate correctly. On 503, retry Pro (up to 3 times,
  30s apart) — never downgrade.
- Quality bar: rich, cinematic, premium rendering with real lighting, materials, and depth
  (see existing covers in posts/MAS-WORK-ORDER-OPS/images/ for the standard). Flat,
  simplistic, or clip-art-looking output must be regenerated with a richer prompt.
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
4. **Update the content plan:** edit `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md` so
   its status tables/sections reflect this post now existing (e.g. move a series from
   PENDING toward CONTENT COMPLETE, adjust file counts, update the "Updated:" date).
   Make surgical edits only — do not restructure the document.
5. `git add` the new files plus the updated content-planning doc and
   `git commit -m "night-shift: <item id> — <post title>"`.
6. Print exactly one final line:
   `NIGHT-SHIFT-RESULT: SUCCESS <path-to-mdx>`
   If you could not complete the post + cover, print instead:
   `NIGHT-SHIFT-RESULT: FAILED <one-line reason>`
