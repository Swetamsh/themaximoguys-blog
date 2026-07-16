# Hermes Agent Pilot — LinkedIn Publishing with Phone Approval

**Version:** 1.0 (2026-06-11)
**Status:** SPEC — not yet started
**Goal:** Validate one workflow: *Hermes drafts → Telegram pings phone → approve/edit by reply → post publishes to LinkedIn* — using the existing, proven `LinkedInPublish.ts` pipeline as the only publishing path.
**Timebox:** 5 working days of posts + 1 setup day. If it doesn't stick, uninstall and lose nothing.

---

## 1. What We Are Testing (and NOT Testing)

| In scope | Out of scope |
|----------|--------------|
| Scheduled, unattended post proposal (cron) | Content generation (posts come from existing manifest) |
| Telegram approval loop from phone | X/Twitter, Instagram, newsletter |
| Publishing via existing `LinkedInPublish.ts` (API post + browser first-comment) | Replacing any Claude Code skill |
| Manifest status tracking (pending → posted) | Multi-agent / memory / skill self-improvement features |

**Success =** 5 consecutive weekdays where the morning post went out with ≤2 minutes of phone interaction and zero terminal sessions.

---

## 2. Architecture Decision: Run on THIS Server, Not a New VPS

`LinkedInPublish.ts` depends on machine-local state that is expensive to migrate:

- Credentials: `/root/themaximoguys-blog/.env.local` (`LINKEDIN_ACCESS_TOKEN`)
- Browser session: `/root/.linkedin-session/` (Playwright persistent context — re-login risks LinkedIn security challenges)
- Absolute image paths in manifests: `/root/themaximoguys-blog/posts/.../images/*.png`
- Runtime: Bun + Playwright already installed

This machine is already always-on Linux. Installing Hermes here turns a 1-day migration into a ~1-hour setup. A separate VPS becomes worthwhile only if the pilot graduates to production AND this box needs isolation.

```
┌─ This server ──────────────────────────────────────────────┐
│                                                            │
│  Hermes agent ──cron 9:45 ET──► reads manifest             │
│      │                              │                      │
│      │◄──── Telegram gateway ───────┘ (proposal w/ text +  │
│      │            ▲                    image filename)     │
│      ▼            │                                        │
│   [phone: approve / edit / skip]                           │
│      │                                                     │
│      ▼ on approve                                          │
│  bash publish-next.sh ──► bun LinkedInPublish.ts post ...  │
│      │                         (API + Playwright comment)  │
│      ▼                                                     │
│  manifest status → "posted" + URN logged                   │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Components to Build

### 3.1 Wrapper script — `scripts/hermes/publish-next.sh` (NEW, ~60 lines)

The **only** command Hermes is allowed to run for publishing. Hermes never calls `LinkedInPublish.ts` directly and never composes raw arguments.

```
Usage:
  publish-next.sh preview            # print next pending post (id, text, comment, image path) as JSON
  publish-next.sh publish <id>       # publish that post via LinkedInPublish.ts, set status=posted, log URN
  publish-next.sh skip <id> [reason] # set status=skipped
  publish-next.sh status             # counts: pending / posted / skipped
