---
name: MicroBlog
description: Break blog posts into social media micro-content. USE WHEN microblog, micro content, social media content, break down blog, LinkedIn post, X thread, Instagram post, repurpose blog, social content, content calendar.
---

# MicroBlog

Decomposes existing TMG blog posts into thought-provoking, platform-specific micro-content pieces. Each piece stands alone as a scroll-stopper while linking back to the source blog. Uses the same TheMaximoGuys Empathetic Expert voice adapted for social brevity.

## Customization

**Voice reference:** Inherits from MaximoBlog's Empathetic Expert voice, adapted for social.
**Social voice rules:** See `VoiceGuide.md`
**Content type specs:** See `ContentTypes.md`

---

## Workflow Routing

| Trigger | Workflow |
|---------|----------|
| "break down blog", "extract micro content", "create social posts from blog" | `Workflows/ExtractMicroContent.md` |

---

## Quick Reference

- **Input**: Any MDX blog post from `posts/` directory
- **Output**: MDX files in `micro-content/<source-slug>/` directory
- **Content Types**: Hook, Thread, Carousel, Hot Take, FAQ, Listicle, Contrast
- **Platforms**: LinkedIn, X (Twitter), Instagram
- **Voice**: TheMaximoGuys Empathetic Expert (social-adapted)
- **Tagging**: Every micro-content piece links back to source blog via frontmatter

## Content Extraction Strategy

The skill finds **atomic thoughts** — single insights that can stand alone:

| Blog Element | Micro-Content Type | Platform |
|---|---|---|
| Opening hook / bold statements | **Hook Post** | All platforms |
| Multi-point arguments | **Thread** | X |
| Comparison tables (Old vs New) | **Carousel Slides** | LinkedIn, Instagram |
| Key takeaways | **Hot Take** posts | LinkedIn |
| FAQ entries | **FAQ Post** | All platforms |
| Numbered lists / archetypes | **Listicle** | Instagram, LinkedIn |
| Paradigm shift sections | **Contrast Post** | All platforms |

## Output Frontmatter Schema

```yaml
---
title: "[Micro-content title]"
type: "hook" | "thread" | "carousel" | "hot-take" | "faq" | "listicle" | "contrast"
platform: ["linkedin", "x", "instagram"]
sourceBlog:
  title: "[Original blog title]"
  slug: "[Original slug]"
  series: "[Series name]"
  part: [Part number]
  url: "[Relative path to source MDX]"
date: [YYYY-MM-DD]
author: "The Maximo Guys"
tags: [from source blog]
status: "draft"
carouselReady: true | false
infographicReady: true | false
---
```

## Integration with Other Skills

| Skill | When | What |
|---|---|---|
| **LinkedInCarousel** | After carousel-type micro-content | Convert to PDF slides |
| **DanKoeStyle** | After contrast/comparison content | Generate infographic |
| **ExcalidrawDanKoe** | After listicle/process content | Generate editable diagram |
| **Art** | After any micro-content | Generate header visuals |
