# Blog 6 — Data Migration: The Hidden Monster Nobody Talks About

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS
Visual Status: Needs Visuals
Visual Tool: Excalidraw
Visual Type: Architecture Diagram, Comparison Table, Flowchart, Process Flow

# Data Migration: The Hidden Monster in Your MAS Journey

**Series:** Modern Maximo - Transforming from Legacy 7.6.x to MAS 9 | **Part 6 of 12**

**Read Time:** 15-20 minutes

---

<aside>
🎯

**Who this is for:** Maximo project managers, data architects, migration leads, and functional analysts responsible for planning and executing the data migration from Maximo 7.6.x to MAS 9 -- especially teams that have underestimated the data effort before.

</aside>

---

## 🔥 Introduction: The $1.2M Wake-Up Call

A transportation company budgeted $3.5M for their MAS migration. Data migration? Just $200K—less than 6% of the budget.

Three months before go-live, reality hit:

- **47,000 duplicate assets** scattered across sites
- **280,000 orphaned work orders** pointing to deleted assets
- **Circular location hierarchies** that would crash the system
- **Invalid cost data** failing financial reconciliation

**The damage:**

- 6-month delay
- $1.2M emergency cleansing (6x original budget)
- Nearly lost their largest customer
- Executive escalation to the CEO

**The lesson:** Data migration isn't 6% of your project—it's often **40-50% of the actual effort** and the **#1 reason MAS migrations fail**.

<aside>
💡

**Key insight:** Data migration is the #1 reason MAS migrations fail. Budget 40-50% of project effort for data work, not the typical 6% that leads to emergency remediation.

</aside>

This blog shows you the strategic approach to get it right.

---

## 🔍 Part 1: Why Data Quality Becomes Critical in MAS

### The Legacy Maximo Mindset

In Maximo 7.6.x, dirty data was annoying but manageable:

- Database access available → fix with SQL scripts
- Validation could be bypassed → work around issues
- Clean up after migration → deal with problems later

**This approach is dead in MAS.**

### The MAS Reality

**MAS enforces what 7.6.x forgave:**

- **Sealed database** → no direct SQL access
- **API-only access** → all validation enforced
- **Strict business rules** → bad data blocks migration
- **AI/ML dependencies** → garbage in = models fail

**Example:** That circular asset hierarchy (PUMP-001 → MOTOR-001 → PUMP-001)? 

- **7.6.x:** Annoying, but works
- **MAS:** Migration fails completely

### The Typical Data Debt

Organizations discover:

- **15-25% duplicate rate** on assets
- **30-40% orphaned records** (work orders, PMs)
- **40-60% missing critical fields** (criticality, asset type)
- **20-30% invalid references** (locations, GL accounts)

**Why?** 15+ years of bypassed validation, custom integrations, and "temporary" workarounds.

<aside>
🔑

**Key insight:** MAS enforces what 7.6.x forgave. That circular hierarchy, those orphaned records, those missing fields -- they were annoying in 7.6.x but they are migration-blocking in MAS.

</aside>

---

## 📊 Part 2: The Strategic Assessment Framework

### Phase 1: Quick Health Check (Week 1)

**Run these discovery queries:**

```sql
-- How bad are duplicates?
SELECT COUNT(*) as TOTAL, 
       COUNT(DISTINCT ASSETNUM) as UNIQUE,
       COUNT(*) - COUNT(DISTINCT ASSETNUM) as DUPLICATES
FROM ASSET;

-- How many orphaned work orders?
SELECT COUNT(*) FROM WORKORDER WO
LEFT JOIN ASSET A ON WO.ASSETNUM = A.ASSETNUM
WHERE WO.ASSETNUM IS NOT NULL AND A.ASSETNUM IS NULL;

-- Critical fields completeness?
SELECT 
  COUNT(*) as TOTAL,
  SUM(CASE WHEN DESCRIPTION IS NULL THEN 1 ELSE 0 END) as NO_DESC,
  SUM(CASE WHEN ASSETTYPE IS NULL THEN 1 ELSE 0 END) as NO_TYPE,
  SUM(CASE WHEN LOCATION IS NULL THEN 1 ELSE 0 END) as NO_LOCATION
FROM ASSET;
```

**Output:** A data quality scorecard showing where you stand.

### Phase 2: Risk-Based Prioritization

**Critical (Must Fix Before Migration):**

- Referential integrity failures
- Duplicate keys
- Circular hierarchies
- Missing required fields

**High (Fix During Migration):**

- Naming inconsistencies
- Incomplete specifications
- Invalid status codes

**Medium (Fix After Go-Live):**

