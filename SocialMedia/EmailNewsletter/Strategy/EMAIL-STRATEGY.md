# The Maximo Insider — Newsletter Strategy v2

**Newsletter:** The Maximo Insider
**Publisher:** TheMaximoGuys (themaximoguys.com)
**Strategy version:** 2.0 (2026-04-16) — supersedes the March 2026 v1
**Status:** Ready to launch with Issue #001 "The April 30 Cliff"
**Priority:** Tier 1 — Start Immediately

> *The practitioner's briefing on IBM Maximo — the product, the platform, the people, and the career.*

---

## What changed from v1

| Dimension | v1 (March 2026) | v2 (April 2026 — this doc) | Why |
|---|---|---|---|
| Cadence | Bi-weekly Thursday | **Monthly flagship + Weekly MaximoWire** | Monthly depth builds authority; weekly micro keeps TMG top-of-mind without subscriber burnout |
| Length | 800-1,200 words | **Monthly: ~1,500. Weekly: ~300** | Matches the section density the research revealed |
| Sections | Inherited from LinkedIn template | **8 dedicated sections** (see §4) | Each section ties to a specific practitioner signal (release, CVE, earnings, event, community, career, archive) |
| Platform | Beehiiv (agreed) | Beehiiv — kept | Full rationale in CREDENTIALS.md |
| Research engine | Ad hoc | **3-agent parallel research pass** documented in `../Prompts/` + `../Scripts/gather-research.md` | Repeatable, auditable, fact-checked every issue |
| Targets | 500 / 2k / 5k subs | Kept — see §10 | Still realistic, still aspirational |

---

## 1. The Whitespace

Three independent research streams (Perplexity, Grok, Claude) converged on
the same finding: **there is no genuinely independent, practitioner-first,
monthly Maximo newsletter** in the market.

| Publication | Format | Stance | Whitespace |
|---|---|---|---|
| Maximo Secrets (Andrew Jeffery) | Blog + podcast | Deep technical | No newsletter / no industry curation |
| Maximo and Beyond (Substack) | Newsletter | Career-focused | No technical depth |
| MaxLogic (Substack) | Narrow technical | REST API only | Too niche |
| Partner blogs (Interloc, Cohesive, Projetech, Naviam, Banetti, TRM) | Blog | Commercial agenda | Not independent |
| Rachel Stein's IBM Technical Touchpoint | IBM official | IBM-controlled | Not practitioner voice |

**TheMaximoGuys's slot:** independent + practitioner-first + full-stack
(technical + industry + corporate + career) + 102 existing deep-dive posts
to cite and drive traffic into.

**Audience reality check from research:**
- The Maximo community lives on **LinkedIn + IBM Community forums**, NOT X
  or Reddit (r/Maximo is nearly dead with ~1-2K subs)
- Average MAS consultant salary: **$160,765/year**; only ~32 MAS consultant
  jobs active on LinkedIn — a scarcity market hungry for career + technical
  signal
- **Security bulletins are the highest-click content** in the ecosystem
  (7 recent CVEs in 12 months — including CVE-2026-4820 LTPA flaw in April)
- MAS 8.7/8.8/8.9 hit full end-of-support **April 30, 2026** — creating
  immediate, time-urgent demand for authoritative coverage

---

## 2. Positioning

**One-line:** *The practitioner's monthly briefing on IBM Maximo — product,
platform, people, career.*

**Three editorial pillars:**

| Pillar | Covers | Ratio |
|---|---|---|
| **Signal** | Industry news, IBM updates, product releases, CVEs, events, analyst coverage | 35% |
| **Craft** | One featured technical deep-dive per issue, linked to a TMG blog | 35% |
| **Community** | LinkedIn pulse, career/jobs, IBM Champions, event recaps, meme-of-the-month | 30% |

**Voice:** Authoritative but informal. Opinionated where other sources are
neutral. Honest about uncertainty. Cite every claim. Never shill for any
partner (independence is our edge).

---

## 3. Cadence

### Monthly flagship (1st Tuesday, 08:00 ET)
- ~1,500 words / 10-minute read
- 8 dedicated sections (see §4)
- Each issue pulls from a dedicated `../Research/YYYY-MM/` fact-check trail

### Weekly MaximoWire (Fridays, 08:00 ET)
- ~300 words / 2-minute scan
- 3 sections: one new TMG post, one industry signal, one LinkedIn thread
- Purpose: keep TMG top-of-mind between monthly issues

**Rationale for monthly + weekly over bi-weekly:** bi-weekly risks the
worst of both worlds — too frequent to sustain depth, too infrequent to
feel urgent. Monthly = genuinely deep. Weekly = friction-free. Two formats,
two jobs.

---

## 4. Monthly Flagship Section Template

