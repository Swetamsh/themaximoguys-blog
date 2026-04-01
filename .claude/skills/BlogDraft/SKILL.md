---
name: BlogDraft
description: AI-powered blog first draft generation using Claude Sonnet 4.6 with web research and SEO optimization. USE WHEN draft blog post, write blog, generate blog draft, create blog content, blog first draft, AI blog draft, new blog post.
---

# BlogDraft Skill

Generate high-quality first drafts of IBM Maximo blog posts using Claude Sonnet 4.6 with web research, SEO metadata, and TMG's established voice.

**This skill produces DRAFTS for human expert review — never auto-publish.**

## Customization

**Before executing, check for user customizations at:**
`~/.claude/skills/PAI/USER/SKILLCUSTOMIZATIONS/BlogDraft/`

## Workflow Routing

- Generate a new blog post draft -> `Workflows/Draft.md`
- Optimize existing post for SEO -> `Workflows/SEOOptimize.md`

## Quick Start

```
/blog-draft "MAS 9 Java Extensions: Custom Business Logic"
/blog-draft --series "MAS-INTEGRATION" --part 9 "Event-Driven Architecture with Kafka"
/blog-draft --seo-optimize posts/mas-integration/part-01-rest-api-fundamentals.mdx
```
