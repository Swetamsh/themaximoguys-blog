# Data Readiness Guide for AI-Enabled Maximo

> **Part 4 of 6** in the [Modernizing IBM Maximo with AI](./00-series-index.md) series

---

## Introduction

Here's the uncomfortable truth about AI in asset management: **your AI is only as good as your data.**

Organizations spend millions on AI platforms, then wonder why their predictive models don't work. The answer is almost always data—not enough of it, not clean enough, not connected enough.

This post provides a practical guide to assessing and improving your data readiness for AI-enabled Maximo.

---

## The Data Readiness Framework

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA READINESS PYRAMID                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                          ┌───────┐                               │
│                         /  AI    \                               │
│                        /  Models  \                              │
│                       /            \                             │
│                      ┌──────────────┐                            │
│                     /   Analytics    \                           │
│                    /    & Reporting   \                          │
│                   ┌────────────────────┐                         │
│                  /    Data Integration  \                        │
│                 /     & Connectivity     \                       │
│                ┌──────────────────────────┐                      │
│               /      Data Quality          \                     │
│              /    (Clean, Complete, Consistent)                  │
│             ┌────────────────────────────────┐                   │
│            /        Data Foundation           \                  │
│           /   (Asset Hierarchy, Work History,  \                 │
│          /     Failure Codes, Meter Readings)   \                │
│         └────────────────────────────────────────┘               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

You can't build higher layers without the foundation.
```

---

## Assessment Checklist

Use this checklist to evaluate your current state. Score each area:
- **0 - Not Present:** Data doesn't exist
- **1 - Partial:** Data exists but incomplete or inconsistent
- **2 - Good:** Data is adequate for basic AI use cases
- **3 - Excellent:** Data is comprehensive and high quality

### 1. Asset Master Data

| Requirement | Questions to Ask | Score (0-3) |
|-------------|------------------|-------------|
| **Asset Hierarchy** | Are parent-child relationships defined? Can you trace from component to system to location? | |
| **Asset Classification** | Is there a consistent taxonomy? Are similar assets grouped? | |
| **Asset Attributes** | Are manufacturer, model, serial number, install date captured? | |
| **Expected Life** | Is expected useful life defined per asset class? | |
| **Criticality** | Are assets ranked by business criticality? | |

**Why It Matters:** AI models need to understand what assets exist and how they relate. Without proper classification, you can't train models across asset populations.

### 2. Work Order History

| Requirement | Questions to Ask | Score (0-3) |
|-------------|------------------|-------------|
| **Historical Depth** | Do you have 2+ years of work order history? | |
| **Completion Rates** | Are work orders closed with actual data (labor, parts, dates)? | |
| **Failure Documentation** | Are failures clearly distinguished from PMs and other work? | |
| **Problem/Cause/Remedy** | Are failure codes consistently applied? | |
| **Downtime Tracking** | Is equipment downtime recorded on work orders? | |

**Why It Matters:** Predict models learn from historical failures. If failures aren't documented or coded correctly, the models can't learn patterns.

### 3. Failure Coding

| Requirement | Questions to Ask | Score (0-3) |
|-------------|------------------|-------------|
| **Failure Hierarchy** | Is there a defined problem → cause → remedy structure? | |
| **Consistent Application** | Do technicians actually use failure codes? | |
| **Granularity** | Are codes specific enough to distinguish failure modes? | |
| **Coverage** | Do failure codes exist for all major asset classes? | |
| **Review Process** | Are failure codes reviewed and refined over time? | |

**Why It Matters:** Failure codes are the labels for supervised learning. "Pump failed" is useless. "Bearing failure due to lubrication starvation" is actionable.

### 4. Meter Readings and Usage Data

| Requirement | Questions to Ask | Score (0-3) |
|-------------|------------------|-------------|
| **Meter Coverage** | What percentage of assets have active meters? | |
| **Reading Frequency** | How often are meters read (daily, weekly, monthly)? | |
| **Automated Collection** | Are readings automated or manual? | |
| **Data Continuity** | Are there gaps in meter history? | |
| **Unit Consistency** | Are meter units consistent across similar assets? | |

**Why It Matters:** Usage data (runtime hours, cycles, throughput) is a key predictor of remaining useful life. Time-based models miss usage intensity variations.

### 5. Sensor/IoT Data

| Requirement | Questions to Ask | Score (0-3) |
|-------------|------------------|-------------|
| **Sensor Coverage** | What percentage of critical assets have sensors? | |
| **Data Types** | What parameters are measured (vibration, temp, pressure)? | |
| **Sampling Rate** | Is data collected frequently enough for anomaly detection? | |
| **Historical Depth** | How much sensor history is retained? | |
| **Data Quality** | What percentage of readings are valid (not null, not outliers)? | |

**Why It Matters:** Sensor data enables real-time health monitoring and anomaly detection. Without it, you're limited to lagging indicators (work order history).

### 6. Inspection Data

| Requirement | Questions to Ask | Score (0-3) |
|-------------|------------------|-------------|
| **Inspection Coverage** | Are regular inspections performed on critical assets? | |
| **Structured Findings** | Are inspection results captured in structured fields (not just notes)? | |
| **Condition Ratings** | Is there a consistent condition rating scale? | |
| **Photo Documentation** | Are inspection photos captured and linked? | |
| **Trend Tracking** | Can you see condition changes over time? | |

**Why It Matters:** Inspection data feeds Health scoring and provides training data for Visual Inspection models.

---

## Data Quality Assessment

Beyond existence, data quality determines AI success:

### The Five Dimensions of Data Quality

| Dimension | Definition | Assessment Question |
|-----------|------------|---------------------|
| **Completeness** | No missing values in required fields | What % of work orders have failure codes? |
| **Accuracy** | Data reflects reality | Do asset install dates match actual history? |
| **Consistency** | Same data, same format across records | Are pump assets classified consistently? |
| **Timeliness** | Data is current | How old is your oldest unprocessed work order? |
| **Validity** | Data conforms to expected format/range | How many meter readings are outside valid ranges? |

### Quick Data Quality Queries

Run these against your Maximo database to assess quality:

```sql
-- Work orders without failure codes (last 2 years)
SELECT COUNT(*) as wos_without_failure_codes
FROM workorder
WHERE status = 'CLOSE'
AND reportdate > DATEADD(year, -2, GETDATE())
AND (failurecode IS NULL OR failurecode = '');

