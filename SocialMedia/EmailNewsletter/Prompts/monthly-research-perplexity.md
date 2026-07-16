# Monthly Research Prompt — Perplexity Stream (IBM Maximo Product News)

**Use with:** `Agent(subagent_type: "PerplexityResearcher")` in Claude Code
**Output location:** `SocialMedia/EmailNewsletter/Research/YYYY-MM/perplexity.md`

---

## Prompt (copy-paste into the Agent call)

```
I'm compiling the TheMaximoGuys monthly newsletter for [MONTH YYYY].
Target delivery: 1500-2000 words, citation-heavy, flagged uncertainty.

Cover the following, using IBM official pages, partner blogs, and trade
press (not generic SEO content). Cite every claim with a URL.

1. Latest MAS release news (last 60 days)
   - Version shipped, release date, key features
   - Patch operator releases
   - Release notes URLs

2. AI in Maximo / watsonx integration (what actually ships, not hype)
   - Maximo Assistant, Maximo AI Service
   - watsonx Orchestrate integrations
   - Granite model usage
   - Real customer deployments

3. Licensing / AppPoints changes
   - Pricing packaging shifts
   - New paid add-ons
   - Public IBM pricing commentary

4. Industry events next 90 days
   - IBM Think, TechXchange, Community Days
   - MaximoWorld, user groups
   - Dates, locations, registration

5. Partner ecosystem movement
   - Naviam rollup status
   - New IBM partners, M&A
   - Notable partner blog posts

6. Migration stories & case studies (public, last 60 days)
   - Named customers on MAS 9
   - Horror stories / lessons learned

7. Deprecations & end-of-support dates
   - MAS 8.x, BIRT, WebSphere traditional, Classic UI
   - What customers are scrambling on

8. Competitive landscape
   - SAP EAM, Oracle EAM, PTC ServiceMax, Hexagon/Infor, Limble, eMaint
   - Funding, launches, positioning moves

9. Community signals
   - IBM Champions announcements
   - Popular partner blog posts
   - Active community hubs

10. The 3-5 MUST-COVER stories for this month's newsletter
    - What would make a practitioner say "I needed to know this"

Return well-organized, with URLs for every claim. Flag anything unverified
explicitly. Budget: 6 minutes.
```

---

## Variables to replace

- `[MONTH YYYY]` — e.g., "May 2026"

## Expected output structure

Ava Sterling / Perplexity returns a 10-section briefing with:
- Inline citations as `[source name](url)`
- Explicit "Flag: unverified" lines
- A closing "Must-cover stories" shortlist
- Consolidated source list at the end

## After the agent returns

```bash
# Save the output (from the agent's task output file)
cp /tmp/claude-N/.../tasks/<agent-id>.output \
   newsletter/RESEARCH/YYYY-MM/perplexity.md
```
