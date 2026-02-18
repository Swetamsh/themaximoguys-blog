# Migration Series Workflow

**For narrative journey content: Maximo 7.6 → MAS 8.x/9.x migrations.**

---

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Migration Series workflow in MaximoBlog skill"}' \
  > /dev/null 2>&1 &
```

Running **MigrationSeries** in **MaximoBlog**...

---

## When to Use

- Multi-part migration journey series
- Version upgrade experiences
- Transformation stories (7.6 → 8.x → 9.x)
- Lessons learned from migrations
- Before/after comparisons
- Organizational change alongside technical change

---

## Structure: Narrative Journey

```
┌─────────────────────────────────────────────────────┐
│                  MIGRATION SERIES                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  PART 1: THE STARTING POINT                          │
│  └── Where we were, why change was needed           │
│                                                      │
│  PART 2: PLANNING THE JOURNEY                        │
│  └── Assessment, decisions, preparation             │
│                                                      │
│  PART 3: THE MIGRATION (Technical)                   │
│  └── Actual migration steps, challenges             │
│                                                      │
│  PART 4: WHAT WE LEARNED                             │
│  └── Lessons, surprises, recommendations            │
│                                                      │
│  PART 5: THE NEW WORLD                               │
│  └── Benefits realized, what's next                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Series Planning

### Before Writing: Define the Arc

1. **Starting Point** — Where were you? (Maximo 7.6.x, on-premises, etc.)
2. **Catalyst** — What drove the decision to migrate?
3. **Journey** — What was the path? (Assessment → Planning → Execution)
4. **Challenges** — What went wrong or was harder than expected?
5. **Transformation** — What changed beyond just the technology?
6. **Destination** — Where are you now? What's the new capability?
7. **Lessons** — What would you do differently?

### Series Structure Options

**Option A: Chronological (5 parts)**
1. Why We Decided to Migrate
2. Planning and Preparation
3. The Migration Process
4. Challenges and How We Overcame Them
5. Life After Migration: Results and Lessons

**Option B: Thematic (6 parts)**
1. The Business Case for Migration
2. Technical Assessment and Planning
3. Data Migration Deep Dive
4. Customization and Integration Migration
5. User Training and Change Management
6. Results, Metrics, and Lessons Learned

**Option C: Module-Focused (7+ parts)**
1. Overview: Our Migration Journey
2. Migrating Maximo Manage
3. Implementing Monitor (New)
4. Adding Health and Predict
5. Enabling Assist (Gen AI)
6. Integration and Customization
7. Lessons Learned and What's Next

---

## Workflow Steps

### Step 1: Plan the Series

Before writing any individual post:

```markdown
# Migration Series Plan

## Series Title
"[Journey Title]: Migrating from Maximo 7.6 to MAS 9"

## Target Audience
[Who is this for?]

## Series Arc
1. Part 1: [Title] — [One sentence description]
2. Part 2: [Title] — [One sentence description]
3. Part 3: [Title] — [One sentence description]
[Continue...]

## Key Themes
- [Theme 1]
- [Theme 2]
- [Theme 3]

## Unique Value
What makes this migration story worth reading?
```

### Step 2: Individual Post Structure

Each post in the series follows this structure:

```markdown
## Opening Hook
[Start with a moment, challenge, or realization]

## Context
[Where this fits in the journey]

## The Story
[Narrative of what happened]

## Technical Details
[Specific technical content]

## Lessons from This Phase
[What we learned]

## What's Next
[Bridge to next post in series]
```

### Step 3: Narrative Elements

**Use storytelling techniques:**

- **Specific moments:** "It was 2 AM when the data migration finally completed..."
- **Challenges faced:** "What we didn't anticipate was..."
- **Decisions made:** "We had to choose between..."
- **Emotions:** "The relief when we saw the first successful test..."
- **People involved:** "Our DBA, who had managed Maximo for 15 years..."

