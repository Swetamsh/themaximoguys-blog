# Test Blog Repository

This is a test repository for themaximoguys blog posts. It contains sample MDX files that demonstrate the blog post structure.

## Structure

```
posts/
├── 2026-02-03-getting-started-maximo-ai.mdx (Free tier)
└── 2026-02-02-mas9-whats-new.mdx (Developer tier - gated)
```

## Using This Repository

### Option 1: Push to GitHub

1. Create a new GitHub repository (e.g., `themaximoguys-blog`)
2. Push this content to GitHub:

```bash
cd test-blog-repo
git init
git add .
git commit -m "Initial blog posts"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/themaximoguys-blog.git
git push -u origin main
```

3. Update your `.env.local`:

```env
GITHUB_REPO_OWNER=YOUR_USERNAME
GITHUB_REPO_NAME=themaximoguys-blog
GITHUB_REPO_PATH=posts
GITHUB_REPO_BRANCH=main
```

### Option 2: Test Locally (Mock Mode)

The blog implementation handles missing GitHub configuration gracefully by returning an empty posts array. To test the blog UI without GitHub:

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3051/blog`
3. You'll see an empty state (which is expected without GitHub posts)

### Option 3: Use GitHub API Locally

If you want to test with real GitHub integration locally:

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings → Developer Settings → Personal Access Tokens
   - Generate new token with `repo` scope

2. Update `.env.local`:

```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO_OWNER=YOUR_USERNAME
GITHUB_REPO_NAME=themaximoguys-blog
GITHUB_REPO_PATH=posts
GITHUB_REPO_BRANCH=main
```

3. Restart your dev server

## Post Frontmatter Fields

### Required Fields
- `title`: Post title
- `description`: SEO description (155 chars max recommended)
- `date`: Publication date (YYYY-MM-DD)
- `slug`: URL-friendly slug
- `tags`: Array of tags
- `draft`: Boolean (false to publish)
- `tier`: "free" | "developer" | "enterprise"

### Optional Fields
- `author`: Author name
- `authorAvatar`: Author image URL
- `coverImage`: Cover image URL
- `canonicalUrl`: Canonical URL if cross-posted
- `updatedAt`: Last updated date
- `authorTitle`: Author job title
- `authorBio`: Author bio
- `authorCredentials`: Array of credentials
- `authorLinkedin`: LinkedIn URL
- `faqs`: Array of Q&A objects
- `keyTakeaways`: Array of bullet points
- `citations`: Array of source references

## Content Tiers

### Free Posts
- Visible to everyone
- No gating
- Focus: Thought leadership, news, general insights

### Developer Posts (Gated)
- Teaser visible to all
- Full content requires signup
- Focus: Tutorials, technical guides, how-tos

### Enterprise Posts (Gated)
- Teaser visible to all
- Full content requires contact/upgrade
- Focus: Architecture, sizing, ROI calculators, benchmarks

## Writing Tips

1. **Use horizontal rules (`---`) to mark the teaser cutoff point** for gated posts
2. **Include code blocks** with language hints for syntax highlighting
3. **Add images from Unsplash** or your own hosting
4. **Use the AnswerBox component** in MDX for featured answers:
   ```mdx
   <AnswerBox question="Should I upgrade?">
     Your answer here
   </AnswerBox>
   ```
5. **Front-load value** - Answer the key question in the first section
6. **Include FAQs** in frontmatter for rich results in search engines
7. **Use tables** for comparisons and data

## Next Steps

1. Create your GitHub repository
2. Push these sample posts
3. Update environment variables
4. Enable GitHub Discussions for Giscus comments
5. Configure Giscus at https://giscus.app
6. Write your first real post!

## Need Help?

Visit the [blog implementation plan](../plans/BLOG_IMPLEMENTATION.md) for complete documentation.
