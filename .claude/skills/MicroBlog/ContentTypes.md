---
name: ContentTypes
description: Micro-content type specifications for social media decomposition
---

# Micro-Content Types

Each type is an atomic piece of social content extracted from a blog post. Every piece must stand alone — a reader who never sees the source blog should still get value.

---

## 1. Hook Post

**What:** A single provocative statement that stops the scroll. Extracted from blog openings, bold claims, or paradigm-shift moments.

**Platforms:** LinkedIn, X, Instagram

**Structure:**
```
[Bold opening statement — 1-2 sentences max]

[1-2 lines of context — why this matters]

[CTA: question or follow prompt]
```

**Character limits:** X = 280 chars (single tweet). LinkedIn = 300 chars. Instagram = 150 chars.

**Extraction signals in blog:**
- Blockquotes (`> **....**`)
- Sentences starting with "No.", "Stop.", "Here's the truth"
- Sentences with em-dashes containing a reversal
- Section opening lines

**Example from Identity Crisis post:**
```
You've mastered Maximo 7.6.

Congratulations -- now forget half of what you know.

Not because your skills are obsolete. Because the HOW changes completely in MAS 9.

Your domain knowledge? More valuable than ever. Your patterns? Time for an upgrade.

What's the first thing you'd need to unlearn?
```

---

## 2. Thread

**What:** A multi-post narrative that tells a story or walks through a concept step by step. Best for X/Twitter.

**Platforms:** X (primary), LinkedIn (adapted as single long post)

**Structure:**
```
Tweet 1: [Hook — the most provocative framing of the topic]
Tweet 2-N: [One point per tweet, building on previous]
Tweet N+1: [Summary / takeaway]
Tweet N+2: [CTA + link to full blog]
```

**Length:** 5-12 tweets, each under 280 chars.

**Extraction signals in blog:**
- Numbered lists or archetypes
- Step-by-step sections
- "Three things..." or "Four shifts..."
- Sequential arguments building to a conclusion

**Example thread structure from Identity Crisis:**
```
1/ The Maximo developer identity crisis is real.

You spent 10+ years mastering 7.6. Now MAS 9 changes the rules.

But here's what nobody tells you: your skills aren't obsolete. The HOW changes. The WHAT doesn't. Thread:

2/ ARCHETYPE 1: The App Developer

You lived in automation scripts and custom MBOs. Java classes that extended MboSet.

In MAS? Your scripts survive. Your Java needs evaluation. And GraphQL becomes your new best friend.

3/ ARCHETYPE 2: The Integration Developer

You were the MIF master. Publish channels, enterprise services, CRON tasks, SOAP.

In MAS? MIF still exists but it's not the center anymore. Welcome to event streams, API gateways, and App Connect.

4/ ARCHETYPE 3: The Admin

WebSphere whisperer. JVM tuning, connection pools, thread dumps at 3 AM.

In MAS? Your job transforms, not disappears. Operators, observability, capacity planning. The tools change. The responsibility stays.

5/ The common thread for ALL three roles:

- API-first thinking (no more direct SQL)
- Event-driven architecture (not batch-first)
- Observability over debugging
- Infrastructure as code

6/ Here's the reassuring part:

Work orders, assets, PM, workflow, security groups -- ALL the same conceptually.

Your Maximo domain expertise transfers 100%. It's the technology layer underneath that shifts.

7/ Full deep dive with role-specific learning paths:

[link]

Follow @TheMaximoGuys for the complete 4-part series.
```

---

## 3. Carousel Content

**What:** Slide-by-slide content designed to become a LinkedIn carousel PDF or Instagram carousel images. NOT the PDF itself — just the content that feeds into LinkedInCarousel skill or DanKoeStyle.

**Platforms:** LinkedIn, Instagram

**Structure:**
```
Slide 1: [Hook / Title]
Slide 2-8: [One concept per slide, large text, minimal words]
Slide 9: [Summary / TL;DR]
Slide 10: [CTA]
```

**Content per slide:** Max 40 words. One idea. One visual concept.

**Extraction signals in blog:**
- Comparison tables (From / To)
- Key takeaways lists
- Numbered archetypes or categories
- Step-by-step processes

**Tags:** `carouselReady: true` — signals LinkedInCarousel skill can process it.

---

## 4. Hot Take

**What:** A strong opinion or contrarian insight. The kind of post that gets comments because people either strongly agree or want to debate.

**Platforms:** LinkedIn (primary), X

**Structure:**
```
[Contrarian statement or strong opinion — 1-2 sentences]

[3-5 lines explaining WHY, with evidence from experience]

[Closing question that invites debate]
```

**Length:** 100-200 words.

**Extraction signals in blog:**
- "This isn't..." / "This is actually..."
- Myth-busting sections
- Paradigm shift statements
- Sentences with "NOT" or "not a ... but a ..."

**Example from Identity Crisis:**
```
MAS 9 is not a Maximo upgrade.

I'll say it again: MAS 9 is NOT a version upgrade. It's an architectural paradigm shift.

The database is different. The deployment model is different. The extension patterns are different. The operational model is different.

The only thing that carries over 1:1? Your domain knowledge. Work orders, assets, PM, workflow -- the business logic is the same.

Everything else? New playbook.

Stop planning your MAS migration like it's a 7.6.1.x fixpack. Start planning it like you're adopting a new platform -- because you are.

Agree or disagree? Drop your take below.
```

---

## 5. FAQ Post

**What:** A single question-answer pair from the blog's FAQ section, expanded slightly for social context.

**Platforms:** All

**Structure:**
```
[Question as headline — bold, relatable]

[Answer — direct, no hedging, 3-5 sentences]

[Related question to spark engagement]
```

**Extraction signals:** Direct from frontmatter `faqs` array.

---

## 6. Listicle

**What:** A numbered list of insights, tips, or categories. Highly shareable and saveable.

**Platforms:** Instagram (primary), LinkedIn

**Structure:**
```
[Title: "N Things Every Maximo Dev Must Know About MAS 9"]

1. [Point + 1-sentence explanation]
2. [Point + 1-sentence explanation]
...

[CTA: Save this / Share with a colleague]
```

**Length:** 3-7 items. Each item under 30 words.

**Extraction signals:**
- Numbered headings in blog
- "N things..." / "N shifts..." / "N archetypes..."
- Key takeaways list

**Tags:** `infographicReady: true` — signals DanKoeStyle can create a visual.

---

## 7. Contrast Post

**What:** A side-by-side "old way vs new way" comparison. The most visually convertible type.

**Platforms:** All

**Structure:**
```
[Title: "Old Maximo vs MAS Thinking"]

OLD: [Legacy pattern]
NEW: [MAS pattern]

OLD: [Legacy pattern]
NEW: [MAS pattern]

[1-sentence takeaway]
```

**Extraction signals:**
- From/To tables in blog
- "Old world / MAS world" comparisons
- Any "instead of X, do Y" patterns

**Tags:** `carouselReady: true`, `infographicReady: true`

---

## Content Volume Target

Per blog post, aim to generate:

| Type | Count | Priority |
|---|---|---|
| Hook | 2-3 | High |
| Thread | 1 | High |
| Carousel | 1-2 | High |
| Hot Take | 2-3 | Medium |
| FAQ | All from frontmatter | Medium |
| Listicle | 1 | Medium |
| Contrast | 1-2 | High |

**Total per blog:** 10-15 micro-content pieces, covering all platforms.