```
┌─────────────────────────────────────────────────────────────────┐
│  THE MAXIMO INSIDER — Issue #N                                  │
│  The practitioner's brief on IBM Maximo                         │
└─────────────────────────────────────────────────────────────────┘

1. THE LEDE — one story that matters most this month (200 words)
   └── Links to a TMG post that contextualizes it

2. RELEASE RADAR — MAS patch versions, release notes, security CVEs
   └── Bullet list with IBM Support URLs + Interloc monthly rollup

3. IBM CORPORATE BEAT — earnings, exec moves, acquisitions
   └── Translated: "What this means for your day job"

4. PRODUCT DEEP-DIVE — featured TMG technical blog of the month
   └── Full link + 2-paragraph summary + "Read the full post →"

5. TECHXCHANGE & EVENTS — upcoming user groups, Community Days, conferences
   └── 90-day forward calendar with registration links

6. COMMUNITY PULSE — 3-5 LinkedIn posts worth reading (with embeds)
   └── IBM Champions news, Bruno Portaluri threads, IBM product-team posts

7. CAREER CORNER — jobs, salary benchmarks, certification updates
   └── Aggregated LinkedIn + ZipRecruiter data

8. THE ARCHIVE — 3 curated TMG posts relevant to current news
   └── Traffic driver; picks from 102-post backlog

[ CTA: Share · Subscribe · Browse themaximoguys.com ]
```

Full template: `../Content/Templates/monthly-issue.md`
Weekly template: `../Content/Templates/weekly-wire.md`

---

## 5. Distribution Stack

**Primary platform: Beehiiv** (on `mail.themaximoguys.com`)

| Platform | Verdict | Why |
|---|---|---|
| **Beehiiv** | ✅ Pick this | Paid-feature parity with Substack, better deliverability, custom domain support, native recommendations network, no revenue share, ads marketplace |
| Substack | ❌ | Skims 10%; reader UX optimizes for Substack's brand not yours; LinkedIn-unfriendly embeds |
| ConvertKit/Kit | ⚠️ | Good if you go heavy paid-subscription; overkill at launch |
| Mailchimp | ❌ | Deliverability degraded; expensive at scale |
| Sanity-native email | ❌ | Build cost outweighs benefit |

**Distribution pipeline:**
1. Draft in `../Content/Editions/NNN-slug/DRAFT.md`
2. Load into Beehiiv for preview + scheduling
3. Send at 08:00 ET
4. T+1: repost featured deep-dive as LinkedIn article (company + personal)
5. T+3: archive FINAL.md into Sanity as `/newsletter/SLUG` for SEO capture
6. T+7: Weekly MaximoWire ships Friday

See `CREDENTIALS.md` for what's needed to turn this on.

---

## 6. First Issue — Issue #001 "The April 30 Cliff"

**Send date:** Tuesday 2026-04-28 (two days before MAS 8.x EOS)

**Why this issue first:**
- Topical timing — 2 days before MAS 8.7/8.8/8.9 end-of-support
- Taps existing TMG content (platform-shift + integration + migration posts)
- Natural LinkedIn virality (every MAS practitioner will share it)
- Establishes the cadence + format everything else follows
- Cost: ~4 hours to draft

**Content blueprint:** see `../Content/Editions/` once `scripts/new-issue.sh
001 april-30-cliff` is run.

**Top stories to cover (from April 2026 research):**
- MAS 8.7/8.8/8.9 full EOS April 30, 2026
- MAS 9.1.14 + AI Service 9.1.13 (March 26 release)
- CVE-2026-4820 (LTPA cookie flaw)
- IBM Q1 2026 earnings (April 22) — watch software growth
- IBM's $11B Confluent acquisition (Dec 2025) — Kafka coming to MAS IoT
- MaximoWorld moves to SF May 19–20 (from Phoenix — news beat)
- 2026 IBM Champions class — Jennifer Gatza, Pam Denny, Michael Guns, Rick Crory (Maven)
- BIRT phase-out urgency (no hard EOS date, but migration clock ticking)

Research briefings are in `../Research/2026-04/` (Perplexity, Grok, Claude).

---

## 7. 90-Day Editorial Calendar

| Issue | Date | Lede | Featured Deep-Dive |
|---|---|---|---|
| #001 | 2026-04-28 | "The April 30 Cliff" — MAS 8.x EOS | Maximo AI Service 9.1.14 deep dive |
| #002 | 2026-05-05 | MaximoWorld SF preview | Event survival guide + 5 must-see sessions |
| #003 | 2026-06-02 | "MAS 9.2 on the horizon" (expected June) | Confluent + Kafka + MAS IoT: what's coming |
| #004 | 2026-07-07 | Mid-year MAS roadmap recap | watsonx Orchestrate + Maximo: build your first agent |

Weekly MaximoWire drops every Friday between issues.

---

