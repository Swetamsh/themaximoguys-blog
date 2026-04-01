---
name: ContentTypes
description: Micro-content type specifications for social media decomposition
---

# Micro-Content Types

Each type is an atomic piece of social content extracted from a blog post. Every piece must stand alone — a reader who never sees the source blog should still get full value.

---

## 1. Hook Post

**What:** A single thought that makes someone pause mid-scroll. Not a declaration — more like the one sentence from the blog that made *you* stop and think.

**Platforms:** All

**Structure:**
```
[The thought — 1-2 sentences that feel personal and specific]

[A line or two of context — why this hits home]

[Optional: a genuine question, or just let it land]
```

**Character guidance:** X = 280 chars (single tweet). LinkedIn = 300 chars. Instagram = 150 chars.

**Extraction signals:**
- Blockquotes with bold text (`> **....**`)
- Moments of empathetic honesty — "That statement stings."
- Sentences with em-dashes containing a reversal or surprise
- Story-driven openers — vivid moments, specific details
- "Your fears" sections — the real worries people have

---

## 2. Thread

**What:** A multi-post story that walks through an idea the way you'd explain it to a friend — one thought at a time, building naturally.

**Platforms:** X (primary), LinkedIn (adapted as single long post)

**Structure:**
```
Post 1: [The hook — the part that makes them curious, not a clickbait headline]
Post 2-N: [One thought per post, conversational, building on the last]
Post N+1: [The honest takeaway]
Post N+2: [Link to the full blog — casual, not salesy]
```

**Length:** 5-10 posts, each under 280 chars for X.

**Extraction signals:**
- Numbered archetypes or categories ("Three developer types...")
- Step-by-step sections with a natural narrative arc
- "Your fears / The reality" patterns across multiple roles
- Sequential arguments that build toward an honest conclusion

---

## 3. Carousel Content

**What:** Slide-by-slide content designed to become visual slides (PDF, images). This is the **content blueprint** — visual generation is handled by downstream skills (LinkedInCarousel, DanKoeStyle, SketchCarousel).

**Platforms:** LinkedIn, Instagram

**Structure:**
```
Slide 1: [Hook / Title]
Slide 2-8: [One concept per slide, large text, minimal words]
Slide 9: [Summary / TL;DR]
Slide 10: [CTA]
```

**Content per slide:** Max 40 words. One idea. One visual concept.

**Extraction signals:**
- Comparison tables (Before / After)
- Key takeaways lists
- Numbered archetypes or categories
- Step-by-step processes

**Tags:** `carouselReady: true`

---

## 4. Hot Take

**What:** An honest opinion that might be uncomfortable. Not rage-bait — more like the thing everyone's thinking but nobody's saying out loud. The blogs do this by stating something directly, then backing it up with genuine experience.

**Platforms:** LinkedIn (primary), X

**Structure:**
```
[The honest take — said plainly, not dramatically]

[Why — from real experience, not theory. 3-5 conversational lines.]

[A question if one naturally fits — don't force it]
```

**Length:** 100-200 words.

**Extraction signals:**
- "This isn't..." / "This is actually..." moments
- Myth-busting sections where the blog gently corrects a common assumption
- "The reality:" sections that follow "Your fears:"
- Sentences with "NOT" or "not a ... but a ..."
- Dialogue patterns (Dev: "I'll just..." / Architect: "That won't work.")

---

## 5. FAQ Post

**What:** A real question someone would actually ask, answered like a knowledgeable friend would — honestly, without corporate fluff.

**Platforms:** All

**Structure:**
```
[The question — phrased how a real person would ask it]

[The answer — conversational, honest, 3-5 sentences. It's okay to say "it depends."]

[A related thought or follow-up question if it flows naturally]
```

**Extraction signals:** Direct from frontmatter `faqs` array or Q&A sections in body. Also look for "Your fears:" questions — those are gold.

---

## 6. Listicle

**What:** A numbered list that organizes real insights — not "10 THINGS YOU MUST KNOW" clickbait, but the kind of list that feels like someone distilled hours of experience into a few clear points.

**Platforms:** Instagram (primary), LinkedIn

**Structure:**
```
[Title — conversational, not clickbait. "Three shifts that caught me off guard" > "3 CRITICAL THINGS"]

1. [Point + 1-sentence explanation — conversational]
2. [Point + 1-sentence explanation]
...

[Let it end naturally — don't force a CTA]
```

**Length:** 3-7 items. Each item under 30 words.

**Extraction signals:**
- Numbered headings in blog
- "N things..." / "N shifts..." / "N archetypes..."
- Key takeaways list

**Tags:** `infographicReady: true`

---

## 7. Contrast Post

**What:** A side-by-side "old way vs new way" comparison. The most visually convertible type.

**Platforms:** All

**Structure:**
```
[Title: "Old Way vs New Way"]

OLD: [Legacy pattern]
NEW: [Modern pattern]

OLD: [Legacy pattern]
NEW: [Modern pattern]

[1-sentence takeaway]
```

**Extraction signals:**
- Before/After tables in blog
- "Old way / New way" comparisons
- Any "instead of X, do Y" patterns

**Tags:** `carouselReady: true`, `infographicReady: true`

---

## 8. Anchor Post (Special Type)

**What:** The main post that ties all micro-content together. References individual posts and drives traffic to the full blog. See `Workflows/GenerateAnchorPost.md`.

**Platforms:** All

**Tags:** `type: "anchor"`

---

## Content Volume Target

Per blog post, aim to generate:

| Type | Count | Priority |
|---|---|---|
| Hook | 2-3 | High |
| Thread | 1 | High |
| Carousel | 1-2 | High |
| Hot Take | 2-3 | Medium |
| FAQ | All from source | Medium |
| Listicle | 1 | Medium |
| Contrast | 1-2 | High |
| **Anchor** | **1** | **Always** |

**Total per blog:** 10-15 micro-content pieces + 1 anchor post.
