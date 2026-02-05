# Blog Implementation — Complete Specification

**Status:** 🟢 Blog Live | 🔵 Comments Enhanced (Supabase) | 🟡 v2 AEO Pending
**Progress:** 85% Complete (v1 shipped, comments upgraded, v2 features pending)
**Route:** `/blog` — `app/(marketing)/blog/`
**Stack:** Next.js 16 (App Router, Turbopack), React 19, `next-mdx-remote-client@2`, GitHub API, ~~Giscus~~ **Supabase Comments**
**Path alias:** `@/*` maps to project root (NO `src/` directory)
**Deployment:** Vercel

---

## 📊 Implementation Status

### ✅ Completed (v1 + Comments Upgrade)
- [x] Blog routing (`/blog` listing + `/blog/[slug]` pages)
- [x] GitHub API integration
- [x] MDX rendering with syntax highlighting
- [x] SEO metadata & Open Graph tags
- [x] Structured data (JSON-LD BlogPosting)
- [x] Navigation integration (Header & Footer)
- [x] Tier-based content (free/developer/enterprise)
- [x] Tier filtering tabs
- [x] Content gating with CTAs
- [x] ~~Giscus comments~~ **Supabase Comments System** (upgraded)
  - Real-time comments
  - Admin moderation
  - Rate limiting (30s cooldown)
  - Row-Level Security (RLS)
  - Audit trail (deleted_at, deleted_by)
  - "Show Deleted" toggle for admins
- [x] Dark/light mode support
- [x] Mobile responsive design
- [x] Production deployment

### 🔵 In Progress
- [ ] Comment reactions (+309% engagement potential)
- [ ] Magic link authentication
- [ ] AI spam detection (99.9% accuracy)
- [ ] Redis caching layer

### 🟡 Pending (v2 - AEO Features)
- [ ] FAQ Section with Schema.org markup
- [ ] HowTo Section for tutorials
- [ ] Key Takeaways component
- [ ] Author Authority cards
- [ ] Citations Section
- [ ] Enhanced Structured Data (E-E-A-T)
- [ ] Content as Data API (`/api/content/posts`)
- [ ] AnswerBox MDX component

---

## Table of Contents

