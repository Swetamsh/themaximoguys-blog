---
name: PostTemplates
description: LinkedIn post copy templates for each TMG micro-content type
---

# Post Copy Templates

Templates for transforming micro-content into LinkedIn-ready post copy. Each template optimizes for LinkedIn's feed algorithm and reading patterns.

## Global Rules

- **Character limit:** ~3,000 characters max (LinkedIn hard limit)
- **"See more" cutoff:** First ~210 characters appear in feed — this is your hook
- **Line breaks:** Use single blank lines to create visual breathing room
- **Emoji usage:** 1-2 per post max, only for visual markers (not decoration). Use at line starts, never mid-sentence
- **Voice:** Professional but approachable. Maximo-expert authority. No corporate jargon, no hype words
- **CTA placement:** Always last 2-3 lines
- **Brand sign-off:** End with `— The Maximo Guys` when appropriate

## Template: Hook

**Purpose:** Provocative opener that stops the scroll. Short, punchy, drives engagement.

```markdown
[Opening line — provocative statement or question, under 210 chars]

[1-2 sentences expanding the tension or contradiction]

[Optional: brief personal/expert context — "After migrating 50+ orgs..."]

[CTA: question to audience OR link to full article]

---
[3-5 hashtags]
```

**Example:**
```
Your automation script runs fine in dev.

Then it hits production and everything breaks.

The problem isn't your code — it's that MBOs were never designed for what you're asking them to do.

MAS 9 changes the game entirely. No more business objects. No more deployment packages. Just APIs, GraphQL, and modern tooling.

Have you hit the MBO wall yet? What broke first?

#Maximo #MAS9 #AssetManagement #IBMMaximo #DigitalTransformation
```

**Guidelines:**
- First line MUST work standalone in the feed preview
- Create tension between old way and new way
- Don't give away the full answer — drive curiosity
- End with an engagement question

## Template: Hot Take

**Purpose:** Strong, contrarian opinion that sparks debate. Positions TMG as thought leaders.

```markdown
[Bold contrarian statement — under 210 chars, no hedging]

[2-3 sentences defending the position with evidence/experience]

[Acknowledge the counterargument briefly]

[Restate position with nuance]

[CTA: "Agree or disagree?" or similar debate prompt]

---
[3-5 hashtags]
```

**Example:**
```
Stop extending MBOs. Seriously, just stop.

Every custom MBO you build in Maximo 7.6 is technical debt you'll pay for in the MAS 9 migration. Every single one.

I know — extending was the "right" way to customize for 20 years. IBM told us to do it. But the architecture has fundamentally changed.

In MAS 9, you compose with APIs and configure with App Connect. The MBO layer doesn't exist anymore.

Build forward, not backward. Your future self will thank you.

Agree or disagree? I want to hear from teams in the middle of migration.

#Maximo #MAS9 #EAM #TechnicalDebt #IBMMaximo
```

**Guidelines:**
- Lead with the hot take — no preamble
- Back it up with real experience (not theory)
- Acknowledge the other side to show expertise, not ignorance
- End with a genuine invitation to debate

## Template: FAQ

**Purpose:** Answer a common Maximo question authoritatively. Positions TMG as the go-to resource.

```markdown
[Question as the opening line — under 210 chars]

[Direct, clear answer in 1-2 sentences]

[Supporting detail or context — why this matters]

[Common misconception or follow-up point]

[CTA: "More questions? Drop them below" or link to resource]

---
[3-5 hashtags]
```

**Example:**
```
"Can I run my existing automation scripts in MAS 9?"

Short answer: No — not directly.

Automation scripts in 7.6 run inside the MBO framework. In MAS 9, the execution model is completely different. Your scripts need to be re-implemented as REST-triggered automations or App Connect flows.

The good news? Most scripts actually get simpler in the new model. You lose the MBO boilerplate and gain API composability.

What's your most complex automation script? Let's talk about migration paths.

#Maximo #MAS9 #AutomationScripts #IBMMaximo #AssetManagement
```

**Guidelines:**
- Start with the actual question (in quotes)
- Answer directly — don't bury the answer
- Add expert context that goes beyond the docs
- Mention what most people get wrong

## Template: Carousel

**Purpose:** Companion post copy for a carousel PDF upload. Drives engagement with the carousel content.

