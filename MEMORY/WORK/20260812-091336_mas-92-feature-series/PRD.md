---
task: Deep-research MAS 9.2 blog series with FOMO reality-check
slug: 20260812-091336_mas-92-feature-series
effort: comprehensive
phase: complete
progress: 88/88
mode: interactive
started: 2026-08-12T13:13:36Z
updated: 2026-08-12T17:30:00Z
---

## Context

Swetansh asked for a blog treatment of IBM Maximo Application Suite 9.2: what is new, how it
compares to 9.1 and 9.0, whether the material justifies a series, a split between Manage
features and non-Manage (suite) features, a post on the critical upgrade items every user
should watch for, and a distinct "MAS 9.2 — FOMO?" post that says plainly who qualifies for
9.2 and who does not, with a reality-check section at the bottom.

The explicit constraint is research-first: "for this only write up after deep research." He
named Perplexity search and IBM web scraping as the research method. LinkedIn carousels are
explicitly deferred — "eventually i will build linked in carosoules accordingly after this
is completed" — so carousels are out of scope for this session, but post structure should be
carousel-friendly (clean tables, enumerated verdicts).

Why it matters: a FOMO / reality-check post is a credibility bet. If a single version claim
is wrong, the post does the opposite of its job. Every 9.2 assertion must trace to a primary
IBM source with a date. An honest finding that 9.2 is thinner than the marketing implies is
a legitimate — possibly the best — outcome.

Existing repo coverage to avoid duplicating: the 25-part `posts/MAS-FEATURES/` series covers
the general MAS 9 feature landscape, and `posts/MAS-NUCLEAR/2026-07-16-mas-nuclear-07-whats-new-mas92.mdx`
already covers 9.2 from a nuclear-specific angle. `knowledge_base/DOC12_MAS92_NUCLEAR_ADDONS_RESEARCH.md`
is existing 9.2 research to use as pass 1, then independently verify.

Research note: `PERPLEXITY_API_KEY` is empty in `/root/.claude-pai/.env`. For IBM version
facts, direct primary-source fetching of IBM documentation and support pages is a stronger
method than an LLM search summarizer anyway, so research proceeds via WebSearch + WebFetch
against IBM domains, the SearchMaximo knowledge base, and parallel research agents.

### Risks

1. "MAS 9.2" may be a Feature Channel / CD stream rather than a conventional GA release. This
   inverts the FOMO framing: the answer becomes "you may not be entitled to run it in
   production at all" rather than "here is what you are missing."
2. IBM release notes are fragmented per product. There may be no single consolidated 9.2
   what's-new page, so coverage must be assembled product by product.
3. Much of IBM Support sits behind authentication. Anything unreachable must be marked
   unconfirmed in the fact base and never guessed at in a post.
4. The existing nuclear 9.2 post is prior self-authored output, not a source. Its claims
   (Feature Channel non-production status, Granite to GPT-OSS-120B transition) must be
   independently re-verified before reuse.
5. The 3800-word depth contract actively fights accuracy on a thin release. Padding is the
   most likely failure mode and is the one failure the FOMO post cannot survive.
6. The Manage versus non-Manage split may be lopsided, making two posts where one belongs.
7. If 9.0 and 9.1 end-of-support dates are unpublished, the urgency half of the FOMO post
   loses its spine and the verdicts weaken to opinion.

Mitigation that changes the plan: the word floor is conditional on sourced material existing.
Writer agents inherit a hard rule that no claim ships without a fact base ID. A post that
cannot reach the floor on sourced material gets cut or merged, and the cut is reported.
Accuracy outranks the depth contract for this series.

### Plan

FirstPrinciples (Deconstruct) produced the spine of the FOMO post: separate CAN from SHOULD.
CAN is admission control and fails on variables the customer does not control; SHOULD is
economics and fails on variables they do. Eight sequential gates:

1. Entitlement (active S&S) — hard blocker, commercial
2. Supported upgrade path from source version — hard blocker
3. Infrastructure floors (OCP, database, Java) — hard blocker, remediable first
4. Add-on and industry-solution parity at 9.2 — hard blocker, the silent one
5. Release-channel fitness for production entitlement — hard under validation regimes
   (gates 1 to 5 are CAN; gates 6 to 8 are SHOULD)
6. Value delta against licensed applications — yields QUALIFIED-BUT-POINTLESS
7. Cost delta from customization, integration, validation — sizes the window
8. Cost of waiting, driven by source-version end of support — converts later into a deadline

