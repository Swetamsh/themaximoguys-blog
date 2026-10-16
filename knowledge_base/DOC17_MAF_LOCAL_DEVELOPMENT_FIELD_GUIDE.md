# Maximo Application Framework (MAF): A Field Guide to Local Development

**Document:** DOC17 - Maximo Application Framework (MAF / "Graphite"): architecture, configuration tooling, local development (Docker `maf-tools` → in-suite Application Configuration → MAF Local Configuration / Local Dev Mode for VS Code and IBM Bob), debugging, offline data, promotion and upgrade
**Version:** 1.0 (seed — to be enhanced)
**Date:** October 16, 2026
**Audience:** Maximo developers and configurators, mobile leads, MAS platform admins, and architects who customize Maximo Mobile (Technician, Inspections, Service Request, Inventory) or Manage Role-Based Applications (RBAs)
**Scope:** What MAF is and how a MAF app is built (app.xml, datasources, states, controllers, AppCustomizations.js, components); the three generations of configuration tooling; a step-by-step local development workflow on the new **IBM Maximo Application Framework Local Configuration** extension (formerly "Local Dev Mode"); debugging; mobile offline data; storage, revisions, environment promotion; upgrade/delta merge; known defects and practitioner pain points; AI-assisted MAF work through IBM Bob and the bundled Graphite MCP server; and a ready-to-build blog series plan (§16). Companion to DOC1 (Manage upgrade — Work Centers → RBAs), DOC15 (MAS 9.2 factbase — MAF deprecations), and DOC16 (IBM Bob — §13.4 Local Dev Mode).
**Status:** This is a **seed document**. It is grounded in IBM Documentation (local cache of the MAS/Manage user guides plus the 2026-08-12 `MAS92-SOURCES` harvest), IBM Support pages, IBM's 8.4 MAF customization PDF, IBM's public **MAF Configuration Practices** site, the `ibm-mas/maf-local-dev-mode` site, repo, releases and the released VSIX, and independent practitioner sources (URLs in §18). IBM Docs returned HTTP 403 on 2026-10-16, so a few IBM Docs claims rest on the cached copies or search summaries; these are flagged. Gaps and contradictions are listed in §17 rather than smoothed over.

