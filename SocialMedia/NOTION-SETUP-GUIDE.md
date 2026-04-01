# Notion Content Review Board — Setup Guide

## Step 1: Create a New Notion Database

In your Notion workspace, create a new **Board View** database called "Social Media Content Queue"

## Step 2: Add These Properties (Columns)

| Property | Type | Options |
|----------|------|---------|
| **Post Title** | Title | (default) |
| **Status** | Select | Draft, In Review, Approved, Scheduled, Posted, Needs Edit |
| **Platform** | Multi-select | LinkedIn, Instagram, X/Twitter |
| **Post Type** | Select | Carousel, Text+Image, Poll, Reel, Thread |
| **Scheduled Date** | Date | Date + time |
| **Image** | Files & Media | Upload the image file |
| **Caption** | Rich Text | Full post text with hashtags |
| **Advocacy Version** | Rich Text | Contributor post text |
| **Source Blog** | Select | THINK-MAS, MAS-ADMIN, MAS-INTEGRATION, etc. |
| **Reviewer** | Person | Assign team member |
| **Approved By** | Person | Who approved |
| **Feedback** | Rich Text | Review comments |
| **Posted URL** | URL | Live link after posting |
| **Pillar** | Select | Technical, Migration, AI/Predict, Opinion, Community |

## Step 3: Set Up Board Columns

Create a **Board View** grouped by **Status**:

```
┌─────────┐  ┌───────────┐  ┌──────────┐  ┌───────────┐  ┌────────┐
│  DRAFT  │  │ IN REVIEW │  │ APPROVED │  │ SCHEDULED │  │ POSTED │
│         │  │           │  │          │  │           │  │        │
│ Post 5  │  │ Post 3    │  │ Post 2   │  │ Post 1    │  │        │
│ Post 6  │  │ Post 4    │  │          │  │           │  │        │
│ Post 7  │  │           │  │          │  │           │  │        │
└─────────┘  └───────────┘  └──────────┘  └───────────┘  └────────┘

 Drag cards →  across columns  →  as they progress  →  through workflow
```

## Step 4: Create Views

| View | Type | Filter | Purpose |
|------|------|--------|---------|
| **Board** | Board (by Status) | None | Main workflow view |
| **Calendar** | Calendar (by Scheduled Date) | Status = Scheduled or Posted | See posting schedule |
| **This Week** | Table | Scheduled Date = This Week | Quick view of what's coming up |
| **Needs Review** | Table | Status = In Review | What needs your attention |
| **By Platform** | Board (by Platform) | None | See balance across LinkedIn/IG/X |

## Step 5: The Review Process in Notion

### For each new post:

1. **I create content** → You (or I) add a card to the "Draft" column with:
   - Post title
   - Image uploaded
   - Caption in rich text
   - Advocacy version
   - Source blog tagged
   - Pillar tagged

2. **Move to "In Review"** → Assign a reviewer
   - Reviewer opens the card
   - Sees image + caption together
   - Leaves feedback in the Feedback field
   - If good → drags to "Approved"
   - If needs changes → drags to "Needs Edit" with notes

3. **"Approved" → "Scheduled"** → Set the date/time
   - Copy caption to your scheduling tool (Buffer/native LinkedIn)
   - Upload image
   - Set the publish time
   - Update the card with the scheduled date

4. **"Scheduled" → "Posted"** → After it goes live
   - Paste the live URL
   - Track engagement in comments

### For contributors:
- Each card has an "Advocacy Version" field
- Contributors check their version, customize the opening line
- Post from personal profile 1-2 hours after company post

---

## Step 6: Automation Ideas (Optional)

### With Notion Automations (built-in):
- **When status changes to "In Review"** → Send notification to reviewer
- **When status changes to "Approved"** → Move scheduled date to next available slot

### With Zapier/Make (external):
- **When status = "Scheduled" + date = today** → Send Slack reminder to publish
- **When status = "Posted"** → Log to a Google Sheet for analytics

---

## Step 7: Connect to a Scheduling Tool

### Option A: Buffer (Recommended for Small Teams)

| Feature | Free | Essentials ($6/mo) |
|---------|------|-------------------|
| LinkedIn scheduling | 3 channels | Unlimited |
| Instagram scheduling | 3 channels | Unlimited |
| Posts per channel | 10 queued | Unlimited |
| Team members | 1 | 1 |
| Approval workflow | No | No (need Team plan) |
| Analytics | Basic | Full |

**Best for:** Solo or small team. Queue posts with images. Free tier is enough to start.

### Option B: Later (Best for Visual Preview)

| Feature | Free | Growth ($25/mo) |
|---------|------|----------------|
| Visual content calendar | Yes | Yes |
| LinkedIn + Instagram | 1 profile each | 3 each |
| Posts per profile | 5/mo | 150/mo |
| Preview grid | Yes | Yes |
| Team collaboration | No | Yes |
| Approval workflow | No | Yes |

**Best for:** Visual preview of how posts look before publishing. Instagram grid preview is excellent.

### Option C: LinkedIn Native Scheduling

**Cost:** Free
**How:** When creating a post on LinkedIn, click the clock icon to schedule for a future date/time.
**Limitation:** No approval workflow, no team collaboration, one post at a time.

**Best for:** If you don't want any external tools. Just schedule directly on LinkedIn.

### Our Recommendation:

**Start with:** Notion (review/approval) + LinkedIn Native Scheduling (free publishing)

**Upgrade to:** Notion + Buffer Essentials ($6/mo) when you want to queue multiple posts across LinkedIn + Instagram simultaneously.

---

## Quick Notion Template

Copy this into a new Notion page to get started immediately:

### Card Template (copy for each post):

```
📝 [Post Title]

Status: 🟡 Draft
Platform: LinkedIn
Type: Text + Image
Pillar: Technical Deep-Dive
Source: THINK-MAS Part 1
Scheduled: [Date] at 10:00 AM ET

---

📸 IMAGE:
[Upload image here]

---

✍️ CAPTION:
[Paste full caption with hashtags]

---

👥 ADVOCACY VERSION (for contributors):
[Paste contributor version]

---

📋 REVIEW:
Reviewer: @[name]
Feedback:
Approved by:
Posted URL:
```
