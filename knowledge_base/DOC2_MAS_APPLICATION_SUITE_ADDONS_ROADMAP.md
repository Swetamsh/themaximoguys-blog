# MAS Application Suite Add-On Applications: Team Exploration Roadmap

**Document:** DOC2 - MAS Application Suite Add-Ons Roadmap
**Version:** 1.0
**Date:** March 2, 2026
**Audience:** Technical teams, architects, project managers, and business stakeholders upgrading from Maximo 7.6 to MAS 9
**Scope:** All MAS Suite applications BEYOND Manage (Manage-specific items are covered in DOC1)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [MAS Application Suite Architecture Overview](#2-mas-application-suite-architecture-overview)
3. [Maximo Health](#3-maximo-health)
4. [Maximo Predict](#4-maximo-predict)
5. [Maximo Monitor](#5-maximo-monitor)
6. [Maximo Visual Inspection](#6-maximo-visual-inspection)
7. [Maximo AI Assist / Maximo Assistant](#7-maximo-ai-assist--maximo-assistant)
8. [Maximo Optimizer](#8-maximo-optimizer)
9. [Maximo Civil Infrastructure](#9-maximo-civil-infrastructure)
10. [Maximo Parts Identifier](#10-maximo-parts-identifier)
11. [Additional MAS Integrations & Connectors](#11-additional-mas-integrations--connectors)
12. [The Integrated Data Flow](#12-the-integrated-data-flow)
13. [AppPoints Licensing Guide](#13-apppoints-licensing-guide)
14. [Implementation Prioritization Matrix](#14-implementation-prioritization-matrix)
15. [Team Exploration Assignment Matrix](#15-team-exploration-assignment-matrix)
16. [Recommended Implementation Roadmap](#16-recommended-implementation-roadmap)
17. [References & Resources](#17-references--resources)

---

## 1. Executive Summary

### MAS 9 Is Not Just Manage

Organizations upgrading from Maximo 7.6 to MAS 9 frequently make the mistake of treating the migration as a one-for-one replacement of their existing EAM system. This is a fundamental misunderstanding of what IBM Maximo Application Suite delivers. MAS 9 is a **complete Application Suite** -- a unified platform of multiple integrated applications that together form an AI-powered asset lifecycle management ecosystem.

In Maximo 7.6, you had one monolithic application. In MAS 9, you gain access to an entire portfolio:

| What You Had (7.6) | What You Get (MAS 9) |
|---|---|
| Maximo Asset Management (single app) | Maximo Manage (core EAM) |
| Condition Monitoring add-on (limited) | Maximo Monitor (full IoT platform) |
| No equivalent | Maximo Health (asset health scoring) |
| No equivalent | Maximo Predict (ML failure prediction) |
| No equivalent | Maximo Visual Inspection (computer vision) |
| No equivalent | Maximo AI Assist / Assistant (generative AI) |
| Maximo Scheduler (basic) | Maximo Optimizer (advanced optimization) |
| No equivalent | Maximo Civil Infrastructure |
| No equivalent | Maximo Parts Identifier |

### AppPoints Licensing Unlocks the Full Suite

MAS uses an AppPoints-based licensing model. When your organization purchases AppPoints, those points can be allocated across ANY application in the suite. This means your existing license investment may already grant access to applications you have never explored. Teams should evaluate every application in this document to determine which deliver business value for their operations.

### New Capabilities Not Available in Maximo 7.6

Every application beyond Manage represents net-new capability that was simply not possible in Maximo 7.6:

- **IoT-connected asset monitoring** with real-time dashboards and alerting
- **AI-driven health scoring** that quantifies asset condition across your entire fleet
- **Machine learning failure prediction** that tells you WHEN an asset will fail
- **Computer vision inspection** that automates visual defect detection
- **Generative AI assistance** that helps technicians troubleshoot and create work orders
- **Advanced scheduling optimization** that minimizes travel time and maximizes resource utilization

### The Integrated Suite Vision

These applications are not standalone tools. They form an integrated data pipeline:

**Sensors feed Monitor. Monitor feeds Health. Health feeds Predict. Predict drives Manage. Manage schedules through Optimizer. Visual Inspection augments all of it. AI Assist empowers every user.**

This document provides the detailed roadmap your teams need to explore, evaluate, pilot, and implement each of these applications.

---

## 2. MAS Application Suite Architecture Overview

### 2.1 Platform Foundation: Red Hat OpenShift

Every MAS application runs as a containerized workload on Red Hat OpenShift Container Platform (OCP). This provides:

- **Unified deployment model** -- all applications deploy through the MAS operator framework
- **Shared infrastructure** -- compute, storage, and networking are managed at the cluster level
- **Scaling** -- individual applications can scale independently based on workload
- **Isolation** -- applications run in separate namespaces with controlled network policies
- **Upgrades** -- the MAS operator manages rolling updates per application

```
+------------------------------------------------------------------+
|                    Red Hat OpenShift Container Platform            |
|                                                                    |
|  +----------+  +----------+  +---------+  +----------+  +-------+ |
|  |  Manage   |  |  Monitor  |  |  Health  |  |  Predict  |  |  MVI  | |
|  | (core EAM)|  | (IoT)     |  | (scores) |  | (ML)      |  | (CV)  | |
|  +----------+  +----------+  +---------+  +----------+  +-------+ |
|                                                                    |
|  +----------+  +----------+  +---------+  +----------+           |
|  | Optimizer |  | AI Assist |  |  Civil   |  |  Parts   |           |
|  | (sched)   |  | (GenAI)   |  | Infra    |  | Ident    |           |
|  +----------+  +----------+  +---------+  +----------+           |
|                                                                    |
|  +------------------------------------------------------------+  |
|  |           Shared Services Layer                              |  |
|  |  MongoDB  |  Kafka  |  Db2/Oracle  |  Object Storage  | BAS  |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

### 2.2 How Applications Integrate With Each Other

The MAS applications share data through several integration mechanisms:

| Integration Mechanism | Description | Applications Using It |
|---|---|---|
| **Shared Manage Database** | All applications read/write to the Manage (Maximo) database for asset, work order, and master data | Health, Predict, Optimizer, Civil Infrastructure |
| **IoT Data Lake** | Time-series sensor data stored in the IoT data layer (Db2 Data Lake / Cloud Object Storage) | Monitor, Health, Predict |
| **Apache Kafka Event Bus** | Real-time event streaming between applications | Monitor alerts to Manage, Health score changes |
| **REST APIs** | Direct API calls between application microservices | All applications expose and consume APIs |
| **watsonx.ai / Watson Studio** | Shared AI/ML model training and inference | Predict, Visual Inspection, AI Assist |
| **MongoDB** | Application-specific configuration and metadata storage | Monitor, Health, Visual Inspection |

### 2.3 Shared Data Layer via Manage

Manage (the core EAM) is the **authoritative source** for:

- Asset records (ASSET table)
- Location hierarchy (LOCATIONS table)
- Work orders (WORKORDER table)
- Failure codes (FAILURECODE table)
- Meter readings (MEASUREMENT table)
- Classification and attributes (CLASSSTRUCTURE, CLASSSPEC)
- Inventory and parts (INVENTORY, ITEM)

All other MAS applications consume this data. Health reads asset records and work order history. Predict reads failure history and meter data. Monitor maps IoT devices to Manage assets. This means **Manage must be deployed and stable before any other application can function.**

### 2.4 IoT Data Flow

The IoT data pipeline flows through the suite in a specific sequence:

```
Physical World                    MAS Application Suite
+---------------+                 +------------------------------------------+
| Sensors       |   MQTT/REST     | Monitor                                  |
| PLCs          | --------------> |   - Device registration                  |
| SCADA         |                 |   - Metric ingestion                     |
| Edge Devices  |                 |   - Anomaly detection                    |
| Historians    |                 |   - Alert generation                     |
+---------------+                 +------|--------|-------------------------+
                                         |        |
                                    Metrics    Alerts
                                         |        |
                                         v        v
                                  +---------+  +----------+
                                  |  Health  |  |  Manage   |
                                  | (scoring)|  | (WOs)     |
                                  +------|---+  +----------+
                                         |
                                    Scores + History
                                         |
                                         v
                                  +----------+
                                  |  Predict  |
                                  | (ML/AI)   |
                                  +----------+
```

### 2.5 AI Models: watsonx.ai Integration

MAS 9 leverages IBM watsonx.ai as the AI foundation:

- **Predict** uses Watson Studio / watsonx.ai for ML model training (regression, classification, survival analysis)
- **Visual Inspection** uses deep learning CNNs and Large Vision Models hosted on GPU infrastructure
- **AI Assist** uses watsonx.ai foundation models for generative AI (natural language understanding, recommendations)
- **Monitor** uses built-in anomaly detection algorithms plus custom Python functions for analytics

### 2.6 AppPoints Allocation Across Applications

Each application consumes AppPoints at different rates per user. Your total AppPoints pool is shared, and you allocate them based on which applications each user needs. This is covered in detail in Section 13.

---

## 3. Maximo Health

### 3.1 Purpose

Maximo Health provides **asset health scoring and investment optimization**. It answers the questions that Maximo 7.6 could never answer natively:

- How healthy is this asset RIGHT NOW?
- Which assets are most at risk of failure?
- Where should we invest our maintenance and replacement budget?
- When should we replace an asset versus continuing to maintain it?
- How are our assets degrading over time?

Health takes raw data from Manage (work order history, meter readings, age, classifications) and from Monitor (sensor data, anomaly counts) and synthesizes it into a single, actionable health score for every asset.

### 3.2 Key Features

#### 3.2.1 Health Scores with Configurable Contributors

Health scores are calculated from **contributors** -- individual data points that each contribute a weighted percentage to the overall score.

| Contributor Type | Source | Example |
|---|---|---|
| **Age** | Manage asset record (install date) | Asset is 15 years into a 20-year expected life |
| **Meter readings** | Manage meters | Runtime hours at 85% of expected life |
| **Work order history** | Manage work orders | 12 emergency WOs in past year (high = bad) |
| **Replacement parts** | Manage inventory/WO actuals | Increasing parts replacement frequency |
| **Sensor anomalies** | Monitor anomaly count | 47 anomalies detected in past 30 days |
| **Inspection results** | Manage inspection records | Last inspection score: Fair |
| **Custom calculations** | Custom formulas | Vibration trend slope exceeds threshold |

Each contributor is assigned a weight (e.g., Age = 25%, Work Orders = 30%, Sensor Anomalies = 20%, Meters = 25%), and the combined score produces a 0-100 health rating.

**Score Ranges:**

| Score Range | Health Rating | Color | Suggested Action |
|---|---|---|---|
| 80-100 | Good | Green | Continue current maintenance |
| 60-79 | Fair | Yellow | Monitor closely, consider increased PM |
| 40-59 | Poor | Orange | Plan replacement/major overhaul |
| 0-39 | Critical | Red | Immediate action required |

#### 3.2.2 Degradation Curves

Health tracks how asset health scores change over time, creating degradation curves. These curves show:

- The rate at which an asset class is deteriorating
- Whether maintenance interventions are slowing degradation
- Projected date when health will reach a critical threshold
- Comparison of individual assets against fleet averages

Degradation curves are critical inputs for replacement planning and budget forecasting.

#### 3.2.3 Asset Investment Optimization (AIO)

AIO is Health's most powerful feature. It answers: **"Given a fixed budget, what is the optimal combination of maintenance, repair, and replacement decisions across my entire asset fleet?"**

AIO uses optimization algorithms to:

- Compare the cost of continued maintenance vs. replacement for each asset
- Factor in failure risk, health scores, criticality, and remaining useful life
- Generate an optimized investment plan within budget constraints
- Show the impact of different budget scenarios on fleet health

**AIO Input Parameters:**

| Parameter | Description |
|---|---|
| Budget ceiling | Maximum total investment for the planning period |
| Planning horizon | Number of years to optimize over (1-30) |
| Asset scope | Which assets/groups to include |
| Replacement costs | Per-asset or per-class replacement cost |
| Maintenance costs | Annual maintenance cost per asset |
| Failure costs | Cost of unplanned failure per asset |
| Criticality weights | How much to prioritize critical assets |

**AIO Output:**

- Ranked list of recommended actions (maintain, repair, replace)
- Year-by-year investment schedule
- Projected fleet health score over time
- Cost-benefit analysis per asset

#### 3.2.4 Replacement Planning

Health provides dedicated replacement planning views that show:

- Assets approaching end of life
- Recommended replacement timeline
- Replacement cost projections
- Impact of deferring replacement

#### 3.2.5 Risk Matrix Visualization

A configurable risk matrix plots assets on two axes:

- **X-axis:** Probability of failure (derived from health score and degradation)
- **Y-axis:** Consequence of failure (derived from criticality)

This creates the standard risk quadrants:

| | Low Consequence | High Consequence |
|---|---|---|
| **High Probability** | Monitor | Act Immediately |
| **Low Probability** | Accept | Plan Mitigation |

#### 3.2.6 Asset Criticality Scoring

Health allows you to define and calculate criticality scores based on:

- Safety impact
- Environmental impact
- Production impact
- Regulatory impact
- Financial impact
- Redundancy (is there a backup?)

### 3.3 Integration Points

| Integration | Direction | Description |
|---|---|---|
| **Manage -> Health** | Inbound | Asset records, work order history, meter readings, inspection results, failure codes |
| **Monitor -> Health** | Inbound | Sensor metrics, anomaly counts, alert history |
| **Health -> Predict** | Outbound | Health scores and contributors feed into prediction models |
| **Health -> Manage** | Outbound | Health scores visible on asset records, can trigger workflows |

### 3.4 Setup Requirements

**Prerequisites:**

1. Manage must be deployed and operational
2. Asset data must be populated with:
   - Accurate install dates
   - Proper classification hierarchy
   - Meter definitions and readings
   - Work order history (minimum 2 years recommended)
   - Failure codes properly recorded
3. OpenShift cluster must have Health operator deployed

**Data Quality Requirements:**

| Data Element | Minimum Quality | Impact if Missing |
|---|---|---|
| Install dates | 90%+ populated | Age contributor will not function |
| Meter readings | Regular readings (weekly+) | Meter contributor inaccurate |
| Work order history | 2+ years | WO contributor unreliable |
| Failure codes | Consistently recorded | Cannot identify failure patterns |
| Asset classification | Standardized hierarchy | Cannot group for fleet analysis |
| Replacement costs | Estimated per class | AIO cannot calculate ROI |

### 3.5 Dashboards and Visualization

Health provides several pre-built dashboard views:

- **Fleet Overview:** All assets plotted by health score with color coding
- **Health Distribution:** Histogram showing how many assets fall in each health range
- **Degradation View:** Time-series showing health score trends
- **Risk Matrix:** 2D plot of probability vs. consequence
- **Investment Optimization:** AIO results with budget scenarios
- **Contributor Breakdown:** Detailed view of what is driving each asset's score

### 3.6 New in MAS 9

| Enhancement | Description |
|---|---|
| Enhanced scoring algorithms | More configurable contributor types, improved weighting |
| Improved dashboards | Modernized UI with better drill-down capabilities |
| Better Monitor integration | Tighter coupling with Monitor sensor data as scoring contributors |
| Notebook-based custom scoring | Use Jupyter notebooks for custom scoring logic |
| MAS 9.1 improvements | Additional visualization options, improved AIO performance |

### 3.7 Use Cases by Industry

**Utilities:**
- Transformer health scoring based on dissolved gas analysis, load history, and age
- Distribution pole replacement planning across thousands of assets
- Substation equipment investment optimization

**Manufacturing:**
- Production line equipment health based on vibration, temperature, and OEE
- CNC machine tool replacement planning
- Compressor and pump fleet health management

**Oil and Gas:**
- Pipeline segment health scoring based on corrosion data, pressure, and inspection results
- Wellhead equipment degradation tracking
- Rotating equipment fleet optimization

**Transportation:**
- Fleet vehicle health scoring (mileage, maintenance history, age)
- Rail switch and signal health management
- Bridge and tunnel structural health (with Civil Infrastructure)

### 3.8 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| H-1 | Identify a pilot asset class (50-200 assets) with good data quality | 2-4 hours | Access to Manage data |
| H-2 | Verify data quality: install dates, meter readings, WO history | 4-8 hours | Manage database access |
| H-3 | Configure Health scoring group for pilot asset class | 4-8 hours | Health deployed, Manage connected |
| H-4 | Define contributors and weights for the scoring group | 8-16 hours | Domain expertise, H-3 complete |
| H-5 | Generate initial health scores and validate against known conditions | 8-16 hours | H-4 complete |
| H-6 | Create degradation curves and analyze trends | 4-8 hours | H-5 complete |
| H-7 | Set up AIO scenario with realistic budget and replacement costs | 8-16 hours | H-5 complete, cost data available |
| H-8 | Present results to maintenance leadership for validation | 4-8 hours | H-5, H-6, H-7 complete |

**Total estimated effort for Health pilot: 42-84 hours (1-2 weeks)**

---

## 4. Maximo Predict

### 4.1 Purpose

Maximo Predict delivers **machine learning-based failure prediction and anomaly detection**. It answers:

- WHEN will this asset fail?
- WHAT is most likely to cause the failure?
- WHICH assets are exhibiting anomalous behavior right now?
- HOW can we shift from reactive/preventive to truly predictive maintenance?

Predict takes historical data (failures, meter readings, sensor data, maintenance history) and trains machine learning models that forecast future failures. This is the application that transforms your maintenance strategy from calendar-based (PM every 90 days) to condition-based (PM when the model predicts failure within 30 days).

### 4.2 Key Features

#### 4.2.1 Failure Prediction Models

Predict offers multiple types of failure prediction:

| Model Type | What It Predicts | Algorithm Family | Best For |
|---|---|---|---|
| **Failure probability** | Likelihood of failure in next N days | Classification (Random Forest, Gradient Boosting) | Assets with binary fail/no-fail history |
| **Predicted failure date** | Estimated date of next failure | Survival Analysis (Cox Proportional Hazards, Weibull) | Assets with time-to-failure data |
| **Remaining useful life** | Days/hours remaining before failure | Regression (Linear, Random Forest) | Assets with degradation patterns |
| **Anomaly detection** | Current behavior deviating from normal | Statistical (Isolation Forest, Gaussian) | Assets with sensor data |

#### 4.2.2 Failure Prediction Workflow

```
Historical Data                    Model Training                      Production
+------------------+              +-------------------+               +------------------+
| Work orders with |              | Watson Studio /   |               | Real-time scoring|
| failure codes    | ----------> | watsonx.ai        | ------------> | of active assets |
| Meter readings   |   Training  | - Feature eng.    |   Deployed    | - Failure date   |
| Sensor history   |   Data      | - Model selection |   Model       | - Probability    |
| Asset attributes |              | - Hyperparameter  |               | - Contributing   |
+------------------+              |   tuning          |               |   factors        |
                                  | - Validation      |               +------------------+
                                  +-------------------+
```

#### 4.2.3 Anomaly Detection

Predict's anomaly detection identifies assets whose current behavior deviates significantly from established baselines:

- **Univariate anomalies:** Single metric exceeds expected range (e.g., temperature spike)
- **Multivariate anomalies:** Combination of metrics exhibits unusual pattern (e.g., high temperature + low flow + high vibration simultaneously)
- **Temporal anomalies:** Metric patterns differ from historical norms for the same time period

#### 4.2.4 Machine Learning Model Training Pipeline

The ML pipeline consists of:

1. **Data extraction:** Pull historical data from Manage and Monitor
2. **Feature engineering:** Create meaningful features from raw data (rolling averages, trends, ratios)
3. **Training/validation split:** Typically 80/20 or time-based split
4. **Model training:** Train multiple algorithms, compare performance
5. **Model evaluation:** Accuracy, precision, recall, F1 score, AUC-ROC
6. **Model deployment:** Deploy winning model for production scoring
7. **Model monitoring:** Track prediction accuracy over time, retrain as needed

#### 4.2.5 Predicted Failure Date Scoring

For each asset, the deployed model produces:

| Output | Description |
|---|---|
| **Predicted failure date** | The date when the model expects failure |
| **Confidence interval** | Range around the prediction (e.g., +/- 15 days) |
| **Failure probability** | Percentage likelihood of failure before the predicted date |
| **Top contributing factors** | Which features are driving the prediction (e.g., "vibration trend accounts for 40% of prediction") |
| **Recommended action date** | When maintenance should be performed to prevent failure |

#### 4.2.6 Factors Contributing to Failure

Predict provides explainability through feature importance:

- Which data inputs most influenced the prediction
- How each factor contributes positively or negatively
- Trend of contributing factors over time
- Comparison to fleet averages

### 4.3 Data Requirements

**This is where most Predict implementations succeed or fail.** The quality and quantity of data directly determines model accuracy.

#### Minimum Data Requirements

| Data Type | Minimum Volume | Ideal Volume | Source |
|---|---|---|---|
| **Failure records** | 20+ failures per failure mode per asset class | 100+ | Manage work orders with failure codes |
| **Operational history** | 2+ years | 5+ years | Manage work orders, meter readings |
| **Sensor data** | 6+ months of continuous data | 1+ year | Monitor IoT metrics |
| **Asset attributes** | Manufacturer, model, install date, location | + operating conditions, environment | Manage asset/classification records |
| **Meter readings** | Weekly or more frequent | Daily or continuous | Manage meters or Monitor |

#### Data Quality Checklist

- [ ] Failure codes are used consistently (not "OTHER" for everything)
- [ ] Work order completion dates are accurate (not bulk-closed months later)
- [ ] Meter readings are reliable (no stuck meters, no manual entry errors)
- [ ] Asset records have accurate install dates
- [ ] Sensor data has minimal gaps (less than 10% missing)
- [ ] At least one asset class has sufficient failure history for training

### 4.4 Watson Studio / watsonx.ai Integration

Predict uses Watson Studio (now watsonx.ai) as its ML training environment:

**Pre-built Notebooks:**
Predict ships with pre-built Jupyter notebooks for common prediction scenarios:

| Notebook | Purpose |
|---|---|
| Failure probability scoring | Classification model for binary failure prediction |
| Failure date prediction | Survival analysis for time-to-failure |
| Anomaly detection | Isolation forest for sensor anomaly detection |
| Custom model | Template for building your own models |

**Custom Model Development:**
Data scientists can create custom notebooks that:

- Pull data from Manage and Monitor via APIs
- Perform custom feature engineering
- Train specialized models for unique asset types
- Deploy models back into the Predict scoring pipeline

**watsonx.ai Enhancements in MAS 9:**
- Foundation model integration for enhanced feature extraction
- Improved AutoML capabilities
- Better model lifecycle management
- Enhanced explainability features

### 4.5 Setup Requirements

| Requirement | Description | Effort |
|---|---|---|
| Manage deployed and stable | Asset, WO, meter data accessible | Prerequisite |
| Monitor deployed (optional) | Sensor data flowing for IoT-enabled prediction | 2-4 weeks |
| Health deployed (recommended) | Health scores as prediction features | 1-2 weeks |
| Watson Studio / watsonx.ai | ML training environment provisioned | 1-2 weeks |
| Training data prepared | Historical data extracted and validated | 2-4 weeks |
| Data science skills | Team members trained in ML concepts | Ongoing |

### 4.6 Integration

| Integration | Direction | Description |
|---|---|---|
| **Manage -> Predict** | Inbound | Work order history, failure codes, meter readings, asset attributes |
| **Monitor -> Predict** | Inbound | Sensor time-series data, anomaly history |
| **Health -> Predict** | Inbound | Health scores as prediction features |
| **Predict -> Manage** | Outbound | Predicted failure dates displayed on asset records, can trigger WO generation |
| **Predict -> Health** | Outbound | Prediction results contribute to health scoring |

### 4.7 New in MAS 9

| Enhancement | Description |
|---|---|
| watsonx.ai integration | Leverage foundation models for improved predictions |
| Enhanced model accuracy | Improved algorithms and automated feature engineering |
| Improved UX | Better visualization of predictions and contributing factors |
| AutoML improvements | Reduced data science expertise needed for basic models |
| Expanded model types | Additional algorithm options for different use cases |
| Model performance dashboard | Track prediction accuracy over time |

### 4.8 Use Cases

**Pump Failure Prediction:**
- Input: Vibration, temperature, flow rate, pressure, runtime hours, maintenance history
- Output: Predicted failure date, top contributing factors, recommended PM date
- Benefit: Reduce unplanned downtime by 30-50%, optimize PM scheduling

**Transformer Monitoring:**
- Input: Dissolved gas analysis, oil temperature, load current, ambient temperature, age
- Output: Failure probability, predicted failure mode, recommended inspection timing
- Benefit: Prevent catastrophic transformer failures, optimize inspection intervals

**Conveyor Belt Analysis:**
- Input: Belt speed, motor current, vibration, temperature, splice condition, runtime
- Output: Belt failure prediction, splice failure prediction, recommended replacement date
- Benefit: Schedule belt replacements during planned downtime, avoid production stops

**HVAC System Prediction:**
- Input: Supply/return temperatures, compressor amps, refrigerant pressure, runtime hours
- Output: Compressor failure date, refrigerant leak probability, efficiency degradation forecast
- Benefit: Prevent comfort complaints, reduce emergency HVAC callouts

### 4.9 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| P-1 | Identify pilot asset class with best failure history (20+ failures) | 4-8 hours | Manage data access |
| P-2 | Audit data quality for selected asset class | 8-16 hours | P-1 complete |
| P-3 | Extract and prepare training dataset | 16-24 hours | P-2 complete, data science skills |
| P-4 | Provision Watson Studio / watsonx.ai environment | 4-8 hours | Cloud Pak for Data or SaaS access |
| P-5 | Run pre-built failure probability notebook on training data | 8-16 hours | P-3, P-4 complete |
| P-6 | Evaluate model performance (accuracy, precision, recall) | 4-8 hours | P-5 complete |
| P-7 | Deploy model and validate predictions against known outcomes | 8-16 hours | P-6 complete |
| P-8 | Create Predict dashboard showing predictions for pilot assets | 4-8 hours | P-7 complete |
| P-9 | Present results to maintenance teams for validation | 4-8 hours | P-7, P-8 complete |

**Total estimated effort for Predict pilot: 60-112 hours (2-3 weeks)**

---

## 5. Maximo Monitor

### 5.1 Purpose

Maximo Monitor is the **IoT data platform** for MAS. It handles everything related to connecting physical assets to the digital world:

- Ingesting sensor data from thousands of devices
- Storing time-series data at scale
- Analyzing data in real time for anomalies
- Creating dashboards to visualize asset conditions
- Generating alerts when conditions exceed thresholds
- Feeding data to Health and Predict for advanced analytics

Monitor is the application that bridges the gap between your physical operational technology (OT) world and your IT-based asset management world.

### 5.2 Key Features

#### 5.2.1 Device Types and Device Registration

Monitor organizes IoT data using a **device type / device instance** hierarchy:

- **Device Type:** A template defining what metrics a class of devices reports (e.g., "Centrifugal Pump" reports vibration, temperature, flow, pressure)
- **Device Instance:** A specific physical device mapped to a Manage asset (e.g., Pump P-1001 in Building A)

```
Device Type: Centrifugal_Pump
  |-- Metrics: vibration_x, vibration_y, temperature, flow_rate, pressure, rpm
  |-- Dimensions: manufacturer, model, location, criticality
  |
  |-- Device: PUMP-1001 (maps to Asset PUMP-1001 in Manage)
  |-- Device: PUMP-1002 (maps to Asset PUMP-1002 in Manage)
  |-- Device: PUMP-1003 (maps to Asset PUMP-1003 in Manage)
  |-- ... (hundreds or thousands of instances)
```

#### 5.2.2 Metric Ingestion Methods

| Method | Protocol | Use Case | Volume |
|---|---|---|---|
| **MQTT** | MQTT 3.1.1 / 5.0 | Real-time sensor data from IoT gateways | High (millions of msgs/day) |
| **REST API** | HTTPS POST | Batch uploads, historian integration | Medium |
| **CSV Upload** | File upload | Historical data backfill, manual data | Low |
| **Edge Data Collector** | Agent-based | Direct PLC/OPC-UA/Modbus collection | High |
| **Kafka Connect** | Kafka | Integration with existing event streams | High |

**MQTT Topic Structure:**
```
iot-2/type/{deviceType}/id/{deviceId}/evt/{eventId}/fmt/json
```

**Sample MQTT Payload:**
```json
{
  "d": {
    "vibration_x": 4.2,
    "vibration_y": 3.8,
    "temperature": 185.3,
    "flow_rate": 120.5,
    "pressure": 45.2,
    "rpm": 1780
  },
  "timestamp": "2026-03-02T14:30:00Z"
}
```

#### 5.2.3 Real-Time Dashboards

Monitor provides three types of dashboards:

**Summary Dashboard:**
- Fleet-level view across all devices of a type
- KPI cards showing count of alerts, average health, total anomalies
- Map visualization showing device locations with status colors
- Trend charts showing fleet-wide metric averages

**Entity Dashboard:**
- Individual device detail view
- All metrics displayed as time-series charts
- Anomaly markers overlaid on metric charts
- Alert history for the specific device
- Link to Manage asset record

**Custom Dashboard:**
- User-designed dashboards using the dashboard builder
- Drag-and-drop widgets: charts, tables, maps, images, KPIs
- Configurable data sources and refresh intervals
- Shareable across users and teams

#### 5.2.4 Anomaly Detection

Monitor includes built-in anomaly detection capabilities:

| Type | Description | Configuration |
|---|---|---|
| **Threshold alerts** | Simple high/low bounds | Set upper/lower limits per metric |
| **Statistical anomaly** | Deviation from rolling mean/std | Configure window size and sigma multiplier |
| **Spectral analysis** | Frequency-domain anomaly detection | For vibration analysis use cases |
| **Custom functions** | Python-based anomaly logic | Write custom Python functions |
| **Generalized anomaly** | Multi-metric anomaly scoring | Unsupervised ML on all metrics |

#### 5.2.5 Alert Rules and Notifications

Alert rules define what happens when anomalies or threshold breaches occur:

| Alert Action | Description |
|---|---|
| **Dashboard alert** | Visual indicator on Monitor dashboards |
| **Email notification** | Send email to defined recipients |
| **Manage service request** | Create a service request in Manage |
| **Manage work order** | Generate a work order in Manage |
| **Webhook** | Call an external system API |
| **Kafka event** | Publish an event to Kafka topic |

#### 5.2.6 Custom Functions (Python-Based)

Monitor supports custom Python functions (also called analytics functions) that run on the data pipeline:

```python
# Example: Custom rolling average function
class RollingAverage(BaseTransformer):
    def __init__(self, input_metric, window_size=24):
        self.input_metric = input_metric
        self.window_size = window_size

    def execute(self, df):
        df['rolling_avg'] = df[self.input_metric].rolling(
            window=self.window_size
        ).mean()
        return df
```

Custom functions can:
- Calculate derived metrics (rolling averages, rates of change, ratios)
- Implement domain-specific anomaly detection
- Enrich data with external lookups
- Apply ML models to streaming data
- Aggregate data across multiple devices

#### 5.2.7 Edge Data Collector

The Edge Data Collector extends Monitor to the plant floor:

- Runs as a lightweight agent on edge hardware (Raspberry Pi, industrial PCs)
- Collects data directly from:
  - OPC-UA servers
  - Modbus TCP/RTU devices
  - MQTT brokers
  - REST APIs
  - CSV/flat files
- Performs edge analytics (pre-processing, filtering, aggregation)
- Buffers data during connectivity loss (store-and-forward)
- Transmits to Monitor when connected

#### 5.2.8 Digital Twin Concepts

Monitor supports a device twin / digital twin approach:

- The **physical device** sends real sensor data
- The **digital twin** in Monitor maintains current state, historical trends, and calculated attributes
- The twin can include simulated values alongside real data
- Twin data is accessible via API for other applications

### 5.3 Data Architecture

```
+-------------------+     +---------------------------+     +-------------------+
| Data Sources      |     | Monitor Data Pipeline     |     | Data Consumers    |
|                   |     |                           |     |                   |
| MQTT Devices      |---->| IoT Platform              |---->| Health (scoring)  |
| REST APIs         |---->|   |                       |     |                   |
| CSV Uploads       |---->|   v                       |     | Predict (ML)      |
| Edge Collectors   |---->| Kafka Event Stream        |     |                   |
| Historians        |---->|   |                       |     | Custom Apps       |
|                   |     |   v                       |     |                   |
|                   |     | Analytics Pipeline        |     | Data Lake Export  |
|                   |     |  (Custom Functions)       |     |                   |
|                   |     |   |                       |     | Dashboards        |
|                   |     |   v                       |     |                   |
|                   |     | Data Lake (Db2/COS)       |---->| APIs              |
|                   |     |                           |     |                   |
+-------------------+     +---------------------------+     +-------------------+
```

### 5.4 Integration with Health and Predict

| Integration | What Flows | How |
|---|---|---|
| **Monitor -> Health** | Anomaly counts, metric averages, threshold breach counts | Health scoring contributors read Monitor data |
| **Monitor -> Predict** | Full time-series metric history, anomaly flags | Predict training data extraction pulls from Monitor data lake |
| **Monitor -> Manage** | Alerts, service requests, work orders | Alert rules trigger Manage actions via API |

### 5.5 Setup Requirements

| Requirement | Description | Effort |
|---|---|---|
| OpenShift with Monitor operator | Deploy Monitor application | 1-2 days |
| IoT connectivity | Network path from sensors/gateways to Monitor | Varies widely |
| Device type definitions | Define metric schemas for each asset class | 2-4 hours per type |
| Device registration | Register individual devices and map to Manage assets | 1-2 hours per batch |
| Dashboard configuration | Create summary and entity dashboards | 4-8 hours per type |
| Alert rules | Define thresholds and notification actions | 2-4 hours per type |
| Custom functions (optional) | Develop Python analytics functions | Days to weeks |

### 5.6 New in MAS 9

| Enhancement | Description |
|---|---|
| Improved ingestion | Higher throughput, better handling of late-arriving data |
| Enhanced dashboards | More visualization options, improved performance |
| Better anomaly detection | Improved built-in algorithms, lower false positive rates |
| Edge Data Collector improvements | More protocol support, better store-and-forward |
| Simplified device management | Bulk operations, improved device lifecycle management |
| Monitor -> Manage integration | Smoother alert-to-work-order flow |

### 5.7 Use Cases

**Vibration Monitoring (Rotating Equipment):**
- Devices: Accelerometers on pumps, motors, fans, compressors
- Metrics: Vibration amplitude (X, Y, Z), frequency spectrum, bearing temperature
- Analytics: RMS trending, spectral analysis, bearing defect frequency monitoring
- Alerts: Vibration exceeds ISO 10816 thresholds, sudden amplitude spike
- Value: Detect bearing failure 2-6 weeks before catastrophic failure

**Temperature Monitoring (Electrical Equipment):**
- Devices: Temperature sensors on transformers, switchgear, cable terminations
- Metrics: Winding temperature, oil temperature, ambient temperature, load current
- Analytics: Temperature rise rate, thermal model comparison, hot spot detection
- Alerts: Temperature exceeds rated limits, abnormal temperature rise
- Value: Prevent thermal failures, optimize loading

**Flow Monitoring (Process Equipment):**
- Devices: Flow meters, pressure transmitters, level sensors
- Metrics: Flow rate, differential pressure, tank level, valve position
- Analytics: Flow degradation trend, leak detection, efficiency calculation
- Alerts: Flow below minimum, sudden flow change, pressure drop
- Value: Detect leaks, optimize process efficiency, prevent dry running

**Energy Management:**
- Devices: Power meters, sub-meters, smart breakers
- Metrics: kW, kWh, power factor, voltage, current, harmonics
- Analytics: Energy baseline comparison, peak demand tracking, anomaly detection
- Alerts: Energy consumption exceeds baseline, poor power factor, voltage sag
- Value: Reduce energy costs, identify waste, support ESG reporting

### 5.8 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| M-1 | Identify a pilot device type (select 5-10 assets with existing sensors) | 4-8 hours | Sensor infrastructure exists |
| M-2 | Define device type schema (metrics, dimensions, metadata) | 2-4 hours | M-1 complete |
| M-3 | Register pilot devices and map to Manage assets | 2-4 hours | M-2 complete, Manage assets exist |
| M-4 | Establish connectivity and ingest first data (MQTT or CSV) | 8-16 hours | M-3 complete, network access |
| M-5 | Create summary dashboard for pilot device type | 4-8 hours | M-4 complete, data flowing |
| M-6 | Create entity dashboard for individual device drill-down | 4-8 hours | M-4 complete |
| M-7 | Configure anomaly detection (threshold + statistical) | 4-8 hours | M-4 complete, baseline data |
| M-8 | Set up alert rules with Manage work order creation | 4-8 hours | M-7 complete, Manage integration |
| M-9 | Develop one custom Python function (e.g., rolling average) | 8-16 hours | M-4 complete, Python skills |
| M-10 | Evaluate Edge Data Collector for direct PLC connectivity | 16-24 hours | Edge hardware available |

**Total estimated effort for Monitor pilot: 56-104 hours (2-3 weeks)**

---

## 6. Maximo Visual Inspection

### 6.1 Purpose

Maximo Visual Inspection (MVI) brings **AI-powered computer vision** to asset inspection. It enables organizations to:

- Automate visual inspections that currently require human experts
- Detect defects with consistent accuracy (no human fatigue or bias)
- Inspect assets in hazardous or hard-to-reach locations using cameras and drones
- Create a permanent visual record of asset condition over time
- Reduce inspection time from hours to seconds

MVI is one of the most immediately impactful MAS applications because the results are tangible and visual. You can literally see the AI detecting defects, which makes it easy to demonstrate value to stakeholders.

### 6.2 Key Features

#### 6.2.1 Image Classification Models

Image classification answers: "What category does this image belong to?"

**Examples:**
- Weld quality: Good / Acceptable / Defective
- Corrosion level: None / Light / Moderate / Severe
- Insulator condition: Intact / Cracked / Broken / Missing
- Surface quality: Pass / Fail

The model receives an image and returns a classification label with a confidence score.

#### 6.2.2 Object Detection Models

Object detection answers: "Where are specific objects in this image?"

**Examples:**
- Detect and locate cracks in a concrete surface (bounding boxes around each crack)
- Identify missing bolts on a flange assembly
- Locate vegetation encroachment near power lines
- Find corrosion spots on pipeline surfaces

The model returns bounding box coordinates, labels, and confidence scores for each detected object.

#### 6.2.3 Anomaly Detection (Visual)

Visual anomaly detection answers: "Does this image look normal or abnormal?"

- Trained on examples of "good" condition only
- Flags images that deviate from the learned norm
- Useful when you cannot easily define all possible defect types
- Highlights the specific regions of the image that are anomalous

#### 6.2.4 Action Detection (Video)

Action detection works on video streams to identify activities:

- Detect specific actions in video feeds (e.g., person entering restricted area)
- Safety compliance monitoring (PPE detection)
- Process compliance verification

#### 6.2.5 OCR Capabilities

Optical Character Recognition extracts text from images:

- Read equipment serial numbers and nameplates
- Capture meter readings from analog gauges
- Extract text from asset labels and tags

#### 6.2.6 Model Training (No Data Science Required)

One of MVI's strongest features is that model training requires **zero data science skills**:

1. **Upload images** -- drag and drop into the MVI interface
2. **Label images** -- draw bounding boxes or assign classification labels
3. **Click Train** -- MVI handles all ML pipeline details (transfer learning, augmentation, hyperparameter tuning)
4. **Review results** -- accuracy metrics, confusion matrix, sample predictions
5. **Deploy** -- single click deploys the model to an API endpoint

This means **maintenance engineers and inspection specialists** can train their own models without involving data scientists.

#### 6.2.7 Single-Click API Deployment

Trained models are deployed as REST API endpoints:

```
POST /api/dlapis/{model_id}/predictions
Content-Type: multipart/form-data

[image file]

Response:
{
  "classified": "defective",
  "confidence": 0.94,
  "detections": [
    {
      "label": "crack",
      "confidence": 0.91,
      "xmin": 120, "ymin": 80,
      "xmax": 340, "ymax": 195
    }
  ]
}
```

#### 6.2.8 Edge Deployment

For environments with limited connectivity or low-latency requirements:

- Deploy models to edge devices (NVIDIA Jetson, industrial PCs with GPUs)
- Run inference locally without cloud connectivity
- Buffer results and sync when connected
- Support for both camera integration and manual photo capture

#### 6.2.9 Mobile Inspection App

MVI includes a mobile app for field inspections:

- Available on iOS and Android
- Camera integration for real-time inference
- Guided inspection workflows
- Results uploaded to MVI server
- Integration with Manage work orders

#### 6.2.10 Integration with Manage Work Orders

MVI inspection results can be linked to Manage work orders:

- Inspection tasks reference MVI models
- Results are attached to work orders as evidence
- Pass/fail determinations drive work order status
- Trend inspection results over time per asset

### 6.3 AI Models and Technology

| Technology | Description |
|---|---|
| **Convolutional Neural Networks (CNNs)** | Deep learning architecture optimized for image analysis |
| **Transfer learning** | Pre-trained models (e.g., ResNet, EfficientNet) fine-tuned on your data -- requires fewer training images |
| **Data augmentation** | Automatic image transformations (rotation, scaling, flipping) to expand training data |
| **Large Vision Models (MAS 9.1)** | Foundation models for civil infrastructure that require minimal training data |

**Minimum Training Data Guidelines:**

| Model Type | Minimum Images | Recommended | Notes |
|---|---|---|---|
| Classification | 50 per class | 200+ per class | Balance classes evenly |
| Object Detection | 100 with annotations | 500+ with annotations | Cover diverse angles and lighting |
| Anomaly Detection | 100 "good" images | 500+ "good" images | Only normal examples needed |

### 6.4 Hardware Requirements

#### GPU Requirements

MVI requires GPU compute for both model training and inference:

| Component | Minimum | Recommended | Notes |
|---|---|---|---|
| **Training GPU** | NVIDIA T4 (16GB) | NVIDIA A100 (40/80GB) | More VRAM = larger batch sizes = faster training |
| **Inference GPU** | NVIDIA T4 (16GB) | NVIDIA T4 or A10 | One GPU can serve multiple models |
| **Edge GPU** | NVIDIA Jetson Nano | NVIDIA Jetson Xavier NX | For edge deployment scenarios |

**OpenShift GPU Operator** must be installed to expose GPUs to MVI pods.

#### Camera Requirements

| Use Case | Camera Type | Resolution | Frame Rate |
|---|---|---|---|
| Close-up inspection | Industrial camera | 5MP+ | N/A (still images) |
| Drone inspection | Drone-mounted camera | 12MP+ | 4K video |
| Continuous monitoring | IP camera | 2MP+ | 15+ fps |
| Mobile inspection | Smartphone camera | 8MP+ | N/A |

### 6.5 Training Pipeline

```
Step 1: Data Collection        Step 2: Labeling           Step 3: Training
+-------------------+         +-------------------+      +-------------------+
| Collect images    |         | Classification:   |      | Select model type |
| - Field photos    |-------->| Assign class labels|----->| Choose base model |
| - Drone captures  |         | Detection:        |      | Set hyperparams   |
| - Camera feeds    |         | Draw bounding boxes|     | Start training    |
| - Historical      |         | Anomaly:          |      | (minutes to hours)|
+-------------------+         | No labeling needed|      +-------------------+
                              +-------------------+              |
                                                                 v
Step 6: Production             Step 5: Deployment         Step 4: Validation
+-------------------+         +-------------------+      +-------------------+
| Inspect assets    |         | Deploy to API     |      | Review metrics:   |
| Collect results   |<--------| Deploy to edge    |<-----| - Accuracy        |
| Link to WOs       |         | Deploy to mobile  |      | - Precision       |
| Track trends      |         |                   |      | - Recall          |
+-------------------+         +-------------------+      | - Confusion matrix|
                                                         +-------------------+
```

### 6.6 Dashboard and Analytics

MVI provides performance analytics for deployed models:

- **Model accuracy over time** -- Is the model maintaining accuracy in production?
- **Inspection results summary** -- How many pass/fail per asset, per time period
- **Defect trend analysis** -- Are defect rates increasing or decreasing?
- **Confidence distribution** -- Are predictions high-confidence or borderline?
- **Inspection coverage** -- Which assets have been inspected, which are overdue?

### 6.7 Setup Requirements

| Requirement | Description | Effort |
|---|---|---|
| GPU nodes in OpenShift | At least one NVIDIA GPU node | 1-2 days (infrastructure) |
| GPU Operator installed | NVIDIA GPU Operator for OpenShift | 2-4 hours |
| MVI operator deployed | Deploy Visual Inspection application | 2-4 hours |
| Camera infrastructure | Cameras or smartphones for image capture | Varies |
| Training images collected | Minimum 50-100 images per class/defect | 1-4 weeks |
| Images labeled | Classification labels or detection bounding boxes | 1-2 weeks |
| Model trained and validated | Train, evaluate, iterate | 1-2 weeks |
| Manage integration configured | Link MVI to work order inspection tasks | 1-2 days |

### 6.8 New in MAS 9

| Enhancement | Description |
|---|---|
| Java 17 migration | Updated runtime for improved performance and security |
| Improved GPU utilization | Better multi-model serving on shared GPUs |
| Large Vision Models (9.1) | Foundation models for civil infrastructure (bridges, roads) requiring minimal training data |
| Enhanced model management | Better version control, A/B testing, model lifecycle |
| Improved edge deployment | Easier deployment to edge devices, better sync |

### 6.9 Use Cases by Industry

**Manufacturing:**

| Use Case | Model Type | Defects Detected | Benefit |
|---|---|---|---|
| Weld defect detection | Object Detection | Porosity, undercut, slag inclusion, cracking | Replace manual weld inspection, 100% coverage |
| Surface quality inspection | Classification | Scratches, dents, discoloration, roughness | Automated QC at line speed |
| Assembly verification | Object Detection | Missing components, misaligned parts | Prevent rework downstream |
| Paint quality | Anomaly Detection | Bubbles, runs, orange peel, bare spots | Consistent quality assessment |

**Utilities:**

| Use Case | Model Type | Defects Detected | Benefit |
|---|---|---|---|
| Power line inspection (drone) | Object Detection | Broken conductors, damaged insulators, bird nests | Reduce helicopter inspection costs |
| Vegetation encroachment | Object Detection | Trees/branches too close to lines | Prioritize trimming crews |
| Pole condition assessment | Classification | Woodpecker damage, rot, lean, hardware damage | Prioritize pole replacement |
| Substation equipment | Classification | Oil leaks, corrosion, animal damage | Augment substation inspections |

**Transportation:**

| Use Case | Model Type | Defects Detected | Benefit |
|---|---|---|---|
| Track surface inspection | Object Detection | Rail defects, tie condition, ballast issues | Automated track inspection from rail vehicles |
| Road surface condition | Object Detection | Potholes, cracking, rutting | Prioritize road maintenance |
| Bridge deck condition | Object Detection + LVM | Spalling, delamination, efflorescence | Augment bridge inspections (NBI) |

**Oil and Gas:**

| Use Case | Model Type | Defects Detected | Benefit |
|---|---|---|---|
| Corrosion detection | Object Detection | Surface corrosion, pitting, wall thinning | Early detection before leak/failure |
| Pipeline inspection (drone) | Object Detection | Exposed pipe, encroachment, leaks | Reduce foot patrol costs |
| Flange inspection | Classification | Bolt condition, gasket condition, leaks | Systematic flange management |

### 6.10 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| V-1 | Verify GPU nodes are available in OpenShift cluster | 2-4 hours | Infrastructure team |
| V-2 | Deploy MVI operator and validate installation | 4-8 hours | V-1 complete |
| V-3 | Identify pilot inspection use case (choose highest-value, easiest data) | 4-8 hours | Domain expertise |
| V-4 | Collect sample images (minimum 100, ideally 200+) | 8-40 hours | Camera access, field access |
| V-5 | Label images (classification labels or detection bounding boxes) | 8-24 hours | V-4 complete, domain expertise |
| V-6 | Train classification or detection model | 2-4 hours | V-5 complete |
| V-7 | Evaluate model performance and iterate if needed | 4-8 hours | V-6 complete |
| V-8 | Deploy model to API endpoint | 1-2 hours | V-7 complete |
| V-9 | Test with mobile app or REST API | 4-8 hours | V-8 complete |
| V-10 | Configure Manage integration (link to inspection work orders) | 8-16 hours | V-8 complete, Manage access |
| V-11 | Evaluate edge deployment if applicable | 8-16 hours | V-8 complete, edge hardware |

**Total estimated effort for MVI pilot: 55-138 hours (2-4 weeks)**

---

## 7. Maximo AI Assist / Maximo Assistant

### 7.1 Purpose

Maximo AI Assist (and the broader Maximo Assistant capability) brings **generative AI and intelligent assistance** to maintenance teams. Powered by IBM watsonx.ai, it transforms how users interact with Maximo:

- Natural language queries instead of complex searches
- AI-recommended field values on work orders
- Similar record detection to leverage historical knowledge
- Intelligent troubleshooting guidance
- Automated failure code identification

This represents the most significant shift in how users interact with Maximo since the introduction of the web interface.

### 7.2 Key Features

#### 7.2.1 watsonx.ai-Powered Conversational Assistant

The Maximo Assistant provides a conversational interface within MAS:

- **Natural language queries:** "Show me all open emergency work orders for Building A pumps"
- **Asset information retrieval:** "What is the maintenance history for Pump P-1001?"
- **Troubleshooting guidance:** "Pump P-1001 is vibrating excessively. What should I check?"
- **Work order creation:** "Create a corrective work order for Pump P-1001 with high priority"
- **Knowledge base search:** "What is the procedure for replacing a mechanical seal on a centrifugal pump?"

#### 7.2.2 Natural Language Work Order Creation

Users can create work orders through natural language:

```
User: "The HVAC unit on the 3rd floor of Building B is making a loud noise
       and not cooling properly. It needs to be looked at today."

AI Assistant:
  - Asset: HVAC-B3-001 (identified from location description)
  - Work Type: CM (Corrective Maintenance)
  - Priority: 2 (High - from "today")
  - Description: "HVAC unit making loud noise, not cooling. Requires same-day attention."
  - Failure Class: HVAC
  - Problem Code: NOISE
  - Location: B3-MECH (Building B, 3rd Floor, Mechanical)

  "I've drafted this work order. Would you like me to submit it?"
```

#### 7.2.3 AI-Powered Asset Search

Instead of navigating complex filter queries, users can search naturally:

- "Find all critical pumps that have had more than 3 breakdowns this year"
- "Show me assets in Building C that are past their expected life"
- "Which motors were last maintained more than 6 months ago?"

The AI translates natural language into Maximo queries and returns results.

#### 7.2.4 Failure Code Identification

When technicians report problems, the AI suggests appropriate failure codes:

- Analyzes the problem description text
- Recommends failure class, problem code, cause code, and remedy code
- Based on historical patterns for similar assets and similar descriptions
- Improves failure code consistency across the organization

#### 7.2.5 PM Optimization Recommendations

AI analyzes preventive maintenance history to recommend:

- Which PMs are generating little value (no defects found in last N executions)
- Which PMs should have shorter intervals (failures occurring between PMs)
- Which PMs could be extended (consistently finding assets in good condition)
- Optimal PM timing based on asset health and predictions

#### 7.2.6 Knowledge Base Search

Integrates with document repositories to provide contextual technical knowledge:

- Equipment manuals and technical documentation
- Standard operating procedures (SOPs)
- Historical repair narratives from work order long descriptions
- Safety procedures and regulatory requirements

#### 7.2.7 Remote Technician Assistance

For field technicians working on complex equipment:

- Step-by-step troubleshooting guidance
- Integration with Visual Inspection for visual diagnosis
- Access to repair history for the specific asset
- Collaboration tools for connecting with subject matter experts

### 7.3 Maximo AI Service: Central Integration Hub

The Maximo AI Service is the deployment component that connects watsonx.ai to MAS:

| Component | Description |
|---|---|
| **AI Service operator** | Deploys and manages the AI Service on OpenShift |
| **Model management** | Configure, train, and retrain AI models |
| **watsonx.ai connector** | Connects to watsonx.ai foundation models |
| **Feature store** | Manages features used for AI recommendations |
| **Inference engine** | Serves AI model predictions to MAS applications |
| **Feedback loop** | Captures user acceptance/rejection of AI recommendations for retraining |

**Deployment Architecture:**

```
+-------------------+     +-------------------+     +-------------------+
| watsonx.ai        |     | Maximo AI Service |     | MAS Applications  |
|                   |     |                   |     |                   |
| Foundation Models |<--->| Model Management  |<--->| Manage            |
| Custom Models     |     | Feature Store     |     | Mobile            |
| Training Pipeline |     | Inference Engine  |     | Health             |
|                   |     | Feedback Loop     |     | Predict            |
+-------------------+     +-------------------+     +-------------------+
```

### 7.4 AI Capabilities in Manage 9.1

MAS 9.1 introduces several AI-native capabilities directly within Manage:

#### 7.4.1 Field Value Recommendations

When users are filling out records (work orders, service requests, assets), the AI recommends field values:

| Field | How AI Recommends |
|---|---|
| **Priority** | Based on asset criticality, description text, historical patterns |
| **Work type** | Based on description text and failure codes |
| **Failure class** | Based on asset type and problem description |
| **Problem code** | Based on description text and historical failures for similar assets |
| **Cause code** | Based on problem code and asset type patterns |
| **Remedy code** | Based on problem/cause combination history |
| **Classification** | Based on description and asset attributes |
| **Owner group** | Based on asset location, work type, and classification |
| **Craft** | Based on work type and historical assignments |

Each recommendation includes a confidence score. Users can accept, modify, or reject recommendations, and this feedback improves future accuracy.

#### 7.4.2 Similar Record Detection

When creating a new work order or service request, the AI identifies similar historical records:

- "3 similar work orders found for this asset in the past 12 months"
- Shows resolution details from previous similar work
- Helps avoid duplicate work orders
- Enables knowledge transfer from experienced technicians to new staff

#### 7.4.3 Natural Language Queries

Users can type questions in the Manage search bar using natural language:

- Queries are translated to Maximo query syntax
- Results are returned in standard list views
- Users can refine queries conversationally

### 7.5 Setup Requirements

| Requirement | Description | Effort |
|---|---|---|
| watsonx.ai access | Provision watsonx.ai instance (SaaS or on-premises) | 1-2 weeks |
| Maximo AI Service deployed | Install AI Service operator on OpenShift | 1-2 days |
| AI Service configured | Connect to watsonx.ai, configure models | 2-4 days |
| Training data prepared | Historical work orders, failure codes, asset data | 1-2 weeks |
| AI models trained | Train recommendation models on your data | 1-2 weeks |
| User training | Train maintenance teams on AI features | 1-2 weeks |
| Feedback loop established | Process for capturing and using recommendation feedback | Ongoing |

### 7.6 New in MAS 9.1

| Enhancement | Description |
|---|---|
| Generative AI integration | watsonx.ai foundation model integration for natural language capabilities |
| Enhanced field recommendations | More fields supported, improved accuracy |
| Conversational assistant | Natural language interaction within Manage |
| Improved similar record detection | Better similarity algorithms, cross-asset learning |
| AI-powered search | Natural language query translation |
| Multi-language support | AI recommendations work across supported languages |

### 7.7 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| AI-1 | Evaluate watsonx.ai deployment options (SaaS vs. on-premises) | 8-16 hours | Architecture team |
| AI-2 | Deploy Maximo AI Service operator | 4-8 hours | OpenShift access, AI-1 decision |
| AI-3 | Configure AI Service connection to watsonx.ai | 4-8 hours | AI-2 complete, watsonx.ai provisioned |
| AI-4 | Prepare training data (work orders with failure codes, 2+ years) | 16-24 hours | Manage data access |
| AI-5 | Train initial AI models (field recommendations) | 8-16 hours | AI-3, AI-4 complete |
| AI-6 | Test field value recommendations on sample work orders | 8-16 hours | AI-5 complete |
| AI-7 | Test natural language queries in Manage | 4-8 hours | AI-5 complete |
| AI-8 | Evaluate conversational assistant capabilities | 4-8 hours | AI-3 complete |
| AI-9 | Gather user feedback and assess recommendation accuracy | 8-16 hours | AI-6 complete, user testing |
| AI-10 | Plan retraining cycle and feedback loop process | 4-8 hours | AI-9 complete |

**Total estimated effort for AI Assist pilot: 68-128 hours (2-3 weeks)**

---

## 8. Maximo Optimizer

### 8.1 Purpose

Maximo Optimizer provides **advanced scheduling optimization** for maintenance work. It takes a pool of work orders with constraints (skills required, tools needed, asset availability windows, crew schedules, travel time) and produces an optimized schedule that minimizes cost, travel, and idle time while maximizing work completion.

In Maximo 7.6, the Scheduler module provided basic graphical scheduling but lacked true optimization. Optimizer uses mathematical optimization algorithms (constraint programming, mixed-integer programming) to find schedules that would be impossible to create manually.

### 8.2 Key Features

#### 8.2.1 Work Order Scheduling Optimization

Optimizer considers all of the following when creating a schedule:

| Constraint | Description |
|---|---|
| **Work order priority** | Higher priority work orders scheduled first |
| **Required crafts/skills** | Match technician skills to work requirements |
| **Required tools** | Ensure tools are available at scheduled time |
| **Asset availability** | Schedule within asset downtime windows |
| **Technician availability** | Working hours, shifts, vacation, training |
| **Travel time** | Minimize travel between work locations |
| **Work dependencies** | Predecessor/successor work order relationships |
| **SLA deadlines** | Complete work before service level deadlines |
| **Parts availability** | Only schedule when required parts are in stock |

#### 8.2.2 Crew Scheduling

- Assign work orders to crews (groups of technicians)
- Balance workload across crew members
- Consider crew composition (lead + apprentice combinations)
- Handle overtime and shift constraints

#### 8.2.3 Route Optimization

For field service and geographically distributed work:

- Minimize total travel distance and time
- Group nearby work orders together
- Consider traffic patterns and time-of-day routing
- Optimize vehicle utilization

#### 8.2.4 Travel Time Minimization

Optimizer calculates realistic travel times between work locations:

- Straight-line distance calculation (basic)
- Road network distance (with ArcGIS integration)
- Historical travel time data
- Multi-stop route optimization

#### 8.2.5 Resource Leveling

- Prevent resource over-allocation (technician double-booked)
- Smooth work distribution over time periods
- Identify resource bottlenecks
- Suggest hiring or contracting needs

#### 8.2.6 Constraint-Based Optimization

The optimization engine supports multiple objective functions:

| Objective | What It Optimizes |
|---|---|
| **Minimize total cost** | Labor cost + travel cost + penalty for late work |
| **Maximize work completed** | Complete as many work orders as possible |
| **Minimize travel** | Reduce total travel time/distance |
| **Balance workload** | Even distribution across technicians |
| **Minimize tardiness** | Reduce late completions relative to target dates |

Users can weight these objectives to match their priorities.

#### 8.2.7 Integration with Graphical Assignment

Optimizer results feed into the Manage Graphical Assignment (Gantt chart) view:

- Optimized schedule appears on the Gantt chart
- Dispatchers can review and manually adjust
- Changes are validated against constraints
- Re-optimization can be triggered after manual changes

#### 8.2.8 Integration with Dispatching Dashboard

The Dispatching Dashboard provides a real-time view of:

- Today's optimized schedule by technician
- Work order status (assigned, in progress, completed)
- Map view of technician locations and assigned work
- Real-time schedule adjustments as conditions change

### 8.3 Optimization Models

Optimizer supports configurable optimization parameters:

| Parameter | Description | Example Values |
|---|---|---|
| **Planning horizon** | Time window to optimize | 1 day, 1 week, 2 weeks |
| **Optimization time limit** | Maximum time for solver to run | 30 seconds, 5 minutes, 30 minutes |
| **Priority weights** | Relative importance of priorities 1-5 | P1=100, P2=50, P3=20, P4=10, P5=5 |
| **Travel speed** | Average travel speed for distance calculations | 30 mph (urban), 60 mph (highway) |
| **Work buffer** | Buffer time between assignments | 15 minutes, 30 minutes |
| **Overtime allowed** | Whether optimizer can schedule overtime | Yes/No, max hours |
| **Skills matching** | Strict match vs. closest match | Strict, Flexible |

### 8.4 Spatial Integration: ArcGIS

For organizations with Esri ArcGIS:

- Real road network routing between work locations
- Traffic-aware travel time estimates
- Service territory definitions
- Map-based visualization of optimized routes
- Integration with Manage Spatial module

### 8.5 Setup Requirements

| Requirement | Description | Effort |
|---|---|---|
| Manage Scheduler module | Scheduler must be configured in Manage | 1-2 weeks |
| Optimizer operator deployed | Install Optimizer on OpenShift | 1-2 days |
| Craft/skill data | Technician skills must be accurately recorded in Manage | 1-2 weeks (data cleanup) |
| Work location coordinates | Assets/locations need lat/long for travel optimization | 1-2 weeks (data enrichment) |
| Shift definitions | Technician work schedules defined in Manage | 2-4 days |
| ArcGIS integration (optional) | Configure Esri ArcGIS connection for routing | 1-2 weeks |

### 8.6 Use Cases

**Field Service Optimization:**
- 50 field technicians covering a metropolitan area
- 200+ work orders per day across 500+ locations
- Optimizer creates daily routes minimizing travel while respecting priorities and SLAs
- Result: 20-30% reduction in travel time, 15-25% more work orders completed per day

**Maintenance Window Planning:**
- Annual plant shutdown with 500+ work orders in 14-day window
- Multiple crafts, tools, and contractors to coordinate
- Complex dependencies between work orders
- Optimizer creates a feasible schedule, identifies resource conflicts, and suggests solutions
- Result: 10-15% reduction in shutdown duration

**Emergency Response:**
- Storm damage creates 1,000+ emergency work orders overnight
- Optimizer rapidly schedules crews to highest-priority locations
- Re-optimizes as new work orders arrive throughout the day
- Result: Faster restoration, equitable workload distribution

### 8.7 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| O-1 | Review current scheduling process and identify pain points | 8-16 hours | Scheduling team interviews |
| O-2 | Verify craft/skill data quality in Manage | 8-16 hours | Manage data access |
| O-3 | Verify work location coordinate data | 4-8 hours | Manage data access |
| O-4 | Deploy Optimizer operator on OpenShift | 4-8 hours | OpenShift access |
| O-5 | Configure optimization model with current constraints | 8-16 hours | O-2, O-3, O-4 complete |
| O-6 | Run first optimization on a sample work order set | 4-8 hours | O-5 complete |
| O-7 | Compare optimized schedule vs. manual schedule | 4-8 hours | O-6 complete |
| O-8 | Review results in Dispatching Dashboard / Graphical Assignment | 4-8 hours | O-6 complete |
| O-9 | Test with larger work order volumes and iterate parameters | 8-16 hours | O-6 complete |
| O-10 | Evaluate ArcGIS integration for travel optimization (if applicable) | 8-16 hours | ArcGIS available |

**Total estimated effort for Optimizer pilot: 60-120 hours (2-3 weeks)**

---

## 9. Maximo Civil Infrastructure

### 9.1 Purpose

Maximo Civil Infrastructure is a **purpose-built application for managing civil infrastructure assets**: bridges, roads, tunnels, retaining walls, culverts, and other transportation and public works assets. It addresses the specific inspection, condition assessment, and regulatory compliance requirements that are unique to civil infrastructure.

This application is particularly relevant for:

- State Departments of Transportation (DOTs)
- County and municipal public works departments
- Toll authorities and turnpike commissions
- Transit agencies
- Federal infrastructure agencies

### 9.2 Key Features

#### 9.2.1 Bridge Inspection (NBI Compliance)

Civil Infrastructure provides FHWA-compliant bridge inspection capabilities:

| Feature | Description |
|---|---|
| **NBI element inspection** | Inspect per AASHTO element-based methodology |
| **Condition ratings** | 0-9 NBI condition ratings for deck, superstructure, substructure |
| **Element condition states** | Track quantity in each condition state per element |
| **Inspection scheduling** | Automated scheduling per FHWA 2-year cycle requirements |
| **Inspection report generation** | Generate FHWA-compliant inspection reports |
| **NBI data export** | Export data in NBI format for federal reporting |
| **Load rating tracking** | Record and track bridge load ratings |
| **Scour assessment** | Track scour critical bridges and countermeasures |

#### 9.2.2 Road Condition Assessment

- Pavement condition index (PCI) scoring
- Distress identification and quantification
- Ride quality metrics (IRI)
- Treatment recommendation based on condition
- Pavement management integration

#### 9.2.3 Tunnel Inspection

- NTIS (National Tunnel Inspection Standards) compliance
- Element-based tunnel inspection
- Fire/life safety system tracking
- Structural and functional element condition tracking

#### 9.2.4 Deficiency Tracking

- Track deficiencies identified during inspections
- Prioritize deficiencies by severity and safety impact
- Link deficiencies to maintenance work orders
- Track deficiency resolution over time
- Generate deficiency reports for management and regulators

#### 9.2.5 Condition-Based Maintenance

- Drive maintenance decisions from inspection condition data
- Trigger work orders when condition ratings drop below thresholds
- Integrate with Health for condition scoring
- Support preservation-based maintenance strategies

#### 9.2.6 Integration with Visual Inspection

Civil Infrastructure integrates with MVI for AI-augmented inspections:

- Drone-captured imagery analyzed by MVI models
- Automated defect detection on bridge decks, piers, and beams
- **Large Vision Models (MAS 9.1)** specifically trained for civil infrastructure
- Visual evidence linked to element-level inspection records

### 9.3 Regulatory Compliance

| Standard | Description | Application |
|---|---|---|
| **FHWA NBIS** | National Bridge Inspection Standards | Bridge inspection program management |
| **AASHTO Manual** | Manual for Bridge Element Inspection | Element-based inspection methodology |
| **23 CFR 650** | Code of Federal Regulations for bridges | Inspection frequency and reporting |
| **NTIS** | National Tunnel Inspection Standards | Tunnel inspection program |
| **MAP-21 / FAST Act** | Federal transportation legislation | Performance-based planning |
| **GASB 34** | Government accounting for infrastructure | Asset valuation and depreciation |

### 9.4 Use Cases

**State DOT Bridge Program:**
- Manage 5,000+ bridge inventory
- Schedule and track biennial inspections (FHWA compliance)
- Generate NBI data submissions
- Prioritize bridge rehabilitation and replacement
- Track bridge sufficiency ratings and structural deficiencies

**Municipal Infrastructure:**
- Manage bridges, culverts, retaining walls, signs, signals
- Track condition across diverse asset types
- Prioritize limited capital budget across competing needs
- Demonstrate regulatory compliance to state oversight agencies

**Transit Agency:**
- Manage rail bridges, tunnels, stations, guideways
- Track FTA State of Good Repair requirements
- Generate Transit Asset Management (TAM) plan data
- Prioritize capital investment based on condition

### 9.5 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| CI-1 | Assess applicability to your infrastructure portfolio | 4-8 hours | Asset inventory review |
| CI-2 | Review current bridge/tunnel inspection program and tools | 8-16 hours | Inspection team interviews |
| CI-3 | Deploy Civil Infrastructure module | 4-8 hours | Manage deployed, OpenShift access |
| CI-4 | Configure bridge inventory for pilot set (10-20 bridges) | 8-16 hours | CI-3 complete, bridge data |
| CI-5 | Configure inspection forms for NBI compliance | 8-16 hours | CI-4 complete, inspection expertise |
| CI-6 | Conduct pilot inspections using the application | 16-24 hours | CI-5 complete, field access |
| CI-7 | Generate NBI-format reports and validate | 4-8 hours | CI-6 complete |
| CI-8 | Evaluate Visual Inspection integration for bridge deck scanning | 8-16 hours | MVI deployed, drone available |

**Total estimated effort for Civil Infrastructure pilot: 60-112 hours (2-3 weeks)**

---

## 10. Maximo Parts Identifier

### 10.1 Purpose

Maximo Parts Identifier uses **AI-powered visual recognition** to help field technicians identify unknown parts. When a technician encounters a part they cannot identify (no visible part number, worn label, unfamiliar equipment), they can take a photo and the AI will identify the part, cross-reference it with the inventory catalog, and provide ordering information.

### 10.2 Key Features

| Feature | Description |
|---|---|
| **Visual parts identification** | Point camera at a part, AI identifies it |
| **Parts catalog integration** | Cross-references identified parts with Manage item master |
| **Inventory lookup** | Shows current stock levels and storeroom locations |
| **Ordering integration** | Initiate purchase requisition from identification result |
| **Similar parts suggestion** | Suggests alternative/substitute parts |
| **Historical recognition** | Learns from confirmed identifications over time |

### 10.3 How It Works

```
Step 1                    Step 2                    Step 3
+-------------------+     +-------------------+     +-------------------+
| Technician takes  |     | AI model analyzes |     | Results returned: |
| photo of unknown  |---->| image and matches |---->| - Part number     |
| part in the field |     | against trained   |     | - Description     |
|                   |     | parts catalog     |     | - Manufacturer    |
+-------------------+     +-------------------+     | - Storeroom qty   |
                                                    | - Order link      |
                                                    +-------------------+
```

### 10.4 Use Cases

- **Field technicians** identifying parts on unfamiliar equipment
- **Receiving clerks** identifying parts that arrive without documentation
- **Inventory staff** cataloging unlabeled stock
- **Apprentice technicians** learning parts identification
- **Emergency repairs** when subject matter experts are unavailable

### 10.5 Team Exploration Tasks

| Task # | Task | Effort | Prerequisites |
|---|---|---|---|
| PI-1 | Evaluate applicability to your operations | 2-4 hours | Field team interviews |
| PI-2 | Identify high-value use cases (assets with many similar-looking parts) | 4-8 hours | PI-1 complete |
| PI-3 | Collect sample images of common parts | 8-16 hours | Camera access, parts access |
| PI-4 | Deploy and configure Parts Identifier | 4-8 hours | MAS deployed |
| PI-5 | Test identification accuracy on known parts | 4-8 hours | PI-3, PI-4 complete |

**Total estimated effort for Parts Identifier evaluation: 22-44 hours (1 week)**

---

## 11. Additional MAS Integrations and Connectors

### 11.1 Maximo Connector for SAP

| Attribute | Detail |
|---|---|
| **Purpose** | Bidirectional integration between MAS and SAP ERP |
| **Data Flows** | POs, receipts, invoices, GL postings, cost center sync, HR/person records |
| **Technology** | REST APIs, middleware (MIF/Integration Framework) |
| **Direction** | Maximo -> SAP: Financial transactions; SAP -> Maximo: Master data |
| **Key Consideration** | If your org uses SAP for finance, this connector replaces custom 7.6 integrations |

### 11.2 Maximo Connector for Oracle ERP

| Attribute | Detail |
|---|---|
| **Purpose** | Integration between MAS and Oracle ERP (Cloud or E-Business Suite) |
| **Data Flows** | Similar to SAP connector: financials, procurement, HR |
| **Technology** | REST APIs, Oracle Integration Cloud, or MIF |
| **Key Consideration** | Evaluate whether existing 7.6 Oracle integrations can be replaced with standard connector |

### 11.3 Maximo Connector for Workday

| Attribute | Detail |
|---|---|
| **Purpose** | Sync person/labor records from Workday HCM to MAS |
| **Data Flows** | Employee records, craft/skill qualifications, organizational hierarchy |
| **Technology** | Workday REST APIs, Integration Framework |
| **Key Consideration** | Replaces manual person record maintenance in Maximo |

### 11.4 Maximo Connector for TRIRIGA

| Attribute | Detail |
|---|---|
| **Purpose** | Integration between MAS (asset management) and TRIRIGA (facility management) |
| **Data Flows** | Facility locations, space data, asset-to-space mapping, work order sync |
| **Technology** | REST APIs, shared data layer in MAS 9 |
| **Key Consideration** | TRIRIGA Application Suite is also moving to MAS platform in MAS 9 |

### 11.5 Maximo Connector for Envizi

| Attribute | Detail |
|---|---|
| **Purpose** | Connect asset data with ESG/sustainability reporting |
| **Data Flows** | Energy consumption from Monitor, asset lifecycle data, carbon footprint calculations |
| **Technology** | REST APIs, Envizi data connectors |
| **Key Consideration** | Increasingly important for ESG compliance and sustainability reporting |

### 11.6 watsonx.ai Integration

| Attribute | Detail |
|---|---|
| **Purpose** | Custom AI/ML model development beyond pre-built capabilities |
| **Capabilities** | Custom prediction models, NLP models, foundation model fine-tuning |
| **Technology** | watsonx.ai APIs, Jupyter notebooks, Watson Studio pipelines |
| **Key Consideration** | Required for organizations wanting to build custom AI beyond out-of-the-box |

### 11.7 IBM Cloud Pak for Data Integration

| Attribute | Detail |
|---|---|
| **Purpose** | Enterprise data platform for advanced analytics |
| **Capabilities** | Data virtualization, data quality, data governance, advanced analytics |
| **Technology** | Cloud Pak for Data running on same OpenShift cluster |
| **Key Consideration** | Provides enterprise data management capabilities for MAS data |

### 11.8 Integration Assessment Checklist

For each connector, your team should evaluate:

- [ ] Do we currently have this integration in Maximo 7.6?
- [ ] Is the existing integration custom-built or using standard features?
- [ ] What data flows between the systems?
- [ ] What is the business impact if this integration is not available on Day 1?
- [ ] Can the standard MAS connector replace our custom integration?
- [ ] What is the effort to configure vs. rebuild?

---

## 12. The Integrated Data Flow

### 12.1 Complete Data Flow Diagram

```
+------------------+                                          +------------------+
| PHYSICAL WORLD   |                                          | BUSINESS SYSTEMS |
|                  |                                          |                  |
| Sensors          |     +--------------------------------+   | SAP / Oracle     |
| PLCs             |---->|          MONITOR               |   | (Financials)     |
| SCADA            |     | - Device mgmt                  |   |                  |
| Historians       |     | - Metric ingestion             |   | Workday          |
| Edge Devices     |     | - Anomaly detection            |   | (HR/Labor)       |
|                  |     | - Dashboards                   |   |                  |
| Cameras          |     +--------|------------|----------+   | GIS / ArcGIS     |
| Drones           |              |            |              | (Spatial)        |
| Smartphones      |         IoT Metrics    Alerts           |                  |
+------------------+              |            |              | Envizi           |
        |                         v            v              | (ESG)            |
        |                 +----------+   +-----------+        +---------|--------+
        |                 |  HEALTH  |   |  MANAGE   |<----------------+
        |                 |          |   | (Core EAM)|        Connectors
        |                 | - Health |   |           |
        |                 |   scores |   | - Assets  |
        |                 | - Degrad.|   | - WOs     |
        |                 | - AIO    |   | - PMs     |
        |                 | - Risk   |   | - Inv.    |
        |                 +-----|----+   | - Labor   |
        |                       |        +----|------+
        |                  Scores +            |
        |                  History         Work Orders
        |                       |              |
        |                       v              v
        |                 +----------+   +-----------+
        |                 | PREDICT  |   | OPTIMIZER |
        |                 |          |   |           |
        |                 | - Failure|   | - Schedule|
        |                 |   predict|   | - Route   |
        |                 | - Anomaly|   | - Resource|
        |                 | - ML     |   | - Crew    |
        |                 +----------+   +-----------+
        |                                      |
        v                                 Optimized
+------------------+                     Schedule
| VISUAL           |                          |
| INSPECTION       |                          v
|                  |                    +-----------+
| - Classification |                   |  MOBILE   |
| - Detection      |                   |           |
| - LVM           |                    | - Execute |
| - Edge deploy   |--(results)------->| - Inspect |
+------------------+                   | - Report  |
                                       +-----------+
        +------------------+                |
        | AI ASSIST        |                |
        |                  |<----(context)--+
        | - NL queries     |
        | - Recommendations|
        | - Troubleshoot   |
        | - Knowledge base |
        +------------------+
```

### 12.2 Data Flow Narrative

1. **Physical assets** generate data through sensors, PLCs, SCADA systems, and historians. This raw operational data flows into **Monitor**.

2. **Monitor** ingests, stores, and analyzes the IoT data. It detects anomalies and generates alerts. Anomaly data and metric summaries flow into **Health** as scoring contributors. Alert conditions can trigger work orders in **Manage**.

3. **Health** combines Monitor data with Manage data (age, work history, meters, inspections) to calculate health scores. It creates degradation curves and runs Asset Investment Optimization. Health scores and history flow to **Predict**.

4. **Predict** uses data from Monitor (sensor history), Health (scores), and Manage (failure history) to train ML models that predict when assets will fail. Predictions are displayed in Manage and can trigger preventive work orders.

5. **Manage** is the hub. It receives alerts from Monitor, health scores from Health, predictions from Predict, inspection results from Visual Inspection, and AI recommendations from AI Assist. It generates work orders that flow to **Optimizer**.

6. **Optimizer** takes the pool of work orders from Manage, considers constraints (skills, travel, availability, priorities), and produces an optimized schedule. This schedule is pushed to **Mobile** for execution.

7. **Visual Inspection** operates alongside the main pipeline. Cameras and drones capture images that are analyzed by AI models. Results feed back into Manage as inspection evidence and can trigger work orders.

8. **AI Assist** provides an intelligence layer across all applications. It helps users create work orders, find information, troubleshoot problems, and receive recommendations.

9. **Business system connectors** (SAP, Oracle, Workday, Envizi) handle external data flows for financials, HR, and sustainability reporting.

### 12.3 The Value Multiplier

Each application provides value individually, but the **integrated value is multiplicative, not additive**:

| Scenario | Individual App Value | Integrated Value |
|---|---|---|
| Monitor detects vibration anomaly | Alert generated, technician investigates | Alert triggers Health re-score, Predict updates failure date, WO created with AI-recommended failure codes, Optimizer schedules repair with optimal routing |
| Health score drops below 40 | Asset flagged as critical | Predict provides failure date, Monitor dashboard highlighted, WO auto-generated, Optimizer prioritizes scheduling |
| Visual Inspection detects corrosion | Defect recorded | Corrosion severity feeds Health scoring, Predict adjusts failure timeline, WO created with inspection evidence attached |

---

## 13. AppPoints Licensing Guide

### 13.1 How AppPoints Work

AppPoints are the licensing currency for MAS. Instead of purchasing individual application licenses, you purchase a pool of AppPoints that can be allocated across any combination of MAS applications.

**Key Concepts:**

| Concept | Description |
|---|---|
| **AppPoint pool** | Total number of AppPoints purchased by your organization |
| **Application cost** | Each application consumes a specific number of AppPoints per authorized user |
| **Concurrent usage** | Some applications license by concurrent users (users active at the same time) |
| **Authorized usage** | Some applications license by authorized users (total users with access) |
| **Flex allocation** | Points can be reallocated between applications (within contract terms) |

### 13.2 AppPoints Cost Per Application

**Note:** Exact AppPoint costs vary by contract and change over time. The following represents typical relative costs as of MAS 9. Confirm exact costs with your IBM representative.

| Application | AppPoints Per User (Typical) | License Type | Notes |
|---|---|---|---|
| **Manage - Limited** | 5 | Authorized | View-only, limited transactions |
| **Manage - Base** | 10 | Authorized | Standard EAM functionality |
| **Manage - Premium** | 15 | Authorized | Full functionality including add-ons |
| **Monitor** | 5 | Authorized | IoT monitoring and dashboards |
| **Health** | 5 | Authorized | Health scoring and AIO |
| **Predict** | 10 | Authorized | ML predictions |
| **Visual Inspection** | 10 | Authorized | Computer vision inspection |
| **Optimizer** | 10 | Authorized | Scheduling optimization |
| **AI Assist** | Varies | Authorized | Included with Premium in some contracts |
| **Civil Infrastructure** | 10 | Authorized | Infrastructure management |
| **Mobile** | Included | N/A | Included with Manage license |

### 13.3 Base vs. Premium AppPoints

| Category | Base AppPoints | Premium AppPoints |
|---|---|---|
| **Manage access** | Standard EAM | Full EAM + add-ons (Spatial, Transportation, Aviation, etc.) |
| **AI features** | Basic | Full AI Assist, advanced recommendations |
| **Integration** | Standard APIs | Advanced connectors |
| **Cost** | Lower per point | Higher per point |

### 13.4 Allocation Strategies

**Strategy 1: Start Narrow, Expand Later**
- Allocate most points to Manage initially
- As you deploy Health, Monitor, Predict, reallocate points
- Good for phased implementations

**Strategy 2: Power User Model**
- Small group of "power users" get access to all applications (high points per user)
- Larger group gets Manage-only access (lower points per user)
- Good for organizations exploring the suite

**Strategy 3: Role-Based Allocation**

| Role | Applications | AppPoints/User |
|---|---|---|
| Maintenance Manager | Manage Premium + Health + Predict | 30 |
| Reliability Engineer | Manage Base + Health + Predict + Monitor | 30 |
| Planner/Scheduler | Manage Base + Optimizer | 20 |
| Technician | Manage Base + Mobile | 10 |
| Inspector (Visual) | Manage Limited + Visual Inspection | 15 |
| IoT Analyst | Manage Limited + Monitor | 10 |
| Executive | Manage Limited + Health (dashboards) | 10 |

### 13.5 How to Optimize AppPoints Usage

1. **Audit actual usage** -- Not every licensed user actively uses every application
2. **Use Limited licenses** where possible -- Many users only need view access
3. **Phase application rollout** -- Do not allocate points to applications you have not deployed
4. **Monitor utilization** -- MAS provides usage reports to identify over-allocation
5. **Consider concurrent licensing** -- If only 20% of users are active at once, concurrent may be cheaper
6. **Right-size Premium vs. Base** -- Only Premium where features justify the cost

---

## 14. Implementation Prioritization Matrix

| Application | Business Value | Implementation Complexity | Prerequisites | Recommended Phase | Priority |
|---|---|---|---|---|---|
| **Health** | HIGH -- Immediate visibility into asset condition, drives investment decisions | MEDIUM -- Requires good data quality, straightforward configuration | Manage deployed, quality asset data | Phase 1 | 1 |
| **Monitor** | HIGH -- Real-time asset visibility, enables Predict and Health IoT contributors | HIGH -- Requires IoT infrastructure, connectivity, device management | Manage deployed, IoT sensors available | Phase 2 | 2 |
| **Predict** | VERY HIGH -- Prevents failures, reduces unplanned downtime | HIGH -- Requires data science skills, sufficient failure history, Monitor data | Manage + Health + Monitor, failure data, data science | Phase 3 | 3 |
| **Visual Inspection** | HIGH -- Automates inspections, improves consistency | MEDIUM -- Requires GPU, camera infrastructure, training images | GPU nodes, camera access, labeled images | Phase 3 | 4 |
| **AI Assist** | MEDIUM-HIGH -- Improves user productivity, reduces training burden | MEDIUM -- Requires watsonx.ai, training data, AI Service deployment | watsonx.ai access, 2+ years WO data | Phase 4 | 5 |
| **Optimizer** | MEDIUM-HIGH -- Reduces travel, improves productivity | MEDIUM -- Requires clean craft/skill data, location coordinates | Manage Scheduler, accurate labor data | Phase 4 | 6 |
| **Civil Infrastructure** | HIGH (for applicable orgs) -- Regulatory compliance, inspection management | MEDIUM -- Domain-specific configuration | Manage deployed, infrastructure asset data | Phase 5 (or Phase 1 if DOT) | 7 |
| **Parts Identifier** | LOW-MEDIUM -- Niche use case, limited user base | LOW -- Relatively simple deployment | MAS deployed | Phase 5 | 8 |

### Decision Framework

For each application, ask these questions:

1. **Do we have the prerequisite data?** If Health requires quality data and ours is poor, fix data first.
2. **Do we have the infrastructure?** If Monitor requires IoT sensors and we have none, plan procurement first.
3. **Do we have the skills?** If Predict requires data science and we have no data scientists, hire or train first.
4. **Does the business case justify the investment?** Run an ROI analysis for each application.
5. **Are our users ready?** Each application requires change management and training.

---

## 15. Team Exploration Assignment Matrix

| Application | Priority | Suggested Team Size | Estimated Effort | Dependencies | Skills Needed |
|---|---|---|---|---|---|
| **Health** | 1 - Explore Immediately | 2-3 people | 42-84 hours (1-2 weeks) | Manage deployed, quality data | Reliability engineering, data analysis, Manage configuration |
| **Monitor** | 2 - Explore in Parallel | 2-4 people | 56-104 hours (2-3 weeks) | IoT infrastructure, Manage deployed | IoT engineering, networking, Python (for custom functions), dashboard design |
| **Predict** | 3 - Explore After Health/Monitor | 2-3 people | 60-112 hours (2-3 weeks) | Health and Monitor data flowing, failure history | Data science (ML/AI), Manage domain knowledge, Python/Jupyter |
| **Visual Inspection** | 4 - Explore When Ready | 2-3 people | 55-138 hours (2-4 weeks) | GPU infrastructure, camera access | ML fundamentals, image labeling, inspection domain expertise |
| **AI Assist** | 5 - Explore After Manage Stable | 2-3 people | 68-128 hours (2-3 weeks) | watsonx.ai provisioned, 2+ years Manage data | AI/ML concepts, Manage administration, change management |
| **Optimizer** | 6 - Explore After Manage Stable | 2-3 people | 60-120 hours (2-3 weeks) | Manage Scheduler, clean labor data | Scheduling/planning expertise, Manage administration, optimization concepts |
| **Civil Infrastructure** | Conditional - If Applicable | 2-3 people | 60-112 hours (2-3 weeks) | Manage deployed, infrastructure data | Bridge/infrastructure inspection expertise, regulatory knowledge |
| **Parts Identifier** | Low - Evaluate Later | 1-2 people | 22-44 hours (1 week) | MAS deployed | Field operations knowledge |

### Team Formation Recommendations

**Dedicated MAS Add-On Exploration Team:**

| Role | Responsibility | Applications |
|---|---|---|
| **Reliability Engineer** (Lead) | Champion Health and Predict evaluation | Health, Predict, Monitor |
| **IoT/OT Engineer** | Lead Monitor pilot, device connectivity | Monitor, Edge Data Collector |
| **Data Scientist** | Lead Predict and AI model development | Predict, AI Assist, Visual Inspection |
| **Inspection Specialist** | Lead Visual Inspection pilot and Civil Infrastructure | Visual Inspection, Civil Infrastructure |
| **Scheduler/Planner** | Lead Optimizer evaluation | Optimizer, Manage Scheduler |
| **Manage Administrator** | Support integration, data quality, configuration | All (supporting role) |

**Recommended approach:** Do not try to explore all applications simultaneously. Follow the phased roadmap in Section 16 and focus on 1-2 applications at a time.

---

## 16. Recommended Implementation Roadmap

### Phase 0: Foundation (Pre-requisite - Before Any Add-On)

**Timeline:** Concurrent with Manage migration
**Objective:** Establish the foundation for add-on applications

| Activity | Description | Owner | Duration |
|---|---|---|---|
| Data quality assessment | Audit asset data, WO history, failure codes, meters | Data team | 2-4 weeks |
| Data remediation | Fix install dates, standardize failure codes, clean meters | Data team + SMEs | 4-8 weeks |
| Infrastructure planning | Assess GPU needs, IoT connectivity, storage requirements | Infrastructure team | 2-4 weeks |
| Skills assessment | Identify skill gaps for Health, Monitor, Predict, MVI | HR + Technical leads | 1-2 weeks |
| Training plan | Develop training plan for identified gaps | Training team | 1-2 weeks |
| Pilot asset selection | Identify pilot asset classes for each application | Reliability team | 1-2 weeks |

### Phase 1: Health Setup (Months 1-3 Post-Manage Stabilization)

**Timeline:** Months 1-3 after Manage goes live
**Objective:** Deploy Health, configure scoring, validate with pilot assets

```
Month 1                    Month 2                    Month 3
+---------------------+    +---------------------+    +---------------------+
| Deploy Health       |    | Configure scoring   |    | Validate & tune     |
| Select pilot assets |    | Define contributors |    | Create degradation  |
| Verify data quality |    | Set weights         |    | Run AIO scenario    |
| Set up integration  |    | Generate scores     |    | Present to leaders  |
+---------------------+    +---------------------+    +---------------------+
```

**Key Deliverables:**
- Health deployed and integrated with Manage
- Health scores generated for pilot asset class
- Degradation curves created
- AIO scenario completed with realistic data
- Business case validated with maintenance leadership

**Success Criteria:**
- Health scores align with known asset conditions (validated by SMEs)
- Degradation curves show meaningful trends
- AIO recommendations are actionable

### Phase 2: Monitor + IoT Connectivity (Months 4-6)

**Timeline:** Months 4-6
**Objective:** Deploy Monitor, connect first devices, establish IoT data flow

```
Month 4                    Month 5                    Month 6
+---------------------+    +---------------------+    +---------------------+
| Deploy Monitor      |    | Ingest data         |    | Anomaly detection   |
| Define device types |    | Create dashboards   |    | Alert rules         |
| Register pilot devs |    | Validate metrics    |    | Monitor->Health     |
| Establish MQTT/REST |    | Custom functions    |    | Monitor->Manage WOs |
+---------------------+    +---------------------+    +---------------------+
```

**Key Deliverables:**
- Monitor deployed with pilot device types
- Real-time data flowing from pilot sensors
- Summary and entity dashboards operational
- Anomaly detection configured and validated
- Alert-to-work-order flow operational
- Monitor data feeding Health scoring contributors

**Success Criteria:**
- Data ingestion is reliable (less than 1% data loss)
- Dashboards provide meaningful operational visibility
- Anomaly detection has acceptable false positive rate (less than 20%)
- At least one alert has successfully generated a Manage work order

### Phase 3: Predict + Visual Inspection Pilots (Months 7-9)

**Timeline:** Months 7-9
**Objective:** Train first prediction models, deploy first visual inspection model

```
Month 7                    Month 8                    Month 9
+---------------------+    +---------------------+    +---------------------+
| Predict:            |    | Predict:            |    | Predict:            |
| Extract training    |    | Train models        |    | Deploy models       |
| data                |    | Evaluate accuracy   |    | Validate predictions|
| Feature engineering |    | Iterate             |    |                     |
|                     |    |                     |    |                     |
| MVI:                |    | MVI:                |    | MVI:                |
| Collect images      |    | Train model         |    | Deploy to API       |
| Label images        |    | Validate accuracy   |    | Test mobile app     |
| Setup GPU infra     |    | Iterate             |    | Manage integration  |
+---------------------+    +---------------------+    +---------------------+
```

**Key Deliverables:**
- Predict model deployed for at least one asset class
- Failure predictions visible in Manage
- MVI model trained and deployed for at least one inspection use case
- MVI results linked to Manage work orders
- Both models validated against known outcomes

**Success Criteria:**
- Predict model accuracy exceeds 70% (measured against historical holdout data)
- MVI model accuracy exceeds 85% for classification or 80% for object detection
- Maintenance teams find predictions actionable
- At least one preventive action taken based on a prediction

### Phase 4: AI Assist + Optimizer + Advanced Features (Months 10-12)

**Timeline:** Months 10-12
**Objective:** Deploy AI-powered assistance and scheduling optimization

```
Month 10                   Month 11                   Month 12
+---------------------+    +---------------------+    +---------------------+
| AI Assist:          |    | AI Assist:          |    | AI Assist:          |
| Deploy AI Service   |    | Train AI models     |    | User testing        |
| Configure watsonx   |    | Test recommendations|    | Feedback loop       |
|                     |    |                     |    |                     |
| Optimizer:          |    | Optimizer:          |    | Optimizer:          |
| Deploy Optimizer    |    | Run optimizations   |    | Compare vs manual   |
| Configure model     |    | Tune parameters     |    | Full evaluation     |
| Clean labor data    |    | Test dispatching    |    |                     |
+---------------------+    +---------------------+    +---------------------+
```

**Key Deliverables:**
- AI Assist deployed with field value recommendations operational
- Natural language query capability available
- Optimizer producing feasible schedules
- Dispatching Dashboard operational
- User feedback collected on AI recommendations and optimized schedules

**Success Criteria:**
- AI field recommendations accepted by users more than 60% of the time
- Optimizer reduces travel time by at least 15% compared to manual scheduling
- Users report positive experience with AI-assisted features

### Phase 5: Civil Infrastructure + Full AI Integration (Months 13+)

**Timeline:** Months 13 onward
**Objective:** Deploy remaining applications, achieve full integration

```
Month 13+
+-------------------------------------------------------------+
| - Civil Infrastructure deployment (if applicable)            |
| - Large Vision Models for infrastructure inspection          |
| - Parts Identifier evaluation                                |
| - Full AI integration across all applications                |
| - Advanced custom models (watsonx.ai)                        |
| - Cross-application dashboards and reporting                 |
| - Enterprise-wide rollout beyond pilot asset classes         |
| - Continuous model retraining and improvement                |
+-------------------------------------------------------------+
```

**Key Deliverables:**
- All applicable MAS applications deployed and operational
- Full data pipeline flowing: Monitor -> Health -> Predict -> Manage -> Optimizer
- AI models trained on organization-specific data
- Enterprise-wide rollout plan for all applications

### Roadmap Summary Timeline

```
         Q1          Q2          Q3          Q4          Q5+
    +-----------+-----------+-----------+-----------+-----------+
    |  Phase 1  |  Phase 2  |  Phase 3  |  Phase 4  |  Phase 5  |
    |           |           |           |           |           |
    |  Health   |  Monitor  |  Predict  | AI Assist | Civil Inf |
    |  setup    |  IoT      |  MVI      | Optimizer | Full AI   |
    |  scoring  |  connect  |  pilots   | advanced  | rollout   |
    |  AIO      |  dashbds  |  models   | features  |           |
    +-----------+-----------+-----------+-----------+-----------+

    Phase 0: Data Quality + Infrastructure + Skills (runs parallel)
```

### Risk Mitigation for Each Phase

| Phase | Primary Risk | Mitigation |
|---|---|---|
| Phase 0 | Data quality worse than expected | Start data remediation early, set realistic expectations |
| Phase 1 | Health scores do not match reality | Iterate on contributors and weights with SME input |
| Phase 2 | IoT connectivity challenges | Start with CSV upload, migrate to MQTT incrementally |
| Phase 3 | Insufficient failure history for Predict | Supplement with industry models, focus on assets with best data |
| Phase 3 | Not enough training images for MVI | Use data augmentation, start with classification (needs fewer images) |
| Phase 4 | User resistance to AI recommendations | Emphasize AI as assistant not replacement, involve users in evaluation |
| Phase 4 | Optimizer schedules not practical | Tune constraints with field input, keep manual override capability |
| Phase 5 | Integration complexity across all apps | Maintain strong integration testing, monitor data pipeline health |

---

## 17. References and Resources

### 17.1 IBM Documentation by Application

| Application | Documentation URL | Notes |
|---|---|---|
| **MAS Suite Overview** | https://www.ibm.com/docs/en/mas-cd | Main MAS documentation hub |
| **Maximo Health** | https://www.ibm.com/docs/en/maximo-manage/continuous-delivery?topic=health | Health configuration and usage |
| **Maximo Predict** | https://www.ibm.com/docs/en/maximo-manage/continuous-delivery?topic=predict | Predict setup, model training |
| **Maximo Monitor** | https://www.ibm.com/docs/en/maximo-monitor | Monitor deployment and configuration |
| **Maximo Visual Inspection** | https://www.ibm.com/docs/en/maximo-vi | MVI setup, model training, deployment |
| **Maximo Optimizer** | https://www.ibm.com/docs/en/maximo-manage/continuous-delivery?topic=optimizer | Optimizer configuration |
| **Maximo Civil Infrastructure** | https://www.ibm.com/docs/en/maximo-manage/continuous-delivery?topic=civil-infrastructure | Civil Infrastructure setup |
| **Maximo AI Service** | https://www.ibm.com/docs/en/mas-cd/maximo-manage/continuous-delivery?topic=ai | AI Service deployment |
| **AppPoints** | https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=suite-apppoints | Licensing guide |

### 17.2 IBM Maximo Community Resources

| Resource | URL | Description |
|---|---|---|
| **IBM Maximo Community** | https://community.ibm.com/community/user/asset-facilities | Forums, blogs, events |
| **IBM Technology Zone** | https://techzone.ibm.com | Hands-on lab environments |
| **IBM Redbooks** | https://www.redbooks.ibm.com | Technical deep-dive publications |
| **IBM Support** | https://www.ibm.com/mysupport | Tickets, fixes, tech notes |
| **IBM Ideas Portal** | https://ideas.ibm.com | Feature requests and enhancement voting |

### 17.3 Training Paths

| Training | Provider | Description | Target Audience |
|---|---|---|---|
| **MAS Administration** | IBM Training | MAS deployment, configuration, administration | System administrators |
| **Maximo Health & Predict** | IBM Training | Health scoring, Predict model configuration | Reliability engineers |
| **Maximo Monitor** | IBM Training | IoT device management, dashboards, custom functions | IoT engineers |
| **Maximo Visual Inspection** | IBM Training | Model training, deployment, edge computing | Inspection specialists |
| **watsonx.ai Fundamentals** | IBM Training | AI/ML concepts, Watson Studio usage | Data scientists |
| **OpenShift Administration** | Red Hat Training | Container platform management | Infrastructure team |
| **Data Science for Maintenance** | Various | ML concepts applied to maintenance use cases | Reliability + data science |

### 17.4 Certification Options

| Certification | Description | Prerequisite |
|---|---|---|
| **IBM Certified Administrator - MAS** | Validates MAS deployment and administration skills | MAS administration experience |
| **IBM Certified Application Associate - Maximo** | Validates Manage functional knowledge | Manage configuration experience |
| **Red Hat Certified OpenShift Administrator** | Validates OpenShift platform skills | OpenShift administration experience |
| **IBM AI Engineering Professional Certificate** | Validates AI/ML skills for IBM platforms | watsonx.ai experience |

### 17.5 Additional Reading

| Resource | Description |
|---|---|
| **Gartner Magic Quadrant for EAM** | Industry analyst view of MAS positioning |
| **IDC MarketScape for EAM** | Competitive analysis including MAS |
| **IBM Institute for Business Value** | Research on AI in asset management |
| **SMRP Best Practices** | Maintenance and reliability best practices (context for MAS features) |
| **ISO 55000** | Asset management standards (framework for MAS implementation) |

---

## Appendix A: Glossary

| Term | Definition |
|---|---|
| **AIO** | Asset Investment Optimization -- Health feature for optimizing maintenance/replacement spending |
| **AppPoints** | Licensing unit for MAS applications |
| **CNN** | Convolutional Neural Network -- deep learning architecture used in Visual Inspection |
| **Device Type** | Template in Monitor defining metrics for a class of IoT devices |
| **Edge Data Collector** | Monitor component for collecting data directly from PLCs and industrial devices |
| **Foundation Model** | Large pre-trained AI model (watsonx.ai) that can be fine-tuned for specific tasks |
| **Health Score** | 0-100 rating of asset condition calculated by Health |
| **LVM** | Large Vision Model -- foundation model for visual inspection (MAS 9.1) |
| **MAS** | Maximo Application Suite |
| **MIF** | Maximo Integration Framework -- integration layer for Manage |
| **Monitor** | MAS IoT application for device data ingestion and analysis |
| **MQTT** | Message Queuing Telemetry Transport -- lightweight IoT messaging protocol |
| **MVI** | Maximo Visual Inspection |
| **NBI** | National Bridge Inventory -- FHWA bridge database and inspection standard |
| **OCP** | OpenShift Container Platform |
| **Predict** | MAS application for ML-based failure prediction |
| **watsonx.ai** | IBM AI and data platform powering MAS AI features |

## Appendix B: Quick-Start Decision Tree

```
START: "Which MAS application should my team explore first?"
  |
  +-- Do you have good asset data quality in Manage? (install dates, WO history, failure codes)
  |     |
  |     +-- YES --> Start with HEALTH (Phase 1)
  |     |             |
  |     |             +-- Do you have IoT sensors on assets?
  |     |                   |
  |     |                   +-- YES --> Add MONITOR (Phase 2)
  |     |                   +-- NO --> Plan IoT infrastructure, proceed to MONITOR when ready
  |     |
  |     +-- NO --> Focus on DATA QUALITY REMEDIATION first (Phase 0)
  |
  +-- Do you have a pressing visual inspection need?
  |     |
  |     +-- YES --> Explore VISUAL INSPECTION in parallel
  |     +-- NO --> Wait for Phase 3
  |
  +-- Do you manage bridges, roads, or tunnels?
  |     |
  |     +-- YES --> Explore CIVIL INFRASTRUCTURE immediately
  |     +-- NO --> Skip Civil Infrastructure
  |
  +-- Do you have 50+ field technicians doing scheduled work?
  |     |
  |     +-- YES --> Plan for OPTIMIZER (Phase 4)
  |     +-- NO --> Optimizer is lower priority
  |
  +-- Do you want to leverage generative AI?
        |
        +-- YES --> Plan for AI ASSIST (Phase 4, requires watsonx.ai)
        +-- NO --> Revisit as watsonx.ai matures
```

---

**Document End**

*This document should be reviewed and updated quarterly as IBM releases new MAS versions and as the team gains implementation experience. The next review is scheduled for June 2026.*

*For questions about this roadmap, contact your MAS implementation lead or IBM technical account team.*
