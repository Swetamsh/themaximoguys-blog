# Guide Workflow

**Step-by-step tutorial or how-to guide in SketchNote style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Guide workflow to create a step-by-step sketchnote"}' \
  > /dev/null 2>&1 &
```

Running **Guide** in **SketchNote**...

---

## Purpose

Create numbered step-by-step guides, tutorials, and how-to pages. Single-column flow with numbered steps, doodles at each step, and sticky note pro tips.

**Classic Examples:**
- How to Set Up Your First Integration
- 7 Steps to Configure Security Groups
- Your First Day Checklist
- Migration in 5 Steps

---

## Composition Structure

```
+-------------------------------------+
|  [TITLE — bold, centered]           |
|  [Subtitle with scope/context]      |
+-------------------------------------+
|                                      |
|  1️⃣ [Step 1 Title]                  |
|     [Description with doodle]       |
|     [Sticky: pro tip]              |
|                                      |
|  2️⃣ [Step 2 Title]                  |
|     [Description with doodle]       |
|                                      |
|  3️⃣ [Step 3 Title]                  |
|     [Description with doodle]       |
|     [Sticky: gotcha warning]        |
|                                      |
|  4️⃣ [Step 4 Title]                  |
|     [Description with doodle]       |
|                                      |
|  5️⃣ [Step 5 Title]                  |
|     [Description with doodle]       |
|     [Red circle: key outcome]       |
|                                      |
|  [Final callout box / summary]      |
|  [Author + CTA]                     |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Dark brown/black, bold, with red underline
- **Step Numbers:** Blue (#3A6FA0) circled numbers or emoji-style
- **Step Titles:** Dark brown/black, bold hand-lettered
- **Body Text:** Dark brown/black, regular handwritten
- **Arrow Bullets:** Teal (#2B7A8C) for sub-items within steps
- **Sticky Notes:** One every 2-3 steps — alternate colors
- **Red Emphasis:** Circle the final outcome or most critical step
- **Connectors:** Hand-drawn arrows or dotted lines between steps

---

## Prompt Template

```
Hand-drawn sketchnote step-by-step guide on lined notebook paper.

COMPOSITION: Single-column numbered steps tutorial
- Cream lined notebook paper (#F5F0E8) with faint blue ruled lines
- Numbered steps flowing top to bottom
- Doodles alongside each step

TITLE:
"[GUIDE TITLE]" - large bold hand-lettered with red underline
"[Subtitle/scope]" - smaller text below

STEPS:

1. "[STEP TITLE]"
   - Description: [What to do] with small [icon] doodle beside it
   - Sub-items: → [detail 1] → [detail 2]
   Yellow sticky note: "[pro tip for this step]"

2. "[STEP TITLE]"
   - Description: [What to do] with small [icon] doodle
   - Sub-items: → [detail 1]

3. "[STEP TITLE]"
   - Description: [What to do] with small [icon] doodle
   Pink sticky note: "[warning or gotcha]"

4. "[STEP TITLE]"
   - Description: [What to do] with small [icon] doodle
   - Sub-items: → [detail 1] → [detail 2]

5. "[STEP TITLE]" — Red circle around this final step
   - Description: [Final outcome] with small [celebration] doodle
   Green sticky note: "[you did it / what's next]"

CONNECTORS:
- Hand-drawn arrows or dotted lines between steps
- Show flow/progression downward

FINAL BOX:
"[Summary or next steps]" in a hand-drawn box at bottom

BOTTOM:
- "[Author Name]" with credentials
- "[CTA text]"

STYLE:
- Cream lined notebook paper background
- Hand-lettered text throughout
- Numbered steps with circled numbers in blue
- Teal arrow sub-bullets
- Sticky note callouts every 2-3 steps
- Doodles alongside each step
- Red circle on critical step or outcome
- Personal, educational, warm tone
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR GUIDE PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/sketchnote-guide-[topic].png"
)
```

---

## Validation

- [ ] Numbered steps flow clearly top to bottom
- [ ] Each step has a doodle/icon beside it
- [ ] Cream lined notebook paper background
- [ ] Hand-lettered text (not typed)
- [ ] Sticky notes appear every 2-3 steps
- [ ] Red circle on most critical step/outcome
- [ ] Connectors (arrows/lines) show flow between steps
- [ ] Personal tone in annotations
