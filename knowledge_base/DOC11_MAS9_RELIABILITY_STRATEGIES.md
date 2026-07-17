# Reliability Strategies & How to Implement Them in IBM Maximo (MAS 9)

**Project:** Maximo 7.6 → MAS 9 Upgrade Reference
**Document type:** Deep research / implementation reference
**Date:** 2026-05-18

---

## 0. Executive Summary

A reliability strategy is not "do more PMs." Reduced to fundamentals it is a
**documented maintenance decision for every failure mode that matters** —
choosing run-to-failure, time-based PM, condition-based, or predictive
maintenance based on the *consequence* of the failure and the *cost* of the
task. The strategy's value = avoided failure cost − cost of the maintenance
done to avoid it. A PM that costs more than the failure it prevents is
negative value.

Maximo is the **system of record** for both halves of that decision:
the *decision* (failure hierarchy, job plans, PMs, condition monitoring points)
and the *feedback loop* (work order failure reporting + meters → MTBF/MTTR
→ tune the strategy). MAS 9 adds an APM layer on top of Manage — **Maximo
Health, Predict, Monitor** — plus a dedicated **Reliability Strategies**
application that brings RCM/FMEA content natively into Maximo.

**Implementation, in one sentence:** build the reference-data spine (failure
hierarchy, criticality, meters), attach the maintenance decisions (job plans
/ PMs / condition monitoring), then close the loop with failure reporting and
KPIs — and use data loads to populate the spine fast enough to be worth doing.

For a 7.6 → MAS 9 upgrade: the data model is unchanged, so reliability data
**migrates** — the team is learning a new Carbon UI and role-based navigation,
not rebuilding concepts. The upgrade is the natural moment to *cleanse* legacy
free-text failure data and *bulk-load* a proper standardized failure hierarchy.

---

## Part A — Reliability Strategy Fundamentals

### A.1 What a reliability strategy is

The deliberate, documented set of decisions about *how each asset (or failure
mode) is maintained* so the asset delivers its required function at the lowest
sustainable total cost:

> **Total cost = consequence cost of failure + cost of maintenance effort**

More PM is not inherently better — every task consumes labor, parts, and
downtime, and beyond a point adds cost without reducing risk. A good strategy
is **risk-based**: effort concentrates where failure consequences are severe
and is deliberately minimal where they are trivial.

### A.2 RCM — Reliability Centered Maintenance

A structured method for determining the maintenance requirements of an asset
*in its operating context*. The standard **SAE JA1011** anchors RCM in **7
questions**, asked per function:

1. Functions and desired performance standards?
2. In what ways can it fail to fulfil those functions? (functional failures)
3. What causes each functional failure? (failure modes)
4. What happens when each failure occurs? (failure effects)
5. In what way does each failure matter? (consequences)
6. What can be done to predict or prevent each failure? (proactive tasks)
7. What if no suitable proactive task is found? (default actions)

**Decision logic:** consequences are categorised as *hidden, safety/
environmental, operational, or non-operational*. A proactive task is selected
only if it is **technically feasible** and **worth doing**. If none qualifies,
the default depends on consequence — redesign is mandatory for safety/
environmental failures, failure-finding for hidden failures, and run-to-failure
is acceptable only for minor economic consequences.

### A.3 FMEA / FMECA

**FMEA** identifies each failure mode, its cause, and its effects.
**FMECA** adds criticality ranking. The common quantitative screen:

> **RPN = Severity × Occurrence × Detection** (each scored 1–10)

Higher RPN = higher priority. RPN is a *screening aid*, not an absolute risk
measure — a high severity alone can warrant action regardless of RPN.

### A.4 Maintenance task types — when each is optimal

| Task type | Optimal when |
|---|---|
| **Run-to-failure (RTF)** | Failure consequences minor; prevention costs more than the failure |
| **Time/usage-based PM** | Failure mode is **age-related** (definable wear-out / safe life) |
| **Condition-based (CBM)** | A measurable degradation signal exists |
| **Predictive (PdM)** | Lead time + asset value justify trend modelling / analytics |
| **Failure-finding** | **Hidden** failures (standby / protective devices) |
| **Redesign** | No task adequately controls a serious failure mode |

