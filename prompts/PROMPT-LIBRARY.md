# Nano Banana Pro — Tech Social Media Prompt Library

> 10 curated visual styles for tech content marketing on LinkedIn, X, and Instagram.
> Each style has a ready-to-use prompt template, platform recommendations, and an example image.
>
> **Model:** Gemini 2.0 Flash (nano-banana-pro) via Google Generative AI API
> **Created:** 2026-02-24

---

## Quick Reference

| # | Style | Best For | Platforms |
|---|-------|----------|-----------|
| 1 | [Chalkboard / Dan Koe](#1-chalkboard--dan-koe) | Comparisons, concepts, frameworks | LinkedIn, X, Blog |
| 2 | [Neon Dark Tech](#2-neon-dark-tech) | Tech announcements, developer content | X, Instagram, Blog |
| 3 | [Minimalist Gradient](#3-minimalist-gradient) | Clean quotes, hooks, thought leadership | LinkedIn, Instagram, X |
| 4 | [3D Isometric](#4-3d-isometric) | Architecture diagrams, system overviews | LinkedIn, Blog, Instagram |
| 5 | [Flat Infographic](#5-flat-infographic) | Data, stats, listicles, processes | LinkedIn, Instagram, Blog |
| 6 | [Glassmorphism / Gen Z](#6-glassmorphism--gen-z) | Modern SaaS, trendy content, stories | Instagram, X |
| 7 | [Sketch / Hand-Drawn](#7-sketch--hand-drawn) | Casual explainers, educational | LinkedIn, X, Blog |
| 8 | [Dark Mode UI](#8-dark-mode-ui) | SaaS dashboards, product features | LinkedIn, X, Blog |
| 9 | [Retro Vintage Tech](#9-retro-vintage-tech) | Nostalgia, old vs new comparisons | X, Instagram |
| 10 | [Corporate Clean](#10-corporate-clean) | Enterprise content, professional reports | LinkedIn, Blog |

---

## How to Use These Prompts

### API Call Pattern
```bash
source /root/.claude-pai/.env

curl -s -m 120 \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=$GOOGLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "Generate an image: [YOUR PROMPT HERE]"}]}],
    "generationConfig": {"responseModalities": ["TEXT","IMAGE"]}
  }' \
| python3 -c "
import sys,json,base64
r=json.load(sys.stdin)
parts = r.get('candidates',[{}])[0].get('content',{}).get('parts',[])
for p in parts:
    if 'inlineData' in p:
        open('output.png','wb').write(base64.b64decode(p['inlineData']['data']))
        print('OK: output.png')
"
```

### Prompt Template Variables
Replace these placeholders in any prompt below:
- `[TOPIC]` — Your subject (e.g., "Cloud-Native vs Traditional Deployment")
- `[TITLE]` — Headline text to render in the image
- `[SUBTITLE]` — Supporting text line
- `[KEY_POINTS]` — 3-5 bullet points or concepts
- `[RATIO]` — Aspect ratio (see platform table below)

### Platform Size Reference
| Platform | Size | Aspect Ratio | Use Case |
|----------|------|-------------|----------|
| LinkedIn Feed | 1200x1200 | 1:1 | Single posts |
| LinkedIn Carousel | 1080x1350 | 4:5 | Carousel slides |
| Instagram Feed | 1080x1080 | 1:1 | Feed posts |
| Instagram Story | 1080x1920 | 9:16 | Stories/Reels |
| X/Twitter Post | 1200x675 | 16:9 | Timeline posts |
| Blog/OG Image | 1200x630 | ~2:1 | Cover images |

---

## The Styles

---

### 1. Chalkboard / Dan Koe

**Example:** `~/Downloads/style-01-chalkboard-dankoe.png`

**Vibe:** Educational creator aesthetic. Think "someone explaining a concept on a blackboard at 2am." Hand-drawn feel, imperfect lines, neon accents that pop against black.

**Best for:** Concept comparisons, mental model breakdowns, "this vs that" frameworks, content creator vibes.

**Platforms:** LinkedIn (thought leadership), X (engagement bait), Blog headers

**Prompt Template:**
```
Educational chalkboard-style infographic on pure black background.
Hand-drawn chalk-white lines, arrows, and text with imperfect sketch-like quality.
2-3 neon accent colors: electric blue (#00D4FF) and neon green (#39FF14).
Chalk dust effects on edges. Hand-lettered typography with slight wobble.

Topic: [TOPIC]

Layout: [TITLE] as large chalk header at top.
Below: [KEY_POINTS] arranged as connected diagram with arrows and boxes.
Small annotations and doodles in margins.

Format: 16:9 landscape, dark and moody educational aesthetic.
```

**Variations:**
- Add `"Split screen: left side shows [OLD WAY], right side shows [NEW WAY]"` for comparisons
- Add `"Numbered steps flowing top-to-bottom"` for process diagrams
- Add `"Central concept with radiating connections"` for mind maps

---

### 2. Neon Dark Tech

**Example:** `~/Downloads/style-02-neon-dark-tech.png`

**Vibe:** Cyberpunk meets developer culture. Glowing circuits, HUD interfaces, the kind of image that makes people stop scrolling because it looks like a movie prop.

**Best for:** Tech announcements, "the future of X" posts, developer tooling, AI/ML content, security topics.

**Platforms:** X (high engagement), Instagram (visual impact), Blog headers

**Prompt Template:**
```
Cyberpunk futuristic infographic on dark background (#0A0A1A).
Neon cyan (#00FFFF) and magenta (#FF00FF) glowing accents.
Circuit board patterns, glitch effects, holographic elements.
HUD-style interface aesthetic with scanning lines and data overlays.

Topic: [TOPIC]

Layout: [TITLE] in glowing sans-serif at top.
Main content: [KEY_POINTS] displayed as holographic cards or floating panels.
Background: subtle matrix-style code rain, geometric grid lines.

Format: 16:9 landscape, high-tech futuristic aesthetic.
```

**Variations:**
- Add `"Terminal/console aesthetic with monospace green-on-black text"` for developer content
- Add `"Glowing shield and lock icons"` for security topics
- Add `"Neural network visualization with glowing nodes"` for AI content

---

### 3. Minimalist Gradient

**Example:** `~/Downloads/style-03-minimalist-gradient.png`

**Vibe:** Clean, premium, Apple-keynote energy. The kind of image that says "I have taste" without trying too hard. Smooth gradients, lots of breathing room.

**Best for:** Quote graphics, hook posts, thought leadership one-liners, personal brand content.

**Platforms:** LinkedIn (professional), Instagram (aesthetic), X (clean look)

**Prompt Template:**
```
Clean minimalist design with smooth gradient background transitioning
from deep purple (#1a0533) to electric blue (#0066FF).
Centered composition with generous white space.
Subtle geometric accents: thin floating lines, small circles, soft glows.
Modern sans-serif typography, clean and readable.

Text: "[TITLE]"
Subtitle: "[SUBTITLE]"

No clutter. Premium, editorial feel. Soft ambient glow around text.
Format: 1:1 square for social media.
```

**Gradient Combos:**
| Mood | From | To |
|------|------|-----|
| Trust/Authority | Deep navy (#0a1628) | Teal (#00b4d8) |
| Energy/Innovation | Dark purple (#1a0533) | Hot pink (#ff006e) |
| Calm/Wisdom | Midnight blue (#0d1b2a) | Cyan (#00e5ff) |
| Warmth/Human | Dark slate (#1b2838) | Amber (#f59e0b) |

---

### 4. 3D Isometric

**Example:** `~/Downloads/style-04-3d-isometric.png`

**Vibe:** Playful but technical. Like a toy version of your architecture diagram. Clean angles, bright colors, the kind of graphic that makes complex systems look approachable.

**Best for:** Architecture overviews, system diagrams, tech stack breakdowns, "how it works" explainers.

**Platforms:** LinkedIn (educational), Blog (technical posts), Instagram (visual appeal)

**Prompt Template:**
```
Isometric 3D vector art infographic showing [TOPIC].
45-degree top-down perspective, no vanishing point.
Stacked layers with depth, floating elements, geometric precision.
Clean vector-style rendering with soft shadows.

Color palette: Navy blue (#1e3a5f), gold (#ffd700), crisp white.
Bright, colorful, detailed miniature scene.

Layout: [KEY_POINTS] as labeled isometric blocks or buildings,
connected by flowing paths or arrows.
Title: "[TITLE]" in clean sans-serif above the scene.

Format: 1:1 square, clean professional aesthetic.
```

**Variations:**
- Add `"Cross-section cutaway view"` for internal architecture
- Add `"Multiple floors/levels stacked vertically"` for layered systems
- Add `"Tiny people/characters interacting with elements"` for human scale

---

### 5. Flat Infographic

**Example:** `~/Downloads/style-05-flat-infographic.png`

**Vibe:** The workhorse. Clean data visualization that communicates fast. No frills, just clear information design. Think "really good PowerPoint slide."

**Best for:** Statistics, process flows, timelines, listicles, comparison tables, any data-heavy content.

**Platforms:** LinkedIn (data posts), Instagram (save-worthy), Blog (in-article graphics)

**Prompt Template:**
```
Modern flat vector style infographic about [TOPIC].
Clean geometric shapes, bold colors, minimal shadows.
Organized sections with icons, flowcharts, and minimal text.
Generous white space between elements.

Color palette: Vibrant teal (#00b4d8), coral pink (#ff6b6b),
sunny yellow (#ffd93d) on white background.

Layout: [TITLE] as bold header.
[KEY_POINTS] arranged as [timeline/flowchart/grid/numbered list]
with simple flat icons for each point.

Format: [RATIO], clean professional infographic style.
```

**Layout Options:**
- `"Horizontal timeline with 5 connected nodes"` — for processes
- `"Pyramid/funnel narrowing top to bottom"` — for hierarchies
- `"2x3 bento grid with icon + caption per cell"` — for feature lists
- `"Circular flow diagram"` — for cyclical processes
- `"Iceberg: visible top, hidden bottom"` — for "what you see vs reality"

---

### 6. Glassmorphism / Gen Z

**Example:** `~/Downloads/style-06-glassmorphism.png`

**Vibe:** Instagram-native. Frosted glass cards floating over mesh gradients. The aesthetic that Gen Z actually engages with. Modern, trendy, slightly flashy.

**Best for:** Modern SaaS announcements, trendy content, Instagram stories, appeal to younger tech audience.

**Platforms:** Instagram (native feel), X (stands out), Stories/Reels

**Prompt Template:**
```
Glassmorphism style social media graphic about [TOPIC].
Frosted glass cards with blur effect and thin white borders
floating over vibrant mesh gradient background (purple, pink, blue).
Floating 3D glossy icons with soft shadows.
Percentage rings and progress indicators with glowing edges.
Modern Gen Z aesthetic, trendy and eye-catching.

Content: [TITLE] on main glass card.
[KEY_POINTS] on smaller floating cards arranged around it.

Format: 9:16 vertical for stories, or 1:1 for feed.
```

**Variations:**
- Add `"Floating 3D emoji and platform icons"` for social media content
- Add `"Glowing metric numbers and stat badges"` for data highlights
- Add `"Gradient mesh shifts from teal to purple to pink"` for different moods

---

### 7. Sketch / Hand-Drawn

**Example:** `~/Downloads/style-07-sketch-handdrawn.png`

**Vibe:** Whiteboard in a meeting room. "Let me draw this out for you" energy. Warm, approachable, human. Takes the intimidation out of technical topics.

**Best for:** Casual educational content, "let me explain" posts, approachable tech breakdowns, process walkthroughs.

**Platforms:** LinkedIn (approachable), X (conversational), Blog (explainer articles)

**Prompt Template:**
```
Hand-drawn illustration style infographic about [TOPIC].
Thick outline strokes in dark charcoal, dotted and dashed connecting lines.
Warm color palette: marigold (#f59e0b), tangerine (#fb923c),
cherry red (#ef4444) on cream paper-texture background.
Sketch-like quality with slight imperfections.
Warm, approachable, educational feel.

Layout: [TITLE] as hand-lettered header.
[KEY_POINTS] connected by arrows and annotation bubbles.
Small doodles and margin notes for personality.

Format: 16:9 landscape, whiteboard/notebook aesthetic.
```

**Variations:**
- Add `"Whiteboard with colored marker strokes on white background"` for meeting aesthetic
- Add `"Notebook page with grid lines and sticky notes"` for planning content
- Add `"Comic panel layout with speech bubbles"` for storytelling

---

### 8. Dark Mode UI

**Example:** `~/Downloads/style-08-dark-mode-ui.png`

**Vibe:** Screenshot of a premium SaaS dashboard that doesn't exist yet. Developer-friendly dark theme. The kind of image that makes product people say "can we actually build this?"

**Best for:** SaaS product features, developer tools, dashboard metrics, technical product marketing.

**Platforms:** LinkedIn (B2B), X (developer audience), Blog (product posts)

**Prompt Template:**
```
Dark mode UI design infographic about [TOPIC].
Deep teal background (#0f172a) with subtle grid pattern.
Neon orange (#f97316) accent highlights on interactive elements.
Card-based layout with soft drop shadows and rounded corners (12px).
Clean data visualization: progress bars, donut charts, metric cards.
Modern SaaS dashboard aesthetic.

Content: "[TITLE]" as dashboard header.
[KEY_POINTS] displayed as metric cards or UI components.
Sidebar navigation hint, status indicators, and tooltips.

Format: 16:9 landscape, premium dark theme UI.
```

**Variations:**
- Add `"Code editor with syntax highlighting showing [LANGUAGE]"` for developer content
- Add `"Terminal output with green text on black"` for CLI tools
- Add `"Kanban board with task cards"` for project management content
- Add `"API response panels with JSON formatting"` for API content

---

### 9. Retro Vintage Tech

**Example:** `~/Downloads/style-09-retro-vintage.png`

**Vibe:** Tech nostalgia. Aged paper, warm colors, the feeling of flipping through an old computing magazine. Stands out because everything else on the timeline looks modern.

**Best for:** "Then vs now" comparisons, tech history posts, nostalgic content, evolution of technology pieces.

**Platforms:** X (engagement through nostalgia), Instagram (aesthetic), LinkedIn (storytelling)

**Prompt Template:**
```
Vintage science poster style infographic about [TOPIC].
Aged paper texture with slight yellowing and grain.
Muted palette with gold (#b8860b), burgundy (#800020),
and forest green (#228b22) accents.
Detailed technical illustrations in engraving/woodcut style.
Nostalgic academic aesthetic, like a 1970s university poster.

Layout: "[TITLE]" in vintage serif typography at top.
[KEY_POINTS] arranged as labeled technical diagrams
with ornate borders and section dividers.

Format: 16:9 landscape, vintage academic poster.
```

**Variations:**
- Add `"Split: left half vintage sepia, right half modern neon"` for then vs now
- Add `"Retro travel poster style with bold geometric shapes"` for location-based content
- Add `"Old newspaper/magazine layout with columns"` for editorial feel
- Add `"Blueprint style: white lines on navy blue"` for technical plans

---

### 10. Corporate Clean

**Example:** `~/Downloads/style-10-corporate-clean.png`

**Vibe:** The "enterprise-approved" option. Clean enough for a quarterly report, polished enough for a keynote slide. Professional without being boring.

**Best for:** Enterprise announcements, thought leadership, quarterly reports, professional presentations, B2B marketing.

**Platforms:** LinkedIn (native feel), Blog (professional), Presentations

**Prompt Template:**
```
Corporate Memphis / Big Tech art style presentation slide about [TOPIC].
Clean lines, ample whitespace, sophisticated color palette:
primary blue (#3b82f6), neutral gray (#64748b), white background.
Professional sans-serif typography (Inter/Roboto style).
Simple geometric illustrations with oversized friendly proportions.
Suitable for pitch decks and quarterly reports.

Layout: "[TITLE]" as bold header with thin accent line below.
[KEY_POINTS] in clean card layout or bullet format.
Subtle data visualization (simple bar chart or metric highlight).

Format: 16:9 landscape, premium corporate presentation.
```

**Variations:**
- Add `"Dashboard-style with KPI cards and trend arrows"` for metrics
- Add `"Two-column comparison layout"` for feature comparisons
- Add `"Roadmap timeline with milestone markers"` for strategy content
- Add `"Org chart or process flow with clean connectors"` for organizational content

---

## Content Type → Style Mapping

Quick guide for which style to pair with which type of micro-content:

| Content Type | Primary Style | Secondary Options |
|-------------|---------------|-------------------|
| **Hook** (thought-provoking one-liner) | Minimalist Gradient | Chalkboard, Neon Dark |
| **Thread** (multi-part story) | Sketch Hand-Drawn | Flat Infographic, Chalkboard |
| **Carousel** (slide-by-slide) | Flat Infographic | Corporate Clean, Dark Mode UI |
| **Hot Take** (bold opinion) | Neon Dark Tech | Chalkboard, Minimalist Gradient |
| **FAQ** (question + answer) | Sketch Hand-Drawn | Corporate Clean, Flat Infographic |
| **Listicle** (numbered items) | Flat Infographic | 3D Isometric, Dark Mode UI |
| **Contrast** (old vs new) | Chalkboard | Retro Vintage, Neon Dark |
| **Anchor** (main summary post) | Corporate Clean | Minimalist Gradient |

---

## Pro Tips

### Prompting Best Practices
1. **Be specific, not clever.** "A futuristic sports car on a rainy Tokyo street at night" beats "cool car, neon, city, 8k"
2. **Include the purpose.** "For a LinkedIn post about cloud migration" helps the model infer professional context
3. **Keep text under 400 words.** More than that and text rendering breaks down
4. **Specify colors as hex codes.** The model respects them more reliably than color names
5. **Use aspect ratios.** Always specify format — the model defaults to odd sizes otherwise

### Parallel Generation
Run up to 4 concurrent Gemini API calls with a 2-second stagger between launches to avoid rate limits.

### Iterative Refinement
After generating, follow up with: `"Keep everything the same but [specific change]"` — the model is great at targeted edits.

### Batch Consistency
For a series of posts, include a style block at the start: `"Maintain consistent style: [COLOR1], [COLOR2], [FONT STYLE], [LAYOUT PATTERN]"` to keep visual coherence across multiple images.

---

## Source Material

- **276 prompts extracted** from [Awesome-Nano-Banana-Prompts](https://github.com/devanshug2307/Awesome-Nano-Banana-Prompts)
- **Full research** in `NANO-BANANA-PRO-RESEARCH.md` (14 style categories, platform templates, expert techniques)
- **Full prompt database** in `nano-banana-prompts-extracted.md` (17 categories, complete prompts)
- **Example images** in `~/Downloads/style-01-*.png` through `style-10-*.png`
