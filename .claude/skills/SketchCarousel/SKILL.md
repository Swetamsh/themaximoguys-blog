---
name: SketchCarousel
description: Generate illustrated carousel slide images in sketch-note comic style using AI image generation. USE WHEN sketch carousel, illustrated carousel, comic carousel, visual carousel, generate carousel images, illustrated slides, sketch-note slides, social media visuals from micro-content.
---

# SketchCarousel

Generates AI-illustrated carousel slide images in a **sketch-note / tech explainer comic** style. Takes micro-content from the MicroBlog skill (or raw content) and produces illustrated PNG slides ready for LinkedIn, Instagram, and X.

Uses the Art skill's `Generate.ts` tool with image generation APIs (GPT-Image-1 preferred, nano-banana-pro fallback).

## Style Reference

See `StyleGuide.md` for the complete visual specification.

**Quick summary:** Parchment/beige background, simple stick-figure characters, bold black headlines, rounded explanation boxes, speech bubbles, labeled characters, minimal/clean educational feel.

## Workflow Routing

| Trigger | Workflow |
|---------|----------|
| "generate carousel images", "illustrated slides from micro-content" | `Workflows/GenerateSlides.md` |

## Quick Reference

- **Input**: Micro-content MDX file (carousel type) or raw slide content
- **Output**: PNG images per slide in `~/Downloads/carousel-<slug>/`
- **Preferred Model**: `gpt-image-1` (best text rendering and character consistency)
- **Fallback Model**: `nano-banana-pro` (Gemini)
- **Aspect Ratio**: 4:5 (1080x1350 — LinkedIn/IG optimal)
- **Tool**: `~/.claude/skills/Art/Tools/Generate.ts`

## Integration Pipeline

```
MicroBlog skill → carousel-type MDX → SketchCarousel → PNG slides → LinkedIn/IG upload
```

| Upstream | This Skill | Downstream |
|---|---|---|
| MicroBlog (carousel content) | SketchCarousel (image generation) | Direct upload to LinkedIn/IG |
| MicroBlog (contrast content) | SketchCarousel (comparison slides) | Direct upload |
| Raw slide content | SketchCarousel (ad-hoc) | Direct upload |
