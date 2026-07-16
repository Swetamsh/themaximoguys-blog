# TheMaximoGuys — Master Marketing Strategy

**Version:** 1.0 (2026-06-10)
**Scope:** Newsletter · LinkedIn (extend, not rebuild) · X/Twitter · Instagram · Website/SEO+GEO — unified into one engine whose end goal is **enterprise micro-project lead generation** (code customizations, MVI implementations, Health implementations, integration modernization, MAS 9 upgrades, Control Desk migration).
**Supersedes nothing** — this document sits ABOVE the existing channel strategies (EMAIL-STRATEGY.md v2, MARKETING-STRATEGY.md, TRAFFIC-STRATEGY.md, MULTI-CHANNEL-STRATEGY.md) and orchestrates them toward revenue.
**Research base:** TMG asset inventory (113 posts, 9 series, live LinkedIn pipeline), Maximo competitor landscape (June 2026, triple-sourced), 2026 B2B channel best-practices research (cited in §11).

---

## 1. Executive Summary

TheMaximoGuys has 113 deep-dive posts across 9 series, a live LinkedIn publishing pipeline, a ready-to-launch newsletter, and proven AI-search traction (themaximoguys.ai already ranks in Perplexity for MVI and REST API queries). What it lacks is not content or channels — it is the **conversion layer** that turns attention into micro-project contracts.

The market timing is exceptional. The 2025 Naviam mega-merger (9 partners → 1 brand) fragmented incumbent content with no unified voice yet established. Two cohorts of **forced buyers** exist right now: Maximo 7.6 holdouts whose paid Extended Support expires **September 30, 2026**, and Control Desk customers facing a hard **December 31, 2026** end-of-all-support cliff. Meanwhile the AI-in-MAS-9.x niche (Maximo Assistant, AI Service, agentic CBM) has almost no independent content — a first-mover opening that maps directly to TMG's existing AI-suite series.

The strategy: **LinkedIn-first (personal profile-led) + monthly newsletter as the owned asset + SEO/GEO bottom-of-funnel pages**, with X as a developer-discovery satellite and Instagram as a zero-net-effort repurposing channel only. Every channel funnels into six **named, productized micro-project packages** with fixed scopes and clear entry points. Operating budget: ~12 hours/week solo, heavily automated through the existing PAI skill stack.

Twelve-month goal: 2,000 newsletter subscribers, 5,000 LinkedIn followers, 6 paid micro-projects booked, and recognized ownership of the AI-in-MAS and forced-migration content niches.

---

## 2. The Unified Content Flywheel

One asset (an MDX blog post) feeds every channel; every channel feeds the list; the list feeds the pipeline.

```
                    ┌──────────────────────────────┐
                    │   BLOG POST (MDX, 113 live)  │
                    │  SEO + GEO citations (§7)    │
                    └──────┬───────────┬───────────┘
            MicroBlog skill│           │BlogCoverArt/MarkerBoard
                           ▼           ▼
        ┌──────────────────────┐  ┌─────────────────────┐
        │ LinkedIn (personal + │  │  X threads · IG     │
        │ company, pipeline)   │  │  repurpose (§5,§6)  │
        └──────────┬───────────┘  └──────────┬──────────┘
                   │  comment-trigger funnel │ pinned lead magnet
                   ▼                         ▼
        ┌─────────────────────────────────────────────┐
        │   NEWSLETTER — The Maximo Insider (owned)   │
        │   monthly flagship + weekly MaximoWire      │
        └──────────────────────┬──────────────────────┘
                               │ welcome sequence → diagnostic CTA
                               ▼
        ┌─────────────────────────────────────────────┐
        │  SERVICES PAGES — 6 productized packages    │
        │  (§8) → discovery call → contract           │
        └──────────────────────┬──────────────────────┘
                               │ delivery
                               ▼
                  CASE STUDY → new blog post → ↻ flywheel
```

The flywheel's compounding loop: every delivered micro-project produces an anonymized case study, which becomes a blog post + carousel + newsletter feature — the highest-converting content type in B2B consulting.

### Who we're selling to (buyer personas)

