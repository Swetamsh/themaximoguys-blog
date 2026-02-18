---
name: MaximoBlog
description: IBM Maximo Application Suite blog writing skill. USE WHEN Maximo blog, MAS blog, write about Maximo, Maximo content, technical Maximo article, Maximo tutorial, Maximo migration guide, MAS AI implementation.
---

# MaximoBlog Skill

Complete blog writing system for IBM Maximo Application Suite (MAS) content. Combines deep research, authoritative tone, rich visuals, and adaptive structure based on blog type.

## Customization

**Load user preferences from:**
`~/.claude/skills/MaximoBlog/PREFERENCES.md`

**Load research sources from:**
`~/.claude/skills/MaximoBlog/References/MaximoSources.md`

---

## New Capabilities (v2.0)

### Visual Placeholder System
See `Templates/VisualPlaceholders.md` for:
- **INFOGRAPHIC** placeholders → DanKoeStyle skill
- **DIAGRAM** placeholders → Excalidraw skill
- **ARCHITECTURE** placeholders → Excalidraw skill
- **SCREENSHOT** placeholders → Manual/Browser skill
- **HEADER** placeholders → Art skill

### Blog Registry & Cross-Linking
See `Registry/BlogRegistry.md` for:
- Central blog index with metadata
- Series navigation (prev/next)
- Related posts by tag overlap
- Cross-link validation

### Folder Organization
See `Templates/FolderStructure.md` for:
- Recommended folder hierarchy
- Category organization (series, tutorials, guides, reference)
- Image asset organization
- Git-friendly relative linking

### Git Publishing
See `References/Publishing.md` for:
- GitHub repository setup
- GitHub Pages deployment
- Jekyll configuration
- Custom domain setup

---

## 🚨 MANDATORY: Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the WORKFLOWNAME workflow in the MaximoBlog skill"}' \
  > /dev/null 2>&1 &
```

---

## Workflow Routing

Route to the appropriate workflow based on request:

| Request Type | Workflow | When to Use |
|--------------|----------|-------------|
| Migration journey (7.6 → 9.x) | `Workflows/MigrationSeries.md` | Multi-part series, narrative journey, transformation story |
| Technical implementation | `Workflows/TechnicalDeepDive.md` | How-to, configurations, code, step-by-step |
| AI module explanation | `Workflows/AIModuleGuide.md` | Monitor, Health, Predict, Visual Inspection, Assist |
| Concept explainer | `Workflows/ConceptExplainer.md` | Explain Maximo concepts for mixed audience |
| Comparison/evaluation | `Workflows/ComparisonPost.md` | X vs Y, version comparisons, technology choices |
| News/announcement analysis | `Workflows/NewsAnalysis.md` | IBM announcements, new features, industry trends |
| Quick reference | `Workflows/QuickReference.md` | Cheat sheets, quick tips, configuration reference |

**Default:** If unclear, ask user which blog type they're creating.

---

## Blog Type Decision Matrix

| Content Goal | Audience | Structure | Depth | Workflow |
|--------------|----------|-----------|-------|----------|
| Share migration experience | Mixed | Narrative journey | Medium-Deep | MigrationSeries |
| Teach implementation | Practitioners | Problem → Solution → Implementation | Deep technical | TechnicalDeepDive |
| Explain AI capabilities | Decision makers + Practitioners | Concept → Deep Dive → Examples | Mixed | AIModuleGuide |
| Clarify Maximo concepts | Learners | Educational, building blocks | Foundational | ConceptExplainer |
| Compare options | Evaluators | Side-by-side analysis | Varies | ComparisonPost |
| Analyze news | Industry followers | Context → Analysis → Implications | Medium | NewsAnalysis |

---

## Research Protocol

**Before writing ANY Maximo content:**

1. **Check official IBM documentation** (ibm.com/docs/en/mas)
2. **Verify version accuracy** — Is this MAS 8.x, 9.x, or legacy 7.x?
3. **Cross-reference community sources** — Maximo Secrets, Interloc, MORE
4. **Check for recent updates** — IBM announcements, release notes
5. **Cite sources** — Always provide references

**Research sources:** See `References/MaximoSources.md`

---

## Visual Requirements

**ALL blog posts include:**

1. **Header Image** — Generated via Art skill (charcoal sketch style)
2. **Architecture Diagrams** — For technical/implementation posts
3. **Screenshots** — MAS UI where relevant
4. **Code Blocks** — Syntax highlighted, copyable
5. **Tables** — For comparisons, configurations, mappings
6. **Callout Boxes** — Warnings, tips, important notes

**Header image workflow:**
```
Invoke Art skill with:
"Create a professional blog header for [TITLE] - IBM Maximo technical blog.
Style: charcoal architectural sketch with industrial/technology elements.
Theme: [specific theme based on content]"
```

---

## Output Format

**All blog posts output as Markdown with:**

```markdown
---
title: "[Title]"
description: "[Meta description for SEO]"
date: [YYYY-MM-DD]
author: "[Author]"
tags: [maximo, mas, relevant-tags]
series: "[Series name if part of series]"
thumbnail: /images/[name]-thumb-optimized.png
---

