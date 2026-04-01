---
name: DanKoeStyle
description: Dan Koe-style chalkboard infographics with neon accents on black backgrounds. USE WHEN user wants creator-style visuals, chalkboard infographic, Dan Koe style, educational diagram, comparison graphic, one-to-many visual, content creator aesthetic.
---

# DanKoeStyle Skill

Create **Dan Koe-style chalkboard infographics** - the signature visual aesthetic of modern content creators featuring hand-drawn chalk sketches on black backgrounds with neon color accents.

## Core Aesthetic

**The Dan Koe Style:**
- **Background:** Pure BLACK (#000000) - like a chalkboard
- **Line Style:** Hand-drawn chalk/marker sketch - imperfect, organic, wobbly
- **Colors:** Neon accents on black (yellow #FFE066, pink #FF6B9D, green #7FD858, blue #58D8D8, orange #FFB347)
- **Typography:** Casual hand-lettered style, marker-like
- **Icons:** Simple stick figures, basic line drawings, minimal detail
- **Composition:** Educational panels, comparison layouts, concept diagrams

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the DanKoeStyle skill to create chalkboard infographics"}' \
  > /dev/null 2>&1 &
```

Running **DanKoeStyle** skill...

---

## Output Location

```
ALL GENERATED IMAGES GO TO ~/Downloads/ FIRST
User MUST preview before use
```

---

## Workflow Routing

Route to the appropriate workflow based on the request:

- Comparison (X vs Y, before/after) → `Workflows/Comparison.md`
- Concept explanation → `Workflows/Concept.md`
- Process or steps → `Workflows/Process.md`
- Business/strategy visual → `Workflows/Business.md`
- General/flexible → `Workflows/General.md`

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Black | #000000 | Background |
| White | #FFFFFF | Primary chalk lines, main text |
| Yellow | #FFE066 | Key highlights, important labels |
| Pink/Magenta | #FF6B9D | Secondary highlights, accents |
| Green | #7FD858 | Positive elements, growth, success |
| Blue/Cyan | #58D8D8 | Information, processes, data |
| Orange | #FFB347 | Warnings, attention, emphasis |

**Color Rules:**
- 70% white chalk lines
- 30% neon color accents (distributed across 2-3 colors max per image)
- Never use all colors in one image - select 2-3 accent colors per composition

---

## Typography Style

**NOT formal fonts** - hand-lettered chalk/marker style:

- **Headers:** Large, loose, slightly uneven baseline
- **Labels:** Medium, clear but casual
- **Annotations:** Small, sketchy, personal voice

All text should look like someone wrote it on a chalkboard with chalk or markers.

---

## Icon & Figure Style

**Minimal line drawings:**
- Stick figures for people (circle head, line body, simple limbs)
- Basic shapes for objects (rectangles, circles, triangles)
- Simple icons (lightbulb = circle + lines, dollar = S + lines)
- No shading, no gradients, just outlines
- Wobbly/imperfect lines - NOT computer-perfect

---

## Image Generation

**Default model:** Pro tier via the **Nano Banana MCP server** - best for text rendering

**Tool:** Use the `mcp__nanobanana__generate_image` MCP tool:

```
mcp__nanobanana__generate_image(
  prompt: "[PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/[descriptive-name].png"
)
```

### Size Options

| User Says | Parameter | Resolution |
|-----------|-----------|------------|
| "draft", "preview" | `resolution: "1k"` | Quick iterations |
| (default) | `resolution: "2k"` | Standard output |
| "high res", "print" | `resolution: "4k"` | Maximum resolution |

### Aspect Ratio

| User Says | Parameter | Use Case |
|-----------|-----------|----------|
| "wide", "slide" | `aspect_ratio: "16:9"` | Presentations, YouTube |
| "square", "social" | `aspect_ratio: "1:1"` | Instagram, social media |
| "ultrawide" | `aspect_ratio: "21:9"` | Wide banners |

---

## Master Prompt Template

Use this template structure for all Dan Koe style generations:

```
Dan Koe-style chalkboard infographic on pure black background.

STYLE: Hand-drawn chalk/marker sketch aesthetic
- Pure black (#000000) background like a chalkboard
- White chalk lines for primary drawings (70%)
- Neon color accents: [SELECT 2-3: yellow #FFE066, pink #FF6B9D, green #7FD858, blue #58D8D8]
- Imperfect, wobbly hand-drawn lines - NOT computer-perfect
- Casual hand-lettered text - like someone wrote on a chalkboard
- Simple stick figures and basic line icons
- No gradients, no shading, just outlines

COMPOSITION:
[Describe the layout - panels, sections, flow]

CONTENT:
[Describe what to illustrate]

TEXT ELEMENTS:
- Title: "[TITLE]" - large, hand-lettered, [color] chalk
- Labels: [list labels] - medium white chalk
- Annotations: [list annotations] - small, personal voice

VISUAL ELEMENTS:
- [Element 1]: [description] in [color]
- [Element 2]: [description] in white chalk
- [etc.]

CRITICAL:
- Black chalkboard background throughout
- Hand-drawn chalk aesthetic - imperfect is correct
- Neon accents highlight key elements only
- Educational, clear, easy to understand at a glance
```

---

## Examples

**Example 1: One-to-One vs One-to-Many Comparison**
```
User: "create a visual showing one-to-one vs one-to-many work"
→ Invokes Comparison workflow
→ Split composition: left panel (linear), right panel (exponential)
→ Stick figures, simple graphs, neon accents
```

**Example 2: Business Vision Workspace**
```
User: "visualize the digital asset creator workspace"
→ Invokes Business workflow
→ Central workspace illustration
→ Labeled zones: context, digital asset, skills
```

**Example 3: Concept Explanation**
```
User: "explain leverage through content"
→ Invokes Concept workflow
→ Simple diagram with cause → effect
→ Neon highlights on key concepts
```

---

## Validation Checklist

After generating, verify:

**Must Have:**
- [ ] Pure black background (#000000)
- [ ] Hand-drawn chalk/marker aesthetic
- [ ] White as primary line color (70%)
- [ ] Maximum 3 neon accent colors
- [ ] Casual hand-lettered text
- [ ] Simple stick figures/icons
- [ ] Educational clarity

**Must NOT Have:**
- [ ] Gradients or shading
- [ ] Computer-perfect straight lines
- [ ] Formal typography
- [ ] Complex detailed illustrations
- [ ] Light or colored backgrounds
- [ ] More than 3 accent colors
