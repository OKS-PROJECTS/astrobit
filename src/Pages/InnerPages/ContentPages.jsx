import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Check,
  CreditCard,
  FileText,
  LifeBuoy,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button, Chip, TextField } from "oks-ui";
import { Accordion, CardHeader, PageHeader, SectionTitle, Surface, Timeline } from "../../Components/ui";
import { cx } from "../../lib/cx";

const RELEASES = [
  { v: "1.4.0", date: "Aug 2026", tag: "Feature", items: ["Config-driven report builder", "Dark-mode charts", "Bulk actions in every table"] },
  { v: "1.3.0", date: "Jul 2026", tag: "Feature", items: ["Command palette (⌘K)", "Kanban boards", "New KPI card with sparkline"] },
  { v: "1.2.1", date: "Jun 2026", tag: "Fix", items: ["Sidebar flyout focus trap", "Donut centre label overlap", "Locale date formatting"] },
  { v: "1.2.0", date: "Jun 2026", tag: "Feature", items: ["Multi-step form wizard", "File dropzone previews", "Timeline component"] },
  { v: "1.1.0", date: "May 2026", tag: "Feature", items: ["Light theme", "Responsive tables", "Empty & loading states everywhere"] },
];

export function ChangelogPage() {
  return (
    <div>
      <PageHeader title="Changelog" subtitle="Every notable change to Astrobit." breadcrumb={{ trail: [{ label: "Pages" }], current: "Changelog" }} />
      <div className="mx-auto max-w-2xl space-y-5">
        {RELEASES.map((r) => (
          <Surface key={r.v}>
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-bold tnum" style={{ color: "var(--app-fg-strong)" }}>v{r.v}</span>
              <Chip size="xs" variant="soft" color={r.tag === "Fix" ? "warning" : "primary"}>{r.tag}</Chip>
              <span className="ml-auto text-[11.5px]" style={{ color: "var(--app-fg-subtle)" }}>{r.date}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {r.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-[12.5px]" style={{ color: "var(--app-fg)" }}>
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--app-ok)" }} />
                  {it}
                </li>
              ))}
            </ul>
          </Surface>
        ))}
      </div>
    </div>
  );
}

