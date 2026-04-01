# Concept Workflow

**Single concept explanations and educational diagrams in Dan Koe chalkboard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Concept workflow to explain an idea visually"}' \
  > /dev/null 2>&1 &
```

Running **Concept** in **DanKoeStyle**...

---

## Purpose

Explain a single concept, idea, or principle through visual storytelling.

**Classic Examples:**
- What is leverage?
- The compound effect
- Building digital assets
- The creator flywheel
- Productize yourself

---

## Composition Options

### Option A: Central Concept
```
┌─────────────────────────────────────┐
│          [TITLE]                    │
│                                     │
│      ┌─────────────┐                │
│      │   CENTRAL   │                │
│      │   CONCEPT   │                │
│      │   [icon]    │                │
│      └─────────────┘                │
│       ↙    ↓    ↘                   │
│   [A]    [B]    [C]                 │
│                                     │
│  [Explanatory annotation]           │
└─────────────────────────────────────┘
```

### Option B: Flow/Cause-Effect
```
┌─────────────────────────────────────┐
│          [TITLE]                    │
│                                     │
│  [INPUT] ──→ [PROCESS] ──→ [OUTPUT] │
│                                     │
│  *annotation about the magic*       │
└─────────────────────────────────────┘
```

### Option C: Layered Understanding
```
┌─────────────────────────────────────┐
│          [TITLE]                    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Surface Level              │   │
│  ├─────────────────────────────┤   │
│  │  Deeper Understanding       │   │
│  ├─────────────────────────────┤   │
│  │  Core Truth                 │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Color Strategy

- **Title:** YELLOW for impact
- **Central concept/key element:** GREEN or BLUE highlight
- **Supporting elements:** White chalk
- **Annotations:** PINK for personal voice/insights
- **Arrows/connections:** White or BLUE

---

## Prompt Template

```
Dan Koe-style concept explanation on pure black chalkboard background.

CONCEPT: [What you're explaining]

COMPOSITION: [Choose: Central concept / Flow / Layered]

TITLE:
"[CONCEPT NAME]" - large hand-lettered YELLOW chalk, top of image

MAIN VISUAL:
[Describe the central illustration]
- Primary element: [description] in WHITE chalk with [COLOR] accent
- Supporting elements: [description] in WHITE chalk
- Connections/arrows: [describe flow] in WHITE or BLUE

ANNOTATIONS (Dan Koe's signature "thinking out loud" style):
- "[Insight 1]" - small PINK chalk near relevant element
- "[Insight 2]" - small PINK chalk

ICONS/FIGURES:
- [Icon 1]: [simple description]
- [Icon 2]: [simple description]
- Keep minimal - stick figures, basic shapes only

STYLE:
- Pure black chalkboard background
- Hand-drawn chalk aesthetic - wobbly, organic lines
- White chalk as primary (70%), neon accents (30%)
- Simple iconography - no complex illustrations
- Educational clarity - understand at a glance
- Personal voice in annotations
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR CONCEPT PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/concept-[topic].png"
)
```

---

## Validation

- [ ] Concept is clear within 3 seconds
- [ ] One main idea, not cluttered
- [ ] Yellow title stands out
- [ ] Annotations add personal insight
- [ ] Black chalkboard aesthetic
- [ ] Simple icons only
