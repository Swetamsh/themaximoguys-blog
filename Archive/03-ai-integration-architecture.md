# AI Integration Architecture for IBM Maximo Application Suite

> **Part 3 of 6** in the [Modernizing IBM Maximo with AI](./00-series-index.md) series

---

## Introduction

Deploying AI in Maximo isn't just about turning on features—it requires thoughtful architecture. Data must flow from sensors to models to work orders. Systems must integrate. Decisions must be made about cloud vs. edge, IBM native vs. third-party, and how to handle the MLOps lifecycle.

This post provides the architectural blueprint for AI-enabled MAS.

---

## Reference Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AI-ENABLED MAS ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  EDGE LAYER                                                              │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│  │  │ Sensors │  │ PLCs    │  │ Cameras │  │ Edge    │             │   │
│  │  │         │  │ SCADA   │  │ Drones  │  │ Gateway │             │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘             │   │
│  │       └───────────┬┴───────────┬┴────────────┘                   │   │
│  │                   │            │                                  │   │
│  │              MQTT/OPC-UA    REST API                              │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                         │                │                               │
│                         ▼                ▼                               │
│  INTEGRATION LAYER                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    APP CONNECT / KAFKA                            │   │
│  │     ┌─────────────────────────────────────────────────────┐      │   │
│  │     │  Message Routing │ Protocol Translation │ Buffering │      │   │
│  │     └─────────────────────────────────────────────────────┘      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  MAS APPLICATION LAYER                                                   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────┐                    │   │
│  │  │ MONITOR  │───▶│  HEALTH  │───▶│ PREDICT  │                    │   │
│  │  │Time Series│   │ Scoring  │    │ ML Models│                    │   │
│  │  └──────────┘    └──────────┘    └────┬─────┘                    │   │
│  │                                       │                           │   │
│  │  ┌──────────┐    ┌──────────┐    ┌────▼─────┐                    │   │
│  │  │ VISUAL   │    │  ASSIST  │    │  MANAGE  │                    │   │
│  │  │INSPECTION│    │ Gen AI   │    │ EAM Core │                    │   │
│  │  └──────────┘    └──────────┘    └──────────┘                    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  AI/ML PLATFORM LAYER                                                    │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                       WATSONX.AI                                  │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │   │
│  │  │  Granite   │  │   Watson   │  │  Prompt    │                  │   │
│  │  │  Models    │  │   ML       │  │  Lab       │                  │   │
│  │  └────────────┘  └────────────┘  └────────────┘                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  DATA PLATFORM LAYER (Optional)                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                  CLOUD PAK FOR DATA                               │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │   │
│  │  │   Data     │  │   MLOps    │  │   Data     │                  │   │
│  │  │ Virtualization│ │  Pipelines │  │ Governance │                 │   │
│  │  └────────────┘  └────────────┘  └────────────┘                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Edge and IoT

### Purpose
Capture data from physical assets—sensors, PLCs, cameras—and transmit it to the platform.

### Components

| Component | Function | Protocols |
|-----------|----------|-----------|
| **Sensors** | Vibration, temperature, pressure, flow | Modbus, BACnet, 4-20mA |
| **PLCs/SCADA** | Process control data | OPC-UA, OPC-DA |
| **Edge Gateways** | Protocol translation, local processing | MQTT, REST |
| **Cameras/Drones** | Visual inspection images | REST API, RTSP |

### Architecture Decisions

**Edge Processing vs. Cloud Processing:**

| Approach | When to Use | Tradeoffs |
|----------|-------------|-----------|
| **Edge Processing** | Low latency requirements, high data volume, intermittent connectivity | More complex deployment, distributed management |
| **Cloud Processing** | Simpler architecture, centralized management | Higher latency, bandwidth costs |

**Recommendation:** Start with cloud processing for simplicity. Add edge processing for specific use cases (real-time safety, bandwidth constraints).

### Key Technologies
- **IBM Edge Application Manager:** Kubernetes-based edge workload management
- **Azure IoT Edge / AWS Greengrass:** Cloud-native edge platforms
- **HiveMQ / Mosquitto:** MQTT brokers for sensor data

---

## Layer 2: Integration

### Purpose
Route, transform, and buffer data between edge systems and MAS applications.

### Components

| Component | Function |
|-----------|----------|
| **Message Broker** | Decouple producers and consumers, handle bursts |
| **Integration Platform** | Protocol translation, data transformation |
| **API Gateway** | Secure external access, rate limiting |

