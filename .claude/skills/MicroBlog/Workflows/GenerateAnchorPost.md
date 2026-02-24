---
name: GenerateAnchorPost
description: Generate a main/anchor post that references all micro-content pieces from a blog
---

# GenerateAnchorPost Workflow

Creates a single "anchor" post — the main social media post that introduces a content series and references each individual micro-post. This is the post you publish first (or last) to tie all micro-content together and drive traffic to the full blog.

## When to Use

- After `ExtractMicroContent` has generated micro-posts
- When you want a summary post that links to individual pieces
- To create a content hub post for a blog series

## Step 1: Locate Existing Micro-Content

Read `micro_blogs/<source-slug>/_index.mdx` to get the full inventory.
If no index exists, scan `micro_blogs/<source-slug>/` for all `.mdx` files.

Extract from each micro-post:
- Title, type, platform tags
- The opening line (first sentence of body)
- Visual readiness flags

## Step 2: Read the Source Blog

From the micro-posts' `sourceBlog` frontmatter, read the original blog to extract:
- The strongest opening hook
- The core thesis / TL;DR
- Key takeaways
- The emotional arc summary

## Step 3: Compose the Anchor Post

The anchor post structure:

```
[HOOK — the single strongest line from the blog, rewritten for social impact]

[CONTEXT — 2-3 sentences: what this content series covers and why it matters]

[SERIES MAP — each micro-post referenced with a one-line teaser]

Post 1: [teaser from hook post]
Post 2: [teaser from thread]
Post 3: [teaser from hot take]
...

[FULL BLOG CTA — link to the original blog post]

[ENGAGEMENT CTA — question or prompt for comments]

[TAGS — from source blog, adapted for platform]
```

### Writing Rules

- The anchor post must deliver value on its own — not just be a table of contents
- Each micro-post teaser is one compelling sentence, not a title
- The hook must work without any context
- Use customization for brand voice if available; otherwise professional and direct
- Keep under 3000 characters (LinkedIn max) — shorter is better

## Step 4: Write the Anchor Post

File: `micro_blogs/<source-slug>/00-anchor-post.mdx`

```yaml
---
title: "[Anchor post title]"
type: "anchor"
platform: ["linkedin", "x", "instagram"]
sourceBlog:
  title: "[Source blog title]"
  slug: "[Source slug]"
  url: "[Path to source]"
date: "[Today's date]"
author: "[Author from customization or source]"
tags: [from source]
status: "draft"
microPosts:
  - file: "01-hook-example.mdx"
    title: "[title]"
    type: "hook"
  - file: "02-thread-example.mdx"
    title: "[title]"
    type: "thread"
  # ... all micro-posts in posting order
postingOrder:
  week1: ["00-anchor-post.mdx", "01-hook-example.mdx", "02-thread-example.mdx"]
  week2: ["03-hot-take-example.mdx", "04-carousel-example.mdx", "05-faq-example.mdx"]
---

[Anchor post body content]
```

## Step 5: Update the Index

If `_index.mdx` exists, update it to include the anchor post at position 00.
If it doesn't exist, create it with the anchor post and all known micro-posts.

## Step 6: Suggest Posting Strategy

Output a recommended posting schedule:

```
POSTING STRATEGY:
- Day 1: Anchor post (sets context, builds anticipation)
- Days 2-3: Hook posts (drive engagement)
- Day 4: Thread (deep value)
- Day 5: Hot takes (spark debate)
- Days 6-7: FAQ + Listicle (educational)
- Day 8: Carousel (visual recap)
- Day 9+: Contrast posts (visual, shareable)
- Final: Re-share anchor post with "missed this series?" framing
```

Adapt based on actual content generated.

## Step 7: Report

- Anchor post file location
- Number of micro-posts referenced
- Suggested first-week posting calendar
- Notes on which posts need images before publishing