| Persona | Job titles | Pain right now | Primary channel | Buys |
|---|---|---|---|---|
| **The Cornered Admin** | Maximo Administrator, EAM System Administrator, CMMS Manager | Running 7.6/8.x past or near end-of-support; OpenShift skills cliff | LinkedIn, IBM Community, newsletter | Package #1 (Upgrade Assessment), #6 (Automation Sprint) |
| **The Reliability Owner** | Reliability Engineer, Maintenance Manager, Asset Performance Lead | Has MAS entitlements for Health/Predict/MVI but nothing configured | LinkedIn, MaximoWorld, newsletter | #3 (MVI Pilot), #4 (Health Quickstart) |
| **The Integration Architect** | Solution Architect, Integration Lead, Maximo Developer | Legacy MIF interfaces; pressure to expose REST/Kafka; AI mandates | X, blog/AI search, GitHub | #5 (Integration Sprint), #6 |
| **The Deadline Executive** | IT Director, Service Management Lead (Control Desk owner) | Hard Dec 31, 2026 Control Desk cliff; Sep 30, 2026 Extended Support bill | LinkedIn, email, analyst/AI search | #2 (Control Desk Exit Plan), #1 |

---

## 3. Newsletter — The Maximo Insider

**Positioning (one sentence):** *The only independent, practitioner-first monthly briefing on IBM Maximo — product, platform, people, and career — with zero partner agenda.*

This extends EMAIL-STRATEGY.md v2 (which remains the operational doc). Research confirmed the whitespace still holds: no independent Maximo email newsletter exists; Maximo Times is a paid forum, MORE is a community hub, partner blogs have commercial agendas.

### Cadence

| Send | Day/Time | Length | Rationale |
|---|---|---|---|
| Monthly flagship | 1st Tuesday, 08:00 ET | ~1,500 words, 8 sections | Enterprise inboxes are triaged Tue–Thu mornings; monthly depth builds authority without burnout |
| Weekly MaximoWire | Friday, 09:00 ET | ~300 words, 3 sections | Keeps TMG top-of-mind between flagships; Friday = lighter inbox competition for a 60-second read |

### Template structure
- **Flagship (8 sections):** The Lede → Release Radar → IBM Corporate Beat → Product Deep-Dive (links a TMG post) → TechXchange & Events → Community Pulse → Career Corner → The Archive. (Templates already exist: `SocialMedia/EmailNewsletter/Content/Templates/`.)
- **MaximoWire (3 sections):** one TMG post, one industry signal, one LinkedIn thread worth reading.

### Subscriber acquisition — six mechanisms
1. **Comment-trigger funnels on LinkedIn** — "Comment 'checklist' and I'll DM it" posts; the DM delivers the lead magnet via the opt-in page. Boosts post reach AND captures emails.
2. **Content upgrades inside top blog posts** — the 10 highest-traffic posts (MVI + REST API series first, since they already rank) get an inline upgrade: downloadable checklist/template version gated by email.
3. **`/newsletter` landing page** on themaximoguys.ai with archive grid — ranks for "Maximo newsletter" over time (page is planned in the Next.js repo; build in Q3).
4. **Deadline-driven lead magnets** — "MAS 9 Upgrade Readiness Checklist" and "Control Desk Exit Planner" tied to the Sep 30 / Dec 31, 2026 cliffs. Forced buyers search for exactly this.
5. **Community seeding** — share issue excerpts (not links-first) in r/MaximoAssetManagement (new, low-competition), IBM TechXchange Maximo group, and MORE community; newsletter linked in profile/footer.
6. **X pinned post + bio link** — evergreen lead-magnet tweet pinned (§5).

### Newsletter → lead conversion path
Subscribe → 4-email welcome sequence (Day 0: deliver magnet + position TMG; Day 2: the "why MAS migrations stall" problem framing; Day 5: mini case study with numbers; Day 8: soft offer of the **MAS 9 Readiness Assessment**) → regular issues where the Product Deep-Dive section always ends with the matching productized package CTA → reply-to-book diagnostic call. Target per 2026 B2B benchmarks: 30–45% opens, 4–8% CTR, and 0.5–3% subscriber→client over 6–18 months — at 2,000 subs that is 10–60 clients' worth of pipeline.

