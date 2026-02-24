---
name: MicroBlog
description: Break blog posts into standalone social media micro-content. USE WHEN microblog, micro content, social media content, break down blog, LinkedIn post, X thread, Instagram post, repurpose blog, social content, content calendar, single post, micro posts.
---

# MicroBlog

Decomposes any blog post (MDX, Markdown, HTML) into standalone micro-content pieces. Each piece delivers full value independently. A main "anchor" post is generated that references all micro-posts, creating a content web that drives traffic back to the source.

**Platform-agnostic by design.** Core output is generic micro-content. Platform-specific formatting (LinkedIn character limits, X threads, Instagram captions) is handled by downstream skills or customization.

## Customization

Check `~/.claude/skills/PAI/USER/SKILLCUSTOMIZATIONS/MicroBlog/` for:
- **Brand voice overrides** (tone, vocabulary, CTAs)
- **Platform preferences** (which platforms to target)
- **Author/brand identity** (name, handles, hashtag strategy)
- **Content volume targets** (pieces per blog post)

Fallback: Generic professional voice, all platforms, no brand-specific language.

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify -H "Content-Type: application/json" -d '{"message": "Starting micro-content extraction"}'
```

Also output: "Extracting micro-content from blog post..."

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| ExtractMicroContent | "break down blog", "extract micro content", "create social posts from blog", "microblog this" | `Workflows/ExtractMicroContent.md` |
| GenerateAnchorPost | "main post", "anchor post", "summary post that links to micro posts" | `Workflows/GenerateAnchorPost.md` |
| GenerateVisuals | "generate images", "add images to micro posts", "build microblogs with images", "visual styles" | `Workflows/GenerateVisuals.md` |

## Examples

**Example 1: Single blog post breakdown**
> "Break down my latest blog post into social media content"
> Triggers: ExtractMicroContent -> produces 8-15 standalone micro-posts + anchor post

**Example 2: Anchor post only**
> "Create a main LinkedIn post that references all the micro-posts from my latest blog"
> Triggers: GenerateAnchorPost -> reads existing micro-content, generates summary post

**Example 3: Specific platform focus**
> "Create micro-content from this blog, focused on LinkedIn"
> Triggers: ExtractMicroContent with platform filter

## Quick Reference

- **Input**: Any blog post file (MDX, MD, HTML) or URL
- **Output**: MDX files in `micro_blogs/<source-slug>/` directory
- **Content Types**: Hook, Thread, Carousel, Hot Take, FAQ, Listicle, Contrast
- **Platforms**: All (generic by default; customization narrows scope)
- **Anchor Post**: A summary post linking to all micro-posts, generated automatically or on demand

## Content Types Overview

| Blog Element | Micro-Content Type | Best For |
|---|---|---|
| Opening hook / bold claims | **Hook** | All platforms — scroll-stoppers |
| Multi-point arguments | **Thread** | X, LinkedIn — narrative arcs |
| Comparison tables (Old vs New) | **Contrast** | All — visual-ready |
| Key takeaways | **Hot Take** | LinkedIn — honest opinions |
| FAQ entries | **FAQ** | All — educational value |
| Numbered lists / categories | **Listicle** | Instagram, LinkedIn — shareable |
| Step-by-step processes | **Carousel** | LinkedIn, Instagram — slide content |

## Output Frontmatter Schema

```yaml
---
title: "[Micro-content title]"
type: "hook" | "thread" | "carousel" | "hot-take" | "faq" | "listicle" | "contrast"
platform: ["linkedin", "x", "instagram"]
sourceBlog:
  title: "[Original blog title]"
  slug: "[Original slug]"
  series: "[Series name if applicable]"
  part: [Part number if applicable]
  url: "[Relative path to source]"
date: [YYYY-MM-DD]
author: "[From customization or source blog]"
tags: [from source blog]
status: "draft"
imageReady: true | false
imagePath: "./images/<filename>.png"
imageStyle: "chalkboard-dankoe" | "neon-dark-tech" | "minimalist-gradient" | "3d-isometric" | "flat-infographic" | "glassmorphism" | "sketch-handdrawn" | "dark-mode-ui" | "retro-vintage" | "corporate-clean"
imagePrompt: "[full prompt used for generation]"
carouselReady: true | false
infographicReady: true | false
hashtags: ["#Tag1", "#Tag2"]
blogLink: "[URL to source blog post]"
---
```

## Integration Points

| Downstream Skill | When | What |
|---|---|---|
| **LinkedInCarousel** | `carouselReady: true` | Convert carousel content to PDF slides |
| **DanKoeStyle** | `infographicReady: true` | Generate infographic from contrast/listicle |
| **Art** | `imageReady: true` | Generate header/cover image |
| **LinkedInPublishing** | Any micro-content | Package for LinkedIn posting |
| **SketchCarousel** | Carousel content | Generate illustrated slide images |
