# StackedLayers Workflow

**Vertical progression showing layered concepts building on each other — the signature InfoBlocks layout.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the StackedLayers workflow to create a layered infographic"}' \
  > /dev/null 2>&1 &
```

Running **StackedLayers** in **InfoBlocks**...

---

## Purpose

Show concepts that build on each other vertically — each layer adding capability, complexity, or understanding. This is the **primary** InfoBlocks layout, matching the reference style.

**Classic Examples:**
- LLM → RAG → AI Agent → MCP (building complexity)
- Data → Information → Knowledge → Wisdom
- Infrastructure → Platform → Application → User
- Basic → Intermediate → Advanced → Expert

---

## Composition Structure

```
+----------------------------------------------------------+
|  [Optional overall title]                                 |
|                                                            |
|  [Silhouette]   LAYER 1 HEADER = Analogy                 |
|  [analogy]      * Bullet explanation                       |
|                 * Bullet explanation        [3D BLOCK]    |
|                                             [labeled]     |
|                         |                                  |
|                         v (connecting arrow)               |
|                                                            |
|  [Silhouette]   LAYER 2 HEADER = Analogy                 |
|  [analogy]      * Bullet explanation                       |
|                 * Bullet explanation        [3D BLOCK]    |
|                                             [labeled]     |
|                         |                                  |
|                         v (connecting arrow)               |
|                                                            |
|  [Silhouette]   LAYER 3 HEADER = Analogy                 |
|  [analogy]      * Bullet explanation                       |
|                 * Bullet explanation        [3D BLOCK]    |
|                                             [labeled]     |
|                         |                                  |
|                         v (connecting arrow)               |
|                                                            |
|  [Silhouette]   LAYER 4 HEADER = Analogy                 |
|  [analogy]      * Bullet explanation                       |
|                 * Bullet explanation        [3D BLOCK]    |
|                                             [labeled]     |
+----------------------------------------------------------+
```

**Key layout elements:**
- LEFT column: Human body silhouettes showing analogies (brain, hands, nervous system)
- CENTER: Text — equation-style header + bullet explanations
- RIGHT column: 3D isometric blocks with objects on top, labeled
- BETWEEN layers: Connecting arrows (gold/amber) showing progression

---

## Color Strategy

- **Layer 1 block:** Navy Blue (#2D3A5C) — foundation
- **Layer 2 block:** Navy Blue with Steel Blue (#5B7BA5) accents — building
- **Layer 3 block:** Steel Blue with Gold (#C9A84C) accents — expanding
- **Layer 4 block:** Gold/Amber (#C9A84C) with Navy details — culmination
- **Connecting arrows:** Gold (#C9A84C) — consistent flow indicator
- **Headers:** Black (#1A1A2E) bold text
- **Silhouettes:** Translucent blue/gray (#B8CEE0)
- **Background:** Warm cream (#F5F0E8) throughout

---

## Prompt Template

```
Clean educational infographic showing layered concept progression on warm cream background.

LAYOUT: Vertical stacked layers — each concept builds on the previous one
- 3-5 horizontal sections stacked vertically
- Each section has: silhouette (left) + text (center) + 3D block (right)
- Gold connecting arrows between sections showing progression

BACKGROUND: Warm cream (#F5F0E8) — clean professional surface

LAYER 1 (TOP):
- Header: "[CONCEPT 1] = [ANALOGY]" — bold black sans-serif
- Bullets: "[explanation 1]", "[explanation 2]"
- Silhouette: Translucent blue human figure showing [body analogy]
- 3D Block: Navy blue (#2D3A5C) isometric platform labeled "[LABEL]"
- Object on block: [3D rendered object] in navy/steel blue

LAYER 2:
- Header: "[CONCEPT 2] = [ANALOGY]" — bold black sans-serif
- Bullets: "[explanation 1]", "[explanation 2]"
- Silhouette: Translucent blue human figure showing [body analogy]
- 3D Block: Navy blue isometric platform labeled "[LABEL]"
- Object on block: [3D rendered object] with [additional items]
- Gold arrow connecting from Layer 1

LAYER 3:
- Header: "[CONCEPT 3] = [ANALOGY]" — bold black sans-serif
- Bullets: "[explanation 1]", "[explanation 2]"
- Silhouette: Translucent blue human figure showing [body analogy]
- 3D Block: Steel blue (#5B7BA5) isometric platform labeled "[LABEL]"
- Object on block: [3D rendered object] in gold/amber accents
- Gold arrow connecting from Layer 2

LAYER 4 (BOTTOM):
- Header: "[CONCEPT 4] = [ANALOGY]" — bold black sans-serif
- Bullets: "[explanation 1]", "[explanation 2]"
- Silhouette: Translucent blue human figure showing [body analogy]
- 3D Block: Gold/amber (#C9A84C) accent isometric platform labeled "[LABEL]"
- Object on block: [3D rendered circuit/system] showing connectivity
- Gold arrow connecting from Layer 3

STYLE:
- Warm cream background throughout
- 3D isometric blocks — polished, soft-lit, subtle shadows
- Clean sans-serif typography
- Human silhouettes as concept anchors
- Professional, corporate-educational aesthetic
- NO dark backgrounds, NO marker/chalk, NO gradients, NO neon
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR STACKED LAYERS PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/infoblocks-layers-[topic].png"
)
```

**Note:** `4:5` is the default aspect ratio for this workflow — vertical infographic format works best for stacked layers.

---

## Validation

- [ ] Vertical stacked layout with clear layer separation
- [ ] Each layer has: silhouette + text + 3D block
- [ ] Gold connecting arrows between layers
- [ ] 3D isometric blocks with labels
- [ ] Equation-style headers ("X = Y + Z")
- [ ] Warm cream background
- [ ] Professional, corporate-educational feel
- [ ] Concepts clearly build on each other
