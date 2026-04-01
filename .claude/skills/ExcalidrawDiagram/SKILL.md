---
name: ExcalidrawDiagram
description: Generate Excalidraw diagram JSON files from natural language descriptions. Creates flowcharts, architecture diagrams, process flows, concept maps, and technical visuals as valid .excalidraw files. USE WHEN excalidraw, diagram, flowchart, architecture diagram, process flow, visual diagram, concept map, system diagram, sequence flow, draw diagram, create visual, mermaid alternative, whiteboard diagram, technical illustration, box-and-arrow diagram, entity relationship, network diagram.
---

# ExcalidrawDiagram Skill

Generate valid Excalidraw JSON diagrams from natural language descriptions. Produces `.excalidraw` files that open directly in Excalidraw, Obsidian (with excalidraw-plugin), or any compatible viewer.

## Core Philosophy

Diagrams should **ARGUE, not DISPLAY.** Two validation tests:
1. **Isomorphism Test**: If you removed all text, would the structure alone communicate the concept?
2. **Education Test**: Could someone learn something concrete from this diagram?

## Workflow Routing

| Request Type | Action |
|---|---|
| Create a diagram from description | **Generate Diagram** (main flow below) |
| Explain Excalidraw JSON format | Read `references/json-schema.md`, explain |
| Help with arrow bindings/connections | Read `references/arrow-bindings.md`, assist |
| Modify existing .excalidraw file | Read file, understand structure, edit JSON |
| Render diagram to PNG | Use render pipeline (see Section 7) |

---

## Generate Diagram — Main Flow

### Step 1: Assess Depth

Classify before designing:

| Level | Characteristics | Elements |
|---|---|---|
| **Simple/Conceptual** | Abstract shapes, mental models, overviews | Shapes, arrows, labels |
| **Comprehensive/Technical** | Concrete examples, real data, code snippets | Above + evidence artifacts, multi-zoom |

For technical diagrams: research actual specs, field names, real data before drawing.

### Step 2: Understand Deeply

Ask: What does this concept **DO**, not just what it IS?
- What transforms into what?
- Where are the decision points?
- What fails, and how?
- What's the human experience at each step?

### Step 3: Map Concepts to Visual Patterns

Reference `references/visual-patterns.md` for the pattern library:

| Pattern | Use When |
|---|---|
| **Fan-Out** | One source → multiple destinations |
| **Convergence** | Multiple inputs → single output |
| **Tree** | Hierarchy (use lines + text, avoid deep nesting of boxes) |
| **Cycle/Spiral** | Feedback loops, iterative processes |
| **Assembly Line** | Sequential transformation |
| **Side-by-Side** | Comparison between approaches |
| **Cloud** | Abstract/fuzzy state (overlapping ellipses) |
| **Gap/Break** | Intentional separation between concepts |

### Step 4: Map Concepts to Shapes

| Concept Type | Shape | Fill Color |
|---|---|---|
| Start/Trigger | Ellipse | `#fed7aa` (warm peach) |
| Process/Action | Rectangle | `#3b82f6` (blue) |
| Decision/Branch | Diamond | `#fef3c7` (amber) |
| End/Success | Ellipse | `#a7f3d0` (green) |
| Warning/Error | Rectangle | `#fee2e2` (red) |
| AI/LLM Component | Rectangle | `#ddd6fe` (purple) |
| Data/Storage | Rectangle (rounded) | `#93c5fd` (light blue) |
| External System | Rectangle (dashed) | `#dbeafe` (pale blue) |

Full color reference in `references/color-palette.md`.

### Step 5: Layout & Generate JSON

**Size Hierarchy:**
- Hero element: 300x150
- Primary elements: 180x90
- Secondary elements: 120x60
- Small elements: 60x40

**Spacing:**
- 200px+ whitespace around hero elements
- 80-120px between connected elements
- 40-60px between grouped elements

**Flow direction:** Left-to-right (default) or Top-to-bottom

**Text defaults:** `fontSize: 16`, `fontFamily: 3` (monospace), `textAlign: "center"`, `verticalAlign: "middle"` for contained text.

