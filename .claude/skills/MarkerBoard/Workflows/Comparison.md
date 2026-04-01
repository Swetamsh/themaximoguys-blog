# Comparison Workflow

**Side-by-side or split-screen comparisons in MarkerBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Comparison workflow to create a side-by-side marker visual"}' \
  > /dev/null 2>&1 &
```

Running **Comparison** in **MarkerBoard**...

---

## Purpose

Compare two concepts, approaches, or states (before/after, old/new, X vs Y).

**Classic Examples:**
- On-Prem vs Cloud
- Legacy vs Modern
- Manual vs Automated
- Monolith vs Microservices
- Before Migration vs After Migration

---

## Composition Structure

```
+----------------------------------------------------------+
|  [HEADER - contrast statement or title]                   |
+----------------------------+-----------------------------+
|                            |                             |
|    LEFT PANEL              |       RIGHT PANEL           |
|    (Old/Bad/Less)          |       (New/Good/More)       |
|                            |                             |
|  - Bold marker drawing     |   - Bold marker drawing    |
|    showing limitation      |     showing advantage      |
|                            |                             |
|  - Filled marker icon      |   - Filled marker icon     |
|    in warm white           |     with color accent      |
|                            |                             |
|  [Label: outcome]          |   [Label: better outcome]  |
|                            |                             |
+----------------------------+-----------------------------+
|  [Bottom caption or key insight]                         |
+----------------------------------------------------------+
```

---

## Color Strategy

- **Left Panel (worse option):** Warm white marker + Signal Red accent
- **Right Panel (better option):** Warm white marker + Lime Green accent
- **Header:** Warm Amber or warm white for visibility
- **Key insight:** Electric Blue or Violet to pop
- **Divider line:** Bold marker stroke in warm white

---

## Prompt Template

```
Bold marker-art comparison infographic on deep matte black blackboard background.

COMPOSITION: Split-screen comparison with bold marker divider line
- Left side: [WORSE OPTION] - shows [negative outcome]
- Right side: [BETTER OPTION] - shows [positive outcome]
- Clear visual contrast between the two approaches

HEADER (top center spanning both panels):
"[COMPARISON TITLE]" - large bold marker lettering in warm white or Warm Amber

LEFT PANEL "[LEFT LABEL]":
- Background: deep black
- Illustration: [describe] in warm white marker with Signal Red (#EB5757) accent
- Icon/Figure: [describe] bold marker strokes, filled shapes
- Label: "[Left outcome text]" in warm white marker
- Mood: limited, constrained, outdated

RIGHT PANEL "[RIGHT LABEL]":
- Background: deep black
- Illustration: [describe] in warm white marker with Lime Green (#6FCF97) accent
- Icon/Figure: [describe] bold marker strokes, filled shapes
- Key element highlighted in Lime Green marker
- Label: "[Right outcome text]" in Lime Green marker
- Mood: growth, modern, empowered

BOTTOM INSIGHT (spanning full width):
"[Key takeaway]" - bold marker in Electric Blue (#2D9CDB)

STYLE:
- Deep matte black background throughout
- Bold art marker strokes — thick, saturated, confident
- Simple but punchy icons with filled marker color
- Warm white primary, accent colors for meaning
- NO chalk, NO gradients, NO stock photo look
- Marker bleed edges where colors overlap
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR COMPARISON PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/marker-comparison-[topic].png"
)
```

---

## Validation

- [ ] Split composition is clear (left vs right)
- [ ] Visual contrast shows which option is better
- [ ] Green accent on positive/growth elements
- [ ] Bold marker figures and icons (not stick figures)
- [ ] Deep black blackboard background
- [ ] Art marker aesthetic maintained (no chalk)
