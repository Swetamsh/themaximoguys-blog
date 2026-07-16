# Can an IBM Employee Publicly Publish About IBM Products Like Maximo?

**Research date:** 2026-04-16
**Scope:** IBM corporate policy, employment/IP law, lived employee experience
**Method:** Three independent research agents (Perplexity, Claude WebSearch, Grok) run in parallel and triangulated
**Sources:** 80+ citations — IBM policy documents, case law, legal commentary, trade press, community forums

---

## TL;DR — The Executive Answer

**Yes, an IBM employee can publish publicly about IBM Maximo — but with a sharp, consistent split:**

- 🟢 **Free educational content** (blogs, YouTube tutorials, free open-source tools, conference talks) with the standard IBM disclaimer is permitted and even encouraged.
- 🟡 **Monetized content** (paid courses, books with royalties, sponsored videos, SaaS) requires **written manager + legal approval** and is frequently denied.
- 🔴 **Paid side consulting on Maximo, competing products, or Maximo-branded commercial tools** are effectively prohibited while employed.

The strongest signal in the entire ecosystem: **the IBM Champions program explicitly bars current IBMers.** Every famous Maximo content creator — Pam Denny, Bruno Portaluri, Andrew Jeffery, Anthony Honaker — is an ex-IBMer or a partner-firm employee. That is not coincidence; it is the policy boundary made visible.

---

## 1. The Governing Rulebook

| Document | What it governs | Key clause |
|---|---|---|
| **IBM Business Conduct Guidelines (BCGs)** — "Trust Comes First" | Master ethics code, annual certification | §3.5.5 IP assignment; §5.1.1–5.1.4 outside work, competition, IBM time/assets |
| **IBM Social Computing Guidelines** (public since 2005) | Blogs, social media, YouTube | Permits personal blogging; requires standard disclaimer |
| **IBM Open Source Participation Guidelines (OSPG)** | Personal & work-time OSS | Annual training (60k+ IBMers); personal-email commits OK if not overlapping IBM products |
| **IBM Invention / IP Assignment Agreement** | Signed at hire | Claims inventions "whether developed at work or after hours" if they *relate to IBM's actual or anticipated business* |
| **IBM Trademark Policy** | "IBM," "Maximo," "MAS" usage | Text references OK (nominative fair use); **logos + product/domain names require a license** |
| **IBM Global Conflicts of Interest Supplement** | Outside activities disclosure | Written manager approval before monetized or competitive activity |

### The Standard Disclaimer (verbatim)

> "The postings on this site are my own and don't necessarily represent IBM's positions, strategies or opinions."

Required on every personal blog, YouTube channel, LinkedIn article, and social post where IBM is referenced. Applies to IBMers, with a *"special responsibility"* overlay for managers and executives who risk being read as speaking for IBM.

### Relevant BCG Clauses (§ from publicly archived 2019 edition)

- **§3.5.5 Confidential Information Agreement** — employees *"assign to IBM the rights to any ideas, inventions and computer programs and documents that you develop if they relate to the company's actual or anticipated business."*
- **§4.6 Using Trademarks** — correct spelling/formatting; use as an adjective.
- **§5.1.1 Assisting a Competitor** — no employment, consulting, or board role with a competitor without IBM's consent.
- **§5.1.2 Competing Against IBM** — no commercial marketing of products/services competing with IBM current or potential offerings. "Commercial activity" includes "direct or indirect remuneration of any kind."
- **§5.1.3 Supplying IBM** — no being/representing/working for a supplier to IBM.
- **§5.1.4 Use of IBM's Time and Assets** — no outside work on IBM premises, time, or equipment; no use of IBM materials, resources, or proprietary info.

---

## 2. GREEN / YELLOW / RED Zones

### 🟢 GREEN — permitted with disclaimer + self-compliance

- Personal blog / LinkedIn / YouTube tutorials on **publicly documented** Maximo features
- Speaking at conferences, user groups, and webinars (with manager awareness)
- Posting on IBM-owned real estate: `community.ibm.com`, `developer.ibm.com`, IBM Redbooks, `ibm.com/blog`
- Answering public questions on Stack Overflow, Reddit, IBM Community using public information
- **Free** open-source tools on personal GitHub under personal email with a README disclaimer
- Using "IBM®" and "Maximo®" as *text* references with the ® on first use and an "unaffiliated" footnote
- Charitable / philanthropic teaching (IBM India explicitly permits this with approval)

