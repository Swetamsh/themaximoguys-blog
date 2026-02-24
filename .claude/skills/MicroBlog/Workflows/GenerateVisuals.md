---
name: GenerateVisuals
description: Generate images for micro-content posts using style-mapped nano-banana prompts
---

# GenerateVisuals Workflow

Generates a visual image for each micro-content post by mapping content types to visual styles from the Prompt Library, then generating via Gemini API.

## Prerequisites

Load before executing:
1. `ContentTypes.md` — content type definitions
2. `PROMPT-LIBRARY.md` in the micro_blogs output directory (or `micro_blogs/developer-mindset-shift-overview/PROMPT-LIBRARY.md` as reference)
3. Source API key: `source /root/.claude-pai/.env` for `$GOOGLE_API_KEY`

## Step 1: Read Existing Micro-Content

Read all MDX files in the target `micro_blogs/<slug>/` directory. For each post, extract:
- `title` — used as image text/topic
- `type` — determines visual style selection
- `tags` — inform prompt keywords
- Body content — key phrases for prompt customization

## Step 2: Map Content Type to Visual Style

Use this default mapping. Override per-post if the content suggests a better fit.

| Content Type | Primary Style | Secondary Option | Rationale |
|-------------|---------------|------------------|-----------|
| **hook** | Minimalist Gradient | Chalkboard/DanKoe | Hooks need scroll-stopping clean visuals. Chalkboard if the hook is a comparison/concept. |
| **thread** | Sketch/Hand-Drawn | Flat Infographic | Threads are casual explanations — hand-drawn feels approachable. |
| **carousel** | Flat Infographic | Chalkboard/DanKoe | Structured data needs clean info-design. |
| **hot-take** | Neon Dark Tech | Minimalist Gradient | Bold opinions need bold visuals. Gradient if the take is empathetic/reassuring. |
| **faq** | Sketch/Hand-Drawn | Minimalist Gradient | FAQs are friendly education — whiteboard aesthetic. |
| **listicle** | Flat Infographic | 3D Isometric | Numbered items need clean structure. |
| **contrast** | Chalkboard/DanKoe | Retro Vintage | "Old vs New" = chalkboard split. Retro if it's a nostalgia play. |
| **anchor** | Minimalist Gradient | Corporate Clean | Series intro needs authority and polish. |

**Override signals:**
- Post mentions specific tech architecture → consider Neon Dark Tech or Dark Mode UI
- Post is reassuring/empathetic → prefer Minimalist Gradient
- Post has comparison/split structure → prefer Chalkboard
- Post is nostalgic/historical → consider Retro Vintage

## Step 3: Build Image Prompts

For each post, construct a prompt by:

1. Taking the style template from PROMPT-LIBRARY.md
2. Replacing `[TOPIC]` with the post's core concept
3. Replacing `[TITLE]` with a shortened version of the post title (max 6 words for image text)
4. Replacing `[KEY_POINTS]` with 3-5 keywords from the post body
5. Adjusting `[RATIO]` based on primary platform:
   - LinkedIn primary → 1:1 (1200x1200)
   - Instagram primary → 1:1 (1080x1080)
   - X primary → 16:9 (1200x675)
   - Blog → 16:9 (1200x630)

**Prompt quality checklist:**
- Natural language, not keyword spam
- Includes hex color codes for consistency
- Specifies aspect ratio
- Mentions the "purpose" (social media post for tech professionals)
- Under 400 words total

## Step 4: Generate Images

Use Gemini API for generation:

```bash
source /root/.claude-pai/.env

curl -s -m 120 \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=$GOOGLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "Generate an image: [PROMPT]"}]}],
    "generationConfig": {"responseModalities": ["TEXT","IMAGE"]}
  }' \
| python3 -c "
import sys,json,base64
r=json.load(sys.stdin)
parts = r.get('candidates',[{}])[0].get('content',{}).get('parts',[])
for p in parts:
    if 'inlineData' in p:
        open('[OUTPUT_PATH]','wb').write(base64.b64decode(p['inlineData']['data']))
        print('OK: [OUTPUT_PATH]')
"
```

**Output path:** `micro_blogs/<slug>/images/<NN>-<type>-<descriptor>.png`

**Parallel execution:** Run up to 4 concurrent generations with 2-second stagger between launches. Wait for batch to complete before next batch.

**Error handling:** If a generation fails (timeout, 503, empty response), retry once with the same prompt. If it fails again, log and continue — the post works without an image.

## Step 5: Update MDX Frontmatter

For each generated post, add/update these frontmatter fields:

```yaml
imageReady: true
imagePath: "./images/<filename>.png"
imageStyle: "chalkboard-dankoe"  # style identifier
imagePrompt: "[full prompt used]"
hashtags:
  - "#MAS9"
  - "#Maximo"
  - "#CloudNative"
  # ... 5-8 relevant tags
blogLink: "[URL or relative path to source blog]"
```

## Step 6: Update Index

Update `_index.mdx` to reflect:
- Image status (Yes/No) for each post
- Visual style used for each post
- Add a new "Style" column to the index table

## Step 7: Report

Output summary:
- Images generated: X/Y
- Styles used (with counts)
- Failed generations (if any)
- Total file size of images directory
- Posts ready to publish

## Hashtag Strategy

### Rules
- 5-8 hashtags per post (not too many, not too few)
- Mix of: niche (#MAS9, #MaximoMigration), industry (#IBM, #EAM), broad (#CloudNative, #DevOps)
- No generic spam (#success, #motivation, #love)
- Platform-aware: LinkedIn uses fewer hashtags (3-5), X uses more (5-8), Instagram supports more (up to 10)

### Standard Hashtag Pool (for Maximo content)
**Niche:** #MAS9 #MaximoMigration #IBMMaximo #MaximoAdmin #MaximoDeveloper
**Industry:** #IBM #EAM #AssetManagement #EnterpriseIT #DigitalTransformation
**Technical:** #CloudNative #Kubernetes #OpenShift #APIFirst #DevOps #Microservices
**Mindset:** #TechCareer #DeveloperLife #LegacyModernization #CloudMigration

Select from this pool based on post topic. Add custom hashtags for specific concepts in each post.
