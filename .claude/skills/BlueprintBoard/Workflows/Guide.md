# Guide Workflow

**Step-by-step tutorial or how-to guide in BlueprintBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Guide workflow to create a step-by-step blueprint visual"}' \
  > /dev/null 2>&1 &
```

Running **Guide** in **BlueprintBoard**...

---

## Purpose

Create numbered step-by-step guides on dark blueprint backgrounds. Single-column flow with numbered steps, technical line-art at each step, and gold annotation callouts.

**Classic Examples:**
- How to Configure Equipment Hierarchy
- 7 Steps to Set Up DataSpy Filters
- Integration Setup Guide
- Migration Checklist

---

## Composition Structure

```
+-------------------------------------+
|  [TITLE — white, ALL CAPS, bold]    |
|  [Subtitle — cyan]                  |
|  [Logo badge top-right]            |
+-------------------------------------+
|                                      |
|  1. [Step Title] — cyan number      |
|     [Description — white text]      |
|     [Line-art doodle]              |
|     "[gold annotation]"            |
|                                      |
|  ---- dashed connector ----         |
|                                      |
|  2. [Step Title]                    |
|     [Description]                   |
|     [Line-art doodle]              |
|                                      |
|  ---- dashed connector ----         |
|                                      |
|  3. [Step Title]                    |
|     [Description]                   |
|     "[gold annotation]"            |
|                                      |
|  ---- dashed connector ----         |
|                                      |
|  4. [Step Title]                    |
|     [Description]                   |
|     [Line-art doodle]              |
|                                      |
|  5. [Final Step — highlighted]      |
|     [Description]                   |
|     "[gold celebration note]"       |
|                                      |
|  [Summary callout box]             |
|  [Title block + CTA]               |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** White, bold, ALL CAPS
- **Step Numbers:** Cyan (#4ECDC4) circled or bold
- **Step Titles:** White, bold
- **Body Text:** White, regular
- **Arrows/Connectors:** Cyan dashed lines between steps
- **Annotations:** Gold (#FFD93D) every 2-3 steps
- **Final Step:** Highlighted with soft green (#95E77E) accent
- **Callout Boxes:** Cyan outline, white text

---

## Prompt Template

```
Engineering blueprint-style step-by-step guide on dark navy blue background with grid lines.

COMPOSITION: Single-column numbered steps tutorial
- Deep navy blue (#0D1B2A) background with subtle grid lines
- Numbered steps flowing top to bottom with dashed connectors
- White line-art illustrations alongside each step

TITLE:
"[GUIDE TITLE]" - large bold white ALL CAPS
"[Subtitle]" - cyan (#4ECDC4) below

STEPS:

1. "[STEP TITLE]" — cyan number, white title
   [Description in white] with white line-art [icon]
   → [Sub-detail in white]
   "[Gold annotation]" — gold (#FFD93D) text

--- dashed cyan connector ---

2. "[STEP TITLE]"
   [Description] with white line-art [icon]
   → [Sub-detail]

--- dashed cyan connector ---

3. "[STEP TITLE]"
   [Description] with white line-art [icon]
   "[Gold annotation]"

--- dashed cyan connector ---

4. "[STEP TITLE]"
   [Description] with white line-art [icon]

--- dashed cyan connector ---

5. "[FINAL STEP]" — soft green (#95E77E) accent
   [Description] with line-art [icon]
   "[Gold celebration annotation]"

SUMMARY BOX:
"[Key takeaway]" — cyan outlined box, white text

TITLE BLOCK (bottom-right):
DRAWING: [Title] | DRAWN BY: [Author] | REV: 1.0

STYLE:
- Dark navy blue background with grid lines throughout
- White text, cyan structure, gold annotations
- White line-art illustrations — schematic style
- Dashed connectors between steps
- Engineering reference aesthetic
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR GUIDE PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/blueprint-guide-[topic].png"
)
```

---

## Validation

- [ ] Numbered steps flow clearly top to bottom
- [ ] Dark navy blue background with grid lines
- [ ] White line-art icons beside each step
- [ ] Cyan dashed connectors between steps
- [ ] Gold annotations every 2-3 steps
- [ ] Final step highlighted with green accent
- [ ] Engineering title block at bottom
- [ ] Content readable at a glance