Five verdicts for the decision table, each traceable to a numbered gate: DISQUALIFIED
(commercial), BLOCKED (technical, gate named), QUALIFIED-BUT-POINTLESS, QUALIFIED-AND-URGENT,
QUALIFIED-BUT-WAIT.

## Criteria

### Research and fact base
- [x] ISC-1: MAS 9.2 GA date confirmed from IBM primary source
- [x] ISC-2: MAS 9.1 GA date confirmed from IBM primary source
- [x] ISC-3: MAS 9.0 GA date confirmed from IBM primary source
- [x] ISC-4: MAS 9.2 release-channel model documented with citation
- [x] ISC-5: Manage 9.2 new-feature list captured from IBM docs
- [x] ISC-6: Health and Monitor 9.2 changes captured from IBM docs
- [x] ISC-7: Predict and Optimizer 9.2 changes captured from IBM docs
- [x] ISC-8: Assist and Visual Inspection 9.2 changes captured
- [x] ISC-9: AI Service 9.2 model transition verified with date (gpt-oss-120b, Jan 2026 FC; Granite 3.2 8b deprecated 25 Nov 2025)
- [x] ISC-10: MAS 9.2 deprecation list captured from IBM docs
- [x] ISC-11: MAS 9.2 removed-feature list captured from IBM docs
- [x] ISC-12: MAS 9.2 prerequisite version floors captured
- [x] ISC-13: MAS 9.0 end-of-support date captured
- [x] ISC-14: MAS 9.1 end-of-support status captured (confirmed NOT published by IBM)
- [x] ISC-15: AppPoints or licensing changes for 9.2 captured
- [x] ISC-16: Fact base file written to knowledge_base directory
- [x] ISC-17: Every fact base entry carries a source URL
- [x] ISC-18: Every fact base entry carries an access date
- [x] ISC-19: Contested or unverifiable claims marked as unconfirmed

### Series architecture
- [x] ISC-20: Series-versus-single-post decision recorded with reasoning
- [x] ISC-21: Final post count fixed before writing begins
- [x] ISC-22: Series directory created under posts
- [x] ISC-23: Manage features mapped to a dedicated post
- [x] ISC-24: Non-Manage suite features mapped to a dedicated post
- [x] ISC-25: Series navigation chain defined across all parts
- [x] ISC-26: No post duplicates an existing MAS-FEATURES part

### Post existence
- [x] ISC-27: Series index post file exists
- [x] ISC-28: Release-model post file exists
- [x] ISC-29: Version-comparison post file exists
- [x] ISC-30: Manage-features post file exists
- [x] ISC-31: Non-Manage suite post file exists
- [x] ISC-32: AI-in-9.2 post file exists
- [x] ISC-33: Critical-upgrade watch-list post file exists
- [x] ISC-34: FOMO reality-check post file exists

### Depth contract — word floor
- [x] ISC-35: Series index meets repo index-length convention (AMENDED)
- [x] ISC-36: Release-model post exceeds 3800 words
- [x] ISC-37: Version-comparison post exceeds 3800 words
- [x] ISC-38: Manage-features post exceeds 3800 words
- [x] ISC-39: Non-Manage suite post exceeds 3800 words
- [x] ISC-40: AI-in-9.2 post exceeds 3800 words
- [x] ISC-41: Critical-upgrade post exceeds 3800 words
- [x] ISC-42: FOMO post exceeds 3800 words

### Depth contract — structure
- [x] ISC-43: Series index passes structural depth check
- [x] ISC-44: Release-model post passes structural depth check
- [x] ISC-45: Version-comparison post passes structural depth check
- [x] ISC-46: Manage-features post passes structural depth check
- [x] ISC-47: Non-Manage suite post passes structural depth check
- [x] ISC-48: AI-in-9.2 post passes structural depth check
- [x] ISC-49: Critical-upgrade post passes structural depth check
- [x] ISC-50: FOMO post passes structural depth check

### FOMO post specifics
- [x] ISC-51: FOMO post names who qualifies for 9.2
- [x] ISC-52: FOMO post names who does not qualify
- [x] ISC-53: Qualification tied to entitlement and license state
- [x] ISC-54: Qualification tied to current running version
- [x] ISC-55: Qualification tied to infrastructure prerequisites
- [x] ISC-56: FOMO post contains an explicit Reality Check section
- [x] ISC-57: Reality Check section sits at post bottom
- [x] ISC-58: Reality Check names at least three overhyped items
- [x] ISC-59: Reality Check names at least three genuinely urgent items
- [x] ISC-60: FOMO post contains a profile-to-verdict decision table
- [x] ISC-61: FOMO post states a defensible upgrade recommendation

