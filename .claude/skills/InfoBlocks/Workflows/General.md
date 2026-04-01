# General Workflow

**Flexible infographic layout for any content in InfoBlocks style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the General workflow to create an educational infographic"}' \
  > /dev/null 2>&1 &
```

Running **General** in **InfoBlocks**...

---

## Purpose

When the content doesn't fit neatly into StackedLayers, Comparison, Concept, or Process workflows. This is the flexible fallback that maintains the InfoBlocks aesthetic for any content.

---

## Approach

1. **Analyze the content** — What are the key elements to visualize?
2. **Choose a layout** — Based on content structure
3. **Apply the aesthetic** — Cream background, 3D blocks, navy/gold palette
4. **Maintain professionalism** — InfoBlocks style is polished and corporate-educational

---

## Layout Options

### Grid Layout
```
+-------------------------------------+
|  [TITLE]                            |
|                                     |
|  [3D Block 1]    [3D Block 2]      |
|  [label]         [label]           |
|  * desc          * desc            |
|                                     |
|  [3D Block 3]    [3D Block 4]      |
|  [label]         [label]           |
|  * desc          * desc            |
+-------------------------------------+
```

### Hub and Spoke
```
+-------------------------------------+
|  [TITLE]                            |
|                                     |
|        [Block]                      |
|       /   |   \                     |
|   [Block][Block][Block]             |
|                                     |
|  * explanation                      |
+-------------------------------------+
```

### Feature List
```
+-------------------------------------+
|  [TITLE]                            |
|                                     |
|  [3D Block]  Feature 1 title        |
|  [label]     * description          |
|                                     |
|  [3D Block]  Feature 2 title        |
|  [label]     * description          |
|                                     |
|  [3D Block]  Feature 3 title        |
|  [label]     * description          |
+-------------------------------------+
```

### Quote/Statement
```
+-------------------------------------+
|                                     |
|  "[KEY STATEMENT]"                  |
|                                     |
|  [3D block illustration]            |
|                                     |
|  * supporting context               |
+-------------------------------------+
```

---

## Universal Prompt Template

```
Clean educational infographic on warm cream (#F5F0E8) background.

CONTENT: [What you're visualizing]

LAYOUT: [Choose appropriate layout from above]

STYLE REQUIREMENTS (MANDATORY):
- Background: Warm cream (#F5F0E8) — clean, professional
- 3D Blocks: Navy Blue (#2D3A5C) and Steel Blue (#5B7BA5) isometric platforms
- Accents: Gold/Amber (#C9A84C) for labels, arrows, highlights
- Typography: Clean bold sans-serif — equation style for headers
- Objects: 3D rendered items sitting on labeled platforms
- Shadows: Subtle drop shadows beneath blocks
- NO dark backgrounds, NO marker strokes, NO chalk texture
- NO gradients, NO constellation dots, NO cyberpunk/neon
- NO hand-lettered text

COMPOSITION:
[Describe your specific layout and elements]

TITLE:
"[YOUR TITLE]" — bold black sans-serif

MAIN ELEMENTS:
- [Block 1]: Navy blue 3D platform labeled "[NAME]" with [object] on top
- [Block 2]: Steel blue 3D platform labeled "[NAME]" with [object] on top
- [Connections]: Gold arrows or lines showing relationships

TEXT:
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]

VISUAL HIERARCHY:
1. Title (largest, boldest)
2. 3D blocks with labels (visual anchor)
3. Bullet text (supporting detail)
4. Connecting elements (arrows, lines)
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/infoblocks-[topic].png"
)
```

---

## Validation

- [ ] Warm cream background
- [ ] 3D isometric blocks with labels
- [ ] Navy/steel blue + gold color palette
- [ ] Clean sans-serif typography
- [ ] Professional corporate-educational tone
- [ ] Message clear at a glance
- [ ] No dark backgrounds, no marker/chalk, no gradients
