# Blog 4 — Stop Customizing Maximo the Old Way (third-party customization tools, Java, Database Tricks)

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS

# Stop Customizing Maximo the Old Way: Replace Third-Party Tools, Java, and Database Tricks

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9, Cloud-Native, and AI-Driven EAM | **Part 4 of 12**

**Read Time:** 12-15 minutes

<aside>
🎯

**Who this is for:** Maximo developers, customization architects, and technical leads who currently rely on Java MBOs, database triggers, direct SQL, or third-party customization tools — and need to understand what replaces them in MAS 9.

</aside>

---

<aside>
🛑

**The bottom line:** If your customization strategy depends on direct database access, custom Java MBOs, or database triggers, your MAS migration will fail. This blog shows you the path forward.

</aside>

---

## The Customization Crisis

> **Dev:** "I'll extend the WORKORDER MBO like always."
> 

> **Architect:** "That won't work in MAS. Use automation scripts."
> 

> **Dev:** "But I need database access!"
> 

> **Architect:** "No direct database access. Use the API."
> 

> **Dev:** "This will take 3x longer!"
> 

> **Architect:** "Yes. And work 3x better."
> 

**The tension:** Legacy patterns worked and were fast—but they're wrong for MAS.

---

## 📊 Quick Reference: Legacy → MAS-Safe

| ❌ Legacy Pattern | ✅ MAS Replacement |
| --- | --- |
| Custom Java MBOs | Automation Scripts (Python/JS) |
| Database Triggers | Automation Scripts + Events |
| Direct SQL Queries | MboSet API + REST/GraphQL |
| JDBC Integrations | REST API + OAuth |
| File System Access | DOCLINKS + Object Storage |
| Hardcoded Config | System Properties + K8s Secrets |

---

## 🚫 Why Database-Level Tools Are Dead

<aside>
⚠️

**MAS locks down the database.** SaaS model, container immutability, and operator-managed upgrades mean no more direct schema modifications.

</aside>

---

## ☠️ The Five Deadly Anti-Patterns

### Anti-Pattern 1: Custom MBO Extensions with Direct SQL

**The Legacy 7.6.x Way:**

```java
public class MyWorkOrderSet extends WorkOrderSet {
    public void customValidation() throws MXException {
        // Direct SQL query - DANGEROUS!
        SqlFormat sql = new SqlFormat(
            "SELECT COUNT(*) FROM MAXIMO.ASSET WHERE ASSETNUM = :1"
        );
        sql.setObject(1, "ASSETNUM", "STRING", getString("ASSETNUM"));
        MXResultSet rs = getDatabase().executeQuery(sql);
        // validation logic...
    }
}
```

**Why This Fails in MAS:**

- Direct database access is blocked in containerized environments
- MBO extensions don't survive upgrades cleanly
- Doesn't scale in microservices architecture
- Completely broken in SaaS (zero database access)
- Bypasses caching, security, and optimization layers

**✅ The MAS Way: Automation Script**

```python
# Object Launch Point: WORKORDER, Save Event, Before Save

if mbo.toBeAdded() or mbo.isModified("ASSETNUM"):
    assetnum = mbo.getString("ASSETNUM")
    
    # Use MboSet instead of SQL - respects security, caching, everything
    assetSet = mbo.getMboSet("ASSET")
    if assetSet.isEmpty():
        errorgroup = 'asset'
        errorkey = 'assetnotfound'
```

---

### Anti-Pattern 2: Database Triggers for Business Logic

**The Legacy 7.6.x Way:**

```sql
CREATE TRIGGER update_asset_repair_date
AFTER UPDATE ON MAXIMO.WORKORDER
FOR EACH ROW
BEGIN
    IF :NEW.STATUS = 'COMP' THEN
        UPDATE MAXIMO.ASSET 
        SET LASTREPAIREDDATE = SYSDATE
        WHERE ASSETNUM = :NEW.ASSETNUM;
    END IF;
END;
```

**Why This Fails in MAS:**

