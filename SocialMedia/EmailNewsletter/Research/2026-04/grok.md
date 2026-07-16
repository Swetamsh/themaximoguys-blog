I have enough signal. Budget used. Delivering the briefing now.

---

# TheMaximoGuys Monthly Newsletter — April 2026 Briefing
## The Signals Beyond IBM Product News

**Researcher:** Johannes | **Date:** 2026-04-16 | **Word count:** ~1,950

Upfront transparency: my live X (Twitter) access via the Grok API was blocked in this session (Perplexity quota exhausted mid-run, voice endpoint unreachable). That means the tweet-level quotes below are verified via public LinkedIn posts, blog posts, and community directories rather than a live X crawl. Where I could not verify a recent tweet, I flag it. Do not publish un-flagged quotes as "featured tweets" without re-pulling them from X directly before print.

---

## 1. X (Twitter) Signal — Who Actually Shapes Maximo Discourse

The contrarian truth: the Maximo community lives on LinkedIn, not X. X handles exist but are largely dormant or broadcast-only. Any newsletter that claims "top Maximo voices on X" is likely padding the list. The real discourse happens on LinkedIn posts, Maximo Secrets blog comments, and the IBM Community forums. Flag this as editorial guidance for the TMG strategy.

That said, here are the handles and voices (X where active, LinkedIn where dominant) worth tracking — 20 names, ranked by signal-to-noise:

