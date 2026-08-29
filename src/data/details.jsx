import { CheckCircle2, CreditCard, FileText, Mail } from "lucide-react";
import { StatusChip } from "../Components/ui";
import { money } from "../lib/cx";

const crumb = (trail, current) => ({ trail: trail.map((t) => ({ label: t })), current });

export const DETAIL_CONFIGS = {
  "/crm/customers/detail": {
    title: "Northwind Labs",
    subtitle: "Enterprise account · North America",
    breadcrumb: crumb(["CRM", "Customers"], "Northwind Labs"),
    stats: [
      { label: "MRR", value: money(4800), delta: 6 },
      { label: "Lifetime value", value: money(58600), delta: 12 },
      { label: "Open tickets", value: "2", delta: -1 },
      { label: "Health score", value: "82", delta: 3 },
    ],
    sections: [
      {
        title: "Account details",
        rows: [
          { label: "Primary contact", value: "Priya Raman" },
          { label: "Email", value: "hello@northwindlabs.com" },
          { label: "Plan", value: <StatusChip status="Enterprise" /> },
          { label: "Status", value: <StatusChip status="Active" /> },
          { label: "Region", value: "North America" },
          { label: "Customer since", value: "March 2024" },
          { label: "Renewal", value: "March 2026", full: true },
        ],
      },
      {
        title: "Recent invoices",
        rows: [
          { label: "INV-2026-0112", value: `${money(4800)} · Paid` },
          { label: "INV-2026-0098", value: `${money(4800)} · Paid` },
          { label: "INV-2026-0081", value: `${money(4800)} · Paid` },
        ],
      },
    ],
    aside: [
      {
        title: "Summary",
        rows: [
          { label: "Seats used", value: "142 / 200" },
          { label: "Contract", value: "Annual" },
          { label: "Owner", value: "Theo Lindqvist" },
        ],
      },
    ],
    activity: [
      { id: "d1", icon: CreditCard, tone: "success", title: "Invoice INV-2026-0112 paid.", time: "2 days ago" },
      { id: "d2", icon: Mail, tone: "info", title: "Quarterly business review scheduled.", time: "1 week ago" },
      { id: "d3", icon: CheckCircle2, tone: "primary", title: "Upgraded from Scale to Enterprise.", time: "3 weeks ago" },
      { id: "d4", icon: FileText, tone: "default", title: "Contract renewed for 12 months.", time: "1 month ago" },
    ],
  },

  "/ecommerce/orders/detail": {
    title: "Order #AB48231",
    subtitle: "Placed 24 Aug 2026 · Online store",
    breadcrumb: crumb(["Ecommerce", "Orders"], "#AB48231"),
    stats: [
      { label: "Order total", value: money(268.4, { decimals: 2 }) },
      { label: "Items", value: "4" },
      { label: "Shipping", value: money(12, { decimals: 2 }) },
      { label: "Status", value: "Shipped" },
    ],
    sections: [
      {
        title: "Items",
        rows: [
          { label: "Halo Wireless Earbuds", value: "1 × $89.00" },
          { label: "Lumen Desk Lamp", value: "1 × $54.00" },
          { label: "Trek 30L Daypack", value: "2 × $56.70" },
        ],
      },
      {
        title: "Customer & shipping",
        rows: [
          { label: "Customer", value: "Mara Devlin" },
          { label: "Email", value: "mara.devlin@astrobit.app" },
          { label: "Ship to", value: "128 Maple Street, Chicago, IL" },
          { label: "Carrier", value: "Astro Freight" },
        ],
      },
    ],
    aside: [
      { title: "Payment", rows: [{ label: "Method", value: "Card ···· 4218" }, { label: "Captured", value: money(268.4, { decimals: 2 }) }, { label: "Status", value: "Paid" }] },
    ],
    activity: [
      { id: "o1", icon: CheckCircle2, tone: "info", title: "Marked as shipped.", time: "1 day ago" },
      { id: "o2", icon: CreditCard, tone: "success", title: "Payment captured.", time: "5 days ago" },
      { id: "o3", icon: FileText, tone: "default", title: "Order placed.", time: "5 days ago" },
    ],
  },

  "/users/profile": {
    title: "Nadia Okafor",
    subtitle: "Workspace admin · Growth team",
    breadcrumb: crumb(["User Management"], "My Profile"),
    stats: [
      { label: "Projects", value: "9" },
      { label: "Tasks done", value: "241", delta: 12 },
      { label: "Reports", value: "18" },
      { label: "Member since", value: "2023" },
    ],
    sections: [
      {
        title: "Profile",
        rows: [
          { label: "Full name", value: "Nadia Okafor" },
          { label: "Email", value: "nadia@astrobit.app" },
          { label: "Role", value: <StatusChip status="Admin" /> },
          { label: "Team", value: "Growth" },
          { label: "Location", value: "Lisbon, PT" },
          { label: "Timezone", value: "WET (UTC+0)" },
        ],
      },
    ],
    aside: [
      { title: "Access", rows: [{ label: "2FA", value: "Enabled" }, { label: "API keys", value: "2 active" }, { label: "Sessions", value: "3 devices" }] },
    ],
    activity: [
      { id: "u1", name: "Nadia Okafor", title: "Published the Q3 revenue report.", time: "12m ago" },
      { id: "u2", name: "Nadia Okafor", title: "Invited 3 teammates to the workspace.", time: "5h ago" },
      { id: "u3", name: "Nadia Okafor", title: "Updated billing details.", time: "2d ago" },
    ],
  },
};

DETAIL_CONFIGS["/account/profile"] = { ...DETAIL_CONFIGS["/users/profile"], breadcrumb: crumb(["Account"], "Profile") };
