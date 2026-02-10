# Sanity + Supabase Hybrid Architecture — Complete Implementation Plan

**Status:** Ready for Implementation
**Architecture:** GitHub Blog Repo (Source of Truth) → Sanity (CMS) + Supabase (Comments/Auth/Vectors)
**Source of Truth:** `themaximoguys-blog` GitHub repository
**Timeline:** 3-4 weeks
**Migration Risk:** Low (Comments system untouched)
**SEO/AEO:** Full structured data, AI crawler optimization, topic clusters, E-E-A-T signals

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     HYBRID ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SOURCE OF TRUTH (GitHub: themaximoguys-blog)                    │
│  ├─ All MDX blog posts (posts/)                                  │
│  ├─ All images (posts/*/images/)                                 │
│  ├─ Planned content drafts (Planned/)                            │
│  ├─ Archived content (Archive/)                                  │
│  ├─ Series structure (MAS-ADMIN, THINK-MAS, MAS-INTEGRATION)    │
│  └─ Frontmatter = single schema definition                       │
│                                                                   │
│  CONTENT DELIVERY (Sanity.io) — synced FROM GitHub repo          │
│  ├─ Blog posts (Portable Text, converted from MDX)               │
│  ├─ Authors with E-E-A-T credentials                             │
│  ├─ FAQ sections → FAQPage JSON-LD                               │
│  ├─ HowTo sections → HowTo JSON-LD                              │
│  ├─ Series taxonomy → ItemList JSON-LD                           │
│  ├─ Topic clusters (pillar ↔ cluster linking)                    │
│  ├─ Images (Sanity CDN with auto WebP/AVIF)                     │
│  └─ Webhooks → RAG pipeline + sitemap regen                     │
│                                                                   │
│  SEO/AEO LAYER                                                   │
│  ├─ JSON-LD: TechArticle, FAQPage, HowTo, BreadcrumbList        │
│  ├─ JSON-LD: Speakable, ItemList (series), Person, Organization  │
│  ├─ Dynamic sitemap.xml from Sanity GROQ                         │
│  ├─ Dynamic robots.txt with AI crawler directives                │
│  ├─ Dynamic OG images via Next.js ImageResponse                  │
│  ├─ Canonical URLs, hreflang, meta robots                        │
│  ├─ Topic cluster internal linking                                │
│  └─ Content scoring (readability, keyword, E-E-A-T)             │
│                                                                   │
│  USER/DATA LAYER (Supabase) — UNCHANGED                          │
│  ├─ Comments (Phase 1 & 2 complete — DON'T TOUCH!)              │
│  ├─ User authentication                                          │
│  ├─ pgvector (semantic search)                                   │
│  └─ Rate limiting, audit logs, reactions                         │
│                                                                   │
│  FRONTEND (Next.js 16)                                           │
│  ├─ Fetch content from Sanity GROQ API                           │
│  ├─ Fetch comments from Supabase                                 │
│  ├─ Render Portable Text with SEO-optimized components           │
│  ├─ Auto-generated Table of Contents                             │
│  ├─ Breadcrumb navigation with schema                            │
│  ├─ Series navigation with progress                              │
│  ├─ Related posts via vector similarity                          │
│  └─ Fallback: GitHub API (if Sanity unavailable)                 │
│                                                                   │
│  SYNC FLOW                                                        │
│  GitHub push → GitHub Action → Sanity sync → Webhook →           │
│  Vector embeddings + Sitemap regen + Google Indexing API ping    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Content Inventory (themaximoguys-blog repo)

### Published Posts (`posts/`)

| Series | Folder | Posts | Tier | Images |
|--------|--------|-------|------|--------|
| Root-level | `posts/` | 3 posts | free/developer | External URLs |
| MAS Admin | `posts/MAS-ADMIN/` | 9 posts (series 1-8 + index) | admin | 9 local PNGs |
| MAS Integration | `posts/MAS-INTEGRATION/` | 9 posts (series 1-8 + index) | developer | 9 local PNGs |
| THINK MAS | `posts/THINK-MAS/` | 16 posts (12 think-mas + 4 dev-mindset) | developer | 20+ local PNGs + diagrams |
| **Total** | | **37 published posts** | | **40+ images** |

### Planned Content (`Planned/`)

| Series | Folder | Posts | Status |
|--------|--------|-------|--------|
| MAS Admin | `Planned/MAS ADMIN/` | 9 Notion-exported .md files | Drafts |
| MAS Developer | `Planned/MAS DEVELOPER/` | 6 Notion-exported .md files | Drafts |
| THINK MAS | `Planned/THINK MAS/` | 13 Notion-exported .md files | Drafts |
| **Total** | | **28 planned posts** | |

### Archive (`Archive/`)

| Content | Files | Status |
|---------|-------|--------|
| AI Series (6 parts + index) | 7 .md files | Archived/deprecated |

---

## What Stays (DON'T CHANGE)

The Supabase Comments system — keep everything:

- Real-time comments (Server-Sent Events)
- Admin moderation with "Show Deleted" toggle
- Rate limiting (30s cooldown + DB-level)
- Row-Level Security (89% security score)
- Comment reactions (5 emoji types)
- Magic link authentication
- AI spam detection (99.9% accuracy)
- Redis caching (-80% server load)

---

## SEO + AEO Strategy Overview

### What is AEO?

Answer Engine Optimization (AEO) optimizes content for AI-powered search — Google AI Overviews, Bing Copilot, Perplexity, ChatGPT with browsing. Unlike traditional SEO (keyword rankings), AEO targets **citation frequency, extraction quality, and answer accuracy** within AI-generated responses.

**Why it matters:** Gartner predicts 25% of organic traffic shifts to AI chatbots by 2026. 65%+ of searches now end without a click. AEO and SEO are complementary — improvements to one lift the other.

### The 7 Pillars

| # | Pillar | What We Build | Why |
|---|--------|--------------|-----|
| 1 | **Structured Data** | JSON-LD for 8 schema types | AI crawlers and Google extract structured data first |
| 2 | **E-E-A-T Signals** | Author schema with credentials, experience proof | Google Dec 2025 update extended E-E-A-T to ALL searches |
| 3 | **Answer-First Content** | AnswerBox, TL;DR, FAQ, HowTo blocks | Direct answers win featured snippets + AI citations |
| 4 | **Topic Clusters** | Pillar pages + cluster posts + internal links | 30% more traffic, 2.5x longer ranking retention |
| 5 | **AI Crawler Access** | robots.txt with GPTBot/PerplexityBot/ClaudeBot directives | AI engines can only cite content they can crawl |
| 6 | **Technical SEO** | Sitemap, canonical URLs, OG images, Core Web Vitals | Foundation that everything else builds on |
| 7 | **Speakable Content** | Speakable schema on key sections | Voice search and AI audio response optimization |

---

## Frontmatter → Sanity Schema Mapping (Enhanced)

### Core Fields

| MDX Frontmatter | Sanity Field | Type | Required |
|-----------------|-------------|------|----------|
| `title` | `title` | string | Yes |
| `slug` | `slug` | slug | Yes |
| `description` | `description` | text (max 155 chars) | Yes |
| `date` | `publishedAt` | datetime | Yes |
| `tags` | `tags` | array[string] | Yes |
| `draft` | `draft` | boolean | Yes |
| `tier` | `tier` | string (free/developer/admin/enterprise) | Yes |
| *(MDX body)* | `content` | Portable Text blocks | Yes |

### Author & E-E-A-T Fields

| MDX Frontmatter | Sanity Field | Type | SEO Purpose |
|-----------------|-------------|------|-------------|
| `author` | `author` → reference | reference(author) | Person schema |
| `authorTitle` | `author.title` | string | jobTitle in Person schema |
| `authorBio` | `author.bio` | text | E-E-A-T experience signal |
| `authorCredentials` | `author.credentials` | array[string] | knowsAbout + expertise |
| `authorLinkedin` | `author.linkedin` | url | sameAs verification |
| `authorAvatar` | `author.avatar` | image | Person schema image |

### SEO/AEO Fields (NEW)

| MDX Frontmatter | Sanity Field | Type | SEO Purpose |
|-----------------|-------------|------|-------------|
| `seoTitle` | `seo.title` | string (max 65 chars) | Override title for SERP |
| `seoDescription` | `seo.description` | text (max 155 chars) | Override description for SERP |
| `ogImage` | `seo.ogImage` | image | Open Graph / Twitter card |
| `canonicalUrl` | `seo.canonicalUrl` | url | Canonical URL |
| `noIndex` | `seo.noIndex` | boolean | Exclude from indexing |
| `targetQuestions` | `aeo.targetQuestions` | array[string] | Questions this post answers (AEO) |
| `semanticKeywords` | `aeo.semanticKeywords` | array[string] | Related keywords / LSI terms |
| `proficiencyLevel` | `aeo.proficiencyLevel` | string (Beginner/Expert) | TechArticle schema |
| `dependencies` | `aeo.dependencies` | string | TechArticle prerequisites |
| `speakableSections` | `aeo.speakableSections` | array[string] | CSS selectors for Speakable schema |

### Content Structure Fields (NEW)

| MDX Frontmatter | Sanity Field | Type | SEO Purpose |
|-----------------|-------------|------|-------------|
| `faqs` | `faqs` | array[{question, answer}] | FAQPage JSON-LD |
| `keyTakeaways` | `keyTakeaways` | array[string] | AI-extractable summary |
| `tldr` | `tldr` | text | Featured snippet bait |
| `howTo` | `howTo` | object{name, steps[]} | HowTo JSON-LD |
| `citations` | `citations` | array[{title, url, type}] | Source credibility signal |
| `updateHistory` | `updateHistory` | array[{date, reason}] | Content freshness signal |

### Series & Topic Cluster Fields (NEW)

| MDX Frontmatter | Sanity Field | Type | SEO Purpose |
|-----------------|-------------|------|-------------|
| `series.name` | `seriesName` | string | ItemList JSON-LD |
| `series.part` | `seriesPart` | number | ItemList position |
| `series.total` | `seriesTotal` | number | ItemList numberOfItems |
| `pillarSlug` | `pillarSlug` | string | Topic cluster parent link |
| `clusterSlugs` | `clusterSlugs` | array[string] | Topic cluster child links |
| `relatedSlugs` | `relatedSlugs` | array[string] | Manual related posts |

### Computed Fields (auto-generated)

| Field | Type | How |
|-------|------|-----|
| `wordCount` | number | Count words in Portable Text |
| `readingTime` | number | wordCount / 200 (avg reading speed) |
| `contentHash` | string | MD5 of source MDX file |
| `sourceFile` | string | Path in blog repo |
| `seoScore` | number (0-100) | Computed from completeness of all SEO fields |

---

## Phase 1: Sanity Schemas (Week 1)

### Step 1.1: Install Dependencies

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
npm install -g @sanity/cli

sanity init
# Project: themaximoguys-blog-cms
# Dataset: production
# Output: ./sanity-studio
```

### Step 1.2: Enhanced Blog Post Schema

**File:** `sanity-studio/schemas/blogPost.ts`

```typescript
export const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'aeo', title: 'AEO (AI Optimization)' },
    { name: 'series', title: 'Series & Clusters' },
    { name: 'meta', title: 'Metadata' },
    { name: 'source', title: 'Source Tracking' },
  ],
  fields: [
    // ═══ CONTENT ═══
    {
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'SEO meta description. Keep under 155 characters.',
      validation: (Rule: any) => Rule.required().max(300)
    },
    {
      name: 'tldr',
      type: 'text',
      rows: 3,
      group: 'content',
      title: 'TL;DR Summary',
      description: '40-60 word direct answer. This appears as the featured snippet bait and AI-extractable summary.'
    },
    {
      name: 'content',
      type: 'array',
      group: 'content',
      of: [
        // --- Rich text blocks ---
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Strikethrough', value: 'strike-through' },
              { title: 'Highlight', value: 'highlight' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'mailto'] }) },
                  { name: 'isInternal', type: 'boolean', title: 'Internal link?', initialValue: false }
                ]
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Post Link',
                fields: [
                  { name: 'reference', type: 'reference', to: [{ type: 'blogPost' }] }
                ]
              }
            ]
          }
        },
        // --- Media ---
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule: any) => Rule.required() },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        },
        {
          type: 'code',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Python', value: 'python' },
              { title: 'SQL', value: 'sql' },
              { title: 'Bash', value: 'bash' },
              { title: 'YAML', value: 'yaml' },
              { title: 'JSON', value: 'json' },
              { title: 'XML', value: 'xml' },
              { title: 'Java', value: 'java' }
            ]
          }
        },
        // --- SEO/AEO Content Blocks ---
        { type: 'faqSection' },
        { type: 'howToSection' },
        { type: 'keyTakeawaysBlock' },
        { type: 'answerBox' },
        { type: 'comparisonTable' },
        { type: 'definitionBlock' },
        { type: 'expertQuote' },
        { type: 'statBlock' },
        { type: 'proConList' },
        { type: 'calloutBox' },
        { type: 'citationBlock' }
      ]
    },

    // ═══ SEO ═══
    {
      name: 'seoTitle',
      type: 'string',
      group: 'seo',
      title: 'SEO Title Override',
      description: 'If set, overrides title in <title> and og:title. Max 65 chars.',
      validation: (Rule: any) => Rule.max(65).warning('Titles over 65 characters may be truncated in SERPs')
    },
    {
      name: 'seoDescription',
      type: 'text',
      rows: 3,
      group: 'seo',
      title: 'SEO Description Override',
      description: 'If set, overrides description in meta and og:description. Max 155 chars.',
      validation: (Rule: any) => Rule.max(155).warning('Descriptions over 155 characters may be truncated')
    },
    {
      name: 'coverImage',
      type: 'image',
      group: 'seo',
      title: 'Cover Image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' }
      ]
    },
    {
      name: 'ogImage',
      type: 'image',
      group: 'seo',
      title: 'Open Graph Image',
      description: '1200x630px. If not set, cover image is used. If neither, auto-generated.'
    },
    {
      name: 'canonicalUrl',
      type: 'url',
      group: 'seo',
      title: 'Canonical URL',
      description: 'Set if this post is cross-posted elsewhere'
    },
    {
      name: 'noIndex',
      type: 'boolean',
      group: 'seo',
      title: 'No Index',
      description: 'Exclude this post from search engine indexing',
      initialValue: false
    },
    {
      name: 'faqs',
      type: 'array',
      group: 'seo',
      title: 'FAQ (Structured Data → FAQPage JSON-LD)',
      description: 'Each Q&A pair generates a FAQPage schema entry. These appear as rich results in Google.',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'answer', type: 'text', validation: (Rule: any) => Rule.required() }
        ],
        preview: { select: { title: 'question' } }
      }]
    },
    {
      name: 'keyTakeaways',
      type: 'array',
      group: 'seo',
      title: 'Key Takeaways',
      description: 'Bullet points summarizing the post. AI engines extract these for quick answers.',
      of: [{ type: 'string' }]
    },
    {
      name: 'howTo',
      type: 'object',
      group: 'seo',
      title: 'HowTo Schema',
      description: 'If this post is a tutorial/guide, define steps for HowTo rich results.',
      fields: [
        { name: 'name', type: 'string', title: 'HowTo Title' },
        { name: 'description', type: 'text', title: 'HowTo Description' },
        { name: 'totalTime', type: 'string', title: 'Total Time (e.g., PT30M, PT2H)' },
        {
          name: 'steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Step Name' },
              { name: 'text', type: 'text', title: 'Step Instructions' },
              { name: 'image', type: 'image', title: 'Step Image (optional)' }
            ],
            preview: { select: { title: 'name' } }
          }]
        }
      ]
    },
    {
      name: 'citations',
      type: 'array',
      group: 'seo',
      title: 'Citations / Sources',
      description: 'External sources referenced. Builds credibility for E-E-A-T.',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'url', type: 'url' },
          { name: 'type', type: 'string', options: { list: ['documentation', 'research', 'article', 'video', 'book'] } }
        ],
        preview: { select: { title: 'title', subtitle: 'url' } }
      }]
    },

    // ═══ AEO (AI OPTIMIZATION) ═══
    {
      name: 'targetQuestions',
      type: 'array',
      group: 'aeo',
      title: 'Target Questions (AEO)',
      description: 'Exact questions this post answers. Used for: AI Overview targeting, "People also ask" optimization, voice search matching.',
      of: [{ type: 'string' }]
    },
    {
      name: 'semanticKeywords',
      type: 'array',
      group: 'aeo',
      title: 'Semantic Keywords (LSI)',
      description: 'Related terms and phrases that support topical depth. AI engines use these to understand content scope.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'proficiencyLevel',
      type: 'string',
      group: 'aeo',
      title: 'Proficiency Level',
      description: 'Maps to TechArticle schema proficiencyLevel. Helps AI engines match content to user expertise.',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Expert', value: 'Expert' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'dependencies',
      type: 'text',
      group: 'aeo',
      title: 'Prerequisites / Dependencies',
      description: 'Maps to TechArticle schema dependencies. E.g., "IBM Maximo 7.6+, WebSphere 9.x"'
    },
    {
      name: 'speakableSections',
      type: 'array',
      group: 'aeo',
      title: 'Speakable Sections (Voice Search)',
      description: 'CSS selectors for sections optimized for text-to-speech. E.g., ".article-headline", ".tldr-summary"',
      of: [{ type: 'string' }]
    },

    // ═══ SERIES & TOPIC CLUSTERS ═══
    {
      name: 'seriesName',
      type: 'string',
      group: 'series',
      title: 'Series Name',
      description: 'e.g., "MAS ADMIN", "THINK MAS". Generates ItemList JSON-LD.'
    },
    {
      name: 'seriesPart',
      type: 'number',
      group: 'series',
      title: 'Part Number'
    },
    {
      name: 'seriesTotal',
      type: 'number',
      group: 'series',
      title: 'Total Parts'
    },
    {
      name: 'pillarSlug',
      type: 'string',
      group: 'series',
      title: 'Pillar Page Slug',
      description: 'If this is a cluster post, link to the pillar/index page slug. Creates bidirectional topic cluster linking.'
    },
    {
      name: 'clusterSlugs',
      type: 'array',
      group: 'series',
      title: 'Cluster Post Slugs',
      description: 'If this is a pillar page, list all cluster post slugs. Creates outbound links to the entire cluster.',
      of: [{ type: 'string' }]
    },
    {
      name: 'relatedSlugs',
      type: 'array',
      group: 'series',
      title: 'Related Post Slugs (Manual)',
      description: 'Manually curated related posts. Supplements vector-based recommendations.',
      of: [{ type: 'string' }]
    },

    // ═══ METADATA ═══
    {
      name: 'publishedAt',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      group: 'meta'
    },
    {
      name: 'updateHistory',
      type: 'array',
      group: 'meta',
      title: 'Update History',
      description: 'Track content freshness — Google rewards recently updated content.',
      of: [{
        type: 'object',
        fields: [
          { name: 'date', type: 'datetime' },
          { name: 'reason', type: 'string' }
        ],
        preview: { select: { title: 'reason', subtitle: 'date' } }
      }]
    },
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta'
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'meta'
    },
    {
      name: 'tier',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Developer', value: 'developer' },
          { title: 'Admin', value: 'admin' },
          { title: 'Enterprise', value: 'enterprise' }
        ],
        layout: 'radio'
      },
      initialValue: 'free'
    },
    {
      name: 'draft',
      type: 'boolean',
      group: 'meta',
      initialValue: true
    },
    {
      name: 'featured',
      type: 'boolean',
      group: 'meta',
      title: 'Featured Post',
      initialValue: false
    },

    // ═══ SOURCE TRACKING ═══
    {
      name: 'sourceFile',
      type: 'string',
      group: 'source',
      title: 'Source MDX File',
      readOnly: true
    },
    {
      name: 'contentHash',
      type: 'string',
      group: 'source',
      title: 'Content Hash (MD5)',
      readOnly: true
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      series: 'seriesName',
      part: 'seriesPart',
      tier: 'tier'
    },
    prepare(selection: any) {
      const { title, author, series, part, tier } = selection
      const subtitle = [
        series && `${series} Part ${part}`,
        tier && `[${tier}]`,
        author && `by ${author}`
      ].filter(Boolean).join(' — ')
      return { ...selection, title, subtitle }
    }
  }
}
```

### Step 1.3: Enhanced Author Schema (E-E-A-T)

**File:** `sanity-studio/schemas/author.ts`

```typescript
export const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'avatar', type: 'image', options: { hotspot: true } },
    {
      name: 'title',
      type: 'string',
      title: 'Job Title',
      description: 'Maps to Person schema jobTitle. E.g., "Senior Maximo Consultant"'
    },
    {
      name: 'bio',
      type: 'text',
      rows: 4,
      description: 'Experience narrative. Should demonstrate first-hand experience (E-E-A-T "Experience").'
    },
    {
      name: 'credentials',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Certifications, qualifications. Maps to knowsAbout in Person schema.'
    },
    {
      name: 'yearsExperience',
      type: 'number',
      title: 'Years of Experience',
      description: 'Reinforces E-E-A-T "Experience" signal.'
    },
    {
      name: 'specializations',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Areas of Expertise',
      description: 'Maps to knowsAbout in Person schema. E.g., "IBM Maximo", "EAM", "MAS 9"',
      options: { layout: 'tags' }
    },
    {
      name: 'worksFor',
      type: 'string',
      title: 'Organization',
      description: 'Maps to worksFor in Person schema.'
    },
    // Social profiles (sameAs in Person schema — critical for identity verification)
    { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
    { name: 'twitter', type: 'url', title: 'Twitter/X URL' },
    { name: 'github', type: 'url', title: 'GitHub URL' },
    { name: 'website', type: 'url', title: 'Personal Website' }
  ]
}
```

### Step 1.4: New AEO Content Block Schemas

**File:** `sanity-studio/schemas/comparisonTable.ts`

```typescript
// Structured comparison table → Google Table Snippets
export const comparisonTable = {
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Table Title' },
    {
      name: 'headers',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Column Headers'
    },
    {
      name: 'rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'cells', type: 'array', of: [{ type: 'string' }] }
        ]
      }]
    }
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: any) {
      return { title: title || 'Comparison Table' }
    }
  }
}
```

**File:** `sanity-studio/schemas/definitionBlock.ts`

```typescript
// Structured definition → Google Knowledge Panel / Dictionary Snippet
export const definitionBlock = {
  name: 'definitionBlock',
  title: 'Definition Block',
  type: 'object',
  fields: [
    { name: 'term', type: 'string', title: 'Term', validation: (Rule: any) => Rule.required() },
    { name: 'definition', type: 'text', title: 'Definition', validation: (Rule: any) => Rule.required() },
    { name: 'source', type: 'string', title: 'Source (optional)' }
  ],
  preview: {
    select: { title: 'term' },
    prepare({ title }: any) {
      return { title: `Definition: ${title}` }
    }
  }
}
```

**File:** `sanity-studio/schemas/expertQuote.ts`

```typescript
// Expert quote with attribution → E-E-A-T credibility signal
export const expertQuote = {
  name: 'expertQuote',
  title: 'Expert Quote',
  type: 'object',
  fields: [
    { name: 'quote', type: 'text', validation: (Rule: any) => Rule.required() },
    { name: 'authorName', type: 'string', title: 'Author Name' },
    { name: 'authorTitle', type: 'string', title: 'Author Title/Role' },
    { name: 'organization', type: 'string' },
    { name: 'sourceUrl', type: 'url', title: 'Source URL' }
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'organization' }
  }
}
```

**File:** `sanity-studio/schemas/statBlock.ts`

```typescript
// Key statistic with source → Snippet-worthy data point
export const statBlock = {
  name: 'statBlock',
  title: 'Statistic Block',
  type: 'object',
  fields: [
    { name: 'value', type: 'string', title: 'Stat Value', description: 'E.g., "40%", "$2.5M", "3.5x"' },
    { name: 'label', type: 'string', title: 'What it measures' },
    { name: 'context', type: 'text', title: 'Context / Explanation' },
    { name: 'source', type: 'string', title: 'Source' },
    { name: 'sourceUrl', type: 'url', title: 'Source URL' }
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' }
  }
}
```

**File:** `sanity-studio/schemas/proConList.ts`

```typescript
// Pro/Con list → Comparison snippet optimization
export const proConList = {
  name: 'proConList',
  title: 'Pro/Con List',
  type: 'object',
  fields: [
    { name: 'subject', type: 'string', title: 'Subject being evaluated' },
    { name: 'pros', type: 'array', of: [{ type: 'string' }], title: 'Pros' },
    { name: 'cons', type: 'array', of: [{ type: 'string' }], title: 'Cons' },
    { name: 'verdict', type: 'text', title: 'Verdict / Recommendation' }
  ],
  preview: {
    select: { title: 'subject' },
    prepare({ title }: any) {
      return { title: `Pros/Cons: ${title}` }
    }
  }
}
```

**File:** `sanity-studio/schemas/calloutBox.ts`

```typescript
// Callout box → Visual emphasis + AI-extractable tip/warning
export const calloutBox = {
  name: 'calloutBox',
  title: 'Callout Box',
  type: 'object',
  fields: [
    {
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Tip', value: 'tip' },
          { title: 'Warning', value: 'warning' },
          { title: 'Info', value: 'info' },
          { title: 'Important', value: 'important' },
          { title: 'Experience', value: 'experience' } // E-E-A-T first-hand experience callout
        ],
        layout: 'radio'
      }
    },
    { name: 'title', type: 'string' },
    { name: 'body', type: 'text' }
  ],
  preview: {
    select: { title: 'title', type: 'type' },
    prepare({ title, type }: any) {
      return { title: `${type?.toUpperCase()}: ${title}` }
    }
  }
}
```

**File:** `sanity-studio/schemas/citationBlock.ts`

```typescript
// Inline citation → Source credibility signal
export const citationBlock = {
  name: 'citationBlock',
  title: 'Citation / Source Reference',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'url', type: 'url' },
    { name: 'author', type: 'string' },
    { name: 'publishedDate', type: 'date' },
    {
      name: 'type',
      type: 'string',
      options: {
        list: ['documentation', 'research', 'article', 'video', 'book', 'ibm-official']
      }
    },
    { name: 'excerpt', type: 'text', title: 'Relevant excerpt' }
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' }
  }
}
```

---

## Phase 2: JSON-LD Structured Data Engine (Week 1-2)

### Step 2.1: Multi-Schema JSON-LD Generator

**File:** `components/blog/StructuredDataEngine.tsx`

This generates ALL schema types for a single blog post page:

```typescript
import { urlForImage } from '@/lib/sanity/client'

interface Post {
  title: string
  slug: string
  description: string
  content: any[]
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    slug: string
    avatar?: any
    bio?: string
    title?: string
    credentials?: string[]
    specializations?: string[]
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
    worksFor?: string
  }
  coverImage?: any
  ogImage?: any
  faqs?: { question: string; answer: string }[]
  keyTakeaways?: string[]
  tldr?: string
  howTo?: { name: string; description: string; totalTime?: string; steps: { name: string; text: string; image?: any }[] }
  tags?: string[]
  tier: string
  proficiencyLevel?: string
  dependencies?: string
  speakableSections?: string[]
  seriesName?: string
  seriesPart?: number
  seriesTotal?: number
  wordCount?: number
  readingTime?: number
  citations?: { title: string; url: string; type: string }[]
  canonicalUrl?: string
  targetQuestions?: string[]
}

const SITE_URL = 'https://themaximoguys.ai'
const ORG_NAME = 'The Maximo Guys'
const ORG_LOGO = `${SITE_URL}/logo.svg`

export function StructuredDataEngine({ post, seriesPosts }: { post: Post; seriesPosts?: Post[] }) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`
  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : `${SITE_URL}/images/blog-default-og.png`

  const schemas: any[] = []

  // ─── 1. TechArticle (Enhanced BlogPosting) ─────────────────────────
  const article: any = {
    '@context': 'https://schema.org',
    '@type': post.proficiencyLevel ? 'TechArticle' : 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: coverImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    url: postUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    wordCount: post.wordCount,
    articleSection: post.tags?.[0] || 'IBM Maximo',
    keywords: post.tags?.join(', '),
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `${SITE_URL}/authors/${post.author.slug}`,
      jobTitle: post.author.title,
      description: post.author.bio,
      image: post.author.avatar ? urlForImage(post.author.avatar)?.width(200).height(200).url() : undefined,
      worksFor: post.author.worksFor ? { '@type': 'Organization', name: post.author.worksFor } : undefined,
      knowsAbout: post.author.specializations || post.author.credentials,
      sameAs: [
        post.author.linkedin,
        post.author.twitter,
        post.author.github,
        post.author.website
      ].filter(Boolean)
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: { '@type': 'ImageObject', url: ORG_LOGO },
      url: SITE_URL,
      sameAs: [
        'https://www.linkedin.com/company/themaximoguys',
        'https://twitter.com/themaximoguys'
      ]
    }
  }

  // TechArticle-specific fields
  if (post.proficiencyLevel) {
    article.proficiencyLevel = post.proficiencyLevel
  }
  if (post.dependencies) {
    article.dependencies = post.dependencies
  }

  // Speakable sections
  if (post.speakableSections?.length) {
    article.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: post.speakableSections
    }
  }

  schemas.push(article)

  // ─── 2. FAQPage Schema ─────────────────────────────────────────────
  if (post.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    })
  }

  // ─── 3. HowTo Schema ──────────────────────────────────────────────
  if (post.howTo?.steps?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: post.howTo.name,
      description: post.howTo.description,
      totalTime: post.howTo.totalTime,
      step: post.howTo.steps.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text,
        image: step.image ? urlForImage(step.image)?.width(800).url() : undefined
      }))
    })
  }

  // ─── 4. BreadcrumbList ─────────────────────────────────────────────
  const breadcrumbs: any = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` }
    ]
  }

  if (post.seriesName) {
    breadcrumbs.itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: post.seriesName,
      item: `${SITE_URL}/blog/series/${encodeURIComponent(post.seriesName.toLowerCase().replace(/\s+/g, '-'))}`
    })
    breadcrumbs.itemListElement.push({
      '@type': 'ListItem',
      position: 4,
      name: post.title,
      item: postUrl
    })
  } else {
    breadcrumbs.itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: postUrl
    })
  }
  schemas.push(breadcrumbs)

  // ─── 5. ItemList (Series) ──────────────────────────────────────────
  if (seriesPosts?.length && post.seriesName) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${post.seriesName} Series`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: seriesPosts.length,
      itemListElement: seriesPosts.map((sp, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: sp.title,
        url: `${SITE_URL}/blog/${sp.slug}`
      }))
    })
  }

  // ─── Render all schemas ────────────────────────────────────────────
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
```

---

## Phase 3: Technical SEO Infrastructure (Week 2)

### Step 3.1: Dynamic Sitemap

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = 'https://themaximoguys.ai'

  // Fetch all published posts from Sanity
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && draft != true && noIndex != true] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      updatedAt,
      seriesName,
      tier
    }`
  )

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: post.tier === 'free' ? 0.8 : 0.7,
  }))

  // Series index pages
  const seriesNames = [...new Set(posts.map((p: any) => p.seriesName).filter(Boolean))]
  const seriesPages: MetadataRoute.Sitemap = seriesNames.map((name: string) => ({
    url: `${SITE_URL}/blog/series/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...seriesPages, ...blogPages]
}
```

### Step 3.2: Dynamic Robots.txt with AI Crawler Directives

**File:** `app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = 'https://themaximoguys.ai'

  return {
    rules: [
      // Standard search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      // Google AI Overviews (Googlebot already allowed by *)
      // GPTBot (OpenAI / ChatGPT with browsing)
      {
        userAgent: 'GPTBot',
        allow: ['/blog/', '/about', '/services', '/case-studies'],
        disallow: ['/api/', '/admin/'],
      },
      // PerplexityBot
      {
        userAgent: 'PerplexityBot',
        allow: ['/blog/', '/about', '/services', '/case-studies'],
        disallow: ['/api/', '/admin/'],
      },
      // ClaudeBot (Anthropic)
      {
        userAgent: 'ClaudeBot',
        allow: ['/blog/', '/about', '/services', '/case-studies'],
        disallow: ['/api/', '/admin/'],
      },
      // Bing Copilot (uses BingBot)
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Google Extended (Gemini)
      {
        userAgent: 'Google-Extended',
        allow: ['/blog/', '/about', '/services'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

### Step 3.3: Dynamic OG Image Generation

**File:** `app/blog/[slug]/opengraph-image.tsx`

```typescript
import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/sanity/queries'

export const runtime = 'edge'
export const alt = 'Blog post cover image'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
        color: 'white',
        fontFamily: 'sans-serif',
      }}>
        {/* Series badge */}
        {post?.seriesName && (
          <div style={{ fontSize: 24, color: '#e94560', marginBottom: 16, display: 'flex' }}>
            {post.seriesName} — Part {post.seriesPart} of {post.seriesTotal}
          </div>
        )}

        {/* Title */}
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.2, marginBottom: 24, display: 'flex' }}>
          {post?.title || 'The Maximo Guys Blog'}
        </div>

        {/* Description */}
        <div style={{ fontSize: 24, color: '#ccc', lineHeight: 1.4, marginBottom: 40, display: 'flex' }}>
          {post?.description?.slice(0, 120)}...
        </div>

        {/* Author + branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 20, display: 'flex' }}>
              {post?.author?.name || 'The Maximo Guys'}
            </div>
            {post?.author?.title && (
              <div style={{ fontSize: 16, color: '#888', display: 'flex' }}>
                {post.author.title}
              </div>
            )}
          </div>
          <div style={{ fontSize: 20, color: '#e94560', display: 'flex' }}>
            themaximoguys.ai
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
```

### Step 3.4: next.config.ts — Add Sanity CDN

```typescript
// Add to next.config.ts images.remotePatterns:
{
  protocol: 'https',
  hostname: 'cdn.sanity.io',
},
```

---

## Phase 4: Frontend SEO Components (Week 2)

### Step 4.1: Breadcrumb Navigation

**File:** `components/blog/BreadcrumbNav.tsx`

```typescript
import Link from 'next/link'

interface Props {
  seriesName?: string
  postTitle: string
}

export function BreadcrumbNav({ seriesName, postTitle }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
      <ol className="flex items-center gap-1.5">
        <li><Link href="/" className="hover:text-foreground">Home</Link></li>
        <li>/</li>
        <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
        {seriesName && (
          <>
            <li>/</li>
            <li>
              <Link
                href={`/blog/series/${seriesName.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-foreground"
              >
                {seriesName}
              </Link>
            </li>
          </>
        )}
        <li>/</li>
        <li className="text-foreground font-medium truncate max-w-[200px]">{postTitle}</li>
      </ol>
    </nav>
  )
}
```

### Step 4.2: Auto-Generated Table of Contents

**File:** `components/blog/TableOfContents.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: { content: any[] }) {
  const [activeId, setActiveId] = useState('')

  // Extract headings from Portable Text
  const headings: TOCItem[] = content
    .filter((block: any) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
    .map((block: any) => ({
      id: block._key,
      text: block.children?.map((c: any) => c.text).join('') || '',
      level: block.style === 'h2' ? 2 : 3
    }))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav aria-label="Table of contents" className="sticky top-24 max-h-[70vh] overflow-auto">
      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider">On this page</h2>
      <ul className="space-y-1 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${id}`}
              className={`block py-1 transition-colors ${
                activeId === id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

### Step 4.3: Series Navigation with Progress

**File:** `components/blog/SeriesNav.tsx`

```typescript
import Link from 'next/link'

interface SeriesPost {
  slug: string
  title: string
  seriesPart: number
}

interface Props {
  seriesName: string
  currentPart: number
  seriesPosts: SeriesPost[]
}

export function SeriesNav({ seriesName, currentPart, seriesPosts }: Props) {
  const total = seriesPosts.length
  const progress = Math.round((currentPart / total) * 100)
  const prevPost = seriesPosts.find(p => p.seriesPart === currentPart - 1)
  const nextPost = seriesPosts.find(p => p.seriesPart === currentPart + 1)

  return (
    <div className="border rounded-lg p-6 my-8 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{seriesName} Series</h3>
        <span className="text-sm text-muted-foreground">Part {currentPart} of {total}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-4">
        <div
          className="h-2 bg-primary rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* All parts (collapsible) */}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          View all parts
        </summary>
        <ol className="mt-2 space-y-1 text-sm">
          {seriesPosts.map(sp => (
            <li key={sp.slug} className={sp.seriesPart === currentPart ? 'font-semibold text-primary' : ''}>
              <Link href={`/blog/${sp.slug}`} className="hover:underline">
                Part {sp.seriesPart}: {sp.title}
              </Link>
            </li>
          ))}
        </ol>
      </details>

      {/* Prev / Next */}
      <div className="flex justify-between">
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} className="text-sm hover:underline">
            Previous: Part {prevPost.seriesPart}
          </Link>
        ) : <span />}
        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`} className="text-sm hover:underline">
            Next: Part {nextPost.seriesPart}
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}
```