### 🟡 YELLOW — requires written approval + disclosure

- Udemy courses, paid newsletters, Patreon, YouTube monetization, ad revenue, sponsored content
- Books about Maximo — publishers will require IBM clearance regardless
- Open-source tools that interface Maximo APIs or automate Maximo workflows — file a **written disclaimer-of-ownership request** with IBM IP Legal *before* publishing
- Speaking with an IBM title on the bio — route through IBM Communications
- Any detailed technical content in a state with a §2870-style statute — use the disclaimer process; §2870 alone is not a safe harbor because Maximo *is* IBM's business

### 🔴 RED — effectively forbidden

- Paid external Maximo consulting while badged (IBM India: **explicitly prohibited** per the Oct 2022 Patel memo)
- Building a commercial Maximo-adjacent product or SaaS ("MaximoPro," "MaximoGPT," hosted add-on)
- Using "IBM" or "Maximo" as a **root domain** or **product name** (trademark violation, independent of employment)
- Publishing non-public info: internal roadmap, unreleased features, customer deployments, source code, RFCs, Slack/Box content (DTSA + BCG)
- Anonymous or pseudonymous posting about IBM
- **Texas-based IBMers**: any personal-time project "in any way connected" to IBM's contemplated business (Texas courts enforce these clauses literally — *Evan Brown v. Alcatel*)

---

## 3. Jurisdictional Reality Check

| Region | Posture | Why |
|---|---|---|
| **United States** | Moderate, state-dependent | **California Labor Code §2870** and **New York Labor Law §203-f** void IP assignment of personal-time work *unrelated* to the employer's business — but Maximo *is* IBM's business, so these statutes don't automatically protect Maximo-specific work. Texas enforces broadly. At least 9 states have §2870-style statutes. |
| **EU / UK** | Most permissive | GDPR + works-council off-hours protection. EU post-employment non-competes require paid garden-leave compensation (Germany §§74–75f HGB — 50% of last salary), making IBM rarely enforce them. |
| **India** | Most restrictive | October 26, 2022 **Sandip Patel memo** (IBM India MD): any paid second job is *"failure to comply with employment obligations and a potential conflict of interest."* Philanthropic/hobby work permitted with approval; paid tech gigs are out. Post-employment non-competes are void under §27 Indian Contract Act, but confidentiality and non-solicitation survive. |
| **Canada** | Restrictive on direct competition; permissive on content | |
| **Australia** | Permissive on content, restrictive on direct competition | |

### The October 2022 Indian Moonlighting Crackdown (critical context)

- **Sept 2022:** Wipro chairman Rishad Premji calls moonlighting *"cheating — plain and simple."* Wipro fires ~300 employees.
- **Oct 26, 2022:** IBM India MD Sandip Patel sends internal note: *"Moonlighting is not ethically right."* Defines "second job" broadly (full-time, part-time, contractual). Philanthropic/non-profit activity and non-tech hobbies (art, dance, music) explicitly carved out. Famous closing line: *"If it's gray, stay away or ask for clarification."*
- Unlike Wipro/Infosys, IBM did **not** publicly announce mass firings — deterrence-by-memo rather than example-by-execution.

---

## 4. The Most Revealing Signal: Who Owns the Maximo Content Economy

Every prominent Maximo content creator is an **ex-IBMer or partner-firm employee** — not an active IBMer:

