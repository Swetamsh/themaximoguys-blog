# Technical Deep Dive Workflow

**For implementation-focused, practitioner-level Maximo content.**

---

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Technical Deep Dive workflow in MaximoBlog skill"}' \
  > /dev/null 2>&1 &
```

Running **TechnicalDeepDive** in **MaximoBlog**...

---

## When to Use

- How-to implementation guides
- Configuration tutorials
- Code-heavy technical posts
- Troubleshooting guides
- Step-by-step procedures
- API integration guides

---

## Structure: Problem → Solution → Implementation

```
┌─────────────────────────────────────────────────────┐
│                 TECHNICAL DEEP DIVE                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. THE PROBLEM                                      │
│     └── What pain point does this solve?            │
│                                                      │
│  2. THE SOLUTION                                     │
│     └── High-level approach                         │
│                                                      │
│  3. PREREQUISITES                                    │
│     └── What's needed before starting               │
│                                                      │
│  4. IMPLEMENTATION                                   │
│     ├── Step 1: [Action]                            │
│     ├── Step 2: [Action]                            │
│     └── Step N: [Action]                            │
│                                                      │
│  5. VERIFICATION                                     │
│     └── How to confirm it works                     │
│                                                      │
│  6. TROUBLESHOOTING                                  │
│     └── Common issues and fixes                     │
│                                                      │
│  7. KEY TAKEAWAYS                                    │
│     └── Summary bullets                             │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Workflow Steps

### Step 1: Research

1. **Identify the topic** — What specific implementation?
2. **Check IBM Docs** — Official documentation for the feature
3. **Find code examples** — GitHub, developer.ibm.com
4. **Cross-reference community** — Maximo Secrets, Interloc
5. **Note version specifics** — MAS 8.x vs 9.x differences

**Use:** `References/MaximoSources.md` for research URLs

### Step 2: Define the Problem

Write a clear problem statement:
- What is the user trying to accomplish?
- What challenges exist?
- Why is this non-trivial?

```markdown
## The Problem

[2-3 paragraphs describing the challenge]

Example:
"Configuring Maximo Monitor to ingest IoT data from custom sensors
isn't straightforward. The documentation covers standard integrations,
but when you have non-standard protocols or need custom transformations,
you're left piecing together information from multiple sources..."
```

### Step 3: Outline the Solution

High-level approach before diving into details:

```markdown
## The Solution

[Brief overview of the approach]

**What we'll cover:**
1. [First major step]
2. [Second major step]
3. [Third major step]
```

### Step 4: Prerequisites Section

Be explicit about requirements:

```markdown
## Prerequisites

Before starting, ensure you have:

- [ ] MAS [version] installed and running
- [ ] Administrative access to [component]
- [ ] [Specific tool or access] available
- [ ] Familiarity with [concept]

**Environment:**
- MAS Version: 9.x
- Component: Monitor
- Access Level: Admin
```

### Step 5: Implementation Steps

Detailed, numbered steps with code:

```markdown
## Implementation

### Step 1: [Action Title]

[Brief explanation of what this step accomplishes]

```bash
# Command or code
maximo-cli configure --option value
```

**Expected output:**
```
[What the user should see]
```

> **Note:** [Any important considerations]

### Step 2: [Action Title]

[Continue with each step...]
```

**Code block requirements:**
- Specify language (bash, python, sql, xml, json, yaml)
- Add comments explaining key lines
- Show expected output where helpful
- Use copy-friendly formatting

### Step 6: Verification

How to confirm success:

```markdown
## Verification

Confirm the implementation is working:

1. **Check [Component]:**
   ```bash
   maximo-cli status --component monitor
   ```

2. **Verify in UI:**
   - Navigate to [path]
   - You should see [expected result]

3. **Test functionality:**
   [Specific test procedure]

**Success criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
```

### Step 7: Troubleshooting

Common issues and solutions:

```markdown
## Troubleshooting

### Issue: [Problem Description]

**Symptoms:**
- [What the user sees]

**Cause:**
[Why this happens]

**Solution:**
```bash
# Fix command
```

---

### Issue: [Another Problem]

[Repeat format...]
```

### Step 8: Key Takeaways

Summary bullets:

```markdown
## Key Takeaways

1. **[Main point 1]** — [Brief elaboration]
2. **[Main point 2]** — [Brief elaboration]
3. **[Main point 3]** — [Brief elaboration]

## References

- [IBM Docs: Feature Name](URL)
- [Related Blog Post](URL)
- [GitHub Repository](URL)
```

---

## Visual Requirements

For Technical Deep Dive posts, include:

1. **Header Image** — Via Art skill
   ```
   "Create a professional blog header for '[TITLE]' - IBM Maximo technical implementation guide.
   Style: charcoal architectural sketch with industrial/technology elements.
   Theme: [specific to the implementation]"
   ```

2. **Architecture Diagram** — If system integration involved
   - Use Mermaid or ASCII diagrams
   - Show data flow, components, connections

3. **Screenshots** — MAS UI for:
   - Configuration screens
   - Before/after comparisons
   - Navigation paths

4. **Code Blocks** — Syntax highlighted, copyable

---

## Template

```markdown
---
title: "[How to/Implementing/Configuring] [Topic] in IBM Maximo [Version]"
description: "[Action-oriented meta description, 150-160 chars]"
date: "YYYY-MM-DD"
slug: "topic-slug-here"
tags: ["maximo", "mas", "implementation", "tutorial"]
draft: false
tier: "developer"
author:
  name: "Author Name"
  avatar: "/images/authors/author.jpg"
  title: "IBM Maximo Expert"
coverImage: "/images/blog/topic-slug-cover.jpg"
readTime: "10 min read"
faq:
  - question: "What are the prerequisites for this implementation?"
    answer: "You need MAS X.x installed with administrative access..."
  - question: "What version of Maximo does this apply to?"
    answer: "This guide applies to MAS 9.x, with notes for 8.x compatibility..."
howTo:
  name: "How to [Implement Feature]"
  description: "Step-by-step guide for implementing [feature] in Maximo"
  steps:
    - name: "Configure prerequisites"
      text: "Ensure your environment meets the requirements"
    - name: "Implement the solution"
      text: "Follow the implementation steps"
    - name: "Verify the result"
      text: "Confirm the implementation works correctly"
---

# [Title]

> **[One-sentence summary of what the reader will accomplish]**

## Table of Contents
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Prerequisites](#prerequisites)
- [Implementation](#implementation)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Key Takeaways](#key-takeaways)

---

## The Problem

[Problem description...]

## The Solution

[Solution overview...]

## Prerequisites

[Requirements list...]

## Implementation

### Step 1: [Action]
[Details...]

### Step 2: [Action]
[Details...]

[Continue steps...]

## Verification

[How to confirm success...]

## Troubleshooting

### Issue: [Problem]
[Solution...]

## Key Takeaways

1. [Point 1]
2. [Point 2]
3. [Point 3]

## References

- [Source 1](URL)
- [Source 2](URL)

---

*[Author bio/CTA]*
```

---

## Quality Checklist

Before publishing:

- [ ] Problem clearly stated
- [ ] Solution approach explained before diving in
- [ ] Prerequisites complete and accurate
- [ ] Steps are numbered and sequential
- [ ] Code blocks have language specified
- [ ] Commands are copy-pasteable
- [ ] Expected outputs shown
- [ ] Verification steps included
- [ ] Common issues addressed
- [ ] Version numbers specified
- [ ] Sources cited
- [ ] Header image generated
- [ ] Screenshots included where helpful

---

*This workflow produces practitioner-focused, implementation-ready content.*