- Historical data enrichment
- Documentation updates
- Old archived records

**Strategic Decision:** Don't try to perfect everything. Focus on what blocks the migration.

---

## 🛠️ Part 3: The 4-Phase Cleansing Strategy

### Phase 1: Stop the Bleeding (Week 1)

**Prevent new bad data:**

- Enable strict validation in integration framework
- Add database constraints where possible
- Lock down direct database access
- Train users on data quality

**Goal:** No more bad data enters the system while you clean.

### Phase 2: Triage & Quarantine (Weeks 2-3)

**Identify and isolate bad data:**

- Create staging tables for problematic records
- Tag records by issue type (duplicate, orphaned, invalid)
- Prioritize by migration impact
- Assign ownership to SMEs

**Output:** Complete inventory of data issues with fix assignments.

### Phase 3: Cleanse (Weeks 4-8)

**Two-track approach:**

**Automated (70% of issues):**

- Standardize naming conventions
- Fix obvious duplicates
- Update invalid references where clear
- Fill missing fields from other systems

**Manual (30% of issues):**

- Complex duplicates requiring SME judgment
- Asset specifications needing engineering input
- Cost center assignments
- Classification decisions

**Tool Selection:**

- **Small datasets (<50K):** MXLoader (Excel-based, free)
- **Large datasets (>100K):** Custom ETL or IBM Migration tools
- **One-time loads:** Integration Framework
- **Ongoing cleansing:** API-based scripts

### Phase 4: Validate & Load (Weeks 9-10)

**Pre-load validation:**

```sql
-- Ensure referential integrity
-- Verify all required fields populated
-- Confirm no duplicate keys
-- Validate business rules
```

**Phased loading:**

1. Master data (locations, classifications)
2. Assets and hierarchies
3. PMs and meters
4. Historical work orders (last 2 years)
5. Open work orders
6. Inventory

**Key principle:** Validate everything twice, load once.

---

## 🚀 Part 4: Migration Execution Strategy

### The 3-Environment Pattern

**Development:** 

- Copy of production data
- Safe experimentation
- Script development

**Test/UAT:**

- Full migration rehearsal
- User validation
- Performance testing

**Production:**

- Validated process only
- 24/7 support coverage
- Rollback plan ready

### The Parallel Run Approach

**Weeks 1-4: Shadow MAS**

- Work primarily in 7.6.x
- Replicate to MAS test
- Identify gaps
- Refine processes

**Weeks 5-8: Shadow 7.6.x**

- Work primarily in MAS
- Validate against 7.6.x
- Build user confidence
- Final reconciliation

**Benefit:** Proves the migration works before you commit.

### What to Migrate (and What to Archive)

**Migrate:**

- Last 2 years of work order history
- Active assets and PMs
- Open inventory transactions
- Current configurations

**Archive to read-only:**

- 2-5 year old work orders
- Decommissioned assets
- Closed PMs
- Historical inventory

**Purge:**

- 5+ year old completed work
- Deleted/obsolete data
- Temporary test records

**Savings:** 40-60% less data to migrate, 50% faster performance.

<aside>
💡

**Key insight:** Migrate 2 years of history, archive 3 years, purge the rest. This simple rule cuts 40-60% of migration volume and dramatically improves performance.

</aside>

---

## ✅ Part 5: Validation & Reconciliation

### Automated Daily Checks

**Record count reconciliation:**

```python
# Simple validation framework
for table in ['ASSET', 'WORKORDER', 'PM', 'LOCATIONS']:
    source_count = query_legacy(f"SELECT COUNT(*) FROM {table}")
    target_count = query_mas(f"SELECT COUNT(*) FROM {table}")
    
    if source_count != target_count:
        alert(f"{table}: Missing {source_count - target_count} records")
```

**Referential integrity:**

- All work orders have valid assets
- All assets have valid locations
- All PMs have valid assets
- All inventory has valid storerooms

**Financial reconciliation:**

- Labor cost totals match
- Material cost totals match
- Inventory valuations match

**Automate this.** Manual checks miss things.

---

## 🚫 Part 6: Common Strategic Failures

### Failure 1: "We'll Clean It Later"

**Reality:** Once in MAS, cleaning is 10x harder.

- No direct database access
- APIs are slow for bulk updates
- Users are already working
- Business pressure to move forward

**Fix:** Clean **before** migration. No exceptions.

### Failure 2: Underestimating Timeline

**Common estimate:** "2 weeks for data"

**Reality:**

- Assessment: 2 weeks
- Cleansing: 6-8 weeks
- Testing: 3-4 weeks
- Parallel run: 4-8 weeks
- **Total: 4-5 months**

