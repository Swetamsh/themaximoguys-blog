# Monthly Research Prompt — Claude Stream (TechXchange + IBM Official Blogs)

**Use with:** `Agent(subagent_type: "ClaudeResearcher")` in Claude Code
**Output location:** `SocialMedia/EmailNewsletter/Research/YYYY-MM/claude.md`

---

## Prompt

```
I'm compiling the TheMaximoGuys monthly newsletter for [MONTH YYYY].
Two parallel researchers cover (a) Maximo product news and (b) X/community
+ corporate signal. YOUR brief: IBM TechXchange + official IBM product
update blogs + release notes + security bulletins + certification updates.

Deliver 1500-2000 words, citation-heavy with verified URLs.

1. IBM TechXchange — next event
   - Dates, location, CFP status, pricing, registration
   - Maximo-relevant tracks and sessions
   - Co-located events (HashiConf, IDUG, etc.)

2. IBM TechXchange Community Day events — next 6 months
   - Maximo-focused or Maximo-adjacent
   - North America, EU, APAC, India coverage
   - User-group events (MUWG, FMMUG, PACMUG, GOMaximo, etc.)

3. IBM official product update blogs — last 30-60 days
   - community.ibm.com (Maximo blogs — Rachel Stein Technical Touchpoint,
     Hideki Inoue, Kalman Gyimesi, Jaydev Hari)
   - ibm.com/blog (Maximo-tagged)
   - developer.ibm.com (asset management)
   - Summarize each in 2-3 sentences with URL

4. MAS release cadence & patch notes
   - Current 9.1.x version, what shipped when
   - Pending releases
   - Cite IBM Support release notes pages

5. Maximo product team public activity
   - IBMers writing publicly (where)
   - User-group decks (SWMUG, PACMUG, LVMUG, FMMUG PDFs)

6. Security bulletins — last 60 days
   - Every CVE affecting MAS
   - Highest-click content in the Maximo newsletter space
   - Interloc's monthly rollup link

7. IBM Maximo video resources
   - Mediacenter + YouTube (IBM Technology channel)
   - New videos worth embedding

8. IBM certification updates
   - New/deprecated certs
   - Exam updates
   - Path for MAS 9.1 admins (gap: is there one yet?)

9. Must-link catalog for this month
   - 15-25 IBM-official URLs worth citing in the newsletter

10. Strategic reads — "three moves ahead"
    - What IBM's moves THIS month signal about next 6 months

Every URL must be verified. Flag anything that 404s or can't be retrieved.
Budget: 6 minutes.
```

---

## Variables to replace

- `[MONTH YYYY]`

## After the agent returns

```bash
cp /tmp/claude-N/.../tasks/<agent-id>.output \
   SocialMedia/EmailNewsletter/Research/YYYY-MM/claude.md
```
