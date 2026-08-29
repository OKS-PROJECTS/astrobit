import { seeded } from "../lib/cx";
import { avatarUrl, email, person } from "./app";

const pick = (arr, i) => arr[i % arr.length];
const date = (i, spreadDays = 90) => {
  const d = new Date(2026, 7, 29);
  d.setDate(d.getDate() - seeded(i, spreadDays, 3));
  return d.toISOString().slice(0, 10);
};

/* ------------------------------- Users ------------------------------- */
const ROLES = ["Owner", "Admin", "Manager", "Editor", "Analyst", "Viewer"];
const USER_STATUS = ["Active", "Active", "Active", "Invited", "Suspended"];
export const USERS = Array.from({ length: 48 }, (_, i) => ({
  id: `USR-${1000 + i}`,
  name: person(i),
  avatar: avatarUrl(i + 2),
  email: email(i),
  role: pick(ROLES, seeded(i, ROLES.length, 1)),
  team: pick(["Growth", "Platform", "Design", "Revenue", "Support", "Data"], seeded(i, 6, 5)),
  status: pick(USER_STATUS, seeded(i, USER_STATUS.length, 2)),
  lastActive: pick(["Just now", "2m ago", "18m ago", "1h ago", "Yesterday", "3d ago", "Never"], seeded(i, 7, 8)),
  joined: date(i, 400),
}));

/* ----------------------------- Customers ----------------------------- */
const COMPANIES = [
  "Northwind Labs", "Cobalt Retail", "Meridian Health", "Atlas Freight", "Verdant Foods",
  "Skyline Media", "Ironoak Bank", "Lumina Studios", "Harbor & Co", "Nova Robotics",
  "Cedar Analytics", "Brightpath Edu", "Quill Software", "Tidewater Energy", "Pinecrest Group",
];
export const CUSTOMERS = Array.from({ length: 40 }, (_, i) => ({
  id: `CUS-${2200 + i}`,
  name: pick(COMPANIES, i),
  contact: person(i + 3),
  email: `hello@${pick(COMPANIES, i).toLowerCase().replace(/[^a-z]/g, "")}.com`,
  plan: pick(["Starter", "Growth", "Scale", "Enterprise"], seeded(i, 4, 6)),
  mrr: 200 + seeded(i, 40, 2) * 120,
  status: pick(["Active", "Active", "Active", "Trial", "Churned"], seeded(i, 5, 4)),
  region: pick(["North America", "Europe", "APAC", "LATAM"], seeded(i, 4, 7)),
  since: date(i, 700),
}));

/* ------------------------------ Orders ------------------------------- */
const ORDER_STATUS = ["Processing", "Shipped", "Delivered", "Delivered", "Cancelled"];
export const ORDERS = Array.from({ length: 60 }, (_, i) => ({
  id: `#AB${48210 + i}`,
  customer: person(i + 1),
  avatar: avatarUrl(i + 1),
  email: email(i + 1),
  channel: pick(["Online store", "Marketplace", "Retail partner", "Wholesale"], seeded(i, 4, 3)),
  items: 1 + seeded(i, 6, 9),
  total: 39 + seeded(i, 60, 1) * 12.5,
  status: pick(ORDER_STATUS, seeded(i, ORDER_STATUS.length, 2)),
  payment: pick(["Card", "PayPal", "Bank transfer", "Wallet"], seeded(i, 4, 8)),
  date: date(i, 60),
}));

/* ----------------------------- Products ------------------------------ */
const PRODUCTS_BASE = [
  "Halo Wireless Earbuds", "Lumen Desk Lamp", "Trek 30L Daypack", "Pulse Fitness Band",
  "Klack Mechanical Keyboard", "Drift Office Chair", "Ember Travel Mug", "Nimbus Air Purifier",
  "Vega Standing Desk", "Coil Charging Pad", "Fathom Water Bottle", "Grove Planter Set",
  "Slate Notebook", "Prism Monitor Light", "Arc Floor Lamp", "Beacon Smart Bulb",
];
const CATEGORIES = ["Audio", "Lighting", "Bags", "Wearables", "Peripherals", "Furniture", "Home", "Accessories"];
export const PRODUCTS = Array.from({ length: 42 }, (_, i) => ({
  id: `AB-${1000 + i * 7}`,
  name: i < PRODUCTS_BASE.length ? PRODUCTS_BASE[i] : `${pick(PRODUCTS_BASE, i)} v${2 + (i % 3)}`,
  category: pick(CATEGORIES, seeded(i, CATEGORIES.length, 1)),
  price: 14 + seeded(i, 30, 2) * 8,
  stock: seeded(i, 240, 4),
  sold: 40 + seeded(i, 60, 6) * 21,
  rating: (3.6 + seeded(i, 13, 8) / 10).toFixed(1),
  status: ["In stock", "In stock", "Low stock", "Out of stock"][seeded(i, 4, 3)],
}));

