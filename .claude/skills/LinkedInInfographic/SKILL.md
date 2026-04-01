---
name: LinkedInInfographic
description: Use this skill to create a content-rich, readable image from any blog post for LinkedIn or social media. NOT a cover image or decoration — this produces an information-dense infographic where the blog's actual key points, takeaways, and details are visible and readable inside the image itself. MUST USE when user has a blog/MDX/post source AND wants a LinkedIn image, social media image, visual post, or infographic generated from that content. Covers comparison infographics, cheat sheets, process flows, and quick references. Distinct from BlogCoverArt (decorative headers), Art/Media (standalone visuals), and individual style skills (no blog extraction). NOT for carousels, text-only posts, scheduling, SEO, or images without a blog source.
---

# LinkedInInfographic

Generate detailed, information-dense LinkedIn infographic posts from blog content. Unlike blog cover images (80% visual, 20% text), these are the opposite — **80% information, 20% visual styling**. They pack the blog's full value into a single shareable image.

## Customization

**Before executing, check for user customizations at:**
`~/.claude/skills/PAI/USER/SKILLCUSTOMIZATIONS/LinkedInInfographic/`

If this directory exists, load and apply any PREFERENCES.md found there. If not, proceed with defaults.

## Voice Notification

**When executing a workflow, do BOTH:**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Running WORKFLOWNAME in LinkedInInfographic to generate social infographic"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Running **WorkflowName** in **LinkedInInfographic**...
   ```

## Output to Downloads First

```
ALL GENERATED IMAGES GO TO ~/Downloads/ FIRST
NEVER output directly to project directories
User MUST preview before use
```

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────┐
│  1. READ BLOG                                           │
│     Read the MDX file, extract frontmatter + body       │
│                                                         │
│  2. EXTRACT CONTENT                                     │
│     Pull structured data using ContentExtraction.md     │
│                                                         │
│  3. SELECT STYLE + WORKFLOW                             │
│     Use Decision Matrix to pick visual style + layout   │
│                                                         │
│  4. BUILD PROMPT                                        │
│     Fill workflow template with extracted content        │
│                                                         │
│  5. GENERATE IMAGE                                      │
│     mcp__nanobanana__generate_image (4:5, pro, 2k)      │
│                                                         │
│  6. GENERATE POST COPY                                  │
│     LinkedIn post text using LinkedInPostCopy.md        │
└─────────────────────────────────────────────────────────┘
```

## Decision Tree — Workflow + Style Selection

**Follow this tree top-down. Take the FIRST branch that matches.**

```
START: Read the blog
│
├─ Does it compare TWO things (X vs Y, before/after, old vs new)?
│  YES → Workflows/Comparison.md
│  │  ├─ Technical comparison with feature matrix? → BlueprintBoard
│  │  ├─ Conceptual/business comparison? → MarkerBoard
│  │  └─ Corporate/executive audience? → InfoBlocks
│
├─ Does it list shortcuts, commands, codes, or config properties?
│  YES → Workflows/QuickReference.md
│  │  ├─ Keyboard shortcuts / user-facing? → SketchNote
│  │  └─ System properties / admin config? → BlueprintBoard
│
├─ Does it describe sequential steps (migration, installation, phases)?
│  YES → Workflows/ProcessFlow.md
│  │  ├─ Practical how-to with personality? → SketchNote
│  │  ├─ Technical migration/architecture? → BlueprintBoard
│  │  └─ Business transformation story? → MarkerBoard
│
├─ Does it explain ONE core concept or architecture?
│  YES → Workflows/ConceptBreakdown.md
│  │  ├─ Platform/system with layers? → BlueprintBoard (Architecture)
│  │  ├─ Educational "What is X"? → InfoBlocks (StackedLayers)
│  │  ├─ Framework/mental model? → MarkerBoard (Concept)
│  │  └─ Casual explainer? → SketchNote (General)
│
├─ Does it have tips for TWO audiences (end user + admin)?
│  YES → Workflows/CheatSheet.md
│  │  ├─ Witty/casual tone? → SketchNote
│  │  └─ Heavy technical depth? → BlueprintBoard
│
├─ Is it a feature spotlight / "what's new" list?
│  YES → Workflows/CheatSheet.md
│  │  └─ Default → BlueprintBoard (features feel authoritative)
│
└─ DEFAULT (tips, survival guide, actionable takeaways)
   → Workflows/CheatSheet.md → SketchNote
   (SketchNote CheatSheet is the safest default — highest engagement)
```

