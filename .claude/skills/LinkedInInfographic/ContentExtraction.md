# Content Extraction Methodology

How to extract structured infographic content from blog MDX files.

## Step 1: Read the Blog

```bash
# Read the full MDX file
Read posts/[SERIES]/[filename].mdx
```

## Step 2: Extract from Frontmatter

| Frontmatter Field | Maps To | Infographic Use |
|---|---|---|
| `title` | **Infographic Title** | Main title (may shorten to 3-8 words) |
| `description` | **Context** | Helps determine tone and scope |
| `keyTakeaways` | **Primary Bullets** | These are the TOP items — use them as main tips/points |
| `faqs` | **Secondary Details** | Q&A pairs → convert to tip format: "FAQ answer = witty annotation" |
| `tldr` | **Subtitle or Callout** | Use as subtitle text or "If you learn ONE thing..." callout |
| `tags` | **Topic/Category** | Determines visual style and icon selection |
| `series.name` | **Header Badge** | "MAS 9.x" or "MAS FEATURES" badge in corner |
| `series.part` / `series.total` | **Context** | "Part X of Y" if relevant |
| `proficiencyLevel` | **Audience Tag** | Beginner → simpler language; Advanced → use jargon freely |
| `author` | **Attribution** | Author name for bottom attribution |
| `authorCredentials` | **Authority Signal** | Credentials after author name |

## Step 3: Extract from Blog Body

### Scan for These Patterns

**Headers (H2/H3)** → become section headers or column headers
```
## This Is Not a Version Upgrade → "NOT a Version Upgrade"
### The Runtime Change → "Runtime: Java 8 → Java 17"
```

**Bullet Lists** → become infographic tip bullets
```
- Architecture: Monolithic → Containerized → "→ Architecture: Monolith → Microservices"
- Runtime: Java 8/11 → Java 17 → "→ Runtime: Java 17 mandatory"
```

**Bold Key Terms** → become emphasis items (red circles in SketchNote, coral highlights in BlueprintBoard)
```
**NOT** a typical upgrade → circle or underline "NOT"
**sealed** database → highlight "sealed"
```

**Quotes/Asides** → become sticky note annotations or gold annotations
```
> "So we just upgrade the EAR file and redeploy, right?"
→ Sticky note: "If someone said this, keep reading..."
```

**Code Blocks/Commands** → become reference items in monospace-style text
```
mxe.db.fetch.maxrows → reference item with "memorize this" annotation
```

**Numbered Steps** → become process flow items
```
1. Stop WebSphere → Step 1 with icon
2. Export configs → Step 2 with icon
```

**Tables** → become comparison grids or feature matrices

## Step 4: Auto-Detect Layout from Blog Structure

Before structuring content, scan the blog for these patterns to automatically select the right layout option within the chosen workflow. Take the FIRST match.

### Layout Auto-Detection Rules

