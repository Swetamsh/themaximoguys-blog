# Credentials Inventory — Newsletter Program

Status snapshot: 2026-04-16. This document tracks every API key, token, and
account the newsletter program needs — what we have, what we need, and where
each lives.

**Secret-handling rule:** never commit actual values to this file. This
document lists **names**, **status**, **location**, and **how to rotate**.
Real values live in `.env.local` (git-ignored) or `/root/.claude-pai/.env`.

---

## Currently available (✅)

### Content + distribution

| Name | Status | Lives in | Purpose |
|---|---|---|---|
| `SANITY_API_TOKEN` | ✅ | `.env.local` | Read/write CMS content |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | `.env.local` | `ajindfal` |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | `.env.local` | `production` |
| `SANITY_API_MIGRATION_SECRET` | ✅ | `.env.local` | Bulk migrations |
| `SANITY_API_STUDIO_DEPLOY` | ✅ | `.env.local` | Studio deploys |

### LinkedIn (syndication)

| Name | Status | Lives in | Purpose |
|---|---|---|---|
| `LINKEDIN_ACCESS_TOKEN` | ✅ | `.env.local` | Surendra — personal + company |
| `LINKEDIN_REFRESH_TOKEN` | ✅ | `.env.local` | Auto-refresh the access token |
| `LINKEDIN_CLIENT_ID` / `_SECRET` | ✅ | `.env.local` | OAuth app creds |
| `LINKEDIN_LI_AT` | ✅ | `.env.local` | Browser cookie (fallback comment flow) |
| `LINKEDIN_VERSION` | ⚠️ implicit | `.env.local` OR cron fallback | Sets `Linkedin-Version` header. Default `202603`. **Bump every ~10 months before LinkedIn sunsets** |
| `VENKAT_LINKEDIN_*` | ✅ | `.env.local` | Venkat's personal posts |
| `LAXMI_LINKEDIN_*` | ✅ | `.env.local` | Laxmi's personal posts |

### Research & AI

| Name | Status | Lives in | Purpose |
|---|---|---|---|
| `GOOGLE_API_KEY` / `GEMINI_API_KEY` | ✅ | `/root/.claude-pai/.env` | Gemini 3.x image + text |
| `REPLICATE_API_TOKEN` | ✅ | `/root/.claude-pai/.env` | Flux / Nano Banana image gen |
| `OPENAI_API_KEY` | ⚠️ empty | `/root/.claude-pai/.env` | Placeholder — not usable |
| `ANTHROPIC_API_KEY` | ⚠️ indirect | via Claude Code only | No env-var form (we run agents via Claude Code) |
| Perplexity | ⚠️ MCP only | MCP server | No env-var form — usable via Claude Code MCP, not standalone scripts |
| Grok / xAI | ⚠️ MCP only | MCP server | Same — Claude Code only |

### Community & data

| Name | Status | Lives in | Purpose |
|---|---|---|---|
| `NOTION_TOKEN` | ✅ | `/root/.claude-pai/.env` | Content calendar DB ops |
| `GITHUB_TOKEN` | ✅ | `/root/.claude-pai/.env` | Repo + Gist ops |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | ✅ | `.env.local` | Author metadata sync |
| `APIFY_TOKEN` | ✅ | `/root/.claude-pai/.env` | LinkedIn scraping fallback |
| `YOUTUBE_API_KEY` | ✅ | `/root/.claude-pai/.env` | Future: video metrics |
| `IPINFO_API_KEY` | ✅ | `/root/.claude-pai/.env` | Geo-enrich signup analytics |

---

## Needed — not yet provisioned (❌)

### Newsletter distribution

| Name | Status | Why | How to get |
|---|---|---|---|
| **`BEEHIIV_API_KEY`** | ❌ | Primary newsletter platform | Sign up at beehiiv.com → Settings → Integrations → API Keys |
| **`BEEHIIV_PUBLICATION_ID`** | ❌ | Identifies the TMG publication | Visible in Beehiiv dashboard URL after creation |
| **`BEEHIIV_DOMAIN`** | ❌ | `mail.themaximoguys.com` (custom sending domain) | Verify CNAME + SPF + DKIM in Beehiiv |

**Blocker until provisioned:** nothing about research or drafting. The blocker
only bites at T-1 (load + schedule) and at T-0 (send).

### Research automation (optional — currently via Claude Code)

| Name | Status | Why | How to get |
|---|---|---|---|
| `PERPLEXITY_API_KEY` | ❌ (only MCP) | If we want scripted monthly research without Claude Code | perplexity.ai/settings/api |
| `XAI_API_KEY` | ❌ (only MCP) | Grok for X/Twitter signal — if we want scripted access | console.x.ai |
| `ANTHROPIC_API_KEY` | ❌ (env-var form) | Claude research via `bun Tools/Inference.ts` | console.anthropic.com |

**Current workaround:** run the research pass interactively via Claude Code
(`scripts/gather-research.md` explains how). The 3-agent pattern works without
env-var keys because MCP handles the auth.

### Analytics

| Name | Status | Why | How to get |
|---|---|---|---|
| `GA4_MEASUREMENT_ID` | ❌ check | Google Analytics for site traffic | analytics.google.com |
| `SEARCH_CONSOLE_*` | ❌ check | Google Search Console API (ranking data) | search.google.com/search-console |
| `PLAUSIBLE_API_KEY` | ❌ optional | Privacy-friendly analytics alternative | plausible.io |

---

## Rotation schedule

| Credential | Rotation cadence | Reminder due |
|---|---|---|
| `LINKEDIN_ACCESS_TOKEN` | 60 days (LinkedIn enforced) | Set calendar reminder |
| `LINKEDIN_VERSION` | 10 months (before sunset) | 2027-01 for v202603 |
| Other API keys | Annual (security hygiene) | 2027-04 |

---

## Recovery checklist — if you lose access

1. **LinkedIn tokens expired/revoked:**
   - Run the OAuth refresh flow with `LINKEDIN_REFRESH_TOKEN`
   - If refresh also dead: regenerate via developer.linkedin.com → app → Auth
2. **Sanity API token compromised:**
   - Revoke at sanity.io/manage/project/ajindfal/api
   - Mint a new one with Editor role; update `.env.local`
3. **Beehiiv locked out:**
   - Primary: regain email access
   - Fallback: export list from Beehiiv → re-create on ConvertKit (keep monthly CSV export in `RESEARCH/` as a backup)
4. **All env files lost:**
   - `.env.local` is in the 1Password vault labeled "TMG-blog"
   - `/root/.claude-pai/.env` is in the 1Password vault labeled "PAI-global"

---

## What NOT to do

- Don't commit `.env.local` or any real secrets to git.
- Don't expose `SANITY_API_TOKEN` in client-side code (server-only).
- Don't hardcode `LINKEDIN_ACCESS_TOKEN` in scripts (read from env; today's
  root-cause debug showed the cost of stale hardcoded values).
- Don't skip the LinkedIn version bump reminder — the April 16 outage was
  caused by a 12-month sunset we didn't prepare for.
