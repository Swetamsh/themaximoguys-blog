# MAS AI Capabilities Deep Dive: A Module-by-Module Breakdown

> **Part 2 of 6** in the [Modernizing IBM Maximo with AI](./00-series-index.md) series

---

## Introduction

IBM Maximo Application Suite isn't a single application—it's a collection of integrated modules, each addressing a specific aspect of asset management. In MAS 9.x, AI capabilities are woven throughout these modules, not bolted on as an afterthought.

This post breaks down the AI capabilities in each MAS application, explaining what they do, how they work, and when to use them.

---

## The MAS AI Landscape

```
┌─────────────────────────────────────────────────────────────────┐
│                    MAS AI CAPABILITIES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   MONITOR          HEALTH           PREDICT                     │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐                │
│   │Anomaly  │ ───▶ │Condition│ ───▶ │Failure  │                │
│   │Detection│      │Scoring  │      │Prediction│               │
│   └─────────┘      └─────────┘      └─────────┘                │
│                                                                  │
│   VISUAL INSPECTION     ASSIST           WORK ORDER INTEL       │
│   ┌─────────┐          ┌─────────┐      ┌─────────┐            │
│   │Computer │          │Gen AI   │      │Auto     │            │
│   │Vision   │          │Assistant│      │Enrichment│           │
│   └─────────┘          └─────────┘      └─────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Maximo Monitor: Real-Time Anomaly Detection

### What It Does
Maximo Monitor ingests time-series data from IoT sensors and applies anomaly detection algorithms to identify deviations from normal operating patterns.

### AI Capabilities
| Capability | Description |
|------------|-------------|
| **Anomaly Detection** | ML models learn normal behavior patterns and flag deviations |
| **Threshold Alerts** | Rule-based alerts when values exceed limits |
| **Trend Analysis** | Identify gradual degradation over time |
| **Correlation Detection** | Find relationships between sensor readings |

### How It Works
1. Sensors stream data (vibration, temperature, pressure, etc.) to Monitor
2. Time-series data is stored in the Monitor data lake
3. Anomaly detection models run against incoming data
4. Alerts trigger when anomalies are detected
5. Alerts can automatically create work orders in Manage

### Use Cases
- **Rotating Equipment:** Vibration signature analysis for pumps, motors, compressors
- **HVAC Systems:** Temperature and pressure anomaly detection
- **Electrical Systems:** Power quality monitoring, current anomalies
- **Process Equipment:** Flow rate, level, and process parameter monitoring

### Prerequisites
- IoT connectivity (MQTT, REST, OPC-UA)
- Sensor infrastructure on critical assets
- Data historian or direct streaming to Monitor

---

## Maximo Health: AI-Driven Condition Scoring

### What It Does
Maximo Health aggregates data from multiple sources—Monitor telemetry, work order history, inspections, age—into a single health score (0-100) for each asset.

### AI Capabilities
| Capability | Description |
|------------|-------------|
| **Health Scoring Models** | Configurable algorithms combining multiple factors |
| **Condition Insights Agent** | AI that consolidates siloed data for holistic assessment |
| **Contributor Analysis** | Understand which factors are driving score changes |
| **Group Comparisons** | Compare health across asset populations |

### How It Works
1. Define health scoring models per asset class
2. Configure factor weightings (age, meter readings, work history, sensor data)
3. Health calculates and updates scores continuously
4. Dashboards show health trends and at-risk assets
5. Low health scores can trigger inspections or work orders

### Scoring Factors
```
Health Score = f(Age, Meter, Condition, Reliability, Sensor Data)