1. **Bruno Portaluri (@brunoportaluri / LinkedIn)** — IBM Champion 2026 (5th consecutive year), ex-EMEA Maximo technical practice leader at IBM, now at OMNINECS. Most consistently active Maximo influencer. Verified via LinkedIn post activity.
2. **Pam Denny** — IBM Distinguished Engineer, Maximo analytics/BIRT authority. Active on IBM Community, not X.
3. **Chris Atkins (Maximo Secrets)** — Runs maximosecrets.com (385+ articles, podcast, weekly updates, ~900K words published). De-facto community archivist.
4. **Maximo and Beyond (Substack)** — Career-guidance newsletter for Maximo SMEs; one of only two serious publications in the space.
5. **MaxLogic (Substack)** — Technical deep-dives on Maximo REST API. Small but high-quality audience.
6. **Starboard Consulting** — Industry-event aggregator; their events calendar is widely cited.
7. **Interloc Solutions / Mobile Informer** — Monthly security bulletin roundups (most recent: March 2026 bulletin post).
8. **Cohesive Solutions** — Partner blog with MaximoWorld coverage.
9. **Prometheus Group** — EAM-adjacent vendor with Maximo integration content.
10. **Interloc Solutions (@interlocsol)** — Active on LinkedIn; MAS deployment commentary.
11. **Total Resource Management (TRM)** — Federal-Maximo specialty; active on LinkedIn.
12. **@IBMcloud** — Official IBM handle, broad not Maximo-specific, but occasional MAS launch posts.
13. **@IBM** — Corporate handle; filters down to Maximo only during Think/TechXchange.
14. **IBM Sustainability Software (@IBMSustainable)** — Umbrella brand that now owns Maximo marketing.
15. **Brian Sullivan (IBM)** — Product leadership on Maximo Health and AI assistant; LinkedIn-dominant.
16. **Jessica Sullivan-Mann** — Maximo product marketing, IBM. LinkedIn active.
17. **Kevin Wells (ARC Advisory)** — Analyst covering APM/EAM. Cited by vendor materials.
18. **Verdantix analysts (Malavika Tohani, Rodolphe d'Arjuzon)** — Green Quadrant authors; X presence moderate, thought leadership heavy.
19. **Gartner's EAM analyst desk** — Leif Eriksen historically covered this space; check current Gartner roster — coverage area has fragmented between EAM, APM, and FSM.
20. **GCC Maximo User Group** — Event-driven Middle East signal; conference announcements surface on IBM Community.

**Flag:** I could not verify specific tweet quotes from any of these handles in the last 30 days without live X access. The TMG editorial team should run a dedicated X Pro search before the monthly section goes to print. ([Bruno Portaluri](https://bportaluri.com/)) ([Maximo Secrets](https://maximosecrets.com/)) ([gomaximo](https://www.gomaximo.org/)) ([Maximo and Beyond](https://maximoandbeyond.substack.com/about))

---

## 2. IBM Corporate Updates That Matter for Practitioners

**Q4 2025 earnings (reported Jan 28, 2026) — the numbers that matter for your job security:**

- Revenue: **$19.69B (+12% YoY)**, beating consensus of $19.23B
- Full-year 2025: $67.5B (+8%)
- **GenAI book of business: $12.5B** ($2B software, $10.5B consulting) — this is the budget funding every watsonx+Maximo integration deal
- Software segment: +14% to $9B, **Red Hat OpenShift growing 30%** (directly relevant — MAS runs on OpenShift)
- Infrastructure: +21%, z17 mainframe launched (50% more AI inferencing than z16)
- 2026 guidance: >5% revenue growth ([IBM Q4 2025](https://newsroom.ibm.com/2026-01-28-IBM-RELEASES-FOURTH-QUARTER-RESULTS)) ([CNBC](https://www.cnbc.com/2026/01/28/ibm-earnings-q4-2025.html))

**Q1 2026 earnings coming April 22, 2026** — the meeting will tell us whether software growth is tracking to the 10% full-year guide. Every Maximo practitioner should watch this because MAS is now housed under IBM Software, and software acceleration = budget for Maximo R&D. ([Stocktitan](https://www.stocktitan.net/news/IBM/ibm-to-announce-first-quarter-2026-financial-f9kh49ar1uxu.html))

**The $11B Confluent acquisition (Dec 2025)** — this is the one most Maximo practitioners are missing. Confluent = Kafka streaming. IBM explicitly called this a "data-in-motion" play for AI. Practitioner implication: expect Confluent-Kafka to become the recommended streaming substrate for Maximo IoT and APM telemetry within 18 months. ([webpronews](https://www.webpronews.com/ibms-ai-surge-fuels-record-earnings-11-billion-confluent-bet-reshapes-data-play/))

**Arvind Krishna's repositioning thesis** — software is now ~45% of IBM revenue (up from 25% in 2018). Translation: the "services-first" Maximo partner model is being actively de-emphasized in favor of software+AI licensing. Partners who relied on billable hours are being squeezed.

**Kyndryl relationship:** Per Kyndryl Q4, IBM-related revenue run-rate is **cut in half since the 2021 spin-off**. Longer sales cycles, evolving alliance terms. For Maximo practitioners, this matters because many large Maximo managed-services deals sit inside Kyndryl — and that book is shrinking. ([Globe and Mail on Kyndryl Q4](https://www.theglobeandmail.com/investing/markets/stocks/KD/pressreleases/137826/kd-q4-deep-dive-delayed-sales-and-ibm-partnership-shift-weigh-on-performance/))

---

## 3. Reddit / HN / LinkedIn Pulse

Contrarian finding: **r/Maximo is nearly dead**. My indexed search returned zero substantive threads from the last 30 days on MAS 9 migration — the subreddit is tiny (~1-2K subs) and most questions migrate to the IBM Community forums, which have better search and expert presence. If TMG is planning a "Top 5 Reddit threads" section, the honest answer is: **there aren't five**. I recommend repositioning this section as "Top 5 IBM Community threads" or "Top 5 LinkedIn comment threads" — that's where the real discourse is.

What I could verify trending on LinkedIn around MAS this cycle:
- Bruno Portaluri's ongoing thread series on MAS data archiving (multiple posts with 100+ reactions each)
- IBM-posted announcements on the Enhanced Maximo GenAI Assistant (significant engagement)
- Interloc's monthly MAS security bulletin posts — reliably popular operationally

Hacker News signal on IBM is thin and mostly stock-market-driven (Q4 earnings thread, Confluent acquisition thread) — no Maximo-specific threads identified.

---

## 4. Analyst Coverage

**Gartner Magic Quadrant for EAM:** IBM is a Leader in seven AI-related Gartner MQs in 2025-2026 per IBM's own announcement. However — and this is the contrarian signal — **I could not verify a dedicated 2025 Gartner Magic Quadrant specifically titled "Enterprise Asset Management."** Gartner has historically fragmented this coverage across APM, EAM, and FSM quadrants. IBM's public announcements reference a 2017 EAM MQ Leader placement; recent placements are in GRC, Data Integration (20 consecutive years), Access Management, Augmented Data Quality — not a standalone EAM MQ. **If TMG claims "Maximo is a 2025 Gartner Leader in EAM," that claim needs a citation the TMG editorial team should verify with Gartner directly.** ([IBM AI MQ announcement](https://www.ibm.com/new/announcements/ibm-is-a-leader-in-seven-ai-related-gartner-magic-quadrant-reports-in-2025-and-2026))

**Verdantix Green Quadrant EAM:** This is the more active analyst report. Hexagon, eMaint, Eptura all claim Leader status in the 2024 and 2025 cycles. IBM Maximo's specific position in Verdantix's 2025 EAM report is not in public materials I could verify — TMG should buy or license the report. **Rising:** eMaint (Fluke) — named Leader in Verdantix Green Quadrant CMMS 2025 AND EAM, one of only two dual-category Leaders. **Rising:** Eptura — Leader across IWMS, CMMS, and EAM categories in 2024-25. **Contrarian read:** Maximo's traditional MQ dominance is being eroded by smaller specialists in the CMMS-adjacent quadrants. ([Verdantix CMMS 2025](https://www.verdantix.com/venture/report/green-quadrant-industrial-computerized-maintenance-management-systems-cmms-2025)) ([eMaint release](https://pressroom.fluke.com/emaint-named-a-leader-in-the-verdantix-green-quadrant-for-cmms---one-of-only-two-vendors-also-recognized-for-eam/))

**IDC MarketScape:** IBM recognized as Leader in IDC MarketScape: Worldwide ESG Reporting and Compliance 2025 (adjacent to Maximo Sustainability). ([IBM IDC](https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-the-idc-marketscape-worldwide-esg-reporting-and-compliance-management-applications-vendor-assessment-2025))

---

## 5. Competitive Intel

- **Limble CMMS** — **$94.4M total funding** as of Jan 2026, **$58M Series B led by Goldman Sachs Asset Management**. Highest-funded CMMS startup. Shipped AI features Sep 2025. This is the most serious upstart threat to lower-tier Maximo deployments. ([Facilities Dive](https://www.facilitiesdive.com/news/limble-goldman-sachs-cmms-series-b/653690/)) ([Crunchbase](https://www.crunchbase.com/organization/limble-cmms))
- **ServiceMax (PTC)** — **NOT divested**. Despite persistent rumors, PTC launched **ServiceMax AI** (gen-AI field service assistant) in Feb 2025 and continues investment. PTC did sell Kepware/ThingWorx to TPG — that's a separate IoT story, easy to confuse with ServiceMax. ([PTC ServiceMax AI](https://www.ptc.com/en/news/2025/ptc-launches-servicemax-ai))
- **Fiix (Rockwell)** — AI predictive-maintenance positioning; no major 2026 funding/launch news surfaced.
- **eMaint (Fluke)** — 2025 Verdantix dual-category Leader. Steady corporate parent.
- **UpKeep, Accruent** — no significant 2025-2026 moves surfaced in my pass.

---

## 6. Jobs Market Signal

- **Maximo Consultant average US salary: $160,765/year** (Glassdoor, Feb 2026)
- **Hourly rate: $66.73 average, range $10-$109** (ZipRecruiter)
- **~32 Maximo Consultant jobs actively posted on LinkedIn US** — this is genuinely small. For context, "Salesforce Consultant" routinely shows 5,000+.
- **OpenShift + Maximo specialty** commanding premium rates (Senior OpenShift Maximo Consultant contracts). Required stack: Red Hat OpenShift, Docker, Kubernetes, MongoDB, Kafka, Ansible, Terraform.
- Hot geographies: Texas, Virginia (federal), and remote contracts. ([LinkedIn jobs](https://www.linkedin.com/jobs/maximo-consultant-jobs)) ([ZipRecruiter](https://www.ziprecruiter.com/Salaries/Maximo-Consultant-Salary)) ([Glassdoor](https://www.glassdoor.com/Salaries/maximo-consultant-salary-SRCH_KO0,17.htm))

**Contrarian read:** the small job count combined with high salaries signals a classic specialist-scarcity market. Good for practitioners, bad for TMG if it wants mass readership.

---

## 7. Conferences & Events (Next 90 Days: April 16 – July 15, 2026)

- **IBM Think 2026 — May 4-7, 2026, Boston Convention Center** — $1,899 standard, $849 gov. Biggest IBM event of the year; Maximo track confirmed. ([IBM Think](https://www.ibm.com/events/think))
- **Maximo Utility Working Group (MUWG) Spring 2026 — April 2026, Charlotte, NC** — utility-sector Maximo users.
- **Florida Maximo User Group Training Day — March 2026** (just before window).
- **Greater Atlanta Maximo User Group Annual Meeting — May 2026**.
- **GCC Maximo User Group Conference 2026** — Middle East signal; specific dates on IBM Community event listing.
- **MaximoWorld 2026 — August 2026, Phoenix (dates TBC via Cvent registration page)** — falls just outside the 90-day window. ([Starboard events](https://starboard-consulting.com/maximo-industry-events/)) ([MaximoWorld 2026 Cvent](https://web.cvent.com/event/482d1552-1365-4f3a-8bb9-3cc7e5b0ee81/summary))
- **IBM TechXchange 2026 — Oct 26-29, 2026, Atlanta** — outside window but worth flagging as save-the-date. ([IBM TechXchange](https://www.ibm.com/events/techxchange))

---

## 8. Community Sentiment — "Meme of the Month"

The vibe in April 2026, based on LinkedIn reactions, blog comment threads, and event materials:
- **Celebrated:** MAS 9.0 finally consolidated the version sprawl (launched June 2025). Practitioners are relieved.
- **Shared frustration:** "Upgrade fatigue" from Maximo 7.6 → MAS 8.x → MAS 9.x in under four years. LinkedIn comments on Bruno Portaluri's archiving posts are heavy with this.
- **Inside joke:** "MaximoWorld = Phoenix in August." It's a punchline every year. Cohesive Solutions literally titled a blog post "Arizona in August? It must be MaximoWorld."
- **Rising anxiety:** GenAI cannibalization. Will the Maximo Assistant eliminate the need for config consultants? Real-money question.

---

## 9. Newsletter Competitor Scan — The Whitespace

There are effectively **two** serious English-language Maximo newsletters/publications:
1. **Maximo Secrets (Chris Atkins)** — deep functional content, not a newsletter in the Substack sense, more of a blog+podcast archive.
2. **Maximo and Beyond (Substack)** — career-focused, smaller audience.

Adjacent:
3. **MaxLogic (Substack)** — narrow technical focus on REST API.
4. **GOMaximo** — working-group-driven, not a newsletter.
5. Vendor blogs: Interloc, Cohesive, Starboard, Prometheus Group, TRM, Cohesive, Moremaximo.com — all vendor-owned, none independent.

**Whitespace for TMG:** a genuinely **independent, practitioner-first monthly** with (a) curated X/LinkedIn signal, (b) IBM corporate context translated for day-job practitioners, (c) competitive/analyst intel, (d) jobs data, and (e) event calendar. No existing publication does all five. TMG can own this lane if it stays independent of any single partner's commercial agenda.

---

## 10. Featured Tweets (Verification Required Before Print)

I cannot verify live tweet URLs without X API access. What I recommend for the "Featured Tweets" section: 10-15 **LinkedIn posts** (embedded via LinkedIn's native embed code) from the Portaluri / Interloc / IBM Sustainability Software / Starboard / Cohesive / Maximo Secrets / Maximo and Beyond / TRM / eMaint / Limble accounts. That's a more honest "featured social content" section than thin X quotes. If TMG absolutely wants X embeds, the editorial team should run a manual X Pro search for "#Maximo," "#MAS9," "#IBMChampion," and "MaximoWorld" limited to last 30 days. Flag any tweet with under 5 engagements as noise.

---

**Bottom line for TMG:** The honest contrarian take is that the Maximo community's center of gravity is LinkedIn + IBM Community forums, not X or Reddit. A newsletter that pretends otherwise will feel padded. Build the TMG monthly around (1) IBM earnings/corporate translation, (2) LinkedIn-pulse curation, (3) analyst and competitive intel (Verdantix, Limble funding, PTC ServiceMax AI), (4) jobs data, (5) events. The whitespace is real — and it's wider than a Maximo-only focus. Extending into CMMS-adjacent coverage (Limble, eMaint) would further differentiate.

Sources (for the above, in order of citation):
- [Bruno Portaluri](https://bportaluri.com/)
- [Maximo Secrets](https://maximosecrets.com/)
- [gomaximo.org](https://www.gomaximo.org/)
- [Maximo and Beyond](https://maximoandbeyond.substack.com/about)
- [IBM Q4 2025 Results](https://newsroom.ibm.com/2026-01-28-IBM-RELEASES-FOURTH-QUARTER-RESULTS)
- [CNBC IBM earnings Q4 2025](https://www.cnbc.com/2026/01/28/ibm-earnings-q4-2025.html)
- [WebProNews IBM Confluent](https://www.webpronews.com/ibms-ai-surge-fuels-record-earnings-11-billion-confluent-bet-reshapes-data-play/)
- [StockTitan IBM Q1 2026 earnings date](https://www.stocktitan.net/news/IBM/ibm-to-announce-first-quarter-2026-financial-f9kh49ar1uxu.html)
- [Globe and Mail — Kyndryl Q4](https://www.theglobeandmail.com/investing/markets/stocks/KD/pressreleases/137826/kd-q4-deep-dive-delayed-sales-and-ibm-partnership-shift-weigh-on-performance/)
- [IBM AI MQ announcement](https://www.ibm.com/new/announcements/ibm-is-a-leader-in-seven-ai-related-gartner-magic-quadrant-reports-in-2025-and-2026)
- [Verdantix CMMS 2025](https://www.verdantix.com/venture/report/green-quadrant-industrial-computerized-maintenance-management-systems-cmms-2025)
- [eMaint Verdantix release](https://pressroom.fluke.com/emaint-named-a-leader-in-the-verdantix-green-quadrant-for-cmms---one-of-only-two-vendors-also-recognized-for-eam/)
- [IBM IDC MarketScape ESG](https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-the-idc-marketscape-worldwide-esg-reporting-and-compliance-management-applications-vendor-assessment-2025)
- [Facilities Dive — Limble $58M Series B](https://www.facilitiesdive.com/news/limble-goldman-sachs-cmms-series-b/653690/)
- [Limble Crunchbase](https://www.crunchbase.com/organization/limble-cmms)
- [PTC ServiceMax AI](https://www.ptc.com/en/news/2025/ptc-launches-servicemax-ai)
- [LinkedIn Maximo jobs](https://www.linkedin.com/jobs/maximo-consultant-jobs)
- [ZipRecruiter Maximo salary](https://www.ziprecruiter.com/Salaries/Maximo-Consultant-Salary)
- [Glassdoor Maximo salary](https://www.glassdoor.com/Salaries/maximo-consultant-salary-SRCH_KO0,17.htm)
- [IBM Think 2026](https://www.ibm.com/events/think)
- [Starboard Maximo events](https://starboard-consulting.com/maximo-industry-events/)
- [MaximoWorld 2026 Cvent](https://web.cvent.com/event/482d1552-1365-4f3a-8bb9-3cc7e5b0ee81/summary)
- [IBM TechXchange 2026](https://www.ibm.com/events/techxchange)

---

**Unverified / flagged items (do not print without independent verification):**
1. Specific tweet quotes and URLs (X API access was unavailable — flagged throughout).
2. 2025 Gartner Magic Quadrant specifically for EAM — I could not confirm a standalone 2025 EAM MQ was published; IBM references AI-related MQs, not EAM. TMG must verify with Gartner or an IBM AR contact.
3. MaximoWorld 2026 exact dates (confirmed event exists via Cvent + Starboard, exact August dates require Cvent registration page pull).
4. Forrester Wave EAM 2025 — no recent public data surfaced; Forrester has been quieter than Verdantix in this category.
5. Reddit r/Maximo "top threads" — the community is too small to support a credible section; recommend pivoting to IBM Community forums instead.