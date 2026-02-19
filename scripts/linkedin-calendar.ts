#!/usr/bin/env npx tsx
/**
 * LinkedIn Content Calendar CLI
 *
 * Usage:
 *   npx tsx scripts/linkedin-calendar.ts              # Show dashboard
 *   npx tsx scripts/linkedin-calendar.ts next          # Show next post to publish
 *   npx tsx scripts/linkedin-calendar.ts week 2        # Show Week 2 posts
 *   npx tsx scripts/linkedin-calendar.ts schedule       # Assign real dates starting from a date
 *   npx tsx scripts/linkedin-calendar.ts publish <id>   # Mark a post as published
 *   npx tsx scripts/linkedin-calendar.ts status         # Summary stats
 */

import * as fs from "fs";
import * as path from "path";

const CALENDAR_PATH = path.join(__dirname, "../linkedin-posts/content-calendar.json");

interface Post {
  id: string;
  series: string;
  title: string;
  type: string;
  file: string;
  has_pdf: boolean;
  character_count: number;
  hashtags: string[];
  schedule: {
    week: number;
    day_of_week: string;
    time: string;
    tier: number;
  };
  status: "draft" | "scheduled" | "published";
  scheduled_date: string | null;
  published_date: string | null;
  linkedin_url: string | null;
  notes: string;
}

interface Calendar {
  version: string;
  generated: string;
  series: Array<{
    name: string;
    slug: string;
    total_posts: number;
    start_date: string | null;
    status: string;
  }>;
  posts: Post[];
}

function loadCalendar(): Calendar {
  const raw = fs.readFileSync(CALENDAR_PATH, "utf-8");
  return JSON.parse(raw);
}

function saveCalendar(cal: Calendar): void {
  fs.writeFileSync(CALENDAR_PATH, JSON.stringify(cal, null, 2) + "\n");
}

const TYPE_ICONS: Record<string, string> = {
  hook: "🪝",
  "hot-take": "🔥",
  faq: "❓",
  carousel: "🎠",
  contrast: "⚖️",
  listicle: "📋",
  thread: "🧵",
};

const STATUS_ICONS: Record<string, string> = {
  draft: "⬜",
  scheduled: "📅",
  published: "✅",
};

function dashboard(cal: Calendar): void {
  console.log("\n📊 LINKEDIN CONTENT CALENDAR\n");

  for (const series of cal.series) {
    const seriesPosts = cal.posts.filter((p) => p.series === series.slug);
    const published = seriesPosts.filter((p) => p.status === "published").length;
    const scheduled = seriesPosts.filter((p) => p.status === "scheduled").length;
    const draft = seriesPosts.filter((p) => p.status === "draft").length;

    console.log(`━━━ ${series.name} ━━━`);
    console.log(`    ${published} published | ${scheduled} scheduled | ${draft} draft | ${seriesPosts.length} total`);
    if (series.start_date) {
      console.log(`    Start: ${series.start_date}`);
    }
    console.log();

    // Group by week
    const weeks = new Map<number, Post[]>();
    for (const post of seriesPosts) {
      const w = post.schedule.week;
      if (!weeks.has(w)) weeks.set(w, []);
      weeks.get(w)!.push(post);
    }

    for (const [week, posts] of [...weeks.entries()].sort((a, b) => a[0] - b[0])) {
      console.log(`  Week ${week}:`);
      for (const post of posts) {
        const icon = TYPE_ICONS[post.type] || "📝";
        const status = STATUS_ICONS[post.status] || "⬜";
        const date = post.scheduled_date || post.schedule.day_of_week;
        const pdf = post.has_pdf ? " 📄PDF" : "";
        console.log(`    ${status} ${icon} ${date.padEnd(12)} ${post.title.substring(0, 50)}${pdf}`);
        if (post.published_date) {
          console.log(`       Published: ${post.published_date}${post.linkedin_url ? " → " + post.linkedin_url : ""}`);
        }
      }
      console.log();
    }
  }
}

function showNext(cal: Calendar): void {
  // Find first unpublished post in schedule order
  const unpublished = cal.posts
    .filter((p) => p.status !== "published")
    .sort((a, b) => {
      if (a.schedule.week !== b.schedule.week) return a.schedule.week - b.schedule.week;
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return days.indexOf(a.schedule.day_of_week) - days.indexOf(b.schedule.day_of_week);
    });

  if (unpublished.length === 0) {
    console.log("\n🎉 All posts published! Time to generate the next series.\n");
    return;
  }

  const next = unpublished[0];
  const icon = TYPE_ICONS[next.type] || "📝";

  console.log("\n📌 NEXT POST TO PUBLISH\n");
  console.log(`  ${icon} ${next.title}`);
  console.log(`  Type:     ${next.type}`);
  console.log(`  Series:   ${next.series}`);
  console.log(`  Schedule: ${next.scheduled_date || `${next.schedule.day_of_week} @ ${next.schedule.time}`}`);
  console.log(`  File:     linkedin-posts/${next.file}`);
  console.log(`  Chars:    ${next.character_count}`);
  console.log(`  Tags:     ${next.hashtags.join(" ")}`);
  if (next.has_pdf) {
    console.log(`  PDF:      Yes — upload as document`);
  }
  if (next.notes) {
    console.log(`  Notes:    ${next.notes}`);
  }
  console.log(`\n  Remaining: ${unpublished.length} posts unpublished\n`);
}

