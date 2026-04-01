# Process Workflow

**Step-by-step processes and how-to sequences in Dan Koe chalkboard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Process workflow to create a step-by-step visual"}' \
  > /dev/null 2>&1 &
```

Running **Process** in **DanKoeStyle**...

---

## Purpose

Show sequences, steps, methodologies, or how things work.

**Classic Examples:**
- How to build a one-person business
- The content creation process
- From idea → product → sales
- Morning routine / daily workflow
- Learning path / skill progression

---

## Composition Options

### Option A: Horizontal Steps
```
┌─────────────────────────────────────────────────────────┐
│  [TITLE - The Process Name]                             │
│                                                          │
│  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐              │
│  │  1  │ ─→ │  2  │ ─→ │  3  │ ─→ │  4  │              │
│  │icon │    │icon │    │icon │    │icon │              │
│  └─────┘    └─────┘    └─────┘    └─────┘              │
│  [label]    [label]    [label]    [label]              │
│                                                          │
│  *annotation about the journey*                          │
└─────────────────────────────────────────────────────────┘
```

### Option B: Vertical Progression
```
┌─────────────────────────────────┐
│  [TITLE]                        │
│                                 │
│  ┌───────────────────────────┐ │
│  │ STEP 1: [Description]     │ │
│  │ [icon]                    │ │
│  └───────────────────────────┘ │
│            ↓                    │
│  ┌───────────────────────────┐ │
│  │ STEP 2: [Description]     │ │
│  │ [icon]                    │ │
│  └───────────────────────────┘ │
│            ↓                    │
│  ┌───────────────────────────┐ │
│  │ STEP 3: [Description]     │ │
│  │ [icon]                    │ │
│  └───────────────────────────┘ │
│                                 │
│  [Final outcome/result]         │
└─────────────────────────────────┘
```

### Option C: Timeline
```
┌─────────────────────────────────────────────────────────┐
│  [TITLE - Journey/Timeline Name]                        │
│                                                          │
│  ●────────●────────●────────●────────●                  │
│  │        │        │        │        │                  │
│  [A]      [B]      [C]      [D]      [E]                │
│  Year 1   Year 2   Year 3   Year 4   Year 5            │
│                                                          │
│  *what changes along the way*                            │
└─────────────────────────────────────────────────────────┘
```

---

## Color Strategy

- **Title:** YELLOW for visibility
- **Steps:** Color progression to show advancement
  - Early steps: WHITE or BLUE
  - Middle steps: PINK or ORANGE
  - Final step/outcome: GREEN (success!)
- **Arrows/connections:** WHITE chalk
- **Annotations:** PINK for insights

---

## Prompt Template

```
Dan Koe-style process diagram on pure black chalkboard background.

PROCESS: [What sequence/steps you're showing]

COMPOSITION: [Choose: Horizontal steps / Vertical progression / Timeline]

TITLE:
"[PROCESS NAME]" - large hand-lettered YELLOW chalk

STEPS:

Step 1: "[STEP NAME]"
- Icon: [simple icon] in WHITE/BLUE chalk
- Description: [brief description]
- Position: [left/top/first on timeline]

Step 2: "[STEP NAME]"
- Icon: [simple icon] in WHITE chalk
- Description: [brief description]
- Arrow from Step 1 to Step 2

Step 3: "[STEP NAME]"
- Icon: [simple icon] in WHITE/PINK chalk
- Description: [brief description]
- Arrow from Step 2 to Step 3

Step 4 (Final): "[OUTCOME NAME]"
- Icon: [simple icon] in GREEN chalk (success!)
- Description: [the result/destination]
- Slightly larger or emphasized

ARROWS/CONNECTIONS:
- Hand-drawn arrows connecting steps
- WHITE chalk, wobbly/organic lines
- Direction clearly showing flow

ANNOTATIONS:
"[Insight about the journey]" - small PINK chalk near relevant step
"[Timing or duration note]" - small WHITE chalk

STYLE:
- Pure black chalkboard background
- Hand-drawn chalk aesthetic throughout
- Simple icons for each step
- Clear flow direction
- Final step highlighted in GREEN
- Educational - process clear at a glance
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROCESS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/process-[topic].png"
)
```

---

## Validation

- [ ] Steps flow clearly in sequence
- [ ] Arrows show direction of progression
- [ ] Final step/outcome highlighted (GREEN)
- [ ] Each step has simple icon + label
- [ ] Black chalkboard background
- [ ] Hand-drawn chalk aesthetic
- [ ] Process understandable at a glance
