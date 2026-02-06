# Blog 5 — Integration Modernization: API-First, Event-Driven, and SaaS-Friendly

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS

# Integration Modernization: Building API-First, Event-Driven MAS Integrations

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9, Cloud-Native, and AI-Driven EAM | **Part 5 of 12**

**Read Time:** 15-20 minutes

---

<aside>
🎯

**Who this is for:** Maximo integration architects, middleware engineers, and technical leads responsible for connecting Maximo to ERP, GIS, SCADA, and other enterprise systems -- especially teams planning or actively executing a migration from 7.6.x to MAS 9.

</aside>

<aside>
🎯

**The Mindset Shift:** This blog is about changing how you *think* about integrations — from database-centric to API-first, from batch to event-driven, from monolithic to cloud-native.

</aside>

---

## 🔥 Introduction: The Integration Transformation Nobody Talks About

A utilities company spent 18 months and $2.5M migrating to MAS 9. Three months after go-live, they discovered their "successful" migration was actually failing:

- **SAP integration:** Still querying the Maximo database directly—except now it couldn't
- **GIS system:** File drops to shared folders—which don't exist in containers
- **SCADA system:** JDBC connections—blocked by IBM security policies
- **Mobile workforce:** Direct database writes—causing data corruption
- **Reporting:** SQL queries—returning incomplete results

<aside>
💸

**Impact:** $400K in emergency remediation. Six-month delay. Executive escalation. Near-total integration rewrite.

</aside>

**Root cause:** They migrated Maximo, but they didn't modernize their integrations.

<aside>
💡

**Key insight:** Migrating Maximo without modernizing integrations is like upgrading the engine but leaving the old transmission -- the system cannot deliver power where it needs to go.

</aside>

This blog explains how to get integration right the first time—covering API strategies across all MAS applications: Manage, Monitor, Health, Predict, Assist, and Visual Inspection.

---

## 📚 Blog Structure Overview

This comprehensive guide covers 8 major sections:

### Part 1: The Old World vs. The New Reality

- Legacy integration patterns (database access, file drops, JDBC)
- Why each pattern fails in MAS
- The new integration stack

### Part 2: REST APIs Across All MAS Applications

- **Maximo Manage APIs:** Work orders, assets, POs, service requests
- **Monitor APIs:** IoT device management, data ingestion, alerts
- **Health & Predict APIs:** Health scores, predictions, anomalies
- **Assist APIs:** Knowledge base, remote expert connections
- **Visual Inspection APIs:** Model training and inference
- **MAS Administration APIs:** User and workspace management

### Part 3: GraphQL - Advanced Querying

- Why GraphQL for Maximo
- Complex query examples
- 85% reduction in API calls demonstrated

### Part 4: Event-Driven Integration with Kafka

- Kafka deployment options (Strimzi, AMQ Streams, IBM Event Streams, AWS MSK)
- MAS Kafka topics across all applications
- Producer and consumer implementation
- Event patterns: command, state change, domain events
- Error handling and dead letter queues
- Kafka vs JMS decision framework

### Part 5: Integration Platforms

- IBM App Connect (included with MAS)
- Pre-built connectors for 100+ systems
- MuleSoft and Dell Boomi patterns

### Part 6: Real-World Integration Patterns

- **ERP Integration** (SAP, Oracle, Workday) with complete code
- **GIS Integration** (Esri ArcGIS) with spatial sync
- **SCADA/IoT Integration** with real-time work order creation
- **HR System Integration** with employee synchronization
- **Mobile Workforce Integration** with offline-first patterns

### Part 7: Legacy to Modern Migration Strategy

- Integration inventory assessment
- Pattern mapping (legacy → modern)
- Phased migration approach (12-month timeline)
- Parallel run strategy

### Part 8: Best Practices & Production Readiness

- Security: API keys, TLS, secret management
- Performance: optimization, connection pooling
- Monitoring: Prometheus, Grafana implementation
- Testing: unit, integration, contract tests
- Integration readiness checklist

---

---

## 🔧 Key Technical Highlights

### REST API Examples Across MAS

**Maximo Manage - Complex Query:**

```jsx
GET /maximo/api/os/mxwo?
  oslc.select=wonum,description,status,asset{assetnum,location{description}}
  &oslc.where=status in ["WAPPR","APPR"] and wopriority<3
  &oslc.pageSize=50
```

**Monitor - IoT Device Registration:**

