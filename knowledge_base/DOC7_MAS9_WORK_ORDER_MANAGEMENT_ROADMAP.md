# MAS 9 Work Order Management Roadmap

**Document:** DOC7 - Work Order Management Roadmap  
**Version:** 1.1  
**Date:** April 2, 2026  
**Audience:** Maintenance planners, supervisors, schedulers, technicians, Maximo administrators, solution architects, and upgrade leads  
**Scope:** Work Order Tracking, Preventive Maintenance, Job Plans, Service Requests, approval flows, dashboards, work queues, scheduling, dispatching, field execution, AI-assisted work management, and role-based applications that affect maintenance workflows  
**Upgrade Context:** Maximo 7.6.1.3 -> MAS 9  
**Prerequisite Reading:** DOC1 (MAS 9 Manage Upgrade Roadmap) for architecture, security, integration, and licensing topics that apply across all processes

## From Maximo 7.6 to MAS 9 -- What Changed in Work Order Management

This document is a focused deep-dive for maintenance teams that need more than a feature list. The intent is to map the 7.6 way of working to the MAS 9 operating model, identify where migration effort actually sits, and separate true platform change from items that must be validated in your specific MAS entitlement and version.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Work Order Tracking Application Changes](#2-work-order-tracking-application-changes)
3. [Work Order Operations Are Now Tasks](#3-work-order-operations-are-now-tasks)
4. [Preventive Maintenance Changes](#4-preventive-maintenance-changes)
5. [Job Plans and Safety Plans](#5-job-plans-and-safety-plans)
6. [Service Request Management](#6-service-request-management)
7. [Work Order Approval and Workflow Changes](#7-work-order-approval-and-workflow-changes)
8. [Operational Dashboard for Work Order Management](#8-operational-dashboard-for-work-order-management)
9. [Work Queue Manager for Maintenance Queues](#9-work-queue-manager-for-maintenance-queues)
10. [Graphical Scheduling and Dispatching](#10-graphical-scheduling-and-dispatching)
11. [Field Service Management (NEW in MAS 9.0)](#11-field-service-management)
12. [Maximo Mobile for Work Execution](#12-maximo-mobile-for-work-execution)
13. [Work Order Intelligence -- AI for WO Quality (MAS 9.0)](#13-work-order-intelligence)
14. [AI Assistant and Smart Features in Manage (MAS 9.1)](#14-ai-assistant-and-smart-features)
15. [Reliability Strategies and PM Generation](#15-reliability-strategies-and-pm-generation)
16. [Qualifications and Skills in Work Orders](#16-qualifications-and-skills-in-work-orders)
17. [Work Order Integration Changes](#17-work-order-integration-changes)
18. [Work Order Reporting Changes](#18-work-order-reporting-changes)
19. [Role-Based Applications Replacing Work Centers](#19-role-based-applications-replacing-work-centers)
20. [Common Work Order Management Upgrade Gotchas](#20-common-upgrade-gotchas)
21. [Team Exploration Assignment Matrix](#21-team-exploration-assignment-matrix)
22. [Recommended Learning Path](#22-recommended-learning-path)
23. [References and Resources](#23-references-and-resources)

---

## 1. Executive Summary

### What Changed in Work Order Management

Work order management is the beating heart of Maximo, and MAS 9 changed virtually every surface your team interacts with while keeping the underlying data model intact. Here is the honest assessment:

**What Stayed the Same:**
- Core work order data model (WORKORDER table, WO statuses, WO hierarchy)
- Work Order Tracking, Activities and Tasks, and PM applications still exist as classic applications
- PM generation logic, frequency calculations, and forecasting fundamentals unchanged
- Job Plan structure (tasks, labor, materials, tools, services) unchanged at the data level
- Escalations, Workflows, Communication Templates still function
- Automation Scripts are still the primary customization mechanism
- Work Order approval routing via Workflow Designer still works

**What Changed Dramatically:**
- **UI Framework:** Every screen renders in IBM Carbon Design System -- field layouts, navigation, and visual indicators are different
- **Work Centers REMOVED:** Work Execution, Work Supervisor, Service Request Work Centers are gone -- replaced by Role-Based Applications and Maximo Mobile
- **Scheduling ACCESS EXPANDED:** Graphical scheduling capabilities are much more central to the MAS 9 experience, but exact entitlement and optimization rights must still be validated against your SKU and AppPoints model
- **Mobile REBUILT:** Maximo Anywhere is dead -- Maximo Mobile on React.js/MAF replaces it entirely for field work execution
- **AI NATIVE:** Work Order Intelligence (9.0) and AI Assistant (9.1) add generative AI to WO approval, failure code recommendations, and natural language queries
- **Field Service Management NEW:** MAS 9.0 introduces a new Field Service Management solution with advanced dispatching algorithms
- **Operations → Tasks:** Work Order Operations have been renamed to Tasks (terminology and some UI changes)
- **Operational Dashboard:** Card-based analytics dashboard replaces Start Center portlets for WO KPIs
- **Work Queues:** New Work Queue Manager replaces Start Center Result Sets for maintenance work lists
- **Reporting MODEL SHIFT:** Operational reporting increasingly moves toward dashboards, queues, exports, and Cognos-style analytics, so BIRT content must be rationalized instead of blindly carried forward

### Key Message for Work Order Teams

Your business process knowledge transfers. How you think about planning, scheduling, executing, and closing work orders is the same. But **every tool you use to do those things has changed**. The planner who lived in Work Execution Work Center now uses Operational Dashboard + Work Queues + Graphical Scheduling. The supervisor who used Work Supervisor Work Center now uses Approvals RBA. The technician who used Maximo Anywhere now uses Maximo Mobile. Every single one of those workflows feels different.

### Planning Implications

- Treat this upgrade as a **workflow redesign**, not just a technical uplift
- Separate **classic app validation**, **RBA/mobile rebuild**, and **reporting rationalization** into different workstreams
- Do not let licensing assumptions drive planning -- validate what is entitled, what is deployed, and what is merely available in documentation
- Prioritize the workflows that make or break daily operations: approval, dispatch, technician execution, SR-to-WO conversion, status change, and closeout
- Use AI features only after validating failure code quality, description quality, security posture, and expected business value

---

## 2. Work Order Tracking Application Changes

### 2.1 Application Availability

Work Order Tracking remains the primary classic application for work order management in MAS 9. It was NOT removed or replaced. However, the user experience is significantly different due to Carbon Design System rendering.

### 2.2 Visual and Navigation Changes

| Feature | Maximo 7.6 | MAS 9 |
|---------|-----------|-------|
| **UI Framework** | Traditional Maximo skin (tivoli09/13) | IBM Carbon Design System |
| **Field Labels** | Side-positioned or top (configurable) | ALWAYS above fields -- not configurable |
| **Table Interaction** | Right-click context menus | Action toolbar above tables |
| **Column Filtering** | Query-based filtering | Inline filter row per column (NEW) |
| **Pagination** | Top/bottom page controls | Configurable via `mxe.webclient.paginationButtonsPlacement` |
| **Bulk Selection** | Limited multi-select | Action toolbar with bulk operations |
| **Color Theme** | Configurable skins | Carbon only -- black masthead, white/gray content |
| **Boolean Fields** | Toggle switches (MAS 8.x) | Checkboxes returned for YORN fields showing 0/1 (MAS 9.1) |

### 2.3 Work Order Tracking Functional Enhancements

**MAS 9.0:**
- Map integration in Work Order Tracking -- view WO locations on map, create WOs from map clicks
- Qualifications section added to the Plans tab
- Tasks (formerly Operations) display Qualifications fields
- Fields for Met on Actual Labor, Met on Assignments, and Met on Planned Labor added
- Quick Reporting capability -- rapid WO creation in in-progress state from the Technician mobile app
- Linear asset support enhanced for infrastructure maintenance work orders

**MAS 9.1:**
- Work Order history viewable for assets in the field (via mobile integration)
- Follow-up work order creation with applicable asset/location auto-selection
- AI-driven field value recommendations when entering WO data
- Similar record detection when creating new work orders (reduces duplicates)
- AI-recommended failure codes based on WO descriptions (Work Order Intelligence)

### 2.4 Application Designer Customizations

- Application Designer is still available and functional for WO Tracking customizations
- Existing 7.6 customizations (added fields, rearranged tabs, custom sections) generally carry forward
- However: Visual rendering under Carbon differs -- field spacing, tab rendering, and dialog behavior may look different
- CSS class names changed from `.bx--header` (MAS 9.0) to `.cds--header` (MAS 9.1) -- any CSS overrides break between versions
- Test all customized WO screens in MAS 9 sandbox before production upgrade

---

## 3. Work Order Operations Are Now Tasks

### 3.1 The Terminology Change

IBM renamed Work Order **Operations** to Work Order **Tasks** across the application. This affects terminology throughout the interface and documentation.

**What Changed:**

| Old Term (7.6) | New Term (MAS 9) | Where It Appears |
|----------------|-----------------|------------------|
| Work Order Operation | Work Order Task | Work Order Tracking Plans tab |
| Operation Sequence | Task Sequence | Task list ordering |
| WOACTIVITY | WOACTIVITY (table unchanged) | Database level -- no schema change |
| Operations tab | Tasks tab | Work Order Tracking UI |

### 3.2 Functional Impact

- The underlying data model (WOACTIVITY table) is **unchanged** -- this is purely a terminology and UI change
- Automation Scripts referencing Operations by field names still work (same database columns)
- API endpoints using Object Structures still use the same field names
- Reports and queries referencing WOACTIVITY table are unaffected at the data level
- BIRT report labels may display old "Operations" terminology if not recreated in Cognos

### 3.3 Migration Impact

- **LOW IMPACT** for technical teams -- no data migration, no API changes
- **MEDIUM IMPACT** for end users -- training materials, SOPs, and user guides must be updated to reflect "Tasks" terminology
- **Update all training documentation** that references "Operations" to say "Tasks"
- **Update all custom labels** in Application Designer that reference "Operations"

---

## 4. Preventive Maintenance Changes

### 4.1 PM Application -- What Stayed the Same

The Preventive Maintenance application retains its core functionality:

- PM record structure (header, frequency, job plan association, seasonal dates, etc.)
- Frequency types: Time-based, Meter-based, and Combination
- PM hierarchy and master/child PM relationships
- PM generation via `PMWoGenCronTask` cron task
- Forecast functionality for PM schedule planning
- Multi-site PM capabilities
- PM grouping and sequencing

### 4.2 PM Enhancements in MAS 9

**Qualifications on PM-Generated Work Orders (MAS 9.0+):**
- Job Plans can now specify required qualifications
- When PMs generate work orders, qualification requirements flow from Job Plan → Work Order
- Dispatching tools use these qualifications to filter technician assignments
- Gap analysis identifies which technicians lack required qualifications

**Reliability Strategies Integration (MAS 9.0+):**
- Reliability Strategies Library can generate PM records directly
- FMEA-based PM recommendations for 800+ equipment types
- Custom strategies allow organization-specific PM generation
- AI-assisted strategy building suggests boundary conditions (MAS 9.1)

**PM Compliance KPIs (Operational Dashboard):**
- Out-of-the-box PM Compliance KPI available
- Configurable compliance calculation (based on scheduled vs completed)
- Trend visualization on Operational Dashboard
- Threshold alerting for PM compliance drops

### 4.3 PM Forecasting and Scheduling Integration

- PM Forecast records integrate with Graphical Scheduling applications
- Planners can view upcoming PM work in Gantt chart views
- Resource leveling can balance PM work against corrective maintenance
- Scheduling Dashboard provides cross-project visibility of PM schedules

### 4.4 Updating Associated Preventive Maintenance

- Master PM → Associated PM update workflow remains available
- Modify schedules and job plans on a master PM and apply changes to all associated PMs
- Safety plan updates can cascade from master PM to children

---

## 5. Job Plans and Safety Plans

### 5.1 Job Plans -- Core Functionality Unchanged

Job Plans remain the template mechanism for work order planning:

- Job Plan header (description, duration, work type, GL debit account)
- Task/operation sequences (labor, materials, tools, services per task)
- Job Plan revisions and revision tracking
- Job Plan templates for reusable work packages
- Multi-site Job Plans with site-specific overrides

### 5.2 Job Plan Enhancements

**Qualifications Integration (MAS 9.0+):**
- NEW: Define required qualifications at the Job Plan task level
- Each task can specify which certifications, skills, or qualifications are needed
- Qualification requirements flow to work orders when Job Plans are applied
- Supports certificate-required qualifications with expiration tracking

**Reliability Strategies Composer (MAS 9.0+):**
- The Reliability Strategies Library Composer can generate Job Plan tasks directly
- Tasks are pre-populated with step-by-step procedures from the library
- 5,000+ PM activities available as starting points
- Organizations can customize generated tasks before implementation

### 5.3 Safety Plans

- Safety Plans remain integrated with Job Plans and Work Orders
- Hazard identification and mitigation tracking unchanged
- Lock-Out/Tag-Out (LOTO) procedures still linked to Safety Plans
- HSE Manager (paid add-on) provides enhanced safety management if licensed

---

## 6. Service Request Management

### 6.1 Service Request Application Changes

| Feature | Maximo 7.6 | MAS 9 |
|---------|-----------|-------|
| **Classic Application** | Service Requests app | Still available, Carbon UI |
| **Work Center** | Service Request Work Center | REMOVED -- replaced by Service Request RBA |
| **Mobile** | Limited web access | Dedicated Service Request mobile app |
| **Map Integration** | Not available | Create SRs from map interface (MAS 9.1) |
| **Self-Service** | Basic self-service portal | Enhanced Service Request mobile with rich text |
| **SR Duplication** | Manual recreation | One-click SR duplication (MAS 9.1) |
| **AI Detection** | None | Similar SR detection when creating new SRs (MAS 9.1) |

### 6.2 Service Request RBA

The Service Request Role-Based Application replaces the Service Request Work Center:

- Modern React.js interface on Maximo Application Framework (MAF)
- Streamlined SR creation workflow
- Attachment support with camera integration on mobile
- Status tracking with visual progress indicators
- Rich text descriptions with hyperlinks

**Gap from Work Center:** The old Work Supervisor Work Center allowed reviewing SRs and converting directly to WOs in a single workflow. This specific flow requires using classic Work Order Tracking + Service Request apps together.

### 6.3 Service Request Mobile App

**MAS 9.0:**
- Rich text formatting with hyperlinks in descriptions
- Attachment renaming with file name and description customization
- Photo attachment from camera or gallery
- Web link opening in system browsers

**MAS 9.1:**
- Service Request duplication
- View Service Requests created by other users
- Create Service Requests directly from map interfaces
- Self-registration: Users can create their own accounts to submit SRs

---

## 7. Work Order Approval and Workflow Changes

### 7.1 Workflow Designer -- Unchanged

The Workflow Designer application remains available and functional:

- Visual workflow design tool still works
- Existing 7.6 workflows carry forward during upgrade
- Approval routing based on conditions, person groups, and escalations
- Communication templates for notifications
- Workflow assignments displayed in user inboxes

### 7.2 Approvals Role-Based Application

The Approvals RBA is a new application that provides a streamlined interface for WO approval:

- Replaces Work Supervisor Work Center for approval workflows
- Modern card-based view of pending approvals
- Quick approve/reject with comments
- Mobile-friendly for on-the-go approval

**Gap:** Cannot review Service Requests and convert to Work Orders in a single workflow as the old Work Supervisor Work Center could. For SR-to-WO conversion, use classic applications.

### 7.3 Work Order Intelligence for Approvals (MAS 9.0)

Maximo Work Order Intelligence uses IBM watsonx generative AI to accelerate the approval process:

**How It Works:**
1. When a work order reaches approval status, AI analyzes the WO description (long and short descriptions)
2. An AI model trained on historical work orders recommends the most likely **problem code** (failure code)
3. The approver sees AI recommendations with a **confidence score**
4. The approver can accept, modify, or reject the AI recommendation
5. New IBM AI Design UI elements display recommendations inline using Graphite design patterns

**Value:**
- Speeds up WO approval by pre-filling failure classification data
- Improves data quality by providing consistent failure code recommendations
- Reduces time spent by approvers researching appropriate problem codes
- AI model trains on your organization's historical work order data

**Requirements:**
- Maximo AI Service deployed (10 AppPoints)
- Sufficient historical work order data for model training
- AI Configuration application setup by administrator

### 7.4 Electronic Signatures on Status Changes

- Maximo Mobile supports electronic signature enforcement on WO status changes
- Configurable per status change (e.g., require signature when moving from INPRG to COMP)
- Digital signature captured and stored with the work order record
- Useful for regulated industries (pharmaceutical, nuclear, aviation)

---

## 8. Operational Dashboard for Work Order Management

### 8.1 Overview

The Operational Dashboard is IBM's strategic replacement for Start Centers as the maintenance manager's command center.

### 8.2 Out-of-the-Box WO KPIs

| KPI | Description | Calculation |
|-----|-------------|-------------|
| **Emergency Work Orders** | Count of WOs with emergency priority | Where Clause on priority field |
| **Overdue Work Orders** | Count of WOs past target completion date | Scheduled finish < current date |
| **Work Order Backlog** | Count of open WOs not yet started | Status in (WAPPR, APPR, WMATL, WSCH) |
| **PM Compliance** | Percentage of PMs completed on schedule | Completed on-time / Total scheduled |
| **Mean Time Between Failures (MTBF)** | Average time between equipment failures | Calculated from failure history |
| **Mean Time To Repair (MTTR)** | Average repair duration | Calculated from labor actual hours |
| **Planned vs Unplanned Ratio** | Ratio of planned to reactive work | PM/CM WO counts comparison |
| **Asset Downtime** | Total downtime hours by asset | Calculated from downtime records |

### 8.3 Maintenance Manager Dashboard

Ships preconfigured with:
- Emergency Work KPI card
- PM Compliance trend card
- Overdue WOs count card
- Backlog KPI card
- Work Queues integration card
- Customizable -- add, remove, rearrange, resize cards

### 8.4 Card Types for WO Management

| Card Type | WO Management Use Case |
|-----------|----------------------|
| **KPI Trend** | PM compliance over last 12 months |
| **KPI Comparison** | Backlog by site, work type, or craft |
| **KPI Value** | Single metric (e.g., overdue WO count) with trend |
| **Work Queues** | Live count of WOs in each maintenance queue |
| **Table** | List of critical work orders with key fields |
| **Quick Actions** | One-click: Create Emergency WO, Open Scheduling |
| **Threshold Tile (9.1)** | Color-coded PM compliance (green >90%, yellow 75-90%, red <75%) |
| **External Content (9.0)** | Embed external analytics (Power BI, Grafana) |

### 8.5 Custom KPI Creation for Work Orders

Using the KPI Manager application:
1. Define the KPI name and description
2. Select target object (WORKORDER, PM, etc.)
3. Write the Where Clause (e.g., `status = 'APPR' and targstartdate < sysdate`)
4. Set refresh interval (e.g., every 15 minutes)
5. Define thresholds: Green (<10), Yellow (10-25), Red (>25)
6. Configure trend calculation period
7. In MAS 9.1: KPI services can call external REST APIs for data

### 8.6 Dashboard Access Model and Governance

- Operational Dashboards support **public** and **private** dashboards, and access can be governed rather than treated as a free-for-all
- Do not assume the personalization model is identical to Start Centers -- define which dashboards are enterprise-standard, role-specific, or user-owned
- Use shared dashboards for operational scenarios such as shift handover, dispatch review, and morning backlog meetings
- Establish governance early: card ownership, KPI definition standards, refresh intervals, naming conventions, and change control

---

## 9. Work Queue Manager for Maintenance Queues

### 9.1 Overview

The Work Queue Manager replaces Start Center Result Set portlets for creating actionable work lists. This is how maintenance teams will manage their daily work assignments in MAS 9.

### 9.2 Example Work Queues for Maintenance

| Queue Name | Target Object | Where Clause | Priority | Person Group |
|-----------|---------------|-------------|----------|-------------|
| Emergency WOs - My Site | WORKORDER | `wopriority = 1 and status = 'APPR' and siteid = :siteid` | Urgent | All Maintenance |
| Awaiting Approval | WORKORDER | `status = 'WAPPR'` | High | Supervisors |
| Overdue PMs | WORKORDER | `worktype = 'PM' and status in ('APPR','INPRG') and schedfinish < sysdate` | High | Planners |
| Unassigned Work | WORKORDER | `status = 'APPR' and lead is null and supervisor is null` | Medium | Dispatchers |
| Waiting on Materials | WORKORDER | `status = 'WMATL'` | Medium | Storeroom |
| Ready to Schedule | WORKORDER | `status = 'APPR' and schedstart is null` | Medium | Planners |
| My Assigned Work | WORKORDER | `lead = :personid and status in ('APPR','INPRG')` | Medium | Technicians |
| Completed - Awaiting Close | WORKORDER | `status = 'COMP'` | Low | Supervisors |

### 9.3 Queue Actions

Actions can be added to queues for quick execution without opening individual records:

- **Change Status** -- Approve, start, complete WOs directly from queue
- **Assign to Person** -- Quick assignment to technician
- **Update Priority** -- Reprioritize work inline
- **Add to Schedule** -- Push WO into a Graphical Scheduling project
- **View on Map** -- Open WO location on map

### 9.4 Integration with Operational Dashboard

- Work Queues card on Operational Dashboard displays queue names with live record counts
- Priority indicators (red/orange/yellow/blue) provide visual urgency
- Click-through from dashboard card to full queue view
- Queue counts refresh with dashboard refresh interval
- Multiple queues on a single card for at-a-glance maintenance overview

### 9.5 Migration from Start Center Result Sets

| Start Center Feature | Work Queue Equivalent |
|---------------------|---------------------|
| Result Set portlet with saved query | Work Queue with Where Clause |
| Result Set action buttons | Queue Actions |
| Start page visibility by security design | Dashboard access plus queue visibility design |
| Result Set record count | Queue count on Dashboard card |
| Click-to-open record | Drill-down from queue |

**Migration Steps:**
1. Export all Start Center Result Set queries from 7.6
2. Recreate each as a Work Queue in Work Queue Manager
3. Define target visibility by role, then implement through dashboard access, security, and queue/person group configuration
4. Add appropriate actions to each queue
5. Create Work Queues cards on Operational Dashboard
6. Validate counts match between old and new
7. Train users on new navigation (Dashboard → Queue → Record)

---

## 10. Graphical Scheduling and Dispatching

### 10.1 Major Capability Shift: Scheduling Is More Accessible

In Maximo 7.6, many teams treated Scheduler as a separately justified capability. In MAS 9, graphical scheduling is much more central to the work management operating model. Treat the following applications as core capabilities to evaluate early, but confirm exact entitlement, deployment status, and AppPoints implications in your environment:

| Application | Purpose | Key Features |
|------------|---------|--------------|
| **Graphical Scheduling** | Gantt-chart project scheduling | Gantt view, dependency management (FS, SS, FF, SF), critical path, resource leveling, drag-and-drop |
| **Graphical Scheduling -- Large Projects** | Performance-optimized for 10,000+ records | Paginated loading (50 records), collapsed children, cross-page dependencies |
| **Graphical Assignment** | Technician dispatching | Drag-and-drop assignment, color-coded status, shift display, dispatch indicators |
| **Graphical Work Week** | Weekly planning | Week-at-a-glance, capacity planning, drag rescheduling |
| **Graphical Resource View** | Monthly resource calendar | Monthly view, availability heat maps, capacity planning |
| **Graphical Assignment -- Repair Facilities** | Shop/repair environments | Bay/station assignment, repair timeline tracking |
| **Graphical Crew Management** | Crew scheduling | Crew availability, crew-to-work assignment, skills matching |
| **Graphical Appointment Book** | Customer-facing appointments | Time slot management, appointment booking |

**Practical planning note:** Even if the applications are available, your team does not get value unless calendars, shifts, craft/labor data, crew definitions, and status discipline are clean enough for scheduling to work.

### 10.2 Scheduling Dashboard (MAS 9.0+)

Designed to work with the Optimizer (paid) but provides value even without it:

- **4 KPI cards:** Scheduled, Scheduling Issues, Resource Utilization, Total Resources
- Displays schedules from Graphical Scheduling where "Prepare for Dashboard" has been run
- Cross-project visibility across multiple scheduling projects
- Resource conflict identification
- Data quality issue detection

### 10.3 Dispatching Dashboard (MAS 9.0+)

Real-time dispatching interface:

- Emergency work count and overdue assignment KPIs
- Technician utilization metrics
- SLA compliance tracking
- Locked work indicators (cannot be auto-rescheduled)
- Real-time dispatch status: assigned → en-route → on-site → completed

**MAS 9.1 Enhancements:**
- Gantt functions display shift times and availability reason codes
- Emergency work icons on Gantt bars
- Large Neighborhood Search (LNS) algorithm for spatial optimization
- What-if analysis using RBF algorithm for turnaround time impact

### 10.4 Planning Dashboard (NEW in MAS 9.1)

Completely new dashboard for planners:

- Scheduling project KPI tracking
- Break-in work order tracking (unplanned work injected into schedule)
- Break-out work order tracking (planned work pushed out)
- Drill-down from dashboard to individual schedules and work orders

### 10.5 Maximo Optimizer -- What Requires Extra AppPoints

Full optimization requires Maximo Optimizer (separate component, additional AppPoints):

| Feature | Base Manage (Free) | Optimizer (Paid) |
|---------|-------------------|------------------|
| Gantt chart scheduling | Yes | Yes |
| Manual drag-and-drop | Yes | Yes |
| Dependency management | Yes | Yes |
| Resource leveling | Basic | Advanced |
| **Automated schedule optimization** | No | Yes |
| **Constraint-based scheduling** | No | Yes (skills, tools, materials, proximity) |
| **Travel time optimization** | No | Yes (requires ArcGIS) |
| **What-if scenario planning** | No | Yes |
| **LNS / RBF algorithms** | No | Yes |

### 10.6 Field Service Management (MAS 9.0)

MAS 9.0 also introduced a dedicated Field Service Management path for organizations with larger or more dynamic mobile workforces.

- Advanced optimization and dispatching algorithms extend beyond manual graphical scheduling
- Best fit for high-volume field operations where travel time, technician availability, and SLA pressure materially affect outcomes
- Not the default answer for every Manage customer -- many organizations should stabilize core scheduling first
- Requires separate licensing / AppPoints validation and a stronger data foundation than classic dispatching

---

## 11. Field Service Management

### 11.1 Overview

Field Service Management should be evaluated as an **operating model decision**, not just a feature add-on. It matters most when dispatch quality and real-time replanning are major business constraints.

### 11.2 When FSM Is Worth Serious Evaluation

- You run a large distributed technician workforce with significant daily travel
- SLA penalties, emergency work, or customer appointment commitments drive dispatch complexity
- Manual dispatching causes under-utilization, excessive windshield time, or frequent rework of the schedule
- You have enough confidence in labor calendars, qualifications, territories, and geospatial data to let optimization drive assignments

### 11.3 Integration Considerations

- FSM still depends on clean Work Order, labor, calendar, shift, and qualification data in Manage
- The value of FSM rises sharply when paired with strong mobile execution discipline and reliable status updates from the field
- ArcGIS or equivalent geospatial context may be needed if travel optimization is part of the business case
- Dispatching Dashboard, Graphical Assignment, and Mobile must be reviewed together; evaluating them in isolation produces weak conclusions

### 11.4 Decision Checklist

- Validate whether current dispatch pain is a process problem, a data problem, or truly an optimization problem
- Confirm licensing / AppPoints before assuming FSM belongs in phase 1
- Run a constrained pilot on one craft, territory, or region before enterprise rollout
- Define success metrics up front: jobs completed per day, travel hours, SLA attainment, overtime, and break-in work absorption

---

## 12. Maximo Mobile for Work Execution

### 12.1 The Replacement: Maximo Anywhere Is Dead

| Aspect | Maximo Anywhere (7.6) | Maximo Mobile (MAS 9) |
|--------|----------------------|----------------------|
| **Technology** | IBM Worklight/MobileFirst + Dojo | React.js on Maximo Application Framework (MAF) |
| **Offline** | Full offline with local database | Full offline with optimized sync |
| **Distribution Model** | Wrapped deployment pattern common | Mobile app distribution is typically through Apple App Store / Google Play for IBM Maximo Mobile; browser-based role apps may also be used depending on the workflow |
| **Customization** | XML configuration + custom adapters | MAF Configuration application |
| **Inspection Forms** | Downloaded per inspection | Downloaded ONCE at login (performance win) |
| **Updates** | Required rebuild and redeployment | Server-side updates -- no device-side redeployment |
| **Customization Migration** | N/A | **NO migration tooling** -- complete rebuild required |

### 12.2 Technician App -- Work Order Execution

The Technician app is the primary tool for field work order execution:

**Core Work Order Features:**
- View and accept/reject assigned work orders
- Start/stop labor timers with automatic tracking
- Report actual labor hours
- Report materials used (issue from storeroom or direct charge)
- Change work order status (INPRG → COMP)
- View work order details, plans, tasks, and safety plans
- Barcode scanning for asset identification
- Photo and document attachment
- Electronic signature capture on status changes

**MAS 9.0 Features:**
- Assignment acceptance or rejection before starting work
- Calibration work order support (as-found / as-left measurements)
- Quick Reporting -- rapid WO creation already in INPRG status
- GPS location sharing (configurable via `maximo.mobile.locationssharing.enabled=1`)
- Server-side search (queries run on server, not local device)
- Partial data refresh (sync only changed records)
- Linear asset support for infrastructure work orders
- Material request creation from the field
- Asset barcode scanning enforcement before status changes

**MAS 9.1 Enhancements:**
- Unassign or reassign already-accepted assignments
- Self-assign work orders from a queue
- Configure start-travel display regardless of GPS distance
- Automatically stop timers when starting another work order
- Create follow-up work orders with auto-populated asset/location
- View work order history for assets while in the field
- Improved navigation between related WOs

### 12.3 Inspection Forms on Mobile

- Conduct inspections directly from the Technician app
- Inspection forms download once at login (not per-inspection)
- Offline inspection completion with sync when connected
- Photo capture with annotation
- Conditional logic in inspection forms
- Signature capture on inspection completion

### 12.4 Map Integration in Mobile

- View assigned work orders on a map
- Navigate to work location (integrates with device navigation apps)
- View asset locations and nearby work
- GPS-based technician tracking visible to dispatchers
- Create work orders or service requests from map clicks (MAS 9.1)

### 12.5 Offline Capabilities

- Full offline work for Technician and Inspection apps
- Data synchronized when connectivity restored
- Conflict resolution for concurrent edits
- Configurable sync scope (controls which data downloads to device)
- Storage management for device capacity constraints

### 12.6 Migration from Maximo Anywhere

**CRITICAL: There is NO migration tooling from Anywhere to Mobile.**

- Every Anywhere customization must be manually analyzed
- MAF Configuration application is the customization tool for Maximo Mobile
- Custom adapters in Anywhere must be rewritten as MAF configurations
- Offline data scope may differ -- validate needed records are available offline
- GPS sharing requires explicit device permission and privacy consent
- Plan 2-3 weeks of effort for mobile migration analysis and rebuild

---

## 13. Work Order Intelligence

### 13.1 Overview (MAS 9.0)

Maximo Work Order Intelligence uses IBM watsonx generative AI to improve work order data quality and speed up approvals. This is the first AI feature directly embedded in the work order approval workflow.

### 13.2 How It Works

1. **Data Collection:** AI model trains on your organization's historical work order descriptions (long and short descriptions)
2. **Pattern Recognition:** The model learns correlations between work descriptions and problem/failure codes
3. **Recommendation:** When a work order reaches approval, AI recommends the most likely problem code
4. **Confidence Score:** Each recommendation includes a confidence percentage
5. **Human Review:** The approver sees recommendations in new AI Design UI elements (Graphite) and accepts, modifies, or rejects

### 13.3 Value for Work Order Management

| Challenge | How WO Intelligence Helps |
|-----------|--------------------------|
| **Poor failure code data** | AI recommends codes from descriptions, improving data quality |
| **Slow approvals** | Pre-filled failure codes reduce time spent researching codes |
| **Inconsistent classification** | AI provides consistent recommendations across approvers |
| **Missing data** | Generative AI can enhance insufficient descriptions |
| **Maintenance analytics** | Better failure code data improves reliability analysis downstream |

### 13.4 Configuration

- Deploy Maximo AI Service (10 AppPoints)
- Use AI Configuration application to enable Work Order Intelligence
- Train the model on your historical work order data
- Configure which failure code fields receive AI recommendations
- Set minimum confidence threshold for displaying recommendations
- Monitor model performance and retrain periodically

### 13.5 Requirements

- MAS 9.0 or later
- Maximo AI Service deployed on OpenShift
- Sufficient historical work orders with problem codes for model training (recommended: 1,000+ classified WOs)
- Monthly AI usage limits apply before additional Watson licensing needed

---

## 14. AI Assistant and Smart Features in Manage (MAS 9.1)

### 14.1 AI Assistant (Maximo Collaborate)

A natural language interface for querying work order data:

**Example Work Order Queries:**
- "Which work orders are due in the next 30 days?"
- "Show me overdue PMs for Building A"
- "How many emergency work orders were created this week?"
- "What is the PM compliance rate for this month?"
- "List all open work orders for pump P-2047"

**How It Works:**
- Uses the `nl2oslc` model to convert natural language to Maximo API queries
- Answers are generated from live Maximo data (not pre-canned responses)
- Quick Starters: Pre-configured suggested questions appear when the assistant opens
- Prompt tuning: Administrators can customize for organization-specific terminology

**Scope in MAS 9.1:**
- Can query: Work Orders, Assets, Service Requests, Locations
- Expandable through configuration to other object types
- Does NOT execute actions (read-only) -- cannot create or modify records via assistant

### 14.2 AI-Driven Field Value Recommendations

- When creating or editing work orders, AI suggests field values based on historical patterns
- Example: For a work order on pump asset type, AI suggests the most likely failure class, work type, and priority
- Configurable per field and per application
- Reduces data entry time and enforces consistency

### 14.3 Similar Record Detection

- When creating new work orders, AI identifies potentially similar existing WOs
- Shows similarity score and key matching attributes (description, asset, location)
- Reduces duplicate work order creation
- User can: view the similar record, link to it, or proceed with new creation

### 14.4 AI Configuration Application

| Setting | Description |
|---------|-------------|
| **Enable/Disable AI Assistant** | Global on/off for chat interface |
| **Quick Starters** | Suggested questions for the assistant |
| **Prompt Tuning** | Customize behavior for your terminology |
| **Field Recommendations** | Enable/disable per application/field |
| **Similar Record Detection** | Configure thresholds and matching attributes |
| **Usage Monitoring** | Track AI usage for license compliance |

---

## 15. Reliability Strategies and PM Generation

### 15.1 Overview

The Reliability Strategies Library is a game-changer for PM planning. Previously available only through expensive consulting engagements, it is now included with MAS licensing.

### 15.2 Library Contents

- **800+ equipment/asset types** across industries
- **58,000+ failure modes** across all operating contexts
- **5,000+ preventive maintenance activities** with step-by-step task guidance
- Coverage: rotating equipment, electrical, instrumentation, structural, piping, HVAC, and more

### 15.3 Work Order Management Integration

The library directly generates work order management artifacts:

1. **Browse:** Select equipment type and operating context
2. **FMEA Viewer:** Review failure modes, effects, and recommended mitigations
3. **Strategy Selection:** Choose relevant failure modes for your context
4. **Composer:** Generate PM records and Job Plan tasks from selected strategies
5. **Implementation:** Review, customize, and implement generated PMs and Job Plans

### 15.4 Version Evolution for WO Impact

| Feature | MAS 9.0 | MAS 9.1 |
|---------|---------|---------|
| Generate PMs from library | Yes | Yes |
| Generate Job Plan tasks | Yes | Yes |
| Custom strategies | Yes | Yes |
| AI-suggested boundary conditions | No | Yes |
| Database-stored custom strategies | No | Yes |
| AI-generated components/failure mechanisms | No | Yes |

### 15.5 Security Roles

| Role | Capability |
|------|-----------|
| **RELIABILITYSTRATEGIES** | View-only library access |
| **STRATEGYBUILDER** | Create and edit strategies |
| **STRATEGYIMPLEMENTER** | Generate PM/Job Plans without creation rights |
| **STRATEGYVIEWER** | View completed strategies |

---

## 16. Qualifications and Skills in Work Orders

### 16.1 What Is New for Work Orders

MAS 9 significantly enhances how qualifications interact with work order management:

**Qualifications in Job Plans (NEW):**
- Job Plans specify required qualifications per task
- Qualification requirements flow from Job Plan → PM → Work Order → Task

**Qualifications in Work Order Tracking (NEW):**
- Work orders display required qualifications on the Plans tab
- Fields: Met on Actual Labor, Met on Assignments, Met on Planned Labor
- Visual indicators show qualification compliance status

**Qualification-Based Assignment (NEW):**
- Graphical Assignment and Dispatching filter technicians by qualification match
- "Best fit" recommendations based on qualification match percentage
- Maximo Optimizer uses qualifications as scheduling constraints

### 16.2 Crew Qualifications (MAS 9.1)

- Crews can have qualification requirements at the crew level
- System validates that crew collectively meets all requirements
- Individual crew member qualifications aggregated for crew capability
- Useful for complex work requiring multiple specialized skills

### 16.3 Certificate Tracking

- Qualifications can require associated certificates
- Certificate expiration tracking with advance warning
- Expired certificates auto-invalidate the qualification
- Impact: A technician whose welding cert expires is automatically flagged as unqualified for welding WOs

---

## 17. Work Order Integration Changes

### 17.1 REST API for Work Orders

The JSON API is the recommended method for all new work order integrations:

**Query Work Orders:**
```
GET /api/os/mxwodetail?lean=1&oslc.where=status="APPR"&oslc.select=wonum,description,status,location,assetnum
```

**Create Work Order:**
```
POST /api/os/mxwodetail?lean=1
Content-Type: application/json

{
  "siteid": "BEDFORD",
  "description": "Pump P-2047 vibration alarm",
  "worktype": "CM",
  "wopriority": 2,
  "assetnum": "P-2047",
  "location": "PUMPHOUSE-A",
  "classstructureid": "1234"
}
```

**Update Work Order Status:**
```
POST /api/os/mxwodetail/{workorderid}?lean=1&action=wsmethod:changeStatus
Content-Type: application/json

{
  "status": "APPR",
  "memo": "Approved by REST API integration"
}
```

### 17.2 Kafka Events for Work Orders

- Configure Kafka providers in External Systems
- Maximo publishes events when work orders change (create, update, status change)
- External systems subscribe to WO-specific Kafka topics
- Better scalability than JMS for high-volume WO integrations
- Use case: Real-time WO status sync with ERP systems

### 17.3 MIF -- Still Works for Existing Integrations

- MXWODETAIL Object Structure still functions for inbound/outbound WO integration
- Publish Channels still fire on WO events
- Enterprise Services still receive inbound WO data
- Interface Tables still work where database access is available

**However:** New integrations should use REST API, not MIF.

### 17.4 What Broke or Changed

| Integration Pattern | Status | Action Required |
|--------------------|--------|----------------|
| REST API (`/api/os/mxwodetail`) | Works | Preferred for new integrations |
| OSLC API (`/oslc/os/mxwodetail`) | Works | Functional but JSON API preferred |
| MIF Publish Channels | Works | No change needed for existing |
| MIF Enterprise Services | Works | No change needed for existing |
| RMI for WO access | **DEPRECATED** | Rewrite to REST API |
| Direct SQL for WO queries | **RESTRICTED** | Use REST API or Automation Scripts |
| Basic auth for API calls | **DEPRECATED** | Migrate to API Keys |
| Interface Tables | Works (where DB accessible) | May not work in sealed/SaaS environments |

---

## 18. Work Order Reporting Changes

### 18.1 BIRT Reports Need Rationalization, Not Blind Rebuild

Do not assume every legacy work order report should move 1:1 into Cognos. First classify the business need, then pick the right target pattern.

| Report Need | Priority | Recommended Target |
|-------------|----------|--------------------|
| Work Order Detail print | CRITICAL | Keep or rebuild in the format that best supports technicians, supervisors, and compliance reviews |
| WO Backlog by Site/Craft | HIGH | KPI Comparison card or Cognos |
| PM Compliance Monthly | HIGH | KPI Trend card or Cognos |
| WO Completion Summary | HIGH | KPI Value card, dashboard, or Cognos |
| Technician Labor Report | HIGH | Cognos or governed export |
| Work Order History by Asset | MEDIUM | Cognos, classic report, or REST export depending on audience |
| Open WO Aging Report | MEDIUM | Work Queue plus Table card, or Cognos if formal distribution is required |
| PM Forecast Report | MEDIUM | Graphical Scheduling view, export, or formal report if needed |
| Emergency Work Trend | MEDIUM | KPI Trend card |
| Detailed WO Cost Report | HIGH | Cognos or another governed reporting tool |

**Rationalization rules:**
- Keep operational, near-real-time consumption in dashboards and queues
- Use formal reporting tools for scheduled distribution, print-ready output, audit packs, and multi-table analytics
- Retire reports that duplicate live queue or KPI behavior
- Validate BIRT support posture in your exact MAS version before deciding whether to keep, replace, or retire existing reports

### 18.2 KPI Manager as Reporting Alternative

For simple WO reporting needs, KPI Manager + Operational Dashboard can replace many BIRT reports:

- **Simple counts:** KPI Value card (e.g., "Open WOs: 147")
- **Trends:** KPI Trend card (e.g., "Monthly WO volume over 12 months")
- **Comparisons:** KPI Comparison card (e.g., "Backlog by site" as bar chart)
- **Detail lists:** Work Queues card + Table card (e.g., "Overdue WOs with details")
- **Complex multi-page reports:** Cognos Analytics only

### 18.3 Export from Role-Based Applications

- CSV export via REST API asynchronous export from any WO list view
- Paginated data combined into single download file
- Useful for ad-hoc WO data extraction

---

## 19. Role-Based Applications Replacing Work Centers

### 19.1 Complete WO-Related Work Center to RBA Map

| Legacy Work Center | MAS 9 Replacement | Status | Gaps |
|-------------------|-------------------|--------|------|
| **Work Execution WC** | Technician app (Mobile) + Work Order Tracking (classic) | Available | Mobile-first approach; desktop users use classic WOTrack |
| **Work Supervisor WC** | Approvals RBA | Available | Cannot review SRs and convert to WOs in single workflow |
| **Business Analyst WC** | Operational Dashboard + Maintenance Manager RBA | Available | Dashboard provides KPIs; no single consolidated analyst view |
| **Service Request WC** | Service Request RBA | Available | Rebuilt for modern UX; some workflow differences |
| **Inspection Forms WC** | Inspection Forms RBA | Available | Completely rebuilt -- old customizations do NOT carry over |
| **Conduct an Inspection WC** | Inspections RBA | Available | New workflow; integrated with mobile |
| **Purchasing/Procurement WCs** | Classic applications remain | Classic | **No RBA replacement yet** -- use classic PO, RFQ apps |

### 19.2 Technology Difference

- **Work Centers:** Application Designer XML + JSP files
- **RBAs:** React.js on Maximo Application Framework (MAF)
- **These are completely different technology stacks** -- you cannot port configurations between them

### 19.3 MAF Configuration for RBAs

RBAs are customized through the MAF Configuration application:

- Add/remove/rearrange fields on RBA screens
- Configure which fields are required
- Set default values
- Add conditional visibility logic
- Configure actions and buttons
- NO Application Designer access for RBAs -- only MAF Configuration

### 19.4 Migration Strategy

1. **Inventory** all Work Center customizations in 7.6
2. **Classify** each: (A) RBA equivalent exists, (B) Automation Script can achieve it, (C) Gap -- use classic app, (D) Retire
3. **Rebuild** Category A in MAF Configuration
4. **Develop** Category B as Automation Scripts
5. **Document** Category C gaps and track IBM roadmap
6. **Train** all users on new RBA workflows -- do NOT underestimate this effort

---

## 20. Common Work Order Management Upgrade Gotchas

### 20.1 Showstoppers

| Issue | Severity | Description | Mitigation |
|-------|----------|-------------|------------|
| **Work Execution WC gone** | CRITICAL | Planners who lived in WE Work Center have no single replacement | Train on Dashboard + Work Queues + Scheduling combination |
| **Anywhere customizations lost** | CRITICAL | All mobile WO customizations must be rebuilt in MAF | Inventory and rebuild in Maximo Mobile; plan 2-3 weeks |
| **WO reporting assumptions wrong** | HIGH | Teams assume every legacy report needs a 1:1 rebuild | Classify each report as keep, rebuild, replace with dashboard/queue, or retire |
| **Supervisor SR→WO flow broken** | MEDIUM | Old single-workflow SR conversion not available in Approvals RBA | Use classic apps for SR→WO conversion |
| **Operations → Tasks terminology** | LOW | User confusion from renamed field labels | Update all training materials and SOPs |

### 20.2 Performance Gotchas

- **Operational Dashboard refresh:** Large KPI queries can slow the dashboard. Optimize Where Clauses and set appropriate refresh intervals
- **Work Queue queries:** Complex Where Clauses on WORKORDER table with millions of records need indexed columns
- **Scheduling projects:** Very large scheduling projects (>10,000 WOs) should use "Large Projects" application
- **Mobile sync:** Limit offline data scope to prevent excessive sync times -- only download WOs the technician needs

### 20.3 Data Quality Issues Surfaced by AI

Work Order Intelligence and AI field recommendations will expose data quality problems:

- If historical WOs have inconsistent failure codes, AI recommendations will be poor
- If WO descriptions are too short or generic, AI cannot make meaningful recommendations
- If problem codes are not consistently used, the AI model cannot learn patterns
- **Recommendation:** Clean up failure code data BEFORE enabling WO Intelligence

### 20.4 Upgrade Readiness Checklist

Use this as a go/no-go gate before moving work management users into MAS 9:

| Readiness Gate | Why It Matters |
|----------------|----------------|
| Top 10 planner/supervisor workflows validated end-to-end | Confirms daily operations still work after role/tool changes |
| Mobile offline scope tested for real technician scenarios | Prevents field adoption failure caused by missing data or sync issues |
| Critical status changes, signatures, and workflow routing verified | Protects compliance and approval integrity |
| Core work queues and dashboard KPIs agreed by operations | Avoids role confusion on day 1 |
| SR-to-WO conversion path documented and trained | Closes one of the most common functional gaps |
| Top reports classified as keep / rebuild / retire | Stops late-stage reporting surprises |
| Integration authentication model updated | Prevents breakage from deprecated access patterns |
| Failure code and description quality reviewed before AI enablement | Reduces poor recommendations and distrust of AI |

---

## 21. Team Exploration Assignment Matrix

| # | Exploration Area | Priority | Team Size | Effort | Skills Needed |
|---|-----------------|----------|-----------|--------|---------------|
| 1 | Work Order Tracking in Carbon UI | HIGH | 1-2 | 1 week | WO Tracking power users, App Designer |
| 2 | Operational Dashboard + KPI Manager | HIGH | 1-2 | 1-2 weeks | KPI design, Where Clauses |
| 3 | Work Queue Manager setup | HIGH | 1 | 1 week | Where Clauses, person groups |
| 4 | Graphical Scheduling suite (all 8 apps) | CRITICAL | 2-3 | 2-3 weeks | Scheduling domain, Optimizer basics |
| 5 | Dispatching + Planning Dashboards | HIGH | 1-2 | 1-2 weeks | Dispatching workflows |
| 6 | Maximo Mobile Technician app | CRITICAL | 2-3 | 2-3 weeks | Mobile config, MAF, field workflows |
| 7 | Work Order Intelligence (AI) | MEDIUM | 1-2 | 1-2 weeks | AI config, failure code data |
| 8 | AI Assistant for WO queries | MEDIUM | 1 | 1 week | AI config, prompt tuning |
| 9 | Reliability Strategies → PM generation | MEDIUM | 1-2 | 1-2 weeks | RCM/FMEA, PM planning |
| 10 | Qualifications in WO planning | LOW | 1 | 1 week | Workforce management |
| 11 | WO Integration (REST API) | HIGH | 1-2 | 1-2 weeks | REST APIs, JSON, Object Structures |
| 12 | WO Reporting rationalization and rebuild | HIGH | 1-2 | 2-3 weeks | Reporting analysis, BIRT knowledge, Cognos authoring |
| 13 | RBA migration (Work Centers) | CRITICAL | 2-3 | 2-3 weeks | App Designer, MAF Configuration |
| 14 | Service Request RBA + Mobile | MEDIUM | 1 | 1 week | SR workflows |
| 15 | Field Service Management evaluation | LOW | 1-2 | 1-2 weeks | FSM concepts, Optimizer license |

**Total Estimated Effort:** 20-30 team-weeks across all exploration areas

**Minimum Team Size for Full Coverage:** 4-6 people working in parallel

---

## 22. Recommended Learning Path

### Phase 1: Foundation (Weeks 1-2)

| Activity | Who | Deliverable |
|----------|-----|-------------|
| Navigate WO Tracking in Carbon UI | All WO users | Document navigation differences |
| Set up Operational Dashboard with WO KPIs | Planner/Supervisor | Configured dashboard |
| Create initial Work Queues | Planner | 5-8 core WO queues |
| Explore Graphical Scheduling basics | Planner | First scheduling project |

### Phase 2: Mobile and Scheduling (Weeks 3-4)

| Activity | Who | Deliverable |
|----------|-----|-------------|
| Configure Maximo Mobile Technician app | Mobile lead | Tested mobile WO execution flow |
| Advanced scheduling: Assignment + Dispatching | Dispatcher | Dispatching workflow documentation |
| Service Request RBA evaluation | Service desk | SR comparison (old vs new) |
| WO Integration testing via REST API | Developer | Integration pattern documentation |

### Phase 3: AI and Optimization (Weeks 5-6)

| Activity | Who | Deliverable |
|----------|-----|-------------|
| Enable Work Order Intelligence | Admin | AI model trained, confidence scores evaluated |
| Enable AI Assistant | Admin | Quick Starters configured for WO queries |
| Reliability Strategies Library exploration | Reliability engineer | Generated PMs from library |
| Qualifications integration testing | HR/Workforce lead | Qualification-based assignment validation |

### Phase 4: Migration and Go-Live Prep (Weeks 7-8)

| Activity | Who | Deliverable |
|----------|-----|-------------|
| WO reporting rationalization plan | Report developer | Prioritized keep / rebuild / retire list |
| Work Center customization migration | App Designer lead | Migration classification (A/B/C/D) |
| User acceptance testing | All WO users | Sign-off on new WO workflows |
| Training material updates | Training lead | Updated SOPs reflecting MAS 9 |

---

## 23. References and Resources

### IBM Documentation
- [IBM Maximo Manage - Work Orders Module](https://www.ibm.com/docs/en/mas-cd/maximo-manage/continuous-delivery?topic=manage-work-orders-module)
- [Work Order Operations Are Now Tasks - FAQ](https://www.ibm.com/support/pages/work-order-operations-are-now-tasks-overview-and-faq)
- [Scheduling Dashboard Documentation](https://www.ibm.com/docs/en/mas-cd/maximo-manage/continuous-delivery?topic=schedules-scheduling-dashboard)
- [MAS Release Information](https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0)

### IBM Announcements
- [Enhanced Maximo with Gen AI Assistant](https://newsroom.ibm.com/blog-enhanced-maximo-streamlines-workforce-efficiency,-investment-planning,-and-facilities-management-introduces-gen-ai-assistant)
- [Maximo AI-Powered ALM Features](https://www.ibm.com/new/announcements/maximo-ai-alm)

### Community Resources
- [MAS 9.0 Initial Review - Maximo Secrets](https://maximosecrets.com/2024/07/15/mas-9-0-initial-review-2/)
- [Operational Dashboard MAS 9.0 - Maximo Secrets](https://maximosecrets.com/2024/09/23/operational-dashboard-mas-9-0/)
- [Operational Dashboard and Work Queues - Maximo Open Forum](https://moremaximo.com/discussion/msug-operational-dashboard-and-work-queues-in-mas-90)
- [MAS 9.0 New Features - Naviam](https://www.naviam.io/resources/blog/mas-9-0-release-new-features-and-functionalities)

### TheMaximoGuys Blog Series
- [MAS Features Series (25 parts)](https://themaximoguys.ai/blog/mas-features-series-index) -- comprehensive feature-by-feature breakdown of all MAS 9 changes

---

**Document:** DOC7 -- MAS 9 Work Order Management Roadmap
**Author:** TheMaximoGuys Technical Team
**Version:** 1.1
**Last Updated:** April 2, 2026