/* ---------------------------- Invoices ------------------------------- */
export const INVOICES = Array.from({ length: 36 }, (_, i) => ({
  id: `INV-2026-${String(100 + i).padStart(4, "0")}`,
  client: pick(COMPANIES, i),
  amount: 480 + seeded(i, 80, 1) * 95,
  issued: date(i, 120),
  due: date(i, 60),
  status: pick(["Paid", "Paid", "Pending", "Overdue", "Draft"], seeded(i, 5, 2)),
}));

/* -------------------------- Transactions ---------------------------- */
export const TRANSACTIONS = Array.from({ length: 55 }, (_, i) => ({
  id: `TXN-${90210 + i}`,
  description: pick(
    ["Subscription renewal", "One-time purchase", "Refund issued", "Payout to partner", "Ad spend", "Contractor payment", "Platform fee"],
    seeded(i, 7, 1)
  ),
  account: pick(["Operating", "Payroll", "Marketing", "Reserve"], seeded(i, 4, 5)),
  amount: (seeded(i, 2, 3) ? 1 : -1) * (85 + seeded(i, 90, 2) * 30),
  method: pick(["ACH", "Card", "Wire", "Wallet"], seeded(i, 4, 7)),
  date: date(i, 45),
  status: pick(["Completed", "Completed", "Pending", "Failed"], seeded(i, 4, 9)),
}));

/* ----------------------------- Leads -------------------------------- */
export const LEADS = Array.from({ length: 34 }, (_, i) => ({
  id: `LEAD-${700 + i}`,
  name: person(i + 5),
  avatar: avatarUrl(i + 5),
  company: pick(COMPANIES, i + 2),
  source: pick(["Website", "Referral", "Event", "Cold outreach", "Partner"], seeded(i, 5, 1)),
  value: 1200 + seeded(i, 40, 2) * 650,
  stage: pick(["New", "Qualified", "Contacted", "Proposal", "Won", "Lost"], seeded(i, 6, 4)),
  owner: person(i + 11),
  updated: pick(["Today", "Yesterday", "2d ago", "This week", "Last week"], seeded(i, 5, 6)),
}));

/* --------------------------- Projects ------------------------------- */
export const PROJECTS = Array.from({ length: 26 }, (_, i) => ({
  id: `PRJ-${300 + i}`,
  name: pick(
    ["Checkout redesign", "Mobile app v3", "Data warehouse", "Billing migration", "Design system", "Onboarding revamp", "SEO overhaul", "API gateway", "Partner portal", "Localization"],
    i
  ) + (i > 9 ? ` phase ${1 + (i % 3)}` : ""),
  lead: person(i + 2),
  progress: seeded(i, 100, 3),
  tasks: 8 + seeded(i, 40, 5),
  status: pick(["On track", "On track", "At risk", "Delayed", "Completed"], seeded(i, 5, 4)),
  due: date(i, 120),
}));

/* -------------------------- Employees ------------------------------- */
export const EMPLOYEES = Array.from({ length: 44 }, (_, i) => ({
  id: `EMP-${5100 + i}`,
  name: person(i + 4),
  avatar: avatarUrl(i + 4),
  email: email(i + 4),
  department: pick(["Engineering", "Design", "Sales", "Marketing", "Operations", "People", "Finance"], seeded(i, 7, 1)),
  title: pick(["Associate", "Specialist", "Lead", "Manager", "Director"], seeded(i, 5, 3)),
  location: pick(["Remote", "Berlin", "Lisbon", "Austin", "Singapore", "Toronto"], seeded(i, 6, 6)),
  status: pick(["Active", "Active", "Active", "On leave", "Onboarding"], seeded(i, 5, 2)),
  started: date(i, 1200),
}));

/* -------------------------- Shipments ------------------------------- */
export const SHIPMENTS = Array.from({ length: 38 }, (_, i) => ({
  id: `SHP-${74100 + i}`,
  order: `#AB${48210 + seeded(i, 60, 2)}`,
  carrier: pick(["Astro Freight", "BlueDart", "MoveOn", "RapidPost", "CargoLink"], seeded(i, 5, 1)),
  destination: pick(["Chicago, US", "Munich, DE", "Osaka, JP", "Madrid, ES", "Perth, AU", "Lyon, FR"], seeded(i, 6, 4)),
  weight: `${(2 + seeded(i, 40, 3) / 4).toFixed(1)} kg`,
  eta: date(i, -6),
  status: pick(["In transit", "In transit", "Out for delivery", "Delivered", "Delayed"], seeded(i, 5, 5)),
}));

/* --------------------------- Tickets ------------------------------- */
export const TICKETS = Array.from({ length: 40 }, (_, i) => ({
  id: `TIC-${9200 + i}`,
  subject: pick(
    ["Cannot reset password", "Invoice discrepancy", "Feature request: dark export", "Integration webhook failing", "Refund not received", "Slow dashboard load", "SSO configuration help"],
    seeded(i, 7, 1)
  ),
  requester: person(i + 6),
  priority: pick(["Low", "Medium", "High", "Urgent"], seeded(i, 4, 3)),
  assignee: person(i + 13),
  status: pick(["Open", "Open", "In progress", "Pending", "Resolved"], seeded(i, 5, 2)),
  updated: pick(["5m ago", "1h ago", "3h ago", "Yesterday", "2d ago"], seeded(i, 5, 7)),
}));