```
SCAN THE BLOG BODY:
│
├─ Has H2/H3 sections that alternate between two audiences
│  (e.g., "End User Tips" + "Admin Tips", "What Changed" + "What To Do")?
│  → CheatSheet → TWO-COLUMN SPLIT BY AUDIENCE
│  Column headers = the two audience names
│  Example: Maximo Survival Guide (End User | Admin)
│
├─ Has comparison tables in the body (| Feature | X | Y |)
│  or explicit "X vs Y" with side-by-side attributes?
│  → Comparison → FEATURE MATRIX LAYOUT (Option B)
│  Include checkmark/X grid from the table
│  Example: CMMS vs EAM with feature grid
│
├─ Has grouped H3 sections under H2 categories
│  (e.g., "Everyday Essentials" with 4 shortcuts, "Navigation" with 5 shortcuts)?
│  → QuickReference → GROUPED SECTIONS LAYOUT
│  Each H2 = a section header, H3s/bullets = items within
│  Example: Keyboard Shortcuts with 4 grouped sections
│
├─ Has 4+ distinct products/modules/components as separate H2 sections?
│  → ConceptBreakdown → NUMBERED GRID (Option D)
│  Each product gets a numbered box with key details
│  Example: AI Agent Protocols (11 numbered boxes)
│
├─ Has numbered steps (### Step 1, ### Phase 1, or ordered lists)?
│  → ProcessFlow → VERTICAL FLOW (Option A) if 5-8 steps
│  → ProcessFlow → HORIZONTAL FLOW (Option B) if 3-4 high-level phases
│
├─ Has a "free vs paid" or "included vs separate" structure?
│  → Comparison → SPLIT PANEL (Option A)
│  Left = free/included items, Right = paid/separate items
│  Example: MAS 9 Licensing Free vs Paid
│
├─ Has "before/after" or "old way/new way" (e.g., 7.6 vs MAS 9)?
│  → Comparison → BEFORE/AFTER TIMELINE (Option C)
│  Left = old state, Right = new state, arrow connecting
│
├─ Has a single core concept with layers/tiers/components?
│  → ConceptBreakdown → STACKED LAYERS (Option A)
│  Each layer = a tier/level of the concept
│
├─ Has a single concept with radiating interconnected parts?
│  → ConceptBreakdown → CENTRAL HUB (Option B)
│  Core concept in center, parts radiating out
│
├─ Has tips that naturally split into "basic + advanced"
│  or "getting started + power user"?
│  → CheatSheet → TWO-COLUMN SPLIT BY SKILL LEVEL
│  Left = basics, Right = advanced
│
└─ DEFAULT: Tips/takeaways that don't split naturally
   → CheatSheet → TWO-COLUMN SPLIT: "Key Features" | "Pro Tips"
```

### Column Split Auto-Detection (for CheatSheet workflow)

When blog goes to CheatSheet, determine the column split:

| Blog Structure Signal | Left Column | Right Column |
|---|---|---|
| Has "end user" + "admin" sections | End User Tips | Admin / Config Tips |
| Has "what changed" + "what to do" | What Changed | What You Need to Do |
| Has "features" + "configuration" | Features | How to Configure |
| Has "7.6" + "MAS 9" sections | Before (7.6) | After (MAS 9) |
| Has "basic" + "advanced" content | Getting Started | Power User Tips |
| Has "problems" + "solutions" | Common Problems | Solutions |
| Has "free" + "paid" items | Free / Included | Paid / Separate |
| Has "pros" + "cons" | Advantages | Trade-offs |
| No clear split | Key Features | Pro Tips |

## Step 5: Structure the Extracted Content

### For CheatSheet (Two-Column) Layout

```yaml
title: "[3-8 word title]"
subtitle: "[witty subtitle in parentheses]"
scope_tag: "(MAS 9.0 / 9.1 / legacy 7.6.x)"
badge: "[Logo or version badge]"

left_column:
  header: "[Column 1 Name]"
  subtitle: "(a.k.a. [witty description])"
  tips:
    - text: "[Tip text]"
      icon: "[relevant icon description]"
      annotation: "[witty sticky note text]"  # optional, 2-4 total
    - text: "[Tip text]"
      icon: "[icon]"
    # ... 5-8 tips per column

right_column:
  header: "[Column 2 Name]"
  subtitle: "(a.k.a. [witty description])"
  tips:
    - text: "[Tip text]"
      icon: "[icon]"
      annotation: "[witty annotation]"
    # ... 5-8 tips per column

callout: "[If you learn ONE thing from this page...]"
pro_tip: "[Pro tip that applies broadly]"
cta: "Save this. Print it. Send it to your team."
```

### For Comparison Layout

