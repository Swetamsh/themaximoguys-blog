---
name: SketchNote
description: Notebook-paper sketchnote infographics with handwritten text, sticky notes, doodles, and arrows on lined paper. USE WHEN user wants survival guide, cheat sheet, tips page, quick reference, study notes, notebook-style infographic, sketchnote visual, hand-drawn notes, tips nobody told you, day 1 guide.
---

# SketchNote Skill

Create **notebook-paper sketchnote infographics** — educational visuals that look like someone's hand-drawn study notes on lined paper. Sticky note callouts, arrow bullets, hand-drawn doodles, red emphasis marks, and a warm personal tone.

## Core Aesthetic

**The SketchNote Style:**
- **Background:** Cream/off-white lined notebook paper (#F5F0E8) with faint blue horizontal ruled lines (#C5D4E8). Slightly aged, torn, or dog-eared edges for authenticity
- **Text Style:** Handwritten/hand-lettered — mix of bold headers, medium body text, and small annotation text. NOT typed fonts — looks like someone wrote this by hand
- **Arrow Bullets:** Teal/blue arrows (→) as primary bullet style, NOT dots or dashes
- **Sticky Notes:** Tilted colored sticky note callouts with handwritten annotations — Yellow (#FFF3B0), Pink/Salmon (#FFCEC2), Light Green (#C8F7C5), Light Blue (#C2E0FF)
- **Red Emphasis:** Red (#D94040) underlines, circles around key items, exclamation marks
- **Doodles:** Simple hand-drawn icons, stick figures, small illustrations (computers, books, tools, warning signs, lightbulbs)
- **Sections:** Clear section headers with colored underlines or banner-style dividers
- **Feel:** Personal, casual, educational — like a senior colleague's actual notebook that they photocopied for you

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the SketchNote skill to create notebook-style infographics"}' \
  > /dev/null 2>&1 &
```

Running **SketchNote** skill...

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
- Tips & tricks with scattered callouts → `Workflows/TipsAndTricks.md`
- General/flexible → `Workflows/General.md`

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Paper Cream | #F5F0E8 | Background base (warm off-white paper) |
| Ruled Lines | #C5D4E8 | Faint horizontal notebook lines |
| Dark Brown/Black | #2D2520 | Primary handwritten text |
| Red Emphasis | #D94040 | Underlines, circles, key highlights |
| Teal Arrow | #2B7A8C | Arrow bullets (→), secondary emphasis |
| Section Blue | #3A6FA0 | Section headers, divider lines |
| Sticky Yellow | #FFF3B0 | Yellow sticky note callouts |
| Sticky Pink | #FFCEC2 | Pink/salmon sticky note callouts |
| Sticky Green | #C8F7C5 | Green sticky note callouts |
| Sticky Blue | #C2E0FF | Blue sticky note callouts |

**Color Rules:**
- 70% dark brown/black handwritten text on cream paper
- Sticky notes used sparingly for witty annotations and pro tips (2-4 per image max)
- Red emphasis for 2-3 truly important items — NOT everything
- Teal arrows as consistent bullet style throughout

---

## Typography Style

**Handwritten notebook text** — NOT formal fonts, NOT marker strokes:

- **Title:** Large, bold hand-lettered text, often with a colored underline or banner
- **Section Headers:** Medium-large, bold with underline or emoji-style icon prefix
- **Body Text:** Medium handwritten, clear and legible
- **Annotations/Sticky Notes:** Smaller, slightly tilted, personal voice ("future-you will thank you", "trust me on this one")

All text should look like someone wrote it with a ballpoint pen and occasionally a thicker marker for emphasis.

---

## Icon & Doodle Style

**Simple hand-drawn notebook doodles:**
- Stick figures with minimal detail (but expressive — thumbs up, scratching head, pointing)
- Simple line-drawn icons: computers, books, gears, lightbulbs, warning triangles, checkmarks
- Small emoji-style faces and symbols scattered near text
- Red circles drawn around important items (like circling "Alt+G" on a keyboard shortcut)
- Small stars, arrows, and underlines for emphasis
- Simple cartoon characters when needed: mascots, workers in hard hats, robot helpers — friendly and approachable
- NOT photorealistic illustrations — think margin doodles and simple cartoons

---

## Image Generation

**Default model:** Pro tier via the **Nano Banana MCP server**

**Tool:** Use the `mcp__nanobanana__generate_image` MCP tool:

```
mcp__nanobanana__generate_image(
  prompt: "[PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/sketchnote-[topic].png"
)
```

**Default aspect ratio:** 4:5 (portrait) — sketchnotes are typically tall/portrait like a notebook page

### Rendering Modes

| User Says | Prompt Prefix | Effect |
|-----------|---------------|--------|
| (default) | "Hand-drawn sketchnote infographic on lined notebook paper background." | Flat/illustrated paper look |
| "photorealistic", "real paper", "3D", "desk" | "Photorealistic photograph of a hand-drawn sketchnote on lined notebook paper, lying on a wooden desk surface. Paper has real shadows, depth, torn edges, coffee ring stains. Shot from above at slight angle." | 3D paper-on-desk look with real shadows and depth |

When user requests "photorealistic" or "real paper" mode, prepend the photorealistic prompt prefix instead of the flat version. This produces a more tangible, physical feel — like someone photographed their actual notes on a desk.

### Size Options

| User Says | Parameter | Resolution |
|-----------|-----------|------------|
| "draft", "preview" | `resolution: "1k"` | Quick iterations |
| (default) | `resolution: "2k"` | Standard output |
| "high res", "print" | `resolution: "4k"` | Maximum resolution |

### Aspect Ratio

| User Says | Parameter | Use Case |
|-----------|-----------|----------|
| "wide", "slide" | `aspect_ratio: "16:9"` | Presentations |
| "square", "social" | `aspect_ratio: "1:1"` | Instagram square |
| "portrait", "page" (default) | `aspect_ratio: "4:5"` | Notebook page, LinkedIn |
| "full page" | `aspect_ratio: "3:4"` | Full page feel |

---

## Master Prompt Template

Use this template structure for all SketchNote generations:

```
Hand-drawn sketchnote infographic on lined notebook paper background.

STYLE: Notebook sketchnote — hand-drawn study notes aesthetic
- Cream/off-white paper (#F5F0E8) with faint blue horizontal ruled lines (#C5D4E8)
- Slightly aged paper edges — torn corners, dog-eared, coffee ring stain optional
- Dark brown/black (#2D2520) handwritten text — ballpoint pen style
- Red (#D94040) for emphasis: underlines, circles around key items, exclamation marks
- Teal (#2B7A8C) arrow bullets (→) as primary list markers
- Blue (#3A6FA0) section headers with underlines
- Colorful tilted sticky note callouts with handwritten annotations:
  - Yellow (#FFF3B0), Pink (#FFCEC2), Green (#C8F7C5), Blue (#C2E0FF)
  - Sticky notes at slight angles, look pasted on the page
  - Personal voice: witty, helpful, like advice from a colleague
- Simple hand-drawn doodles: stick figures, small icons, margin sketches
- Red circles drawn around critical items
- NOT typed/formal fonts — everything hand-lettered
- NOT digital/clean — warm, personal, slightly messy like real notes
- NOT dark/moody background — bright cream paper

COMPOSITION:
[Describe the layout - columns, sections, flow]

CONTENT:
[Describe what information to include]

TITLE:
"[TITLE]" - large bold hand-lettered text with [red/blue] underline

SECTION HEADERS:
- "[Section 1]" with [emoji icon] prefix and colored underline
- "[Section 2]" with [emoji icon] prefix and colored underline

BODY CONTENT:
→ [Tip/item 1] with small doodle
→ [Tip/item 2] with small doodle
→ [Tip/item 3] with small doodle

STICKY NOTE CALLOUTS (2-4 max):
- Yellow sticky: "[witty annotation]" — tilted slightly right
- Pink sticky: "[pro tip]" — tilted slightly left
- Green sticky: "[positive reinforcement]" — tilted slightly right

DOODLES & EMBELLISHMENTS:
- [Doodle 1]: small [description] near [location]
- [Doodle 2]: stick figure [doing something] near [location]
- Red circle around: [critical item]

BOTTOM:
- Author attribution or source line
- "Save this. Print it. Tape it to your monitor." type CTA

ATTRIBUTION:
- Bottom-right: "@themaximoguys" in dark brown handwritten text — always include

CRITICAL:
- Cream lined notebook paper background throughout
- Hand-drawn/hand-lettered aesthetic — NOT typed, NOT digital
- Sticky notes as callouts — tilted, colorful, personal voice
- Arrow bullets (→) as list style
- Red emphasis used sparingly for maximum impact
- Warm, personal, educational feel — like colleague's notes
- Simple doodles in margins — not complex illustrations
- Always include @themaximoguys attribution
```

---

## Examples

**Example 1: Survival Guide / Cheat Sheet**
```
User: "create a Maximo survival guide cheat sheet"
→ Invokes CheatSheet workflow
→ Two-column layout: End User Tips | Admin Tips
→ Arrow bullets, sticky note callouts, red circles on key shortcuts
```

**Example 2: Step-by-Step Guide**
```
User: "create a visual guide for setting up Maximo integrations"
→ Invokes Guide workflow
→ Numbered steps with doodles and sticky note pro tips
```

**Example 3: Quick Reference**
```
User: "make a keyboard shortcuts reference card"
→ Invokes QuickReference workflow
→ Compact grid/table layout with red circles on most important ones
```

---

## Validation Checklist

After generating, verify:

**Must Have:**
- [ ] Cream lined notebook paper background
- [ ] Hand-drawn/hand-lettered text aesthetic
- [ ] Teal arrow bullets (→) for lists
- [ ] At least 2 colored sticky note callouts
- [ ] Red emphasis marks (underlines, circles) on key items
- [ ] Simple doodles and margin sketches
- [ ] Educational clarity — tips readable at a glance
- [ ] Personal/casual tone in annotations

**Must NOT Have:**
- [ ] Dark/black backgrounds
- [ ] Formal typed fonts
- [ ] Gradient backgrounds
- [ ] Complex detailed illustrations
- [ ] Digital/clean/sterile aesthetic
- [ ] Marker/chalk board style
- [ ] Stock photo look
- [ ] More than 4 sticky notes (cluttered)
