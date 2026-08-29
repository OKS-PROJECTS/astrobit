import { seeded } from "../lib/cx";
import { avatarUrl, email, person } from "./app";

const pick = (arr, i) => arr[i % arr.length];
const date = (i, spread = 90, back = true) => {
  const d = new Date(2026, 7, 29);
  d.setDate(d.getDate() + (back ? -1 : 1) * seeded(i, spread, 3));
  return d.toISOString().slice(0, 10);
};

/* --------------------------- Roles & permissions --------------------------- */
export const ROLES_LIST = [
  { id: "ROLE-1", name: "Owner", members: 1, scope: "Full access", updated: "2025-11-02", locked: true },
  { id: "ROLE-2", name: "Admin", members: 9, scope: "Manage workspace & billing", updated: "2026-06-18", locked: false },
  { id: "ROLE-3", name: "Manager", members: 22, scope: "Manage team & projects", updated: "2026-07-30", locked: false },
  { id: "ROLE-4", name: "Editor", members: 41, scope: "Create & edit content", updated: "2026-08-11", locked: false },
  { id: "ROLE-5", name: "Analyst", members: 17, scope: "Read + export reports", updated: "2026-08-19", locked: false },
  { id: "ROLE-6", name: "Viewer", members: 63, scope: "Read only", updated: "2026-05-04", locked: false },
];

export const PERMISSIONS_LIST = [
  "Dashboards", "Reports", "Users", "Billing", "Projects", "CRM", "Ecommerce", "Settings", "API keys", "Integrations",
].map((area, i) => ({
  id: `PERM-${i + 1}`,
  area,
  owner: true,
  admin: true,
  manager: i % 3 !== 0,
  editor: i % 2 === 0,
  viewer: i > 6,
}));

export const TEAMS_LIST = ["Growth", "Platform", "Design", "Revenue", "Support", "Data", "People", "Security"].map((name, i) => ({
  id: `TEAM-${i + 1}`,
  name,
  lead: person(i + 2),
  leadAvatar: avatarUrl(i + 2),
  members: 4 + seeded(i, 18, 1),
  projects: 1 + seeded(i, 6, 4),
  created: date(i, 500),
}));

export const DEPARTMENTS_LIST = ["Engineering", "Design", "Sales", "Marketing", "Operations", "People", "Finance", "Support"].map((name, i) => ({
  id: `DEPT-${i + 1}`,
  name,
  head: person(i + 5),
  headcount: 6 + seeded(i, 40, 2),
  openRoles: seeded(i, 5, 3),
  budget: 120000 + seeded(i, 40, 1) * 12000,
}));

export const ACTIVITY_LOGS = Array.from({ length: 40 }, (_, i) => ({
  id: `LOG-${9000 + i}`,
  actor: person(i),
  actorAvatar: avatarUrl(i),
  action: pick(
    ["signed in", "updated billing", "invited a teammate", "exported a report", "changed a role", "deleted a project", "rotated an API key", "updated settings"],
    seeded(i, 8, 1)
  ),
  ip: `${10 + seeded(i, 240, 2)}.0.${seeded(i, 240, 3)}.${seeded(i, 240, 4)}`,
  device: pick(["macOS · Chrome", "Windows · Edge", "iOS · Safari", "Linux · Firefox"], seeded(i, 4, 5)),
  when: pick(["Just now", "8m ago", "1h ago", "3h ago", "Yesterday", "2d ago"], seeded(i, 6, 6)),
}));

/* ------------------------------- HR datasets ------------------------------- */
export const ATTENDANCE = Array.from({ length: 40 }, (_, i) => ({
  id: `ATT-${i + 1}`,
  name: person(i + 4),
  avatar: avatarUrl(i + 4),
  date: date(i, 20),
  clockIn: `0${8 + (i % 2)}:${String(seeded(i, 59, 1)).padStart(2, "0")}`,
  clockOut: `1${7 + (i % 3)}:${String(seeded(i, 59, 2)).padStart(2, "0")}`,
  hours: (7.5 + seeded(i, 20, 3) / 10).toFixed(1),
  status: pick(["On time", "On time", "Late", "Remote", "Absent"], seeded(i, 5, 4)),
}));

