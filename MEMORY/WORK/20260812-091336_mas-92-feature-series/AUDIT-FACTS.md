# Fact Audit — MAS 9.2 Series

**Audit date:** 2026-08-12
**Auditor:** adversarial fact-check pass
**Scope:** all eight `.mdx` files in `posts/MAS-9-2/`, checked against `knowledge_base/DOC15_MAS92_RELEASE_FACTBASE.md` and the cached primary sources in `knowledge_base/MAS92-SOURCES/text/`
**Method:** extracted concrete factual assertions post by post; adjudicated ambiguous cases against cached IBM source text rather than the fact base summary

---

## VERDICT: SERIOUS ISSUES

Three things drive this verdict rather than "minor issues":

1. **Part 2 is systematically stale on the single fact readers most want** — the 9.x lifecycle dates. It asserts in nine separate places that these could not be read, that the tables "returned empty," and that even the 9.0/9.1 GA dates are unverified. All of that was true during drafting and is false now: REL-05a/b/c and REL-10 are CONFIRMED, GAP-01 and GAP-02 are CLOSED, and the lifecycle pages are cached locally. Parts 1 and 6 carry lighter versions of the same staleness.
2. **The series contradicts itself on four load-bearing points** — 9.x lifecycle dates, Feature Channel entitlement, Maximo Assistant on Mobile, and AI incident classification. A reader moving from Part 0 to Part 2 is told the opposite thing about lifecycle dates in consecutive posts.
3. **One direct quotation attributed to IBM cannot be traced to any source** — the only such case in the series.

None of this is fabricated *feature* content. The feature reporting is unusually strong: I verified dozens of specific, checkable claims across Manage, Monitor, MVI, Health/Predict, Maximo IT, REF, HSE and Optimizer and found no invented features, no invented version numbers, and no distorted quotations except the one below. The failures are concentrated in the meta-layer — what the series says about its own confidence — which is exactly the layer this series stakes its credibility on.

**All eight posts are `draft: true`. No prohibited IBM employee names appear anywhere. All internal links resolve.**

---

## Findings

