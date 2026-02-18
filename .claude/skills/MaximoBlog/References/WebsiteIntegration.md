# Website Integration Reference

**Technical details for integrating MaximoBlog content with the TMG website.**

---

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 16.1.5 |
| React | React | 19 |
| Language | TypeScript | strict mode |
| CSS | Tailwind CSS | 4 |
| UI Components | shadcn/ui | — |
| Database | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth | magic links |
| Storage | Supabase Storage | images |
| MDX | next-mdx-remote-client | 2 |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        TMG WEBSITE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   Next.js    │────│   Supabase   │────│   GitHub     │       │
│  │  App Router  │    │  PostgreSQL  │    │  (Content)   │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                   │                   │                │
│         │                   │                   │                │
│  ┌──────▼──────────────────▼───────────────────▼──────┐         │
│  │                    BLOG SYSTEM                      │         │
│  │                                                     │         │
│  │  • Frontmatter parsed from MDX files               │         │
│  │  • Content fetched from GitHub API                 │         │
│  │  • Comments stored in Supabase                     │         │
│  │  • Tier gating via ContentGate component           │         │
│  │  • Real-time updates via SSE                       │         │
│  │                                                     │         │
│  └─────────────────────────────────────────────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Supabase Multi-Schema Architecture

```yaml
schemas:
  tmg_dev: Development environment
  tmg_test: Testing/staging environment
  tmg_prod: Production environment
```

**Schema switching:** Environment-based, configured via `NEXT_PUBLIC_SUPABASE_SCHEMA`

**Blog-related tables:**
- `blog_comments` — User comments with threading
- `blog_reactions` — Likes/reactions
- `profiles` — User profiles (linked to auth.users)

---

## Blog Route Structure

```
app/
└── (marketing)/
    └── blog/
        ├── page.tsx              # Blog listing /blog
        ├── [slug]/
        │   └── page.tsx          # Individual post /blog/[slug]
        └── components/
            ├── PostCard.tsx      # Blog listing card
            ├── PostHeader.tsx    # Title, meta, cover
            ├── PostContent.tsx   # MDX renderer
            ├── TierBadge.tsx     # Tier indicator
            ├── TierFilterTabs.tsx # Filter by tier
            ├── ContentGate.tsx   # Tier restriction
            └── SupabaseComments.tsx # Real-time comments
```

---

## TypeScript Interfaces

### BlogPostMeta

```typescript
interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  draft: boolean;
  tier: ContentTier;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  coverImage: string;
  readTime?: string;
  faq?: FAQ[];
  howTo?: HowToData;
}
```

### ContentTier

```typescript
type ContentTier = 'free' | 'developer' | 'enterprise';
```

### FAQ (for AEO/structured data)

```typescript
interface FAQ {
  question: string;
  answer: string;
}
```

### HowToData (for technical posts)

```typescript
interface HowToData {
  name: string;
  description: string;
  steps: {
    name: string;
    text: string;
  }[];
}
```

---

## Content Flow

```
1. AUTHOR writes MDX file with frontmatter
   └── Saves to ~/Documents/TMG_BLOGS/

2. PUBLISH to GitHub (manual or CI)
   └── Push to content repository

3. WEBSITE fetches via GitHub API
   └── Parses frontmatter + MDX content

4. RENDER with next-mdx-remote-client
   └── Applies tier gating via ContentGate

5. COMMENTS via Supabase Realtime
   └── SSE for real-time updates
```

---

## Tier Gating Logic

```typescript
// Simplified tier access logic
function canAccessContent(userTier: ContentTier | null, contentTier: ContentTier): boolean {
  const tierHierarchy = { 'free': 0, 'developer': 1, 'enterprise': 2 };

  if (contentTier === 'free') return true;
  if (!userTier) return false;

  return tierHierarchy[userTier] >= tierHierarchy[contentTier];
}
```

**Tier access matrix:**

| User Tier | Free Content | Developer Content | Enterprise Content |
|-----------|--------------|-------------------|-------------------|
| Anonymous | ✅ | ❌ | ❌ |
| Free | ✅ | ❌ | ❌ |
| Developer | ✅ | ✅ | ❌ |
| Enterprise | ✅ | ✅ | ✅ |

---

## Comments System

### Features (Phase 1 & 2 Complete)

- Real-time updates via Supabase Realtime (SSE)
- Row Level Security (RLS) policies
- Admin moderation controls
- Rate limiting
- AI spam detection (OpenAI)
- Magic link authentication
- Redis caching

### Database Schema

```sql
-- Comments table
CREATE TABLE blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  parent_id UUID REFERENCES blog_comments(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE
);

-- RLS policies ensure users can only edit their own comments
```

---

## SEO & Structured Data

### JSON-LD Generated From Frontmatter

```typescript
// Article schema (auto-generated)
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": frontmatter.title,
  "description": frontmatter.description,
  "datePublished": frontmatter.date,
  "author": {
    "@type": "Person",
    "name": frontmatter.author.name
  },
  "image": frontmatter.coverImage
}

// FAQ schema (if faq array present)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": frontmatter.faq.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
}

// HowTo schema (if howTo object present)
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": frontmatter.howTo.name,
  "description": frontmatter.howTo.description,
  "step": frontmatter.howTo.steps.map(step => ({
    "@type": "HowToStep",
    "name": step.name,
    "text": step.text
  }))
}
```

---

## Image Handling

### Paths

```yaml
cover_images: /images/blog/{slug}-cover.jpg
diagrams: /images/blog/{slug}-diagram-{n}.png
screenshots: /images/blog/{slug}-screenshot-{n}.png
author_avatars: /images/authors/{author}.jpg
```

### Workflow

1. Generate image via Art skill → `~/Downloads/`
2. Preview in Finder/Preview
3. If approved → copy to `cms/public/images/blog/`
4. Create optimized WebP + thumbnail versions
5. Reference in frontmatter as `/images/blog/{slug}-cover.jpg`

---

## Development Workflow

### Plans-First Approach

The website uses a plans-first workflow:

```
plans/
├── BLOG_IMPLEMENTATION.md    # Blog system spec
├── COMMENTS_PLANNING.md      # Comments system spec
└── [feature].md              # Other feature plans
```

**Rule:** Major features require a plan document before implementation.

### Database Rules

- **NO database triggers** for business logic
- All business logic in application layer
- Triggers only for technical concerns (timestamps, etc.)

---

## Integration Checklist

When publishing a MaximoBlog post:

1. **Frontmatter** — Matches schema in PREFERENCES.md
2. **Slug** — Kebab-case, matches filename
3. **Tier** — Correctly assigned based on content
4. **Cover Image** — Generated, optimized, in correct path
5. **FAQ** — 2-5 items for AEO
6. **Tags** — 5-8 relevant tags
7. **Author** — Matches author configuration

---

## Useful Commands

```bash
# Preview blog locally
cd ~/Documents/TMG_BLOGS && npm run dev

# Build for production
npm run build

# Check for TypeScript errors
npm run type-check

# Lint MDX content
npm run lint
```

---

*This reference ensures MaximoBlog posts integrate seamlessly with the TMG website.*