| Creator | Platform | Current affiliation |
|---|---|---|
| **Pam Denny** | LinkedIn articles, IBM Community posts | Maven Asset Management (ex-IBM Maximo Offering Manager) — IBM Champion 2023 |
| **Bruno Portaluri** | [bportaluri.com](https://bportaluri.com/), MxLoader (paid), BIRT Advanced Reports, paid training | Independent Maximo consultant |
| **Andrew Jeffery** | [maximosecrets.com](https://maximosecrets.com/) — 385+ posts, podcast, YouTube, quizzes | Naviam — IBM Champion, 29 years Maximo experience |
| **Anthony Honaker** | TRIMax conference talks, Cohesive blog | Cohesive Solutions (ex-IBM Maximo Product Strategy) |

### The Structural Tell: IBM Champions Program

From the official nomination form (`ibm.com/community/ibm-champion-nominate/`):

> "An IBM Champion is a **non-IBMer** IT professional, business leader, developer, or educator who influences and mentors others through blogging, speaking at conferences, moderating forums, leading user groups, and authoring books or articles."

IBM's own public-advocacy recognition program bars current IBMers. This is the policy boundary codified as a membership criterion.

### The Ex-IBMer Maximo Ecosystem

The entire Maximo services market is an IBM-alumni ecosystem:

- **MRO Software** — Founded 1968 by Bob Daniels (MIT civil engineer, named Maximo after his favorite polo pony). Acquired by IBM in August 2006 for $739M.
- **Projetech** — Founded 1999. #1 Maximo-as-a-Service provider globally. IBM Gold Partner.
- **Interloc Solutions** — Founded 2005 by Mike Watson; leadership includes multiple IBM alumni, including a former Senior Partner/Global Leader in Asset and Manufacturing Optimization and a former Business Unit Executive for IBM's IoT division who led Maximo/Rational/TRIRIGA support.
- **BPD Zenith** — IBM Maximo partner since the software's early years.
- **Maxview Solutions** — Founded 2019 by ex-IBM Maximo product developers.
- **Naviam** — 2024-2025 rollup of ActiveG, BPD Zenith, EAM Swiss, InterPro Solutions, Lexco, Peacock Engineering, Projetech, Sharptree, ZNAPZ.

**Common pattern:** Founders left IBM *first*, then built. No one blogged/open-sourced their way into a parallel Maximo business while still badged.

---

## 5. Employment Law Under the Hood

### The IBM IP Assignment Agreement

IBM's standard agreement claims ownership of ideas, inventions, software, templates, and publications *"relating to IBM's current or anticipated offerings, business, research or development,"* created *"no matter where or when — at work or after hours,"* with survival past employment. It includes a **disclaimer-of-ownership mechanism**: an employee can request written IBM Legal disclaimer for a specific personal project. This is the only sanctioned path to cleanly own a Maximo-adjacent side project.

### State-Law Ceilings on Invention Assignment (US)

- **California Labor Code §2870** — voids assignment of inventions developed entirely on own time, without employer resources, *unless* they (a) relate to the employer's business/R&D or (b) result from work performed for the employer. Critical: Maximo-specific work fails the (a) carve-back.
- **New York Labor Law §203-f** (2023) — mirrors §2870.
- **Texas** — enforces broad assignments literally (*Evan Brown v. Alcatel USA*).
- **Other §2870-style states:** Delaware, Illinois, Kansas, Minnesota, North Carolina, Washington, Utah, plus NY and NJ more recently.

### Holdover (Post-Employment) Clauses

- *Ingersoll-Rand v. Ciavatta* (NJ 1988) — enforces them only for reasonable periods (6–12 months) traceable to the former employer's confidential information.
- *Whitewater West v. Alleshouse* (Fed. Cir. 2020, applying California law) — struck down a broad post-employment assignment as a de facto unlawful non-compete.

### Non-Competes — The 2024–2025 Reset

- FTC's 2024 Non-Compete Rule was vacated in *Ryan, LLC v. FTC* (N.D. Tex. Aug 2024).
- Sept 5, 2025: FTC voted 3-1 to drop the appeal; enforcement reverts to state law.
- **California, Minnesota, North Dakota, Oklahoma:** ban most non-competes.
- **Colorado, Illinois, Massachusetts, Oregon, Virginia, Washington:** salary thresholds/notice requirements.
- IBM's standard non-compete: 12 months post-departure for competitors, 24 months for soliciting IBM employees.
- **IBM v. Visentin (S.D.N.Y. 2011):** court denied IBM's preliminary injunction against an exec joining HP — IBM must show specific access to protected info, not a generic recital.

### Trade Secret Boundary (DTSA 18 U.S.C. §1839)

- Protected: information with independent economic value from secrecy + subject to reasonable secrecy measures.
- **Not** misappropriation: reverse engineering, independent derivation, lawful means.
- **Presumptively not a trade secret:** anything in IBM public docs, KnowledgeCenter, Community posts, marketing, support portal public content, partner-accessible docs.
- **Is a trade secret:** internal architecture, unreleased roadmap, source code, customer configs, pricing telemetry, internal RFCs.

### Trademark — The *New Kids on the Block* Test

Ninth Circuit nominative fair-use test (1992):

1. Product is not readily identifiable without the mark.
2. Only as much of the mark as reasonably necessary is used.
3. Nothing suggests sponsorship or endorsement.

A tutorial titled *"Maximo Asset Management — Work Order Tips"* with proper ® attribution and an unaffiliated disclaimer is firmly inside nominative fair use. A product named *"MaximoPro"* or a domain like `maximocloud.com` is outside it — those create source-identification confusion.

IBM's Trademark Policy:

| Example | Allowed? |
|---|---|
| Blog post "10 Tips for IBM Maximo Administrators" with disclaimer | ✅ Yes |
| YouTube channel "Maximo Tutorials" with disclaimer | ✅ Yes |
| Udemy course "Mastering IBM Maximo" (as an IBMer) | 🟡 Requires written approval; likely denied |
| Book *"The Definitive Guide to IBM Maximo"* (royalties, while employed) | 🟡 Triggers §5.1.2 + §5.1.4 |
| Domain `ibm-maximo-hacks.com` | 🔴 Trademark violation (IBM in root domain) |
| SaaS product "MaximoPlus" or "MaximoGPT" | 🔴 IBM product name in your product name |

---

## 6. The One Notable Enforcement Incident

**Lijun Pan — Linux kernel `ibmvnic` driver, 2021**

IBM kernel engineer Lijun Pan listed his personal Gmail as `MAINTAINERS` contact for the `drivers/net/ethernet/ibm/ibmvnic.*` driver. He was told to remove himself with the now-famous line:

> *"You are an IBM employee 100% of the time."*

Linux kernel journalist Jon Corbet called it *"one confused mid-level manager"* rather than official policy, and IBM subsequently clarified that personal-time contributions under personal IDs are allowed when they don't conflict with day-job work. But the signal stuck: **when your personal OSS work directly overlaps an IBM commercial product, IBM will assert ownership.**

The Maximo analogue is obvious — a personal tool tightly coupled to Maximo is in the same category.

No public record surfaced of IBM firing anyone specifically for a Maximo blog, YouTube video, or free tutorial. The GREEN-zone risk floor is empirically low — but internal warnings and quiet separations are invisible to public search.

---

## 7. Sanctioned vs. Personal Channels

| Channel | Who can post | Content ownership | Monetization |
|---|---|---|---|
| **community.ibm.com (TechXchange)** | IBMers + customers + partners | Posters grant IBM a royalty-free worldwide license | None personal |
| **developer.ibm.com** | IBMers + invited contributors | IBM holds copyright | None |
| **IBM Redbooks** | Residency program (competitive) | IBM copyright; author credit + Credly badges | No royalties |
| **Official IBM blog** | IBMers via Corp Comms | IBM owns | None |
| **Medium, personal blog, YouTube** | Anyone | Author owns (subject to IBM IP Assignment on inventions) | Permitted if BCG-compliant; monetization triggers conflict review |
| **Udemy, paid course platforms** | Anyone | Author owns | 🟡 Mandatory written approval for IBMers |
| **Personal GitHub** | Anyone | Depends on relation to IBM business; §2870 may apply | Sponsorships trigger BCG conflict review |

---

## 8. Academic / Scholarly Commentary

- **Orly Lobel (University of San Diego)** — *"The New Cognitive Property: Human Capital Law and the Reach of Intellectual Property,"* Texas Law Review. Argues that invention assignment, non-competes, NDAs, and holdover clauses collectively create a "cognitive property" regime that suppresses mobility and innovation. Courts should — and often do — read these clauses narrowly.
- **Charles Graves (UC Hastings)** — NYU Journal of IP & Entertainment Law. Pre-invention assignment contracts are in tension with Copyright Act work-made-for-hire doctrine.
- Scholarly center of gravity runs strongly toward **narrow enforcement of overbroad clauses** — but scholarship is not precedent, and IBM's contract still says what it says.

---

## 9. The Three-Step Protection Protocol

For any IBM employee considering publishing:

1. **Before publishing anything external:**
   - Re-read the current BCG and Social Computing Guidelines on w3 (internal IBM).
   - Pull your signed IP Agreement from onboarding records.
2. **For anything monetized, or anything in the Maximo/EAM domain:**
   - File a **written Conflict-of-Interest disclosure** with your manager.
   - Keep the email trail.
   - For OSS: add a written **disclaimer-of-ownership request** to IBM IP Legal before publishing.
3. **If you're in IBM India:**
   - Assume paid side activity is prohibited.
   - Treat philanthropic/educational-only content as the only safe mode until written approval.

---

## 10. The Sustainable Monetization Path (what the ecosystem actually validated)

1. **While employed at IBM:** Build your audience using free content + disclaimers + IBM-sanctioned channels (community.ibm.com, developer.ibm.com, Redbooks, conferences).
2. **Leave IBM** when ready.
3. **Monetize freely** from a partner firm, a new consultancy, or independently.
4. **Apply for IBM Champion** — the program was literally designed for this phase.

This is the exact road Pam Denny, Andrew Jeffery, and most Maximo service-firm founders walked. The IBM years were the **credential-building phase**; commercialization happened after the exit with a clean assignment-disclaimer paper trail.

---

## 11. Strategic Second-Order Thought

The three-moves-ahead play isn't maximizing today's publishing latitude — it's **positioning the exit so the first post-IBM year is unencumbered.** Credential while employed; commercialize after; paper-trail every Yellow-tier disclaimer along the way.

---

## 12. Honest Uncertainty & Gaps

- **No reported case** surfaced of IBM pursuing a US employee for public Maximo publishing. Lowers baseline risk for GREEN-tier activity — but does *not* mean such enforcement hasn't happened internally (internal warnings and quiet separations are invisible).
- **"Blue Book"** nickname for IBM Open Source Participation Guidelines could not be verified in public sources. OSPG acronym is confirmed; "Blue Book" may be internal colloquial.
- **Direct text of the IBM IP Assignment Agreement** is not publicly posted. Summaries derive from BCG §3.5.5, third-party counsel commentary, and the Lijun Pan incident discussion.
- **Reddit/Blind direct quotes** were thin in search results — likely due to poor Reddit indexing and IBM's community conversation migrating to `community.ibm.com`.
- IBM.com pages repeatedly return HTTP 403 to automated tooling; verified third-party mirrors (oocities, CustomerThink, Inside Social Media, Kabanero GitHub) were used for verbatim text.

**This is research, not legal advice.** For any YELLOW-tier decision, a single consultation with an employment-IP attorney in your home state/country is worth more than any amount of research — especially before the first publication, not after.

---

## Sources

### Primary IBM policy documents

- IBM Business Conduct Guidelines governance page: https://www.ibm.com/investor/governance/business-conduct-guidelines
- IBM BCG 2019 PDF ("Trust Comes First"): https://www.ibm.com/investor/att/pdf/BCG_accessible_2019.pdf
- IBM BCG Feb 2011 English CE: https://www.ibm.com/investor/att/pdf/BCG_Feb_2011_English_CE.pdf
- IBM BCG current PDF: https://www.ibm.com/investor/att/pdf/IBM_Business_Conduct_Guidelines.pdf
- IBM Global Conflicts of Interest Supplement 2016: https://www.ibm.com/investor/att/pdf/IBM_GCG_EXTERNAL_English_122016_accessible.pdf
- IBM Corporate BCG mirror (verbatim, Keith Gibby): https://www.oocities.org/~keithgibby/business_conduct_guidelines.htm
- IBM Supplier Conduct Principles: https://assets2.hrc.org/files/assets/resources/scpg-v2.0.pdf

### IBM Social Computing & publishing

- Inside Social Media — IBM social media policy mirror: https://insidesocialmedia.com/social-media-policies/ibms-social-media-policy/
- Social Media Today — IBM Social Computing Guidelines Updated: https://www.socialmediatoday.com/content/ibms-social-computing-guidelines-now-updated
- CustomerThink — IBM Social Computing Guidelines: https://customerthink.com/social_computing_guidelines/
- Susan Emerick — Building IBM Social Computing Guidelines: https://susanemerick.com/building-ibm-social-computing-guidelines/

### IBM Trademark

- IBM Copyright and Trademark Information: https://www.ibm.com/legal/copyright-trademark
- IBM Logo and Brand Guidelines for Third Parties (PDF): https://www.ibm.com/design/language/files/IBM_Logo_3rdParties_300822.pdf
- Kabanero IBM Trademark Policy mirror: https://github.com/kabanero-io/kabanero-website/blob/master/IBM-Trademark-Policy.md
- IBM Terms of Use: https://www.ibm.com/legal/terms

### IBM Open Source

- IBM Open Source — Get Involved: https://www.ibm.com/opensource/enterprise/
- IBM Open Source Committer Badge: https://www.ibm.com/training/badge/open-source-committer
- IBM on GitHub: https://ibm.github.io/
- AcronymFinder — OSPG (Open Source Participation Guidelines): https://www.acronymfinder.com/Open-Source-Participation-Guidelines-(IBM)-(OSPG).html
- Phoronix — "You Are an IBM Employee 100% of the Time": https://www.phoronix.com/news/IBM-Employee-100p-Time
- Phoronix — IBM Clarifies Stance on Off-Hours Open Source: https://www.phoronix.com/news/IBM-Open-Source-Leisure-Work
- Hacker News #26873795: https://news.ycombinator.com/item?id=26873795
- Hacker News #26869877: https://news.ycombinator.com/item?id=26869877
- GitHub Balanced Employee IP Agreement: https://github.com/github/balanced-employee-ip-agreement
- GitHub Blog — BEIPA 2.0: https://github.blog/2020-12-14-inspired-by-open-source-balanced-employee-intellectual-property-agreement-2-0/

### IP & Invention Assignment law

- Cal. Labor Code §2870 (Justia): https://law.justia.com/codes/california/code-lab/division-3/chapter-2/article-3-5/section-2870/
- Cal. Labor Code §2870 (FindLaw): https://codes.findlaw.com/ca/labor-code/lab-sect-2870/
- Cal. Labor Code §2872 (FindLaw): https://codes.findlaw.com/ca/labor-code/lab-sect-2872/
- LegalClarity — Cal. Lab. Code 2870 explainer: https://legalclarity.org/california-labor-code-2870-employee-invention-rights-explained/
- Wilson Sonsini — NY Labor Law §203-f: https://www.wsgr.com/en/insights/new-york-redefines-the-permissible-scope-of-invention-assignment-provisions.html
- Troutman Pepper Locke — NY Narrows Invention Assignment: https://www.troutman.com/insights/new-york-narrows-the-scope-of-employee-invention-assignment-provisions/
- Crowell & Moring — NY IP-risk memo: https://www.crowell.com/a/web/3afNzaDAKkPDeuJ5ZKvG77/how-cos-can-mitigate-ip-risks-after-ny-labor-law-updates.pdf
- Texas Law Review — "A Mortgage on a Man's Brain": https://texaslawreview.org/a-mortgage-on-a-mans-brain-the-unconscionability-of-overly-broad-intellectual-property-assignment-clauses-in-employment-contracts/
- Hunton — Federal Circuit on California non-compete limits: https://www.hunton.com/insights/legal/employment-law-and-patent-law-collide
- McGuireWoods — Employee Inventions in WFH: https://www.mcguirewoods.com/client-resources/alerts/2020/6/asserting-ownership-employee-inventions-work-from-home-environment/
- Stimmel Law — Who Owns Employee's Inventions Made at Home: https://www.stimmel-law.com/en/articles/who-owns-employees-inventions-made-home
- Nat'l Law Review — Invention Assignment Pitfalls: https://natlawreview.com/article/invention-assignment-agreements-how-to-avoid-pitfalls
- Lexology — Holdover clause analysis: https://www.lexology.com/library/detail.aspx?g=16fe7ecb-68fe-4d5a-aaee-8bfd37906d33
- Fennemore — Employee Assignments Update (Alleshouse): https://www.fennemorelaw.com/employee-assignments-of-inventions-an-update/
- NYU JIPEL — Graves on Copyright vs Invention Assignment: https://jipel.law.nyu.edu/vol-8-no-1-1-graves/
- UIC Review of IP Law — Scope of employment: https://repository.law.uic.edu/ripl/vol20/iss3/2/
- Orly Lobel — "The New Cognitive Property": https://texaslawreview.org/wp-content/uploads/2015/08/Lobel-93-4.pdf

### Trade secrets & trademark

- 18 U.S.C. §1839 (Cornell LII): https://www.law.cornell.edu/uscode/text/18/1839
- ABA Business Law Today — DTSA explainer: https://www.americanbar.org/groups/business_law/resources/business-law-today/2016-september/explaining-the-defend-trade-secrets-act/
- Wikipedia — Nominative Use: https://en.wikipedia.org/wiki/Nominative_use
- ABA Landslide — Nominative Fair Use: https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2021-22/march-april/nominative-trademark-use-affirmative-negative-defense-infringement/

### India moonlighting (Oct 2022)

- Business Today — Sandip Patel internal note: https://www.businesstoday.in/latest/corporate/story/moonlighting-can-cause-confusion-ibm-india-top-boss-not-in-favour-of-side-gigs-350802-2022-10-26
- HRKatha — "Moonlighting is violation of trust": https://www.hrkatha.com/news/moonlighting-is-violation-of-trust-sandip-patel-md-ibm-tells-staff/
- Business Standard — IBM India joins moonlighting chorus: https://www.business-standard.com/article/companies/moonlighting-not-ethically-right-for-full-time-employees-ibm-md-patel-122091400459_1.html
- Business Standard — Moonlighting is a conflict of interest: https://www.business-standard.com/article/companies/moonlighting-is-a-conflict-of-interest-ibm-informs-its-employees-122102600594_1.html
- The Register — IBM India philanthropic-moonlighting carve-out: https://www.theregister.com/2022/10/27/ibm_india_moonlighting_mess/
- The Register — Wipro fires 300: https://www.theregister.com/2022/09/22/wipro_fires_300_for_moonlighting/
- Deccan Herald — IBM India warns workers: https://www.deccanherald.com/business/business-news/ibm-india-warns-workers-against-moonlighting-says-client-assets-put-at-risk-1157035.html
- Outlook Business — After Infosys and Wipro, now IBM: https://www.outlookbusiness.com/news/after-infosys-and-wipro-now-ibm-warns-employees-against-moonlighting-news-232761
- WION News — IBM calls moonlighting unethical: https://www.wionews.com/india-news/now-ibm-calls-out-the-practice-of-moonlighting-terms-it-unethical-516386
- WRAL TechWire — IBM warns India employees: https://wraltechwire.com/2022/10/27/ibm-warns-employees-in-india-about-moonlighting-conflict-of-interest/
- TechCrunch — Wipro fires 300: https://techcrunch.com/2022/09/21/it-services-group-wipro-fires-300-employees-for-moonlighting/

### Non-competes & FTC 2024-2025

- FTC press release (Sept 2025 accede to vacatur): https://www.ftc.gov/news-events/news/press-releases/2025/09/federal-trade-commission-files-accede-vacatur-non-compete-clause-rule
- Venable — FTC non-compete state-law landscape: https://www.venable.com/insights/publications/2025/10/ftc-non-compete-enforcement-and-state-law
- Husch Blackwell — FTC abandons 2024 rule: https://www.huschblackwell.com/newsandinsights/ftc-abandons-2024-non-compete-rule-signals-priority-in-non-compete-enforcement-actions
- Justia — IBM Noncompetition Agreement: https://contracts.justia.com/companies/ibm-700/contract/377609/
- SEC — IBM Form of Noncompetition Agreement: https://www.sec.gov/Archives/edgar/data/51143/000104746918001117/a2233835zex-10_3.htm
- Epstein Becker Green — IBM v. Visentin: https://www.tradesecretsandemployeemobility.com/court-denies-preliminary-injunction-sought-by-ibm-because-former-employee-signed-non-compete-agreement-in-wrong-place
- Lexology — Lessons from IBM v. Visentin: https://www.lexology.com/library/detail.aspx?g=083a3210-1c8a-426c-85ae-9ae7335d79f8
- Maynard Nexsen — First Amendment doesn't apply at work: https://www.maynardnexsen.com/publication-no-the-first-amendment-doesnt-apply-at-work-but-other-laws-protect-some-employee-speech
- Workplace Fairness — Social Network Privacy: https://www.workplacefairness.org/social-network-computer-privacy-workplace/

### IBM-adjacent litigation & arbitration

- CNBC — GlobalFoundries v. IBM trade-secret suit: https://www.cnbc.com/2023/04/20/globalfoundries-sues-ibm-says-unlawfully-gave-rapidus-trade-secrets.html
- The Register — IBM/GlobalFoundries settlement: https://www.theregister.com/2025/01/03/ibm_globalfoundries_settle_lawsuits/
- Bloomberg Law — IBM GlobalFoundries settle: https://news.bloomberglaw.com/ip-law/ibm-globalfoundries-settle-dueling-trade-secret-contract-suits
- FindLaw — In re IBM Arbitration Agreement Litigation (2d Cir. 2023): https://caselaw.findlaw.com/court/us-2nd-circuit/114809558.html
- ProPublica — Cutting Old Heads at IBM: https://features.propublica.org/ibm/ibm-age-discrimination-american-workers/

### IBM community / channels / Champions

- IBM TechXchange Community Terms of Use: https://www.ibm.com/community/terms-of-use/
- IBM Champions Program: https://www.ibm.com/community/champions-program/
- IBM Champion Nomination Form: https://www.ibm.com/community/ibm-champion-nominate/
- IBM Champions (Wikipedia): https://en.wikipedia.org/wiki/IBM_Champions
- IBM Redbooks: https://www.redbooks.ibm.com/
- IBM Redbooks Residencies: https://www.redbooks.ibm.com/redbooks.nsf/pages/residencies?Open=
- IBM Redbooks Digital Badges: https://www.redbooks.ibm.com/badges
- IBM Maximo Community: https://community.ibm.com/community/user/groups/community-home?CommunityKey=3d7261ae-48f7-481d-b675-a40eb407e0fd

### Real-world Maximo ecosystem examples

- Bruno Portaluri — bportaluri.com: https://bportaluri.com/
- GitHub @bportaluri: https://github.com/bportaluri
- Maximo Secrets (Andrew Jeffery, Naviam): https://maximosecrets.com/
- Andrew Jeffery About page: https://maximosecrets.com/about/
- Pam Denny — LinkedIn: https://www.linkedin.com/in/pamdenny
- Maven Asset Management — 2023 IBM Champions: https://www.mavenasset.com/blog/2023-ibm-champions/
- Cohesive Solutions (Anthony Honaker): https://blog.cohesivesolutions.com/resources-and-news/news/trimax-presentation-kpis
- Naviam — Path to Becoming an IBM Champion: https://www.naviam.io/resources/blog/a-path-to-becoming-an-ibm-champion
- Interloc Solutions: https://www.interlocsolutions.com/
- Interloc Team: https://www.interlocsolutions.com/team
- Projetech: https://www.projetech.com/
- BPD Zenith company: https://www.bpdzenith.com/company/
- Naviam / BPD Zenith rollup: https://www.bpdzenith.com/
- Maxview Solutions — IBM Partner Directory: https://www.ibm.com/partnerplus/directory/company/8424
- MRO Software / Maximo history: https://maximopulse.wordpress.com/2014/07/09/history-of-mro-and-ibm-maximo/
- IBM Maximo GitHub (official): https://github.com/ibm-maximo-dev
- IBM MAS GitHub: https://github.com/ibm-mas

### Forum / community signal

- Quora — Starting a startup while at IBM: https://www.quora.com/If-I-create-my-own-startup-while-I-work-full-time-at-IBM-will-IBM-own-any-part-of-the-startup-I-create
- Quora — IBM secondary income clause: https://www.quora.com/It-is-written-in-my-offer-letter-by-IBM-that-any-employee-should-not-have-any-secondary-source-of-income-Is-there-any-rule-abiding-this-law
