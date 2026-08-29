import { seeded } from "../lib/cx";
import { avatarUrl, person } from "./app";

/* ------------------------------- Chat ------------------------------- */
const CHAT_LINES = [
  "Can you review the latest build when you get a sec?",
  "Just pushed the fix — should be green now.",
  "Numbers for Q3 are in the shared sheet.",
  "Let's sync at 2pm about the launch.",
  "Nice work on the dashboard, it looks great.",
  "I'll take the checkout ticket.",
  "Customer replied, they're happy with the resolution.",
  "Design handoff is ready in Figma.",
  "Can we bump the meeting 30 minutes?",
  "Approved — go ahead and ship it.",
];

export const CONVERSATIONS = Array.from({ length: 9 }, (_, i) => ({
  id: `CONV-${i}`,
  name: person(i + 2),
  avatar: avatarUrl(i + 2),
  last: CHAT_LINES[(i * 3) % CHAT_LINES.length],
  time: ["now", "2m", "18m", "1h", "3h", "yesterday", "Mon", "Mon", "Sun"][i],
  unread: i < 3 ? (i + 1) : 0,
  online: i % 2 === 0,
}));

export const CHANNELS = ["general", "engineering", "design", "growth", "support", "random"].map((name, i) => ({
  id: `CH-${i}`,
  name,
  members: 8 + seeded(i, 40, 1),
  unread: i === 1 || i === 3 ? seeded(i, 9, 2) + 1 : 0,
}));

export const buildThread = (seed) =>
  Array.from({ length: 8 }, (_, i) => {
    const mine = i % 3 === 2;
    return {
      id: `M-${seed}-${i}`,
      mine,
      name: mine ? "You" : person(seed + 2),
      avatar: mine ? "https://i.pravatar.cc/120?img=47" : avatarUrl(seed + 2),
      text: CHAT_LINES[(seed + i * 2) % CHAT_LINES.length],
      time: `${9 + i}:${String(seeded(seed + i, 59, 1)).padStart(2, "0")}`,
    };
  });

/* ------------------------------- Email ------------------------------ */
const SUBJECTS = [
  "Your invoice for August is ready",
  "Re: Launch checklist",
  "New sign-up from Cobalt Retail",
  "Weekly product digest",
  "Action needed: verify your domain",
  "Design review notes",
  "Q3 board deck — draft 2",
  "Out of office: back Monday",
  "Support ticket #TIC-9241 updated",
  "You've been added to the Growth team",
  "Payment failed for Meridian Health",
  "Reminder: 1:1 with Nadia tomorrow",
];

export const EMAIL_FOLDERS = [
  { id: "inbox", name: "Inbox", count: 12 },
  { id: "starred", name: "Starred", count: 3 },
  { id: "sent", name: "Sent", count: 0 },
  { id: "drafts", name: "Drafts", count: 2 },
  { id: "archive", name: "Archive", count: 0 },
  { id: "spam", name: "Spam", count: 5 },
];

export const EMAILS = Array.from({ length: 16 }, (_, i) => ({
  id: `MAIL-${i}`,
  from: person(i + 3),
  avatar: avatarUrl(i + 3),
  subject: SUBJECTS[i % SUBJECTS.length],
  preview: CHAT_LINES[(i * 2) % CHAT_LINES.length],
  time: ["9:41", "9:12", "8:56", "Yesterday", "Yesterday", "Wed", "Wed", "Tue", "Tue", "Mon", "Mon", "Mon", "Sun", "Sun", "Sat", "Sat"][i],
  read: i > 4,
  starred: [1, 4, 9].includes(i),
  label: ["Work", "Finance", "Team", "Product", "System", "Design"][i % 6],
}));

/* ----------------------------- Contacts ---------------------------- */
export const CONTACTS = Array.from({ length: 24 }, (_, i) => ({
  id: `CT-${i}`,
  name: person(i),
  avatar: avatarUrl(i),
  role: ["Product Manager", "Engineer", "Designer", "Account Executive", "Analyst", "Support Lead"][i % 6],
  company: ["Northwind Labs", "Cobalt Retail", "Meridian Health", "Atlas Freight", "Skyline Media", "Nova Robotics"][i % 6],
  email: `${person(i).toLowerCase().replace(" ", ".")}@example.com`,
  phone: `+1 (555) 0${String(100 + i).slice(-3)}-${String(1000 + i * 7).slice(-4)}`,
  favorite: i % 5 === 0,
}));

/* ------------------------------ Notes ------------------------------ */
export const NOTES = [
  { id: "N1", title: "Launch checklist", tag: "Product", updated: "2h ago", body: "Final QA pass on checkout. Confirm analytics events fire. Prepare rollback plan. Notify support of the new flow. Schedule the announcement for 9am." },
  { id: "N2", title: "1:1 talking points", tag: "Team", updated: "Yesterday", body: "Career growth check-in. Feedback on the last sprint. Bandwidth for the migration project. Time off in October." },
  { id: "N3", title: "Pricing experiment ideas", tag: "Growth", updated: "2d ago", body: "Test annual-first toggle. Add a usage-based tier. Show savings badge on annual. Move the FAQ above the fold." },
  { id: "N4", title: "Architecture notes", tag: "Engineering", updated: "3d ago", body: "Move the report builder to a worker. Cache the dashboard queries for 60s. Split the bundle by route. Add a health endpoint." },
  { id: "N5", title: "Customer call — Meridian", tag: "Sales", updated: "1w ago", body: "They want SSO and an audit log. Renewal is in March. Champion is moving teams — find a second contact." },
  { id: "N6", title: "Reading list", tag: "Personal", updated: "2w ago", body: "Designing Data-Intensive Applications. The Mom Test. Shape Up. A Philosophy of Software Design." },
];

/* ---------------------------- File manager ---------------------------- */
export const FILES = [
  { id: "F1", name: "Brand", type: "folder", items: 24, size: "—", modified: "Aug 21" },
  { id: "F2", name: "Product", type: "folder", items: 61, size: "—", modified: "Aug 24" },
  { id: "F3", name: "Finance", type: "folder", items: 12, size: "—", modified: "Aug 12" },
  { id: "F4", name: "Q3 board deck.pdf", type: "pdf", items: null, size: "4.2 MB", modified: "Aug 27" },
  { id: "F5", name: "Dashboard mockups.fig", type: "design", items: null, size: "18.1 MB", modified: "Aug 26" },
  { id: "F6", name: "Revenue model.xlsx", type: "sheet", items: null, size: "820 KB", modified: "Aug 25" },
  { id: "F7", name: "Launch video.mp4", type: "video", items: null, size: "240 MB", modified: "Aug 23" },
  { id: "F8", name: "Logo pack.zip", type: "archive", items: null, size: "12.4 MB", modified: "Aug 20" },
  { id: "F9", name: "API notes.md", type: "doc", items: null, size: "14 KB", modified: "Aug 19" },
  { id: "F10", name: "Hero image.png", type: "image", items: null, size: "3.1 MB", modified: "Aug 18" },
];
