---
name: PublishSinglePost
description: Generate LinkedIn post copy for non-carousel micro-content (hooks, hot-takes, FAQs, threads, listicles, contrasts)
---

# Workflow: Publish Single Post

Transforms a non-carousel micro-content MDX file into LinkedIn-ready post copy with hashtags and scheduling.

## Trigger

- User asks to create a LinkedIn post from micro-content
- User references a non-carousel MDX file from `micro_blogs/`
- Content type is `hook`, `hot-take`, `FAQ`, `thread`, `listicle`, or `contrast`

## Prerequisites

1. **Micro-content MDX exists** in `micro_blogs/<series-slug>/` with appropriate type frontmatter
2. Content has `platform` array that includes `"linkedin"`

## Step-by-Step Process

### Step 1: Read Micro-Content MDX

Read the MDX file and extract:
- `title` — content title
- `type` — determines which PostTemplate to use
- `tags` — for hashtag selection
- `platform` — verify LinkedIn is included
- `sourceBlog.slug` — for directory naming
- `sourceBlog.series` — for series context
- Body content — the actual micro-content text

### Step 2: Select Post Template

Map content `type` to template in `PostTemplates.md`:

| MDX Type | Template |
|----------|----------|
| `hook` | Hook |
| `hot-take` | Hot Take |
| `FAQ` | FAQ |
| `thread` | Thread |
| `listicle` | Listicle |
| `contrast` | Contrast |

### Step 3: Generate Post Copy

Using the selected template:

1. **Extract the core message** from the MDX body content
2. **Write the hook** (first ~210 chars) — must work standalone in LinkedIn feed
3. **Fill the template structure** with content adapted for LinkedIn format
4. **Add TMG voice** — professional but approachable, expert authority
5. **Write the CTA** — engagement question appropriate to content type
6. **Add hashtag separator** `---`

**Adaptation rules:**
- MDX content is the raw material, NOT a copy-paste source
- Adapt length and format for LinkedIn (different from X or Instagram)
- If MDX was written for X (short), expand with context for LinkedIn
- If MDX was written for Instagram (visual-first), add more explanatory text
- Always check final character count is under 3,000

### Step 4: Select Hashtags

Using `HashtagStrategy.md`:

1. Map MDX `tags` to topic hashtag groups
2. Pick 1-2 Core TMG hashtags
3. Pick 2-3 from matched topic groups
4. Verify total is 3-5
5. Place highest-reach hashtag first

### Step 5: Generate Scheduling Recommendation

Using `SchedulingGuide.md`:

1. Map content type to recommended day:
   - **Hook:** Tuesday (Week 1 opener)
   - **Hot Take:** Thursday (mid-week debate)
   - **FAQ:** Friday (answer engagement questions)
   - **Thread:** Wednesday (narrative mid-week)
   - **Listicle:** Thursday (quick-hit value)
   - **Contrast:** Tuesday (new week comparison)
2. Recommend Tier 1 time slot (8:00-10:00 AM ET)
3. Note series position based on post number in filename

### Step 6: Handle Cover Image (Optional)

If content type benefits from an image:
- Check if a cover image exists in `micro_blogs/<series-slug>/images/`
- If no image exists, note in output: "Consider generating a cover image with Art or DanKoeStyle skill"
- Hooks and hot-takes work well as text-only posts (no image needed)
- FAQs and listicles benefit from a branded header image

### Step 7: Create Output

Create file: `linkedin-posts/<series-slug>/post-NN-<type>-<slug>.md`

Where:
- `NN` is the post number from MDX filename (e.g., `01` from `01-hook-script-runs-mbo-complicated.mdx`)
- `<type>` is the content type
- `<slug>` is derived from the filename

```markdown
---
type: "[content type]"
title: "[post title]"
series: "[series name]"
source_mdx: "[path to source MDX]"
generated: "[ISO date]"
character_count: [count]
hashtags: ["#Tag1", "#Tag2", "#Tag3"]
scheduling:
  recommended_day: "[day]"
  recommended_time: "[time] ET"
  tier: [1-3]
  series_position: "[Week X, Day Y]"
  spacing_note: "[gap recommendation]"
cover_image: "[path or null]"
---

[Full post copy text here, ready to copy-paste into LinkedIn]

---
#Hashtag1 #Hashtag2 #Hashtag3 #Hashtag4 #Hashtag5
```

## Batch Mode

When user asks to generate posts for an entire series:

1. Read `_index.mdx` from the series directory
2. Filter for non-carousel content types where `platform` includes `"linkedin"`
3. Process each file through Steps 1-7
4. Apply series sequencing from SchedulingGuide.md
5. Output all posts to `linkedin-posts/<series-slug>/`
6. Generate a series README with the full posting calendar

### Series README Output

```markdown
# LinkedIn Series: [Series Name]

## Posting Calendar

| # | Day | Time | Type | Title | File |
|---|-----|------|------|-------|------|
| 1 | Tue W1 | 9AM | Hook | [title] | post-01-hook-... |
| 2 | Thu W1 | 9AM | Hot Take | [title] | post-05-hottake-... |
| ... |

## Notes
- Total posts: N
- Duration: ~3-4 weeks
- Carousel posts require separate PDF upload (see carousel post directories)
```

## Output Summary

After completing, report:
- Post type: [type]
- Character count: N (under 3000 limit)
- Hashtags: [list]
- Recommended posting: [day + time]
- Output file: [path]
- Image status: [included/suggested/not needed]

## Error Handling

| Issue | Resolution |
|-------|-----------|
| Platform doesn't include LinkedIn | Warn user, adapt content anyway if requested |
| Content too short for LinkedIn | Expand with context from source blog |
| Content too long (>3000 chars) | Trim body while preserving hook and CTA |
| Unknown content type | Default to Hook template, warn user |