export function ReleaseNotesPage() {
  return (
    <div>
      <PageHeader title="Release notes" subtitle="The story behind the latest release." breadcrumb={{ trail: [{ label: "Pages" }], current: "Release Notes" }} />
      <div className="mx-auto max-w-2xl">
        <Surface>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[12px]" style={{ background: "var(--app-accent-soft)", color: "var(--app-accent)" }}>
              <Sparkles size={18} />
            </span>
            <div>
              <h3 className="text-[16px] font-bold" style={{ color: "var(--app-fg-strong)" }}>Astrobit 1.4 — Reports, refined</h3>
              <p className="text-[11.5px]" style={{ color: "var(--app-fg-subtle)" }}>Released August 2026</p>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed" style={{ color: "var(--app-fg)" }}>
            This release is all about turning data into decisions faster. The new report builder lets you assemble a
            cross-functional view from a single config object, charts now read the theme correctly in dark mode, and every
            table gained bulk actions.
          </p>
          <SectionTitle className="mt-6">Highlights</SectionTitle>
          <ul className="mt-2 space-y-2">
            {["Config-driven report builder with KPI rows, charts and a data table", "Charts respect the active theme — no more white slabs in dark mode", "Bulk select and act on rows across every list", "Sparkline KPI cards with per-metric colour tints"].map((it) => (
              <li key={it} className="flex items-start gap-2 text-[12.5px]" style={{ color: "var(--app-fg)" }}>
                <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--app-ok)" }} />
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <Button as={Link} to="/pages/changelog" variant="bordered" size="sm">Full changelog</Button>
            <Button as={Link} to="/pages/roadmap" color="primary" size="sm" endContent={<ArrowRight size={14} />}>What's next</Button>
          </div>
        </Surface>
      </div>
    </div>
  );
}

const ROADMAP = {
  Planned: ["Realtime collaboration on reports", "Saved filter views", "Public API v2", "Mobile app"],
  "In progress": ["Report scheduling & email delivery", "Custom dashboard layouts", "SSO with SCIM provisioning"],
  Shipped: ["Report builder", "Dark-mode charts", "Command palette", "Kanban boards"],
};

export function RoadmapPage() {
  const tone = { Planned: "default", "In progress": "info", Shipped: "success" };
  return (
    <div>
      <PageHeader title="Roadmap" subtitle="What we're building next." breadcrumb={{ trail: [{ label: "Pages" }], current: "Roadmap" }} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {Object.entries(ROADMAP).map(([col, items]) => (
          <div key={col}>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${tone[col] === "default" ? "fg-subtle" : tone[col]})` }} />
              <span className="text-[12.5px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{col}</span>
              <span className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>{items.length}</span>
            </div>
            <div className="space-y-3">
              {items.map((it) => (
                <Surface key={it} padded="sm">
                  <p className="text-[12.5px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{it}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip size="xs" variant="soft" color={tone[col]}>{col}</Chip>
                    <span className="text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>Q{col === "Shipped" ? "3" : col === "In progress" ? "4" : "1 2027"}</span>
                  </div>
                </Surface>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STARTER_STEPS = [
  { t: "Install & run", d: "npm install && npm run dev — the app boots into the Analytics dashboard.", done: true },
  { t: "Set your brand", d: "Edit src/styles/theme.css — repoint the brand ramp and the --app-* layer.", done: true },
  { t: "Add a page", d: "Most screens are config objects. Add an entry to src/data/lists.jsx and wire the route.", done: false },
  { t: "Swap the data", d: "Everything in src/data/ is deterministic mock data. Replace with your API layer.", done: false },
  { t: "Ship it", d: "npm run build outputs a static bundle. Deploy anywhere.", done: false },
];

export function StarterKitPage() {
  return (
    <div>
      <PageHeader title="Starter kit" subtitle="From clone to production in five steps." breadcrumb={{ trail: [{ label: "Pages" }], current: "Starter Kit" }} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {STARTER_STEPS.map((s, i) => (
            <Surface key={s.t} className="flex gap-4">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold"
                style={{ background: s.done ? "var(--app-ok)" : "var(--app-surface-2)", color: s.done ? "#fff" : "var(--app-fg-muted)" }}
              >
                {s.done ? <Check size={15} /> : i + 1}
              </span>
              <div>
                <p className="text-[13.5px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{s.t}</p>
                <p className="mt-1 text-[12px]" style={{ color: "var(--app-fg-muted)" }}>{s.d}</p>
              </div>
            </Surface>
          ))}
        </div>
        <Surface>
          <CardHeader title="What's included" divider />
          <ul className="space-y-2.5">
            {["App shell + recursive sidebar", "6 config-driven archetypes", "Component gallery + kitchen sink", "Light & dark themes", "Deterministic mock data"].map((it) => (
              <li key={it} className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--app-fg)" }}>
                <Zap size={13} style={{ color: "var(--app-accent)" }} />{it}
              </li>
            ))}
          </ul>
          <Button as={Link} to="/components" color="primary" fullWidth className="mt-4">Browse components</Button>
        </Surface>
      </div>
    </div>
  );
}

const HELP_CATS = [
  { icon: Rocket, name: "Getting started", count: 12 },
  { icon: CreditCard, name: "Billing & plans", count: 8 },
  { icon: Settings, name: "Workspace settings", count: 15 },
  { icon: BookOpen, name: "Reports & dashboards", count: 21 },
  { icon: LifeBuoy, name: "Troubleshooting", count: 17 },
  { icon: FileText, name: "API & integrations", count: 9 },
];
const ARTICLES = [
  "How billing works when you add or remove seats",
  "Building your first custom report",
  "Inviting teammates and assigning roles",
  "Connecting Slack for notifications",
  "Exporting data to CSV and PDF",
  "Setting up SSO for your workspace",
];

export function HelpCenterPage() {
  const [q, setQ] = useState("");
  return (
    <div>
      <PageHeader title="Help center" subtitle="Answers, guides and troubleshooting." breadcrumb={{ trail: [{ label: "Utility" }], current: "Help Center" }} />
      <div className="mx-auto mb-6 max-w-xl">
        <TextField value={q} onChange={setQ} variant="soft" placeholder="Search the help center…" startIcon={<Search size={16} />} aria-label="Search help" />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HELP_CATS.map((c) => (
          <Surface key={c.name} interactive className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px]" style={{ background: "var(--app-accent-soft)", color: "var(--app-accent)" }}>
              <c.icon size={17} />
            </span>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{c.name}</p>
              <p className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>{c.count} articles</p>
            </div>
          </Surface>
        ))}
      </div>
      <Surface>
        <CardHeader title="Popular articles" divider />
        <ul className="divide-y" style={{ borderColor: "var(--app-border)" }}>
          {ARTICLES.map((a) => (
            <li key={a}>
              <button type="button" className="flex w-full items-center justify-between gap-4 py-3 text-left text-[12.5px]" style={{ color: "var(--app-fg)" }}>
                {a}
                <ArrowRight size={14} style={{ color: "var(--app-fg-subtle)" }} />
              </button>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}

export function KnowledgeBasePage() {
  const groups = [
    { name: "Guides", items: ["Report builder deep dive", "Designing a dashboard", "Bulk operations", "Keyboard shortcuts"] },
    { name: "Admin", items: ["Roles & permissions model", "Audit logging", "Data retention", "IP allow-list"] },
    { name: "Developers", items: ["API authentication", "Webhooks", "Rate limits", "Pagination"] },
  ];
  return (
    <div>
      <PageHeader title="Knowledge base" subtitle="In-depth documentation for every feature." breadcrumb={{ trail: [{ label: "Utility" }], current: "Knowledge Base" }} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {groups.map((g) => (
          <Surface key={g.name}>
            <CardHeader title={g.name} divider />
            <ul className="space-y-2">
              {g.items.map((it) => (
                <li key={it}>
                  <button type="button" className="flex w-full items-center gap-2 text-left text-[12.5px]" style={{ color: "var(--app-fg)" }}>
                    <FileText size={13} style={{ color: "var(--app-fg-subtle)" }} />{it}
                  </button>
                </li>
              ))}
            </ul>
          </Surface>
        ))}
      </div>
    </div>
  );
}

const DOC_SECTIONS = [
  { id: "intro", title: "Introduction", body: "Astrobit is an admin dashboard template built entirely with oks-ui. Every screen is assembled from oks-ui primitives or components composed from them." },
  { id: "install", title: "Installation", body: "Clone the repo, run npm install, then npm run dev. The app boots into the Analytics dashboard on port 5173." },
  { id: "theme", title: "Theming", body: "All visual values live in src/styles/theme.css. Repoint the brand ramp and the --app-* layer; light, dark and every component follow automatically." },
  { id: "archetypes", title: "Archetypes", body: "A list, form, detail view, settings panel, board or report is a config object consumed by an archetype component. Add an entry, wire the route, done." },
  { id: "data", title: "Mock data", body: "There is no backend. Everything in src/data/ is deterministic mock data, seeded so it never changes between reloads." },
];

export function DocumentationPage() {
  const [active, setActive] = useState(DOC_SECTIONS[0].id);
  const sec = DOC_SECTIONS.find((s) => s.id === active);
  return (
    <div>
      <PageHeader title="Documentation" subtitle="How Astrobit is put together." breadcrumb={{ trail: [{ label: "Utility" }], current: "Documentation" }} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[200px_1fr]">
        <Surface padded="sm" className="h-max">
          <nav className="space-y-0.5">
            {DOC_SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cx("block w-full rounded-[8px] px-2.5 py-1.5 text-left text-[12.5px]")}
                style={{ background: active === s.id ? "var(--app-menu-active-bg)" : "transparent", color: active === s.id ? "var(--app-menu-active-fg)" : "var(--app-fg-muted)" }}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </Surface>
        <Surface>
          <h2 className="text-[18px] font-bold" style={{ color: "var(--app-fg-strong)" }}>{sec.title}</h2>
          <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--app-fg)" }}>{sec.body}</p>
          <Accordion
            className="mt-6"
            items={[
              { id: "a", title: "Is oks-ui the only UI library?", content: "Yes. No MUI, no ApexCharts, no react-hook-form. Even the data layer — Table, Nav, Board, command palette — is oks-ui as shipped. Only the app shell is hand-assembled." },
              { id: "b", title: "Can I use TypeScript?", content: "The template ships in JavaScript, but the archetype pattern translates directly to .tsx." },
            ]}
          />
        </Surface>
      </div>
    </div>
  );
}

export function SearchResultsPage() {
  const results = [
    { type: "Page", title: "Analytics dashboard", path: "/dashboards/analytics" },
    { type: "Report", title: "Revenue report", path: "/reports/revenue" },
    { type: "Setting", title: "Localization", path: "/settings/locale" },
    { type: "Person", title: "Priya Raman", path: "/users" },
    { type: "Doc", title: "Theming guide", path: "/utility/documentation" },
    { type: "Component", title: "Data table", path: "/components/data-table" },
  ];
  return (
    <div>
      <PageHeader title={'Results for "revenue"'} subtitle={`${results.length} matches across pages, reports and people.`} breadcrumb={{ trail: [{ label: "Utility" }], current: "Search Results" }} />
      <Surface padded={false}>
        <ul className="divide-y" style={{ borderColor: "var(--app-border)" }}>
          {results.map((r) => (
            <li key={r.path}>
              <Link to={r.path} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--app-surface-2)]">
                <span>
                  <Chip size="xs" variant="soft" color="default">{r.type}</Chip>
                  <span className="ml-2 text-[13px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.title}</span>
                  <span className="ml-2 text-[11.5px]" style={{ color: "var(--app-fg-subtle)" }}>{r.path}</span>
                </span>
                <ArrowRight size={15} style={{ color: "var(--app-fg-subtle)" }} />
              </Link>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}

export function ActivityFeedPage() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: `af-${i}`,
    name: ["Priya Raman", "Theo Lindqvist", "Mara Devlin", "Ivan Petrov", null][i % 5],
    avatar: [3, 12, 32, 51][i % 4] ? `https://i.pravatar.cc/120?img=${[3, 12, 32, 51][i % 4]}` : undefined,
    title: [
      "published a new report",
      "closed a support ticket",
      "invited a teammate",
      "updated the pricing page",
      "flagged a spike in errors",
      "merged a pull request",
    ][i % 6],
    time: ["12m ago", "40m ago", "2h ago", "5h ago", "Yesterday", "2d ago"][i % 6],
    tone: ["primary", "success", "info", "default", "danger", "warning"][i % 6],
  }));
  return (
    <div>
      <PageHeader title="Activity feed" subtitle="Everything happening across the workspace." breadcrumb={{ trail: [{ label: "Utility" }], current: "Activity Feed" }} />
      <div className="mx-auto max-w-2xl">
        <Surface>
          <Timeline items={items.map((it) => ({ ...it, title: it.name ? `${it.name} ${it.title}.` : `System ${it.title}.` }))} />
        </Surface>
      </div>
    </div>
  );
}

export function WidgetGalleryPage() {
  return (
    <div>
      <PageHeader title="Widget gallery" subtitle="Drop-in dashboard widgets, all composed from oks-ui." breadcrumb={{ trail: [{ label: "Pages" }], current: "Widget Gallery" }} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["KPI card", "Sparkline stat", "Donut + legend", "Meter list", "Timeline", "Conversion funnel", "Data table", "Board column", "Empty state"].map((w) => (
          <Surface key={w} interactive>
            <p className="text-[13px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{w}</p>
            <p className="mt-1 text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>Composed from oks-ui primitives + tokens.</p>
            <div className="mt-3 h-20 rounded-[10px]" style={{ background: "var(--app-surface-2)" }} />
            <Button as={Link} to="/components" size="xs" variant="link" className="mt-2">View in gallery</Button>
          </Surface>
        ))}
      </div>
    </div>
  );
}