Where:
- Age Factor: Based on expected useful life
- Meter Factor: Runtime, cycles, usage intensity
- Condition Factor: Inspection results, physical state
- Reliability Factor: Failure history, MTBF
- Sensor Factor: Real-time telemetry from Monitor
```

### Use Cases
- **Asset Ranking:** Prioritize capital replacement based on health
- **Risk Assessment:** Identify assets likely to fail
- **Investment Planning:** Justify maintenance vs. replacement decisions
- **Executive Dashboards:** Communicate asset condition to leadership

### Prerequisites
- Asset master data with classifications and expected life
- Work order history (2+ years recommended)
- Meter readings or usage data
- Optional: Monitor integration for real-time factor

---

## Maximo Predict: Failure Prediction and Remaining Useful Life

### What It Does
Maximo Predict uses machine learning models to forecast asset failures, estimate remaining useful life (RUL), and calculate failure probability scores.

### AI Capabilities
| Capability | Description |
|------------|-------------|
| **Failure Date Prediction** | Estimate when an asset will fail |
| **Failure Probability** | Score indicating likelihood of failure in time window |
| **Remaining Useful Life** | Days/hours until predicted end of life |
| **Anomaly Detection** | Identify assets deviating from normal patterns |
| **Failure Mode Classification** | Predict which failure mode is most likely |

### Model Types
Predict ships with pre-built model templates that you train on your data:

| Model | Input Data | Output |
|-------|-----------|--------|
| **Failure Probability** | Sensor + WO history | Probability score (0-100%) |
| **Survival Analysis** | Failure history | Time-to-failure distribution |
| **Regression** | Continuous degradation data | Predicted failure date |
| **Anomaly Detection** | Sensor patterns | Deviation score |

### How It Works
1. Historical data preparation (failures, sensor readings, work orders)
2. Select model template appropriate to your data
3. Train model on historical patterns
4. Deploy model to score current assets
5. Scores update as new data arrives
6. High-risk scores trigger notifications or work orders

### Use Cases
- **Predictive Maintenance:** Replace time-based PMs with condition-based
- **Outage Planning:** Schedule maintenance during planned downtime
- **Spare Parts:** Order parts before predicted failures
- **Critical Asset Focus:** Concentrate resources on highest-risk assets

### Prerequisites
- **Failure History:** Documented failures with dates (minimum 50 failures per failure mode for reliable models)
- **Sensor Data:** Continuous telemetry leading up to failures (via Monitor)
- **Consistent Failure Coding:** Accurate problem/cause/remedy codes
- **Asset Taxonomy:** Well-defined asset classes for model scope

---

## Maximo Visual Inspection: Computer Vision for Defect Detection

### What It Does
Visual Inspection uses computer vision AI to analyze images and video, detecting defects, wear, corrosion, and other visible anomalies.

### AI Capabilities
| Capability | Description |
|------------|-------------|
| **Object Detection** | Identify and locate objects in images |
| **Classification** | Categorize defect types and severity |
| **Segmentation** | Pixel-level defect boundary detection |
| **Anomaly Detection** | Compare to "golden" reference images |

### How It Works
1. Capture images (mobile device, drone, fixed camera)
2. Upload to Visual Inspection
3. AI model analyzes image
4. Defects flagged with bounding boxes and confidence scores
5. Results create inspection records in Manage
6. Trends tracked over time

### Model Training
Visual Inspection includes tools for training custom models:
```
Training Workflow:
1. Collect images (100+ recommended per defect type)
2. Label defects in training interface
3. Train model (automated hyperparameter tuning)
4. Validate on held-out test set
5. Deploy to production
6. Retrain as new defect types emerge
```

### Use Cases
- **Utility Inspections:** Pole, line, and transformer defects
- **Manufacturing QA:** Product defect detection
- **Infrastructure:** Bridge, road, building inspections
- **Safety:** PPE compliance verification

### Prerequisites
- Image capture infrastructure (cameras, drones, mobile)
- Labeled training data (images with defects marked)
- Defined defect taxonomy
- Integration workflow to Manage

---

## Maximo Assist: Generative AI for Technician Support

### What It Does
Maximo Assist is a conversational AI assistant powered by watsonx.ai that helps technicians troubleshoot issues, find procedures, and access institutional knowledge.

### AI Capabilities
| Capability | Description |
|------------|-------------|
| **Natural Language Q&A** | Ask questions in plain language |
| **Procedure Retrieval** | Find relevant maintenance procedures |
| **Troubleshooting Guidance** | Step-by-step problem resolution |
| **Knowledge Base Search** | Search across manuals, SOPs, past work orders |

### How It Works
1. Technician asks question via mobile app or work order interface
2. Assist uses RAG (Retrieval Augmented Generation) to search knowledge bases
3. Relevant documents retrieved and sent to LLM
4. LLM generates contextual answer with source citations
5. Technician follows guidance, provides feedback
6. System learns from feedback over time

### Knowledge Sources
Assist can draw from multiple knowledge bases:
- OEM maintenance manuals (PDF ingestion)
- Standard operating procedures
- Historical work order notes
- Asset specifications
- Troubleshooting guides

### Use Cases
- **First-Time Fix:** Technicians resolve issues without return visits
- **Knowledge Transfer:** Capture expert knowledge for new employees
- **Reduced Training:** On-the-job AI assistance
- **Documentation Access:** No more searching through binders

### Prerequisites
- Knowledge base content (manuals, SOPs, procedures)
- Content ingestion and indexing
- Mobile device deployment
- watsonx.ai entitlement

---

## Work Order Intelligence: AI-Powered Work Order Enrichment

### What It Does
Work Order Intelligence uses generative AI (watsonx) to automatically analyze, enrich, and improve work orders—reducing manual data entry and improving data quality.

### AI Capabilities
| Capability | Description |
|------------|-------------|
| **Failure Code Recommendations** | Auto-suggest problem/cause/remedy codes |
| **Work Order Summarization** | Generate summaries from long descriptions |
| **Data Quality Scoring** | Identify incomplete or inconsistent WOs |
| **Duplicate Detection** | Flag potentially duplicate work orders |

### How It Works
1. Technician creates work order with description
2. AI analyzes description text
3. Failure codes recommended based on content
4. Technician confirms or adjusts
5. Work order saved with enriched data
6. Model improves from corrections over time

### Benefits
- **Data Quality:** Consistent, complete failure coding
- **Speed:** Reduce time spent on administrative tasks
- **Analytics:** Better data enables better predictive models
- **Compliance:** Audit-ready work order documentation

### Prerequisites
- MAS 9.0+ with Work Order Intelligence enabled
- Historical work orders for model training
- Defined failure hierarchy (problem/cause/remedy)
- watsonx.ai integration

---

## Module Integration: The AI Pipeline

These modules don't work in isolation—they form an integrated AI pipeline:

```
SENSORS → MONITOR → HEALTH → PREDICT → MANAGE
              │          │          │
              ▼          ▼          ▼
         Anomaly    Condition   Failure
         Alerts     Scores      Predictions
              │          │          │
              └──────────┴──────────┘
                         │
                         ▼
                   WORK ORDERS
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
         ASSIST              WORK ORDER
      (Troubleshooting)      INTELLIGENCE
                            (Enrichment)