### 90-day action plan
- **Days 1–14:** Provision Beehiiv, verify mail.themaximoguys.com (CNAME/SPF/DKIM), import any existing contacts, build welcome sequence.
- **Days 15–30:** Publish refreshed Issue #001 (re-angle "The April 30 Cliff" → "The September 30 Countdown" since April has passed), launch 2 content upgrades on ranking posts, start weekly MaximoWire.
- **Days 31–60:** `/newsletter` landing page live; first comment-trigger campaign on LinkedIn; Issue #002 (MaximoWorld Nashville preview — event is Aug 17–20).
- **Days 61–90:** Issue #003 (Control Desk exit special); seed r/MaximoAssetManagement; first conversion-path review.

### KPIs
| Metric | 90 days | 6 mo | 12 mo |
|---|---|---|---|
| Subscribers | 500 | 1,200 | 2,000+ |
| Open rate | ≥35% | ≥40% | ≥40% |
| CTR | ≥4% | ≥6% | ≥6% |
| Diagnostic calls sourced | 2 | 6 | 15 |

---

## 4. LinkedIn — Extend the Live Pipeline (Do NOT Rebuild)

The publishing pipeline (LinkedInPublishing skill: API posting, carousel PDF assembly, batch manifests, content-calendar.json, Playwright first-comment automation) is **live and working**. Nothing below replaces it — this section adds the personal-profile emphasis, engagement layer, and lead capture on top.

### Personal vs company page roles

| | Personal profile (Swetansh) | Company page (TheMaximoGuys) |
|---|---|---|
| Role | **Primary growth engine** — 2026 B2B data: personal profiles get 5–8x company reach; most consultancy inbound originates from founder profiles | Credibility asset + content library + social proof for procurement checks |
| Cadence | 3–4 posts/week (Tue–Fri) | 2 posts/week (existing pipeline cadence, Part-N series format per validated company format) |
| Content | Opinions, lessons-from-the-field, contrarian takes, mini case studies, comment-trigger offers | Series posts, carousels, release coverage, brand-format infographics |
| Links | Link-in-first-comment only | Same (TRAFFIC-STRATEGY.md rules stand) |

### Content format mix (weekly, across both)
- 2 × text-only insight posts (personal) — highest reach format for B2B thought leadership
- 1 × carousel (SketchCarousel/LinkedInCarousel PDF via pipeline) — highest engagement format (6.6%)
- 1–2 × company series posts (existing manifest pipeline)
- 1 × comment-trigger lead-magnet post (bi-weekly, personal)

### Engagement beyond posting (30 min/day, Tue–Fri)
1. **Strategic commenting** — substantive comments on posts by Bruno Portaluri (7.3K followers), Maximo Secrets, MORE Maximo Community, Naviam/Cohesive posts, and IBM Maximo product leads. This is where the 15K-strong Maximo LinkedIn audience actually congregates.
2. **Reply-to-every-comment within 4 hours** on own posts (algorithm window).
3. **Warm DM sequence** (never pitch-first): connect with context → one value drop (relevant TMG deep-dive) → only after engagement, offer a free 20-minute gap review.

### Lead capture mechanism
- Comment-trigger → DM → opt-in page (newsletter + magnet) — the standard funnel.
- Substantive commenters on technical posts get a tailored DM with the matching blog post; if they're at a Maximo shop, follow with the relevant productized package one-pager.
- Profile optimization: headline names the services ("MAS 9 upgrades · MVI · Health · Maximo customization"), featured section pins the two deadline lead magnets + services page.

### 90-day action plan
- **Days 1–14:** Optimize personal profile (headline, featured, about → services); resume/verify company manifest schedule in content-calendar.json.
- **Days 15–45:** Personal cadence to 3–4/week using MicroBlog repurposing from MAS-MANAGE + AI-suite series; start daily strategic commenting; first comment-trigger campaign.
- **Days 46–90:** MaximoWorld Nashville (Aug 17–20) content surge — daily posts during event week; DM campaign to engaged connections about Q4 Control Desk deadline.

