# Comparison Workflow

**Side-by-side or split-screen comparisons in Dan Koe chalkboard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Comparison workflow to create a side-by-side visual"}' \
  > /dev/null 2>&1 &
```

Running **Comparison** in **DanKoeStyle**...

---

## Purpose

Compare two concepts, approaches, or states (before/after, old/new, X vs Y).

**Classic Examples:**
- One-to-One vs One-to-Many
- Linear vs Exponential
- Employee vs Creator
- Consumption vs Production
- Trading time vs Building assets

---

## Composition Structure

```
┌─────────────────────────────────────────────────────────┐
│  [HEADER - contrast statement or title]                 │
├────────────────────────┬────────────────────────────────┤
│                        │                                │
│    LEFT PANEL          │       RIGHT PANEL              │
│    (Old/Bad/Less)      │       (New/Good/More)          │
│                        │                                │
│  - Graph showing       │   - Graph showing              │
│    linear/flat         │     exponential/growth         │
│                        │                                │
│  - Stick figure        │   - Stick figure               │
│    doing repetitive    │     building once              │
│    work                │                                │
│                        │                                │
│  [Label: outcome]      │   [Label: better outcome]      │
│                        │                                │
├────────────────────────┴────────────────────────────────┤
│  [Bottom caption or key insight]                        │
└─────────────────────────────────────────────────────────┘
```

---

## Color Strategy

- **Left Panel (worse option):** White chalk only, or with red/orange accent
- **Right Panel (better option):** White chalk with GREEN accent to show "good"
- **Header:** YELLOW or WHITE for visibility
- **Key insight:** PINK or YELLOW to pop

---

## Prompt Template

```
Dan Koe-style comparison infographic on pure black chalkboard background.

COMPOSITION: Split-screen comparison
- Left side: [WORSE OPTION] - shows [negative outcome]
- Right side: [BETTER OPTION] - shows [positive outcome]
- Clear visual contrast between the two approaches

HEADER (top center or top spanning both panels):
"[COMPARISON TITLE]" - large hand-lettered yellow chalk

LEFT PANEL "[LEFT LABEL]":
- Background: black
- Graph: [describe - linear line, flat, etc.] in white chalk
- Icon/Figure: [describe - stick figure doing X] in white chalk
- Label below: "[Left outcome text]" in white chalk
- Mood: limited, repetitive, trapped

RIGHT PANEL "[RIGHT LABEL]":
- Background: black
- Graph: [describe - exponential curve, upward, etc.] in white chalk with GREEN accent on the curve
- Icon/Figure: [describe - stick figure doing Y] in white chalk
- Key element: [describe asset/leverage element] highlighted in GREEN
- Label below: "[Right outcome text]" in GREEN chalk
- Mood: growth, freedom, leverage

BOTTOM INSIGHT (spanning full width):
"[Key takeaway]" - hand-lettered in PINK chalk

STYLE:
- Pure black background throughout
- Hand-drawn chalk aesthetic - wobbly lines, imperfect
- Simple stick figures and basic line graphs
- White chalk primary, GREEN for positive outcomes, PINK/YELLOW for emphasis
- No gradients, no shading, educational clarity
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR COMPARISON PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/comparison-[topic].png"
)
```

---

## Validation

- [ ] Split composition is clear (left vs right)
- [ ] Visual contrast shows which option is better
- [ ] Green accent on positive/growth elements
- [ ] Simple stick figures and graphs
- [ ] Black chalkboard background
- [ ] Hand-drawn aesthetic maintained