### A.5 Condition-based vs predictive maintenance

CBM acts when a parameter crosses a threshold ("the bearing is hot"). PdM
models the *trend* to predict *when* failure will occur ("fails in ~120 hrs").
Both rely on the **P-F curve**: from the point a potential failure first
becomes detectable (**P**) to functional failure (**F**), the **P-F interval**
sets inspection frequency — inspections must be *shorter* than the P-F interval
to give actionable warning. PdM uses sensors/IoT and ML to detect P earlier.

### A.6 Key reliability metrics

| Metric | Formula |
|---|---|
| MTBF (repairable) | Total operating time ÷ number of failures |
| MTTF (non-repairable) | Total operating time ÷ number of units |
| MTTR | Total repair time ÷ number of repairs |
| Availability | MTBF ÷ (MTBF + MTTR) |
| Failure rate λ | 1 ÷ MTBF |
| Reliability function | R(t) = e^(−λt) (constant failure-rate assumption) |
| OEE | Availability × Performance × Quality |

**Bathtub curve:** infant mortality (decreasing λ) → useful life (constant λ)
→ wear-out (increasing λ).

### A.7 PM optimization — the critical insight

The Nowlan & Heap studies that founded RCM found **only ~11% of failure modes
are age-related**; the majority are random or infant-mortality. For those,
time-based PM *cannot* reduce failure probability — and **intrusive PM can
induce failure** (reassembly errors, contamination, disturbance).

Optimization therefore means: shift non-age-related modes to CBM/PdM or RTF,
reserve interval-based PM for true wear-out modes, and **tune intervals from
actual failure history** — extend where no failures occur, shorten or redesign
where failures recur.

> **First-principles takeaway:** most Maximo reliability projects fail because
> they treat reliability as a *PM-volume* problem when it is a *per-failure-mode
> decision* problem. That is why the failure-class hierarchy and criticality
> data — not the PM count — are the foundation.

---

## Part B — Implementing Reliability in MAS 9 Manage

All applications below live under **Manage** in the **Carbon-based UI**. The
data model is unchanged from 7.6 (same objects: `FAILURECODE`, `ASSET`,
`MEASUREPOINT`, `PM`, `JOBPLAN`…), so reliability data migrates rather than
being rebuilt. **Work Centers are removed (MAS 8.9+)** — MAS 9 uses role-based
applications; do not design around Work Centers.

### B.1 Failure Codes / failure hierarchy → *RCM failure modes*

The **Failure Codes** application (Assets module) builds the **FAILURELIST**
hierarchy: a top-level **failure class** (e.g., "Pump") → **Problems** →
**Causes** → **Remedies** (a four-level Problem→Cause→Remedy tree). A failure
class is assigned on the asset/location record (Failure Class field). When a
work order is raised against that asset, technician **failure reporting** (on
the Failure Reporting tab of Work Order Tracking) is constrained to that
class's tree — a controlled vocabulary, so the same wording every time.

This is what makes failure data analyzable and feeds Pareto/trend analysis
revealing dominant failure modes for RCM/FMEA decisions.

### B.2 Asset criticality / priority → *risk-based effort*

Maximo records an **asset priority** ranking on the asset (often used as a
criticality proxy, or extended with a criticality classification/attribute).
Work orders carry a **work order priority**. Maximo computes a **calculated
priority** from the two via the priority matrix, pushing high-criticality
assets up the queue. Criticality drives strategy: critical assets justify
intensive PM, condition monitoring and predictive coverage; low-criticality
assets may move to RTF. *Note:* a rigorous criticality engine is lighter in
core Manage — Maximo Health (Part C) provides formal criticality scoring.

### B.3 Condition Monitoring → *condition-based maintenance*

The **Condition Monitoring** application creates **measurement point** records
— a gauge or characteristic meter on an asset/location with **upper/lower
limits** plus **warning and action limits**. Each point can reference a job
plan/PM. When a reading breaches limits, Maximo can **automatically generate a
work order or trigger a PM**. The **"Use Action Limits as Work Order
Generation Criteria"** checkbox restricts generation to readings past the
action limits, not merely warning limits. This is the core CBM mechanism.

