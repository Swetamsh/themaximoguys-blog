# AI Module Guide Workflow

**For explaining MAS AI capabilities: Monitor, Health, Predict, Visual Inspection, Assist.**

---

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the AI Module Guide workflow in MaximoBlog skill"}' \
  > /dev/null 2>&1 &
```

Running **AIModuleGuide** in **MaximoBlog**...

---

## When to Use

- Explaining Maximo Monitor capabilities
- Maximo Health scoring guides
- Maximo Predict implementation
- Visual Inspection setup and training
- Maximo Assist (Gen AI) guides
- Work Order Intelligence features
- AI/ML integration topics

---

## Structure: Concept → Deep Dive → Examples

```
┌─────────────────────────────────────────────────────┐
│                  AI MODULE GUIDE                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. EXECUTIVE SUMMARY                                │
│     └── Business value in 3 bullets                 │
│                                                      │
│  2. WHAT IS [MODULE]?                                │
│     └── Concept explanation                         │
│                                                      │
│  3. HOW IT WORKS                                     │
│     └── Technical architecture                      │
│                                                      │
│  4. KEY CAPABILITIES                                 │
│     └── Feature breakdown with examples             │
│                                                      │
│  5. IMPLEMENTATION APPROACH                          │
│     └── Getting started steps                       │
│                                                      │
│  6. USE CASES                                        │
│     └── Real-world scenarios                        │
│                                                      │
│  7. DATA REQUIREMENTS                                │
│     └── What data is needed                         │
│                                                      │
│  8. INTEGRATION POINTS                               │
│     └── How it connects to other MAS modules        │
│                                                      │
│  9. KEY TAKEAWAYS                                    │
│     └── Summary for both audiences                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Audience Consideration

This workflow serves **two audiences simultaneously**:

| Audience | What They Need |
|----------|----------------|
| **Decision Makers** | Business value, ROI, capabilities overview |
| **Practitioners** | Technical architecture, implementation, configuration |

**Approach:** Start with executive summary (business value), then go deep technical. Reader can stop at the level they need.

---

## Workflow Steps

### Step 1: Research the Module

1. **IBM Docs** — Official documentation for the specific module
2. **Release notes** — Recent features and capabilities
3. **Community** — Real-world implementations, gotchas
4. **watsonx integration** — For AI-powered modules (Assist, WO Intelligence)

**Module-specific sources:**

| Module | Key IBM Doc URL |
|--------|-----------------|
| Monitor | ibm.com/docs/en/mas-cd/maximo-monitor |
| Health | ibm.com/docs/en/mas-cd/maximo-health |
| Predict | ibm.com/docs/en/mas-cd/maximo-predict |
| Visual Inspection | ibm.com/docs/en/mas-cd/maximo-visual-inspection |
| Assist | ibm.com/docs/en/mas-cd/maximo-assist |

### Step 2: Executive Summary

Start with business value (for decision makers):

```markdown
## Executive Summary

**[Module Name] enables organizations to:**

- **[Benefit 1]** — [One sentence elaboration]
- **[Benefit 2]** — [One sentence elaboration]
- **[Benefit 3]** — [One sentence elaboration]

**Bottom line:** [One sentence on ROI/impact]
```

### Step 3: Concept Explanation

Accessible explanation of what the module does:

```markdown
## What is Maximo [Module]?

[2-3 paragraphs explaining the module in accessible terms]

**In simple terms:** [One sentence analogy or simplification]

### Where It Fits in MAS

[Diagram showing module's place in the MAS ecosystem]

```
┌─────────────────────────────────────────────┐
│              MAXIMO APPLICATION SUITE        │
├─────────────────────────────────────────────┤
│                                              │
│  IoT Data → MONITOR → HEALTH → PREDICT      │
│                          ↓                   │
│                       MANAGE                 │
│                          ↓                   │
│              ASSIST ← Work Orders            │
│                                              │
└─────────────────────────────────────────────┘
```
```

### Step 4: Technical Architecture

Deep dive for practitioners:

```markdown
## How It Works

### Architecture Overview

[Architecture diagram - Mermaid or ASCII]

### Key Components

| Component | Purpose |
|-----------|---------|
| [Component 1] | [What it does] |
| [Component 2] | [What it does] |
| [Component 3] | [What it does] |

### Data Flow

1. [Data enters from...]
2. [Processing happens...]
3. [Output goes to...]

### Technology Stack

- **AI/ML:** [Specific technologies]
- **Data Store:** [Database/storage]
- **Integration:** [APIs, protocols]
```

### Step 5: Capabilities Breakdown

Feature-by-feature with examples:

```markdown
## Key Capabilities

### 1. [Capability Name]

**What it does:** [Description]

**Example:**
> [Concrete example of this capability in action]

**Configuration:**
```yaml
# Example configuration
setting: value
```

### 2. [Capability Name]

[Repeat format...]
```

### Step 6: Implementation Approach

Getting started guidance:

```markdown
## Implementation Approach

### Prerequisites

- [ ] MAS [version] with [Module] licensed
- [ ] [Data requirements]
- [ ] [Access requirements]

### Phase 1: Foundation (Weeks 1-2)
[What to do first]

### Phase 2: Configuration (Weeks 3-4)
[Core setup]

### Phase 3: Validation (Weeks 5-6)
[Testing and refinement]

### Quick Start

For a pilot implementation:

1. [First step]
2. [Second step]
3. [Third step]
```

