# CheatSheet Workflow

**Two-column survival guide / cheat sheet in SketchNote style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the CheatSheet workflow to create a two-column sketchnote"}' \
  > /dev/null 2>&1 &
```

Running **CheatSheet** in **SketchNote**...

---

## Purpose

Create two-column cheat sheets, survival guides, and tips-and-admin style reference pages. This is the signature SketchNote layout — like the "Maximo Survival Guide" reference.

**Classic Examples:**
- Maximo Survival Guide: End User Tips | Admin Tips
- Developer Cheat Sheet: Frontend | Backend
- Day 1 Guide: What to Learn | What to Avoid
- Before/After: Old Way | New Way

---

## Composition Structure

```
+----------------------------------------------------------+
|        [TITLE — large, bold, centered]                    |
|        [Subtitle — smaller, with underline]               |
|   [version/scope tag]           [logo/badge top-right]   |
+----------------------------+-----------------------------+
| [COLUMN HEADER 1]          | [COLUMN HEADER 2]           |
| (a.k.a. subtitle)          | (a.k.a. subtitle)           |
|                             |                              |
| → Tip 1 with doodle        | → Tip 1 with doodle         |
|   [sticky: annotation]     |   [sticky: annotation]      |
|                             |                              |
| → Tip 2 with doodle        | → Tip 2 with doodle         |
|                             |                              |
| → Tip 3 with doodle        | → Tip 3 with doodle         |
|   [sticky: pro tip]        |   [sticky: pro tip]         |
|                             |                              |
| → Tip 4 with doodle        | → Tip 4 with doodle         |
|                             |   [red circle: key item]    |
|                             |                              |
| [Pro tip callout box]       | → Tip 5 with doodle         |
|                             |                              |
+----------------------------+-----------------------------+
| [Source/verified badge]     | [CTA: Save this. Print it.] |
| [Version/scope info]        | [Author + credentials]      |
+----------------------------------------------------------+
```

---

## Color Strategy

- **Title:** Dark brown/black (#2D2520), bold, with red (#D94040) underline
- **Column Headers:** Blue (#3A6FA0) with underline, emoji icon prefix
- **Body Text:** Dark brown/black, handwritten style
- **Arrow Bullets:** Teal (#2B7A8C) arrows (→)
- **Sticky Notes:** Distribute across both columns — mix yellow, pink, green, blue
- **Red Emphasis:** Circle the 1-2 most critical items per column
- **Divider:** Thin hand-drawn line or red rule between columns

---

## Prompt Template

```
Hand-drawn sketchnote cheat sheet infographic on lined notebook paper.

COMPOSITION: Two-column cheat sheet / survival guide layout
- Cream lined notebook paper (#F5F0E8) with faint blue ruled lines (#C5D4E8)
- Slightly aged paper edges, torn corners
- Clear two-column layout with hand-drawn divider line

TITLE (top center, spanning both columns):
"[CHEAT SHEET TITLE]" - large bold hand-lettered text
"[Subtitle]" - smaller text with [red/blue] underline
[Version/scope tag in parentheses below]
[Logo or badge in top-right corner]

LEFT COLUMN "[LEFT HEADER]":
- Section header in blue (#3A6FA0) with [emoji] prefix and underline
- Subtitle: "(a.k.a. [witty description])"
→ [Tip 1]: [Description] with small [icon] doodle
  Yellow sticky note: "[witty annotation]" — tilted right
→ [Tip 2]: [Description] with small [icon] doodle
→ [Tip 3]: [Description] with small [icon] doodle
  Pink sticky note: "[pro tip]" — tilted left
→ [Tip 4]: [Description] with small [icon] doodle
→ [Tip 5]: [Description] with small [icon] doodle

Red circle drawn around [most critical item in left column]

Pro tip callout box at bottom of left column:
"[Important tip that applies to the whole column]"

RIGHT COLUMN "[RIGHT HEADER]":
- Section header in blue (#3A6FA0) with [emoji] prefix and underline
- Subtitle: "(a.k.a. [witty description])"
→ [Tip 1]: [Description] with small [icon] doodle
→ [Tip 2]: [Description] with small [icon] doodle
  Green sticky note: "[annotation]" — tilted right
→ [Tip 3]: [Description] with small [icon] doodle
  Blue sticky note: "[annotation]" — tilted left
→ [Tip 4]: [Description] with small [icon] doodle
→ [Tip 5]: [Description] with small [icon] doodle

Red circle drawn around [most critical item in right column]

BOTTOM (spanning full width):
- Left: "[Source verification badge]" in green
- Left: "[Version/scope info]"
- Center: "[CTA: Save this. Print it. Tape it next to your monitor.]"
- Right: "by [Author Name]" with credentials and [social icon]

DOODLES scattered throughout:
- Small stick figure near [location]
- Computer/screen doodle near [location]
- Book/document doodle near [location]
- Lightbulb or star near key insights

STYLE:
- Cream lined notebook paper background
- Hand-drawn/hand-lettered text — ballpoint pen + occasional thick marker
- Teal arrow (→) bullets throughout
- Colorful tilted sticky notes as callouts (2-4 total)
- Red emphasis: underlines and circles on critical items
- Simple margin doodles — not complex illustrations
- Warm, personal, educational — senior colleague's photocopied notes
- NOT dark background, NOT typed fonts, NOT digital/clean
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR CHEATSHEET PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/sketchnote-cheatsheet-[topic].png"
)
```

---

## Validation

- [ ] Two-column layout is clear and balanced
- [ ] Cream lined notebook paper background
- [ ] Hand-lettered text throughout (not typed)
- [ ] Arrow bullets (→) in teal
- [ ] 2-4 sticky note callouts distributed across columns
- [ ] Red circles/underlines on 2-3 most critical items
- [ ] Column headers with emoji icons and colored underlines
- [ ] Bottom has author attribution and CTA
- [ ] Doodles/sketches scattered in margins
- [ ] Personal tone in annotations ("trust me", "future-you will thank you")