### Step 4.4: Related Posts (Vector Similarity + Manual)

**File:** `components/blog/RelatedPosts.tsx`

```typescript
import { PostCard } from './PostCard'

interface Props {
  manualRelated: any[]      // From relatedSlugs
  vectorRelated: any[]      // From pgvector similarity
}

export function RelatedPosts({ manualRelated, vectorRelated }: Props) {
  // Combine, dedupe, limit to 3
  const slugsSeen = new Set<string>()
  const combined = [...manualRelated, ...vectorRelated].filter(post => {
    if (slugsSeen.has(post.slug)) return false
    slugsSeen.add(post.slug)
    return true
  }).slice(0, 3)

  if (combined.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {combined.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
```

### Step 4.5: Author Card with E-E-A-T Signals

**File:** `components/blog/AuthorCard.tsx`

```typescript
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/client'

interface Author {
  name: string
  avatar?: any
  title?: string
  bio?: string
  credentials?: string[]
  specializations?: string[]
  yearsExperience?: number
  linkedin?: string
  twitter?: string
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="border rounded-lg p-6 my-8 bg-muted/30">
      <div className="flex items-start gap-4">
        {author.avatar && (
          <Image
            src={urlForImage(author.avatar)?.width(80).height(80).url() || ''}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div>
          <h3 className="font-semibold text-lg">{author.name}</h3>
          {author.title && (
            <p className="text-sm text-muted-foreground">{author.title}</p>
          )}
          {author.yearsExperience && (
            <p className="text-sm text-muted-foreground">{author.yearsExperience}+ years experience</p>
          )}
        </div>
      </div>

      {author.bio && (
        <p className="mt-4 text-sm text-muted-foreground">{author.bio}</p>
      )}

      {/* Credentials / Expertise */}
      {author.credentials?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {author.credentials.map((cred, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {cred}
            </span>
          ))}
        </div>
      )}

      {/* Social proof links (sameAs) */}
      <div className="mt-4 flex gap-3">
        {author.linkedin && (
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
             className="text-xs text-muted-foreground hover:text-foreground">
            LinkedIn
          </a>
        )}
        {author.twitter && (
          <a href={author.twitter} target="_blank" rel="noopener noreferrer"
             className="text-xs text-muted-foreground hover:text-foreground">
            Twitter/X
          </a>
        )}
      </div>
    </div>
  )
}
```

