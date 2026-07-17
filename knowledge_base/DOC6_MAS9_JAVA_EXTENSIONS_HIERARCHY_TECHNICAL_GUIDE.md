# MAS 9 Java Extensions & Add-On Technical Architecture: Complete Hierarchy Guide

**Document:** DOC6 - Java Extensions, PLUS Hierarchy & Add-On Technical Architecture
**Version:** 1.0
**Date:** March 19, 2026
**Audience:** Maximo developers, technical architects, customization leads, and upgrade teams
**Scope:** Complete technical documentation of MAS 9 Java extension architecture — PLUS prefixes, MBO inheritance chains, product.xml mechanics, add-on/industry solution relationships, compatibility matrix, and deployment in containerized MAS
**Upgrade Context:** Maximo 7.6.1.3 → MAS 9

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [How Maximo Java Extensions Work — The Fundamentals](#2-how-maximo-java-extensions-work--the-fundamentals)
3. [The PLUS Extension Registry — Complete Mapping](#3-the-plus-extension-registry--complete-mapping)
4. [MBO Inheritance Chain Architecture](#4-mbo-inheritance-chain-architecture)
5. [Product.xml — The Extension Control File](#5-productxml--the-extension-control-file)
6. [Extension Chain Resolution & Bytecode Injection](#6-extension-chain-resolution--bytecode-injection)
7. [Database Objects by Extension (MAXOBJECT Counts)](#7-database-objects-by-extension-maxobject-counts)
8. [Add-On & Industry Solution Technical Relationships](#8-add-on--industry-solution-technical-relationships)
9. [Compatibility Matrix — What Can Run Together](#9-compatibility-matrix--what-can-run-together)
10. [MAS 9 Deployment — Components & Activation](#10-mas-9-deployment--components--activation)
11. [Custom Extensions in MAS 9 — Customization Archive](#11-custom-extensions-in-mas-9--customization-archive)
12. [Java 17 Impact on Extensions](#12-java-17-impact-on-extensions)
13. [References & Resources](#13-references--resources)

---

## 1. Executive Summary

### What This Document Covers

Every Maximo add-on and industry solution extends core Maximo through a standardized Java extension architecture using **PLUS prefixes**. Understanding this architecture is critical for:

- **Upgrade teams** — knowing which extensions are active and how they chain together
- **Developers** — writing custom code that doesn't break when add-ons are installed
- **Architects** — planning which add-ons can coexist and how they interact technically
- **Troubleshooters** — diagnosing issues caused by incorrect extension chains

### The Core Concept

Maximo uses **Java class inheritance** to layer product functionality. Each add-on or industry solution gets a unique letter prefix (PLUSA, PLUSD, PLUSG, etc.) and extends core Maximo Business Objects (MBOs) using that prefix. When multiple products extend the same object, Maximo creates a **single inheritance chain** at build time through bytecode injection.

Example — the WorkOrder (WO) object with Transportation, HSE, and Spatial installed:

```
PlusSWOSet          ← Spatial (top of chain — last installed alphabetically)
  └── PlusGWOSet    ← HSE (Oil & Gas / HSE)
       └── PlusTWOSet    ← Transportation
            └── WOSet         ← Core Maximo
                 └── MboSet        ← Framework base class
```

The class registered in MAXOBJECT.CLASSNAME is always the **top of the chain** — in this case `PlusSWOSet`. But calling `super.save()` propagates down through every layer.

---

## 2. How Maximo Java Extensions Work — The Fundamentals

### 2.1 The MBO Architecture

Every Maximo Business Object (MBO) comprises **four Java files**:

| File | Purpose | Base Class |
|------|---------|-----------|
| **MBO Class** | Business logic for a single record | Extends `psdi.mbo.Mbo` |
| **MBO Set Class** | Logic for a set of records (the whole table) | Extends `psdi.mbo.MboSet` |
| **MBO Remote Interface** | Remote access contract for MBO | Extends `psdi.mbo.MboRemote` |
| **MBO Set Remote Interface** | Remote access contract for MBO Set | Extends `psdi.mbo.MboSetRemote` |

**Example — Core Asset Object:**

```
psdi.app.asset.Asset                 (MBO class)
psdi.app.asset.AssetSet              (MBO Set class)
psdi.app.asset.AssetRemote           (MBO Remote interface)
psdi.app.asset.AssetSetRemote        (MBO Set Remote interface)
```

The MAXOBJECT table links each Maximo object to its MBO Set class via `MAXOBJECT.CLASSNAME`. For the ASSET object, this is `psdi.app.asset.AssetSet`.

### 2.2 How Extensions Layer On Top

When an add-on extends a core object, it creates four new files following the PLUS convention:

**Example — Transportation (PLUST) extending Asset:**

```java
// Package: psdi.plust.app.asset

public interface PlusTAssetRemote extends AssetRemote { ... }
public interface PlusTAssetSetRemote extends AssetSetRemote { ... }
public class PlusTAsset extends Asset implements PlusTAssetRemote { ... }
public class PlusTAssetSet extends AssetSet implements PlusTAssetSetRemote { ... }
```

**Key rules:**
- The MBO class extends the core MBO class
- The MBO Set class extends the core MBO Set class
- Each implements its own Remote interface
- The Remote interface extends the core Remote interface
- Package naming: `psdi.plusX.app.{module}.PlusX{ObjectName}`

### 2.3 Field Validation Classes

Add-ons can also extend field validation classes:

```java
// Core field validation
psdi.app.asset.FldAssetItemnum

// Transportation extension of that field validation
psdi.plust.app.asset.PlusTFldAssetItemnum extends FldAssetItemnum
```

This is declared in the product.xml using the `<field>` tag.

---

## 3. The PLUS Extension Registry — Complete Mapping

### 3.1 Complete PLUS Prefix Directory

| Prefix | Product | Type | Package Root | Status in MAS 9 |
|--------|---------|------|-------------|-----------------|
| **PLUSA** | Asset Configuration Manager (ACM) | Add-on | `psdi.plusa` | Active — separate AppPoints |
| **PLUSB** | Building Information Models (BIM) | Extension | `psdi.plusb` | Legacy — limited support |
| **PLUSC** | Calibration | Included Capability | `psdi.plusc` | Active — included in base Manage |
| **PLUSD** | Utilities | Industry Solution | `psdi.plusd` | Active — Premium tier |
| **PLUSE** | Energy Optimization | Add-on | `psdi.pluse` | Legacy — replaced by Monitor/ESG |
| **PLUSF** | Facilities & Space Planning | Add-on | `psdi.plusf` | Active — evolving into TRIRIGA/MREF |
| **PLUSG** | Health, Safety & Environment (HSE) / Oil & Gas | Industry Solution + Add-on | `psdi.plusg` | Active — separate AppPoints |
| **PLUSH** | Healthcare / Life Sciences | Industry Solution | `psdi.plush` | Legacy — limited market |
| **PLUSI** | Maximo IT (IBM Control Desk / ICD) | Add-on | `psdi.plusi` / `psdi.icd` | Active — separate licensing |
| **PLUSL** | Linear Asset Management | Included Capability | `psdi.plusl` | Active — included in base Manage |
| **PLUSM** | Aviation | Industry Solution | `psdi.plusm` | Active — Premium tier |
| **PLUSN** | Nuclear | Industry Solution | `psdi.plusn` | Active — Premium tier |
| **PLUSP** | Service Provider | Add-on | `psdi.plusp` | Active — separate AppPoints |
| **PLUSS** | Spatial Asset Management | Add-on | `psdi.pluss` | Active — requires install AppPoints |
| **PLUST** | Transportation | Industry Solution | `psdi.plust` | Active — Premium tier |
| **PLUSV** | Civil Infrastructure | Industry Solution | `psdi.plusv` | Active — Premium tier |
| **TLOAM** | Maximo EAM core extensions | Core | `psdi.tloam` | Active — base product |
| **(custom)** | Customer customizations | Custom | `cust.*` or `custom.*` | Via Customization Archive |

### 3.2 Hierarchy Diagram — Technical Layers

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MAS 9 JAVA EXTENSION HIERARCHY                     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  LAYER 5: CUSTOMER CUSTOMIZATIONS (z_customer.xml)                   │
│  ├── cust.app.workorder.CustomWO                                     │
│  ├── cust.app.asset.CustomAsset                                      │
│  └── (any custom MBO extensions)                                     │
│                                                                       │
│  LAYER 4: INDUSTRY SOLUTIONS                                         │
│  ├── PLUSM  Aviation ──────── psdi.plusm.app.*                        │
│  ├── PLUST  Transportation ── psdi.plust.app.*                        │
│  ├── PLUSD  Utilities ──────── psdi.plusd.app.*                        │
│  ├── PLUSG  Oil & Gas / HSE ── psdi.plusg.app.*                        │
│  ├── PLUSN  Nuclear ────────── psdi.plusn.app.*                        │
│  └── PLUSV  Civil Infra ────── psdi.plusv.app.*                        │
│                                                                       │
│  LAYER 3: ADD-ONS                                                     │
│  ├── PLUSA  ACM ────────────── psdi.plusa.app.*                       │
│  ├── PLUSP  Service Provider ── psdi.plusp.app.*                       │
│  ├── PLUSS  Spatial ──────── psdi.pluss.app.*                         │
│  ├── PLUSC  Calibration ────── psdi.plusc.app.*                        │
│  ├── PLUSL  Linear ──────── psdi.plusl.app.*                           │
│  └── PLUSI  Maximo IT ────── psdi.plusi.app.* / psdi.icd.*            │
│                                                                       │
│  LAYER 2: CORE EXTENSIONS (TLOAM)                                    │
│  └── psdi.tloam.app.*                                                 │
│                                                                       │
│  LAYER 1: MAXIMO CORE                                                │
│  ├── psdi.app.workorder.WO / WOSet                                   │
│  ├── psdi.app.asset.Asset / AssetSet                                 │
│  ├── psdi.app.po.PO / POSet                                          │
│  ├── psdi.app.location.Location / LocationSet                        │
│  ├── psdi.app.inventory.Inventory / InventorySet                     │
│  └── (all core MBO classes)                                           │
│                                                                       │
│  LAYER 0: FRAMEWORK BASE                                             │
│  ├── psdi.mbo.Mbo                                                    │
│  ├── psdi.mbo.MboSet                                                 │
│  ├── psdi.mbo.MboRemote                                              │
│  └── psdi.mbo.MboSetRemote                                           │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.3 Add-On Functional Mapping

| PLUS Prefix | Product | Key Objects Extended | Key New Objects Created |
|-------------|---------|---------------------|----------------------|
| **PLUSA** (ACM) | Asset Configuration Manager | ASSET, WORKORDER, LOCATIONS | Configuration items, flight logs, build positions |
| **PLUSC** (Calibration) | Calibration | ASSET, WORKORDER, TOOLS | Data sheets, calibration standards, tolerances |
| **PLUSD** (Utilities) | Utilities | ASSET, WORKORDER, LOCATIONS, PM | Crew management, compatible units, design specs |
| **PLUSG** (HSE/O&G) | HSE + Oil & Gas | ASSET, WORKORDER, LOCATIONS, SR | Permits to work, isolation certs, incidents, operator logs |
| **PLUSL** (Linear) | Linear Assets | ASSET, WORKORDER, LOCATIONS, PM, ROUTES | Features, relationships, linear segments, reference points |
| **PLUSM** (Aviation) | Aviation MRO | ASSET, WORKORDER, PO | Flight logs, airworthiness, task cards, MEL |
| **PLUSN** (Nuclear) | Nuclear | ASSET, WORKORDER | Radiation work permits, nuclear-specific safety |
| **PLUSP** (SP) | Service Provider | ASSET, WORKORDER, PO, CONTRACTS | Customer agreements, warranty claims, bill review |
| **PLUSS** (Spatial) | Spatial | ASSET, WORKORDER, LOCATIONS | Map manager, spatial queries, GIS integration |
| **PLUST** (Transportation) | Transportation | ASSET, WORKORDER | Fleet management, vehicle classes, mechanic's clipboard, telematics |
| **PLUSV** (Civil Infra) | Civil Infrastructure | ASSET, LOCATIONS | Inspection assessments, condition ratings, road/bridge management |

---

## 4. MBO Inheritance Chain Architecture

### 4.1 How Chains Are Built

When multiple products extend the same core object, Maximo builds a **single linear inheritance chain**. The chain order is determined by:

1. **Product.xml file name** — processed in **alphabetical order**
2. **`<depends>` tag** — overrides alphabetical order when present
3. **Bytecode injection** — the `updatedb` process modifies compiled `.class` files to rewire the inheritance

### 4.2 Example: WorkOrder (WO) Chain

With core Maximo + Service Provider (PLUSP) + HSE/O&G (PLUSG) + Spatial (PLUSS) + Transportation (PLUST) installed:

```
RESOLUTION ORDER (alphabetical by product.xml):

1. plusg.xml     → PlusG extensions (HSE/O&G)
2. plusp.xml     → PlusP extensions (Service Provider)
3. pluss.xml     → PlusS extensions (Spatial)
4. plust.xml     → PlusT extensions (Transportation)

RESULTING CHAIN (last alphabetically = top of chain):

PlusTWOSet (Transportation)
  └── PlusSWOSet (Spatial)
       └── PlusPWOSet (Service Provider)
            └── PlusGWOSet (HSE/O&G)
                 └── WOSet (Core Maximo)
                      └── MboSet (Framework)

MAXOBJECT.CLASSNAME = psdi.plust.app.workorder.PlusTWOSet
```

**Critical behavior:** When `PlusTWOSet.save()` calls `super.save()`, it cascades through **every** layer:
```
PlusTWOSet.save()
  → PlusSWOSet.save()     (via super.save())
    → PlusPWOSet.save()   (via super.save())
      → PlusGWOSet.save() (via super.save())
        → WOSet.save()    (via super.save())
```

### 4.3 Example: Asset Chain

With core + ACM (PLUSA) + Calibration (PLUSC) + Linear (PLUSL) + Transportation (PLUST) + Spatial (PLUSS):

```
PlusTAssetSet (Transportation)
  └── PlusSAssetSet (Spatial)
       └── PlusLAssetSet (Linear)
            └── PlusCAssetSet (Calibration)
                 └── PlusAAssetSet (ACM)
                      └── AssetSet (Core)
                           └── MboSet (Framework)
```

### 4.4 Adding Custom Extensions

When you add your own custom extensions, the position in the chain depends on your product.xml filename and `<depends>` tags:

**If you name it `a_customer.xml`** (runs first alphabetically):
```
PlusTWOSet → PlusSWOSet → ... → CustomWOSet → WOSet
```
Your custom code is NEAR THE BOTTOM — it gets called LAST.

**If you name it `z_customer.xml`** (runs last alphabetically):
```
CustomWOSet → PlusTWOSet → PlusSWOSet → ... → WOSet
```
Your custom code is AT THE TOP — it gets called FIRST.

**Best Practice:** Name your product.xml `z_customer.xml` and use `<depends>` tags to ensure your code sits at the top of the chain. This way your `save()`, `add()`, and other overrides execute first, then cascade into IBM's product code.

---

## 5. Product.xml — The Extension Control File

### 5.1 Location

```
applications/maximo/properties/product/
├── plusg.xml          ← HSE/Oil & Gas
├── plusp.xml          ← Service Provider
├── pluss.xml          ← Spatial
├── plust.xml          ← Transportation
├── plusa.xml          ← ACM
├── plusc.xml          ← Calibration
├── plusd.xml          ← Utilities
├── plusl.xml          ← Linear
├── plusm.xml          ← Aviation
├── plusn.xml          ← Nuclear
├── plusv.xml          ← Civil Infrastructure
├── tloam.xml          ← Core EAM extensions
└── z_customer.xml     ← Customer customizations (should be last)
```

### 5.2 Product.xml Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<product xmlns="http://www.ibm.com/maximo/product.xml">
    <name>Maximo for Transportation</name>
    <version>
        <major>9</major>
        <minor>0</minor>
        <modlevel>0</modlevel>
        <patch>0</patch>
        <build>20240625</build>
    </version>

    <!-- Database variable tracking -->
    <dbmaxvarname>PLUST</dbmaxvarname>

    <!-- DBC script location -->
    <dbscripts>plust</dbscripts>
    <dbversion>V9000-100</dbversion>
    <lastdbversion>V9000-001</lastdbversion>

    <!-- Dependencies (controls execution order) -->
    <depends>plusp</depends>
    <depends>plusg</depends>

    <!-- Java class extensions -->
    <extensions>
        <!-- Asset MBO extension -->
        <mboset objectname="ASSET">
            psdi.plust.app.asset.PlusTAssetSet
        </mboset>
        <mbo objectname="ASSET">
            psdi.plust.app.asset.PlusTAsset
        </mbo>

        <!-- Asset Remote interfaces -->
        <class objectname="ASSET">
            psdi.plust.app.asset.PlusTAssetRemote
        </class>
        <class objectname="ASSET">
            psdi.plust.app.asset.PlusTAssetSetRemote
        </class>

        <!-- WorkOrder MBO extension -->
        <mboset objectname="WORKORDER">
            psdi.plust.app.workorder.PlusTWOSet
        </mboset>
        <mbo objectname="WORKORDER">
            psdi.plust.app.workorder.PlusTWO
        </mbo>

        <!-- Field validation extension -->
        <field objectname="ASSET" attributename="ITEMNUM">
            psdi.plust.app.asset.PlusTFldAssetItemnum
        </field>

        <!-- Bean class extensions (UI) -->
        <bean presentation="WOTRACK"
              controlid="wo_table"
              extends="psdi.webclient.beans.workorder.WOAppBean">
            psdi.plust.webclient.beans.workorder.PlusTWOAppBean
        </bean>
    </extensions>
</product>
```

### 5.3 Key XML Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `<dbmaxvarname>` | Name of the MAXVARS entry tracking DB version | `PLUST` |
| `<dbscripts>` | Directory under `tools/maximo/en/` for DBC scripts | `plust` |
| `<dbversion>` | Current version — scripts run up to this | `V9000-100` |
| `<lastdbversion>` | Starting version for this release | `V9000-001` |
| `<depends>` | Products that MUST run before this one | `plusp`, `plusg` |
| `<mboset>` | MBO Set class extension for an object | `psdi.plust.app.asset.PlusTAssetSet` |
| `<mbo>` | MBO class extension for an object | `psdi.plust.app.asset.PlusTAsset` |
| `<class>` | Remote interface extension | `psdi.plust.app.asset.PlusTAssetRemote` |
| `<field>` | Field validation class extension | `psdi.plust.app.asset.PlusTFldAssetItemnum` |
| `<bean>` | UI bean class extension | `psdi.plust.webclient.beans.workorder.PlusTWOAppBean` |

### 5.4 How updatedb Processes Extensions

1. **Reads all XML files** in `properties/product/` in alphabetical order
2. **Checks `<depends>` tags** and reorders if needed
3. **Runs DBC scripts** for each product (database schema changes)
4. **Updates MAXOBJECT.CLASSNAME** to point to the topmost MBO Set class
5. **Performs bytecode injection** — modifies `.class` files to rewire `extends` clauses
6. **Runs RMIC** on all class files specified in `<mboset>` and `<mbo>` tags
7. **Updates presentations** for `<bean>` tag UI extensions

---

## 6. Extension Chain Resolution & Bytecode Injection

### 6.1 What Bytecode Injection Actually Does

When you write Java code, your class file says:
```java
public class PlusTAsset extends Asset { ... }
```

But after `updatedb` processes all product.xml files, the compiled `.class` file is **modified at the bytecode level** so that:
```java
// Original source:
public class PlusTAsset extends Asset { ... }

// After bytecode injection (if Spatial is also installed):
// PlusTAsset now extends PlusSAsset (not Asset directly)
// PlusSAsset extends Asset
```

This means **you never modify source code** — the inheritance chain is assembled at build time by the `updatedb` process.

### 6.2 Common Problems

**Problem 1: Circular Extension Loops**

If product.xml tags are misconfigured (e.g., using `<class>` tag instead of `<mbo>` tag), you can get infinite loops:

```
YYYWOSet → PlusSWOSet → PlusGWOSet → TloamWOSet → PlusPWOSet → XXXWOSet → TloamWOSet (LOOP!)
```

This causes Maximo to crash when opening the application and Eclipse to crash when decompiling the file.

**Fix:** Ensure you use the correct XML tags — `<mbo>` for MBO classes, `<mboset>` for MBO Set classes, `<class>` only for interfaces.

**Problem 2: Lost Customizations After Add-On Install**

If a customer installs a new add-on (e.g., HSE) and their custom product.xml doesn't have proper `<depends>` tags, their customizations may end up **below** the new add-on in the chain instead of above it.

**Fix:** Always use `<depends>` tags listing all IBM products, and name your file `z_customer.xml`.

**Problem 3: Incomplete Product.xml**

Many customer environments have product.xml files that only cover 20-30% of their actual custom classes. The rest rely on direct MAXOBJECT.CLASSNAME manipulation, which breaks during upgrades.

**Fix:** Audit all custom Java classes and ensure every one is declared in product.xml.

### 6.3 Viewing the Current Extension Chain

To see the actual chain for any object, check `MAXOBJECT.CLASSNAME` in the Database Configuration application. The registered class is the top of the chain. To see the full chain, decompile the class file and follow the `extends` clause through each parent.

In MAS 9, you can access the class files via:
```bash
oc exec -it <manage-pod-name> -n <namespace> -- bash
# Navigate to businessobjects
cd /opt/IBM/SMP/maximo/applications/maximo/businessobjects/classes
# Find class files for a specific extension
find . -name "PlusT*.class" -type f
```

---

## 7. Database Objects by Extension (MAXOBJECT Counts)

Data from a MAS 9.0 environment with Aviation + Complex Assets installed (which pulls in ACM, SP, HSE, Transportation):

| Extension Prefix | Product | Approximate MAXOBJECT Count |
|---|---|---|
| **Core (no prefix)** | Maximo base | ~800+ objects |
| **TLOAM** | Core EAM extensions | ~50 objects |
| **PLUSA** | Asset Configuration Manager (ACM) | **293 objects** |
| **PLUSG** | Health, Safety & Environment (HSE) | **263 objects** |
| **PLUST** | Transportation | **139 objects** |
| **PLUSP** | Service Provider | **131 objects** |
| **PLUSM** | Aviation | **104 objects** |
| **PLUSC** | Calibration | ~40 objects |
| **PLUSL** | Linear | ~30 objects |
| **PLUSS** | Spatial | ~60 objects |
| **PLUSD** | Utilities | ~80 objects |
| **PLUSV** | Civil Infrastructure | ~50 objects |
| **PLUSN** | Nuclear | ~30 objects |

**Note:** ACM has the most objects (293) because it provides the foundation for complex asset configuration tracking — serial numbers, build positions, configuration baselines, and full lifecycle tracking. Aviation (PLUSM) is relatively smaller because it leverages ACM (PLUSA), Service Provider (PLUSP), and Transportation (PLUST) underneath.

---

## 8. Add-On & Industry Solution Technical Relationships

### 8.1 Product Dependency Map

```
CORE MAXIMO (psdi.app.*)
│
├── TLOAM (psdi.tloam.*)
│   └── Core EAM extensions (always present)
│
├── INCLUDED CAPABILITIES (no extra AppPoints)
│   ├── PLUSC — Calibration
│   ├── PLUSL — Linear
│   ├── Scheduler (8 graphical apps)
│   ├── Maximo Mobile
│   └── Reliability Strategies (cloud-based library)
│
├── ADD-ONS (separate AppPoints)
│   ├── PLUSS — Spatial (requires install AppPoints per environment)
│   ├── PLUSP — Service Provider
│   ├── PLUSG — HSE (also serves Oil & Gas)
│   ├── PLUSA — ACM (Asset Configuration Manager)
│   ├── PLUSI — Maximo IT (separate licensing entirely)
│   └── Optimizer (used with Scheduler, Health, AIP)
│
└── INDUSTRY SOLUTIONS (Premium tier)
    ├── PLUST — Transportation
    │   └── Extends: core + may use Linear, Spatial
    ├── PLUSD — Utilities
    │   └── Extends: core + typically uses Linear, Spatial
    ├── PLUSG — Oil & Gas (shares prefix with HSE)
    │   └── Extends: core + HSE is integral
    ├── PLUSN — Nuclear
    │   └── Extends: core + may use HSE elements
    ├── PLUSM — Aviation
    │   └── DEPENDS ON: PLUSA (ACM ~90%), PLUSP (SP 100%),
    │       PLUST (Transport ~10%), PLUSG (HSE ~10%)
    │   └── Complex Assets accelerator adds further
    └── PLUSV — Civil Infrastructure
        └── Extends: core + assessment-focused
```

### 8.2 Aviation — The Most Complex Extension

Aviation is unique because it composes functionality from multiple other products:

| Component | Estimated % Included | What It Provides |
|---|---|---|
| **PLUSA (ACM)** | ~90% | Configuration tracking, build positions, serial number management |
| **PLUSP (Service Provider)** | ~100% | Customer management, warranty, billing |
| **Scheduler** | ~110% | Full scheduler + aviation-specific extensions |
| **PLUST (Transportation)** | ~10% | Fleet/vehicle concepts adapted for aircraft |
| **PLUSG (HSE)** | ~10% | Safety management concepts |
| **PLUSM (Aviation-specific)** | 100% | Flight logs, airworthiness, task cards, MEL |

This is why Aviation has strict **compatibility restrictions** — it already includes most of the other products.

### 8.3 How Industry Solutions Extend Core Objects

**Work Order (WORKORDER) Extensions by Product:**

| Product | What It Adds to Work Orders |
|---|---|
| **PLUST (Transport)** | Vehicle association, fleet-specific fields, mechanic's clipboard integration |
| **PLUSD (Utilities)** | Crew management fields, compatible unit estimates, design spec references |
| **PLUSG (HSE/O&G)** | Permit-to-work linkage, isolation certificate references, safety requirements |
| **PLUSM (Aviation)** | Task card references, MEL items, flight log associations, airworthiness directives |
| **PLUSN (Nuclear)** | Radiation work permit linkage, nuclear safety classifications |
| **PLUSP (Service Provider)** | Customer references, warranty claim fields, billing codes |
| **PLUSA (ACM)** | Configuration item references, effectivity tracking |
| **PLUSS (Spatial)** | Geographic coordinates, map layer references |
| **PLUSC (Calibration)** | Calibration data sheet references, tolerance tracking |
| **PLUSL (Linear)** | Start/end measure fields, reference point linkage, linear segment tracking |

### 8.4 PLUSG Deep Dive — How HSE and Oil & Gas Share One Extension Prefix

This is one of the most confusing aspects of Maximo's extension architecture. **HSE (Health, Safety & Environment Manager) and Oil & Gas are NOT separate products technically — they share the same PLUSG prefix, the same Java packages, the same database objects, and the same product.xml.** The differentiation happens at the **functional/application level**, not the code level.

#### The History — Why They Share PLUSG

Oil & Gas was one of Maximo's original industry solutions. HSE was developed *as part of* the Oil & Gas solution — it provided the safety management functions that oil & gas operations required (permits to work, isolation certificates, incident management). Over time, IBM recognized that HSE functionality was valuable *beyond* oil & gas (utilities, manufacturing, mining, etc.), so they began marketing HSE as a standalone add-on. But they never refactored the code into a separate PLUSG-HSE prefix — the Java packages, database tables, and objects remained unified under PLUSG.

#### How They Are Deployed in MAS 9

In MAS 9, HSE and Oil & Gas are **separate deployment components** even though they share the PLUSG codebase:

```bash
# Deploy HSE only (without Oil & Gas industry-specific applications)
mas install --manage-components 'base=latest,hse=latest'

# Deploy Oil & Gas (includes HSE automatically)
mas install --manage-components 'base=latest,oilandgas=latest'

# Both are available as separate selections in the MAS Manage activation UI
```

From the IBM activation configuration JSON:
```json
"hse": {
    "description": "Maximo HSE"
},
"oilandgas": {
    "description": "Maximo Oil and Gas"
}
```

#### What's Shared vs. What's Different

**Shared PLUSG Infrastructure (263 MAXOBJECTS — all PLUSG-prefixed):**

All 263 PLUSG database objects are installed regardless of whether you activate HSE or Oil & Gas. The tables, MBO classes, and extensions are identical. The key shared objects include:

| PLUSG Object | Application | Description |
|---|---|---|
| `PLUSGPERMITWORK` | Permit to Work | Core permit management — links to work orders, assets, locations |
| `PLUSGISOCERT` | Isolation Certificates | Lockout/tagout and energy isolation tracking |
| `PLUSGINCIDENT` | Incidents | Incident reporting, investigation, corrective actions |
| `PLUSGHAZARD` | Hazards | Hazard identification and risk assessment |
| `PLUSGSHIFTLOG` | Shift/Operator Logs | Shift handover, operator rounds, log entries |
| `PLUSGSHFTLOGENTRY` | Shift Log Entries | Individual entries within operator logs |
| `PLUSGOPERACTION` | Operator Actions | Operational actions tracked against logs |
| `PLUSGRELATEDREC` | Related Records | Cross-references between HSE records |
| `PLUSGINCPERSON` | Incident People | People involved in incidents |
| `PLUSGPERTYPE` | Permit Types | Configuration of permit-to-work types |
| `PLUSGMOC` | Management of Change | MOC requests and change management |
| `PLUSGAUDIT` | Audits/Surveys | Safety audits and survey management |
| `PLUSGREGULATION` | Regulations | Regulatory compliance tracking |
| `PLUSGBYPASS` | Bypass Control | Safety system bypass management |

**What Differentiates Oil & Gas from HSE-Only:**

| Capability | HSE Add-On | Oil & Gas Industry Solution |
|---|---|---|
| **Permit to Work** | ✅ Full PTW management | ✅ Full PTW + O&G-specific permit types |
| **Isolation Certificates** | ✅ Full LOTO/isolation | ✅ Full isolation + O&G valve/pipeline isolation |
| **Incident Management** | ✅ Full incident tracking | ✅ Full incident + O&G-specific classifications |
| **Shift/Operator Logs** | ✅ Full operator log management | ✅ Full logs + production loss reporting |
| **Hazard & Risk Assessment** | ✅ Full hazard/risk | ✅ Full hazard/risk + process safety |
| **Management of Change (MOC)** | ✅ Full MOC workflow | ✅ Full MOC + O&G regulatory MOC |
| **Bypass Control** | ✅ Safety system bypass tracking | ✅ Bypass + process safety instrumented systems |
| **Audits & Surveys** | ✅ Safety audits | ✅ Safety + environmental audits |
| **Regulations** | ✅ General regulatory tracking | ✅ O&G-specific regulations (OSHA PSM, EPA RMP, COMAH, SEVESO) |
| **Self-Service: Requests** | ❌ | ✅ "Requests" (O&G-specific service request variant) |
| **Self-Service: Create/Review Incidents** | ✅ | ✅ |
| **ATEX/EX Standards** | ✅ Associate with assets | ✅ + O&G-specific explosive atmosphere management |
| **Production Loss** | ❌ Basic | ✅ Full production loss tracking and reporting |
| **Asset: Reliability/Availability** | ✅ Target fields on assets | ✅ + O&G reliability engineering patterns |
| **O&G Shared Options (Organizations)** | ✅ Basic HSE options | ✅ Full "Oil and Gas/HSE Manager Shared Options" in Organizations app |

**The practical difference:** Oil & Gas includes everything HSE has, plus additional industry-specific configurations, security groups, default domains, and self-service applications tailored to petroleum/refining/upstream/downstream operations. HSE is the "cross-industry" subset.

#### Java Class Perspective — No Distinction

At the Java class level, there is **zero** distinction between HSE and Oil & Gas:

```java
// These classes exist whether you deploy HSE or Oil & Gas — same package, same code
psdi.plusg.app.permitwork.PlusGPermitWork          // Permit to Work MBO
psdi.plusg.app.permitwork.PlusGPermitWorkSet        // Permit to Work MBO Set
psdi.plusg.app.isocert.PlusGIsoCert                 // Isolation Certificate MBO
psdi.plusg.app.incident.PlusGIncident               // Incident MBO
psdi.plusg.app.shiftlog.PlusGShiftLog               // Shift Log MBO
psdi.plusg.app.hazard.PlusGHazard                   // Hazard MBO
psdi.plusg.app.moc.PlusGMOC                         // Management of Change MBO
psdi.plusg.app.workorder.PlusGWO                     // Work Order extension
psdi.plusg.app.workorder.PlusGWOSet                  // Work Order Set extension
psdi.plusg.app.asset.PlusGAsset                      // Asset extension
psdi.plusg.app.asset.PlusGAssetSet                   // Asset Set extension
```

The extension chain is identical:
```
PlusGWOSet → WOSet → MboSet    (same whether HSE or O&G is activated)
PlusGAssetSet → AssetSet → MboSet
```

#### How Differentiation Actually Works — Security Groups & Application Visibility

The real differentiation between HSE and Oil & Gas happens through:

1. **Application visibility** — Oil & Gas activates additional Maximo applications that HSE-only doesn't expose. These are controlled by security group assignments, not by different Java code.

2. **Organization-level options** — The "Oil and Gas/HSE Manager Shared Options" in the Organizations application has configuration flags that enable/disable O&G-specific behaviors. HSE-only deployments use a subset of these options.

3. **Default data/domains** — Oil & Gas installs additional domain values, classification structures, and default configurations specific to petroleum operations. HSE installs a cross-industry subset.

4. **Security group templates** — Different pre-configured security groups control which applications and modules users can access:
   - HSE-only: Groups grant access to HSE-specific applications only
   - Oil & Gas: Groups grant access to HSE + O&G-specific applications

5. **Self-service applications** — Oil & Gas provides "Requests" (an O&G variant of service requests) as a self-service app. HSE provides "Create/Review Incidents" as its self-service app.

#### What This Means for Your Upgrade

| Scenario | Recommendation |
|---|---|
| **Currently using Oil & Gas 7.6** | Deploy `oilandgas` component in MAS 9 — gets you HSE + O&G |
| **Want HSE only (no O&G)** | Deploy `hse` component — same PLUSG objects, fewer O&G-specific apps visible |
| **Want to add HSE to existing non-O&G system** | Deploy `hse` component — all 263 PLUSG objects install, but O&G-specific apps stay hidden |
| **Custom code extending PLUSG objects** | Works identically regardless of HSE vs O&G deployment — same classes |
| **Performance tuning** | Same tuning applies to both — archive Permit to Work, Isolation Certificate, Operator Log records (see IBM MAS Performance Wiki) |

#### Key Performance Tables (from IBM Internal Benchmarks)

These PLUSG tables are the ones that grow fastest and need the most attention:

| Table | Description | Performance Impact |
|---|---|---|
| `PLUSGPERMITWORK` | Permit to work records | High — index on `ptwclass`, `status`, `siteid` |
| `PLUSGSHFTLOGENTRY` | Shift log entries | High — grows rapidly, index on `recordkey`, `createdate` |
| `PLUSGSHIFTLOG` | Shift logs | Medium — index on `shiftnum`, `startdate` |
| `PLUSGRELATEDREC` | Related record cross-references | Medium — index on both `recordkey` and `relatedreckey` |
| `PLUSGINCPERSON` | People linked to incidents | Medium — index on `ticketid` |
| `PLUSGOPERACTION` | Operator actions | Medium — index on `recordid`, `class` |

**IBM's #1 recommendation:** Archive or clean historical records of Permit to Work, Isolation Certificate, Work Order, and Operator Log/LogEntry regularly.

#### Compatibility Notes for PLUSG

PLUSG (whether deployed as HSE or Oil & Gas) is compatible with:
- ✅ Civil Infrastructure, Linear, Nuclear, Spatial, Service Provider, Transportation, Utilities
- ✅ Maximo IT (as of MAS 9.1)
- ❌ Aviation (Aviation includes ~10% of HSE internally, causes conflicts)
- ❌ ACM (ACM conflicts with PLUSG's asset extensions)

### 8.5 All Extension Crossovers — Complete Map

The PLUSG HSE/Oil & Gas shared prefix is NOT the only crossover in Maximo. There are **four distinct types** of extension crossovers that every technical team must understand.

#### Crossover Type 1: Same Prefix, Multiple Products — PLUSG (HSE + Oil & Gas)

Already documented in Section 8.4 above. Same PLUSG Java packages, same 263 MAXOBJECTS, differentiated by application visibility and organization-level options.

#### Crossover Type 2: Composite Product Consuming Multiple Prefixes — Aviation (PLUSM)

Aviation is the **biggest crossover** in all of Maximo. When you deploy the `aviation` component, it does NOT just install PLUSM objects — it installs objects from **five different PLUS prefixes**:

| Prefix Installed | Product | % Included in Aviation | Object Count |
|---|---|---|---|
| **PLUSA** | Asset Configuration Manager (ACM) | ~90% | **293 objects** |
| **PLUSG** | Health, Safety & Environment (HSE) | ~10% | **263 objects** |
| **PLUSP** | Service Provider | 100% | **131 objects** |
| **PLUST** | Transportation | ~10% | **139 objects** |
| **PLUSM** | Aviation-specific functionality | 100% | **104 objects** |
| | **Total objects installed with Aviation** | | **~930 objects** |

**Technical implications:**

1. **The inheritance chain explodes.** A single WorkOrder MBO can have extensions from PLUSA, PLUSG, PLUSM, PLUSP, and PLUST all chained together:
```
PlusTWOSet → PlusPWOSet → PlusMWOSet → PlusGWOSet → PlusAWOSet → WOSet → MboSet
```

2. **This is why Aviation is incompatible with most other products.** Installing ACM, Service Provider, or HSE separately would attempt to create duplicate PLUSA/PLUSP/PLUSG objects that Aviation has already installed — causing schema conflicts and duplicate extension chain entries.

3. **Only ACM and Transportation are compatible** with Aviation because Aviation already fully includes their objects. Adding them as standalone components doesn't create conflicts since the objects are identical.

4. **Complex Assets accelerator** layers on top of Aviation as a customization archive. It renames aviation-specific terminology to generic terms:

| Aviation Term | Complex Assets Term |
|---|---|
| Aircraft | Vehicles |
| Equipment | Assets |
| Master Task Card | Master PM (CM) |
| Task Card | PM (CM) |
| Job Card | Job Plan (CM) |
| Part Number | Item |

The underlying PLUS code is identical — Complex Assets is functionally Aviation with renamed labels. The accelerator is deployed as a customization archive, not a separate PLUS extension.

**Implications for upgrade teams:**
- If you're considering Aviation or Complex Assets, understand that you're getting 930+ objects across 5 extension families
- You CANNOT later add standalone HSE, Spatial, or Service Provider — they conflict
- Any custom code extending PLUSA, PLUSG, PLUSP, or PLUST objects will be affected by Aviation's extension chains
- The Build Data Interpreter (BDI) — ACM's multi-threaded Java validation service — is automatically included and must be configured

#### Crossover Type 3: Prefix Reuse Across Eras — PLUSV (Civil Infrastructure + Primavera Adapter)

The PLUSV prefix was used for **two completely different products** at different times in Maximo's history:

| Era | PLUSV Used By | Purpose |
|---|---|---|
| **Legacy (Maximo 7.x)** | Primavera Adapter | Integration with Oracle Primavera P6 project scheduling |
| **Current (MAS 8.x/9.x)** | Civil Infrastructure | Road, bridge, and infrastructure condition assessment |

These are **completely different products** that happened to receive the same prefix at different points in the product lifecycle. This is NOT a shared-codebase situation like PLUSG — it is a prefix reuse collision.

**Technical implications for upgrades:**
- If upgrading from 7.6 where the Primavera Adapter was installed, your database contains PLUSV objects from Primavera
- MAS 9's Civil Infrastructure also uses PLUSV for its objects
- The object names and schemas are different between the two products
- During upgrade, any legacy Primavera PLUSV objects must be identified and cleaned up before activating Civil Infrastructure
- If you used Primavera integration and also want Civil Infrastructure, consult IBM Support for the migration path

**How to identify which PLUSV you have:**
```sql
-- Check MAXOBJECT for PLUSV-prefixed objects
SELECT OBJECTNAME, DESCRIPTION, CLASSNAME
FROM MAXOBJECT
WHERE OBJECTNAME LIKE 'PLUSV%'
ORDER BY OBJECTNAME;

-- If you see objects related to "project", "schedule", "activity" → Primavera Adapter
-- If you see objects related to "inspection", "condition", "assessment" → Civil Infrastructure
```

#### Crossover Type 4: Non-Standard Prefix Pattern — Nuclear

Nuclear is the anomaly in the PLUS family. In older IBM documentation and reference lists, Nuclear appears with just **"PLUS"** (no trailing letter) rather than a proper "PLUSN" designation:

| Reference Source | Prefix Listed for Nuclear |
|---|---|
| IBM Support doc swg21650645 | `PLUS` (no letter) |
| MaximoTechnoFunctional blog | `PLUS` (no letter) |
| MAS 9 deployment component | `nuclear` |
| MAS Manage activation JSON | `"nuclear": { ... }` |

**How Nuclear differs from the standard PLUS pattern:**

1. **Cloned applications instead of pure extensions.** Nuclear created 13 cloned copies of core Maximo applications with a `(Nuc)` suffix, rather than purely extending them:

| Cloned Application | Original Application |
|---|---|
| Organizations (Nuc) | Organizations |
| Assets (Nuc) | Assets |
| Locations (Nuc) | Locations |
| Item Master (Nuc) | Item Master |
| Work Order Tracking (Nuc) | Work Order Tracking |
| Purchase Requisitions (Nuc) | Purchase Requisitions |
| Purchase Orders (Nuc) | Purchase Orders |
| Job Plans (Nuc) | Job Plans |
| Preventive Maintenance (Nuc) | Preventive Maintenance |
| Routes (Nuc) | Routes |
| Service Requests (Nuc) | Service Requests |
| Quick Locations (Nuc) | *(new — simplified location creation)* |
| Quick Assets (Nuc) | *(new — simplified asset creation)* |

2. **Nuclear-specific unique applications** (not clones):

| Application | Purpose |
|---|---|
| **Clearances** | Lockout/tagout with tag sharing, conflict checking across multiple clearances — far more sophisticated than HSE's Permit to Work |
| **Lineups** | Plant component position tracking — captures valve/switch positions for operational configurations |
| **Surveillance Testing** | Regulatory-frequency scheduling and tracking — ties to Tech Specs and Plant Modes framework |
| **Condition Reports** | Non-conformance management — with workflow, corrective action control, and trending |
| **Configuration Change Designer** | Engineering change control for regulated facilities — identifies attributes under configuration control |
| **Changes (Nuc)** | Engineering changes requiring approval — a class of work order with release/revision lifecycle |
| **Releases (Nuc)** | Groups changes for execution during outages/shutdowns |
| **Tech Specs** | Regulatory Technical Specifications — LCO tracking, applicability, surveillance requirements |
| **Commitment Tracking** | Regulatory commitment management |

3. **The clone approach creates upgrade complexity.** Because Nuclear duplicated core applications rather than purely extending them, nuclear customizations are harder to inventory — you need to check both the `(Nuc)` clone and any extensions to the clones.

4. **Nuclear's clearances vs. HSE's permits to work.** These solve similar problems (safe work execution) but are completely independent implementations with different data models:

| Feature | HSE Permit to Work (PLUSG) | Nuclear Clearances |
|---|---|---|
| Database object | `PLUSGPERMITWORK` | Separate clearance objects |
| Tag management | Basic | Advanced — tag sharing, conflict checking across clearances |
| Integration | Links to work orders | Full integration with WOs, PMs, and Lineups |
| Regulatory basis | General safety (ISO 45001) | NRC nuclear regulations (10 CFR) |
| Complexity | Medium | Very high — multi-clearance conflict resolution |

#### Crossover Type 5: Shared Functional Concepts Across Independent Implementations

Beyond code-level crossovers, several products implement the **same business concept** independently — using different database objects, different Java classes, and different UI but solving similar problems:

| Business Concept | Products That Implement It | Technical Difference |
|---|---|---|
| **Crew Management** | PLUSD (Utilities — Organizations T&D with CU-specific crew options), Core Manage (Scheduler — basic Crew Types/Crews) | Utilities extends Organizations app with T&D options controlling CU labor factors; Core has standalone Crew Type/Crew apps |
| **Permits / Safe Work** | PLUSG (HSE — Permit to Work), Nuclear (Clearances) | Completely different implementations — different DB objects, different workflows, different complexity levels |
| **Configuration Management** | PLUSA (ACM — BDI-driven complex asset config tracking), Nuclear (Config Change Designer — engineering change control) | ACM manages as-maintained physical builds vs. as-designed; Nuclear manages engineering approval of changes to regulated facilities |
| **Customer/Billing** | PLUSP (Service Provider), PLUSM (Aviation — inherits 100% of SP) | Same PLUSP code — Aviation includes all of Service Provider's customer billing |
| **Fleet Management** | PLUST (Transportation — fleet of vehicles/buses/trains), PLUSM (Aviation — inherits ~10% fleet concepts for aircraft) | Aviation borrows fleet concepts but applies aviation terminology and adds airworthiness |
| **Qualification Tracking** | Nuclear (enhanced vendor quals + labor certs), PLUSD (Utilities — labor skill certs), Core (basic Qualifications app) | Each adds industry-specific qualification requirements; Nuclear adds "qualified vendors" for safety-critical procurement |
| **Regulatory Compliance** | PLUSG (HSE — regulations, audits), PLUSD (Utilities — NERC/CIP tracking), Nuclear (Tech Specs, NRC commitments), PLUSV (Civil Infra — infrastructure regulations) | Each implements regulation tracking for their industry's specific regulatory bodies |

#### Complete Crossover Summary Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│              MAXIMO EXTENSION CROSSOVER MAP                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  TYPE 1: SHARED CODEBASE (Same prefix → multiple products)        │
│  ┌─────────────────────────────────────────────────┐               │
│  │  PLUSG ═══ HSE (add-on)                         │               │
│  │        ═══ Oil & Gas (industry solution)         │               │
│  │  263 objects, same Java, different app visibility │               │
│  └─────────────────────────────────────────────────┘               │
│                                                                    │
│  TYPE 2: COMPOSITE PRODUCT (One product → multiple prefixes)      │
│  ┌─────────────────────────────────────────────────┐               │
│  │  AVIATION (PLUSM) installs:                     │               │
│  │    ├── PLUSA (ACM) ──── 293 objects (~90%)      │               │
│  │    ├── PLUSG (HSE) ──── 263 objects (~10%)       │               │
│  │    ├── PLUSP (SP) ───── 131 objects (100%)       │               │
│  │    ├── PLUST (Trans) ── 139 objects (~10%)       │               │
│  │    └── PLUSM (Aviation)─ 104 objects (100%)      │               │
│  │                         ═══════════════          │               │
│  │                         ~930 total objects       │               │
│  │                                                  │               │
│  │  Complex Assets = Aviation + renamed labels      │               │
│  └─────────────────────────────────────────────────┘               │
│                                                                    │
│  TYPE 3: PREFIX REUSE (Same prefix → different eras)              │
│  ┌─────────────────────────────────────────────────┐               │
│  │  PLUSV (legacy) ═══ Primavera Adapter            │               │
│  │  PLUSV (MAS 9)  ═══ Civil Infrastructure         │               │
│  │  Different products, upgrade collision risk       │               │
│  └─────────────────────────────────────────────────┘               │
│                                                                    │
│  TYPE 4: NON-STANDARD PREFIX (Anomalous pattern)                  │
│  ┌─────────────────────────────────────────────────┐               │
│  │  Nuclear ═══ "PLUS" (no letter)                  │               │
│  │  Uses cloned apps with (Nuc) suffix              │               │
│  │  13 cloned + 9 unique nuclear apps               │               │
│  │  Doesn't follow psdi.plusX.app.* convention      │               │
│  └─────────────────────────────────────────────────┘               │
│                                                                    │
│  TYPE 5: SAME CONCEPT, INDEPENDENT IMPLEMENTATIONS                │
│  ┌─────────────────────────────────────────────────┐               │
│  │  Permits:  PLUSG (PTW) ≠ Nuclear (Clearances)   │               │
│  │  Config:   PLUSA (ACM) ≠ Nuclear (Config Change)│               │
│  │  Crews:    PLUSD (Utilities) ≠ Core (Scheduler)  │               │
│  │  Quals:    Nuclear ≠ Utilities ≠ Core            │               │
│  │  Regs:     PLUSG ≠ PLUSD ≠ Nuclear ≠ PLUSV       │               │
│  │  Same business problem, different code           │               │
│  └─────────────────────────────────────────────────┘               │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 9. Compatibility Matrix — What Can Run Together

### 9.1 MAS 9 Manage Component Compatibility

Not all add-ons and industry solutions can coexist. This is the current compatibility matrix:

| | ACM | Aviation | Civil Infra | HSE | Linear | Nuclear | Oil&Gas | Spatial | Service Provider | Transportation | Utilities | Maximo IT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **ACM** | — | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Aviation** | ✅ | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Civil Infra** | ❌ | ❌ | — | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **HSE** | ❌ | ❌ | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅* |
| **Spatial** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | ❌ |
| **Service Provider** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ❌ |
| **Transportation** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅* |
| **Utilities** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ❌ |

*✅ = Compatible, ❌ = Not Allowed, ✅* = Compatible as of MAS 9.1*

**Key restriction:** Aviation is only compatible with ACM and Transportation. This is because Aviation already includes ~90% of ACM and 100% of Service Provider internally.

**Always check the latest compatibility matrix:** https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=requirements-maximo-manage

### 9.2 Why Some Products Are Incompatible

Incompatibility usually occurs because:

1. **Overlapping MBO extensions** — Two products extend the same object in ways that conflict
2. **Conflicting database schema** — Two products add columns with the same name to the same table
3. **Shared object ownership** — One product assumes exclusive control of objects that another also modifies
4. **UI conflicts** — Two products modify the same application presentations in conflicting ways
5. **Included functionality overlap** — Aviation already includes SP, so having SP separately would create duplicate extension chains

---

## 10. MAS 9 Deployment — Components & Activation

### 10.1 How Add-Ons Are Deployed in MAS 9

In MAS 9, add-ons are selected during **Manage activation**, not installed separately:

```
MAS Suite Administration → Manage → Activate → Components Section
```

You select which components (industry solutions + add-ons) to include. The MAS Manage operator then:

1. Generates the admin image with selected components
2. Builds server bundle images (Liberty servers) with the correct class hierarchy
3. Runs `updatedb` / `maxinst` to process product.xml files and DBC scripts
4. Starts Liberty servers with the built images
5. Makes routes available for user connections

### 10.2 Manage Components Parameter

Via the MAS CLI, components are specified as:

```bash
mas install --manage-components 'base=latest,health=latest,spatial=latest,transportation=latest'
```

Available component names:
- `base` — Core Manage
- `health` — Maximo Health (as Manage add-on in 9.1)
- `acm` — Asset Configuration Manager
- `aviation` — Aviation
- `civil` — Civil Infrastructure
- `hse` — HSE
- `nuclear` — Nuclear
- `oilandgas` — Oil & Gas
- `serviceprovider` — Service Provider
- `spatial` — Spatial
- `transportation` — Transportation
- `utilities` — Utilities

### 10.3 Server Bundle Architecture

MAS 9 uses **server bundles** to isolate workloads:

| Bundle Type | Purpose | Runs |
|---|---|---|
| `all` | Combined workload (dev/small environments) | UI + MEA + Cron + Report |
| `ui` | User interface workload | Browser-facing applications |
| `mea` | Integration workload (MIF/MEA) | Inbound/outbound integrations |
| `cron` | Background task workload | Cron tasks, escalations |
| `report` | Reporting workload | BIRT/Cognos report generation |

Each server bundle gets its own pod(s) with independent scaling. The Java extensions (PLUS classes) are included in ALL bundles since they contain business logic that may be needed by any workload.

---

## 11. Custom Extensions in MAS 9 — Customization Archive

### 11.1 How Custom Java Deploys in MAS 9

In Maximo 7.6, you dropped custom Java into the SMP folder. In MAS 9, there is no SMP folder — everything is containerized.

**The Customization Archive** is a ZIP/JAR file containing:
- Custom Java class files
- Custom product.xml
- Custom DBC scripts
- Custom application XML definitions
- Custom JSPs (if any survive)

**Deployment process:**
1. Build your customization archive
2. Upload to a URL accessible from the OpenShift cluster
3. Reference the URL during Manage activation:
   ```
   --manage-customization-archive-name "my_customizations"
   --manage-customization-archive-url "https://storage.example.com/my_customizations.zip"
   ```
4. The operator layers the archive over the base Manage image
5. `updatedb` processes your product.xml along with IBM's product.xml files
6. Your extensions are wired into the inheritance chain

### 11.2 Development Environment (masmanagedev-cli)

IBM provides the `masmanagedev-cli` tool for developing custom extensions:

```bash
# Create a new add-on product
masmanagedev-cli create product

# Initialize Java support
masmanagedev-cli init java

# Build the customization archive
gradle build
```

Key considerations:
- MAS 9.0 uses **Java 11** for compilation
- MAS 9.1 (June 2025+) requires **Java 17** for compilation
- The tool creates the correct product.xml structure
- Gradle handles building the archive

### 11.3 IBM's Strategic Direction

IBM's recommendation is clear: **convert custom Java MBOs to Automation Scripts wherever possible.**

| Approach | IBM Recommendation | When Acceptable |
|---|---|---|
| Automation Scripts (Jython/JS) | **PREFERRED** — primary customization mechanism | Always — use for most business logic |
| Custom Java MBOs | **DISCOURAGED** — anti-pattern for cloud-native | Only when automation scripts genuinely cannot handle the requirement |
| Database triggers | **PROHIBITED** — will not work in managed/SaaS deployments | Never |
| Direct SQL | **PROHIBITED** — sealed database in managed deployments | Never in managed; avoid in self-managed |
| MIF Exit classes | **TOLERATED** — still supported but consider REST API alternatives | When integration requires MIF-specific processing |

---

## 12. Java 17 Impact on Extensions

### 12.1 What Changed in MAS 9.1

MAS 9.1 (June 2025) moved from Java 11 to **Java 17**. This affects ALL custom Java extensions:

| Change | Impact |
|---|---|
| **`javax.*` → `jakarta.*` namespace** | Any code using Java EE APIs directly must update imports |
| **JPMS module restrictions** | Reflective access that worked silently in Java 8/11 will be blocked |
| **Removed deprecated APIs** | `ClassNotFoundException` or `NoSuchMethodException` at runtime |
| **Tightened security defaults** | JDBC/SSL handshakes may fail with older driver configurations |
| **OpenJDK Nashorn** | JavaScript engine changed — may affect JS automation scripts |
| **BIRT v4.16** | Reporting engine updated — custom BIRT reports may need adjustment |

### 12.2 Migration Steps for Custom Java

1. **Inventory all custom Java classes** in your environment
2. **Set up a Java 17 compilation environment**
3. **Attempt compilation** — fix all errors
4. **Update namespace references** (`javax.*` → `jakarta.*` where needed)
5. **Remove deprecated API usage** — find modern equivalents
6. **Test under load** — some issues only surface with concurrent access
7. **Repackage into customization archive** compiled against Java 17
8. **Test in MAS 9.1 sandbox** before production

### 12.3 PLUS Extension Java 17 Compatibility

IBM has already updated all PLUS extension code for Java 17 compatibility. Your concern is only with:
- Custom Java MBO classes
- Custom MIF exit classes
- Custom field validation classes
- Custom bean classes
- Any third-party Java libraries bundled with your customizations

---

## 13. References & Resources

### IBM Official Documentation
- Extending Maximo using Java Classes - Product XML: https://www.ibm.com/support/pages/extending-maximo-using-java-classes-product-xml-and-extension-settings
- Maximo Manage Add-ons and Industry Solutions: https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=overview-maximo-manage-add-ons-industry-solutions
- Deployment of Industry Solutions and Add-ons: https://www.ibm.com/docs/en/masv-and-l/cd?topic=deploy-deployment-industry-solutions-add-ons
- Deploying and Activating Maximo Manage: https://www.ibm.com/docs/en/masv-and-l/maximo-manage/8.3.0?topic=suite-deploying-activating-manage
- MAS Manage Compatibility Matrix: https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=requirements-maximo-manage
- MAS CLI Install Guide: https://ibm-mas.github.io/cli/guides/install/
- MAS Cluster Extensions (CRDs): https://ibm-mas.github.io/cli/reference/cluster-extensions/
- MAF Configuration Practices: https://ibm-maximo-dev.github.io/configuration-practices-documentation/overview/
- How to Prevent Lost Customizations: https://www.ibm.com/support/pages/how-prevent-lost-customizations-when-add-products-are-installed

### Community & Expert Resources
- Manipulating Chain of Java Extensions (VietMaximo): https://vietmaximo.blogspot.com/2019/06/manipulating-chain-of-java-extensions.html
- Extending MBOs (MaximoDev): http://maximodev.blogspot.com/2012/05/maximo-extend-java-mbo.html
- Understanding MBOs and MboSets: http://maximodev.blogspot.com/2012/05/maximo-introduction-java-mbo.html
- PLUS Prefix Registry (MaximoTechnoFunctional): https://maximotechnofunctional.blogspot.com/2019/06/
- Complex Assets Discovery (MaximoSecrets): https://maximosecrets.com/2024/11/15/complex-assets-discovery/
- Upgrading to MAS 9.0 (MaximoSecrets): https://maximosecrets.com/2024/10/04/ibm-maximo-upgrading-to-mas-9-0/
- Custom Add-on Products (BPD Zenith): https://www.bpdzenith.com/the-bpd-blog/maximo-custom-add-on-products
- Legacy Add-On Installs in MAS 9 (MORE Forum): https://moremaximo.com/discussion/legacy-add-on-installs-in-mas9
- More Maximo to Love — MAS 9.1 Portfolio (Maven Asset): https://www.mavenasset.com/blog/more-maximo-to-love/
- Overview of Industry Solutions (Bruno Portaluri): https://bportaluri.com/2015/11/overview-maximo-industry-solutions-extensions.html

### TheMaximoGuys Blog
- From MBOs to Microservices — MAS 9 Dev Guide: https://themaximoguys.ai/blog/from-mbos-to-microservices
- Stop Customizing Maximo the Old Way: https://themaximoguys.ai/blog/stop-customizing-old-way

### Video Resources
- Let's Learn MAS EP10 — How to Apply Java Customization: https://www.youtube.com/watch?v=kGy7y2T0FmQ
- Let's Learn MAS EP01 — Components & Architecture: https://www.youtube.com/watch?v=01rwWBR3f_M

### IBM Product Description Guides
- MAS 9.0 Product Description Guide: https://pacmug.org/wp-content/uploads/2025/05/MASTALK07PacMUGC25_MAS_ProductDecriptionGuideR9.0_IBM.pdf
- MAS 8.11 Product Description Guide: https://pacmug.org/wp-content/uploads/2025/05/MASTALK06PacMUGC25_MAS_ProductDecriptionGuideR8.11_IBM.pdf
- MAS Manage Modules Guide: https://pacmug.org/wp-content/uploads/2023/10/IBM_MAS_ManageModulesGuideOct2023.pdf

### Performance & Best Practices
- MAS Manage Performance Wiki: https://ibm-mas.github.io/mas-performance/mas/manage/bestpractice/
- Oil & Gas/HSE Performance Best Practices: https://ibm-mas.github.io/mas-performance/mas/manage-industry-solutions/ong-hse/bestpractice/
