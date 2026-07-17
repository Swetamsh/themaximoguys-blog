# CLAUDE.md

## Project Purpose

TheMaximoGuys blog content repository — 103 MDX blog posts, Sanity CMS studio, content sync scripts, and social media content generation.

## Tech Stack

- **Content:** MDX (Markdown with JSX) blog posts
- **CMS:** Sanity.io (Project ID: ajindfal, Dataset: production)
- **Sync:** TypeScript scripts for Sanity content synchronization
- **Social:** LinkedIn API integration for post publishing
- **Runtime:** Bun (preferred over Node.js)

## Quick Start

```bash
# Sync blog content to Sanity
npm run sync

# Dry-run sync (preview changes)
npm run sync:dry-run

# Sync authors to Sanity
npm run sync:authors

# Validate content
npm run sync:validate
```

## Available Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| **BlogDraft** | `/blog-draft` | AI-powered first draft generation with Sonnet 4.6 |
| **MaximoBlog** | `/maximo-blog` | Full blog writing system with research and visuals |
| **MicroBlog** | `/micro-blog` | Break posts into social media micro-content |
| **LinkedInPublishing** | `/linkedin-publish` | Publish posts with images to LinkedIn |
| **LinkedInCarousel** | `/linkedin-carousel` | Generate carousel PDFs from blog posts |
| **SketchCarousel** | `/sketch-carousel` | Illustrated carousel slide images |
| **SearchMaximo** | `/search-maximo` | Search IBM Maximo knowledge base |

## Hooks

- **PreToolUse/Write:** Secret detection (`.claude/hooks/detect-secrets.sh`) — blocks writes containing hardcoded API keys (Google `AIzaSy…`, AWS, GitHub, Slack, private keys). Env refs like `${VAR}` are allowed.
- **PostToolUse/Write:** MDX frontmatter validation — warns if `.mdx` files missing frontmatter
- **git pre-commit** (`scripts/git-hooks/pre-commit`) — blocks *commits* containing the same secret patterns; catches every commit path (Claude, automation, manual git). Install after clone: `bash scripts/install-git-hooks.sh`. Real secrets belong in `/root/.claude-pai/.env` (sourced by `automation/off-hours/night-shift.sh`).

## Blog Post Structure

Posts live in `posts/` organized by series or as standalone files:
```
posts/
  MAS-ADMIN/          # 9-part series
  MAS-INTEGRATION/    # 8-part series
  MAS-VISUAL-INSPECTION/  # 12-part series
  MAS-HEALTH/         # 5-part series
  2026-02-02-*.mdx    # Standalone posts
```

### Required MDX Frontmatter

```yaml
---
title: "Post Title"
description: "Meta description"
date: "YYYY-MM-DD"
slug: "kebab-case-slug"
tags: ["Maximo", "MAS", ...]
draft: false
tier: "admin|developer|beginner|executive"
author: "Author Name"
seoTitle: "Under 60 chars"
seoDescription: "Under 160 chars"
targetQuestions:
  - "Question this post answers?"
---
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| posts/ | MDX blog content (103 posts) |
| sanity-studio/ | Sanity CMS studio (30 schema files) |
| SocialMedia/ | Social media content |
| linkedin-posts/ | LinkedIn-specific content |
| micro_blogs/ | Short-form content |
| prompts/ | AI prompt templates |
| scripts/ | Sync and utility scripts |

## Integration

- **Frontend:** Content syncs to THEMAXIMOGUYS-NEXTJS via Sanity
- **CMS:** Sanity webhook triggers revalidation on the Next.js site
- **Authors:** Synced from Supabase to Sanity via `npm run sync:authors`
