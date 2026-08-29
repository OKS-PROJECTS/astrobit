import { Calendar, Download } from "lucide-react";
import { Button } from "oks-ui";
import {
  CardHeader,
  ChartCard,
  DataTable,
  DonutCard,
  KpiCard,
  MeterList,
  PageHeader,
  StatGroup,
  Surface,
  Timeline,
} from "../../Components/ui";

/**
 * DashboardPage — config-driven dashboard archetype used by every dashboard
 * except Analytics (which is bespoke, to full reference fidelity).
 *
 * config: {
 *   title, subtitle, breadcrumb, rangeLabel?,
 *   kpis: KpiCard props[],
 *   mainChart: { title, description, ...chartProps },
 *   donut?: DonutCard props,
 *   meters?: { title, description, items },
 *   secondaryChart?: { title, ...chartProps },
 *   table?: { title, columns, rows, pageSize? },
 *   timeline?: { title, items },
 * }
 */
export default function DashboardPage({ config }) {
  const { title, subtitle, breadcrumb, rangeLabel = "Last 30 days", kpis = [], mainChart, donut, meters, secondaryChart, table, timeline } = config;

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Calendar size={15} />}>{rangeLabel}</Button>
            <Button size="sm" color="primary" startContent={<Download size={15} />}>Export</Button>
          </>
        }
      />

      <StatGroup className="mb-5" cols={kpis.length === 3 ? 3 : 4}>
        {kpis.map((k, i) => (
          <KpiCard key={k.label} tone={["primary", "info", "success", "warning"][i % 4]} {...k} />
        ))}
      </StatGroup>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title={mainChart.title} description={mainChart.description} height={mainChart.height || 300} chartProps={mainChart} />
        </div>
        {donut ? <DonutCard {...donut} /> : meters ? (
          <Surface>
            <CardHeader title={meters.title} description={meters.description} divider />
            <MeterList items={meters.items} />
          </Surface>
        ) : null}
      </div>

      {(secondaryChart || timeline) && (
        <div className="mb-5 grid gap-5 lg:grid-cols-3">
          {secondaryChart && (
            <div className="lg:col-span-2">
              <ChartCard title={secondaryChart.title} description={secondaryChart.description} height={secondaryChart.height || 260} chartProps={secondaryChart} />
            </div>
          )}
          {timeline && (
            <Surface>
              <CardHeader title={timeline.title} divider />
              <Timeline items={timeline.items} />
            </Surface>
          )}
        </div>
      )}

      {table && (
        <Surface padded={false}>
          <CardHeader title={table.title} className="p-5 pb-0" />
          <div className="mt-3">
            <DataTable columns={table.columns} rows={table.rows} pageSize={table.pageSize || 6} selectable={false} />
          </div>
        </Surface>
      )}
    </div>
  );
}