## Quick Reference Table

| Content Type | Workflow | Primary Style |
|---|---|---|
| X vs Y / Before-After | `Comparison` | BlueprintBoard or MarkerBoard |
| Shortcuts / Commands / Config | `QuickReference` | SketchNote |
| Sequential steps / Migration | `ProcessFlow` | SketchNote or BlueprintBoard |
| Architecture / Single concept | `ConceptBreakdown` | BlueprintBoard or InfoBlocks |
| Two-audience tips / Survival guide | `CheatSheet` | SketchNote or BlueprintBoard |
| Feature spotlight / What's New | `CheatSheet` | BlueprintBoard |
| Certification / Exam breakdown | `CheatSheet` | SketchNote |
| Protocol grid / Numbered components | `ConceptBreakdown` (grid) | InfoBlocks |

**Style Tie-Breakers (when multiple styles could work):**
1. Witty/casual tone → **SketchNote** (sticky notes carry personality)
2. Heavy technical depth → **BlueprintBoard** (engineering authority)
3. Side-by-side comparison → **MarkerBoard** (split panels) or **BlueprintBoard** (technical)
4. Corporate/executive audience → **InfoBlocks** (professional polish)
5. Unsure → **SketchNote CheatSheet** (always works, highest LinkedIn engagement)

## Content Extraction

**Full methodology:** Read `ContentExtraction.md` (in this skill's root directory)

**Quick reference — pull from blog frontmatter:**
- `title` → Infographic title
- `keyTakeaways` → Primary bullet points
- `faqs` → Additional tips/details
- `tldr` → Subtitle or callout box content
- `tags` → Topic categorization
- `series.name` → Context for framing
- `proficiencyLevel` → Audience targeting

**Pull from blog body:**
- H2/H3 headers → Section headers in infographic
- Bold text and key terms → Emphasis items
- Bullet lists → Infographic bullet points
- Code snippets/commands → Reference items
- Witty quotes/asides → Sticky note annotations (SketchNote) or gold annotations (BlueprintBoard)

## Image Generation Parameters

```
mcp__nanobanana__generate_image(
  prompt: "[FULL PROMPT FROM WORKFLOW]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/linkedin-infographic-[slug].png",
  thinking_level: "high"
)
```

**Always 4:5 portrait** — optimal LinkedIn feed display.
**Always pro tier** — text-heavy images need maximum quality.
**Always 2k resolution** — readable text at feed size.

## Batch Mode

To process multiple blogs:

1. List all blog files to process (or specify a series directory)
2. For each blog, run content extraction and classify
3. Show a selection table: `| Blog | Style | Workflow | Status |`
4. Ask for approval of selections
5. Generate sequentially (or up to 4 parallel with 2-second stagger)
6. Generate LinkedIn post copy for each
7. Report results

## LinkedIn Post Copy

**Full templates:** Read `LinkedInPostCopy.md` (in this skill's root directory)

## Examples

**Example 1: Single blog to infographic**
```
User: "create a LinkedIn infographic from the MAS-FEATURES platform-shift blog"
→ Reads posts/MAS-FEATURES/2026-03-17-mas-features-01-platform-shift.mdx
→ Extracts: architecture comparison (old vs new), 11 key changes, Java 17 impact
→ Classifies: Comparison + Architecture → BlueprintBoard → Comparison workflow
→ Generates 4:5 portrait infographic with all key content
→ Generates LinkedIn post copy with hook, key points, CTA
```

**Example 2: Batch infographics for a series**
```
User: "generate LinkedIn infographics for all MAS-ADMIN blogs"
→ Reads all 10 MDX files in posts/MAS-ADMIN/
→ Classifies each blog, selects styles
→ Shows selection table for approval
→ Generates 10 infographic images + 10 LinkedIn posts
```

**Example 3: Quick reference from shortcuts blog**
```
User: "make a LinkedIn infographic with all the Maximo keyboard shortcuts"
→ Routes to QuickReference workflow
→ SketchNote style with organized shortcut groups
→ 4:5 portrait, dense but readable
```
