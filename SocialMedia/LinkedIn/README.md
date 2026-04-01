# LinkedIn Publishing Hub — TheMaximoGuys

**Status:** LIVE | **API:** Connected | **Posting:** Personal + Company Page

---

## Quick Reference

| Item | Value |
|------|-------|
| **Company Page** | [TheMaximoGuys](https://www.linkedin.com/company/111960338/) |
| **Org URN** | `urn:li:organization:111960338` |
| **Person URN** | `urn:li:person:hj5bWVNgmt` (Surendra Katta) |
| **Credentials** | `/root/themaximoguys-blog/.env.local` |
| **Token Expires** | ~2026-05-30 (2 months from issue) |
| **Notion Calendar** | [TMG LinkedIn Content Calendar](https://www.notion.so/333638519ab181aa96cce62459aa08ea) |
| **Publishing Tool** | `~/.claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts` |

---

## Folder Structure

```
LinkedIn/
  README.md                      ← YOU ARE HERE (single source of truth)
  Strategy/
    MARKETING-STRATEGY.md        ← 90-day playbook, 5 pillars, hashtags, growth targets
  Templates/
    TEXT-POST-TEMPLATE.md         ← Post copy format & hooks
    CAROUSEL-TEMPLATE.md          ← Carousel format rules
    POLL-TEMPLATE.md              ← Poll creation guide
    NEWSLETTER-TEMPLATE.md        ← LinkedIn Newsletter format
  Content/
    manifest.json                 ← 28-post batch publishing manifest (JSON)
    CONTENT-CALENDAR.md           ← 10-week schedule (readable)
    Posts/                        ← Individual post markdown files (1 per post)
      2026-04-01-01-platform-shift.md
      2026-04-02-10-maximo-health.md
      ...                         (28 files, named by date + topic)
    images/                       ← 28 infographic PNGs + thumbnails
    TextPosts/                    ← Legacy Week 1 posts
    Carousels/                    ← PDF carousel files
    Polls/                        ← Poll content
    Newsletter/                   ← Newsletter editions
    Videos/                       ← Video content
```

Each post file in `Content/Posts/` contains:
- Frontmatter (id, topic, series, date, status, image path)
- Image reference (viewable in any markdown editor)
- Full post copy (ready to copy-paste)
- First comment text (with IBM tags + blog link)
- Publishing checklist

---

## Publishing Pipeline

### How It Works

```
Blog Post → /MicroBlog → Infographic Image + Post Copy
                                    ↓
                            manifest.json
                                    ↓
                    LinkedInPublish.ts (API post)
                                    ↓
                    Playwright (browser first comment)
                                    ↓
                    Notion status → POSTED
```

### Commands

```bash
# Publish single post (personal profile)
bun run ~/.claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts post \
  --text "Post body" --image /path/to/image.png \
  --comment "First comment with links and #hashtags"

# Publish as company page
bun run ~/.claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts post \
  --text "Post body" --image /path/to/image.png \
  --comment "First comment" --as-org

# Batch publish from manifest
bun run ~/.claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts batch \
  --manifest SocialMedia/LinkedIn/Content/manifest.json

# Delete a post
bun run ~/.claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts delete <post-urn>

# Verify credentials
bun run ~/.claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts verify
```

### How Comments Work

| Post Type | Comment Method | Comment Identity |
|-----------|---------------|-----------------|
| Personal (`--text`) | Browser → post URL | Surendra Katta |
| Company (`--as-org`) | Browser → admin page-posts | themaximoguys |

---

## Content Status

### Current Batch: MAS Features Infographics (28 posts)

| Week | Dates | Posts | Topics |
|------|-------|-------|--------|
| 1 | Apr 1-3 | 3 | Platform Shift, Health, API Collections |
| 2 | Apr 7-9 | 3 | Carbon Design, Monitor, Supply Chain Core |
| 3 | Apr 14-16 | 3 | Mobile, Predict, Procurement |
| 4 | Apr 21-23 | 3 | Suite Architecture, Visual Inspection, RBAs |
| 5 | Apr 28-30 | 3 | AI Assist, Security/Maps, AI Supply Chain |
| 6 | May 5-7 | 3 | Scripts/Reliability, AppPoints, Mobile Supply Chain |
| 7 | May 12-14 | 3 | Dashboards, Premium Add-Ons, MRO Competitors |
| 8 | May 19-21 | 3 | Integration, Licensing, Renewables/TRIRIGA |
| 9 | May 26-28 | 3 | Licensing Comparison, Industry Solutions, API Sketchnote |
| 10 | Jun 2 | 1 | MRO & HSE |

**Cadence:** Tue/Wed/Thu at 10:00 AM ET | **All posts as:** Company Page

---

## Workflow (Notion Board)

```
DRAFT → IN REVIEW → APPROVED → SCHEDULED → POSTED
```

1. All 28 posts start as **DRAFT** in Notion
2. Review post copy + image → move to **APPROVED**
3. Tell PAI to publish → runs API + browser comment
4. PAI updates Notion to **POSTED** with LinkedIn URL

---

## Credentials Checklist

- [x] `LINKEDIN_ACCESS_TOKEN` — OAuth token (2-month TTL)
- [x] `LINKEDIN_REFRESH_TOKEN` — For token renewal
- [x] `LINKEDIN_CLIENT_ID` — App client ID
- [x] `LINKEDIN_CLIENT_SECRET` — App client secret
- [x] `LINKEDIN_LI_AT` — Browser session cookie (for Playwright comments)

**All stored in:** `/root/themaximoguys-blog/.env.local`

---

## Key Files

| File | Purpose |
|------|---------|
| `Content/manifest.json` | Batch publishing manifest — 28 posts with text, images, comments, schedule |
| `Content/CONTENT-CALENDAR.md` | Human-readable 10-week calendar |
| `Content/images/` | 28 infographic PNGs (moved from Downloads) |
| `Strategy/MARKETING-STRATEGY.md` | 90-day LinkedIn growth playbook |
| `Templates/TEXT-POST-TEMPLATE.md` | Post copy format guide |
| `Content/TextPosts/WEEK1-POSTS.md` | Week 1 ready-to-publish posts (legacy format) |
