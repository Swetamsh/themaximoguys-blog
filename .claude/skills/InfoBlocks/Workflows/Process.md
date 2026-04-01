# Process Workflow

**Step-by-step processes shown with 3D isometric blocks in InfoBlocks style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Process workflow to create a step-by-step infographic"}' \
  > /dev/null 2>&1 &
```

Running **Process** in **InfoBlocks**...

---

## Purpose

Show sequential processes, methodologies, pipelines, or workflows.

**Classic Examples:**
- CI/CD Pipeline
- Data processing workflow
- Migration steps
- API request lifecycle
- Machine learning training pipeline

---

## Composition Options

### Option A: Horizontal Pipeline
```
+----------------------------------------------------------+
|  [TITLE - Process Name]                                    |
|                                                            |
|  [BLOCK 1] --→ [BLOCK 2] --→ [BLOCK 3] --→ [BLOCK 4]    |
|  [labeled]     [labeled]     [labeled]     [labeled]      |
|  [object]      [object]      [object]      [object]       |
|                                                            |
|  Step 1        Step 2        Step 3        Step 4         |
|  [desc]        [desc]        [desc]        [desc]         |
+----------------------------------------------------------+
```

### Option B: Vertical Flow
```
+-------------------------------+
|  [TITLE]                      |
|                               |
|  [3D BLOCK 1] — Step 1       |
|  [labeled + object]          |
|  * description                |
|       |                       |
|       v (gold arrow)          |
|                               |
|  [3D BLOCK 2] — Step 2       |
|  [labeled + object]          |
|  * description                |
|       |                       |
|       v (gold arrow)          |
|                               |
|  [3D BLOCK 3] — Step 3       |
|  [labeled + object]          |
|  * description                |
+-------------------------------+
```

### Option C: Circular/Loop
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|         [BLOCK A]                   |
|        ↗         ↘                  |
|   [BLOCK D]     [BLOCK B]          |
|        ↖         ↙                  |
|         [BLOCK C]                   |
|                                     |
|  * Each block with label + object   |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Black bold sans-serif
- **Process blocks:** Progressive color shift
  - Step 1: Steel Blue (#5B7BA5)
  - Step 2: Navy Blue (#2D3A5C)
  - Step 3: Navy Blue with Gold accent
  - Final step: Gold/Amber (#C9A84C) — completion
- **Connecting arrows:** Gold (#C9A84C)
- **Step labels:** Dark text (#1A1A2E)
- **Background:** Warm cream (#F5F0E8)

---

## Prompt Template

```
Clean educational process diagram on warm cream (#F5F0E8) background.

PROCESS: [What sequence/steps you're showing]

COMPOSITION: [Choose: Horizontal pipeline / Vertical flow / Circular loop]

TITLE:
"[PROCESS NAME]" — bold black sans-serif

STEPS:

Step 1: "[STEP NAME]"
- 3D Block: Steel Blue (#5B7BA5) isometric platform labeled "[LABEL]"
- Object: [3D rendered object] on the platform
- Description: [brief text below]

Step 2: "[STEP NAME]"
- 3D Block: Navy Blue (#2D3A5C) isometric platform labeled "[LABEL]"
- Object: [3D rendered object] on the platform
- Description: [brief text below]
- Gold arrow connecting from Step 1

Step 3: "[STEP NAME]"
- 3D Block: Navy Blue with Gold accents, labeled "[LABEL]"
- Object: [3D rendered object] on the platform
- Description: [brief text below]
- Gold arrow connecting from Step 2

Step 4 (Final): "[OUTCOME]"
- 3D Block: Gold/Amber (#C9A84C) accent platform labeled "[LABEL]"
- Object: [3D rendered result/output] on the platform
- Description: [brief text below]
- Gold arrow connecting from Step 3

ARROWS:
- Gold (#C9A84C) connecting arrows between all steps
- Clean, precise lines — NOT hand-drawn

STYLE:
- Warm cream background throughout
- 3D isometric blocks with polished rendering
- Clean sans-serif typography
- Corporate-educational tone
- NO dark backgrounds, NO marker/chalk, NO gradients
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROCESS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/infoblocks-process-[topic].png"
)
```

---

## Validation

- [ ] Steps flow clearly in sequence
- [ ] Gold arrows show direction of progression
- [ ] Each step has 3D block with label + object
- [ ] Progressive color shift across steps
- [ ] Warm cream background
- [ ] Clean professional typography
- [ ] Process understandable at a glance