- Database is sealed—you literally cannot add triggers
- Triggers bypass all application logic and security
- Invisible to API consumers and audit trails
- Cannot be version controlled properly
- 100% broken in SaaS

**✅ The MAS Way: Automation Script with Launch Point**

```python
# Object Launch Point: WORKORDER, Status Change, After Save

if mbo.getString("STATUS") == "COMP":
    assetnum = mbo.getString("ASSETNUM")
    
    if assetnum:
        assetSet = mbo.getMboSet("ASSET")
        if not assetSet.isEmpty():
            asset = assetSet.getMbo(0)
            asset.setValue("LASTREPAIREDDATE", mbo.getDate("ACTFINISH"))
```

---

### Anti-Pattern 3: Direct Database Integration

**The Legacy 7.6.x Way:**

```python
# External reporting tool connecting directly to Maximo DB
import cx_Oracle

connection = cx_Oracle.connect('maximo/password@maxdb')
cursor = connection.cursor()

cursor.execute("""
    SELECT WONUM, DESCRIPTION, STATUS
    FROM MAXIMO.WORKORDER
    WHERE SITEID = 'MAIN' AND STATUS IN ('WAPPR', 'APPR')
""")
```

**Why This Fails in MAS:**

- No external database connections allowed
- Bypasses authentication, authorization, and encryption
- No audit trail for data access
- Schema changes break everything
- Completely impossible in SaaS

**✅ The MAS Way: REST API Integration**

```python
import requests

# Proper API-based integration
base_url = "https://mas-instance.example.com/maximo/oslc/os/mxwo"
headers = {
    "apikey": os.getenv("MAXIMO_API_KEY"),
    "Content-Type": "application/json"
}
params = {
    "oslc.where": 'siteid="MAIN" and status in ["WAPPR","APPR"]',
    "oslc.select": "wonum,description,status"
}

response = requests.get(base_url, headers=headers, params=params)
work_orders = response.json()["member"]
```

<aside>
💡

**Key insight:** The three most common anti-patterns — custom MBOs with direct SQL, database triggers, and direct database integrations — share a common flaw: they bypass the application layer entirely. In MAS, the application layer IS the only access path. Every pattern that skips it is fundamentally incompatible, not just inconvenient.

</aside>

---

### Anti-Pattern 4: File System Dependencies

**The Legacy 7.6.x Way:**

```java
public void exportReport() {
    String filePath = "/opt/IBM/SMP/maximo/reports/output/report.pdf";
    File reportFile = new File(filePath);
    // Write report to filesystem
}
```

**Why This Fails in MAS:**

- Containers have no persistent file system
- Pods can be destroyed and recreated at any moment
- Hardcoded paths don't exist in cloud environments
- Doesn't scale horizontally
- Broken in SaaS

**✅ The MAS Way: Object Storage**

```python
# Use Maximo's DOCLINKS for attachments
doclinks = mbo.getMboSet("DOCLINKS")
doc = doclinks.add()

doc.setValue("DOCUMENT", "ReportOutput")
doc.setValue("DOCTYPE", "Attachments")
doc.setValue("URLNAME", "report_" + mbo.getString("WONUM") + ".pdf")

# Or use external object storage (S3, Azure Blob, etc.)
import boto3
s3 = boto3.client('s3')
s3.upload_file('local_report.pdf', 'maximo-reports', f'reports/{wonum}.pdf')
```

---

### Anti-Pattern 5: Hardcoded Configuration

**The Legacy 7.6.x Way:**

```java
public class IntegrationService {
    private static final String ENDPOINT = "http://erp.company.com/api";
    private static final String API_KEY = "sk-12345abcde";  // Security nightmare!
}
```

**Why This Fails in MAS:**

- Can't change config without recompiling
- Credentials in source code (audit failure waiting to happen)
- Different values needed per environment
- Doesn't work with secrets management
- Major security and compliance risk

**✅ The MAS Way: Property/Secret Management**

