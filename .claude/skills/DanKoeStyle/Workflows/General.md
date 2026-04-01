# General Workflow

**Flexible chalkboard infographic for any content in Dan Koe style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the General workflow to create a chalkboard infographic"}' \
  > /dev/null 2>&1 &
```

Running **General** in **DanKoeStyle**...

---

## Purpose

When the content doesn't fit neatly into Comparison, Concept, Business, or Process workflows. This is the flexible fallback that maintains Dan Koe aesthetic for any content.

---

## Approach

1. **Analyze the content** - What are the key elements to visualize?
2. **Choose a layout** - Based on content structure
3. **Apply the aesthetic** - Black background, chalk style, neon accents
4. **Maintain simplicity** - Dan Koe style is minimal, not busy

---

## Layout Options

### Grid Layout
```
┌─────────────────────────────────────┐
│  [TITLE]                            │
│                                     │
│  ┌─────────┐    ┌─────────┐        │
│  │  Item 1 │    │  Item 2 │        │
│  └─────────┘    └─────────┘        │
│                                     │
│  ┌─────────┐    ┌─────────┐        │
│  │  Item 3 │    │  Item 4 │        │
│  └─────────┘    └─────────┘        │
└─────────────────────────────────────┘
```

### List Layout
```
┌─────────────────────────────────────┐
│  [TITLE]                            │
│                                     │
│  • Item 1 with icon                 │
│  • Item 2 with icon                 │
│  • Item 3 with icon                 │
│  • Item 4 with icon                 │
│                                     │
│  *closing thought*                  │
└─────────────────────────────────────┘
```

### Mind Map Layout
```
┌─────────────────────────────────────┐
│                                     │
│           [Branch A]                │
│              ↗                      │
│  [Branch B] ← [CENTER] → [Branch C] │
│              ↘                      │
│           [Branch D]                │
│                                     │
└─────────────────────────────────────┘
```

### Quote/Statement Layout
```
┌─────────────────────────────────────┐
│                                     │
│  "[BIG QUOTE OR STATEMENT]"         │
│                                     │
│         — attribution               │
│                                     │
│  *supporting thought*               │
│                                     │
└─────────────────────────────────────┘
```

---

## Universal Prompt Template

```
Dan Koe-style chalkboard infographic on pure black background.

CONTENT: [What you're visualizing]

LAYOUT: [Choose appropriate layout from above]

STYLE REQUIREMENTS (MANDATORY):
- Background: Pure black (#000000) - like a chalkboard
- Lines: Hand-drawn chalk/marker style - wobbly, organic, NOT computer-perfect
- Primary color: WHITE chalk (70% of visual elements)
- Accent colors: Pick 2-3 from [YELLOW #FFE066, PINK #FF6B9D, GREEN #7FD858, BLUE #58D8D8]
- Typography: Casual hand-lettered - like someone wrote on chalkboard
- Icons: Simple line drawings - stick figures, basic shapes, no detail
- No gradients, no shading, just chalk outlines

COMPOSITION:
[Describe your specific layout and elements]

TITLE:
"[YOUR TITLE]" - large hand-lettered [YELLOW/WHITE] chalk

MAIN ELEMENTS:
- [Element 1]: [description] in [color] chalk
- [Element 2]: [description] in [color] chalk
- [Element 3]: [description] in [color] chalk

ANNOTATIONS (the "thinking out loud" Dan Koe signature):
- "[Personal insight]" - small PINK chalk
- "[Additional thought]" - small PINK chalk

VISUAL HIERARCHY:
1. Title (biggest, brightest)
2. Main elements (medium, clear)
3. Annotations (smallest, personal voice)

CRITICAL CHECKLIST:
- Black background (not gray, not dark blue - BLACK)
- Chalk texture feel
- Imperfect hand-drawn lines
- Simple iconography
- Clear educational message
- Maximum 3 accent colors
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/dankoe-[topic].png"
)
```

---

## Validation

- [ ] Pure black background
- [ ] Hand-drawn chalk aesthetic
- [ ] White as primary (70%)
- [ ] Maximum 3 accent colors used
- [ ] Simple icons, no complex art
- [ ] Typography looks hand-lettered
- [ ] Message clear at a glance
- [ ] Has that "Dan Koe" feel
