# The Maximo Guys Blog

Source content and Sanity CMS management tools for The Maximo Guys blog.

## Structure

```
themaximoguys-blog/
├── posts/                  # MDX blog post source files (source of truth)
├── scripts/
│   └── sync-blog-to-sanity.ts  # One-way sync: MDX posts -> Sanity CMS
├── sanity-studio/          # Sanity Studio v5 (content management UI)
├── plans/                  # Planning documents
└── package.json            # Sync script dependencies
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your Sanity credentials:

```bash
cp .env.example .env
```

Required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset (default: `production`)
- `SANITY_API_TOKEN` — Sanity API token with write access

### 3. Sanity Studio setup

```bash
cd sanity-studio
npm install
```

## Usage

### Sync blog posts to Sanity

The sync script reads MDX files from `posts/` and creates/updates documents in Sanity CMS. It uses content hashing to only sync changed posts.

```bash
# Preview changes without writing
npm run sync:dry-run

# Sync all changed posts
npm run sync

# Force re-sync all posts (ignore content hashes)
npm run sync:force

# Validate posts without syncing (check for broken images, missing slugs, etc.)
npm run sync:validate

# Additional flags can be combined:
npx tsx scripts/sync-blog-to-sanity.ts --force --skip-images
```

### Run Sanity Studio

```bash
cd sanity-studio
npm run dev
```

Opens Sanity Studio at `http://localhost:3333` for managing blog content via a UI.

## Content Tiers

| Tier | Visibility | Focus |
|------|-----------|-------|
| Free | Everyone | Thought leadership, news, general insights |
| Developer | Teaser public, full requires signup | Tutorials, technical guides, how-tos |
| Enterprise | Teaser public, full requires contact | Architecture, sizing, ROI, benchmarks |

## Post Frontmatter Fields

### Required
- `title`, `description`, `date`, `slug`, `tags`, `draft`, `tier`

### Optional
- `author`, `authorAvatar`, `coverImage`, `canonicalUrl`, `updatedAt`
- `authorTitle`, `authorBio`, `authorCredentials`, `authorLinkedin`
- `faqs`, `keyTakeaways`, `citations`
- `seoTitle`, `seoDescription`, `noIndex`
- `series` (name, part, total), `pillarSlug`, `clusterSlugs`, `relatedSlugs`

## Architecture

- **This repo** = content authoring (MDX source files) + Sanity write operations (sync script, Studio)
- **Next.js website** ([THEMAXIMOGUYS-NEXTJS](../THEMAXIMOGUYS-NEXTJS)) = read-only from Sanity (display blog content)

This separation keeps the production website lean and centralizes all content management tools alongside the source posts.
