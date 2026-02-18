---
name: GenerateSlides
description: Generate illustrated carousel slide images from micro-content
---

# GenerateSlides Workflow

## Prerequisites

Before executing, load:
1. `StyleGuide.md` — visual specification and prompt engineering rules
2. Source micro-content file from the `micro_blogs/` directory (carousel-type MDX produced by MicroBlog skill)

**Source location:** Always look in `micro_blogs/<blog-slug>/` for carousel-type MDX files (type: "carousel" in frontmatter). These are the canonical input for this workflow.

## Step 1: Parse the Micro-Content

Read the carousel-type MDX file. Extract:
- **Title** for each slide
- **Body text** for each slide
- **Source blog** reference from frontmatter
- **Type** (comparison, process, listicle, etc.)

If the user provides raw content instead of an MDX file, structure it into slides first.

## Step 2: Assign Slide Templates

For each slide, assign a template from StyleGuide.md:

| Slide Position | Template | Notes |
|---|---|---|
| Slide 1 (Hook) | **Template D** (Hook/Title) | Bold headline, expressive character, no explanation box |
| Content slides (comparison) | **Template A** (Two Characters) | Two characters with labels showing old vs new |
| Content slides (single point) | **Template B** (Single Character) | One character explaining or demonstrating |
| Content slides (diagram) | **Template C** (Diagram/Icons) | No characters, just visual explanation |
| Summary/TL;DR slide | **Template B** | Character with summary gesture |
| CTA slide | **Template E** (CTA) | Character with signs, engagement prompt |

## Step 3: Construct Image Prompts

For each slide, construct a prompt following this master template:

### Master Prompt Structure

```
STYLE: Professional sketch-note infographic illustration on very light cream paper background with subtle warm texture (#F5E6D3). Detailed hand-drawn cartoon characters (NOT stick figures) with proportional bodies, expressive faces, and labeled clothing. Hand-written / hand-lettered typography style. Black ink illustrations with muted teal, olive, and gold accent colors. Clean, educational, professional.

LAYOUT: [Template-specific layout description]

HEADLINE TEXT: Bold hand-lettered text at the top reading: "[HEADLINE]" — creative mixed sizing, key words LARGER or in teal accent color.

EXPLANATION BOX: [If applicable] Rounded rectangle with lighter cream background (#FAF5EB), hand-drawn brown border, containing hand-written text reading: "[EXPLANATION TEXT]"

CHARACTERS: [Detailed character descriptions — proportional cartoon figures with hair, clothing, expressions, gestures. NOT stick figures.]

ADDITIONAL ELEMENTS: [Icons, diagrams, arrows, section badges as needed]

CRITICAL:
- Very light cream paper background with subtle warm texture — NOT heavy crumple, NOT white, NOT dark
- Detailed proportional hand-drawn illustrations, NOT stick figures, NOT photorealistic
- Hand-written / hand-lettered typography — NOT computer-perfect sans-serif fonts
- Bold black headline text must be clearly readable with NO TYPOS
- Maximum 10 words per text element (reduces AI text errors)
- Use UPPERCASE for critical words (renders more reliably)
- Muted accent colors: teal (#2E8B8B), olive (#6B8E4E), gold (#C5A644)
- Clean composition with generous whitespace
- Portrait orientation (4:5 aspect ratio)
```

### TMG-Specific Character Mapping

| Content About | Character Label | Pose |
|---|---|---|
| Legacy Maximo / 7.6 patterns | "7.6" on t-shirt | Confused or nostalgic |
| MAS 9 / modern patterns | "MAS 9" on t-shirt | Confident, thumbs up |
| Generic developer | "Dev" on t-shirt | Working at computer |
| Admin | "Admin" on t-shirt | At monitoring console |
| Integration | "API" on t-shirt | Connecting cables/arrows |
| TheMaximoGuys narrator | "TMG" on t-shirt | Pointing, teaching |

## Step 4: Generate Images

### Model selection priority:
1. `gpt-image-1` — Best text rendering and character consistency (requires OPENAI_API_KEY)
2. `gemini-2.5-flash-image` — Best available Gemini model. Good text rendering, detailed illustrations
3. `gemini-2.0-flash-exp-image-generation` — Last resort fallback (weaker text, more typos)

**Note:** `gemini-3-pro-image-preview` (nano-banana-pro) is highest quality but frequently returns 503 due to high demand. Try it first but fall back to `gemini-2.5-flash-image` if unavailable.

### Using Generate.ts (when model is supported):
```bash
bun run ~/.claude/skills/Art/Tools/Generate.ts \
  --model gpt-image-1 \
  --prompt "[CONSTRUCTED PROMPT]" \
  --size 1024x1536 \
  --output ~/Downloads/carousel-<slug>/slide-<NN>.png
```