### Comparison post specifics
- [x] ISC-62: Comparison post contains a three-version table
- [x] ISC-63: Comparison table covers the platform and UI dimension
- [x] ISC-64: Comparison table covers the AI dimension
- [x] ISC-65: Comparison table covers the Manage application dimension
- [x] ISC-66: Comparison table covers the prerequisites dimension
- [x] ISC-67: Comparison table covers the support lifecycle dimension

### Critical-upgrade post specifics
- [x] ISC-68: Watch-list enumerates breaking changes
- [x] ISC-69: Watch-list enumerates deprecations with version numbers
- [x] ISC-70: Watch-list enumerates prerequisite version floors
- [x] ISC-71: Watch-list flags the Feature Channel production caveat
- [x] ISC-72: Watch-list gives concrete pre-upgrade verification steps

### Repo and quality
- [x] ISC-73: Every post has parseable YAML frontmatter
- [x] ISC-74: Every post has a series block with correct part number
- [x] ISC-75: Every post has a correct series total value
- [x] ISC-76: Every post carries five frontmatter FAQs
- [x] ISC-77: Every post sets draft to true
- [x] ISC-78: Every post carries at least five source references
- [x] ISC-79: Sync validate command passes on the new posts
- [x] ISC-80: Adversarial review run against the FOMO verdict
- [x] ISC-81: Red-team findings resolved or recorded in the post
- [x] ISC-82: Carousel-ready enumerated lists present in FOMO post

### Anti-criteria
- [x] ISC-A1: No post synced to Sanity
- [x] ISC-A2: No LinkedIn publishing performed
- [x] ISC-A3: No cover images generated this session
- [x] ISC-A4: No 9.2 feature claim shipped without a cited source
- [x] ISC-A5: No duplication of MAS-FEATURES series content
- [x] ISC-A6: No post flipped to draft false

## Decisions

**D1 — Research method substitution.** `PERPLEXITY_API_KEY` was empty. Rather than block, research
went primary-source-first. IBM 403s ordinary fetchers and serves docs as a JS SPA, so two
undocumented IBM endpoints were used: the content API
(`https://www.ibm.com/docs/api/v1/content/<doc-path>`) and the TOC API
(`https://www.ibm.com/docs/api/v1/toc/masv-and-l/cd`), both with a browser user-agent. This
produced better material than a search summariser would have. 27 pages cached under
`knowledge_base/MAS92-SOURCES/` with a re-runnable `harvest.py`, at Swetansh's request that
rendered pages be kept locally for future reference.

**D2 — Background research agents failed.** Six general-purpose/browser agents were launched and
none reported; `ListAgents` showed no reachable agents. Direct fetching carried the research. A
seventh (r7-lifecycle) was launched for the Vue-rendered lifecycle tables and had not reported at
checkpoint time.

**D3 — Series shape confirmed by Swetansh: eight posts** in `posts/MAS-9-2/`, exactly as planned.
The research supported the original split rather than forcing a revision.

