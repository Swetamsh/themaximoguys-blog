---
name: ExtractMicroContent
description: Extract standalone micro-content pieces from any blog post for social media
---

# ExtractMicroContent Workflow

Reads a blog post and produces multiple standalone micro-content pieces, each delivering full value without the source. Also generates an anchor post that references all pieces.

## Prerequisites

Load before executing:
1. `ContentTypes.md` — micro-content type specifications and extraction signals
2. Check `~/.claude/skills/PAI/USER/SKILLCUSTOMIZATIONS/MicroBlog/` for brand voice, platform preferences, author identity

## Step 1: Read and Parse the Source Blog

Read the blog file (MDX, MD, or HTML). Extract:

**Frontmatter/metadata:**
- title, description, slug, tags, author
- keyTakeaways, tldr, faqs (if present)
- series info (name, part number)
- semanticKeywords, categories

**Body content:**
- Section headers (H2, H3)
- Blockquotes and callouts
- Comparison/contrast tables
- Bold statements and emphasis
- Numbered/bulleted lists
- Code examples (for technical blogs)
- Rhetorical questions

Record source reference:
```yaml
sourceBlog:
  title: "[from frontmatter]"
  slug: "[from frontmatter or filename]"
  series: "[if applicable]"
  part: "[if applicable]"
  url: "[relative path to source file]"
```

## Step 2: Identify Atomic Thoughts

An **atomic thought** is a single insight that stands alone without surrounding context. Scan for these extraction signals:

| Signal | Where to Look | Content Type |
|---|---|---|
| Blockquotes with bold text | `> **...**` patterns | Hook |
| Strong declarative openers | "No.", "Stop.", "Here's the truth" | Hook, Hot Take |
| Comparison/contrast tables | Markdown tables with old/new, before/after | Contrast, Carousel |
| Key takeaways array | Frontmatter `keyTakeaways` | Hot Take, Carousel slides |
| FAQ entries | Frontmatter `faqs` array | FAQ Post |
| Numbered headings or lists | Body sections with ### or numbered items | Thread, Listicle |
| Negation patterns | "NOT", "not a...but a...", "isn't...it's..." | Hot Take |
| Rhetorical questions | Body text | Hook |
| Before/after patterns | "Old way / New way", "Then / Now" | Contrast |
| Step-by-step processes | Sequential instructions or phases | Carousel, Thread |
| TL;DR or summary | Frontmatter `tldr` or summary sections | Carousel summary slide |

## Step 3: Generate Micro-Content Pieces

### Generation Order (by priority)

1. **Hooks** (2-3) — from blockquotes, bold openers, paradigm statements
2. **Thread** (1) — from main argument arc or numbered sections
3. **Carousel content** (1-2) — from comparison tables, key takeaways
4. **Hot Takes** (2-3) — from myth-busting, contrarian insights
5. **FAQ posts** — all FAQ entries from frontmatter
6. **Listicle** (1) — from numbered sections or takeaways
7. **Contrast posts** (1-2) — from before/after tables

### Writing Rules

- **Stand alone**: Reader gets full value without the source blog
- **One idea per piece**: Two ideas = two pieces
- **Match the blog's voice**: Casual, conversational, thought-provoking. Read `VoiceGuide.md` for the full tone reference. The blogs sound like a smart colleague explaining something — never like a brand posting content.
- **Honest, not hedging**: The blogs are direct but not aggressive. "Here's the truth:" not "STOP doing X!!" Say the thing plainly.
- **Empathy first**: Always acknowledge before challenging. The blogs never lecture — they make you feel seen, then gently push.
- **No forced CTAs**: If a question fits naturally, ask it. If not, let the thought land on its own.
- **No emoji**: The blogs don't use them. The social shouldn't either.
- **Platform-aware**: Tag with appropriate platforms but write generically — platform adaptation happens downstream
- **Flag for visuals**: Set `carouselReady`, `infographicReady`, `imageReady` flags where applicable

### Content Type Reference

See `ContentTypes.md` for detailed structure, character guidance, and examples per type.

## Step 4: Write Output Files

Create directory: `micro_blogs/<source-slug>/`

Each micro-content piece is an MDX file:

**Filename convention:** `<NN>-<type>-<short-descriptor>.mdx`

Examples: `01-hook-forget-everything.mdx`, `02-thread-three-shifts.mdx`, `03-carousel-old-vs-new.mdx`

**Each file includes full frontmatter:**
```yaml
---
title: "[Descriptive title]"
type: "hook" | "thread" | "carousel" | "hot-take" | "faq" | "listicle" | "contrast"
platform: ["linkedin", "x", "instagram"]
sourceBlog:
  title: "[Source blog title]"
  slug: "[Source slug]"
  series: "[Series name if applicable]"
  part: "[Part number if applicable]"
  url: "[Relative path to source]"
date: "[Today's date YYYY-MM-DD]"
author: "[From customization or source blog author]"
tags: [inherited from source blog]
status: "draft"
imageReady: false
carouselReady: false
infographicReady: false
---

[Content here — the standalone micro-post body]
```

## Step 5: Generate Anchor Post

Create `micro_blogs/<source-slug>/00-anchor-post.mdx`:

The anchor post is a **main post** that:
1. Opens with the strongest hook from the blog
2. Briefly describes the full content series
3. References each micro-post with a one-line teaser
4. Ends with a CTA to the full blog

```yaml
---
title: "[Anchor post title — series overview]"
type: "anchor"
platform: ["linkedin", "x", "instagram"]
sourceBlog:
  title: "[Source blog title]"
  slug: "[Source slug]"
  url: "[Path to source]"
date: "[Today's date]"
author: "[Author]"
tags: [from source]
status: "draft"
microPosts:
  - file: "01-hook-forget-everything.mdx"
    title: "[title]"
    type: "hook"
  - file: "02-thread-three-shifts.mdx"
    title: "[title]"
    type: "thread"
  # ... all generated micro-posts
---

[Anchor post body — references and links to each micro-post]
```

## Step 6: Generate Content Index

Create `micro_blogs/<source-slug>/_index.mdx`:

```yaml
---
title: "Micro-Content Index: [Source Blog Title]"
sourceBlog:
  title: "[Source blog title]"
  slug: "[Source slug]"
  url: "[Path]"
totalPieces: [count]
generatedDate: "[Today]"
---
```

Then a markdown table listing all generated pieces:

| # | Type | Title | Platforms | Image | Carousel | Infographic |
|---|------|-------|-----------|-------|----------|-------------|
| 00 | anchor | ... | All | No | No | No |
| 01 | hook | ... | All | No | No | No |
| ... | ... | ... | ... | ... | ... | ... |

## Step 7: Report

Output a summary:
- Total pieces generated by type
- Platform coverage
- Pieces flagged for image generation
- Pieces flagged for carousel conversion
- Pieces flagged for infographic conversion
- Suggested posting cadence (e.g., "12 pieces = 2 weeks at 1/day")
- Anchor post location
