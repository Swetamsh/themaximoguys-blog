---
name: BlogCoverArt
description: Smart blog cover image generator — analyzes blog content, picks the best visual style (MarkerBoard, SketchNote, BlueprintBoard, InfoBlocks), selects the right workflow, and generates the image. USE WHEN generate cover image, blog cover, cover art, create image for blog, generate blog image, cover image for post, blog visual, make cover image, generate all covers, batch cover images.
---

# BlogCoverArt Skill

**Smart orchestrator** that reads a blog post, analyzes its content, selects the optimal visual style and workflow, then generates the cover image. One command — no manual style selection needed.

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running BlogCoverArt — analyzing content and selecting visual style"}' \
  > /dev/null 2>&1 &
```

Running **BlogCoverArt** skill...

---

## How It Works

1. **Read** the blog post (MDX/MD file)
2. **Analyze** content type, tone, structure, and audience
3. **Select** the best visual style using the Decision Matrix below
4. **Route** to the correct workflow within that style skill
5. **Generate** the image using the selected skill's prompt template
6. **Place** the image in the blog's images directory

---

## Step 1: Read the Blog

Read the full blog post file. Extract:
- **Title** and subtitle
- **Tags** and series info
- **Key takeaways** / TLDR
- **Content structure** (how-to? comparison? tips? architecture? concept?)
- **Tone** (technical? casual? urgent? educational?)
- **Target audience** (admins? end users? developers? managers?)
- **Key topics** (specific features, tools, concepts mentioned)

---

## Step 2: Content Analysis — Classify the Blog

Classify the blog along these dimensions:

### Content Type
| Type | Signals | Examples |
|------|---------|----------|
| **Comparison** | "vs", "before/after", "old vs new", two-column tables | "7.6 vs MAS 9", "On-Prem vs Cloud" |
| **Tips/CheatSheet** | Tips lists, keyboard shortcuts, survival guide, "things to know" | "Day 1 Guide", "Survival Guide", "Tips Nobody Told You" |
| **How-To/Process** | Numbered steps, "how to", sequential workflow | "5 Steps to Configure...", "Migration Guide" |
| **Concept/Explainer** | Single concept deep-dive, "what is", architecture explanation | "What is Carbon Design?", "Understanding Work Centers" |
| **Architecture/Technical** | System diagrams, component relationships, data flow | "MAS Platform Architecture", "Integration Framework" |
| **Quick Reference** | Command lists, property tables, keyboard shortcuts, codes | "Keyboard Shortcuts", "System Properties Reference" |
| **Business/Strategy** | ROI, business case, transformation roadmap, executive summary | "The Business Case for MAS", "Digital Transformation ROI" |

### Tone & Audience
| Tone | Signals |
|------|---------|
| **Technical-Deep** | Code samples, system properties, CSS classes, API details |
| **Technical-Practical** | Configuration steps, admin tasks, hands-on guidance |
| **Educational-Casual** | Conversational tone, analogies, "let me explain", witty asides |
| **Professional-Corporate** | Business metrics, executive audience, formal language |
| **Urgent/Warning** | Migration deadlines, breaking changes, "you need to know" |

---

## Step 3: Style Selection — Decision Matrix

Use this matrix to select the visual style. Pick the **first match** from top to bottom:

### Primary Decision: Content Type → Style

```
┌─────────────────────────────────────────────────────────────────┐
│                    STYLE DECISION MATRIX                        │
├─────────────────────────┬───────────────────────────────────────┤
│ Content Signal          │ Best Style → Workflow                 │
├─────────────────────────┼───────────────────────────────────────┤
│ Tips / Survival Guide / │                                       │
│ "Day 1" / Cheat Sheet / │ SketchNote → CheatSheet              │
│ "Things Nobody Told"    │ (notebook paper, sticky notes,        │
│                         │  arrow bullets, personal tone)        │
├─────────────────────────┼───────────────────────────────────────┤
│ Keyboard Shortcuts /    │                                       │
│ Command Reference /     │ SketchNote → QuickReference           │
│ Property Table /        │ (notebook paper, categorized tables,  │
│ Code/Value Lookup       │  red circles on critical items)       │
├─────────────────────────┼───────────────────────────────────────┤
│ Architecture / System   │                                       │
│ Diagram / Integration / │ BlueprintBoard → Architecture         │
│ Data Flow / Components  │ (dark blue grid, white line-art,      │
│                         │  cyan connectors, engineering feel)    │
├─────────────────────────┼───────────────────────────────────────┤
│ Deep Technical /        │                                       │
│ Engineering Reference / │ BlueprintBoard → CheatSheet           │
│ Admin Config Guide /    │ (dark blue, cyan arrows, gold         │
│ Heavy Code/CSS/SQL      │  annotations, technical authority)     │
├─────────────────────────┼───────────────────────────────────────┤
│ X vs Y Comparison /     │                                       │
│ Before vs After /       │ MarkerBoard → Comparison              │
│ Old vs New / Migration  │ (black board, bold markers,           │
│                         │  split panel, red vs green)            │
├─────────────────────────┼───────────────────────────────────────┤
│ Single Concept /        │                                       │
│ "What Is" / Explainer / │ MarkerBoard → Concept                 │
│ Paradigm Shift          │ (black board, bold markers,           │
│                         │  central concept, branching)           │
├─────────────────────────┼───────────────────────────────────────┤
│ Step-by-Step Process /  │                                       │
│ How-To / Migration Path │ MarkerBoard → Process                 │
│ / Sequential Workflow   │ (black board, step arrows,            │
│                         │  color progression, green outcome)     │
├─────────────────────────┼───────────────────────────────────────┤
│ Creator-Style Concept / │                                       │
│ Simple Framework /      │ DanKoeStyle → Concept or General      │
│ "One Thing" / Mindset / │ (black chalkboard, neon accents,      │
│ Philosophy / Mental     │  stick figures, wobbly chalk lines,   │
│ Model / Big Idea        │  creator/influencer aesthetic)         │
├─────────────────────────┼───────────────────────────────────────┤
│ Transformation Story /  │                                       │
│ Journey / Progression / │ DanKoeStyle → Process                 │
│ Mindset Shift /         │ (black chalkboard, neon step flow,    │
│ Evolution / Before-     │  chalk drawings, personal growth      │
│ After Narrative         │  storytelling aesthetic)               │
├─────────────────────────┼───────────────────────────────────────┤
│ Business Strategy /     │                                       │
│ ROI / Executive /       │ InfoBlocks → Business or General      │
│ Corporate Audience      │ (cream, 3D blocks, professional,      │
│                         │  clean corporate aesthetic)            │
├─────────────────────────┼───────────────────────────────────────┤
│ Educational Concept /   │                                       │
│ Tech Stack / Layers /   │ InfoBlocks → StackedLayers or Concept │
│ Corporate Deep-Dive     │ (cream, isometric blocks, equation    │
│                         │  headers, professional-educational)    │
├─────────────────────────┼───────────────────────────────────────┤
│ General / Unclear /     │ MarkerBoard → General                 │
│ Doesn't match above     │ (safe default — bold, clean, proven)  │
└─────────────────────────┴───────────────────────────────────────┘
```

### Tie-Breaking Rules

When multiple styles could work:

1. **If blog has witty/casual tone** → prefer SketchNote (sticky notes carry the personality)
2. **If blog has heavy code/config** → prefer BlueprintBoard (technical authority)
3. **If blog is comparison-focused** → prefer MarkerBoard (split panels excel here)
4. **If blog tells a transformation story or presents a simple framework/mental model** → prefer DanKoeStyle (creator aesthetic, neon chalk)
5. **If blog targets executives** → prefer InfoBlocks (corporate-professional)
6. **If unsure** → MarkerBoard General (always works, never looks bad)

### Variation Mode

When asked for **variations** or **multiple styles**, generate 2-3 options using different skills for the same content. Good combos:

| Combo | When |
|-------|------|
| SketchNote + BlueprintBoard | Technical content that could go casual OR authoritative |
| MarkerBoard + SketchNote | Tips/guides that could be bold OR personal |
| BlueprintBoard + InfoBlocks | Architecture that could be engineering OR corporate |
| MarkerBoard + BlueprintBoard | Comparison that could be bold markers OR technical blueprint |
| DanKoeStyle + MarkerBoard | Concept/framework that could be creator OR professional |
| DanKoeStyle + SketchNote | Simple idea that could be neon-chalk OR notebook doodle |

---

## CRITICAL: Blog Cover Philosophy (NOT Social Media Posts)

**Blog covers are NOT infographics.** They are **visual hooks** that make someone click.

### The Rules:
1. **80% visual, 20% text** — maximum 2-3 lines of text (title + optional subtitle)
2. **ONE bold visual metaphor** — not a wall of bullet points
3. **No arrow bullets, no tip lists, no cheat sheet layouts** — those are for social media posts
4. **Visual storytelling** — use illustrations, icons, metaphors, and dramatic composition
5. **Curiosity-driving** — the image should make someone WANT to read the blog
6. **Clean and breathable** — whitespace/negative space is your friend

### What a GOOD blog cover looks like:
- A bold title with a dramatic illustration underneath
- A visual metaphor (e.g., crumbling server becoming containers for "platform shift")
- A striking central image with minimal text overlay
- Professional magazine/editorial cover feel

### What a BAD blog cover looks like:
- Wall of text with arrow bullets (→) listing 8+ features
- Cheat sheet / survival guide layout crammed into a cover
- Information-dense layout that belongs on a social media post
- Trying to summarize the entire blog in one image

### Text Limit for Blog Covers:
- **Title:** 3-8 words, large and bold
- **Subtitle:** 0-1 line, optional
- **Attribution:** @themaximoguys (small, bottom corner)
- **NOTHING ELSE** — no bullet points, no tips, no annotations, no sticky notes

---

## Step 4: Generate the Image

Once style and workflow are selected:

1. **Read** the selected skill's SKILL.md for aesthetic guidance (colors, texture, feel)
2. **DO NOT use the cheat sheet / tips workflow templates** — those are for social media, NOT blog covers
3. **Craft a visual-first prompt** with ONE bold metaphor/illustration + title text only
4. **Generate** using `mcp__nanobanana__generate_image`:
   - `model_tier: "pro"` (fall back to `"nb2"` if 503)
   - `resolution: "2k"`
   - `aspect_ratio: "16:9"` — **ALWAYS 16:9 landscape for blog covers** (matches website layout, ~2752x1536)
   - **ALWAYS include `@themaximoguys` attribution** in the image prompt (small, bottom-right corner)
   - `output_path: "~/Downloads/[style]-[blog-slug].png"`
5. **Preview** the result using Read tool
6. **Copy** to the blog's images directory if approved

---

## Step 5: Output

After generation, report:

```
📊 CONTENT ANALYSIS:
- Type: [content type]
- Tone: [tone classification]
- Audience: [target audience]