**Balance narrative with technical:**
- Tell the story, then provide the technical detail
- Use callout boxes for deep technical content
- Include code/config where relevant but don't let it overwhelm the narrative

### Step 4: Before/After Comparisons

Include concrete comparisons:

```markdown
## Before vs. After

| Aspect | Maximo 7.6 | MAS 9 |
|--------|------------|-------|
| Deployment | On-premises | Cloud (OpenShift) |
| Maintenance | Manual upgrades | Continuous updates |
| AI Capabilities | None | Monitor, Predict, Assist |
| Mobile | Limited | Full mobile suite |
| [Add more...] | | |
```

### Step 5: Lessons Learned Format

For lessons learned content:

```markdown
## Lessons Learned

### 1. [Lesson Title]

**What happened:**
[Brief story of what occurred]

**What we learned:**
[The insight]

**What we'd do differently:**
[Actionable recommendation]

### 2. [Lesson Title]
[Repeat format...]
```

---

## Series Post Templates

### Part 1: The Starting Point

```markdown
---
title: "Our Maximo Migration Journey, Part 1: Why We Decided to Change"
description: "The catalyst for our Maximo 7.6 to MAS 9.x migration - what drove the decision and lessons learned."
date: "YYYY-MM-DD"
slug: "maximo-migration-journey-part-1"
tags: ["maximo", "mas", "migration", "7.6", "mas-9", "journey"]
draft: false
tier: "free"
author:
  name: "Author Name"
  avatar: "/images/authors/author.jpg"
  title: "IBM Maximo Expert"
coverImage: "/images/blog/maximo-migration-journey-cover.jpg"
readTime: "8 min read"
faq:
  - question: "Why migrate from Maximo 7.6 to MAS?"
    answer: "Key drivers include AI capabilities, cloud flexibility, and continuous updates..."
  - question: "How long does a Maximo migration take?"
    answer: "Typical migrations range from 6-18 months depending on complexity..."
---

# [Title]

> **[Hook: A moment that crystallized the need for change]**

## Where We Were

[Description of the starting environment]

### Our Maximo 7.6 Environment

- **Version:** 7.6.x.x
- **Deployment:** [On-premises/hosted]
- **Users:** [Number]
- **Assets:** [Number]
- **Customizations:** [High-level description]

## The Catalyst

[What drove the decision to migrate?]

### Business Drivers
- [Driver 1]
- [Driver 2]

### Technical Drivers
- [Driver 1]
- [Driver 2]

## The Decision

[How the decision was made]

## What's Next

In Part 2, we'll cover how we planned and prepared for the migration...

---

*[Series navigation: Part 1 | Part 2 | Part 3...]*
```

### Part N: Technical Migration

```markdown
---
title: "Our Maximo Migration Journey, Part 3: The Technical Migration"
description: "The technical execution of our Maximo migration - challenges faced and solutions found."
date: "YYYY-MM-DD"
slug: "maximo-migration-journey-part-3"
tags: ["maximo", "mas", "migration", "technical", "implementation"]
draft: false
tier: "developer"
author:
  name: "Author Name"
  avatar: "/images/authors/author.jpg"
  title: "IBM Maximo Expert"
coverImage: "/images/blog/maximo-migration-journey-cover.jpg"
readTime: "15 min read"
faq:
  - question: "What are the biggest technical challenges in Maximo migration?"
    answer: "Data migration, customization conversion, and integration updates..."
  - question: "How do you handle Maximo customizations during migration?"
    answer: "Evaluate, modernize, or replace using MAS extensibility..."
howTo:
  name: "How to Execute Maximo Data Migration"
  description: "Step-by-step technical migration process"
  steps:
    - name: "Assess current state"
      text: "Document all customizations and integrations"
    - name: "Plan migration approach"
      text: "Choose lift-and-shift vs modernize strategy"
    - name: "Execute migration"
      text: "Follow phased migration approach"
---

# [Title]

> **[Hook: A moment from the migration itself]**

## The Migration Approach

[High-level approach]

## Phase 1: [Phase Name]

### What We Did
[Narrative + technical details]

### Challenges
[What went wrong]

### How We Solved It
[Resolution]

## Phase 2: [Phase Name]
[Continue...]

## Key Technical Decisions

| Decision | Options Considered | What We Chose | Why |
|----------|-------------------|---------------|-----|
| [Decision 1] | [Options] | [Choice] | [Rationale] |

## What's Next

In Part 4, we'll share the unexpected challenges and lessons learned...
```

