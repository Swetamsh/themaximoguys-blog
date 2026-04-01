# QuickReference Workflow

**Compact reference card / command list in BlueprintBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the QuickReference workflow to create a blueprint reference card"}' \
  > /dev/null 2>&1 &
```

Running **QuickReference** in **BlueprintBoard**...

---

## Purpose

Create compact reference cards, command lists, property tables, and quick-lookup pages on dark blueprint backgrounds. Dense but readable — engineer's desk reference.

**Classic Examples:**
- Keyboard Shortcuts Reference
- System Properties Quick Reference
- API Endpoint Reference Card
- Configuration Values Cheat Sheet
- Screen Codes & Object Names

---

## Composition Structure

```
+-------------------------------------+
|  [TITLE — white, ALL CAPS]         |
|  [Subtitle — cyan]     [LOGO]      |
+-------------------------------------+
|                                      |
|  ⚡ [CATEGORY 1] — cyan header      |
|  ┌─────────────────────────────┐    |
|  │ Key 1 → Description    [icon]│   |
|  │ Key 2 → Description         │    |
|  │ Key 3 → Description  "gold" │    |
|  └─────────────────────────────┘    |
|                                      |
|  ⚡ [CATEGORY 2] — cyan header      |
|  ┌─────────────────────────────┐    |
|  │ Key 1 → Description         │    |
|  │ Key 2 → Description  "gold" │    |
|  └─────────────────────────────┘    |
|                                      |
|  ⚡ [CATEGORY 3] — cyan header      |
|  ┌─────────────────────────────┐    |
|  │ Key 1 → Description         │    |
|  │ Key 2 → Description         │    |
|  │ Key 3 → Description  "gold" │    |
|  └─────────────────────────────┘    |
|                                      |
|  [Version info]  [Title block]      |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** White, ALL CAPS with cyan underline
- **Category Headers:** Cyan (#4ECDC4) with icon prefix
- **Table Borders:** Cyan dashed or solid lines
- **Keys/Commands:** White, bold — stands out
- **Descriptions:** White, regular weight
- **Arrows:** Cyan (→) between key and description
- **Gold Annotations:** 2-3 total on most important items
- **Coral Highlight:** Circle or highlight 1-2 critical items

---

## Prompt Template

```
Engineering blueprint-style quick reference card on dark navy blue background with grid lines.

COMPOSITION: Compact categorized reference card
- Deep navy blue (#0D1B2A) background with subtle grid lines
- Grouped into categories with cyan-bordered table sections
- Dense but readable — designed to be printed and posted

TITLE:
"[REFERENCE TITLE]" - large white ALL CAPS
"[Subtitle]" - cyan (#4ECDC4) below
[Logo] line art in top-right

CATEGORIES:

⚡ [CATEGORY 1 NAME] — cyan header with icon and underline
Cyan-bordered section containing (white text):
  [Key 1] → [description] with small [icon]
  [Key 2] → [description]
  [Key 3] → [description]  "[gold annotation]"

⚡ [CATEGORY 2 NAME] — cyan header
Cyan-bordered section:
  [Key 1] → [description]
  [Key 2] → [description]  "[gold annotation]"
  [Key 3] → [description]

⚡ [CATEGORY 3 NAME] — cyan header
Cyan-bordered section:
  [Key 1] → [description] — coral (#FF6B6B) highlight = critical
  [Key 2] → [description]
  [Key 3] → [description]  "[gold annotation]"

BOTTOM:
- Left: "[Scope/version info]" in light cyan
- Center: "[CTA text]"
- Right: Title block — DRAWING: [Title] | BY: [Author]

STYLE:
- Dark navy blue background with grid lines
- White text, cyan structure and borders
- Gold annotations on 2-3 key items
- Dense grid layout — reference card utility
- Engineering schematic aesthetic
- NOT notebook paper, NOT light background
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR REFERENCE PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/blueprint-reference-[topic].png"
)
```

---

## Validation

- [ ] Dark navy blue background with grid lines
- [ ] Categories clearly grouped with cyan borders
- [ ] Dense but readable layout
- [ ] White text with cyan arrows between keys and values
- [ ] Gold annotations on 2-3 critical items
- [ ] Engineering title block at bottom
- [ ] Designed for "print and post" utility
