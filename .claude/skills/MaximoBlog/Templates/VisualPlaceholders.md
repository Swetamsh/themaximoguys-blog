# Visual Placeholder System

This document defines placeholder syntax for visuals that can be generated later using appropriate skills.

---

## Placeholder Types

### 1. Infographic Placeholder (DanKoeStyle)

Use for marketing-style visuals, comparisons, pyramids, and educational graphics.

**Syntax:**
```markdown
<!-- INFOGRAPHIC
type: comparison | pyramid | concept | process | timeline
title: "Your Title Here"
description: "What this infographic should show"
left_items: ["Item 1", "Item 2", "Item 3"]  # for comparisons
right_items: ["Item 1", "Item 2", "Item 3"]  # for comparisons
steps: ["Step 1", "Step 2", "Step 3"]  # for process/timeline
annotation: "Key insight or call to action"
output: /images/infographic-name.png
skill: DanKoeStyle
-->
![Infographic: Title](/images/infographic-name.png)
```

**Example - Comparison:**
```markdown
<!-- INFOGRAPHIC
type: comparison
title: "YOUR AI IS ONLY AS GOOD AS YOUR DATA"
description: "Side-by-side comparison of AI outcomes with and without data foundation"
left_label: "AI WITHOUT FOUNDATION"
right_label: "AI WITH FOUNDATION"
left_items: ["Wasted investment", "Predictions fail", "Why doesn't it work?"]
right_items: ["Strong ROI", "Accurate predictions", "Scalable growth"]
annotation: "fix the data foundation first"
output: /images/data-foundation-comparison.png
skill: DanKoeStyle
-->
![Data Foundation Comparison](/images/data-foundation-comparison.png)
```

---

### 2. Flowchart/Diagram Placeholder (Excalidraw)

Use for technical diagrams, process flows, architecture, org charts.

**Syntax:**
```markdown
<!-- DIAGRAM
type: flowchart | architecture | orgchart | sequence | mindmap | maturity
title: "Diagram Title"
description: "What this diagram should show"
elements: ["Element 1", "Element 2", "Element 3"]
connections: ["Element 1 -> Element 2", "Element 2 -> Element 3"]
output: /images/diagram-name.excalidraw
output_png: /images/diagram-name.png
skill: Excalidraw
-->
![Diagram: Title](/images/diagram-name.png)
```

**Example - Process Flowchart:**
```markdown
<!-- DIAGRAM
type: flowchart
title: "PREDICT MODEL DEVELOPMENT LIFECYCLE"
description: "6-step ML model development process with retrain loop"
elements: ["Data Extraction", "Feature Engineering", "Model Training", "Validation", "Deployment", "Monitoring"]
connections: ["1 -> 2 -> 3 -> 4 -> 5 -> 6", "6 -> 1 (retrain)"]
output: /images/predict-lifecycle.excalidraw
output_png: /images/predict-lifecycle.png
skill: Excalidraw
-->
![Predict Lifecycle](/images/predict-lifecycle.png)
```

---

### 3. Architecture Diagram Placeholder

Use for system architecture, integration patterns, data flow.

**Syntax:**
```markdown
<!-- ARCHITECTURE
title: "Architecture Title"
description: "System architecture overview"
layers:
  - name: "Edge Layer"
    components: ["IoT Sensors", "Edge Gateway", "OPC-UA"]
  - name: "Platform Layer"
    components: ["Maximo Monitor", "Health", "Predict"]
  - name: "AI Layer"
    components: ["watsonx.ai", "Model Training", "Inference"]
connections: ["Sensors -> Gateway -> Monitor", "Monitor -> Health -> Predict"]
output: /images/architecture-name.excalidraw
output_png: /images/architecture-name.png
skill: Excalidraw
-->
![Architecture](/images/architecture-name.png)
```

---

### 4. Screenshot Placeholder

Use for UI screenshots that need to be captured manually.

**Syntax:**
```markdown
<!-- SCREENSHOT
title: "Screenshot Title"
description: "What this screenshot should show"
source: "MAS 9.x Health Dashboard"
annotations: ["Highlight health score", "Circle anomaly indicator"]
output: /images/screenshot-name.png
status: pending | captured | annotated
-->
![Screenshot: Title](/images/screenshot-name.png)
```

---

### 5. Header Image Placeholder (Art Skill)

Use for blog header/hero images.

**Syntax:**
```markdown
<!-- HEADER
title: "Blog Title"
theme: "industrial/technology/data/ai"
style: "charcoal sketch with IBM blue accents"
elements: ["factory", "gears", "data streams", "AI brain"]
output: /images/header-name.png
skill: Art
-->
![Header](/images/header-name.png)
```

---

## Placeholder Status Tracking

Each placeholder has a status that can be tracked:

| Status | Meaning |
|--------|---------|
| `pending` | Placeholder defined, visual not yet generated |
| `generating` | Visual is being created |
| `review` | Visual created, needs review |
| `approved` | Visual finalized and approved |
| `published` | Visual is live in published content |

---

## Generating Visuals from Placeholders

### Manual Generation

Run the visual generation workflow:

```bash
# Generate all pending infographics
/MaximoBlog generate-visuals --type infographic --status pending

# Generate specific diagram
/MaximoBlog generate-visual --file path/to/blog.md --placeholder "DIAGRAM: title"
```

### Skill Routing

| Placeholder Type | Primary Skill | Fallback |
|------------------|---------------|----------|
| INFOGRAPHIC | DanKoeStyle | Art |
| DIAGRAM | Excalidraw | Art (Mermaid) |
| ARCHITECTURE | Excalidraw | Art |
| SCREENSHOT | Manual | Browser skill |
| HEADER | Art | DanKoeStyle |

---

## Best Practices

1. **Be specific** — Include enough detail in the description for accurate generation
2. **Use consistent naming** — Follow `category-name.png` convention
3. **Include alt text** — The markdown image should have descriptive alt text
4. **Track status** — Update placeholder status as visuals are generated
5. **Version control** — Keep both `.excalidraw` source and `.png` export

---

## Placeholder Scanner

To find all placeholders in a blog:

```bash
grep -n "<!-- INFOGRAPHIC\|<!-- DIAGRAM\|<!-- ARCHITECTURE\|<!-- SCREENSHOT\|<!-- HEADER" path/to/blog.md
```

Or use the MaximoBlog workflow:

```
/MaximoBlog scan-placeholders --path ./blog/
```