### Integration Patterns

**Pattern 1: Direct MQTT to Monitor**
```
Sensors → MQTT Broker → Maximo Monitor
```
- Simplest pattern
- Works when sensors speak MQTT natively
- Monitor has built-in MQTT connector

**Pattern 2: App Connect Mediated**
```
Sensors → OPC-UA Server → App Connect → MQTT → Monitor
```
- When protocol translation needed
- App Connect handles OPC-UA to MQTT conversion
- Adds transformation and routing logic

**Pattern 3: Kafka Event Backbone**
```
Sensors → Edge Gateway → Kafka → Multiple Consumers (Monitor, Data Lake, etc.)
```
- When multiple systems need the same data
- Kafka provides durability and replay
- Best for high-volume, mission-critical data

### Key Technologies
- **IBM App Connect Enterprise:** Integration platform with 400+ connectors
- **Apache Kafka / IBM Event Streams:** Event streaming platform
- **Kong / IBM API Connect:** API gateway

---

## Layer 3: MAS Applications

### Purpose
The core Maximo Application Suite—where asset management and AI converge.

### Application Data Flow

```
                    ┌─────────────────────────────────────────────┐
                    │               DATA FLOW                      │
                    └─────────────────────────────────────────────┘

    IoT Data ──────▶ MONITOR ──────▶ Time Series DB
                        │
                        │ Anomaly Scores
                        ▼
    Asset Data ────▶ HEALTH ──────▶ Health Scores ──────▶ PREDICT
    Work History ──────────────────────────────────────────│
                                                           │
                        ┌──────────────────────────────────┘
                        │ Failure Predictions
                        ▼
                     MANAGE ◀────── Work Order Creation
                        │
                        │ Work Order Context
              ┌─────────┴─────────┐
              ▼                   ▼
           ASSIST           WORK ORDER
        (Questions)        INTELLIGENCE
                          (Enrichment)
```

### Key Integrations

| From | To | Data | Mechanism |
|------|----|------|-----------|
| Monitor | Health | Anomaly scores, sensor metrics | Internal API |
| Health | Predict | Health scores, contributing factors | Internal API |
| Predict | Manage | Failure predictions, risk scores | Work order automation |
| Manage | Assist | Asset context, work order history | RAG knowledge base |
| Assist | Manage | Recommended actions | User confirmation |

### Deployment Options

| Option | Description | Best For |
|--------|-------------|----------|
| **SaaS (Flex)** | IBM-hosted, subscription | Fastest deployment, minimal IT burden |
| **Dedicated** | Single-tenant IBM Cloud | Compliance requirements, customization |
| **On-Premises** | OpenShift on your infrastructure | Air-gapped, full control |

---

## Layer 4: AI/ML Platform

### Purpose
Provide the AI capabilities—foundation models, ML training, inference—that power MAS intelligence.

### watsonx.ai Components

| Component | Function | Used By |
|-----------|----------|---------|
| **Granite Models** | IBM's foundation models for enterprise AI | Assist, Work Order Intelligence |
| **Watson Machine Learning** | ML model training and deployment | Predict custom models |
| **Prompt Lab** | Prompt engineering and testing | Customizing Assist responses |
| **AI Guardrails** | Safety controls for generative AI | Ensuring appropriate outputs |

### Integration Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                  MAXIMO ↔ WATSONX INTEGRATION                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MAXIMO ASSIST                        WATSONX.AI                 │
│  ┌─────────────┐                      ┌─────────────┐            │
│  │ User Query  │ ─────────────────▶   │  Prompt     │            │
│  │             │                      │  Template   │            │
│  └─────────────┘                      └──────┬──────┘            │
│                                              │                    │
│  ┌─────────────┐     Retrieve Context        │                    │
│  │ Knowledge   │ ◀───────────────────────────┤                    │
│  │ Base (RAG)  │                             │                    │
│  └──────┬──────┘                             │                    │
│         │                                    │                    │
│         │ Context + Query                    │                    │
│         └───────────────────▶  ┌─────────────▼──────┐            │
│                                │    Granite LLM     │            │
│                                │    Inference       │            │
│  ┌─────────────┐               └─────────────┬──────┘            │
│  │  Response   │ ◀───────────────────────────┘                    │
│  │  to User    │                                                  │
│  └─────────────┘                                                  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Custom Model Training

For Predict, you may want custom ML models beyond the templates:

