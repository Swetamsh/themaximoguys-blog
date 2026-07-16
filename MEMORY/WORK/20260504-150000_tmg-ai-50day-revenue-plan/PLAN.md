# themaximoguys.ai — 50-Day Revenue + Developer Growth Plan
**Owner:** Swetansh
**Window:** 2026-05-04 → 2026-06-23 (50 days)

> **READ THIS FIRST — RED-TEAM-REVISED OPERATIONAL TARGETS (overrides numbers below)**
>
> A contrarian red-team analysis stress-tested the original plan. Five failure modes had >55% probability of killing the targets. The plan below stays in place because it shows the full reasoning, but **execute against these revised numbers, not the original optimistic ones**:
>
> | What changed | Original | **Revised (execute this)** | Why |
> |---|---|---|---|
> | Newsletter subs Day 50 | 1,000 | **300 highly-qualified** | TAM is 2,157 Maximo companies + ~15K LinkedIn admins globally. 1K free in 50 days from cold = top-decile outcome. 300 in-niche subs convert at 8% — math still works. |
> | Paid sub tiers | Pro $19 + Pro+Agents $49 | **Kill Pro $19. Single tier: $49 Pro+Agents only** | $19/mo "words alone" sits between free Maximo content + cheap enough to not signal value. Maximo admins don't expense Substack-style subs. $49 has clear ROI (replaces $150-250/hr consultant time). |
> | Course | 30 enrollments × $297 cold | **Pre-sell 10 seats × $497 to TMG warm list before recording** | Solo first-course launches with <2K list typically gross $2-4K, not $9K. If you can't get 10 commits by Day 14, kill the course entirely. |
> | Enterprise pilot | 1 × $15K cold close | **1 × $15K warm close (Alcon-class TMG_Finances client) + 3 paid scoping workshops $2.5-5K each (credit-card buyable, no procurement)** | Median B2B sale cycle for $10K+ deals is 84 days. Cold pilot in 50 days = P10 outcome. Warm + workshops = P70 outcome. |
> | Agent roster | 6 agents | **Hermes + Apollo + Athena (3 agents)** | Solo ship rate is realistically 1 agent / 14-21 days. Other 3 stay on Days 51-100 roadmap. |
> | Cadence | 5-7 days/week, 5+ hrs/day | **Mon-Thu only. Weekends OFF (Saturday = YouTube only, Sunday = full off). 4 hrs/day max.** | 60-70% of solo founders sustaining 8hr/day burn out at week 3-4. Build the rest into Day 1, not into recovery. |
>
> **Revised revenue target by Day 50:**
> - 1 warm enterprise pilot ($15K) + 3 paid scoping workshops × ~$3.5K avg ($10.5K) = $25.5K cash from services
> - 20 Pro+Agents subs × $49/mo = $980 MRR (≈$11.7K ARR)
> - 25 single-agent installs × ~$110 avg = $2,750 cash
> - 10 course pre-sales × $497 (only if commits hit by Day 14) = $4,970
> - **Total cash floor: ~$28K. MRR floor: ~$1K. The cash target is hit by warm services + agents alone — course and subs are upside.**
>
> Original plan below kept for full reasoning. **Where they conflict, this box wins.**

---

**North Star Metrics:** 300 niche newsletter subs · 20 paid Pro+Agents subs · 1 closed warm-enterprise pilot · 3 paid scoping workshops · $25K booked revenue
**Operating Cadence:** 2 hr morning publishing block · 2 hr afternoon build block · Mon-Thu only · weekends off except Saturday YouTube

## Existing Site Reality (don't rebuild what's already there)

The Next.js site at `/root/THEMAXIMOGUYS-NEXTJS` has been live for 3 months. Stack:
- **Next.js 16** + React 19 + Tailwind + shadcn/ui (Radix primitives) on port 3051
- **Sanity CMS** + **Supabase** auth/DB + **Resend** email + **Upstash Redis/ratelimit**
- **Anthropic SDK** already wired (so Hermes can ship as a Next.js route, no separate runtime)
- Existing routes: `/blog`, `/products`, `/industries`, `/solutions`, `/case-studies`, `/community`, `/resources`, `/newsletter`, `/links`, `/about`, `/contact`, `/(portal)`, `/(admin) dashboard|moderation|rate-limits`, `/signup`, `/login`
- Existing APIs: admin, blog, comments, contact, cron, csrf, geo, leads, newsletter, profile, reactions, sanity, seo

So this plan **ADDS** — Stripe, `/agents`, `/pricing`, paywall middleware, Hermes demo route — instead of building from scratch. Most "page" line items in §2 below are 2-4 hour additions, not multi-day builds.

---

## 0. The Brutal Truth Up Front

You don't have a traffic problem. You have an **offer + funnel** problem.

You already have:
- 103 MDX posts across 8 MAS series — that's ~50 hours of compounding SEO + AI Overview content
- 11+ working content & social-publishing skills (BlogDraft, MaximoBlog, MicroBlog, LinkedInPublishing, LinkedInCarousel, SketchCarousel, BlogCoverArt, MarkerBoard, InfoBlocks, SketchNote, BlueprintBoard)
- A working LinkedIn API publishing pipeline with image upload + first-comment tagging
- A Sanity studio + Next.js frontend
- Direct relationships with Maximo enterprise buyers (Alcon, Grable Services, etc. — TMG_Finances confirms paying clients)

What's missing: **a thing to buy**, **a frictionless way to buy it**, and **a daily mechanism to push qualified eyeballs at it**.

This plan fixes those three things in that order.

---

## 1. Revenue Architecture — What People Pay For