export const LEAVE_REQUESTS = Array.from({ length: 32 }, (_, i) => ({
  id: `LEV-${400 + i}`,
  name: person(i + 6),
  avatar: avatarUrl(i + 6),
  type: pick(["Annual", "Sick", "Parental", "Unpaid", "Study"], seeded(i, 5, 1)),
  from: date(i, 40, false),
  days: 1 + seeded(i, 10, 2),
  status: pick(["Pending", "Approved", "Approved", "Rejected"], seeded(i, 4, 3)),
  approver: person(i + 12),
}));

export const PAYROLL = Array.from({ length: 38 }, (_, i) => ({
  id: `PAY-${5100 + i}`,
  name: person(i + 4),
  avatar: avatarUrl(i + 4),
  department: pick(["Engineering", "Design", "Sales", "Marketing", "Operations", "Finance"], seeded(i, 6, 1)),
  gross: 5200 + seeded(i, 40, 2) * 220,
  tax: 1100 + seeded(i, 20, 3) * 90,
  net: 0,
  status: pick(["Paid", "Paid", "Processing", "Scheduled"], seeded(i, 4, 4)),
}));
PAYROLL.forEach((p) => (p.net = p.gross - p.tax));

export const RECRUITMENT = Array.from({ length: 26 }, (_, i) => ({
  id: `JOB-${200 + i}`,
  role: pick(
    ["Senior Frontend Engineer", "Product Designer", "Account Executive", "Data Analyst", "DevOps Engineer", "Content Lead", "Support Specialist", "Engineering Manager"],
    seeded(i, 8, 1)
  ),
  department: pick(["Engineering", "Design", "Sales", "Marketing", "Operations", "Support"], seeded(i, 6, 2)),
  location: pick(["Remote", "Berlin", "Lisbon", "Austin", "Singapore"], seeded(i, 5, 3)),
  applicants: 4 + seeded(i, 60, 4),
  stage: pick(["Open", "Screening", "Interviewing", "Offer", "Closed"], seeded(i, 5, 5)),
  posted: date(i, 90),
}));

/* --------------------------- Ecommerce datasets --------------------------- */
export const CATEGORIES_LIST = ["Audio", "Lighting", "Bags", "Wearables", "Peripherals", "Furniture", "Home", "Accessories", "Outdoor", "Office"].map((name, i) => ({
  id: `CAT-${i + 1}`,
  name,
  products: 6 + seeded(i, 30, 1),
  revenue: 12000 + seeded(i, 40, 2) * 4200,
  visibility: pick(["Visible", "Visible", "Hidden"], seeded(i, 3, 3)),
}));

export const REVIEWS = Array.from({ length: 36 }, (_, i) => ({
  id: `REV-${700 + i}`,
  product: pick(["Halo Wireless Earbuds", "Lumen Desk Lamp", "Trek 30L Daypack", "Klack Mechanical Keyboard", "Drift Office Chair", "Ember Travel Mug"], seeded(i, 6, 1)),
  customer: person(i + 3),
  avatar: avatarUrl(i + 3),
  rating: 2 + seeded(i, 4, 2),
  title: pick(["Exactly as described", "Great value", "Shipping was slow", "Would buy again", "Not for me", "Impressive build quality"], seeded(i, 6, 4)),
  status: pick(["Published", "Published", "Pending", "Flagged"], seeded(i, 4, 5)),
  date: date(i, 60),
}));

export const INVENTORY = Array.from({ length: 40 }, (_, i) => ({
  id: `AB-${1000 + i * 7}`,
  name: pick(["Halo Wireless Earbuds", "Lumen Desk Lamp", "Trek 30L Daypack", "Klack Mechanical Keyboard", "Drift Office Chair", "Ember Travel Mug", "Nimbus Air Purifier", "Vega Standing Desk"], i),
  warehouse: pick(["Berlin DC", "Austin DC", "Singapore DC"], seeded(i, 3, 1)),
  onHand: seeded(i, 400, 2),
  reserved: seeded(i, 60, 3),
  reorderAt: 40 + seeded(i, 60, 4),
  status: ["Healthy", "Healthy", "Low", "Critical"][seeded(i, 4, 5)],
}));