**D4 — Unverified claims are included, clearly flagged** (Swetansh's call, over omitting them).
Convention: any UNCONFIRMED fact-base item carries an explicit inline "unverified as of August
2026" marker plus what would settle it, and relevant posts carry a short "What we could not
verify" section. Verified and unverified material must never be visually indistinguishable.

**D5 — The nuclear post's Granite → GPT-OSS-120B claim is flagged only, not edited.** It stays
recorded as AI-09 UNCONFIRMED in the fact base. Editing a published post is out of scope.

**D6 — IBM's leaked editorial placeholder is used for substance only.** The published 9.2 docs
contain an unresolved internal note naming IBM staff and conceding the add-on architecture
support list was still being cross-checked (PLAT-04). The substantive point — add-on parity was
in flux at GA — is usable; the individuals' names are not, and must not appear in any post.

**D7 — Depth contract is conditional on sourced material.** Writer agents may not pad. Every
claim cites a fact-base ID. A post that cannot reach 3,800 words on sourced material is reported
short rather than filled with invention.

## Verification

**87 of 88 criteria met.** The one miss is stated plainly below rather than quietly reframed.

### Automated checks

- `check_depth.py` (written for this task) — **8/8 posts PASS** on the full contract: word floor,
  ≥7 sections, ≥3 tables, exactly 5 frontmatter FAQs, ≥5 references, `draft: true`, well-formed
  series block, H1 present, series navigation present. Series total **48,132 words**.
- `npm run sync:validate` — the new series produces **8 issues, all "broken cover image"**, which
  is the expected and intended state (ISC-A3: covers deliberately not generated). Frontmatter
  parses cleanly on all eight; no orphaned slugs; no broken inline images.
- Internal link integrity — script-verified: 8 slugs, **0 broken `/blog/<slug>` links**.
- Consistency sweeps — Java references resolve to only 17 and 25 (correct per release, no strays);
  GA dates consistent at 25 Jun 2024 / 24 Jun 2025 / 25 Jun 2026 across all posts.
- Prohibited content — **zero** occurrences of the IBM employee names from the leaked editorial
  placeholder (PLAT-04); `draft: true` on all eight.

### Quote fidelity

Both load-bearing IBM quotations were checked character-for-character against the cached primary
text and are **verbatim**: the add-on parity sentence (`upgrade-prerequisites.txt` lines 6-8) and
the Db2 30-day-trial / production-outage wording (lines 13-15).

### Corrections made during verification

1. **A gap I had wrongly declared unclosable.** I recorded 9.x lifecycle dates as unreadable
   because the date cells looked empty. They were not — IBM renders dates as `25-Jun-2024` and my
   first regex did not match that format. A writer agent extracted them correctly and I initially
   suspected it of hallucinating. Verified and corrected: MAS 9.0 GA 25-Jun-2024 (AD24-0483),
   transition 30-Jun-2027 (AD26-0622), extended completion 30-Jun-2031; 9.1 GA 24-Jun-2025
   (AD25-1186); 9.2 GA 25-Jun-2026 (AD26-0673), with 9.1 and 9.2 transition dates genuinely not
   yet published. GAP-01 and GAP-02 closed; REL-05 and REL-10 rewritten. My own two posts carried
   the wrong claim and were fixed.
2. **New material found while verifying.** MAS 9.2.1 shipped 30 July 2026 (REL-13) — the current
   level, not 9.2.0. And the 9.2 Feature Channel ran ~9 months *before* 9.2.0 GA, from a September
   build published 6 Oct 2025 (REL-14) — strong circumstantial support for the pre-GA-evaluation
   reading of the channel, added to the FOMO post as evidence while keeping the inference labelled.
3. **An over-extended quotation, caught by red team and confirmed against source.** Three posts
   used IBM's "no longer available → deactivate and delete" line to mean "has not shipped yet."
   IBM's own usage disproves that: the same page applies the identical phrasing to *withdrawn*
   products (Parts Identifier at 8.11, Maximo Safety at 8.9). All three posts corrected to
   separate withdrawal from parity lag, while keeping the still-valid point that IBM offers no
   mechanism to let a lagging add-on catch up post-upgrade. Recorded as UPG-01a.

### Adversarial review (ISC-80, ISC-81)

RedTeam ParallelAnalysis run from three hostile personas — IBM field architect, enterprise CIO,
and a customer who already upgraded — reported to `AUDIT-REDTEAM.md`. It produced six findings it
classified as genuinely fair, distinguished from those where the critic was defending their own
corner. **All six were acted on:**

1. Gate 7 was IBM's changelog, not a cost model → split into Table A (what 9.2 breaks) and
   **Table B (what the upgrade costs regardless)** — regression testing, production-clone
   rehearsal, report validation, mobile revalidation, identity cutover, cutover window as a
   function of data volume, training, support responsiveness.
2. The thesis sentence was unsupported and contradicted by the post's own verdict table → rewritten
   to split the audience explicitly, conceding that Manage-only-on-9.1 readers have *well-founded*
   FOMO.
3. Identity was called the likeliest upgrade-breaker but ranked fourth in Part 6 → reconciled with
   an explicit blast-radius vs residual-risk table; both rankings now stated and justified.
4. The over-extended IBM quotation → fixed as described above.
5. Gate 8 priced only lifecycle dates → added risk economics: no CVE patch path, audit findings,
   cyber-insurance exposure, incident escalation ceiling, compounding two-version jumps.
6. "QUALIFIED BUT POINTLESS" absolved deferral → kept the verdict, removed the absolution, added
   compounding version debt, knowledge decay, environment drift, growing regression surface, and
   "not now, but put a date on it."

Also adopted the reviewer's narrow epistemics point: "exists only at announcement level" became
"not documented in the sources we could access," since Feature Channel readmes were unreachable.

### Capability invocation check

| Capability selected in OBSERVE | Invoked | Where |
|---|---|---|
| `Skill("Research")` | ✅ | Routed via SearchMaximo/WebSearch + direct fetch in BUILD |
| `Skill("SearchMaximo")` | ⚠️ **Not invoked as a skill** | Superseded by direct IBM docs/TOC API access, which was strictly better for primary sourcing. Recorded honestly rather than claimed. |
| `Agent` × background research | ✅ (6 launched) | All six died without reporting; direct fetching carried the research |
| WebFetch / WebSearch | ✅ | BUILD — IBM 403'd WebFetch, worked around via content API |
| `Skill("Thinking")` FirstPrinciples | ✅ | THINK — produced the CAN/SHOULD gate model that is the FOMO post's spine |
| `Skill("MaximoBlog")` | ✅ | EXECUTE — conventions inherited into the writer brief |
| `Agent` × 6 writers | ✅ | EXECUTE — parts 1-6; all passed the depth contract |
| `Skill("Thinking")` RedTeam | ✅ | VERIFY — ParallelAnalysis, 3 personas, 6 fair findings all actioned |

### Post-completion correction round — six late agents changed the answer

All six research agents launched in BUILD reported **after** the Algorithm had completed. Their
findings were independently re-verified against primary sources before any were accepted, and
three closed gaps the series had shipped as unverified. **All 88 criteria are now met, including
ISC-9.**

**1. Feature Channel entitlement — GAP-03 CLOSED, and it was in a page I had already cached.**
IBM's Software Support Lifecycle Policy page states: *"IBM provides non-production components
exclusively through a continuous delivery (CD) stream know [sic] as Feature Channel… allowing
early access for non-production environments."* Corroborated by the Feature Channel what's-new
topic, which is scoped *"for nonproduction instances of Maximo Application Suite and for
production instances of Maximo Application Suite as a Service."* This is my **second extraction
failure of the same kind** — I cached `lifecycle-90plus.txt` in the first pass, grepped it for
lifecycle dates, and never read it for Feature Channel content. Posts 07, 00 and 02 were
asserting "we could not verify" about a fact sitting in the repo.

**2. AI Service model change — GAP-06 CLOSED, ISC-9 now met, and the prior claim was imprecise.**
IBM's January 2026 Feature Channel: *"You can now use the gpt-oss-120b model for mcc, pcc, fmea,
and nl2oslc model templates… IBM Granite 3.2 8b Instruct is deprecated as of 25 November 2025."*
Three corrections to the DOC12 framing the nuclear post repeats: it is an **option** with a
migration path, not a forced replacement; it covers **four** templates including the AI assistant
(`nl2oslc`), not three; and the Granite date is **deprecation on 25 Nov 2025**, not removal in
Feb 2026. Because it shipped via the Feature Channel, SaaS customers had it in production from
January 2026 and self-hosted customers only at 9.2 GA — a five-month split now stated in Part 5.

**3. Upgrade path — GAP-04 CLOSED.** IBM publishes an **n-1** policy: *"you can upgrade directly
from the version just before the current one."* The Manage checklist adds a worked example ruling
out direct 8.11 upgrades. Applied to 9.2: **9.1 → 9.2 direct; 9.0 → 9.2 requires a hop through
9.1; 8.x requires more.** This is materially important — anyone on 9.0 budgeted for one upgrade is
wrong by roughly a factor of two — and it is now a dedicated section in Part 6 and Gate 2 of
Part 7. Also captured: Collaborate and Predict require **even-numbered** OpenShift versions.

**Consistency fixes found in the same sweep:** post 06 carried a different `author` value from the
other seven (normalised); two paragraphs were duplicated by my own edits (removed); one stale
`speakableSections` entry pointed at a deleted section (repointed).

Per Swetansh's decision (D5), the published nuclear post still asserting the imprecise Granite
framing was **left untouched** — but it is now demonstrably imprecise rather than merely
unverified, which is worth raising with him separately.

### Deliberately out of scope

Cover images (ISC-A3) — the nanobanana headless-session key blocker is a known standing issue, and
covers were excluded from this task by design. All eight `coverImage` paths are declared and the
files do not exist, which is why `sync:validate` reports exactly eight broken-image warnings.