### B.4 Meters → *usage tracking & CBM signal*

The **Meters** application defines meter masters of three types:

- **Continuous** — cumulative, ever-increasing (run hours, mileage); drives
  **meter-based PM frequency**.
- **Gauge** — a value that rises and falls (temperature, pressure); used in
  condition monitoring.
- **Characteristic** — a value from a domain list (OK / Worn); needs a domain.

**Meter Groups** bundle meters for consistent application. Meters are placed
on assets/locations (Asset → Meters tab). Readings are entered manually or via
**Meter Reading Entry** import. Meters are the measurement backbone for both
condition monitoring and usage-based PMs.

### B.5 Job Plans → *the maintenance task ("what to do")*

The **Job Plans** application defines the reusable work template: sequenced
**tasks**, plus **labor / materials / services / tools** estimates per task or
plan. **Nested job plans** let a parent call child plans (modular content).
Job plans can be associated with assets, locations or asset types and are
version-controlled.

### B.6 Preventive Maintenance → *the schedule ("when to do it")*

A **PM record** ties an asset/location to a job plan plus a frequency.
**Master PMs** are templates that propagate to many child PMs (and update them
on revision). Frequency is **time-based**, **meter-based** (requires a
continuous meter present on every target asset), or both. **PM Forecasting**
projects future due dates using frequency + seasonal date ranges. **Routes**
apply one PM across many assets in sequence. **PM hierarchies** let a parent
PM generate a structured set of child work orders.

### B.7 Asset Templates → *consistent rollout at fleet scale*

The **Asset Templates** application standardizes asset creation: a template
carries **specifications** (classification attributes), **meters** (often via
a meter group), and associated **Master PMs**. Generating assets from a
template produces the assets *and* their meters and PMs in one consistent
action. *Configuration gap to flag:* failure class is **not** a native
template field — carry it via crossover domains on the asset's `TEMPLATEID`
attribute if needed.

### B.8 Closing the reliability loop

Work order **failure reporting** accumulates structured failure history
(problem/cause/remedy); **meters** record runtime. Together they yield KPIs —
**MTBF, MTTR, failure frequency, downtime** — surfaced via Manage reports,
KPIs and dashboards. That analysis feeds back into failure-class refinement,
criticality re-ranking, and PM/condition-monitoring tuning. *Continuous
improvement is the strategy* — the first cut is never the final cut.

---

## Part C — MAS 9 Asset Performance Management (APM)

**APM** is IBM's umbrella for three reliability apps that sit *on top of*
Manage. They are separately installable and all draw from the shared
**AppPoints** licence pool (no per-app currency).

### C.1 Maximo Health

A consolidated view of asset **health, criticality and risk**. Scoring
"notebooks" (industry-standard formulas) compute health, criticality, risk,
end-of-life and effective-age scores. Results surface through **table, map
(geospatial color-coded pins), chart (health wheels, MTBF/downtime trends),
and matrix views** (e.g., criticality vs end-of-life to find risk
concentrations). It consumes Manage data directly — assets, work order
history, failure data, meters, inspections — plus geospatial and IoT data.
This is where a MAS 9 site gets *formal* criticality scoring beyond core Manage.

### C.2 Maximo Predict

The **predictive-maintenance / ML layer**. Data scientists build models in
**Watson Studio / Watson Machine Learning** from IBM starter templates. Three
model families: **failure probability** (Random Forest), **remaining useful
life / "days to failure"** (LSTM), and **anomaly detection** (Isolation
Forest). Predictions surface in the shared Health/Predict UI; reviewing an
at-risk asset, an engineer can **create a work order directly**, which routes
into Manage. Predict requires Health.

### C.3 Maximo Monitor

The **IoT condition-monitoring platform** — ingests near-real-time sensor data,
builds **dashboards**, and runs **anomaly-detection rules** (threshold,
statistical, spectral, custom Python, generalised ML). **Monitor vs Predict:**
Monitor answers "is something abnormal *right now*?"; Predict answers "*when*
will it fail?" Monitor data also feeds Health scores and Predict models.

