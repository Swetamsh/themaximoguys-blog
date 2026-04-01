---
name: MarkerBoard
description: Bold marker-art infographics on dark blackboard backgrounds. USE WHEN user wants cover images, social media visuals, marker-style infographic, blackboard illustration, educational diagram, comparison graphic, content creator aesthetic, blog cover image.
---

# MarkerBoard Skill

Create **bold marker-art infographics** on dark blackboard backgrounds. Professional art marker aesthetic — thick, saturated, confident strokes with vibrant pigment colors on dark surfaces.

## Core Aesthetic

**The MarkerBoard Style:**
- **Background:** Deep matte BLACK (#0A0A0A) — like a premium blackboard
- **Line Style:** Bold art marker strokes — thick, saturated, confident. Slightly bleeding edges where ink meets surface. NOT chalk (no dusty/wispy texture)
- **Colors:** Vibrant marker pigments on black (Electric Blue #2D9CDB, Signal Red #EB5757, Lime Green #6FCF97, Warm Amber #F2994A, Violet #BB6BD9)
- **Typography:** Bold hand-lettered marker style — thick strokes, confident, slightly uneven baseline
- **Icons:** Bold line drawings with filled marker strokes, simple but punchy shapes
- **Composition:** Educational panels, comparison layouts, concept diagrams
- **Feel:** Like someone took a set of premium Copic markers to a blackboard — professional, bold, vibrant

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the MarkerBoard skill to create marker-style infographics"}' \
  > /dev/null 2>&1 &
```

Running **MarkerBoard** skill...

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
| Black | #0A0A0A | Background (deep matte black) |
| White | #F5F5F5 | Primary marker lines, main text (warm white, not pure) |
| Electric Blue | #2D9CDB | Key highlights, data, tech elements |
| Signal Red | #EB5757 | Warnings, emphasis, contrast points |
| Lime Green | #6FCF97 | Positive elements, growth, success |
| Warm Amber | #F2994A | Attention, secondary highlights |
| Violet | #BB6BD9 | Creative elements, differentiation |

**Color Rules:**
- 60% warm white marker strokes for primary content
- 40% vibrant marker colors (use 2-3 colors max per image)
- Colors should look like saturated marker pigment — rich and bold
- Never use all colors in one image — select 2-3 accent colors per composition

---

## Typography Style

**Bold marker lettering** — NOT thin chalk, NOT formal fonts:

- **Headers:** Large, thick marker strokes, slightly uneven but confident
- **Labels:** Medium weight, clear and legible marker hand-lettering
- **Annotations:** Smaller but still bold marker, personal voice

All text should look like someone wrote it with thick art markers on a blackboard.

---

## Icon & Figure Style

**Bold marker drawings:**
- Simple figures with thick marker outlines (not stick figures — slightly more substance)
- Filled shapes with marker color — solid blocks of pigment
- Basic but punchy icons (bold strokes, filled elements)
- Slightly imperfect lines — hand-drawn but confident, NOT wobbly/tentative
- Some marker bleed/overlap where colors meet — adds authenticity

---

## Image Generation

**Default model:** Pro tier via the **Nano Banana MCP server**

**Tool:** Use the `mcp__nanobanana__generate_image` MCP tool:

```
mcp__nanobanana__generate_image(
  prompt: "[PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/[descriptive-name].png"
)
```

**Fallback:** Direct Gemini API with `gemini-2.0-flash-exp-image-generation`

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
| "square", "social" | `aspect_ratio: "1:1"` | Instagram, LinkedIn, social media |
| "portrait", "story" | `aspect_ratio: "4:5"` | LinkedIn carousel, IG posts |

---

## Master Prompt Template

Use this template structure for all MarkerBoard generations:

```
Bold marker-art infographic on deep matte black blackboard background.

STYLE: Professional art marker aesthetic on blackboard
- Deep matte black (#0A0A0A) background — premium blackboard surface
- Bold marker strokes — thick, saturated, confident lines with slight ink bleed
- Warm white marker (#F5F5F5) for primary drawings (60%)
- Vibrant marker pigment accents: [SELECT 2-3: Electric Blue #2D9CDB, Signal Red #EB5757, Lime Green #6FCF97, Warm Amber #F2994A, Violet #BB6BD9]
- Hand-lettered text with thick marker strokes — bold, slightly uneven but confident
- Simple bold figures with filled marker color — not stick figures, not complex
- Marker bleeding edges where colors overlap — authentic feel
- NO chalk texture, NO gradients, NO stock photo aesthetic
- NO constellation dots, NO floating particles, NO circuit boards

COMPOSITION:
[Describe the layout - panels, sections, flow]

CONTENT:
[Describe what to illustrate]

TEXT ELEMENTS:
- Title: "[TITLE]" - large, bold marker lettering, [color]
- Labels: [list labels] - medium warm white marker
- Annotations: [list annotations] - smaller marker, personal voice

VISUAL ELEMENTS:
- [Element 1]: [description] in [color] marker
- [Element 2]: [description] in warm white marker
- [etc.]

ATTRIBUTION:
- Bottom-right: "@themaximoguys" in warm white marker — always include

CRITICAL:
- Deep black blackboard background throughout
- Bold art marker aesthetic — NOT chalk, NOT digital
- Marker pigment colors — saturated and vibrant
- Educational, clear, easy to understand at a glance
- Professional yet hand-crafted feel
- Always include @themaximoguys attribution
```

---

## Examples

**Example 1: Tech Comparison**
```
User: "create a visual showing on-prem vs cloud"
→ Invokes Comparison workflow
→ Split composition with bold marker illustrations
→ Server rack vs cloud icons in marker style
```

**Example 2: Architecture Concept**
```
User: "visualize microservices architecture"
→ Invokes Concept workflow
→ Central hub with connected services
→ Bold marker connections and labels
```

**Example 3: Migration Process**
```
User: "show the 5 steps of cloud migration"
→ Invokes Process workflow
→ Sequential marker-drawn steps with arrow flow
```

---

## Validation Checklist

After generating, verify:

**Must Have:**
- [ ] Deep matte black background (#0A0A0A)
- [ ] Bold art marker stroke aesthetic
- [ ] Warm white as primary line color (60%)
- [ ] Maximum 3 vibrant marker accent colors
- [ ] Bold hand-lettered text
- [ ] Simple but punchy marker icons/figures
- [ ] Educational clarity

**Must NOT Have:**
- [ ] Gradient backgrounds (blue, purple, gold, etc.)
- [ ] Chalk/dusty texture
- [ ] Computer-perfect lines
- [ ] Formal typography
- [ ] Complex detailed illustrations
- [ ] Constellation dots or floating particles
- [ ] Circuit board / cyberpunk aesthetic
- [ ] Stock photo or template look
- [ ] More than 3 accent colors