🎨 STYLE SELECTED: [Skill Name] → [Workflow]
- Why: [1-2 sentence rationale]

🖼️ IMAGE GENERATED:
- Path: ~/Downloads/[filename].png
- Resolution: [resolution]
- Aspect: [ratio]

📋 NEXT: Preview the image, then copy to blog images directory
```

---

## Batch Mode

When asked to generate covers for multiple blog posts:

1. List all blog files to process
2. Analyze each one and select styles (show the selection table)
3. Ask for approval of the style selections before generating
4. Generate in sequence (or parallel if 4 or fewer)
5. Report results for all

```
| # | Blog Title | Style | Workflow | Rationale |
|---|------------|-------|----------|-----------|
| 1 | Carbon Design UI | SketchNote | CheatSheet | Tips/changes, casual tone |
| 2 | Platform Shift | MarkerBoard | Comparison | Before/after migration |
| 3 | Work Centers | MarkerBoard | Concept | Single concept explainer |
| 4 | MAS Architecture | BlueprintBoard | Architecture | System diagram |
```

---

## Quick Reference: All Available Styles

| Style | Background | Best For | Feel |
|-------|------------|----------|------|
| **MarkerBoard** | Deep black (#0A0A0A) | Comparisons, concepts, processes, general | Bold, vibrant, professional |
| **SketchNote** | Cream notebook paper (#F5F0E8) | Tips, cheat sheets, quick refs, guides | Personal, casual, educational |
| **BlueprintBoard** | Dark navy (#0D1B2A) with grid | Architecture, technical refs, admin guides | Engineering, authoritative |
| **DanKoeStyle** | Pure black (#000000) | Frameworks, mental models, transformations, big ideas | Creator, neon chalk, influencer |
| **InfoBlocks** | Cream (#F5F0E8) | Business/corporate, tech stacks, concepts | Clean, professional, corporate |

---

## Validation

After generating:
- [ ] Style matches blog content type and tone
- [ ] Key information from blog is represented in the image
- [ ] Image follows the selected skill's validation checklist
- [ ] Output placed in correct location
- [ ] Author and branding consistent with blog series