# [Title]

> **[Summary/hook in 1-2 sentences]**

[Table of Contents if 5+ sections]

## Introduction
[Hook, context, what reader will learn]

[BODY SECTIONS - structure varies by workflow]

## Key Takeaways
[Bulleted summary of main points]

## References
[Cited sources with links]

---
*[Author bio/CTA]*
```

---

## Tone & Voice Guidelines (TheMaximoGuys Style)

**Reference:** `~/Documents/TMG_BLOGS/Planned/Blog 1 — The New Developer Mindset for MAS...md`

### Core Voice: Empathetic Expert

You are a veteran Maximo developer who has been through the transformation yourself. You speak directly TO the reader as a peer who understands their frustration — then guide them forward with confidence and clarity.

### Voice Rules

| Rule | Example |
|------|---------|
| **Second-person direct address** | "You've spent 10+ years becoming a Maximo expert." NOT "Developers have spent..." |
| **Empathetic hook first** | Open with the reader's pain point. Validate before educating. |
| **Bold, decisive statements** | "No. Absolutely not." — No hedging when debunking myths. |
| **Quoted real-world dialogue** | Use `>` blockquotes with italics: *"You can't access the database directly."* |
| **Old vs New contrast** | Always show the legacy way vs the MAS way side-by-side. |
| **Rhetorical questions for tension** | "What happened?" — Pause, then resolve. |
| **Active voice** | "MAS enforces API-only development" NOT "API-only development is enforced by MAS" |
| **First person for experience** | "I" when sharing personal journey; "you" when teaching |

### Structural Signatures

| Element | Pattern |
|---------|---------|
| **Audience callout** | `<aside> 🎯 **Who this is for:** [specific persona]` at the top of every blog |
| **Emoji section headers** | Use emoji prefixes: `🔥`, `📊`, `🚫`, `🧠`, `🛠️`, `🔍`, `💡`, `🔮`, `🎯` |
| **Key insight callouts** | `<aside> 💡 **Key insight:** [one-sentence distillation]` after major sections |
| **ASCII art infographics** | Rich inline diagrams using box-drawing characters (╔═╗║╚═╝┌─┐│└─┘) |
| **Numbered commandments** | End with "The N Commandments of [Topic]" — strong, declarative |
| **"Old world / MAS world"** | Italicized quotes showing legacy thinking vs modern reality |
| **Roadmap/checklist endings** | Practical weekly/step-by-step action plan the reader can follow |
| **Series navigation** | Always show Part X of Y, with prev/next links |
| **Resources section** | IBM Official + Community + Training — curated links |
| **Brand footer** | "**About TheMaximoGuys:** We help Maximo developers and teams..." |

### Emotional Arc

Every blog should follow this emotional trajectory:
1. **Empathy** — "I know this feels overwhelming"
2. **Tension** — "Everything you knew just changed"
3. **Myth-busting** — "Here's the biggest misconception"
4. **Education** — "Here's why it works this way"
5. **Practical tools** — "Here's your new toolbox"
6. **Optimism** — "This is actually better once you accept it"
7. **Action** — "Here's your roadmap to get there"

### Voice Variation by Blog Type

The core voice is constant. The **intensity dial** shifts by content type. See `PREFERENCES.md` for full details.

| Workflow | Voice Variant | Key Difference |
|----------|--------------|----------------|
| MigrationSeries | **Bold Challenger** | Myth-busting, grief journey, highest emotional energy |
| AIModuleGuide | **Data Authority** | Numbers-first opener, failure patterns as teaching, imperative staccato close |
| Series Openers | **Calm Historian** | Temporal anchor, ownership repetition, baseline-setting |
| Career/Skills | **Peer Coach** | From/To identity shifts, mentoring, medium energy |
| TechnicalDeepDive | **Bold Challenger** (default) | Same as migration but with heavier code blocks |
| ComparisonPost | **Data Authority** | Side-by-side with metrics, decision framework |

### Avoid

- Hedging language ("maybe", "might", "sort of")
- Third-person distance ("developers should consider...")
- Marketing hype or vendor cheerleading
- Unsupported claims without IBM doc references
- Dry academic tone — this is peer-to-peer, not textbook
- Skipping the empathetic hook — always validate before teaching

---

## Quality Checklist

Before publishing any Maximo blog:

- [ ] **Technically accurate** — Verified against IBM docs
- [ ] **Version-specific** — Clear about MAS 8.x, 9.x, or 7.x
- [ ] **Well-structured** — Logical flow, scannable
- [ ] **Visual-rich** — Header, diagrams, screenshots as appropriate
- [ ] **Actionable** — Reader knows what to do next
- [ ] **Referenced** — Sources cited
- [ ] **SEO-ready** — Meta description, tags, clear title

---

## Integration with Other Skills

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| **Art** | Header images, illustrations | Blog headers, hero images |
| **DanKoeStyle** | Marketing infographics | Comparisons, pyramids, concepts |
| **Excalidraw** | Technical diagrams | Flowcharts, architecture, org charts |
| **Research** | Deep research | Specific Maximo topics |
| **Fabric** | `improve_writing` | Prose polish |
| **FirstPrinciples** | Decomposition | Complex Maximo concepts |
| **Council** | Debate | Implementation approaches |

### Visual Skill Routing

| Visual Need | Primary Skill | Output |
|-------------|---------------|--------|
| Marketing infographic | **DanKoeStyle** | PNG (neon on black) |
| Process flowchart | **Excalidraw** | .excalidraw + PNG |
| System architecture | **Excalidraw** | .excalidraw + PNG |
| Org chart | **Excalidraw** | .excalidraw + PNG |
| Blog header | **Art** | PNG (editorial style) |
| UI screenshot | **Browser** | PNG (annotated) |

---

## Examples

**Example 1: Migration series**
```
User: "Write a blog series about migrating from Maximo 7.6 to MAS 9"
→ Route to MigrationSeries workflow
→ Narrative journey structure
→ Multi-part series with progression
```

**Example 2: Technical implementation**
```
User: "Write about implementing Maximo Visual Inspection"
→ Route to AIModuleGuide workflow
→ Concept → Deep Dive → Examples structure
→ Include architecture diagram, configuration steps
```

**Example 3: Quick reference**
```
User: "Create a Maximo Monitor configuration cheat sheet"
→ Route to QuickReference workflow
→ Dense, scannable format
→ Tables, code snippets, quick tips
```

---

## Quick Start

To invoke this skill:

```
/MaximoBlog [topic or request]
```

Or naturally:
```
"Write a Maximo blog about implementing predictive maintenance with MAS Predict"
```

The skill will:
1. Identify blog type and select appropriate workflow
2. Conduct research using MaximoSources
3. Apply your style preferences
4. Generate visuals via Art skill
5. Output polished markdown ready for publishing
