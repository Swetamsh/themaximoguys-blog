# Git Publishing Guide

Complete guide for publishing your Maximo blog to GitHub and deploying to GitHub Pages.

---

## Quick Start

```bash
# Initialize repo
cd maximo-blog/
git init
git add .
git commit -m "Initial commit: Maximo blog structure"

# Push to GitHub
gh repo create maximo-blog --public --source=. --push

# Enable GitHub Pages
gh api repos/{owner}/{repo}/pages -X POST -f source.branch=main -f source.path=/
```

---

## Repository Setup

### 1. Initialize Repository

```bash
# In your blog root directory
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# OS files
.DS_Store
Thumbs.db

# Editor files
*.swp
*.swo
.vscode/
.idea/

# Build artifacts
_site/
.jekyll-cache/
node_modules/

# Temporary files
*.tmp
*.bak

# Sensitive files
.env
secrets/
credentials/

# Large generated files (optional - comment out to version)
# *.excalidraw
EOF

# Create README
cat > README.md << 'EOF'
# Maximo Blog

Technical content about IBM Maximo Application Suite (MAS) and AI-powered asset management.

## Structure

- `/content/` - Blog posts organized by category
- `/images/` - Visual assets (diagrams, screenshots, headers)
- `/templates/` - Blog post templates

## Building

This blog uses GitHub Pages with Jekyll.

```bash
# Local preview
bundle exec jekyll serve

# Or use GitHub Pages directly
git push origin main
```

## License

Content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
EOF
```

### 2. GitHub Repository Creation

**Option A: GitHub CLI (recommended)**

```bash
# Create public repository
gh repo create maximo-blog --public --source=. --push

# Or private
gh repo create maximo-blog --private --source=. --push
```

**Option B: Manual**

1. Go to github.com/new
2. Create repository "maximo-blog"
3. Push existing content:

```bash
git remote add origin https://github.com/USERNAME/maximo-blog.git
git branch -M main
git push -u origin main
```

---

## GitHub Pages Setup

### Option 1: Simple Markdown (No Build)

GitHub Pages can serve markdown directly. Simplest setup:

1. Go to repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main`, folder: `/ (root)`
4. Save

Your site will be at: `https://USERNAME.github.io/maximo-blog/`

**Note:** Links must use `.md` extension or configure Jekyll to process them.

### Option 2: Jekyll (Recommended)

Jekyll processes markdown and provides themes, layouts, and navigation.

**Create `_config.yml`:**

```yaml
# Site settings
title: "Maximo Blog"
description: "Technical insights on IBM Maximo Application Suite and AI-powered asset management"
baseurl: "/maximo-blog"  # Repository name
url: "https://USERNAME.github.io"

# Build settings
theme: minima  # Or: just-the-docs, minimal-mistakes
markdown: kramdown
kramdown:
  input: GFM
  auto_ids: true
  syntax_highlighter: rouge

# Collections for organized content
collections:
  series:
    output: true
    permalink: /series/:path/
  tutorials:
    output: true
    permalink: /tutorials/:path/

# Defaults
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
      type: "series"
    values:
      layout: "post"

# Plugins (GitHub Pages supported)
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
```

**Create `Gemfile`:**

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end
```

### Option 3: GitHub Actions (Custom Build)

For more control, use a custom build workflow.

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Build with Jekyll
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Image Handling

### Image Path Strategy

For images to work both locally and on GitHub Pages:

**In markdown files:**
```markdown
![Diagram](/images/diagrams/architecture.png)
```

**In Jekyll config:**
```yaml
baseurl: "/maximo-blog"
```

Jekyll will prepend baseurl automatically when using `{{ site.baseurl }}`:

```markdown
![Diagram]({{ site.baseurl }}/images/diagrams/architecture.png)
```

### Image Optimization

Before committing, optimize images:

```bash
# Install ImageMagick
brew install imagemagick

# Optimize all PNGs in images/
find images/ -name "*.png" -exec convert {} -strip -quality 85 {} \;

# Create thumbnails
for img in images/headers/*.png; do
  convert "$img" -resize 400x -quality 80 "${img%.png}-thumb.png"
done
```

### Large File Handling (Git LFS)

For large images or Excalidraw files:

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.excalidraw"
git lfs track "images/**/*.png"

# Add .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS for large files"
```

---

## Cross-Link Validation

Before pushing, validate all links work:

```bash
# Install link checker
npm install -g markdown-link-check

# Check all markdown files
find content/ -name "*.md" -exec markdown-link-check {} \;

# Or use Jekyll's built-in
bundle exec htmlproofer ./_site --disable-external
```

---

## Publishing Workflow

### Daily Workflow

```bash
# 1. Write/edit content
vim content/tutorials/new-post.md

# 2. Preview locally
bundle exec jekyll serve
# Visit http://localhost:4000/maximo-blog/

# 3. Stage and commit
git add content/tutorials/new-post.md
git commit -m "Add tutorial: Configure Health Scoring"

# 4. Push to deploy
git push origin main
```

### Adding a New Blog Post

```bash
# 1. Create from template
cp templates/tutorial.md content/tutorials/new-tutorial.md

# 2. Edit frontmatter and content
vim content/tutorials/new-tutorial.md

# 3. Add any images
cp ~/Downloads/screenshot.png images/screenshots/

# 4. Update registry
vim _config/registry.yaml

# 5. Commit all
git add .
git commit -m "Add tutorial: New Topic"
git push
```

### Publishing a Series

```bash
# 1. Create series folder
mkdir -p content/series/new-series

# 2. Create index
cat > content/series/new-series/_index.md << 'EOF'
---
title: "New Series Title"
description: "Series description"
---
# New Series

Overview content here.
EOF

# 3. Add posts
cp templates/series-post.md content/series/new-series/01-first-post.md
# ... edit and add more posts

# 4. Update navigation
vim _config/navigation.yaml

# 5. Commit series
git add content/series/new-series/
git commit -m "Add series: New Series Title (6 parts)"
git push
```

---

## Custom Domain (Optional)

To use a custom domain like `blog.yourdomain.com`:

1. Add CNAME file:
```bash
echo "blog.yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. Configure DNS:
   - Add CNAME record: `blog` → `USERNAME.github.io`

3. Enable HTTPS in GitHub Pages settings

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check baseurl in _config.yml matches repo name |
| 404 on pages | Ensure `permalink` is set correctly in frontmatter |
| Build failing | Check GitHub Actions logs for Jekyll errors |
| Links broken | Use relative paths (./file.md) not absolute |
| CSS not loading | Clear browser cache, check baseurl |

### Debug Locally

```bash
# Verbose Jekyll build
bundle exec jekyll build --verbose

# Check for broken links
bundle exec htmlproofer ./_site

# Lint markdown
npm install -g markdownlint-cli
markdownlint content/**/*.md
```

---

## Security Considerations

- Never commit credentials or API keys
- Use `.gitignore` for sensitive files
- Review commits before pushing
- Enable branch protection on main
- Use signed commits if required

```bash
# Enable signed commits
git config --global commit.gpgsign true
```