| Severity | File | Claim as written | Why it is wrong | Suggested fix |
|---|---|---|---|---|
| **CRITICAL** | `02-version-comparison.mdx` L326–328 | "The 9.x dates are not confirmed, and we will not compute them. The lifecycle date tables for the 9.x releases are rendered client-side by a JavaScript single-page application, and the cells come back empty when the pages are fetched. We could read the policy. We could not read the dates." | False as of the fact base's 2026-08-12 correction. REL-05a is CONFIRMED: 9.0.x publishes transition **30-Jun-2027** (AD26-0622) and completion **30-Jun-2031**. The page is cached at `text/mas-90x.txt` (last updated 24-Jun-2026) with all three dates legible. GAP-01 is marked **CLOSED**. The "empty cells" finding was a regex failure on IBM's `25-Jun-2024` format, which Parts 0 and 7 both explicitly acknowledge as a corrected error. | Replace with the corrected record: 9.0 transition 30 Jun 2027 / completion 30 Jun 2031 published; 9.1 and 9.2 have GA dates but no transition dates yet, because IBM issues those in a later announcement letter (REL-05d). |
| **CRITICAL** | `02-version-comparison.mdx` L341 | Gap table row: "**GA dates for 9.0 and 9.1** \| Widely repeated as June 2024 and June 2025, consistent with the annual June cadence 9.2 follows — **unverified as of August 2026**" | Directly contradicted by REL-10 (**CONFIRMED**, explicitly "superseding an earlier UNCONFIRMED entry") and by cached `mas-90x.txt` (GA 25-Jun-2024, AD24-0483) and `mas-91x.txt` (GA 24-Jun-2025, AD25-1186). Also contradicts Part 1 L109 and Part 0 L169–171, which state these as confirmed from IBM lifecycle pages. | Delete the row. GA dates are confirmed from primary IBM lifecycle pages. |
| **MAJOR** | `02-version-comparison.mdx` L23, L31, L36, L104, L381, L401 | Six further repetitions: FAQ frontmatter "we could not read published end-of-support dates for any 9.x release"; keyTakeaway "Published end-of-support dates for 9.0, 9.1 and 9.2 could not be read"; tldr "9.x end-of-support dates could not be read at all"; comparison table row "**Published EOS date** \| Could not be read \| Could not be read \| Could not be read"; body key takeaway; body FAQ. | Same defect as above, propagated through frontmatter, the headline comparison table, and both FAQ copies. The table row is the most damaging: it is the one-screen summary readers screenshot. | Change the 9.0 cell to "**30 Jun 2027** transition / 30 Jun 2031 completion"; 9.1 and 9.2 cells to "Not yet published". Rewrite all five prose instances. |
| **MAJOR** | `02-version-comparison.mdx` L340 | Gap table row: "**End-of-support dates for 9.0, 9.1, 9.2** \| Could not read — SPA-rendered tables returned empty" | Wrong for 9.0 (published and cached). For 9.1/9.2 the accurate statement is "IBM has not published a transition date yet" — an affirmative confirmed finding (REL-05b/c), not a research failure. The distinction matters: the post currently tells readers the information exists but the researchers couldn't get it. | Split the row: 9.0 → published, cite the dates; 9.1/9.2 → "IBM has not yet issued the announcement letter". |
| **MAJOR** | `06-upgrade-watchlist.mdx` L401 | "The actual dated table is rendered client-side on IBM's lifecycle page and could not be read — *unverified as of August 2026*. What would settle it: reading the rendered lifecycle table in a browser session…" | Same stale finding. The 9.0.x table *was* read and is cached. Compounding the problem, the post tells the reader to go do a one-minute browser check that the project has already completed and recorded. | Replace with the confirmed 9.0 dates and the "9.1/9.2 letter not yet issued" framing, matching Part 7 L264–280, which handles this correctly. |
| **MAJOR** | `01-what-it-actually-is.mdx` L244, L254, L339 | "There is no equivalent published lifecycle page for 9.2 that we could retrieve." / table cell "No lifecycle page retrieved" / "No equivalent 9.2 lifecycle page could be retrieved." | False. REL-05c is CONFIRMED and the page is cached at `text/mas-92x.txt`, accessed 2026-08-12: GA **25-Jun-2026**, announcement letter **AD26-0673**, PID 5737-M66, Support Cycle-3, last updated 25-Jun-2026. | State that the 9.2.x lifecycle page exists and publishes GA 25 Jun 2026 under AD26-0673, with no transition date yet. |
| **MAJOR** | `01-what-it-actually-is.mdx` L117, L254 | Cadence table row "MAS 9.2 \| Announced 25 June 2026 \| Webinar 30 June 2026"; lifecycle table "MAS 9.2.x \| Announced 25 Jun 2026" | Two problems. (a) The "Announcement letter" column contains a webinar date — a category error — when the actual letter **AD26-0673** is confirmed (REL-05c) and is supplied for 9.0 and 9.1 in the same table. (b) 9.2 is described as "Announced" while 9.0/9.1 get "General availability", implying 9.2's GA status is weaker; REL-05c confirms **GA 25-Jun-2026**. | Put `AD26-0673` in the announcement-letter cell and change "Announced 25 June 2026" to "25 June 2026" under General Availability. |
| **MAJOR** | `00-series-index.mdx` L222 | FAQ body: "Four things, each flagged in place rather than omitted: published end-of-support dates for MAS 9.0, 9.1 and 9.2; **confirmed GA dates for 9.0 and 9.1**; whether Feature Channel builds carry production entitlement; and … Granite … GPT-OSS-120B." | Contradicts the *same post* in four places: the frontmatter FAQ (L25, which says the lifecycle item "was resolved during verification"), the lifecycle table (L169–171), the "Three Open Questions" table (L181–186), and the correction note (L187). This is the stale first-draft FAQ left in beside its own replacement. | Replace the body FAQ with the frontmatter FAQ text (three open items, plus the resolved-fourth note). |
| **MAJOR** | `00-series-index.mdx` L160 | "It does not assert what it could not verify. **Four** significant claims are labelled unverified and appear with that label attached, **including end-of-support dates for the entire 9.x line**." | Same contradiction. The post's own table 9 lines above publishes 9.0's transition and completion dates, and the post elsewhere says there are **three** open questions. | "Three significant claims are labelled unverified" and drop the EOS clause. |
| **MAJOR** | `01-what-it-actually-is.mdx` L347 | "**Feature Channel entitlement — a note on why this one is settled.** You may encounter secondary commentary treating Feature Channel production entitlement as an open question. **It isn't** … the governing policy statement is unambiguous and it is IBM's." | Contradicts the fact base directly. GAP-03 is **open**; REL-12 is **UNCONFIRMED** and marked "Must be re-checked before being asserted"; REL-15 states the pre-GA-stream reading "**remains inference, not an IBM statement** — it strengthens the case but does not close GAP-03." Also contradicts Part 0 L184, Part 2 L345, Part 6 L405 and Part 7 L195, all of which correctly flag it unverified. Part 1 is the sole outlier. Note the underlying IBM sentence is genuinely ambiguous: "IBM provides non-production components exclusively through … Feature Channel" constrains where non-production components come from, and does not by itself establish that FC builds carry no production entitlement. | Downgrade from "settled" to what REL-14/REL-15 permit: state the nine-month pre-GA chronology as **fact**, state the policy quote as **fact**, and keep the entitlement conclusion flagged as **inference**. Part 7 L176–195 is the model to copy. |
| **MAJOR** | `07-fomo-reality-check.mdx` L68 | "…with agentic capabilities that **\"guide decisions and move work forward.\"**" — presented as a direct quotation from IBM's announcement. | **Cannot be traced to any source.** The phrase appears nowhere in the fact base and nowhere in `MAS92-SOURCES/` (grep across `raw/` and `text/` returns zero hits). The IBM announcement page is **not cached at all** — there is no announcement file in either directory, so no announcement quotation in this series is verifiable. REL-01/REL-03 support only "asset-first AI" and the embedding-into-workflows framing. This is the only untraceable quotation in all eight posts. | Either cache the announcement page and verify the wording, or drop the quotation marks and paraphrase to the REL-03-supported framing. |
| **MAJOR** | `07-fomo-reality-check.mdx` L361 | "Several headline AI capabilities exist only at announcement level. Maximo Condition Insight, AI in Field Service Management, **Maximo Assistant on Mobile**, conversational scheduling — these come from IBM's announcement blog, **not from product documentation we could verify**." | Maximo Assistant on Mobile **is** documented in a cached primary IBM page. `text/mobile-92-whats-new.txt` L258–265: "AI assistant is now available in Maximo Mobile app. If you have AI assistant configured for Maximo Manage and security permissions to access it, you can use AI assistant in Maximo Mobile. Currently, it works only in online mode." Part 5 classifies it **Tier 1 — documented** (L102) and even cites the online-only constraint (L147). Part 7 is wrong against the source and contradicts its sibling post. | Remove "Maximo Assistant on Mobile" from the announcement-only list. Condition Insight, FSM and conversational scheduling are correctly placed (AI-08). |
| **MINOR** | `05-ai-layer.mdx` L258 | "The announcement also lists **AI-assisted incident classification**. The documentation describes summarisation and solution generation, not classification. That specific capability stays in Tier 2." | Under-searched. `text/hse-92-whats-new.txt` L46–60 documents "**AI-powered incident categorization**" — an MCC model analysing incident summary and details to suggest Incident Type and Incident Category, returning "multiple suggestions ranked by confidence". Part 4 L364 reports it as documented. Part 5 looked only at Maximo IT. The two may be distinct capabilities (IT service-desk vs HSE safety incidents), but Part 5 asserts absence from documentation without checking the product page where a near-identical capability is documented. | Add a cross-reference: note the HSE MCC incident categorization is Tier 1, and scope the Tier 2 claim narrowly to Maximo IT incident classification. |
| **MINOR** | `07-fomo-reality-check.mdx` L164 | "If you run Nuclear, **Aviation**, Utilities, **Oil and Gas**, Transportation, Civil Infrastructure or Service Provider, your 9.2 date is set by your industry solution's ship date." | Two of the named solutions demonstrably shipped 9.2. PLAT-03 names "Maximo Aviation 9.2" in the confirmed multi-architecture list, and OG-01 is CONFIRMED from the cached Oil & Gas 9.2 what's-new (`oilgas-92-whats-new.txt`). Part 4 covers Oil & Gas 9.2 features in detail. The sentence is hedged as a historical pattern rather than a claim of non-availability, which keeps this minor, but it invites readers to treat shipped solutions as blockers. | Note that Aviation 9.2 and Oil & Gas 9.2 are confirmed shipped, and frame the gate as "verify per solution" rather than listing those two among the likely-late. |
| **MINOR** | `02-version-comparison.mdx` L199 | Table: "**Asset data dictionary removed** \| 9.1 \| IBM directs you to Maximo Monitor instead" | The cached source (`manage-91-whats-new.txt` L36–38) says "the Asset data dictionary is **no longer relevant**. Use Maximo Monitor instead", under a "Deprecated applications" heading. BASE-03 renders this as "no longer available". "Removed" is a third, stronger word than either. The Monitor redirect is exactly right. | Use IBM's wording — "no longer relevant / deprecated" — or BASE-03's "no longer available". |
| **MINOR** | `06-upgrade-watchlist.mdx` L199 | "IBM Power (ppc64le) support covers those plus **Maximo IT and ACM back at 9.1**." | Maximo IT and ACM are already inside "those" (the s390x list just given), so "plus" is wrong; the actual distinguishing fact is that IT and ACM are the only two reaching back to 9.1. Substance matches PLAT-03; the sentence just doesn't parse to it. | "…covers the same set, with Maximo IT and ACM additionally supported back at 9.1." |
| **MINOR** | `06-upgrade-watchlist.mdx` L9 | `author: "Swetansh Kumar"` | The other seven posts are authored by "Venkat Achanta". Not an accuracy defect, but an inconsistency inside a single series that a reader will notice on the byline. | Confirm intended, or align. |