**Fix:** Budget 40-50% of project time for data work.

### Failure 3: No Data Governance

**Problem:** Clean it once, it's dirty again in 6 months.

**Fix:** 

- Assign data stewards
- Enforce validation rules
- Regular quality audits
- Clear accountability

### Failure 4: Migrating Everything

**Problem:** 20 years of garbage moved to MAS.

**Fix:** Migrate 2 years, archive 3 years, purge 15 years.

### Failure 5: No Rollback Plan

**Problem:** Migration fails at hour 8 of 12.

**Fix:** Pre-migration backup, tested rollback procedure, clear decision criteria.

---

## 🗺️ Part 7: The Data Migration Roadmap

### Month 1: Assessment & Planning

- Week 1-2: Data profiling and health check
- Week 3: Risk assessment and prioritization
- Week 4: Strategy approval and resource assignment

### Month 2-3: Cleansing

- Week 5: Stop new bad data
- Week 6-7: Triage and quarantine
- Week 8-11: Automated and manual cleansing
- Week 12: Validation and staging

### Month 4: Testing

- Week 13-14: Test environment migration
- Week 15-16: User acceptance testing

### Month 5: Parallel Run

- Week 17-20: Shadow operation both directions
- Week 21-22: Final reconciliation

### Month 6: Go-Live

- Week 23: Production migration
- Week 24: Hypercare support

**Total: 6 months for data-intensive migrations**

---

## 📈 Part 8: Success Metrics

### Pre-Migration

- [ ] Data quality >95%
- [ ] All critical issues resolved
- [ ] Test migration successful
- [ ] Team trained and ready

### During Migration

- [ ] Real-time monitoring active
- [ ] Error rate <1%
- [ ] Record counts matching
- [ ] Rollback criteria defined

### Post-Migration

- [ ] 100% record count match
- [ ] Zero referential integrity errors
- [ ] Financial reconciliation passed
- [ ] User acceptance complete

---

## 🎯 Key Takeaways

- **Data migration is 40-50% of MAS project effort**—budget and plan accordingly, not as an afterthought
- **MAS enforces what 7.6.x forgave**—sealed database and strict API validation mean bad data must be fixed before migration
- **Expect significant data quality issues**—15-25% duplicates, 30-40% orphaned records, 40-60% incomplete fields are typical
- **Use a 4-phase cleansing approach**—stop new bad data, triage issues, cleanse systematically, validate thoroughly
- **Don't migrate everything**—migrate 2 years of history, archive 3 years, purge the rest for better performance
- **Parallel runs prove the process**—4-8 weeks of shadow operation builds confidence and catches issues before go-live
- **Budget 4-5 months minimum**—from assessment through go-live for comprehensive data migration
- **Automate validation and reconciliation**—daily checks catch issues immediately, manual checks miss things
- **Common failures are predictable**—don't defer cleansing, don't underestimate timelines, establish data governance
- **Success requires executive support**—data migration needs budget, resources, and organizational commitment to succeed

---

## 📚 Resources for Your Journey

### IBM Official
- [MAS 9.0 Documentation](https://www.ibm.com/docs/en/mas-cd/continuous-delivery)
- [Maximo Data Migration Guide](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=managing-data)
- [Integration Framework for Data Loading](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=configuring-integration-framework)
- [MXLoader for Excel-Based Data Loading](https://www.ibm.com/support/pages/mxloader-tool-maximo)

### Community
- [IBM Maximo Community](https://community.ibm.com/community/user/asset-facilities)
- [Maximo Secrets Blog](https://maximosecrets.com)
- [Data Migration Best Practices Forum](https://community.ibm.com/community/user/asset-facilities/communities/community-home/digestviewer)

### Training
- [MAS Administration Learning Path](https://www.ibm.com/training/learning-path/maximo-application-suite-375)
- [Maximo Data Management Certification](https://www.ibm.com/training/certification/ibm-maximo-asset-management-v7-6-functional-analyst-C0002602)

---

## 🔗 Series Navigation

**Previous:** [Blog 5 - Integration Modernization](Blog%205%20%E2%80%94%20Integration%20Modernization%20API-First%2C%20Even%20361cd187e3dd4c7da5ebaa3c9df758a7.md) <--

**Next:** [Blog 7 - Modern Mobile](Blog%207%20%E2%80%94%20Modern%20Mobile%20Why%20Maximo%20Mobile%20Is%20the%20On%20db553cb28e5f4ef4aedc53b4af9e4a7a.md) -->

---

**Series:** Modern Maximo - Transforming from Legacy 7.6.x to MAS 9

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*