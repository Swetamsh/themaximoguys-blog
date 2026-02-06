# MAS Admin Series – Part 5: The Skills MAS SysAdmins Must Learn Moving Forward

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🧠 MAS Admin Series - Part 5

### The Skills SysAdmins Must Learn Moving Forward

MAS forces SysAdmins to level up. The skills that made you successful in Maximo 7.x are still useful context, but they are no longer enough on their own.

### Required skills for MAS SaaS admins

For SaaS, you do not manage servers, but you do manage **access, configuration, and governance**. Key skills include:

- **IAM / SSO (OAuth2, OIDC)**
    - Understanding identity providers, tokens, and claims.
    - Working with Keycloak, Azure AD, or similar providers.
- **API usage basics**
    - Reading and testing REST APIs.
    - Interpreting response codes and error payloads.
- **Integration troubleshooting**
    - Following message flows through Integration Services.
    - Using logs and dashboards to identify bottlenecks.
- **MAS UI configuration**
    - Understanding where and how to configure applications, tenants, and sites in the UI.
- **Automation scripting basics**
    - Knowing where scripts might be used to automate admin tasks.
- **Upgrade testing**
    - Planning and executing regression testing when MAS releases patches.
- **AppPoints licensing**
    - Monitoring consumption, mapping roles and apps to entitlements.
- **Data governance**
    - Ensuring data quality, ownership, and lifecycle rules are defined and enforced.

### Required skills for MAS on-prem admins

On-prem admins need the SaaS skills **plus** a deeper infrastructure and DevOps toolkit:

- **Kubernetes fundamentals**
- **OpenShift administration**
- **operator concepts** and lifecycle management
- **Linux** administration skills
- **containers** (images, registries, runtime behavior)
- **storage classes** and persistent volumes
- **network routing** and service exposure
- **ingress controllers** and API gateways
- **monitoring tools** such as Grafana and Prometheus
- **CI/CD familiarity** for controlled deployments
- **YAML, Helm, and Terraform basics** for declarative configuration

These skills do not need to be mastered on day one, but they should be on every MAS admin's roadmap.

The admins who lean into these areas become the **go-to experts** for MAS reliability, security, and scalability in their organizations.