```
POST /api/monitor/v1/devices
{
  "deviceId": "PUMP-001-SENSOR",
  "deviceType": "TemperatureSensor",
  "metadata": {
    "assetnum": "PUMP-001"
  }
}
```

**Health - Asset Health Scores:**

```
GET /api/health/v1/assets/PUMP-001/health
{
  "healthScore": 72,
  "criticality": "HIGH",
  "riskScore": 45
}
```

**Predict - Failure Predictions:**

```
GET /api/predict/v1/assets/PUMP-001/predictions
{
  "failureMode": "Bearing Failure",
  "probability": 0.68,
  "daysToFailure": 14
}
```

---

### 🚀 GraphQL Performance Advantage

**REST (7 API calls, ~2.1 seconds):**

```jsx
const wo = await fetch('/api/os/mxwo/1234');
const asset = await fetch(`/api/os/mxapiasset/${wo.assetnum}`);
const location = await fetch(`/api/os/mxapilocation/${asset.location}`);
// ... 4 more calls
```

**GraphQL (1 API call, ~0.3 seconds):**

```graphql
{
  workorder(wonum: "1234") {
    wonum
    description
    asset {
      assetnum
      location {
        description
        siteid
      }
    }
  }
}
```

<aside>
⚡

**Result:** 85% reduction in API calls, 86% reduction in response time

</aside>

---

### 📨 Kafka Event-Driven Pattern

**Monitor Detects Anomaly → Publishes to Kafka → Manage Auto-Creates Work Order**

```jsx
// Consumer in Manage listening for anomalies
const consumer = kafka.consumer({ groupId: 'manage-anomaly-handler' });

await consumer.subscribe({ topic: 'monitor.*.anomaly.detected' });

await consumer.run({
  eachMessage: async ({ message }) => {
    const anomaly = JSON.parse(message.value.toString());
    
    // Auto-create work order for high-severity anomalies
    if (anomaly.severity === 'CRITICAL') {
      await fetch('/maximo/api/os/mxwo', {
        method: 'POST',
        body: JSON.stringify({
          assetnum: anomaly.assetnum,
          description: `Anomaly detected: ${anomaly.anomalyType}`,
          worktype: 'CM',
          wopriority: 1
        })
      });
    }
  }
});
```

---

## 🌐 Real-World Integration Patterns

### Pattern 1: ERP Integration (Full Bidirectional Sync)

**From Maximo to ERP:**

- Work orders completed → Create invoices
- Material issues → Update inventory
- Purchase requisitions → Create POs

**From ERP to Maximo:**

- New assets purchased → Create in Maximo
- Vendor changes → Update Maximo vendors
- Employee terminations → Deactivate labor records

**Implementation:** IBM App Connect with pre-built SAP connector

---

### Pattern 2: GIS Integration (Spatial Synchronization)

**Maximo to GIS:**

```jsx
// Automation Script: Create GIS feature when asset added
var gisFeature = {
  "geometry": {
    "x": mbo.getDouble("LONGITUDE"),
    "y": mbo.getDouble("LATITUDE")
  },
  "attributes": {
    "AssetNumber": mbo.getString("ASSETNUM"),
    "Description": mbo.getString("DESCRIPTION")
  }
};

callRESTAPI(
  "https://gis.company.com/server/rest/services/Assets/FeatureServer/0/addFeatures",
  "POST",
  {"features": [gisFeature]}
);
```

---

### Pattern 3: SCADA/IoT Integration (Real-Time Events)

**Flow:** IoT Device → MQTT → Monitor → Kafka → Manage

1. Device publishes telemetry to MQTT
2. Monitor ingests and analyzes data
3. Anomaly detected → Publishes to Kafka
4. Manage consumes event → Auto-creates work order

<aside>
⏱️

**Result:** Sub-second response time from sensor anomaly to work order creation

</aside>

---

## 📅 Migration Strategy

### 4-Phase Approach (12 Months)

**Phase 1: Critical Database Integrations (Months 1-3)**

- ERP financial interfaces
- Mobile workforce sync
- Real-time SCADA/IoT
- **Goal:** Eliminate all database dependencies

**Phase 2: File-Based Integrations (Months 4-6)**

- GIS synchronization
- Batch imports/exports
- Legacy report generation
- **Goal:** Move to API + iPaaS

**Phase 3: Advanced Patterns (Months 7-9)**

- Event-driven workflows
- Complex orchestrations
- Multi-system transactions
- **Goal:** Cloud-native architecture

**Phase 4: Optimization (Months 10-12)**

