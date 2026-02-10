# The Maximo Guys Blog - Sanity Studio

This is the Sanity Studio for managing blog content on The Maximo Guys website.

## Quick Start

### 1. Prerequisites

Before running the Studio, you need:
- A Sanity project (create at https://sanity.io/manage)
- Project ID and API token
- Environment variables configured

### 2. Environment Setup

Create/update `.env` with your Sanity credentials:

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Studio Locally

```bash
npm run dev
```

The Studio will be available at: http://localhost:3333

### 5. Deploy Studio

To deploy a hosted version of the Studio:

```bash
npm run build
npm run deploy
```

This will create a hosted Studio at: `https://your-project.sanity.studio`

---

## Content Schemas

The Studio includes the following content types:

### Blog Post (`blogPost`)
- **Purpose:** Main blog content
- **Fields:** Title, slug, description, content (Portable Text), cover image, author, published date, tier, tags, featured flag, read time
- **Content Tier:** Free, Developer, Enterprise (for gated content)

### Author (`author`)
- **Purpose:** Author profiles
- **Fields:** Name, slug, bio, image, email, social links (LinkedIn, Twitter)

### FAQ Section (`faqSection`)
- **Purpose:** Reusable FAQ blocks for blog posts
- **Fields:** Title, items (question/answer pairs)

### How-To Section (`howToSection`)
- **Purpose:** Step-by-step guides for blog posts
- **Fields:** Title, steps (number, title, description, image, code example)

---

## Content Guidelines

### Writing Blog Posts

1. **Create Author First:** Before creating posts, add author profiles
2. **Use Portable Text:** Rich text editor with support for:
   - Headings (H2, H3)
   - Bold, italic, code inline
   - Bullet and numbered lists
   - Blockquotes
   - Images with alt text and captions
   - Code blocks with syntax highlighting
   - FAQ sections
   - How-To sections
3. **Set Content Tier:** Choose Free, Developer, or Enterprise based on target audience
4. **Add Tags:** Help users discover related content
5. **Cover Image:** Always include a cover image with descriptive alt text
6. **Read Time:** Estimate reading time (1 minute ≈ 200 words)

### Image Best Practices

- **Alt Text:** Always required for accessibility
- **Captions:** Optional but recommended for context
- **Hotspot:** Use the hotspot feature to ensure important parts of images are visible in crops
- **Format:** Upload PNG, JPG, or WebP (Sanity auto-converts to optimal formats)

### Publishing Workflow

1. Create draft post in Studio
2. Preview content (use Vision tool for GROQ queries if needed)
3. Set `publishedAt` date (posts won't appear on site until this date)
4. Click "Publish"
5. Content will be available on the website within 60 seconds (ISR cache)

---

## Studio Features

### Structure Tool
- Browse and manage all content
- Hierarchical organization by content type
- Search and filter capabilities

### Vision Tool
- Test GROQ queries directly in Studio
- Useful for debugging and understanding data structure
- Available at: Studio → Vision tab

---

## Development

### Project Structure

```
sanity-studio/
├── package.json           # Dependencies and scripts
├── sanity.config.ts       # Studio configuration
├── tsconfig.json          # TypeScript config
├── .env                   # Environment variables (not committed)
└── schemas/               # Content type definitions
    ├── blogPost.ts        # Blog post schema
    ├── author.ts          # Author schema
    ├── faqSection.ts      # FAQ schema
    └── howToSection.ts    # How-To schema
```

### Adding New Content Types

1. Create schema file in `schemas/` directory
2. Import schema in `sanity.config.ts`
3. Add to `schema.types` array
4. Restart Studio (`npm run dev`)

### Customizing Studio

The Studio can be customized in `sanity.config.ts`:
- Change title and branding
- Add/remove plugins
- Customize document actions
- Add custom components

---

## Troubleshooting

### Studio won't start

**Error:** "Missing SANITY_STUDIO_PROJECT_ID"
**Solution:** Ensure `.env` file exists with valid project ID

### Content not showing in Next.js app

**Possible causes:**
1. Post `publishedAt` date is in the future
2. ISR cache hasn't refreshed yet (wait 60 seconds)
3. Environment variables not set in Next.js app
4. GROQ query filtering out the content

### Images not loading

**Check:**
1. Image has `alt` text (required)
2. Image asset is uploaded successfully
3. Sanity Image CDN is accessible
4. Next.js app has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`

---

## Resources

- **Sanity Documentation:** https://www.sanity.io/docs
- **GROQ Reference:** https://www.sanity.io/docs/groq
- **Portable Text:** https://www.sanity.io/docs/presenting-block-text
- **Schema Types:** https://www.sanity.io/docs/schema-types
- **Vision Tool:** https://www.sanity.io/docs/the-vision-plugin

---

## Security Notes

- **Never commit** `.env` file
- **API Tokens:** Use "Editor" permissions for Studio, not "Admin"
- **Public Dataset:** Content in `production` dataset is publicly readable (by design)
- **Private Content:** Use content tier system (`tier` field) for access control in Next.js app

---

**Maintained by:** The Maximo Guys Team
**Sanity Version:** 3.68.1
**Last Updated:** 2026-02-09
