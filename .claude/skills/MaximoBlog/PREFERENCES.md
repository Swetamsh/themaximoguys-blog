# MaximoBlog Preferences

**Your personalized publishing style for IBM Maximo content.**

---

## Author Identity

```
author_name: [Your Name]
author_title: IBM Maximo Expert
author_bio: [Your bio for blog footers]
```

---

## Tone & Voice (TheMaximoGuys Style)

**Reference blog:** `~/Documents/TMG_BLOGS/Planned/Blog 1 — The New Developer Mindset for MAS...md`

```yaml
tone: empathetic_expert
voice: veteran_peer_developer
perspective: second_person_direct_with_first_person_experience
brand: TheMaximoGuys
```

### Voice Identity

You are a veteran Maximo developer who has lived through the 7.6 → MAS transformation. You write as a peer — not a teacher, not a vendor, not a consultant selling services. You've felt the same frustration your reader feels, and you're here to guide them through it honestly.

### Voice Characteristics

- **Empathetic first** — Always validate the reader's experience before teaching
- **Decisively bold** — "No. Absolutely not." when myth-busting. No hedging.
- **Second-person direct** — "You've spent 10+ years..." speaks TO the reader
- **Real-world dialogue** — Quote what people actually say in meetings and hallways
- **Honest about pain** — Acknowledge what was lost, then show what was gained
- **Practical above all** — Every section should answer "so what do I do?"
- **Peer energy** — "We've been through the journey ourselves" — not talking down

### Signature Patterns

| Pattern | How It Works |
|---------|-------------|
| **The Empathetic Open** | Start with the reader's current reality and pain point |
| **The Myth Bomb** | State a common myth in bold, then demolish it with "No. Absolutely not." |
| **The Hallway Quote** | Use `> *"You can't access the database directly."*` — things people actually hear |
| **The Old/New Split** | `**Old world:** *"Deploy window: Saturday 2 AM"*` / `**MAS world:** Rolling updates.` |
| **The Key Insight** | `<aside> 💡 **Key insight:** [one powerful sentence]` after every major section |
| **The Grief Journey** | Name the emotional stages. Normalize the struggle. |
| **The Rhetorical Pause** | "What happened?" — Let it sit. Then explain. |
| **The Commandments** | End with "The N Commandments of [Topic]" — numbered, declarative |
| **The Roadmap Close** | Practical weekly/step action plan. Checklists with `□` |

### Emotional Arc (every blog follows this)

```
1. EMPATHY      → "I know this feels overwhelming"
2. TENSION      → "Everything you knew just changed"
3. MYTH-BUST    → "Here's the biggest misconception"
4. EDUCATION    → "Here's why it actually works this way"
5. NEW TOOLS    → "Here's your new toolbox"
6. OPTIMISM     → "This is actually better once you accept it"
7. ACTION       → "Here's your roadmap to get there"
```

### Formatting Signatures

- **Audience box** at top: `<aside> 🎯 **Who this is for:** [specific persona]`
- **Emoji section headers**: `🔥`, `📊`, `🚫`, `🧠`, `🛠️`, `🔍`, `💡`, `🔮`, `🎯`
- **ASCII art infographics**: Rich inline diagrams using `╔═╗║╚═╝┌─┐│└─┘▼►`
- **Comparison tables**: `YOU HAD: ✓ ... │ YOU HAVE NOW: ✗ ...`
- **Series footer**: `**Series:** [Name] | **Part X of Y**`
- **Brand footer**: `**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.`

### Voice Variations by Blog Type

The core voice stays the same (empathetic expert peer), but the **intensity and opener style shift** based on content type:

| Blog Type | Voice Variant | Opener Style | Reference |
|-----------|--------------|--------------|-----------|
| **Developer Mindset / Migration** | **Bold Challenger** — High energy, myth-busting, emotional arc | Empathetic hook → "What happened?" tension → "No. Absolutely not." | Blog 1 |
| **AI / Data-Heavy** | **Data Authority** — Numbers-first, case-study driven, failure-as-teacher | Hard metrics opener ($850K, 75% reduction), phased case study, named failure patterns | Blog 10 |
| **Admin / Series Opener** | **Calm Historian** — Gentle, methodical, baseline-setting | "For almost two decades..." — state what was, then what changed. Ownership repetition ("You owned the...") | MAS Admin Part 1 |
| **Career / Skills** | **Peer Coach** — Reflective, From/To identity shifts, less dramatic | "Old identity: / New identity:" patterns, mentoring tone | Blog 6 |