---

## Coverage

What I checked in each of the seven mandated categories, so the thoroughness is auditable.

### 1. Fabricated facts

Extracted the concrete factual assertions from each post and traced each to a fact base ID or cached source text. Checks performed:

- **Manage 9.2 detail claims (Part 3)** — grepped `manage-92-whats-new.txt` for 21 specific tokens the post asserts: `FISMA`, `AnalyzeUnperformed`, `iterativeConflictFixVerbose`, `Maximum Lead Lag`, `EVENT meter`, `Inhibit Alert`, `ABC` (Count Books selection type), "up to nine" KPIs, `Prevent Asset Population from Location`, `Bypass Accuracy Validation`, `ISO 15189`, `ISO/IEC 17025`, `Rotational` shift labor, `Destination Travel Matrix`, `mxe.app.invuse.preventAutoSplitRotating`, `Purchase Requisition` search field, `Related Meters`, crew `Supervisor` field, `relaxOptionalRelationship`, and the `7 PM` / `9 AM` lead-lag worked example. **All 21 present.** Part 3 contains no fabricated Manage content.
- **Manage 9.0 component version table (Part 2 L118–131)** — checked every row against `manage-90-whats-new.txt`. All correct, **including two components absent from fact base BASE-01**: "IBM Maximo Connector for Workday Applications 9.0.7" (source L63–64) and "IBM Maximo Connector for TRIRIGA 9.0.1" (source L61–62). These looked like fabrications against the fact base and are not — **the fact base is incomplete here, not the post.**
- **MVI (Parts 4, 6)** — read `mvi-92-whats-new.txt` in full. TensorFlow/PyTorch transition, Caffe and Darknet removal, SSD and GoogleNet deprecation, ground-truth validation with precision/recall/IoU, resource sharing, visual prompting tooltips, iOS Maximo Mobile inspection, TensorRT/CoreML edge continuity, and the Pascal/P100 retroactive removal via fix packs ("May 2026" fix-pack reference) — all verbatim accurate in both posts.
- **HSE (Part 4)** — verified Waste management application, Companies application in the Safety module, Envizi GHG API CO₂e calculation, MCC incident categorization with confidence-ranked suggestions, and the Permit to work mobile application against `hse-92-whats-new.txt`. All present.
- **Maximo IT (Part 4)** — verified Offerings Creation/Service offerings, Service bundling in Self Serve, sound notifications on Self Serve chats, Reliability tab in Service View, MaaS360 integration, IT Details tab auto-display, Self Service Center deprecation, and **Java 25 support** against `maximo-it-92.txt`. All present. Java 25 for Maximo IT is not in the fact base but is in the source.
- **REF (Part 4)** — verified five documents / 15 MB / PDF or DOCX lease limits, AES-256-GCM and RSA hybrid encryption, Amazon RDS for Db2 (licences not included), Cisco Webex occupancy check-in, User Migration Tool now built in, timezone migration tool, and **Semeru JDK 21 up from JDK 17** against `ref-92-whats-new.txt`. All present.
- **Health/Predict (Part 4)** — verified electrical transmission and distribution health models, probability of failure analysis, dynamic weights visibility, deterministic ID generation, HealthLib custom Python libraries, scoring group hierarchies, up-to-six meter comparison, and batch-processing/multi-threading scoring against `health-predict-92.txt`. All present.
- **Upgrade mechanics (Part 6)** — verified the Integrity Checker / `validate_integ.sh` / `maxinst` pod instruction, the disable-custom-triggers step, both `maxobjectcfg` and `maxsysindexes` SQL queries, and the same-cluster n-1 version constraint against `upgrade-manage-checklist.txt`; the `datamodel-migration` job, `externalId` SCIM field, `instance_id-datamodelmigration` log name, and the `User_pre_upgrade_91_backup` / `Group_pre_upgrade_91_backup` MongoDB renames against `user-auth-upgrade-91.txt`; and the CLI (`mas update`) **and Ansible** dual path against `db2-upgrade-11-to-12.txt`. All present and accurate.
- **MAF deprecations (Parts 2, 6)** — `chat-log` deprecated at 9.2, `container` at 8.10, `page-header` at 8.11, all verified against `deprecated-maf.txt`.

