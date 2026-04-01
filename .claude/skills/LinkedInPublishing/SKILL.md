---
name: LinkedInPublishing
description: USE WHEN user wants to create LinkedIn posts, publish content to LinkedIn, generate post copy, assemble carousel PDFs, package micro-content for social publishing, or deploy infographics to their LinkedIn profile or company page. Covers the full pipeline from content packaging through API publishing.
---

# LinkedInPublishing

End-to-end LinkedIn publishing: content packaging, image upload, post creation, first-comment tagging, batch scheduling, and carousel assembly. Covers both content preparation (from MicroBlog/SketchCarousel output) and API-level publishing.

## Pipeline

```
Blog MDX → MicroBlog (extract) → SketchCarousel (images) → LinkedInPublishing (package + publish) → Live on LinkedIn
```

## Workflow Routing

| Trigger | Workflow / Command | Description |
|---------|-------------------|-------------|
| "linkedin carousel", "carousel post", "publish carousel", content type = `carousel` | `Workflows/PublishCarouselPost.md` | Assembles carousel PNGs into PDF + post copy |
| "linkedin post", "publish to linkedin", "linkedin ready", "production post", content type = `hook`/`hot-take`/`FAQ`/`thread`/`listicle`/`contrast` | `Workflows/PublishSinglePost.md` | Generates text-only or single-image post copy |
| "verify credentials", "check linkedin" | `verify` command | First-time setup, check token works |
| "publish this infographic", "post to linkedin now" | `post` command | Publish one image + copy via API |
| "batch publish", "publish all" | `batch` command | Publish multiple posts from manifest |
| "post as company", "company page" | Add `--as-org` to any command | Post to company page instead of personal |

## Publishing Tool (API)

```bash
bun run .claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts <command> [args]
```

### Commands

| Command | Usage | Description |
|---------|-------|-------------|
| `verify` | `verify` | Check credentials and session status |
| `whoami` | `whoami` | Get profile info (JSON) |
| `login` | `login` | Open browser to save LinkedIn session for comments |
| `post` | `post --text <text> [--image <path>] [--comment <text>] [--as-org]` | Publish a single post |
| `comment` | `comment --urn <post-urn> --text <comment> [--as-org]` | Add comment to existing post |
| `batch` | `batch --manifest <json> [--delay <seconds>]` | Publish multiple posts from manifest |
| `delete` | `delete <post-urn>` | Delete a post by URN |

### How It Works

1. Post created via LinkedIn REST API (reliable, fast)
2. First comment added via Playwright browser automation (for links/tags)
3. If browser comment fails, comment text is printed for manual posting

### Prerequisites

Credentials in `/root/themaximoguys-blog/.env.local` or `/root/.claude-pai/.env`:

```bash
LINKEDIN_ACCESS_TOKEN=your-oauth2-token
LINKEDIN_PERSON_URN=urn:li:person:XXXXX
LINKEDIN_ORG_URN=urn:li:organization:XXXXX  # optional, for company page
LINKEDIN_VERSION=202603
LINKEDIN_LI_AT=your-li_at-cookie            # for Playwright first-comment
```

**To get these:**
1. Go to https://www.linkedin.com/developers/ → Create App
2. Enable "Share on LinkedIn" and "Sign In with LinkedIn using OpenID Connect" products
3. Verify your LinkedIn Page in Settings tab
4. Get OAuth 2.0 token via authorization code flow with scopes: `openid profile w_member_social`
5. Get your person URN from `/v2/userinfo` response

## IBM Tagging Strategy

**Put tags in the FIRST COMMENT, not the post itself** — less spammy, still triggers notifications.

### First Comment Template for IBM Visibility:

```
Tagging the teams building this platform:
@IBM @IBM Maximo Application Suite @IBM Technology @IBM Sustainability Software

If you're working with Maximo APIs and want a head start, this collection covers 2,439+ endpoints across 14 modules.

Would love to see this referenced in the official IBM Maximo developer docs.

#IBMMaximo #MAS9 #IBM #AssetManagement #OpenSource #Postman #API #EAM
```

### Key IBM Pages/People to Tag:
- @IBM — main page
- @IBM Maximo Application Suite — product page
- @IBM Technology — tech community
- @IBM Sustainability Software — parent org
- Search for IBM Maximo Product Managers and Developer Advocates

### Tagging Rules:
1. Tags in FIRST COMMENT, not post body — looks professional, still notifies
2. Max 5 @mentions per comment — more triggers spam filters
3. Tag IBM pages first, then individual people
4. Ask a question to IBM — "Would love to see this in official docs" drives engagement
5. Post during IBM business hours — Tue-Thu, 9-11 AM EST

## Manifest Format for Batch Publishing

