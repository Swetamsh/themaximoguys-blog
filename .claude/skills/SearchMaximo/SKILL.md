---
name: SearchMaximo
description: Intelligent IBM Maximo knowledge base search. USE WHEN search Maximo docs, find IBM documentation, search knowledge base, search for topic in Maximo docs, find Maximo documentation about topic.
---

# SearchMaximo Skill

Intelligent search across 611 IBM Maximo documentation files with relevance ranking and context extraction.

## Customization

**Before executing, check for user customizations at:**
`~/.claude/skills/PAI/USER/SKILLCUSTOMIZATIONS/SearchMaximo/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

## 🚨 MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**You MUST send this notification BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Running the Search workflow in the SearchMaximo skill to search IBM Maximo knowledge base"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Running the **Search** workflow in the **SearchMaximo** skill to search IBM Maximo knowledge base...
   ```

**This is not optional. Execute this curl command immediately upon skill invocation.**

## Workflow Routing

Route to the appropriate workflow based on the request.

- Search IBM Maximo documentation → `Workflows/Search.md`

## Knowledge Base

**Location:** `baseline/knowledge-base/ibm_userguides_markdown/`

- **maximo_applicationsuite/** - 222 files (Application Suite documentation)
- **maximo_manage/** - 389 files (Maximo Manage documentation)
- **Total:** 611 documentation files

## Examples

**Example 1: Search for specific topic**
```
User: "Search Maximo docs for work order management"
→ Invokes Search workflow
→ Multi-pattern grep across both products
→ Returns top 10 files with context snippets
→ Shows file paths for LLM context loading
```

**Example 2: Product-specific search**
```
User: "Find IBM documentation about integration in Application Suite"
→ Invokes Search workflow with product filter
→ Searches only maximo_applicationsuite/ files
→ Returns ranked results with match counts
```

**Example 3: Broad topic search**
```
User: "Search knowledge base for asset management"
→ Invokes Search workflow
→ Searches both exact and related terms
→ Ranks by relevance
→ Provides context snippets for preview
```
