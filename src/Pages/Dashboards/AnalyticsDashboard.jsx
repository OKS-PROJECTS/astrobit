import { useState } from "react";
import { Calendar, Download, MousePointerClick, Plus, TrendingUp, Users, Wallet } from "lucide-react";
import { Button, Chart } from "oks-ui";
import {
  CardHeader,
  DataTable,
  DonutCard,
  KpiCard,
  MeterList,
  PageHeader,
  StatGroup,
  StatusChip,
  Surface,
  Timeline,
  TrendChip,
} from "../../Components/ui";
import { EntityCell } from "../../Components/ui/Chips";
import { SegmentedControl } from "../../Components/ui/SegmentedControl";
import { ACTIVITY } from "../../data/app";
import {
  DEVICE_SPLIT,
  FUNNEL,
  REVENUE_TREND,
  TOP_PRODUCTS,
  TRAFFIC_SOURCES,
  spark,
} from "../../data/analytics";
import { money, number } from "../../lib/cx";

const SERIES_TABS = {
  Revenue: { key: "revenue", prefix: "$" },
  Orders: { key: "orders", prefix: "" },
  Sessions: { key: "sessions", prefix: "" },
};

export default function AnalyticsDashboard() {
  const [tab, setTab] = useState("Revenue");
  const active = SERIES_TABS[tab];

  return (
    <div>
      <PageHeader
        title="Welcome back, Nadia"
        subtitle="A snapshot of revenue, users and growth across the workspace."
        breadcrumb={{ trail: [{ label: "Dashboards" }], current: "Analytics" }}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Calendar size={15} />}>Last 30 days</Button>
            <Button size="sm" variant="bordered" startContent={<Download size={15} />}>Export</Button>
            <Button size="sm" color="primary" startContent={<Plus size={15} />}>Add widget</Button>
          </>
        }
      />

      <StatGroup className="mb-5">
        <KpiCard label="Total revenue" value={money(84210)} delta={12.4} icon={Wallet} tone="primary" spark={spark(60, 20, 1)} />
        <KpiCard label="Active users" value={number(12480)} delta={8.1} icon={Users} tone="info" spark={spark(52, 18, 4)} />
        <KpiCard label="Conversion rate" value="3.42%" delta={0.6} icon={TrendingUp} tone="success" spark={spark(40, 12, 9)} />
        <KpiCard label="Avg. order value" value={money(128.5, { decimals: 2 })} delta={-2.1} icon={MousePointerClick} tone="warning" spark={spark(58, 14, 6, -0.6)} />
      </StatGroup>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Surface className="flex flex-col lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-[15px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
                Revenue overview
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="text-[22px] font-bold tnum" style={{ color: "var(--app-fg-strong)" }}>
                  {money(486200)}
                </span>
                <TrendChip value={18.2} />
                <span className="whitespace-nowrap text-[11.5px]" style={{ color: "var(--app-fg-subtle)" }}>vs last year</span>
              </div>
            </div>
            <SegmentedControl
              options={Object.keys(SERIES_TABS)}
              value={tab}
              onChange={setTab}
            />
          </div>
          <div className="mt-4 flex-1">
            <Chart
              type="area"
              height={280}
              data={REVENUE_TREND}
              x="month"
              series={[{ key: active.key, name: tab }]}
              palette={{ roles: ["primary"] }}
              dataFormat={{ prefix: active.prefix, format: "compact" }}
              grid={{ show: false }}
              axisY={{ show: false }}
              line={{ curve: "smooth", strokeWidth: 2.5, markers: { size: 0 }, area: { show: true, fill: { opacity: 0.16 } } }}
              legend={false}
              tooltip={{ showTotal: false }}
              padding={{ top: 8, right: 6, bottom: 0, left: 0 }}
            />
          </div>
        </Surface>

        <DonutCard
          title="Traffic sources"
          data={TRAFFIC_SOURCES}
          centerValue={number(84200, { compact: true })}
          centerLabel="Total visits"
          height={170}
        />
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Surface className="lg:col-span-1">
          <CardHeader title="Conversion funnel" description="Last 30-day journey" />
          <ul className="mt-4 space-y-3">
            {FUNNEL.map((step) => {
              const pct = Math.round((step.value / FUNNEL[0].value) * 100);
              const color = `var(--app-${step.tone === "primary" ? "accent" : step.tone})`;
              return (
                <li key={step.label}>
                  <p className="mb-1 text-[12px]" style={{ color: "var(--app-fg-muted)" }}>{step.label}</p>
                  <div className="relative h-8 w-full overflow-hidden rounded-lg" style={{ background: "var(--app-surface-2)" }}>
                    <div
                      className="h-full rounded-lg transition-[width] duration-500 motion-reduce:transition-none"
                      style={{ width: `${Math.max(pct, 8)}%`, background: color }}
                    />
                    <span
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-[11px] font-semibold tnum"
                      style={{ background: "var(--app-surface)", color: "var(--app-fg-strong)", boxShadow: "0 1px 2px rgba(16,24,40,.12)" }}
                    >
                      {number(step.value)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Surface>

        <Surface padded={false} className="lg:col-span-2">
          <CardHeader title="Top performing products" actions={<Button size="sm" variant="link">View all</Button>} className="p-5 pb-0" />
          <div className="mt-3">
            <DataTable
              pageSize={5}
              columns={[
                { key: "name", header: "Product", render: (r) => <EntityCell name={r.name} sub={r.sku} square /> },
                { key: "channel", header: "Channel" },
                { key: "units", header: "Sales", align: "right", sortable: true, render: (r) => number(r.units) },
                { key: "revenue", header: "Revenue", align: "right", sortable: true, render: (r) => money(r.revenue) },
                { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
              ]}
              rows={TOP_PRODUCTS}
              selectable={false}
            />
          </div>
        </Surface>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Surface>
          <CardHeader title="Recent activity" actions={<Button size="sm" variant="link">All</Button>} divider />
          <Timeline items={ACTIVITY} />
        </Surface>

        <Surface>
          <CardHeader title="Sessions by device" description="Where your traffic comes from" divider />
          <MeterList items={DEVICE_SPLIT} />
        </Surface>

        <Surface className="flex flex-col justify-between">
          <CardHeader title="Monthly target" description="You're ahead of schedule" divider />
          <div className="flex flex-1 flex-col items-center justify-center pt-2">
            <div className="donut-no-center relative h-36 w-48">
              <Chart
                type="pie"
                height={144}
                data={[
                  { label: "Reached", value: 78 },
                  { label: "Remaining", value: 22 },
                ]}
                x="label"
                series="value"
                pie={{ arc: "semi", donut: true }}
                pieStyle={{ innerRatio: 0.74, borderWidth: 0 }}
                palette={{ colors: ["var(--app-accent)", "var(--app-surface-2)"] }}
                legend={false}
                tooltip={false}
                showLabels={{ show: false }}
              />
              <div className="absolute inset-x-0 bottom-1 text-center">
                <span className="text-[24px] font-bold tnum" style={{ color: "var(--app-fg-strong)" }}>78%</span>
                <p className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>
                  {money(98400, { compact: true })} of {money(126000, { compact: true })}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t pt-3 text-center" style={{ borderColor: "var(--app-border)" }}>
            <div>
              <p className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>Target</p>
              <p className="text-[14px] font-semibold tnum" style={{ color: "var(--app-fg-strong)" }}>{money(126000, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>This month</p>
              <p className="text-[14px] font-semibold tnum" style={{ color: "var(--app-fg-strong)" }}>{money(98400, { compact: true })}</p>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}
