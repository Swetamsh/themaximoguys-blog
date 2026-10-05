# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Project Purpose

TheMaximoGuys blog content repository — 197 MDX blog posts, Sanity CMS studio, content sync scripts, and social media content generation.

## Tech Stack

- **Content:** MDX (Markdown with JSX) blog posts
- **CMS:** Sanity.io (Project ID: ajindfal, Dataset: production)
- **Sync:** TypeScript scripts for Sanity content synchronization (run via `npm run` + `tsx`)
- **Social:** LinkedIn API integration for post publishing

## Quick Start

```bash
# Sync blog content to Sanity (content-hash diff — only changed posts)
npm run sync

# Dry-run sync (preview changes, no writes)
npm run sync:dry-run

# Force re-sync all posts, ignoring content hashes
npm run sync:force

# Validate posts without syncing (broken images, missing slugs, etc.)
npm run sync:validate

# Sync authors from Supabase to Sanity
npm run sync:authors
npm run sync:authors:prod   # writes to the tmg_prod schema instead of production

# Run Sanity Studio locally (content UI at localhost:3333)
cd sanity-studio && npm run dev

# Install git pre-commit secret-scan hook (once per clone)
bash scripts/install-git-hooks.sh
```

Additional one-off sync flags can be combined directly, e.g. `npx tsx scripts/sync-blog-to-sanity.ts --force --skip-images`.

There is no test suite or linter configured in this repo (no `test`/`lint` script in `package.json`).

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
- **git pre-commit** (`scripts/git-hooks/pre-commit`) — blocks *commits* containing the same secret patterns; catches every commit path (Codex, automation, manual git). Install after clone: `bash scripts/install-git-hooks.sh`. Real secrets belong in `/root/.claude-pai/.env` (sourced by `automation/off-hours/night-shift.sh`).

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
| posts/ | MDX blog content (197 posts) |
| sanity-studio/ | Sanity CMS studio (30 schema files) |
| SocialMedia/ | Social media content |
| linkedin-posts/ | LinkedIn-specific content |
| micro_blogs/ | Short-form content |
| prompts/ | AI prompt templates |
| scripts/ | Sync and utility scripts |
| knowledge_base/ | Source docs (DOC1-12) that ground night-shift research |
| content-planning/ | Docs→blogs gap analysis, kept in sync by night-shift replan jobs |
| automation/off-hours/ | Cron-driven autonomous blog production (see Architecture) |

## Integration

- **Frontend:** Content syncs to THEMAXIMOGUYS-NEXTJS via Sanity
- **CMS:** Sanity webhook triggers revalidation on the Next.js site
- **Authors:** Synced from Supabase to Sanity via `npm run sync:authors`

## Architecture

This repo is the **write side** of a one-way content pipeline; the Next.js site only ever reads from Sanity:

```
posts/*.mdx (source of truth)
  → scripts/sync-blog-to-sanity.ts (MD5 content-hash diff, gray-matter frontmatter parse)
  → Sanity CMS (production dataset)
  → THEMAXIMOGUYS-NEXTJS (read-only, revalidated via webhook)
```

The sync script (`scripts/sync-blog-to-sanity.ts`) hashes each post's content on every run and skips anything unchanged, so `npm run sync` is safe to run repeatedly — only `--force` bypasses the hash check. `--validate` runs the same parsing/checks without writing to Sanity.

### Off-hours content automation

`automation/off-hours/` runs an autonomous, hourly cron job (23:00–06:00) that drafts one blog post or cover-image batch per tick via a headless `codex` run, pulling work from `automation/off-hours/queue.json`. Key guardrails: posts are always written with `draft: true`, and nothing is ever auto-synced to Sanity or auto-published to LinkedIn — morning review (`git log`, flip `draft: false`, `npm run sync`) is a manual step. See `automation/off-hours/README.md` for the full mechanics (queue format, cover-style rotation, dry-run/force flags).
