---
name: PublishCarouselPost
description: Assemble carousel PNGs into PDF and generate LinkedIn post package
---

# Workflow: Publish Carousel Post

Transforms a carousel MDX micro-content file + generated slide PNGs into a complete LinkedIn posting package.

## Trigger

- User asks to publish a carousel to LinkedIn
- User references a carousel MDX file from `micro_blogs/`
- Content type is `carousel` in MDX frontmatter

## Prerequisites

1. **Carousel MDX exists** in `micro_blogs/<series-slug>/` with `type: "carousel"` frontmatter
2. **Slide PNGs generated** by SketchCarousel skill in `~/Downloads/carousel-<slug>/`
3. **pdf-lib** available in project dependencies (already installed)

If slide PNGs are not found, prompt user: "Run SketchCarousel first to generate slide images for this carousel."

## Step-by-Step Process

### Step 1: Read Carousel MDX

Read the carousel MDX file and extract:
- `title` — carousel topic
- `slideCount` — expected number of slides
- `tags` — for hashtag selection
- `sourceBlog.slug` — for directory naming
- `sourceBlog.series` — for series context
- `date` — for scheduling
- Slide content from MDX body (each `## Slide N` section)

### Step 2: Locate Slide PNGs

Search for slide images in this order:
1. `~/Downloads/carousel-<slug>/` (primary — SketchCarousel output)
2. `~/Downloads/carousel/` (fallback — generic directory)

Verify:
- Number of PNGs matches `slideCount` from frontmatter
- Files are named sequentially: `slide-01-*.png`, `slide-02-*.png`, etc.
- Sort alphabetically to ensure correct order

### Step 3: Assemble PDF

Use `pdf-lib` to create a single PDF from all slide PNGs:

```typescript
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

async function assembleCarouselPDF(pngPaths: string[], outputPath: string) {
  const pdfDoc = await PDFDocument.create();

  for (const pngPath of pngPaths) {
    const pngBytes = fs.readFileSync(pngPath);
    const pngImage = await pdfDoc.embedPng(pngBytes);

    // Use image dimensions for page size (1080x1350 standard)
    const page = pdfDoc.addPage([pngImage.width, pngImage.height]);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: pngImage.width,
      height: pngImage.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  return outputPath;
}
```

Execute this as an inline script using `bun` or `tsx`.

### Step 4: Generate Post Copy

Using the **Carousel template** from `PostTemplates.md`:

1. Write a hook line (under 210 chars) that works without seeing the carousel
2. Add 1-2 context sentences about why this matters now
3. Brief overview of what the carousel covers (NOT slide-by-slide)
4. Include "Swipe through" prompt
5. End with save/comment CTA
6. Add hashtag separator `---`

### Step 5: Select Hashtags

Using `HashtagStrategy.md`:

1. Map MDX `tags` to topic hashtag groups
2. Pick 1-2 Core TMG hashtags
3. Pick 2-3 from matched topic groups
4. Verify total is 3-5
5. Place highest-reach hashtag first

### Step 6: Generate Scheduling Recommendation

Using `SchedulingGuide.md`:

1. Carousel posts → recommend Tier 1 day (Tue-Thu), morning slot
2. Check series position (is this the first carousel in the series?)
3. Recommend mid-week placement per guide
4. Note spacing from previous posts if known

### Step 7: Create Output Package

Create directory: `linkedin-posts/<series-slug>/post-NN-carousel-<carousel-slug>/`

Where `NN` is the post number from the MDX filename (e.g., `04` from `04-carousel-old-vs-new-dev.mdx`).

#### File: `post-copy.md`

```markdown
---
type: carousel
title: "[carousel title]"
series: "[series name]"
source_mdx: "[path to source MDX]"
generated: "[ISO date]"
character_count: [count]
hashtags: ["#Tag1", "#Tag2", "#Tag3"]
---

[Full post copy text here, ready to copy-paste into LinkedIn]
```

#### File: `carousel.pdf`

The assembled PDF from Step 3.

#### File: `metadata.json`

```json
{
  "type": "carousel",
  "title": "[title]",
  "series": "[series name]",
  "source_mdx": "[relative path]",
  "slide_count": 10,
  "slide_sources": ["slide-01-hook.png", "..."],
  "hashtags": ["#Maximo", "#MAS9", "..."],
  "scheduling": {
    "recommended_day": "Wednesday",
    "recommended_time": "9:00 AM ET",
    "tier": 1,
    "series_position": "Week 2, Day 1",
    "spacing_note": "Post 2-3 days after previous hook post"
  },
  "generated_at": "2026-02-18T12:00:00Z",
  "pdf_path": "carousel.pdf",
  "character_count": 1247
}
```

#### File: `README.md`

```markdown
# LinkedIn Carousel Post: [Title]

## Quick Post Guide

1. Open LinkedIn → Start a post
2. Click the document icon (📄) to upload a PDF
3. Upload `carousel.pdf` from this directory
4. Copy the text from `post-copy.md` (everything below the frontmatter `---`)
5. Paste into the LinkedIn post editor
6. Add a title for the carousel when prompted (use the title from post-copy.md)
7. Review the preview — all slides should be visible
8. Post at the recommended time (see metadata.json)

## Scheduling

- **Recommended:** [Day], [Time] ET
- **Series position:** [Week X, Day Y]
- **Spacing:** [Note about gap from previous post]

## Source

- MDX: `[source path]`
- Slides: `~/Downloads/carousel-[slug]/`
- Generated: [date]
```

## Output Summary

After completing all steps, report:
- PDF created with N slides
- Post copy: N characters (under 3000 limit)
- Hashtags selected: [list]
- Recommended posting: [day + time]
- Output directory: [path]

## Error Handling

| Issue | Resolution |
|-------|-----------|
| PNGs not found | Prompt to run SketchCarousel first |
| PNG count mismatch | Warn and proceed with available PNGs |
| PDF assembly fails | Check png format, try jpg fallback |
| Post copy over 3000 chars | Trim body, keep hook and CTA |
