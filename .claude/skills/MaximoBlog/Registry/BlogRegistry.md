# Blog Registry

Central registry for all Maximo blogs. Enables cross-linking, series navigation, and related content discovery.

---

## How to Use This Registry

1. **Add new blogs** to the registry when created
2. **Update relationships** as content evolves
3. **Generate navigation** using the snippets below
4. **Find related content** by tags or series

---

## Registry Format

```yaml
- id: unique-blog-id
  title: "Blog Title"
  path: /series/category/filename.md
  series: series-name (if part of series)
  series_order: 1 (position in series)
  tags: [tag1, tag2, tag3]
  category: tutorials | guides | series | reference
  related: [other-blog-id-1, other-blog-id-2]
  status: draft | review | published
  published_date: YYYY-MM-DD
  visuals:
    - type: infographic
      status: pending | approved
    - type: diagram
      status: pending | approved
```

---

## Current Registry

### Series: Modernizing IBM Maximo with AI

| ID | Title | Path | Order | Status |
|----|-------|------|-------|--------|
| `mas-ai-00` | Series Index | `/series/maximo-ai-modernization/00-series-index.md` | 0 | published |
| `mas-ai-01` | Why AI for Maximo? | `/series/maximo-ai-modernization/01-why-ai-for-maximo.md` | 1 | published |
| `mas-ai-02` | MAS AI Capabilities | `/series/maximo-ai-modernization/02-mas-ai-capabilities.md` | 2 | published |
| `mas-ai-03` | AI Integration Architecture | `/series/maximo-ai-modernization/03-ai-integration-architecture.md` | 3 | published |
| `mas-ai-04` | Data Readiness Guide | `/series/maximo-ai-modernization/04-data-readiness-guide.md` | 4 | published |
| `mas-ai-05` | Implementation Roadmap | `/series/maximo-ai-modernization/05-implementation-roadmap.md` | 5 | published |
| `mas-ai-06` | Technology Stack Guide | `/series/maximo-ai-modernization/06-technology-stack.md` | 6 | published |

**Series metadata:**
```yaml
series:
  id: maximo-ai-modernization
  title: "Modernizing IBM Maximo with AI"
  description: "A 6-part series on transforming EAM with artificial intelligence"
  tags: [maximo, mas, ai, predictive-maintenance, digital-transformation]
  total_parts: 6
```

---

## Tag Index

| Tag | Blog IDs |
|-----|----------|
| `maximo` | mas-ai-01, mas-ai-02, mas-ai-03, mas-ai-04, mas-ai-05, mas-ai-06 |
| `ai` | mas-ai-01, mas-ai-02, mas-ai-03, mas-ai-05 |
| `data-quality` | mas-ai-04 |
| `implementation` | mas-ai-05 |
| `architecture` | mas-ai-03 |
| `predictive-maintenance` | mas-ai-02, mas-ai-03 |

---

## Cross-Linking Snippets

### Series Navigation (Prev/Next)

Add this at the bottom of each series post:

```markdown
---

<!-- SERIES_NAV: maximo-ai-modernization -->

<div class="series-nav">
  <a href="./03-ai-integration-architecture.md" class="prev">
    ← Part 3: AI Integration Architecture
  </a>
  <a href="./05-implementation-roadmap.md" class="next">
    Part 5: Implementation Roadmap →
  </a>
</div>

*This is Part 4 of 6 in the [Modernizing IBM Maximo with AI](./00-series-index.md) series.*
```

### Related Posts

Add this in a sidebar or at the bottom:

```markdown
<!-- RELATED_POSTS: mas-ai-04 -->

### Related Reading

- [Why AI for Maximo? The Business Case](./01-why-ai-for-maximo.md) — Understand the ROI drivers
- [MAS AI Capabilities Deep Dive](./02-mas-ai-capabilities.md) — Module-by-module breakdown
- [Implementation Roadmap](./05-implementation-roadmap.md) — Your 24-month journey
```

### Series Table of Contents

For the series index page:

```markdown
<!-- SERIES_TOC: maximo-ai-modernization -->

## The Blog Series

1. **[Why AI for Maximo?](./01-why-ai-for-maximo.md)** — The strategic imperative
2. **[MAS AI Capabilities](./02-mas-ai-capabilities.md)** — Module breakdown
3. **[AI Integration Architecture](./03-ai-integration-architecture.md)** — Technical patterns
4. **[Data Readiness Guide](./04-data-readiness-guide.md)** — Foundation requirements
5. **[Implementation Roadmap](./05-implementation-roadmap.md)** — Phased journey
6. **[Technology Stack](./06-technology-stack.md)** — Tools and alternatives
```

---

## Auto-Generation Commands

### Generate series navigation for all posts

```bash
/MaximoBlog generate-nav --series maximo-ai-modernization
```

### Find related posts by tag overlap

```bash
/MaximoBlog find-related --blog mas-ai-04 --min-overlap 2
```

### Update registry from blog frontmatter

```bash
/MaximoBlog sync-registry --path ./blog/
```

### Validate all cross-links

```bash
/MaximoBlog validate-links --path ./blog/
```

---

## Adding a New Blog to Registry

1. **Create the blog** using appropriate MaximoBlog workflow
2. **Add entry** to this registry with all metadata
3. **Update tag index** with new tags
4. **Add relationships** to related blogs
5. **Generate navigation** if part of a series

**Template for new entry:**

```yaml
- id: unique-id
  title: "New Blog Title"
  path: /category/filename.md
  series: null
  series_order: null
  tags: [tag1, tag2]
  category: tutorials
  related: []
  status: draft
  published_date: null
  visuals:
    - type: header
      status: pending
```

---

## Link Validation Rules

| Rule | Description |
|------|-------------|
| **Relative paths** | All internal links use relative paths (./filename.md) |
| **No broken links** | All referenced blogs must exist in registry |
| **Bidirectional** | If A links to B, B should link to A (where relevant) |
| **Series complete** | Series posts link to prev/next and index |
| **Images exist** | All image paths resolve to actual files |