## 8. Technical Blog Topic Plan — Next 10 Posts

SEO-grounded based on the 398 tags in Sanity + real 2026 search demand.
Each post pairs with a LinkedIn infographic via `LinkedInPublishing` skill.

| # | Proposed title | Series | SEO intent | Why it'll rank |
|---|---|---|---|---|
| 1 | Maximo AI Service Explained: What You Get in 9.1.14 | MAS-FEATURES update | informational | Hottest product story; IBM's own announcement links only to partner writeups — rank opportunity |
| 2 | MAS 8.x to MAS 9.1 Upgrade: The April 30 EOS Playbook | Standalone | transactional | 14 days to EOS; high-intent traffic; pairs with Issue #001 |
| 3 | Build Your First Maximo Agent with watsonx Orchestrate (Step-by-Step) | New MAS-AI series | tutorial | Uses IBM's open-source repo; long-tail + GitHub-driven traffic |
| 4 | CVE-2026-4820 Explained: The LTPA Cookie Flaw in Your MAS | Standalone security | informational | Security content is highest-click per research findings |
| 5 | Maximo Monthly Security Bulletin — April 2026 | New recurring series | informational | Recurring series = predictable SEO + reliable email content |
| 6 | The End of BIRT: Your Migration Options in MAS 9.1 | MAS-FEATURES | transactional | BIRT phase-out confirmed; no hard EOS date; searchable pain |
| 7 | MAS on Azure Red Hat OpenShift (ARO): The Complete Deployment Guide | New MAS-CLOUD series | tutorial | ARO is IBM-validated; few independent write-ups exist |
| 8 | TRIRIGA to Maximo Real Estate & Facilities: The Migration Reality | MAS-FEATURES | informational | Rebrand story; all current content is vendor blogs |
| 9 | Java 17 in MAS 9.1: What Admins Must Do Before Upgrading | MAS-ADMIN | tutorial | High technical detail, low current supply |
| 10 | Confluent, Kafka, and the Future of Maximo IoT | THINK-MAS | thought-leadership | Forward-looking; positions TMG as analyst-grade |

**Cadence:** 2 new technical posts per week.

---

## 9. Traffic Playbook

### A. SEO foundation
1. ✅ **Author attribution fixed** (2026-04-16) — 94 posts under "The Maximo Guys" brand, 10 MAS-ADMIN under Posam → site-wide E-E-A-T improved
2. Build **5 pillar pages** on themaximoguys.com that internally link the 102 posts:
   - `/maximo-9` → MAS-FEATURES + THINK-MAS
   - `/maximo-admin` → MAS-ADMIN
   - `/maximo-ai` → MAS-HEALTH + MAS-MONITOR + MAS-PREDICT + MVI
   - `/maximo-integration` → MAS-INTEGRATION
   - `/maximo-migration` → migration content from all series
3. Schema.org Article markup on every post (`seo-schema` skill exists in stack; audit needed)
4. Internal linking audit — every new post links 3-5 older TMG posts via tag overlap
5. **Consolidate 398 tags → ~50 canonical tags** — current sprawl dilutes tag-page SEO

### B. Distribution engine
1. **LinkedIn is the center of gravity** (confirmed by all three researchers)
   - Existing LinkedInPublishing pipeline is the single most valuable asset
   - Every new post → company + personal with infographic
   - Every newsletter → LinkedIn article repost of the featured deep-dive
2. **IBM Community cross-posts** — summaries (not full content) back to themaximoguys.com. Community members are explicitly encouraged to share; non-IBMer status makes this clean
3. **Comment game** — be the first thoughtful reply on Rachel Stein, Bruno Portaluri, Kalman Gyimesi, Hideki Inoue posts. Link to your deep dive when genuinely useful
4. **Guest posts** on Naviam, Interloc, Starboard, MaxLogic (link-building + audience reach)
5. **Podcast circuit** — pitch Maximo Secrets (Andrew Jeffery), Reliabilityweb podcasts

### C. Email ↔ Site flywheel
1. Every newsletter links into 5+ TMG posts (archive alone = 3 internal links, plus deep-dive + references)
2. Embedded signup forms on every blog post sidebar + footer (3-5x growth vs. footer-only)
3. `/newsletter` landing page with archive grid + signup — ranks for branded "Maximo newsletter" search over time
4. Search-optimize subject lines: "MAS 8 EOS: The April 30 Playbook" beats "Issue #1"

### D. Community assets
1. Private LinkedIn group: "Maximo Practitioners by TheMaximoGuys" (invite-only from blog readers)
2. Quarterly webinar on Zoom → YouTube → blog embed
3. Annual "State of Maximo" report — original data + community survey (the link-magnet of the year)

---

## 10. Metrics & KPIs

