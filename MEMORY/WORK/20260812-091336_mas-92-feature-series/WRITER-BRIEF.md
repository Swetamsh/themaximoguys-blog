# Writer brief — MAS 9.2 series (`posts/MAS-9-2/`)

Every writer agent reads this file **and** `knowledge_base/DOC15_MAS92_RELEASE_FACTBASE.md`
before writing a single word. Read both fully. They are the contract.

---

## 1. The non-negotiable accuracy rule

**Every factual claim about MAS 9.2, 9.1 or 9.0 must trace to a fact-base ID.** No ID, no claim.

- You may not add features from memory, training data, or inference. If it is not in DOC15, it
  does not go in the post.
- You do **not** print the IDs in the prose (readers don't care). You cite the underlying IBM
  source in the References section and, where a claim is load-bearing, name the source inline
  ("IBM's Manage 9.2 what's-new states…").
- **Padding is the one unforgivable failure.** This series' entire value is being the trustworthy
  read on 9.2. If you cannot reach the word floor on sourced material, write the best honest post
  you can, then state at the very end of your final report: `SHORT: <word count> — <why>`. A short,
  correct post is a success. A padded post is a failure that damages the brand.
- Source text is cached locally at `knowledge_base/MAS92-SOURCES/text/*.txt`. Read the relevant
  files for detail and exact feature names. Prefer IBM's exact terminology.

## 2. Handling unverified claims (explicit decision by Swetansh)

Unverified material **is included**, but must never look like verified material.

- Anything marked UNCONFIRMED in DOC15 gets an explicit inline marker in the prose, e.g.
  *"— unverified as of August 2026"* — plus one clause on what would settle it.
- Use a callout for the load-bearing ones:
  `<aside>⚠️ <strong>Unverified:</strong> … We could not confirm this against a primary IBM page in August 2026. What would settle it: …</aside>`
- Posts 01, 02, 06 and 07 must each carry a short section titled **"What we could not verify"**
  near the end, listing the relevant gaps honestly.
- Specifically: do **not** state EOS dates for 9.0/9.1/9.2 as fact (REL-05/GAP-01); do not assert
  9.0/9.1 GA dates as fact (REL-10); do not assert Feature Channel production entitlement
  (REL-12); do not assert the Granite → GPT-OSS-120B claim (AI-09).
- **Confirmed** items may be stated plainly with confidence. Most of DOC15 is confirmed — the
  series should read as authoritative, not hedged. Reserve hedging for what actually needs it.

## 3. Prohibited

- **Never name the IBM employees** appearing in the leaked editorial placeholder (PLAT-04). Use
  only the substantive point: the add-on architecture-support list was still being cross-checked
  at GA and multi-arch delivery lands per monthly Feature Channel release.
- Do not duplicate the 25-part `posts/MAS-FEATURES/` series (general MAS 9 feature landscape) or
  `posts/MAS-NUCLEAR/2026-07-16-mas-nuclear-07-whats-new-mas92.mdx` (nuclear-specific 9.2). You may
  reference them; do not re-tread them.
- Do not set `draft: false`. Do not generate or reference images that do not exist beyond the
  `coverImage` frontmatter path (covers are produced separately).
- No marketing cheerleading. No vendor hype. This series is credible precisely because it is
  willing to say when something is thin, risky, or irrelevant to most readers.

## 4. Depth contract (per post)

| Requirement | Floor |
|---|---|
| Word count (body, excluding frontmatter) | **3,800 words** |
| Top-level `##` sections | **≥ 7** |
| Markdown tables | **≥ 3** |
| FAQs in frontmatter | **exactly 5** |
| References (real IBM URLs) | **≥ 5** |

## 5. Frontmatter spec — copy this shape exactly

```yaml
---
title: "..."
description: "..."
date: "2026-08-12"
slug: "..."
tags: ["Maximo", "MAS 9", "MAS 9.2", ...]
draft: true
tier: "admin|developer|beginner|executive"
author: "Venkat Achanta"
authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
coverImage: "./images/<cover-name>.png"
authorTitle: "Maximo Technical Team"
authorBio: "Technical practitioners with decades of combined experience implementing IBM Maximo across asset-intensive industries."
authorCredentials: ["IBM Certified Maximo Consultants", "MAS 9 Implementation Specialists"]
faqs:
  - question: "..."
    answer: "..."        # 5 of these, answers 40-90 words, directly useful
keyTakeaways:
  - "..."                # 5, one line each
series:
  name: "MAS 9.2"
  part: <N>
  total: 7
tldr: "..."              # 60-120 words
seoTitle: "..."          # under 60 chars
seoDescription: "..."    # under 160 chars
targetQuestions:
  - "..."                # 3-5 real search questions
semanticKeywords:
  - "..."                # 8-12
proficiencyLevel: "beginner|intermediate|advanced"
dependencies:
  - "..."                # 2-4 assumed prior knowledge items
---
```

`series.total: 7` — parts run 0–7, where 0 is the index, matching repo convention
(see `posts/MAS-WORK-ORDER-OPS/` which uses part 0 with total 6).

## 6. Body structure and house voice

Match `posts/MAS-WORK-ORDER-OPS/2026-07-15-wo-missing-pieces-01-service-requests.mdx`.

```markdown
# <H1 title — can differ from frontmatter title, more editorial>

> 🎯 **Who this is for:** <one specific persona sentence>

## 📖 <opening section — the situation, why this matters now>
## 📊 <comparison or landscape section with a table>
...
## ❓ Frequently Asked Questions        <- mirror the 5 frontmatter FAQs
## References
- [Descriptive title (IBM Documentation)](https://real-url)
---
## Series Navigation
**Part N of 7** · [← Previous](...) · [Next →](...)
```

Voice — **empathetic expert**, per the MaximoBlog skill:

- Second person, direct. "You've just been told 9.2 is out." Not "Users have been told…"
- Open with the reader's actual situation before teaching. Validate, then educate.
- Bold and decisive where the facts are clear. No hedging on confirmed material.
- Active voice. "MAS 9.2 removes user synchronisation" — not "user synchronisation is removed."
- Emoji section headers: 🔥 📊 🚫 🧠 🛠️ 🔍 💡 🔮 🎯 📖 ⚠️ 🧱 📱 🔄
- `<aside>💡 <strong>Key insight:</strong> …</aside>` after major sections.
- Old-world vs MAS-9.2 contrast tables wherever the change is a *replacement*.
- Tables for anything enumerable. Readers scan; tables reward scanning.
- Close with something actionable — a checklist, a roadmap, a decision table.

Avoid: hedging filler, third-person distance, marketing hype, unsupported claims, academic dryness.

## 7. Carousel-readiness

Swetansh will build LinkedIn carousels from these afterwards. That means:

- Tables should have short, punchy cell values that survive being lifted onto a slide.
- Enumerated verdicts, gates and rules should be numbered and self-contained.
- Every post needs at least one list or table that works as a standalone visual.

## 8. Post assignments

| Part | File | Slug | Focus |
|---|---|---|---|
| 0 | `2026-08-12-mas-92-00-series-index.mdx` | `mas-92-series-index` | Series index |
| 1 | `2026-08-12-mas-92-01-what-it-actually-is.mdx` | `mas-92-what-it-actually-is` | Release identity, channels, lifecycle |
| 2 | `2026-08-12-mas-92-02-version-comparison.mdx` | `mas-92-vs-91-vs-90` | 9.0 → 9.1 → 9.2 comparison |
| 3 | `2026-08-12-mas-92-03-inside-manage.mdx` | `mas-92-manage-features` | Manage + Optimizer |
| 4 | `2026-08-12-mas-92-04-outside-manage.mdx` | `mas-92-suite-applications` | Monitor, Health/Predict, MVI, IT, REF, HSE, AIP |
| 5 | `2026-08-12-mas-92-05-ai-layer.mdx` | `mas-92-ai-features` | The AI layer |
| 6 | `2026-08-12-mas-92-06-upgrade-watchlist.mdx` | `mas-92-upgrade-watchlist` | Critical upgrade watch-list |
| 7 | `2026-08-12-mas-92-07-fomo-reality-check.mdx` | `mas-92-fomo-reality-check` | FOMO / reality check |

All files go in `posts/MAS-9-2/`. Cover images: `./images/mas-92-<NN>-<short>.png` (files do not
exist yet — reference the path only).

Series navigation links use the slugs above as `/blog/<slug>`.
