import { Navigate } from "react-router-dom";
import { Activity, DollarSign, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { Button, Checkbox, Chart, Chip } from "oks-ui";
import {
  CardHeader,
  ChartCard,
  DonutCard,
  KpiCard,
  MeterList,
  PageHeader,
  StatGroup,
  Stat,
  Surface,
  Timeline,
} from "../../Components/ui";
import { MONTHS, REVENUE_TREND, spark } from "../../data/analytics";
import { PERMISSIONS_LIST, BUDGET_LINES } from "../../data/more";
import { PROJECTS } from "../../data/entities";
import { cx, money, number, seeded } from "../../lib/cx";

/* ============================== CRM app (redirect) ============================== */
export const CrmAppPage = () => <Navigate to="/crm/dashboard" replace />;

/* ============================== Chart: Statistics ============================== */
export function StatisticsPage() {
  return (
    <div>
      <PageHeader title="Statistics" subtitle="A dense grid of metrics and mini-charts." breadcrumb={{ trail: [{ label: "Charts & Analytics" }], current: "Statistics" }} />
      <StatGroup className="mb-5">
        <KpiCard tone="primary" label="Revenue" value={money(486200)} delta={18.2} icon={DollarSign} spark={spark(58, 16, 1)} />
        <KpiCard tone="info" label="Users" value={number(48200)} delta={9.1} icon={Users} spark={spark(52, 14, 4)} />
        <KpiCard tone="success" label="Sessions" value={number(184200)} delta={6.4} icon={Activity} spark={spark(46, 12, 7)} />
        <KpiCard tone="warning" label="Bounce rate" value="38.2%" delta={-1.4} positiveIsGood={false} icon={MousePointerClick} spark={spark(40, 10, 9, -0.5)} />
      </StatGroup>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Traffic over time" height={280} chartProps={{ type: "area", data: REVENUE_TREND, x: "month", series: [{ key: "sessions", name: "Sessions" }, { key: "orders", name: "Orders" }], legend: true, line: { curve: "smooth", area: { show: true, fill: { opacity: 0.12 } } } }} />
        </div>
        <DonutCard title="Devices" data={[{ label: "Desktop", value: 58 }, { label: "Mobile", value: 34 }, { label: "Tablet", value: 8 }]} centerValue={number(184200, { compact: true })} centerLabel="sessions" height={172} />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pages / session", value: "4.2" },
          { label: "Avg. session", value: "3m 41s" },
          { label: "New vs returning", value: "62 / 38" },
          { label: "Goal completions", value: number(2140) },
        ].map((s) => (
          <Surface key={s.label}><Stat label={s.label} value={s.value} /></Surface>
        ))}
      </div>
    </div>
  );
}

/* ============================== Chart: KPI analytics ============================== */
export function KpiAnalyticsPage() {
  return (
    <div>
      <PageHeader title="KPI analytics" subtitle="Targets vs actuals across the business." breadcrumb={{ trail: [{ label: "Charts & Analytics" }], current: "KPI Analytics" }} />
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Surface>
          <CardHeader title="Goal attainment" description="This quarter" divider />
          <MeterList
            items={[
              { label: "Revenue", value: 104, max: 120, display: "104%" },
              { label: "New customers", value: 92, max: 120, tone: "info", display: "92%" },
              { label: "Retention", value: 112, max: 120, tone: "success", display: "112%" },
              { label: "Efficiency", value: 78, max: 120, tone: "warning", display: "78%" },
              { label: "NPS", value: 88, max: 120, tone: "danger", display: "88%" },
            ]}
          />
        </Surface>
        <ChartCard title="Actual vs target — revenue" height={260} chartProps={{ type: "line", data: MONTHS.map((m, i) => ({ month: m, actual: 320 + i * 22 + (i % 3) * 8, target: 320 + i * 20 })), x: "month", series: [{ key: "actual", name: "Actual" }, { key: "target", name: "Target" }], legend: true }} />
      </div>
      <StatGroup>
        <KpiCard tone="primary" label="Revenue vs plan" value="+4.2%" delta={4.2} />
        <KpiCard tone="info" label="CAC vs plan" value="−8.1%" delta={-8.1} />
        <KpiCard tone="success" label="Churn vs plan" value="−0.4pt" delta={-0.4} />
        <KpiCard tone="warning" label="Margin vs plan" value="+1.1pt" delta={1.1} />
      </StatGroup>
    </div>
  );
}