### C.4 Reliability Strategies application — RCM/FMEA *inside* Maximo

MAS ships a dedicated **Reliability Strategies** application — a **Manage-side
add-on** (Manage Reliability Strategies module), *not* a Health/Predict
sub-module. It brings **RCM and FMEA** capability natively into Maximo and
ships a vendor-built **library**:

- **800+** equipment / asset types
- **58,000+** failure modes / mechanisms across operating contexts
- **5,000+** preventive-maintenance tasks

Engineers select an operating context, perform failure analysis, choose
mitigation activities, and track implementation in Manage.

- **MAS 9.0** added a **Custom Strategies** tab — build your own strategy
  records keyed by asset class / subclass / configuration.
- **MAS 9.1** lets custom strategies live in the Maximo database and adds
  **AI assists** (suggesting boundary conditions, generating components).

This app is the most direct route to operationalising Part A's RCM/FMEA
methodology — it generates the job plans / PMs the library recommends.

### C.5 Asset Investment Planning (MAS 9.1)

New in **9.1**: capital planning, investment strategies, and identifying the
optimal time to replace an asset. **Requires the Maximo Optimizer** component.
Builds on Health's risk/end-of-life scores to prioritise capital spend.

### C.6 MAS 9.1 AI features relevant to reliability

- AI suggestion of problem codes / failure class on work orders.
- **AI Assistant in Manage** answering questions on assets, SRs, work orders.
- **AI in Reliability Strategies** — boundary-condition suggestions, component
  generation.
- ML-driven anomaly detection (Monitor) and failure prediction (Predict).

### C.7 Data flow — how APM sits on Manage

```
Manage (system of record: assets, WOs, meters, failure history)
  │
  ├── Monitor   ──> ingests live IoT/sensor streams
  │
  ├── Health    ──> pulls Manage + Monitor + geospatial/inspection
  │                 data → health/criticality/risk scores
  │
  ├── Predict   ──> runs ML on combined data → failure forecasts
  │
  └── Reliability Strategies ──> defines what to do per failure mode
        │
        └──> all of the above generate WORK ORDERS back in Manage
             for planning & execution  ──>  loop closes
```

> **Packaging flags:** "Health & Predict – Utilities" (HPU) is **discontinued
> as a standalone solution since MAS 8.11** — its capabilities folded into
> standard Health/Predict; do not present HPU as a MAS 9 product. Asset
> Investment Planning is **9.1-only and needs Maximo Optimizer**.

---

## Part D — Data Loads: Populating the Reliability Spine

This is where reliability implementation succeeds or stalls. The strategy is
only as good as the data underneath it, and the data has a **hard dependency
order**.

### D.1 Data load tools — realistic options

| Tool | What it is | Best for | Watch out for |
|---|---|---|---|
| **Application Import** ("Data Import") | Built-in spreadsheet (CSV/XML) import on Manage list views | Small, ad-hoc, app-scoped loads by functional users | No scheduling; weaker batch/error handling |
| **MXLoader** | Excel workbook driving Maximo REST/OSLC APIs | Iterative reliability loads, hundreds–low tens of thousands of rows | **Community-grade, not formally IBM-supported**; version-sensitive |
| **MIF (Integration Framework)** | Enterprise Services + flat file / XML against object structures | Large, repeatable, governed loads; recurring feeds | Higher setup cost (external system, enterprise service, endpoints) |
| **OSLC / REST APIs** | `maximo/oslc`, `maximo/api` endpoints | Engineered ETL pipelines, orchestration, idempotency logic | Build-it-yourself; same channel MXLoader uses |
| **Migration Manager** | Config/metadata promotion between DEV/TEST/PROD | Domains, app config, object structures, security | **NOT for business data** — common confusion |

**Rule of thumb:** App Import for small one-offs · MXLoader for iterative
reliability loads · MIF for volume/recurring · REST for engineered pipelines ·
Migration Manager for *config only*.