export const COUPONS = Array.from({ length: 24 }, (_, i) => ({
  id: `CPN-${100 + i}`,
  code: `AB${["SAVE", "WELCOME", "SUMMER", "VIP", "FLASH", "BUNDLE"][seeded(i, 6, 1)]}${10 + seeded(i, 40, 2)}`,
  discount: `${5 + seeded(i, 40, 3)}%`,
  used: seeded(i, 400, 4),
  limit: 500,
  expires: date(i, 120, false),
  status: pick(["Active", "Active", "Scheduled", "Expired"], seeded(i, 4, 5)),
}));

export const PROMOTIONS = Array.from({ length: 18 }, (_, i) => ({
  id: `PRM-${50 + i}`,
  name: pick(["Spring Refresh", "Back to Work", "Weekend Flash", "Bundle & Save", "Clearance", "New Arrival Boost"], seeded(i, 6, 1)),
  channel: pick(["Site-wide", "Email", "Marketplace", "App only"], seeded(i, 4, 2)),
  lift: `+${8 + seeded(i, 40, 3)}%`,
  revenue: 8000 + seeded(i, 40, 4) * 2600,
  status: pick(["Running", "Running", "Scheduled", "Ended"], seeded(i, 4, 5)),
}));

export const WISHLIST = Array.from({ length: 30 }, (_, i) => ({
  id: `WL-${300 + i}`,
  customer: person(i + 2),
  avatar: avatarUrl(i + 2),
  product: pick(["Halo Wireless Earbuds", "Vega Standing Desk", "Klack Mechanical Keyboard", "Drift Office Chair", "Nimbus Air Purifier"], seeded(i, 5, 1)),
  price: 40 + seeded(i, 30, 2) * 12,
  added: date(i, 45),
  inStock: seeded(i, 4, 3) !== 0,
}));

/* --------------------------- Logistics datasets --------------------------- */
export const FLEET = Array.from({ length: 22 }, (_, i) => ({
  id: `VEH-${70 + i}`,
  plate: `AB-${1000 + seeded(i, 8000, 1)}`,
  type: pick(["Cargo van", "Box truck", "Semi", "EV van"], seeded(i, 4, 2)),
  driver: person(i + 7),
  region: pick(["North", "South", "East", "West", "Central"], seeded(i, 5, 3)),
  status: pick(["Available", "On route", "On route", "Maintenance"], seeded(i, 4, 4)),
  mileage: `${12 + seeded(i, 80, 5)}k mi`,
}));

export const WAREHOUSES = ["Berlin DC", "Austin DC", "Singapore DC", "Lisbon Hub", "Toronto Hub"].map((name, i) => ({
  id: `WH-${i + 1}`,
  name,
  capacity: `${60 + seeded(i, 35, 1)}%`,
  skus: 800 + seeded(i, 40, 2) * 120,
  staff: 8 + seeded(i, 30, 3),
  status: pick(["Operational", "Operational", "Near capacity"], seeded(i, 3, 4)),
}));

export const ROUTES_LIST = Array.from({ length: 20 }, (_, i) => ({
  id: `RTE-${400 + i}`,
  name: `${pick(["Berlin", "Munich", "Hamburg", "Cologne"], seeded(i, 4, 1))} → ${pick(["Prague", "Vienna", "Zurich", "Amsterdam"], seeded(i, 4, 2))}`,
  stops: 3 + seeded(i, 8, 3),
  distance: `${180 + seeded(i, 600, 4)} km`,
  eta: `${4 + seeded(i, 8, 5)}h ${seeded(i, 59, 6)}m`,
  status: pick(["Optimised", "Optimised", "Needs review"], seeded(i, 3, 7)),
}));

/* --------------------------- Marketing datasets --------------------------- */
export const CAMPAIGNS = Array.from({ length: 28 }, (_, i) => ({
  id: `CMP-${600 + i}`,
  name: pick(
    ["Autumn Launch", "Referral Push", "Win-back Q3", "Feature Announce", "Webinar Series", "Holiday Teaser", "Onboarding Drip", "Upgrade Nudge"],
    seeded(i, 8, 1)
  ),
  channel: pick(["Email", "SMS", "Paid social", "Paid search", "Display"], seeded(i, 5, 2)),
  audience: 2000 + seeded(i, 40, 3) * 1800,
  ctr: `${(1 + seeded(i, 60, 4) / 10).toFixed(1)}%`,
  spend: 1200 + seeded(i, 40, 5) * 400,
  status: pick(["Live", "Live", "Scheduled", "Paused", "Completed"], seeded(i, 5, 6)),
}));

