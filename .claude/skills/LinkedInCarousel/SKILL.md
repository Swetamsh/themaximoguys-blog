---
name: LinkedInCarousel
description: Generate LinkedIn carousel PDFs from blog posts. USE WHEN LinkedIn carousel, carousel from blog, social media carousel, generate carousel, blog to carousel, LinkedIn content, repurpose blog.
---

# LinkedInCarousel

Converts TMG blog posts (MDX) into branded LinkedIn carousel PDFs. Extracts key takeaways, title, and TLDR from frontmatter to create swipeable slide decks in TheMaximoGuys dark theme.

## Workflow Routing

| Trigger | Workflow |
|---------|----------|
| "generate carousel", "create carousel from blog" | `Workflows/GenerateCarousel.md` |

## Quick Reference

- **Output**: 1080x1350px PDF (LinkedIn optimal portrait)
- **Slides**: 8-10 per carousel (hook + content + CTA)
- **Theme**: Dark background (#0A0A0A) with neon accents matching DanKoe style
- **Input**: Any MDX blog post from `posts/` directory
- **Tool**: `bun Tools/GenerateCarousel.ts <path-to-mdx> [--output <path>]`

## Content Extraction Strategy

| Frontmatter Field | Carousel Usage |
|---|---|
| `title` | Hook slide (Slide 1) |
| `description` | Hook slide subtitle |
| `keyTakeaways` | Content slides (1 per slide) |
| `tldr` | Summary slide |
| `series.name` | Brand badge on each slide |
| `tags` | Hashtag suggestions for LinkedIn post |
| `faqs` | Bonus slides if under 10 total |

## Brand Colors

| Element | Color |
|---|---|
| Background | `#0A0A0A` |
| Primary Text | `#FFFFFF` |
| Accent 1 (Yellow) | `#FFE066` |
| Accent 2 (Cyan) | `#58D8D8` |
| Accent 3 (Pink) | `#FF6B9D` |
| Slide Number | `#666666` |
| TMG Logo Text | `#FFE066` |