function showWeek(cal: Calendar, week: number): void {
  const posts = cal.posts
    .filter((p) => p.schedule.week === week)
    .sort((a, b) => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return days.indexOf(a.schedule.day_of_week) - days.indexOf(b.schedule.day_of_week);
    });

  if (posts.length === 0) {
    console.log(`\nNo posts scheduled for Week ${week}\n`);
    return;
  }

  console.log(`\n📅 WEEK ${week} — ${posts.length} posts\n`);
  for (const post of posts) {
    const icon = TYPE_ICONS[post.type] || "📝";
    const status = STATUS_ICONS[post.status] || "⬜";
    console.log(`  ${status} ${icon} ${(post.scheduled_date || post.schedule.day_of_week).padEnd(12)} ${post.title}`);
    console.log(`     File: linkedin-posts/${post.file}`);
    if (post.has_pdf) console.log(`     📄 Upload carousel.pdf as document`);
    console.log();
  }
}

function schedulePosts(cal: Calendar, startDate: string): void {
  const start = new Date(startDate + "T00:00:00");
  const dayMap: Record<string, number> = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
  };

  for (const post of cal.posts) {
    if (post.status === "published") continue;

    // Calculate date: start + (week-1)*7 days, then find the right day
    const weekStart = new Date(start);
    weekStart.setDate(weekStart.getDate() + (post.schedule.week - 1) * 7);

    // Find the target day of week
    const targetDay = dayMap[post.schedule.day_of_week] || 2;
    const currentDay = weekStart.getDay() === 0 ? 7 : weekStart.getDay();
    const diff = targetDay - currentDay;
    const postDate = new Date(weekStart);
    postDate.setDate(postDate.getDate() + diff);

    post.scheduled_date = postDate.toISOString().split("T")[0];
    post.status = "scheduled";
  }

  // Update series start_date
  for (const series of cal.series) {
    series.start_date = startDate;
    series.status = "scheduled";
  }

  saveCalendar(cal);
  console.log(`\n📅 Scheduled ${cal.posts.filter((p) => p.status === "scheduled").length} posts starting from ${startDate}\n`);
  dashboard(cal);
}

function publishPost(cal: Calendar, postId: string, url?: string): void {
  const post = cal.posts.find((p) => p.id === postId);
  if (!post) {
    console.log(`\n❌ Post not found: ${postId}`);
    console.log(`   Available IDs: ${cal.posts.map((p) => p.id).join(", ")}\n`);
    return;
  }

  post.status = "published";
  post.published_date = new Date().toISOString().split("T")[0];
  if (url) post.linkedin_url = url;

  saveCalendar(cal);
  console.log(`\n✅ Published: ${post.title}`);
  console.log(`   Date: ${post.published_date}`);
  if (url) console.log(`   URL: ${url}`);
  console.log();
}

function showStatus(cal: Calendar): void {
  const total = cal.posts.length;
  const published = cal.posts.filter((p) => p.status === "published").length;
  const scheduled = cal.posts.filter((p) => p.status === "scheduled").length;
  const draft = cal.posts.filter((p) => p.status === "draft").length;
  const carousels = cal.posts.filter((p) => p.has_pdf).length;

  console.log("\n📊 CALENDAR STATUS\n");
  console.log(`  Total posts:    ${total}`);
  console.log(`  Published:      ${published} ✅`);
  console.log(`  Scheduled:      ${scheduled} 📅`);
  console.log(`  Draft:          ${draft} ⬜`);
  console.log(`  Carousels:      ${carousels} 🎠`);
  console.log(`  Series:         ${cal.series.length}`);
  console.log(`  Progress:       ${Math.round((published / total) * 100)}%`);

  // Type breakdown
  const types = new Map<string, number>();
  for (const post of cal.posts) {
    types.set(post.type, (types.get(post.type) || 0) + 1);
  }
  console.log("\n  By type:");
  for (const [type, count] of types) {
    const icon = TYPE_ICONS[type] || "📝";
    console.log(`    ${icon} ${type}: ${count}`);
  }
  console.log();
}

// --- Main ---
const cal = loadCalendar();
const [, , command, arg, arg2] = process.argv;

switch (command) {
  case "next":
    showNext(cal);
    break;
  case "week":
    showWeek(cal, parseInt(arg || "1"));
    break;
  case "schedule":
    if (!arg) {
      console.log("\nUsage: npx tsx scripts/linkedin-calendar.ts schedule 2026-02-24\n");
      break;
    }
    schedulePosts(cal, arg);
    break;
  case "publish":
    if (!arg) {
      console.log("\nUsage: npx tsx scripts/linkedin-calendar.ts publish mbos-01 [linkedin-url]\n");
      break;
    }
    publishPost(cal, arg, arg2);
    break;
  case "status":
    showStatus(cal);
    break;
  default:
    dashboard(cal);
    break;
}
