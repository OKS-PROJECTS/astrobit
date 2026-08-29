import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import { StatusChip } from "../Components/ui";
import { money, number } from "../lib/cx";
import { MONTHS, REVENUE_TREND, multiSeries } from "./analytics";
import { CUSTOMERS } from "./entities";

const crumb = (trail, current) => ({ trail: trail.map((t) => ({ label: t })), current });

const regionRows = ["North America", "Europe", "APAC", "LATAM"].map((region, i) => ({
  region,
  accounts: 40 + i * 18,
  revenue: money(120000 - i * 22000),
  growth: <StatusChip status={i % 2 ? "In progress" : "Won"} />,
}));

export const REPORT_CONFIGS = {
  "/reports/revenue": {
    title: "Revenue report",
    subtitle: "Trailing 12 months across all channels.",
    breadcrumb: crumb(["Reports"], "Revenue Report"),
    stats: [
      { label: "Total revenue", value: money(5840000, { compact: true }), delta: 18, icon: DollarSign },
      { label: "Recurring", value: money(4120000, { compact: true }), delta: 21, icon: Wallet },
      { label: "New customers", value: number(1240), delta: 9, icon: Users },
      { label: "Net revenue retention", value: "112%", delta: 3, icon: TrendingUp },
    ],
    charts: [
      { title: "Revenue by month", type: "area", data: REVENUE_TREND, x: "month", series: [{ key: "revenue", name: "Revenue" }], dataFormat: { prefix: "$", format: "compact" }, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } },
      { title: "Revenue vs orders", type: "column", data: REVENUE_TREND, x: "month", series: [{ key: "revenue", name: "Revenue" }, { key: "orders", name: "Orders" }], legend: true, column: { radius: 4 } },
    ],
    table: {
      title: "By region",
      columns: [
        { key: "region", header: "Region", sortable: true },
        { key: "accounts", header: "Accounts", align: "right", sortable: true },
        { key: "revenue", header: "Revenue", align: "right", sortable: true },
        { key: "growth", header: "Trend" },
      ],
      rows: regionRows,
    },
  },

  "/reports/sales": {
    title: "Sales report",
    subtitle: "Pipeline and closed revenue this quarter.",
    breadcrumb: crumb(["Reports"], "Sales Report"),
    stats: [
      { label: "Closed won", value: money(1240000, { compact: true }), delta: 14, icon: DollarSign },
      { label: "Win rate", value: "31%", delta: 2, icon: TrendingUp },
      { label: "Avg. cycle", value: "24d", delta: -3, icon: TrendingUp },
      { label: "Quota attainment", value: "104%", delta: 6, icon: TrendingUp },
    ],
    charts: [
      { title: "Bookings by month", type: "bar", data: multiSeries([{ key: "bookings", base: 210000, growth: 24000, spread: 60000, offset: 2 }]).map((r) => ({ ...r })), x: "month", series: [{ key: "bookings", name: "Bookings" }], dataFormat: { prefix: "$", format: "compact" }, bar: { radius: 4 } },
      { title: "Stage conversion", type: "area", data: multiSeries([{ key: "rate", base: 22, growth: 1.2, spread: 8, offset: 5 }]), x: "month", series: [{ key: "rate", name: "Conversion %" }], line: { curve: "smooth" } },
    ],
    table: {
      title: "Top accounts",
      columns: [
        { key: "name", header: "Account", sortable: true },
        { key: "plan", header: "Plan", render: (r) => <StatusChip status={r.plan} /> },
        { key: "mrr", header: "MRR", align: "right", sortable: true, render: (r) => money(r.mrr) },
        { key: "region", header: "Region" },
      ],
      rows: CUSTOMERS.slice(0, 12),
    },
  },

  "/reports/customer": {
    title: "Customer report",
    subtitle: "Growth, retention and health.",
    breadcrumb: crumb(["Reports"], "Customer Report"),
    stats: [
      { label: "Active customers", value: number(3120), delta: 7, icon: Users },
      { label: "Churn (90d)", value: "1.8%", delta: -0.4, positiveIsGood: false, icon: TrendingUp },
      { label: "Avg. health", value: "78", delta: 2, icon: TrendingUp },
      { label: "Expansion MRR", value: money(84000, { compact: true }), delta: 15, icon: Wallet },
    ],
    charts: [
      { title: "Customers by month", type: "area", data: multiSeries([{ key: "count", base: 1800, growth: 120, spread: 200, offset: 3 }]), x: "month", series: [{ key: "count", name: "Customers" }], line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } },
      { title: "Retention cohort", type: "line", data: MONTHS.map((m, i) => ({ month: m, w4: 92 - i, w12: 80 - i })), x: "month", series: [{ key: "w4", name: "Week 4" }, { key: "w12", name: "Week 12" }], legend: true },
    ],
    table: {
      title: "Accounts at risk",
      columns: [
        { key: "name", header: "Account", sortable: true },
        { key: "region", header: "Region" },
        { key: "mrr", header: "MRR", align: "right", sortable: true, render: (r) => money(r.mrr) },
        { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: CUSTOMERS.filter((c) => c.status !== "Active").slice(0, 10),
    },
  },

  "/reports/project": {
    title: "Project report",
    subtitle: "Delivery, velocity and team load.",
    breadcrumb: crumb(["Reports"], "Project Report"),
    stats: [
      { label: "Active projects", value: "18", delta: 2, icon: TrendingUp },
      { label: "On-time delivery", value: "82%", delta: 4, icon: TrendingUp },
      { label: "Avg. cycle time", value: "12d", delta: -2, icon: TrendingUp },
      { label: "Blocked tasks", value: "7", delta: -3, positiveIsGood: false, icon: TrendingUp },
    ],
    charts: [
      { title: "Throughput per week", type: "area", data: MONTHS.map((m, i) => ({ month: m, done: 30 + i * 4 + (i % 3) * 6 })), x: "month", series: [{ key: "done", name: "Completed" }], line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } },
      { title: "Open vs closed", type: "column", data: multiSeries([{ key: "open", base: 40, growth: 2, spread: 12, offset: 1 }, { key: "closed", base: 32, growth: 3, spread: 10, offset: 4 }]), x: "month", series: [{ key: "open", name: "Open" }, { key: "closed", name: "Closed" }], legend: true, column: { radius: 4 } },
    ],
  },

  "/reports/marketing": {
    title: "Marketing report",
    subtitle: "Spend, pipeline and channel efficiency.",
    breadcrumb: crumb(["Reports"], "Marketing Report"),
    stats: [
      { label: "Spend (QTD)", value: money(116000, { compact: true }), delta: 6, positiveIsGood: false, icon: Wallet },
      { label: "MQLs", value: number(4820), delta: 12, icon: Users },
      { label: "Blended CPL", value: money(24.1, { decimals: 2 }), delta: -5, icon: TrendingUp },
      { label: "Pipeline influenced", value: money(2140000, { compact: true }), delta: 18, icon: DollarSign },
    ],
    charts: [
      { title: "Leads by channel", type: "area", data: multiSeries([{ key: "organic", base: 600, growth: 40, spread: 160, offset: 1 }, { key: "paid", base: 500, growth: 24, spread: 140, offset: 5 }]), x: "month", series: [{ key: "organic", name: "Organic" }, { key: "paid", name: "Paid" }], legend: true, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.12 } } } },
      { title: "Spend vs pipeline", type: "column", data: multiSeries([{ key: "spend", base: 9000, growth: 400, spread: 3000, offset: 2 }, { key: "pipeline", base: 140000, growth: 8000, spread: 30000, offset: 6 }]), x: "month", series: [{ key: "spend", name: "Spend" }, { key: "pipeline", name: "Pipeline" }], legend: true, dataFormat: { prefix: "$", format: "compact" }, column: { radius: 3 } },
    ],
    table: {
      title: "By channel",
      columns: [
        { key: "channel", header: "Channel", sortable: true },
        { key: "spend", header: "Spend", align: "right", sortable: true },
        { key: "leads", header: "Leads", align: "right", sortable: true },
        { key: "cpl", header: "CPL", align: "right" },
      ],
      rows: [
        { channel: "Paid search", spend: "$42,000", leads: 1820, cpl: "$23.10" },
        { channel: "Paid social", spend: "$31,500", leads: 1440, cpl: "$21.88" },
        { channel: "Organic", spend: "$0", leads: 980, cpl: "$0.00" },
        { channel: "Email", spend: "$4,200", leads: 410, cpl: "$10.24" },
        { channel: "Events", spend: "$38,000", leads: 170, cpl: "$223.53" },
      ],
    },
  },

  "/reports/custom": {
    title: "Custom builder",
    subtitle: "A saved cross-functional report.",
    breadcrumb: crumb(["Reports"], "Custom Builder"),
    stats: [
      { label: "Revenue", value: money(486200), delta: 18, icon: DollarSign },
      { label: "Active users", value: number(12480), delta: 8, icon: Users },
      { label: "Conversion", value: "3.42%", delta: 1, icon: TrendingUp },
      { label: "NRR", value: "112%", delta: 3, icon: TrendingUp },
    ],
    charts: [
      { title: "Revenue trend", type: "area", data: REVENUE_TREND, x: "month", series: [{ key: "revenue", name: "Revenue" }], dataFormat: { prefix: "$", format: "compact" }, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } },
      { title: "Sessions trend", type: "line", data: REVENUE_TREND, x: "month", series: [{ key: "sessions", name: "Sessions" }], line: { curve: "smooth" } },
    ],
    table: {
      title: "By region",
      columns: [
        { key: "region", header: "Region", sortable: true },
        { key: "accounts", header: "Accounts", align: "right", sortable: true },
        { key: "revenue", header: "Revenue", align: "right" },
        { key: "growth", header: "Trend" },
      ],
      rows: regionRows,
    },
  },

  "/finance/profit-loss": {
    title: "Profit & loss",
    subtitle: "Trailing 12 months.",
    breadcrumb: crumb(["Finance"], "Profit & Loss"),
    stats: [
      { label: "Revenue", value: money(5840000, { compact: true }), delta: 18, icon: DollarSign },
      { label: "Gross profit", value: money(3970000, { compact: true }), delta: 14, icon: Wallet },
      { label: "Operating expenses", value: money(2680000, { compact: true }), delta: 6, positiveIsGood: false, icon: TrendingUp },
      { label: "Net margin", value: "22%", delta: 2, icon: TrendingUp },
    ],
    charts: [
      { title: "Revenue vs expenses", type: "area", data: multiSeries([{ key: "revenue", base: 320000, growth: 24000, spread: 30000, offset: 1 }, { key: "expenses", base: 210000, growth: 10000, spread: 24000, offset: 5 }]), x: "month", series: [{ key: "revenue", name: "Revenue" }, { key: "expenses", name: "Expenses" }], legend: true, dataFormat: { prefix: "$", format: "compact" }, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.12 } } } },
      { title: "Net income", type: "column", data: multiSeries([{ key: "net", base: 90000, growth: 9000, spread: 20000, offset: 3 }]), x: "month", series: [{ key: "net", name: "Net" }], dataFormat: { prefix: "$", format: "compact" }, column: { radius: 4 } },
    ],
    table: {
      title: "Line items",
      columns: [
        { key: "line", header: "Line", sortable: true },
        { key: "q3", header: "Q3", align: "right" },
        { key: "q2", header: "Q2", align: "right" },
        { key: "yoy", header: "YoY" },
      ],
      rows: [
        { line: "Subscription revenue", q3: "$1.42M", q2: "$1.28M", yoy: <StatusChip status="Won" /> },
        { line: "Services revenue", q3: "$180k", q2: "$164k", yoy: <StatusChip status="Won" /> },
        { line: "Cost of revenue", q3: "$470k", q2: "$441k", yoy: <StatusChip status="In progress" /> },
        { line: "Sales & marketing", q3: "$610k", q2: "$588k", yoy: <StatusChip status="In progress" /> },
        { line: "R&D", q3: "$520k", q2: "$505k", yoy: <StatusChip status="In progress" /> },
        { line: "G&A", q3: "$240k", q2: "$233k", yoy: <StatusChip status="In progress" /> },
      ],
    },
  },

  "/finance/reports": {
    title: "Financial reports",
    subtitle: "Saved statements and exports.",
    breadcrumb: crumb(["Finance"], "Financial Reports"),
    stats: [
      { label: "Cash balance", value: money(2140000, { compact: true }), delta: 4, icon: Wallet },
      { label: "Burn (MTD)", value: money(214000), delta: 3, positiveIsGood: false, icon: TrendingUp },
      { label: "Runway", value: "18 mo", delta: 1, icon: TrendingUp },
      { label: "AR outstanding", value: money(84210), delta: -6, icon: DollarSign },
    ],
    charts: [
      { title: "Cash balance", type: "area", data: multiSeries([{ key: "cash", base: 1800000, growth: 40000, spread: 120000, offset: 2 }]), x: "month", series: [{ key: "cash", name: "Cash" }], dataFormat: { prefix: "$", format: "compact" }, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } },
      { title: "AR vs AP", type: "column", data: multiSeries([{ key: "ar", base: 80000, growth: 2000, spread: 20000, offset: 1 }, { key: "ap", base: 60000, growth: 1500, spread: 16000, offset: 4 }]), x: "month", series: [{ key: "ar", name: "Receivable" }, { key: "ap", name: "Payable" }], legend: true, dataFormat: { prefix: "$", format: "compact" }, column: { radius: 3 } },
    ],
  },

  "/marketing/analytics": {
    title: "Marketing analytics",
    subtitle: "Attribution and funnel performance.",
    breadcrumb: crumb(["Marketing"], "Analytics"),
    stats: [
      { label: "Sessions", value: number(184200), delta: 9, icon: Users },
      { label: "Signups", value: number(6420), delta: 12, icon: TrendingUp },
      { label: "Signup rate", value: "3.5%", delta: 1, icon: TrendingUp },
      { label: "Paid share", value: "44%", delta: -2, icon: TrendingUp },
    ],
    charts: [
      { title: "Sessions by source", type: "area", data: multiSeries([{ key: "organic", base: 8000, growth: 400, spread: 1600, offset: 1 }, { key: "paid", base: 6000, growth: 240, spread: 1400, offset: 5 }, { key: "referral", base: 2400, growth: 120, spread: 800, offset: 8 }]), x: "month", series: [{ key: "organic", name: "Organic" }, { key: "paid", name: "Paid" }, { key: "referral", name: "Referral" }], legend: true, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.1 } } } },
      { title: "Signup funnel", type: "bar", data: [{ step: "Visit", n: 184200 }, { step: "Signup start", n: 21400 }, { step: "Signup done", n: 6420 }, { step: "Activated", n: 3980 }], x: "step", series: [{ key: "n", name: "Users" }], bar: { radius: 4 } },
    ],
  },

  "/ecommerce/customer-analytics": {
    title: "Customer analytics",
    subtitle: "Cohorts, repeat rate and lifetime value.",
    breadcrumb: crumb(["Ecommerce"], "Customer Analytics"),
    stats: [
      { label: "Customers", value: number(28400), delta: 7, icon: Users },
      { label: "Repeat rate", value: "38%", delta: 3, icon: TrendingUp },
      { label: "Avg. LTV", value: money(214), delta: 6, icon: DollarSign },
      { label: "Avg. orders / cust.", value: "2.4", delta: 1, icon: TrendingUp },
    ],
    charts: [
      { title: "New vs returning", type: "column", data: multiSeries([{ key: "new", base: 1800, growth: 90, spread: 400, offset: 1 }, { key: "returning", base: 1100, growth: 120, spread: 300, offset: 4 }]), x: "month", series: [{ key: "new", name: "New" }, { key: "returning", name: "Returning" }], legend: true, column: { stacked: true, radius: 3 } },
      { title: "LTV trend", type: "area", data: multiSeries([{ key: "ltv", base: 160, growth: 6, spread: 30, offset: 2 }]), x: "month", series: [{ key: "ltv", name: "LTV" }], dataFormat: { prefix: "$" }, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } },
    ],
    table: {
      title: "Top customers",
      columns: [
        { key: "name", header: "Customer", sortable: true },
        { key: "region", header: "Region" },
        { key: "mrr", header: "Spend", align: "right", sortable: true, render: (r) => money(r.mrr * 3) },
        { key: "plan", header: "Tier", render: (r) => <StatusChip status={r.plan} /> },
      ],
      rows: CUSTOMERS.slice(0, 10),
    },
  },
};
