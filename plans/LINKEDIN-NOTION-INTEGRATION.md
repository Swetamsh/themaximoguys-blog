# LinkedIn + Notion Content Publishing Pipeline

**Status:** Planning
**Created:** 2026-02-19
**Dependencies:** LinkedInPublishing skill (complete), content-calendar.json (complete), linkedin-calendar.ts CLI (complete)

---

## Overview

Build an automated pipeline that syncs the LinkedIn content calendar to Notion (visual management) and publishes posts directly to LinkedIn via API (zero copy-paste). This eliminates manual posting and gives a visual calendar for planning and tracking.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TMG Content Pipeline                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Blog MDX → MicroBlog → SketchCarousel → LinkedInPublishing    │
│                                               │                 │
│                                               ▼                 │
│                                    content-calendar.json        │
│                                         │         │             │
│                                         ▼         ▼             │
│                                  ┌──────────┐ ┌──────────────┐  │
│                                  │  Notion   │ │  LinkedIn    │  │
│                                  │ Calendar  │ │  API Post    │  │
│                                  │  (view)   │ │  (publish)   │  │
│                                  └──────────┘ └──────────────┘  │
│                                       │              │          │
│                                       ▼              ▼          │
│                                  Visual mgmt    Auto-publish    │
│                                  + scheduling   text + PDF      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Pipeline Flow

1. **Generate** — LinkedInPublishing skill creates post files + content-calendar.json
2. **Sync to Notion** — Script pushes calendar entries to Notion database (visual calendar)
3. **Review in Notion** — Reorder posts, adjust dates, change status in the visual calendar
4. **Sync back** — Pull any Notion changes back to content-calendar.json
5. **Publish** — Script reads calendar, finds posts scheduled for today, publishes via LinkedIn API
6. **Track** — Update Notion + JSON with published status and LinkedIn post URL

---

## Phase 1: Credential Setup

### 1A: Notion Integration Token

| Step | Action | Time |
|------|--------|------|
| 1 | Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) | — |
| 2 | Click **"New integration"** | — |
| 3 | Name: `TMG Content Calendar` | — |
| 4 | Type: **Internal** | — |
| 5 | Capabilities: Read content, Update content, Insert content | — |
| 6 | Submit → Copy the **Integration Token** (starts with `ntn_`) | — |
| 7 | Save token securely (will go in `.env`) | — |

**Estimated time:** 2 minutes
**Approval needed:** None (self-serve for workspace owner)
**Cost:** Free

### 1B: LinkedIn Developer App

