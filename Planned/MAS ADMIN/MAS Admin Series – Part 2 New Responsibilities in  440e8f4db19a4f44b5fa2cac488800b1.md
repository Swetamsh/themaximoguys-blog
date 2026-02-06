# MAS Admin Series – Part 2: New Responsibilities in MAS for SaaS and On-Prem

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🧩 MAS Admin Series - Part 2

### New Responsibilities in MAS (Both SaaS and On-Prem)

Regardless of whether you run MAS in **SaaS** or **on-prem** mode, the SysAdmin role now centers around cloud-native concepts and distributed services, not a single WebSphere stack.

### 1. Understanding MAS microservices

MAS is built as a suite of applications and services, not one monolithic EAR. As an admin, you need to understand the major components and how they relate:

- **Manage**
- **Spatial**
- **Asset Data Dictionary**
- **Monitor**
- **Predict**
- **Assist**
- **IoT**
- **Integration Services**
- **Licensing Services**

You do not manage these as EARs. Instead, you think in terms of **services**, **APIs**, and **dependencies**.

### 2. Kubernetes / containers (conceptually)

You do not need to be a hardcore Kubernetes engineer to be a strong MAS admin, but you must understand the basics:

- what a **pod** is
- what a **container restart** means
- how **services** communicate with each other
- what **health checks** are and why they matter
- how **scaling** affects performance and availability

These concepts are central whether IBM runs the cluster (SaaS) or your organization does (on-prem).

### 3. Operators - the automation engine of MAS

MAS leans heavily on **Operators** to automate lifecycle management:

Operators handle:

- installation
- upgrades
- scaling
- health checks
- configuration drift

In the legacy world, you deployed EARs and ran fix packs manually. In MAS, **operators deploy and manage Maximo**. Your job is to understand what the operators are doing, interpret their status, and respond appropriately when something drifts out of the expected state.

### 4. API-first troubleshooting

Troubleshooting in MAS is **API-first**, not server-log-first.

Admins must be comfortable using:

- Integration Service logs
- health and status dashboards
- limited application logs exposed via the platform
- API test tools such as Postman
- synthetic monitoring to test endpoints and workflows

Instead of SSH-ing into a server and scraping WAS logs, you are now reading **service-level logs**, **API responses**, and **platform dashboards**.

### 5. Zero Trust Security

MAS does **not** use WebSphere LDAP.

Identity and access are handled externally via modern identity standards and providers. Admins must understand:

- OIDC
- OAuth2
- Keycloak (or equivalent)
- SSO tokens
- client credentials

This moves security away from WAS configuration screens and into **centralized IAM platforms** and **token-based authentication**.

### 6. AppPoints licensing

Licensing in MAS is **dynamic and app-based**.

Admins must understand how MAS consumes entitlements through **AppPoints**, how different apps and user profiles draw from that pool, and how to monitor consumption so that:

- you stay compliant
- you avoid unexpected overages
- you align licensing with real-world usage

This new foundation applies to **both SaaS and on-prem**. In later posts, we will zoom into how these responsibilities look different in each deployment model.