Five SKUs, multi-channel monetization (Welsh/ByteByteGo pattern). All anchored in real benchmarks: $150/yr is the words-only ceiling, $49-99 justifies itself when it bundles AI agents replacing $150-250/hr billable hours. Realistic free→paid conversion is 3-4% (Lenny's 3.3%, ByteByteGo 4%) — not the 10-15% optimism in earlier-stage planning.

### SKU 1 — Pro Subscription (content + community)
- **Price:** $19/mo or $190/yr (anchor near Pragmatic Engineer's $150)
- **Who:** Maximo devs, admins, junior consultants
- **What they get:**
  - Full archive of MAS series (Admin/Integration/Health/Monitor/Predict/MVI) — gate older posts past Day 25
  - Weekly "Maximo Brief" deep-dive newsletter
  - Private Discord access
  - Downloadable cheat sheets, JSON workflows, OSLC scripts
- **Target Day 50:** 30 paid = $570 MRR

### SKU 2 — Pro + Agents (the premium bundle)
- **Price:** $49/mo or $490/yr
- **Who:** Maximo developers building or evaluating AI agents in their environment
- **What they get:** Everything in Pro + all agents (Hermes + roster from §3) + early-access drops + monthly office hours
- **Target Day 50:** 20 paid = $980 MRR
- **Why it converts:** an agent that replaces 4 hours/week of analyst time at $100/hr saves $1,600/mo — $49 is a no-brainer.

### SKU 3 — Single Agent Install (impulse purchase)
- **Price:** $99-$199 one-time per agent (Hermes $99, Cerberus $199)
- **Who:** Solo Maximo consultants who want one tool now, not a sub
- **What they get:** Source code in their repo, install support, 30-day email support
- **Target Day 50:** 25 installs ≈ $2.5-3K

### SKU 4 — TheMaximoGuys Course ($297-$497, the high-margin volume play)
- **Course:** "Build production AI agents on Maximo" — 6-module video course + repo + private Q&A
- **Price:** $297 launch, $497 full
- **Why this exists:** Welsh's $1.3M came from courses. ByteByteGo, Lenny, Pragmatic Engineer all run a course alongside the newsletter. Maximo void = first-mover.
- **Ship by:** Day 40 (you have 90% of the content already across the 103 blog posts — repackage into video lessons).
- **Target Day 50:** 30 enrollments at $297 launch price = $8,910

### SKU 5 — Maximo AI Pilot (enterprise)
- **Price:** $15K-$25K fixed-fee 30-day engagement
- **Validation:** independent Maximo consultants charge $150-$250/hr ($1,200-$2,000/day). $15K = 12 days. Defensible.
- **What they get:**
  - Discovery + scoping (Week 1)
  - Build + deploy ONE agent in their environment (Weeks 2-3)
  - Handoff + 30-day support (Week 4)
  - Retainer path: $5-8K/mo
- **Target Day 50:** 1 signed pilot ($15K) + 2 in pipeline

### Publisher Tier (free; flywheel — feeds Pro)
- **Terms:** 70% rev-share on subs attributed via your link, OR $200-500 flat sponsored-post fee, OR custom for agents.
- **Target Day 50:** 5 publishers signed, 3 actively publishing.

### IBM Partner Plus track (parallel — major upside, free leads)
- IBM Partner Plus Premier tier unlocks $30-40K/qtr co-marketing funding in NA + IBM partner directory listing (free enterprise lead-gen).
- IBM Embedded Solution Agreement (ESA) lets you bundle IBM tech (watsonx etc.) under your brand for the agents.
- **Action:** apply Day 3. Decision in 4-6 weeks → revenue post-Day-50 but pipeline starts now.

### Day-50 revenue summary
| SKU | Target | $ |
|-----|--------|---|
| Pro $19/mo | 30 | $570 MRR ≈ $6,840 ARR |
| Pro+Agents $49/mo | 20 | $980 MRR ≈ $11,760 ARR |
| Single agents | 25 installs | ~$2,750 cash |
| Course | 30 × $297 | ~$8,910 cash |
| Enterprise pilot | 1 × $15K | $15,000 cash |
| **Cash by Day 50** | | **~$26,660** |
| **MRR locked** | | **$1,550** |

You hit your $25K target with the course + 1 pilot alone. Subs and agents are upside that compounds into Month 2-3.

### Stripe + Plumbing
- Day 1: open Stripe, create 5 products (Pro monthly, Pro annual, Single agent, All agents monthly, Pilot deposit $5K)
- Day 2-3: paywall via [Outseta](https://www.outseta.com) OR Beehiiv premium tier OR custom Stripe Checkout + Sanity flag (`tier: free | pro`). **Recommendation: Beehiiv premium for newsletter + Stripe Checkout for one-off agents.** Don't custom-build. Speed > elegance.
- Day 4: revenue dashboard = single Notion page or `/admin/revenue` route on Next.js pulling Stripe API.

---

## 2. Website Modifications (additions to existing site, not rebuilds)

The site is mature. Add these specific routes/components. Branch + small PR per item, no big-bang rewrites.

| # | Add | Where it goes | Why | Day | Rough effort |
|---|-----|---------------|-----|-----|--------------|
| 1 | `/` Homepage hero rewrite | `app/(marketing)/page.tsx` | Single CTA "Try Hermes" → /agents/hermes (above the fold). Replace any multi-CTA hero. | D1 | 2 hrs |
| 2 | `/agents` gallery + `/agents/[slug]` detail | new route under `app/(marketing)/agents/` | The thing people pay for. Pulls from new Sanity `agent` schema. | D2-3 | 4-6 hrs |
| 3 | `/pricing` page | new route under `app/(marketing)/pricing/` | Five-SKU table, annual toggle, "Book a call" CTA. | D2 | 3 hrs |
| 4 | `/agents/hermes` interactive demo | new server component using the existing `@anthropic-ai/sdk` already in package.json | Public demo. No login first 60 seconds. Then email gate via existing `/api/leads`. | D5-7 | 8-12 hrs |
| 5 | `/publish` (Publisher Program landing) | new route, replaces nothing | Recruit publisher devs. CTA → Tally form (or new `/api/publishers/apply` route). | D3 | 2 hrs |
| 6 | `/book` page | new route with Calendly inline embed | Enterprise pipeline entrypoint. | D5 | 1 hr |
| 7 | Newsletter capture on `/blog/[slug]` | `app/(marketing)/blog/[slug]/page.tsx` | Exit-intent modal + 30s-scroll trigger. Use existing `/api/newsletter`. | D3-4 | 3 hrs |
| 8 | "Try this agent" CTA component | shared component in `components/blog/` | Drop into MDX renderer between H2s. Auto-pick relevant agent by tag. | D4 | 3 hrs |
| 9 | Sanity `agent` schema | new schema file in `sanity-studio/schemas/agent.ts` | Models the agent product. | D4 | 1 hr |
| 10 | Stripe wiring | new `lib/stripe.ts`, `/api/stripe/checkout`, `/api/stripe/webhook` | Revenue plumbing. 5 products live. | D1-2 | 4-6 hrs |
| 11 | Paywall middleware | `middleware.ts` extension, reads Supabase user `tier` field | Gates `/blog/[slug]` for `tier in (pro, pro_agents)` content past Day 25 | D4 | 4 hrs |
| 12 | Course landing `/course` | new route | Sells Course SKU. Coming-soon mode until Day 35, live Day 40. | D8 | 2 hrs |
| 13 | OG image generation per post | extend existing route or `next/og` | LinkedIn-share-ready every post. Use BlogCoverArt skill output as fallback. | D5-6 | 3 hrs |
| 14 | PostHog or Plausible analytics | `app/layout.tsx` | Goal tracking: signup, demo_click, book_call, paid_checkout. | D6 | 1 hr |
| 15 | Footer + nav: kill any link not driving signup or revenue | `components/footer.tsx`, `components/nav.tsx` | Remove `_archived_services`. Keep `Solutions`, `Agents`, `Pricing`, `Blog`, `Book a call`. | D1 | 30 min |
| 16 | `/admin/revenue` dashboard tile | extend existing `/admin/dashboard` | Daily Stripe + signup snapshot. | D7 | 2 hrs |

**Implementation note:** All 16 items add up to ~50 dev hours = ~1 dedicated week. Sequence dictated by revenue impact: Stripe + /pricing + /agents on Day 1-3 (no revenue without these), Hermes demo Day 5-7 (no agents without one).

**Existing infrastructure to USE, not duplicate:**
- Resend for transactional + welcome emails (already wired) — don't add Beehiiv unless newsletter scale demands it past Month 2.
- Supabase for user records + `tier` field — don't add Outseta or MemberStack.
- Anthropic SDK already in deps — Hermes is a Next.js route, not a separate runtime.
- Upstash ratelimit for /api/leads abuse + free demo abuse on Hermes.
- Sanity for the new `agent` schema + the existing blog content.

---

## 3. Agentic Product Development — The 5+1 Agent Roster

You said you have Hermes. Here's the full roster, prioritized by speed to revenue.

| # | Agent | Job | Buyer | Ships by | Price |
|---|------|-----|-------|----------|-------|
| 1 | **Hermes** | (define this) — the flagship. My recommendation: an OSLC/REST integration agent that turns natural-language Maximo requests into API calls + reports. "Ask Hermes anything about your Maximo data, get an answer." | Admins + analysts who can't write OSLC | **Day 7** | $99 install / $49 all-access |
| 2 | **Apollo** — Work Order Triager | Auto-classify, prioritize, and route incoming work orders using LLM + Maximo workflow rules. | Reliability managers | Day 14 | $99 install |
| 3 | **Athena** — Asset Health Narrator | Reads Maximo Health scores + Monitor data → generates plain-English asset health summaries for executive dashboards. | Maintenance directors | Day 21 | $99 install |
| 4 | **Hephaestus** — Workflow Builder | Natural language → deployable Maximo workflow JSON via your existing MaximoWorkflow skill. | Maximo developers | Day 28 | $99 install |
| 5 | **Iris** — Visual Inspection Analyst | Photo or drone image → defect detection → Maximo SR/WO creation. Wraps MAS Visual Inspection. | Field ops | Day 35 | $149 install |
| 6 | **Cerberus** — Data Cleansing Agent | Item Master / Inventory dedupe + classification (you already have an Alcon project on this). | Master data teams | Day 42 | $199 install (more value) |

You don't need all 6 to ship. **You need Hermes + 2 more by Day 21**. Anything past that is upside.

### Agent shipping framework (every agent follows this)

1. **Demo URL** (mandatory). Vercel preview or Fly.io or Replit. Public, no login required for first 60 seconds of value. After 60 seconds → email gate.
2. **One-page launch post** with cover image (BlogCoverArt skill) + LinkedIn carousel + LinkedIn post + X thread + newsletter blast.
3. **GitHub repo** open-source the *template*, paid for the *production runtime*. Use the OSS repo as growth.
4. **Sanity entry** with all metadata so it shows up in `/agents` automatically.
5. **One real customer story** before paid launch — even if it's a pilot user paying $0. "Shell tested this on 5,000 work orders" beats "we built this".

### Publisher Agent SDK / Template Repo
- Open-source `tmg-agent-template` on GitHub: starter Next.js + Anthropic SDK + Maximo OSLC client + Sanity sync.
- Day 14 milestone: ship template + tutorial blog post + LinkedIn announcement.
- This is what makes the "Publisher Program" real — devs have a paved path.

### Claude Skills as Products
You have ~15 well-built skills (MaximoBlog, MicroBlog, BlogCoverArt, MarkerBoard, etc.). Two should ship as installable products on themaximoguys.ai:
- **MaximoBlog Skill** ($49 one-time) — for Maximo consultants who blog
- **MaximoWorkflow Skill** ($99 one-time) — already wraps OSLC workflow deployment
Skip the rest. They're internal tools, not products.

---

## 4. Content Engine — Daily/Weekly Cadence

The non-negotiable rule: **publish something to LinkedIn every weekday.** No exceptions for 50 days.

### Weekly publishing matrix (locked)

| Channel | Cadence | Format | Skill that produces it |
|---------|---------|--------|------------------------|
| LinkedIn personal | 5x/week (M-F) | Single image post (MarkerBoard) OR carousel OR text-only hot-take | LinkedInPublishing + MarkerBoard or LinkedInCarousel |
| LinkedIn TheMaximoGuys page | 5x/week | Same content cross-posted with company-page voice | LinkedInPublishing |
| Blog (themaximoguys.ai) | 2x/week (Tue, Thu) | Long-form, 1500+ words, gated tail | BlogDraft + MaximoBlog |
| X / Twitter | 1x/day | Thread or single insight + screenshot | (manual or LinkedInPublishing adapted) |
| YouTube | 1x/week (Sat) | 8-12 min agent demo or tutorial — film once, edit fast | manual |
| Email Newsletter (Beehiiv) | 1x/week (Friday) | "The Maximo Brief" — 5 links + 1 essay + 1 agent spotlight | manual aggregation |
| Discord/Slack community | Daily presence | Answer 3 questions, post 1 win | manual |

### Repurposing rule (so 1 blog = 7 distribution units)

Every blog post → produces:
1. 1 LinkedIn carousel (LinkedInCarousel skill from frontmatter)
2. 1 LinkedIn single-image post (MicroBlog → MarkerBoard cover)
3. 1 X thread (5-7 tweets pulled from H2s)
4. 1 newsletter section
5. 3-5 short-form micro-posts (MicroBlog)
6. 1 YouTube short or LinkedIn video (60s talking head explaining the hook)
7. 1 Reddit r/IBMMaximo cross-post (carefully — value first)

This is your existing MicroBlog + LinkedInPublishing pipeline. Run it on every post. **No exceptions.**

### Content topic backlog (commit by Day 7 — minimum 50 topics)

Categories, with starter ideas:

**Hot-takes (LinkedIn gold — these get shared):**
- "IBM is killing MIF and most consultants haven't realized yet"
- "Your Maximo health score is lying to you. Here's why."
- "Why most Maximo AI projects fail in week 6 (it's not the model)"
- "The OSLC API is a goldmine. Nobody's using it right."
- "Stop hiring more Maximo admins. Hire Hermes."

**Tutorials (SEO + signup magnets):**
- "Build a Maximo work-order triage agent with Claude in 50 lines"
- "Connecting MAS to your data warehouse without IBM CP4D"
- "Automating PM scheduling with the new MAS 9 health module"
- "How to integrate ChatGPT-style Q&A into Maximo Anywhere"

**Comparisons (high-intent search):**
- "MAS Manage vs ServiceNow Asset Mgmt — when each wins"
- "Maximo Health vs Maximo Predict — which to deploy first"
- "OSLC vs REST MBO — real performance numbers"

**Case studies (closes enterprise deals):**
- Anonymized Alcon item-master cleansing (sanitize hard)
- Hermes shipped 1,000 work orders in week 1 at <client>
- "How we cut MTTR 22% with Athena"

**Lists / listicles:**
- "12 Maximo OSLC endpoints every dev should know"
- "9 IBM-supported integrations Maximo customers forget about"
- "5 reasons your MAS upgrade is stalled"

Use BlogDraft + MaximoBlog skill to draft 2-3 per week. AI-assisted, human-finished.

### LinkedIn-specific tactics that drive signups (not vanity)

1. **Hook formula:** Lead with a number or a contrarian claim ("After 14 Maximo deployments, here's the one mistake I see in 13 of them:"). Hook line ≤ 120 chars so it doesn't truncate.
2. **CTA in every post:** "Subscribe to The Maximo Brief — link in profile/comments" OR "Hermes is now live for free. Demo here:" OR "Comment 'AGENT' and I'll DM you the template."
3. **Carousel rule:** 8-12 slides, big text, one idea per slide. SketchCarousel or LinkedInCarousel skill.
4. **Comment strategy:** First comment = link to gated landing page. Pin it. (You already have first-comment tagging in LinkedInPublish.)
5. **Engagement pod (10 daily comments rule):** Comment thoughtfully on 10 posts/day from Maximo influencers + IBM employees + 5 prospect companies' posts. 30 minutes max. Compounds insanely.
6. **Document posts (PDF):** LinkedInCarousel skill ships these. They get 2-3x the dwell time of image posts.
7. **One viral attempt per week:** A "cheat sheet that everyone saves" post — the format that drove your DanKoeStyle / MarkerBoard skills in the first place. Make it screenshot-worthy.
8. **Personal vs company page:** Personal page = 80% of distribution; company page = social proof. Repost personal to company always.

### Email Newsletter — "The Maximo Brief"

- **Platform: Resend + Supabase (use what you have).** You already pay Resend, you already have Supabase user records with email + tier fields. Building a basic broadcast UI on top is a 4-6 hour job — and it keeps subs in your DB, not on Beehiiv's.
- If subs cross 5,000 by Month 3 and you want recommendations engine + boosts, migrate to Beehiiv then. Until then: Resend + Supabase.
- Format: 5 curated links from Maximo/MAS world + 1 short essay + 1 agent spotlight + 1 reader Q
- Length: 4 minutes to read. Send Friday 9am ET.
- Free → Paid trigger: gate the "agent of the week" deep dive + working code after 4 free issues.
- Mirror the newsletter as a LinkedIn Newsletter (separate channel) — research showed LinkedIn Newsletters bypass feed-algo via triple notifications and grew 47% YoY.
- **Day-50 target: 1,000 free subs, 30 paid (3% conversion = realistic per Lenny's 3.3%, ByteByteGo 4%).**

---

## 5. Social Campaign Mechanics

### Day 1 setup (do this Monday morning, no excuses)

- [ ] LinkedIn personal headline rewrite. Current → "I help Maximo teams ship AI agents in weeks, not quarters. Founder, themaximoguys.ai."
- [ ] LinkedIn banner. Use BlueprintBoard or MarkerBoard skill to generate. Includes themaximoguys.ai URL + tagline.
- [ ] Featured section: pin (a) "Try Hermes" link, (b) latest carousel, (c) "Book a strategy call".
- [ ] Company page — same banner treatment, "Products" section listing 3 SKUs.
- [ ] Profile photo: clean, present. If old, retake. Sounds dumb, doubles connection-accept rate.

### Engagement targets (daily)

| Activity | Target |
|----------|--------|
| Posts published (personal + company) | 1+1 / day |
| Comments left on others' posts | 10/day |
| Connection requests sent | 20/day to ICP (Maximo titles) |
| DMs sent (warm follow-ups, no pitch) | 5/day |
| Newsletter subscribers gained | track daily |

### Paid LinkedIn ads (Days 8-50)

- Budget: $30/day = $1,260 over 42 days. Cut to $0 if CAC > $50 by Day 21.
- Boost the top 3 organic posts (those that hit 5K+ impressions organically).
- Single conversion campaign: "Try Hermes" → /signup landing page. ICP: Maximo Admin/Developer/Consultant titles, US/UK/Canada/India.

### Viral-format experiment per week

Pick one of these formats per week, ship it Tuesday, measure by Friday:
- Week 1: "Things nobody tells you about MAS 9" cheat sheet (SketchNote skill)
- Week 2: "MAS Admin command cheat sheet" (BlueprintBoard skill)
- Week 3: "MIF vs API-first: visual comparison" carousel (MarkerBoard skill)
- Week 4: "The Maximo AI maturity model" (InfoBlocks skill)
- Week 5: "9 OSLC endpoints + curl examples" cheat sheet (BlueprintBoard skill)

Each one is a screenshot-worthy save artifact. Save = algorithm signal = reach.

### Other channels (kept light)

- **Reddit r/IBMMaximo** — value-first comments, 1 link/week max. Subs: ~3-4K. Niche but qualified.
- **IBM Community for MAS** — answer 5 questions/week with real depth. Signature line links to themaximoguys.ai.
- **YouTube** — film weekly 8-12 min Hermes/Athena demo on Saturday morning. Cross-post to LinkedIn as 60s teaser.
- **Medium / Dev.to** — auto-syndicate top 1 blog post/week with canonical tag back to themaximoguys.ai.
- **Hacker News** — submit 1 strong essay (Day 25 or Day 40). Don't beg upvotes.

---

## 6. Developer Onboarding Funnel

### The 10-minute first win

When a dev hits /signup and lands in the welcome email, they get one job:
1. Click → opens Hermes demo URL in new tab
2. Hermes is pre-loaded with a sample Maximo dataset (you generate)
3. They type one of three suggested prompts ("Show me overdue work orders", "Which assets had the most failures last month?", "Generate a PM schedule for asset 12345")
4. Hermes returns a real answer with chart in <30 seconds
5. CTA at bottom: "Want to run this on YOUR Maximo? [Install Hermes — $99]" or "[Talk to us about a pilot]"

That's it. 10 minutes. If they don't get a wow in 10 minutes, you lost them.

### Day-by-day for a new signup (auto-emails via Beehiiv automations)

- Day 0 (signup): welcome email + Hermes demo link + Discord invite
- Day 1: "Here's how I'd integrate Hermes with Maximo in your environment" — short Loom + one-pager PDF
- Day 3: case study email (anonymized client win)
- Day 5: "Try Apollo (work-order triage)" or "Read this: [latest blog]"
- Day 7: invite to live demo / office hours (you host weekly Friday 30-min Zoom)
- Day 14: "Become a Publisher" CTA
- Day 21: paid Pro upgrade pitch
- Day 30: 1:1 outreach if they haven't activated

### Community: Discord vs Slack

- **Pick Discord.** Faster onboarding, no per-seat cost, devs already there.
- Channels: #welcome, #hermes-help, #agent-requests, #publishers, #jobs, #show-and-tell
- Day-1 invite to every signup. Pin "How to install Hermes in 10 minutes" in #welcome.
- Run **weekly Friday office hours** in voice channel. Record. Repost.

### Publisher Program landing page

URL: themaximoguys.ai/publish (or repurpose /careers as suggested in §2)

Sections:
1. Hero: "Get paid to write about Maximo. Or build agents on our platform. Or both."
2. Three archetypes (Developer, Consultant, Field Engineer)
3. What we pay: revenue share (70/30) on subs attributed via your link, OR $200-500 per sponsored post (1500+ words), OR custom deals for agents.
4. How to apply: Tally form (1 minute)
5. FAQ
6. Current publishers (start with you only — add real names as you sign them)

---

## 7. Client (Enterprise) Onboarding Funnel

### The funnel

Cold outbound / inbound → /book → 30-min discovery call → SOW → $5K deposit → 30-day pilot → retainer

### Discovery call script (90% of the close happens here)

1. (5 min) Their context — current Maximo version, team size, pain points
2. (10 min) Their AI maturity — what have they tried, what failed, what's stuck
3. (10 min) Pick ONE problem, scope a 30-day pilot live: outcome, success metric, deliverables
4. (5 min) Pricing: $15-25K depending on scope. $5K deposit, $10K mid, $5K-10K on success metric.

### Qualification criteria (decline if any of these miss)

- Maximo 7.6+ or MAS in production
- 50+ assets or work orders/day (volume justifies AI)
- Internal sponsor with budget authority $25K+
- Willing to give read-only API access for the pilot

### Sample SOW — "Maximo AI Pilot in 30 Days"

Save this template. Customize per client. Drop in `/SOW-TEMPLATE-MaximoAIPilot.md`.

```
## Scope
- Build, deploy, and operationalize ONE Maximo AI agent in {CLIENT}'s environment
- Agent type: {Hermes | Apollo | Athena | Hephaestus | Iris | Cerberus | custom}
- Success metric: {e.g., "75% of incoming work orders auto-classified with >85% accuracy"}

## Timeline
- Week 1: Discovery + dataset + access setup
- Week 2: Build + integrate
- Week 3: Pilot run on production (read-only or sandboxed)
- Week 4: Validation + handoff + training

## Deliverables
- Deployed agent in {CLIENT}'s VPC or hosted with explicit data agreement
- Source repo + runbook
- 30-day support
- Success-metric report

## Pricing
- $15,000 fixed-fee. $5K on signature, $5K on Week 2, $5K on success-metric report.
- Optional retainer post-pilot: $6,000/mo (8 hrs/wk).
```

### Outbound list — 50 target enterprises by Day 14

Build via §8 (scraping). Sources:
- IBM Maximo customer references (public case studies)
- LinkedIn search: "Maximo Administrator" + company size 1000+
- Job postings on LinkedIn/Indeed mentioning "Maximo" — that's a hot signal
- IBM partner directory (TMG is a partner — check current status)

Outbound sequence (5-touch over 14 days):
1. Connection request with personalized note (Maximo-specific, no pitch)
2. After accept (D+2): share a relevant blog post — "saw your team is hiring for Maximo, this might help"
3. (D+7): comment on their post or DM with a specific insight
4. (D+10): light pitch — "we ship Maximo AI pilots in 30 days, 1 question: are you exploring AI on top of MAS yet?"
5. (D+14): one-time CTA — "want a 20-min call?"

---

## 8. Data Scraping / Lead Generation Pipeline

You said you'll scrape if needed. You should — but legally and lightly.

### Stack (use what you already have)

You have **Apify** and **BrightData** skills wired up (`/root/.claude/skills/Apify` and `/root/.claude/skills/BrightData`). Don't add new tools.

### Daily pipeline

1. **Source 1 — Maximo job postings:** Apify `Indeed Job Scraper` or LinkedIn job scraper, query "Maximo", US/UK/Canada/India, last 7 days. Daily run.
2. **Source 2 — LinkedIn profiles:** Apify `LinkedIn Profile Scraper` (use sparingly, respects rate limits). Query: "Maximo Administrator", "Maximo Developer", "Maximo Consultant".
3. **Source 3 — IBM partner directory:** scrape via BrightData (one-time, Day 5).
4. **Source 4 — bpd-zone.org / mxLoader.com / IBM Community for MAS:** scrape active users (commenters), they're the engaged segment. One-time, Day 6.

### Enrichment

- Apollo.io free tier OR Hunter.io for email enrichment on company domains
- Tag each lead: `cold | warm-source | very-warm` based on signal strength

### Compliance posture

- **CAN-SPAM:** every email has unsubscribe + physical address (use TMG_Finances LLC address)
- **GDPR:** if EU contact, lead with value (free content) before any commercial mail. Honor opt-out within 24h.
- **LinkedIn ToS:** scraping LinkedIn at scale risks lockout. Cap profile scrapes at 50/day. Use the public-page scraper, not the logged-in scraper.
- **Don't email mass blasts.** 1:1 personalized DMs/emails only. Volume = 20/day cold.

### Tracker

Single `/MEMORY/WORK/leads.csv` (or push to Sanity as a `lead` doc type). Columns: name, title, company, source, captured_at, last_touched_at, status, notes.

---

## 9. Tools + Skills Inventory (use what you have)

### Already built — map to plan tracks

| Skill | Used in track |
|-------|---------------|
| BlogDraft | Track D — generate first drafts |
| MaximoBlog | Track D — full blog production |
| MicroBlog | Track D, E — daily LinkedIn micro-content |
| LinkedInPublishing | Track E — daily LinkedIn pushes |
| LinkedInCarousel | Track D, E — PDF carousels from blogs |
| SketchCarousel | Track E — illustrated multi-slide carousels |
| BlogCoverArt | Track B, D — auto-pick best style for each blog cover |
| MarkerBoard | Track E — primary single-image social style |
| InfoBlocks | Track E — corporate/educational visuals |
| SketchNote | Track E — cheat sheets / survival guides |
| BlueprintBoard | Track E — technical reference cards |
| MaximoWorkflow | Track C — Hephaestus agent core |
| MaximoData | Track C — Hermes agent core (OSLC/REST) |
| SearchMaximo | Track C — agent grounding |
| Apify, BrightData, Scraping | Track H — lead-gen pipelines |
| Research | Track D — backing tutorials with current data |
| ConvertRFPtoPDF | Track G — SOW PDF deliverables |
| InvoiceGenerator | Track A — billing pilots |

### What to build new (only if it ships revenue)

| New skill / tool | Why | Build cost | Build day |
|------------------|-----|------------|-----------|
| **AgentDeploy skill** | Push agent to Vercel + register in Sanity in one command | 4 hrs | Day 6 |
| **PaywallCheck skill/middleware** | Check Sanity `tier` field + Stripe customer in Next.js middleware | 2 hrs | Day 4 |
| **OutboundSequencer** | Wraps existing Gmail MCP + leads.csv to send 1:1 personalized emails | 3 hrs | Day 10 |
| **NewsletterDigest** | Pulls last week's posts, social wins, agent updates → Beehiiv draft | 2 hrs | Day 12 |

That's it. Resist adding more.

### Hermes — what is it?

You referenced Hermes but I don't see code in this repo or NEXTJS. Two options:

1. **If Hermes already exists somewhere else:** publish a public demo URL by Day 7 using `/agents/hermes` route. Wire up a Sanity `agent` doc. Done.
2. **If Hermes is a concept:** ship it inside the existing Next.js app — you already have `@anthropic-ai/sdk: ^0.80.0` in `package.json` and Supabase ratelimit. Recommended scope: "Maximo Q&A agent". User asks a natural-language question, Hermes hits MaximoData skill (OSLC/REST sample data), returns answer with chart. ~300 lines of TypeScript on a sample dataset. **Build it Day 1-7 as `app/(marketing)/agents/hermes/page.tsx` + `app/api/agents/hermes/route.ts`.**

Confirm which Hermes is on Day 1. If unclear, default to option 2 — it's the most marketable agent and you have all the deps.

---

## 10. KPIs, Tracking, Daily Operating Cadence

### Daily KPIs (track in single sheet — Notion or `MEMORY/WORK/tracker.md`)

| Metric | Daily Target | Day-50 Target |
|--------|-------------|---------------|
| LinkedIn posts shipped | 2 (personal + co page) | 100 |
| Document carousels (highest-converting format) | 1 / week min | 8+ |
| Comments left | 10 | 500 |
| Connection requests sent | 20 | 1,000 |
| Podcast pitches sent | 2 / week (W1-3) | 12+ |
| Podcast appearances booked | track | 3+ |
| Newsletter signups (free) | 10-20 | 1,000 |
| Hermes demo plays | 20 | 1,000 |
| Discord members | +3 | 200 |
| Discovery calls booked | 0.4 (= 2/wk) | 15-20 |
| Pro subs paid ($19) | track | 30 |
| Pro+Agents subs paid ($49) | track | 20 |
| Single-agent installs paid | track | 25 |
| Course enrollments | (Day 33+) | 30+ |
| Enterprise pilots signed | track | 1 (+ 2 in pipeline) |
| Pipeline value $ | track | $50K |
| Booked revenue $ | track | $25K |
| MRR locked | track | $1.5K |
| IBM Partner Plus status | weekly | Premier or Build Lab approved |

### Weekly review (Friday 4pm, 30 min)

Template (`MEMORY/WORK/weekly-review-{week}.md`):

```
## Wins (3-5)
## Misses (3-5)
## Top-performing post (link + impressions + signups)
## Worst-performing post (link + lesson)
## Pipeline movement
## Revenue this week
## Decisions for next week (max 3)
## Things I will STOP doing
```

### Single source-of-truth dashboard

Location: `/root/themaximoguys-blog/MEMORY/WORK/tracker.md` (or Notion page if preferred). Update at end of each day. 5 minutes max.

---

## 11. The 50-Day Calendar

### Strategic shape (per research):
**Content compounding for Days 1-39 → ONE big launch event Days 40-45 → conversion harvest Days 46-50.**

Research showed cold outbound + immediate launch underperforms in a 50-day window for niche B2B. Better: build content inventory + warm-list + IBM Partner Plus application in W1-5, fire ProductHunt + Show HN + LinkedIn launch carousel + email blast on W6, harvest the conversions in the final week.

### Week 1 (Days 1-7) — Foundation + start publishing immediately.

| Day | Build | Publish | Outbound |
|-----|-------|---------|----------|
| Mon D1 | Stripe products live (5 SKUs). Homepage hero + nav cleanup. LinkedIn profile rewrite. Apply to **IBM Partner Plus**. | Tease post: "I'm shipping 6 Maximo AI agents in 50 days. Day 1." | LinkedIn DMs to 10 friendlies asking for Day-45 launch support |
| Tue D2 | /pricing + /agents skeleton | **First Maximo cheat-sheet carousel** (SketchNote skill) — highest-converting B2B format | 20 connection requests to ICP |
| Wed D3 | Sanity `agent` schema + /publish landing | Long-form blog: "Why Maximo AI projects fail in week 6" | 20 connections + email-list sourcing kicked off |
| Thu D4 | Paywall middleware + "Try this agent" CTA component on blog | Hot-take post: "IBM is killing MIF and most consultants haven't realized" | 20 connections |
| Fri D5 | /book page + Hermes demo skeleton | Newsletter #0 sent: "Welcome — what's coming over 50 days" | Pitch 6 podcasts (asset mgmt, reliability, IBM ecosystem) |
| Sat D6 | Hermes demo URL live (rough) — internal-only | YouTube #1: "What I'm building — meet Hermes" (raw, authentic) | — |
| Sun D7 | OG image generation + analytics installed | Schedule next week's posts | Pitch 6 more podcasts |

### Week 2 (Days 8-14) — Soft launch Hermes + content blitz.

| Day | Theme | Action |
|-----|-------|--------|
| Mon D8 | **HERMES SOFT LAUNCH** to email list + Discord only (NOT big public push yet) | Document carousel + email blast to ~100 friendlies. Goal: 30 demo plays + 10 testimonials. |
| Tue D9 | Tutorial blog: "Build your own Hermes in 50 lines" | Repurpose 7 ways via MicroBlog |
| Wed D10 | Course landing page goes live (waitlist mode) | Comparison post (MAS Manage vs ServiceNow) carousel |
| Thu D11 | Apollo build-out underway | Hot-take + LinkedIn engagement push |
| Fri D12 | Newsletter #1 + Friday office hours #1 | Apply IBM Build Lab if Partner Plus accepted |
| Sat D13 | YouTube #2: Hermes deeper walkthrough | — |
| Sun D14 | **Apollo ships internally** (Pro+Agents tier early access) | Begin recording course modules |

### Week 3 (Days 15-21) — Apollo + first paid conversions, course recording.

- Mon D15: Apollo soft launch via newsletter + LinkedIn.
- Tue D16: Cheat sheet carousel #2 (BlueprintBoard skill).
- Wed D17: Long-form: "9 OSLC endpoints every Maximo dev should know" + curl examples.
- Thu D18: Athena ships internally.
- Fri D19: Newsletter #2 + first Pro tier upgrade prompts to engaged signups.
- **Day 19 goal:** First paying Pro sub.
- Sat D20: YouTube #3: Apollo demo with realistic data.
- Sun D21: Athena public reveal in newsletter; **5 paid Pro subs target**.

### Week 4 (Days 22-28) — Enterprise pipeline + Hephaestus + first Pro paywall live.

- Mon D22: **Paywall live** — older blog posts gate behind Pro tier (no surprise: send notice email to existing free subs first).
- Tue D23: Pivot post: "I gated my blog. Here's why." (transparency drives trust).
- Wed D24: Discovery call cadence — book 5 enterprise calls this week.
- Thu D25: Hephaestus ships internally.
- Fri D26: Newsletter #3 + send personalized course-launch tease to top 100 most-engaged subs.
- **Day-28 targets:** 10 paid Pro, 1 enterprise discovery call advancing to SOW, 250 free subs.

### Week 5 (Days 29-35) — Course finalization + Iris.

- Mon D29: Course modules 1-3 finalized (re-edit existing MAS posts as video).
- Tue D30: Iris ships internally (visual inspection agent).
- Wed D31: Course modules 4-6 finalized.
- Thu D32: Hot-take: "After 14 Maximo deployments — the one mistake in 13 of them"
- Fri D33: Newsletter #4 + course pre-order window opens at $197 (early-bird, 100 spots).
- Sat D34: YouTube #5: course preview + module 1 free.
- Sun D35: Iris public + Submit "Building 6 AI agents in 50 days" essay to Hacker News. Aim for Tue front-page.

### Week 6 (Days 36-42) — **THE BIG LAUNCH EVENT.**

This is the week the research pointed to. Everything compounds here.

| Day | Action |
|-----|--------|
| Mon D36 | Final ProductHunt prep: hunter, gallery, copy, demo GIF. ICP DM list of 50. |
| Tue D37 | **PRODUCT HUNT LAUNCH 12:01 AM PT.** Coordinated LinkedIn post 9am ET. Show HN at 9am ET (Tue, Wed, Thu only). Email blast. All 6 agents available. |
| Wed D38 | Launch carousel #2: "What we shipped" + 12 testimonial wall slides. Course early-bird closes Friday. |
| Thu D39 | Engagement maintenance day. Reply to every comment. Office hours extended. |
| Fri D40 | **Course goes live at $297** (early-bird $197 closes today). Newsletter blast. |
| Sat D41 | YouTube: "What I'd do differently" — instant retro content. |
| Sun D42 | Cerberus ships (data-cleansing, Alcon-informed). |

### Week 7 (Days 43-49) — Conversion harvest + enterprise close.

- Push hardest enterprise call → SOW signature this week.
- Course flash sale: "100 enrollments by Day 45 unlocks bonus module" — urgency mechanic.
- Late-funnel emails: 14-day signups who haven't paid → personalized "this Pro feature is right for you" pitch.
- Outreach to 50-target enterprise list — every cold lead now has the launch event as social proof.

### Day 50 — Close the books.

- Publish "What worked / what didn't — 50 days of TheMaximoGuys" — itself viral content (Welsh playbook).
- Tally revenue, MRR, signups, calls booked.
- Decide which agents stay, which get cut, which deserve dedicated landing pages.
- Plan next 50 from ground-truth data, not theory.

---

## 12. Daily Routine (the only thing that matters — the rest is theory)

```
06:30  Coffee + 15 min skim of feed for engagement targets
07:00  COMMENTS BLOCK — leave 10 thoughtful comments on Maximo/IBM content (30 min)
07:30  PUBLISHING BLOCK
       - Run /micro-blog or /maximo-blog or /linkedin-publish to ship today's content
       - Schedule personal post + company page post
09:30  BUILD BLOCK — work on this week's agent / page / pipeline
12:30  Lunch
13:30  BUILD BLOCK continued
15:30  CALL BLOCK — discovery calls, office hours, Loom recordings
16:30  OUTBOUND BLOCK — 20 connection requests, 5 DMs, 5 cold emails
17:00  Update tracker.md (5 min)
17:05  Done.
```

Friday 4pm: replace OUTBOUND with WEEKLY REVIEW.

---

## 13. What This Plan Refuses To Do

- **No new SaaS subscriptions** unless they 10x revenue. You have your stack. Use it.
- **No vanity metric chasing.** Followers don't pay rent. Signups + dollars do.
- **No "build it and they will come."** Every agent ships with a launch motion attached.
- **No multi-quarter timelines.** Every line item completes inside 50 days or it's cut.
- **No solo-team-of-one delusion.** If a track stalls because of bandwidth, kill the track and put the time into the one that's working.

---

## 14. Risk Mitigations Locked In

| Risk | Mitigation |
|------|-----------|
| LinkedIn fatigue → quality drops | Weekly backlog of 7 posts ready Sunday night. Never write live. |
| Content ships, no signups | If by Day 14 < 100 signups: pivot to direct enterprise outbound, drop content cadence to 3/wk |
| Hermes can't ship by Day 7 | Cut scope to "single use case" (overdue WO summarizer), not "general Q&A" |
| Pro tier doesn't convert | If by Day 28 < 10 Pro: drop $29/mo to $19/mo + add a free trial |
| Enterprise calls don't book | Give existing TMG_Finances clients a free month of "Hermes for your team" — case study + referral |
| LinkedIn lockout from scraping | Cap LinkedIn scrapes at 50/day, prefer job-board + IBM partner sources |
| Burn out by Week 4 | Saturday is YouTube + admin only — no posting, no outreach. Sunday is fully off. |

---

## 15. Day-1 Checklist (do this Monday morning, no exceptions)

- [ ] Open Stripe account, create 5 products + price IDs documented (`Pro $19/mo`, `Pro+Agents $49/mo`, `Single Agent $99`, `Single Agent Premium $199`, `Pilot Deposit $5K`, `Course $297`)
- [ ] LinkedIn personal profile rewrite (headline, banner, featured) — use BlueprintBoard skill for banner
- [ ] Apply to **IBM Partner Plus** (this triggers the 4-6 week clock; do it Day 1)
- [ ] Resend templates ready: welcome, Hermes-demo, Pro upgrade, course-tease, weekly-newsletter
- [ ] Calendly link for "Maximo AI strategy call (30 min)"
- [ ] Discord server created with 6 channels (#welcome, #hermes-help, #agent-requests, #publishers, #jobs, #show-and-tell)
- [ ] `tracker.md` at `MEMORY/WORK/tracker.md` with daily KPI fields
- [ ] First LinkedIn tease post live: "I'm shipping 6 Maximo AI agents in 50 days. Day 1."
- [ ] DM 10 friendlies asking for Day-37 launch support
- [ ] Schedule Friday 4pm weekly-review block recurring on calendar
- [ ] **Decide:** Is Hermes already built somewhere, or building this week? (If unclear, default to "Maximo Q&A agent" using existing MaximoData skill + Anthropic SDK already in NEXTJS deps — ship as `/agents/hermes` route by Day 7.)

If you can't tick all 11 by EOD Monday, the plan starts Tuesday — but it doesn't slip further.

---

## Appendix A — Skill invocation cheat sheet (slash commands you'll run daily)

| Command | When to use |
|---------|-------------|
| `/blog-draft "{topic}"` | Generate first-draft blog post (Tue/Thu) |
| `/maximo-blog "{topic}"` | Full long-form Maximo blog with research |
| `/micro-blog "{post-path}"` | Break a published blog into 5+ social micros |
| `/linkedin-publish "{path}"` | Publish a post + image to LinkedIn |
| `/linkedin-carousel "{post-path}"` | Generate a PDF carousel from a blog |
| `/sketch-carousel "{post-path}"` | Generate illustrated carousel slides |
| Generate cover image → `/blog-cover-art` skill | Auto-pick style + ship cover for any blog |
| `/maximo-data {object}` | Pull/push Maximo data (powers Hermes) |
| `/maximo-workflow` | Powers Hephaestus agent |
| `/search-maximo "{topic}"` | Ground content in IBM official docs |

## Appendix B — Files this plan creates

- `MEMORY/WORK/tracker.md` — daily KPI tracker
- `MEMORY/WORK/leads.csv` — outbound list
- `MEMORY/WORK/weekly-review-{week}.md` — Friday review
- `posts/agent-launches/hermes-launch.mdx` (and apollo, athena, …)
- `prompts/discovery-call-script.md`
- `SOW-TEMPLATE-MaximoAIPilot.md`
- New Sanity schema: `agent.ts`
- New Next.js routes: `/agents`, `/pricing`, `/publish`, `/book`, `/admin/revenue`

---

**Bottom line.** You have 90% of what you need already. The other 10% is Stripe + Hermes-public-demo + a paywall middleware + relentless daily publishing. 50 days is enough — but only if Day 1 starts with the §15 checklist actually closed by EOD.
