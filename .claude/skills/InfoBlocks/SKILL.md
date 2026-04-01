---
name: InfoBlocks
description: Clean educational infographics with 3D isometric blocks on light cream backgrounds. USE WHEN user wants tech explainer visuals, educational infographic, concept breakdown, stacked layer diagram, analogy-driven visual, professional infographic, clean corporate diagram, tech stack visual.
---

# InfoBlocks Skill

Create **clean, professional educational infographics** with 3D isometric block illustrations on light cream backgrounds. Think polished tech explainer posters — equation-style headers, labeled 3D platforms, bullet-point explanations, and human-body analogies.

## Core Aesthetic

**The InfoBlocks Style:**
- **Background:** Warm cream/beige (#F5F0E8) — clean, professional, easy to read
- **Illustrations:** 3D isometric rendered blocks, platforms, and objects — soft lighting, subtle shadows
- **Colors:** Navy blue (#2D3A5C), Steel blue (#5B7BA5), Gold/amber (#C9A84C), warm cream (#F5F0E8)
- **Typography:** Clean, bold sans-serif headers — equation style ("X = Y + Z"). Black body text with bullet points
- **Icons:** 3D rendered objects (servers, books, brains, circuits) sitting on labeled platforms/blocks
- **Analogies:** Human body silhouettes showing concept-to-body mappings (brain, nervous system, hands)
- **Layout:** Vertical stacked sections with connecting arrows flowing top-to-bottom
- **Feel:** Corporate-educational, polished, professional — like a premium tech whitepaper illustration

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the InfoBlocks skill to create educational infographics"}' \
  > /dev/null 2>&1 &
```

Running **InfoBlocks** skill...

---

## Output Location

```
ALL GENERATED IMAGES GO TO ~/Downloads/ FIRST
User MUST preview before use
```

---

## Workflow Routing

Route to the appropriate workflow based on the request:

- Stacked layers / vertical progression / building concepts → `Workflows/StackedLayers.md`
- Comparison (X vs Y, before/after) → `Workflows/Comparison.md`
- Concept explanation → `Workflows/Concept.md`
- Process or steps → `Workflows/Process.md`
- General/flexible → `Workflows/General.md`

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Warm Cream | #F5F0E8 | Background |
| Navy Blue | #2D3A5C | Primary 3D blocks, headers, main objects |
| Steel Blue | #5B7BA5 | Secondary blocks, lighter elements, accents |
| Gold/Amber | #C9A84C | Highlight labels, premium accents, connecting arrows |
| Soft White | #FFFFFF | Block faces, highlights, text backgrounds |
| Dark Text | #1A1A2E | Body text, bullet points |
| Light Blue | #B8CEE0 | Subtle fills, silhouette highlights |

**Color Rules:**
- Background is ALWAYS warm cream (#F5F0E8) — never white, never dark
- 3D blocks use navy blue as primary with steel blue for secondary faces
- Gold/amber used sparingly for labels, arrows, and premium accents
- Body text is always dark (#1A1A2E) for readability
- Maximum 3-4 colors in any single composition (plus cream background)

---

## Typography Style

**Clean, professional, bold:**

- **Headers:** Bold sans-serif, equation format — "RAG = Brain + Books" style
- **Section titles:** Large, black, clean — immediately readable
- **Bullet points:** Standard sans-serif body text, well-spaced
- **Block labels:** White or gold text on navy blue 3D blocks
- **Annotations:** Smaller body text, clean and professional

All text should be sharp, digital, professional — NOT hand-lettered, NOT marker, NOT chalk.

---

## Illustration Style

**3D isometric rendered objects:**
- Objects sit on labeled colored platforms/blocks (like product display bases)
- Soft directional lighting from upper-left, subtle drop shadows
- Books, servers, brains, tools, circuit boards rendered in matching blue palette
- Human body silhouettes (translucent blue/gray) showing concept analogies
- Connecting arrows (gold or steel blue) showing flow between layers
- Clean, polished, corporate — not sketchy, not hand-drawn

**Block/Platform Style:**
- Rectangular 3D blocks shown at ~30-degree isometric angle
- Navy blue primary faces, steel blue side faces
- White or gold text labels on blocks ("LLM", "RAG", "AI Agent", "MCP")
- Objects/illustrations sitting on top of blocks
- Subtle shadows beneath blocks for depth

---

## Image Generation

**Default model:** Pro tier via the **Nano Banana MCP server**

**Tool:** Use the `mcp__nanobanana__generate_image` MCP tool:

```
mcp__nanobanana__generate_image(
  prompt: "[PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/[descriptive-name].png"
)
```

**Fallback:** Direct Gemini API with `gemini-2.0-flash-exp-image-generation`

### Size Options

| User Says | Parameter | Resolution |
|-----------|-----------|------------|
| "draft", "preview" | `resolution: "1k"` | Quick iterations |
| (default) | `resolution: "2k"` | Standard output |
| "high res", "print" | `resolution: "4k"` | Maximum resolution |

### Aspect Ratio

| User Says | Parameter | Use Case |
|-----------|-----------|----------|
| "tall", "infographic", "poster" | `aspect_ratio: "4:5"` | Default — vertical infographic |
| "square", "social" | `aspect_ratio: "1:1"` | Instagram, social media |
| "wide", "slide" | `aspect_ratio: "16:9"` | Presentations |
| "story" | `aspect_ratio: "9:16"` | Instagram/LinkedIn stories |

---

## Master Prompt Template

Use this template structure for all InfoBlocks generations:

```
Clean educational infographic in professional corporate style.

STYLE: Polished tech explainer with 3D isometric illustrations
- Warm cream background (#F5F0E8) — clean, professional surface
- 3D isometric rendered blocks and platforms in Navy Blue (#2D3A5C)
- Steel Blue (#5B7BA5) for secondary block faces and lighter elements
- Gold/Amber (#C9A84C) for labels, connecting arrows, and accents
- Clean bold sans-serif typography — equation-style headers
- 3D rendered objects sitting on labeled platforms
- Human body silhouettes (translucent blue) for concept analogies where relevant
- Soft directional lighting, subtle shadows beneath blocks
- NO dark backgrounds, NO marker strokes, NO chalk, NO gradients
- NO constellation dots, NO cyberpunk aesthetic, NO neon colors

COMPOSITION:
[Describe the layout — vertical stack, comparison, etc.]

CONTENT:
[Describe what concepts to illustrate]

TEXT ELEMENTS:
- Header: "[EQUATION-STYLE TITLE]" — bold black sans-serif
- Section labels: [list] — white text on navy blue 3D blocks
- Bullet points: [list] — clean dark text
- Block labels: [list] — white or gold on navy blocks

VISUAL ELEMENTS:
- [Block 1]: Navy blue 3D platform labeled "[NAME]" with [object] on top
- [Block 2]: Navy blue 3D platform labeled "[NAME]" with [object] on top
- Connecting arrows: Gold (#C9A84C) arrows showing flow between blocks
- [Silhouette]: Translucent blue human silhouette showing [analogy]

CRITICAL:
- Warm cream background (#F5F0E8) throughout — NOT white, NOT dark
- 3D isometric rendered blocks — polished, not sketchy
- Clean professional typography — NOT hand-lettered
- Corporate-educational tone
- Easy to read, clear visual hierarchy
```

---

## Examples

**Example 1: AI Stack Explainer**
```
User: "create a visual showing LLM vs RAG vs AI Agent"
→ Invokes StackedLayers workflow
→ Vertical stack: LLM block → RAG block → Agent block
→ Each with 3D platform, object, and bullet explanations
```

**Example 2: Architecture Comparison**
```
User: "compare monolith vs microservices"
→ Invokes Comparison workflow
→ Side-by-side 3D block illustrations
→ Navy/steel blue blocks with labeled components
```

**Example 3: Migration Concept**
```
User: "explain cloud-native architecture"
→ Invokes Concept workflow
→ Central 3D block with surrounding elements
→ Gold arrows connecting related concepts
```

---

## Validation Checklist

After generating, verify:

**Must Have:**
- [ ] Warm cream background (#F5F0E8)
- [ ] 3D isometric rendered blocks/platforms
- [ ] Navy blue + steel blue + gold color palette
- [ ] Clean bold sans-serif typography
- [ ] Equation-style or clear headers
- [ ] Professional, corporate-educational feel
- [ ] Clear visual hierarchy

**Must NOT Have:**
- [ ] Dark or black backgrounds
- [ ] Gradient backgrounds (blue, purple, etc.)
- [ ] Hand-drawn or marker strokes
- [ ] Chalk texture
- [ ] Constellation dots or floating particles
- [ ] Cyberpunk / neon aesthetic
- [ ] Stock photo template look
- [ ] Hand-lettered typography