### KPIs
| Metric | 90 days | 6 mo | 12 mo |
|---|---|---|---|
| Personal followers | +600 | +1,800 | +4,000 |
| Company followers | 500 | 1,500 | 3,000 |
| Engagement rate | ≥3% | ≥4% | ≥5% |
| DM conversations → calls | 3 | 10 | 24 |

---

## 5. X/Twitter — Developer Discovery Satellite

**Role vs LinkedIn:** LinkedIn reaches Maximo *decision-makers and admins*; X reaches the *developer/infra crowd* (OpenShift, Kubernetes, automation scripting, AI engineering) who increasingly hold veto power over MAS architecture decisions — and X content gets indexed by AI search engines, reinforcing GEO (§7). X is a **discovery and citation channel, not a primary lead channel**. Honest assessment from the existing Twitter-STRATEGY.md stands: 6/10 relevance.

### Content pillars
1. **OpenShift/MAS infrastructure** — the #1 unaddressed skills cliff in the niche ("Maximo admins are not Kubernetes people"). Example: short thread "5 OCP prerequisites that stall every MAS 9 upgrade."
2. **Automation scripting recipes** — Jython/JS launch points, custom REST APIs via `/oslc/script/`. Example: single post with code screenshot + one-line lesson.
3. **AI-in-MAS build-in-public** — Maximo Assistant, AI Service, agentic CBM experiments. Example: "I pointed Maximo Assistant at a custom object today. Here's what broke."
4. **Deadline countdowns** — "{N} days until Control Desk support ends. Migration checklist: 🧵"

### Repurposing workflow (zero net-new writing)
MDX post → MicroBlog skill extracts hook + 3 key points → 3–7 post thread (lead post = MarkerBoard 4:5 image, already generated for LinkedIn) → final post links the blog → thread URL logged in content-calendar.json. ~15 min per thread.

### Cadence, plan, KPIs
- **Cadence:** 3–4 posts/week (2 threads + 1–2 singles) + 15 min/day replying to OpenShift/EAM/IBM accounts. Solo-realistic; no daily-posting commitment.
- **90 days:** Weeks 1–2 profile setup + pinned lead-magnet post; weeks 3–8 two threads/week from MVI + REST API series (proven topics); weeks 9–12 evaluate — if <500 followers or zero newsletter referrals, cut to 1 thread/week and reinvest the time in LinkedIn commenting.
- **KPIs:** 500 followers / 5 newsletter referrals/mo by day 90; 1,500 followers by 12 mo. Kill-switch criteria explicit above.

---

## 6. Instagram — Conditional GO (Repurpose-Only Mode)

**Decision: GO, but strictly as a zero-net-production repurposing channel.** Reasoning: the Maximo community demonstrably lives on LinkedIn + IBM Community forums, not Instagram — it cannot be a lead channel and gets **zero original content budget**. But TMG already produces 4:5 portrait visuals (MarkerBoard, InfoBlocks, SketchNote) for every LinkedIn post, and carousels via SketchCarousel — re-uploading them costs ~10 min/week and builds a visual brand archive that supports recruiting, event presence, and the "is this company real?" procurement check. If repurposing ever exceeds 30 min/week, stop.

- **Visual format strategy → existing skills:** Feed posts = MarkerBoard 4:5 singles (already generated). Carousels = SketchCarousel slide PNGs (native multi-image, not PDF). Stories = event/MaximoWorld photos. NO Reels — video production is not in the solo budget.
- **Cadence:** 2 posts/week, batched Monday, 10 min total. No engagement obligation beyond replying to comments weekly.
- **90 days:** Set up business profile linked to company page → backfill 12 best existing visuals (2/week) → MaximoWorld photo coverage in August.
- **KPIs (vanity-tolerant):** 300 followers by 12 mo; success metric is simply "archive exists and costs <30 min/week."

---

## 7. Website & SEO/GEO — The Conversion Layer

This is the **highest-leverage gap**. TMG already ranks in Perplexity for MVI and REST API queries — proof GEO works — but the site has nowhere for that traffic to convert.

