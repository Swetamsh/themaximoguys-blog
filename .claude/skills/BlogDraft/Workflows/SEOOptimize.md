# SEO Optimize Workflow

Analyze and optimize an existing blog post for search engines and AI answer engines.

## Input

- **--file** (required): Path to existing MDX blog post

## Process

### Step 1: Read and Analyze

Read the target blog post and evaluate:
- Current frontmatter completeness
- Title tag length and keyword placement
- Meta description quality
- Heading hierarchy (H1 -> H2 -> H3)
- Internal linking density
- Image alt text presence
- Content depth vs competitors
- FAQ/question coverage for AEO

### Step 2: Research Competitors

Search the web for the post's primary keyword:
- What are the top 5 results covering?
- What questions appear in "People Also Ask"?
- What's the average word count of ranking content?
- What structured data do competitors use?

### Step 3: Generate Recommendations

Output a structured report:

```
SEO Analysis: {post title}
============================================

Score: X/100

Frontmatter:
  [PASS/FAIL] seoTitle present and under 60 chars
  [PASS/FAIL] seoDescription present and under 160 chars
  [PASS/FAIL] targetQuestions present (3+ questions)
  [PASS/FAIL] tags relevant and 5-10 count

Content:
  [PASS/FAIL] Word count adequate (1500+)
  [PASS/FAIL] H2 structure logical
  [PASS/FAIL] Code examples present
  [PASS/FAIL] Internal links (2+)
  [PASS/FAIL] FAQ section present

AEO (Answer Engine Optimization):
  [PASS/FAIL] Direct answers to target questions
  [PASS/FAIL] Definition blocks for key terms
  [PASS/FAIL] Comparison tables where relevant
  [PASS/FAIL] Expert quotes or credentials

Recommendations:
  1. [specific actionable recommendation]
  2. [specific actionable recommendation]
  ...
```

### Step 4: Apply Fixes (with confirmation)

Ask the user before making changes. Then apply:
- Update frontmatter fields (seoTitle, seoDescription, targetQuestions)
- Add missing FAQ section
- Add internal cross-links to other TMG posts
- Improve heading hierarchy
- Add structured data hints in frontmatter

## Output

Updated MDX file + summary of changes made.
