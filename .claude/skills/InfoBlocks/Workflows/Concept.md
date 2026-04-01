# Concept Workflow

**Single concept explanations with 3D isometric illustrations in InfoBlocks style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Concept workflow to create a concept explainer infographic"}' \
  > /dev/null 2>&1 &
```

Running **Concept** in **InfoBlocks**...

---

## Purpose

Explain a single concept, technology, or idea through polished 3D illustrations and clear text.

**Classic Examples:**
- What is Kubernetes?
- How RAG works
- The MCP protocol explained
- Cloud-native architecture
- Digital twin concept

---

## Composition Options

### Option A: Central Block
```
+-------------------------------------+
|          [TITLE = ANALOGY]          |
|                                     |
|         +---------------+           |
|         |  [3D BLOCK]   |           |
|         |  [labeled]    |           |
|         |  [object]     |           |
|         +---------------+           |
|        /       |        \           |
|   [Aspect] [Aspect] [Aspect]       |
|                                     |
|   * Key explanation bullets         |
+-------------------------------------+
```

### Option B: Exploded View
```
+-------------------------------------+
|          [TITLE]                    |
|                                     |
|  [Component A]  →  [Central Block]  |
|  [Component B]  →  [with label]     |
|  [Component C]  →                   |
|                                     |
|  * How the components work together |
+-------------------------------------+
```

### Option C: Analogy Split
```
+-------------------------------------+
|          [TITLE = ANALOGY]          |
|                                     |
|  [Human body      |  [3D tech      |
|   silhouette      |   block        |
|   showing         |   showing      |
|   analogy]        |   reality]     |
|                                     |
|  * Explanation connecting both      |
+-------------------------------------+
```

---

## Color Strategy

- **Title:** Black bold sans-serif with equation format
- **Central block:** Navy Blue (#2D3A5C) — primary focus
- **Component blocks:** Steel Blue (#5B7BA5) — supporting
- **Connecting arrows/lines:** Gold (#C9A84C)
- **Silhouettes:** Translucent blue (#B8CEE0)
- **Body text:** Dark (#1A1A2E)
- **Background:** Warm cream (#F5F0E8)

---

## Prompt Template

```
Clean educational concept explainer on warm cream (#F5F0E8) background.

CONCEPT: [What you're explaining]

COMPOSITION: [Choose: Central block / Exploded view / Analogy split]

TITLE:
"[CONCEPT NAME] = [ANALOGY]" — bold black sans-serif

MAIN VISUAL:
- Central 3D Block: Navy Blue (#2D3A5C) isometric platform labeled "[CONCEPT]"
- Object on block: [3D rendered object representing the concept]
- Supporting elements: [Component blocks in Steel Blue]
- Connections: Gold (#C9A84C) arrows showing relationships

ANALOGY ELEMENT (if applicable):
- Translucent blue human silhouette showing [body part analogy]
- Connected visually to the tech block

TEXT ELEMENTS:
- Bullet explanations: [3-4 clean bullet points]
- Labels on blocks: White text on navy/steel blue surfaces

STYLE:
- Warm cream background
- 3D isometric rendered blocks — polished, professional
- Clean bold sans-serif typography
- Corporate-educational tone
- NO dark backgrounds, NO marker/chalk, NO gradients, NO neon
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR CONCEPT PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/infoblocks-concept-[topic].png"
)
```

---

## Validation

- [ ] Concept clear within 3 seconds
- [ ] Central 3D block with label
- [ ] Equation-style or descriptive header
- [ ] Warm cream background
- [ ] Clean professional typography
- [ ] Not cluttered — one main idea
