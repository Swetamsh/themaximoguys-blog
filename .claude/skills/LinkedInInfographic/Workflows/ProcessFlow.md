# ProcessFlow Workflow

**Step-by-step process or migration path infographic for LinkedIn.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running ProcessFlow workflow in LinkedInInfographic to generate a process infographic from blog content"}' \
  > /dev/null 2>&1 &
```

Running **ProcessFlow** in **LinkedInInfographic**...

---

## When to Use

- Blog describes a sequential process (migration, installation, configuration)
- Blog has numbered steps or phases
- Blog covers a journey from state A to state B
- Blog describes a decision tree or branching path

**Visual Style Selection:**
- Practical how-to with personality → **SketchNote** (read `~/.claude/skills/SketchNote/Workflows/Guide.md`)
- Technical migration/architecture process → **BlueprintBoard** (read `~/.claude/skills/BlueprintBoard/Workflows/Guide.md`)
- Business transformation story → **MarkerBoard** (read `~/.claude/skills/MarkerBoard/Workflows/Process.md`)

---

## Step 1: Extract Content

Read `ContentExtraction.md` and extract the ProcessFlow structure:

```yaml
title: "[Process Name]"
subtitle: "[Step-by-step guide to...]"
scope: "[What version/context this applies to]"

steps:
  - number: 1
    title: "[Step title — 3-5 words]"
    detail: "[What to do — 8-15 words]"
    icon: "[relevant icon: wrench, cloud, server, etc.]"
    annotation: "[witty note]"  # optional, on 2-3 steps max
    substeps:  # optional, for complex steps
      - "[Sub-step 1]"
      - "[Sub-step 2]"
  - number: 2
    title: "[Step title]"
    detail: "[What to do]"
    icon: "[icon]"
  # ... 5-8 steps total

warnings:
  - "[Common mistake at step X]"
  - "[Thing people forget]"

pro_tip: "[Insider shortcut or best practice]"
outcome: "[What you get when done — the payoff]"
```

---

## Step 2: Structure the Flow

**Layout options (pick based on step count):**

### Option A: Vertical Flow (5-8 steps)
Best for most processes. Steps flow top to bottom with arrows.
```
TITLE
↓
[Step 1] → annotation
↓
[Step 2]
↓
[Step 3] → annotation
↓
[Step 4]
↓
[Step 5] → annotation
↓
[OUTCOME]
```

### Option B: Horizontal Flow (3-5 steps)
Best for high-level phases with detail underneath.
```
TITLE
[Phase 1] → [Phase 2] → [Phase 3] → [Phase 4]
  detail      detail      detail      detail
```

### Option C: Branching Flow
Best for decision trees or paths that split.
```
TITLE
[Step 1]
    ├── [Path A: If X] → [Steps...]
    └── [Path B: If Y] → [Steps...]
[Converge at step N]
```

---

## Step 3: Build the Image Prompt

**Read the selected style's process/guide workflow for the FULL prompt template:**
- SketchNote: `~/.claude/skills/SketchNote/Workflows/Guide.md`
- BlueprintBoard: `~/.claude/skills/BlueprintBoard/Workflows/Guide.md`
- MarkerBoard: `~/.claude/skills/MarkerBoard/Workflows/Process.md`

**Key adaptations for LinkedIn process infographic:**
- **Each step gets a number + title + icon** — visual anchors
- **Detail text under each step** — the actionable instruction
- **Arrows/connectors between steps** — clear flow direction
- **2-3 warning callouts** at the steps where people commonly fail
- **Time estimates** if the blog mentions them ("~2 hours", "run overnight")
- **Outcome box at bottom** — what success looks like

---

## Step 4: Add Personality Layer

- [ ] **Hook at top:** Relatable starting point ("Your team just got told to migrate. Now what?")
- [ ] **2-3 witty annotations** at steps where people struggle
  - "Friday 5pm = NO. Saturday 3am = maybe."
  - "skip this and start over in 3 months"
  - "this is where 80% of teams get stuck"
- [ ] **Warning icon/callout** at the critical step
- [ ] **Time indicator** if relevant ("total: ~3 months" or "weekend project")
- [ ] **Before/after comparison** — where you start vs where you end
- [ ] **Attribution:** "by @themaximoguys"
- [ ] **"@themaximoguys"** in corner

---

## Step 5: Generate Image

```
mcp__nanobanana__generate_image(
  prompt: "[FULL PROMPT WITH EXTRACTED CONTENT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/linkedin-infographic-process-[slug].png",
  thinking_level: "high"
)
```

---

## Step 6: Generate LinkedIn Post Copy

Read `LinkedInPostCopy.md` and generate post copy using the **ProcessFlow** template.

---

## Validation

- [ ] Steps numbered and in clear sequence
- [ ] Each step has title + detail + icon
- [ ] Arrows/connectors show flow direction
- [ ] 2-3 warning callouts at critical steps
- [ ] Outcome/payoff shown at the end
- [ ] Witty annotations on hardest steps
- [ ] Attribution with credentials
- [ ] "@themaximoguys" present
- [ ] 4:5 portrait aspect ratio
- [ ] Total steps readable (5-8, not crammed)
- [ ] CTA at bottom: "Save this" variant
- [ ] Follows selected visual style's aesthetic rules
