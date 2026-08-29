import { Boxes, PackageCheck, ShoppingBag, TicketCheck, TrendingUp, UserRound, Users, Wallet } from "lucide-react";
import { EntityCell, StatusChip } from "../Components/ui";
import { money, number } from "../lib/cx";
import {
  CUSTOMERS,
  EMPLOYEES,
  INVOICES,
  LEADS,
  ORDERS,
  PRODUCTS,
  PROJECTS,
  SHIPMENTS,
  TICKETS,
  TRANSACTIONS,
  USERS,
} from "./entities";

const crumb = (trail, current) => ({ trail: trail.map((t) => ({ label: t })), current });
const right = (v) => <span className="tnum">{v}</span>;

export const LIST_CONFIGS = {
  "/users": {
    title: "Team members",
    subtitle: "Manage roles, access and activity across the workspace.",
    breadcrumb: crumb(["User Management"], "All Users"),
    primaryAction: { label: "Invite member", to: "/users/new" },
    rows: USERS,
    searchKeys: ["name", "email", "team"],
    filters: [
      { key: "active", label: "Active", test: (r) => r.status === "Active" },
      { key: "invited", label: "Invited", test: (r) => r.status === "Invited" },
      { key: "admins", label: "Admins", test: (r) => ["Owner", "Admin"].includes(r.role) },
    ],
    stats: [
      { label: "Total members", value: number(USERS.length * 29), delta: 8, icon: Users },
      { label: "Active now", value: "37", delta: 4, icon: UserRound },
      { label: "Pending invites", value: "6", delta: -2, positiveIsGood: false, icon: UserRound },
      { label: "Admins", value: "9", delta: 1, icon: UserRound },
    ],
    columns: [
      { key: "name", header: "Member", sortable: true, render: (r) => <EntityCell name={r.name} sub={r.email} src={r.avatar} /> },
      { key: "role", header: "Role", sortable: true },
      { key: "team", header: "Team", sortable: true },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
      { key: "lastActive", header: "Last active", align: "right", render: (r) => right(r.lastActive) },
    ],
  },

  "/crm/customers": {
    title: "Customers",
    subtitle: "Every account across all plans and regions.",
    breadcrumb: crumb(["CRM"], "Customers"),
    primaryAction: { label: "Add customer", to: "/crm/leads" },
    rows: CUSTOMERS,
    searchKeys: ["name", "contact", "region"],
    filters: [
      { key: "active", label: "Active", test: (r) => r.status === "Active" },
      { key: "trial", label: "Trial", test: (r) => r.status === "Trial" },
      { key: "ent", label: "Enterprise", test: (r) => r.plan === "Enterprise" },
    ],
    stats: [
      { label: "Accounts", value: number(CUSTOMERS.length * 18), delta: 6, icon: Users },
      { label: "MRR", value: money(184200), delta: 12, icon: Wallet },
      { label: "Trials", value: "24", delta: 3, icon: TrendingUp },
      { label: "Churn (90d)", value: "1.8%", delta: -0.4, positiveIsGood: false, icon: TrendingUp },
    ],
    columns: [
      { key: "name", header: "Account", sortable: true, render: (r) => <EntityCell name={r.name} sub={r.contact} square /> },
      { key: "plan", header: "Plan", sortable: true, render: (r) => <StatusChip status={r.plan} /> },
      { key: "region", header: "Region", sortable: true },
      { key: "mrr", header: "MRR", align: "right", sortable: true, render: (r) => right(money(r.mrr)) },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/crm/leads": {
    title: "Leads",
    subtitle: "Inbound and outbound pipeline, newest first.",
    breadcrumb: crumb(["CRM"], "Leads"),
    primaryAction: { label: "New lead", to: "/crm/leads" },
    rows: LEADS,
    searchKeys: ["name", "company", "owner"],
    filters: [
      { key: "open", label: "Open", test: (r) => !["Won", "Lost"].includes(r.stage) },
      { key: "won", label: "Won", test: (r) => r.stage === "Won" },
    ],
    stats: [
      { label: "Open leads", value: "148", delta: 9, icon: TrendingUp },
      { label: "Pipeline value", value: money(1240000, { compact: true }), delta: 14, icon: Wallet },
      { label: "Win rate", value: "31%", delta: 2, icon: TrendingUp },
      { label: "Avg. deal size", value: money(6820), delta: 5, icon: Wallet },
    ],
    columns: [
      { key: "name", header: "Lead", sortable: true, render: (r) => <EntityCell name={r.name} sub={r.company} src={r.avatar} /> },
      { key: "source", header: "Source", sortable: true },
      { key: "stage", header: "Stage", render: (r) => <StatusChip status={r.stage} /> },
      { key: "owner", header: "Owner", sortable: true },
      { key: "value", header: "Value", align: "right", sortable: true, render: (r) => right(money(r.value)) },
    ],
  },

  "/ecommerce/orders": {
    title: "Orders",
    subtitle: "Every order across all sales channels.",
    breadcrumb: crumb(["Ecommerce"], "Orders"),
    primaryAction: { label: "Create order", to: "/ecommerce/orders/new" },
    rows: ORDERS,
    searchKeys: ["id", "customer", "email"],
    filters: [
      { key: "open", label: "Open", test: (r) => r.status !== "Delivered" && r.status !== "Cancelled" },
      { key: "delivered", label: "Delivered", test: (r) => r.status === "Delivered" },
      { key: "cancelled", label: "Cancelled", test: (r) => r.status === "Cancelled" },
    ],
    stats: [
      { label: "Orders (30d)", value: number(4820), delta: 7, icon: ShoppingBag },
      { label: "Revenue (30d)", value: money(486200), delta: 18, icon: Wallet },
      { label: "Avg. order value", value: money(128.5, { decimals: 2 }), delta: -2, icon: Wallet },
      { label: "Fulfilment SLA", value: "96%", delta: 1, icon: PackageCheck },
    ],
    columns: [
      { key: "id", header: "Order", sortable: true, render: (r) => <span className="font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.id}</span> },
      { key: "customer", header: "Customer", sortable: true, render: (r) => <EntityCell name={r.customer} sub={r.email} src={r.avatar} /> },
      { key: "channel", header: "Channel", sortable: true },
      { key: "items", header: "Items", align: "right", render: (r) => right(r.items) },
      { key: "total", header: "Total", align: "right", sortable: true, render: (r) => right(money(r.total, { decimals: 2 })) },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/products/list": {
    title: "Products",
    subtitle: "Catalogue across every category and channel.",
    breadcrumb: crumb(["Ecommerce"], "Product List"),
    primaryAction: { label: "Add product", to: "/products/new" },
    rows: PRODUCTS,
    searchKeys: ["name", "category", "id"],
    filters: [
      { key: "instock", label: "In stock", test: (r) => r.status === "In stock" },
      { key: "low", label: "Low stock", test: (r) => r.status === "Low stock" },
      { key: "out", label: "Out of stock", test: (r) => r.status === "Out of stock" },
    ],
    stats: [
      { label: "Active SKUs", value: number(PRODUCTS.length * 6), delta: 3, icon: Boxes },
      { label: "Units sold (30d)", value: number(28400), delta: 11, icon: PackageCheck },
      { label: "Low stock", value: "14", delta: 2, positiveIsGood: false, icon: Boxes },
      { label: "Avg. rating", value: "4.4", delta: 1, icon: TrendingUp },
    ],
    columns: [
      { key: "name", header: "Product", sortable: true, render: (r) => <EntityCell name={r.name} sub={r.id} square icon={<Boxes size={14} />} /> },
      { key: "category", header: "Category", sortable: true },
      { key: "price", header: "Price", align: "right", sortable: true, render: (r) => right(money(r.price)) },
      { key: "stock", header: "Stock", align: "right", sortable: true, render: (r) => right(r.stock) },
      { key: "sold", header: "Sold", align: "right", sortable: true, render: (r) => right(number(r.sold)) },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/finance/transactions": {
    title: "Transactions",
    subtitle: "All ledger movements across accounts.",
    breadcrumb: crumb(["Finance"], "Transactions"),
    rows: TRANSACTIONS,
    searchKeys: ["id", "description", "account"],
    filters: [
      { key: "in", label: "Inflow", test: (r) => r.amount > 0 },
      { key: "out", label: "Outflow", test: (r) => r.amount < 0 },
      { key: "pending", label: "Pending", test: (r) => r.status === "Pending" },
    ],
    stats: [
      { label: "Net (30d)", value: money(212400), delta: 9, icon: Wallet },
      { label: "Inflow", value: money(548900), delta: 12, icon: TrendingUp },
      { label: "Outflow", value: money(336500), delta: 6, positiveIsGood: false, icon: TrendingUp },
      { label: "Pending", value: "8", delta: -3, icon: Wallet },
    ],
    columns: [
      { key: "id", header: "Reference", sortable: true },
      { key: "description", header: "Description", sortable: true },
      { key: "account", header: "Account", sortable: true },
      { key: "method", header: "Method" },
      {
        key: "amount",
        header: "Amount",
        align: "right",
        sortable: true,
        render: (r) => (
          <span className="tnum font-medium" style={{ color: r.amount < 0 ? "var(--app-bad)" : "var(--app-ok)" }}>
            {r.amount < 0 ? "−" : "+"}
            {money(Math.abs(r.amount))}
          </span>
        ),
      },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/finance/invoices": {
    title: "Invoices",
    subtitle: "Billing across every client account.",
    breadcrumb: crumb(["Finance"], "Invoices"),
    primaryAction: { label: "New invoice", to: "/finance/invoices" },
    rows: INVOICES,
    searchKeys: ["id", "client"],
    filters: [
      { key: "paid", label: "Paid", test: (r) => r.status === "Paid" },
      { key: "pending", label: "Pending", test: (r) => r.status === "Pending" },
      { key: "overdue", label: "Overdue", test: (r) => r.status === "Overdue" },
    ],
    stats: [
      { label: "Outstanding", value: money(84210), delta: -4, positiveIsGood: false, icon: Wallet },
      { label: "Paid (30d)", value: money(312800), delta: 15, icon: Wallet },
      { label: "Overdue", value: "5", delta: -1, icon: Wallet },
      { label: "Avg. days to pay", value: "11", delta: -2, icon: TrendingUp },
    ],
    columns: [
      { key: "id", header: "Invoice", sortable: true },
      { key: "client", header: "Client", sortable: true, render: (r) => <EntityCell name={r.client} sub={r.id} square /> },
      { key: "issued", header: "Issued", sortable: true },
      { key: "due", header: "Due", sortable: true },
      { key: "amount", header: "Amount", align: "right", sortable: true, render: (r) => right(money(r.amount)) },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/hr/employees": {
    title: "Employees",
    subtitle: "The people directory across every department.",
    breadcrumb: crumb(["HR Management"], "Employees"),
    primaryAction: { label: "Add employee", to: "/hr/recruitment" },
    rows: EMPLOYEES,
    searchKeys: ["name", "email", "department"],
    filters: [
      { key: "active", label: "Active", test: (r) => r.status === "Active" },
      { key: "leave", label: "On leave", test: (r) => r.status === "On leave" },
      { key: "eng", label: "Engineering", test: (r) => r.department === "Engineering" },
    ],
    stats: [
      { label: "Headcount", value: number(EMPLOYEES.length * 9), delta: 4, icon: Users },
      { label: "Open roles", value: "12", delta: 2, icon: UserRound },
      { label: "On leave", value: "7", delta: 1, icon: UserRound },
      { label: "Attrition (12m)", value: "6.1%", delta: -0.8, positiveIsGood: false, icon: TrendingUp },
    ],
    columns: [
      { key: "name", header: "Employee", sortable: true, render: (r) => <EntityCell name={r.name} sub={r.email} src={r.avatar} /> },
      { key: "department", header: "Department", sortable: true },
      { key: "title", header: "Level", sortable: true },
      { key: "location", header: "Location", sortable: true },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/projects": {
    title: "All projects",
    subtitle: "Delivery status across every active initiative.",
    breadcrumb: crumb(["Projects"], "All Projects"),
    primaryAction: { label: "Create project", to: "/projects/new" },
    rows: PROJECTS,
    searchKeys: ["name", "lead"],
    filters: [
      { key: "ontrack", label: "On track", test: (r) => r.status === "On track" },
      { key: "risk", label: "At risk", test: (r) => r.status === "At risk" || r.status === "Delayed" },
      { key: "done", label: "Completed", test: (r) => r.status === "Completed" },
    ],
    stats: [
      { label: "Active projects", value: "18", delta: 2, icon: TrendingUp },
      { label: "On track", value: "72%", delta: 5, icon: TrendingUp },
      { label: "At risk", value: "4", delta: -1, icon: TrendingUp },
      { label: "Avg. completion", value: "63%", delta: 3, icon: TrendingUp },
    ],
    columns: [
      { key: "name", header: "Project", sortable: true, render: (r) => <span className="font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.name}</span> },
      { key: "lead", header: "Lead", sortable: true },
      { key: "tasks", header: "Tasks", align: "right", sortable: true, render: (r) => right(r.tasks) },
      {
        key: "progress",
        header: "Progress",
        align: "right",
        sortable: true,
        render: (r) => (
          <span className="inline-flex items-center gap-2">
            <span className="hidden h-1.5 w-20 overflow-hidden rounded-full sm:block" style={{ background: "var(--app-surface-2)" }}>
              <span className="block h-full rounded-full" style={{ width: `${r.progress}%`, background: "var(--app-accent)" }} />
            </span>
            <span className="tnum">{r.progress}%</span>
          </span>
        ),
      },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/logistics/shipments": {
    title: "Shipments",
    subtitle: "Live status across every carrier and lane.",
    breadcrumb: crumb(["Logistics"], "Shipments"),
    rows: SHIPMENTS,
    searchKeys: ["id", "order", "destination", "carrier"],
    filters: [
      { key: "transit", label: "In transit", test: (r) => r.status === "In transit" },
      { key: "delayed", label: "Delayed", test: (r) => r.status === "Delayed" },
      { key: "delivered", label: "Delivered", test: (r) => r.status === "Delivered" },
    ],
    stats: [
      { label: "In transit", value: number(1284), delta: 5, icon: PackageCheck },
      { label: "On-time rate", value: "94%", delta: 1, icon: TrendingUp },
      { label: "Delayed", value: "18", delta: -4, icon: PackageCheck },
      { label: "Avg. transit", value: "3.4d", delta: -0.2, icon: TrendingUp },
    ],
    columns: [
      { key: "id", header: "Shipment", sortable: true },
      { key: "order", header: "Order", sortable: true },
      { key: "carrier", header: "Carrier", sortable: true },
      { key: "destination", header: "Destination", sortable: true },
      { key: "eta", header: "ETA", align: "right", sortable: true, render: (r) => right(r.eta) },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },

  "/apps/support-tickets": {
    title: "Support tickets",
    subtitle: "The shared inbox across every channel.",
    breadcrumb: crumb(["Apps"], "Support Tickets"),
    rows: TICKETS,
    searchKeys: ["id", "subject", "requester", "assignee"],
    filters: [
      { key: "open", label: "Open", test: (r) => r.status === "Open" || r.status === "In progress" },
      { key: "urgent", label: "Urgent", test: (r) => r.priority === "Urgent" || r.priority === "High" },
      { key: "resolved", label: "Resolved", test: (r) => r.status === "Resolved" },
    ],
    stats: [
      { label: "Open tickets", value: "146", delta: -6, icon: TicketCheck },
      { label: "First response", value: "42m", delta: -8, icon: TrendingUp },
      { label: "Resolved (7d)", value: "312", delta: 11, icon: TicketCheck },
      { label: "CSAT", value: "4.6", delta: 2, icon: TrendingUp },
    ],
    columns: [
      { key: "id", header: "Ticket", sortable: true },
      { key: "subject", header: "Subject", sortable: true, render: (r) => <span className="font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.subject}</span> },
      { key: "requester", header: "Requester", sortable: true },
      { key: "priority", header: "Priority", sortable: true, render: (r) => <StatusChip status={r.priority} /> },
      { key: "assignee", header: "Assignee", sortable: true },
      { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
    ],
  },
};

// Alias routes that should render the same list config.
LIST_CONFIGS["/orders"] = { ...LIST_CONFIGS["/ecommerce/orders"], breadcrumb: crumb([], "Orders") };
LIST_CONFIGS["/tables/data"] = { ...LIST_CONFIGS["/users"], title: "Data table", subtitle: "Sortable, filterable, paginated — composed from a semantic table + oks-ui primitives.", breadcrumb: crumb(["Tables & Forms"], "Data Table") };
LIST_CONFIGS["/tables/basic"] = { ...LIST_CONFIGS["/products/list"], title: "Basic table", subtitle: "A straightforward record list.", breadcrumb: crumb(["Tables & Forms"], "Basic Table"), stats: [], filters: [], selectable: false };
LIST_CONFIGS["/tables/filter"] = { ...LIST_CONFIGS["/ecommerce/orders"], title: "Filter table", subtitle: "Search plus quick filter chips.", breadcrumb: crumb(["Tables & Forms"], "Filter Table"), stats: [] };
LIST_CONFIGS["/components/data-table"] = { ...LIST_CONFIGS["/users"], title: "Data table", subtitle: "The composed DataTable — oks-ui ships no table primitive.", breadcrumb: crumb(["Components"], "Data Table") };
LIST_CONFIGS["/products"] = { ...LIST_CONFIGS["/products/list"], title: "Products", subtitle: "The full catalogue.", breadcrumb: crumb(["Ecommerce"], "Product Grid") };
LIST_CONFIGS["/ecommerce/customers"] = { ...LIST_CONFIGS["/crm/customers"], breadcrumb: crumb(["Ecommerce"], "Customers") };
LIST_CONFIGS["/tables/responsive"] = { ...LIST_CONFIGS["/hr/employees"], title: "Responsive table", subtitle: "Reflows and scrolls on narrow viewports.", breadcrumb: crumb(["Tables & Forms"], "Responsive Table"), stats: [] };
LIST_CONFIGS["/tables/advanced"] = { ...LIST_CONFIGS["/finance/transactions"], title: "Advanced table", subtitle: "Sort, filter, search, row-select and pagination together.", breadcrumb: crumb(["Tables & Forms"], "Advanced Table") };
LIST_CONFIGS["/crm/opportunities"] = { ...LIST_CONFIGS["/crm/leads"], title: "Opportunities", subtitle: "Qualified pipeline only.", breadcrumb: crumb(["CRM"], "Opportunities") };
LIST_CONFIGS["/hr/job-applications"] = { ...LIST_CONFIGS["/hr/employees"], title: "Job applications", subtitle: "Candidates in the pipeline.", breadcrumb: crumb(["HR Management"], "Job Applications") };
LIST_CONFIGS["/logistics/delivery-tracking"] = { ...LIST_CONFIGS["/logistics/shipments"], title: "Delivery tracking", subtitle: "Live delivery status.", breadcrumb: crumb(["Logistics"], "Delivery Tracking") };
LIST_CONFIGS["/finance/payments"] = { ...LIST_CONFIGS["/finance/transactions"], title: "Payments", subtitle: "Incoming and outgoing payments.", breadcrumb: crumb(["Finance"], "Payments") };
LIST_CONFIGS["/finance/expenses"] = { ...LIST_CONFIGS["/finance/transactions"], title: "Expenses", subtitle: "Every outgoing transaction.", breadcrumb: crumb(["Finance"], "Expenses") };