### Leading indicators (weekly review)
- Newsletter subscribers added
- LinkedIn follower growth (company + personal)
- Top 10 blog posts by sessions
- Search Console impressions + CTR
- Top search queries driving traffic

### Lagging indicators (monthly review)
- **Total organic sessions** — the single north-star number
- Newsletter open rate (target: 45%+)
- Newsletter click-through rate (target: 10%+)
- Return visitor rate (target: 30%+)
- Ranking positions for top 20 target keywords

### Subscriber growth targets (kept from v1)

| Month | Subscribers |
|---|---|
| 3 | 500 |
| 6 | 2,000 |
| 12 | 5,000 |

### Vanity metrics to ignore
- Social followers without engagement
- Post-by-post likes
- One-off signup spikes without retention

---

## 11. 30 / 60 / 90-Day Action List

### Next 30 days (Apr 16 – May 16)
- [ ] Set up Beehiiv account; verify DKIM/SPF on `mail.themaximoguys.com`
- [ ] Build `/newsletter` landing page in the Next.js site
- [ ] Embed Beehiiv signup form on blog post sidebars + footer
- [ ] Write and ship Issue #001 "The April 30 Cliff" — drop April 28
- [ ] Publish 2 technical blogs from top-10 list (AI Service deep-dive + MAS 8 upgrade playbook)
- [ ] Audit tag bloat in Sanity: 398 → ~50 canonical tags
- [ ] Build 2 pillar pages (`/maximo-9`, `/maximo-admin`)

### Days 31–60 (May 17 – Jun 16)
- [ ] Issue #002 (MaximoWorld preview) — drop May 5
- [ ] Attend MaximoWorld SF May 19–20; publish live daily recaps
- [ ] 4 more technical blogs (2/week cadence)
- [ ] Launch first weekly MaximoWire
- [ ] Launch private LinkedIn practitioners group

### Days 61–90 (Jun 17 – Jul 15)
- [ ] Issue #003 (MAS 9.2 preview) — drop June 2
- [ ] Issue #004 (mid-year roadmap + first watsonx Orchestrate tutorial) — drop July 7
- [ ] Guest posts on 2 partner blogs
- [ ] First webinar recorded + published
- [ ] Pitch 3 Maximo podcasts
- [ ] Full traffic review; adjust based on actual data

---

## 12. Risk & Honesty Flags

- **Don't pretend X/Twitter is where Maximo lives** — Grok researcher was
  explicit: discourse is on LinkedIn + IBM Community. "Featured Tweets" as
  a section will feel padded. Use "From LinkedIn" instead.
- **Don't over-lean on Reddit** — r/Maximo has ~1-2K subs. IBM Community
  forums are 10x more active.
- **Partner blogs aren't enemies, but they aren't neutral** — Interloc,
  Naviam, Projetech, etc. publish high-quality content. TMG's edge is
  *independence*. Never take their money for coverage.
- **Don't over-promise AI** — ground coverage in what actually ships
  (per the AI Service 9.1.14 reality) rather than IBM marketing.
- **IBM certification gap** — no MAS 9.1 admin cert exists yet. Don't
  invent one in posts.

---

## 13. The Single Bet

If you do one thing from this plan: **ship Issue #001 by April 28.**

- Topical timing — 2 days before EOS
- Taps existing TMG content (migration + platform-shift posts)
- Natural LinkedIn virality
- Establishes cadence + format for everything after
- Cost: ~4 hours

Beehiiv setup, pillar pages, 10-post backlog — all can follow in the two
weeks after #001. **Ship first, perfect later.**

---

## Operating files in this folder

| File | Purpose |
|---|---|
| `EMAIL-STRATEGY.md` | This document. Updated monthly or when strategy shifts. |
| `CREDENTIALS.md` | All API keys and accounts needed. Updated when tokens rotate. |
| `../Content/Templates/monthly-issue.md` | Flagship issue template. |
| `../Content/Templates/weekly-wire.md` | Weekly micro template. |
| `../Content/Editions/NNN-slug/` | Each issue's draft + final + sources (created by `../Scripts/new-issue.sh`). |
| `../Prompts/monthly-research-*.md` | Research prompts for the 3-agent monthly pass. |
| `../Research/YYYY-MM/` | Archived research briefings. Never deleted. |
| `../Scripts/new-issue.sh` | Scaffolds a new issue. |
| `../Scripts/gather-research.md` | How to run the monthly research pass. |

---

## References — Research behind this strategy

Three parallel research streams conducted 2026-04-16:
- Perplexity → `../Research/2026-04/perplexity.md` (IBM Maximo product news)
- Grok → `../Research/2026-04/grok.md` (X/corporate/community signal)
- Claude → `../Research/2026-04/claude.md` (TechXchange + IBM official blogs)

Transient session transcripts in `MEMORY/WORK/20260416-160000_tmg-newsletter-strategy/`.
