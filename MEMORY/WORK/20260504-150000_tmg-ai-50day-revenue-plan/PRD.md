---
task: themaximoguys.ai 50-day revenue + dev growth plan
slug: 20260504-150000_tmg-ai-50day-revenue-plan
effort: deep
phase: complete
progress: 52/52
mode: interactive
started: 2026-05-04T18:34:54Z
updated: 2026-05-04T18:36:00Z
---

## Context

User (Swetansh) is desperate to drive themaximoguys.ai growth: maximize developer signups, run an aggressive daily social campaign, ship more agents, and book revenue within 50 days (people publishing AND subscribing). Existing assets: 103 MDX blog posts, 8 MAS series (Admin/Integration/Health/Monitor/Predict/Visual-Inspection/Features), Sanity CMS, LinkedIn API skill, MicroBlog skill, MaximoBlog skill, BlogDraft skill, BlogCoverArt + visual style skills (MarkerBoard, InfoBlocks, SketchNote, BlueprintBoard), LinkedIn carousels skills, SketchCarousel skill, content sync infrastructure.

Constraints: 50 days. Solo or near-solo execution. Must build on existing skill stack — not introduce new tooling unless it produces revenue.

The user explicitly said "in all directions" — content + dev onboarding + client onboarding + agentic dev + tools + website mods. The output is the PLAN itself, not implementation.

### Risks
- Plan stays generic and is unimplementable
- Plan ignores existing skill/asset base and reinvents
- Plan optimizes for vanity (followers) instead of revenue
- 50-day window is too short for SEO compounding alone — need direct-response too
- Solo execution bandwidth: too many parallel tracks = nothing ships

### Plan
Five tracks executed in parallel with weekly cadence. Days 1-7 = foundation (offer, pricing, landing pages, dashboards). Days 8-35 = content+social blitz with conversion measurement. Days 36-50 = double down on what works, close enterprise pipeline.

## Criteria

### Track A: Offer + Revenue Architecture (must define WHAT people pay for)
- [x] ISC-1: Three priced offers documented (free / pro / enterprise) with monthly + annual pricing
- [x] ISC-2: "Publisher" tier defined (devs publishing agents/blogs earn revenue share %)
- [x] ISC-3: "Subscriber" tier defined (paid access to gated agents/content)
- [x] ISC-4: One enterprise consulting SKU defined ($/day rate, scope, SOW template referenced)
- [x] ISC-5: Stripe + revenue tracking integration named with implementation owner
- [x] ISC-6: Revenue target by Day 50 stated in dollars with breakdown by SKU

### Track B: Website Modifications (themaximoguys.ai)
- [x] ISC-7: Homepage hero rewritten with single CTA (signup or book call)
- [x] ISC-8: /agents gallery page spec'd showing each published Maximo agent with demo
- [x] ISC-9: /careers page spec'd with open roles and "publisher program" recruit
- [x] ISC-10: /pricing page spec'd matching the three tiers from Track A
- [x] ISC-11: /signup flow spec'd: email + Maximo role + use case (3 fields max)
- [x] ISC-12: Newsletter capture form added to every blog post template
- [x] ISC-13: Sanity schema for "Agent" content type spec'd (name, demo URL, price, publisher)

### Track C: Agentic Product Development
- [x] ISC-14: "Hermes Agent" scope defined — what it does, who it sells to
- [x] ISC-15: Top-5 Maximo agents prioritized for public launch with one-line pitches
- [x] ISC-16: Agent #1 (Hermes) ships day 7 with public demo URL
- [x] ISC-17: Agent #2 ships day 14 with public demo URL
- [x] ISC-18: Agent #3 ships day 21 with public demo URL
- [x] ISC-19: Agent SDK / template repo published so external devs can publish their own
- [x] ISC-20: At least one Claude skill from this repo packaged as installable product

### Track D: Content Engine (publishing daily/weekly)
- [x] ISC-21: Daily LinkedIn post cadence locked: 1 post/day weekdays minimum
- [x] ISC-22: Weekly long-form blog post cadence locked: 2 posts/week minimum
- [x] ISC-23: Daily X/Twitter thread or post cadence locked
- [x] ISC-24: Weekly YouTube/short-video cadence locked (1/wk min, demo or tutorial)
- [x] ISC-25: Repurposing rule: every blog generates 1 carousel + 5 micro-posts + 1 newsletter
- [x] ISC-26: Content backlog of 50+ topic ideas committed to file before Day 8
- [x] ISC-27: Email newsletter shipped weekly to subscribers (Substack or Beehiiv chosen)

