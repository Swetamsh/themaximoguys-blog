# MAS 9 Paid Add-Ons & Industry Solutions: Team Exploration Roadmap

**Document:** DOC3 - Paid Add-Ons and Industry Solutions
**Version:** 1.0
**Date:** March 2, 2026
**Audience:** Technical teams, architects, project managers, and business stakeholders upgrading from Maximo 7.6 to MAS 9
**Scope:** Paid add-on modules and industry-specific solutions that require additional licensing beyond base Manage. Complements DOC1 (Manage Upgrade) and DOC2 (Suite Add-On Applications).

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [What's Now Included vs. Still Paid](#2-whats-now-included-vs-still-paid)
3. [MRO Inventory Optimization](#3-mro-inventory-optimization)
4. [Health, Safety & Environment Manager (HSE)](#4-health-safety--environment-manager-hse)
5. [Maximo Spatial](#5-maximo-spatial)
6. [Service Provider](#6-service-provider)
7. [Asset Configuration Manager (ACM) / Complex Assets](#7-asset-configuration-manager-acm--complex-assets)
8. [Maximo IT (formerly IBM Control Desk)](#8-maximo-it-formerly-ibm-control-desk)
9. [Maximo Renewables](#9-maximo-renewables)
10. [Maximo Real Estate & Facilities (TRIRIGA)](#10-maximo-real-estate--facilities-tririga)
11. [Industry Solution: Aviation](#11-industry-solution-aviation)
12. [Industry Solution: Transportation](#12-industry-solution-transportation)
13. [Industry Solution: Utilities](#13-industry-solution-utilities)
14. [Industry Solution: Oil & Gas](#14-industry-solution-oil--gas)
15. [Industry Solution: Nuclear](#15-industry-solution-nuclear)
16. [Industry Solution: Civil Infrastructure](#16-industry-solution-civil-infrastructure)
17. [AppPoints Licensing for Add-Ons & Industry Solutions](#17-apppoints-licensing-for-add-ons--industry-solutions)
18. [What Changed From 7.6 to MAS 9 for Each Add-On](#18-what-changed-from-76-to-mas-9-for-each-add-on)
19. [Implementation Prioritization Matrix](#19-implementation-prioritization-matrix)
20. [Team Exploration Assignment Matrix](#20-team-exploration-assignment-matrix)
21. [References & Resources](#21-references--resources)

---

## 1. Executive Summary

### What This Document Covers

When your organization purchased Maximo 7.6 licenses, add-on modules like Calibration, Linear Assets, and Scheduler required separate license purchases. With MAS 9, IBM restructured the licensing model significantly:

- **Some previously paid add-ons are NOW INCLUDED** in base Manage (Calibration, Linear, Mobile, Scheduler, Reliability Strategies)
- **Other add-ons remain separately licensed** (HSE, Spatial, Service Provider, ACM, Maximo IT, Optimizer)
- **Industry solutions still require Premium-tier licensing** (Aviation, Transportation, Utilities, Oil & Gas, Nuclear, Civil Infrastructure)
- **New products were introduced** that didn't exist in 7.6 (MRO Inventory Optimization, Renewables, Real Estate & Facilities/TRIRIGA)

This document provides a deep dive into every paid add-on and industry solution available in MAS 9, helping your team understand what each one does, whether you need it, and how to evaluate it.

### Relationship to DOC1 and DOC2

| Document | Covers |
|---|---|
| **DOC1** | Manage core upgrade changes (navigation, RBAs, scheduling, mobile, integration, security) |
| **DOC2** | MAS Suite applications (Health, Monitor, Predict, Visual Inspection, AI Assist, Optimizer) |
| **DOC3 (this doc)** | Paid add-on modules + industry-specific solutions + new products (Inventory Optimization, Renewables, TRIRIGA) |

**Note:** Maximo Optimizer is covered in DOC2 as a MAS Suite application. It is listed here only in the licensing context.

---

## 2. What's Now Included vs. Still Paid

This is one of the most important changes from 7.6 to MAS 9. Understanding what's included saves your organization from purchasing licenses you already have.

### Previously Paid, NOW INCLUDED in Base Manage

| Module | What It Does | 7.6 Status | MAS 9 Status |
|---|---|---|---|
| **Calibration** | Instrument and loop calibration with tolerance tracking | Separate license | INCLUDED -- no extra AppPoints |
| **Linear Assets** | Manage assets by measured distance (pipelines, roads, rail) | Separate license | INCLUDED -- no extra AppPoints |
| **Maximo Mobile** | Online/offline mobile work execution | Separate license (Anywhere) | INCLUDED -- rebuilt as Maximo Mobile |
| **Scheduler** | 8 graphical scheduling applications | Separate license | INCLUDED -- no extra AppPoints |
| **Reliability Strategies** | RCM library of 800+ asset types, 58K failure modes | Did not exist | INCLUDED -- requires installation but no AppPoints |

**What this means for your team:** If you were paying separately for Calibration, Linear, Mobile (Anywhere), or Scheduler in 7.6, those costs are now absorbed into your base Manage AppPoints. You should verify your AppPoints allocation reflects this consolidation.

### Still Requires Separate Licensing / Additional AppPoints

| Module | Type | Details |
|---|---|---|
| **MRO Inventory Optimization** | Cloud SaaS add-on | Separate subscription ($3,094+/month) |
| **HSE (Health, Safety & Environment)** | Manage add-on | Additional AppPoints |
| **Spatial** | Manage add-on | Additional AppPoints |
| **Service Provider** | Manage add-on | Additional AppPoints |
| **Asset Configuration Manager (ACM)** | Manage add-on | Additional AppPoints |
| **Maximo IT** | Separate product | Separate licensing (not unified) |
| **Maximo Optimizer** | Suite application | Additional AppPoints (see DOC2) |
| **Renewables** | Suite application | Additional AppPoints |
| **Real Estate & Facilities** | Suite application (new in 9.1) | Additional AppPoints |
| **Aviation** | Industry solution | Requires Premium tier |
| **Transportation** | Industry solution | Requires Premium tier |
| **Utilities** | Industry solution | Requires Premium tier |
| **Oil & Gas** | Industry solution | Requires Premium tier |
| **Nuclear** | Industry solution | Requires Premium tier |
| **Civil Infrastructure** | Industry solution | Requires Premium tier |

---

## 3. MRO Inventory Optimization

### Overview

IBM Maximo MRO Inventory Optimization is a **cloud-based SaaS solution** (not deployed on your OpenShift cluster) that uses AI-powered algorithms to optimize spare parts inventory. This is a completely new product that had **no equivalent in Maximo 7.6**.

### Why It Matters

Most organizations carry 20-40% more MRO inventory than needed, while simultaneously experiencing stockouts on critical parts. Inventory Optimization uses statistical analysis, prescriptive analytics, and AI to find the balance.

### Key Features

| Feature | Description |
|---|---|
| **ROP/MAX Recommendations** | AI-calculated Reorder Point and Maximum stock levels for every item |
| **Stockout Detection** | Identifies items at risk of running out before next delivery |
| **Excess Inventory Identification** | Flags slow-moving, potentially obsolete, and over-stocked items |
| **Demand Forecasting** | AI-powered prediction of future parts usage based on historical patterns |
| **Criticality Analysis** | Considers asset criticality when recommending stock levels |
| **Lead Time Analysis** | Factors in supplier lead times and variability |
| **Service Level Analysis** | Balances stock levels against target service levels |
| **What-If Analysis** | Model scenarios (budget cuts, demand spikes) before committing |
| **Baseline Analysis** | Compare current inventory against optimized recommendations |
| **AI Smart Review** | Automated review and approval of optimization recommendations |
| **Quick Reports & Dashboards** | Pre-built analytics for inventory performance tracking |
| **Automation Workflows** | Auto-apply approved recommendations to Manage |

### Package Options

| Edition | Monthly Cost | Inventory Capacity | Best For |
|---|---|---|---|
| **Essentials** | Starting at $3,094/month | Up to $50M inventory value | Smaller inventories, getting started |
| **Standard** | Custom pricing | Unlimited | Enterprise-scale, advanced features |

**Essentials includes:** ROP/MAX recommendations, industry-standard filters, prioritized alerts, wizard-based setup (near zero configuration), onboarding training.

**Standard adds:** Automated continuous monitoring, configurable work queues, automation workflows, AI smart review, service level analysis, criticality analysis, lead time analysis, demand forecasting, what-if analysis, quick reports, baseline analysis.

### Integration with Manage

- Connects to Maximo Manage via API
- Reads inventory data, work order history, purchase history
- Pushes optimized ROP/MAX values back to item master
- Also integrates with SAP, Oracle, and other ERP systems

### Industry Applications

| Industry | Use Case |
|---|---|
| **Energy/Utilities** | Optimize spare parts for generation, transmission, distribution assets |
| **Manufacturing** | Balance fluctuating production demand with maintenance needs |
| **Mining** | Share critical spares across regional sites, reduce carrying costs |
| **Oil & Gas** | Streamline refinery and production MRO supply chain |
| **Transportation** | Track fleet parts, reduce maintenance operating costs |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Contact IBM for Inventory Optimization demo/trial | 2 hours | Project lead |
| 2 | Export current inventory data (items, ROP, MAX, usage history) | 8 hours | Inventory team |
| 3 | Identify pilot storeroom with 500-2,000 items | 4 hours | Inventory manager |
| 4 | Evaluate Essentials vs. Standard package needs | 4 hours | Project lead + Finance |
| 5 | Run pilot with Essentials edition for 3 months | Ongoing | Inventory team |
| 6 | Compare AI recommendations vs. current ROP/MAX values | 8 hours | Inventory team |
| 7 | Calculate ROI: excess inventory reduction + stockout prevention | 8 hours | Finance + Inventory |

---

## 4. Health, Safety & Environment Manager (HSE)

### Overview

HSE is a **major add-on** with more than 50 applications. It unifies health, safety, and environmental processes with core work management. In 7.6, HSE was a large add-on (HSE 7.6.1); in MAS 9 it has been modernized but retains its comprehensive scope.

### Key Modules

#### 4.1 Incident Management
| Feature | Description |
|---|---|
| **Incident Reporting** | Capture incidents, near-misses, observations from any device |
| **Investigation Workflow** | Root cause analysis, contributing factors, corrective actions |
| **Hazard Identification** | Log and track workplace hazards |
| **Corrective Action Tracking** | Assign, track, verify completion of corrective actions |
| **Trend Analysis** | Identify incident patterns across locations, asset types, time periods |

#### 4.2 Permit to Work
| Feature | Description |
|---|---|
| **Permit Management** | Create, approve, issue, close work permits |
| **Lockout/Tagout (LOTO)** | Manage energy isolation procedures |
| **Clearance Management** | Track safety clearances linked to work orders |
| **Risk Assessment** | Associate risk assessments with permits |
| **Certification Tracking** | Ensure only certified workers perform permitted activities |

#### 4.3 Emissions Management
| Feature | Description |
|---|---|
| **Continuous Emissions** | Track and report continuous emission sources |
| **Fugitive Emissions** | Detect, record, repair fugitive emission leaks |
| **Scope 1, 2, 3 GHG** | Calculate greenhouse gas emissions with Envizi integration |
| **Emission Dashboard** | Operational Dashboard with emission KPIs (MAS 9.0+) |
| **Regulatory Reporting** | Generate compliance reports for EPA and regional regulators |

#### 4.4 Operations Management
| Feature | Description |
|---|---|
| **Shift Handover** | Structured handover process between shifts |
| **Operator Rounds** | Scheduled inspection rounds with checklists |
| **Production Loss Reporting** | Track and report production losses linked to incidents |
| **Operator Logs** | Digital logbooks linked to assets and work orders |

#### 4.5 Management of Change (MOC)
| Feature | Description |
|---|---|
| **Change Lifecycle** | Initiation → Assessment → Approval → Implementation → Closure |
| **Risk Assessment** | Evaluate change impact on safety, environment, operations |
| **Asset Association** | Link changes to multiple assets, locations, configuration items |
| **Compliance Tracking** | Ensure changes meet regulatory requirements |

#### 4.6 Workforce Competency
| Feature | Description |
|---|---|
| **Skills Matrix** | Map skills, certifications, training per worker |
| **Certification Tracking** | Expiry dates, renewal requirements, compliance status |
| **Training Management** | Course management, completion tracking, competency validation |
| **Lessons Learned** | Capture and share lessons from incidents and near-misses |

### Integration with Manage

HSE integrates deeply with core Manage:
- Incidents can generate work orders automatically
- Permits link directly to work orders and assets
- LOTO procedures are associated with safety plans on work orders
- Emissions data feeds Operational Dashboard KPIs
- Competency data drives labor assignment qualification checks

### Industries That Benefit Most

| Industry | Primary HSE Use Cases |
|---|---|
| **Oil & Gas** | Permit to work, MOC, emissions, process safety |
| **Mining** | Incident management, competency, safety inspections |
| **Chemicals** | Emissions, MOC, LOTO, regulatory compliance |
| **Manufacturing** | Incident reporting, safety rounds, competency |
| **Utilities** | Environmental compliance, shift handover, emissions |
| **Nuclear** | Clearances, radiation safety, regulatory compliance |

### What Changed from 7.6

| Aspect | 7.6 HSE | MAS 9 HSE |
|---|---|---|
| **Deployment** | On-premises, same database | Containerized on OpenShift |
| **UI** | Classic Maximo UI | Carbon Design System |
| **Emissions Dashboard** | Custom reports | Built-in Operational Dashboard cards |
| **Envizi Integration** | Not available | Native ESG reporting integration |
| **Mobile** | Maximo Anywhere (if configured) | Maximo Mobile (included) |
| **AI** | None | watsonx.ai trend analysis (9.1) |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Assess current HSE processes (paper-based? Separate system?) | 16 hours | Safety team |
| 2 | Map existing incident types to HSE incident categories | 8 hours | Safety lead |
| 3 | Configure pilot: Incident Management module | 24 hours | Admin + Safety |
| 4 | Configure pilot: Permit to Work for one site | 24 hours | Admin + Operations |
| 5 | Set up Emissions Management for key emission sources | 16 hours | Environmental team |
| 6 | Configure Emission Dashboard on Operational Dashboard | 8 hours | Admin |
| 7 | Test MOC workflow for engineering change scenario | 16 hours | Engineering + Safety |
| 8 | Evaluate Envizi integration for ESG reporting needs | 8 hours | Sustainability team |

---

## 5. Maximo Spatial

### Overview

Maximo Spatial enables GIS (Geographic Information System) integration, allowing assets, work orders, and service addresses to be visualized on maps with full geospatial context. In 7.6, Spatial was a separate add-on; in MAS 9 it remains an add-on but with enhanced integration.

### Key Features

| Feature | Description |
|---|---|
| **GIS Map Integration** | Display assets, locations, work orders on interactive maps |
| **ArcGIS Integration** | Connect to Esri ArcGIS Online/Enterprise for enterprise GIS |
| **Dynamic Segmentation** | Visualize linear asset segments with color-coded attributes |
| **Asset Location Editing** | Update asset coordinates directly from map interface |
| **Service Address Mapping** | Map all service addresses for spatial scheduling |
| **Route Optimization** | Calculate optimal technician routes (with Optimizer) |
| **Travel Time Matrix** | Generate travel time calculations between service addresses |
| **Map-Based Work Creation** | Create work orders by clicking on map locations |
| **Spatial Queries** | Find assets within geographic areas (radius, polygon) |
| **Layer Management** | Overlay multiple data layers (assets, work, hazards, weather) |

### Integration with Other Modules

| Module | Spatial Integration |
|---|---|
| **Manage** | Assets and locations displayed on maps throughout applications |
| **Optimizer** | Travel time calculations for schedule optimization |
| **Mobile** | Technician route maps, location-based asset discovery |
| **Health** | Geographic health score visualization |
| **Linear Assets** | Dynamic segmentation for pipelines, roads, rail |

### Prerequisites

- Esri ArcGIS Online account or ArcGIS Enterprise server
- Latitude/longitude coordinates populated for assets and service addresses
- Map Manager configuration in Manage
- Web maps created in ArcGIS defining geographic scope

### What Changed from 7.6

| Aspect | 7.6 Spatial | MAS 9 Spatial |
|---|---|---|
| **Map Provider** | Bing Maps, Google Maps, Esri | **OpenMap primary**, ArcGIS for enterprise (Bing/Google deprecated) |
| **Mobile Maps** | Limited Anywhere integration | Full Maximo Mobile map integration |
| **Spatial Scheduling** | Basic | Advanced with Optimizer travel time matrix |
| **UI Integration** | Separate spatial applications | Maps embedded throughout Manage applications |

### Industries That Benefit Most

| Industry | Primary Spatial Use Cases |
|---|---|
| **Utilities** | Grid visualization, outage response, distribution asset mapping |
| **Transportation** | Road/rail network visualization, route planning |
| **Oil & Gas** | Pipeline mapping, well site management |
| **Water/Wastewater** | Distribution/collection network management |
| **Telecommunications** | Network infrastructure mapping |
| **Government/Municipal** | Public asset inventory, facility management |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Assess current GIS infrastructure (ArcGIS? Google Maps?) | 4 hours | GIS team |
| 2 | Verify asset coordinate data quality | 8 hours | Data team |
| 3 | Set up ArcGIS Online account or verify Enterprise access | 4 hours | GIS admin |
| 4 | Configure Map Manager in Manage | 8 hours | Admin |
| 5 | Create web map for primary service area | 8 hours | GIS team |
| 6 | Test map integration in Work Order Tracking | 4 hours | Planner |
| 7 | Configure dynamic segmentation for linear assets (if applicable) | 16 hours | GIS + Linear team |
| 8 | Test spatial scheduling with Optimizer | 16 hours | Scheduler + GIS |

---

## 6. Service Provider

### Overview

Maximo Service Provider extends Manage to support organizations that provide maintenance services to external customers. It enables multi-tenancy, customer-specific configurations, SLA management, and billing. In 7.6, Service Provider existed as an add-on; in MAS 9 it continues with modernized capabilities.

### Key Features

| Feature | Description |
|---|---|
| **Multi-Tenancy** | Serve multiple customers from a single Maximo instance |
| **Customer Agreements** | Define SLAs, pricing, terms per customer |
| **Billing & Invoicing** | Generate invoices based on work performed, materials used, time spent |
| **Customer Portals** | Provide customers with self-service access to their assets and work |
| **SLA Tracking** | Monitor service level compliance with automated escalations |
| **Response Time Management** | Track first response and resolution times against SLA targets |
| **Customer-Specific Config** | Separate configurations, workflows, and approval rules per customer |
| **Contract Management** | Manage service contracts with pricing tiers and renewal tracking |

### Use Cases

| Scenario | How Service Provider Helps |
|---|---|
| **Facilities Management Company** | Manage multiple client buildings from one Manage instance |
| **Equipment OEM** | Provide post-sale maintenance services with SLA tracking |
| **Managed Services Provider** | Deliver outsourced maintenance with customer billing |
| **Government Contractor** | Track work against government contracts with compliance |

### What Changed from 7.6

| Aspect | 7.6 | MAS 9 |
|---|---|---|
| **Customer Access** | Classic UI portal | Carbon Design System + mobile access |
| **Billing** | Standard billing | Enhanced with Operational Dashboard KPIs |
| **SLA Monitoring** | Basic escalations | Work Queue-based SLA tracking |
| **Reporting** | BIRT reports | Cognos + Dashboard KPIs |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Identify if your organization provides services to external customers | 2 hours | Business analyst |
| 2 | Map current customer agreements to Service Provider model | 8 hours | Business analyst |
| 3 | Configure pilot customer with agreement and SLA | 16 hours | Admin |
| 4 | Test billing workflow for sample work orders | 8 hours | Finance + Admin |
| 5 | Evaluate customer portal requirements | 8 hours | Business analyst |

---

## 7. Asset Configuration Manager (ACM) / Complex Assets

### Overview

Asset Configuration Manager (ACM) manages high-value, complex, regulated assets where you need to track the difference between "as-designed" (what the manufacturer specified) and "as-built" / "as-maintained" (what's actually installed). This is critical for aviation, rail, defense, and any industry with serialized, configuration-controlled assets.

**In MAS 9, "Complex Assets" = ACM.** It's Maximo Aviation with aviation-specific terminology generalized for any complex asset industry.

### Key Features

| Feature | Description |
|---|---|
| **Configuration Management** | Track as-designed vs. as-built vs. as-maintained configurations |
| **Bill of Materials (BOM)** | Hierarchical BOM with serial number tracking at every level |
| **Design Change Management** | Track engineering changes from design through implementation |
| **Operator Maintenance Program** | Define and manage maintenance programs per asset configuration |
| **Technical Log** | Centralized recording of asset's operational lifecycle |
| **Compliance Tracking** | Monitor regulatory compliance status for each configuration |
| **Serialized Parts** | Track individual serialized components through their lifecycle |
| **MSG-3 Support** | Maintenance Steering Group standard for aviation maintenance |
| **Airworthiness Directives** | Track and manage regulatory directives (aviation-specific) |
| **Service Bulletins** | Manage manufacturer service bulletins and compliance |

### Who Needs ACM

| Industry | Why ACM is Needed |
|---|---|
| **Aviation** | FAA/EASA regulatory compliance, airworthiness tracking |
| **Rail/Transit** | Fleet configuration management, regulatory compliance |
| **Defense** | Weapon system configuration, readiness tracking |
| **Medical Devices** | FDA compliance, device configuration tracking |
| **Complex Manufacturing** | Serial number tracking through manufacturing lifecycle |

### What Changed from 7.6

| Aspect | 7.6 | MAS 9 |
|---|---|---|
| **Name** | ACM + Aviation (separate products) | Unified as Complex Assets / ACM |
| **UI** | Classic Maximo | Carbon Design System |
| **Mobile** | Limited | Full Maximo Mobile support |
| **Integration** | MIF-based | REST API + MIF |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Identify assets requiring configuration management | 8 hours | Engineering |
| 2 | Map current configuration tracking process to ACM model | 16 hours | Engineering + Admin |
| 3 | Configure pilot asset with BOM hierarchy | 16 hours | Admin |
| 4 | Test design change workflow | 8 hours | Engineering |
| 5 | Evaluate regulatory compliance tracking needs | 8 hours | Compliance team |

---

## 8. Maximo IT (formerly IBM Control Desk)

### Overview

Maximo IT provides IT Service Management (ITSM) capabilities within the Maximo platform. It was previously a standalone product called IBM Control Desk (ICD). In MAS 9.1, it's integrated into the MAS ecosystem but maintains **separate licensing** from other Manage add-ons.

### Key Features

| Feature | Description |
|---|---|
| **IT Asset Management** | Track IT hardware, software, and configuration items |
| **Service Desk** | Incident management, problem management, request fulfillment |
| **Change Management** | IT change advisory board (CAB) workflows |
| **CMDB** | Configuration Management Database for IT infrastructure |
| **Software License Management** | Track software installations, compliance, entitlements |
| **Knowledge Management** | Self-service knowledge base for common IT issues |
| **Service Catalog** | Self-service request portal for IT services |
| **SLA Management** | IT service level tracking and compliance |

### What Changed from 7.6 / Control Desk

| Aspect | Control Desk (7.6 era) | Maximo IT (MAS 9) |
|---|---|---|
| **Branding** | IBM Control Desk (ICD) | Maximo IT |
| **Platform** | Standalone or Maximo add-on | Integrated into MAS |
| **UI** | Classic | Carbon Design System |
| **Licensing** | Separate product license | Separate within MAS (not unified AppPoints) |
| **Integration** | Custom integration with Maximo | Native MAS integration |

### Who Needs Maximo IT

Organizations that want to **unify OT (Operational Technology) and IT asset management** in a single platform. If you currently manage IT assets in ServiceNow, BMC Remedy, or a separate ITSM tool, Maximo IT offers consolidation.

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Assess current ITSM tooling and integration with Maximo | 8 hours | IT team |
| 2 | Evaluate business case for ITSM consolidation into MAS | 16 hours | IT + Management |
| 3 | If proceeding: configure pilot service desk | 24 hours | IT admin |
| 4 | Test CMDB integration with Manage asset data | 16 hours | IT + Manage admin |

---

## 9. Maximo Renewables

### Overview

Maximo Renewables is a **new product** (no 7.6 equivalent) designed specifically for renewable energy operators managing wind, solar, and battery storage assets. IBM acquired Prescinto to build this capability, bringing specialized renewable energy analytics into MAS.

### Key Modules

#### 9.1 Monitor Module
| Feature | Description |
|---|---|
| **Portfolio Map View** | Visualize all renewable sites on a single map |
| **Asset Health Overview** | Color-coded health status across wind farms, solar plants |
| **Real-Time Performance** | Near real-time generation vs. target metrics |
| **Multi-Site Comparison** | Compare performance across 70+ sites simultaneously |

#### 9.2 Analyze Module
| Feature | Description |
|---|---|
| **Pre-Trained Data Science Models** | AI models specifically trained for renewable energy performance |
| **Energy Loss Waterfall** | Cascading diagram showing where energy losses occur |
| **Root Cause Analysis** | AI identifies causes of underperformance (soiling, shading, degradation, etc.) |
| **Target vs. Actual Generation** | Gap analysis driving corrective work orders |
| **Condition-Based Maintenance** | Trigger maintenance based on performance degradation |

#### 9.3 Drone Thermography
| Feature | Description |
|---|---|
| **Thermal Image Analysis** | Detect hotspots, damaged cells, connection issues in solar panels |
| **Systemic Loss Detection** | Identify patterns of losses across panel arrays |
| **Automated Reporting** | Generate inspection reports from drone imagery |
| **Visual Integration** | Overlays thermal data on plant maps |

### Integration with MAS

- Renewable asset data feeds into **Manage** for work order generation
- Performance alerts integrate with **Monitor** for unified IoT dashboard
- Health scores can flow to **Health** for portfolio-wide asset scoring
- Predicted failures integrate with **Predict** for proactive maintenance

### Industries / Organizations That Benefit

| Organization Type | Use Case |
|---|---|
| **Wind Farm Operators** | Turbine performance optimization, downtime reduction |
| **Solar Farm Operators** | Panel efficiency monitoring, soiling detection, inverter health |
| **Battery Storage Operators** | Battery degradation tracking, capacity optimization |
| **IPPs (Independent Power Producers)** | Multi-technology portfolio management |
| **Utilities with Renewable Portfolio** | Renewable asset lifecycle management alongside traditional assets |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Assess renewable energy asset portfolio (wind/solar/battery) | 4 hours | Asset team |
| 2 | Request IBM Maximo Renewables demo | 2 hours | Project lead |
| 3 | Evaluate data availability: SCADA, weather, generation data | 8 hours | OT/IT team |
| 4 | Identify pilot site for Renewables deployment | 4 hours | Operations |
| 5 | Configure Monitor module for pilot site | 16 hours | Renewables team |
| 6 | Run Analyze module to identify performance gaps | 16 hours | Renewables + Analytics |
| 7 | Evaluate drone thermography for solar assets | 8 hours | Inspection team |

---

## 10. Maximo Real Estate & Facilities (TRIRIGA)

### Overview

**New in MAS 9.1**, Maximo Real Estate & Facilities Management (MREF) is the evolution of IBM TRIRIGA, the leading Integrated Workplace Management System (IWMS). TRIRIGA has been reimagined to run natively within MAS, enabling deep integration with Manage, Health, and Predict for unified building and asset operations.

### Key Modules

| Module | Description |
|---|---|
| **Space Management** | Office space utilization tracking, floor plans, occupancy |
| **Room & Desk Reservations** | Meeting room and desk booking (hot desking support) |
| **Move Management** | Plan and execute employee/department relocations |
| **Capital Planning / FCA** | Facility Condition Assessment, capital project planning |
| **Portfolio Analysis** | Evaluate real estate holdings for consolidation opportunities |
| **Lease Management** | Track commercial leases, renewals, terms, costs |
| **Sustainability** | Building energy management, carbon footprint tracking |
| **Workplace Experience** | Employee workplace experience and engagement tools |

### Integration with MAS

| Integration | Description |
|---|---|
| **Manage** | Facilities work orders generated from MREF, assets shared |
| **Health** | Building system health scores (HVAC, electrical, plumbing) |
| **Monitor** | Building IoT data (temperature, humidity, occupancy sensors) |
| **Envizi** | ESG/sustainability reporting for building operations |

### Who Needs MREF

| Organization Type | Why MREF Matters |
|---|---|
| **Large enterprises** | Manage corporate real estate portfolio alongside OT assets |
| **Government agencies** | Track public buildings, space utilization, compliance |
| **Healthcare** | Hospital space management, equipment + facility management unified |
| **Higher education** | Campus space management and maintenance coordination |
| **Retail** | Store portfolio management with maintenance |

### Team Exploration Tasks

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Assess current facilities management tooling | 8 hours | Facilities team |
| 2 | Evaluate TRIRIGA/MREF business case for your organization | 16 hours | Facilities + IT |
| 3 | Request IBM demo of MREF in MAS 9.1 | 2 hours | Project lead |
| 4 | Map current space management processes to MREF modules | 16 hours | Facilities team |
| 5 | Identify pilot building for MREF deployment | 4 hours | Facilities manager |

---

## 11. Industry Solution: Aviation

### Overview

Maximo for Aviation provides regulatory-compliant maintenance management for aircraft operators, MROs (Maintenance, Repair & Overhaul), and defense organizations. It includes ACM (Asset Configuration Manager), Service Provider, and aviation-specific modules.

### Key Features

| Feature | Description |
|---|---|
| **MSG-3 Maintenance Programs** | Define, manage, and track Maintenance Steering Group programs |
| **Airworthiness Directives** | Track AD compliance across fleet |
| **Service Bulletins** | Manage manufacturer SBs with compliance tracking |
| **Flight Log Book** | Digital flight and ground crew data entry |
| **Technical Log** | Centralized operational lifecycle recording per aircraft |
| **Configuration Management** | As-designed vs. as-built tracking for every component |
| **Progressive Inspections** | Schedule and track progressive inspection programs |
| **Maintenance Task Library** | Operator maintenance programs with task details |
| **Customer Agreements** | MRO contract management with terms and pricing |
| **Parts Traceability** | Complete serialized parts lifecycle tracking |

### Regulatory Framework Support

| Framework | Support |
|---|---|
| **FAA** | AD tracking, airworthiness compliance |
| **EASA** | European regulatory compliance |
| **MSG-3** | Industry standard maintenance program definition |
| **ICAO** | International aviation safety standards |

### Team Exploration Tasks (if applicable)

| # | Task | Effort |
|---|---|---|
| 1 | Map current aviation maintenance processes to Maximo Aviation modules | 24 hours |
| 2 | Configure pilot aircraft with BOM and configuration tracking | 24 hours |
| 3 | Set up MSG-3 inspection program for one aircraft type | 16 hours |
| 4 | Test AD/SB compliance tracking workflow | 16 hours |

---

## 12. Industry Solution: Transportation

### Overview

Maximo for Transportation provides fleet and infrastructure maintenance management for transit agencies, rail operators, and logistics companies.

### Key Features

| Feature | Description |
|---|---|
| **Fleet Management** | Vehicle/rolling stock lifecycle management |
| **Linear Asset Management** | Rail track, road, pipeline maintenance by distance |
| **Warranty Tracking** | Fleet warranty management and claims |
| **Mileage/Usage Tracking** | Meter-based PMs triggered by mileage, hours, cycles |
| **Inventory Count** | Physical inventory management (originated as Transport feature) |
| **Crew Management** | Transit crew scheduling and qualification tracking |
| **Safety & Compliance** | FRA, FTA, and DOT regulatory compliance |
| **Component Tracking** | Serialized component tracking across fleet |

### Regulatory Framework Support

| Framework | Support |
|---|---|
| **FTA (Federal Transit Administration)** | Transit asset management compliance |
| **FRA (Federal Railroad Administration)** | Rail safety compliance |
| **DOT** | Department of Transportation regulations |
| **FAST Act** | Transit Asset Management Plan requirements |

### Team Exploration Tasks (if applicable)

| # | Task | Effort |
|---|---|---|
| 1 | Map current fleet maintenance processes to Transportation modules | 16 hours |
| 2 | Configure pilot fleet with meter-based PMs | 16 hours |
| 3 | Set up warranty tracking for fleet assets | 8 hours |
| 4 | Test linear asset features for track/road maintenance | 16 hours |

---

## 13. Industry Solution: Utilities

### Overview

Maximo for Utilities supports electric, gas, water, and wastewater utilities with features for grid management, outage response, smart meter management, and regulatory compliance.

### Key Features

| Feature | Description |
|---|---|
| **Grid/Network Management** | Electric, gas, water distribution network modeling |
| **Outage Management** | Outage response coordination linked to work management |
| **Smart Meter Management** | Track smart meter assets for AMI/AMR deployments |
| **Compatible Unit Estimating** | Estimate construction/maintenance costs using CU standards |
| **Crew Management** | Storm response crew coordination |
| **Vegetation Management** | Track tree trimming programs for transmission/distribution |
| **GIS Integration** | Deep ArcGIS integration for network visualization |
| **NERC/FERC Compliance** | Regulatory compliance tracking |
| **Health & Predict for Utilities** | Specialized asset scoring for utility equipment |

### Regulatory Framework Support

| Framework | Support |
|---|---|
| **NERC** | Reliability compliance (CIP, O&P, FAC standards) |
| **FERC** | Federal energy regulatory compliance |
| **EPA** | Environmental compliance for water/wastewater |
| **State PUC** | Public utility commission requirements |

### Team Exploration Tasks (if applicable)

| # | Task | Effort |
|---|---|---|
| 1 | Map current utility-specific processes to Utilities modules | 16 hours |
| 2 | Configure compatible unit estimating for pilot work type | 16 hours |
| 3 | Set up smart meter management for pilot area | 16 hours |
| 4 | Test GIS/spatial integration for network visualization | 16 hours |
| 5 | Configure vegetation management program | 12 hours |

---

## 14. Industry Solution: Oil & Gas

### Overview

Maximo for Oil & Gas supports upstream (exploration/production), midstream (pipelines/transportation), and downstream (refining/petrochemical) operations with process safety, regulatory compliance, and HSE integration.

### Key Features

| Feature | Description |
|---|---|
| **Process Safety Management** | PSM compliance tracking and management |
| **HSE Integration** | Deep integration with HSE add-on (shared color coding in UI) |
| **Pipeline Management** | Linear asset management for pipeline networks |
| **Permit to Work** | High-risk work permit management |
| **Management of Change** | MOC for process and equipment changes |
| **Turnaround Management** | Plan and execute planned shutdowns/turnarounds |
| **Corrosion Management** | Track inspection and corrosion data |
| **Equipment Criticality** | Risk-based asset prioritization |
| **Emissions Tracking** | Continuous and fugitive emissions management |

### Regulatory Framework Support

| Framework | Support |
|---|---|
| **OSHA PSM** | Process Safety Management 14 elements |
| **EPA RMP** | Risk Management Program |
| **API Standards** | American Petroleum Institute standards |
| **PHMSA** | Pipeline safety regulations |

### Team Exploration Tasks (if applicable)

| # | Task | Effort |
|---|---|---|
| 1 | Map current O&G-specific processes to industry solution | 16 hours |
| 2 | Configure MOC workflow for pilot scenario | 16 hours |
| 3 | Set up turnaround management for next planned shutdown | 24 hours |
| 4 | Configure pipeline linear asset management | 16 hours |
| 5 | Integrate emissions tracking with HSE | 12 hours |

---

## 15. Industry Solution: Nuclear

### Overview

Maximo for Nuclear provides specialized capabilities for nuclear power plant maintenance management with strict regulatory compliance for NRC (Nuclear Regulatory Commission) requirements.

### Key Features

| Feature | Description |
|---|---|
| **Technical Specifications** | Model LCOs (Limiting Conditions for Operation) from tech specs |
| **Surveillance Testing** | Schedule, track, and manage required surveillance tests |
| **Clearance Management** | Nuclear safety clearance procedures |
| **Corrective Action Program** | Track conditions adverse to quality with root cause analysis |
| **Maintenance Rule (10 CFR 50.65)** | Track system performance against maintenance rule criteria |
| **Outage Management** | Plan and manage refueling/maintenance outages |
| **Configuration Management** | Strict configuration control for safety-related systems |
| **Radiation Protection** | Radiation work permit management (with HSE) |
| **NRC Reporting** | Generate NRC-required reports and documentation |
| **Grace Period Tracking** | Monitor surveillance test grace periods per tech specs |

### Regulatory Framework Support

| Framework | Support |
|---|---|
| **10 CFR 50** | Licensing and safety requirements |
| **10 CFR 50.65** | Maintenance Rule compliance |
| **NRC Tech Specs** | Technical specification compliance tracking |
| **INPO** | Institute of Nuclear Power Operations standards |
| **ASME** | Code compliance for nuclear components |

### Team Exploration Tasks (if applicable)

| # | Task | Effort |
|---|---|---|
| 1 | Map current nuclear-specific processes to industry solution | 24 hours |
| 2 | Configure tech spec LCO tracking for pilot system | 24 hours |
| 3 | Set up surveillance testing program | 16 hours |
| 4 | Configure clearance management workflow | 16 hours |
| 5 | Test Maintenance Rule tracking capabilities | 16 hours |

---

## 16. Industry Solution: Civil Infrastructure

### Overview

Maximo for Civil Infrastructure manages bridges, roads, tunnels, dams, and other public infrastructure assets. It includes NBI (National Bridge Inventory) compliance, condition-based inspection, and integration with Visual Inspection's Large Vision Models.

**Note:** Civil Infrastructure is also covered in DOC2 as a MAS Suite application. Here we focus on the industry solution licensing and regulatory aspects.

### Key Features

| Feature | Description |
|---|---|
| **Bridge Inspection** | NBI-compliant bridge inspection with element-level detail |
| **Road Condition Assessment** | Pavement condition index (PCI) tracking |
| **Tunnel Inspection** | FHWA tunnel inspection program compliance |
| **Deficiency Tracking** | Track deficiencies from inspection through remediation |
| **Condition Rating** | Multi-element condition scoring |
| **Large Vision Models** | AI-powered inspection analysis (MAS 9.1) |
| **Risk-Based Prioritization** | Prioritize infrastructure investments by risk |

### Regulatory Framework Support

| Framework | Support |
|---|---|
| **NBI** | National Bridge Inventory reporting |
| **FHWA** | Federal Highway Administration standards |
| **NBIS** | National Bridge Inspection Standards |
| **MAP-21** | Performance-based infrastructure management |

---

## 17. AppPoints Licensing for Add-Ons & Industry Solutions

### How Add-Ons Affect AppPoints

Installing an add-on or industry solution does **not** automatically increase AppPoints consumption. However, users who access add-on functionality typically need **Premium** tier access, which consumes more AppPoints per user.

### AppPoints Consumption by User Tier

| User Tier | Concurrent AppPoints | Authorized AppPoints | Modules Accessible |
|---|---|---|---|
| **Limited** | 5 | 2 | Up to 3 modules |
| **Base** | 10 | 3 | Multi-module access |
| **Premium** | 15 | 5 | All applications including add-ons and industry solutions |
| **Administrative** | 10 (9.0) / 3-5 (9.1) | Varies | Admin functions |

### Which Add-Ons Require Premium Tier

| Add-On / Industry Solution | User Tier Required | Notes |
|---|---|---|
| **HSE** | Premium | 50+ applications, major add-on |
| **Spatial** | Base or Premium | Depends on extent of usage |
| **Service Provider** | Premium | Customer management features |
| **ACM** | Premium | Configuration management |
| **Maximo IT** | Separate licensing | Not on AppPoints model |
| **Aviation** | Premium | Industry solution |
| **Transportation** | Premium | Industry solution |
| **Utilities** | Premium | Industry solution |
| **Oil & Gas** | Premium | Industry solution |
| **Nuclear** | Premium | Industry solution |
| **Civil Infrastructure** | Premium | Industry solution |
| **Inventory Optimization** | Separate SaaS subscription | Not on AppPoints model |
| **Renewables** | Separate | Contact IBM for pricing |
| **Real Estate & Facilities** | Separate | Contact IBM for pricing |

### Licensing Optimization Tips

1. **Not everyone needs Premium** -- Only users who actually use add-on/industry-specific applications need Premium tier
2. **Mix tiers strategically** -- Most users can be Limited or Base; only power users need Premium
3. **Audit actual usage** -- If a Premium user only accesses base Manage, downgrade to save points
4. **Authorized vs. Concurrent** -- Heavy daily users should be Authorized (lower points); occasional users should be Concurrent
5. **Verify included capabilities** -- Don't pay for Calibration, Linear, Scheduler, or Mobile separately; they're included

---

## 18. What Changed From 7.6 to MAS 9 for Each Add-On

### Quick Reference: Changes by Add-On

| Add-On | Key Changes from 7.6 to MAS 9 |
|---|---|
| **Calibration** | Now included in base Manage. No licensing change needed. Same functional capabilities. |
| **Linear Assets** | Now included in base Manage. Enhanced with Maximo Mobile support and dynamic segmentation on maps. |
| **Scheduler** | Now included in base Manage. Expanded to 8 graphical applications. Requires Optimizer for optimization. |
| **Mobile** | Maximo Anywhere is DEAD. Replaced by Maximo Mobile (completely rebuilt). Included in base Manage. |
| **HSE** | Modernized UI (Carbon Design System). New Emissions Dashboard. Envizi ESG integration. Mobile support. |
| **Spatial** | OpenMap replaces Bing/Google Maps. Enhanced ArcGIS integration. Spatial scheduling with Optimizer. |
| **Service Provider** | Carbon Design System UI. Enhanced SLA tracking via Work Queues. Mobile customer access. |
| **ACM** | Unified as "Complex Assets." Carbon UI. REST API integration. Same core configuration management. |
| **Maximo IT** | Rebranded from IBM Control Desk. Now part of MAS ecosystem. Still separate licensing. |
| **Aviation** | Carbon UI. Mobile support. REST APIs. Core MSG-3/AD/SB functionality retained. |
| **Transportation** | Carbon UI. Enhanced mobile fleet management. Inventory Count originated here. |
| **Utilities** | Smart meter enhancements. Enhanced GIS integration. Health & Predict for Utilities. |
| **Oil & Gas** | Enhanced HSE integration. Carbon UI. Mobile process safety management. |
| **Nuclear** | Carbon UI. Enhanced surveillance tracking. Mobile clearance management. |
| **Civil Infrastructure** | New MAS Suite application (not just Manage add-on). Large Vision Models (9.1). NBI compliance. |
| **Inventory Optimization** | COMPLETELY NEW -- no 7.6 equivalent. Cloud SaaS. AI-powered. |
| **Renewables** | COMPLETELY NEW -- no 7.6 equivalent. Acquired Prescinto technology. |
| **Real Estate & Facilities** | COMPLETELY NEW to MAS 9.1 -- TRIRIGA reimagined within MAS. |
| **Reliability Strategies** | COMPLETELY NEW -- no 7.6 equivalent. 800+ asset types, 58K failure modes. Now INCLUDED free. |

---

## 19. Implementation Prioritization Matrix

### For Organizations That Had Add-Ons in 7.6

If you were using these in 7.6, prioritize verifying they work correctly in MAS 9:

| Priority | Add-On | Action |
|---|---|---|
| **1 - Immediate** | Any Industry Solution you currently use | Verify all industry-specific features work post-upgrade |
| **2 - Immediate** | HSE (if currently used) | Verify incident management, permits, emissions |
| **3 - Immediate** | Spatial (if currently used) | Reconfigure for OpenMap (Bing/Google deprecated) |
| **4 - First Month** | Service Provider (if currently used) | Verify customer agreements, billing |
| **5 - First Month** | ACM (if currently used) | Verify configuration management |
| **6 - First Month** | Maximo IT (if currently used) | Verify ITSM integration |

### For Organizations Evaluating New Add-Ons

| Priority | Add-On | Business Value | Complexity | When to Evaluate |
|---|---|---|---|---|
| **1** | Inventory Optimization | HIGH (20-40% inventory cost reduction) | LOW (SaaS, easy setup) | Months 1-3 |
| **2** | HSE | HIGH (compliance, safety) | HIGH (50+ applications) | Months 3-6 |
| **3** | Spatial | MEDIUM-HIGH (visualization, routing) | MEDIUM (GIS skills needed) | Months 3-6 |
| **4** | Renewables | HIGH (for renewable operators) | MEDIUM | Months 4-6 |
| **5** | Real Estate & Facilities | MEDIUM (for large campuses) | HIGH (IWMS is complex) | Months 6-12 |
| **6** | Service Provider | MEDIUM (for service companies) | MEDIUM | Months 6-12 |
| **7** | ACM | HIGH (for regulated assets) | HIGH | Months 6-12 |
| **8** | Maximo IT | LOW-MEDIUM (most have existing ITSM) | HIGH | Months 12+ |

---

## 20. Team Exploration Assignment Matrix

| Add-On / Solution | Priority | Suggested Team | Effort | Skills Needed |
|---|---|---|---|---|
| **Inventory Optimization** | 1 | 2-3 people | 40-60 hours | Inventory management, data analysis, supply chain |
| **HSE** | 2 (if applicable) | 3-5 people | 80-160 hours | Safety management, environmental compliance, Manage admin |
| **Spatial** | 3 | 2-3 people | 40-80 hours | GIS (ArcGIS), Manage admin, mapping |
| **Service Provider** | Conditional | 2-3 people | 40-60 hours | Customer management, billing, SLA design |
| **ACM / Complex Assets** | Conditional | 2-3 people | 60-100 hours | Configuration management, BOM, engineering |
| **Maximo IT** | Low | 2-3 people | 40-80 hours | ITSM, ITIL, service desk operations |
| **Renewables** | Conditional | 2-3 people | 40-60 hours | Renewable energy operations, SCADA, analytics |
| **Real Estate & Facilities** | Conditional | 3-4 people | 80-120 hours | Facilities management, space planning, lease management |
| **Industry Solution** | HIGH (if applicable) | 3-5 people | 60-120 hours | Industry domain expertise, regulatory compliance, Manage admin |

### Recommended Approach

1. **First:** Verify any add-ons/industry solutions you already use from 7.6 are working in MAS 9
2. **Second:** Evaluate Inventory Optimization (quick win, SaaS, low complexity)
3. **Third:** Evaluate HSE and Spatial based on organizational needs
4. **Fourth:** Evaluate new products (Renewables, MREF) based on industry applicability
5. **Ongoing:** Re-evaluate quarterly as IBM releases new MAS versions

---

## 21. References & Resources

### IBM Documentation

| Resource | URL |
|---|---|
| **MAS Documentation Hub** | https://www.ibm.com/docs/en/mas-cd |
| **Industry Solutions & Add-ons Support** | https://www.ibm.com/support/pages/maximo-support-resources-industry-solutions-and-add-ons |
| **MRO Inventory Optimization** | https://www.ibm.com/products/maximo/mro-inventory-optimization |
| **Renewables** | https://www.ibm.com/products/maximo/renewables |
| **Environmental Health & Safety** | https://www.ibm.com/products/maximo/environmental-health-safety |
| **Energy & Utilities** | https://www.ibm.com/products/maximo/energy-utilities |
| **TRIRIGA / Real Estate** | https://www.ibm.com/products/tririga |
| **ACM Documentation** | https://www.ibm.com/docs/en/macm/continuous-delivery |
| **Nuclear Documentation** | https://www.ibm.com/docs/en/mfnp/cd |
| **Deployment of Industry Solutions** | https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=deploy-deployment-industry-solutions-add-ons |
| **AppPoints Licensing Guide** | https://www.ibm.com/docs/en/SSRHPA_cd/pdf/mas_licensing.pdf |

### Community Resources

| Resource | URL |
|---|---|
| **Maximo Secrets - Manage Overview** | https://maximosecrets.com/ibm-maximo-manage-overview/ |
| **Maximo Secrets - Upgrading to MAS 9.0** | https://maximosecrets.com/2024/10/04/ibm-maximo-upgrading-to-mas-9-0/ |
| **Maximo Secrets - New Features MAS 9.0/9.1** | https://maximosecrets.com/2025/07/06/new-features-in-mas-90-and-91/ |
| **Interloc Solutions - HSE** | https://www.interlocsolutions.com/ibm-maximo-health-safety-environment |
| **Naviam - MREF** | https://www.naviam.io/products/ibm-maximo-application-suite/ibm-maximo-real-estate-facilities |
| **Maven Asset - Add-on Products** | https://www.mavenasset.com/solutions/maximo-add-on-products/ |
| **Maven Asset - AppPoints Guide** | https://www.mavenasset.com/blog/mas-application-points/ |

### Industry-Specific Resources

| Resource | URL |
|---|---|
| **Naviam - Nuclear Energy** | https://www.naviam.io/industries/nuclear-energy |
| **Naviam - Utilities** | https://www.naviam.io/industries/energy-and-utilities |
| **Softacus - Utilities** | https://softacus.com/blog/ibm-maximo-for-utilities |
| **Banetti - Aviation** | https://info.banetti.com/maximo-aviation/ |
| **Astin Technology - Industries** | https://www.astintechnology.com/support-services/ibm-maximo-industries.php |

---

## Appendix A: Complete Add-On & Industry Solution Quick Reference

| Module | Type | 7.6 Status | MAS 9 Status | Cost Impact |
|---|---|---|---|---|
| Calibration | Add-on | Paid add-on | **INCLUDED** | Saves money |
| Linear Assets | Add-on | Paid add-on | **INCLUDED** | Saves money |
| Mobile (Anywhere) | Add-on | Paid add-on | **INCLUDED** (rebuilt) | Saves money |
| Scheduler | Add-on | Paid add-on | **INCLUDED** | Saves money |
| Reliability Strategies | Add-on | Did not exist | **INCLUDED** (free install) | Free value |
| HSE | Add-on | Paid add-on | Still paid add-on | Same cost category |
| Spatial | Add-on | Paid add-on | Still paid add-on | Same cost category |
| Service Provider | Add-on | Paid add-on | Still paid add-on | Same cost category |
| ACM | Add-on | Paid add-on | Still paid add-on | Same cost category |
| Maximo IT | Product | IBM Control Desk | Rebranded, still separate | Separate licensing |
| MRO Inventory Optimization | SaaS | Did not exist | NEW product | New cost ($3,094+/mo) |
| Renewables | Suite app | Did not exist | NEW product | New cost |
| Real Estate & Facilities | Suite app | Did not exist (TRIRIGA separate) | NEW in MAS 9.1 | New cost |
| Optimizer | Suite app | Did not exist | NEW product | See DOC2 |
| Aviation | Industry | Paid industry solution | Still paid (Premium tier) | Same cost category |
| Transportation | Industry | Paid industry solution | Still paid (Premium tier) | Same cost category |
| Utilities | Industry | Paid industry solution | Still paid (Premium tier) | Same cost category |
| Oil & Gas | Industry | Paid industry solution | Still paid (Premium tier) | Same cost category |
| Nuclear | Industry | Paid industry solution | Still paid (Premium tier) | Same cost category |
| Civil Infrastructure | Industry | Paid industry solution | Enhanced as Suite app | Same/New cost |

---

**Document End**

*This document should be reviewed and updated quarterly as IBM releases new MAS versions and pricing changes. The next review is scheduled for June 2026.*

*For questions about licensing and pricing, contact your IBM Account Executive or IBM Business Partner.*