> **Note:** MXLoader is the practitioner default and fine for the
> reliability spine, but because it is unsupported, use **MIF** for the
> high-volume governed loads (asset/location master, large meter sets) so
> there is message tracking and reprocessing. Every write through MXLoader and
> MIF goes through the MBO layer, so business-rule validations fire — good.

### D.2 Load sequence — the dependency-correct order

Maximo's MBO layer rejects any record whose foreign key doesn't yet resolve,
so **sequence is mandatory**:

1. **Domains / value lists**
2. **Classifications & specification attributes** (`CLASSSTRUCTURE`, `ATTRIBUTE`)
3. **Failure class hierarchy** (failure codes: problem → cause → remedy)
4. **Locations** (top-down within each location system)
5. **Asset hierarchy** (parents before children)
6. **Asset/location specifications & attribute values**
7. **Meters and meter groups**
8. **Condition monitoring measurement points**
9. **Job plans** (with tasks / labor / materials / tools)
10. **Master PMs → PMs** (and routes)
11. **Safety plans**

**Why order matters:** classifications must exist before specs reference them;
failure classes before they attach to assets; a location before an asset is
installed into it; meters before measurement points or meter-based PM
frequencies point at them; job plans before PMs reference them. The classic
breakage: a 12,000-row asset spreadsheet where a child row precedes its parent
and fails mid-batch, leaving an orphaned hierarchy.

### D.3 Per-object load specifics

- **Failure hierarchy** (`FAILURECODE` / `FAILURELIST`): load codes first, then
  the Problem/Cause/Remedy tree. `FAILURELIST` is a **restricted** object —
  the "NextGen" MXLoader currently cannot write it directly; use the
  **`MHFAILURELIST` object structure**, classic MXLoader, or (DBA decision)
  make `FAILURELIST` non-restricted. Maximo **auto-generates sequence values**
  — source sequences will not survive. Failure classes are defined at the
  **Organization** level.
- **Meters & meter groups:** load the meter master (continuous/gauge/
  characteristic — characteristic needs a domain) → meter groups → then apply
  to assets/locations (creates `ASSETMETER` / `LOCATIONMETER` rows).
- **Condition monitoring points:** load *after* meters exist; each point binds
  a gauge/characteristic meter to an asset/location with limits and the
  WO/PM action.
- **Job plans:** load header → tasks → estimated labor / materials / services
  / tools (children reference the job plan + task sequence).
- **PMs / Master PMs:** load Master PMs first if used, then PMs; supply
  frequency (time or meter-based), lead time, job plan, route, and job plan
  sequence. Meter-based frequency requires the meter to already be on the asset.
- **Asset criticality / priority:** loaded as asset attributes or specification
  values; align with calculated priority if used downstream.

### D.4 Validation & cleansing — do this *before* loading

The biggest reliability-data risk is **legacy 7.6 free-text failure data**.
Before load:

- **Deduplicate** failure codes; map free-text problems/causes/remedies to a
  standardized code set; discard or re-bucket unusable history.
- **Standardize classifications**; validate every coded field against its
  **domain** — domain mismatch is the top cause of rejected rows.
- **Rehearse the full sequence in TEST/staging** with production-like volume
  before PROD.
- Keep **batch sizes moderate** (≈500–2,000 rows) so failures are isolated and
  reprocessable. MIF message tracking lets you correct and reprocess only the
  failed transactions rather than reloading the whole file.
- **Validate parent references exist** before loading children; reconcile row
  counts post-load.

---

## Part E — Phased Implementation Roadmap

A reliability strategy is built in layers — each layer depends on the one
below. Reduced to one frame:

> Build the **reference-data spine** (failure hierarchy + criticality + meters)
> → attach **maintenance decisions** (job plans / PMs / condition monitoring)
> → close the **feedback loop** (failure reporting + MTBF/MTTR). APM
> (Health / Predict / Monitor) is Phase 4, not a prerequisite. Stock Manage
> apps cover the entire core strategy before any add-on is needed.

### Phase 0 — Foundation & legacy cleansing (during the upgrade window)

The upgrade is the one clean moment to fix legacy 7.6 free-text failure data.
Carrying it forward is the single biggest reliability-project killer.