```

**Data Flow Example:**
1. Vibration sensor detects anomaly → Monitor alerts
2. Health score drops based on anomaly → Health updates
3. Predict calculates 78% failure probability in 30 days → Predict scores
4. Work order auto-generated for inspection → Manage
5. Technician asks "How do I check bearing wear?" → Assist responds
6. Work order completed with auto-suggested failure codes → Work Order Intelligence

---

## Choosing Your Starting Point

Not every organization needs every module. Consider this decision framework:

| If You Have... | Start With... | Why |
|----------------|---------------|-----|
| Good sensor coverage | Monitor → Health | Leverage existing IoT investment |
| Rich work order history | Predict | Train models on historical patterns |
| Image-based inspections | Visual Inspection | Quick wins on visual defects |
| Knowledge transfer challenges | Assist | Capture and distribute expertise |
| Data quality problems | Work Order Intelligence | Improve foundation for all AI |

---

## Key Takeaways

1. **MAS AI is modular.** You don't have to deploy everything at once—start where you have the best data and clearest use case.

2. **The modules integrate.** Monitor feeds Health feeds Predict. The pipeline is more powerful than individual components.

3. **Each module has prerequisites.** Predict needs failure history. Visual Inspection needs labeled images. Know your data gaps.

4. **Generative AI is here.** Assist and Work Order Intelligence bring watsonx.ai into daily workflows—this is the cutting edge.

5. **Start with one, expand from there.** Pilot on critical assets, prove value, then scale.

---

*Continue to [Part 3: AI Integration Architecture](./03-ai-integration-architecture.md)*