-- Assets without classification
SELECT COUNT(*) as assets_without_class
FROM asset
WHERE classstructureid IS NULL
AND status = 'OPERATING';

-- Meter readings with null/zero values
SELECT COUNT(*) as invalid_readings
FROM meterreading
WHERE (reading IS NULL OR reading = 0)
AND readingdate > DATEADD(year, -1, GETDATE());

-- Work orders missing actual finish dates
SELECT COUNT(*) as wos_missing_actfinish
FROM workorder
WHERE status = 'CLOSE'
AND actfinish IS NULL;
```

---

## Data Remediation Roadmap

Based on your assessment, prioritize remediation:

### Priority 1: Foundation Fixes (Weeks 1-4)

| Issue | Remediation | Effort |
|-------|-------------|--------|
| Missing asset hierarchy | Workshop to define parent-child relationships | Medium |
| Inconsistent classification | Standardize taxonomy, reclassify assets | High |
| Missing failure codes | Define failure hierarchy per asset class | Medium |

### Priority 2: Historical Enrichment (Weeks 5-12)

| Issue | Remediation | Effort |
|-------|-------------|--------|
| Failure codes not applied | Back-code historical work orders using NLP | High |
| Missing meter history | Establish automated meter collection | Medium |
| No sensor data | IoT pilot on critical assets | High |

### Priority 3: Process Changes (Ongoing)

| Issue | Remediation | Effort |
|-------|-------------|--------|
| Technicians skip failure codes | Training + mandatory fields + Work Order Intelligence | Medium |
| Inspections not structured | Redesign inspection forms with structured fields | Low |
| Data quality drift | Establish data governance, quality dashboards | Medium |

---

## Data Requirements by MAS Application

Each MAS AI application has specific data needs:

### Maximo Monitor

| Data Requirement | Minimum | Ideal |
|------------------|---------|-------|
| Sensor connectivity | 20% of critical assets | 80%+ of monitored assets |
| Data types | 2-3 per asset (e.g., vibration, temp) | 5+ correlated parameters |
| Sampling rate | Minutes | Seconds |
| Historical depth | 3 months | 12+ months |

### Maximo Health

| Data Requirement | Minimum | Ideal |
|------------------|---------|-------|
| Asset master | Complete hierarchy + classification | + attributes, install dates |
| Work order history | 1 year | 3+ years |
| Meter readings | Monthly | Daily/automated |
| Inspection data | Annual | Quarterly structured |

### Maximo Predict

| Data Requirement | Minimum | Ideal |
|------------------|---------|-------|
| Documented failures | 50 per failure mode | 200+ per failure mode |
| Failure codes | Problem + cause | Problem + cause + remedy |
| Sensor data to failure | 30 days pre-failure | 90+ days pre-failure |
| Operating context | Basic (location) | Rich (load, environment) |

### Maximo Visual Inspection

| Data Requirement | Minimum | Ideal |
|------------------|---------|-------|
| Training images | 100 per defect type | 500+ per defect type |
| Image quality | Consistent lighting, angle | Controlled conditions |
| Label accuracy | 90%+ | Expert-validated |
| Defect variety | Common defects | Full defect taxonomy |

### Maximo Assist

| Data Requirement | Minimum | Ideal |
|------------------|---------|-------|
| Maintenance manuals | PDF for critical assets | All assets, searchable |
| SOPs | Core procedures documented | Full procedure library |
| Troubleshooting guides | Top 20 failure modes | All known failures |
| Work order notes | Historical examples | Curated best practices |

---

## Common Data Pitfalls

### Pitfall 1: "We have data, it's just not in Maximo"

**Problem:** Sensor data in historian, failures in spreadsheets, procedures in SharePoint.

**Solution:** Data integration project before AI project. Use App Connect or Cloud Pak for Data to virtualize.

### Pitfall 2: "Our failure codes are a mess"

**Problem:** 500 codes created over 15 years, inconsistent usage, overlapping meanings.

**Solution:** Failure taxonomy rationalization. Start fresh with ISO 14224 or industry standards. Use Work Order Intelligence to help recode history.

### Pitfall 3: "Technicians don't code failures"

**Problem:** Work orders close with default or blank failure codes.

**Solution:**
1. Make failure code mandatory to close work orders
2. Train technicians on the "why"
3. Deploy Work Order Intelligence for auto-suggestions
4. Celebrate good data behavior, not just work completion

### Pitfall 4: "We only have sensor data from the last 6 months"

**Problem:** Predict needs failure patterns. If you haven't captured sensor data leading up to failures, you can't train models.

**Solution:** Start capturing now. It takes 12-24 months of sensor data plus failures to train reliable models. In the meantime, use Health scoring and rule-based alerts.

### Pitfall 5: "Our asset hierarchy is flat"

**Problem:** All assets at same level—can't understand system relationships or propagate health scores.

**Solution:** Hierarchy workshop. Define functional locations, systems, assets, components. Start with critical systems and expand.

---

## Data Governance for AI

Ongoing data quality requires governance:

### Data Stewardship Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA GOVERNANCE STRUCTURE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  EXECUTIVE SPONSOR                                               │
│  └── Accountability for data as strategic asset                 │
│                                                                  │
│  DATA GOVERNANCE COUNCIL                                         │
│  └── Cross-functional oversight, policy decisions               │
│                                                                  │
│  DATA STEWARDS (per domain)                                      │
│  ├── Asset Master Data Steward                                  │
│  ├── Work Management Data Steward                               │
│  ├── IoT/Sensor Data Steward                                    │
│  └── Define rules, monitor quality, remediate issues            │
│                                                                  │
│  DATA CUSTODIANS (IT)                                            │
│  └── Technical implementation, access control, integration      │
│                                                                  │
│  DATA CONSUMERS (Users)                                          │
│  └── Use data, report quality issues, follow standards          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Quality Metrics Dashboard

Track these metrics monthly:

| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| % Work orders with failure codes | 95% | | |
| % Assets with classification | 100% | | |
| % Critical assets with sensors | 80% | | |
| Average meter reading age | <7 days | | |
| % Inspections with structured findings | 90% | | |

---

## Action Plan Template

Use this template to plan your data readiness work:

```
DATA READINESS ACTION PLAN
==========================