- Performance tuning
- Monitoring enhancement
- Documentation
- **Goal:** Production-ready operations

---

### Parallel Run Strategy

```
Legacy (DB) Integration ─┐
                         ├─→ Compare Results → Build Confidence
New (API) Integration ───┘
```

**Duration:** 2 months of parallel operation before cutover

<aside>
🔑

**Key insight:** Never attempt a big-bang integration migration. The parallel run strategy -- running legacy and modern integrations side by side for 2 months -- is your safety net that proves the new architecture before you commit.

</aside>

---

## ✅ Integration Readiness Checklist

### Pre-Migration Assessment

- [ ]  All integrations documented and inventoried
- [ ]  Database dependencies identified
- [ ]  API endpoints mapped for each integration
- [ ]  Security requirements defined
- [ ]  Monitoring strategy defined

### Per-Integration Checklist

- [ ]  Integration pattern selected (API/Kafka/Webhook)
- [ ]  Error handling implemented
- [ ]  Retry logic configured
- [ ]  Monitoring dashboard created
- [ ]  Parallel run completed
- [ ]  Production deployment approved

---

## 📈 MAS Integration Maturity Model

**Level 1: Legacy** — Direct database access, file-based, no monitoring

**Level 2: API-Enabled** — REST API adoption, basic authentication

**Level 3: Event-Driven** — Kafka integration, automated retry, monitoring

**Level 4: Cloud-Native** — Full API-first, event sourcing, API gateway, DevOps

**Level 5: Intelligent** — AI-powered mapping, self-healing, predictive monitoring

<aside>
💡

**Key insight:** Most organizations are at Level 1-2. The goal for MAS migration is to reach Level 3 (event-driven) minimum -- Level 4 (cloud-native) is where the real operational benefits begin.

</aside>

---

## 🎯 Key Takeaways

- **Legacy patterns are MAS-incompatible** — sealed database, containerized architecture make direct access impossible
- **REST APIs are primary mechanism** across all MAS applications with rich functionality for Manage, Monitor, Health, Predict, Assist, Visual Inspection
- **GraphQL eliminates API inefficiency** — 85% reduction in API calls by requesting exactly the needed data
- **Kafka enables real-time, scalable integrations** — event-driven architecture replaces polling with push notifications
- **IBM App Connect (included with MAS)** provides low-code integration with 100+ pre-built connectors
- **Phased migration is critical**: assess → redesign → parallel run → cutover — never attempt big-bang migration
- **Security is non-negotiable**: API keys, TLS 1.2+, secret management, rate limiting are production requirements
- **Monitoring and observability are essential** — track API metrics, integration health, error rates continuously
- **Real-world patterns proven across ERP, GIS, SCADA/IoT, HR, mobile workforce** — each with specific implementation guidance

---

## 📚 Resources & References

### IBM Official Documentation

- [Maximo REST API Guide](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=apis-rest-api)
- [Integration Framework Overview](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=configuring-integration-framework)
- [Object Structures for Integration](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=structures-object-structure-applications)
- [Maximo Monitor API Documentation](https://www.ibm.com/docs/en/maximo-monitor/cd?topic=apis)

### Event-Driven Architecture

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Strimzi - Kafka on Kubernetes](https://strimzi.io/documentation/)
- [IBM Event Streams](https://www.ibm.com/docs/en/cloud-paks/cp-integration/cd?topic=event-streams)

### Integration Platforms

- [IBM App Connect Enterprise](https://www.ibm.com/docs/en/app-connect/cd)
- [MuleSoft Anypoint Platform](https://docs.mulesoft.com/)
- [Dell Boomi Integration](https://help.boomi.com/)

### Training

- [MAS Administration Learning Path](https://www.ibm.com/training/learning-path/maximo-application-suite-375)

---

## 🔗 Series Navigation

**Previous:** [Blog 4 — Stop Customizing the Old Way](Blog%204%20%E2%80%94%20Stop%20Customizing%20Maximo%20the%20Old%20Way%20(thir%202d6beb88221a4fd195422c1e2461699a.md) ←

**Next:** Blog 6 — Data Migration: The Hidden Monster →

---

**Series:** Modern Maximo - Transforming from Legacy 7.6.x to MAS 9, Cloud-Native, and AI-Driven EAM

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother. We've designed and implemented hundreds of MAS integrations across industries, from simple API connections to complex multi-system orchestrations. Our patterns are proven in nuclear power, utilities, manufacturing, and transportation.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*