# Running the Monthly Research Pass

**When:** T-10 days before newsletter send
**Time required:** ~15 minutes (mostly waiting for agents)
**Prerequisite:** Claude Code session open at repo root

---

## Step-by-step

### 1. Create the month's research folder

```bash
cd newsletter
MONTH=$(date +%Y-%m)
mkdir -p RESEARCH/$MONTH
echo "Gathering research for $MONTH..."
```

### 2. Launch the 3 parallel agents in Claude Code

In your Claude Code session, paste this prompt:

```
Launch 3 parallel research agents for the Maximo newsletter monthly research:

1. Agent(subagent_type: "PerplexityResearcher") with the prompt from
   SocialMedia/EmailNewsletter/Prompts/monthly-research-perplexity.md (replace [MONTH YYYY])
   run_in_background: true

2. Agent(subagent_type: "GrokResearcher") with the prompt from
   SocialMedia/EmailNewsletter/Prompts/monthly-research-grok.md (replace [MONTH YYYY])
   run_in_background: true

3. Agent(subagent_type: "ClaudeResearcher") with the prompt from
   SocialMedia/EmailNewsletter/Prompts/monthly-research-claude.md (replace [MONTH YYYY])
   run_in_background: true
```

Claude will launch the three agents. They run in ~5-7 minutes each.

### 3. Save each agent's output when it returns

Claude will notify you when each agent completes. For each one, save its
output to the month's research folder:

```bash
# When Perplexity agent completes:
cp /tmp/claude-N/.../tasks/<perplexity-agent-id>.output \
   SocialMedia/EmailNewsletter/Research/$MONTH/perplexity.md

# When Grok agent completes:
cp /tmp/claude-N/.../tasks/<grok-agent-id>.output \
   SocialMedia/EmailNewsletter/Research/$MONTH/grok.md

# When Claude agent completes:
cp /tmp/claude-N/.../tasks/<claude-agent-id>.output \
   SocialMedia/EmailNewsletter/Research/$MONTH/claude.md
```

*Claude Code will show you each agent's transcript path when it completes.*

### 4. Create a summary index

```bash
cat > SocialMedia/EmailNewsletter/Research/$MONTH/README.md <<EOF
# Research — $MONTH

Monthly research briefing for the TheMaximoGuys newsletter, $MONTH issue.

## Streams

- [Perplexity (product news)](./perplexity.md)
- [Grok (X/corporate/community)](./grok.md)
- [Claude (TechXchange + blogs)](./claude.md)

## Summary (fill in after reading)

### Must-cover stories (top 5)
1.
2.
3.
4.
5.

### Featured deep-dive candidate
-

### Security CVEs to highlight
-

### Events to flag
-
EOF
```

### 5. (Optional) Generate a synthesized briefing

Ask Claude in the same session:

```
Read SocialMedia/EmailNewsletter/Research/YYYY-MM/{perplexity,grok,claude}.md and produce a
synthesized briefing at SocialMedia/EmailNewsletter/Research/YYYY-MM/SYNTHESIS.md. Format:
- Top 5 must-cover stories ranked by practitioner urgency
- Recommended featured deep-dive for this issue
- Pull-quotes ready for the "Community Pulse" section
- Calendar of events for "TechXchange & Events" section
- Security CVE table for "Release Radar" section
```

---

## Skipping the parallel agents (manual alternative)

If Claude Code agents are unavailable, run each prompt manually in:
- perplexity.ai/search (for the Perplexity prompt)
- grok.com (for the Grok prompt)
- claude.ai (for the Claude prompt)

Save each response as `perplexity.md`, `grok.md`, `claude.md`. Takes ~45
minutes of manual work vs. 15 minutes of agent parallelism.

---

## What to do with the research

The output becomes the source-of-truth for the monthly issue draft. Every
claim in the newsletter should trace back to a citation in the research
folder. When the issue ships, the RESEARCH/YYYY-MM/ folder becomes the
fact-check audit trail — keep it forever.