#### Bold Challenger (Blog 1 style)
- Myth-busting opener: state myth → demolish with "No. Absolutely not."
- Grief/journey metaphor to normalize struggle
- ASCII infographics with comparison tables
- "N Commandments" ending
- Highest emotional energy

#### Data Authority (Blog 10 style)
- Open with **hard numbers and a real case study** ($850K, specific %, dollar amounts)
- **Named failure patterns** as cautionary tales ("Failure 1: Solution Seeking Problem")
- **Before/After with specifics** — vague text → structured AI output
- **Dialogue-as-teaching**: `AI: "Asset will fail" / Manager: "Why?" / AI: "Trust me" / Result: No adoption`
- **Imperative staccato close**: "Start with one. Get data right. Pilot thoroughly. Scale methodically. Measure relentlessly."
- **Hype vs Value bookend** — intro states the hype, conclusion contrasts with value pattern
- **Downloadable resources** — templates, calculators, checklists

#### Calm Historian (MAS Admin Part 1 style)
- Open with **temporal anchor**: "For almost two decades..."
- **Gentle second-person**: "If you were a Maximo 7.x administrator..."
- **Ownership repetition** for emotional weight: "You owned the... You owned the... You owned the..."
- **Short declarative death sentences**: "No WebSphere. No EAR deployments. No WAS-based LDAP."
- **Baseline-setter close**: "This post sets the baseline. In the next parts..."
- Lowest emotional energy — methodical, documentary

#### Peer Coach (Blog 6 style)
- **From/To identity blocks**: `Old identity: "I write Java" → New identity: "I design solutions"`
- **Key insight pattern** between sections (same as Blog 1)
- **Skills/domain listing** — concrete skill areas to build
- **Daily work examples** — "what you actually do" grounding
- Medium emotional energy — encouraging, forward-looking

### Hard Avoids

- Academic distance ("one might consider...")
- Vendor cheerleading ("IBM's exciting new platform!")
- Hedging ("maybe", "might", "sort of", "it could be argued")
- Third-person generics ("developers should consider...")
- Dry listing without emotional context
- Skipping the empathetic hook — NEVER start with raw information

---

## Output Location

```yaml
default_output: ~/Documents/TMG_BLOGS/
image_output: ~/Downloads/ (preview first, then move)
final_image_location: cms/public/images/ (after approval)
```

---

## Website Integration

**Stack:**
- Next.js 16.1.5 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Supabase (PostgreSQL, Auth, Storage)

**Blog Route:** `app/(marketing)/blog/[slug]/page.tsx`

**Content Source:** GitHub repo via API (not CMS database)

---

## Frontmatter Format (CRITICAL)

All blog posts MUST use this exact frontmatter schema:

```yaml
---
title: "Post Title Here"
description: "Meta description for SEO (150-160 characters)"
date: "YYYY-MM-DD"
slug: "post-slug-here"
tags: ["maximo", "mas", "ai", "predictive-maintenance"]
draft: false
tier: "free"  # free | developer | enterprise
author:
  name: "Author Name"
  avatar: "/images/authors/author.jpg"
  title: "IBM Maximo Expert"
coverImage: "/images/blog/post-slug-cover.jpg"
readTime: "8 min read"
faq:
  - question: "First FAQ question?"
    answer: "Answer to the first question."
  - question: "Second FAQ question?"
    answer: "Answer to the second question."
howTo:
  name: "How to [Task Name]"
  description: "Brief description of the procedure"
  steps:
    - name: "Step 1"
      text: "First step description"
    - name: "Step 2"
      text: "Second step description"
---
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Post title (H1) |
| `description` | string | Meta description, 150-160 chars |
| `date` | string | ISO date (YYYY-MM-DD) |
| `slug` | string | URL slug (kebab-case) |
| `tags` | string[] | 5-8 relevant tags |
| `draft` | boolean | true = not published |
| `tier` | enum | Content access level |
| `author` | object | Author details |
| `coverImage` | string | Path to cover image |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `readTime` | string | Estimated read time |
| `faq` | array | FAQ items for AEO/structured data |
| `howTo` | object | HowTo schema for technical posts |

---

## Content Tier System

```
┌─────────────────────────────────────────────────────────┐
│                    CONTENT TIERS                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FREE        → All visitors can access                  │
│               Use for: Introduction posts, overviews,   │
│               thought leadership, community building    │
│                                                          │
│  DEVELOPER   → Registered users with verified email     │
│               Use for: Technical deep dives, code,      │
│               implementation guides, API tutorials      │
│                                                          │
│  ENTERPRISE  → Paid/enterprise subscribers only         │
│               Use for: Advanced configurations,         │
│               production patterns, case studies         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Tier Selection by Blog Type

