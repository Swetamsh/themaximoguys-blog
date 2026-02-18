# Blog Folder Structure

Recommended folder organization for Maximo blog content, optimized for Git publishing and cross-linking.

---

## Recommended Structure

```
maximo-blog/
├── README.md                          # Repository overview
├── CONTRIBUTING.md                    # How to contribute
├── .gitignore                         # Ignore patterns
│
├── content/                           # All blog content
│   │
│   ├── series/                        # Multi-part blog series
│   │   └── maximo-ai-modernization/   # Series folder
│   │       ├── _index.md              # Series landing page
│   │       ├── 01-why-ai-for-maximo.md
│   │       ├── 02-mas-ai-capabilities.md
│   │       ├── 03-ai-integration-architecture.md
│   │       ├── 04-data-readiness-guide.md
│   │       ├── 05-implementation-roadmap.md
│   │       └── 06-technology-stack.md
│   │
│   ├── tutorials/                     # Step-by-step how-tos
│   │   ├── monitor-setup.md
│   │   ├── health-scoring-config.md
│   │   └── predict-model-training.md
│   │
│   ├── guides/                        # In-depth guides
│   │   ├── migration-7x-to-9x.md
│   │   └── data-quality-checklist.md
│   │
│   ├── reference/                     # Quick reference material
│   │   ├── mas-api-cheatsheet.md
│   │   └── failure-code-best-practices.md
│   │
│   └── news/                          # News and announcements
│       └── mas-9x-features.md
│
├── images/                            # All visual assets
│   ├── headers/                       # Blog header images
│   │   ├── mas-ai-01-header.png
│   │   └── mas-ai-02-header.png
│   │
│   ├── diagrams/                      # Architecture/flow diagrams
│   │   ├── mas-ai-architecture.excalidraw
│   │   ├── mas-ai-architecture.png
│   │   └── predict-lifecycle.excalidraw
│   │
│   ├── infographics/                  # DanKoeStyle visuals
│   │   ├── data-foundation-comparison.png
│   │   └── five-phase-journey.png
│   │
│   └── screenshots/                   # UI screenshots
│       ├── health-dashboard.png
│       └── monitor-config.png
│
├── templates/                         # Blog templates
│   ├── series-post.md
│   ├── tutorial.md
│   └── quick-reference.md
│
└── _config/                           # Site configuration
    ├── navigation.yaml                # Site navigation
    ├── series.yaml                    # Series definitions
    └── tags.yaml                      # Tag taxonomy
```

---

## Folder Descriptions

### `/content/series/`

For multi-part blog series with a narrative arc.

**Naming convention:** `XX-slug.md` where XX is the order number
**Required files:** `_index.md` for series landing page

**Example series structure:**
```
series/maximo-ai-modernization/
├── _index.md                    # "Modernizing IBM Maximo with AI"
├── 01-why-ai-for-maximo.md      # Part 1
├── 02-mas-ai-capabilities.md    # Part 2
└── ...
```

### `/content/tutorials/`

Step-by-step implementation guides. Single posts, not series.

**Naming convention:** `action-noun.md` (e.g., `configure-health-scoring.md`)

### `/content/guides/`

Comprehensive guides on specific topics. Longer than tutorials.

**Naming convention:** `topic-subtopic.md` (e.g., `migration-7x-to-9x.md`)

### `/content/reference/`

Quick reference material, cheat sheets, best practices lists.

**Naming convention:** `topic-cheatsheet.md` or `topic-reference.md`

### `/images/`

All visual assets organized by type.

**Naming convention:** `blog-slug-description.ext`
**Keep both source and export:** Store `.excalidraw` alongside `.png`

---

## Cross-Linking Patterns

### Within a Series

Use relative paths from current file:

```markdown
<!-- In 03-ai-integration-architecture.md -->
[Previous: MAS AI Capabilities](./02-mas-ai-capabilities.md)
[Next: Data Readiness Guide](./04-data-readiness-guide.md)
[Series Index](./_index.md)
```

### Across Categories

Use paths relative to content root:

```markdown
<!-- In series/maximo-ai-modernization/04-data-readiness.md -->
See also: [Data Quality Checklist](/guides/data-quality-checklist.md)
```

### Image References

Use paths relative to repository root:

```markdown
![Architecture Diagram](/images/diagrams/mas-ai-architecture.png)
```

---

## Git Publishing Considerations

### GitHub Pages

For Jekyll-based GitHub Pages:

```yaml
# _config.yml
baseurl: "/maximo-blog"  # Repository name
url: "https://username.github.io"

# Markdown settings
markdown: kramdown
kramdown:
  input: GFM
```

### Relative Links

All internal links should be relative to work both:
- Locally in markdown editors
- When deployed to GitHub Pages

**Do:**
```markdown
[Next Post](./02-next-post.md)
![Image](/images/diagram.png)
```

**Don't:**
```markdown
[Next Post](https://site.com/blog/02-next-post)
![Image](https://site.com/images/diagram.png)
```

### .gitignore

```gitignore
# Temporary files
*.tmp
*.swp
.DS_Store

# Generated files (if building locally)
_site/
.jekyll-cache/

# Large source files (optional - keep if you want to version source)
# *.excalidraw

# Credentials
.env
secrets/
```

---

## Migration Checklist

To migrate existing flat structure to organized folders:

- [ ] Create folder structure as above
- [ ] Move series posts to `/content/series/series-name/`
- [ ] Create `_index.md` for each series
- [ ] Move images to appropriate `/images/` subfolders
- [ ] Update all internal links to relative paths
- [ ] Update image paths
- [ ] Update BlogRegistry with new paths
- [ ] Test all links locally
- [ ] Commit and push

---

## Quick Commands

### Create new series

```bash
mkdir -p content/series/new-series-name
touch content/series/new-series-name/_index.md
```

### Find broken links

```bash
grep -r "\[.*\](.*\.md)" content/ | grep -v "^\./\|^/"
```

### List all images

```bash
find images/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.excalidraw" \)
```

### Validate structure

```bash
/MaximoBlog validate-structure --path ./content/
```