| Step | What | Where |
|---|---|---|
| 0.1 | Confirm MAS 9.x Manage data migration — assets, locations, meters, failure codes, PMs intact | Manage list views, post-upgrade smoke test |
| 0.2 | Profile legacy failure data — pull `FAILURECODE` / `FAILURELIST` + work order `FAILUREREPORT` history; quantify free-text % | DB / Cognos export |
| 0.3 | Design the standardized failure-code set (4 levels: Class → Problem → Cause → Remedy) per dominant asset family | Staging spreadsheet, with reliability engineer |
| 0.4 | Deduplicate + map free-text → standardized codes; flag unusable history for discard | Excel / staging |
| 0.5 | Stand up a TEST environment mirroring PROD volume for load rehearsal | Infra / Ops |

*Exit criteria:* cleansed failure-code spreadsheet + TEST environment ready.

### Phase 1 — Reference-data spine (dependency-strict data loads)

Maximo's MBO layer rejects any record whose foreign key doesn't yet resolve.
Out-of-order = orphaned hierarchy + abandoned batches.

**Load order — do NOT reorder:**

1. Domains / value lists
2. Classifications & specification attributes (`CLASSSTRUCTURE`, `ATTRIBUTE`)
3. **Failure class hierarchy** — `FAILURECODE` first, then the
   Problem / Cause / Remedy tree. *Gotcha:* `FAILURELIST` is restricted in
   NextGen MXLoader — use the `MHFAILURELIST` object structure or classic
   MXLoader. Failure classes are defined at the **Organization** level.
4. Locations (top-down within each location system)
5. Asset hierarchy (parents before children)
6. Asset / location specifications & attribute values
7. **Meters** (continuous / gauge / characteristic — characteristic requires a
   domain) → **Meter Groups** → apply to assets / locations (creates
   `ASSETMETER` / `LOCATIONMETER` rows)
8. **Condition monitoring measurement points** (meters must exist first)
9. **Job plans** (header → tasks → labor / materials / services / tools)
10. **Master PMs → PMs → Routes**
11. Safety plans

**Tool selection:**

| Tool | Best use |
|---|---|
| App Import ("Data Import") | Small ad-hoc loads by functional users |
| MXLoader | Iterative spine loads, hundreds–low tens of thousands of rows (community-grade, version-sensitive) |
| MIF (Integration Framework) | Large governed loads (asset/location master, big meter sets); message tracking + reprocessing |
| OSLC / REST APIs | Engineered ETL pipelines, orchestration, idempotency logic |
| Migration Manager | **Config / metadata ONLY** (domains, app config, security). Never use for business data |

**Batch discipline:** 500–2,000 rows per batch so failures are isolated and
reprocessable. Reconcile row counts post-load. Validate parent references
exist before loading children.

Also in Phase 1: rank **asset criticality / priority** as an asset attribute
or specification value. This is what makes downstream effort risk-based
rather than uniform.

*Exit criteria:* every critical asset has (a) a failure class, (b) a
criticality rank, (c) its meters.

### Phase 2 — Maintenance decisions ("what to do" + "when")

For each critical failure mode, choose ONE task type using RCM logic
(consequence-driven):

| Task type | Optimal when | Maximo home |
|---|---|---|
| **Run-to-failure** | Consequences trivial; prevention costs more than failure | No PM record — documented decision |
| **Time/usage-based PM** | Failure mode is **age-related** (definable wear-out) | Job Plans + PM (time- or meter-based) |
| **Condition-based (CBM)** | A measurable degradation signal exists | Condition Monitoring + Meters + Job Plan |
| **Predictive (PdM)** | Lead time + asset value justify ML modelling | Phase 4 (Maximo Predict) |
| **Failure-finding** | **Hidden** failures (standby / protective devices) | PM with inspection job plan |
| **Redesign** | No task adequately controls a serious failure mode | Engineering — out of Maximo |

**Concrete Maximo steps:**

1. **Job Plans** — reusable templates with sequenced tasks + labor / materials
   / services / tools estimates. Use **nested job plans** for modular content.