---

## Phase 5: Topic Cluster Architecture

### How Topic Clusters Work for themaximoguys

```
PILLAR PAGE (Series Index)                    CLUSTER POSTS
┌──────────────────────────┐     ┌──────────────────────────────────────┐
│ MAS Admin Series Index   │◄───►│ Part 1: Legacy Admin Role            │
│ (Comprehensive overview) │◄───►│ Part 2: New Responsibilities         │
│                          │◄───►│ Part 3: SaaS Admin                   │
│ Links TO all cluster     │◄───►│ Part 4: On-Prem Admin                │
│ posts + broad topic      │◄───►│ Part 5: Skills Roadmap               │
│ coverage                 │◄───►│ Part 6: Daily Toolset                │
│                          │◄───►│ Part 7: Troubleshooting              │
│ Each cluster post links  │◄───►│ Part 8: Future Vision                │
│ BACK to this pillar      │     │                                      │
└──────────────────────────┘     │ Each post links back to pillar +     │
                                  │ cross-links to related cluster posts │
                                  └──────────────────────────────────────┘
```

**Your existing series are natural topic clusters:**

| Pillar Page (Series Index) | Cluster Posts | Status |
|---------------------------|---------------|--------|
| `mas-admin-00-series-index` | 8 MAS Admin posts | Ready |
| `mas-integration-00-series-index` | 8 MAS Integration posts | Ready |
| THINK MAS (needs index) | 12 THINK MAS posts | Needs pillar page |
| MAS DEVELOPER (needs index) | 6 planned posts | Needs creation |