Current State Assessment: [Date]
Target State: AI-Ready for [Monitor/Health/Predict/Assist]

PRIORITY 1 - BLOCKERS (Must fix before AI)
------------------------------------------
1. [Issue]:
   Owner:
   Action:
   Due:

2. [Issue]:
   Owner:
   Action:
   Due:

PRIORITY 2 - ENABLERS (Improve AI effectiveness)
------------------------------------------------
1. [Issue]:
   Owner:
   Action:
   Due:

PRIORITY 3 - ENHANCEMENTS (Future improvements)
-----------------------------------------------
1. [Issue]:
   Owner:
   Action:
   Due:

GOVERNANCE SETUP
----------------
Data Steward (Asset):
Data Steward (Work Mgmt):
Review Cadence:
Quality Dashboard: [Location]
```

---

## Key Takeaways

1. **Data is the foundation.** No amount of AI sophistication compensates for bad data. Fix the foundation first.

2. **Assess before you invest.** Use the checklist to understand your gaps before buying AI licenses.

3. **Different apps, different needs.** Monitor needs sensors. Predict needs failures. Match your readiness to your target applications.

4. **Process change is harder than technology.** Getting technicians to code failures correctly requires training, tools, and culture change.

5. **Governance is ongoing.** Data quality degrades without active stewardship. Build the governance muscle.

---

*Continue to [Part 5: Implementation Roadmap](./05-implementation-roadmap.md)*
