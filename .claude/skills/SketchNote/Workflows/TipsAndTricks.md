# TipsAndTricks Workflow

**Scattered tips with callouts and doodles in SketchNote style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the TipsAndTricks workflow to create a tips sketchnote"}' \
  > /dev/null 2>&1 &
```

Running **TipsAndTricks** in **SketchNote**...

---

## Purpose

Create pages of tips, tricks, and lessons learned — more free-form than a cheat sheet, with tips scattered across the page with connecting doodles and callouts. Think "10 Things I Wish I Knew" or "Tips Nobody Told You."

**Classic Examples:**
- 10 Things I Wish I Knew About Maximo
- Tips Nobody Told You on Day 1
- Lessons Learned the Hard Way
- What I'd Tell My Past Self
- Hidden Features You're Missing

---

## Composition Structure

```
+-------------------------------------+
|  [TITLE — bold, attention-grabbing]  |
|  [Subtitle — personal, relatable]   |
+-------------------------------------+
|                                      |
|  💡 [Tip 1 — prominent, top]        |
|     [description + doodle]          |
|                                      |
|  💡 [Tip 2]    [Sticky: lesson]     |
|     [description + doodle]          |
|                                      |
|  💡 [Tip 3]                         |
|     [description + doodle]          |
|        [Red circle on key part]     |
|                                      |
|  💡 [Tip 4]    [Sticky: warning]    |
|     [description + doodle]          |
|                                      |
|  💡 [Tip 5 — the big one]           |
|     [description + bigger doodle]   |
|     [Sticky: "this changes          |
|      everything"]                   |
|                                      |
|  [Callout box: closing thought]     |
|  [Author + CTA]                     |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Dark brown/black with red underline, possibly playful
- **Tip Numbers/Icons:** Teal (#2B7A8C) lightbulb or number
- **Body Text:** Dark brown/black handwritten
- **Sticky Notes:** 3-4 distributed — personal lessons, warnings, celebrations
- **Red Emphasis:** Circle the biggest "aha" tip
- **Connecting Elements:** Hand-drawn arrows linking related tips

---

## Prompt Template

```
Hand-drawn sketchnote tips page on lined notebook paper.

COMPOSITION: Free-form tips and tricks layout
- Cream lined notebook paper (#F5F0E8) with faint blue ruled lines
- Tips scattered across the page with doodles and callouts
- More organic/casual than a structured cheat sheet

TITLE:
"[TIPS TITLE]" - large bold hand-lettered, fun/attention-grabbing
"[Subtitle — personal/relatable]" - smaller with [red] underline

TIPS:

💡 Tip 1: "[TIP TITLE]"
   [Description] with [icon] doodle beside it
   → [Sub-detail if needed]

💡 Tip 2: "[TIP TITLE]"
   [Description] with [icon] doodle
   Yellow sticky note: "[personal lesson learned]" — tilted

💡 Tip 3: "[TIP TITLE]"
   [Description] with [icon] doodle
   Red circle drawn around the key phrase
   → [Sub-detail]

💡 Tip 4: "[TIP TITLE]"
   [Description] with [icon] doodle
   Pink sticky note: "[warning from experience]" — tilted

💡 Tip 5: "[TIP TITLE — THE BIG ONE]"
   [Description] — slightly larger treatment, more visual space
   [Bigger doodle/illustration for this tip]
   Green sticky note: "[this changes everything]" — prominent

CONNECTING ELEMENTS:
- Hand-drawn arrows linking related tips
- Dotted lines or brackets grouping themes
- Small stars next to the best tips

CLOSING:
Hand-drawn box: "[Summary thought or call to action]"
Stick figure at bottom [reacting to the tips]

BOTTOM:
- "[Author Name]" with credentials
- "[CTA: Share with someone who needs this]"

STYLE:
- Cream lined notebook paper background
- Hand-lettered throughout — casual, personal
- Teal lightbulb or number icons for each tip
- Sticky notes as personal commentary (3-4 max)
- Red circles on 1-2 key "aha" moments
- Doodles scattered throughout — margin sketches
- More organic/playful than structured
- Voice: "things I learned the hard way so you don't have to"
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR TIPS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/sketchnote-tips-[topic].png"
)
```

---

## Validation

- [ ] Tips are visually distinct and scannable
- [ ] Cream lined notebook paper background
- [ ] Hand-lettered text throughout
- [ ] 3-4 sticky notes with personal voice
- [ ] At least one tip gets the "big one" treatment
- [ ] Red circle on the most critical insight
- [ ] Doodles and margin sketches add personality
- [ ] Casual, personal tone — not corporate
- [ ] Connecting elements link related tips
