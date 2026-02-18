---
name: GenerateCarousel
description: Generate a LinkedIn carousel PDF from a blog post
---

# GenerateCarousel Workflow

## Steps

### 1. Identify the Blog Post

If the user specifies a blog post path, use it directly. Otherwise:
- List posts in `posts/` directory and subdirectories
- Ask the user which post to convert using AskUserQuestion

### 2. Run the Generator

```bash
bun /Users/swetamshakula/Documents/TMG_BLOGS/.claude/skills/LinkedInCarousel/Tools/GenerateCarousel.ts "<path-to-mdx>"
```

The script will:
1. Parse MDX frontmatter with `gray-matter`
2. Extract title, description, keyTakeaways, tldr, faqs, series info
3. Generate a branded PDF carousel (1080x1350px slides)
4. Save to `carousels/` directory (creating it if needed)

### 3. Output Location

Default: `carousels/<slug>-carousel.pdf`
Override: `--output <custom-path>`

### 4. Generate LinkedIn Post Caption

After generating the carousel, draft a LinkedIn post caption:

```
[Hook line from title — rewritten as a question or bold statement]

[2-3 lines expanding on the value]

Swipe through to learn:
[Bullet points from keyTakeaways]

---

[Tags from frontmatter as hashtags]

Follow @TheMaximoGuys for more MAS insights.
```

### 5. Verify

- Confirm PDF was created and has correct number of pages
- Report file size (LinkedIn max: 100MB, but aim for <5MB)
- Show the generated caption