| Step | Action | Time |
|------|--------|------|
| 1 | Go to [linkedin.com/developers](https://www.linkedin.com/developers/) | — |
| 2 | Click **"Create App"** | — |
| 3 | App name: `TMG Social Publisher` | — |
| 4 | LinkedIn Page: Associate with The Maximo Guys company page (or create one) | — |
| 5 | App logo: Upload TMG logo | — |
| 6 | Submit the app | — |
| 7 | Go to **Auth** tab → Copy **Client ID** and **Client Secret** | — |
| 8 | Set Redirect URL: `http://localhost:3000/callback` | — |
| 9 | Go to **Products** tab → Request **"Share on LinkedIn"** | — |
| 10 | Wait for approval (instant for personal posting) | — |

**Estimated time:** 5-10 minutes
**Approval needed:**
- **Personal profile posting:** Instant (self-serve via "Share on LinkedIn" product)
- **Company page posting:** Requires Community Management API partner review (days/weeks)

**Cost:** Free

### 1C: OAuth Access Token

After Phase 1B, we need a one-time browser authorization to get the access token.

| Step | Action |
|------|--------|
| 1 | PAI builds `scripts/linkedin-auth.ts` — a one-time OAuth helper |
| 2 | Run: `npx tsx scripts/linkedin-auth.ts` |
| 3 | Browser opens LinkedIn authorization page |
| 4 | You click "Allow" to grant posting permission |
| 5 | Script captures the auth code, exchanges for access token |
| 6 | Token saved to `.env` file |

**Token lifespan:** ~60 days. Script will include a refresh mechanism.

### 1D: Environment File

```bash
# .env (gitignored)

# Notion
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# LinkedIn
LINKEDIN_CLIENT_ID=xxxxxxxxxxxxxxxxxx
LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxxxxxx
LINKEDIN_ACCESS_TOKEN=AQVxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINKEDIN_PERSON_URN=urn:li:person:xxxxxxxxxx
```

**Security:**
- `.env` is already in `.gitignore`
- Tokens never committed to git
- LinkedIn token expires in ~60 days (refresh script provided)

---

## Phase 2: Notion Calendar Setup

### 2A: Create Notion Database

PAI creates a Notion database via API with these properties:

| Property | Type | Purpose |
|----------|------|---------|
| Title | Title | Post title |
| Status | Select | `Draft` / `Scheduled` / `Published` |
| Type | Select | `Hook` / `Hot Take` / `FAQ` / `Carousel` / `Contrast` / `Listicle` / `Thread` |
| Series | Select | Series name (e.g., "MBOs to Microservices") |
| Scheduled Date | Date | When to post |
| Published Date | Date | When actually posted |
| Day of Week | Select | `Monday` through `Friday` |
| Time | Rich Text | Posting time (e.g., "9:00 AM ET") |
| Week | Number | Week number in series |
| Character Count | Number | Post length |
| Hashtags | Rich Text | Hashtag string |
| Has PDF | Checkbox | Whether post includes carousel PDF |
| LinkedIn URL | URL | Link to published post |
| Source File | Rich Text | Path to post-copy file |
| Notes | Rich Text | Additional context |

### 2B: Calendar View

After database creation, manually add a **Calendar view** in Notion UI:
1. Open the database
2. Click "Add a view" → Select "Calendar"
3. Set date property to "Scheduled Date"
4. Optionally add a **Board view** grouped by Status (Kanban-style)

### 2C: Build Sync Script

**File:** `scripts/sync-to-notion.ts`

**Commands:**
```bash
npx tsx scripts/sync-to-notion.ts push       # Push calendar.json → Notion
npx tsx scripts/sync-to-notion.ts pull       # Pull Notion changes → calendar.json
npx tsx scripts/sync-to-notion.ts sync       # Bidirectional sync (Notion wins for dates/status)
```

**Sync rules:**
- **Push:** Creates new Notion rows for posts not yet in Notion. Updates existing rows if calendar.json changed.
- **Pull:** Reads Notion database, updates calendar.json with any date/status changes made in Notion UI.
- **Conflict resolution:** Notion wins for `scheduled_date` and `status` (since that's where humans edit). JSON wins for content fields (since that's where PAI generates).

**Implementation:**
- Uses `@notionhq/client` npm package
- Maps post IDs to Notion page IDs (stored in calendar.json as `notion_page_id`)
- Rate limited to 3 req/sec (Notion's limit)

---

## Phase 3: LinkedIn API Publishing

### 3A: OAuth Helper Script

**File:** `scripts/linkedin-auth.ts`

One-time script to get the OAuth access token:
1. Starts a local HTTP server on port 3000
2. Opens browser to LinkedIn authorization URL
3. User clicks "Allow"
4. LinkedIn redirects to `localhost:3000/callback` with auth code
5. Script exchanges code for access token
6. Saves token to `.env`

### 3B: Publishing Script

**File:** `scripts/publish-to-linkedin.ts`

**Commands:**
```bash
npx tsx scripts/publish-to-linkedin.ts              # Publish all posts scheduled for today
npx tsx scripts/publish-to-linkedin.ts preview mbos-01  # Preview what would be posted (dry run)
npx tsx scripts/publish-to-linkedin.ts post mbos-01     # Publish a specific post now
npx tsx scripts/publish-to-linkedin.ts status           # Check token validity + rate limits
```

**Publishing flow for text-only posts:**
1. Read post content from markdown file (strip frontmatter)
2. Append hashtags
3. Call `POST https://api.linkedin.com/rest/posts` with text content
4. Capture returned post URN
5. Update calendar.json + Notion with published status and LinkedIn URL

**Publishing flow for carousel (PDF) posts:**
1. Read post copy from markdown file
2. Initialize document upload: `POST /rest/documents?action=initializeUpload`
3. Upload PDF to the returned upload URL
4. Create post referencing the document URN
5. Update calendar.json + Notion with published status and LinkedIn URL

### 3C: Scheduling (Optional — Future)

Since LinkedIn API has no native scheduling:
- **Manual approach:** Run `publish-to-linkedin.ts` at posting time (simplest)
- **Cron approach:** Set up a cron job or GitHub Action that runs daily at 9 AM ET
- **Launchd approach (macOS):** Create a launchd plist for local scheduled execution

---

## Phase 4: Integration with LinkedInPublishing Skill

### 4A: Auto-Register New Posts

When the LinkedInPublishing skill generates new posts, it should also:
1. Add entries to `content-calendar.json`
2. Push new entries to Notion via `sync-to-notion.ts push`

### 4B: Updated Workflow

```
User: "publish carousel post for mbos-04"
  → LinkedInPublishing skill generates post files
  → Auto-registers in content-calendar.json
  → sync-to-notion.ts push (new entry appears in Notion calendar)

User reviews in Notion, adjusts date if needed

User: "post today's scheduled content"
  → publish-to-linkedin.ts reads calendar
  → Publishes scheduled posts via API
  → Updates Notion + JSON with LinkedIn URLs
```

---

## Files Changed

### New Files
| File | Purpose |
|------|---------|
| `scripts/sync-to-notion.ts` | Bidirectional sync: calendar.json ↔ Notion database |
| `scripts/publish-to-linkedin.ts` | Publish posts to LinkedIn via API |
| `scripts/linkedin-auth.ts` | One-time OAuth flow to get LinkedIn access token |
| `.env` | API credentials (gitignored) |

### Modified Files
| File | Change |
|------|--------|
| `linkedin-posts/content-calendar.json` | Add `notion_page_id` field to each post |
| `.claude/skills/LinkedInPublishing/SKILL.md` | Update with Notion + API integration docs |
| `.claude/skills/LinkedInPublishing/Workflows/PublishCarouselPost.md` | Add auto-register step |
| `.claude/skills/LinkedInPublishing/Workflows/PublishSinglePost.md` | Add auto-register step |
| `package.json` | Add `@notionhq/client` dependency |
| `.gitignore` | Ensure `.env` is listed |

---

## Dependencies

### npm packages (to install)
| Package | Purpose | Status |
|---------|---------|--------|
| `@notionhq/client` | Notion API client | To install |
| `pdf-lib` | PDF assembly for carousels | Already installed |
| `open` | Open browser for OAuth flow | To install |

### External Services
| Service | Required For | Setup Status |
|---------|-------------|-------------|
| Notion Integration | Calendar sync | Not started |
| LinkedIn Developer App | API publishing | Not started |
| LinkedIn OAuth Token | Authentication | Not started |

---

## API Limitations to Know

### LinkedIn API
- **No native scheduling** — we handle scheduling ourselves
- **No link preview auto-scraping** — must provide metadata manually for article posts
- **Token expires in ~60 days** — need refresh mechanism
- **500 calls/day on dev tier** — more than enough for 3-4 posts/week
- **Personal posting is self-serve** — company page posting needs partner review
- **Document/PDF carousel supported** — this is how LinkedIn "carousels" work organically

### Notion API
- **Calendar views can't be created via API** — must set up once manually in Notion UI
- **Status property config can't be changed via API** — set options manually first
- **3 requests/second rate limit** — fine for our volume
- **File uploads up to 20MB** — our carousel PDFs are 12-16MB, fits within limit

---

## Testing Plan

### Phase 1 Tests
- [ ] Notion token connects and can list databases
- [ ] LinkedIn Client ID/Secret are valid
- [ ] OAuth flow completes and token is saved

### Phase 2 Tests
- [ ] `sync-to-notion.ts push` creates all 12 posts in Notion database
- [ ] `sync-to-notion.ts pull` reads back changes from Notion
- [ ] Calendar view shows posts on correct dates
- [ ] Status changes in Notion propagate back to JSON

### Phase 3 Tests
- [ ] `publish-to-linkedin.ts preview mbos-01` shows correct post text
- [ ] `publish-to-linkedin.ts post mbos-01` publishes a text-only post
- [ ] `publish-to-linkedin.ts post mbos-04` uploads carousel PDF and publishes
- [ ] Published posts have correct hashtags and formatting
- [ ] LinkedIn URL is captured and saved to calendar

### Phase 4 Tests
- [ ] New post generation auto-registers in calendar + Notion
- [ ] End-to-end: generate → sync → review → publish → track

---

## Estimated Timeline

| Phase | Work | Prerequisite | Est. Time |
|-------|------|-------------|-----------|
| Phase 1A | Notion integration setup | None | 2 min (you) |
| Phase 1B | LinkedIn developer app | None | 10 min (you) |
| Phase 1C | OAuth token script | Phase 1B | 5 min (PAI builds + you authorize) |
| Phase 2 | Notion sync script | Phase 1A | 15 min (PAI builds) |
| Phase 3 | LinkedIn publish script | Phase 1B + 1C | 20 min (PAI builds) |
| Phase 4 | Skill integration | Phase 2 + 3 | 10 min (PAI builds) |

**Your time:** ~15 minutes (credential setup + OAuth authorize)
**PAI build time:** ~45 minutes
**Total:** Under 1 hour for the full pipeline

---

## Quick Start (When Ready)

1. Set up Notion integration → give PAI the token
2. Set up LinkedIn developer app → give PAI the Client ID + Secret
3. Say: **"build the Notion + LinkedIn pipeline"**
4. PAI builds everything, you click "Allow" once for OAuth
5. Done — posts auto-sync to Notion calendar and publish via API
