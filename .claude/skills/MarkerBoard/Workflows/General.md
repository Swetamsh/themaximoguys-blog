# General Workflow

**Flexible marker-art infographic for any content in MarkerBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the General workflow to create a marker-art infographic"}' \
  > /dev/null 2>&1 &
```

Running **General** in **MarkerBoard**...

---

## Purpose

When the content doesn't fit neatly into Comparison, Concept, Business, or Process workflows. This is the flexible fallback that maintains the MarkerBoard aesthetic for any content.

---

## Approach

1. **Analyze the content** — What are the key elements to visualize?
2. **Choose a layout** — Based on content structure
3. **Apply the aesthetic** — Deep black background, bold marker strokes, vibrant accents
4. **Maintain boldness** — MarkerBoard style is confident and punchy, not tentative

---

## Layout Options

### Grid Layout
```
+-------------------------------------+
|  [TITLE]                            |
|                                     |
|  +---------+    +---------+         |
|  |  Item 1 |    |  Item 2 |         |
|  +---------+    +---------+         |
|                                     |
|  +---------+    +---------+         |
|  |  Item 3 |    |  Item 4 |         |
|  +---------+    +---------+         |
+-------------------------------------+
```

### List Layout
```
+-------------------------------------+
|  [TITLE]                            |
|                                     |
|  * Item 1 with bold marker icon     |
|  * Item 2 with bold marker icon     |
|  * Item 3 with bold marker icon     |
|  * Item 4 with bold marker icon     |
|                                     |
|  *closing thought*                  |
+-------------------------------------+
```

### Mind Map Layout
```
+-------------------------------------+
|                                     |
|           [Branch A]                |
|              /                      |
|  [Branch B] - [CENTER] - [Branch C] |
|              \                      |
|           [Branch D]                |
|                                     |
+-------------------------------------+
```

### Quote/Statement Layout
```
+-------------------------------------+
|                                     |
|  "[BIG QUOTE OR STATEMENT]"        |
|                                     |
|         -- attribution              |
|                                     |
|  *supporting thought*              |
|                                     |
+-------------------------------------+
```

---

## Universal Prompt Template

```
Bold marker-art infographic on deep matte black blackboard background.

CONTENT: [What you're visualizing]

LAYOUT: [Choose appropriate layout from above]

STYLE REQUIREMENTS (MANDATORY):
- Background: Deep matte black (#0A0A0A) — premium blackboard surface
- Lines: Bold art marker strokes — thick, saturated, confident, slight ink bleed
- Primary color: Warm WHITE marker (#F5F5F5) (60% of visual elements)
- Accent colors: Pick 2-3 from [Electric Blue #2D9CDB, Signal Red #EB5757, Lime Green #6FCF97, Warm Amber #F2994A, Violet #BB6BD9]
- Typography: Bold hand-lettered marker style — thick strokes, confident baseline
- Icons: Bold marker drawings — filled shapes, thick outlines, punchy not delicate
- NO chalk texture, NO gradients, NO stock photo aesthetic
- NO constellation dots, NO floating particles, NO circuit boards
- Marker bleed edges where colors meet for authenticity

COMPOSITION:
[Describe your specific layout and elements]

TITLE:
"[YOUR TITLE]" - large bold marker lettering in [Warm Amber/warm white]

MAIN ELEMENTS:
- [Element 1]: [description] in [color] marker
- [Element 2]: [description] in [color] marker
- [Element 3]: [description] in [color] marker

ANNOTATIONS (personal insight voice):
- "[Personal insight]" - smaller bold marker in Violet
- "[Additional thought]" - smaller bold marker in Violet

VISUAL HIERARCHY:
1. Title (biggest, boldest marker strokes)
2. Main elements (medium, clear marker fill)
3. Annotations (smallest, but still confident marker)

CRITICAL CHECKLIST:
- Deep black background (not gray, not gradient — BLACK)
- Bold marker stroke feel (not chalk, not digital)
- Saturated vibrant pigment colors
- Simple but punchy iconography
- Clear educational message
- Maximum 3 accent colors
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/marker-[topic].png"
)
```

---

## Validation

- [ ] Deep matte black background
- [ ] Bold art marker aesthetic (NOT chalk)
- [ ] Warm white as primary (60%)
- [ ] Maximum 3 accent colors used
- [ ] Punchy marker icons, not delicate
- [ ] Typography looks bold hand-lettered marker
- [ ] Message clear at a glance
- [ ] No gradients, no stock photo feel
