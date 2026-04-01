# Excalidraw Visual Pattern Library

9 reusable diagram patterns. Choose based on what your diagram needs to communicate.

---

## 1. Fan-Out (One-to-Many)

**Use when:** One source produces multiple outputs, one event triggers multiple effects.

```
            ┌─→ Output A
Source ─────┼─→ Output B
            └─→ Output C
```

**Implementation:** Central rectangle/ellipse with multiple arrows radiating outward. Space destinations evenly (120px apart vertically). Use consistent arrow colors.

**Example:** API request → multiple microservice calls, event → multiple handlers.

---

## 2. Convergence (Many-to-One)

**Use when:** Multiple inputs combine into a single output.

```
Input A ──┐
Input B ──┼──→ Result
Input C ──┘
```

**Implementation:** Multiple shapes with arrows pointing to a single destination. Align sources vertically, destination to the right.

**Example:** Data sources → aggregation, approval chain → final decision.

---

## 3. Tree (Hierarchy)

**Use when:** Parent-child relationships, org charts, classification taxonomies.

```
        Root
       /    \
    Child   Child
    /  \      |
  Leaf Leaf  Leaf
```

**Implementation:** Use **lines + text** rather than nested boxes. Vertical lines from parent to children, horizontal line connecting siblings. Free-floating text labels at each node. Avoid deep nesting of rectangles — it gets cluttered fast.

**Example:** File system, component hierarchy, decision tree.

---

## 4. Cycle/Spiral (Feedback Loop)

**Use when:** Iterative processes, feedback loops, continuous improvement.

```
  ┌─→ Plan ──→ Do ──┐
  │                  │
  └── Act ←── Check ←┘
```

**Implementation:** 4 shapes arranged in a square/circle pattern with arrows forming a loop. Place the entry point at top-left. Use curved arrows or right-angle elbowed arrows.

**Example:** PDCA cycle, CI/CD pipeline, agile sprint.

---

## 5. Assembly Line (Sequential Transformation)

**Use when:** Input transforms through stages to output.

```
Raw → Process A → Process B → Process C → Finished
```

**Implementation:** Linear left-to-right flow. Each stage is a rectangle. Arrows between each. Show the transformation state above/below each arrow with free-floating text.

**Example:** Data pipeline, manufacturing process, request lifecycle.

---

## 6. Side-by-Side (Comparison)

**Use when:** Comparing two approaches, before/after, old vs new.

```
┌─────────────┐  ┌─────────────┐
│   Option A   │  │   Option B   │
│  ─ Feature 1 │  │  ─ Feature 1 │
│  ─ Feature 2 │  │  ─ Feature 2 │
└─────────────┘  └─────────────┘
```

**Implementation:** Two equal-width columns separated by 100px+ gap. Use a dashed vertical line as divider. Mirror layout between columns for easy comparison. Title each column with larger text.

**Example:** REST vs GraphQL, monolith vs microservices.

---

## 7. Cloud (Abstract/Fuzzy State)

**Use when:** Representing abstract concepts, uncertain boundaries, or states.

**Implementation:** 2-3 overlapping ellipses with low opacity (40-60%). Use soft colors. Place label text centered over the cluster. Good for "the internet", "cloud", "unknown", "possibility space".

---

## 8. Gap/Break (Intentional Separation)

**Use when:** Showing that two sections are deliberately disconnected.

**Implementation:** Leave 200px+ horizontal or vertical gap between sections. Optionally add a dashed line or "..." text element to mark the break explicitly.

**Example:** Internal vs external systems, before vs after migration.

---

## 9. Lines as Structure

**Use when:** Timelines, swimlanes, section dividers.

**Types:**
- **Timeline:** Horizontal line with dot markers and labels above/below
- **Swimlane:** Parallel horizontal dashed lines with section labels on the left
- **Divider:** Single dashed line separating diagram sections

**Implementation:** Use `type: "line"` with `strokeStyle: "dashed"` and `opacity: 60` for structural lines. Add small filled ellipses (12x12) as markers. Use free-floating text for labels.

---

## Pattern Selection Guide

| What You're Showing | Pattern |
|---|---|
| "X causes A, B, and C" | Fan-Out |
| "A, B, C combine into X" | Convergence |
| "X contains Y which contains Z" | Tree |
| "This repeats" | Cycle |
| "X becomes Y becomes Z" | Assembly Line |
| "Compare A vs B" | Side-by-Side |
| "Vague boundary / abstract concept" | Cloud |
| "These are separate" | Gap/Break |
| "Events over time" | Lines as Structure (timeline) |

---

## Combining Patterns

Complex diagrams combine 2-3 patterns:

- **Assembly Line + Fan-Out:** Pipeline that splits into multiple outputs at the end
- **Tree + Cycle:** Hierarchical process with feedback at leaf level
- **Side-by-Side + Assembly Line:** Compare two sequential processes
- **Fan-Out + Convergence:** Scatter-gather pattern (fork-join)

Keep each pattern section visually distinct with 150px+ spacing between them.
