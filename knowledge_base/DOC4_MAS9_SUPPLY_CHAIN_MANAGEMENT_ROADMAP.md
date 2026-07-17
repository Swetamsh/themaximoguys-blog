# MAS 9 Supply Chain Management: Comprehensive Feature Roadmap & Implementation Guide

**Document:** DOC4 - Supply Chain Management Roadmap

**Version:** 1.0

**Date:** March 12, 2026

**Audience:** Supply Management Lead, Procurement Teams, Inventory Teams, Storeroom Personnel, Business & Technical Stakeholders

**Scope:** Every supply chain management feature available in MAS 9 — core Manage modules, Maximo Mobile apps, MAS suite add-ons, paid add-ons (MRO Inventory Optimization), and competitor analysis

**Upgrade Context:** Maximo 7.6.1.3 → MAS 9

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [What Changed: 7.6 vs MAS 9 Supply Chain at a Glance](#2-what-changed-76-vs-mas-9-supply-chain-at-a-glance)
3. [PART ONE: Core Manage Supply Chain Features](#part-one-core-manage-supply-chain-features)
   - 3.1 [Inventory Module](#31-inventory-module)
   - 3.2 [Item Master & Item Configuration](#32-item-master--item-configuration)
   - 3.3 [Storeroom Management](#33-storeroom-management)
   - 3.4 [Material Reservations](#34-material-reservations)
   - 3.5 [Count Books & Inventory Counting](#35-count-books--inventory-counting)
   - 3.6 [ABC Analysis](#36-abc-analysis)
   - 3.7 [Material Issues, Transfers & Inventory Usage](#37-material-issues-transfers--inventory-usage)
   - 3.8 [Procurement Module](#38-procurement-module)
   - 3.9 [Contracts Module](#39-contracts-module)
   - 3.10 [Receiving & Inspection](#310-receiving--inspection)
   - 3.11 [Specialized Inventory Types](#311-specialized-inventory-types)
   - 3.12 [Cost Accounting Methods](#312-cost-accounting-methods)
   - 3.13 [Lead Time Calculation & Optimization](#313-lead-time-calculation--optimization)
   - 3.14 [Item Status Lifecycle](#314-item-status-lifecycle)
   - 3.15 [Reorder Processing & Safety Stock](#315-reorder-processing--safety-stock)
   - 3.16 [Role-Based Applications for Supply Chain](#316-role-based-applications-for-supply-chain)
4. [PART TWO: Maximo Mobile Supply Chain Applications](#part-two-maximo-mobile-supply-chain-applications)
   - 4.1 [Issues and Transfers Mobile](#41-issues-and-transfers-mobile)
   - 4.2 [Inventory Count Mobile](#42-inventory-count-mobile)
   - 4.3 [Inventory Receiving Mobile](#43-inventory-receiving-mobile)
   - 4.4 [Technician App — Supply Chain Features](#44-technician-app--supply-chain-features)
   - 4.5 [Offline Capabilities](#45-offline-capabilities)
   - 4.6 [What Changed from Maximo Anywhere](#46-what-changed-from-maximo-anywhere)
5. [PART THREE: MAS Suite Add-Ons Impacting Supply Chain](#part-three-mas-suite-add-ons-impacting-supply-chain)
   - 5.1 [Maximo AI Assist — Supply Chain Applications](#51-maximo-ai-assist--supply-chain-applications)
   - 5.2 [Maximo Parts Identifier](#52-maximo-parts-identifier)
   - 5.3 [Maximo Health — Supply Chain Integration](#53-maximo-health--supply-chain-integration)
   - 5.4 [Maximo Predict — Supply Chain Impact](#54-maximo-predict--supply-chain-impact)
   - 5.5 [Maximo Monitor — Supply Chain Triggers](#55-maximo-monitor--supply-chain-triggers)
   - 5.6 [Maximo Optimizer — Scheduling & Material Coordination](#56-maximo-optimizer--scheduling--material-coordination)
6. [PART FOUR: MRO Inventory Optimization (Paid Add-On)](#part-four-mro-inventory-optimization-paid-add-on)
   - 6.1 [Overview & Why It Matters](#61-overview--why-it-matters)
   - 6.2 [Complete Feature List](#62-complete-feature-list)
   - 6.3 [Essentials vs Standard Packages](#63-essentials-vs-standard-packages)
   - 6.4 [Integration with Manage](#64-integration-with-manage)
   - 6.5 [Industry Applications](#65-industry-applications)
   - 6.6 [Implementation Approach](#66-implementation-approach)
7. [PART FIVE: Competitor Analysis — MRO Inventory Optimization Market](#part-five-competitor-analysis--mro-inventory-optimization-market)
   - 7.1 [Market Landscape Overview](#71-market-landscape-overview)
   - 7.2 [Key Competitors Profiled](#72-key-competitors-profiled)
   - 7.3 [Feature-by-Feature Comparison Matrix](#73-feature-by-feature-comparison-matrix)
   - 7.4 [Strengths & Weaknesses Analysis](#74-strengths--weaknesses-analysis)
   - 7.5 [Decision Framework: When to Choose IBM vs Competitors](#75-decision-framework-when-to-choose-ibm-vs-competitors)
   - 7.6 [Recommendation for MAS 9 Customers](#76-recommendation-for-mas-9-customers)
8. [PART SIX: Phased Implementation Roadmap](#part-six-phased-implementation-roadmap)
   - 8.1 [Phase 1: Foundation — Core Manage Supply Chain (Months 1-3)](#81-phase-1-foundation)
   - 8.2 [Phase 2: Mobilize — Maximo Mobile Rollout (Months 2-5)](#82-phase-2-mobilize)
   - 8.3 [Phase 3: Optimize — MRO Inventory Optimization (Months 3-6)](#83-phase-3-optimize)
   - 8.4 [Phase 4: Intelligence — AI & Suite Add-Ons (Months 4-9)](#84-phase-4-intelligence)
   - 8.5 [Phase 5: Advanced — Full Integration (Months 6-12)](#85-phase-5-advanced)
9. [Team Exploration Assignment Matrix](#9-team-exploration-assignment-matrix)
10. [References & Resources](#10-references--resources)

---

## 1. Executive Summary

This document is your **single source of truth** for every supply chain management capability available in IBM Maximo Application Suite (MAS) 9. As the supply management lead coordinating between business and technical teams during the upgrade from Maximo 7.6.1.3, you need clarity on what features exist, what's new, what's changed, and what requires additional licensing.

### What This Document Covers

| Section | What You'll Learn |
|---------|-------------------|
| **Part One** | Every core Manage supply chain feature — inventory, procurement, contracts, receiving, count books, storerooms, item management, cost accounting |
| **Part Two** | All Maximo Mobile apps for supply chain — Issues & Transfers, Inventory Count, Receiving — with offline capabilities |
| **Part Three** | MAS suite add-ons that impact supply chain — AI Assist, Parts Identifier, Health, Predict, Monitor, Optimizer |
| **Part Four** | IBM MRO Inventory Optimization (paid SaaS add-on) — complete feature list, packages, pricing, implementation |
| **Part Five** | Competitive analysis — IBM MRO IO vs Syncron, Baxter Planning, PTC Servigistics, IFS, Infor, Verusen, Kinaxis |
| **Part Six** | Phased implementation roadmap with timelines and team assignments |

### Key Takeaway for Supply Management

MAS 9 transforms supply chain management from a **manual, reactive process** to an **AI-powered, mobile-enabled, predictive system**. The features are organized in three tiers:

1. **Included with Manage license** — Core inventory, procurement, contracts, receiving, count books, mobile apps, Role-Based Applications
2. **Included with MAS AppPoints** — AI Assist, Parts Identifier, Health, Predict, Monitor (may already be in your entitlement)
3. **Separate paid subscription** — MRO Inventory Optimization ($3,094+/month)

---

## 2. What Changed: 7.6 vs MAS 9 Supply Chain at a Glance

| Area | Maximo 7.6.1.3 | MAS 9 | Impact |
|------|----------------|-------|--------|
| **UI Framework** | Classic JSP-based screens | Carbon Design System + Role-Based Applications | All screens modernized; some Work Center customizations need rebuild |
| **Mobile (Inventory)** | Maximo Anywhere (requires MAF rebuild/deploy) | Maximo Mobile (native iOS/Android/Windows, server-side config) | No device-side redeployment; offline sync; barcode scanning built-in |
| **Inventory Work Centers** | Inventory Count WC, Issues/Transfers WC, Receiving WC | Inventory Count RBA, Issues/Transfers RBA, Receiving RBA | Modernized; some specialized pick list views not yet replicated |
| **Purchasing Work Centers** | Purchasing/Procurement Work Centers | Classic applications remain (no RBA replacement yet) | Use classic PO, RFQ, etc. until IBM releases procurement RBAs |
| **AI for Supply Chain** | None | AI Assist (GenAI), Parts Identifier (computer vision), Predict (ML forecasting) | Completely new — not available in 7.6 |
| **Inventory Optimization** | Manual ROP/MAX calculation | MRO Inventory Optimization (paid SaaS add-on) | AI-powered spare parts optimization — new product |
| **Count Books** | Classic Count Book app | Inventory Counting RBA + Count Book mobile | Modernized with barcode-driven counting |
| **Integration** | MIF (SOAP-based primarily) | REST APIs + MIF + Kafka event streaming | Modern API-first architecture |
| **Reporting** | BIRT reports | Cognos Analytics + KPI dashboards | All BIRT reports must be recreated |
| **Architecture** | WebSphere on-prem | Liberty on OpenShift (containerized) | Cloud-native; scales independently |
| **Java** | Java 8/11 | Java 17 | Custom code may need migration |

### Critical Gap for Supply Management Teams

**Purchasing/Procurement RBAs do not exist yet in MAS 9.** Your procurement team will continue using classic Maximo applications for Purchase Orders, Purchase Requisitions, RFQs, and Desktop Requisitions. The inventory side (Count, Issues/Transfers, Receiving) has been modernized to RBAs.

---

## PART ONE: Core Manage Supply Chain Features

### 3.1 Inventory Module

The Inventory module is the **cornerstone** of supply chain management in Maximo Manage. It provides comprehensive functionality for tracking and managing all inventory items across distributed storerooms.

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Inventory Balance Tracking** | Tracks current and historical balances by item, storeroom, bin, and lot designation |
| **Multi-Storeroom Management** | Manage inventory across unlimited storerooms with hierarchical parent-child relationships |
| **Bin Management** | Track items at bin-level granularity within storerooms |
| **Lot Tracking** | Batch/lot traceability for regulatory compliance and quality assurance |
| **Reservation Management** | Hard and soft reservations to prevent stockouts on critical work orders |
| **Cost Tracking** | Average cost, last cost, FIFO, LIFO, and standard cost methods |
| **Reorder Processing** | Automated reorder point/reorder quantity calculations with safety stock |
| **Cycle Counting** | ABC-based cycle count scheduling with configurable frequencies |
| **Transaction History** | Complete audit trail of all inventory movements (issues, receipts, transfers, adjustments) |
| **Barcode Integration** | Barcode scanning support for issues, transfers, receiving, and counting |
| **Negative Balance Control** | Configurable setting to allow or prevent negative available balances |
| **Multi-Currency Support** | Handle inventory costs across multiple currencies |

#### Inventory Transaction Types

| Transaction | Description |
|-------------|-------------|
| **ISSUE** | Issue material from storeroom to work order, location, or GL account |
| **RETURN** | Return previously issued material back to storeroom |
| **TRANSFER** | Move material between storerooms (with shipment tracking) |
| **RECEIPT** | Receive material against a purchase order |
| **ADJUSTMENT** | Manual adjustment of inventory balance (up or down) |
| **RECBALADJ** | Reconciliation balance adjustment from count book completion |
| **CURBALADJ** | Current balance adjustment |
| **INVOICE** | Invoice-related inventory transaction |
| **CONSIGNMENT** | Consignment inventory consumption transaction |

---

### 3.2 Item Master & Item Configuration

The Item Master application is the **primary data governance tool** for all items that may be purchased, stocked, or used in your organization.

#### Item Master Features

| Feature | Description |
|---------|-------------|
| **Item Creation & Classification** | Define items with commodity codes, order/issue units, item types |
| **Alternate Items** | Specify substitute items that can replace primary items |
| **Item Kits** | Create collections of items issued as a single unit |
| **Condition-Enabled Items** | Track same item at multiple physical conditions with different valuations |
| **Rotating Items** | Uniquely identified tools/equipment that circulate between locations |
| **Lotted Items** | Batch-tracked items for regulatory compliance |
| **Service Items** | Purchased services (grounds maintenance, security, repairs) managed alongside materials |
| **Safety Hazards** | Associate safety hazard information with items |
| **Tax Code Configuration** | Assign tax codes at item level |
| **Item Images** | Attach photos/documentation to items (visible on mobile) |
| **Item Sets** | Organization-level item groupings for multi-org environments |
| **Commodity Codes** | Hierarchical classification for spend analysis and sourcing |
| **Item Specifications** | Define technical specifications and attributes per item |
| **Vendor Associations** | Link preferred vendors to items with default pricing |
| **Cross-Reference Numbers** | Map manufacturer part numbers, vendor part numbers to internal item numbers |

#### Item Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Standard Item** | Regular stocked or non-stocked material | Most materials and spare parts |
| **Rotating Item** | Individually tracked equipment/tools with asset records | Calibrated instruments, power tools, test equipment |
| **Condition-Enabled** | Item tracked at multiple condition states (New, Good, Fair, Poor) | Repairable spares, tires, refurbished components |
| **Lotted Item** | Batch-tracked with unique lot identifiers | Chemicals, lubricants, items with shelf life |
| **Service Item** | Purchased service with unit of measure | Contract services, repair services |
| **Kit Item** | Bundle of items issued as a unit | Preventive maintenance kits, safety kits |

---

### 3.3 Storeroom Management

#### Storeroom Features

| Feature | Description |
|---------|-------------|
| **Storeroom Hierarchy** | Parent-child relationships between storerooms for bulk operations |
| **Reorder Storerooms** | Designate internal supplier storerooms for automatic replenishment |
| **GL Account Association** | Link storerooms to general ledger accounts for financial tracking |
| **Bin Management** | Define storage bins within storerooms with default bins per item |
| **Staging Bins** | Designated areas for material picking and staging before shipment |
| **Default Issue Cost** | Configure default cost method per storeroom (Average, Last, FIFO, LIFO, Standard) |
| **Lead Time Weight** | Configure how recent vs. historical lead time data weights reorder calculations |
| **Storeroom Access Control** | Security groups control who can issue, receive, and transfer within each storeroom |
| **Multi-Site Support** | Storerooms belong to specific sites within the organizational hierarchy |

---

### 3.4 Material Reservations

The Reservations system prevents the common problem of **insufficient inventory when work orders need materials**.

#### Reservation Types

| Type | When Created | Effect on Available Balance | Best For |
|------|-------------|----------------------------|----------|
| **Hard Reservation** | When work order has a required date | Decreases available balance immediately | Critical planned work with firm schedule |
| **Soft Reservation** | When no specific date required | No effect on available balance | Long-term planning, future demand visibility |
| **Backorder Reservation** | Automatically when hard reservation would cause negative balance | Creates transparent record of material shortfall | Tracking unmet demand |

#### Reservation Features

| Feature | Description |
|---------|-------------|
| **Automatic Creation** | Reservations auto-created when materials specified on approved work orders |
| **Manual Creation** | Create reservations manually for future work planning |
| **Issue from Reservation** | Issue inventory directly from the reservation screen |
| **Rotating Asset Reservation** | Reserve specific rotating assets by asset number |
| **Reservation Editing** | Modify item type, date, quantity after creation |
| **Reservation Deletion** | Remove reservations when work scope changes |
| **Reservation-to-PO Link** | When reserved items are not in stock, track the PO that will fulfill the reservation |
| **Cross-Storeroom Visibility** | View reservations across storerooms by adjusting filters |

---

### 3.5 Count Books & Inventory Counting

#### Count Book Capabilities

| Feature | Description |
|---------|-------------|
| **Count Book Creation** | Auto-generated ID, storeroom selection, reason code (audit, cycle, ABC, random, ad hoc) |
| **Six Selection Methods** | ALL (every item), CNTFREQ (overdue items), and four additional targeted selection approaches |
| **Trial Reconciliation** | Automatic comparison of physical count vs. system balance with matched/unmatched indicators |
| **Tolerance-Based Matching** | Configure acceptable variance thresholds before items flag as unmatched |
| **Blind Counting** | Hide current balance, last count, and last count date fields so counters are not influenced |
| **Rotating Asset Counting** | Separate count rows for each rotating asset in the storeroom |
| **Lotted Item Counting** | Count by lot with lot-level reconciliation |
| **Condition-Enabled Counting** | Count each condition code separately if inventory balances exist |
| **Overdue Count Indicators** | Visual indicators for items past their next physical count date |
| **Count Completion** | Status change to COMP triggers RECBALADJ transactions that update balances |
| **Count History** | Permanent reconciliation transaction records with full audit trail |
| **Count Frequency Tracking** | Next count date calculated from last count date + configured frequency in days |

#### Inventory Counting RBA (Role-Based Application)

The modernized **Inventory Counting RBA** replaces the legacy Inventory Count Work Center:

- Streamlined workflows for physical counting
- Barcode scanning integration
- Real-time matched/unmatched feedback
- Offline counting capability via Maximo Mobile
- Multi-bin counting support
- Count approval workflow

---

### 3.6 ABC Analysis

ABC Analysis is a **strategic inventory classification** technique for prioritizing counting and replenishment attention.

| Classification | Typical Value Distribution | Count Frequency | Description |
|----------------|---------------------------|-----------------|-------------|
| **Type A** | Top 30% of total value | Most frequent (e.g., every 30 days) | High-value, high-impact items requiring tight control |
| **Type B** | Next 30% of total value | Moderate (e.g., every 60 days) | Medium-value items with balanced oversight |
| **Type C** | Remaining 40% of total value | Least frequent (e.g., every 90 days) | Low-value items with minimal individual impact |
| **Type N** | Excluded from ABC | Per organizational policy | Items exempted from ABC classification updates |

#### ABC Analysis Reports

| Report | Function |
|--------|----------|
| **Inventory ABC Analysis** | Multiplies YTD issued quantity × last cost, sorts descending, classifies items |
| **Inventory ABC Transaction Date Analysis** | Same classification logic with transaction date filtering |

Both reports provide **database update functionality** that automatically modifies ABC Type and Cycle Count Frequency fields on inventory records.

---

### 3.7 Material Issues, Transfers & Inventory Usage

The **Inventory Usage** application manages the complete lifecycle of material movements.

#### Issue Processing

| Feature | Description |
|---------|-------------|
| **Issue to Work Order** | Issue materials against specific work orders with material line reference |
| **Issue to Location** | Issue materials to a location or GL account |
| **Issue Without Reservation** | Issue materials directly without prior reservation |
| **Issue from Reservation** | Fulfill existing reservations through the issue process |
| **Rotating Asset Issue** | Select specific rotating asset(s) when issuing rotating items |
| **Personnel Assignment** | Record who the item is being issued to (mandatory for tools) |
| **Partial Issue** | Issue less than the reserved or requested quantity |
| **Multi-Bin Issue** | Issue from multiple bins in a single transaction |

#### Transfer Processing

| Feature | Description |
|---------|-------------|
| **Storeroom-to-Storeroom Transfer** | Move material between any storerooms in the organization |
| **Shipment Management** | Create shipment records with carrier info, packing slips, multiple shipment lines |
| **Status Workflow** | ENTERED → STAGED → SHIPPED → COMPLETE (intermediate statuses optional) |
| **Staging Workflow** | Pick from storage bins to staging bins with automatic balance adjustments |
| **Shipment Receiving** | Destination storeroom processes incoming transfers through Shipment Receiving app |
| **Rotating Asset Returns** | System tracks returning assets back to original sites through holding locations |
| **Faulty Item Returns** | Formal return process for items found faulty upon receipt |

#### Return Processing

| Feature | Description |
|---------|-------------|
| **Return to Storeroom** | Return previously issued items with automatic balance restoration |
| **Condition Update on Return** | For condition-enabled items, update condition code upon return |
| **Rotating Asset Return** | Track rotating assets back to inventory with condition assessment |

---

### 3.8 Procurement Module

#### Desktop Requisitions

| Feature | Description |
|---------|-------------|
| **Self-Service Requisition Creation** | End users create purchase requests without procurement involvement |
| **Template Requisitions** | Save templates for recurring orders |
| **Frequently Ordered Items** | Maintain personal lists of commonly ordered items |
| **Status Tracking** | Monitor approval progress and receipt status |
| **Auto-PO Creation** | Approved desktop requisitions automatically create purchase requisitions |

#### Purchase Requisitions

| Feature | Description |
|---------|-------------|
| **Auto-Creation from Work Orders** | Materials on approved work orders automatically generate PRs |
| **Reorder-Based Creation** | Automatic PR generation when inventory drops below reorder point |
| **Direct Issue PRs** | PRs for direct issue materials not going through storeroom |
| **Multi-Vendor Split** | Single PR can result in POs to multiple vendors |
| **Vendor Pre-Assignment** | Optional — PRs can specify a preferred vendor or leave for procurement decision |
| **Approval Workflow** | Configurable approval routing based on value, commodity, organization |

#### Purchase Orders

| Feature | Description |
|---------|-------------|
| **PO from PR** | Create PO directly from approved purchase requisition (copies all unassigned lines) |
| **Auto-Numbering** | Automatic PO number generation or manual entry |
| **Delivery Management** | Configure delivery location, requested delivery date, payment terms |
| **PO Status Tracking** | Track pending orders, received quantities, invoicing status |
| **Multi-Line POs** | Multiple line items per PO with independent delivery tracking |
| **Change Orders** | Modify POs after issuance with revision tracking |
| **PO Approval Workflow** | Configurable approval routing for purchase orders |
| **Vendor Integration** | POs link to vendor records with contact, site, and payment information |

#### Request for Quotation (RFQ)

| Feature | Description |
|---------|-------------|
| **Standalone or Contract-Based** | Create RFQs independently or against existing purchase contracts |
| **Multi-Vendor Quoting** | Send RFQs to multiple vendors; receive quotes on separate tabs |
| **Quote Comparison** | Compare unit costs, EOQ, delivery times across vendor responses |
| **Award & Convert** | Award lines to winning vendor; Create PO or Create Contract directly from RFQ |
| **Auto-Close** | RFQ automatically closes when all lines awarded and orders created |

---

### 3.9 Contracts Module

MAS 9 supports **nine contract types** for managing vendor agreements:

| Contract Type | Purpose |
|---------------|---------|
| **Purchase Contract** | Specific prices and terms for purchasing materials at agreed rates |
| **Blanket (Volume) Contract** | Total dollar amount agreement; release POs created at specified prices |
| **Pricing Contract** | Establish pricing schedules for services or materials |
| **Labor Contract** | Define rates for craft/skill combinations; auto-generate invoices for approved labor |
| **Lease Contract** | Fixed-term equipment leasing with buy-out options |
| **Rental Contract** | Equipment rental terminated at will |
| **Service Contract** | Service delivery terms with per-incident billing capability |
| **Warranty Contract** | Coverage scope for purchased assets or parts |
| **Software Contract** | Software licensing and maintenance agreements |
| **Master Contract** | Umbrella contract associating multiple contract types for a single vendor |

#### Contract Features

| Feature | Description |
|---------|-------------|
| **Release PO Generation** | Create release purchase orders against blanket/volume contracts |
| **Contract Terms Enforcement** | System validates PO pricing against contracted rates |
| **Expiration Management** | Track contract expiration with notification capability |
| **Renewal Workflows** | Support for contract renewal and renegotiation |
| **Multi-Organization** | Contracts can span organizational boundaries |
| **Vendor Performance** | Track vendor performance against contracted SLAs |

---

### 3.10 Receiving & Inspection

#### Receiving Features

| Feature | Description |
|---------|-------------|
| **Receive Against PO** | Process receipts against specific purchase order lines |
| **Quantity Validation** | Accept less than, equal to, or more than ordered quantity |
| **Inspection on Receipt** | Inspect received goods with pass/fail recording |
| **Put-Away Processing** | Assign received items to storage bins with put-away location tracking |
| **Rotating Asset Receipt** | Creates receipt in "waiting for asset" status until serialization complete |
| **Tolerance Configuration** | Define acceptable over/under receipt percentages |
| **Receipt Reversal** | Reverse incorrect receipts with audit trail |
| **Multi-Line Receipt** | Receive multiple PO lines in a single receipt transaction |
| **Void Receipts** | Void receipts for items that should not have been received |
| **Receipt History** | Complete record of all receiving transactions |

---

### 3.11 Specialized Inventory Types

#### Rotating Assets (Tools Management)

| Feature | Description |
|---------|-------------|
| **Individual Asset Tracking** | Each rotating asset has unique asset record with serial number |
| **Location History** | Track movement across campus, building, floor, storeroom |
| **Condition Tracking** | Monitor condition of tools over their lifecycle |
| **Calibration Integration** | Link to calibration work orders for instruments requiring periodic calibration |
| **Tool Reservation** | Reserve specific tools for upcoming work |
| **Tool Issue/Return** | Mandatory personnel recording when issuing tools |
| **Tool Transfer** | Transfer tools between storerooms with/without reservations |
| **Audit Compliance** | Full audit trail for equipment accountability |

#### Condition-Enabled Items

| Feature | Description |
|---------|-------------|
| **Multi-Condition Valuation** | Same item at different conditions (New 100%, Good 80%, Fair 40%, Poor 10%) |
| **Condition Codes** | Defined at item set level; one code must be 100% (full value) |
| **Condition-Based Costing** | Inventory value automatically calculated based on condition percentage |
| **Condition on Issue** | Users must select condition code when issuing |
| **Condition on Return** | Update condition when returning items to storeroom |
| **Permanent Designation** | Once inventory exists for a condition-enabled item, status cannot be reversed |

#### Consignment Inventory

| Feature | Description |
|---------|-------------|
| **Vendor-Owned Stock** | Items owned by vendor, stocked in your storeroom, paid on consumption |
| **Three Invoice Types** | CONSUMPTION (auto on issue), FREQUENCY (periodic), MANUAL (triggered manually) |
| **Automatic Invoice Generation** | ConsignmentInvoiceCronTask generates invoices based on consumption |
| **Vendor Account Linking** | Consignment items linked to vendor's consignment account record |
| **Configurable Max Lines** | Control invoice size through Organizations application settings |

#### Service Items

| Feature | Description |
|---------|-------------|
| **Service Requisition** | Request purchased services through standard procurement workflow |
| **Proration Support** | Service items can be prorated across cost centers |
| **Status Management** | Service items support full status lifecycle |
| **Unit of Measure** | Define measurement units for services (hours, visits, monthly, etc.) |

---

### 3.12 Cost Accounting Methods

| Method | Description | When to Use |
|--------|-------------|-------------|
| **Average Cost** | Running average of all purchase costs | Default for most organizations; smooths price fluctuations |
| **Last Cost** | Most recent purchase price | Simple; reflects current market pricing |
| **FIFO (First-In-First-Out)** | Oldest receipt cost consumed first | Matches physical flow for perishable/dated items |
| **LIFO (Last-In-First-Out)** | Most recent receipt cost consumed first | Tax optimization in rising-price environments |
| **Standard Cost** | Predetermined fixed cost | Budgeting and variance analysis |

#### Cost Dialog Behavior

When using FIFO or LIFO, Maximo presents a **Specify Inventory Costs** dialog during balance increases, requiring users to specify which receipt cost applies to adjustments.

---

### 3.13 Lead Time Calculation & Optimization

Maximo Manage **dynamically calculates lead times** based on actual procurement data:

**Formula:** `newLeadTime = currentLeadTime × (1 - recentLeadTimeWeight) + lastPODays × recentLeadTimeWeight`

| Parameter | Description | Typical Value |
|-----------|-------------|---------------|
| **Recent Lead Time Weight** | How much weight the most recent procurement cycle gets | 20% |
| **Historical Weight** | Derived (1 - recentWeight); how much historical average counts | 80% |
| **lastPODays** | Days between PO date and actual delivery date for the most recent order | Calculated per receipt |

The system **continuously refines** lead time estimates as more procurement data accumulates, improving reorder point accuracy over time.

---

### 3.14 Item Status Lifecycle

```
PLANNING → ACTIVE → PENDOBS → OBSOLETE
    ↓         ↑         ↑
  PENDING ────┘─────────┘
```

| Status | Available for Issue/Receipt | Available for Purchase | Can Revert to Active |
|--------|---------------------------|----------------------|---------------------|
| **PLANNING** | No | No | Yes |
| **PENDING** | No (hidden from lookups) | No | Yes |
| **ACTIVE** | Yes | Yes | N/A (already active) |
| **PENDOBS** | Yes (issue only) | No (cannot reorder) | Yes |
| **OBSOLETE** | No | No | **No (permanent)** |

**Warning:** OBSOLETE is permanent and cannot be reversed. Only use when you are certain the item will never be needed again.

---

### 3.15 Reorder Processing & Safety Stock

#### Automatic Reorder Features

| Feature | Description |
|---------|-------------|
| **Reorder Point (ROP)** | When current balance drops below ROP, system triggers reorder |
| **Reorder Quantity (ROQ)** | Default quantity to order when reorder triggered |
| **Safety Stock** | Minimum inventory level maintained as buffer |
| **Economic Order Quantity (EOQ)** | Calculated optimal order quantity balancing order cost and carrying cost |
| **Maximum Stock Level** | Upper limit for inventory; prevents over-ordering |
| **Internal Reorder** | Auto-replenish from designated reorder storeroom (internal transfer) |
| **External Reorder** | Auto-create purchase requisition when reorder triggered |
| **Reorder Review** | Review pending reorders before execution |
| **Cron Task Scheduling** | Schedule automatic reorder processing at defined intervals |
| **Multi-Vendor Reorder** | Reorder from different vendors based on item-vendor relationships |

---

### 3.16 Role-Based Applications for Supply Chain

**What changed from 7.6:** Work Centers have been **fully removed** as of MAS 8.9+. They are replaced by Role-Based Applications (RBAs) built on Carbon Design System.

| RBA Name | Replaces (7.6) | Status in MAS 9 | Notes |
|----------|----------------|-----------------|-------|
| **Inventory Count RBA** | Inventory Count Work Center | Available | Modernized cycle counting |
| **Issues and Transfers RBA** | Issues and Transfers Work Center | Available | Mobile-compatible |
| **Receiving RBA** | Receiving Work Center | Available | Enhanced with mobile |
| **Manage Inventory Work Center** | Inventory Management Work Center | Available | Dashboard for inventory managers |
| **Purchasing/Procurement RBA** | Purchasing Work Centers | **NOT YET AVAILABLE** | Use classic apps (POs, PRs, RFQs) |

**Gap Alert:** Purchasing and procurement Work Center customizations from 7.6 have **no RBA equivalent yet**. Teams must use classic Maximo applications for procurement workflows until IBM releases procurement RBAs.

---

## PART TWO: Maximo Mobile Supply Chain Applications

Maximo Mobile replaces Maximo Anywhere with **native iOS, Android, and Windows** applications that require **no device-side build or deployment** — all configuration is server-side.

### 4.1 Issues and Transfers Mobile

**Target Users:** Storeroom clerks, material handlers

| Feature | Description |
|---------|-------------|
| **Stage Items for Issue** | Pick items from storage and move to staging area |
| **Issue Without Reservation** | Issue inventory directly without prior reservation |
| **View/Edit Charge Information** | Modify GL accounts and cost centers during issue |
| **Storeroom-to-Storeroom Transfer** | Transfer items between any storerooms |
| **Shipment Creation** | Create shipments for inter-storeroom transfers |
| **Tools Transfer** | Transfer tools with or without reservations |
| **Work Order Reference** | Link issues to work orders, material requests, or internal POs |
| **Barcode Scanning** | Scan item barcodes to identify items for issue/transfer |
| **Offline Support** | Full offline capability with sync on reconnect |

---

### 4.2 Inventory Count Mobile

**Target Users:** Count personnel, inventory managers

| Feature | Description |
|---------|-------------|
| **Barcode-Driven Counting** | Scan items and bins to record counts |
| **Cycle Count Support** | Execute scheduled cycle counts from mobile device |
| **Multi-Bin Counting** | Count items across multiple bins in a single session |
| **Count Reconciliation** | Online reconciliation of counted vs. system quantities |
| **Count Approval Workflow** | Submit counts for approval through configurable workflow |
| **Blind Count Mode** | Option to hide system balances during counting |
| **Offline Counting** | Count items offline; sync when connectivity restored |
| **Photo Attachment** | Capture photos of items during counting for verification |

**Note:** Count reconciliation is **online only** — not available in offline mode.

---

### 4.3 Inventory Receiving Mobile

**Target Users:** Receiving clerks, warehouse personnel

| Feature | Description |
|---------|-------------|
| **PO-Based Receiving** | See list of open POs awaiting receipt; select PO to process |
| **Visual PO List** | Scrollable list with visual indicators and descriptions |
| **Quantity Entry** | Enter received quantity (can differ from ordered quantity) |
| **Item Image Verification** | View item images to verify correct items received |
| **Rotating Asset Receipt** | Creates receipt in "waiting for asset" status for serialization |
| **Real-Time Sync** | Receipt data syncs to server immediately for desktop visibility |
| **Inspection on Receipt** | Inspect received goods with pass/fail on mobile |
| **Check for Updates** | Pull new POs to local database for offline processing |
| **Offline Receipt Processing** | Process receipts without connectivity; sync later |

#### MAS 9.1 Receiving Enhancements

| Enhancement | Description |
|-------------|-------------|
| **Receiving Bin Updates** | Update receiving bins and additional attributes upon receipt |
| **Enhanced Item Identification** | Additional information displayed to identify items, receipts, PO data |
| **Performance Improvements** | Data loading optimizations, enhanced sorting, filtering, and search |
| **Return Processing** | Process returns from mobile receiving interface |

---

### 4.4 Technician App — Supply Chain Features

The Technician mobile app includes supply chain features relevant to field workers:

| Feature | Description |
|---------|-------------|
| **Material Request Creation** | Create material requests directly from field |
| **Material Usage Recording** | Record materials used on work orders |
| **Barcode Scanning** | Scan parts and materials in the field |
| **Planned Material View** | See materials planned for the work order |
| **Material Availability Check** | View available inventory before requesting |

---

### 4.5 Offline Capabilities

| Capability | Description |
|------------|-------------|
| **Full Offline Work** | Technician, Issues/Transfers, Count, and Receiving apps work offline |
| **Configurable Sync Scope** | Choose which data downloads to device |
| **Partial Data Refresh** | Sync only changed records, not full dataset |
| **Conflict Resolution** | Automatic conflict resolution for concurrent edits |
| **Storage Management** | Monitor and manage device storage capacity |
| **Background Sync** | Data syncs automatically when connectivity restored |

---

### 4.6 What Changed from Maximo Anywhere

| Aspect | Maximo Anywhere (7.6) | Maximo Mobile (MAS 9) |
|--------|----------------------|----------------------|
| **Build** | Required MAF (Mobile Application Framework) rebuild and redeployment | Server-side configuration only |
| **Deployment** | Manual APK/IPA distribution | App store distribution + server config |
| **Customization** | XML configuration + custom adapters | MAF Configuration application |
| **Inspection Forms** | Downloaded per inspection | Downloaded ONCE at login (performance improvement) |
| **Updates** | Required rebuild and redeployment | Server-side updates — no device redeployment |
| **Platform** | Hybrid web-based | Native iOS/Android/Windows |
| **Offline** | Limited offline capability | Full offline with configurable sync |
| **Barcode** | Limited barcode support | Built-in barcode scanning across all apps |

---

## PART THREE: MAS Suite Add-Ons Impacting Supply Chain

These applications are **included with your MAS AppPoints license** — check your entitlement to determine access.

### 5.1 Maximo AI Assist — Supply Chain Applications

Maximo AI Assist (powered by IBM watsonx.ai foundation models) provides **generative AI capabilities** that directly impact supply chain operations:

| Capability | Supply Chain Application |
|------------|------------------------|
| **Intelligent Search** | Natural language search across inventory records, POs, vendor history — "find all POs for bearing assemblies from vendor XYZ in the last 6 months" |
| **Work Order Material Recommendations** | AI suggests materials needed for work orders based on historical patterns, failure codes, and asset history |
| **Troubleshooting Assistance** | Technicians describe symptoms; AI recommends parts and materials from maintenance manuals and historical work orders |
| **Knowledge Base Access** | Query maintenance manuals, vendor documentation, and tribal knowledge through conversational interface |
| **Document Summarization** | Summarize long vendor contracts, specifications, or maintenance procedures |
| **Failure-to-Parts Mapping** | AI maps failure modes to likely parts needed, improving material planning accuracy |

**AppPoints Cost:** AI Assist consumes AppPoints per user. Check your allocation with IBM.

---

### 5.2 Maximo Parts Identifier

Maximo Parts Identifier uses **computer vision** to identify spare parts:

| Feature | Description |
|---------|-------------|
| **Photo-Based Identification** | Take a photo of an unknown part; AI identifies it from your item catalog |
| **Part Number Lookup** | Matches visual characteristics to item master records |
| **Cross-Reference** | Maps identified parts to manufacturer and vendor part numbers |
| **Field Worker Support** | Technicians in the field can identify parts without returning to the shop |
| **Inventory Integration** | Check availability of identified parts across storerooms |

**Impact for Supply Chain:** Reduces misidentification of parts, prevents wrong-part ordering, and speeds up material requests from field workers.

---

### 5.3 Maximo Health — Supply Chain Integration

Maximo Health generates **asset health scores** that directly drive supply chain decisions:

| Integration Point | Supply Chain Impact |
|-------------------|---------------------|
| **Health-Driven PM Scheduling** | Healthier assets → fewer emergency parts needs → better demand predictability |
| **Replacement Planning** | Health scores trigger replacement decisions → advance procurement for replacement parts |
| **Budget Optimization** | Health investment planning determines where to spend maintenance vs. replacement dollars → impacts inventory strategy |
| **Criticality-Based Stocking** | Asset health + criticality → prioritize spare parts stocking for at-risk critical assets |

---

### 5.4 Maximo Predict — Supply Chain Impact

Maximo Predict uses **machine learning** to predict asset failures:

| Integration Point | Supply Chain Impact |
|-------------------|---------------------|
| **Failure Prediction** | Know WHEN an asset will fail → pre-position parts before failure occurs |
| **Predictive Material Planning** | ML-driven demand signals for spare parts based on predicted failures |
| **Reduced Emergency Procurement** | Fewer surprises = fewer rush orders = lower expediting costs |
| **Remaining Useful Life** | Estimate remaining life → plan material procurement accordingly |
| **Anomaly-Based Alerts** | Detect degradation early → create material reservations proactively |

---

### 5.5 Maximo Monitor — Supply Chain Triggers

Maximo Monitor provides **real-time IoT-based** triggers for supply chain:

| Integration Point | Supply Chain Impact |
|-------------------|---------------------|
| **Condition-Based Material Orders** | Sensor data triggers material requisitions before failure |
| **Consumption Monitoring** | Track consumable usage rates (lubricants, filters) via IoT → auto-reorder |
| **Alert-Driven Work Orders** | Monitor alerts create work orders with material lists → automatic reservations |
| **Usage Pattern Analytics** | Analyze actual consumption patterns to refine reorder points |

---

### 5.6 Maximo Optimizer — Scheduling & Material Coordination

Maximo Optimizer provides **advanced scheduling optimization**:

| Integration Point | Supply Chain Impact |
|-------------------|---------------------|
| **Material-Aware Scheduling** | Schedule work only when required materials are available |
| **Resource + Material Coordination** | Optimize work schedules considering both labor and material availability |
| **Reduced Material Waste** | Better scheduling = materials arrive when needed, not sitting on shelf |
| **Multi-Constraint Optimization** | Balance crew availability, material availability, asset criticality, and geographic routing |

---

## PART FOUR: MRO Inventory Optimization (Paid Add-On)

### 6.1 Overview & Why It Matters

IBM Maximo MRO Inventory Optimization is a **cloud-based SaaS solution** (runs in IBM Cloud, NOT on your OpenShift cluster) that uses AI-powered algorithms to optimize spare parts inventory. This product **did not exist in Maximo 7.6** — it is completely new.

**The Problem It Solves:**
- Organizations carry **20-40% more MRO inventory** than needed
- Simultaneously experience **stockouts on critical parts**
- **81% of order quantities are wrong** based on manual calculations
- **30% of stocked parts will never be used**
- **50% of open work orders are waiting on parts**
- **25% of technician time** is spent searching for parts

---

### 6.2 Complete Feature List

| Feature | Description |
|---------|-------------|
| **ROP/MAX Recommendations** | AI-calculated Reorder Point and Maximum stock levels for every item |
| **Stockout Detection** | Identifies items at risk of running out before next delivery |
| **Excess Inventory Identification** | Flags slow-moving, potentially obsolete, and over-stocked items |
| **Demand Forecasting** | AI-powered prediction of future parts usage based on historical patterns |
| **Criticality Analysis** | Considers asset criticality when recommending stock levels |
| **Lead Time Analysis** | Factors in supplier lead times and variability into calculations |
| **Service Level Analysis** | Balances stock levels against target service levels (fill rates) |
| **What-If Analysis** | Model scenarios (budget cuts, demand spikes, service level changes) before committing |
| **Baseline Analysis** | Compare current inventory against optimized recommendations side-by-side |
| **AI Smart Review** | Automated review and approval of optimization recommendations |
| **Quick Reports & Dashboards** | Pre-built analytics for inventory performance tracking |
| **Automation Workflows** | Auto-apply approved recommendations directly to Manage item master |
| **Prioritized Alerts** | Notifications for items requiring immediate attention |
| **Wizard-Based Setup** | Near-zero configuration onboarding for Essentials package |
| **Configurable Work Queues** | Task management for inventory analysts (Standard package) |
| **Continuous Monitoring** | Automated ongoing monitoring and recommendation updates (Standard) |
| **Real-Time Algorithm Optimization** | Continuously optimizing stock levels as new data arrives |
| **Historical Data Analytics** | Deep analysis of procurement and consumption history |
| **Safety Stock Calculation** | AI-driven safety stock recommendations considering variability |

---

### 6.3 Essentials vs Standard Packages

| Feature | Essentials ($3,094+/month) | Standard (Custom Pricing) |
|---------|---------------------------|--------------------------|
| **Inventory Capacity** | Up to $50M inventory value; 10,000 item records | Unlimited |
| **ROP/MAX Recommendations** | Yes | Yes |
| **Industry-Standard Filters** | Yes | Yes |
| **Prioritized Alerts** | Yes | Yes |
| **Wizard-Based Setup** | Yes (near zero configuration) | Yes |
| **Onboarding Training** | Included | Included |
| **Automated Continuous Monitoring** | No | **Yes** |
| **Configurable Work Queues** | No | **Yes** |
| **Automation Workflows** | No | **Yes** |
| **AI Smart Review** | No | **Yes** |
| **Service Level Analysis** | No | **Yes** |
| **Criticality Analysis** | No | **Yes** |
| **Lead Time Analysis** | No | **Yes** |
| **Demand Forecasting** | No | **Yes** |
| **What-If Analysis** | No | **Yes** |
| **Quick Reports** | No | **Yes** |
| **Baseline Analysis** | No | **Yes** |

**Recommendation:** For an organization upgrading from 7.6 with existing inventory optimization needs, **start with Essentials** for a 3-month pilot, then evaluate Standard based on measured ROI.

---

### 6.4 Integration with Manage

| Integration Point | Description |
|-------------------|-------------|
| **API Connection** | Connects to Maximo Manage via REST API |
| **Data Reads** | Pulls inventory data, work order history, purchase history from Manage |
| **Recommendation Push** | Pushes optimized ROP/MAX values back to item master in Manage |
| **Multi-ERP Support** | Also integrates with SAP, Oracle, and other ERP systems |
| **No On-Prem Install** | Runs entirely in IBM Cloud — no OpenShift resource consumption |

---

### 6.5 Industry Applications

| Industry | Primary Use Case |
|----------|-----------------|
| **Energy/Utilities** | Optimize spare parts for generation, transmission, distribution assets |
| **Manufacturing** | Balance fluctuating production demand with maintenance needs |
| **Mining** | Share critical spares across regional sites, reduce carrying costs |
| **Oil & Gas** | Streamline refinery and production MRO supply chain |
| **Transportation** | Track fleet parts, reduce maintenance operating costs |
| **Water/Wastewater** | Optimize pump, valve, and instrumentation spare parts |
| **Government/Defense** | Manage large distributed inventories with compliance requirements |

---

### 6.6 Implementation Approach

| Phase | Duration | Activities | Owner |
|-------|----------|------------|-------|
| **1. Discovery** | 2 weeks | Contact IBM for demo/trial; export current ROP/MAX data; identify pilot storeroom (500-2,000 items) | Supply Management Lead |
| **2. Data Preparation** | 2 weeks | Export inventory data, work order history, purchase history; clean critical data fields | Inventory Team + IT |
| **3. Pilot Setup** | 1-2 weeks | Configure Essentials package; connect to Manage via API; load pilot storeroom data | IBM + IT |
| **4. Pilot Execution** | 3 months | Run optimization on pilot storeroom; compare AI recommendations vs. current values | Inventory Team |
| **5. ROI Measurement** | 2 weeks | Calculate excess reduction, stockout prevention, service level improvement | Finance + Inventory |
| **6. Decision** | 1 week | Go/no-go on Standard package; evaluate full rollout plan | Supply Management Lead + Finance |
| **7. Full Rollout** | 2-3 months | Expand to all storerooms; configure automation workflows; train users | Inventory Team |

---

## PART FIVE: Competitor Analysis — MRO Inventory Optimization Market

### 7.1 Market Landscape Overview

The MRO inventory optimization market includes both **platform players** (IBM, Infor, IFS, Oracle) that offer optimization as part of larger suites, and **pure-play specialists** (Syncron, Baxter Planning, Verusen, PTC Servigistics) that focus exclusively on spare parts optimization.

**Key Market Statistics:**
- 30% of stocked MRO parts will never be used
- MRO represents 5-10% of cost of goods sold but 70-80% of all supply chain transactions
- Average organizations carry 20-40% excess MRO inventory
- MRO supply chain issues cause ~50% of all plant reliability emergencies

---

### 7.2 Key Competitors Profiled

#### 1. Syncron (Leader — IDC MarketScape 2024-2025)

| Aspect | Details |
|--------|---------|
| **Focus** | Purpose-built for aftermarket and spare parts management |
| **Key Differentiator** | Probabilistic forecasting with ML models specifically designed for intermittent demand patterns |
| **Capabilities** | Demand forecasting, multi-echelon inventory optimization (MEO), dynamic replenishment, last-time-buy optimization, supplier collaboration, causal forecasting, installed base forecasting |
| **Deployment** | Cloud SaaS only |
| **Industries** | Automotive, aerospace, manufacturing, industrial equipment |
| **Time to Value** | 3 months to 1 year ROI (per IDC) |
| **Pricing** | Custom enterprise pricing (not publicly disclosed) |
| **Strengths** | Best-in-class aftermarket algorithms; fast deployment; purpose-built for spare parts |
| **Weaknesses** | No native EAM/CMMS integration; requires data feeds from Maximo/SAP |

#### 2. Baxter Planning / BaxterProphet (Kinaxis Ecosystem)

| Aspect | Details |
|--------|---------|
| **Focus** | Service supply chain optimization with proprietary Total Cost Optimization (TCO) |
| **Key Differentiator** | Optimizes total cost (carrying + stockout) rather than targeting fixed service levels |
| **Capabilities** | DC planning, technician stock planning, financial scenario modeling, supplier web portals, NPI/last-time-buy lifecycle AI, reverse logistics, excess management |
| **Deployment** | Cloud SaaS only |
| **Industries** | Medical devices, industrial equipment, field service |
| **Pricing** | Custom enterprise pricing |
| **Strengths** | Financial-outcome-driven optimization; strong scenario modeling; 40% planner productivity improvement, 35% carrying cost reduction |
| **Weaknesses** | Complex implementation for large networks; part of Kinaxis ecosystem may add procurement complexity |

#### 3. PTC Servigistics

| Aspect | Details |
|--------|---------|
| **Focus** | Service parts management integrated with PTC industrial software |
| **Key Differentiator** | Multi-Indenture Multi-Echelon (MIME) optimization ensuring asset availability, not just fill rates |
| **Capabilities** | MEO, MIME, rotable pool optimization, availability-based contract optimization, ThingWorx IoT integration |
| **Deployment** | Cloud SaaS with optional on-prem components |
| **Industries** | Aerospace & defense, commercial aviation, heavy equipment |
| **Pricing** | Part-Inventory value (PMI), Parts/Location pairs (PLP), or Demand Accounting Lines (DAL) licensing; tiered packages (Foundation through Premium) |
| **Strengths** | Deepest multi-echelon capability; MIME is unique; strong in regulated industries |
| **Weaknesses** | Complex licensing; limited public documentation on AI specifics; PTC ecosystem lock-in |

#### 4. IFS Cloud ERP — Spare Parts Planning

| Aspect | Details |
|--------|---------|
| **Focus** | Integrated spare parts planning within IFS Cloud ERP |
| **Key Differentiator** | Spares treated as component parts with consumption-based forecasting |
| **Capabilities** | Family-level forecasting disaggregation, consumption window management, ABC classification, safety stock, EOQ, manufacturing scheduling integration |
| **Deployment** | Cloud SaaS |
| **Industries** | Manufacturing, process industries, field service |
| **Pricing** | $100K-$300K annually (mid-market) + $200K-$800K implementation |
| **Strengths** | Tight ERP integration; strong manufacturing context; embedded Industrial AI |
| **Weaknesses** | Requires full IFS ERP adoption; not a standalone MRO optimization tool |

#### 5. Infor CloudSuite — MRO Optimization

| Aspect | Details |
|--------|---------|
| **Focus** | Industry-specific MRO optimization within Infor CloudSuite |
| **Key Differentiator** | "5 Cs" framework: Criticality, Clarity, Consolidation, Calculation, Collaboration |
| **Capabilities** | Criticality assessment, stranded parts identification, cross-unit consolidation, demand calculation with seasonal variation, multi-function collaboration |
| **Deployment** | Cloud SaaS on AWS |
| **Industries** | Manufacturing, healthcare, process industries |
| **Pricing** | $100K-$300K annually + $200K-$800K implementation; 9-18 month timeline |
| **Strengths** | Strong industry-specific editions; embedded AI across suite; deep manufacturing focus |
| **Weaknesses** | Requires Infor CloudSuite ecosystem; long implementation; complex customization |

#### 6. Verusen — AI-Powered MRO Intelligence

| Aspect | Details |
|--------|---------|
| **Focus** | AI platform for MRO inventory, spend, and risk optimization |
| **Key Differentiator** | Works with existing dirty data — no data cleansing prerequisite; semantic material matching |
| **Capabilities** | Duplicate material detection, excess inventory redeployment, tail spend reduction, critical shortage exposure flagging, multi-system ingestion, network-level transfer optimization |
| **Deployment** | Cloud SaaS on AWS |
| **Industries** | Asset-intensive manufacturing, energy, utilities |
| **Average Results** | $20M working capital unlocked; 60% reduction in material review time; 10x ROI within 12 months |
| **Pricing** | Consultation-based; rapid deployment model |
| **Strengths** | No data cleansing needed; works across multiple ERP/EAM instances; fastest time-to-value; excellent for messy data environments |
| **Weaknesses** | Newer player; smaller ecosystem; optimization less mature than Syncron or Servigistics for complex multi-echelon scenarios |

#### 7. Kinaxis — Supply Chain Planning Platform

| Aspect | Details |
|--------|---------|
| **Focus** | End-to-end supply chain planning platform |
| **Key Differentiator** | Unified planning with always-on ML analytics; strong S&OP capabilities |
| **Capabilities** | Demand planning, supply planning, inventory planning, S&OP, control tower, collaborative forecasting, scenario simulation, disruption prediction |
| **Deployment** | Cloud SaaS |
| **Industries** | Manufacturing, CPG, life sciences, aerospace |
| **Pricing** | Custom enterprise; implementation 6-12 months; consulting-intensive |
| **Strengths** | Best-in-class S&OP; strong scenario planning; broad supply chain coverage |
| **Weaknesses** | Not MRO-specific; spare parts is one use case among many; overkill for organizations only needing MRO optimization |

---

### 7.3 Feature-by-Feature Comparison Matrix

| Capability | IBM MRO IO | Syncron | Baxter Planning | PTC Servigistics | Verusen | IFS Cloud | Infor CloudSuite |
|-----------|-----------|---------|-----------------|-----------------|---------|-----------|-----------------|
| **AI/ML Forecasting** | Statistical + prescriptive analytics | Probabilistic ML + causal + installed base | BaxterPredict AI + lifecycle | AI-powered (limited public detail) | Semantic AI matching | Time-series + Industrial AI | Demand sensing + ML |
| **Demand Forecasting** | Historical pattern analysis | Time-series per location; seasonal; BOM propagation | Historical + contract-based | Point-level across network | Metadata-enriched signals | Family disaggregation | Real-time signal interpretation |
| **ROP/ROQ Optimization** | Real-time algorithm | Dynamic probabilistic safety stock | Total Cost Optimization | Network fill-rate MEO | Constraint-aware | ABC + safety stock + EOQ | Real-time replenishment |
| **Criticality Analysis** | Lead time + value + criticality | Multi-criteria service impact | Part + location criticality in TCO | Asset-level MIME availability | RPN + FMEA support | Family/part-level config | SOD framework |
| **Multi-Echelon** | Single-environment | Full MEO with network optimization | Full MEIO with technician stock | MEO + MIME (deepest) | Multi-site redeployment | Multi-location coordination | Multi-level demand planning |
| **What-If Analysis** | Limited | Demand + service level modeling | Advanced financial scenarios | Multiple service strategies | Cost-benefit visualization | Parameter adjustment | Scenario planning |
| **Duplicate Detection** | No | No | No | No | **Yes (core strength)** | No | No |
| **Integration Flexibility** | Maximo native + SAP/Oracle | Cloud-native SaaS; data feeds | API + pre-built connectors | ServiceMax + ThingWorx IoT | Multi-ERP/EAM ingestion | IFS ERP native | Infor CloudSuite native |
| **Deployment** | Cloud SaaS | Cloud SaaS | Cloud SaaS | Cloud + optional on-prem | Cloud SaaS | Cloud SaaS | Cloud SaaS (AWS) |
| **Data Cleansing Required** | Yes | Yes | Yes | Yes | **No** | Yes | Yes |
| **Time to Value** | Weeks (Essentials) | 3-12 months | Months | Months | **Weeks** | 9-18 months | 9-18 months |
| **Starting Price** | ~$37K/year | Custom | Custom | Custom (tiered) | Custom | $100-300K/year | $100-300K/year |

---

### 7.4 Strengths & Weaknesses Analysis

#### IBM Maximo MRO Inventory Optimization

**Strengths:**
- **Native Maximo integration** — seamless data flow with Manage; no middleware needed
- **Lowest barrier to entry** for existing Maximo customers (~$37K/year starting)
- **Fast setup** with Essentials wizard-based onboarding (weeks, not months)
- **Part of the MAS ecosystem** — benefits from Health, Predict, Monitor data integration
- **Multi-ERP support** — also works with SAP, Oracle if you have mixed environments
- **IBM enterprise support** — single vendor for EAM + optimization

**Weaknesses:**
- **No multi-echelon optimization (MEO)** — single-environment optimization only; cannot optimize across distribution network tiers
- **Limited what-if analysis** compared to Baxter Planning and Kinaxis
- **No duplicate material detection** — Verusen excels here
- **Essentials is feature-limited** — most advanced features (demand forecasting, criticality, what-if) require Standard package at higher cost
- **10,000 item record limit** on Essentials may be restrictive for large operations
- **Newer product** — less mature than Syncron or Servigistics which have decades of spare parts specialization
- **Watson Discovery integration discontinued** — some AI capabilities were removed during product evolution

---

### 7.5 Decision Framework: When to Choose IBM vs Competitors

| Scenario | Best Choice | Why |
|----------|------------|-----|
| **Already on MAS 9, want quick win** | **IBM MRO IO Essentials** | Lowest cost, fastest setup, native integration |
| **Complex multi-echelon distribution network** | **PTC Servigistics** or **Syncron** | IBM lacks MEO; these specialize in network optimization |
| **Dirty data, multiple ERP systems** | **Verusen** | No data cleansing needed; ingests from any system |
| **Financial-outcome-driven optimization** | **Baxter Planning** | TCO methodology optimizes total cost, not just service levels |
| **Aftermarket/dealer network** | **Syncron** | Purpose-built for aftermarket intermittent demand |
| **Full ERP replacement planned** | **IFS Cloud** or **Infor CloudSuite** | Integrated spare parts planning within ERP |
| **S&OP + inventory planning together** | **Kinaxis** | Unified planning platform; MRO is one component |
| **MAS 9 + need best-of-breed optimization** | **IBM MRO IO (Standard) + Verusen** | IBM for ROP/MAX; Verusen for data quality and duplicate detection |

---

### 7.6 Recommendation for MAS 9 Customers

**For your upgrade from 7.6.1.3 to MAS 9, the recommended approach is:**

1. **Start with IBM MRO IO Essentials** ($3,094/month) — it integrates natively with Manage, requires minimal setup, and provides immediate ROP/MAX optimization value
2. **Pilot for 3 months** on a single storeroom with 500-2,000 items
3. **Measure ROI** against your current third-party tool: excess inventory reduction, stockout prevention, service level improvement
4. **Evaluate gaps** — if you need multi-echelon optimization, advanced what-if, or duplicate detection, consider:
   - Upgrading to IBM MRO IO Standard for advanced features
   - Adding Verusen for data quality and duplicate detection (complementary, not competitive)
   - Evaluating Syncron or Servigistics only if your distribution network complexity demands true MEO
5. **Leverage the full MAS ecosystem** — combine MRO IO with Predict (failure-driven demand) and Health (criticality-based stocking) for maximum optimization

**Important:** If your current third-party tool provides strong multi-echelon optimization and you have a complex distribution network, IBM MRO IO may not fully replace it. In that case, consider running IBM MRO IO alongside your existing tool, using IBM for Manage-integrated optimization and your current tool for network-level planning.

---

## PART SIX: Phased Implementation Roadmap

### 8.1 Phase 1: Foundation — Core Manage Supply Chain (Months 1-3)

**Objective:** Stabilize core supply chain operations on MAS 9 post-upgrade

| # | Activity | Duration | Owner | Deliverable |
|---|----------|----------|-------|-------------|
| 1 | Validate all inventory data migrated correctly (balances, ROP, MAX, costs) | 2 weeks | Inventory Team | Migration validation report |
| 2 | Test all inventory transactions (issue, receipt, transfer, return, adjustment) | 1 week | Storeroom Clerks + QA | Transaction test results |
| 3 | Verify count books and cycle counting functionality | 1 week | Inventory Team | Count book test results |
| 4 | Validate procurement workflow (PR → PO → Receipt → Invoice) | 2 weeks | Procurement Team | End-to-end procurement test |
| 5 | Test all contract types in use (purchase, blanket, service, warranty) | 1 week | Contracts Team | Contract validation report |
| 6 | Inventory all 7.6 Work Center customizations and classify gaps | 2 weeks | App Config Team | WC-to-RBA gap analysis |
| 7 | Configure Inventory Count RBA, Issues/Transfers RBA, Receiving RBA | 2 weeks | App Config Team | RBA configuration complete |
| 8 | Recreate critical inventory BIRT reports in Cognos | 3 weeks | Reporting Team | Priority reports migrated |
| 9 | Set up security groups for supply chain roles in MAS 9 | 1 week | Security Team | Role-based access configured |
| 10 | Train supply chain users on Carbon Design System navigation | 1 week | Training Lead | Training sessions delivered |

---

### 8.2 Phase 2: Mobilize — Maximo Mobile Rollout (Months 2-5)

**Objective:** Deploy mobile apps to storeroom and field personnel

| # | Activity | Duration | Owner | Deliverable |
|---|----------|----------|-------|-------------|
| 1 | Configure Issues and Transfers mobile app | 1 week | Mobile Team | App configured and tested |
| 2 | Configure Inventory Count mobile app | 1 week | Mobile Team | App configured and tested |
| 3 | Configure Inventory Receiving mobile app | 1 week | Mobile Team | App configured and tested |
| 4 | Pilot mobile apps with 5-10 storeroom clerks | 3 weeks | Storeroom Lead + Mobile Team | Pilot feedback report |
| 5 | Configure offline sync scope and data download rules | 1 week | Mobile Team + IT | Sync configuration complete |
| 6 | Configure barcode scanning for items, bins, and locations | 1 week | Mobile Team | Barcode scanning operational |
| 7 | Test offline scenarios (count, issue, receive without connectivity) | 1 week | QA Team | Offline test results |
| 8 | Full rollout to all storeroom and receiving personnel | 2 weeks | Training Lead | All users trained and deployed |
| 9 | Configure Technician app material features for field workers | 1 week | Mobile Team | Field material features live |

---

### 8.3 Phase 3: Optimize — MRO Inventory Optimization (Months 3-6)

**Objective:** Pilot and evaluate AI-powered inventory optimization

| # | Activity | Duration | Owner | Deliverable |
|---|----------|----------|-------|-------------|
| 1 | Contact IBM for MRO Inventory Optimization demo/trial | 2 hours | Supply Management Lead | Demo scheduled |
| 2 | Export current inventory data (items, ROP, MAX, usage history, PO history) | 1 week | Inventory Team + IT | Data export complete |
| 3 | Identify pilot storeroom (500-2,000 items, representative mix) | 1 day | Inventory Manager | Pilot storeroom selected |
| 4 | Evaluate Essentials vs. Standard package needs | 2 days | Supply Management Lead + Finance | Package recommendation |
| 5 | Configure Essentials; connect to Manage via API | 1-2 weeks | IBM + IT | Connection live; data flowing |
| 6 | Run 3-month pilot on pilot storeroom | 3 months | Inventory Team | Optimization recommendations |
| 7 | Compare AI recommendations vs. current ROP/MAX values | 1 week | Inventory Team | Gap analysis report |
| 8 | Calculate ROI: excess reduction + stockout prevention + service level | 1 week | Finance + Inventory | ROI business case |
| 9 | Compare IBM MRO IO vs. your current third-party optimization tool | 2 weeks | Supply Management Lead | Competitive comparison |
| 10 | Go/no-go decision on Standard package and full rollout | 1 day | Supply Management Lead + Finance | Decision documented |

---

### 8.4 Phase 4: Intelligence — AI & Suite Add-Ons (Months 4-9)

**Objective:** Activate AI and suite applications for supply chain intelligence

| # | Activity | Duration | Owner | Deliverable |
|---|----------|----------|-------|-------------|
| 1 | Evaluate AI Assist for supply chain use cases (material recommendations, search) | 2 weeks | Supply Management Lead + IT | Use case evaluation report |
| 2 | Pilot AI Assist with procurement and inventory teams | 4 weeks | Pilot Group | Pilot results |
| 3 | Evaluate Parts Identifier for field worker material identification | 2 weeks | Field Operations Lead | Parts Identifier assessment |
| 4 | If Maximo Predict deployed: configure failure-driven material demand signals | 4 weeks | Reliability Team + Inventory | Predictive supply chain configured |
| 5 | If Maximo Health deployed: integrate health scores with criticality-based stocking | 2 weeks | Reliability Team + Inventory | Health-driven stocking rules |
| 6 | If Maximo Monitor deployed: configure IoT-triggered material reorders | 4 weeks | IoT Team + Inventory | Condition-based reorders active |
| 7 | If Maximo Optimizer deployed: enable material-aware scheduling | 2 weeks | Planning Team + Inventory | Material-aware scheduling live |

---

### 8.5 Phase 5: Advanced — Full Integration (Months 6-12)

**Objective:** Achieve fully integrated, AI-powered supply chain management

| # | Activity | Duration | Owner | Deliverable |
|---|----------|----------|-------|-------------|
| 1 | Full MRO IO rollout to all storerooms (if approved in Phase 3) | 2-3 months | Inventory Team | All storerooms optimized |
| 2 | Configure automation workflows to auto-apply approved ROP/MAX recommendations | 2 weeks | Inventory Team + IT | Automation active |
| 3 | Build integrated supply chain dashboards (inventory performance, stockout trends, excess tracking) | 4 weeks | Reporting Team | Dashboards live |
| 4 | Integrate Predict → MRO IO → Manage pipeline for predictive supply chain | 4 weeks | IT + Reliability + Inventory | Predictive pipeline active |
| 5 | Conduct full competitive evaluation: keep, replace, or complement current third-party optimization tool | 2 weeks | Supply Management Lead | Final recommendation |
| 6 | Establish ongoing optimization cycle: quarterly ROP/MAX review, ABC analysis refresh, count frequency adjustment | Ongoing | Inventory Manager | Operating procedures documented |
| 7 | Train all supply chain users on the complete MAS 9 supply chain ecosystem | 2 weeks | Training Lead | Training program complete |

---

## 9. Team Exploration Assignment Matrix

| # | Topic Area | Recommended Team Size | Estimated Effort | Skills Needed |
|---|------------|----------------------|-----------------|---------------|
| 1 | Core Inventory Module (transactions, balances, costs) | 2-3 | 40 hours | Inventory management, Maximo functional |
| 2 | Item Master & Item Configuration (types, specs, cross-refs) | 1-2 | 20 hours | Item data governance, Maximo admin |
| 3 | Count Books & Cycle Counting (RBA + mobile) | 1-2 | 20 hours | Inventory counting, barcode scanning |
| 4 | Procurement Module (PR, PO, RFQ, Desktop Req) | 2-3 | 40 hours | Procurement, purchasing workflows |
| 5 | Contracts Module (all 9 types) | 1-2 | 30 hours | Contract management, vendor relations |
| 6 | Receiving & Inspection (RBA + mobile) | 1-2 | 20 hours | Warehouse operations, receiving |
| 7 | Maximo Mobile (Issues, Count, Receiving) | 2-3 | 40 hours | Mobile device management, field operations |
| 8 | MRO Inventory Optimization (Essentials pilot) | 2-3 | 60 hours | Inventory analysis, data analysis, supply chain |
| 9 | AI Assist for Supply Chain | 1-2 | 20 hours | AI/ML concepts, procurement workflows |
| 10 | Parts Identifier | 1 | 10 hours | Field operations, item identification |
| 11 | Maximo Health/Predict/Monitor integration with Supply Chain | 2-3 | 40 hours | Reliability engineering, IoT, data analytics |
| 12 | Competitive Analysis (MRO IO vs current tool) | 1-2 | 30 hours | Vendor evaluation, cost-benefit analysis |
| 13 | Reporting Migration (BIRT to Cognos for supply chain reports) | 1-2 | 40 hours | BIRT knowledge, Cognos authoring |
| 14 | Security & Access Control for Supply Chain roles | 1 | 15 hours | Maximo security administration |

**Total estimated effort:** ~425 hours across 14 topic areas

---

## 10. References & Resources

### IBM Official Documentation

| Resource | URL |
|----------|-----|
| IBM Docs — MAS | https://www.ibm.com/docs/en/mas |
| MAS Support Resources | https://www.ibm.com/support/pages/maximo-application-suite-support-resources-home-0 |
| MAS Release Information | https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 |
| MRO Inventory Optimization Product Page | https://www.ibm.com/products/maximo/mro-inventory-optimization |
| IBM Developer — Maximo | https://developer.ibm.com/components/maximo/ |
| Maximo Developer Reference Guide | https://www.ibm.com/support/pages/maximo-developer-reference-guide |

### IBM Training & Certification

| Resource | URL |
|----------|-----|
| Free Maximo Education & Open Badges | https://www.ibm.com/support/pages/free-maximo-education-and-open-badges |
| IBM SkillsBuild | https://skillsbuild.org/ |
| IBM Certification — Maximo Manage v9.0 | https://www.credly.com/organizations/ibm-professional-certification-program/badges |

### Community Resources

| Resource | URL | Specialty |
|----------|-----|-----------|
| Maximo Secrets | https://maximosecrets.com/ | Maximo Manage functional (350+ articles) |
| Interloc Solutions Blog | https://www.interlocsolutions.com/blog | MAS, Mobile, Spatial, Certifications |
| MORE Community | https://moremaximo.com/home | Community resources, free training |
| Maximo Times | https://www.maximotimes.com/ | Technical articles, BIRT |

### Competitor Resources

| Vendor | Resource |
|--------|----------|
| Syncron | https://www.syncron.com/ |
| Baxter Planning / Kinaxis | https://www.kinaxis.com/ |
| PTC Servigistics | https://www.ptc.com/en/products/servigistics |
| IFS | https://www.ifs.com/ |
| Infor | https://www.infor.com/ |
| Verusen | https://www.verusen.com/ |

### Related Project Documents

| Document | Scope |
|----------|-------|
| DOC1 — MAS 9 Manage Upgrade Roadmap | Manage-specific upgrade changes (architecture, UI, RBAs, mobile, security, automation, integrations) |
| DOC2 — MAS Application Suite Add-Ons Roadmap | MAS suite applications (Health, Predict, Monitor, Visual Inspection, AI Assist, Optimizer, Parts Identifier) |
| DOC3 — MAS 9 Paid Add-Ons & Industry Solutions | All paid add-ons (MRO IO, HSE, Spatial, Service Provider, ACM, Renewables, TRIRIGA, Industry Solutions) |

---

**Document Status:** Version 1.0 — Complete
**Last Updated:** March 12, 2026
**Next Review:** After MRO Inventory Optimization pilot completion (estimated Month 6)