### Final Part: Lessons and Results

```markdown
---
title: "Our Maximo Migration Journey, Part 5: Results and Lessons Learned"
description: "Results, metrics, and hard-won lessons from our Maximo 7.6 to MAS 9.x migration."
date: "YYYY-MM-DD"
slug: "maximo-migration-journey-part-5"
tags: ["maximo", "mas", "migration", "lessons-learned", "results"]
draft: false
tier: "developer"
author:
  name: "Author Name"
  avatar: "/images/authors/author.jpg"
  title: "IBM Maximo Expert"
coverImage: "/images/blog/maximo-migration-journey-cover.jpg"
readTime: "10 min read"
faq:
  - question: "What ROI can you expect from Maximo migration?"
    answer: "Organizations typically see 20-40% improvement in maintenance efficiency..."
  - question: "What are the most common migration mistakes?"
    answer: "Underestimating data cleanup, skipping user training, and rushing timelines..."
---

# [Title]

> **[Hook: Reflection on the journey]**

## Where We Are Now

[Current state description]

## Results

### Quantitative
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| [Metric 1] | [Value] | [Value] | [%] |

### Qualitative
- [Improvement 1]
- [Improvement 2]

## Lessons Learned

### 1. [Major Lesson]
[Details...]

### 2. [Major Lesson]
[Details...]

## What We'd Do Differently

1. [Recommendation]
2. [Recommendation]

## What's Next for Us

[Future plans]

## Advice for Others Starting This Journey

[Recommendations for readers considering migration]

---

*Thank you for following our migration journey. [CTA]*
```

---

## Visual Requirements

For Migration Series posts:

1. **Series Header Image** — Consistent across all parts
   ```
   "Create a professional blog header for 'Maximo Migration Journey' series -
   transformation from legacy to modern.
   Style: charcoal architectural sketch.
   Theme: journey/transformation, old to new, industrial evolution"
   ```

2. **Before/After Diagrams** — Architecture comparisons

3. **Timeline Graphics** — For multi-phase migrations

4. **Screenshots** — Old UI vs new UI comparisons

5. **Progress Indicators** — Show where reader is in series

---

## Series Navigation

Include navigation in each post:

```markdown
---

## Series Navigation

| Part | Title | Status |
|------|-------|--------|
| 1 | [Why We Decided to Change](link) | Published |
| 2 | [Planning and Preparation](link) | Published |
| **3** | **The Technical Migration** | **You are here** |
| 4 | [Challenges and Lessons](link) | Coming soon |
| 5 | [Results and Recommendations](link) | Coming soon |

---
```

---

## Quality Checklist

For each post in the series:

- [ ] Fits the overall series arc
- [ ] Opens with a hook/moment
- [ ] Balances narrative with technical
- [ ] Includes specific details (not generic)
- [ ] Has lessons/insights
- [ ] Bridges to next post
- [ ] Series navigation included
- [ ] Consistent header image/branding
- [ ] Version numbers accurate

For the series as a whole:

- [ ] Arc is complete (beginning → middle → end)
- [ ] Each part stands alone but connects
- [ ] Consistent voice throughout
- [ ] Valuable to someone considering similar migration
- [ ] Technical depth appropriate
- [ ] Unique perspective (not generic migration guide)

---

*This workflow produces compelling narrative content that shares real migration experiences.*
