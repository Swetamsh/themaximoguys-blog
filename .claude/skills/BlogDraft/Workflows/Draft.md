# Draft Workflow

Generate a complete first-draft blog post in MDX format with full frontmatter, SEO metadata, and TMG's established voice.

## Input

The user provides one or more of:
- **Topic** (required): What the post is about
- **--series**: Series name (e.g., "MAS-INTEGRATION")
- **--part**: Part number within series
- **--tier**: Content tier (admin, developer, beginner, executive)
- **--target-questions**: Specific questions the post should answer

## Process

### Step 1: Research

Use web search to gather the latest information about the topic:
- Search for the latest IBM documentation on the subject
- Search for recent IBM announcements or updates related to the topic
- Search for competitor/community perspectives
- Check what questions people ask about this topic (StackOverflow, IBM Community)

### Step 2: Analyze Existing Content

Read the blog registry and existing posts to understand:
1. Read `~/.claude/skills/MaximoBlog/Registry/BlogRegistry.md` for existing posts
2. Scan `/root/themaximoguys-blog/posts/` for related series content
3. Identify cross-linking opportunities with existing posts
4. Ensure no duplicate content

### Step 3: Generate Outline

Before writing, create a structured outline:
- H2 headings (6-10 sections for a comprehensive post)
- Key points under each heading
- Where to include code examples, diagrams, or tables
- Cross-links to existing TMG posts
- FAQ section targeting AEO (Answer Engine Optimization)

### Step 4: Write the Draft

Generate the full MDX file following TMG's established patterns:

**Frontmatter must include ALL of these fields:**
```yaml
---
title: "Full descriptive title"
description: "2-3 sentence description for meta tags"
date: "YYYY-MM-DD"  # today's date
slug: "kebab-case-slug"
tags: ["Maximo", "MAS", ...]  # 5-10 relevant tags
draft: true  # ALWAYS true for AI drafts
tier: "admin|developer|beginner|executive"
author: "TheMaximoGuys Team"
authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
authorTitle: "Maximo Technical Team"
authorBio: "Technical practitioners with decades of combined experience implementing IBM Maximo across industries."
authorCredentials: ["IBM Certified Maximo Consultants", "Cloud-Native Architecture Specialists"]
series:  # only if part of a series
  name: "SERIES-NAME"
  part: N
  total: N
tldr: "One paragraph summary"
seoTitle: "Under 60 chars optimized title"
seoDescription: "Under 160 chars meta description"
targetQuestions:
  - "Question 1 this post answers?"
  - "Question 2?"
  - "Question 3?"
---
```

**Content structure:**
1. **Opening hook** — Start with a real-world problem or scenario (2-3 sentences)
2. **TLDR box** — Quick summary for scanners
3. **Main content** — H2 sections with technical depth
4. **Code examples** — Real Maximo code/config snippets where relevant
5. **Best practices** — Callout boxes with actionable tips
6. **FAQ section** — 3-5 questions in H3 format (AEO optimized)
7. **Conclusion** — Summary + next steps + cross-links

**Voice guidelines:**
- Authoritative but approachable — we're practitioners, not academics
- Use "you" and "your" — direct address
- Include specific Maximo feature names, not generic descriptions
- Reference real IBM documentation sections
- Use tables for comparisons, code blocks for configs
- Every claim backed by IBM docs or practical experience

### Step 5: Output

Write the complete MDX file to the appropriate location:
- Series post: `/root/themaximoguys-blog/posts/{SERIES-NAME}/part-{NN}-{slug}.mdx`
- Standalone post: `/root/themaximoguys-blog/posts/{date}-{slug}.mdx`

Print summary:
```
Blog Draft Generated:
  File: posts/MAS-INTEGRATION/part-09-event-driven-kafka.mdx
  Title: "Event-Driven Architecture with Kafka and Maximo"
  Word count: ~2,500
  SEO: title (58 chars), description (145 chars)
  Tags: 8 tags
  Cross-links: 3 existing posts
  Target questions: 5
  Status: DRAFT (requires human review)
```

## Quality Gates

Before outputting, verify:
- [ ] All frontmatter fields present
- [ ] `draft: true` is set (never false for AI content)
- [ ] Word count between 1,500-4,000
- [ ] At least 1 code example or technical snippet
- [ ] At least 3 target questions for AEO
- [ ] SEO title under 60 chars
- [ ] SEO description under 160 chars
- [ ] At least 2 cross-links to existing TMG posts
- [ ] No fabricated IBM documentation references