/* ============================== Chart: Heatmaps ============================== */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"];

export function HeatmapsPage() {
  return (
    <div>
      <PageHeader title="Heatmaps" subtitle="Activity intensity by day and hour." breadcrumb={{ trail: [{ label: "Charts & Analytics" }], current: "Heatmaps" }} />
      <p className="mb-4 rounded-[12px] border px-3 py-2 text-[12px]" style={{ borderColor: "var(--app-border)", background: "var(--app-surface-inset)", color: "var(--app-fg-muted)" }}>
        oks-ui <span style={{ color: "var(--app-fg-strong)" }}>&lt;Chart&gt;</span> has no heatmap type — this grid is composed from
        <span style={{ color: "var(--app-fg-strong)" }}> tokened div cells</span> (logged in the feedback doc).
      </p>
      <Surface className="overflow-x-auto">
        <CardHeader title="Sessions by day & hour" divider />
        <div className="min-w-[520px]">
          <div className="grid" style={{ gridTemplateColumns: `48px repeat(${HOURS.length}, 1fr)` }}>
            <div />
            {HOURS.map((h) => (
              <div key={h} className="pb-1 text-center text-[10px]" style={{ color: "var(--app-fg-subtle)" }}>{h}</div>
            ))}
            {DAYS.flatMap((d, di) => [
              <div key={`${d}-label`} className="flex items-center text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>{d}</div>,
              ...HOURS.map((h, hi) => {
                const v = seeded(di * 10 + hi, 100, 3) / 100;
                return (
                  <div
                    key={`${d}-${h}`}
                    className="m-0.5 aspect-square rounded-[4px]"
                    title={`${d} ${h}: ${Math.round(v * 400)} sessions`}
                    style={{ background: `color-mix(in srgb, var(--app-accent) ${Math.round(v * 90) + 8}%, transparent)` }}
                  />
                );
              }),
            ])}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>
          Less
          {[10, 30, 50, 70, 90].map((p) => (
            <span key={p} className="h-3 w-3 rounded-[3px]" style={{ background: `color-mix(in srgb, var(--app-accent) ${p}%, transparent)` }} />
          ))}
          More
        </div>
      </Surface>
    </div>
  );
}

