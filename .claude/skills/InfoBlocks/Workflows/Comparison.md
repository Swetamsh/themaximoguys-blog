# Comparison Workflow

**Side-by-side or split comparisons with 3D isometric blocks in InfoBlocks style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Comparison workflow to create a side-by-side infographic"}' \
  > /dev/null 2>&1 &
```

Running **Comparison** in **InfoBlocks**...

---

## Purpose

Compare two concepts, approaches, technologies, or states side-by-side.

**Classic Examples:**
- Monolith vs Microservices
- On-Prem vs Cloud
- Manual vs AI-Automated
- Legacy vs Modern Architecture
- Before vs After Migration

---

## Composition Structure

```
+----------------------------------------------------------+
|  [HEADER — comparison title]                              |
|                                                            |
|  +------------------------+  +------------------------+   |
|  |  [3D BLOCK]            |  |  [3D BLOCK]            |   |
|  |  [labeled]             |  |  [labeled]             |   |
|  |                        |  |                        |   |
|  |  OPTION A              |  |  OPTION B              |   |
|  |  * bullet 1            |  |  * bullet 1            |   |
|  |  * bullet 2            |  |  * bullet 2            |   |
|  |  * bullet 3            |  |  * bullet 3            |   |
|  |                        |  |                        |   |
|  |  [Silhouette/icon]     |  |  [Silhouette/icon]     |   |
|  +------------------------+  +------------------------+   |
|                                                            |
|  [Bottom insight or recommendation]                        |
+----------------------------------------------------------+
```

---

## Color Strategy

- **Left panel (older/worse):** Steel Blue (#5B7BA5) blocks — neutral/faded
- **Right panel (newer/better):** Navy Blue (#2D3A5C) blocks with Gold (#C9A84C) accents — premium
- **Header:** Black bold sans-serif
- **Key insight:** Gold accent text
- **Background:** Warm cream (#F5F0E8)

---

## Prompt Template

```
Clean educational comparison infographic on warm cream (#F5F0E8) background.

COMPOSITION: Side-by-side comparison with 3D isometric blocks

HEADER:
"[COMPARISON TITLE]" — bold black sans-serif, centered top

LEFT PANEL "[OPTION A LABEL]":
- 3D Block: Steel Blue (#5B7BA5) isometric platform labeled "[LABEL A]"
- Object on block: [3D rendered object] in muted blue tones
- Sub-header: "[Option A Name]" — bold dark text
- Bullets: [list 3-4 characteristics]
- Mood: neutral, established, traditional

RIGHT PANEL "[OPTION B LABEL]":
- 3D Block: Navy Blue (#2D3A5C) isometric platform labeled "[LABEL B]"
- Object on block: [3D rendered object] with Gold (#C9A84C) accents
- Sub-header: "[Option B Name]" — bold dark text
- Bullets: [list 3-4 characteristics]
- Mood: modern, improved, recommended

BOTTOM INSIGHT:
"[Key takeaway or recommendation]" — clean text with gold accent

STYLE:
- Warm cream background throughout
- 3D isometric rendered blocks — polished, professional
- Clean sans-serif typography
- Corporate-educational aesthetic
- NO dark backgrounds, NO marker/chalk, NO gradients
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR COMPARISON PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/infoblocks-compare-[topic].png"
)
```

---

## Validation

- [ ] Clear side-by-side layout
- [ ] 3D isometric blocks for each option
- [ ] Visual differentiation (steel blue vs navy+gold)
- [ ] Clean sans-serif typography
- [ ] Warm cream background
- [ ] Professional comparison, not biased-looking