```yaml
title: "[X vs Y]"
subtitle: "[Stop using these interchangeably. They solve different problems.]"

left_side:
  name: "[Option A]"
  full_name: "[Full name]"
  tagline: "[The Tactical Engine]"
  what_it_does:
    - "[Capability 1]"
    - "[Capability 2]"
  best_for:
    - "[Use case 1]"
    - "[Use case 2]"
  platforms: "[List of platforms]"

right_side:
  name: "[Option B]"
  full_name: "[Full name]"
  tagline: "[The Strategic Platform]"
  what_it_does:
    - "[Capability 1]"
  best_for:
    - "[Use case 1]"

feature_matrix:  # optional
  - feature: "[Feature]"
    left: "✓" or "✗"
    right: "✓" or "✗"

integration_section: "[How they work together]"  # optional
```

### For ProcessFlow Layout

```yaml
title: "[Process/Migration Name]"
subtitle: "[Step-by-step guide]"
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

### For QuickReference Layout

```yaml
title: "[Reference Card Title]"
subtitle: "[The Cheat Sheet Every [Role] Needs]"
scope: "[MAS 9.x / Manage / Legacy 7.6.x]"
badge: "[Platform logo/badge]"

sections:
  - header: "[Section Name — e.g., Everyday Essentials]"
    icon: "[section icon]"
    items:
      - key: "[Shortcut/Command]"
        value: "[What it does]"
        annotation: "[game changer!]"  # optional
      - key: "[Shortcut]"
        value: "[Action]"
    # ... 4-8 items per section

# 3-5 sections total, each with 4-8 items
# Total items: 15-30 (the maximum for readability)
```

### For ConceptBreakdown Layout

```yaml
title: "[Concept Name]"
subtitle: "[One-line explanation or witty framing]"
scope: "[What version/context]"

core_concept: "[Central idea in 1-2 sentences — the TLDR]"

layers:  # For architecture/platform concepts
  - name: "[Layer/Component]"
    description: "[What it does]"
    components: ["Technology1", "Technology2", "Technology3"]
    icon: "[icon]"
  # ... 3-6 layers

# OR for concept explainers:
sections:
  - header: "[What It Is]"
    points:
      - "[Key point 1]"
      - "[Key point 2]"

key_insight: "[The thing most people miss — the non-obvious truth]"
analogy: "[Real-world analogy: 'Think of it as...' ]"
common_misconception: "[What people get wrong about this]"  # optional
```

## Step 6: Apply Content Density Rules

### LinkedIn Readability Limits

**Maximum content per infographic (4:5 portrait, 2k resolution):**
- **Title:** 3-8 words
- **Subtitle:** 1 line
- **Bullet points:** 12-20 total across all sections
- **Each bullet:** 6-15 words (shorter is better)
- **Annotations/sticky notes:** 3-8 total (these add personality)
- **Callout boxes:** 1-2 max
- **Attribution:** 1 line

**If the blog has MORE content than fits:**
1. Prioritize `keyTakeaways` from frontmatter — these are already curated
2. Pick the most actionable/surprising items from the body
3. Merge related points (e.g., "Java 8 → Java 17" and "strict module enforcement" = one bullet)
4. Drop context-heavy items that need paragraphs to explain
5. Consider splitting into a carousel (multiple infographic images)

### Personality Rules

The examples that perform best on LinkedIn have PERSONALITY. Every infographic needs:

- **2-3 witty annotations** in the voice of an experienced practitioner
  - "future-you will cry happy tears"
  - "this alone changes everything"
  - "if your security groups only have app-level access, your Maximo is basically a fancy spreadsheet"
- **1 pro tip callout** that shows insider knowledge
- **1 "confused question" or relatable hook** at the top
  - "why is this so hard?"
  - "50,000 assets... zero DataSpy filters?!"
- **Attribution with credentials** — not just name, but role + years

## Step 7: Select Visual Style

After extraction, use SKILL.md's Decision Matrix and Tie-Breakers to select the visual style and workflow. Do not duplicate the routing logic here — SKILL.md is the single source of truth for style selection.
