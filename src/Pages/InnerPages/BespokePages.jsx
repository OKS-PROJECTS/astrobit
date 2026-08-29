import { useState } from "react";
import { Check, Search } from "lucide-react";
import { Button, Chart, Chip, Tab, Tabs, TextField } from "oks-ui";
import { Accordion, CardHeader, ChartCard, DonutCard, PageHeader, StatGroup, KpiCard, Surface } from "../../Components/ui";
import { REVENUE_TREND, multiSeries } from "../../data/analytics";
import { money, number } from "../../lib/cx";

/* --------------------------------- FAQ --------------------------------- */
const FAQS = [
  { id: "1", q: "Is every component really built with oks-ui?", a: "Yes. Buttons, forms, charts, menus and overlays are oks-ui primitives. Cards, tables, the sidebar, pagination, breadcrumbs and a few others are composed from oks-ui primitives and tokens — there is no second UI or charting library anywhere." },
  { id: "2", q: "How do I rebrand Astrobit?", a: "Edit src/styles/theme.css. Repoint the brand ramp and the --app-* layer; light, dark and every component follow automatically." },
  { id: "3", q: "Where does the data come from?", a: "There is no backend. Every figure is deterministic mock data generated in src/data/, seeded so it never changes between reloads." },
  { id: "4", q: "Can I add pages without writing components?", a: "Most screens — lists, forms, detail views, settings, boards, reports and dashboards — are config objects consumed by an archetype component. Add an entry, wire the route, done." },
  { id: "5", q: "Which framework and router?", a: "Vite + React 19 with react-router-dom v7. One layout route wraps every in-app page." },
  { id: "6", q: "Does it support dark mode?", a: "Dark is the default. The toggle in the header flips data-theme and persists the choice to localStorage." },
];

export function FaqPage() {
  const [q, setQ] = useState("");
  const filtered = FAQS.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Frequently asked questions" subtitle="Everything about how Astrobit is built and themed." breadcrumb={{ trail: [{ label: "Utility" }], current: "FAQ" }} />
      <div className="mx-auto max-w-2xl">
        <TextField variant="soft" value={q} onChange={setQ} placeholder="Search questions…" startIcon={<Search size={15} />} className="mb-4" aria-label="Search FAQs" />
        <Surface>
          <Accordion single items={filtered.map((f) => ({ id: f.id, title: f.q, content: f.a }))} />
        </Surface>
      </div>
    </div>
  );
}

/* ------------------------------- Pricing ------------------------------- */
const PLANS = [
  { name: "Starter", price: 0, blurb: "For side projects and evaluation.", features: ["1 workspace", "Up to 3 seats", "Core dashboards", "Community support"], cta: "Get started" },
  { name: "Growth", price: 24, blurb: "For teams shipping every week.", features: ["Unlimited dashboards", "Up to 25 seats", "All archetypes", "Priority support", "Custom theming"], cta: "Start trial", featured: true },
  { name: "Scale", price: 79, blurb: "For organisations with many teams.", features: ["Everything in Growth", "Unlimited seats", "SSO & SCIM", "Audit log", "Dedicated CSM"], cta: "Contact sales" },
];

export function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <div>
      <PageHeader title="Pricing" subtitle="Simple plans that scale with your team." breadcrumb={{ trail: [{ label: "Utility" }], current: "Pricing" }} />
      <div className="mb-6 flex justify-center">
        <Tabs variant="bordered" selectedKey={annual ? "annual" : "monthly"} onSelectionChange={(k) => setAnnual(k === "annual")}>
          <Tab key="monthly" title="Monthly" />
          <Tab key="annual" title="Annual · save 20%" />
        </Tabs>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {PLANS.map((p) => (
          <Surface key={p.name} className={p.featured ? "ring-2" : ""} style={p.featured ? { boxShadow: "var(--app-card-shadow)", "--tw-ring-color": "var(--app-accent)" } : undefined}>
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-bold" style={{ color: "var(--app-fg-strong)" }}>{p.name}</p>
              {p.featured && <Chip size="sm" color="primary" variant="soft">Popular</Chip>}
            </div>
            <p className="mt-1 text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>{p.blurb}</p>
            <p className="mt-4">
              <span className="text-[32px] font-extrabold tnum" style={{ color: "var(--app-fg-strong)" }}>
                {money(annual ? Math.round(p.price * 0.8) : p.price)}
              </span>
              <span className="text-[12.5px]" style={{ color: "var(--app-fg-subtle)" }}> / seat / mo</span>
            </p>
            <Button color={p.featured ? "primary" : "default"} variant={p.featured ? "solid" : "bordered"} fullWidth className="mt-4">
              {p.cta}
            </Button>
            <ul className="mt-5 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--app-fg)" }}>
                  <Check size={14} style={{ color: "var(--app-ok)" }} />
                  {f}
                </li>
              ))}
            </ul>
          </Surface>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Charts ------------------------------- */