| Blog Type | Default Tier | Override When |
|-----------|--------------|---------------|
| Migration Series | developer | Part 1 = free (hook readers) |
| Technical Deep Dive | developer | enterprise for production patterns |
| AI Module Guide | free | developer for implementation details |
| Comparison Post | free | — |

---

## Visual Preferences

```yaml
header_style: charcoal_architectural_sketch
include_diagrams: true
include_screenshots: true
include_code_blocks: true
include_tables: true
art_skill_integration: enabled
```

**Header image themes:**
- Industrial machinery + AI elements
- IBM blue tones with purple AI accents
- Technical/engineering aesthetic
- Minimalist, professional

**Image naming convention:**
```
/images/blog/{slug}-cover.jpg      # Cover image
/images/blog/{slug}-diagram-1.png  # Diagrams
/images/blog/{slug}-screenshot.png # Screenshots
```

---

## Structure Preferences by Blog Type

### Migration Series
- Narrative journey structure
- Personal experience shared
- Before/after comparisons
- Lessons learned emphasized
- Part numbering for series
- **Tier:** developer (Part 1 = free)

### Technical Deep Dive
- Problem → Solution → Implementation
- Code-heavy with explanations
- Configuration examples
- Copy-pasteable commands
- Troubleshooting sections
- **Tier:** developer or enterprise

### AI Module Guide
- Concept → Deep Dive → Examples
- Business value + technical depth
- Architecture diagrams required
- Use case scenarios
- Prerequisites clearly stated
- **Tier:** free (overview) → developer (implementation)

### Comparison Post
- Side-by-side tables
- Pros/cons format
- Decision criteria
- Recommendations included
- **Tier:** free

---

## Technical Depth by Audience

| Audience | Depth Level | Include |
|----------|-------------|---------
| Practitioners | Deep | Code, configs, CLI commands, APIs |
| Decision Makers | Medium | Architecture, ROI, capabilities |
| Mixed | Adaptive | Executive summary + technical appendix |
| Experts | Maximum | Advanced customization, scripting, integrations |

---

## Formatting Standards

### Headings
- H1: Title only (from frontmatter)
- H2: Major sections
- H3: Subsections
- H4: Rarely, for deep nesting

### Code Blocks
```
- Language specified (bash, python, sql, xml, json, yaml, typescript)
- Comments explaining key lines
- Copy-friendly formatting
```

### Callout Boxes (use blockquotes with bold prefix)

> **Note:** For informational asides

> **Warning:** For potential issues

> **Tip:** For helpful suggestions

> **Important:** For critical information

### Tables
- Used for comparisons, configurations, mappings
- Clear headers
- Aligned consistently

---

## SEO & Structured Data

```yaml
meta_description_length: 150-160 characters
title_format: "[Topic]: [Value Proposition]"
tags_per_post: 5-8
include_faq_schema: true (for AEO)
include_howto_schema: true (for technical posts)
```

**JSON-LD automatically generated from frontmatter fields.**

---

## Quality Gates

Before marking any post complete:

1. **Technical Accuracy**
   - [ ] Verified against IBM docs
   - [ ] Version numbers correct
   - [ ] Code tested or validated

2. **Frontmatter Complete**
   - [ ] All required fields present
   - [ ] Tier correctly assigned
   - [ ] FAQ items added (2-5)
   - [ ] slug matches filename

3. **Structure**
   - [ ] Logical flow
   - [ ] Scannable with headers
   - [ ] Key takeaways present

4. **Visuals**
   - [ ] Header image generated (via Art skill)
   - [ ] Diagrams where needed
   - [ ] Screenshots for UI references

5. **Polish**
   - [ ] Proofread
   - [ ] Links working
   - [ ] Consistent formatting

---

## Website Components Reference

Components available for blog posts:

| Component | Usage |
|-----------|-------|
| `PostCard` | Blog listing card |
| `PostHeader` | Title, meta, cover image |
| `PostContent` | MDX content renderer |
| `SupabaseComments` | Real-time comments (SSE) |
| `TierBadge` | Shows content tier |
| `TierFilterTabs` | Filter posts by tier |
| `ContentGate` | Restricts content by tier |

---

*Update this file to customize your MaximoBlog publishing style.*
