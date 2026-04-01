# Comparison Workflow

**X vs Y side-by-side infographic for LinkedIn.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running Comparison workflow in LinkedInInfographic to generate a comparison infographic from blog content"}' \
  > /dev/null 2>&1 &
```

Running **Comparison** in **LinkedInInfographic**...

---

## When to Use

- Blog directly compares two things (CMMS vs EAM, 7.6 vs MAS 9, On-Prem vs SaaS)
- Blog has before/after or old way/new way structure
- Blog evaluates options, alternatives, or trade-offs
- Blog has a feature comparison table

**Visual Style Selection:**
- Side-by-side with feature matrix → **BlueprintBoard** (read `~/.claude/skills/BlueprintBoard/Workflows/CheatSheet.md` for two-column layout)
- Conceptual comparison (less technical) → **MarkerBoard** (read `~/.claude/skills/MarkerBoard/Workflows/Comparison.md`)
- Corporate/executive audience → **InfoBlocks** (read `~/.claude/skills/InfoBlocks/Workflows/Comparison.md`)

---

## Step 1: Extract Content

Read `ContentExtraction.md` and extract the Comparison structure:

```yaml
title: "[X vs Y]"
subtitle: "[Stop using these interchangeably. They solve different problems.]"
left_side:
  name: "[Option A]"
  full_name: "[Full Name of A]"
  tagline: "[The Tactical Engine]"
  what_it_does: [4-6 capabilities]
  best_for: [3-5 use cases]
  platforms: "[Platform list]"
right_side:
  name: "[Option B]"
  full_name: "[Full Name of B]"
  tagline: "[The Strategic Platform]"
  what_it_does: [4-6 capabilities]
  best_for: [3-5 use cases]
  platforms: "[Platform list]"
feature_matrix:  # if blog has comparison table
  - feature: "[Feature]"
    left: "checkmark or X"
    right: "checkmark or X"
integration_section: "[How they connect/work together]"  # if blog covers this
```

---

## Step 2: Structure the Comparison

**Layout options (pick based on blog content):**

### Option A: Split Panel (Side-by-Side)
Best when both sides have roughly equal content.
```
LEFT PANEL: [Option A]         RIGHT PANEL: [Option B]
- What it does                 - What it does
- Best for                     - Best for
- Think of it as...            - Think of it as...
```

### Option B: Feature Matrix + Context
Best when blog has a comparison table.
```
TOP: [X] ←→ [Y] with feature grid (checkmarks/X)
BOTTOM LEFT: When X alone fails
BOTTOM RIGHT: The integration layer
```

### Option C: Before/After Timeline
Best when blog compares old vs new.
```
LEFT: Before (old way, problems, pain)
RIGHT: After (new way, solutions, wins)
ARROW or BRIDGE connecting them
```

---

## Step 3: Build the Image Prompt

**Read the selected style's Comparison workflow for the FULL prompt template:**
- MarkerBoard: `~/.claude/skills/MarkerBoard/Workflows/Comparison.md`
- BlueprintBoard: use CheatSheet workflow with comparison framing
- InfoBlocks: `~/.claude/skills/InfoBlocks/Workflows/Comparison.md`

**Key adaptations for LinkedIn comparison infographic:**
- **Feature matrix** with checkmarks/X marks if the blog has one (high engagement)
- **"When X Alone Fails" section** — shows why the comparison matters
- **Integration/bridge section** at bottom if the blog covers how they work together
- **Witty annotations** — "Kevin thinks CMMS stands for 'Can't Manage My Stuff'"
- **Speech bubbles** — "Same thing! ...Absolutely not."
- **Kevin/persona references** — recurring character who asks the "wrong" questions

---

## Step 4: Add Personality Layer

- [ ] **Provocative subtitle** that stops scrolling: "Stop using these interchangeably."
- [ ] **Speech bubble or confused character** — "Same thing, right?" "...no."
- [ ] **3-5 witty annotations** comparing the two sides
- [ ] **"Think of it as..." analogy** for each side (makes abstract concrete)
- [ ] **Warning section** — what goes wrong when you pick wrong / use only one
- [ ] **Implementation roadmap** at bottom if blog covers it
- [ ] **Verdict/recommendation** — clear position, not fence-sitting
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
  output_path: "~/Downloads/linkedin-infographic-comparison-[slug].png",
  thinking_level: "high"
)
```

---

## Step 6: Generate LinkedIn Post Copy

Read `LinkedInPostCopy.md` and generate post copy using the **Comparison** template.

---

## Validation

- [ ] Two sides clearly labeled and visually distinct
- [ ] Feature matrix with checkmarks/X if applicable
- [ ] "What it does" and "Best for" for each side
- [ ] Witty annotations distributed (3-5 total)
- [ ] Clear verdict or integration message
- [ ] Warning section showing consequences of wrong choice
- [ ] Attribution with credentials
- [ ] "@themaximoguys" present
- [ ] 4:5 portrait aspect ratio
- [ ] Follows selected visual style's aesthetic rules
