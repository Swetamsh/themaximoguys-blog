# MAS 9 Manage Upgrade Roadmap: Team Exploration Guide

## From Maximo 7.6 to MAS 9 Manage -- What Changed and What Your Team Needs to Learn

**Document Scope:** This document covers ONLY Maximo Manage-specific changes. MAS Suite add-on applications (Health, Monitor, Predict, Visual Inspection, Assist/Collaborate) are covered in a separate document.

**Document Purpose:** This is a team exploration roadmap. Each section is designed so that a team member (or small group) can pick an area, study it, build hands-on expertise, and report back to the larger team. The goal is distributed learning with full team coverage.

**Last Updated:** March 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture and Infrastructure Changes](#2-architecture-and-infrastructure-changes)
3. [Navigation and UI Framework Changes](#3-navigation-and-ui-framework-changes)
4. [Work Centers to Role-Based Applications (CRITICAL)](#4-work-centers-to-role-based-applications)
5. [Operational Dashboard Deep Dive](#5-operational-dashboard-deep-dive)
6. [Work Queue Manager](#6-work-queue-manager)
7. [Graphical Scheduling and Dispatching](#7-graphical-scheduling-and-dispatching)
8. [Maximo Mobile (Replaces Maximo Anywhere)](#8-maximo-mobile)
9. [Map and Spatial Features](#9-map-and-spatial-features)
10. [Security Model Changes](#10-security-model-changes)
11. [Automation Scripts](#11-automation-scripts)
12. [Integration Framework Changes](#12-integration-framework-changes)
13. [Reporting Changes](#13-reporting-changes)
14. [Reliability Strategies Library](#14-reliability-strategies-library)
15. [Qualifications and Skills Management](#15-qualifications-and-skills-management)
16. [AI Features in Manage (MAS 9.1)](#16-ai-features-in-manage)
17. [Common Upgrade Challenges and Gotchas](#17-common-upgrade-challenges-and-gotchas)
18. [Team Exploration Assignment Matrix](#18-team-exploration-assignment-matrix)
19. [Recommended Learning Path](#19-recommended-learning-path)
20. [References and Resources](#20-references-and-resources)

---

## 1. Executive Summary

### The Magnitude of This Upgrade

The upgrade from Maximo 7.6 to MAS 9 Manage is NOT a typical version upgrade. It is a complete platform transformation that touches every layer of the system:

- **Architecture:** Monolithic WebSphere EAR deployment transforms into containerized microservices on Red Hat OpenShift
- **Runtime:** Java 8/11 moves to Java 17 with strict module enforcement
- **User Interface:** Traditional Maximo skin system is replaced entirely by IBM Carbon Design System
- **Navigation:** Work Centers are GONE -- removed entirely starting in MAS 8.9 and fully eliminated in MAS 9.x
- **Mobile:** Maximo Anywhere is dead -- replaced by Maximo Mobile built on modern React.js/MAF stack
- **Integration:** RMI is deprecated -- REST/JSON API is the primary integration mechanism
- **Reporting:** BIRT is being phased out in favor of Cognos Analytics
- **Licensing:** Per-module licensing is replaced by AppPoints consumption model
- **Security:** Standalone authentication is replaced by SAML/OIDC/LDAP via Suite-level SSO
- **Database:** Still DB2/Oracle/SQL Server, but the database is now "sealed" -- no direct SQL access in managed deployments
- **Maps:** Google Maps and Bing Maps are deprecated -- OpenMap with ArcGIS is the new standard

### Key Message for the Team

This is not "Maximo with a new coat of paint." This is a fundamentally different platform that happens to run the same business logic underneath. Every team member needs to understand the areas relevant to their role. The old muscle memory from 7.6 will help with business process understanding, but the mechanics of how you configure, customize, integrate, and operate the system have changed substantially.

### What Did NOT Change

To provide comfort alongside the disruption, here is what remains fundamentally the same:

- Core business objects (Work Orders, Assets, Locations, PMs, Job Plans, etc.) retain the same data model
- Application Designer still exists for classic application customization
- Automation Scripts (Jython/JavaScript) are still the primary customization mechanism
- MIF (Maximo Integration Framework) still works for existing integrations
- Start Centers still function (though Operational Dashboard is the strategic replacement)
- Escalations, Workflows, Communication Templates, Cron Tasks all still work
- The underlying MBO (Maximo Business Object) framework remains

---

## 2. Architecture and Infrastructure Changes

### 2.1 Platform Architecture Comparison

| Component | Maximo 7.6 | MAS 9 Manage |
|-----------|-----------|--------------|
| **Application Server** | WebSphere Application Server ND 8.5/9.0 or WebLogic | WebSphere Liberty on OpenShift containers |
| **Java Runtime** | Java 8 (some orgs on Java 11) | Java 17 (mandatory as of MAS 9.1 March 2025 feature release) |
| **Deployment Model** | Monolithic EAR file deployed to app server | Containerized pods managed by Kubernetes operators |
| **Container Platform** | N/A | Red Hat OpenShift Container Platform 4.x |
| **Operating System** | Windows Server, AIX, Linux | Red Hat CoreOS (via OpenShift) |
| **Database** | DB2, Oracle, SQL Server (direct access) | DB2, Oracle, SQL Server (sealed -- no direct SQL in managed deployments) |
| **User Directory** | LDAP, local Maximo users, app server auth | MongoDB for user management + LDAP/SAML/OIDC federation |
| **Deployment Tooling** | Manual EAR deployment, IBM Installation Manager | MAS CLI, Ansible playbooks, OpenShift operators |
| **Scaling** | Vertical (bigger server) + horizontal (cluster) | Horizontal pod autoscaling, operator-managed |
| **High Availability** | WebSphere ND clustering, manual failover | Kubernetes-native HA, automatic pod restart, rolling updates |
| **SSL/TLS** | Manual certificate management | Cert-Manager operator, automatic certificate rotation |
| **Logging** | Application log files on disk | Container stdout/stderr, centralized logging (EFK/Loki) |
| **Monitoring** | Custom monitoring, ITM/IPM | Prometheus/Grafana via OpenShift monitoring stack |

### 2.2 Java 17 Migration Impact

This is a critical technical change that affects ALL custom code:

**What Breaks:**
- Custom MBO (Maximo Business Object) classes compiled against Java 8 will NOT run on Java 17 without recompilation
- Deprecated Java APIs that were removed in Java 17 will cause ClassNotFoundException or NoSuchMethodException at runtime
- JDBC drivers built for older Java versions may fail SSL handshakes due to tightened security defaults
- SOAP clients relying on legacy Java EE security configurations need updates
- The `javax.*` to `jakarta.*` namespace migration affects any code using Java EE APIs directly
- Module access restrictions in Java 17 (JPMS) will block reflective access that worked silently in Java 8

**What to Do:**
1. Inventory ALL custom Java classes in your 7.6 environment
2. Set up a Java 17 compilation environment and attempt to compile each class
3. Fix all compilation errors (deprecated API replacements, namespace changes)
4. Test under load -- some issues only surface under concurrent access
5. Strongly consider converting custom Java classes to Automation Scripts (Jython/JavaScript) -- IBM recommends this as best practice for cloud-native MAS

**Key IBM Recommendation:** Convert custom Java to Automation Scripts wherever possible. Java customization is considered an anti-pattern in cloud-native MAS architecture.

### 2.3 Database Architecture Changes

**Sealed Database Concept:**
- In MAS managed deployments (especially SaaS), direct database access via SQL clients is restricted or prohibited
- All data access must go through documented APIs (REST/JSON API, Object Structures)
- Custom database triggers, stored procedures, and direct SQL scripts from 7.6 will NOT work
- Database tuning parameters are managed by the platform, not by DBAs directly

**Database Migration Considerations (if changing database platforms):**
- SQL Server/Oracle to DB2: Case sensitivity differences can break queries (DB2 is case-sensitive by default)
- Timezone handling varies between platforms
- Index strategies differ significantly
- Collation handling needs careful mapping
- IBM increasingly bundles and recommends DB2 with MAS licensing

**MongoDB Role:**
- MongoDB is used at the MAS Suite level for user management and session handling
- It is NOT a replacement for the relational database -- Maximo business data still lives in DB2/Oracle/SQL Server
- MongoDB handles authentication tokens, user profiles, and SSO session state

### 2.4 Deployment and Operations

**MAS CLI (Command Line Interface):**
- Primary tool for installing, configuring, and managing MAS
- Replaces IBM Installation Manager and manual deployment procedures
- Supports both interactive and scripted (Ansible) operations
- Key commands: `mas install`, `mas configure`, `mas update`, `mas status`

**Ansible Automation:**
- IBM provides official Ansible playbooks for MAS deployment
- Enables repeatable, version-controlled infrastructure-as-code deployments
- Covers full lifecycle: install, configure, update, backup, restore

**OpenShift Operators:**
- MAS components are managed by Kubernetes operators
- Operators handle upgrades, scaling, health checks, and configuration
- Custom Resource Definitions (CRDs) define the desired state of MAS components
- The operator reconciles actual state with desired state automatically

**Team Skills Required:**
- Kubernetes/OpenShift administration
- Container networking and storage (PersistentVolumeClaims)
- YAML/JSON configuration management
- Helm charts and operator lifecycle management
- Linux command line proficiency
- Certificate management (cert-manager)

### 2.5 AppPoints Licensing Model

The licensing model changed fundamentally from per-module to consumption-based:

**Old Model (7.6):**
- License per module: Scheduler, Calibration, Linear, etc.
- Separate license for each add-on
- User-count based pricing

**New Model (MAS 9):**
- Single AppPoints pool for ALL MAS products
- Points consumed based on user tier and access pattern

| User Type | Access Level | Concurrent Points | Authorized Points |
|-----------|-------------|-------------------|-------------------|
| **Limited** | Up to 3 modules | 5 | 2 |
| **Base** | Standard access | 10 | 5 |
| **Premium** | Full access + advanced features | 15 | 10 |
| **Administrative** | System config only (no industry solutions) | -- | 3 |
| **Administrative** | System config (with industry solutions) | -- | 5 |
| **Self-Service** | Limited self-service functions | 0 (free) | 0 (free) |

**Key Licensing Concepts:**
- **Authorized Users:** Points consumed continuously whether logged in or not -- best for power users
- **Concurrent Users:** Points consumed only during active sessions -- best for occasional users
- **Data Reporter Operator (DRO):** Replaces deprecated User Data Services; collects usage metrics for compliance
- **Best Practice:** Analyze login patterns from 7.6 to identify power users (Authorized) vs. occasional users (Concurrent) -- organizations shifting 10-15% of premium users to Authorized can save 100+ AppPoints

**What Is Included Without Extra AppPoints:**
- Maximo Manage (core)
- Maximo Mobile
- Maximo Scheduler (was separate license in 7.6)
- Reliability Strategies Library
- All Role-Based Applications

**What Consumes Additional AppPoints:**
- Maximo Health, Monitor, Predict, Visual Inspection (Suite add-ons)
- Maximo AI Service (10 AppPoints in 9.1)
- Maximo Optimizer (for advanced scheduling optimization)

---

## 3. Navigation and UI Framework Changes

### 3.1 Carbon Design System

MAS 9 completely replaces the traditional Maximo skin system with IBM Carbon Design System:

**What Changed:**
- ALL visual theming is now Carbon -- no more choosing between Maximo skins (tivoli09, tivoli13, etc.)
- The `mxe.webclient.skin` system property no longer applies
- Field labels are ALWAYS positioned above fields -- the `mxe.webclient.verticalLabels` property no longer functions
- Typography, colors, spacing, and interaction patterns follow Carbon standards
- The masthead (top header bar) defaults to black background with white text
- CSS class naming changed from `.bx--header` (MAS 9.0) to `.cds--header` (MAS 9.1) -- this breaks CSS customizations between versions

**CSS Customization (Available but Unsupported):**
- MAS 9.0 introduced a User Interface Customization option in Configurations
- Administrators can upload custom CSS to override Carbon styles
- IBM provides a template file: `Manage_Overrides_template.css`
- Changes take effect without application restart (major improvement over 7.6)
- WARNING: CSS customizations are NOT officially supported by IBM -- if they cause issues, IBM support will not help troubleshoot
- WARNING: CSS classes are shared across applications -- one change can affect multiple apps unexpectedly
- WARNING: CSS class names change between releases -- retesting required after every upgrade

### 3.2 Navigation Structure Changes

**Start Centers:**
- Still functional in MAS 9 -- they were NOT removed
- However, they are strategically being replaced by Operational Dashboard
- Existing Start Center configurations carry forward during upgrade
- New features (like Work Queues) are being added to Operational Dashboard, not Start Centers

**Module Navigation:**
- Side navigation panel provides module-level navigation
- Application tabs are now docked at the top of the screen (not in a separate tab bar)
- Breadcrumb navigation improved for multi-level drill-down

**Table Enhancements (MAS 9.0/9.1):**
- Action toolbar above tables (replaces right-click context menus in some cases)
- Inline filter row for column-level filtering
- Improved pagination controls
- Column resize and reorder capabilities
- Bulk selection with action toolbar

**New UI-Related System Properties:**

| Property | Purpose | Default |
|----------|---------|---------|
| `mxe.webclient.showTableHeaderNavKeys` | Controls visibility of table header navigation shortcut keys | varies |
| `mxe.webclient.paginationButtonsPlacement` | Controls placement of pagination controls (top/bottom/both) | bottom |

### 3.3 Visual Changes in MAS 9.1 Specifically

- Brighter color palette compared to 9.0
- Wider spacing between links in Quick Insert and Favorite Application portlets
- Checkboxes returned for Boolean (YORN) fields that display only 0 or 1 values (replacing toggle switches used in MAS 8.4 through 9.0)
- Pagination controls made more prominent in some applications to reduce scrolling

---

## 4. Work Centers to Role-Based Applications

### THIS IS THE MOST IMPACTFUL CHANGE FOR DAY-TO-DAY USERS

### 4.1 Background

Work Centers were introduced in Maximo 7.6 as role-specific applications that consolidated multiple classic applications into single-purpose interfaces for specific job roles. They were heavily adopted and customized by many organizations.

**Starting with MAS 8.9 (Q4 2022), IBM began systematically removing Work Centers.** They are fully removed in MAS 9.x releases. The replacements are Role-Based Applications (RBAs) built on the Maximo Application Framework (MAF) using React.js.

### 4.2 Complete Work Center to RBA Migration Map

| Legacy Work Center | MAS 9 Replacement | Status | Notes |
|-------------------|-------------------|--------|-------|
| **Business Analyst Work Center** | Operational Dashboard + Maintenance Manager RBA | Available | Dashboard provides KPIs; Maintenance Manager provides operational views |
| **Data Set Designer** | Operational Dashboard (card configuration) | Available | Dashboard card builder replaces dataset configuration |
| **Inspection Forms Work Center** | Inspection Forms RBA (rebuilt on MAF) | Available | Completely rebuilt -- old customizations do NOT carry over |
| **Conduct an Inspection** | Inspections RBA | Available | New workflow for conducting inspections; integrated with mobile |
| **Work Execution Work Center** | Technician app (Maximo Mobile) + Work Order Tracking (classic) | Available | Mobile-first approach; field technicians use Maximo Mobile |
| **Work Supervisor** | Approvals application | Available | GAPS: Cannot review SRs and convert to WOs in single workflow as old supervisor WC could |
| **Service Request Work Center** | Service Request RBA | Available | Rebuilt for modern UX; some workflow differences |
| **Assets Work Center** | Asset Manager RBA | Available | GAPS: Asset moves/swaps not supported unless using ACM (Asset Configuration Management) |
| **Inventory Work Centers** | Inventory Count RBA, Issues and Transfers RBA, Receiving RBA | Available | GAPS: Some pick list displays and specialized inventory views not yet replicated |
| **Administrative Work Centers** | API Key Management, Security Groups, System Configuration | Available | Distributed across multiple admin applications |
| **Purchasing/Procurement Work Centers** | Classic applications remain | Classic | No RBA replacement yet; use classic Purchase Orders, RFQs, etc. |

### 4.3 Critical Migration Facts

**NO AUTOMATIC MIGRATION TOOLING EXISTS:**
- There is no IBM-provided tool that converts Work Center customizations to RBA configurations
- Every Work Center customization must be manually analyzed
- Administrators must determine: (a) if equivalent RBA functionality exists, (b) if the customization can be rebuilt in MAF, or (c) if the customization should be retired

**Technology Difference:**
- Work Centers: Application Designer XML + JSP files, configured via desktop Application Designer
- RBAs: React.js-based MAF, configured via cloud-native MAF Configuration application in MAS
- These are completely different technology stacks -- you cannot port configurations between them

**Known Functionality Gaps (as of MAS 9.1):**

| Gap Area | Description | Workaround |
|----------|-------------|------------|
| Supervisor SR-to-WO conversion | Old Supervisor WC allowed review SR and create WO in one workflow | Use classic Work Order Tracking + Service Request apps |
| Asset moves/swaps | Asset Manager RBA does not support moves/swaps | Requires ACM (Asset Configuration Management) add-on or classic Assets app |
| Inventory pick lists | Specialized pick list displays from Inventory WC | Use classic Inventory app for complex pick list workflows |
| Custom query portlets | Work Center query portlets with custom configurations | Rebuild as Work Queues in Work Queue Manager |

### 4.4 Migration Strategy for Work Center Customizations

**Step 1: Inventory**
- Document every Work Center customization in your 7.6 environment
- For each customization, record: what it does, who uses it, how often, business criticality

**Step 2: Classify**
- Category A: Customization has direct RBA equivalent -- reconfigure in MAF
- Category B: Customization can be achieved with Automation Scripts -- rewrite
- Category C: Customization addresses a gap -- defer until IBM adds functionality, or use classic app
- Category D: Customization is no longer needed -- retire

**Step 3: Execute**
- Rebuild Category A items first (quick wins)
- Develop Category B items (requires scripting effort)
- Document Category C items and track IBM roadmap for gap closure
- Communicate Category D retirements to affected users

**Step 4: Train**
- Users who lived in Work Centers need training on new RBA navigation and workflows
- Do NOT underestimate this -- the look, feel, and workflow are significantly different

---

## 5. Operational Dashboard Deep Dive

### 5.1 Overview

The Operational Dashboard is IBM's strategic replacement for Start Centers. It provides a card-based analytics interface built on Carbon Design System.

**Key Difference from Start Centers:**
- Start Centers: Role-based portlet configuration (Result Sets, KPIs, Favorites, Quick Insert, Inbox/Assignments)
- Operational Dashboard: Card-based analytics with more sophisticated visualization capabilities

**Current Limitation (as of MAS 9.1):**
- Operational Dashboards CANNOT yet be assigned to specific users or security groups
- Individual users CANNOT create fully personalized dashboard views
- This means many organizations continue using Start Centers for primary landing pages while adopting Operational Dashboard for specific operational scenarios

### 5.2 Card Types Available

| Card Type | Available Since | Description |
|-----------|----------------|-------------|
| **KPI Trend** (formerly KPI Chart) | MAS 8.x | Line chart showing KPI values over time with trend indicators |
| **KPI Comparison** | MAS 8.x | Compare multiple KPIs across line, bar, pie, or donut graph types |
| **KPI Value** | MAS 8.x | Single KPI display with trend indicator showing change since last refresh |
| **Value** | MAS 8.x | Simple numeric value display |
| **Favorites** | MAS 8.x | Quick links to frequently used applications or records |
| **Quick Actions** | MAS 8.x | One-click buttons to launch common tasks |
| **Table** | MAS 8.x | Tabular data display with configurable columns |
| **Work Queues** | MAS 9.0 | Integration with Work Queue Manager -- displays queue counts and allows drill-down |
| **External Content** | MAS 9.0 | Embed any external URL on the dashboard (third-party analytics, web apps) |
| **Threshold Tile** | MAS 9.1 | Color-coded tile showing values against defined thresholds |

### 5.3 KPI Manager Application

The KPI Manager application allows creation and management of custom KPIs:

**Out-of-the-Box KPIs:**
- Emergency Work Orders
- Preventive Maintenance Compliance
- Overdue Work Orders
- Work Order Backlog
- Mean Time Between Failures (MTBF)
- Mean Time To Repair (MTTR)
- Asset Downtime
- Planned vs. Unplanned Work Ratio

**Custom KPI Configuration:**
- Define custom queries against any Maximo object
- Set refresh intervals
- Define thresholds for color-coding (green/yellow/red)
- Configure trend calculations
- In MAS 9.1: KPI services can return JSON from external APIs (not just Maximo queries)

### 5.4 Preconfigured Dashboards

**Maintenance Manager Dashboard:**
- Ships with 4 default KPIs: Emergency Work, PM Compliance, Overdue WOs, Backlog
- Targeted at maintenance managers and planners
- Customizable -- can add/remove/rearrange cards

**Emission Management Dashboard (HSE Module):**
- Environmental compliance focused
- Tracks emission KPIs
- Requires HSE (Health, Safety, and Environment) module activation

### 5.5 Dashboard Customization

- Drag-and-drop card arrangement
- Card resize (small, medium, large, full-width)
- Save layouts
- Public dashboards (visible to all) vs. private dashboards (visible to creator)
- Export card data to CSV, PNG, or JPG formats
- Dashboard URL sharing for collaboration

---

## 6. Work Queue Manager

### 6.1 Overview

The Work Queue Manager is a new application that replaces the Result Set Portlets functionality from Start Centers. It provides a more sophisticated mechanism for creating, managing, and distributing predefined queries as actionable work queues.

### 6.2 Creating Work Queues

**Configuration Steps:**
1. Navigate to Work Queue Manager application
2. Define the queue name and description
3. Select the target object (Work Orders, Service Requests, Assets, etc.)
4. Build the query using Where Clause editor or Advanced SQL
5. Set the priority level
6. Define which person groups can see the queue
7. Add available actions to the queue
8. Save and activate

### 6.3 Queue Configuration Details

**Priority Settings:**

| Priority | Visual Indicator | Use Case |
|----------|-----------------|----------|
| **Urgent** | Red indicator | Safety-critical work, emergency repairs |
| **High** | Orange indicator | Time-sensitive maintenance, SLA-approaching items |
| **Medium** | Yellow indicator | Standard planned work, routine maintenance |
| **Low** | Blue/Gray indicator | Backlog items, nice-to-have improvements |

**Person Group Visibility:**
- Each queue can be assigned to one or more person groups
- Users see only queues assigned to their person group(s)
- Administrators see all queues regardless of assignment
- This replaces the security-group-based Result Set visibility from Start Centers

**Available Actions:**
- Actions can be added to queues for quick execution without opening records
- Examples: Change Status, Assign to Person, Update Priority, Add to Schedule
- Actions respect existing security permissions -- users can only execute actions they have rights to

### 6.4 Integration with Operational Dashboard

- The **Work Queues card** on Operational Dashboard connects to Work Queue Manager
- Card displays queue name, record count, and priority indicator
- Clicking a queue on the dashboard opens the full queue view
- Queue counts refresh based on dashboard refresh interval
- Multiple queues can be displayed on a single Work Queues card

### 6.5 Migration from Start Center Result Sets

| Start Center Feature | Work Queue Manager Equivalent |
|---------------------|-------------------------------|
| Result Set portlet with saved query | Work Queue with equivalent Where Clause |
| Result Set action buttons | Queue Actions |
| Security group visibility | Person Group visibility |
| Result Set record count | Queue count on Operational Dashboard card |
| Click-to-open record | Drill-down from queue to record |

**Migration Steps:**
1. Export all Start Center Result Set configurations (queries, security assignments)
2. Recreate each as a Work Queue in Work Queue Manager
3. Assign appropriate person groups
4. Add corresponding actions
5. Create Work Queues cards on Operational Dashboard
6. Validate counts match between old and new
7. Train users on new navigation pattern

---

## 7. Graphical Scheduling and Dispatching

### 7.1 Overview

Maximo Scheduler is now included as a core capability in MAS (it required separate licensing in Maximo 7.6). This gives all organizations access to advanced graphical scheduling and dispatching tools.

### 7.2 Scheduling Applications

| Application | Purpose | Key Features |
|------------|---------|--------------|
| **Graphical Scheduling** | Gantt-chart-based project scheduling | Gantt chart view, dependency management, critical path method (CPM), resource leveling, drag-and-drop rescheduling |
| **Graphical Scheduling -- Large Projects** | Performance-optimized for 10,000+ record projects | Paginated loading (50 records at a time), collapsed child records by default, cross-page dependency display, full-project CPM |
| **Graphical Assignment** | Dispatching work to technicians | Drag-and-drop assignment, color-coded status, shift time display, availability reason codes, dispatch status indicators |
| **Graphical Work Week** | Weekly planning view | Week-at-a-glance scheduling, capacity planning, drag rescheduling within the week |
| **Graphical Resource View** | Monthly calendar for resource planning | Monthly calendar display, resource availability, capacity heat maps |
| **Graphical Assignment -- Repair Facilities** | Specialized for repair/shop environments | Shop-floor scheduling, bay/station assignment, repair timeline tracking |
| **Graphical Crew Management** | Crew-based scheduling | Crew availability, crew assignment to work, crew skills matching |
| **Graphical Appointment Book** | Customer-facing appointment scheduling | Time slot management, appointment booking, customer notification integration |

### 7.3 Dispatching Dashboard (MAS 9.0+)

The Dispatching Dashboard replaces older graphical view terminology and provides:

- **KPI Cards:** Emergency work count, overdue assignments, technician utilization, SLA compliance
- **Schedule Cards:** Visual representation of daily/weekly schedules
- **Emergency Work Indicators:** Visual flags for emergency/urgent work orders
- **Locked Work Indicators:** Shows which assignments are locked (cannot be auto-rescheduled)
- **Dispatching Status Indicators:** Real-time status of each dispatch (assigned, en-route, on-site, completed)

**New in MAS 9.1:**
- Gantt functions display shift times and availability reason codes
- Large Neighborhood Search (LNS) algorithm for spatial scheduling optimization
- What-if analysis using RBF algorithm to understand turnaround time impacts
- Emergency work icons on Gantt bars

### 7.4 Planning Dashboard (NEW in MAS 9.1)

A completely new dashboard for planners and resource managers:

- Tracks scheduling project KPIs
- Displays break-in work orders (unplanned work injected into schedule)
- Displays break-out work orders (planned work pushed out of schedule)
- Drill-down into individual schedules and work orders
- Integration with Graphical Scheduling projects

### 7.5 Scheduling Dashboard with Resource Leveling

- Cross-project visibility: view across multiple Graphical Scheduling projects
- Resource conflict identification
- Resource leveling algorithms to balance workload
- Data quality issue detection
- Optimization opportunity highlighting

### 7.6 Maximo Optimizer

**Important:** Full optimization features require Maximo Optimizer, which is a separate component that consumes additional AppPoints.

**What Optimizer Provides:**
- Automated schedule optimization (not just manual drag-and-drop)
- Constraint-based scheduling (skills, tools, materials, proximity)
- Travel time optimization for field dispatching
- "What-if" scenario planning
- Advanced algorithms: Large Neighborhood Search (LNS), Rule-Based Filtering (RBF)

**Without Optimizer:**
- Manual scheduling via Gantt drag-and-drop still works
- No automated optimization
- No spatial/travel-time optimization
- Basic resource leveling available through Scheduling Dashboard

---

## 8. Maximo Mobile

### 8.1 Overview

Maximo Mobile completely replaces Maximo Anywhere, which is no longer supported in MAS 9.0 and later. It is a ground-up rebuild on modern technology.

| Aspect | Maximo Anywhere (7.6) | Maximo Mobile (MAS 9) |
|--------|----------------------|----------------------|
| **Technology** | IBM Worklight/MobileFirst + Dojo | React.js on Maximo Application Framework (MAF) |
| **Offline** | Full offline with local database | Full offline with optimized sync |
| **App Store** | Required wrapping for app store deployment | Progressive Web App (PWA) -- no app store required |
| **Customization** | XML configuration + custom adapters | MAF Configuration application |
| **Inspection Forms** | Downloaded per inspection | Downloaded ONCE at login (significant performance improvement) |
| **Updates** | Required rebuild and redeployment | Server-side updates -- no device-side redeployment |

### 8.2 Available Mobile Applications

| Mobile App | Target User | Key Capabilities |
|-----------|-------------|------------------|
| **Technician** | Field technicians | Accept/reject assignments, report labor/materials, status changes, GPS sharing, offline work, barcode scanning, electronic signatures, calibration work orders |
| **Asset Manager** | Asset inspectors and managers | Asset data collection, condition assessment, meter readings, asset creation from field |
| **Inspection Forms** | Inspectors | Execute inspections, capture photos/signatures, offline inspection completion |
| **Issues and Transfers** | Storeroom clerks | Issue inventory, transfer between storerooms, tools transfer with/without reservations |
| **Inventory Receiving** | Receiving clerks | Receive items against POs, inspect received goods, put-away processing |
| **Inventory Count** | Count personnel | Physical inventory counts, cycle counts, barcode-driven counting |
| **Service Request** | All users / self-service | Create service requests, attach photos, view status, rich text descriptions |

### 8.3 Technician App Deep Dive

**MAS 9.0 Features:**
- Assignment acceptance or rejection before starting work
- Calibration work order support with as-found and as-left measurement validation
- Quick reporting: rapid work order creation in in-progress state
- GPS-based location sharing with configurable sharing settings
- Server-side search (searches execute on server, not local device)
- Partial data refresh (sync only changed records, not full dataset)
- Linear asset support for infrastructure maintenance
- Material request creation from mobile
- Electronic signature enforcement on status changes
- Asset barcode scanning enforcement before status changes

**MAS 9.1 Enhancements:**
- Unassign or reassign already-accepted assignments
- Self-assign work orders from a queue
- Configure start-travel display regardless of GPS distance
- Automatically stop timers when starting another work order
- Create follow-up work orders with applicable asset/location selection
- View work order history for assets while in the field

**Key System Property:**

```
maximo.mobile.locationssharing.enabled=1
```

This enables GPS location sharing for the Technician app. When enabled, technician locations are periodically sent to the server and displayed on maps in dispatching views.

### 8.4 Service Request Mobile (MAS 9.0/9.1)

**MAS 9.0:**
- Rich text formatting with hyperlinks in descriptions
- Attachment renaming with file name and description customization
- Web link opening in system browsers
- Photo attachment from camera or gallery

**MAS 9.1:**
- Service Request duplication
- View Service Requests created by other users
- Create Service Requests directly from map interfaces

### 8.5 Inventory and Receiving Mobile

**Issues and Transfers:**
- Stage items for issue
- Issue inventory items without reservations
- View and edit charge information
- Transfer items between storerooms
- Create shipments for transfers
- Tools transfer with or without reservations
- Reference work orders, material requests, or internal purchase orders

**Inventory Count:**
- Barcode-driven counting
- Cycle count support
- Count reconciliation (online only -- not available offline)
- Multi-bin counting
- Count approval workflow

**Receiving:**
- Receive against purchase orders
- Inspection on receipt
- Quantity validation
- Put-away location assignment

### 8.6 Offline Capabilities

- Full offline work for Technician, Inspections, and other field apps
- Data synchronized when connectivity restored
- Conflict resolution for concurrent edits
- Configurable sync scope (which data downloads to device)
- Storage management for device capacity

---

## 9. Map and Spatial Features

### 9.1 Map Provider Changes

**CRITICAL CHANGE:** Google Maps and Bing Maps are deprecated as mapping providers in MAS 9.0.

| Map Feature | Maximo 7.6 | MAS 9 |
|------------|-----------|-------|
| **Primary Map Provider** | Bing Maps or Google Maps | OpenMap (open-source) |
| **Enterprise GIS** | Limited ArcGIS integration | Full ArcGIS integration for spatial scheduling |
| **Map in Applications** | Separate Map Manager module | Maps integrated throughout core applications |
| **Technician Tracking** | Not available | GPS-based technician location on map |
| **Work Order Creation** | Not from map | Create work orders by clicking location on map |

### 9.2 OpenMap Integration

- OpenMap is the default map provider -- works out of the box with no API key required
- Supports standard mapping features: zoom, pan, layers, markers, clustering
- Asset and location plotting on maps
- Work order visualization with status-based color coding
- Route visualization between work order locations

### 9.3 ArcGIS Integration for Spatial Scheduling

For organizations with Esri ArcGIS infrastructure:

- **Spatial Scheduling:** Optimize dispatch routes based on geographic proximity
- **Travel Time Calculation:** Estimate travel times between work locations using road network data
- **Territory Management:** Define and visualize service territories
- **Asset Visualization:** Plot assets on GIS layers with attribute-based styling
- **Integration Configuration:** Connect MAS to ArcGIS Enterprise or ArcGIS Online

### 9.4 Map Features Across Applications

| Application | Map Capability |
|------------|---------------|
| **Work Order Tracking** | View work orders on map, create WOs from map click |
| **Technician (Mobile)** | View assigned work on map, navigate to work location |
| **Graphical Assignment** | View technician locations and work locations, spatial dispatching |
| **Service Request** | Plot SR locations, create SRs from map (9.1) |
| **Asset Manager** | View assets on map, asset proximity analysis |
| **Dispatching Dashboard** | Real-time technician and work visualization |

### 9.5 Travel Time Optimization

- Requires Maximo Optimizer + ArcGIS integration
- Calculates optimal route for multi-stop technician assignments
- Considers: road network, traffic patterns, technician start location, work priority
- Updates routes dynamically as emergency work is injected
- Reduces windshield time and improves technician utilization

---

## 10. Security Model Changes

### 10.1 Authentication Architecture

The security model changed fundamentally from 7.6:

| Security Aspect | Maximo 7.6 | MAS 9 |
|----------------|-----------|-------|
| **Authentication** | App server auth, LDAP, or native Maximo | Mandatory external IdP: SAML, OIDC, LDAP, or local MongoDB |
| **SSO** | Optional, required manual config | Built-in at Suite level |
| **User Directory** | VMMSYNC or manual creation | MongoDB + LDAP sync with field transformation |
| **API Authentication** | Basic auth, LTPA tokens | API Keys, OAuth tokens |
| **Certificate Management** | Manual | Cert-Manager operator with auto-rotation |

### 10.2 Supported Authentication Methods

**Local MongoDB Authentication:**
- Default method when no external IdP is configured
- Provides SSO across all MAS applications
- Suitable for development/test environments or small deployments
- User credentials stored in MongoDB (hashed)

**LDAP Authentication:**
- Delegates authentication to corporate LDAP servers
- REQUIRES secure LDAP (LDAPS) with TLS -- non-TLS connections are NOT supported
- Configurable user synchronization with custom field mapping
- Field value transformation during sync (e.g., map LDAP attributes to Maximo fields)
- MAS 9.1: Support for multiple LDAP servers for synchronization

**SAML Authentication:**
- Enterprise SSO across Maximo and other SAML-supporting applications
- Can be configured as default IdP with seamless login (direct redirect to SAML IdP)
- WARNING: Seamless login skips the Maximo login page -- if you need to display compliance/legal notices before login, seamless login prevents this
- Supports SAML 2.0 standard

**OpenID Connect (OIDC):**
- Introduced in MAS 9.0
- Additional federation option alongside SAML
- Supports modern OAuth 2.0 / OIDC flows
- Integration with Azure AD, Okta, Keycloak, and other OIDC providers

**MAS 9.1 Enhancements:**
- Configure multiple identity providers of the same authentication type (fallback scenarios)
- Self-registration: Users can create their own accounts and access applications
- Multiple LDAP server synchronization for complex organizational structures

### 10.3 Authorization (Unchanged Conceptually)

Authorization is still managed within MAS/Manage:

- **Security Groups** still control access to applications, options, and data
- **Conditional Expression** security still works for row-level data security
- **Object Structure Security** added for RBAs -- controls what data RBAs can access
- **Application Security** still controls menu options, toolbar buttons, and field visibility

### 10.4 API Key Management

New in MAS for integration authentication:

- **API Keys** replace basic authentication for REST API calls
- Created and managed in the API Key Management application
- Each key has a defined scope (which Object Structures it can access)
- Keys can be rotated without disrupting active integrations (grace period)
- Keys are tracked for audit purposes
- Best practice: One API key per integration endpoint, not shared keys

### 10.5 Certificate Management

- Cert-Manager operator handles TLS certificates automatically
- Supports Let's Encrypt and custom CA certificates
- Automatic certificate rotation before expiration
- Custom certificates can be uploaded for internal CA environments
- Certificate trust chain management for integration endpoints

---

## 11. Automation Scripts

### 11.1 What Remains the Same

- Automation Scripts are STILL the primary customization mechanism
- Jython (Python on JVM) and JavaScript are still supported languages
- Script triggers: Object Events (Init, Validate, Save, etc.), Action Launch Points, Attribute Launch Points
- Library scripts for shared code
- Automation Script debugging tools
- Script versioning

### 11.2 What Changed

**Java 17 Compatibility:**
- Scripts that use Java reflection may break due to Java 17 module restrictions
- Scripts calling deprecated Java APIs will fail if those APIs were removed in Java 17
- Scripts importing specific Java packages may need import path updates
- The `javax.*` namespace is migrating to `jakarta.*` in some cases

**Specific Changes to Watch:**

| Change | Impact | Action Required |
|--------|--------|----------------|
| Java 17 module system (JPMS) | Reflective access to internal JDK classes blocked | Rewrite scripts that access internal Java APIs |
| Deprecated API removal | Methods deprecated in Java 8/11 removed in Java 17 | Update to replacement APIs |
| Security Manager removal | `java.security.Manager` removed in Java 17 | Remove any scripts that reference Security Manager |
| Stricter type checking | Some implicit type conversions that worked in Java 8 fail | Add explicit type conversions |
| SSL/TLS defaults tightened | Scripts making HTTPS calls may fail handshake | Update SSL context configuration in scripts |

**Library Script Changes:**
- Library scripts are still supported but should be reviewed for Java 17 compatibility
- Shared functions should be tested independently before upgrade
- Consider consolidating library scripts during migration

**New Automation Script Triggers (MAS 9.x):**
- Additional launch point types for RBA events
- Enhanced integration event triggers
- Improved error handling and logging mechanisms

### 11.3 Best Practices for MAS 9

1. **Convert Java customizations to Automation Scripts** -- IBM strongly recommends this
2. **Test ALL existing scripts** in a MAS 9 sandbox before production upgrade
3. **Use Jython** over JavaScript for complex logic (better Java interop)
4. **Avoid direct Java class references** where Maximo API alternatives exist
5. **Use `service.log_*` methods** for logging (not Java logging frameworks)
6. **Review import statements** in every script for deprecated packages

---

## 12. Integration Framework Changes

### 12.1 Integration Architecture Evolution

| Integration Aspect | Maximo 7.6 | MAS 9 |
|-------------------|-----------|-------|
| **Primary API** | MIF (SOAP/XML), legacy REST (`/maxrest/rest`) | JSON API (`/api`), OSLC (`/oslc`) |
| **Authentication** | Basic auth, LTPA tokens, app server security | API Keys, OAuth tokens |
| **Messaging** | JMS queues | Apache Kafka event streaming |
| **RMI** | Supported for remote MBO access | DEPRECATED -- will be removed |
| **File Integration** | Flat file with Interface Tables | REST API data import/export (CSV, JSON, XML) |
| **Real-time Events** | Publish Channels via JMS | Kafka topics + Publish Channels |

### 12.2 REST API / JSON API (Recommended Approach)

The JSON API is the recommended integration mechanism for all new integrations:

**Endpoint:** `https://<host>/api/os/<objectstructure>`

**Key Features:**
- Clean JSON payloads (use `lean=1` parameter to eliminate OSLC naming complexity)
- Full CRUD operations on all Object Structures
- Bulk operations for mass data operations
- Attachment upload/download via API
- Saved queries as API endpoints
- Pagination support for large result sets
- Field selection (return only needed fields to reduce payload size)

**Example -- Query Work Orders:**
```
GET /api/os/mxwodetail?lean=1&oslc.where=status="APPR"&oslc.select=wonum,description,status
```

**Example -- Create Work Order:**
```
POST /api/os/mxwodetail?lean=1
Content-Type: application/json
{
  "siteid": "BEDFORD",
  "description": "New pump installation",
  "worktype": "PM",
  "classstructureid": "1234"
}
```

### 12.3 OSLC API (Legacy but Functional)

- Original REST implementation using OSLC (Open Services for Lifecycle Collaboration) naming conventions
- Attribute names use prefixes like `spi:`, `dcterms:`, `foaf:` -- more complex than JSON API
- Still supported but JSON API (`lean=1`) is preferred
- Endpoint: `https://<host>/oslc/os/<objectstructure>`

### 12.4 MIF (Maximo Integration Framework) -- Still Works

Existing MIF configurations continue to work in MAS 9:

- **Publish Channels** still publish outbound data
- **Enterprise Services** still receive inbound data
- **Object Structures** are enhanced and still central to integration
- **External Systems** configuration still defines integration endpoints
- **Interface Tables** still work for database-level integration (where database access is available)
- **Flat file processing** via cron tasks still works

**However:**
- New integrations should use REST API, not MIF
- IBM is investing in REST API capabilities, not MIF enhancements
- Kafka-based messaging is replacing JMS queues for event-driven patterns

### 12.5 Apache Kafka Integration

New event-driven integration mechanism:

- Configure Kafka providers in External Systems
- Maximo publishes events to Kafka topics when business objects change
- External systems subscribe to relevant topics
- Supports both structured messages (Object Structure-based) and custom event payloads
- Better scalability than JMS for high-volume integrations
- Native support in OpenShift via Strimzi operator

### 12.6 Data Import/Export via REST API

**Import:**
- Synchronous import: POST data directly to Object Structure endpoint
- Asynchronous import: Upload CSV/JSON/XML files, processed by `APIFILEIMPORT` cron task
- Default processing interval: every 30 minutes (configurable)
- Error files downloadable containing specific validation failures

**Export:**
- REST API for asynchronous CSV export from UI tables
- Combines paginated data into single downloadable file
- Supports all Object Structure-based data

### 12.7 RMI Deprecation

**RMI (Remote Method Invocation) is deprecated and should NOT be used for new integrations:**
- Legacy integration mechanism allowing direct remote access to MBO methods
- Does not work reliably in containerized environments
- No IBM investment in maintenance or enhancement
- All RMI-based integrations must be rewritten to use REST API
- Timeline: Expected to be fully removed in a future MAS release

### 12.8 Integration with External Systems

MAS 9 provides pre-built connectors or documented integration patterns for:

| External System | Integration Method |
|----------------|-------------------|
| SAP ERP | Pre-built connector (ME module) |
| Oracle ERP | REST API integration patterns |
| Workday | REST API integration |
| TRIRIGA | REST API / Kafka events |
| Envizi (ESG) | REST API integration |
| ServiceNow | REST API bidirectional sync |
| Salesforce | REST API integration |

---

## 13. Reporting Changes

### 13.1 BIRT to Cognos Transition

This is one of the most disruptive changes for organizations with extensive BIRT reporting:

| Reporting Aspect | Maximo 7.6 | MAS 9 |
|-----------------|-----------|-------|
| **Report Engine** | BIRT (built-in) | Cognos Analytics (external) or standalone Cognos |
| **Report Designer** | BIRT Report Designer (Eclipse-based) | Cognos Analytics report authoring |
| **Report Migration** | N/A | NO automatic migration -- reports must be recreated |
| **Ad-hoc Reporting** | Limited BIRT ad-hoc | Cognos ad-hoc query and reporting |
| **Dashboards** | BIRT portlets on Start Centers | Operational Dashboard + Cognos dashboards |

### 13.2 Migration Considerations

**There is NO automatic BIRT-to-Cognos migration tool:**
- Every BIRT report must be recreated in Cognos from scratch
- Report logic, queries, layouts, and formatting must be manually redesigned
- BIRT report XML files are not compatible with Cognos
- This is a significant effort for organizations with dozens or hundreds of custom reports

**Migration Strategy:**
1. Inventory all BIRT reports -- determine which are actively used
2. Prioritize reports by business criticality and usage frequency
3. Determine alternatives: Can any reports be replaced by Operational Dashboard KPIs?
4. Recreate critical reports in Cognos first
5. Consider phased approach -- maintain BIRT for lower-priority reports during transition period

### 13.3 Cognos Analytics Integration

- Cognos Analytics deployed alongside MAS on OpenShift
- Or standalone Cognos instance connected to MAS
- Connects to Maximo database for report data
- Supports: reports, dashboards, data exploration, AI-assisted insights
- Scheduling and distribution of reports via email
- Role-based report access integrated with MAS security

### 13.4 KPI Manager as a Reporting Alternative

For many simple reporting needs, KPI Manager + Operational Dashboard can replace BIRT reports:

| BIRT Report Type | KPI/Dashboard Alternative |
|-----------------|--------------------------|
| Simple count/summary reports | KPI Value card |
| Trend reports (monthly WO counts, etc.) | KPI Trend card |
| Comparison reports (site vs site, etc.) | KPI Comparison card |
| Tabular detail reports | Work Queues card + Table card |
| Complex multi-page reports with charts | Cognos Analytics (no KPI alternative) |

### 13.5 Export Capabilities

From Operational Dashboard:
- CSV export of table/grid data
- PNG/JPG export of chart visualizations
- PDF generation from Cognos reports

From Role-Based Applications:
- CSV export via REST API asynchronous export
- Pagination combined into single download file

---

## 14. Reliability Strategies Library

### 14.1 Overview

The Reliability Strategies Library is an industry-leading resource that was previously only available through expensive consulting engagements. It is now included with MAS licensing (no additional AppPoints).

**Library Contents:**
- 800+ equipment/asset types across industries
- 58,000+ failure modes across all operating contexts
- 5,000+ preventive maintenance activities with step-by-step task guidance
- Covers: rotating equipment, electrical systems, instrumentation, structural, piping, HVAC, and more

### 14.2 How It Works

1. **Browse the Library:** Select equipment type and operating context from the catalog
2. **FMEA Viewer:** Review potential failure modes, failure effects, and recommended mitigation activities
3. **Strategy Selection:** Choose which failure modes and mitigations are relevant to your operating context
4. **Composer:** Generate suggested PM records and Job Plan tasks from selected strategies
5. **Implementation:** Review, customize, and implement generated PM/Job Plan records

### 14.3 Version Evolution

| Feature | MAS 8.11 | MAS 9.0 | MAS 9.1 |
|---------|----------|---------|---------|
| Browse library | Yes | Yes | Yes |
| View failure modes | Yes | Yes | Yes |
| Generate PMs/Job Plans | Yes | Yes | Yes |
| **Custom strategies** | No | YES | Yes |
| **AI-suggested boundary conditions** | No | No | YES |
| **Database-stored custom strategies** | No | No | YES |
| **AI-generated components/failure mechanisms** | No | No | YES |

### 14.4 Custom Strategies (MAS 9.0+)

- Create organization-specific strategies reflecting your unique assets and maintenance practices
- Define custom equipment types not in the IBM library
- Define custom failure modes based on your operational experience
- Define custom mitigation activities with your specific procedures
- Custom strategies are stored in the Maximo database (MAS 9.1) -- previously they were only in the cloud-hosted library

### 14.5 AI-Assisted Strategy Building (MAS 9.1)

- AI suggests boundary conditions based on your operating context
- AI generates suggested components, failure mechanisms, and influences
- Reduces the effort required to build custom strategies from scratch
- Requires Maximo AI Service deployment

### 14.6 Security Roles

| Security Group | Capability |
|---------------|-----------|
| **RELIABILITYSTRATEGIES** | View-only access to the library |
| **STRATEGYBUILDER** | Create and edit strategies |
| **STRATEGYIMPLEMENTER** | Implement strategies (generate PM/Job Plans) without creation rights |
| **STRATEGYVIEWER** | View completed strategies |

### 14.7 Requirements

- Cloud connectivity required (library is hosted by IBM)
- API Key authentication to access the library
- Maximo AI Service required for AI-assisted features (MAS 9.1)
- No additional AppPoints consumption for basic library access

---

## 15. Qualifications and Skills Management

### 15.1 What Is New

Maximo has always had basic person skills tracking, but MAS 9 significantly enhances qualification management:

**Qualifications in Job Plans (NEW):**
- Job Plans can now specify required qualifications for work execution
- When work orders are generated from Job Plans, qualification requirements flow to the work order
- Dispatching tools can filter available technicians by qualification match

**Qualifications in Work Order Tracking (NEW):**
- Work orders display required qualifications
- Assignment validation can check if assigned technician meets qualification requirements
- Gap analysis shows which qualifications are missing for a given assignment

### 15.2 Crew Qualification Requirements (MAS 9.1)

- Crews can have qualification requirements defined at the crew level
- When assigning a crew to work, the system validates that the crew collectively meets all qualification requirements
- Individual crew member qualifications are aggregated to determine crew capability
- Useful for complex work requiring multiple specialized skills on the same crew

### 15.3 Certificate-Required Qualifications

- Qualifications can require associated certificates (e.g., welding certification, electrical license)
- Certificate expiration tracking with advance warning
- Expired certificates automatically invalidate the associated qualification
- Integration with training management for re-certification workflows

### 15.4 Skill-Based Resource Filtering

- Graphical Assignment and Dispatching Dashboard can filter resources by qualifications
- "Best fit" assignment recommendations based on qualification match percentage
- Skills gap reporting for workforce planning
- Integration with Maximo Optimizer for skills-constrained scheduling

---

## 16. AI Features in Manage (MAS 9.1)

### 16.1 Overview

MAS 9.1 introduces AI capabilities directly into Maximo Manage. These are NOT the same as Health/Predict/Monitor AI -- these are Manage-native AI features.

### 16.2 AI Assistant (Maximo Collaborate)

**What It Does:**
- Natural language interface for querying Maximo data
- Users can ask questions in plain English and get results
- Uses the `nl2oslc` model to convert natural language to API queries

**Example Queries:**
- "Which work orders are due in the next 30 days?"
- "Show me assets that are missing data for ASSETTYPE"
- "How many open service requests are there for Building A?"
- "What is the PM compliance rate for this month?"

**Configuration:**
- Managed through AI Configuration application
- Administrators can enable/disable the assistant
- Quick Starters: Pre-configured suggested questions that appear when users open the assistant
- Prompt tuning: Customize how the assistant responds to certain types of questions
- Access controlled via security groups

**Scope (MAS 9.1):**
- Can answer questions about: Assets, Work Orders, Service Requests
- Expandable to other data types through configuration
- Answers are generated from real Maximo data (not pre-canned responses)

### 16.3 AI-Driven Field Value Recommendations

- When entering data in certain fields, AI suggests likely values based on historical patterns
- Example: When creating a work order for a specific asset, AI suggests the most likely failure class based on past work orders for that asset type
- Reduces data entry time and improves data quality
- Configurable per field and per application

### 16.4 Similar Record Detection

- When creating new records (work orders, service requests), AI identifies potentially similar existing records
- Reduces duplicate work order creation
- Shows similarity score and key matching attributes
- User can choose to view the similar record, link to it, or proceed with new creation

### 16.5 Maximo AI Service

**Requirement:** AI features in Manage require Maximo AI Service deployment.

- Maximo AI Service is a separately licensed component
- Consumes 10 AppPoints when installed
- Uses Watson LLM (Large Language Model) technology
- Monthly usage limits apply before additional Watson licensing is needed
- Deployed as an operator on OpenShift alongside MAS

### 16.6 AI Configuration Application

Administrative application for managing AI features:

| Configuration | Description |
|--------------|-------------|
| Enable/Disable AI Assistant | Turn the chat assistant on or off globally |
| Quick Starters | Define suggested questions for the assistant |
| Prompt Tuning | Customize assistant behavior for organization-specific terminology |
| Field Recommendations | Enable/disable AI field value suggestions per application |
| Similar Record Detection | Configure similarity thresholds and matching attributes |
| Usage Monitoring | Track AI usage for license compliance |

---

## 17. Common Upgrade Challenges and Gotchas

### 17.1 Showstopper Issues

These are the issues that have caused the most pain for organizations upgrading from 7.6 to MAS 9:

| Challenge | Severity | Description | Mitigation |
|-----------|----------|-------------|------------|
| **No Work Center migration tooling** | CRITICAL | All Work Center customizations must be manually rebuilt | Inventory, classify, and prioritize WC customizations before upgrade |
| **Custom Java classes fail on Java 17** | CRITICAL | Recompilation required; some APIs removed entirely | Audit all custom Java; convert to Automation Scripts where possible |
| **BIRT reports not migrated** | HIGH | Every BIRT report must be recreated in Cognos | Inventory reports; prioritize by usage; consider KPI alternatives |
| **RMI integrations broken** | HIGH | RMI is deprecated; integrations using it will fail | Rewrite all RMI integrations to REST API |
| **Direct database access restricted** | HIGH | Custom SQL scripts, triggers, stored procedures do not work | Rewrite data access logic using REST API or Automation Scripts |
| **CSS customizations break between versions** | MEDIUM | Carbon Design class names change (e.g., `.bx--` to `.cds--`) | Document all CSS customizations; retest after every upgrade |
| **User training gap** | HIGH | UI is fundamentally different; users struggle with new navigation | Plan and budget for comprehensive training program |
| **Licensing miscalculation** | MEDIUM | AppPoints model is complex; over/under-estimation is common | Analyze 7.6 usage patterns; model AppPoints carefully before purchase |

### 17.2 Technical Gotchas

**Automation Script Issues:**
- Scripts using `java.lang.reflect` for reflective access to internal classes will fail silently or throw errors
- Scripts that worked with implicit type coercion in Java 8 may require explicit casting in Java 17
- SSL/TLS calls from scripts default to stricter cipher suites -- old endpoints may reject connections
- `javax.xml` package changes may affect scripts that parse or generate XML

**Integration Issues:**
- REST API pagination behavior changed in some Object Structures
- Attachment API endpoints changed paths
- Some Object Structure field mappings have changed names or types
- Bulk operations have different size limits and timeout behaviors

**UI Issues:**
- Application Designer customizations generally carry forward, but visual rendering differs under Carbon
- Some field types display differently (toggle vs checkbox for YORN fields changed across versions)
- Print layouts are different and may need adjustment
- Screen resolution and responsive behavior changed -- test on actual user devices

**Mobile Issues:**
- Maximo Anywhere customizations do NOT carry to Maximo Mobile -- complete rebuild required
- Offline data scope may differ from Anywhere -- validate that needed records are available offline
- GPS sharing requires explicit device permission and privacy consent considerations
- Electronic signature enforcement may change existing workflows

### 17.3 Performance Tuning Differences

| Tuning Area | Maximo 7.6 | MAS 9 |
|------------|-----------|-------|
| **JVM Tuning** | Tune JVM heap, GC settings in app server admin console | Configure via container resource limits and Liberty server.xml |
| **Database Tuning** | Direct database parameter tuning | May be restricted in sealed environments; use platform-provided tuning |
| **Connection Pools** | App server connection pool configuration | Liberty data source configuration in server.xml |
| **Thread Pools** | Fixed thread pool sizing | Liberty autonomic thread pool (auto-tunes) -- optionally set `coreThreads`/`maxThreads` |
| **Caching** | Maximo application caching properties | Same Maximo properties, but container memory limits affect cache sizing |
| **Scaling** | Add app server nodes | Add pods via horizontal pod autoscaler (HPA) |
| **Load Balancing** | Hardware LB or WebSphere plugin | OpenShift Route / Ingress controller |

### 17.4 Organizational Challenges

- **Skills Gap:** The team that managed WebSphere and Windows/AIX servers may not have Kubernetes/OpenShift experience
- **Tool Chain Change:** Monitoring, logging, and alerting tools are all different in containerized environments
- **Release Cadence:** MAS uses continuous delivery -- updates come more frequently than the annual 7.6 fix packs
- **Testing Burden:** More frequent updates mean more frequent regression testing
- **Vendor Management:** OpenShift subscription, MAS license, Cognos license, and potentially ArcGIS license -- more vendor relationships to manage

---

## 18. Team Exploration Assignment Matrix

### How to Use This Matrix

Each exploration area should be assigned to a team member or small group. The assigned team explores the area hands-on in a sandbox environment, documents their findings, and presents to the full team.

| # | Exploration Area | Priority | Suggested Team Size | Estimated Effort | Dependencies | Skills Needed |
|---|-----------------|----------|--------------------|--------------------|--------------|---------------|
| 1 | Architecture and OpenShift Fundamentals | CRITICAL | 2-3 | 2 weeks | OpenShift cluster access | Linux, Kubernetes basics, networking |
| 2 | Carbon Design System and UI Navigation | HIGH | 1-2 | 1 week | MAS 9 sandbox | UI/UX familiarity, Application Designer |
| 3 | Work Center to RBA Migration Analysis | CRITICAL | 2-3 | 3 weeks | Full 7.6 customization inventory | Application Designer, business process knowledge |
| 4 | Operational Dashboard and KPI Manager | HIGH | 1-2 | 1-2 weeks | MAS 9 sandbox | KPI design, SQL/Where Clauses |
| 5 | Work Queue Manager | MEDIUM | 1 | 1 week | Operational Dashboard understanding | Where Clauses, security groups |
| 6 | Graphical Scheduling Suite | HIGH | 2 | 2-3 weeks | Scheduler module activated | Scheduling domain knowledge, Optimizer basics |
| 7 | Maximo Mobile (Technician and Inspections) | CRITICAL | 2-3 | 2-3 weeks | Mobile devices, MAS 9 sandbox | Mobile app configuration, MAF |
| 8 | Map and Spatial Features | MEDIUM | 1 | 1-2 weeks | ArcGIS license (if testing spatial) | GIS basics, map configuration |
| 9 | Security Model (SAML/OIDC/LDAP) | CRITICAL | 1-2 | 2 weeks | Identity provider access | IAM concepts, SAML/OIDC protocols |
| 10 | Automation Scripts on Java 17 | HIGH | 1-2 | 2-3 weeks | All existing script inventory | Jython/JavaScript, Java API knowledge |
| 11 | Integration Framework (REST API) | HIGH | 2 | 2-3 weeks | Integration endpoint inventory | REST APIs, JSON, Object Structures |
| 12 | Reporting Migration (BIRT to Cognos) | HIGH | 1-2 | 3-4 weeks | Cognos license, report inventory | BIRT knowledge, Cognos authoring |
| 13 | Reliability Strategies Library | MEDIUM | 1 | 1-2 weeks | MAS 9 sandbox, cloud connectivity | RCM/FMEA concepts, PM planning |
| 14 | Qualifications and Skills Management | LOW | 1 | 1 week | MAS 9 sandbox | HR/workforce domain knowledge |
| 15 | AI Features (Assistant, Recommendations) | MEDIUM | 1-2 | 1-2 weeks | Maximo AI Service deployed | AI concepts, prompt engineering basics |
| 16 | AppPoints Licensing Model | HIGH | 1 | 1 week | 7.6 usage data | Licensing analysis, Excel modeling |
| 17 | Java 17 Custom Code Migration | CRITICAL | 2-3 | 3-4 weeks | Java dev environment, custom code inventory | Java development, MBO framework |

**Total Estimated Effort:** 30-44 team-weeks across all exploration areas

**Minimum Team Size for Full Coverage:** 6-8 people working in parallel

---

## 19. Recommended Learning Path

### Phase 1: Architecture and Navigation (Weeks 1-2)

**Goal:** Understand the new platform and how to navigate it.

| Week | Activity | Who | Deliverable |
|------|----------|-----|-------------|
| 1 | OpenShift fundamentals training | Infra team | Architecture diagram, component map |
| 1 | MAS 9 sandbox setup and initial exploration | All | Each member can log in and navigate |
| 2 | Carbon Design System orientation | All | Document navigation differences from 7.6 |
| 2 | Security model walkthrough (SAML/OIDC setup) | Security lead | Authentication architecture document |

### Phase 2: Core Applications and RBAs (Weeks 3-4)

**Goal:** Understand what replaced Work Centers and how to configure new applications.

| Week | Activity | Who | Deliverable |
|------|----------|-----|-------------|
| 3 | Work Center inventory and gap analysis | App config team | Complete WC-to-RBA mapping with gap list |
| 3 | Operational Dashboard and KPI configuration | Analysts | Sample dashboards with KPIs configured |
| 4 | Work Queue Manager configuration | Analysts | Migrated Start Center Result Sets as Work Queues |
| 4 | Application Designer changes exploration | App config team | Document what changed in App Designer |

### Phase 3: Mobile and Scheduling (Weeks 5-6)

**Goal:** Hands-on experience with mobile apps and scheduling tools.

| Week | Activity | Who | Deliverable |
|------|----------|-----|-------------|
| 5 | Maximo Mobile Technician app testing | Field ops team | Test results: offline, GPS, assignments |
| 5 | Mobile Inspection Forms testing | Inspections team | Test results: form execution, photo capture |
| 6 | Graphical Scheduling and Assignment | Planners | Configured sample project with scheduling |
| 6 | Dispatching Dashboard exploration | Dispatchers | Dispatcher workflow documented |

### Phase 4: Integration and Customization (Weeks 7-8)

**Goal:** Validate that integrations and customizations work or have migration plans.

| Week | Activity | Who | Deliverable |
|------|----------|-----|-------------|
| 7 | REST API testing for all integration points | Integration team | API validation results for each integration |
| 7 | Automation Script Java 17 compatibility testing | Dev team | Script compatibility report with fixes |
| 8 | Custom Java class compilation and testing | Dev team | Java migration report |
| 8 | BIRT report inventory and Cognos pilot | Reporting team | Priority report list, first Cognos report |

### Phase 5: AI Features and Advanced Topics (Weeks 9-10)

**Goal:** Explore new capabilities and finalize migration plans.

| Week | Activity | Who | Deliverable |
|------|----------|-----|-------------|
| 9 | AI Assistant setup and testing | AI lead + app config | AI assistant demo and configuration guide |
| 9 | Reliability Strategies Library exploration | Reliability engineer | Sample strategy implementation |
| 10 | AppPoints licensing model analysis and projection | Manager + licensing lead | AppPoints consumption model and projection |
| 10 | Full team readiness assessment and go/no-go criteria | All | Migration readiness scorecard |

### Post-Phase: Ongoing Activities

- **Continuous:** Monitor IBM release notes for gap closures in RBAs
- **Continuous:** Track MAS continuous delivery updates and assess impact
- **Monthly:** Review and update migration readiness scorecard
- **Quarterly:** Reassess AppPoints consumption vs. projection

---

## 20. References and Resources

### IBM Official Documentation

| Resource | URL | Description |
|----------|-----|-------------|
| MAS 9.0 What's New | https://www.ibm.com/docs/en/masv-and-l/cd?topic=new-in-90 | Official IBM doc on 9.0 features |
| MAS 9.1 What's New (Manage) | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=manage-whats-new-in-maximo-91 | Official IBM doc on 9.1 Manage features |
| Maximo Mobile 9.0 | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=mobile-in-90 | Mobile app documentation |
| Authentication Methods | https://www.ibm.com/docs/en/masv-and-l/cd?topic=authentication-methods | Security and authentication configuration |
| AI Assistant Configuration | https://www.ibm.com/docs/en/masv-and-l/cd?topic=configurations-ai-assistant | AI assistant setup and management |
| Automation Scripts | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=administering-automation-scripts | Automation scripting reference |
| Reliability Strategies | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=module-reliability-strategies | Reliability strategies module |
| Graphical Scheduling | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=overview-scheduling-work-in-graphical-view | Scheduling application reference |
| Operational Dashboard Cards | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=dashboard-adding-cards | Dashboard card configuration |
| Data Import/Export REST API | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=apis-data-import-export-rest-api | REST API for data operations |
| RBA Security | https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=securing-defining-security-privileges-maximo-role-based-applications | Security for Role-Based Applications |
| Java 17 Transition | https://www.ibm.com/support/pages/ibm-maximo-manage-transition-java-17-maximo-application-suite-91-support-announcement | Java 17 migration support |
| Work Center Removal Notice | https://www.ibm.com/support/pages/work-centers-and-anywhere-mobile-applications-be-removed-maximo-application-suite-mas | Official deprecation notice |
| UI Customization | https://www.ibm.com/docs/en/masv-and-l/cd?topic=interface-updating-user | CSS and UI customization |
| MAF Configuration | https://www.ibm.com/docs/en/max-it/cd.0.0_cd?topic=configuring-maximo-application-framework-configuration-application | MAF app configuration |

### Community and Blog Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Maximo Secrets -- MAS 9.0/9.1 Features | https://maximosecrets.com/2025/07/06/new-features-in-mas-90-and-91/ | Detailed feature breakdown |
| Maximo Secrets -- Operational Dashboard | https://maximosecrets.com/2024/09/23/operational-dashboard-mas-9-0/ | Dashboard deep dive |
| Maximo Secrets -- UI 9.1 Changes | https://maximosecrets.com/2025/08/15/maximo-user-interface-9-1/ | UI changes documentation |
| Maximo Secrets -- Upgrading to MAS 9.0 | https://maximosecrets.com/2024/10/04/ibm-maximo-upgrading-to-mas-9-0/ | Upgrade considerations |
| Maximo Secrets -- Manage Overview | https://maximosecrets.com/ibm-maximo-manage-overview/ | Comprehensive Manage overview |
| The Maximo Guys -- Mindset Shift | https://themaximoguys.ai/blog/mindset-shift-legacy-maximo | Legacy to cloud-native mindset guide |
| The Maximo Guys -- Java to AutoScript | https://themaximoguys.ai/solutions/java-to-autoscript | Java to Automation Script conversion |
| More Maximo -- REST Integration | https://moremaximo.com/discussion/mas-9-rest-integration-architecture-mif-vs-oslc-vs-rest-api-best-practice | Integration architecture discussion |
| Naviam -- Java 17 Transition | https://www.naviam.io/resources/blog/mas-9-1-and-the-java-17-transition-what-it-and-operations-admins-need-to-know | Java 17 admin guide |
| EAM360 -- DB2 Migration | https://eam360.com/blog/navigating-the-transition-from-sql-server-oracle-to-db2-a-perspective-for-maximo-users/ | Database migration guide |
| Maintenance World -- Reliability Strategies | https://maintenanceworld.com/2024/09/26/what-is-the-reliability-strategies-function-for-mas-9-0/ | Reliability strategies introduction |
| Oxford Corp -- Change Management | https://www.oxfordcorp.com/insights/industry-commentary/end-of-maximo-7-6-support-leaves-companies-facing-change-management-and-training-gaps-amid-mas-8-9-upgrades/ | Training and change management |
| Electra Learning -- MAS 9 Advantage | https://www.electralearning.com/the-mas-9-advantage/ | MAS 9 benefits overview |

### IBM Community and Support

| Resource | URL | Description |
|----------|-----|-------------|
| IBM Community -- MAS Forum | https://community.ibm.com/community/user/asset-facilities/ | Community forums for MAS |
| IBM Support Pages | https://www.ibm.com/support/pages/ | Technotes and support articles |
| IBM Training -- Automation Scripting | https://www.ibm.com/training/course/maximo-application-suite-manage-automation-scripting-MAX4337G | Official IBM training course |

### Training and Certification Paths

| Path | Description | Recommended For |
|------|-------------|-----------------|
| IBM MAS Fundamentals | Covers Suite architecture and navigation | All team members |
| IBM Maximo Manage Administration | Manage-specific configuration and admin | System administrators |
| IBM Maximo Manage Automation Scripting (MAX4337G) | Scripting for MAS 9 | Developers and configurators |
| Red Hat OpenShift Administration | Container platform operations | Infrastructure team |
| IBM Cognos Analytics Authoring | Report creation and dashboard design | Report developers |
| ArcGIS Enterprise Administration | GIS platform management | GIS/spatial team (if applicable) |

---

## Appendix A: Quick Reference -- What Moved Where

For team members who just need a fast lookup of "where did X go?":

| Maximo 7.6 Feature | MAS 9 Location |
|--------------------|----------------|
| Start Center | Still works; being replaced by Operational Dashboard |
| Work Centers | REMOVED -- use Role-Based Applications |
| Application Designer | Still works for classic apps |
| Maximo Anywhere | REMOVED -- use Maximo Mobile |
| BIRT Reports | Being phased out -- migrate to Cognos Analytics |
| Google/Bing Maps | Deprecated -- use OpenMap / ArcGIS |
| Skin Selection | Removed -- Carbon Design System only |
| RMI Integration | Deprecated -- use REST API |
| Legacy REST (`/maxrest/rest`) | Deprecated -- use JSON API (`/api`) |
| JMS Messaging | Still works; Kafka is the strategic direction |
| WebSphere Admin Console | Replaced by Liberty admin + OpenShift console |
| IBM Installation Manager | Replaced by MAS CLI + Ansible |
| Per-Module Licensing | Replaced by AppPoints consumption model |
| LDAP Sync (VMMSYNC) | Replaced by MAS Suite-level LDAP configuration |
| Basic Auth for APIs | Replaced by API Key authentication |
| Maximo Scheduler (separate license) | Included with MAS -- no additional license |
| Result Set Portlets | Work Queue Manager + Operational Dashboard |

---

## Appendix B: Glossary of New Terms

| Term | Definition |
|------|-----------|
| **AppPoints** | Consumption-based licensing units for MAS |
| **Carbon Design System** | IBM's unified design language used across all MAS applications |
| **CRD (Custom Resource Definition)** | Kubernetes configuration format for defining MAS components |
| **DRO (Data Reporter Operator)** | Collects licensing usage metrics for compliance |
| **HPA (Horizontal Pod Autoscaler)** | Kubernetes feature that automatically scales MAS pods based on demand |
| **MAF (Maximo Application Framework)** | React.js-based framework for building Role-Based Applications |
| **MAS CLI** | Command-line tool for installing and managing MAS |
| **nl2oslc** | AI model that converts natural language queries to Maximo API calls |
| **Operator** | Kubernetes controller that manages MAS component lifecycle |
| **Pod** | Smallest deployable unit in Kubernetes; runs a MAS container |
| **PVC (PersistentVolumeClaim)** | Kubernetes storage request for persistent data |
| **RBA (Role-Based Application)** | Modern replacement for Work Centers, built on MAF |
| **Sealed Database** | Database deployment model where direct SQL access is restricted |

---

*This document is a living reference. As IBM releases new MAS versions with continuous delivery, sections should be reviewed and updated. Assign a document owner to track IBM release notes and update this roadmap accordingly.*

*Document created: March 2026*
*Applicable to: MAS 9.0 and MAS 9.1*