**Implementation:**
- Series index posts → set `clusterSlugs: [all part slugs]`
- Individual parts → set `pillarSlug: series-index-slug`
- Cross-link related parts → set `relatedSlugs: [related-part-slugs]`

---

## Phase 6: Migration Script — Repo → Sanity (Enhanced)

Same sync script as before, but now also syncs:
- `tldr` field
- `targetQuestions` field
- `semanticKeywords` field
- `proficiencyLevel` field
- `dependencies` field
- `speakableSections` field
- `pillarSlug` and `clusterSlugs` fields
- `relatedSlugs` field
- `citations` array
- `updateHistory` array
- `howTo` object
- `seoTitle` and `seoDescription` overrides

The migration script structure remains the same (one-way sync from repo → Sanity, content hash change detection, auto-image upload, author deduplication). Just extend the document builder to include all new fields from frontmatter.

---

## Phase 7: Vector Search + RAG Pipeline (Week 3)

Same as original plan — pgvector, webhook, embeddings. No changes.

### Webhook chain:

```
Blog repo push
  → GitHub Action: sync-repo-to-sanity.ts
    → Sanity document created/updated
      → Sanity webhook → /api/webhooks/sanity
        → Generate embeddings → Supabase pgvector
        → Ping Google Indexing API (new URL)
        → Invalidate sitemap cache
```