> **Source convention used throughout**
> - **[IBM]** = IBM Documentation, IBM Support page/technote, IBM PDF, IBM-authored GitHub site/repo/VSIX (vendor material; not independently audited).
> - **[IND]** = independent practitioner, partner, community forum, or blog.
> - **[CODE]** = observed in the compiled code / package.json of the released `maximo-developer-configuration-tools` VSIX (v0.0.1-beta.6), not in prose documentation.
> - **[UNVERIFIED]** = single weak source or search summary only; do not publish as fact without re-checking.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [What MAF Is (and Why It's Called Graphite)](#2-what-maf-is-and-why-its-called-graphite)
3. [Anatomy of a MAF Application](#3-anatomy-of-a-maf-application)
4. [Controllers, Events and AppCustomizations.js](#4-controllers-events-and-appcustomizationsjs)
5. [Component Library](#5-component-library)
6. [Three Generations of Configuration Tooling](#6-three-generations-of-configuration-tooling)
7. [MAF Local Configuration (Local Dev Mode) — Deep Dive](#7-maf-local-configuration-local-dev-mode--deep-dive)
8. [Step-by-Step: A Local Development Workflow](#8-step-by-step-a-local-development-workflow)
9. [Debugging MAF Applications](#9-debugging-maf-applications)
10. [Mobile Offline Data Model](#10-mobile-offline-data-model)
11. [Storage, Revisions, Security and Promotion](#11-storage-revisions-security-and-promotion)
12. [Upgrades, Delta Files and Merge](#12-upgrades-delta-files-and-merge)
13. [Version History and Deprecations](#13-version-history-and-deprecations)
14. [Known Defects and Practitioner Pain Points](#14-known-defects-and-practitioner-pain-points)
15. [AI-Assisted MAF Work (Bob, Graphite MCP)](#15-ai-assisted-maf-work-bob-graphite-mcp)
16. [Blog Series Plan: MAS-MAF-DEV](#16-blog-series-plan-mas-maf-dev)
17. [Open Questions & Gaps to Close](#17-open-questions--gaps-to-close)
18. [References](#18-references)

---

## 1. Executive Summary

The **Maximo Application Framework (MAF)** is the framework IBM uses for every modern, non-classic Maximo UI. That covers the **Maximo Mobile** apps (Technician `TECHMOBILE`, Inspections `INSPECTION`, Service Request `SRMOBILE`, Inventory `IRMOBILE`/`ICMOBILE`, Supply Chain) and the browser **Role-Based Applications (RBAs)** that replaced Work Centers. Health and Monitor also ship MAF apps. Internally IBM calls it **Graphite**. You write apps as **declarative XML** (`app.xml` plus included XML files) with a small amount of JavaScript. A build step compiles them into **React** applications. The built app is stored as a zip in the Manage table **MAFAPPDATA**, and every publish adds a new ACTIVE revision. The Maximo Mobile store app is only a shell: it downloads these Graphite apps from the server [IBM].

**Customization is deliberately narrow.** IBM supports only two things:
- changes to the app XML;
- JavaScript in **`AppCustomizations.js`**, the upgrade-safe "global controller".

Extending IBM controllers in separate files has "limited support". Editing the out-of-the-box (OOTB) controllers is unsupported and has to be merged by hand at every release. Below 8.10, configuration is not supported at all [IBM].

**The tooling has had three generations, and the third is the one this document is about:**

| Generation | MAS versions | Where it runs | Edit/preview loop |
|---|---|---|---|
| **1. `maf-tools` Docker image** ("MAF Configuration application") | 8.4 – 9.0 | Developer desktop: `docker run --privileged -p 3001:3001 -p 3006:3006 … cp.icr.io/cp/manage/maf-tools:<ver>` | Local React preview server, publish to Manage |
| **2. Application Configuration** (in-suite) | 9.1+ | OpenShift pod (`graphite-configuration`), PVC-backed, opened from the MAS admin menu, `MAFCONFIGADMIN` group | Browser editor. Preview was broken in early 9.1 (DT450848), so teams "publish to test" |
| **3. MAF Local Configuration** (ex-"Local Dev Mode") — VS Code / **IBM Bob** extension `maximo-developer-configuration-tools` | 9.1.21+ and 9.2.1+ | Developer desktop editor, Node 20+, Yarn | `yarn start` preview on `localhost:3000` against live MAS, XML diff/delta, publish, Git, Bob "MAF Config" mode + Graphite MCP |

**The one-paragraph version.** In 9.1, IBM moved MAF configuration off developers' laptops and into the suite. That removed the Docker friction, but it brought a browser-only editor, broken preview, 500 KB upload caps, and stale images after patches. Practitioners found themselves publishing to a server just to test a change [IND]. In May 2026 IBM began shipping an **early-access editor extension** (alpha.0 on 2026-05-21, **v0.0.1-beta.6 on 2026-09-22**) that brings MAF development back to the desktop:
- OAuth/OIDC (PKCE), username/password, or API-key sign-in to MAS;
- download of the app source from the same `/graphite/configtool/packages` API that Application Configuration uses;
- a local Graphite dev server (`yarn start`, `localhost:3000`) proxied to live Manage;
- delta generation and configuration migration;
- a publish pipeline that ends in the same `MAFAPPDATA` revision.

It is **IBM proprietary, "AS IS", and not on the Marketplace yet**. It **cannot create or clone apps**, and its biggest field issue is the **offline npm mirror** (`@maximo/maxdev-cli` is not on public npm) [IBM][CODE][IND]. For Maximo shops, this turns MAF work into ordinary source-controlled frontend engineering, with Git, diff, code review and AI agents. That makes it the most important MAF development change since RBAs replaced Work Centers.

### MAF at a glance

| Dimension | Fact | Source |
|---|---|---|
| Internal name | Graphite (`/graphite/...` paths, `graphite-tools.js`, `_graphite_logLevel`) | [IBM] |
| Authoring model | Declarative XML → compiled to React; minimal JS | [IBM] |
| Design language | Carbon (`carbon:` icons, `ui-01` tokens, `kind="ghost"`), inferred; no IBM prose statement | [IBM]/[UNVERIFIED] |
| JS API | `@maximo/maximo-js-api` (`log`, `Application`, `Device`, `Browser`) | [IBM] |
| Data access | `maximo-datasource` over OSLC object structures (e.g. `MXAPIWODETAIL`) | [IBM] |
| Storage | `MAFAPPDATA` table, zip BLOB, revision per insert | [IBM] |
| Supported customization | `app.xml` + `AppCustomizations.js` (+ CSS from 9.0) | [IBM] |
| Config support floor | 8.10 | [IBM] |
| Environment promotion | **Not** via Migration Manager | [IBM] |
| Latest local tool | `maximo-developer-configuration-tools` v0.0.1-beta.6 (2026-09-22) | [IBM] |

---

## 2. What MAF Is (and Why It's Called Graphite)

### 2.1 One framework, two delivery surfaces

IBM: "IBM's Maximo Application Framework (MAF) supports the creation of Maximo Mobile and Role-based applications within Manage" [IBM, Configuration Practices overview]. The same XML/React application model ships to two places:

| Surface | Runtime | Data | Examples |
|---|---|---|---|
| **Maximo Mobile** (iOS, Android, Windows) | The store app is a **shell** that downloads the Graphite app from the server [IBM, ibm17232742] | Offline-capable: preloaded reference DB, transactional download, transaction queue (§10) | TECHMOBILE, INSPECTION, SRMOBILE, IRMOBILE, ICMOBILE |
| **Role-Based Apps (RBAs)** in a browser | Served by Manage, extracted under `mxe.int.globaldir/maximo/maf` [IND] | Online (RBAs being online-only is blog-sourced [UNVERIFIED]) | Work order RBAs, Inspections, dashboards (`dashboardmobile`) |

IBM's architecture page states: "Developers build responsive applications using declarative XML files and minimal JavaScript. These XML files are transformed into ReactJS applications." Apps are stored as zip files in a BLOB column of MAFAPPDATA and are downloaded only to authorized users [IBM, ibm17232742].

### 2.2 Graphite is the framework's internal name

You will see "Graphite" everywhere under the hood:
- the dev tooling entrypoint `/graphite/scripts/graphite-tools.js`;
- the container workspace `/graphite/.workspace`;
- the server component `graphite-configuration`;
- the config-server code at `/graphite/packages/config-server/...`;
- REST paths `/maximo/oslc/graphite/<app>/build.json` and `/graphite/configtool/packages`;
- the debug parameter `?_graphite_logLevel=`;
- IBM's own guide titles ("Graphite Data Sources", "Graphite Page Component", "Graphite Dialog Components Guide");
- the MCP package `@maximo/graphite-mcp-server` [IBM][CODE].

For blog purposes, **MAF = Graphite**.

### 2.3 What MAF replaced

| Old | Replaced by MAF | Note |
|---|---|---|
| Maximo Anywhere (Worklight/MobileFirst + Dojo) | Maximo Mobile on MAF | No migration path; Anywhere configurations must be re-implemented [IBM][IND] |
| Work Centers (deprecated 8.9, removed in 9.x) | RBAs on MAF | See DOC1 §Work Centers; customizations do not carry over |
| Inspection Forms Work Center | Inspections MAF app (Manage 9.0) | [IBM, Manage 9.0 what's new] |

IBM is explicit that "Any configuration changes made to applications based on the previous Maximo Asset Management framework cannot be migrated to Maximo Application Framework applications" [IBM, MAS docs]. **Application Designer** (classic `presentation.xml`) and MAF are separate worlds. Classic Manage screens still use Application Designer, and MAF apps use Application Configuration.

### 2.4 Practitioner framing [IND]

- John Q. Todd (TRM, Aug 2026) on the tooling: it is "not to the level of the legacy Maximo Application Designer", but it "does make implementing changes to mobile applications that much easier."
- Jas Sidhu (MRM-EAM, Aug 2026): "many of the remaining challenges weren't configuration problems; they were framework questions." The full developer documentation lives **inside** Application Configuration, under (?) → "Developer Documentation", and is **not** published online.

---

## 3. Anatomy of a MAF Application

### 3.1 Workspace layout

When an app is downloaded (by any of the three tools), you get a project like this [IBM]:

```
TECHMOBILE/
  src/
    app.xml                 ← main application XML
    wo-card-group.xml       ← included XML (via <include src=...>)
    AppCustomizations.js    ← supported JS customization point
    i18n/labels.json        ← default (English) labels
    app.delta.xml           ← auto-generated delta of your XML changes (8.11+)
  build/ ...                ← build output (build/app for packaging)
  ibm-config/ (8.11) or TECHMOBILE_backup/ (≤8.10) ← unmodified IBM originals
```

### 3.2 app.xml skeleton

Based on IBM's 8.4 PDF "Anatomy of an application XML file" and the Configuration Practices examples [IBM]:

```xml
<maximo-application id="techmobile" title="Technician" version="9.2.x">
  <properties> ... </properties>
  <menu> ... </menu>                         <!-- left side navigation -->
  <maximo-datasource id="..."/>              <!-- app-global datasources -->
  <pages>
    <page id="workOrderDetail" path="workorders/:wonum" controller="WorkOrderDetailController">
      <states>
        <state name="isLoading" value="false" type="boolean" id="state_001"/>
      </states>
      <maximo-datasource id="woDetailDS" object-structure="MXAPIWODETAIL"> ... </maximo-datasource>
      <header-template> ... </header-template>
      <stacked-panel> ... </stacked-panel>
      <dialogs> ... </dialogs>
    </page>
  </pages>
  <messages> ... </messages>
</maximo-application>
```

**Rules that bite:**
- **`id` values are generated by the build and must never be changed.** Delta files identify your changes by component id, so an edited id breaks upgrades [IBM].
- **Attribute names must be lowercase** (`item.somename`), because the Maximo server returns JSON keys in lowercase [IBM].
- **Declaration order matters.** Declare datasources before the lookups that use them [IBM, CPD overview].
- Split large apps with `<include src="./wo-card-group.xml" id="jwq72"/>` [IBM].

### 3.3 Datasources

There are three types [IBM, CPD datasources guide]:

| Type | Use | Example |
|---|---|---|
| `maximo-datasource` | "connects directly to Maximo OSLC APIs" | `<maximo-datasource id="woListDS" object-structure="MXAPIWODETAIL" saved-query="ASSIGNEDWORK">` |
| `json-datasource` | Local/static or JS-loaded data | `<json-datasource id="itemsDS" src="loader.js" pre-load="true"/>` |
| `custom-datasource` | "rarely needed" | — |

A schema declares which attributes are fetched:

```xml
<maximo-datasource id="woListDS" object-structure="MXAPIWODETAIL" saved-query="ASSIGNEDWORK">
  <schema>
    <attribute name="wonum" searchable="true" id="attr_001"/>
    <attribute name="description" searchable="true" id="attr_002"/>
  </schema>
</maximo-datasource>
```

- **Attribute properties:** `name`, `type`, `required`, `searchable`, `default-value`, `unique-id`, `id` [IBM].
- **Datasource properties seen in IBM examples:** `saved-query`, `where`, `order-by`, `page-size`, `pre-load`, `can-load`, `selection-mode`, `lookup-data`, `controller`, `relationship` (child DS), `notify-when-parent-loads`, `include-counts`, `offline-immediate-download`, `download-page-size`, `mobile-qbe-filter`, `depends-on` [IBM].
- **`maximo-datasource-override`** reuses or extends an existing datasource, for example to swap a saved query. Never override `object-structure` [IBM].
- **`item`** is the reserved name for the current record: `{item.wonum}`, `{dsname.item.description}` [IBM].
- **Practitioner techniques** (Maycon Belfort, MoreMaximo, Apr 2025) [IND]:
  - `name--alias` attributes;
  - `rel.x{a,b}` relationship attribute sets;
  - `onBeforeLoadData` + `setQBE`;
  - editing the `MOBILEDOMAIN` query instead of creating a new saved query.
  - Note: "the where clause is only applied on the Resource Application Roles and not on a device."

**Object structures** used across IBM's examples include MXAPIWODETAIL (saved queries ASSIGNEDWORK, ASSIGNEDWOLIST, PMWOLIST), MXAPIASSET, MXAPILOCATION, MXAPICLASSSTRUCTURE, MXAPIITEM, MXAPIWORKTYPE, MXAPIALNDOMAIN, MXAPINUMERICDOMAIN, MXAPISRSERVICE, MXAPIPO, MXAPIMRMATERIAL, MXAPIINVRESISSUE, MXAPIINSPECTIONRESINSPECTION, MXAPIDOCLINKS and MXAPICNTBOOKCOUNT. The Technician owner filter is the `uxtechnicianownerfilter` clause [IBM].

**Do not duplicate object structures.** Mobile merges data from object structures with the same root object [IBM, CPD].

### 3.4 State and binding

- **Scopes:** page state and app state, bound as `{page.state.x}` and `{app.state.x}` [IBM].
- **Bindings accept JS expressions:** `hidden="{item.status === 'COMP'}"`, `disabled="{!page.state.isValid}"` [IBM].
- **Built-in app state:** includes `app.state.networkConnected` and `app.state.screen.size` [IBM].
- **IBM's docs disagree on how a state is declared.** Some show `<state name=… id=…>`, others `<state id=… value=…>` [IBM — inconsistency logged §17].

### 3.5 Routing and security in XML

- **Paths:** `<page id="…" path="workorders/:wonum">` exposes route params as `page.params` [IBM].
- **Gating by signature option:** `sigoption="workview.read"` on a component; in code, `app.checkSigOption('<os>.WO_DELETEERROR_TRX')`. **Signature options are valid only in connected mode** [IBM].
- **Gating by license:** `license="tpaebase"` [IBM].

---

## 4. Controllers, Events and AppCustomizations.js

### 4.1 Lifecycle hooks (verified names)

Confirmed in IBM's Configuration Practices text [IBM]:

| Scope | Hooks |
|---|---|
| Application | `applicationInitialized(app)`, `applicationResumed(app)` |
| Page | `pageInitialized(page, app)` (once, before render; datasources not yet loaded), `pageResumed(page, app)` (every activation — the place to load data), `pagePaused(page, app)`, `onPageSerialize({page})` / `onPageDeserialize({page})` (e.g. for offline) |
| Dialog | `dialogInitialized(dialog)`, `dialogOpened({dialog})`, `dialogClosed` |
| Datasource | `onDatasourceInitialized(ds, owner, app)`, `onBeforeLoadData(ds, query)` (return `false` to cancel), `onAfterLoadData(ds, items, query)`, `onLoadDataFailed(error, ds, query)`, `onBeforeSaveData({datasource, items})`, `onAfterSaveData({datasource, items})`, `onValueChanged({datasource, item, field, oldValue, newValue})` |

- **Navigation order:** the old page runs `pagePaused`, then the new page runs `pageInitialized` (first visit only) and then `pageResumed` [IBM].
- **Event naming:** events are kebab-case (`before-load-data`) with camelCase `on…` aliases. `before-invoke-action`, `after-invoke-action` and `field-warning` have no alias and are declared as quoted methods, e.g. `'field-warning'({item, field, warning})`. Raw binding is also possible: `ds.on('before-put-data', fn)` [IBM].
- **Bubbling order:** UI component → datasource controllers → page controllers → application controllers [IBM].

### 4.2 Wiring events in XML

```xml
<button label="Save" on-click="saveWorkOrder" on-click-arg="{item}" id="btn_001"/>
<text-input value="{item.description}" on-change="handleDescriptionChange"/>
<lookup id="positionLookup" datasource="dsposition" on-item-click="choosePosition"
        lookup-attributes="{['value','description']}"/>
```

The handler is resolved on the bound controllers or on AppCustomizations.js [IBM]. Dialogs support `on-open-action` / `on-open-action-arg`, `on-close-action` and `on-primary-action` [IBM]. (A `callController` helper is sometimes cited online. No IBM source shows it, so don't use it.)

### 4.3 AppCustomizations.js — the supported JS seam

- It is an app-wide controller that can implement **any** event handler, and it "persists through upgrades" [IBM].
- **When several controllers define the same method, all of them run, in no guaranteed order.** To control order or replace behavior, find the controller, keep a reference to the original method, and reassign it [IBM]:

```js
const ctrl = page.findController(c => c.constructor.name === 'WorkOrderDetailController');
const original = ctrl.someMethod.bind(ctrl);
ctrl.someMethod = (...args) => { /* before */ const r = original(...args); /* after */ return r; };
```

**Support tiers** [IBM]:

| Approach | Support |
|---|---|
| `app.xml` edits | Supported |
| `AppCustomizations.js` | Supported, upgrade-safe |
| `class X extends SchedulePageController` in a separate file, with `controller=` pointing at it | "Limited support" |
| Editing OOTB controller files | **Unsupported**; "requires manual merging with each release" |

- **Common API surface seen in IBM examples** [IBM]:
  - lookup: `app.findDatasource()`, `page.findDatasource()`, `app.findPage()`;
  - UI: `page.showDialog()`, `app.toast()`, `app.log.d/e/w/t(TAG, …)`;
  - context: `app.client.userInfo`, `app.device.isMaximoMobile`;
  - localization: `app.getLocalizedLabel()`, `app.getLocalizedMessage()`;
  - datasource methods: `ds.load`, `ds.save`, `ds.addNew`, `ds.deleteItem`, `ds.forceReload`, `ds.undoChanges`, `ds.applyInMemoryFilter`, `ds.updateBaseQuery`, `ds.initializeQbe/setQBE/searchQBE`.
- **Community samples** [IND]:
  - Bartosz Marchewka's two patterns for setting a field from a button: `findDatasource("dsCreateWo")` or `on-click-arg`.
  - BPD Zenith's hierarchical classification lookup, built with `findDatasource`/`setQBE`/`showDialog`.
  - Biplab Das Choudhury's status restriction, using `allowCustomWOStatus`/`customAllowedStates` states.
  - The IBM-affiliated `ibm-maximo-mobile-dev/mobile-scripting` repo (GPL-3.0, "Work in Progress").

---

## 5. Component Library

There is **no public MAF component reference.** The full property tables live in the in-product "Developer Documentation" inside Application Configuration [IBM][IND]. The components below are the ones that appear in IBM's public examples [IBM]:

| Category | Components |
|---|---|
| Layout | `box`, `border-layout` (slots `top`/`start`/`middle`/`end`), `adaptive-column`, `panel`, `stacked-panel`, `header-template`, `tabs`/`tab`, `accordion-item` |
| Data display | `table`/`table-column`, `data-list`/`list-item`, `field`, `label`, `text`, `link`, `attachment-list`, `dashboard`, `dashboard-tile`, `dashboard-value-tile`, `dashboard-gauge-tile`, `value-threshold` |
| Inputs | `text-input`, `smart-input`, `textarea`, `number-input`, `date-input`, `date-relative`, `dropdown`/`dropdown-item`, `checkbox`, `search`, `button` (`kind` primary/secondary/ghost) |
| Dialogs (inside `<dialogs>`) | `dialog`, `lookup`, `lookup-with-filter` (`hierarchy-drill-in`, `on-drill-in`, `child-attribute`), `sliding-drawer` (`header-text`, `sub-title`, `align`, `dock-on-expand`, `content-padding`, `validate`) |
| Logic | `condition` / `set` |

Example (IBM 8.4 PDF):

```xml
<box children-sizes="100" direction="column" fill-child="true" fill-parent="true">
  <border-layout fill-parent="true" padding="true" middle-border="true">
    <start width="90" background-color="ui-01">
      <field label="Position" value="{reportworkLaborDetailds.item.position}"/>
    </start>
    <end width="10" background-color="ui-01">
      <button icon="carbon:chevron--right" on-click="openPositionLookup" kind="ghost"/>
    </end>
  </border-layout>
</box>
```

**Deprecated components** are listed in §13. Even IBM's own practices pages (updated Jan 2026) still show `<page-header>` and `<container>` in some examples, so don't copy them blindly [IBM].

---

## 6. Three Generations of Configuration Tooling

### 6.1 Generation 1 — `maf-tools` Docker image (8.4 → 9.0)

The "Maximo Application Framework Configuration application" ran as a container on the developer's machine [IBM]:

```bash
docker login cp.icr.io            # with the IBM entitlement key
docker run -it --privileged -p 3001:3001 -p 3006:3006 \
  -v /home/core/maximo_workspace_directory:/graphite/.workspace \
  cp.icr.io/cp/manage/maf-tools:9.0.0
# dev/demo with self-signed certs:  --env NODE_TLS_REJECT_UNAUTHORIZED=0
# or trust a root CA:  -v …/certs:/etc/ssl/certs --env NODE_EXTRA_CA_CERTS=/etc/ssl/certs/maximo.crt
# Windows/WSL file watching:        -e WATCHPACK_POLLING=true
```

- **UI and preview ports:** the UI is at `http://localhost:3001`, and port 3006 serves preview [IBM].
- **Login options** [IBM]:
  - **API key**, the default. Generate one with `POST /oslc/apitoken/create {"expiration":-1}`.
  - **MAS credentials** via OIDC.
  - Maximo username and password.
- **Prerequisites:** security groups need **OSLCMAFAPPDATA** and **WPEDITSETTING** set to "Use Object Structure for Authorization Name" and granted, plus API keys enabled. Machine: "at least 8 GB of RAM (16 GB Recommended)" [IBM][IND].
- **Image versioning:** one image per Mobile/Manage patch. The last listed is MAF config 9.0 image **9.0.30**, paired with Manage-Patch32 and framework 2.13.687 (IBM support page, modified 30 Sep 2026). IBM warns that "Maximo Application Framework Configuration application v9.0 Docker container image is the latest version" [IBM].
- **Command-line operations** run through `graphite-tools.js`: `build:production`, `upload`, `diff`, `apply` (§12) [IBM].
- **Topology warning:** do not host the configuration container and the browser in one VM while Manage runs in another, because it causes performance and network issues [IBM].
- **Device preview** (IBM blog, Rui Shen, Nov 2022; "provided 'as-is'", unsupported) [IBM-community]:
  - Requires a DEBUG Android build from IBM and `GRAPHITE_PREVIEW=1`.
  - Run `preview.preview("http://<host>:3006","techmobile",{live:true})` from Chrome DevTools remote debugging.
- **OpenShift variant:** IBM Developer (Oct 2025) documents running the same image on OpenShift, with ports 3000/3001/3006 and a `maf-tools-preview-…` route [IBM].

### 6.2 Generation 2 — Application Configuration in the suite (9.1+)

"Beginning with Maximo Application Suite v9.1, the Maximo Application Framework Configuration application is now referred to as **Application Configuration**". It is deployed with MAS and opened from the Application administration menu [IBM]. Local Docker is not supported for 9.1 [IBM-community].

**Enabling it** (IBM docs, cached) [IBM]:
1. Admin dashboard → Administration → **Configurations** → *Other* → **Application configuration** → Configure → enable.
2. Provide a **persistent volume**: name (e.g. `config-workspace`), size (e.g. `8Gi`), storage class (e.g. `nfs-client`). In **9.2** you choose the RWX/RWO access mode, and the choice is fixed at creation. Early 9.1 docs assumed RWX; on RWO clusters, users recreated the PVC by hand [IND].
3. Add users to the **`MAFCONFIGADMIN`** security group (an alternative group can be configured). They then see *Application Administrator → Application configuration*.

**Using it.** On first open you enter the **MAS** server address, not the Manage address [IBM]. The editor has these parts:
- **Application list:** duplicate, re-download, delete, view revision history.
- **Editor:** an XML editor, plus `AppCustomizations.js` and `i18n/labels.json`.
- **Canvas:** drag-and-drop for a subset of elements.
- **Actions:** Preview, Save, Publish [IBM].

**9.2 improvements** (MAS 9.2 what's new, cached) [IBM]:
- zip upload auto-creates and updates delta files;
- a FIFO queue for preview, publish and save-and-preview;
- real-time progress, plus downloadable preview, publish and build logs;
- **50–80% faster preview builds**;
- `default-log-level` on `<maximo-application>`;
- a Canvas that renders full pages and dialogs, with layout guides;
- a help menu linking best practices, REST API docs and training;
- a warning when you modify default JavaScript ("You might lose your customizations").

**Field reality** is covered in §14 [IND]. Early 9.1 preview timed out (DT450848). Uploads were capped at 500 KB. Patches left the `graphite-configuration` image stale. Practitioner verdict: "Its been nothing but a headache since they've merged the tool into Maximo" (Andrew Weaver, Nov 2025). Another: "Preview does not work… you need to publish the changes" (Ritesh Ranjan, Nov 2025).

### 6.3 Generation 3 — MAF Local Configuration (Local Dev Mode)

This is a VS Code / IBM Bob extension. It has its own section (§7).

### 6.4 Side-by-side

| Capability | Gen 1 Docker `maf-tools` | Gen 2 Application Configuration | Gen 3 Local Configuration |
|---|---|---|---|
| MAS versions | 8.4–9.0 | 9.1+ | 9.1.21+, 9.2.1+ |
| Runs on | Desktop Docker (privileged) | OpenShift pod + PVC | VS Code / Bob + Node 20 + Yarn |
| Editor | Browser UI on :3001 | Browser UI in MAS | Your IDE (full JS/XML tooling, Git) |
| Preview | Local React server (:3006) | In-suite (early 9.1 broken; 9.2 faster) | Local `yarn start` on :3000 proxied to live Manage |
| Auth | API key / OIDC / user-pass | MAS SSO + MAFCONFIGADMIN | OIDC-PKCE (`configtoolpkce`) / user-pass / API key |
| Create/clone apps | Yes | Yes | **No** (use Application Configuration) |
| Delta/migration | `graphite-tools.js diff/apply` | Auto delta; "Migrate prior configurations" | Auto delta on publish; Migrate Configuration commands |
| AI | — | — | Bob "MAF Config" mode + Graphite MCP server |
| Support status | Supported (frozen at 9.0) | Supported | Early access, "AS IS" |

---

## 7. MAF Local Configuration (Local Dev Mode) — Deep Dive

### 7.1 Identity and status

| Item | Value | Source |
|---|---|---|
| Current product name | **IBM Maximo Application Framework Local Configuration** (renamed 2026-09-09, PR #15) | [IBM] |
| Earlier names | "Maximo Application Configuration – Local Dev Mode", "Maximo Local Dev Mode" | [IBM] |
| Extension | "Maximo Developer Configuration Tools", ID `maximo-developer-configuration-tools`, publisher `maximo-dev-tools` | [CODE] |
| Self-description | "an enhancment to the supported MAF Config tool that allows application configurators to download and configure apps using VSCode or BobIDE" (sic) | [IBM, README] |
| Supported MAS | "MAS 9.1.21 and newer and MAS 9.2.1 and newer" (before 2026-09-09: 9.2 GA / Patch 1 only) | [IBM] |
| License | VSIX `LICENSE.txt`: **IBM PROPRIETARY SOFTWARE**, usable only with a valid MAS license; site: offered **"AS IS"**. Repo is docs-only; source not public | [IBM][CODE] |
| Distribution | GitHub Releases + `install.sh`; Marketplace "coming soon" | [IBM] |
| Maturity | "Early Access Preview" / "Not for production use"; latest **v0.0.1-beta.6 (2026-09-22)** | [IBM] |
| Known limitation | "Cannot create or clone applications — use the MAF Tool to clone applications for now" | [IBM] |
| Docs site | https://ibm-mas.github.io/maf-local-dev-mode/ (4 pages: index, install, features, manual) | [IBM] |

### 7.2 Release history [IBM]

| Tag | Date | Highlights |
|---|---|---|
| alpha1 / alpha1.1 | 2026-05-21 / 05-22 | First drop, "early access preview" |
| v0.0.1-alpha.3 | 2026-05-27 | Session manager, connection manager, insecure SSL |
| alpha.4–alpha.6 | 2026-05-29 → 06-02 | OIDC configuration panel |
| alpha.7 | 2026-06-18 | App search, auto token refresh, preview state sync |
| alpha.8 | 2026-06-20 | Core-file hash check before publish; OIDC URL fix |
| alpha.9 | 2026-06-24 | **Local Migration Utility** |
| beta.1 | 2026-07-15 | **Configure Bob Features (Graphite MCP)**; panel rewrite |
| beta.2 | 2026-07-28 | **"MAF Config" Bob mode** |
| beta.3 | 2026-08-04 | **Health Check** panel; offline-mirror checks; file protection |
| beta.4 / beta.5 | 2026-08-11 | API-key URL fix (`/api/` not `/oslc/`); Windows/PowerShell fix; portable libraries |
| **beta.6** | **2026-09-22** | Error documentation service, "Offline Mirror Docs" button, `download.keepZip` setting |

### 7.3 Prerequisites [IBM][CODE]

- **Editor:** "IBM Bob IDE or VSCode 1.74.0+", with the `bobide` or `code` command on PATH.
- **Node.js 20.0.0+.** It is "Required for running the preview server and development tools". The installer only warns if Node is missing.
- **Yarn.** Not listed in the docs, but build, preview and publish all shell out to `yarn` [CODE].
- **curl** (installer); Git optional; internet for install and MAS auth.
- **MAS:** a valid license and access to an environment at 9.1.21+ or 9.2.1+.
- **OS:** no published matrix. The installer is bash. Windows had issues (#11 fixed in beta.5; #16 open).

### 7.4 Install [IBM]

```bash
# IBM Bob IDE
curl -fsSL https://ibm-mas.github.io/maf-local-dev-mode/scripts/install.sh | bash -s bob
# VS Code
curl -fsSL https://ibm-mas.github.io/maf-local-dev-mode/scripts/install.sh | bash -s vscode
# Manual
code --install-extension maximo-developer-configuration-tools.vsix   # or: bobide --install-extension …
```

**What `install.sh` does:**
1. Reads the GitHub `releases/latest` API.
2. Downloads the first `.vsix`.
3. Runs `<cli> --install-extension <vsix> --force`.
4. Prints next steps: for local Manage, "No additional setup needed"; for remote MAS, "Follow OIDC setup in the plugin"; then open the Command Palette and type "Maximo Dev Tools".

**Security note:** piping a remote script into bash is a supply-chain risk. In regulated shops, download the VSIX from the release page, verify it, and install it manually.

### 7.5 Authentication

There are three methods: **OIDC/OAuth2**, **username/password**, and **API key** [IBM]. Sessions appear under VS Code Accounts, because the extension registers an authentication provider [CODE].

**OIDC.** The extension registers a public **PKCE** client, `configtoolpkce` ("Maximo Configuration Tool"), by POSTing to `{authUrl}/oidc/endpoint/MaximoAppSuite/registration` with the **MAS OAuth admin credentials** [CODE]. The in-extension help says those credentials live in the OpenShift secret `<instance>-credentials-oauth-admin` (namespace `mas-<instance>-core`, keys `oauth-admin-username` / `oauth-admin-password`). Otherwise, "Ask your cluster administrator to use the plugin to register the OIDC configuration." Tokens come from `/oidc/endpoint/MaximoAppSuite/token` using an authorization code plus refresh tokens [CODE].
- **Governance implication:** registering the client needs cluster-admin-level secrets once. Plan it as a platform-team task, not a developer self-service step.

**Which URL to use** (maintainer, issue #5) [IBM]. OIDC works with the MAS Home URL. **An API key works only with the Manage URL**: "For API key you HAVE to use Manage URL… use the Manage home url [for] all use cases."

**Other options:** self-signed certificates are allowed per connection (`allowSelfSignedCerts`), and connections can be exported and imported [CODE].

### 7.6 How it talks to MAS [CODE]

It calls the same backend as Application Configuration (the `/graphite/configtool/...` endpoints):

| Operation | Endpoint |
|---|---|
| List apps | `GET /graphite/configtool/packages?workspaceId={ws}&appIds=manage,core,addons,assist,monitor` (on the `https://api.{domain}` host) |
| Download | `GET /graphite/configtool/packages/{app}/binary?workspaceId=…&appid={category}` → `app-source.zip` extracted into the workspace |
| Revisions | `GET /graphite/configtool/packages/{pkg}/revisions` |
| Publish | `POST /graphite/configtool/packages/{appId}/binary?workspaceId=…&appid=…&appDesc=…&version=…&isMobile=…` (zip, `x-access-token` header) |
| Local/dev Manage | `/maximo/oslc/os/oslcmafappdata` (fallbacks `/maximo/oslc/graphite/application`, `/maximo/api/graphite/applications`), `/maximo/oslc/whoami` |

### 7.7 Preview server [IBM][CODE]

- **Start it** with the command "Maximo Dev Tools: Start Preview Server with MAS Session". It may first offer `yarn build --no-upgrade`.
- **What runs:** `yarn start` as a VS Code task, with Graphite proxy environment variables injected:
  - `GRAPHITE_PROXY_MANAGE_URL` (+`/maximo`) and `GRAPHITE_PROXY_SECURE`;
  - `GRAPHITE_PROXY_MANAGE_XACCESSTOKEN` + `GRAPHITE_PROXY_MAS_EMULATION=true` for OIDC;
  - `GRAPHITE_PROXY_MANAGE_MAXAUTH` for username/password;
  - `GRAPHITE_PROXY_MANAGE_APIKEY` for an API key.
- The app "is expected to start locally at `http://localhost:3000`". "Only one preview server is intended to run at a time."
- **Site claim:** "Changes to XML configuration files are detected automatically and reflected in your browser without manual refresh." Live reload most likely comes from the Graphite dev server's own file watcher [UNVERIFIED mechanism].
- **The same proxy pattern works by hand.** The bundled MCP docs describe a `.env` with the variables above. After editing it, "you MUST run `yarn clean && yarn build`… `yarn start`" [CODE].

### 7.8 Offline mirror (the #1 setup gotcha)

- **Site claim:** the extension "caches application metadata, object structures, and configuration data locally", in `~/.maximo-dev-tools/cache/` [IBM].
- **What the code actually does:** it builds an **`offline-mirror/`** directory in the workspace holding npm tarballs **served by MAS**, plus `vendors/` and `libraries.json` (`tools/configure.cjs`) [CODE].
- **Why it matters:** IBM's build packages, such as `@maximo/maxdev-cli`, are **not on public npm**. Without the mirror, `yarn build` fails with `GET https://registry.yarnpkg.com/@maximo%2fmaxdev-cli - Not found` (issue #16, MAS 9.1.22, Windows 11, open). A commenter said the fix is the offline mirror, and that this "should [be] more clearly documented" [IND].
- **Tooling:** run the **Refresh Offline Cache** command and the **Health Check** panel (beta.3+) to verify connectivity to the mirror and the required Graphite version [IBM].

### 7.9 Diff, delta, file protection, migration [IBM][CODE]

- **Delta generation.** The site claims "semantic XML comparison and three-way merge". The code shows `AWArtifactDiff`/`AWArtifactApply`, which produce transaction-style XML deltas between the baseline and your `app.xml`. Deltas are generated for modified XML files on publish. A three-way merge **UI** is [UNVERIFIED].
- **File protection** ("Warn when you modify core application files that are not upgradeable"):
  - implemented as a manifest-checksum guard;
  - settings `maximoDevTools.fileProtection.enabled` and `.showWarnings`, both default true;
  - command "Check If Current File Is Protected".
- **Migration (alpha.9+).** The commands "Check for Configuration Migration" and "Migrate Configuration from Previous Version" copy `AppCustomizations.js` and `lookups.json` and apply deltas, for both OOTB and duplicated apps.

### 7.10 Publish pipeline [CODE]

`yarn clean` → `yarn build` → `yarn build:production` → generate diffs → read version and description from `app.xml` → `maxdev-cli package-app -a <app> -v <ver>` → POST the zip to `/graphite/configtool/packages/{appId}/binary`. The result is a new **ACTIVE revision in MAFAPPDATA**, the same as a publish from Application Configuration, UpdateDB, or `maxdev-cli upload-app` [IBM, CPD FAQ]. The core-file hash check before publish has existed since alpha.8.

### 7.11 Commands and settings (beta.6 `package.json`) [CODE]

- **Activity bar:** the "Maximo Configuration Tools" container, with **Connections** and **Applications** views.
- **Commands** (category "Maximo Dev Tools"):
  - Sign In to MAS / Sign Out; Show MAS Sessions;
  - Start / Stop Preview Server;
  - Check for Configuration Migration; Migrate Configuration from Previous Version;
  - Refresh Offline Cache;
  - Manage / Refresh / Export / Import Connections;
  - Check for Updates; View IBM Package Manifest; Check If Current File Is Protected;
  - **Configure Bob Features (Graphite MCP)**; **Run Health Check**.
- **Settings:** `maximoDevTools.fileProtection.enabled`, `maximoDevTools.fileProtection.showWarnings`, `maximoDevTools.download.keepZip`. The readme also lists `maximoDevTools.enable/.defaultEnvironment/.configPath`, but they are absent from beta.6.

### 7.12 Open issues as of 2026-10-16 [IBM]

| # | Issue |
|---|---|
| 16 | Windows `yarn build` fails — `@maximo/maxdev-cli` not found (offline mirror) |
| 14 / 13 / 12 | Download status on the wrong item; wrong search results after download; request for an "app outdated" indicator |
| 8 | Graphite MCP server cannot discover domains |
| 6 / 7 | MCP edits OOTB JS files; heavy token use |
| 5 | Confusion over which URL to use for which auth method |

The GitHub issues are the **only independent signal** found on the tool so far. No independent blog, video or LinkedIn review was found, apart from an MRM-EAM overview dated 2026-10-14 [IND].

---

## 8. Step-by-Step: A Local Development Workflow

This is a recommended workflow that combines IBM guidance with practitioner lessons. It targets MAS 9.1.21+/9.2.1+.

**One-time platform setup (MAS admin):**
1. Enable Application Configuration with a PVC, and add the developers to `MAFCONFIGADMIN` (§6.2).
2. Make sure the users' security groups can read and write **OSLCMAFAPPDATA**, plus any object structure their datasources will use [IBM].
3. Register the OIDC PKCE client once, using the extension's OIDC panel and the OAuth admin secret (§7.5). Alternatively, issue API keys and tell developers to use the **Manage** URL.
4. **Duplicate the IBM app** you will customize (e.g. `TECHMOBILE` → `MYTECHMOBILE`) in Application Configuration, because the local tool cannot clone. Assign security groups to the duplicate on its first publish [IBM]. Duplicating protects you from fix packs and is the practice most practitioners recommend [IND]. The trade-off is that upgrades of duplicates need delta migration (§12).

**Developer workstation:**
5. Install Node 20+ and Yarn, then install the extension (§7.4) into VS Code or Bob.
6. Sign in, either with Command Palette → *Maximo Dev Tools: Sign In to MAS* or from the Connections view.
7. Download the app from the Applications view. Then `git init` the workspace and commit the **pristine** download as your baseline. This one step gives you what neither earlier generation had: a real history.
8. Run **Health Check** and **Refresh Offline Cache**. Fix the mirror before your first build (§7.8).
9. **Start Preview Server.** The app opens at `localhost:3000` against live Manage data.
10. Edit `app.xml`, the included XML files, `AppCustomizations.js` and `i18n/labels.json`. Keep component ids unchanged and attribute names lowercase. Put all JS in AppCustomizations.js, and watch the file-protection warnings.
11. Debug with `?_graphite_logLevel=trace` and browser DevTools (§9).
12. Commit, and open a pull request for peer review of the XML/JS diff and the generated `app.delta.xml`.
13. **Publish to DEV.** This creates a new MAFAPPDATA revision. Smoke-test on a real device (mobile) and in a browser (RBA).
14. **Promote** to TEST and PROD by publishing the same reviewed workspace to each environment's connection (§11.4). Record the MAFAPPDATA revision you published.

**Anti-patterns to avoid:**
- editing OOTB controllers;
- publishing while the preview server is still starting [IBM];
- duplicating object structures;
- changing component ids;
- relying on Migration Manager for MAF apps;
- testing only in a browser when the target is offline mobile.

---

## 9. Debugging MAF Applications

| Technique | How | Source |
|---|---|---|
| Client log level | Append `?_graphite_logLevel=trace\|debug\|info\|warn\|error` to the RBA/preview URL, e.g. `http://localhost:3000/?_graphite_logLevel=trace#/createwo` | [IBM, CPD] |
| App default log level (9.2) | `default-log-level` on `<maximo-application>` for preview | [IBM] |
| Tagged logging | `this.app.log.d(TAG, …)` / `.e` / `.w` / `.t` | [IBM] |
| Server log stream | `/maximo/oslc/service/logging?action=wsmethod:streamLog` | [IBM, CPD] |
| DOM ↔ XML | The id in the browser inspector maps to the component id in `app.xml` (CPD "Debug UI") | [IBM] |
| Deployed build check | `https://<host>/maximo/oslc/graphite/techmobile/build.json` | [IND] |
| Mobile device | `chrome://inspect/#devices`; "Maximo Mobile Network/DB Inspector" (bundled docs); Gen 1 device live-preview with a DEBUG Android build | [IBM][CODE] |
| Publish/preview logs (9.2) | Downloadable from Application Configuration; build logs from the failure toast | [IBM] |
| Support cases | Attach `app.delta.xml` | [IBM] |
| RBA not showing a publish | Delete `mxe.int.globaldir/maximo/maf` to force re-extraction; technote ibm16988871: delete `TECHMOBILE/build/src` to force a rebuild | [IND][IBM] |

Field pitfalls [IND]:
- WSL Docker could not reach `localhost:3006` (Sourabh Jain, Jan 2025).
- On 9.1.4, preview could not load OpenStreetMap tiles because of the Content Security Policy.
- An invalid `app.xml` saved with no error, and the publish then hung (DT503372).

---

## 10. Mobile Offline Data Model

- **Preloaded database:** static reference data (domains, items, classifications, failure codes) is generated on the server and downloaded before transactional data. Datasources opt in with the lookup-data flag. Data can be partitioned by site and by language. **Limitation:** when several lookup-data datasources share one object structure, only one saved query is applied [IBM, CPD].
- **Mobile master schema:** each active app ships a `mobileDisconnectedSchema.json`. Maximo **merges these by object, not by datasource id**, into one shared schema. This is why duplicating object structures causes trouble [IBM].
- **Download controls:** `offline-immediate-download` and `download-page-size`. **`mobile-qbe-filter`** is a client-side filter applied on the device when disconnected; pair it with `qbe` so online and offline results match [IBM].
- **Cross-app sharing (9.2.0):** `<mobile-shared-data-from app-id="techmobile" datasource-id="…">` reuses another app's downloaded data, with a fallback to its own download [IBM].
- **Transactions:** errored transactions surface in `syncTranscationDS` (IBM's spelling) and per-object error datasources. Signature options are evaluated only when connected [IBM]. Conflict-resolution rules are [UNVERIFIED]. The legacy MOBILETXN cron family comes from a 2018 technote, and its relevance to MAS Mobile is [UNVERIFIED].
- **9.1 / 9.2 mobile features:** enhanced delta refresh and the Mobile Admin app for sync definition (9.1). Individual record sync, background fetch, parallel downloads at login, and record image download controls (9.2) [IBM].
- **Implication for local development:** a localhost **browser** preview does not exercise the offline path. Any change that touches datasources, lookup data or `mobile-qbe-filter` needs a device test after publish.

---

## 11. Storage, Revisions, Security and Promotion

### 11.1 MAFAPPDATA

| Column | Meaning |
|---|---|
| APPID | e.g. TECHMOBILE |
| (binary) | zip BLOB of the built app |
| VERSION | from `build.json` |
| REVISION | increments per insert |
| CHECKSUM | integrity |
| STATUS | ACTIVE / DISABLE |
| DEPLOYBY, DEPLOYDATETIME | who and when |
| ISMOBILE | pushed to devices? A duplicate's "Mobile?" flag is **off** by default |

"Every insert creates a new revision set to ACTIVE, whether via UpdateDB, maxdev-cli upload-app, or the Configuration Application (through a publish)." Through 9.1, the dashboard showed only active versions [IBM, CPD FAQ].

### 11.2 Revert

There is **no IBM-documented revert action.** Re-download only discards unpublished edits [IBM]. A partner method (MRM-EAM, 2026-09-09) uses SQL to set the older revision's `STATUS='ACTIVE'` and the current one to `DISABLE`, then republishes. It is **unofficial** [IND]. With the local tool, the practical revert is `git revert` followed by a republish.

### 11.3 Security summary

| Need | Grant | Source |
|---|---|---|
| Use Application Configuration (9.1+) | `MAFCONFIGADMIN` group (configurable) | [IBM] |
| Read/write app packages | OSLCMAFAPPDATA object structure authorization | [IBM] |
| Edit settings (Gen 1) | WPEDITSETTING | [IBM] |
| Run a published app | Assign security groups on first publish; duplicates inherit source security | [IBM] |
| Datasource objects | Grant every new object structure used | [IBM] |
| 9.2 cloned/custom apps | "Entitlements for cloned and custom applications" | [IBM] |
| MAFCONFIG permission | Seen in a 9.1 pod log only | [UNVERIFIED] |

### 11.4 Promotion dev → test → prod

IBM: "Currently, Migration Manager functionality cannot migrate a Maximo Mobile or Role Based (Graphite) application from one Maximo environment to another" (technote ibm17045770, June 2026) [IBM]. These options exist:

| Method | Notes | Source |
|---|---|---|
| Republish the same workspace to each target | Point the tool (any generation) at the target and publish. With the local tool, use one connection per environment, driven from Git | [IBM][IND] |
| Copy `app.xml` + `AppCustomizations.js` between workspaces, then publish | IBM's documented manual migration (≤9.0). Duplicates must be duplicated in **both** environments first | [IBM] |
| REST upload of the built zip | `POST /maximo/api/os/OSLCMAFAPPDATA?appid=INSPECTION&action=wsmethod:uploadFile&version=9.0.0.0` with the zip of `{workspace}/{user}{app}/build/app`. "Not environment specific" | [IBM] |
| 9.1 zip "Upload file" | Keep the `<APPID>/` folder structure. Windows `application/x-zip-compressed` was rejected (technote). **500 KB cap** reported through 9.1.7; the 413 errors were fixed in 9.2 | [IND][IBM] |
| CI/CD | `bmarchewka/mas-maftool-app-publish`: uses Docker `maf-tools` on 9.0, and the Application Configuration REST API `/config/server/application/{appId}/upload-files` + `/upload-status` on 9.1 | [IND] |
| Migration Manager on MAFAPPDATA | Community workaround (object structure + where clause on the latest row). Hits `mxe.doclink.maxfilesize`. **Not supported** | [IND] |

---

## 12. Upgrades, Delta Files and Merge

**Why it matters.** Upgrades and fix packs replace the default apps. If you configured the **default** app, it is archived and the new version becomes active. If you configured a **duplicate**, it is not touched, but it falls behind. "In either scenario, you bring forward configurations to the latest version" [IBM].

**The two-step model:** (1) create a **delta** of your changes against the original, then (2) **apply** the delta to the new version [IBM].

**Gen 1, manual (≤8.10 → 8.11).** Folders `ORIG/` (IBM original), `CONF/` (configured) and `DIFF/` (delta) [IBM]:

```bash
docker run -it --privileged --entrypoint "/graphite/scripts/graphite-tools.js" --workdir /graphite/app \
  -v ~/810to811:/graphite/app cp.icr.io/cp/manage/maf-tools:8.11 \
  diff --original 810ORIG/TECHMOBILE/app.xml --modified 810CONF/TECHMOBILE/app.xml \
       --deltaOutput 810DIFF/TECHMOBILE/app.xml -d

docker run … cp.icr.io/cp/manage/maf-tools:8.10 \
  apply --delta 89DIFF/TECHMOBILE/app.xml --input 810ORIG/TECHMOBILE/app.xml \
        --output 810CONF/TECHMOBILE/app.xml -d
```

**What a delta looks like:**

```xml
<updatescript version="">
  <app apptype="maf" id="TECHMOBILE">
    <add before="xd5k8" container="w224k" control="attribute">
      <set property="id" value="jvggb"/><set property="name" value="risk"/>
    </add> …
```

**What `apply` reports and preserves:** it logs ADD/REMOVE/MODIFY/MOVE lines and warnings such as `Cannot MOVE control … NOT_FOUND_ERR`. A warning usually means the target component was **deprecated**, so you re-implement that change on its replacement component. XML comments are not preserved [IBM].

**8.11+.** `app.delta.xml` is auto-generated next to `app.xml` [IBM].

**9.1+.** The **"Migrate prior configurations"** action:
- It was disabled for duplicates in 9.1.0 (DT451534, fixed in the 9.2 FC November 2025). Teams ran `node graphite-tools.js` by hand meanwhile [IND][IBM].
- Duplicates always warn on upgrade because the app id differs (DT421931, DT446654) [IBM].
- What the action does internally is undocumented [UNVERIFIED].

**9.2.** Delta files are generated at publish for **all** XML files. Custom `src` files and `public/i18n` are "included as part of migration", and `<code-comment>` is supported in deltas [IBM].

**Local tool.** The Migrate Configuration commands (§7.9) apply the same model on your workstation. Combined with Git, you can review the merged result before you publish it.

**Practitioner warning [IND].** Mark Fritz (GM, Feb 2026) described a cloned GMTECHNICIAN app of over 20 MB, a 500 KB upload cap, and no published guidance on whether to re-clone and re-apply deltas. That question is still publicly unanswered.

---

## 13. Version History and Deprecations

| Version | MAF milestone | Source |
|---|---|---|
| 8.4 (2022) | IBM PDF "Customizing Mobile 8.4 applications with the MAF Configuration application"; Docker `maf-tools` | [IBM] |
| 8.9 | Work Centers deprecated (→ RBAs on MAF) | [IBM] |
| 8.10 | Floor for supported configuration; **`container` deprecated** → `box` / `border-layout` | [IBM] |
| 8.11 | **`page-header` deprecated** → `header-template`; automatic `app.delta.xml` | [IBM] |
| 9.0 | Inspections MAF app replaces the Inspection Forms Work Center; CSS customization (Suite admin → Configurations → User Interface Customization); last Docker `maf-tools` line (image 9.0.30) | [IBM] |
| 9.1 | Renamed **Application Configuration**, in-suite on OpenShift with a PVC, MAFCONFIGADMIN; Mobile Admin app; delta refresh | [IBM] |
| 9.2 (GA 25 Jun 2026) | **`chat-log` deprecated** (work/communication logs now defined in app XML); **Arabic and Hebrew** support for MAF apps; cross-app data sharing; faster preview, publish queue, logs, Canvas upgrades; RWX/RWO choice; entitlements for cloned/custom apps; delta for all XML | [IBM] |
| 9.1.21+ / 9.2.1+ (2026) | **MAF Local Configuration** extension (alpha May 2026 → beta.6 Sep 2026) | [IBM] |

Deprecation source: IBM "Deprecated Maximo Application Framework components" (cached 2026-08-12). See also DOC15 UPG-08/UPG-09.

---

## 14. Known Defects and Practitioner Pain Points

| Ref | Problem | Status | Source |
|---|---|---|---|
| DT450848 | TECHMOBILE preview times out in Application Configuration (9.1.2, 9.1.7); "no workaround" | Fix quoted as 9.1.7 or 9.1.8 (IBM gave conflicting answers) | [IND] |
| — | Zip uploads capped at **500 KB** | Workarounds: zip only the changed files, or copy into the pod at `/graphite/.workspace/maxadmin-appconfig.[dns]/[APPID]/src` and then publish | [IND] |
| DT449679 / DT450721 | PayloadTooLarge / 413 on save and publish | Fixed 9.2 FC Nov 2025 | [IBM] |
| — | After a 9.1.x patch, the `graphite-configuration` image is stale → "'on-drill-in' … not defined in the registry" | Fix: align the deployment image to the operator's `spec.relatedImages` | [IND] |
| DT451534 | "Migrate prior configurations" disabled | Fixed 9.2 FC Nov 2025 | [IBM] |
| DT446092 / DT458164 / DT422782 | App won't open after publish; preview stuck; publish updates devices but not the browser RBA | Fixed 9.2.0 | [IBM] |
| DT424062 | Saving AppCustomizations.js flips the editor back to app.xml | Known issue in 9.2.0 | [IBM] |
| DT503372 | An invalid app.xml saves silently, then the publish hangs | — | [IBM] |
| DT458704 | maf-tools 9.0.16–9.0.19: preview breaks with ModuleNotFoundError after a save | — | [IBM] |
| DT447607 | 9.1 apps fail with `Unexpected token '<'` | Workaround: grant the app + restart the Manage pod; fixed by 9.1.4 per users | [IND] |
| — | Windows zip MIME type rejected on upload | Technote | [IND] |
| #16 (Local Config) | Windows build fails without the offline mirror | Open | [IND] |

**Summary of themes [IND]:**
1. The publish-to-test loop in 9.1 is the core pain, and it is what Local Configuration targets.
2. Size and upload limits on large custom apps.
3. Tooling images drift from the platform version after patches.
4. Upgrading duplicated apps is under-documented.
5. The developer documentation is hidden inside the product.

Nobody complained specifically that the editor is browser-only. The real complaints are about preview, upload and versioning.

---

## 15. AI-Assisted MAF Work (Bob, Graphite MCP)

- **Bundled MCP server:** the extension bundles **`@maximo/graphite-mcp-server` v1.3.0**. The command **Configure Bob Features (Graphite MCP)** writes `external-tools/graphite-mcp-server-wrapper.cjs` and registers it in `~/.bob/config.json` [CODE].
- **"🔧 MAF Config" Bob mode (beta.2):** routes requests to a **45-skill catalog** (`simple-*`, `advanced-*`, `concept-*`, `issues-*`) that mirrors IBM's Configuration Practices site. In practice it gives Bob IBM's own MAF playbook [CODE].
- **Early issues:**
  - #6: the MCP server edits **OOTB JS files**, which IBM's own support policy forbids. Keep file protection on and review diffs.
  - #7: heavy token use.
  - #8: cannot discover domains [IBM].
- **Other agents:** the MCP server is plain MCP, so in principle any MCP-capable agent can use it, including Claude, Copilot and Cursor. That is [UNVERIFIED]; IBM ships the wrapper only for Bob. TheMaximoGuys' **Max_mcp** and **Max_Interfaces** (see DOC16 §14) complement it on the data and API side.
- **Guardrails for AI-authored MAF changes:**
  - Keep changes in `app.xml` and `AppCustomizations.js` only.
  - Never let an agent rewrite component ids.
  - Require a Git PR with the generated `app.delta.xml`.
  - Publish only from a reviewed commit.
  - Test offline behavior on a device.

---

## 16. Blog Series Plan: MAS-MAF-DEV

**Folder:** `posts/MAS-MAF-DEV/`. **Shape:** index + 9 parts, all `draft: true`, written to the Blog Depth Contract (3,800-word floor, 3 research passes, ≥3 tables, 5 FAQs).

**Positioning:**
- The existing MAS-MANAGE Part 2 (Work Centers → RBA) and MAS-BOB Part 4 only *mention* MAF. This series is the first **hands-on developer** line on MAF.
- Hook: "MAF development comes back to your desktop."
- **Tier:** developer (Parts 1–9), admin (Part 8).

**Cover style:** **MarkerBoard**. It is code- and dev-flavored, and distinct from watsonx (Blueprint), Bob (SketchNote) and Civil (Chalkboard), in line with the cover-style-per-series rule. Covers must be dense, Pro tier, 16:9, and carry @themaximoguys.

| Part | Working title | Core content | DOC17 § | Tier |
|---:|---|---|---|---|
| 0 | MAF Development: The Complete Series Guide | Why MAF matters, the three tooling generations, reading paths by role | §1, §6.4 | developer |
| 1 | What Is the Maximo Application Framework? Graphite, XML→React and the Mobile Shell | One framework for Mobile + RBAs, MAFAPPDATA, what it replaced, Application Designer vs MAF | §2 | developer |
| 2 | Anatomy of app.xml: Pages, States, Datasources and Schemas | Workspace layout, skeleton, datasource types and properties, object structures, the id/lowercase/order rules | §3 | developer |
| 3 | Controllers and AppCustomizations.js: The Upgrade-Safe Way to Add Logic | Lifecycle hooks, event names and bubbling, the support tiers, method wrapping, community recipes | §4 | developer |
| 4 | From Docker to Desktop: Three Generations of MAF Tooling | maf-tools Docker → in-suite Application Configuration → Local Configuration; comparison table; pain that drove each change | §6, §14 | developer |
| 5 | Hands-On: MAF Local Configuration (Local Dev Mode) in VS Code and IBM Bob | Install, OIDC/API-key auth gotchas, offline mirror, preview at :3000, publish pipeline, commands, open issues | §7, §8 | developer |
| 6 | Debugging MAF Apps: Log Levels, Stream Logs and Device Inspection | `_graphite_logLevel`, streamLog, DOM↔XML ids, build.json, chrome://inspect, known defect table | §9, §14 | developer |
| 7 | Offline by Design: How Maximo Mobile Downloads, Filters and Syncs Data | Preloaded DB, master schema merge, `mobile-qbe-filter`, cross-app sharing, why browser preview isn't enough | §10 | developer |
| 8 | Ship It: Promoting and Upgrading MAF Apps Without Migration Manager | MAFAPPDATA revisions, revert, promotion options, delta diff/apply, Migrate prior configurations, Git-driven release flow | §11, §12 | admin |
| 9 | AI-Assisted MAF: Bob's MAF Config Mode, the Graphite MCP Server and Guardrails | Bundled MCP, 45-skill catalog, issues #6–8, review guardrails, agent-neutral angle + TMG tools | §15 | developer |

**Cross-links:**
- `relatedSlugs` to MAS-MANAGE Part 2 (RBA), MAS-BOB Part 4 (Bob + Maximo), MAS-9-2 Part 6 (upgrade watchlist; chat-log deprecation) and MAS-JAVA-EXTENSIONS (server-side counterpart).
- `clusterSlugs` within the series.

**Before drafting:**
- Re-fetch the Local Configuration site and releases, since beta versions change quickly.
- Re-check that IBM Docs is reachable again, so the cached claims can be confirmed.
- Resolve the §17 gaps marked *blocker*.

**Social (later):** MarkerBoard single images for Parts 4, 5 and 8 (comparison table, install flow, promotion options), and a LinkedIn carousel from Part 5.

---

## 17. Open Questions & Gaps to Close

| # | Gap | Why it matters | Priority |
|---|---|---|---|
| 1 | IBM Docs 403'd on 2026-10-16; several 9.1/9.2 claims rest on the 2026-08-12 cache or search summaries | Re-verify before publishing Parts 4 and 8 | **blocker** for Parts 4/8 |
| 2 | Offline cache location: `~/.maximo-dev-tools/cache/` (site) vs workspace `offline-mirror/` (code) | Install instructions in Part 5 | **blocker** for Part 5 |
| 3 | Live reload mechanism, and whether a three-way merge UI exists | Feature claims in Part 5 | medium |
| 4 | Exact 9.1+ permission names beyond MAFCONFIGADMIN (the MAFCONFIG sig option?) | Part 8 security table | medium |
| 5 | What "Migrate prior configurations" does internally | Part 8 | medium |
| 6 | How a device detects a new app version (login, sync, prompt) | Part 7 | medium |
| 7 | Offline conflict-resolution rules; whether the MOBILETXN cron applies to MAS Mobile | Part 7 | medium |
| 8 | RTL (Arabic/Hebrew) implementation details | Part 1 or 13 note | low |
| 9 | Fix version for DT450848 (IBM said both 9.1.7 and 9.1.8) | Part 6 defect table | low |
| 10 | The component reference is not public. Property tables need an in-product read (Developer Documentation) | Part 2 depth | medium |
| 11 | IBM docs are inconsistent: `<state name>` vs `<state id>`; deprecated `page-header`/`container` still appear in examples | Code samples in Parts 2–3 | low |
| 12 | Whether the Graphite MCP server works with non-Bob agents | Part 9 | low |
| 13 | IBM's technote ibm17045770 body (promotion) is login-gated | Part 8 | low |
| 14 | No official OS support matrix for Local Configuration | Part 5 | low |

---

## 18. References

**IBM — documentation, support, PDFs [IBM]**
- MAS/Manage user guides (local cache: `ibm_userguides_markdown/maximo_applicationsuite` §158 parts 25–26): Application Configuration, Docker image, delta files, migration, language support.
- Deprecated MAF components: https://www.ibm.com/docs/api/v1/content/SSRHPA_cd/appsuite/appconfig/deprecated_maximo_application_framework_components.html (cached `knowledge_base/MAS92-SOURCES/text/deprecated-maf.txt`)
- MAS 9.2 what's new: https://www.ibm.com/docs/en/masv-and-l/cd?topic=new-whats-in-maximo-application-suite-92 (cached)
- Configuring and customizing IBM Maximo Mobile (maf-tools versions; 9.1 rename): https://www.ibm.com/support/pages/configuring-and-customizing-ibm%C2%AE-maximo%C2%AE-mobile
- IBM Maximo Mobile architecture (ibm17232742): https://www.ibm.com/support/pages/ibm-maximo-mobile-architecture
- Customizing Mobile 8.4 applications with the MAF Configuration application (PDF): https://www.ibm.com/support/pages/system/files/inline-files/Customizing%20Mobile%208.4%20applications%20with%20the%20Maximo%20Application%20Framework%20Configuration%20application_0.pdf
- Migrating mobile application configuration (ibm17045770): https://ibm.com/support/pages/migrating-mobile-application-configuration
- Changes not reflecting after publish (ibm16988871): https://www.ibm.com/support/pages/maximo-mobile-maf-configuration-tool-changes-are-not-reflecting-maximo-mobile-after-publishing-changes
- MAS 9.2.0 readme: https://www.ibm.com/support/pages/node/7277376 · 9.1.4 readme: https://www.ibm.com/support/pages/node/7246982
- Delta file overview: https://www.ibm.com/docs/ja/masv-and-l/cd?topic=example-delta-file-overview · Applying delta file 8.11: https://www.ibm.com/docs/en/masv-and-l/cd?topic=overview-applying-delta-file-maximo-mobile-811
- IBM Developer — MAS configuration on Red Hat OpenShift: https://developer.ibm.com/tutorials/mas-configuration-redhat-openshift/
- MAF Configuration Practices: https://ibm-maximo-dev.github.io/configuration-practices-documentation/ (overview, concepts, datasources-guide, page-component-guide, dialog-component-guide, preloaded-database, mobile-master-schema, faq, simple/*, advanced/*)
- IBM roadmap decks: https://swmug.org/wp-content/uploads/2025/07/SWMUG2505_MaximoApplicationSuiteUpdate-IBM.pdf · https://swmug.org/wp-content/uploads/2026/03/SWMUGP2603_IBM_MaximoApplicationSuiteProductUpdate.pdf
- Rui Shen (IBM), Preview on device in Configuration app (2022-11-30): https://community.ibm.com/community/user/asset-facilities/blogs/rui-shen/2022/11/30/preview-on-device-in-configuration-app

**IBM — MAF Local Configuration [IBM][CODE]**
- Site: https://ibm-mas.github.io/maf-local-dev-mode/ (install.html, features.html, manual.html)
- Repo / releases / issues / PR #15: https://github.com/ibm-mas/maf-local-dev-mode · https://github.com/ibm-mas/maf-local-dev-mode/releases · https://github.com/ibm-mas/maf-local-dev-mode/pull/15
- Installer: https://ibm-mas.github.io/maf-local-dev-mode/scripts/install.sh

**Independent / practitioner [IND]**
- MoreMaximo — Where to find maf-tools for 9.1: https://moremaximo.com/discussion/where-to-find-maf-tools-for-91
- MoreMaximo — Upgrading custom mobile apps to 9.1.7 (M. Fritz): https://moremaximo.com/discussion/looking-for-updated-guidance-on-upgrading-custom-mobile-apps-to-mas-manage-917
- MoreMaximo — Deploying MAF changes across environments: https://moremaximo.com/question/deploying-maf-application-changes-across-environments
- MoreMaximo — Changes not reflecting in RBAs (S. Shull): https://moremaximo.com/question/maximo-mobile-changes-not-reflecting-in-the-role-based-apps-in-maximo-web
- MoreMaximo — Maximo Mobile customisation (M. Belfort, 2025-04-22): https://moremaximo.com/blogs/maycon-belfort/2025/04/22/maximo-mobile-customisation
- IBM Community — Preview not working for TECHMOBILE in 9.1 (B. Marchewka, DT450848): https://community.ibm.com/community/user/discussion/maximo-application-framework-configuration-tool-preview-mode-not-working-correctly-for-techmobile-in-mas-v91x
- IBM Community — graphite-configuration not upgraded after 9.1 patch: https://community.ibm.com/community/user/discussion/maximo-application-framework-configuration-graphite-configuration-not-upgraded-after-mas-91x-patch-version-installation
- IBM Community — zip upload error 9.1: https://community.ibm.com/community/user/discussion/mas-91-maximo-application-framework-configuration-tool-error-during-zip-file-upload-action
- IBM Community — MAF access 9.1: https://community.ibm.com/community/user/discussion/maximo-application-framework-access-mas-91
- IBM Community — Debugging Maximo Mobile app (S. Jain): https://community.ibm.com/community/user/discussion/debugging-maximo-mobile-app
- IBM Community — MAF simple JS customization examples (B. Marchewka): https://community.ibm.com/community/user/asset-facilities/discussion/maf-mobile-simple-javacustomizationsjs-examples-for-customization
- Interloc (K. Sayyed, 2023-01-27): https://www.interlocsolutions.com/blog/customizing-ui-for-mas-health/predict-mobile-apps-ui-using-maximo-application-framework-maf-configuration-application
- TRM (J. Q. Todd) — Getting started with MAF: https://trmgroup.com/resource/getting-started-with-the-maximo-application-framework-maf · MAS 9.2 functions: https://trmgroup.com/resource/what-are-the-new-and-impactful-functions-in-mas-9-2/
- MRM-EAM — Hidden developer documentation: https://mrm-eam.com/hidden-in-plain-sight-maximo-mobile-developer-documentation/ · Revert an RBA: https://mrm-eam.com/how-to-revert-a-role-based-application-to-a-previous-version-in-maximo-application-suite/ · Local configuration tools: https://mrm-eam.com/bringing-maximo-application-framework-development-back-to-your-desktop-ibms-new-local-configuration-tools/
- BPD Zenith — classification lookup: https://www.bpdzenith.com/the-bpd-blog/unveiling-maximo-mobile-customisation-classification-lookup
- B. Das Choudhury — WO status customization: https://www.linkedin.com/pulse/maximo-mobile-customisation-update-work-order-status-das-choudhury
- MaximoSecrets — Maximo UI 9.1: https://maximosecrets.com/2025/08/15/maximo-user-interface-9-1/ · History of Maximo Mobile: https://maximosecrets.com/2021/05/05/the-history-of-maximo-mobile/ · MAS 9.0 new features: https://maximosecrets.com/2024/06/26/mas-9-0-new-features/
- GitHub — mobile-scripting samples: https://github.com/ibm-maximo-mobile-dev/mobile-scripting · CI publish: https://github.com/bmarchewka/mas-maftool-app-publish
- Not a predecessor (legacy 7.6 add-on CLI): https://github.com/ibm-maximo-dev/maximodev-cli

**Companion TMG docs:** DOC1 (Work Centers → RBA), DOC15 (MAS 9.2 factbase UPG-08/09, MNG-11), DOC16 (IBM Bob, §13.4 and §14).