const CHART_META = {
  "line-area": { title: "Line & area", subtitle: "Trends over time — smooth lines, filled areas and multi-series overlays." },
  "bar-column": { title: "Bar & column", subtitle: "Comparisons across categories — grouped, stacked and horizontal." },
  distributions: { title: "Distributions", subtitle: "Share of a whole — pie, donut and semi-circle gauges." },
  revenue: { title: "Revenue analytics", subtitle: "A focused revenue view built entirely with oks-ui Chart." },
  users: { title: "User analytics", subtitle: "Acquisition, activity and retention." },
};

export function ChartsPage({ kind }) {
  const meta = CHART_META[kind];
  const grouped = multiSeries([
    { key: "desktop", base: 4200, growth: 200, spread: 900, offset: 1 },
    { key: "mobile", base: 3100, growth: 320, spread: 800, offset: 5 },
  ]);

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} breadcrumb={{ trail: [{ label: "Charts & Analytics" }], current: meta.title }} />

      {(kind === "revenue" || kind === "users") && (
        <StatGroup className="mb-5">
          <KpiCard tone="primary" label={kind === "revenue" ? "Revenue" : "New users"} value={kind === "revenue" ? money(486200) : number(12480)} delta={12.4} />
          <KpiCard tone="info" label="Growth" value="18.2%" delta={2.1} />
          <KpiCard tone="success" label={kind === "revenue" ? "Avg. order" : "Activation"} value={kind === "revenue" ? money(128.5, { decimals: 2 }) : "62%"} delta={-1.4} positiveIsGood={false} />
          <KpiCard tone="warning" label="Retention" value="112%" delta={3} />
        </StatGroup>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {(kind === "line-area" || kind === "revenue" || kind === "users") && (
          <>
            <ChartCard title="Smooth line" height={260} chartProps={{ type: "line", data: REVENUE_TREND, x: "month", series: [{ key: "revenue", name: "Revenue" }], line: { curve: "smooth" }, dataFormat: { prefix: "$", format: "compact" } }} />
            <ChartCard title="Filled area" height={260} chartProps={{ type: "area", data: REVENUE_TREND, x: "month", series: [{ key: "sessions", name: "Sessions" }], line: { curve: "smooth", area: { show: true, fill: { opacity: 0.18 } } } }} />
            <ChartCard title="Multi-series" height={260} chartProps={{ type: "area", data: REVENUE_TREND, x: "month", series: [{ key: "revenue", name: "Revenue" }, { key: "orders", name: "Orders" }], legend: true, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.1 } } } }} />
            <ChartCard title="With projection" height={260} chartProps={{ type: "line", data: REVENUE_TREND, x: "month", series: [{ key: "revenue", name: "Revenue" }], line: { curve: "smooth" }, projection: { show: true } }} />
          </>
        )}

        {kind === "bar-column" && (
          <>
            <ChartCard title="Column" height={260} chartProps={{ type: "column", data: grouped, x: "month", series: [{ key: "desktop", name: "Desktop" }], column: { radius: 4 } }} />
            <ChartCard title="Grouped column" height={260} chartProps={{ type: "column", data: grouped, x: "month", series: [{ key: "desktop", name: "Desktop" }, { key: "mobile", name: "Mobile" }], legend: true, column: { radius: 4, groupGap: 8 } }} />
            <ChartCard title="Stacked column" height={260} chartProps={{ type: "column", data: grouped, x: "month", series: [{ key: "desktop", name: "Desktop" }, { key: "mobile", name: "Mobile" }], legend: true, column: { stacked: true, radius: 3 } }} />
            <ChartCard title="Horizontal bar" height={260} chartProps={{ type: "bar", data: [{ label: "North America", v: 21400 }, { label: "Europe", v: 15200 }, { label: "APAC", v: 8600 }, { label: "LATAM", v: 3000 }], x: "label", series: [{ key: "v", name: "Users" }], bar: { radius: 4 } }} />
          </>
        )}

        {kind === "distributions" && (
          <>
            <DonutCard title="Donut" data={[{ label: "Organic", value: 38 }, { label: "Direct", value: 27 }, { label: "Social", value: 21 }, { label: "Referral", value: 14 }]} centerLabel="sources" height={240} />
            <Surface>
              <CardHeader title="Semi-circle gauge" divider />
              <Chart
                type="pie"
                height={220}
                data={[{ label: "Used", value: 72 }, { label: "Free", value: 28 }]}
                x="label"
                series="value"
                pie={{ arc: "semi" }}
                pieStyle={{ innerRatio: 0.7 }}
                palette={{ colors: ["var(--app-accent)", "var(--app-surface-2)"] }}
                legend={false}
                tooltip={false}
              />
            </Surface>
          </>
        )}
      </div>
    </div>
  );
}
