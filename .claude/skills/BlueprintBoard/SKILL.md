---
name: BlueprintBoard
description: Dark blue engineering blueprint infographics with cyan arrows, gold annotations, grid lines, and technical drawing aesthetic. USE WHEN user wants blueprint style, engineering diagram, technical cheat sheet, dark blue infographic, blueprint visual, technical survival guide, engineering aesthetic, schematic-style visual, dark technical infographic.
---

# BlueprintBoard Skill

Create **engineering blueprint-style infographics** on dark blue backgrounds. Technical drawing aesthetic — grid lines, cyan arrows, gold annotations, white text, engineering line drawings, and title block attribution. Professional yet approachable, like an engineer's annotated reference sheet.

## Core Aesthetic

**The BlueprintBoard Style:**
- **Background:** Deep navy/dark blue (#0D1B2A to #1B2838) with subtle grid lines — like engineering graph paper or a blueprint
- **Grid Lines:** Faint lighter blue (#1E3A5F) forming a subtle engineering grid pattern
- **Primary Text:** White (#FFFFFF) handwritten/hand-lettered text — clear and legible
- **Arrow Bullets:** Cyan/teal (#4ECDC4) arrows (→) as primary bullet style
- **Annotations:** Gold/amber (#FFD93D) for witty callout quotes and emphasis text
- **Section Headers:** Cyan (#4ECDC4) with underline, emoji-style icon prefix
- **Accent Elements:** Dashed lines, corner registration marks, technical connectors
- **Illustrations:** White line drawings — monitors, gears, documents, tools, databases — engineering schematic style
- **Title Block:** Engineering-style attribution box at bottom-right with title, author, rev, date
- **Feel:** Like a senior engineer's annotated blueprint that got passed around the team

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the BlueprintBoard skill to create blueprint-style infographics"}' \
  > /dev/null 2>&1 &
```

Running **BlueprintBoard** skill...

---

## Output Location

```
ALL GENERATED IMAGES GO TO ~/Downloads/ FIRST
User MUST preview before use
```

---

## Workflow Routing

Route to the appropriate workflow based on the request:

- Cheat sheet / survival guide / two-column tips → `Workflows/CheatSheet.md`
- Step-by-step tutorial or how-to → `Workflows/Guide.md`
- Quick reference card / command list → `Workflows/QuickReference.md`
- Architecture or system diagram → `Workflows/Architecture.md`
- General/flexible → `Workflows/General.md`

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | #0D1B2A | Background base (darkest) |
| Blueprint Blue | #1B2838 | Background secondary |
| Grid Blue | #1E3A5F | Subtle grid lines |
| White | #FFFFFF | Primary text, main line drawings |
| Cyan/Teal | #4ECDC4 | Arrow bullets (→), section headers, key highlights |
| Gold/Amber | #FFD93D | Annotations, witty callouts, emphasis quotes |
| Light Cyan | #7FDBDA | Secondary text, sub-labels |
| Coral/Warning | #FF6B6B | Warnings, critical items, danger highlights |
| Soft Green | #95E77E | Success indicators, positive callouts |

**Color Rules:**
- 60% white for primary text and line drawings on dark blue
- Cyan/teal for structural elements: arrows, headers, connectors, dividers
- Gold for personality: witty annotations, callout quotes, emphasis (sparingly)
- Coral for warnings/critical items (1-2 per image max)
- Grid lines very subtle — visible but not competing with content

---

## Typography Style

**Hand-lettered technical text** — clean but hand-drawn, like an engineer's neat handwriting:

- **Title:** Large, bold hand-lettered in white, often ALL CAPS with slight weight variations
- **Section Headers:** Cyan, bold, with underline — clean engineering header style
- **Body Text:** White, medium size, clear handwritten — legible at all sizes
- **Annotations/Callouts:** Gold, smaller, in quotes — personal voice, slightly tilted or offset
- **Code/Technical:** Monospace-feeling text for specific values, properties, codes

All text should look like someone wrote it with a fine-tip technical pen on a blueprint.

---

## Icon & Illustration Style

**White line drawings — engineering schematic aesthetic:**
- Technical line drawings: monitors, servers, gears, wrenches, documents, databases
- Circuit-board-adjacent but NOT cyberpunk — clean engineering lines
- Dashed and solid connectors between sections
- Corner registration marks (L-shaped corners) framing sections or the whole image
- Small technical symbols: checkmarks in circles, warning triangles, magnifying glasses
- NOT filled/solid shapes — outlines and line art only
- NOT complex 3D — flat schematic style like technical documentation

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
  output_path: "~/Downloads/blueprint-[topic].png"
)
```

**Default aspect ratio:** 1:1 (square) — blueprints are often square or wide

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
| "square", "social" (default) | `aspect_ratio: "1:1"` | Instagram, LinkedIn |
| "portrait", "page" | `aspect_ratio: "4:5"` | LinkedIn carousel, IG posts |

---

## Master Prompt Template

Use this template structure for all BlueprintBoard generations:

```
Engineering blueprint-style infographic on dark navy blue background with subtle grid lines.

STYLE: Engineering blueprint — technical drawing reference sheet aesthetic
- Deep navy/dark blue background (#0D1B2A to #1B2838) throughout
- Subtle grid lines in lighter blue (#1E3A5F) — engineering graph paper feel
- White (#FFFFFF) hand-lettered text — primary content, clear and legible
- Cyan/teal (#4ECDC4) for arrow bullets (→), section headers, structural elements
- Gold/amber (#FFD93D) for witty annotations and callout quotes in quotation marks
- Coral (#FF6B6B) for warnings or critical items (sparingly)
- White line-art illustrations — schematic/technical drawing style, NOT filled shapes
- Dashed lines and connectors between sections
- Corner registration marks (L-shaped) framing the composition
- Engineering title block at bottom-right: title, author, rev, date
- NOT notebook paper, NOT cream/light background
- NOT cyberpunk/neon glow — clean engineering aesthetic
- NOT complex 3D illustrations — flat schematic line art

COMPOSITION:
[Describe the layout - columns, sections, flow]

CONTENT:
[Describe what information to include]

TITLE:
"[TITLE]" - large bold white hand-lettered text, ALL CAPS style
"[Subtitle]" - smaller cyan text below

SECTION HEADERS:
- "[Section 1]" in cyan (#4ECDC4) with icon prefix and underline
- "[Section 2]" in cyan (#4ECDC4) with icon prefix and underline

BODY CONTENT (white text):
→ [Item 1] with small white line-art icon
→ [Item 2] with small white line-art icon
→ [Item 3] with small white line-art icon

GOLD ANNOTATIONS (witty callouts, 3-5 per image):
"[annotation 1]" - gold text, offset near relevant item
"[annotation 2]" - gold text, slight tilt
"[annotation 3]" - gold text, personal voice

TECHNICAL ILLUSTRATIONS:
- [Drawing 1]: white line art [description] near [location]
- [Drawing 2]: white line art [description] near [location]

TITLE BLOCK (bottom-right, engineering style):
DRAWING: [Title]
DRAWN BY: [Author]
TITLE: [Credentials]
REV: [Version] | DATE: [Year]

BOTTOM:
- Left: "[Scope/version info]"
- Center: "[CTA text]"
- Right: Engineering title block

ATTRIBUTION:
- Bottom-right: "@themaximoguys" in warm white text — always include

CRITICAL:
- Dark navy blue background with subtle grid throughout
- White text as primary, cyan for structure, gold for personality
- Engineering line-art illustrations — NOT filled, NOT complex
- Arrow bullets (→) in cyan for all lists
- Gold annotations add humor and personal insight
- Title block attribution at bottom-right
- Clean, technical, professional yet approachable
- Subtle grid lines visible but not competing with content
- Always include @themaximoguys attribution
```

---

## Examples

**Example 1: EAM Survival Guide**
```
User: "create an HxGN EAM survival guide blueprint"
→ Invokes CheatSheet workflow
→ Two-column: End User Tips | Admin/Config Tips
→ Cyan arrows, gold annotations, white line drawings
→ Engineering title block at bottom-right
```

**Example 2: System Architecture**
```
User: "create a blueprint diagram of the MAS architecture"
→ Invokes Architecture workflow
→ Technical schematic with components and connectors
→ White line art boxes with labels, dashed connections
```

**Example 3: Quick Reference**
```
User: "make a blueprint-style keyboard shortcuts reference"
→ Invokes QuickReference workflow
→ Categorized tables with cyan headers and white content
```

---

## Validation Checklist

After generating, verify:

**Must Have:**
- [ ] Dark navy blue background with subtle grid lines
- [ ] White hand-lettered text as primary content
- [ ] Cyan/teal arrow bullets (→) and section headers
- [ ] Gold annotations with personal voice (3-5 per image)
- [ ] White line-art illustrations (schematic style)
- [ ] Engineering title block or attribution at bottom
- [ ] Corner registration marks or framing elements
- [ ] Educational clarity — content readable at a glance

**Must NOT Have:**
- [ ] Light/cream/white backgrounds
- [ ] Notebook paper or lined paper
- [ ] Sticky notes or tape
- [ ] Filled/solid colored shapes (line art only)
- [ ] Cyberpunk neon glow or excessive effects
- [ ] Formal typed fonts
- [ ] Gradient backgrounds
- [ ] Complex 3D illustrations