### Using direct Gemini API (for gemini-2.5-flash-image):
```bash
export $(grep -v '^#' ~/.claude/.env | grep GOOGLE_API_KEY | xargs)

curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=$GOOGLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"parts": [{"text": "PROMPT"}]}], "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}}' \
  | python3 -c "
import json, sys, base64
data = json.load(sys.stdin)
for cand in data.get('candidates', []):
  for part in cand.get('content', {}).get('parts', []):
    if 'inlineData' in part:
      img = base64.b64decode(part['inlineData']['data'])
      with open('OUTPUT_PATH', 'wb') as f: f.write(img)
      print(f'Saved ({len(img)} bytes)'); sys.exit(0)
print('No image found in response')
"
```

**Size:** `1024x1536` (portrait) — closest to 4:5 ratio

**Output directory:** `~/Downloads/carousel-<slug>/`

### Rate limiting
- Generate up to 3 slides in parallel (background tasks)
- Report progress after each slide: "Slide N/M generated"

## Step 5: Spell Check & Text Verification

**CRITICAL STEP — Do NOT skip.** AI image generation frequently produces text typos, misspellings, and garbled words.

After ALL slides are generated, perform a visual spell check:

1. **Open each generated slide** using the Read tool (reads images visually)
2. **Compare rendered text** against the source micro-content MDX slide text
3. **Flag any discrepancies** in a spell check report:

```
Spell Check Report
━━━━━━━━━━━━━━━━━━
Slide 1: ✅ PASS — all text matches source
Slide 2: ❌ FAIL — "Inorkflowy" should be "Workflow"
Slide 3: ✅ PASS
...
```

4. **For any FAIL slides**: Regenerate with a simplified prompt (fewer text elements, shorter words)
5. **Re-check regenerated slides** until all pass

### Common text rendering issues to watch for:
- Jumbled/misspelled words (e.g., "Inorkflowy" for "Workflow")
- Missing letters or extra letters
- Words running together without spaces
- Wrong words entirely substituted
- Numbers rendered incorrectly

### Mitigation tips for prompts:
- Keep text elements to **10 words or fewer** per element
- Avoid apostrophes and special characters in prompt text
- Use UPPERCASE for critical words (models render caps more reliably)
- Spell out acronyms if they render poorly (e.g., "GraphQL" → try "Graph Q L")

## Step 6: Review and Report

After all slides pass spell check:

1. List all generated files with sizes
2. Report total generation cost (if available from API)
3. Include the spell check report
4. Remind user to preview in Finder before using

**Output format:**
```
Carousel Generated: [Title]
━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: micro_blogs/<slug>/05-carousel-*.mdx
Slides: N images
Location: ~/Downloads/carousel-<slug>/
Model: [model used]
Size: 1024x1536 (portrait)

Files:
  slide-01-hook.png (XXX KB) ✅
  slide-02-comparison.png (XXX KB) ✅
  slide-03-xxx.png (XXX KB) ❌ "Typo: rendered X as Y"
  ...

Spell Check: N/N passed (M regenerated)

Next steps:
1. Preview slides in Finder/Preview
2. Approve or request regeneration of specific slides
3. Upload to LinkedIn/Instagram as carousel post
```

## Example: Generating from "Mindset Shifts" Carousel Micro-Content

Given `micro_blogs/developer-mindset-shift-overview/05-carousel-mindset-shifts.mdx`:

**Slide 1 prompt:**
```
STYLE: Professional sketch-note infographic on very light cream paper background with subtle warm texture. Detailed hand-drawn cartoon illustrations with proportional figures. Hand-written / hand-lettered typography. Black ink with muted teal and olive accents. Clean, educational.

LAYOUT: Hook slide. Large bold hand-lettered headline fills upper half. Single detailed character in lower half with expressive pose.

HEADLINE TEXT: Bold hand-lettered text reading: "The MAXIMO Mindset Shift" — MAXIMO in larger teal accent lettering.

CHARACTERS: One detailed cartoon figure wearing a t-shirt labeled "TMG" standing in center, arms spread in welcoming gesture, confident smile. Lightbulb doodle icon above head.

CRITICAL: Very light cream paper with SUBTLE texture only. Detailed proportional illustrations NOT stick figures. Hand-lettered fonts NOT computer fonts. Portrait 4:5. NO TYPOS in text.
```

**Slide 2 prompt:**
```
STYLE: Professional sketch-note infographic on very light cream paper with subtle warm texture. Detailed hand-drawn characters. Hand-lettered typography. Black ink with teal and olive accents.

LAYOUT: Comparison slide. Bold hand-lettered headline at top. Two detailed characters side by side below.

HEADLINE TEXT: Hand-lettered text: "MODIFY vs EXTEND"

EXPLANATION BOX: Rounded rectangle with lighter cream background, hand-drawn brown border, containing hand-written text: "Stop modifying code. Start extending through supported patterns."

CHARACTERS: Left - frustrated developer with "7.6" on shirt reaching into messy tangled code. Right - confident developer with "MAS 9" on shirt building cleanly on a platform. Hand-drawn arrow from left to right.

CRITICAL: Light cream paper SUBTLE texture. Detailed cartoon figures NOT stick figures. Hand-lettered text. NO TYPOS. Portrait 4:5.
```
