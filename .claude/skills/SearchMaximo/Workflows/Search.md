# Search Workflow

Intelligent search across IBM Maximo knowledge base with relevance ranking.

## Input

**Required:**
- `search_query` - Topic or keywords to search for

**Optional:**
- `product_filter` - "suite" (Application Suite only) or "manage" (Maximo Manage only)
- `max_results` - Number of results to return (default: 10)

## Process

### 1. Determine Search Scope

Check if in RFP project directory or need to use absolute path:

```bash
# If in RFP baseline root
SEARCH_PATH="baseline/knowledge-base/ibm_userguides_markdown"

# Otherwise use absolute path
SEARCH_PATH="/Users/swetamshakula/Documents/Work/Amtrak proposal/baseline/knowledge-base/ibm_userguides_markdown"
```

Apply product filter if specified:
- `suite` → `${SEARCH_PATH}/maximo_applicationsuite/`
- `manage` → `${SEARCH_PATH}/maximo_manage/`
- None → `${SEARCH_PATH}/` (search both)

### 2. Execute Multi-Pattern Search

Run multiple grep patterns for comprehensive results:

#### Pattern 1: Exact Phrase (Case-Sensitive)
```bash
grep -r "${search_query}" ${SEARCH_PATH} --include="*.md" -l
```

#### Pattern 2: Case-Insensitive
```bash
grep -ri "${search_query}" ${SEARCH_PATH} --include="*.md" -l
```

#### Pattern 3: Word Boundary Match
```bash
grep -riw "${search_query}" ${SEARCH_PATH} --include="*.md" -l
```

### 3. Get Match Counts and Context

For each matching file:

```bash
# Get match count
grep -ri "${search_query}" ${file} -c

# Get context snippets (5 lines before/after match)
grep -ri "${search_query}" ${file} -C 5 -n
```

### 4. Rank Results

Sort files by:
1. **Match count** (primary) - Files with more matches rank higher
2. **File path relevance** (secondary) - Prefer specific sections over general

### 5. Format Output

Display top results (default 10) in this format:

```markdown
## Search Results for: "${search_query}"

**Found in ${total_files} files (showing top ${max_results})**

---

### 1. [File Name] (${match_count} matches)
**Path:** `${relative_path}`

**Context Preview:**
```
Line ${line_num}: ${context_line_1}
Line ${line_num}: ${context_line_2}
Line ${line_num}: ... [matching text highlighted] ...
```

**Load for LLM:**
```bash
Read: ${absolute_path}
# Or load specific sections
```

---

### 2. [File Name] (${match_count} matches)
...

---

## Summary

- **Total files searched:** ${files_searched}
- **Files with matches:** ${files_matched}
- **Top match:** ${top_file_name} (${top_match_count} matches)

## Next Steps

**To load context for LLM response:**
1. Review results above
2. Use Read tool on relevant file paths
3. Load into LLM context alongside RFP_RESPONSE_PROMPT.md
```

### 6. Optional: Extract Full Sections

If user requests full sections:

```bash
# Read the top matching files
Read: ${file_path_1}
Read: ${file_path_2}
# ... up to max_results
```

## Examples

### Example 1: Basic Search

**Input:**
- search_query: "work order"
- product_filter: none
- max_results: 10

**Execution:**
```bash
grep -ri "work order" baseline/knowledge-base/ibm_userguides_markdown/ --include="*.md" -l | \
  xargs -I {} sh -c 'echo "$(grep -ri "work order" {} -c) {}"' | \
  sort -rn | head -10
```

**Output:**
Top 10 files ranked by match count with context snippets.

### Example 2: Product-Specific Search

**Input:**
- search_query: "integration API"
- product_filter: "suite"
- max_results: 5

**Execution:**
```bash
grep -ri "integration.*API" baseline/knowledge-base/ibm_userguides_markdown/maximo_applicationsuite/ \
  --include="*.md" -C 5
```

**Output:**
Top 5 Application Suite files about integration APIs.

### Example 3: Broad Topic Search

**Input:**
- search_query: "asset management"
- product_filter: none
- max_results: 15

**Execution:**
Multiple pattern search with synonym expansion (asset|Asset|ASSET).

**Output:**
Top 15 files across both products related to asset management.

## Search Strategies (from baseline/knowledge-base/README.md)

### By Topic
```bash
# Asset Management
grep -r "asset.*management\|Asset Management" ${SEARCH_PATH}

# Work Order Management
grep -r "work.*order\|Work Order" ${SEARCH_PATH}

# Integration & APIs
grep -r "integration\|API\|REST\|SOAP" ${SEARCH_PATH}
```

### By Feature
```bash
# Mobile
grep -r "mobile\|Mobile" ${SEARCH_PATH}

# Workflow
grep -r "workflow\|Workflow" ${SEARCH_PATH}
```

### By Compliance/Standards
```bash
# ISO 55001, AREMA, CFIHOS
grep -r "ISO 55001\|AREMA\|CFIHOS" ${SEARCH_PATH}
```

### By Documentation Section
```bash
# Integration (Section 158)
grep -r "keyword" ${SEARCH_PATH}/maximo_applicationsuite/Section_158_*

# Installation (Sections 5, 117)
grep -r "keyword" ${SEARCH_PATH}/maximo_applicationsuite/Section_{05,117}_*
```

## Tools Used

- **Grep:** Multi-pattern searching with context
- **Bash:** File operations, sorting, counting
- **Read:** Extract full sections for LLM context (optional)

## Error Handling

- If search path doesn't exist, provide guidance on correct working directory
- If no matches found, suggest broader search terms or related topics
- If too many results (>100 files), suggest more specific search terms

## Output Format Options

### Concise (Default)
- File path
- Match count
- 2-3 line context snippet

### Detailed (--verbose)
- File path
- Match count
- 10-line context snippets
- Section headings where matches occur

### Paths Only (--paths-only)
- Just file paths for direct Read tool use
- Useful when user knows they want to load all results

## Success Criteria

- Search completes within 5 seconds for typical query
- Results ranked by relevance
- Context snippets clearly show why file matched
- File paths provided in format ready for Read tool
- Summary statistics accurate

---

**This workflow implements the search strategies documented in baseline/knowledge-base/README.md.**
