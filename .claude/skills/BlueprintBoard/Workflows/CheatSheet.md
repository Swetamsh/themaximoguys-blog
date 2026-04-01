# CheatSheet Workflow

**Two-column survival guide / cheat sheet in BlueprintBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the CheatSheet workflow to create a two-column blueprint visual"}' \
  > /dev/null 2>&1 &
```

Running **CheatSheet** in **BlueprintBoard**...

---

## Purpose

Create two-column cheat sheets, survival guides, and tips reference pages on dark blueprint backgrounds. The signature layout — like the "HxGN EAM Survival Guide" reference.

**Classic Examples:**
- EAM Survival Guide: End User Tips | Admin/Config Tips
- System Cheat Sheet: Basic Features | Advanced Features
- Day 1 Guide: What to Learn | What to Configure
- Comparison: Standard Config | Custom Development

---

## Composition Structure

```
+----------------------------------------------------------+
|  [speech bubble with confused question]    [LOGO badge]   |
|                                                           |
|        [TITLE — large, bold, white, ALL CAPS]             |
|        [Subtitle — cyan, smaller]                         |
|        [scope tag in parentheses]                         |
|                                                           |
|   [callout box: "If you learn ONE thing..."]              |
|                                                           |
+----------------------------+-----------------------------+
| [COLUMN HEADER 1] cyan     | [COLUMN HEADER 2] cyan      |
| (witty subtitle)           | (witty subtitle)             |
|                             |                              |
| → Tip 1 + white line icon  | → Tip 1 + white line icon   |
|   "gold annotation"        |   "gold annotation"          |
|                             |                              |
| → Tip 2 + white line icon  | → Tip 2 + white line icon   |
|                             |                              |
| → Tip 3 + white line icon  | → Tip 3 + white line icon   |
|   "gold annotation"        |   "gold annotation"          |
|                             |                              |
| → Tip 4 + white line icon  | → Tip 4 + white line icon   |
|                             |                              |
| [Pro tip callout box]       | → Tip 5 + white line icon   |
|                             |   "gold annotation"          |
+----------------------------+-----------------------------+
| [callout box: summary]      | DRAWING: [Title]            |
| [scope/version]             | DRAWN BY: [Author]          |
| [CTA text]                  | REV: 1.0 | DATE: [Year]    |
+----------------------------------------------------------+
```

---

## Color Strategy

- **Title:** White (#FFFFFF), bold, ALL CAPS
- **Subtitle:** Cyan (#4ECDC4)
- **Column Headers:** Cyan with underline, icon prefix
- **Body Text:** White, handwritten style
- **Arrow Bullets:** Cyan (#4ECDC4) arrows (→)
- **Annotations:** Gold (#FFD93D) in quotes — witty, personal
- **Callout Boxes:** Outlined in cyan, text in white, on dark background
- **Critical Warnings:** Coral (#FF6B6B) for 1-2 items max
- **Divider:** Dashed or solid cyan line between columns

---

## Prompt Template

```
Engineering blueprint-style cheat sheet infographic on dark navy blue background with subtle grid lines.

COMPOSITION: Two-column cheat sheet / survival guide layout
- Deep navy blue (#0D1B2A) background with subtle grid lines (#1E3A5F)
- Clear two-column layout with cyan dashed divider line
- Corner registration marks framing the composition

TITLE (top center, spanning both columns):
"[CHEAT SHEET TITLE]" - large bold white hand-lettered text, ALL CAPS
"[Subtitle]" - smaller cyan (#4ECDC4) text with underline
([scope/version info]) in parentheses

[Logo/badge] doodle in top-right corner — white line art

Speech bubble top-left: "[confused question]" with small line-art figure

Callout box below title: "[key insight — if you learn ONE thing...]" — outlined cyan

LEFT COLUMN "[LEFT HEADER]":
- Header in cyan (#4ECDC4) with [icon] prefix and underline
- Subtitle: "(a.k.a. [witty description])" in light cyan

→ [Tip 1]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold (#FFD93D) text offset right
→ [Tip 2]: [Description] with small white line-art [icon]
→ [Tip 3]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text
→ [Tip 4]: [Description] with small white line-art [icon]
→ [Tip 5]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text
→ [Tip 6]: [Description] with small white line-art [icon]
→ [Tip 7]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text
→ [Tip 8]: [Description] with small white line-art [icon]

Pro tip callout box at bottom of left column:
"[Pro tip text]" — outlined in cyan, white text

RIGHT COLUMN "[RIGHT HEADER]":
- Header in cyan (#4ECDC4) with [icon] prefix and underline
- Subtitle: "(a.k.a. [witty description])" in light cyan

→ [Tip 1]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text
→ [Tip 2]: [Description] with small white line-art [icon]
→ [Tip 3]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text
→ [Tip 4]: [Description] with small white line-art [icon]
→ [Tip 5]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text
→ [Tip 6]: [Description] with small white line-art [icon]
→ [Tip 7]: [Description] with small white line-art [icon]
→ [Tip 8]: [Description] with small white line-art [icon]
  "[gold annotation]" — gold text

Summary callout box: "[All standard config. Zero custom dev.]" — outlined

BOTTOM:
- Left: "[Scope/version info]" in light cyan
- Center: "[CTA: Save this. Screenshot it. Send it to your team.]"
- Right: Engineering title block:
  DRAWING: [Title]
  DRAWN BY: [Author]
  TITLE: [Credentials]
  REV: 1.0 | DATE: [Year]

STYLE:
- Dark navy blue background with subtle grid throughout
- White hand-lettered text — clean engineering handwriting
- Cyan arrow bullets, headers, and structural elements
- Gold annotations for humor and insight (5-8 distributed)
- White line-art illustrations beside tips — schematic style
- Dashed connectors and registration marks
- NOT notebook paper, NOT light background, NOT chalk/marker
- Engineering reference sheet feel — professional but personal
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR CHEATSHEET PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/blueprint-cheatsheet-[topic].png"
)
```

---

## Validation

- [ ] Dark navy blue background with visible grid lines
- [ ] Two-column layout clear and balanced
- [ ] White hand-lettered text throughout
- [ ] Cyan arrow bullets (→) and section headers
- [ ] Gold annotations distributed across both columns (5-8 total)
- [ ] White line-art icons beside tips
- [ ] Engineering title block at bottom-right
- [ ] Callout boxes outlined in cyan
- [ ] Corner registration marks or framing
- [ ] Professional yet personal engineering aesthetic