```python
# Automation Script using System Properties
from psdi.server import MXServer

endpoint = MXServer.getMXServer().getProperty("custom.erp.endpoint")
username = MXServer.getMXServer().getProperty("custom.erp.username")

# For sensitive data, use encrypted properties or external secrets
import os
api_key = os.getenv("ERP_API_KEY")  # Injected by Kubernetes secrets
```

<aside>
💡

**Key insight:** Every anti-pattern has a MAS-safe replacement. The shift is consistent: move from infrastructure-level access (filesystem, database, hardcoded config) to application-level access (APIs, DOCLINKS, system properties, Kubernetes secrets). The MAS way is more work upfront but dramatically more maintainable, scalable, and upgrade-safe.

</aside>

---

## 🛠️ MAS Customization Toolbox

### Automation Scripts

Replaces 80% of custom Java. Use for validation, defaults, workflow logic, and integrations.

| Launch Point | Use Case |  |
| --- | --- | --- |
| Object | Business logic on records |  |
| Attribute | Field-level validation |  |
| Action | Toolbar buttons, escalations |  |
| Library | Reusable modules |  |

---

### Domains & Conditions

No-code logic for dynamic dropdowns and field restrictions.

---

### Conditional UI Expressions

Show/hide fields, set read-only, or require fields based on conditions.

---

### Integration Framework

**Outbound:** REST, GraphQL, Kafka, Webhooks | **Inbound:** REST, Kafka subscriptions

---

## ✅ MAS-Safe Checklist

- [ ]  No direct database access or triggers
- [ ]  API-first integrations
- [ ]  No file system dependencies
- [ ]  No hardcoded values or credentials
- [ ]  Works in SaaS (stateless, scalable)
- [ ]  Upgrade-safe

---

## 📈 ROI Summary

**Short-term:** 2-3x initial effort for redesign

**Long-term:** Quarterly upgrades (vs. 6-12 month projects), 40-60% support cost reduction, SaaS-ready, audit-compliant

<aside>
💡

**Key insight:** The 2-3x initial redesign investment pays for itself within 12-18 months. Organizations that modernize their customizations report 40-60% reduction in ongoing support costs, plus the ability to adopt quarterly MAS updates without the multi-month upgrade projects that plagued 7.6.x.

</aside>

---

## 🎯 Key Takeaways

1. **Legacy patterns must go** — database triggers, custom Java, direct SQL are all incompatible
2. **Automation scripts replace 80%** of custom Java with better maintainability
3. **API-first everything** — REST/GraphQL for integrations, no direct DB access
4. **Configuration over code** — domains, conditions, and no-code tools first

---

## 📚 Resources for Your Journey

### IBM Official
- [MAS 9.0 Documentation](https://www.ibm.com/docs/en/mas-cd/continuous-delivery)
- [Automation Scripts Guide](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=administering-automation-scripts)
- [REST API Reference](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=apis-rest-api)
- [Integration Framework Guide](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=configuring-integration-framework)
- [GraphQL API Documentation](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=apis-graphql-api)

### Community
- [IBM Maximo Community](https://community.ibm.com/community/user/asset-facilities)
- [Maximo Secrets Blog](https://maximosecrets.com)
- [Maximo Automation Script Examples (GitHub)](https://github.com/ibm-maximo-dev)

### Training
- [MAX4337G - Automation Scripting](https://www.ibm.com/training/course/maximo-application-suite-manage-automation-scripting-MAX4337G)
- [MAX0151G - MAS Manage Fundamentals](https://www.ibm.com/training/course/maximo-application-suite-manage-fundamentals-MAX0151G)
- [MAX0152G - MAS Manage Configuration](https://www.ibm.com/training/course/maximo-application-suite-manage-configuration-MAX0152G)

---

**Previous:** [Blog 3 — The 7.6 → MAS Migration Playbook](Blog%203%20%E2%80%94%20The%207%206%20%E2%86%92%20MAS%20Migration%20Playbook%2070bd94bdde89485385ac00ac6e0623c5.md)

**Next:** Blog 5 — Integration Modernization

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*