```
Training Pipeline:
1. Extract historical data from Maximo (failures, sensors, work orders)
2. Feature engineering in Watson Studio / Cloud Pak for Data
3. Train model using Watson ML or external framework
4. Register model in Predict model catalog
5. Deploy model for scoring
6. Monitor model performance, retrain as needed
```

---

## Layer 5: Data Platform (Optional)

### Purpose
Advanced data management, governance, and MLOps capabilities beyond what's built into MAS.

### When You Need It

| Scenario | Cloud Pak for Data Value |
|----------|--------------------------|
| **Multiple data sources** | Data virtualization across silos |
| **Custom ML models** | Full MLOps pipeline with version control |
| **Data governance** | Lineage, quality, catalog |
| **Advanced analytics** | SQL analytics, dashboards, data science notebooks |

### Architecture Pattern

```
┌───────────────────────────────────────────────────────────────────┐
│                    DATA PLATFORM INTEGRATION                       │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  DATA SOURCES              CLOUD PAK FOR DATA         CONSUMERS   │
│                                                                    │
│  ┌─────────┐              ┌─────────────────┐                     │
│  │ Maximo  │──────┐       │ Data            │                     │
│  │ Manage  │      │       │ Virtualization  │────────▶ Predict    │
│  └─────────┘      │       └────────┬────────┘                     │
│                   │                │                               │
│  ┌─────────┐      ├──────▶┌───────▼────────┐                     │
│  │ Monitor │──────┤       │  Data Catalog  │────────▶ Analytics   │
│  │Time Series│    │       └────────┬───────┘         Dashboards   │
│  └─────────┘      │                │                               │
│                   │       ┌────────▼───────┐                      │
│  ┌─────────┐      │       │ Watson Studio  │                      │
│  │ External│──────┘       │ (ML Training)  │────────▶ Custom      │
│  │ Systems │              └────────────────┘         Models       │
│  └─────────┘                                                       │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

### Authentication and Authorization

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  IDENTITY                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Corporate IdP (SAML/OIDC) ─▶ MAS Authentication         │   │
│  │  Azure AD / Okta / PingFederate                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  NETWORK                                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐              │   │
│  │  │ WAF     │───▶│ API GW  │───▶│ MAS     │              │   │
│  │  │         │    │         │    │ (Private│              │   │
│  │  └─────────┘    └─────────┘    │ Network)│              │   │
│  │                                └─────────┘               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  DATA                                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Encryption at Rest (AES-256)                            │   │
│  │  Encryption in Transit (TLS 1.3)                         │   │
│  │  Key Management (IBM Key Protect / BYOK)                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### AI-Specific Security Considerations

| Concern | Mitigation |
|---------|------------|
| **Model poisoning** | Validate training data, monitor model drift |
| **Prompt injection** | AI guardrails in watsonx, input validation |
| **Data leakage** | Private RAG knowledge bases, no PII in prompts |
| **Adversarial inputs** | Input validation, anomaly detection on inputs |

---

## Deployment Recommendations

### Starter Architecture (Phase 1-2)

For organizations beginning their AI journey:

```
Simple Architecture:
- MAS SaaS (Flex) deployment
- Monitor + Health + Manage
- Direct MQTT integration for IoT
- No custom ML models yet
```

### Intermediate Architecture (Phase 3-4)

Adding predictive capabilities:

```
Growing Architecture:
- MAS SaaS or Dedicated
- Add Predict + Assist
- App Connect for integration
- Watson ML for custom models
- Basic MLOps processes
```

### Advanced Architecture (Phase 5+)

Full AI-enabled enterprise:

```
Mature Architecture:
- MAS Dedicated or On-Premises
- All MAS applications
- Kafka event backbone
- Cloud Pak for Data for MLOps
- Custom models with CI/CD
- Multi-site federation
```

---

## Key Takeaways

1. **Think in layers.** Edge → Integration → Application → AI Platform → Data Platform. Each layer has distinct concerns.

2. **Start simple, scale up.** Direct MQTT to Monitor works. Add Kafka when you need multi-consumer or replay.

3. **watsonx.ai is central.** Generative AI capabilities (Assist, Work Order Intelligence) flow through watsonx.

4. **Security is not optional.** AI systems have unique attack surfaces—plan for them.

5. **Cloud Pak for Data is optional but powerful.** If you need advanced MLOps or data virtualization, it's the path.

---

*Continue to [Part 4: Data Readiness Guide](./04-data-readiness-guide.md)*
