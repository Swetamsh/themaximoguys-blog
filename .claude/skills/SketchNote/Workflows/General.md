# General Workflow

**Flexible sketchnote infographic for any content in SketchNote style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the General workflow to create a sketchnote infographic"}' \
  > /dev/null 2>&1 &
```

Running **General** in **SketchNote**...

---

## Purpose

When the content doesn't fit neatly into CheatSheet, Guide, QuickReference, or TipsAndTricks workflows. This is the flexible fallback that maintains the SketchNote aesthetic for any content.

---

## Layout Options

### Single Column
```
+-------------------------------------+
|  [TITLE]                            |
|                                      |
|  → Item 1 with doodle               |
|    [Sticky: annotation]             |
|  → Item 2 with doodle               |
|  → Item 3 with doodle               |
|    [Sticky: annotation]             |
|                                      |
|  [closing thought]                  |
+-------------------------------------+
```

### Grid Layout
```
+-------------------------------------+
|  [TITLE]                            |
|                                      |
|  +---------+    +---------+         |
|  |  Box 1  |    |  Box 2  |         |
|  +---------+    +---------+         |
|                                      |
|  +---------+    +---------+         |
|  |  Box 3  |    |  Box 4  |         |
|  +---------+    +---------+         |
+-------------------------------------+
```

### Mind Map
```
+-------------------------------------+
|                                      |
|           [Branch A]                |
|              /                      |
|  [Branch B] - [CENTER] - [Branch C] |
|              \                      |
|           [Branch D]                |
+-------------------------------------+
```

### Comparison
```
+----------------------------+-----------------------------+
| [LEFT OPTION]              | [RIGHT OPTION]              |
| → point                    | → point                     |
| → point                    | → point                     |
| [Sticky]                   | [Sticky]                    |
+----------------------------+-----------------------------+
```

---

## Universal Prompt Template

```
Hand-drawn sketchnote infographic on lined notebook paper.

CONTENT: [What you're visualizing]

LAYOUT: [Choose appropriate layout from above]

STYLE REQUIREMENTS (MANDATORY):
- Background: Cream lined notebook paper (#F5F0E8) with faint blue ruled lines (#C5D4E8)
- Slightly aged paper edges — torn, dog-eared, authentic
- Text: Dark brown/black (#2D2520) handwritten — ballpoint pen style
- Emphasis: Red (#D94040) underlines, circles on key items
- Bullets: Teal (#2B7A8C) arrow (→) style
- Headers: Blue (#3A6FA0) with underlines and emoji-style icons
- Sticky notes: Tilted, colorful (Yellow #FFF3B0, Pink #FFCEC2, Green #C8F7C5, Blue #C2E0FF)
- Doodles: Simple hand-drawn icons, stick figures, margin sketches
- NOT dark background, NOT typed fonts, NOT digital/clean aesthetic
- NOT marker/chalkboard, NOT gradient, NOT stock photo

COMPOSITION:
[Describe your specific layout and elements]

TITLE:
"[YOUR TITLE]" - large bold hand-lettered with [red/blue] underline

MAIN ELEMENTS:
→ [Element 1]: [description] with [doodle]
→ [Element 2]: [description] with [doodle]
→ [Element 3]: [description] with [doodle]

STICKY NOTE CALLOUTS (2-4):
- Yellow sticky: "[annotation]" — tilted
- Pink sticky: "[pro tip]" — tilted
- Green sticky: "[positive note]" — tilted

RED EMPHASIS:
- Circle around: [most critical item]
- Underline: [important phrase]

BOTTOM:
- Author attribution
- CTA text

CRITICAL CHECKLIST:
- Cream lined notebook paper background
- Hand-drawn/hand-lettered aesthetic
- Arrow bullets and sticky note callouts
- Red emphasis on key items
- Simple doodles — not complex illustrations
- Personal, warm, educational tone
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/sketchnote-[topic].png"
)
```

---

## Validation

- [ ] Cream lined notebook paper background
- [ ] Hand-drawn/hand-lettered text
- [ ] Arrow bullets (→) in teal
- [ ] 2-4 sticky note callouts
- [ ] Red emphasis on key items
- [ ] Simple doodles in margins
- [ ] Personal, educational tone
- [ ] No dark backgrounds, no typed fonts
