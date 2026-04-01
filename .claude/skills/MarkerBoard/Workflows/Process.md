# Process Workflow

**Step-by-step processes and how-to sequences in MarkerBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Process workflow to create a step-by-step marker visual"}' \
  > /dev/null 2>&1 &
```

Running **Process** in **MarkerBoard**...

---

## Purpose

Show sequences, steps, methodologies, or how things work.

**Classic Examples:**
- Cloud migration in 5 steps
- From legacy to modern architecture
- The upgrade path
- Deployment pipeline
- Learning progression

---

## Composition Options

### Option A: Horizontal Steps
```
+----------------------------------------------------------+
|  [TITLE - The Process Name]                               |
|                                                            |
|  +-----+     +-----+     +-----+     +-----+             |
|  |  1  | --> |  2  | --> |  3  | --> |  4  |             |
|  |icon |     |icon |     |icon |     |icon |             |
|  +-----+     +-----+     +-----+     +-----+             |
|  [label]     [label]     [label]     [label]             |
|                                                            |
|  *annotation about the journey*                            |
+----------------------------------------------------------+
```

### Option B: Vertical Progression
```
+-------------------------------+
|  [TITLE]                      |
|                               |
|  +-------------------------+  |
|  | STEP 1: [Description]   |  |
|  +-------------------------+  |
|            |                  |
|            v                  |
|  +-------------------------+  |
|  | STEP 2: [Description]   |  |
|  +-------------------------+  |
|            |                  |
|            v                  |
|  +-------------------------+  |
|  | STEP 3: [Description]   |  |
|  +-------------------------+  |
|                               |
|  [Final outcome/result]       |
+-------------------------------+
```

### Option C: Timeline
```
+----------------------------------------------------------+
|  [TITLE - Journey/Timeline Name]                          |
|                                                            |
|  o---------o---------o---------o---------o                |
|  |         |         |         |         |                |
|  [A]       [B]       [C]       [D]       [E]              |
|  Phase 1   Phase 2   Phase 3   Phase 4   Phase 5          |
|                                                            |
|  *what changes along the way*                              |
+----------------------------------------------------------+
```

---

## Color Strategy

- **Title:** Warm Amber (#F2994A) for visibility
- **Steps:** Color progression to show advancement
  - Early steps: warm white or Electric Blue (#2D9CDB)
  - Middle steps: Violet (#BB6BD9) or Warm Amber
  - Final step/outcome: Lime Green (#6FCF97) — success
- **Arrows/connections:** warm white marker, bold strokes
- **Annotations:** Violet for insights

---

## Prompt Template

```
Bold marker-art process diagram on deep matte black blackboard background.

PROCESS: [What sequence/steps you're showing]

COMPOSITION: [Choose: Horizontal steps / Vertical progression / Timeline]

TITLE:
"[PROCESS NAME]" - large bold marker lettering in Warm Amber (#F2994A)

STEPS:

Step 1: "[STEP NAME]"
- Icon: [simple bold icon] in warm white / Electric Blue (#2D9CDB) marker
- Description: [brief description]
- Position: [left/top/first on timeline]

Step 2: "[STEP NAME]"
- Icon: [simple bold icon] in warm white marker
- Description: [brief description]
- Bold marker arrow from Step 1 to Step 2

Step 3: "[STEP NAME]"
- Icon: [simple bold icon] in warm white / Violet (#BB6BD9) marker
- Description: [brief description]
- Bold marker arrow from Step 2 to Step 3

Step 4 (Final): "[OUTCOME NAME]"
- Icon: [simple bold icon] in Lime Green (#6FCF97) marker — success
- Description: [the result/destination]
- Slightly larger or emphasized with filled marker color

ARROWS/CONNECTIONS:
- Bold marker arrows connecting steps
- Warm white marker, thick confident strokes
- Direction clearly showing flow

ANNOTATIONS:
"[Insight about the journey]" - smaller bold marker in Violet
"[Timing or duration note]" - smaller warm white marker

STYLE:
- Deep matte black blackboard background
- Bold art marker aesthetic throughout
- Filled marker icons for each step
- Clear flow direction
- Final step highlighted in Lime Green
- NO chalk, NO gradients, NO stock photo aesthetic
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROCESS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/marker-process-[topic].png"
)
```

---

## Validation

- [ ] Steps flow clearly in sequence
- [ ] Bold marker arrows show direction of progression
- [ ] Final step/outcome highlighted in Lime Green
- [ ] Each step has bold marker icon + label
- [ ] Deep black blackboard background
- [ ] Art marker aesthetic (not chalk)
- [ ] Process understandable at a glance
