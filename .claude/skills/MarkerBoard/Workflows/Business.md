# Business Workflow

**Business strategy and professional framework visuals in MarkerBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Business workflow to create a strategy marker visual"}' \
  > /dev/null 2>&1 &
```

Running **Business** in **MarkerBoard**...

---

## Purpose

Visualize business models, strategies, and professional frameworks.

**Classic Examples:**
- Platform architecture overview
- Digital transformation roadmap
- Skills + Platform + Strategy = Value
- The modernization ecosystem
- Technology investment thesis

---

## Composition Options

### Option A: Ecosystem/Workspace View
```
+----------------------------------------------------------+
|  [TITLE - e.g., "MODERNIZATION STRATEGY"]                 |
|                                                            |
|  +-----------+    +-----------+    +-----------+          |
|  |  ZONE 1   |    |  ZONE 2   |    |  ZONE 3   |          |
|  | [icon +   |    | [icon +   |    | [icon +   |          |
|  |  label]   |    |  label]   |    |  label]   |          |
|  +-----------+    +-----------+    +-----------+          |
|          \             |             /                     |
|                [CENTRAL OUTCOME]                           |
|                                                            |
|  * bullet point 1                                          |
|  * bullet point 2                                          |
|  * bullet point 3                                          |
+----------------------------------------------------------+
```

### Option B: Flywheel/Cycle
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|         +-------+                   |
|    /    |   A   |    \              |
| +---+   +-------+   +---+          |
| | C | <----------> | B |           |
| +---+               +---+          |
|                                     |
|  *the flywheel accelerates*        |
+-------------------------------------+
```

### Option C: Formula/Equation
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|  [A] + [B] + [C] = [OUTCOME]       |
|                                     |
|  icon  icon  icon    icon           |
|  label label label   BIG LABEL      |
|                                     |
|  *this is how value is created*    |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Warm Amber (#F2994A) — commands attention
- **Primary zones/elements:** Color-coded for differentiation
  - Zone 1: Electric Blue (#2D9CDB)
  - Zone 2: Violet (#BB6BD9)
  - Zone 3: Lime Green (#6FCF97)
- **Central outcome:** Lime Green — success/growth
- **Bullet points/details:** warm white marker
- **Annotations:** Violet for insights

---

## Prompt Template

```
Bold marker-art business strategy visual on deep matte black blackboard background.

BUSINESS CONCEPT: [What strategy/model you're visualizing]

COMPOSITION: [Choose: Ecosystem / Flywheel / Formula]

TITLE:
"[BUSINESS TITLE]" - large bold marker lettering in Warm Amber (#F2994A)

ZONES/ELEMENTS:
[Describe each component of the model]

Zone 1: "[LABEL]"
- Icon: [simple bold description] in Electric Blue (#2D9CDB) marker
- Purpose: [what this represents]

Zone 2: "[LABEL]"
- Icon: [simple bold description] in Violet (#BB6BD9) marker
- Purpose: [what this represents]

Zone 3: "[LABEL]"
- Icon: [simple bold description] in Lime Green (#6FCF97) marker
- Purpose: [what this represents]

CENTRAL ELEMENT:
[Describe the outcome or central concept]
- Main illustration in warm white marker
- Key highlight in Lime Green marker

BULLET POINTS / KEY METRICS:
* [Point 1] - warm white marker
* [Point 2] - warm white marker
* [Point 3] - warm white marker

ANNOTATIONS:
"[Business insight]" - smaller bold marker in Violet

STYLE:
- Deep matte black blackboard background
- Bold art marker aesthetic
- Color-coded zones with filled marker color
- Punchy icons with bold outlines
- Professional yet hand-crafted
- NO chalk, NO gradients, NO stock photo aesthetic
- Business model clear at a glance
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR BUSINESS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/marker-business-[topic].png"
)
```

---

## Validation

- [ ] Business model/strategy is immediately clear
- [ ] Zones are color-differentiated with marker fill
- [ ] Central outcome highlighted in Lime Green
- [ ] Professional yet approachable marker aesthetic
- [ ] Deep black blackboard background
- [ ] Bold art marker style maintained (no chalk)