**Result: one fabrication-class finding** — the unsourced announcement quotation in Part 7 L68. No fabricated features, version numbers, quantities or product behaviours found.

### 2. Unverified claims asserted as fact

| Item | Required handling | Result |
|---|---|---|
| Feature Channel production entitlement (REL-12 / GAP-03), with REL-14/REL-15 permitting the chronology as fact but not the inference | Must carry explicit unverified marker | **Part 1 FAILS** — declares it "settled" (L347). Parts 0, 2, 6, 7 all correct. Part 7 is exemplary: publishes the REL-14 build table as fact, then flags the inference as "ours, not IBM's" |
| AI Service Granite 3-2-8B → OpenAI GPT-OSS-120B (AI-09 / GAP-06) | Must be flagged, never asserted | **PASS in all four posts that mention it.** Part 0 L185, Part 2 L184, Part 5 L287 (full unverified aside, including the 29 Jan 2026 and Feb 2026 dates correctly attributed to TMG's own prior research), Part 7 L348. No post asserts it |
| Asset Investment Planning 9.2 (AIP-01, REPORTED not CONFIRMED) | Must be marked as reported | **PASS.** Part 4 L378–380 carries a dedicated "Reported, not confirmed" aside naming the search-summary provenance, and the summary table L410 repeats the flag |
| 9.2 upgrade path matrix (GAP-04) | Must be flagged | **PASS.** Part 1 L341, Part 6 L395–399 (which usefully adds the verbatim n-1 policy quote and correctly labels applying it to a 9.2 target as *inference*), Part 7 L119–121 |
| 9.x lifecycle dates — now CONFIRMED per REL-05a/b/c, REL-10, GAP-01/02 CLOSED | Posts may state them; flag any post still calling them unpublished or unreadable | **Parts 1, 2 and 6 FAIL** — see findings table. Parts 0 and 7 are correct, and both include an honest note about the earlier extraction error |
| AppPoints ratio / cost changes (GAP-08) | Should be flagged | **PASS.** Part 1 L345, Part 5 L276 and L304 |
| 9.0/9.1 content from TMG's earlier series (BASE-06, UNCONFIRMED) | Should be flagged | **PASS in Part 2** — L180–182 explicitly flags watsonx.ai problem-code suggestions, FMEA Content Builder, Similarity Tracker and AI Service as a separately licensed component as unconfirmed. **Slight gap in Part 0**: the glossary (L201) states "Role-Based Application — the Carbon-UI applications that replaced Work Centers" as settled fact, which is BASE-06 UNCONFIRMED territory. Too minor to table, but noted |

### 3. Announcement-only claims presented as documented (AI-08)

Part 5's evidence-tiering is the right structure and mostly executes well. Checked each AI-08 item:

- **Maximo Condition Insight** — Tier 2 in Part 5, announcement-only in Part 7. Correct in both.
- **AI in Field Service Management** — Tier 2 in both. Correct.
- **Maximo Assistant on Mobile** — Part 5 correctly promotes to Tier 1 with primary-source justification (Mobile 9.2 page); **Part 7 wrongly keeps it Tier 2**. Tabled above.
- **MVI on-device local inference** — Part 5 Tier 1. Defensible: MVI-08 is CONFIRMED for real-time inspection with trained models directly on iOS devices. Strictly, "runs on device" is a small inference from "run real-time inspections on iOS devices", but the post names iOS explicitly and flags the platform constraint, so this is fair.
- **Conversational scheduling / what-if** — Part 5 splits this correctly: natural-language what-if analysis is Tier 1 (OPT-07, confirmed in the Manage 9.2 source), conversational scheduling stays Tier 2. Good discrimination.
- **AI-assisted incident classification** — Part 5 Tier 2; HSE source documents a near-identical capability. Tabled above as MINOR.
- **Document abstraction beyond leases (OEM manuals, inspection procedures, licensing agreements)** — Part 5 L240 Tier 2, correctly, with an explicit "do not build a business case on this yet".

Part 5's explicit warning that three capabilities are documented in *component* pages rather than the suite page (L86, L116) is a genuine improvement on the fact base's own AI-08 classification.

### 4. Distorted quotations

Every direct quotation in the series was checked character-by-character against cached source text.

| Quotation | Where | Result |
|---|---|---|
| Db2 30-day trial / production outage: "Upgrading from Db2 11 to 12 requires explicit opt-in activation and a valid IBM Db2 Warehouse license file. Without a valid license, Db2 12 operates under a 30-day trial license that causes production system outages after expiration." | Part 6 L129; paraphrased Parts 1 L291, 2 L298, 7 L146 | **Verbatim exact** vs `upgrade-prerequisites.txt` L12–15. Paraphrases in the other three posts preserve both the 30-day figure and the outage consequence |
| "The upgrade fails if the license file is not provided, preventing a silent downgrade to a trial license." | Part 6 L133 | **Verbatim exact** vs source L18–19 |
| "New Db2 12 installations do not require a license file. Only upgrades from 11 to 12 enforce this requirement." | Part 6 L142 | **Verbatim exact** vs source L21–22 |
| Add-on parity sentence: "Before you upgrade, you must consider whether the IBM Maximo Application Suite applications and add-ons are available for upgrade. If the applications or add-ons are no longer available, you must deactivate and delete those applications and add-ons." | Part 1 L281, Part 6 L193, Part 7 L158 | **Verbatim exact** vs `upgrade-prerequisites.txt` L6–8 (trademark symbols dropped, which is standard). All three posts quote it identically. This is UPG-01, the sentence the brief flagged for special attention — it survives scrutiny |
| Feature Channel policy: "IBM provides non-production components exclusively through a continuous delivery (CD) stream know as Feature Channel. Delivered as part of our regular Operator Catalog updates, this channel introduces new features, developed for the next release, allowing early access for non-production environments. This is offered alongside and in parallel with our normal maintained releases." | Part 1 L137 | **Verbatim exact** vs `lifecycle-90plus.txt` L34 — the post even preserves IBM's own typo "know as". The *quotation* is impeccable; only the conclusion drawn from it is over-stated (see findings) |
| Support Cycle-3: "3 years of support with critical fix extension of 1 year and usage and existing fixes for 3 (3+1+3)" | Part 1 L171/L383, Part 2 L316 | **Verbatim exact** vs `mas-92x.txt` L34 and `mas-90x.txt` |
| User API instruction: "If your integrations or scripts use the deprecated APIs, update them to use the new APIs before you upgrade to 9.2." | Part 2 L270, Part 6 L172 | **Verbatim exact** vs `upgrade-prerequisites.txt` L44–45 |
| n-1 upgrade policy, four sentences ending "you need to upgrade first to 9.0.x and then to 9.1.x." | Part 6 L397 | **Verbatim exact** vs `upgrade-manage-checklist.txt` L19–25 |
| Agentic assistant: "can now act as a single agent that analyzes requests and works across a defined set of AI tools" | Part 2 L168, Part 5 L123, Part 7 L360 | **Accurate** vs `mas-92-whats-new.txt` L219. Consistent across all three posts |
| MCP server: custom AI tools from automation scripts, object structures, workflows | Part 5 L153 | **Accurate** vs `mas-92-whats-new.txt` L243 |
| AppPoints path: "Actions > Check AppPoints … in the Instances table, locate AI Service" | Part 5 L268 | **Accurate** vs `mas-92-whats-new.txt` L256–257 |
| Assistant on Mobile online-only constraint | Part 5 L147 | **Accurate** vs `mobile-92-whats-new.txt` L258–265 |
| Announcement: agentic capabilities that "guide decisions and move work forward" | Part 7 L68 | **UNTRACEABLE** — see findings. Zero hits across `raw/` and `text/`; the announcement page is not cached |

**One failure out of thirteen quotations checked.** Quotation discipline is otherwise excellent.

### 5. Internal contradictions across the eight posts

Checked each thread the brief named, plus the ones the audit surfaced.

| Thread | Result |
|---|---|
| **Java per release (9.1 = 17, 9.2 = 25)** | **CONSISTENT** across Parts 0, 2, 3, 4, 6, 7. Verified against source: `manage-91-whats-new.txt` L101–103 (Java 17) and `manage-92-whats-new.txt` L456/L507–510 (Java 25, Manage and Optimizer). BIRT 4.16 → 4.21 also consistent and verified (source L105–106 and L511–512) |
| **Assist → Collaborate → Manage add-on** | **CONSISTENT** across Parts 0, 2, 3, 6, 7. Renamed at 9.1 (UPG-11, verified in `upgrade-prerequisites.txt` L57–61), deprecated as suite add-on and moved into Manage at 9.2 (PLAT-26/MNG-04). Sub-details — Expert Groups → Person Groups, Technicians → Labor, ICE config → Mobile Configuration, Collaborate Sessions → Collab Session, SNO restriction — identical wherever repeated |
| **MAS 8.x dates (30 Apr 2026)** | **CONSISTENT** across Parts 0, 1, 2, 7. 8.11-LTS GA 26 Sep 2023 / 223-0230 and 8.10-LTS GA 28 Mar 2023 / 223-043 both match REL-06/REL-07; the LTS "Fix Availability Completion + Extended Support available" vs CD "Completion of Support, no extended option" distinction is preserved correctly in every post that draws it |
| **9.0 / 9.1 / 9.2 GA dates (25 Jun 2024 / 24 Jun 2025 / 25 Jun 2026)** | **CONTRADICTION.** Parts 0, 1, 7 state them as confirmed from lifecycle pages. **Part 2 L341 says the 9.0 and 9.1 GA dates are "unverified as of August 2026."** Part 2 is wrong |
| **9.0 transition 30 Jun 2027 / extended completion 30 Jun 2031** | **CONTRADICTION.** Parts 0 (L169), 1 (L240, L252, L361) and 7 (L266–276) publish both dates. **Parts 2 and 6 say no 9.x dates could be read at all.** Parts 2 and 6 are wrong. Part 1 is internally inconsistent too: it publishes the 9.0 dates at L240 and L252, then at L339 and L350 lists "published EOS dates for MAS 9.1 and 9.2" as unverified — that narrower claim is *correct*, but sits beside the incorrect "no 9.2 lifecycle page retrieved" |
| **Db2 licence requirement** | **CONSISTENT** across Parts 0, 1, 2, 6, 7. Every instance carries all four elements: opt-in activation, Db2 Warehouse licence file, `db2_v12_upgrade` flag, and the new-install exemption. No drift |
| **Feature Channel entitlement** | **CONTRADICTION.** Part 1 L347 "settled"; Parts 0, 2, 6, 7 "unverified". Part 1 is the outlier and is wrong per GAP-03/REL-15 |
| **Maximo Assistant on Mobile** | **CONTRADICTION.** Part 5 Tier 1 documented (correct, sourced); Part 7 announcement-only (wrong) |
| **AI incident classification** | **TENSION.** Part 4 reports HSE AI-powered incident categorization as documented (correct); Part 5 says incident classification is announcement-only |
| **MVI Pascal / retroactive fix-pack removal** | **CONSISTENT** across Parts 0, 4, 6, 7, including the "staying on an older version is not a safe harbour" reasoning |
| **User sync removal + three removed API families** | **CONSISTENT** across Parts 0, 2, 6, 7. The three families are named identically everywhere (user creation, workspace assignment, role assignment) |
| **9.2.1 as current level, 30 Jul 2026** | **CONSISTENT** where stated (Part 1 L145, Part 7 L191/L197), matching REL-13 |
| **Series metadata** | **CONSISTENT.** All eight declare `series.name: "MAS 9.2"`, `total: 7`, with `part: 0` through `7` exactly once each |

### 6. Prohibited content

- **IBM employee names from the PLAT-04 editorial placeholder.** The placeholder in `mas-92-whats-new.txt` L35–38 names **"Mary"** and **"Shajeena Syed" (Snr Dev Lead)**. Grepped all eight posts for `Shajeena`, `Syed`, and word-boundary `Mary`: **zero hits.** Also grepped for `DeKeyrel` and `Kendra` (the announcement author named in REL-01): **zero hits** — Part 1 L103 correctly refers to "IBM's VP of Asset Lifecycle Management Product Engineering" by title only. **PASS.**
- The three posts that use the placeholder as evidence (Part 1 L273, Part 2 L350, Part 6 L197, Part 7 L162) all cite only the substantive point — that the support list was still being cross-checked and that multi-arch delivery lands per monthly FC release — exactly as PLAT-04's editorial note instructs. **PASS.**
- **`draft: false`.** Grepped all eight: **zero hits.** All eight are `draft: true`. **PASS.**

### 7. Broken internal links

Extracted every `/blog/<slug>` occurrence across all eight files (31 total) and reduced to 8 distinct targets. Mapped each against the `slug:` frontmatter values:

| Link target | Resolves to | Status |
|---|---|---|
| `/blog/mas-92-series-index` | `00-series-index.mdx` | ✅ |
| `/blog/mas-92-what-it-actually-is` | `01-what-it-actually-is.mdx` | ✅ |
| `/blog/mas-92-vs-91-vs-90` | `02-version-comparison.mdx` | ✅ |
| `/blog/mas-92-manage-features` | `03-inside-manage.mdx` | ✅ |
| `/blog/mas-92-suite-applications` | `04-outside-manage.mdx` | ✅ |
| `/blog/mas-92-ai-features` | `05-ai-layer.mdx` | ✅ |
| `/blog/mas-92-upgrade-watchlist` | `06-upgrade-watchlist.mdx` | ✅ |
| `/blog/mas-92-fomo-reality-check` | `07-fomo-reality-check.mdx` | ✅ |

**No broken internal links. No orphaned targets. No slug typos.**

Also checked the non-`/blog/` slug references in frontmatter (`clusterSlugs`, `relatedSlugs`). All resolve within the series except `mas9-upgrade-gotchas` (Part 6 L77), which resolves to `posts/2026-07-22-mas9-upgrade-gotchas.mdx` — an existing post. **PASS.**

---

## Verified correct

Significant claims I actively tried to break and could not. Listing these so the clean bill on the feature content is as auditable as the failures.

**Release identity and dates**
- MAS 9.2 announced 25 June 2026, webinar 30 June 2026 (REL-01/REL-02)
- 9.0 GA 25-Jun-2024 / AD24-0483; 9.1 GA 24-Jun-2025 / AD25-1186; 9.2 GA 25-Jun-2026 / AD26-0673 — all three read from cached lifecycle pages
- 9.0 transition 30-Jun-2027 (AD26-0622), extended completion 30-Jun-2031; 9.0.x page last updated 24-Jun-2026 (Part 1 L240 states this correctly); 9.1.x page last updated 13-Feb-2026
- MAS Core 9.2.1 released 30 July 2026 and is the current level, not 9.2.0
- The nine-month pre-GA Feature Channel run (Sept release published 6 Oct 2025 → April 2026, then 9.2.0 and June FC on 25 Jun 2026) — Part 7's table reproduces all nine rows accurately per REL-14
- All 8.x streams converged on 30 Apr 2026, with the LTS/CD extended-support distinction correctly drawn
- Support Cycle-3 policy, MINOR-bump lifecycle reset, and the ≥6-month transition warning — all verified against `lifecycle-90plus.txt`

**Platform and upgrade**
- Db2 12 support, the 11→12 licence gate, `db2_v12_upgrade`, the deliberate hard failure, and the new-install exemption
- Three administrative permission modes (cluster/namespaced/minimal), OperatorHub defaulting to minimal, mode unmodifiable during upgrade, and `mas upgrade` from 9.1 inheriting cluster mode — all four elements correct in Part 6
- PV access modes RWX/RWO unchangeable after creation without data loss
- Cloud Pak for Data 5.2 and Python 3.12
- Multi-architecture support: s390x for six named solutions at 9.2; ppc64le for the same six with Maximo IT and ACM reaching back to 9.1
- The full pre-upgrade sequence in Part 6 (Integrity Checker via Tools API or `validate_integ.sh` in the `maxinst` pod, disable custom triggers, both pending-config SQL queries, same-cluster n-1 constraint) — verified line by line
- SCIM migration mechanics: pre-upgrade `datamodel-migration` job, `externalId`, the `instance_id-datamodelmigration` log path, and the `User_pre_upgrade_91_backup` / `Group_pre_upgrade_91_backup` MongoDB renames

**Manage 9.2**
- Tickets and Alerts as the two new applications; Alerts under the Service Desk module
- Alert insights analysing alert content, asset details, work history and meter data, with high/medium/low confidence scores, viewed in Tickets, generating pre-filled work orders
- Calibration accuracy validation explicitly citing ISO/IEC 17025 and ISO 15189, with unit conversion, warning/enforcement modes, and the Bypass Accuracy Validation checkbox on either asset for older, emergency or non-standard equipment
- All six time zone processing rules, in the correct order and combinations
- Oracle `alter session set use_stored_outlines = true` removal as the release's clear breaking change
- The Optimizer set: dynamic pod scaling on CPU or queue length, queue worker distribution to the fewest-active-jobs pod, LNS for thousands of work orders, capacity planning by craft/shift/day, natural-language what-if, conflict diagrams, `AnalyzeUnperformed`, `iterativeConflictFixVerbose`, the three predecessor constraint fields, and the 7 PM vs next-day-9 AM lead-lag worked example
- Part 3's careful hedge on calibration ratios — "a meaningful accuracy ratio" rather than inventing a specific TUR figure the source does not state — is exactly right

**Suite applications**
- Monitor: IoTP dependency removed, Monitor as single system of record, IoTP optional and lightweight for MQTT only, registry migration at upgrade, CSV ingestion from COS/S3/PV, the three ingestion methods, the three-tier EDC fallback with 1-hour retry and the honest "zero data loss *after the detection period*" wording, RBAC complementing rather than replacing role-based access, `AlertByOccurrencesCount` / `NoDataAlert`, hierarchy dashboards
- MVI, Health/Predict, Maximo IT, REF, HSE and Oil & Gas — every specific claim spot-checked resolved to cached source text (detailed in Coverage §1)
- HSE and Oil & Gas receiving an identical three-area payload (HSE-01/OG-01)

**Method and honesty**
- Parts 0 and 7 both disclose the earlier lifecycle-extraction error rather than silently presenting the corrected answer — a genuinely good practice that also makes the residual staleness in Parts 1, 2 and 6 harder to excuse
- Part 4's AIP caveat, Part 5's evidence-tiering, Part 6's labelling of the n-1 policy application as inference, and Part 7's separation of confirmed chronology from ours-not-IBM's inference are all correctly executed

---

## Recommended fix order

1. **Part 2 lifecycle sweep** — nine locations (L23, L31, L36, L104, L326–328, L340, L341, L381, L401). Largest single concentration of error in the series.
2. **Part 7 L68** — remove or source the announcement quotation. It is the only untraceable quote and the series' credibility claim rests on quotation discipline.
3. **Part 1** — the 9.2 lifecycle page (L244, L254, L339), the announcement-letter cell (L117), and the Feature Channel "settled" section (L347).
4. **Part 6 L401** — lifecycle staleness.
5. **Part 0 L160 and L222** — reconcile with the post's own table and frontmatter.
6. **Part 7 L361** — remove Maximo Assistant on Mobile from the announcement-only list.
7. Minor items as tabled.

One process observation worth recording: every error in this audit is a **staleness or reconciliation** failure, not a research failure. The fact base was corrected on 2026-08-12 (GAP-01 and GAP-02 closed, REL-05a/b/c and REL-10 added), Parts 0 and 7 were updated to match, and Parts 1, 2 and 6 were not. A post-correction sweep across all posts for the superseded claim — rather than updating only the posts being actively edited — would have caught the majority of what is in this report.