/* ============================== Permissions matrix ============================== */
export function PermissionsPage() {
  const roleCols = ["owner", "admin", "manager", "editor", "viewer"];
  return (
    <div>
      <PageHeader title="Permissions" subtitle="What each role can access." breadcrumb={{ trail: [{ label: "User Management" }], current: "Permissions" }} actions={<Button size="sm" color="primary">Save changes</Button>} />
      <Surface padded={false} className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--app-border)" }}>
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.05em]" style={{ color: "var(--app-fg-subtle)" }}>Area</th>
              {roleCols.map((r) => (
                <th key={r} className="px-4 py-3 text-center text-[10.5px] font-bold uppercase tracking-[0.05em] capitalize" style={{ color: "var(--app-fg-subtle)" }}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS_LIST.map((p) => (
              <tr key={p.id} className="border-b last:border-0" style={{ borderColor: "var(--app-border)" }}>
                <td className="px-4 py-3 text-[13px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{p.area}</td>
                {roleCols.map((r) => (
                  <td key={r} className="px-4 py-3 text-center">
                    <Checkbox aria-label={`${p.area} for ${r}`} checked={!!p[r]} disabled={r === "owner"} onChange={() => {}} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}

/* ============================== Budget ============================== */
export function BudgetPage() {
  const totalBudget = BUDGET_LINES.reduce((s, b) => s + b.budget, 0);
  const totalSpent = BUDGET_LINES.reduce((s, b) => s + b.spent, 0);
  return (
    <div>
      <PageHeader title="Budget management" subtitle="Departmental budgets and burn." breadcrumb={{ trail: [{ label: "Finance" }], current: "Budget Management" }} actions={<Button size="sm" color="primary">New budget line</Button>} />
      <StatGroup className="mb-5" cols={3}>
        <KpiCard tone="primary" label="Total budget" value={money(totalBudget, { compact: true })} icon={DollarSign} />
        <KpiCard tone="info" label="Spent" value={money(totalSpent, { compact: true })} delta={Math.round((totalSpent / totalBudget) * 100 - 60)} icon={TrendingUp} />
        <KpiCard tone="success" label="Remaining" value={money(totalBudget - totalSpent, { compact: true })} icon={DollarSign} />
      </StatGroup>
      <Surface>
        <CardHeader title="By category" divider />
        <ul className="space-y-4">
          {BUDGET_LINES.map((b) => {
            const pct = Math.round((b.spent / b.budget) * 100);
            const tone = b.status === "Over" ? "danger" : b.status === "At risk" ? "warning" : "primary";
            return (
              <li key={b.id}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span style={{ color: "var(--app-fg)" }}>{b.category}</span>
                  <span className="tnum" style={{ color: "var(--app-fg-muted)" }}>{money(b.spent)} / {money(b.budget)}</span>
                </div>
                <MeterList items={[{ label: "", value: Math.min(pct, 100), tone, display: undefined }]} showValue={false} />
                <div className="mt-1 flex justify-between text-[10.5px]"><span style={{ color: "var(--app-fg-subtle)" }}>{pct}% used</span><Chip size="xs" variant="soft" color={tone}>{b.status}</Chip></div>
              </li>
            );
          })}
        </ul>
      </Surface>
    </div>
  );
}

/* ============================== Sales funnel ============================== */
const FUNNEL_STAGES = [
  { label: "Leads", value: 4200, tone: "primary" },
  { label: "Qualified", value: 2100, tone: "info" },
  { label: "Demo", value: 940, tone: "success" },
  { label: "Proposal", value: 480, tone: "warning" },
  { label: "Closed won", value: 210, tone: "danger" },
];

export function SalesFunnelPage() {
  return (
    <div>
      <PageHeader title="Sales funnel" subtitle="Conversion through every stage this quarter." breadcrumb={{ trail: [{ label: "CRM" }], current: "Sales Funnel" }} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Surface className="lg:col-span-2">
          <CardHeader title="Stage-to-stage conversion" divider />
          <ul className="space-y-4">
            {FUNNEL_STAGES.map((s, i) => {
              const pct = Math.round((s.value / FUNNEL_STAGES[0].value) * 100);
              const stepConv = i === 0 ? 100 : Math.round((s.value / FUNNEL_STAGES[i - 1].value) * 100);
              const color = `var(--app-${s.tone === "primary" ? "accent" : s.tone})`;
              return (
                <li key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-[12.5px]">
                    <span style={{ color: "var(--app-fg-strong)" }}>{s.label}</span>
                    <span className="tnum" style={{ color: "var(--app-fg-muted)" }}>{number(s.value)} · {stepConv}%</span>
                  </div>
                  <div className="h-9 w-full overflow-hidden rounded-lg" style={{ background: "var(--app-surface-2)" }}>
                    <div className="h-full rounded-lg" style={{ width: `${Math.max(pct, 6)}%`, background: color }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Surface>
        <div className="space-y-5">
          <Surface>
            <CardHeader title="Overall" divider />
            <Stat label="Lead → won" value="5.0%" delta={0.6} />
            <div className="mt-3"><Stat label="Avg. deal size" value={money(6820)} delta={-2} /></div>
            <div className="mt-3"><Stat label="Sales cycle" value="24 days" delta={-3} /></div>
          </Surface>
          <ChartCard title="Win rate trend" height={180} chartProps={{ type: "area", data: MONTHS.slice(0, 6).map((m, i) => ({ month: m, rate: 26 + i })), x: "month", series: [{ key: "rate", name: "Win %" }], line: { curve: "smooth", area: { show: true, fill: { opacity: 0.16 } } } }} />
        </div>
      </div>
    </div>
  );
}

/* ============================== Customer journey ============================== */
const JOURNEY = [
  { stage: "Awareness", tone: "primary", touch: "Blog, ads, referral", metric: "184k visits" },
  { stage: "Consideration", tone: "info", touch: "Pricing page, demo request", metric: "21k leads" },
  { stage: "Decision", tone: "warning", touch: "Trial, sales call", metric: "6.4k trials" },
  { stage: "Onboarding", tone: "success", touch: "Setup wizard, docs", metric: "3.9k activated" },
  { stage: "Retention", tone: "danger", touch: "QBRs, support, community", metric: "112% NRR" },
];

export function CustomerJourneyPage() {
  return (
    <div>
      <PageHeader title="Customer journey" subtitle="Every stage from first touch to renewal." breadcrumb={{ trail: [{ label: "CRM" }], current: "Customer Journey" }} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {JOURNEY.map((j, i) => (
          <Surface key={j.stage} className="relative">
            <span className="text-[11px] font-bold tnum" style={{ color: "var(--app-fg-subtle)" }}>0{i + 1}</span>
            <p className="mt-1 text-[13.5px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{j.stage}</p>
            <p className="mt-1 text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>{j.touch}</p>
            <Chip size="xs" variant="soft" color={j.tone} className="mt-3">{j.metric}</Chip>
          </Surface>
        ))}
      </div>
      <Surface className="mt-5">
        <CardHeader title="Conversion between stages" divider />
        <Chart
          type="bar"
          height={240}
          data={JOURNEY.map((j, i) => ({ stage: j.stage, pct: [100, 11, 30, 61, 88][i] }))}
          x="stage"
          series={[{ key: "pct", name: "Conversion %" }]}
          palette={{ roles: ["primary"] }}
          bar={{ radius: 4 }}
          legend={false}
        />
      </Surface>
    </div>
  );
}

/* ============================== Project timeline ============================== */
export function ProjectTimelinePage() {
  const items = PROJECTS.slice(0, 9).map((p, i) => ({
    id: p.id,
    title: `${p.name} — ${p.status}`,
    meta: `Lead ${p.lead}`,
    time: p.due,
    tone: ["primary", "info", "success", "warning", "danger"][i % 5],
  }));
  return (
    <div>
      <PageHeader title="Timeline" subtitle="Milestones across every active project." breadcrumb={{ trail: [{ label: "Projects" }], current: "Timeline" }} />
      <div className="mx-auto max-w-2xl">
        <Surface><Timeline items={items} /></Surface>
      </div>
    </div>
  );
}

/* ============================== Gantt ============================== */
export function GanttPage() {
  const rows = PROJECTS.slice(0, 8).map((p, i) => ({
    name: p.name,
    lead: p.lead,
    start: seeded(i, 6, 1),
    len: 2 + seeded(i, 5, 2),
    tone: ["primary", "info", "success", "warning"][i % 4],
    progress: p.progress,
  }));
  return (
    <div>
      <PageHeader title="Gantt view" subtitle="Projects across a 12-week window." breadcrumb={{ trail: [{ label: "Projects" }], current: "Gantt View" }} />
      <Surface padded={false} className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid border-b px-4 py-2 text-[10px]" style={{ gridTemplateColumns: "200px 1fr", borderColor: "var(--app-border)" }}>
            <span style={{ color: "var(--app-fg-subtle)" }}>Project</span>
            <div className="grid grid-cols-12">
              {Array.from({ length: 12 }).map((_, w) => (
                <span key={w} className="text-center" style={{ color: "var(--app-fg-subtle)" }}>W{w + 1}</span>
              ))}
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.name} className="grid items-center border-b px-4 py-3 last:border-0" style={{ gridTemplateColumns: "200px 1fr", borderColor: "var(--app-border)" }}>
              <div className="min-w-0 pr-3">
                <p className="truncate text-[12.5px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.name}</p>
                <p className="truncate text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>{r.lead}</p>
              </div>
              <div className="relative h-6">
                <div
                  className={cx("absolute top-1/2 h-4 -translate-y-1/2 overflow-hidden rounded-full")}
                  style={{
                    left: `${(r.start / 12) * 100}%`,
                    width: `${(r.len / 12) * 100}%`,
                    background: `var(--app-${r.tone === "primary" ? "accent" : r.tone}-soft)`,
                  }}
                >
                  <div className="h-full rounded-full" style={{ width: `${r.progress}%`, background: `var(--app-${r.tone === "primary" ? "accent" : r.tone})` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