### Conversion gaps identified
1. **No services/packages pages** — Sanity has a `service` schema but no live productized offer pages. Traffic lands on blog posts and leaves.
2. **No `/newsletter` landing page** — newsletter has no destination URL for funnels.
3. **No lead magnets / gated assets** — zero email capture on 113 posts.
4. **No case-study proof** — caseStudy schema exists; no published case studies.
5. **Pillar pages planned but unbuilt** (`/maximo-9`, `/maximo-ai`, `/maximo-integration`, etc.) — 113 posts lack hub pages that consolidate cluster authority.

### Services/landing page recommendations (one per offering — see §8 for package definitions)
Each package gets a page at `/services/{slug}` with: outcome-first headline, who-it's-for, fixed scope + timeline, "typically $X–Y" commercial framing, FAQ section (schema-marked), matching case study link, and a single CTA (book diagnostic). These pages are the **landing targets for SEO, GEO, LinkedIn, and newsletter CTAs simultaneously**.

### SEO + AI-search (GEO) strategy — one surface, not two
- **Bottom-of-funnel pages first:** category ("Maximo MVI implementation partner"), comparison ("Maximo 7.6 extended support vs MAS 9 upgrade cost"), and jobs-to-be-done ("migrate Control Desk before end of support") keywords. These rank in Google AND teach LLMs when to recommend TMG.
- **Entity consistency:** "TheMaximoGuys", "themaximoguys.ai", author names, and service names used identically across site, LinkedIn, newsletter, and X — LLM citation correlates with consistent brand mentions.
- **FAQ-structured content:** every services page and pillar page gets question-phrased H2s with direct 2–3 sentence answers — the format AI engines lift. The existing `targetQuestions` frontmatter field across 113 posts is exactly this; surface them as visible FAQ blocks + FAQPage schema.
- **Schema markup audit:** Organization, Person (authors), Article/BlogPosting, FAQPage on all posts; Service schema on package pages. (Run the existing `seo-schema` skill against the Next.js site.)
- **Pillar pages:** build the 5 planned hubs; each internally links its series' posts — cluster authority for both Google and AI crawlers.

### Lead magnets tied to existing series
| Magnet | Source series | Funnel target |
|---|---|---|
| MAS 9 Upgrade Readiness Checklist | THINK-MAS + MAS-MANAGE | Upgrade Assessment package |
| Control Desk Exit Planner | (new, 1 post needed) | Control Desk Exit package |
| MVI Pilot Scoping Worksheet | MAS-VISUAL-INSPECTION (13 posts) | MVI Pilot package |
| Health Score Configuration Cheat Sheet | MAS-HEALTH (9 posts) | Health Quickstart package |
| Maximo REST API Cookbook (PDF) | MAS-INTEGRATION (9 posts) | Integration Sprint package |

### 90-day action plan
- **Days 1–30:** 6 services pages + `/newsletter` page live; FAQ blocks + schema on top-20 posts.
- **Days 31–60:** First 3 lead magnets shipped with gated download; 2 BOFU comparison posts ("7.6 Extended Support vs upgrading now: the real cost math", "Control Desk → Maximo IT: your 4 options before Dec 31").
- **Days 61–90:** `/maximo-9` and `/maximo-ai` pillar pages; GEO audit (test 20 buyer queries in Perplexity/ChatGPT/AI Overviews, log citations).

### KPIs
| Metric | 90 days | 6 mo | 12 mo |
|---|---|---|---|
| Organic sessions/mo | +30% | +75% | +150% |
| AI-engine citations (20-query test) | 4/20 | 8/20 | 12/20 |
| Magnet opt-in rate | ≥20% | ≥25% | ≥30% |
| Services-page → call conversion | 2% | 3% | 4% |

---

## 8. Micro-Project Services Funnel

### The six productized packages

| # | Package name | Scope (fixed) | Timeline | Anchor offer |
|---|---|---|---|---|
| 1 | **MAS 9 Upgrade Readiness Assessment** | 7.6/8.x estate review, OCP prerequisite check, de-customization inventory, sequenced roadmap | 2 weeks | Paid assessment (credit-card buyable; no procurement) |
| 2 | **Control Desk Exit Plan** | Current-state audit, Maximo IT vs alternatives decision matrix, migration scope + timeline before Dec 31, 2026 | 2 weeks | Paid scoping workshop |
| 3 | **MVI Pilot-in-a-Box** | One inspection use case: dataset prep, model train, deploy (incl. MVI Edge), operator handoff | 4–6 weeks | Fixed-fee pilot |
| 4 | **Health Quickstart** | Health scores + criticality config for one asset class, dashboards/KPIs, work-queue automation | 3–4 weeks | Fixed-fee implementation |
| 5 | **Integration Modernization Sprint** | MIF inventory, REST/Kafka target architecture, one interface rebuilt as proof | 3 weeks | Fixed-fee sprint |
| 6 | **Maximo Automation Sprint** | Backlog of customizations delivered as automation scripts/MAF config (not Java), 5-item fixed batch | 2 weeks | Fixed-fee batch |