```

Internals:
- Reads/writes `SocialMedia/LinkedIn/Content/company-daily-manifest.json`
- **Pre-req change:** add `"status": "pending"` to all 26 posts (one-time migration; posts already published before the pilot get `"posted"`)
- `publish` runs: `bun .claude/skills/LinkedInPublishing/Tools/LinkedInPublish.ts post --text ... --image ... --comment ... --as-org`
- Appends every action to `scripts/hermes/publish-log.jsonl` (timestamp, id, URN or error)
- Refuses to publish the same id twice (idempotent — protects against cron double-fire)

### 3.2 Hermes skill — `~/.hermes/skills/linkedin-publisher/`

A thin skill (agentskills.io format) that teaches Hermes the loop:

1. Run `publish-next.sh preview`
2. Send to Telegram: post text, first comment, image filename, scheduled date — formatted for phone reading
3. Wait for reply:
   - **"approve" / 👍** → `publish-next.sh publish <id>` → confirm with post URN
   - **"edit: <new text>"** → re-preview with edited text, ask again (edit is passed to publish as override)
   - **"skip"** → `publish-next.sh skip <id>` → confirm
   - **No reply by 11:00 ET** → do nothing, notify "post NOT published — no approval", leave status pending
4. Never publish without an explicit approval message. Never run any command other than `publish-next.sh`.

### 3.3 Cron automation (inside Hermes)

Natural-language cron: *"Every Monday–Friday at 9:45 AM ET, run the linkedin-publisher skill."*
9:45 proposal + human approval ≈ the 10:00 AM ET posting time the manifest targets.

---

## 4. Setup Plan (Day 0, ~2–3 hours)

| # | Step | Command / action | Verify |
|---|------|------------------|--------|
| 1 | Install Hermes | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` | `hermes --version` |
| 2 | Model provider | `hermes setup` → OpenRouter + existing key (or Nous Portal trial) | one chat turn works |
| 3 | Telegram bot | Create bot via @BotFather → `hermes gateway setup` → `hermes gateway start` | message round-trip from phone |
| 4 | Manifest migration | add `status` field to `company-daily-manifest.json` (script, committed to git first) | `publish-next.sh status` shows correct counts |
| 5 | Wrapper script | write + test `publish-next.sh preview` and `skip` paths | JSON output correct |
| 6 | **Dry-run flag** | `publish-next.sh publish --dry-run <id>` prints the exact bun command without executing | reviewed once by hand |
| 7 | Hermes skill | install skill, trigger manually in TUI once with `--dry-run` | Telegram shows proposal, approval triggers dry-run |
| 8 | First real publish | manual trigger, real publish of next pending post | post live on LinkedIn, URN in log, status flipped |
| 9 | Arm the cron | create the weekday 9:45 ET automation | next morning fires |

## 5. Pilot Week (Days 1–5)

- Mon–Fri: approve (or edit/skip) from phone. Track per day: time-to-approve, any failure, any hallucinated command attempt.
- Wed checkpoint: if ≥1 unauthorized command attempt or ≥2 failed publishes → pause, reassess.
- Friday: review `publish-log.jsonl` + LinkedIn analytics → go/no-go.

## 6. Success & Kill Criteria

**Graduate to production if:** 5/5 posts published correctly, approval loop felt easier than terminal, zero security incidents.
**Kill if any:** Hermes attempts commands outside the wrapper; >1 morning the proposal didn't arrive; total babysitting time exceeds what `/schedule` in Claude Code would cost; model spend >$10/week for this single loop.

**If killed:** the wrapper script + manifest `status` field survive — they're equally useful from Claude Code `/schedule` routines, so the work isn't wasted.

## 7. Security Constraints (non-negotiable)

1. **Command approval ON** in Hermes for everything except `publish-next.sh` (allowlist exactly one path).
2. Hermes gets **no access** to `.env.local` contents — the wrapper sources what it needs; the skill prompt never echoes tokens.
3. Telegram bot is private: restrict gateway to your Telegram user ID only (set during `hermes gateway setup`).
4. The LinkedIn Playwright session dir stays `chmod 700`; Hermes runs as the same user (acceptable for pilot; isolate via Docker backend if graduating).
5. Manifest edits go through the wrapper only — git tracks the file, so any corruption is one `git checkout` away.

## 8. Costs

| Item | Estimate |
|------|----------|
| Hermes runtime | $0 (MIT, this box) |
| Model (OpenRouter, ~10 short turns/day) | $1–5 for the week, model-dependent |
| Telegram | $0 |
| Setup time | ~3 hrs Day 0, ~10 min/day after |

## 9. Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| LinkedIn browser session expires mid-week (first-comment step fails) | Medium | API post still succeeds; wrapper logs comment failure separately; re-run `LinkedInPublish.ts login` once |
| Hermes model misparses approval intent | Low–Med | Skill requires literal "approve"/"skip"/"edit:" prefixes; anything else → re-ask |
| Cron double-fire / duplicate post | Low | Wrapper idempotency on post id |
| Hermes install conflicts with PAI/Claude Code tooling on this box | Low | Hermes lives in `~/.hermes`, separate process; no shared config |
| LinkedIn API token expiry (60-day tokens) | Check Day 0 | `LinkedInPublish.ts verify` during setup; refresh if <2 weeks left |

## 10. Graduation Path (post-pilot, not in scope)

- Move to Docker backend or dedicated VPS with synced session
- Second cron for personal-profile manifest (`manifest.json`)
- Hermes drafts *new* micro-posts from blog MDX (would port MicroBlog skill rules)
- Weekly analytics digest to Telegram (post URNs → LinkedIn API stats)
