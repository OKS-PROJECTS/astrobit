import { Calendar, Download } from "lucide-react";
import { Button } from "oks-ui";
import { ChartCard, DataTable, KpiCard, PageHeader, StatGroup, Surface, CardHeader } from "../../Components/ui";

/**
 * ReportPage — config-driven report archetype: KPI row + chart(s) + a data table.
 * config: { title, subtitle, breadcrumb, stats, charts:[chartProps+title], table:{columns,rows} }
 */
export default function ReportPage({ config }) {
  const { title, subtitle, breadcrumb, stats = [], charts = [], table } = config;
  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Calendar size={15} />}>Last 90 days</Button>
            <Button size="sm" color="primary" startContent={<Download size={15} />}>Export PDF</Button>
          </>
        }
      />
      {stats.length > 0 && (
        <StatGroup className="mb-5" cols={stats.length === 3 ? 3 : 4}>
          {stats.map((s, i) => (
            <KpiCard key={s.label} tone={["primary", "info", "success", "warning"][i % 4]} {...s} />
          ))}
        </StatGroup>
      )}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {charts.map((c, i) => (
          <ChartCard key={i} title={c.title} description={c.description} height={c.height || 260} chartProps={c} />
        ))}
      </div>
      {table && (
        <Surface padded={false}>
          <CardHeader title={table.title || "Breakdown"} className="p-4" />
          <DataTable columns={table.columns} rows={table.rows} pageSize={table.pageSize || 8} />
        </Surface>
      )}
    </div>
  );
}
