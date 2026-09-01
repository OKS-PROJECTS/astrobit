import {
  LayoutDashboard,
  ShoppingCart,
  AppWindow,
  Users,
  FolderKanban,
  Wallet,
  Contact,
  UserCog,
  Truck,
  Store,
  Table2,
  ChartColumnBig,
  Component,
  CircleUserRound,
  Megaphone,
  FileBarChart,
  Settings,
  LifeBuoy,
  FileText,
  ShieldCheck,
} from "lucide-react";

/**
 * The Astrobit navigation tree.
 *
 * NAV      — the sidebar structure (sections -> groups/leaves -> leaves).
 * NAV_ROUTES — a flat, de-duplicated list of every `to`. Drives the
 *              ComingSoon fallback in App.jsx.
 *
 * The tree that feeds the oks-ui `Nav` in src/Components/Commom/Sidebar.jsx.
 */
export const NAV = [
  {
    heading: "Menu",
    items: [
      {
        label: "Dashboards",
        icon: LayoutDashboard,
        children: [
          { label: "Analytics", to: "/dashboards/analytics" },
          { label: "CRM", to: "/crm/dashboard" },
          { label: "Ecommerce", to: "/ecommerce/dashboard" },
          { label: "Finance", to: "/finance/dashboard" },
          { label: "Sales", to: "/dashboards/sales" },
          { label: "Marketing", to: "/marketing" },
          { label: "Logistics", to: "/logistics/dashboard" },
          { label: "Projects", to: "/dashboards/projects" },
          { label: "SaaS", to: "/dashboards/saas" },
          { label: "Business Intelligence", to: "/dashboards/bi" },
        ],
      },
      { label: "Orders", icon: ShoppingCart, to: "/orders" },
      {
        label: "Apps",
        icon: AppWindow,
        children: [
          { label: "Chat", to: "/apps/chat" },
          { label: "Group Chat", to: "/apps/group-chat" },
          { label: "Email", to: "/apps/email" },
          { label: "Calendar", to: "/apps/calendar" },
          { label: "Contacts", to: "/apps/contacts" },
          { label: "Notes", to: "/apps/notes" },
          { label: "File Manager", to: "/apps/file-manager" },
          { label: "Task Manager", to: "/apps/task-manager" },
          { label: "Help Desk", to: "/apps/help-desk" },
          { label: "Support Tickets", to: "/apps/support-tickets" },
        ],
      },
      {
        label: "User Management",
        icon: Users,
        children: [
          { label: "All Users", to: "/users" },
          { label: "My Profile", to: "/users/profile" },
          { label: "Add User", to: "/users/new" },
          { label: "Roles", to: "/users/roles" },
          { label: "Permissions", to: "/users/permissions" },
          { label: "Teams", to: "/users/teams" },
          { label: "Departments", to: "/users/departments" },
          { label: "Activity Logs", to: "/users/activity-logs" },
        ],
      },
      {
        label: "Projects",
        icon: FolderKanban,
        children: [
          { label: "All Projects", to: "/projects" },
          { label: "Create Project", to: "/projects/new" },
          { label: "Kanban View", to: "/projects/kanban" },
          { label: "Sprint Board", to: "/projects/sprint-board" },
          { label: "Team Board", to: "/projects/team-board" },
          { label: "Timeline", to: "/projects/timeline" },
          { label: "Gantt View", to: "/projects/gantt" },
          { label: "Project Analytics", to: "/projects/analytics" },
        ],
      },
      {
        label: "Finance",
        icon: Wallet,
        children: [
          { label: "Transactions", to: "/finance/transactions" },
          { label: "Payments", to: "/finance/payments" },
          { label: "Expenses", to: "/finance/expenses" },
          { label: "Invoices", to: "/finance/invoices" },
          { label: "Budget Management", to: "/finance/budget" },
          { label: "Profit & Loss", to: "/finance/profit-loss" },
          { label: "Financial Reports", to: "/finance/reports" },
        ],
      },
      {
        label: "CRM",
        icon: Contact,
        children: [
          { label: "CRM Dashboard", to: "/crm/dashboard" },
          { label: "CRM App", to: "/crm/app" },
          { label: "Leads", to: "/crm/leads" },
          { label: "Opportunities", to: "/crm/opportunities" },
          { label: "Customers", to: "/crm/customers" },
          { label: "Deals Pipeline", to: "/crm/deals-pipeline" },
          { label: "Sales Funnel", to: "/crm/sales-funnel" },
          { label: "Campaigns", to: "/crm/campaigns" },
          { label: "Customer Journey", to: "/crm/customer-journey" },
        ],
      },
      {
        label: "HR Management",
        icon: UserCog,
        children: [
          { label: "Employees", to: "/hr/employees" },
          { label: "Attendance", to: "/hr/attendance" },
          { label: "Leave Requests", to: "/hr/leave-requests" },
          { label: "Payroll", to: "/hr/payroll" },
          { label: "Departments", to: "/hr/departments" },
          { label: "Recruitment", to: "/hr/recruitment" },
          { label: "Job Applications", to: "/hr/job-applications" },
        ],
      },
      {
        label: "Logistics",
        icon: Truck,
        children: [
          { label: "Shipments", to: "/logistics/shipments" },
          { label: "Delivery Tracking", to: "/logistics/delivery-tracking" },
          { label: "Fleet Management", to: "/logistics/fleet" },
          { label: "Warehouse Management", to: "/logistics/warehouse" },
          { label: "Route Planning", to: "/logistics/route-planning" },
        ],
      },
      {
        label: "Ecommerce",
        icon: Store,
        children: [
          { label: "Product Grid", to: "/products" },
          { label: "Product List", to: "/products/list" },
          { label: "Add Product", to: "/products/new" },
          { label: "Categories", to: "/products/categories" },
          { label: "Orders", to: "/ecommerce/orders" },
          { label: "Create Order", to: "/ecommerce/orders/new" },
          { label: "Customers", to: "/ecommerce/customers" },
          { label: "Customer Analytics", to: "/ecommerce/customer-analytics" },
          { label: "Reviews", to: "/ecommerce/reviews" },
          { label: "Inventory", to: "/ecommerce/inventory" },
          { label: "Coupons", to: "/ecommerce/coupons" },
          { label: "Promotions", to: "/ecommerce/promotions" },
          { label: "Wishlist", to: "/ecommerce/wishlist" },
        ],
      },
      {
        label: "Tables & Forms",
        icon: Table2,
        children: [
          { label: "Basic Table", to: "/tables/basic" },
          { label: "Data Table", to: "/tables/data" },
          { label: "Filter Table", to: "/tables/filter" },
          { label: "Responsive Table", to: "/tables/responsive" },
          { label: "Advanced Table", to: "/tables/advanced" },
          { label: "Form Elements", to: "/forms/elements" },
          { label: "Form Layouts", to: "/forms/layouts" },
          { label: "Form Validation", to: "/forms/validation" },
          { label: "Multi-Step Wizard", to: "/forms/wizard" },
          { label: "File Upload", to: "/forms/file-upload" },
          { label: "Rich Text Editor", to: "/forms/rich-text-editor" },
          { label: "Date Pickers", to: "/forms/date-pickers" },
          { label: "Select Components", to: "/forms/select-components" },
          { label: "Input Masks", to: "/forms/input-masks" },
        ],
      },
      {
        label: "Charts & Analytics",
        icon: ChartColumnBig,
        children: [
          { label: "Line & Area", to: "/charts/line-area" },
          { label: "Bar & Column", to: "/charts/bar-column" },
          { label: "Distributions", to: "/charts/distributions" },
          { label: "Statistics", to: "/charts/statistics" },
          { label: "KPI Analytics", to: "/charts/kpi-analytics" },
          { label: "Heatmaps", to: "/charts/heatmaps" },
          { label: "Revenue Analytics", to: "/charts/revenue-analytics" },
          { label: "User Analytics", to: "/charts/user-analytics" },
        ],
      },
      {
        label: "Components",
        icon: Component,
        children: [
          { label: "Overview", to: "/components" },
          { label: "Kitchen Sink", to: "/components/kitchen-sink" },
          { label: "Buttons", to: "/components/buttons" },
          { label: "Alerts", to: "/components/alerts" },
          { label: "Cards", to: "/components/cards" },
          { label: "Modals", to: "/components/modals" },
          { label: "Tabs", to: "/components/tabs" },
          { label: "Accordions", to: "/components/accordions" },
          { label: "Avatars", to: "/components/avatars" },
          { label: "Badges", to: "/components/badges" },
          { label: "Breadcrumbs", to: "/components/breadcrumbs" },
          { label: "Dropdowns", to: "/components/dropdowns" },
          { label: "Pagination", to: "/components/pagination" },
          { label: "Progress", to: "/components/progress" },
          { label: "Tooltips", to: "/components/tooltips" },
          { label: "Toasts", to: "/components/toasts" },
          { label: "Timeline", to: "/components/timeline" },
          { label: "Loaders", to: "/components/loaders" },
          { label: "Empty States", to: "/components/empty-states" },
          { label: "Data Table", to: "/components/data-table" },
        ],
      },
      {
        label: "Account",
        icon: CircleUserRound,
        children: [
          { label: "Profile", to: "/account/profile" },
          { label: "Settings", to: "/account/settings" },
          { label: "Security", to: "/account/security" },
          { label: "Billing", to: "/account/billing" },
          { label: "Notifications", to: "/account/notifications" },
          { label: "Connected Apps", to: "/account/connected-apps" },
          { label: "API", to: "/account/api" },
        ],
      },
      {
        label: "Marketing",
        icon: Megaphone,
        children: [
          { label: "Overview", to: "/marketing/overview" },
          { label: "Email Campaigns", to: "/marketing/email" },
          { label: "SMS Campaigns", to: "/marketing/sms" },
          { label: "Landing Pages", to: "/marketing/landing-pages" },
          { label: "Segments", to: "/marketing/segments" },
          { label: "Analytics", to: "/marketing/analytics" },
        ],
      },
      {
        label: "Reports",
        icon: FileBarChart,
        children: [
          { label: "Sales Report", to: "/reports/sales" },
          { label: "Revenue Report", to: "/reports/revenue" },
          { label: "Customer Report", to: "/reports/customer" },
          { label: "Project Report", to: "/reports/project" },
          { label: "Marketing Report", to: "/reports/marketing" },
          { label: "Custom Builder", to: "/reports/custom" },
        ],
      },
      {
        label: "Settings",
        icon: Settings,
        children: [
          { label: "General", to: "/settings/general" },
          { label: "Company", to: "/settings/company" },
          { label: "Appearance", to: "/settings/appearance" },
          { label: "Locale", to: "/settings/locale" },
          { label: "Notifications", to: "/settings/notifications" },
          { label: "Integrations", to: "/settings/integrations" },
          { label: "API Keys", to: "/settings/api" },
        ],
      },
      {
        label: "Utility",
        icon: LifeBuoy,
        children: [
          { label: "FAQ", to: "/utility/faq" },
          { label: "Pricing", to: "/pricing" },
          { label: "Help Center", to: "/utility/help-center" },
          { label: "Knowledge Base", to: "/utility/knowledge-base" },
          { label: "Documentation", to: "/utility/documentation" },
          { label: "Search Results", to: "/utility/search-results" },
          { label: "Notifications Center", to: "/utility/notifications" },
          { label: "Activity Feed", to: "/utility/activity-feed" },
        ],
      },
      {
        label: "Pages",
        icon: FileText,
        children: [
          { label: "Changelog", to: "/pages/changelog" },
          { label: "Roadmap", to: "/pages/roadmap" },
          { label: "Release Notes", to: "/pages/release-notes" },
          { label: "Starter Kit", to: "/pages/starter-kit" },
          { label: "Widget Gallery", to: "/pages/widget-gallery" },
        ],
      },
      {
        label: "Auth & Errors",
        icon: ShieldCheck,
        children: [
          { label: "Sign In", to: "/auth/login" },
          { label: "Sign In · Centered", to: "/auth/login-split" },
          { label: "Sign Up", to: "/auth/register" },
          { label: "Sign Up · Centered", to: "/auth/register-split" },
          { label: "Forgot Password", to: "/auth/forgot-password" },
          { label: "Lock Screen", to: "/auth/lock" },
          { label: "404", to: "/404" },
          { label: "500", to: "/500" },
          { label: "Maintenance", to: "/maintenance" },
        ],
      },
    ],
  },
];

const collect = (items) =>
  items.flatMap((n) => (n.children ? collect(n.children) : n.to ? [n.to] : []));

export const NAV_ROUTES = Array.from(
  new Set(NAV.flatMap((s) => collect(s.items)))
);

/** Flat label lookup for breadcrumbs / page titles. */
export const ROUTE_LABEL = (() => {
  const map = {};
  const walk = (items, trail) => {
    for (const n of items) {
      if (n.children) walk(n.children, [...trail, n.label]);
      else if (n.to) map[n.to] = { label: n.label, trail };
    }
  };
  NAV.forEach((s) => walk(s.items, []));
  return map;
})();