Packages 1–2 are **deadline-driven door-openers** (cheap, fast, procurement-free); packages 3–6 are the follow-on builds. Every package page carries "typically $X–Y" framing — exact pricing decided at launch.

### Funnel stages: content touch → contract
1. **Discover** — blog post via Google/AI citation, LinkedIn post, X thread, or community answer.
2. **Capture** — content upgrade / comment-trigger / newsletter signup.
3. **Nurture** — welcome sequence (4 emails) + monthly flagship; every Product Deep-Dive CTAs the matching package.
4. **Diagnose** — 20-minute free gap review (booked from email/DM/services page) OR direct purchase of Package 1/2.
5. **Contract** — assessment/workshop output IS the proposal: findings + sequenced roadmap priced as packages 3–6.
6. **Compound** — delivery → anonymized case study → blog + carousel + newsletter → back to step 1.

Benchmarks to manage against (2026 B2B): magnet opt-in 20–40%, lead→call 20–40%, call→client 20–50%.

### Content-to-offer mapping
| Series (posts) | Feeds package |
|---|---|
| THINK-MAS (16) + MAS-MANAGE (12) | #1 Upgrade Assessment |
| MAS-ADMIN (10) | #1, #6 |
| MAS-VISUAL-INSPECTION (13) | #3 MVI Pilot |
| MAS-HEALTH (9) + MAS-MONITOR (9) + MAS-PREDICT (9) | #4 Health Quickstart |
| MAS-INTEGRATION (9) | #5 Integration Sprint |
| MAS-FEATURES (26) | #1, #6 + AI-niche authority |
| (new) Control Desk content — 2–3 posts needed | #2 Exit Plan |

### Proof & authority assets to build
1. **Three anonymized case studies** (situation → problem metric → 3–5 steps → numeric result) — first ones can come from TMG_Finances-adjacent warm clients; publish via existing caseStudy Sanity schema.
2. **Live demo asset per AI package** — a 5-minute recorded MVI defect-detection demo and a Health dashboard walkthrough; embedded on package pages, clipped for LinkedIn.
3. **Open tooling** — publish one small Maximo utility (e.g., automation-script test harness) on GitHub; the MxLoader precedent shows tools = lasting authority in this niche.
4. **MaximoWorld Nashville presence (Aug 17–20)** — attend minimum; engineer 10 face-to-face meetings from LinkedIn DM list.

---

## 9. Operations — Solo Weekly Rhythm (~12 hrs/week)

| Day | Block | Time |
|---|---|---|
| Mon | Batch week's visuals + schedule LinkedIn manifest + IG backfill + queue X threads | 2.5 h |
| Tue | Personal LinkedIn post + 30 min engagement + X replies | 1.5 h |
| Wed | Blog/BOFU writing block (BlogDraft/MaximoBlog skills) | 2.5 h |
| Thu | Personal LinkedIn post + 30 min engagement + DM follow-ups | 1.5 h |
| Fri | MaximoWire send (30 min) + X thread + week's metrics log | 1.5 h |
| Monthly (+1st week) | Flagship issue: 3-agent research pass + draft + edit | +4 h |
| Monthly | Case study or lead magnet build | +3 h |

Weekends off. This is deliberately under the 48–64 hrs/month the old MULTI-CHANNEL-STRATEGY assumed — channels that earned cuts (YouTube, Reddit-as-primary, Medium, podcast) move to "opportunistic only."

