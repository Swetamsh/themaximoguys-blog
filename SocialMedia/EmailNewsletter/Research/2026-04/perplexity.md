I have enough material to assemble the briefing. A few flags: "Graphite" as a Maximo mobile codename isn't verifiable in public sources (will flag); Cohesive is NOT part of Naviam (confirmed — it's Bentley Systems owned, separate); BIRT is phased out but no official EOS date announced yet (will flag). Now writing the briefing.

---

# IBM Maximo / MAS Ecosystem Briefing — April 2026

*For TheMaximoGuys monthly newsletter. Triple-verified where possible. Unverified claims flagged explicitly.*

---

## 1. Latest MAS Release News (2025–2026)

**MAS 9.0 shipped June 2024** as IBM's first full calendar-cadence release under the new 3+1+3 lifecycle. **MAS 9.1 shipped on 24 June 2025** — the release note of record at IBM Support confirms 9.1.0 and subsequent fix packs through **9.1.14 (Maximo Optimizer 9.1.10)**, which is the most recent cumulative release listed on IBM's Maximo Application Suite 9.1.x landing page ([ibm.com/support/pages/ibm-maximo-application-suite91x](https://www.ibm.com/support/pages/ibm-maximo-application-suite91x), [ibm.com/support/pages/ibm-maximo-application-suite-9114](https://www.ibm.com/support/pages/ibm-maximo-application-suite-9114-maximo-optimizer-9110-release-notes)).

**What shipped in 9.1 that matters to practitioners:**

- **Maximo AI Service** — a licensed add-on that plugs watsonx LLMs into the suite and powers the new Maximo Assistant ([Pragma Edge breakdown](https://pragmaedge.com/whats-new-in-ibm-maximo-application-suite-9-1/), [MACS](https://macs.eu/whats-new-in-ibm-maximo-application-suite-9-1/)).
- **Asset Investment Planning (AIP)** — full integration with Manage, Health, Predict ([MRM-EAM](https://mrm-eam.com/asset-investment-planning-in-mas-9-1-manage-smarter-captial-decisions-at-scale/), [IBM product page](https://www.ibm.com/products/maximo/asset-investment-planning)).
- **TRIRIGA becomes Maximo Real Estate and Facilities (MREF)** — unified platform ([Naviam](https://www.naviam.io/resources/blog/maximo-application-suite-9-1-release-in-june-2025-what-to-expect)).
- **Java 17 transition** (replacing Java 8) and **OpenShift 4.16 / Cloud Pak for Data 5.0** ([Naviam Java 17 guide](https://www.naviam.io/resources/blog/mas-9-1-and-the-java-17-transition-what-it-and-operations-admins-need-to-know)).
- **Work Order Summary view** as a Manage-native alternative to the classic WO tracking app ([MACS](https://macs.eu/whats-new-in-ibm-maximo-application-suite-9-1/)).
- **MAS 9.0 added Red Hat OpenShift on IBM Z / LinuxONE** ([IBM Community, Dec 2024](https://community.ibm.com/community/user/asset-facilities/discussion/ibm-maximo-application-suite-90-adds-support-for-red-hat-openshift-on-ibm-z-and-linuxone-systems)).

**Lifecycle signal practitioners must internalize:** IBM replaced the old continuous-delivery model with a **3+1+3 policy starting at MAS 9.0**: 3 years base support, 1 year initial extended support, 3 years ongoing extended support; 12-month major release cadence; quarterly "feature channels" in between ([IBM official lifecycle page](https://www.ibm.com/support/pages/ibm-maximo-application-suite-software-support-lifecycle-policy-versions-90), [Naviam explainer](https://www.naviam.io/resources/blog/new-lifecycle-policy-for-mas-3-1-3-structure)). MAS 9.2 is **expected June 2026** under this cadence — IBM has not published an official date; flag as roadmap signal, not commitment.

---

## 2. AI in Maximo / watsonx Integration (what has actually shipped)

**Maximo Assistant (GA in MAS 9.1, June 2025)** — the natural-language assistant embedded across Manage/Health. Runs on watsonx.ai LLMs via the **Maximo AI Service** licensed add-on ([IBM Newsroom](https://newsroom.ibm.com/blog-enhanced-maximo-streamlines-workforce-efficiency,-investment-planning,-and-facilities-management-introduces-gen-ai-assistant), [MACS](https://macs.eu/whats-new-in-ibm-maximo-application-suite-9-1/)).

**watsonx Orchestrate + Maximo reference architecture** — IBM open-sourced a production-grade pattern for building Maximo AI agents: [github.com/IBM/maximo-wxo-integration](https://github.com/IBM/maximo-wxo-integration). OpenAPI-based, FastAPI service wraps Maximo APIs as Orchestrate skills. This is the path most partners are following for custom agent work in 2026.

**Granite model integration** — Watsonx Assistant for Z with **Granite 3.3-8B-instruct on Spyre Accelerator** goes GA 12 Dec 2025 ([IBM announcement](https://www.ibm.com/new/announcements/watsonx-assistant-for-z-now-powered-by-spyre-accelerator)). Flag: this is the IBM Z path, not the standard OpenShift MAS deployment — most MAS customers will not use Spyre.

**Job Plan Automation with watsonx.ai** — Naviam published a working pattern for LLM-generated job plans from unstructured manuals and technician notes ([Naviam blog](https://www.naviam.io/resources/blog/job-plan-automation---watsonx)).

**Maximo Visual Inspection 9.0** — Java 17, RHEL 8 + Podman for MVI Edge, **GigE Vision / Basler camera support**, and privacy-filter auto-blur ([IBM docs](https://www.ibm.com/support/pages/ibm-maximo-application-suite-visual-inspection-release-900-service-updates), [Pragma Edge](https://pragmaedge.com/whats-new-in-maximo-visual-inspection-v9/)). IBM's **drone-to-fix solar farm reference** is the best public demo: [github.com/IBM/mas-drone-to-fix-watsonx](https://github.com/IBM/mas-drone-to-fix-watsonx).

**Maximo Health & Predict** — Health scores remain the primary asset-risk surface ([Interloc explainer](https://www.interlocsolutions.com/blog/maximo-health-a-powerful-tool-for-smarter-decision-making)). Predict anomaly detection leverages watsonx.ai time-series forecasting ([IBM docs](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-ts-ap.html?context=wx)). **Flag:** IBM has not published a major Predict model refresh in 2025–2026; most innovation is happening above it in Assistant and AIP.

**Real customer AI deployment** — World Bank presented "AI Service Automation" at MaximoWorld 2025 ([Banetti preview](https://info.banetti.com/maximo-world-2025/)); IBM–nybl partnership in MEA delivered watsonx + Maximo industrial solutions ([IBM MEA newsroom](https://mea.newsroom.ibm.com/IBM-nybl-collaboration)).

---

## 3. Licensing / AppPoints Changes

No major AppPoints metric change in 2025–2026 — the consumption table is stable. **What did change:**

- **Maximo AI Service is a separately licensed product** inside MAS 9.1 — customers cannot turn on the Assistant without a new line item ([Pragma Edge](https://pragmaedge.com/whats-new-in-ibm-maximo-application-suite-9-1/)).
- **IBM still does not publish AppPoints pricing**; per-deal negotiation remains the norm. Redress Compliance's 2026 guide cites typical 5-year TCO as **IBM-proposed 60–80% premium over legacy 7.6 maintenance, settling 10–20% after negotiation** ([Redress Compliance](https://redresscompliance.com/ibm-maximo-application-suite-licensing.html)). Flag: these are third-party estimates, not IBM figures.
- **7.6 perpetual licenses are no longer sold new** as of the 30 Sep 2025 EOS (see §7).
- Public IBM pricing page: [ibm.com/products/maximo/pricing](https://www.ibm.com/products/maximo/pricing).

**Must-read practitioner primers:** [TRM explainer](https://trmgroup.com/resource/ibm-maximo-new-apppoints-licensing-model-explained/), [Banetti](https://www.linkedin.com/pulse/maximo-apppoints-new-mas-licensing-model-explained-banetti-inc-8vnpf), [MACS](https://macs.eu/maximo-applications-suite-new-apppoints-licensing/).

---

## 4. Industry Events

- **MaximoWorld 2025** — 4–7 August 2025, JW Marriott Phoenix Desert Ridge (not Orlando). Keynote by **Kendra DeKeyrel, VP ESG & Asset Management Products, IBM**. Major announcement thread: AIP, Maximo Assistant, and AI Service Automation with World Bank ([Banetti](https://info.banetti.com/maximo-world-2025/), [Prometheus Group](https://www.prometheusgroup.com/resources/events/maximo-world), [Cohesive](https://hello.cohesivesolutions.com/maximoworld-2025)).
- **MaximoWorld 2026** — **19–20 May 2026, South San Francisco Conference Center** (co-located with The Reliability Conference 2026) ([Reliabilityweb press release](https://reliabilityweb.com/en/press-release/the-reliability-conference-r-announces-new-dates-and-location-for-2026), [event registration](https://web.cvent.com/event/482d1552-1365-4f3a-8bb9-3cc7e5b0ee81/summary)).
- **IBM TechXchange 2025** — 6–9 October 2025, Orlando (not Las Vegas, as some partners still list). Focus was agentic AI and watsonx.ai developer tooling, not Maximo-specific ([IBM TechXchange 2025 announcements](https://www.ibm.com/new/announcements/techxchange2025)).
- **IBM TechXchange 2026** — 26–29 October 2026, Atlanta, GA ([IBM events page](https://www.ibm.com/events/techxchange)).
- **IBM Think 2026** — 4–7 May 2026, Thomas M. Menino Convention Center, Boston ([IBM Events](https://www.ibm.com/events/think), [Meet Boston](https://www.meetboston.com/event/ibm-think-2026/)). Flag: no Maximo-specific announcements publicly pre-briefed as of April 2026.
- **Regional User Groups active in 2026**: PacMUG, SWMUG, LVMUG, FMMUG, ADMUG, MaxTECH, MORE Maximo. IBM's Kim Woodbury and Kal Gyimesi are the recurring IBM presenters ([PacMUG 2025 deck](https://pacmug.org/wp-content/uploads/2025/05/PacMUGC2507_UpdateRoadmap_IBM.pdf), [LVMUG Feb 2025 deck](https://lvmug.org/wp-content/uploads/2025/03/LVMUG2508_MaximoApplicationSuiteUpdate_IBM.pdf), [FMMUG June 2025 deck](https://fmmug.org/wp-content/uploads/2025/06/FMMUG2511_RoadMapUpdate_IBM.pdf)).

---

## 5. Partner Ecosystem Movement

**Naviam launch — 7 April 2025** remains the structural story of the past year. Seven firms merged at launch: **ActiveG, BPD Zenith, EAM Swiss, InterPro Solutions, Lexco, Peacock Engineering, Projetech** ([PRWeb](https://www.prweb.com/releases/seven-leading-asset-management-firms-unite-to-form-naviam-302420546.html), [CIO Bulletin](https://ciobulletin.com/database-management/naviam-ibm-maximo-enterprise-asset-management)). By early 2026 the brand expanded to **nine** with the addition of **Sharptree** and **ZNAPZ** ([Naviam company page](https://www.naviam.io/company/ibm-champions)).

**Cohesive is explicitly NOT part of Naviam** — it remains part of **Bentley Systems** as a Platinum IBM partner. Recent wins: **DEME Group** (offshore energy, April 2025) and **Auckland One Rail** (October 2025) both chose Cohesive for MAS 9 migrations ([DEME press release](https://www.businesswire.com/news/home/20250408208660/en/DEME-Group-Selects-Cohesive-for-IBM-Maximo-Application-Suite-Upgrade), [Auckland One Rail](https://www.businesswire.com/news/home/20251028694652/en/Auckland-One-Rail-Selects-Cohesive-for-IBM-Maximo-Application-Suite-Implementation)).

**Flag: Sedin** — I could not verify a Sedin acquisition or Naviam-style rollup involvement in public 2025–2026 sources. If this is a planned story angle, request confirmation directly from the firm.

Independents still carrying weight: **Banetti, Aquitas Solutions, MaxLogic, Maven Asset Management, Interloc Solutions, TRM Group, Pragma Edge, MRM-EAM, Starboard Consulting** — all actively publishing technical content.

---

## 6. Migration Stories & Case Studies (public, 2025–2026)

- **King County Facilities Management Division** went live on **MAS 9.01 in summer 2025** with Interloc Solutions ([Interloc case study](https://www.interlocsolutions.com/company/news/king-countys-facilities-management-division-fmd-upgrades-to-maximo-application-suite-mas-9.01-with-interloc-solutions)). This is the most-cited named MAS 9 go-live of 2025.
- **UK energy generation utility** — MaxLogic 3-month upgrade from 7.6.1.2 → 7.6.1.3 → MAS, including de-customization and mobile readiness ([MaxLogic case studies](https://www.maxlogicgroup.com/case-studies)).
- **Global manufacturer** — MaxLogic path from Maximo 4 → 7.6 → MAS 8.7 (2023) → current MAS 9 via continuous deployment.
- **DEME Group** (offshore energy) and **Auckland One Rail** (rolling stock) selected Cohesive for MAS 9 migrations in 2025 (citations above).
- **Azure Red Hat OpenShift (ARO)** is now an IBM-validated deployment target for MAS ([Microsoft Tech Community](https://techcommunity.microsoft.com/blog/appsonazureblog/modernizing-enterprise-asset-management-the-power-of-ibm-maximo-on-azure-red-hat/4373530)) — a notable shift given the historic IBM Cloud / on-prem bias.

**The horror-story pattern** (per Oxford Global Resources): customers who underestimated change management and training got hit — **shadow IT, compliance drift, low adoption, and security posture erosion** ([Oxford Global Resources](https://www.oxfordcorp.com/insights/industry-commentary/end-of-maximo-7-6-support-leaves-companies-facing-change-management-and-training-gaps-amid-mas-8-9-upgrades/)). Second theme: OpenShift skills gap — most customers outsource the platform layer ([Maximo Secrets upgrade notes](https://maximosecrets.com/2024/10/08/upgrading-to-mas-9-0/)).

**IBM's official migration tooling** lives at [ibm-mas.github.io/cli/examples/eam-migration/](https://ibm-mas.github.io/cli/examples/eam-migration/) — actively maintained through catalog releases 250109 and 251127.

---

## 7. Deprecations & End-of-Support Dates

- **Maximo 7.6.1.x end of base support: 30 September 2025** — confirmed ([IBM EOS notice](https://www.ibm.com/support/pages/end-support-announcement-eos-maximo-761)). Extended Support available to **30 September 2026**; Sustained Support purchasable through **30 September 2030** ([Naviam extended-support page](https://www.naviam.io/solutions/ibm-maximo-7-6-extended-support), [Projetech](https://www.projetech.com/maximo-blog/maximo-7-6-support-your-top-questions-answered)).
- **MAS 8.7, 8.8, 8.9 lifecycle completion: 30 April 2026** — full EOS, no further support ([Interloc transition post](https://www.interlocsolutions.com/blog/support-transition-for-ibm-maximo-application-suite-releases-8.7-8.8-8.9-8.10-and-8.11)). This is the **#1 date customers are scrambling on right now** given today is 16 April 2026.
- **MAS 8.10, 8.11 → Extended Support effective 30 April 2026** — customers on these versions need a MAS 9 plan immediately.
- **BIRT** — officially "being phased out," but IBM has **not published a formal EOS date**. Technical debt flagged: BIRT 4.8 still tied to **Java 1.8 (Oracle-unsupported since Jan 2019)** ([IBM Community / ADMUG discussion](https://community.ibm.com/community/user/discussion/why-birt-reports-are-being-phased-out-in-maximo-implementations-and-whats-replacing-them-1)). **Flag: no public EOS date — practitioners should treat BIRT migration as urgent but not yet deadline-driven.**
- **WebSphere traditional** — MAS moved entirely to WebSphere Liberty on OpenShift; traditional WAS is not part of MAS 9 deployment topology.
- **Classic UI vs new Manage UI** — the new UI is the default in MAS 9.x; IBM has **not announced a hard Classic deprecation date** ([Maximo Secrets UI 9.1](https://maximosecrets.com/2025/08/15/maximo-user-interface-9-1/)). **Flag as unverified; practitioners should assume gradual retirement, not a cliff.**

---

## 8. Competitive Landscape

- **SAP Asset Performance Management + S/4HANA 2025** — Joule AI assistant is now GA across S/4HANA Cloud, APM, and Field Service Management. AI-assisted order creation and technician assistance in S/4HANA 2025 FPS01 ([SAP Community FPS01 blog](https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/new-in-sap-eam-with-s-4hana-2025-fps01-task-planning-management-api/ba-p/14331091), [SAP News Q3 2025](https://news.sap.com/2025/10/sap-business-ai-release-highlights-q3-2025/)). Joule-for-technicians is SAP's direct answer to Maximo Assistant.
- **Oracle Fusion Cloud Maintenance** — at Oracle AI World Mumbai (Feb 2026), Oracle unveiled **AI agents in Release 26A** including a **Maintenance Advisor agent**. On **24 March 2026 Oracle announced Fusion Agentic Applications** as a formal product class ([Oracle press release](https://www.oracle.com/news/announcement/oracle-introduces-fusion-agentic-applications-2026-03-24/)). Oracle is going heavier on agentic framing than IBM is publicly.
- **PTC ServiceMax** — **ServiceMax AI** launched February 2025 ([PTC press release](https://www.ptc.com/en/news/2025/ptc-launches-servicemax-ai)). **Service Lifecycle Management AI Solutions** announced 2025 with multi-agent orchestration, Service Flow Manager, and Knowledge API ([PTC press release](https://www.ptc.com/en/news/2025/ptc-delivers-new-slm-ai-solutions)). Named a **Leader in the 2025 QKS SPARK Matrix for FSM**.
- **Hexagon (formerly Infor) EAM** — now rebranded under **HxGN EAM** and the **Attune EAM** naming. AWS-native SaaS push continues ([Hexagon EAM page](https://www.infor.com/products/eam), [Diginomica context](https://diginomica.com/why-has-infor-agreed-sell-its-eam-business-hexagon-ab)).
- **Gartner Magic Quadrant for EAM 2025** — IBM Maximo remains listed as a Leader on IBM's own announcement page ([IBM](https://www.ibm.com/support/pages/ibm-maximo-named-leader-gartner-magic-quadrant-enterprise-asset-management)). **Flag: I could not retrieve the full 2025 MQ document; the named-leader claim is sourced from IBM's own page and should be corroborated with Gartner direct before publication.**

---

## 9. Community Signals

**2026 IBM Champions class — named, Maximo-relevant:**

- **Jennifer Gatza**, Founder/CEO Maven Asset Management ([Maven blog](https://www.mavenasset.com/blog/celebrating-mavens-2026-ibm-champions/))
- **Pam Denny** — Maximo analytics and reporting, Maven
- **Michael Guns** — reliability, Maven
- **Rick Crory** — enterprise asset management, Maven
- **Ray and John** from TRM Group ([TRM announcement](https://trmgroup.com/resource/celebrating_trms_2026_rising_ibm_champions_class/))
- Full Naviam Champions roster: [naviam.io/company/ibm-champions](https://www.naviam.io/company/ibm-champions)

**Most-cited independent content creators in 2026:**

- **Bruno Portaluri** (MaximoDev) — [bportaluri.com](https://bportaluri.com/) — still the leading independent technical voice
- **Maximo Secrets** — [maximosecrets.com](https://maximosecrets.com/) — release-by-release technical deep dives (best public MAS 9.0/9.1 comparison article)
- **Naviam blog, Projetech blog, Banetti blog, MRM-EAM, Pragma Edge** — partner-produced but technically rigorous
- **MACS.eu** — strongest EMEA Maximo coverage

**Active community hubs:** IBM Community Asset & Facilities ([community.ibm.com/community/user/groups/community-home?CommunityKey=3d7261ae-48f7-481d-b675-a40eb407e0fd](https://community.ibm.com/community/user/groups/community-home/recent-community-events)), MORE Maximo ([moremaximo.com](https://moremaximo.com/)).

---

## 10. The 3–5 Must-Cover Stories for the April 2026 Newsletter

1. **"April 30 is the cliff"** — MAS 8.7/8.8/8.9 full EOS in **two weeks** from today; MAS 8.10/8.11 moves to Extended Support same day. Every reader on MAS 8 needs a 9-upgrade plan. Cite the [Interloc transition piece](https://www.interlocsolutions.com/blog/support-transition-for-ibm-maximo-application-suite-releases-8.7-8.8-8.9-8.10-and-8.11).

2. **"Maximo Assistant one year in"** — MAS 9.1 and the Maximo AI Service shipped June 2025. Case study angle: World Bank AI Service Automation + Naviam Job Plan Automation pattern + IBM's open watsonx Orchestrate integration repo ([github.com/IBM/maximo-wxo-integration](https://github.com/IBM/maximo-wxo-integration)). Practitioner takeaway: the open reference architecture is the fastest way to stand up a custom Maximo agent.

3. **"MaximoWorld moves to San Francisco — May 19–20"** — location + date change from Phoenix is a news beat. Preview the event and the 3+1+3 lifecycle implications likely to be discussed ([Reliabilityweb](https://reliabilityweb.com/en/press-release/the-reliability-conference-r-announces-new-dates-and-location-for-2026)).

4. **"Naviam at one year"** — assess the 9-firm rollup's execution, contrast with Cohesive/Bentley's independent trajectory (DEME, Auckland One Rail wins), and flag the competitive implications for mid-market Maximo customers choosing a partner.

5. **"The competitive AI agent race"** — Oracle Fusion Agentic Applications (24 March 2026 launch), SAP Joule-for-technicians, PTC ServiceMax AI multi-agent, and IBM's watsonx Orchestrate + Maximo pattern. Benchmark-style piece: what actually ships, what's roadmap, and where Maximo customers should set expectations.

---

## Explicit Unverified Claims Flagged

- **MAS 9.2 June 2026 release** — inferred from 3+1+3 cadence; no IBM announcement.
- **Classic UI hard deprecation date** — none published; do not report a date.
- **BIRT formal EOS date** — none published.
- **Sedin in a Naviam-style rollup** — unverified in 2025–2026 public sources.
- **Gartner 2025 EAM Magic Quadrant full ranking** — cited via IBM's own press page only; not independently retrieved.
- **"Graphite" as a Maximo Mobile codename** — no public IBM citation found; all "Graphite" search hits are unrelated products. Recommend not referencing this term in print until verified with IBM.

---

**Word count: ~1,850**

════ PAI | ALGORITHM COMPLETE ═══════════════════════
TASK: April 2026 Maximo/MAS newsletter briefing
CHANGE: Delivered 10-section citation-heavy briefing with 60+ URLs
VERIFY: Cross-checked IBM official pages, partner blogs, event sites; flagged 6 unverified claims explicitly
SPIDERMAN: April 30 MAS 8 cliff and MaximoWorld San Francisco are the April headlines.