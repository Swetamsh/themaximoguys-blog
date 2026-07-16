# Monthly Research Prompt — Grok Stream (X/Community/Corporate)

**Use with:** `Agent(subagent_type: "GrokResearcher")` in Claude Code
**Output location:** `SocialMedia/EmailNewsletter/Research/YYYY-MM/grok.md`

---

## Prompt

```
I'm compiling the TheMaximoGuys monthly newsletter for [MONTH YYYY].
Two other researchers are scanning (a) Maximo product news and (b) IBM
TechXchange + product-update blogs. YOUR brief: everything else a
practitioner newsletter should include.

Deliver 1500-2000 words, citation-heavy. Be unsanitized and contrarian
where appropriate — flag when the conventional wisdom is wrong.

1. LinkedIn & X signal — who is shaping Maximo discourse THIS MONTH
   - 15-25 specific handles/accounts ranked by signal
   - Quote their most-engaged recent posts with URLs
   - Flag that the Maximo community lives on LinkedIn + IBM Community,
     NOT X/Reddit — and act accordingly

2. IBM corporate updates that matter for practitioners
   - Latest earnings highlights (most recent quarter)
   - Arvind Krishna / Rob Thomas key decisions
   - Acquisitions/divestitures (Confluent, HashiCorp, etc.)
   - Red Hat / watsonx roadmap moves
   - Kyndryl relationship dynamics

3. IBM Community + LinkedIn pulse
   - Top 5-10 threads with quotes
   - Comment sentiment

4. Analyst coverage
   - Gartner, Verdantix, Forrester, IDC — latest rankings
   - Where Maximo sits vs. competitors
   - Who's rising/falling

5. Competitive intel (news, not specs)
   - Limble, eMaint, PTC ServiceMax, SAP, Oracle Fusion
   - Funding rounds, product launches, positioning moves

6. Jobs market signal
   - Active Maximo roles on LinkedIn
   - Salary benchmarks
   - Hot geographies
   - Skills in demand

7. Conferences/events (next 90 days)
   - Confirm dates and registration status

8. Community sentiment / meme of the month
   - The inside jokes, shared frustrations, celebrated wins
   - What's the vibe?

9. Newsletter competitor scan
   - Any other Maximo/EAM newsletters? Who's doing what?
   - Whitespace for TMG

10. 10-15 specific LinkedIn posts (preferred) or tweets (with URLs) that
    would make great "featured social" embeds in this month's issue

Flag uncertainty explicitly. Avoid padded lists. Budget: 6 minutes.
```

---

## Variables to replace

- `[MONTH YYYY]`

## After the agent returns

```bash
cp /tmp/claude-N/.../tasks/<agent-id>.output \
   SocialMedia/EmailNewsletter/Research/YYYY-MM/grok.md
```