### Automation map (existing PAI skills — no new tooling)
| Step | Skill/tool |
|---|---|
| Draft blog posts | BlogDraft, MaximoBlog |
| Post → social micro-content | MicroBlog |
| Visuals | MarkerBoard (primary), InfoBlocks, SketchNote, BlueprintBoard, BlogCoverArt |
| Carousels | SketchCarousel, LinkedInCarousel |
| LinkedIn publishing + first comments | LinkedInPublishing (API + Playwright) — live |
| Calendar/state | `linkedin-calendar.ts` + content-calendar.json |
| Newsletter research pass | 3-agent prompts in `SocialMedia/EmailNewsletter/Prompts/` |
| CMS sync | `sync-blog-to-sanity.ts` |
| Schema/SEO audits | seo-schema, seo-technical, seo-audit skills |

---

## 10. 12-Month Roadmap & Measurement

### Quarterly milestones
- **Q3 2026 (Jul–Sep): LAUNCH + HARVEST THE SEP 30 DEADLINE.** Beehiiv live + Issues #001–003; 6 services pages + `/newsletter` page; 3 lead magnets; personal LinkedIn cadence; MaximoWorld Nashville (Aug 17–20); "September 30 Countdown" campaign across all channels. Exit criteria: 500 subs, first 2 paid assessments booked.
- **Q4 2026 (Oct–Dec): CONTROL DESK CLIFF + PROOF.** Dec 31 Control Desk campaign (countdown content, Exit Plan package push); 2 case studies published; X verdict (scale or cut); pillar pages `/maximo-9` + `/maximo-ai` live. Exit criteria: 900 subs, 2 Exit Plan workshops sold, 1 follow-on build contracted.
- **Q1 2027 (Jan–Mar): OWN THE AI-IN-MAS NICHE.** Content sprint on Maximo Assistant/AI Service/agentic CBM (still near-zero independent coverage); GEO audit #2; webinar/live teardown pilot; remaining pillar pages. Exit criteria: 1,400 subs, AI-series cited in ≥8/20 AI-engine test queries, 2 more micro-projects booked.
- **Q2 2027 (Apr–Jun): COMPOUND + DECIDE.** Double down on what converted (data from §10 dashboard); evaluate paid tier/community/course only if pipeline is saturated; refresh this strategy v2. Exit criteria: 2,000 subs, 6 total micro-projects delivered, 3 published case studies.

### Measurement dashboard (logged weekly, reviewed monthly)
| Channel | Metrics tracked |
|---|---|
| Newsletter | subs, open %, CTR, replies, calls sourced |
| LinkedIn | follower Δ (personal/company), engagement %, comment-trigger conversions, DM→call count |
| X | followers, thread impressions, newsletter referrals (UTM) |
| Instagram | time spent (must stay <30 min/wk), follower Δ |
| Website | organic sessions, magnet opt-in %, services-page conversion %, AI-citation score (20-query test) |
| Pipeline | diagnostic calls, assessments sold, packages contracted, revenue booked |

UTM discipline per TRAFFIC-STRATEGY.md taxonomy (`utm_source/medium/campaign/content`) on every cross-channel link.

---

## 11. Sources & Research Trail

- **Asset inventory:** `~/.claude/MEMORY/WORK/20260610-tmg-master-marketing-strategy/RESEARCH-asset-inventory.md`
- **Competitor & market landscape (triple-sourced, June 2026):** `.../RESEARCH-competitor-landscape.md` — Naviam merger, IBM lifecycle dates (AL 922-024, AD25-1237), content gaps, audience hubs
- **2026 B2B channel best practices (cited):** `.../RESEARCH-b2b-channel-best-practices.md` — HubSpot marketing statistics, CMI B2B research, Grow & Convert Pain-Point-SEO/GEO framework, lead-gen benchmark sources
- **Operational channel docs this strategy orchestrates:** `SocialMedia/EmailNewsletter/Strategy/EMAIL-STRATEGY.md` (v2), `SocialMedia/LinkedIn/Strategy/MARKETING-STRATEGY.md`, `SocialMedia/LinkedIn/Strategy/TRAFFIC-STRATEGY.md`, `SocialMedia/Strategy/MULTI-CHANNEL-STRATEGY.md`, `.claude/skills/LinkedInPublishing/SKILL.md`