2. **Master PMs → child PMs** — Master propagates revisions to children.
   Frequency: time, meter (continuous meter must be on every target asset),
   or both. **PM Forecasting** projects due dates from frequency + seasonal
   date ranges. **Routes** apply one PM across many assets in sequence.
   **PM hierarchies** generate parent + child work orders.
3. **Condition Monitoring** — create measurement points with upper / lower
   limits + warning + action limits, each pointing at a job plan or PM.
   **Tick "Use Action Limits as Work Order Generation Criteria"** so only
   action-limit breaches generate WOs (not warning-limit noise).
4. **Asset Templates** — for fleets, template the specs + meters (via meter
   group) + Master PMs together; one generation creates the asset + meters
   + PMs consistently. *Gotcha:* failure class is **not** a native template
   field — carry it via crossover domain on `TEMPLATEID` if needed.

**Anti-pattern to avoid:** Don't treat reliability as a PM-volume problem.
Nowlan & Heap: only ~11% of failure modes are age-related. Time-based PM on
the other ~89% cannot reduce failure probability — and intrusive PM can
*induce* failure (reassembly errors, contamination, disturbance). Bias
toward CBM and RTF where appropriate.

*Exit criteria:* every critical failure mode has a chosen task (RTF / PM /
CBM / failure-finding) recorded in Maximo.

### Phase 3 — Reliability engineering layer (Reliability Strategies app)

Stand up the **Reliability Strategies** application — a Manage-side add-on
(Manage Reliability Strategies module), separately licensed via the shared
AppPoints pool, **not** a Health / Predict sub-module.

1. Use the **vendor library** to validate Phase 2 decisions: 800+ asset
   types, 58,000+ failure modes, 5,000+ PM tasks.
2. Workflow: select operating context → perform failure analysis → choose
   mitigation activities → push to Manage as job plans / PMs.
3. **MAS 9.0+:** Custom Strategies tab — build site-specific strategy
   records keyed by asset class / subclass / configuration.
4. **MAS 9.1:** custom strategies live in the Maximo DB; AI assists suggest
   boundary conditions and generate components.

*Exit criteria:* RCM/FMEA-backed strategies exist for the critical asset
classes.

### Phase 4 — APM / predictive layer (only after the spine is stable)

Install in this order:

1. **Maximo Health** (prerequisite for Predict) — health, criticality, risk,
   end-of-life, effective-age scoring "notebooks." Surfaces in table / map /
   chart / matrix views (the criticality × end-of-life matrix is the
   workhorse). This is where a MAS 9 site gets *formal* criticality scoring
   beyond core Manage.
2. **Maximo Monitor** — IoT / sensor ingestion + anomaly-detection rules
   (threshold, statistical, spectral, custom Python, ML). Answers *"is
   something abnormal right now?"*
3. **Maximo Predict** — Watson Studio / WML models. Three families: failure
   probability (Random Forest), remaining useful life "days to failure"
   (LSTM), anomaly detection (Isolation Forest). Answers *"when will it
   fail?"* Engineers create a WO directly from an at-risk asset → routes
   into Manage.
4. **Asset Investment Planning** (MAS 9.1-only, **requires Maximo
   Optimizer**) — capital replacement timing built on Health risk /
   end-of-life scores.

**Packaging trap:** "Health & Predict – Utilities" (HPU) was **discontinued
as a standalone in MAS 8.11** — capabilities folded into standard Health /
Predict. Do not present HPU as a MAS 9 product.

### Phase 5 — Close the loop (continuous, never "done")

This is what converts the strategy from a one-time project into a living
asset.

1. **Enforce structured failure reporting** on every work order — Failure
   Reporting tab on Work Order Tracking, constrained to the asset's failure
   class tree (controlled vocabulary).
2. **KPIs** — MTBF, MTTF, MTTR, Availability (= MTBF / (MTBF + MTTR)),
   failure rate λ, OEE — surfaced via Manage reports, KPIs, and Cognos
   dashboards.
3. **Tune intervals from actual history:** extend where no failures occur;
   shorten or redesign where failures recur.
