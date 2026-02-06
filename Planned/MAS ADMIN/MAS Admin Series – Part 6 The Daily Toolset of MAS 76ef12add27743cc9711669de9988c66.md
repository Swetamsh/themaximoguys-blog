# MAS Admin Series – Part 6: The Daily Toolset of MAS Admins

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🧰 MAS Admin Series - Part 6

### Tools MAS Admins Use Daily

The daily toolkit for MAS admins looks very different from the old WebSphere consoles and server shells. Your tools now live in **dashboards, cloud consoles, and observability platforms**.

### Core tools for MAS SaaS admins

On SaaS, these tools become your primary interface to the platform:

- **MAS System Health Dashboard**
    - High-level view of suite and application health.
- **Integration Service Log Viewer**
    - Central place to follow integration flows and errors.
- **Message Reprocessing**
    - Tools to reprocess failed messages instead of fixing directly in the DB.
- **Systems UI (tenant admin)**
    - Administration of tenants, sites, configuration at the suite level.
- **Keycloak / Azure AD**
    - Identity and access management, SSO configuration, client credentials.
- **API Gateway**
    - Control and observe external access to MAS APIs.
- **IBM Support Portal**
    - Collaborate with IBM for deep-dive troubleshooting and restricted logs.

These tools replace server access and give you **visibility and control at the right layer**.

### Additional tools for MAS on-prem admins

On-prem admins use all of the above **plus** platform-level tools:

- **OpenShift Web Console**
    - Visual management of clusters, projects, pods, and resources.
- **oc CLI**
    - Command-line access for advanced operations and scripting.
- **pod logs and events**
    - First stop for pod-specific troubleshooting.
- **Operator Lifecycle Manager (OLM)**
    - Installation and lifecycle management of operators, including MAS operators.
- **Grafana / Elastic / Prometheus**
    - Observability tools for dashboards, metrics, and log aggregation.

As you adopt these tools, your day-to-day work looks more like a **cloud platform engineer** than a traditional application admin.