```markdown
[Hook line summarizing the carousel topic — under 210 chars]

[1-2 sentences setting context for why this matters NOW]

[Brief overview of what the carousel covers — NOT a slide-by-slide summary]

[Swipe prompt: "Swipe through to see..." or "Slide through for..."]

[CTA: save, share, or comment prompt]

---
[3-5 hashtags]
```

**Example:**
```
Maximo 7.6 development vs MAS 9 development — slide by slide.

If you're planning a migration, you need to understand how fundamentally different the developer experience is. This isn't a version upgrade. It's a paradigm shift.

Swipe through to see the old way vs the new way across data access, UI building, integrations, testing, and deployment.

Save this for your migration planning sessions.

Which slide surprised you most? Let me know below.

#Maximo #MAS9 #Development #IBMMaximo #AssetManagement
```

**Guidelines:**
- Hook must work WITHOUT seeing the carousel
- Don't describe every slide — tease the value
- Always include a "swipe" prompt
- Ask for saves (boosts algorithm) and comments

## Template: Contrast

**Purpose:** Old vs New comparison. Clear, authoritative side-by-side that demonstrates expertise.

```markdown
[Framing line: "X has changed. Here's how." — under 210 chars]

[Old way — 2-3 bullet points or short paragraph]

[Transition: "Now..." or "In MAS 9..."]

[New way — 2-3 bullet points or short paragraph]

[Key insight: what this shift really means]

[CTA: "Which side are you on?" or "Where is your team?"]

---
[3-5 hashtags]
```

**Example:**
```
How you build integrations in Maximo has completely changed.

The old way (7.6):
- Integration Framework with publish channels
- XML-based message processing
- Custom Java classes for transformation
- Deployment headaches across environments

The new way (MAS 9):
- App Connect flows with visual drag-and-drop
- REST/GraphQL APIs out of the box
- Pre-built connectors for SAP, ServiceNow, Salesforce
- Cloud-native, no deployment packages

The shift isn't just technical — it's operational. Integration work goes from weeks to days.

Where is your team on this journey?

#Maximo #MAS9 #Integration #AppConnect #IBMMaximo
```

**Guidelines:**
- Structure must be visually scannable (bullets or short lines)
- Old way should feel painful but familiar
- New way should feel exciting but credible
- End with the strategic insight, not just the feature list

## Template: Thread

**Purpose:** Multi-point narrative adapted from X thread format to a single LinkedIn post.

```markdown
[Opening hook — the big claim or question, under 210 chars]

[Point 1 — with brief evidence or example]

[Point 2 — builds on point 1]

[Point 3 — the turning point or surprise]

[Point 4-5 — resolution or recommendations]

[Closing thought — ties it all together]

[CTA: engagement question]

---
[3-5 hashtags]
```

**Example:**
```
I've watched 30+ Maximo migrations. Here's the pattern that separates success from failure.

1. Successful teams audit their customizations FIRST. Not the data. Not the integrations. The customizations.

2. They categorize every MBO extension, every automation script, every custom app into: keep, replace, or retire.

3. The surprise? Most teams retire 40-60% of their customizations. They were workarounds for limitations that MAS 9 solves natively.

4. The teams that struggle? They try to replicate everything 1:1. Every custom field. Every workflow. That's not migration — that's archaeology.

5. Build for where you're going, not where you've been.

What percentage of your customizations do you think you'd actually need in MAS 9?

#Maximo #MAS9 #Migration #EAM #AssetManagement
```

**Guidelines:**
- Number your points for scannability
- Each point should be independently valuable
- Build narrative tension — don't front-load the best insight
- Adapt X thread pacing to single-post format (no "1/" numbering)

## Template: Listicle

**Purpose:** Quick-hit value list. High save rate, good for algorithm.

```markdown
[Title line: "N things about X" — under 210 chars]

[Brief context: why this list matters]

[1. Point one — 1-2 sentences]
[2. Point two — 1-2 sentences]
[3. Point three — 1-2 sentences]
[...continue for 5-8 points]

[Closing: summary or bonus tip]

[CTA: "Save this for later" or "What would you add?"]

---
[3-5 hashtags]
```

**Guidelines:**
- 5-8 items is the sweet spot
- Each item must be independently useful
- Front-load the most surprising or valuable items
- "Save this" CTA works well for listicles (high save = algorithm boost)
