# CheatSheet Workflow

**Two-column tips / survival guide infographic for LinkedIn.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running CheatSheet workflow in LinkedInInfographic to generate a two-column infographic from blog content"}' \
  > /dev/null 2>&1 &
```

Running **CheatSheet** in **LinkedInInfographic**...

---

## When to Use

- Blog has tips for two audiences (end users vs admins, beginners vs advanced)
- Blog is a survival guide, day-1 guide, or "things nobody told you"
- Blog is a feature spotlight with many actionable items
- Blog has both basic and advanced content that splits naturally

**Visual Style Selection:**
- Witty/casual tone, personality-driven → **SketchNote** (read `~/.claude/skills/SketchNote/Workflows/CheatSheet.md`)
- Heavy technical/config content → **BlueprintBoard** (read `~/.claude/skills/BlueprintBoard/Workflows/CheatSheet.md`)

---

## Step 1: Extract Content

Read `ContentExtraction.md` and extract the CheatSheet structure:

```yaml
title: "[3-8 word title from blog]"
subtitle: "[witty subtitle]"
scope_tag: "[version/scope]"
badge: "[logo or version badge]"
left_column:
  header: "[Audience/Category 1]"
  subtitle: "(a.k.a. [witty description])"
  tips: [5-8 tips with icons and 1-2 annotations]
right_column:
  header: "[Audience/Category 2]"
  subtitle: "(a.k.a. [witty description])"
  tips: [5-8 tips with icons and 1-2 annotations]
callout: "[If you learn ONE thing...]"
pro_tip: "[Insider knowledge]"
cta: "Save this. Print it. Send it to your team."
```

---

## Step 2: Determine Column Split

**Common two-column splits from blog content:**

| Blog Structure | Left Column | Right Column |
|---|---|---|
| User guide + admin guide | End User Tips | Admin Tips |
| What changed + what to do | What Changed | What You Need to Do |
| Features + configuration | Features | How to Configure |
| Before + after migration | Before (7.6) | After (MAS 9) |
| Basics + advanced | Getting Started | Power User Tips |
| Problems + solutions | Common Problems | Solutions |

**If the blog doesn't have a natural split:**
- Look at `keyTakeaways` — can they be grouped into two categories?
- Look at H2 headers — do they alternate between two themes?
- Default: "Key Features" | "Pro Tips" or "What to Know" | "What to Do"

---

## Step 3: Build the Image Prompt

**Read the selected style's CheatSheet workflow for the FULL prompt template:**
- SketchNote: `~/.claude/skills/SketchNote/Workflows/CheatSheet.md`
- BlueprintBoard: `~/.claude/skills/BlueprintBoard/Workflows/CheatSheet.md`

**Fill the template with extracted content.** The style workflow has the exact prompt structure, color codes, composition rules, and validation checklist.

**Key adaptations for LinkedIn infographic (vs blog cover):**
- **PACK IN THE CONTENT** — 5-8 tips per column, each with detail text
- **Every tip gets a small icon/doodle** — visual anchors for scanning
- **3-8 witty annotations** distributed across columns (more than blog covers)
- **Include sub-detail** under tips where valuable (shortcut keys, command names, property names)
- **"If you learn ONE thing..." callout box** near the top — drives engagement

---

## Step 4: Add Personality Layer

Before generating, ensure the prompt includes:

- [ ] **Top hook:** Confused question or relatable pain point ("why is this so hard?", "50,000 assets, zero DataSpy filters?!")
- [ ] **2-4 witty sticky notes/annotations** in practitioner voice:
  - "your boss will think you're a genius"
  - "copy-paste is NOT a template strategy"
  - "auditors LOVE this one"
  - "Java customizations = upgrade nightmares"
- [ ] **1 pro tip callout box** with insider knowledge
- [ ] **Red circles/emphasis** on the 2-3 most critical items
- [ ] **Bottom CTA:** "Save this. Print it. Tape it next to your monitor."
- [ ] **Attribution:** "by @themaximoguys" with LinkedIn icon

---

## Step 5: Generate Image

```
mcp__nanobanana__generate_image(
  prompt: "[FULL PROMPT WITH EXTRACTED CONTENT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/linkedin-infographic-cheatsheet-[slug].png",
  thinking_level: "high"
)
```

---

## Step 6: Generate LinkedIn Post Copy

Read `LinkedInPostCopy.md` and generate post copy using the **CheatSheet** template.

---

## Validation

- [ ] Two-column layout is clear and balanced
- [ ] 5-8 tips per column, each with icon
- [ ] Witty annotations distributed (3-8 total)
- [ ] "If you learn ONE thing..." callout present
- [ ] Pro tip box present
- [ ] Red circles/emphasis on 2-3 key items
- [ ] Attribution: "by @themaximoguys"
- [ ] "@themaximoguys" present (small, corner)
- [ ] CTA at bottom: "Save this" variant
- [ ] 4:5 portrait aspect ratio
- [ ] Text is readable at LinkedIn feed size (not too dense)
- [ ] Follows selected visual style's aesthetic rules
