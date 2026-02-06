# MAS Admin Series – Part 3: How the SysAdmin Role Changes in MAS SaaS

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🌐 MAS Admin Series - Part 3

### How the SysAdmin Role Changes in MAS SaaS

Moving to **MAS SaaS** is the biggest mindset shift for legacy Maximo admins. You are no longer a server operator. You become a **functional, security, and governance owner** for your MAS tenant.

### What SaaS admins no longer do

In MAS SaaS, IBM owns the infrastructure and the application runtime. That means **you do not**:

- have server access
- have DB access
- manage WebSphere
- make OS-level changes
- tune JVMs
- deploy EAR files
- scrape backend logs on the server
- run custom SQL fixes directly in the database
- restart application servers or pods (IBM manages the pods)
- schedule or perform patches and upgrades (IBM handles upgrades)

All the knobs you used to adjust at the OS, WebSphere, and DB layer are removed by design.

### What SaaS admins do instead

Your focus moves up the stack into **configuration, security, and lifecycle orchestration**:

- manage users and roles
- manage tenants and sites
- configure SSO and IAM integration
- monitor system health dashboards
- monitor API activity and integration behavior
- manage integration credentials and endpoint configurations
- support MIF / Integration Service usage
- coordinate upgrade windows with IBM
- validate new features in each MAS patch
- manage AppPoints and app licensing allocation
- provide data governance oversight
- run functional and regression testing
- validate non-prod → prod promotion cycles
- work with IBM Support to resolve deep technical issues and access restricted logs

In short, SaaS admins become the **bridge** between the vendor-managed platform and the business.

### From implementation mindset to orchestration mindset

In the 7.x world, implementation often meant:

- installing servers
- configuring WebSphere
- tuning JVMs and DB
- manually deploying code

In MAS SaaS, implementation becomes **orchestration**:

- ensuring environments (dev, test, prod) are aligned
- coordinating feature rollout and regression testing
- aligning IAM, SSO, and security policy with the platform
- governing data, integrations, and access

SaaS admins must become **functional + security + governance experts**, not server operators. This is a significant career evolution, not a downgrade - it moves you closer to reliability, compliance, and business value.