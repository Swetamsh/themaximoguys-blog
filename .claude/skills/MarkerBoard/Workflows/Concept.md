# Concept Workflow

**Single concept explanations and educational diagrams in MarkerBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Concept workflow to explain an idea with marker art"}' \
  > /dev/null 2>&1 &
```

Running **Concept** in **MarkerBoard**...

---

## Purpose

Explain a single concept, idea, or principle through visual storytelling.

**Classic Examples:**
- What is cloud-native?
- The migration paradigm shift
- Identity crisis in platform transitions
- Building vs maintaining
- Digital transformation explained

---

## Composition Options

### Option A: Central Concept
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|      +---------------+              |
|      |   CENTRAL     |              |
|      |   CONCEPT     |              |
|      |   [icon]      |              |
|      +---------------+              |
|       /     |      \                |
|   [A]     [B]     [C]              |
|                                     |
|  [Explanatory annotation]          |
+-------------------------------------+
```

### Option B: Flow/Cause-Effect
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|  [INPUT] --> [PROCESS] --> [OUTPUT] |
|                                     |
|  *annotation about the key insight* |
+-------------------------------------+
```

### Option C: Layered Understanding
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|  +-------------------------------+ |
|  |  Surface Level                | |
|  +-------------------------------+ |
|  |  Deeper Understanding         | |
|  +-------------------------------+ |
|  |  Core Truth                   | |
|  +-------------------------------+ |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Warm Amber (#F2994A) for impact
- **Central concept/key element:** Electric Blue (#2D9CDB) highlight
- **Supporting elements:** Warm white marker
- **Annotations:** Violet (#BB6BD9) for personal voice/insights
- **Arrows/connections:** Warm white or Electric Blue

---

## Prompt Template

```
Bold marker-art concept explanation on deep matte black blackboard background.

CONCEPT: [What you're explaining]

COMPOSITION: [Choose: Central concept / Flow / Layered]

TITLE:
"[CONCEPT NAME]" - large bold marker lettering in Warm Amber (#F2994A)

MAIN VISUAL:
[Describe the central illustration]
- Primary element: [description] in warm white marker with Electric Blue (#2D9CDB) accent
- Supporting elements: [description] in warm white marker
- Connections/arrows: [describe flow] in warm white or Electric Blue

ANNOTATIONS (personal insight voice):
- "[Insight 1]" - smaller bold marker in Violet (#BB6BD9)
- "[Insight 2]" - smaller bold marker in Violet

ICONS/FIGURES:
- [Icon 1]: [simple description] - bold marker, filled shapes
- [Icon 2]: [simple description] - bold marker, filled shapes
- Keep punchy — bold outlines with marker fill, not complex

STYLE:
- Deep matte black blackboard background
- Bold art marker aesthetic — thick saturated strokes
- Warm white as primary (60%), vibrant accents (40%)
- Simple but punchy iconography
- Educational clarity — concept clear at a glance
- NO chalk, NO gradients, NO stock photo aesthetic
- Marker bleed edges for authenticity
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR CONCEPT PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/marker-concept-[topic].png"
)
```

---

## Validation

- [ ] Concept is clear within 3 seconds
- [ ] One main idea, not cluttered
- [ ] Warm Amber title stands out
- [ ] Annotations add personal insight
- [ ] Deep black blackboard background
- [ ] Bold marker icons (not chalk, not stick figures)