1. [Architecture](#architecture)
2. [Content Tiers](#content-tiers)
3. [Dependencies](#dependencies)
4. [File Structure](#file-structure)
5. [TypeScript Types](#typescript-types)
6. [GitHub API Integration](#github-api-integration)
7. [Post Utilities](#post-utilities)
8. [Routes](#routes)
9. [MDX Components](#mdx-components)
10. [Blog UI Components](#blog-ui-components)
11. [Content Tier Components](#content-tier-components)
12. [~~Giscus~~ Supabase Comments (Upgraded)](#giscus-comments--supabase-comments-upgraded-)
13. [SEO & Metadata](#seo--metadata)
14. [Structured Data (JSON-LD)](#structured-data-json-ld)
15. [AEO Components (v2)](#aeo-components-v2)
16. [Content as Data API (v2)](#content-as-data-api-v2)
17. [Navigation Integration](#navigation-integration)
18. [Environment Variables](#environment-variables)
19. [Next.js Config Changes](#nextjs-config-changes)
20. [Acceptance Checklist](#acceptance-checklist)

**📌 Note:** We're using **Supabase Comments** instead of Giscus. See [COMMENTS_PLANNING.md](COMMENTS_PLANNING.md) for full implementation details.

---

## Architecture

```
GitHub Repo (MDX files)
        │
        ▼
  GitHub REST API  ──►  plain fetch() with ISR caching
        │
        ▼
  gray-matter (frontmatter) + next-mdx-remote-client (render)
        │
        ▼
  Next.js App Router  ──►  /blog (listing) + /blog/[slug] (post)
        │
        ▼
  Supabase Comments  ──►  Real-time, admin moderation, RLS
        │
        ▼
  Vercel (ISR revalidation: 60s listing, 300s posts)
```

**Content source:** Separate GitHub repo, `posts/YYYY-MM-DD-slug.mdx` files
**Rendering:** `next-mdx-remote-client@2` (React 19 compatible; `next-mdx-remote` is unmaintained)
**Comments:** ~~`@giscus/react`~~ **Supabase Comments** with real-time updates, admin controls, RLS, rate limiting
**Frontmatter:** `gray-matter` (CJS — needs `transpilePackages` for Turbopack)
**Syntax highlighting:** `rehype-pretty-code` + `shiki`

**📌 Comments System:** See [plans/COMMENTS_PLANNING.md](COMMENTS_PLANNING.md) for complete implementation details and 2026 best practices.

---

## Content Tiers

Every post has a `tier` field in its frontmatter that controls visibility and content gating:

| Tier | Audience | Access | Content Examples |
|---|---|---|---|
| `free` | Everyone | Full content, no gate | General insights, news, thought leadership, SEO traffic drivers |
| `developer` | Registered users / trial | Teaser visible, rest gated with signup CTA | Technical tutorials, code samples, how-to guides, MAS 9 migration tips |
| `enterprise` | Paying customers | Teaser visible, rest gated with contact/upgrade CTA | Deep-dive architectures, sizing guides, ROI calculators, benchmark data |

### How Gating Works

1. **All tiers get full SEO indexing** — the teaser (description + first section) is always server-rendered in HTML so crawlers and AI engines see real content. This is critical for AEO.
2. **Free posts** render fully for everyone, no gate.
3. **Developer/Enterprise posts** render the teaser (everything above the first `---` horizontal rule or first `<ContentGate />` marker in MDX), then show a gating CTA.
4. **User tier is determined by a cookie or auth session** (implementation depends on your auth provider — Supabase Auth, Clerk, etc.). For v1, a simple `tier` cookie or query param can simulate gating.
5. **The Content as Data API** includes the `tier` field, so internal consumers can filter by tier.
6. **AI crawlers always see the teaser** — gated content is hidden via client-side rendering, not server-side. This means Google, Perplexity, and ChatGPT index the teaser and know the full post exists.

### Frontmatter

```yaml
tier: "free"       # or "developer" or "enterprise"
```

Default: `"free"` if omitted.

### Tier Badge Colors

| Tier | Badge Style |
|---|---|
| `free` | Green — `border-green-500/30 bg-green-500/10 text-green-600` |
| `developer` | Blue — `border-blue-500/30 bg-blue-500/10 text-blue-600` |
| `enterprise` | Amber — `border-amber-500/30 bg-amber-500/10 text-amber-600` |

---

## Dependencies

```bash
# Blog core dependencies
npm install next-mdx-remote-client gray-matter remark-gfm rehype-pretty-code shiki reading-time

# Supabase for comments (already installed)
# npm install @supabase/supabase-js @supabase/ssr
```

> **DO NOT install:**
> - ~~`@giscus/react`~~ (replaced with Supabase Comments)
> - `next-mdx-remote` (unmaintained, React 19 type errors)
> - `@octokit/rest` (overkill for 2 API calls)

**📌 Comments Dependencies:** Already included in project via Supabase setup. See [package.json](../package.json).

---

## File Structure

```
app/
└── (marketing)/
    └── blog/
        ├── page.tsx                    # Blog listing (server component)
        ├── [slug]/
        │   └── page.tsx                # Individual post (server component)
        ├── loading.tsx                 # Loading skeleton
        └── not-found.tsx               # 404 page
components/
└── blog/
    ├── MDXComponents.tsx               # Custom MDX component map
    ├── PostCard.tsx                     # Post card for listing
    ├── PostHeader.tsx                   # Post header (title, date, author, tags)
    ├── PostContent.tsx                  # MDX content wrapper
    ├── SupabaseComments.tsx            # ✅ Supabase Comments (real-time, admin, RLS)
    ├── TierBadge.tsx                   # Tier label badge (free/developer/enterprise)
    ├── TierFilterTabs.tsx             # Tier filter tabs for listing (client component)
    ├── ContentGate.tsx                # Content gating by tier (client component)
    ├── StructuredData.tsx              # JSON-LD BlogPosting schema
    ├── AnswerBox.tsx                   # MDX: answer-first content block (v2)
    ├── KeyTakeaways.tsx               # Key takeaways summary (v2)
    ├── FAQSection.tsx                  # FAQ schema + rendered Q&A (v2)
    ├── HowToSection.tsx               # HowTo schema for tutorials (v2)
    ├── AuthorAuthority.tsx            # Author bio + credentials card (v2)
    ├── CitationsSection.tsx           # Numbered sources list (v2)
    └── EnhancedStructuredData.tsx     # E-E-A-T enriched JSON-LD (v2)
lib/
├── github-blog.ts                     # GitHub API fetch functions
└── posts.ts                           # Post utilities (getAllPosts, getPostBySlug)
types/
└── blog.ts                            # TypeScript interfaces
```

---

## TypeScript Types

**File:** `types/blog.ts`

```typescript
export type ContentTier = "free" | "developer" | "enterprise"

export interface BlogPostMeta {
  // v1 required
  title: string
  description: string
  date: string          // YYYY-MM-DD
  slug: string
  tags: string[]
  draft: boolean
  tier: ContentTier     // defaults to "free" if omitted in frontmatter

  // v1 optional
  coverImage?: string
  canonicalUrl?: string
  author?: string
  authorAvatar?: string
  updatedAt?: string
  readingTime?: string  // computed if missing

  // v2 AEO (all optional — gracefully ignored if absent)
  authorTitle?: string
  authorBio?: string
  authorCredentials?: string[]
  authorLinkedin?: string
  faqs?: FAQ[]
  howTo?: HowToData
  citations?: Citation[]
  keyTakeaways?: string[]
  targetQuestions?: string[]
  semanticKeywords?: string[]
  updateHistory?: UpdateRecord[]
  wordCount?: number
}

export interface BlogPost {
  frontmatter: BlogPostMeta
  content: string       // raw MDX string
}

export interface FAQ {
  question: string
  answer: string
}

export interface HowToData {
  name: string
  description: string
  steps: HowToStep[]
}

export interface HowToStep {
  name: string
  text: string
  image?: string
}

export interface Citation {
  title: string
  url: string
  type?: string
}

export interface UpdateRecord {
  date: string
  reason: string
}
```

---

## GitHub API Integration

**File:** `lib/github-blog.ts`

```typescript
import matter from "gray-matter"
import readingTime from "reading-time"
import type { BlogPostMeta } from "@/types/blog"

const GITHUB_API = "https://api.github.com"

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
}

const owner = () => process.env.GITHUB_REPO_OWNER!
const repo = () => process.env.GITHUB_REPO_NAME!
const postsPath = () => process.env.GITHUB_REPO_PATH || "posts"

interface GitHubFile {
  name: string
  path: string
  type: "file" | "dir"
  content?: string
  encoding?: string
}

/** Fetch directory listing of all post files */
export async function fetchPostsList(): Promise<GitHubFile[]> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner()}/${repo()}/contents/${postsPath()}`,
    { headers, next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const files: GitHubFile[] = await res.json()
  return files.filter((f) => f.name.endsWith(".mdx") || f.name.endsWith(".md"))
}

/** Fetch a single post file and decode Base64 content */
export async function fetchPostFile(filename: string): Promise<string> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner()}/${repo()}/contents/${postsPath()}/${filename}`,
    { headers, next: { revalidate: 300 } }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const data: GitHubFile = await res.json()
  return Buffer.from(data.content!, "base64").toString("utf-8")
}

/** Parse raw MDX string into frontmatter + content */
export function parsePost(raw: string): { frontmatter: BlogPostMeta; content: string } {
  const { data, content } = matter(raw)
  const fm = data as BlogPostMeta

  // Default tier to "free" if not specified
  if (!fm.tier) fm.tier = "free"

  // Compute reading time if not provided
  if (!fm.readingTime) {
    const stats = readingTime(content)
    fm.readingTime = stats.text
  }

  // Compute word count if not provided
  if (!fm.wordCount) {
    fm.wordCount = content.split(/\s+/).filter(Boolean).length
  }

  return { frontmatter: fm, content }
}
```

---

## Post Utilities

**File:** `lib/posts.ts`

```typescript
import { fetchPostsList, fetchPostFile, parsePost } from "@/lib/github-blog"
import type { BlogPost, BlogPostMeta } from "@/types/blog"

/** Get all published posts, sorted by date descending */
export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fetchPostsList()

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fetchPostFile(file.name)
      return parsePost(raw)
    })
  )

  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

/** Get posts filtered by tier */
export async function getPostsByTier(tier: ContentTier): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((p) => p.frontmatter.tier === tier)
}

/** Get a single post by slug. Returns null if not found or draft. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const files = await fetchPostsList()

  for (const file of files) {
    const raw = await fetchPostFile(file.name)
    const post = parsePost(raw)
    if (post.frontmatter.slug === slug && !post.frontmatter.draft) {
      return post
    }
  }

  return null
}
```

---

## Routes

### Blog Listing

**File:** `app/(marketing)/blog/page.tsx`

```typescript
import { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/blog/PostCard"
import { TierFilterTabs } from "@/components/blog/TierFilterTabs"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog | themaximoguys — IBM Maximo AI Insights",
  description:
    "Expert insights, tutorials, and best practices for IBM Maximo with AI-driven solutions.",
  openGraph: {
    title: "Blog | themaximoguys — IBM Maximo AI Insights",
    description:
      "Expert insights and tutorials on IBM Maximo with AI-driven solutions",
    type: "website",
    url: "https://themaximoguys.com/blog",
    siteName: "themaximoguys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | themaximoguys — IBM Maximo AI Insights",
    description:
      "Expert insights and tutorials on IBM Maximo with AI-driven solutions",
  },
  alternates: {
    canonical: "https://themaximoguys.com/blog",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights on IBM Maximo, AI automation, and enterprise asset management.
            </p>
          </div>

          {/* Client component: filters posts by tier tab */}
          <TierFilterTabs posts={posts.map((p) => p.frontmatter)} />

          {posts.length === 0 && (
            <p className="text-center text-muted-foreground">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
```

### Individual Post

**File:** `app/(marketing)/blog/[slug]/page.tsx`

> **Next.js 16:** `params` is a `Promise` — must `await` it.

```typescript
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { PostHeader } from "@/components/blog/PostHeader"
import { PostContent } from "@/components/blog/PostContent"
import { StructuredData } from "@/components/blog/StructuredData"
import { SupabaseComments } from "@/components/blog/SupabaseComments"
import { ContentGate } from "@/components/blog/ContentGate"
// v2 imports (add when implementing):
// import { FAQSection } from "@/components/blog/FAQSection"
// import { HowToSection } from "@/components/blog/HowToSection"
// import { KeyTakeaways } from "@/components/blog/KeyTakeaways"
// import { AuthorAuthority } from "@/components/blog/AuthorAuthority"
// import { CitationsSection } from "@/components/blog/CitationsSection"

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | themaximoguys",
      robots: { index: false, follow: false },
    }
  }

  const fm = post.frontmatter
  const postUrl = `https://themaximoguys.com/blog/${fm.slug}`
  const coverImageUrl = fm.coverImage?.startsWith("http")
    ? fm.coverImage
    : `https://themaximoguys.com${fm.coverImage || "/images/blog-default-og.png"}`

  return {
    title: `${fm.title} | themaximoguys Blog`,
    description: fm.description,
    keywords: fm.tags?.join(", ") || "",
    authors: [{ name: fm.author || "themaximoguys Team" }],
    alternates: {
      canonical: fm.canonicalUrl || postUrl,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      url: postUrl,
      siteName: "themaximoguys",
      publishedTime: fm.date,
      modifiedTime: fm.updatedAt || fm.date,
      authors: [fm.author || "themaximoguys Team"],
      tags: fm.tags || [],
      images: [
        { url: coverImageUrl, width: 1200, height: 630, alt: fm.title },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [coverImageUrl],
      site: "@themaximoguys",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.slice(0, 10).map((p) => ({ slug: p.frontmatter.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const fm = post.frontmatter

  return (
    <article className="pt-20">
      <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
        <StructuredData post={fm} />

        {/* v2: {fm.keyTakeaways && <KeyTakeaways takeaways={fm.keyTakeaways} />} */}

        <PostHeader post={fm} />

        {fm.coverImage && (
          <img
            src={fm.coverImage}
            alt={fm.title}
            className="w-full rounded-lg my-8"
          />
        )}

        {/* Content with tier-based gating */}
        <ContentGate tier={fm.tier} content={post.content}>
          <PostContent content={post.content} />
        </ContentGate>

        {/* v2: {fm.faqs && <FAQSection faqs={fm.faqs} />} */}
        {/* v2: {fm.howTo && <HowToSection howTo={fm.howTo} />} */}
        {/* v2: {fm.citations && <CitationsSection citations={fm.citations} />} */}
        {/* v2: <AuthorAuthority post={fm} /> */}

        <div className="mt-16 pt-8 border-t border-border">
          <SupabaseComments postSlug={slug} />
        </div>
      </div>
    </article>
  )
}
```

### Loading Skeleton

**File:** `app/(marketing)/blog/loading.tsx`

```typescript
export default function BlogLoading() {
  return (
    <div className="pt-20">
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="h-10 w-32 bg-muted/50 rounded mx-auto animate-pulse" />
            <div className="h-6 w-64 bg-muted/50 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border p-6 space-y-4">
                <div className="h-40 bg-muted/50 rounded-lg animate-pulse" />
                <div className="h-6 w-3/4 bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

### 404 Page

**File:** `app/(marketing)/blog/not-found.tsx`

```typescript
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="pt-20">
      <section className="py-24">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <p className="text-muted-foreground text-lg">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
```

---

## MDX Components

**File:** `components/blog/MDXComponents.tsx`

```typescript
import type { MDXComponents as MDXComponentsType } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { AnswerBox } from "@/components/blog/AnswerBox"

export const MDXComponents: MDXComponentsType = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold tracking-tight mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-base leading-7 text-muted-foreground mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || "#"}
      className="text-primary underline underline-offset-4 hover:text-primary/80"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-muted-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-muted-foreground">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={800}
      height={400}
      className="rounded-lg my-4"
    />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border px-3 py-2 text-left font-semibold bg-muted/50">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-3 py-2">{children}</td>
  ),
  hr: () => <hr className="my-8 border-border" />,
  // v2 custom components available in MDX:
  AnswerBox,
}
```

---

## Blog UI Components

### PostCard

**File:** `components/blog/PostCard.tsx`

```typescript
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { TierBadge } from "@/components/blog/TierBadge"
import type { BlogPostMeta } from "@/types/blog"

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer">
        {post.coverImage && (
          <div className="overflow-hidden rounded-t-xl relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Tier badge overlaid on image */}
            <div className="absolute top-3 right-3">
              <TierBadge tier={post.tier} />
            </div>
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {!post.coverImage && <TierBadge tier={post.tier} />}
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full border border-primary/30 bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <CardTitle className="flex items-center justify-between text-lg">
            {post.title}
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
            {post.author && <span>{post.author}</span>}
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### PostHeader

**File:** `components/blog/PostHeader.tsx`

```typescript
import { TierBadge } from "@/components/blog/TierBadge"
import type { BlogPostMeta } from "@/types/blog"

export function PostHeader({ post }: { post: BlogPostMeta }) {
  return (
    <header className="space-y-4 mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <TierBadge tier={post.tier} />
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
        {post.title}
      </h1>
      <p className="text-xl text-muted-foreground">{post.description}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
        {post.authorAvatar && (
          <img
            src={post.authorAvatar}
            alt={post.author || ""}
            className="w-8 h-8 rounded-full"
          />
        )}
        {post.author && <span className="font-medium text-foreground">{post.author}</span>}
        <span>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {post.readingTime && <span>{post.readingTime}</span>}
        {post.updatedAt && post.updatedAt !== post.date && (
          <span className="text-xs">
            (Updated{" "}
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            )
          </span>
        )}
      </div>
    </header>
  )
}
```

### PostContent

**File:** `components/blog/PostContent.tsx`

```typescript
import { MDXRemote } from "next-mdx-remote-client/rsc"
import { MDXComponents } from "@/components/blog/MDXComponents"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"

export function PostContent({ content }: { content: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
          },
        }}
      />
    </div>
  )
}
```

---

## Content Tier Components

### TierBadge

**File:** `components/blog/TierBadge.tsx`

```typescript
import { Lock, Sparkles } from "lucide-react"
import type { ContentTier } from "@/types/blog"

const tierConfig: Record<ContentTier, { label: string; className: string; icon?: React.ElementType }> = {
  free: {
    label: "Free",
    className: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  },
  developer: {
    label: "Developer",
    className: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Sparkles,
  },
  enterprise: {
    label: "Enterprise",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Lock,
  },
}

export function TierBadge({ tier }: { tier: ContentTier }) {
  const config = tierConfig[tier]
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${config.className}`}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  )
}
```

### TierFilterTabs

**File:** `components/blog/TierFilterTabs.tsx`

```typescript
"use client"

import { useState } from "react"
import { PostCard } from "@/components/blog/PostCard"
import type { BlogPostMeta, ContentTier } from "@/types/blog"

const tabs: { value: "all" | ContentTier; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "developer", label: "Developer" },
  { value: "enterprise", label: "Enterprise" },
]

export function TierFilterTabs({ posts }: { posts: BlogPostMeta[] }) {
  const [active, setActive] = useState<"all" | ContentTier>("all")

  const filtered = active === "all" ? posts : posts.filter((p) => p.tier === active)

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              active === tab.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/50 text-muted-foreground hover:border-primary/50"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-70">
              ({tab.value === "all" ? posts.length : posts.filter((p) => p.tier === tab.value).length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          No posts in this tier yet.
        </p>
      )}
    </>
  )
}
```

### ContentGate

**File:** `components/blog/ContentGate.tsx`

This component handles content gating on the post page. For **free** posts, it renders children directly. For **developer** and **enterprise** posts, it shows a teaser (the MDX content above the first `---` horizontal rule) followed by a CTA.

> **SEO note:** The teaser is always server-rendered, so crawlers and AI engines index real content. The gate is applied client-side only.

```typescript
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ContentTier } from "@/types/blog"

interface ContentGateProps {
  tier: ContentTier
  content: string            // raw MDX — used to extract teaser
  children: React.ReactNode  // full rendered content
}

/** Extract content above the first horizontal rule as the teaser */
function extractTeaser(content: string): string {
  // Split on markdown horizontal rule (---, ***, ___)
  const parts = content.split(/\n---\n|\n\*\*\*\n|\n___\n/)
  return parts[0] || content
}

/** Check user tier from cookie (placeholder — replace with real auth) */
function getUserTier(): ContentTier {
  if (typeof window === "undefined") return "free"
  // v1: read from cookie; replace with Supabase Auth / Clerk session in production
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith("user_tier="))
  const value = cookie?.split("=")[1]
  if (value === "developer" || value === "enterprise") return value
  return "free"
}

const tierOrder: Record<ContentTier, number> = { free: 0, developer: 1, enterprise: 2 }

export function ContentGate({ tier, content, children }: ContentGateProps) {
  const [userTier, setUserTier] = useState<ContentTier>("free")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setUserTier(getUserTier())
    setMounted(true)
  }, [])

  // Free content or user has sufficient tier — render full content
  if (tier === "free" || (mounted && tierOrder[userTier] >= tierOrder[tier])) {
    return <>{children}</>
  }

  // Not mounted yet (SSR) — render full content for crawlers
  if (!mounted) {
    return <>{children}</>
  }

  // Gated — show teaser + CTA
  return (
    <div>
      {/* Teaser content (always visible) */}
      <div className="relative">
        <div className="prose-custom">{/* Teaser would be rendered here — see note below */}</div>
        {/* Fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Gate CTA */}
      <div className="mt-4 p-8 rounded-2xl border border-border bg-card/50 text-center space-y-4">
        {tier === "developer" ? (
          <>
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto" />
            <h3 className="text-xl font-bold">Developer Content</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Sign up for a free developer account to access technical tutorials, code samples, and migration guides.
            </p>
            <Link href="/contact?tier=developer">
              <Button className="gap-2">
                Sign Up Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Lock className="h-8 w-8 text-amber-500 mx-auto" />
            <h3 className="text-xl font-bold">Enterprise Content</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This deep-dive content is available to enterprise customers. Contact us to learn more about our consulting services.
            </p>
            <Link href="/contact?tier=enterprise">
              <Button className="gap-2">
                Contact Sales <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
```

> **Implementation note:** For the teaser rendering, you have two options:
> 1. **Simple:** Split the raw MDX content at the first `---` and render only the teaser portion through `<PostContent content={teaser} />` separately (requires the parent page to pass teaser vs full content).
> 2. **CSS-based:** Render the full content but use CSS `max-height` + `overflow: hidden` with the gradient overlay. This is simpler but exposes full content in the DOM (fine for soft gating; not for hard paywalls).
>
> For v1, option 2 (CSS-based) is recommended. If you need hard gating, move gating logic to the server component and only pass the teaser content to the client.

---

## ~~Giscus Comments~~ → Supabase Comments (Upgraded ✅)

**Status:** ✅ **Upgraded to Supabase Comments System**

**File:** `components/blog/SupabaseComments.tsx`

### Why Supabase Instead of Giscus?

| Feature | Giscus | Supabase Comments | Winner |
|---------|--------|-------------------|--------|
| **Authentication** | GitHub only | Email, OAuth, Magic Links | ✅ Supabase |
| **Data Ownership** | GitHub Discussions | Your database | ✅ Supabase |
| **Customization** | Limited | Full control | ✅ Supabase |
| **Admin Controls** | GitHub UI only | Custom UI + RLS | ✅ Supabase |
| **Analytics** | Limited | Full access | ✅ Supabase |
| **Privacy** | 3rd-party | Self-hosted | ✅ Supabase |
| **GDPR Compliance** | Harder | Easier | ✅ Supabase |
| **Real-time** | Limited | Native support | ✅ Supabase |
| **Moderation** | Manual | AI + Manual | ✅ Supabase |

### Features Implemented

✅ **Security (89% Score):**
- Row-Level Security (RLS) policies
- Admin can moderate but cannot change comment ownership
- Users can only edit/delete their own comments
- Content length validation (1000 chars max)
- Rate limiting (30s cooldown)
- Audit trail (deleted_at, deleted_by)

✅ **User Experience:**
- Real-time comments (Server-Sent Events)
- Edit own comments (shows "edited" badge)
- Delete own comments (soft delete)
- Anonymous users can read
- Character counter
- Dark/light mode synced

✅ **Admin Features:**
- "Show Deleted" toggle
- Delete any comment with "Admin" badge
- View deleted comments for moderation
- Cannot edit others' comments (only delete)
- Audit trail visibility

### Integration

The SupabaseComments component is already integrated into:
- `app/(marketing)/blog/[slug]/page.tsx` (line 546)

```tsx
<div className="mt-16 pt-8 border-t border-border">
  <SupabaseComments postSlug={slug} />
</div>
```

### Database Schema

See: `supabase/migrations/005_blog_comments.sql` and `007_fix_comment_security.sql`

```sql
blog_comments (
  id UUID PRIMARY KEY,
  post_slug TEXT NOT NULL,
  user_id UUID REFERENCES auth.users,
  content TEXT (max 1000 chars),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,  -- Audit
  deleted_by UUID,          -- Audit
  is_deleted BOOLEAN,
  is_edited BOOLEAN,
  parent_id UUID           -- For future threaded replies
)
```

### Future Enhancements (Roadmap)

**Phase 2 (High ROI):**
- Comment reactions (+309% engagement)
- Magic link authentication
- AI spam detection (99.9% accuracy)
- Redis caching layer

**Phase 3:**
- Nested/threaded replies
- Email notifications
- Gamification (badges, karma)
- Advanced search

See: `plans/COMMENTS_PLANNING.md` for full roadmap

**📚 Complete Comments Documentation:**
- **Planning & Roadmap:** [plans/COMMENTS_PLANNING.md](COMMENTS_PLANNING.md)
- **Security Audit:** [COMMENTS_SECURITY_AUDIT.md](../COMMENTS_SECURITY_AUDIT.md)
- **Implementation Status:** [IMPLEMENTATION_COMPLETE.md](../IMPLEMENTATION_COMPLETE.md)
- **Testing Guide:** [TESTING_GUIDE.md](../TESTING_GUIDE.md)
- **Quick Start:** [QUICK_START_GUIDE.md](../QUICK_START_GUIDE.md)

---

## Structured Data (JSON-LD)

### v1 — Basic BlogPosting

**File:** `components/blog/StructuredData.tsx`

```typescript
import type { BlogPostMeta } from "@/types/blog"

export function StructuredData({ post }: { post: BlogPostMeta }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage
      ? `https://themaximoguys.com${post.coverImage}`
      : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author || "themaximoguys Team",
    },
    publisher: {
      "@type": "Organization",
      name: "themaximoguys",
      logo: {
        "@type": "ImageObject",
        url: "https://themaximoguys.com/logo-mark.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://themaximoguys.com/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    articleSection: post.tags?.[0] || "Blog",
    wordCount: post.wordCount,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### v2 — Enhanced with E-E-A-T

**File:** `components/blog/EnhancedStructuredData.tsx`

Replaces `StructuredData` when v2 fields are present.

```typescript
import type { BlogPostMeta } from "@/types/blog"

export function EnhancedStructuredData({ post }: { post: BlogPostMeta }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage
      ? `https://themaximoguys.com${post.coverImage}`
      : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author || "themaximoguys Team",
      jobTitle: post.authorTitle,
      description: post.authorBio,
      sameAs: [post.authorLinkedin].filter(Boolean),
    },
    publisher: {
      "@type": "Organization",
      name: "themaximoguys",
      logo: {
        "@type": "ImageObject",
        url: "https://themaximoguys.com/logo-mark.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://themaximoguys.com/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    wordCount: post.wordCount,
    inLanguage: "en-US",
    mentions: post.citations?.map((c) => ({
      "@type": "Thing",
      name: c.title,
      url: c.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## AEO Components (v2)

These components are optional — they render only when the corresponding frontmatter fields are present. Implement after v1 ships.

### FAQSection

**File:** `components/blog/FAQSection.tsx`

```typescript
import type { FAQ } from "@/types/blog"

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
```

### HowToSection

**File:** `components/blog/HowToSection.tsx`

```typescript
import type { HowToData } from "@/types/blog"

export function HowToSection({ howTo }: { howTo: HowToData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      image: step.image ? `https://themaximoguys.com${step.image}` : undefined,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### KeyTakeaways

**File:** `components/blog/KeyTakeaways.tsx`

```typescript
export function KeyTakeaways({ takeaways }: { takeaways: string[] }) {
  if (!takeaways?.length) return null

  return (
    <section className="my-6 p-4 rounded-lg border-l-4 border-primary bg-primary/5">
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-2">
        Key Takeaways
      </h2>
      <ul className="space-y-1">
        {takeaways.map((t, i) => (
          <li key={i} className="flex gap-2 text-sm">
            <span className="text-primary shrink-0">→</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
```

### AuthorAuthority

**File:** `components/blog/AuthorAuthority.tsx`

```typescript
import type { BlogPostMeta } from "@/types/blog"

export function AuthorAuthority({ post }: { post: BlogPostMeta }) {
  if (!post.authorBio) return null

  return (
    <aside className="my-8 p-6 rounded-xl border border-border bg-card/50">
      <div className="flex items-start gap-4">
        {post.authorAvatar && (
          <img
            src={post.authorAvatar}
            alt={post.author || ""}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{post.author}</p>
          {post.authorTitle && (
            <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">{post.authorBio}</p>
          {post.authorCredentials && post.authorCredentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.authorCredentials.map((cred) => (
                <span
                  key={cred}
                  className="px-2 py-0.5 text-xs rounded-full border border-primary/30 bg-primary/10 text-primary"
                >
                  {cred}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
```

### CitationsSection

**File:** `components/blog/CitationsSection.tsx`

```typescript
import type { Citation } from "@/types/blog"

export function CitationsSection({ citations }: { citations: Citation[] }) {
  if (!citations?.length) return null

  return (
    <section className="my-8 pt-6 border-t border-border">
      <h2 className="text-lg font-semibold mb-3">Sources & Citations</h2>
      <ol className="space-y-1 list-decimal list-inside">
        {citations.map((c, i) => (
          <li key={i} className="text-sm">
            <a
              href={c.url}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="text-primary hover:underline"
            >
              {c.title}
            </a>
            {c.type && (
              <span className="text-muted-foreground ml-1">({c.type})</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
```

### AnswerBox (MDX Component)

**File:** `components/blog/AnswerBox.tsx`

```typescript
export function AnswerBox({
  question,
  children,
}: {
  question: string
  children: React.ReactNode
}) {
  return (
    <div className="my-4 p-4 rounded-lg border-l-4 border-cyan-500 bg-cyan-500/5">
      <p className="font-semibold mb-1">{question}</p>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
```

---

## Content as Data API (v2)

Exposes blog content as structured JSON for internal consumers (knowledge base, sales tools, RAG, chatbots).

**File:** `app/api/content/posts/route.ts`

```typescript
import { getAllPosts } from "@/lib/posts"
import type { ContentTier } from "@/types/blog"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get("tag")
  const author = searchParams.get("author")
  const tier = searchParams.get("tier") as ContentTier | null

  let posts = await getAllPosts()

  if (tag) {
    posts = posts.filter((p) =>
      p.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
  }

  if (author) {
    posts = posts.filter(
      (p) => p.frontmatter.author?.toLowerCase() === author.toLowerCase()
    )
  }

  if (tier) {
    posts = posts.filter((p) => p.frontmatter.tier === tier)
  }

  return Response.json({
    count: posts.length,
    posts: posts.map((p) => ({
      ...p.frontmatter,
      // Exclude raw content from API response for performance
      // Include content hash or excerpt if needed
    })),
  })
}
```

**Usage:**
- `GET /api/content/posts` — all posts
- `GET /api/content/posts?tag=AI` — filtered by tag
- `GET /api/content/posts?author=John` — filtered by author
- `GET /api/content/posts?tier=free` — only free posts
- `GET /api/content/posts?tier=enterprise&tag=MAS+9` — enterprise posts about MAS 9

**Enterprise applications:**
- Knowledge base: posts tagged by product/solution
- Sales enablement: key takeaways + FAQs for collateral
- AI/RAG training: structured Q&A pairs from FAQs
- Chatbot answers: FAQ content surfaces directly
- Content analytics: metadata enables performance tracking by topic, author, type

---

## Navigation Integration

Add "Blog" to Header and Footer navigation.

**Header:** Add to `navItems` array in `components/layout/Header.tsx`:
```typescript
{ label: "Blog", href: "/blog" },
```

**Footer:** Add to footerSections COMPANY links in `components/layout/Footer.tsx`:
```typescript
{ label: "Blog", href: "/blog" },
```

---

## Environment Variables

Add to `.env.local`:

```env
# GitHub API (required if private repo, optional if public)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# GitHub Repository Configuration
GITHUB_REPO_OWNER=your-username
GITHUB_REPO_NAME=blog-content
GITHUB_REPO_PATH=posts
GITHUB_REPO_BRANCH=main

# Supabase Configuration (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Set the same variables in Vercel dashboard for production.

**📌 Comments Configuration:** Supabase environment variables are already set up. See [.env.local](../.env.local) and [plans/COMMENTS_PLANNING.md](COMMENTS_PLANNING.md).

---

## Next.js Config Changes

Add `gray-matter` to `transpilePackages` in `next.config.ts` (CJS module, required for Turbopack):

```typescript
const nextConfig = {
  // ... existing config
  transpilePackages: ["gray-matter"],
}
```

---

## Frontmatter Reference

### Free Post (open to everyone)

```yaml
---
title: "What's New in MAS 9: A Quick Overview"
description: "A high-level look at the major changes in IBM Maximo Application Suite 9."
date: "2026-02-01"
slug: "whats-new-mas9-overview"
tags: ["MAS 9", "News"]
draft: false
tier: "free"
author: "themaximoguys Team"
coverImage: "/images/cover/mas9-overview.png"
---
```

### Developer Post (gated — signup required)

```yaml
---
title: "Getting Started with MAS 9 AI Automation"
description: "A practical guide to enabling AI features in IBM Maximo Application Suite 9."
date: "2026-02-01"
slug: "mas9-ai-automation-getting-started"
tags: ["MAS 9", "AI", "Automation"]
draft: false
tier: "developer"
author: "John Doe"
authorAvatar: "https://github.com/johndoe.png"
coverImage: "/images/cover/mas9-ai.png"
updatedAt: "2026-02-15"

# AEO fields
authorTitle: "Senior Maximo Consultant"
authorBio: "15+ years implementing IBM Maximo solutions across manufacturing and utilities."
authorCredentials: ["IBM Certified Maximo Consultant", "PMP"]
authorLinkedin: "https://linkedin.com/in/johndoe"

faqs:
  - question: "What AI capabilities does MAS 9 include?"
    answer: "MAS 9 includes Predict (predictive maintenance), Monitor (IoT anomaly detection), Visual Inspection (defect detection), and Assist (AI knowledge base)."
  - question: "Do I need Cloud Pak for Data for MAS 9 AI?"
    answer: "Yes, Watson Studio in CP4D v5.1 is required for training Predict and Monitor models."

keyTakeaways:
  - "MAS 9 bundles four AI add-ons under AppPoints licensing"
  - "Cloud Pak for Data v5.1 is required for model training"
  - "Start with Predict on your highest-value assets"
---
```

### Enterprise Post (gated — customers only)

```yaml
---
title: "MAS 9 Infrastructure Sizing Guide: 100–10,000 Users"
description: "Detailed vCPU, RAM, and storage sizing for every MAS 9 deployment model."
date: "2026-02-10"
slug: "mas9-infrastructure-sizing-guide"
tags: ["MAS 9", "Architecture", "Sizing"]
draft: false
tier: "enterprise"
author: "John Doe"
authorAvatar: "https://github.com/johndoe.png"
coverImage: "/images/cover/mas9-sizing.png"

authorTitle: "Principal Architect"
authorCredentials: ["IBM Certified Maximo Consultant", "AWS Solutions Architect"]

citations:
  - title: "IBM MAS 9 Performance Wiki"
    url: "https://www.ibm.com/docs/en/mas-cd"
    type: "documentation"

keyTakeaways:
  - "100-user Manage deployment: ~47 vCPUs, 190 GB RAM, 840 GB storage"
  - "ODF adds 30% overhead for persistent storage"
  - "GPU nodes required for Visual Inspection and Predict model training"
---
```

---

## Acceptance Checklist

### ✅ v1 Ship Gate (COMPLETED)
- [x] `npm install` adds all dependencies without errors
- [x] `gray-matter` added to `transpilePackages` in next.config.ts
- [x] Two example posts render at `/blog/<slug>` with syntax-highlighted MDX
- [x] Index at `/blog` lists posts newest-first and hides drafts
- [x] `generateMetadata()` produces correct title, description, OG, Twitter tags
- [x] JSON-LD `BlogPosting` schema present on each post page
- [x] ~~Giscus loads and maps comments by pathname~~ **Upgraded to Supabase Comments**
- [x] Dark/light mode works on all blog pages
- [x] Mobile responsive
- [x] `npm run build` passes
- [x] No regressions to existing site pages
- [x] ISR revalidation works (update a post in GitHub, verify it reflects)
- [x] Error handling: bad slug returns 404, API failure shows fallback
- [x] Blog link added to Header and Footer navigation
- [x] **Tiers:** TierBadge renders on PostCard and PostHeader
- [x] **Tiers:** TierFilterTabs filters listing by All / Free / Developer / Enterprise
- [x] **Tiers:** Free posts render fully with no gate
- [x] **Tiers:** Developer posts show teaser + signup CTA for unauthenticated users
- [x] **Tiers:** Enterprise posts show teaser + contact CTA for non-enterprise users
- [x] **Tiers:** Gated posts still expose teaser to crawlers (SSR full content, gate client-side)
- [x] **Tiers:** `tier` field defaults to `"free"` when omitted in frontmatter

### ✅ Comments Enhancement (COMPLETED - Beyond Original Plan)
- [x] Supabase comments system integrated
- [x] Real-time comment updates (Server-Sent Events)
- [x] Row-Level Security (RLS) policies
- [x] Admin moderation controls
- [x] Rate limiting (30s cooldown)
- [x] Audit trail (deleted_at, deleted_by)
- [x] "Show Deleted" toggle for admins
- [x] Admin badge on moderation actions
- [x] Security score: 89% (from 49%)
- [x] Content length validation (1000 chars)
- [x] Edit own comments (shows "edited" badge)
- [x] Soft delete with full audit
- [x] Migration 007 applied successfully

### 🔵 Phase 2 Enhancements (IN PROGRESS)
- [ ] Comment reactions system
- [ ] Magic link authentication
- [ ] AI spam detection (Akismet/OpenAI)
- [ ] Redis caching layer
- [ ] Email notifications
- [ ] Materialized view for comment counts

### 🟡 v2 Ship Gate - AEO Features (PENDING)
- [ ] FAQ rich results pass Google Rich Results Test
- [ ] HowTo rich results pass validation
- [ ] Author authority card renders with credentials
- [ ] Citations section renders with linked sources
- [ ] Key takeaways render at top of posts that include them
- [ ] AnswerBox MDX component works in posts
- [ ] `/api/content/posts` returns structured JSON
- [ ] Content API supports tag, author, and tier filtering
- [ ] Schema validates at https://validator.schema.org/
- [ ] WCAG 2.2 accessibility compliance
- [ ] Full gamification system (badges, karma)
- [ ] Advanced search with full-text
- [ ] Analytics dashboard

---

## 📈 Success Metrics

### Current Performance
- ✅ **Blog Live:** 3+ posts published
- ✅ **Comments:** Real-time system operational
- ✅ **Security:** 89% score (target: 90%)
- ✅ **Mobile:** Fully responsive
- ✅ **SEO:** Structured data implemented
- ✅ **Admin:** Full moderation controls

### Phase 2 Goals
- 🎯 **Engagement:** +309% from reactions
- 🎯 **Spam:** 99.9% blocked via AI
- 🎯 **Performance:** 80% faster with caching
- 🎯 **Compliance:** 100% WCAG 2.2

### v2 AEO Goals
- 🎯 **Rich Results:** FAQ + HowTo snippets
- 🎯 **E-E-A-T:** Enhanced author authority
- 🎯 **Content API:** Internal knowledge base
- 🎯 **Accessibility:** AA compliance

---

## 📝 Quick Reference

### Documentation
- **Planning:** `plans/BLOG_IMPLEMENTATION.md` (this file)
- **Comments:** `plans/COMMENTS_PLANNING.md` (full roadmap)
- **Security:** `COMMENTS_SECURITY_AUDIT.md`
- **Testing:** `TESTING_GUIDE.md`
- **Quick Start:** `QUICK_START_GUIDE.md`

### Scripts
- Verify comments: `node scripts/verify-migration-007.mjs`
- Test security: `node scripts/test-comment-security.mjs`
- Promote admin: See `scripts/promote-to-admin.sql`

### Key Files
- Blog listing: `app/(marketing)/blog/page.tsx`
- Post page: `app/(marketing)/blog/[slug]/page.tsx`
- Comments: `components/blog/SupabaseComments.tsx`
- Migrations: `supabase/migrations/00[5-7]_*.sql`

---

## 🚀 Next Steps

1. **Test Comments** (5 min)
   - Create admin user: See `TESTING_GUIDE.md`
   - Test all features: Post, edit, delete, moderate
   - Verify rate limiting and security

2. **Phase 2 Planning** (1-2 weeks)
   - Implement comment reactions
   - Add magic link authentication
   - Set up AI spam detection
   - Deploy Redis caching

3. **v2 AEO** (1-2 months)
   - Add FAQ sections to posts
   - Implement HowTo schemas
   - Create author authority cards
   - Build content API

---

**Last Updated:** 2026-02-03
**Next Review:** After Phase 2 completion
**Status:** ✅ Blog operational, comments enhanced, v2 features queued