```json
{
  "posts": [
    {
      "image": "/root/Downloads/linkedin-infographic-01-platform-shift.png",
      "text": "The upgrade from Maximo 7.6 to MAS 9 is NOT a version upgrade.\n\nIt's a complete platform migration...\n\n#Maximo #MAS9 #OpenShift #AssetManagement #DigitalTransformation",
      "comment": "Tagging the teams building this platform:\n@IBM @IBM Maximo Application Suite @IBM Technology\n\n#IBMMaximo #IBM #MAS9"
    }
  ]
}
```

## Posting Calendar

| Day | Best Time | Post Type |
|-----|-----------|-----------|
| **Tuesday** | 9 AM EST | Technical deep-dive infographic |
| **Wednesday** | 8 AM EST | Comparison or cheat sheet |
| **Thursday** | 10 AM EST | Tips / survival guide |

- **1 post per day maximum** — quality over quantity
- **Space series posts 2-3 days apart** — don't flood the feed
- **Engage with comments for 2 hours after posting** — algorithm boost

### Posting Strategy — "Lead with Value"

```
POST BODY:
→ Lead with the VALUE you're giving away (not self-promotion)
→ State what the reader gets from the infographic
→ Include 3-5 key takeaways as → bullet points
→ End with CTA: "Save this. Share it with your team."
→ 3-5 hashtags at the bottom

FIRST COMMENT (posted immediately after):
→ @mention IBM and relevant pages
→ Ask a question or make a suggestion to IBM
→ Additional hashtags if needed
```

## Input Contract

### Required
- **Micro-content MDX** from `micro_blogs/<series-slug>/<file>.mdx` with frontmatter containing: `title`, `type`, `platform`, `tags`, `sourceBlog`

### Optional (Carousel Posts)
- **Slide PNGs** from `~/Downloads/carousel-<slug>/` generated by SketchCarousel skill
- If PNGs not found, workflow will prompt to run SketchCarousel first

## Output Contract

All output goes to `linkedin-posts/<series-slug>/`:

### Carousel Post Output
```
linkedin-posts/<series-slug>/post-NN-carousel-<slug>/
├── post-copy.md        # Ready-to-paste LinkedIn text
├── carousel.pdf        # All slides assembled into one PDF
├── metadata.json       # Scheduling, hashtags, source references
└── README.md           # Quick posting instructions
```

### Single Post Output
```
linkedin-posts/<series-slug>/post-NN-<type>-<slug>.md
```
Single markdown file with frontmatter containing post copy, hashtags, and scheduling info.

## Content Calendar

All posts are tracked in `linkedin-posts/content-calendar.json` — the single source of truth for scheduling and status.

### Calendar CLI

```bash
npx tsx scripts/linkedin-calendar.ts              # Full dashboard
npx tsx scripts/linkedin-calendar.ts next          # What to post next
npx tsx scripts/linkedin-calendar.ts week 2        # Show Week 2 posts
npx tsx scripts/linkedin-calendar.ts schedule 2026-03-01  # Assign real dates
npx tsx scripts/linkedin-calendar.ts publish mbos-01 [url] # Mark as published
npx tsx scripts/linkedin-calendar.ts status        # Summary stats
```

### Post Lifecycle

`draft` → `scheduled` (dates assigned) → `published` (posted to LinkedIn)

### Auto-Registration

When workflows generate new posts, they should also add entries to `content-calendar.json`. The calendar aggregates all series into one view.

## Reference Documents

| Document | Purpose |
|----------|---------|
| `PostTemplates.md` | Post copy templates by content type |
| `HashtagStrategy.md` | TMG hashtag taxonomy and selection rules |
| `SchedulingGuide.md` | Best times, cadence, and series sequencing |
| `Workflows/PublishSinglePost.md` | Single post workflow |
| `Workflows/PublishCarouselPost.md` | Carousel post workflow |

## Quick Reference

- **Post character limit:** ~3,000 characters (LinkedIn max)
- **"See more" cutoff:** First ~210 characters visible in feed
- **Hashtags:** 3-5 per post (see HashtagStrategy.md)
- **Carousel PDF:** 1080x1350px slides, max 20 slides per PDF
- **Voice:** Professional but approachable, Maximo-expert authority
- **Brand:** The Maximo Guys (TMG)

## Examples

**Example 1: Publish single infographic**
```
User: "publish the MAS 9 licensing infographic to LinkedIn"
→ Reads the image from ~/Downloads/
→ Generates post copy from PostTemplates.md template
→ Uploads image → creates post → adds IBM tags in first comment
```

**Example 2: Batch publish series**
```
User: "publish all 10 MAS-FEATURES infographics to LinkedIn, one per day"
→ Generates manifest.json with all 10 posts, images, copy, and comments
→ User reviews and approves
→ Publishes with 24-hour delays between posts
```

**Example 3: Package carousel for LinkedIn**
```
User: "create a linkedin carousel from the MAS-ADMIN micro-content"
→ Finds carousel PNGs in ~/Downloads/carousel-mas-admin/
→ Assembles into PDF → generates post copy → outputs to linkedin-posts/
```