---

## Phase 8: Google Indexing API (Optional, Week 3)

### Step 8.1: Instant Index on Publish

**File:** `app/api/webhooks/sanity/route.ts` (add to existing webhook)

```typescript
// After embedding generation, ping Google Indexing API
async function pingGoogleIndexing(slug: string) {
  const url = `https://themaximoguys.ai/blog/${slug}`

  try {
    const response = await fetch(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getGoogleAccessToken()}`
        },
        body: JSON.stringify({
          url,
          type: 'URL_UPDATED'
        })
      }
    )

    console.log(`Google Indexing API: ${response.status} for ${url}`)
  } catch (error) {
    console.error('Google Indexing API failed:', error)
  }
}
```

---

## Content Workflow (Post-Migration)

### Writing a new blog post (optimized for SEO + AEO)

```
1. Create MDX file in themaximoguys-blog/posts/<SERIES>/
2. Add frontmatter:
   - Core: title, slug, description, date, tags, tier, draft
   - Author: author, authorTitle, authorCredentials
   - Series: series.name, series.part, series.total
   - SEO: seoTitle, seoDescription, canonicalUrl, coverImage
   - AEO: targetQuestions, semanticKeywords, proficiencyLevel, tldr
   - Structured data: faqs, keyTakeaways, howTo, citations
   - Cluster: pillarSlug OR clusterSlugs, relatedSlugs
3. Write content with answer-first structure:
   - H2 = question-style heading
   - First paragraph = direct answer (40-60 words)
   - Use AnswerBox for featured snippet targets
   - Include comparison tables, pro/con lists, stat blocks
   - Add citations for credibility
4. Add images to posts/<SERIES>/images/
5. git add + commit + push
6. Automated pipeline:
   → GitHub Action syncs to Sanity
   → Sanity webhook generates embeddings
   → Google Indexing API pinged
   → Sitemap regenerated
   → Post live with full JSON-LD schemas
```

---

## SEO/AEO Checklist per Post

### Before Publishing

- [ ] **Title**: Under 65 chars, includes primary keyword
- [ ] **Description**: Under 155 chars, includes call to action
- [ ] **TL;DR**: 40-60 word direct answer to the primary question
- [ ] **Target Questions**: 3-5 questions this post answers
- [ ] **FAQ Section**: 3-5 Q&A pairs (generates FAQPage JSON-LD)
- [ ] **Key Takeaways**: 3-7 bullet points (AI-extractable)
- [ ] **Proficiency Level**: Set (Beginner/Intermediate/Expert)
- [ ] **Author**: Full credentials, bio, social links
- [ ] **Cover Image**: With alt text
- [ ] **Tags**: 3-8 relevant tags
- [ ] **Series**: Linked to pillar page if applicable
- [ ] **Related Posts**: 2-3 manual related slugs
- [ ] **Citations**: External sources with URLs
- [ ] **Internal Links**: 3-5 links to other posts in content body
- [ ] **Heading Structure**: H1 > H2 > H3 (no skipping levels)
- [ ] **Code Blocks**: With language specified
- [ ] **Images**: All have alt text and captions

### After Publishing (Automated)

- [x] JSON-LD: TechArticle/BlogPosting schema
- [x] JSON-LD: FAQPage schema (if FAQs present)
- [x] JSON-LD: HowTo schema (if HowTo present)
- [x] JSON-LD: BreadcrumbList schema
- [x] JSON-LD: ItemList schema (if series)
- [x] JSON-LD: Speakable schema (if sections marked)
- [x] JSON-LD: Person schema (author)
- [x] JSON-LD: Organization schema (publisher)
- [x] Open Graph meta tags
- [x] Twitter Card meta tags
- [x] Dynamic OG image generated
- [x] Sitemap updated
- [x] Google Indexing API pinged
- [x] Vector embeddings generated

---

## Success Metrics

| Metric | Before (GitHub API) | After (Repo → Sanity + SEO/AEO) | Target |
|--------|--------------------|---------------------------------|--------|
| **Source of Truth** | Scattered | Single repo | Single repo |
| **JSON-LD Schemas** | 1 (BlogPosting) | 8 (Article, FAQ, HowTo, Breadcrumb, ItemList, Speakable, Person, Org) | 8 schemas |
| **AI Crawler Access** | Default robots.txt | Explicit GPTBot/PerplexityBot/ClaudeBot rules | All major AI bots |
| **Sitemap** | None | Dynamic from Sanity | Auto-updated |
| **OG Images** | Missing | Dynamic per-post generation | Auto-generated |
| **E-E-A-T** | Basic author name | Full credentials, social links, experience proof | Rich Person schema |
| **Topic Clusters** | None | 4 pillar pages + 37 cluster posts | Bidirectional linking |
| **Featured Snippet** | No optimization | TL;DR, AnswerBox, FAQ, comparison tables | Position zero targets |
| **AEO** | No optimization | Target questions, semantic keywords, speakable sections | AI citation ready |
| **Content Fetch** | 500ms (GitHub API) | <100ms (Sanity CDN) | <100ms |
| **Image CDN** | None | Sanity CDN (auto WebP/AVIF) | Auto-optimize |
| **Semantic Search** | None | pgvector + GROQ search | Full-text + vector |
| **Comments** | Working (Supabase) | Working (Supabase) | Unchanged |

---

## Cost Breakdown

| Service | Free Tier | Expected Cost |
|---------|-----------|---------------|
| **Sanity** | 100k API requests, 10GB bandwidth, 5GB assets | Free (within limits) |
| **OpenAI Embeddings** | $0.0001/1k tokens | ~$1-2/month |
| **Google Indexing API** | Free (quota limits) | Free |
| **Supabase** | Already covered | No change |
| **Vercel** | Already covered | No change |
| **Total** | | ~$1-2/month |

---

**Last Updated:** 2026-02-09
**Status:** Ready for Implementation
**Risk Level:** Low (Comments untouched, incremental migration)
**Timeline:** 3-4 weeks
