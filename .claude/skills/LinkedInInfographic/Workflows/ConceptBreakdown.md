# ConceptBreakdown Workflow

**Single concept deep-dive or architecture explainer infographic for LinkedIn.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running ConceptBreakdown workflow in LinkedInInfographic to generate a concept explainer from blog content"}' \
  > /dev/null 2>&1 &
```

Running **ConceptBreakdown** in **LinkedInInfographic**...

---

## When to Use

- Blog explains a single core concept in depth (What is MAS? What is OpenShift?)
- Blog describes an architecture or platform with multiple layers/components
- Blog covers a framework, model, or mental model
- Blog explains how something works under the hood

**Visual Style Selection:**
- Architecture / platform / layers → **BlueprintBoard** (read `~/.claude/skills/BlueprintBoard/Workflows/Architecture.md`)
- Educational concept / "What is X" → **InfoBlocks** (read `~/.claude/skills/InfoBlocks/Workflows/StackedLayers.md`)
- Framework / mental model → **MarkerBoard** (read `~/.claude/skills/MarkerBoard/Workflows/Concept.md`)
- Casual explainer with personality → **SketchNote** (read `~/.claude/skills/SketchNote/Workflows/General.md`)

---

## Step 1: Extract Content

Read `ContentExtraction.md` and extract the ConceptBreakdown structure:

```yaml
title: "[Concept Name]"
subtitle: "[One-line explanation or witty framing]"
scope: "[What version/context]"

core_concept: "[Central idea in 1-2 sentences — the TLDR]"

layers:  # For architecture/platform concepts
  - name: "[Layer 1 — e.g., Infrastructure]"
    description: "[What this layer does]"
    components: ["OpenShift", "Kubernetes", "Operators"]
    icon: "[server/cloud icon]"
  - name: "[Layer 2 — e.g., Runtime]"
    description: "[What this layer does]"
    components: ["Java 17", "Liberty", "Containers"]
    icon: "[gear icon]"
  # ... 3-6 layers

# OR for concept explainers:
sections:
  - header: "[What It Is]"
    points:
      - "[Key point 1]"
      - "[Key point 2]"
  - header: "[How It Works]"
    points:
      - "[Mechanism 1]"
      - "[Mechanism 2]"
  - header: "[Why It Matters]"
    points:
      - "[Impact 1]"
      - "[Impact 2]"

key_insight: "[The thing most people miss — the non-obvious truth]"
analogy: "[Real-world analogy: 'Think of it as...' ]"
common_misconception: "[What people get wrong about this]"
```

---

## Step 2: Structure the Concept

**Layout options based on content type:**

### Option A: Stacked Layers (Architecture/Platform)
Best for systems with distinct layers or tiers.
```
TITLE
[Core concept callout]

[Layer 1 — top/outer] with components
    ↓
[Layer 2] with components
    ↓
[Layer 3] with components
    ↓
[Layer 4 — bottom/foundation] with components

[Key insight box]
```

### Option B: Central Hub (Framework/Model)
Best for concepts with interconnected parts.
```
TITLE
         [Component A]
              ↑
[Component B] ← [CORE CONCEPT] → [Component C]
              ↓
         [Component D]

[What this means for you]
```

### Option C: Before/After Understanding
Best for "What is X really?" explainers.
```
TITLE
[What people THINK it is]  ←→  [What it ACTUALLY is]

[How it works — 3-4 key mechanisms]

[Why it matters — 2-3 impacts]
```

### Option D: Numbered Grid
Best for concepts broken into distinct aspects.
```
TITLE
[1] Aspect 1    [2] Aspect 2
    detail           detail

[3] Aspect 3    [4] Aspect 4
    detail           detail

[5] Aspect 5    [6] Aspect 6
    detail           detail
```

---

## Step 3: Build the Image Prompt

**Read the selected style's concept/architecture workflow for the FULL prompt template:**
- BlueprintBoard Architecture: `~/.claude/skills/BlueprintBoard/Workflows/Architecture.md`
- InfoBlocks StackedLayers: `~/.claude/skills/InfoBlocks/Workflows/StackedLayers.md`
- MarkerBoard Concept: `~/.claude/skills/MarkerBoard/Workflows/Concept.md`

**Key adaptations for LinkedIn concept infographic:**
- **Core concept callout** prominent near top — the "TLDR" of the concept
- **Each layer/section gets an icon** — visual differentiation
- **Component lists** within each layer — specific technologies, tools, features
- **"Think of it as..." analogy** — makes abstract concrete for non-experts
- **Common misconception callout** — "X is NOT Y" drives engagement
- **"What this means for you" section** — actionable takeaway

---

## Step 4: Add Personality Layer

- [ ] **Hook question** at top: "What actually changed under the hood?"
- [ ] **Core concept in bold callout** — the single sentence that explains everything
- [ ] **"Think of it as..." analogy** — relatable comparison
- [ ] **"NOT a [misconception]" emphasis** — corrects common wrong belief
- [ ] **2-3 witty annotations** on layers/sections
  - "get this wrong = years of pain"
  - "this is where the magic happens"
  - "garbage data = garbage data, some things never change"
- [ ] **Key insight box** — the non-obvious truth most people miss
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
  output_path: "~/Downloads/linkedin-infographic-concept-[slug].png",
  thinking_level: "high"
)
```

---

## Step 6: Generate LinkedIn Post Copy

Read `LinkedInPostCopy.md` and generate post copy using the **ConceptBreakdown** template.

---

## Validation

- [ ] Core concept clearly stated near top
- [ ] Layers/sections visually distinct with icons
- [ ] Components listed within each layer
- [ ] Analogy or "Think of it as..." present
- [ ] Common misconception addressed
- [ ] Key insight highlighted
- [ ] 2-3 witty annotations
- [ ] Attribution with credentials
- [ ] "@themaximoguys" present
- [ ] 4:5 portrait aspect ratio
- [ ] Concept is understandable without reading the blog
- [ ] CTA at bottom: "Save this" variant
- [ ] Follows selected visual style's aesthetic rules
