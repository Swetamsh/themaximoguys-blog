# QuickReference Workflow

**Compact reference card / command list in SketchNote style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the QuickReference workflow to create a reference card sketchnote"}' \
  > /dev/null 2>&1 &
```

Running **QuickReference** in **SketchNote**...

---

## Purpose

Create compact reference cards, command lists, property tables, and quick-lookup pages. Dense but readable — optimized for "tape this to your monitor" utility.

**Classic Examples:**
- Keyboard Shortcuts Reference
- System Properties to Know
- API Endpoint Quick Reference
- Configuration Values Cheat Sheet
- Error Codes and What They Mean

---

## Composition Structure

```
+-------------------------------------+
|  [TITLE — bold, centered]           |
|  [Subtitle: "Quick Reference"]      |
+-------------------------------------+
|                                      |
|  📌 [CATEGORY 1]                    |
|  ┌─────────────────────────────┐    |
|  │ Item 1 .......... value     │    |
|  │ Item 2 .......... value     │    |
|  │ Item 3 .......... value  ⭐ │    |
|  └─────────────────────────────┘    |
|  [Sticky: "memorize this one"]     |
|                                      |
|  📌 [CATEGORY 2]                    |
|  ┌─────────────────────────────┐    |
|  │ Item 1 .......... value     │    |
|  │ Item 2 .......... value     │    |
|  └─────────────────────────────┘    |
|                                      |
|  📌 [CATEGORY 3]                    |
|  ┌─────────────────────────────┐    |
|  │ Item 1 .......... value     │    |
|  │ Item 2 .......... value     │    |
|  │ Item 3 .......... value     │    |
|  └─────────────────────────────┘    |
|  [Sticky: "this one saves hours"]  |
|                                      |
|  [Bottom: source + CTA]            |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Dark brown/black with red underline
- **Category Headers:** Blue (#3A6FA0) with 📌 or similar marker
- **Table Borders:** Hand-drawn boxes in dark brown
- **Items/Keys:** Dark brown, bold handwritten
- **Values:** Dark brown, regular handwritten, with dotted leaders
- **Starred Items:** Red (#D94040) star or circle on critical ones
- **Sticky Notes:** 2-3 total, pointing to must-know items

---

## Prompt Template

```
Hand-drawn sketchnote quick reference card on lined notebook paper.

COMPOSITION: Compact categorized reference card
- Cream lined notebook paper (#F5F0E8) with faint blue ruled lines
- Grouped into categories with hand-drawn table boxes
- Dense but readable — designed to be printed and posted

TITLE:
"[REFERENCE TITLE]" - large bold hand-lettered with red underline
"Quick Reference" - smaller subtitle

CATEGORIES:

📌 [CATEGORY 1 NAME] — blue (#3A6FA0) header with underline
Hand-drawn box containing:
  [Item 1] .............. [value/description]
  [Item 2] .............. [value/description]
  [Item 3] .............. [value/description] ⭐ (red star = critical)
Yellow sticky note pointing to starred item: "[why this matters]"

📌 [CATEGORY 2 NAME] — blue header with underline
Hand-drawn box containing:
  [Item 1] .............. [value/description]
  [Item 2] .............. [value/description]

📌 [CATEGORY 3 NAME] — blue header with underline
Hand-drawn box containing:
  [Item 1] .............. [value/description]
  [Item 2] .............. [value/description]
  [Item 3] .............. [value/description]
Pink sticky note: "[pro tip about this category]"

RED EMPHASIS:
- Star (⭐) or circle the 2-3 most critical items across all categories
- These are the "memorize these, seriously" items

DOODLES:
- Small doodle beside each category header (relevant icon)
- Margin notes with arrows pointing to key items

BOTTOM:
- Source/version info on left
- "Print this. Pin it. Use it daily." CTA center
- Author on right

STYLE:
- Cream lined notebook paper background
- Hand-lettered text — pen style, not typed
- Hand-drawn table borders (slightly wobbly, authentic)
- Dotted leaders between items and values
- Dense but well-spaced — quick scan friendly
- Red stars/circles on must-know items
- 2-3 sticky note callouts max
- Reference-card utility — not decorative
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR REFERENCE PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/sketchnote-reference-[topic].png"
)
```

---

## Validation

- [ ] Categories clearly grouped with hand-drawn boxes
- [ ] Dense but readable — no wasted space
- [ ] Cream lined notebook paper background
- [ ] Hand-lettered text throughout
- [ ] 2-3 critical items starred/circled in red
- [ ] Sticky notes pointing to must-know items
- [ ] Category headers with icons and colored underlines
- [ ] Designed for "print and post" utility