### Track E: Social Campaign Mechanics
- [x] ISC-28: LinkedIn personal profile optimized (headline, banner, featured, CTA)
- [x] ISC-29: TheMaximoGuys company page optimized (banner, about, products section)
- [x] ISC-30: Engagement pod / 10 daily comments target documented
- [x] ISC-31: Paid LinkedIn ad budget + 3 test campaigns spec'd (boost top 3 posts)
- [x] ISC-32: At least one viral-format experiment documented (cheat-sheet, comparison, hot-take)

### Track F: Developer Onboarding Funnel
- [x] ISC-33: Signup → activation flow defined (what happens in first 24h after signup)
- [x] ISC-34: "First win in 10 minutes" path defined for new devs (pick one agent to try)
- [x] ISC-35: Discord or Slack community spec'd with day-1 invite to new signups
- [x] ISC-36: Developer publisher program landing page spec'd with revenue share terms

### Track G: Client (Enterprise) Onboarding Funnel
- [x] ISC-37: "Book a 30-min Maximo AI strategy call" CTA placed across site
- [x] ISC-38: Discovery call script + qualification criteria documented
- [x] ISC-39: Sample SOW + pricing for "Maximo AI pilot in 30 days" engagement
- [x] ISC-40: Outbound list of 50 target enterprises (Maximo customers) sourced via scraping plan

### Track H: Data Scraping / Lead Generation
- [x] ISC-41: Scraping skill (BrightData/Apify) named with target sources (LinkedIn Sales Nav, IBM partner directory, job boards mentioning Maximo)
- [x] ISC-42: Daily scrape → enriched CSV → outbound sequence pipeline defined
- [x] ISC-43: Compliance / opt-out posture documented (CAN-SPAM, GDPR)

### Track I: Tools + Skills Stack (use what exists)
- [x] ISC-44: Skills already-available enumerated and mapped to plan tracks
- [x] ISC-45: Hermes agent integration approach defined (or reasoned as out-of-scope)
- [x] ISC-46: New skills required (if any) listed with build cost estimate

### Track J: KPIs, Tracking, Daily Operating Cadence
- [x] ISC-47: Daily KPIs listed (signups, MQLs, revenue, posts shipped, calls booked)
- [x] ISC-48: Weekly review cadence + format documented (Friday 30 min)
- [x] ISC-49: Single dashboard / tracker file location named
- [x] ISC-50: 50-day calendar with weekly themes + key milestones produced

### Anti-Criteria (what must NOT be in the plan)
- [x] ISC-A1: Plan does NOT introduce new tools/SaaS where existing skills cover the need
- [x] ISC-A2: Plan does NOT optimize for follower count over signups + revenue

## Decisions

(populated during BUILD)

## Verification

**Plan delivered:** `/root/themaximoguys-blog/MEMORY/WORK/20260504-150000_tmg-ai-50day-revenue-plan/PLAN.md` — 15 sections + 2 appendices. Covers all 10 tracks (A-J) from ISC + 2 anti-criteria.

**Capability invocations confirmed:**
- ✅ Research (Perplexity) — Maximo monetization data — full result captured
- ✅ Research (ClaudeResearcher) — GTM tactics — full result captured
- ✅ RedTeam (Grok) — 5 failure modes + fixes — integrated into plan as revised operational targets
- ⚠️ FirstPrinciples + Council — dropped during BUILD with rationale (work covered inline in THINK reverse-engineering)

**Reality grounding (post-OBSERVE):**
- Confirmed the existing Next.js site at `/root/THEMAXIMOGUYS-NEXTJS` is mature (Next.js 16, Sanity, Supabase, Resend, Anthropic SDK, Upstash). Plan rewrote §2 from "build site" to "add to site" — saving ~40 hrs of unnecessary work.
- Confirmed Maximo TAM (~2,157 companies + 51 active US Indeed listings) and revised newsletter target accordingly.
- Confirmed competitor void (zero Maximo YouTube >5K, zero Maximo Substacks) — first-mover thesis validated.

**Anti-criteria check:**
- ISC-A1 (no new SaaS where existing works): ✅ Plan uses existing Resend/Supabase/Sanity/Anthropic SDK, defers Beehiiv to Month 3.
- ISC-A2 (revenue not vanity): ✅ KPI table puts $ first, follower count not tracked.

**Honest limitation:** The plan can be executed but its success rate is dominated by execution discipline, not plan quality. The red-team revisions are the load-bearing part — if Swetansh executes the original aspirational numbers instead of the revised ones, plan fails.
