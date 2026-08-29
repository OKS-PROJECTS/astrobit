import { Activity, Boxes, DollarSign, Gauge, Package, ShoppingBag, Target, TrendingUp, Truck, UserPlus, Users, Wallet } from "lucide-react";
import { StatusChip, EntityCell } from "../Components/ui";
import { money, number } from "../lib/cx";
import { MONTHS, multiSeries, spark } from "./analytics";
import { CUSTOMERS, INVOICES, LEADS, PRODUCTS, PROJECTS, SHIPMENTS } from "./entities";

const crumb = (current) => ({ trail: [{ label: "Dashboards" }], current });

const rev = multiSeries([
  { key: "current", base: 30000, growth: 4800, spread: 7000, offset: 2 },
  { key: "previous", base: 26000, growth: 3600, spread: 6000, offset: 7 },
]);

export const DASHBOARD_CONFIGS = {
  "/crm/dashboard": {
    title: "CRM overview",
    subtitle: "Pipeline health, activity and win rate this quarter.",
    breadcrumb: crumb("CRM"),
    rangeLabel: "This quarter",
    kpis: [
      { label: "Pipeline value", value: money(1240000, { compact: true }), delta: 14.2, icon: Wallet, hint: "182 open deals" },
      { label: "New leads", value: number(940), delta: 8.6, icon: UserPlus, hint: "This quarter" },
      { label: "Win rate", value: "60%", delta: 5.1, icon: Target, hint: "62 deals won" },
      { label: "Avg. deal size", value: money(6820), delta: -2.4, positiveIsGood: false, icon: DollarSign, hint: "Closed this quarter" },
    ],
    mainChart: {
      title: "Pipeline by stage",
      description: "$1.24M total · 182 deals",
      type: "bar",
      data: [
        { stage: "Qualification", value: 312000 },
        { stage: "Discovery", value: 284000 },
        { stage: "Proposal", value: 268000 },
        { stage: "Negotiation", value: 224000 },
        { stage: "Closed won", value: 152000 },
      ],
      x: "stage",
      series: [{ key: "value", name: "Value" }],
      dataFormat: { prefix: "$", format: "compact" },
      bar: { radius: 4 },
    },
    donut: {
      title: "Win / loss rate",
      data: [
        { label: "Won", value: 60, color: "var(--app-ok)" },
        { label: "Lost", value: 40, color: "var(--app-bad)" },
      ],
      centerValue: "60%",
      centerLabel: "win rate",
      height: 172,
    },
    table: {
      title: "Recent leads",
      columns: [
        { key: "name", header: "Lead", render: (r) => <EntityCell name={r.name} sub={r.company} src={r.avatar} /> },
        { key: "source", header: "Source" },
        { key: "stage", header: "Stage", render: (r) => <StatusChip status={r.stage} /> },
        { key: "value", header: "Value", align: "right", render: (r) => money(r.value) },
      ],
      rows: LEADS.slice(0, 8),
    },
  },

  "/ecommerce/dashboard": {
    title: "Ecommerce overview",
    subtitle: "Sales, fulfilment and catalogue performance.",
    breadcrumb: crumb("Ecommerce"),
    kpis: [
      { label: "Revenue (30d)", value: money(486200), delta: 18.2, icon: Wallet, spark: spark(60, 22, 1) },
      { label: "Orders (30d)", value: number(4820), delta: 7.4, icon: ShoppingBag, spark: spark(48, 18, 4) },
      { label: "Conversion", value: "3.9%", delta: 0.4, icon: TrendingUp, spark: spark(40, 12, 8) },
      { label: "Return rate", value: "2.1%", delta: -0.3, positiveIsGood: false, icon: Package, spark: spark(30, 10, 6) },
    ],
    mainChart: {
      title: "Revenue — this year vs last",
      type: "area",
      data: rev,
      x: "month",
      series: [{ key: "current", name: "This year" }, { key: "previous", name: "Last year" }],
      legend: true,
      dataFormat: { prefix: "$", format: "compact" },
      line: { curve: "smooth", area: { show: true, fill: { opacity: 0.14 } } },
    },
    donut: {
      title: "Sales by channel",
      data: [
        { label: "Online store", value: 52 },
        { label: "Marketplace", value: 28 },
        { label: "Retail partner", value: 14 },
        { label: "Wholesale", value: 6 },
      ],
      centerValue: money(486200, { compact: true }),
      centerLabel: "total sales",
      height: 172,
    },
    table: {
      title: "Top products",
      columns: [
        { key: "name", header: "Product", render: (r) => <EntityCell name={r.name} sub={r.id} square icon={<Boxes size={14} />} /> },
        { key: "category", header: "Category" },
        { key: "sold", header: "Sold", align: "right", render: (r) => number(r.sold) },
        { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: PRODUCTS.slice(0, 8),
    },
  },

  "/finance/dashboard": {
    title: "Finance overview",
    subtitle: "Cash position, revenue and spend.",
    breadcrumb: crumb("Finance"),
    kpis: [
      { label: "Cash balance", value: money(2140000, { compact: true }), delta: 4.1, icon: Wallet, spark: spark(55, 14, 2) },
      { label: "Revenue (MTD)", value: money(486200), delta: 18.2, icon: DollarSign, spark: spark(48, 18, 5) },
      { label: "Burn (MTD)", value: money(214000), delta: 3.2, positiveIsGood: false, icon: TrendingUp, spark: spark(40, 12, 8) },
      { label: "Runway", value: "18 mo", delta: 1, icon: Gauge, spark: spark(50, 8, 3) },
    ],
    mainChart: {
      title: "Income vs expenses",
      type: "column",
      data: multiSeries([
        { key: "income", base: 320000, growth: 22000, spread: 40000, offset: 1 },
        { key: "expenses", base: 190000, growth: 9000, spread: 30000, offset: 5 },
      ]),
      x: "month",
      series: [{ key: "income", name: "Income" }, { key: "expenses", name: "Expenses" }],
      legend: true,
      dataFormat: { prefix: "$", format: "compact" },
      column: { radius: 4, groupGap: 8 },
    },
    meters: {
      title: "Spend by category",
      description: "This month",
      items: [
        { label: "Payroll", value: 46, display: money(98400, { compact: true }) },
        { label: "Infrastructure", value: 22, tone: "info", display: money(47000, { compact: true }) },
        { label: "Marketing", value: 18, tone: "warning", display: money(38600, { compact: true }) },
        { label: "Other", value: 14, tone: "danger", display: money(30000, { compact: true }) },
      ],
    },
    table: {
      title: "Recent invoices",
      columns: [
        { key: "id", header: "Invoice" },
        { key: "client", header: "Client" },
        { key: "amount", header: "Amount", align: "right", render: (r) => money(r.amount) },
        { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: INVOICES.slice(0, 8),
    },
  },

  "/dashboards/sales": {
    title: "Sales overview",
    subtitle: "Bookings, quota and rep performance.",
    breadcrumb: crumb("Sales"),
    rangeLabel: "This quarter",
    kpis: [
      { label: "Bookings (QTD)", value: money(1240000, { compact: true }), delta: 14, icon: DollarSign, spark: spark(55, 20, 2) },
      { label: "Quota attainment", value: "104%", delta: 6, icon: Target, spark: spark(50, 14, 5) },
      { label: "Avg. cycle", value: "24d", delta: -3, icon: Activity, spark: spark(30, 10, 7) },
      { label: "Pipeline coverage", value: "3.1x", delta: 0.4, icon: TrendingUp, spark: spark(40, 12, 9) },
    ],
    mainChart: {
      title: "Bookings by month",
      type: "bar",
      data: multiSeries([{ key: "bookings", base: 210000, growth: 24000, spread: 60000, offset: 3 }]),
      x: "month",
      series: [{ key: "bookings", name: "Bookings" }],
      dataFormat: { prefix: "$", format: "compact" },
      bar: { radius: 4 },
    },
    donut: {
      title: "Bookings by segment",
      data: [
        { label: "Enterprise", value: 44 },
        { label: "Mid-market", value: 33 },
        { label: "SMB", value: 23 },
      ],
      centerValue: money(1240000, { compact: true }),
      centerLabel: "bookings",
      height: 172,
    },
    table: {
      title: "Top accounts",
      columns: [
        { key: "name", header: "Account", render: (r) => <EntityCell name={r.name} sub={r.contact} square /> },
        { key: "plan", header: "Plan", render: (r) => <StatusChip status={r.plan} /> },
        { key: "mrr", header: "MRR", align: "right", render: (r) => money(r.mrr) },
        { key: "region", header: "Region" },
      ],
      rows: CUSTOMERS.slice(0, 8),
    },
  },

  "/dashboards/projects": {
    title: "Projects overview",
    subtitle: "Delivery status and team load.",
    breadcrumb: crumb("Projects"),
    kpis: [
      { label: "Active projects", value: "18", delta: 2, icon: Activity, spark: spark(45, 10, 2) },
      { label: "On track", value: "72%", delta: 5, icon: Target, spark: spark(50, 12, 5) },
      { label: "At risk", value: "4", delta: -1, positiveIsGood: false, icon: TrendingUp, spark: spark(30, 8, 8) },
      { label: "Avg. completion", value: "63%", delta: 3, icon: Gauge, spark: spark(48, 10, 3) },
    ],
    mainChart: {
      title: "Tasks completed per week",
      type: "area",
      data: MONTHS.map((m, i) => ({ month: m, tasks: 40 + i * 6 + (i % 3) * 5 })),
      x: "month",
      series: [{ key: "tasks", name: "Tasks" }],
      line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } },
    },
    meters: {
      title: "Project status",
      items: [
        { label: "On track", value: 62, display: "11" },
        { label: "At risk", value: 22, tone: "warning", display: "4" },
        { label: "Delayed", value: 10, tone: "danger", display: "2" },
        { label: "Completed", value: 6, tone: "info", display: "1" },
      ],
    },
    table: {
      title: "Projects",
      columns: [
        { key: "name", header: "Project" },
        { key: "lead", header: "Lead" },
        { key: "progress", header: "Progress", align: "right", render: (r) => `${r.progress}%` },
        { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: PROJECTS.slice(0, 8),
    },
  },

  "/dashboards/saas": {
    title: "SaaS metrics",
    subtitle: "MRR, retention and product engagement.",
    breadcrumb: crumb("SaaS"),
    kpis: [
      { label: "MRR", value: money(412000, { compact: true }), delta: 6.2, icon: DollarSign, spark: spark(60, 16, 1) },
      { label: "Net revenue retention", value: "112%", delta: 3, icon: TrendingUp, spark: spark(52, 10, 4) },
      { label: "Active accounts", value: number(3120), delta: 7, icon: Users, spark: spark(48, 14, 6) },
      { label: "Churn (logo)", value: "1.8%", delta: -0.4, positiveIsGood: false, icon: Activity, spark: spark(30, 8, 9) },
    ],
    mainChart: {
      title: "MRR movement",
      type: "column",
      data: multiSeries([
        { key: "new", base: 24000, growth: 1600, spread: 6000, offset: 2 },
        { key: "expansion", base: 12000, growth: 900, spread: 3000, offset: 5 },
        { key: "churn", base: 6000, growth: 200, spread: 2000, offset: 8 },
      ]),
      x: "month",
      series: [{ key: "new", name: "New" }, { key: "expansion", name: "Expansion" }, { key: "churn", name: "Churn" }],
      legend: true,
      column: { stacked: true, radius: 3 },
      dataFormat: { prefix: "$", format: "compact" },
    },
    donut: {
      title: "Accounts by plan",
      data: [
        { label: "Starter", value: 38 },
        { label: "Growth", value: 34 },
        { label: "Scale", value: 20 },
        { label: "Enterprise", value: 8 },
      ],
      centerValue: number(3120),
      centerLabel: "accounts",
      height: 172,
    },
    table: { title: "Accounts", columns: [
      { key: "name", header: "Account", render: (r) => <EntityCell name={r.name} sub={r.contact} square /> },
      { key: "plan", header: "Plan", render: (r) => <StatusChip status={r.plan} /> },
      { key: "mrr", header: "MRR", align: "right", render: (r) => money(r.mrr) },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ], rows: CUSTOMERS.slice(0, 8) },
  },

  "/logistics/dashboard": {
    title: "Logistics overview",
    subtitle: "Shipments, carriers and delivery performance.",
    breadcrumb: crumb("Logistics"),
    kpis: [
      { label: "In transit", value: number(1284), delta: 5, icon: Truck, spark: spark(50, 14, 1) },
      { label: "On-time rate", value: "94%", delta: 1, icon: Target, spark: spark(52, 8, 5) },
      { label: "Avg. transit", value: "3.4d", delta: -0.2, positiveIsGood: false, icon: Activity, spark: spark(35, 8, 7) },
      { label: "Delayed", value: "18", delta: -4, positiveIsGood: false, icon: TrendingUp, spark: spark(28, 10, 9) },
    ],
    mainChart: {
      title: "Deliveries per day",
      type: "bar",
      data: MONTHS.map((m, i) => ({ month: m, delivered: 320 + i * 12 + (i % 4) * 20 })),
      x: "month",
      series: [{ key: "delivered", name: "Delivered" }],
      bar: { radius: 4 },
    },
    donut: {
      title: "Shipments by carrier",
      data: [
        { label: "Astro Freight", value: 34 },
        { label: "BlueDart", value: 26 },
        { label: "MoveOn", value: 20 },
        { label: "RapidPost", value: 12 },
        { label: "CargoLink", value: 8 },
      ],
      centerValue: number(1284),
      centerLabel: "in transit",
      height: 172,
    },
    table: {
      title: "Active shipments",
      columns: [
        { key: "id", header: "Shipment" },
        { key: "carrier", header: "Carrier" },
        { key: "destination", header: "Destination" },
        { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: SHIPMENTS.slice(0, 8),
    },
  },

  "/dashboards/bi": {
    title: "Business intelligence",
    subtitle: "Cross-functional metrics in one view.",
    breadcrumb: crumb("Business Intelligence"),
    kpis: [
      { label: "Revenue (YTD)", value: money(5840000, { compact: true }), delta: 18, icon: DollarSign, spark: spark(58, 16, 2) },
      { label: "Gross margin", value: "68%", delta: 2, icon: Gauge, spark: spark(50, 8, 5) },
      { label: "Active users", value: number(48200), delta: 9, icon: Users, spark: spark(52, 14, 7) },
      { label: "NPS", value: "54", delta: 4, icon: TrendingUp, spark: spark(46, 10, 9) },
    ],
    mainChart: {
      title: "Revenue, cost & margin",
      type: "line",
      data: multiSeries([
        { key: "revenue", base: 320000, growth: 24000, spread: 30000, offset: 1 },
        { key: "cost", base: 120000, growth: 7000, spread: 15000, offset: 6 },
      ]),
      x: "month",
      series: [{ key: "revenue", name: "Revenue" }, { key: "cost", name: "Cost" }],
      legend: true,
      dataFormat: { prefix: "$", format: "compact" },
      line: { curve: "smooth" },
    },
    meters: {
      title: "Goal attainment",
      items: [
        { label: "Revenue", value: 104, max: 120, display: "104%" },
        { label: "New customers", value: 92, max: 120, tone: "info", display: "92%" },
        { label: "Retention", value: 112, max: 120, tone: "success", display: "112%" },
        { label: "Efficiency", value: 78, max: 120, tone: "warning", display: "78%" },
      ],
    },
    secondaryChart: {
      title: "Users by region",
      type: "bar",
      data: [
        { region: "North America", users: 21400 },
        { region: "Europe", users: 15200 },
        { region: "APAC", users: 8600 },
        { region: "LATAM", users: 3000 },
      ],
      x: "region",
      series: [{ key: "users", name: "Users" }],
      bar: { radius: 4 },
    },
  },
};

// /marketing is the Marketing dashboard in the reference nav.
DASHBOARD_CONFIGS["/marketing"] = {
  title: "Marketing overview",
  subtitle: "Campaign performance across every channel.",
  breadcrumb: crumb("Marketing"),
  kpis: [
    { label: "Spend (30d)", value: money(38600), delta: 4, positiveIsGood: false, icon: Wallet, spark: spark(40, 12, 1) },
    { label: "Leads", value: number(2140), delta: 12, icon: UserPlus, spark: spark(50, 16, 4) },
    { label: "CPL", value: money(18.04, { decimals: 2 }), delta: -6, icon: TrendingUp, spark: spark(30, 10, 6) },
    { label: "ROAS", value: "4.2x", delta: 8, icon: Target, spark: spark(46, 14, 8) },
  ],
  mainChart: {
    title: "Leads by channel",
    type: "area",
    data: multiSeries([
      { key: "organic", base: 800, growth: 60, spread: 200, offset: 2 },
      { key: "paid", base: 600, growth: 30, spread: 180, offset: 5 },
      { key: "social", base: 400, growth: 40, spread: 150, offset: 8 },
    ]),
    x: "month",
    series: [{ key: "organic", name: "Organic" }, { key: "paid", name: "Paid" }, { key: "social", name: "Social" }],
    legend: true,
    line: { curve: "smooth", area: { show: true, fill: { opacity: 0.12 } } },
  },
  donut: {
    title: "Spend by channel",
    data: [
      { label: "Paid search", value: 40 },
      { label: "Paid social", value: 30 },
      { label: "Display", value: 18 },
      { label: "Email", value: 12 },
    ],
    centerValue: money(38600, { compact: true }),
    centerLabel: "spend",
    height: 172,
  },
};

DASHBOARD_CONFIGS["/marketing/overview"] = {
  ...DASHBOARD_CONFIGS["/marketing"],
  breadcrumb: crumb("Marketing"),
};

DASHBOARD_CONFIGS["/projects/analytics"] = {
  title: "Project analytics",
  subtitle: "Velocity, cycle time and team load.",
  breadcrumb: { trail: [{ label: "Projects" }], current: "Project Analytics" },
  kpis: [
    { label: "Velocity (avg)", value: "42 pts", delta: 6, icon: Activity, spark: spark(45, 12, 1) },
    { label: "Cycle time", value: "3.1d", delta: -0.4, positiveIsGood: false, icon: Gauge, spark: spark(30, 8, 4) },
    { label: "Throughput / wk", value: "58", delta: 9, icon: TrendingUp, spark: spark(48, 14, 6) },
    { label: "WIP", value: "23", delta: -2, icon: Target, spark: spark(28, 8, 9) },
  ],
  mainChart: {
    title: "Completed vs created",
    type: "area",
    data: MONTHS.map((m, i) => ({ month: m, created: 44 + (i % 4) * 6, done: 40 + i * 3 })),
    x: "month",
    series: [{ key: "created", name: "Created" }, { key: "done", name: "Completed" }],
    legend: true,
    line: { curve: "smooth", area: { show: true, fill: { opacity: 0.12 } } },
  },
  meters: {
    title: "Load by team",
    items: [
      { label: "Platform", value: 82, display: "82%" },
      { label: "Growth", value: 64, tone: "info", display: "64%" },
      { label: "Design", value: 48, tone: "success", display: "48%" },
      { label: "Data", value: 91, tone: "warning", display: "91%" },
    ],
  },
  table: {
    title: "Projects",
    columns: [
      { key: "name", header: "Project" },
      { key: "lead", header: "Lead" },
      { key: "progress", header: "Progress", align: "right", render: (r) => `${r.progress}%` },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: PROJECTS.slice(0, 8),
  },
};