export const SEGMENTS = ["High-value", "Trial users", "Churn risk", "Newsletter", "Enterprise", "Dormant", "Power users", "Free plan"].map((name, i) => ({
  id: `SEG-${i + 1}`,
  name,
  size: 400 + seeded(i, 40, 1) * 320,
  growth: `${seeded(i, 2, 2) ? "+" : "−"}${1 + seeded(i, 12, 3)}%`,
  updated: pick(["Live", "1h ago", "Today", "Yesterday"], seeded(i, 4, 4)),
}));

export const LANDING_PAGES = Array.from({ length: 16 }, (_, i) => ({
  id: `LP-${80 + i}`,
  name: pick(["Product tour", "Pricing", "Webinar signup", "Free trial", "Case study", "Compare"], seeded(i, 6, 1)),
  visits: 800 + seeded(i, 40, 2) * 900,
  conv: `${(2 + seeded(i, 80, 3) / 10).toFixed(1)}%`,
  status: pick(["Published", "Published", "Draft", "A/B test"], seeded(i, 4, 4)),
  updated: date(i, 60),
}));

/* --------------------------- Account datasets --------------------------- */
export const CONNECTED_APPS = [
  { id: "APP-1", name: "Slack", scope: "Notifications", connected: "2026-04-11", status: "Connected" },
  { id: "APP-2", name: "Google Workspace", scope: "SSO, Calendar", connected: "2025-12-02", status: "Connected" },
  { id: "APP-3", name: "GitHub", scope: "Deploy status", connected: "2026-06-20", status: "Connected" },
  { id: "APP-4", name: "Stripe", scope: "Billing sync", connected: "2026-01-15", status: "Connected" },
  { id: "APP-5", name: "Zapier", scope: "Automations", connected: "2026-07-29", status: "Needs re-auth" },
  { id: "APP-6", name: "Figma", scope: "Design embeds", connected: "—", status: "Available" },
];

export const API_KEYS = Array.from({ length: 8 }, (_, i) => ({
  id: `KEY-${i + 1}`,
  label: pick(["Production", "Staging", "CI pipeline", "Analytics export", "Mobile app", "Partner sync"], i),
  prefix: `ab_live_${["a4f", "9c1", "77b", "e02", "5da", "b19", "3fc", "8e7"][i]}…`,
  created: date(i, 400),
  lastUsed: pick(["2m ago", "1h ago", "Yesterday", "3d ago", "Never"], seeded(i, 5, 2)),
  status: pick(["Active", "Active", "Revoked"], seeded(i, 3, 3)),
}));

export const NOTIFICATIONS_LIST = Array.from({ length: 30 }, (_, i) => ({
  id: `NTF-${1000 + i}`,
  title: pick(
    [
      "Weekly revenue report is ready",
      "A payment failed for Cobalt Retail",
      "New teammate joined the Growth team",
      "Deployment to production succeeded",
      "Storage is at 82% of your plan",
      "3 support tickets breached SLA",
      "Campaign 'Autumn Launch' finished",
    ],
    seeded(i, 7, 1)
  ),
  category: pick(["Billing", "System", "Team", "Deploys", "Reports"], seeded(i, 5, 2)),
  when: pick(["12m ago", "48m ago", "2h ago", "5h ago", "Yesterday", "2d ago"], seeded(i, 6, 3)),
  read: seeded(i, 3, 4) !== 0,
}));

/* --------------------------- Budget / finance --------------------------- */
export const BUDGET_LINES = ["Payroll", "Infrastructure", "Marketing", "Travel", "Software", "Office", "Contractors", "Legal"].map((name, i) => ({
  id: `BUD-${i + 1}`,
  category: name,
  budget: 20000 + seeded(i, 40, 1) * 8000,
  spent: 0,
  status: "",
}));
BUDGET_LINES.forEach((b, i) => {
  b.spent = Math.round(b.budget * (0.5 + seeded(i, 60, 2) / 120));
  const ratio = b.spent / b.budget;
  b.status = ratio > 1 ? "Over" : ratio > 0.9 ? "At risk" : "On track";
});

export { email, person };
