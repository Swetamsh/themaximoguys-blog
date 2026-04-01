# Excalidraw Color Palette

Semantic color system for consistent, meaningful diagrams.

---

## Shape Colors (Fill / Stroke Pairs)

| Purpose | Fill | Stroke | Text On Fill |
|---|---|---|---|
| **Primary/Neutral** | `#3b82f6` | `#1e3a5f` | `#ffffff` |
| **Secondary** | `#60a5fa` | `#1e3a5f` | `#ffffff` |
| **Tertiary** | `#93c5fd` | `#1e3a5f` | `#374151` |
| **Start/Trigger** | `#fed7aa` | `#c2410c` | `#374151` |
| **End/Success** | `#a7f3d0` | `#047857` | `#374151` |
| **Warning/Reset** | `#fee2e2` | `#dc2626` | `#374151` |
| **Decision** | `#fef3c7` | `#b45309` | `#374151` |
| **AI/LLM** | `#ddd6fe` | `#6d28d9` | `#374151` |
| **Inactive/Disabled** | `#dbeafe` | `#1e40af` | `#374151` |
| **Error/Failure** | `#fecaca` | `#b91c1c` | `#374151` |
| **Data/Storage** | `#e0f2fe` | `#0284c7` | `#374151` |
| **External System** | `#f1f5f9` | `#64748b` | `#374151` |

**Inactive/Disabled** uses `strokeStyle: "dashed"` in addition to the color.

---

## Text Colors

| Role | Color | Use |
|---|---|---|
| Title | `#1e40af` | Main diagram title |
| Subtitle | `#3b82f6` | Section headers |
| Body/Detail | `#64748b` | Annotations, descriptions |
| On Light Fills | `#374151` | Text inside light-colored shapes |
| On Dark Fills | `#ffffff` | Text inside dark-colored shapes (primary, secondary) |
| On Evidence Blocks | `#22c55e` | Code/JSON text on dark artifacts |
| URLs/References | `#60a5fa` | Links on evidence artifacts |

---

## Arrow Colors

| Context | Color |
|---|---|
| Default arrow | Use source element's stroke color |
| Structural lines | `#1e3a5f` or `#64748b` |
| Success/positive path | `#047857` |
| Error/negative path | `#dc2626` |
| Optional/conditional | `#b45309` (dashed) |

---

## Evidence Artifacts

Dark blocks for showing real data/code:

| Element | Color |
|---|---|
| Background | `#1e293b` |
| Stroke | `#334155` |
| JSON/Code text | `#22c55e` |
| URL text | `#60a5fa` |
| Label text | `#94a3b8` |

---

## Background Colors

| Style | Color |
|---|---|
| White (default) | `#ffffff` |
| Light gray | `#f8fafc` |
| Dark mode | `#1e1e2e` |
| Transparent | `"transparent"` |

---

## Usage Rules

1. **Maximum 4-5 fill colors per diagram** — too many colors destroys meaning
2. **Consistent stroke color within sections** — don't mix stroke colors randomly
3. **Decision diamonds always amber** (`#fef3c7`) — universal visual convention
4. **Start/end always warm/green** — provides clear entry/exit signals
5. **Reserve red for warnings/errors only** — don't use red for neutral elements
