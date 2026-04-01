# Business Workflow

**Business strategy and creator economy visuals in Dan Koe chalkboard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Business workflow to create a strategy visual"}' \
  > /dev/null 2>&1 &
```

Running **Business** in **DanKoeStyle**...

---

## Purpose

Visualize business models, creator strategies, and professional frameworks.

**Classic Examples:**
- The one-person business model
- Content → Audience → Product flywheel
- Digital asset ecosystem
- Skills + Interests + Problems = Value
- The creator workspace

---

## Composition Options

### Option A: Ecosystem/Workspace View
```
┌─────────────────────────────────────────────────────────┐
│  [TITLE - e.g., "BUSINESS VISION"]                      │
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   ZONE 1    │    │   ZONE 2    │    │   ZONE 3    │ │
│  │  [icon +    │    │  [icon +    │    │  [icon +    │ │
│  │   label]    │    │   label]    │    │   label]    │ │
│  └─────────────┘    └─────────────┘    └─────────────┘ │
│           ↘              ↓              ↙               │
│                  [CENTRAL OUTCOME]                       │
│                                                          │
│  • bullet point 1                                        │
│  • bullet point 2                                        │
│  • bullet point 3                                        │
└─────────────────────────────────────────────────────────┘
```

### Option B: Flywheel/Cycle
```
┌─────────────────────────────────────┐
│          [TITLE]                    │
│                                     │
│         ┌───────┐                   │
│    ↗    │   A   │    ↘              │
│ ┌───┐   └───────┘   ┌───┐          │
│ │ C │ ←─────────→ │ B │           │
│ └───┘               └───┘           │
│                                     │
│  *the flywheel accelerates*         │
└─────────────────────────────────────┘
```

### Option C: Formula/Equation
```
┌─────────────────────────────────────┐
│          [TITLE]                    │
│                                     │
│  [A] + [B] + [C] = [OUTCOME]        │
│                                     │
│  icon  icon  icon    icon           │
│  label label label   BIG LABEL      │
│                                     │
│  *this is how value is created*     │
└─────────────────────────────────────┘
```

---

## Color Strategy

- **Title:** YELLOW - commands attention
- **Primary zones/elements:** Color-coded for differentiation
  - Zone 1: PINK
  - Zone 2: BLUE
  - Zone 3: GREEN
- **Central outcome:** GREEN (success, growth)
- **Bullet points/details:** WHITE chalk
- **Annotations:** PINK for insights

---

## Prompt Template

```
Dan Koe-style business strategy visual on pure black chalkboard background.

BUSINESS CONCEPT: [What strategy/model you're visualizing]

COMPOSITION: [Choose: Ecosystem / Flywheel / Formula]

TITLE:
"[BUSINESS TITLE]" - large hand-lettered YELLOW chalk, top left or center

ZONES/ELEMENTS:
[Describe each component of the business model]

Zone 1: "[LABEL]"
- Icon: [simple description] in PINK
- Purpose: [what this represents]

Zone 2: "[LABEL]"
- Icon: [simple description] in BLUE
- Purpose: [what this represents]

Zone 3: "[LABEL]"
- Icon: [simple description] in GREEN
- Purpose: [what this represents]

CENTRAL ELEMENT:
[Describe the outcome, desk, workspace, or central concept]
- Main illustration in WHITE chalk
- Key highlight in GREEN

BULLET POINTS / KEY METRICS:
• [Point 1] - WHITE chalk
• [Point 2] - WHITE chalk
• [Point 3] - WHITE chalk

ANNOTATIONS:
"[Business insight]" - small PINK chalk

SCENE ELEMENTS (if workspace view):
- Desk with computer/setup
- Surrounding tools and assets
- Connected elements showing flow

STYLE:
- Pure black chalkboard background
- Hand-drawn chalk/marker aesthetic
- Color-coded zones for clarity
- Simple icons and stick figures
- Professional but approachable
- Educational - business model clear at a glance
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR BUSINESS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/business-[topic].png"
)
```

---

## Validation

- [ ] Business model/strategy is immediately clear
- [ ] Zones are color-differentiated
- [ ] Central outcome highlighted (usually GREEN)
- [ ] Professional yet accessible aesthetic
- [ ] Black chalkboard background
- [ ] Hand-drawn chalk style maintained