4. **Refine** failure classes, criticality, and PM intervals on a quarterly
   cadence.

*Exit criteria:* none — this phase never closes. The continuous-improvement
loop is the strategy.

---

## Part F — Upgrade-Context Notes

- **MAS 9.1.x** — Reliability Strategies custom strategies in-database and AI
  assists are available; Asset Investment Planning is available (needs
  Optimizer). All confirmed for the 9.1 line.
- The upgrade is the **one clean moment** to fix legacy free-text failure data
  — bulk-load a proper standardized hierarchy now rather than carrying mess
  forward.
- Maximo sends **PRs to SAP** (SAP owns PO/vendor/invoice). Reliability work
  that drives material demand still raises PRs through the existing SAP
  integration — no change to that pattern; just be aware reliability-driven
  PM/CBM work orders will increase PR volume.
- Use **stock Manage apps first** — Failure Codes, Condition Monitoring,
  Meters, Job Plans, PM, Asset Templates cover the entire core strategy before
  any APM add-on is needed. APM (Health/Predict/Monitor) is Phase 4, not a
  prerequisite.
- Do **not** design around Work Centers (removed MAS 8.9+).

---

## Sources

**Reliability fundamentals:** SAE JA1011 (RCM standard); Nowlan & Heap
foundational failure-pattern studies; standard FMECA/RPN and P-F curve
references.

**MAS 9 Manage & APM:**
- IBM Docs — Condition Monitoring overview: https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=monitoring-condition-overview
- IBM Docs — Meter-based Master PM frequency: https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=pms-defining-frequency-meter-based-master
- IBM Docs — Reliability Strategies module: https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=module-reliability-strategies
- IBM — Asset Performance Management Software: https://www.ibm.com/products/maximo/asset-performance-management
- IBM APM Hands-On Lab (MAS v9.0): https://ibm.github.io/maximo-labs/apm_9.0/demo_script/
- Maximo Secrets — New Features in MAS 9.0 and 9.1: https://maximosecrets.com/2025/07/06/new-features-in-mas-90-and-91/
- Maximo Secrets — Reliability Strategies: https://maximosecrets.com/2023/11/22/reliability-strategies/
- Maximo Secrets — Master PM: https://maximosecrets.com/2022/11/18/master-pm-2/
- Maximo Secrets — Asset Templates: https://maximosecrets.com/2022/07/29/asset-templates-2/
- Maximo Secrets — Failure Codes and Failure Reporting: https://maximosecrets.com/2022/04/14/failure-codes-and-failure-reporting/
- Maintenance World — Reliability Strategies for MAS 9.0: https://maintenanceworld.com/2024/09/26/what-is-the-reliability-strategies-function-for-mas-9-0/
- Interloc — Maximo Monitor Anomaly Detection Models: https://www.interlocsolutions.com/blog/maximo-monitor-anomaly-detection-models
- Interloc — MAS Health & Predict AI/ML Models: https://www.interlocsolutions.com/blog/all-about-mas-health-predict-ai/ml-models-for-predictive-maintenance

**Data loads:**
- IBM Community — MAS 9 Failure Hierarchy Load with MXLoader: https://community.ibm.com/community/user/discussion/mas-9-failure-hierarchy-load-with-mxloader
- IBM Community — MxLoader with MAS 9: https://community.ibm.com/community/user/discussion/mxloader-with-mas-9
- MXLoader User Guide (B. Portaluri): https://bportaluri.com/wp-content/downloads/MxLoader/MxLoaderUserGuide.pdf
- IBM — Maximo Mx Loader: https://www.ibm.com/support/pages/maximo-mx-loader
- IBM — Importing huge flat files via MIF (FLATFILECONSUMER): https://www.ibm.com/support/pages/importing-huge-flat-files-mif-you-better-use-flatfileconsumer-crontask
- BPD Zenith — Maximo Data Imports: A simplified guide: https://www.bpdzenith.com/the-bpd-blog/maximo-data-imports-a-simplified-guide
- IBM Redbooks — Migration Use Cases with the Migration Manager: https://www.redbooks.ibm.com/redbooks/pdfs/sg247906.pdf