**ID Strategy:** Use descriptive string IDs (`"start_node"`, `"decision_cost"`, `"arrow_pm_to_do"`). For large diagrams, namespace by section (`"100_start"`, `"200_approval"`).

Reference `references/json-schema.md` for the complete JSON structure and `references/element-templates.md` for copy-paste templates.

### Step 6: Validate

**Critical validation rules:**
1. Every arrow with `startBinding`/`endBinding` → target shape must have matching `boundElements` entry (bidirectional)
2. Every text with `containerId` → container must have matching `boundElements` entry with `type: "text"`
3. All `points` arrays in arrows/lines start with `[0, 0]`
4. Element `width`/`height` must match bounding box of `points` for linear elements
5. Every element needs a unique `id` and random `seed`

**Render-validate loop (if render pipeline available):**
1. Write `.excalidraw` file
2. Run `render_excalidraw.py` to generate PNG
3. View PNG — check for overlapping text, misaligned arrows, cramped layout
4. Fix JSON and re-render (typically 2-4 iterations)

---

## Large Diagram Strategy

For diagrams with 20+ elements, build JSON in sections to avoid output limits:

1. Define sections with clear boundaries (e.g., "Input Processing", "Approval Chain", "Output")
2. Generate each section separately with namespaced IDs
3. Cross-section arrows use IDs from both namespaces
4. Merge all sections into final `elements` array

**Section ID namespacing:**
```
Section 1: IDs start with "s1_" (e.g., "s1_start", "s1_rect_process")
Section 2: IDs start with "s2_" (e.g., "s2_decision", "s2_arrow_link")
```

---

## Container vs Free-Floating Text

Default to **free-floating text** (no container). Add containers only when:
- The text represents a discrete entity (a service, a role, a step)
- The shape boundary communicates meaning (process vs decision vs start/end)
- Visual grouping is needed

Aim for **<30% of text elements inside containers**. Labels, annotations, and descriptions should float.

---

## Evidence Artifacts (Technical Diagrams)

For comprehensive/technical diagrams, include evidence artifacts — dark rectangles with colored text showing real data:

```json
{
  "type": "rectangle",
  "backgroundColor": "#1e293b",
  "fillStyle": "solid",
  "strokeColor": "#334155",
  "roundness": { "type": 3 }
}
```

Text inside evidence artifacts: `strokeColor: "#22c55e"` (green on dark) for JSON/code, `"#60a5fa"` for URLs/references.

---

## Anti-Patterns

| Don't | Do Instead |
|---|---|
| Put everything in boxes | Use free-floating text for labels |
| Use only rectangles | Match shape to meaning (diamond=decision, ellipse=start/end) |
| Uniform spacing everywhere | Use whitespace to signal importance |
| One color for everything | Use semantic colors from palette |
| Generic IDs ("elem1", "elem2") | Descriptive IDs ("decision_budget", "arrow_pm_approve") |
| Ignore arrow bindings | Always set both arrow binding AND shape boundElements |
| Tiny text crammed together | Size hierarchy — hero elements get 300x150 |

---

## Reference Files

Load on demand — only when specific knowledge is needed:

| File | When to Read | Contents |
|---|---|---|
| `references/json-schema.md` | When generating JSON or debugging format | Complete Excalidraw JSON structure, all element types, all properties |
| `references/element-templates.md` | When building elements | Copy-paste JSON templates for each element type |
| `references/color-palette.md` | When choosing colors | Semantic color system with fill/stroke pairs |
| `references/visual-patterns.md` | When choosing diagram layout | 9 visual patterns with descriptions and use cases |
| `references/arrow-bindings.md` | When connecting elements | Bidirectional binding system, fixedPoint coordinates |
| `references/render-pipeline.md` | When rendering to PNG | Python/Playwright render setup and usage |

---

## Output Format

Write the `.excalidraw` file directly using the Write tool:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [ ... ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": 20
  },
  "files": {}
}
```

Default filename: `{descriptive-name}.excalidraw` in the current working directory.