### Step 7: Use Cases

Real-world scenarios:

```markdown
## Use Cases

### Use Case 1: [Industry/Scenario]

**Challenge:** [What problem exists]

**Solution with [Module]:** [How the module addresses it]

**Result:** [Expected outcome]

### Use Case 2: [Industry/Scenario]

[Repeat format...]
```

### Step 8: Data Requirements

What data is needed:

```markdown
## Data Requirements

### Required Data

| Data Type | Source | Quality Requirement |
|-----------|--------|---------------------|
| [Type 1] | [Where it comes from] | [Minimum quality] |
| [Type 2] | [Where it comes from] | [Minimum quality] |

### Data Preparation

[Steps to prepare data for the module]

### Data Volume Considerations

- **Minimum:** [Minimum data for basic functionality]
- **Recommended:** [Ideal data volume]
- **Historical:** [How much history is useful]
```

### Step 9: Integration Points

How it connects to other modules:

```markdown
## Integration Points

### Upstream (Data Sources)

| Source | Data Provided | Integration Method |
|--------|---------------|-------------------|
| Monitor | Sensor telemetry | Internal API |
| External IoT | Device data | MQTT/REST |

### Downstream (Consumers)

| Consumer | Data Consumed | Integration Method |
|----------|---------------|-------------------|
| Manage | Work orders | Internal API |
| Health | Scores | Internal API |

### External Integrations

[APIs, webhooks, third-party systems]
```

---

## Visual Requirements

For AI Module Guide posts, include:

1. **Header Image** — Via Art skill
   ```
   "Create a professional blog header for 'Understanding Maximo [Module]' -
   IBM Maximo AI capabilities guide.
   Style: charcoal architectural sketch with AI/neural network elements.
   Theme: [industrial assets + AI intelligence]"
   ```

2. **Architecture Diagram** — Required
   - Show data flow through the module
   - Show connections to other MAS components
   - Use consistent styling

3. **Capability Matrix** — Table format
   - Features vs. use cases
   - What each capability enables

4. **Integration Diagram** — Show connections
   - Upstream data sources
   - Downstream consumers

---

## Template

```markdown
---
title: "Understanding Maximo [Module]: [Value Proposition]"
description: "[Module] enables [key capability]. Learn how it works and how to implement it."
date: "YYYY-MM-DD"
slug: "maximo-module-name-guide"
tags: ["maximo", "mas", "module-name", "ai", "predictive-maintenance"]
draft: false
tier: "free"
author:
  name: "Author Name"
  avatar: "/images/authors/author.jpg"
  title: "IBM Maximo Expert"
coverImage: "/images/blog/maximo-module-name-cover.jpg"
readTime: "12 min read"
faq:
  - question: "What is Maximo [Module]?"
    answer: "Maximo [Module] is an AI-powered capability that..."
  - question: "What data does [Module] require?"
    answer: "[Module] requires historical asset data including..."
  - question: "How does [Module] integrate with other MAS components?"
    answer: "[Module] integrates with Manage, Monitor, and..."
---

# Understanding Maximo [Module]: [Subtitle]

> **[One sentence on what the reader will learn]**

## Table of Contents
[Generated TOC]

---

## Executive Summary

**Maximo [Module] enables organizations to:**

- **[Benefit 1]**
- **[Benefit 2]**
- **[Benefit 3]**

---

## What is Maximo [Module]?

[Accessible explanation...]

---

## How It Works

[Technical architecture...]

---

## Key Capabilities

### 1. [Capability]
[Details...]

---

## Implementation Approach

[Getting started...]

---

## Use Cases

### [Industry/Scenario]
[Details...]

---

## Data Requirements

[What's needed...]

---

## Integration Points

[How it connects...]

---

## Key Takeaways

**For Decision Makers:**
1. [Business-focused point]
2. [ROI-focused point]

**For Practitioners:**
1. [Technical point]
2. [Implementation point]

## References

- [IBM Docs: Module](URL)
- [Related resources](URL)

---

*[Author bio/CTA]*
```

---

## Module-Specific Notes

### Monitor
- Focus on IoT connectivity, time-series data
- Anomaly detection capabilities
- Device type configuration

### Health
- Health scoring models
- Factor weightings
- Condition-based maintenance

### Predict
- ML model types (failure probability, survival, regression)
- Training data requirements (50+ failures per mode)
- Model deployment and scoring

### Visual Inspection
- Computer vision, defect detection
- Model training workflow
- Image capture requirements

### Assist (Gen AI)
- watsonx.ai integration
- RAG architecture
- Knowledge base preparation

### Work Order Intelligence
- Auto failure codes
- Data quality improvement
- watsonx integration

---

## Quality Checklist

Before publishing:

- [ ] Executive summary for decision makers
- [ ] Technical depth for practitioners
- [ ] Architecture diagram included
- [ ] Capabilities clearly explained with examples
- [ ] Implementation approach practical
- [ ] Use cases realistic
- [ ] Data requirements specified
- [ ] Integration points documented
- [ ] Version-specific (MAS 8.x vs 9.x)
- [ ] Sources cited

---

*This workflow produces content that serves both business and technical audiences.*
