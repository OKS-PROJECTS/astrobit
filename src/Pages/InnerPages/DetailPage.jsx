import { Button } from "oks-ui";
import { CardHeader, PageHeader, Stat, StatGroup, Surface, Timeline } from "../../Components/ui";
import { cx } from "../../lib/cx";

/**
 * DetailPage — config-driven entity detail archetype.
 *
 * config: {
 *   title, subtitle, breadcrumb, actions?,
 *   stats?: [{label,value,delta}],
 *   sections: [{ title, rows: [{label, value}] }],
 *   activity?: Timeline items,
 *   aside?: [{ title, rows }]
 * }
 */
export default function DetailPage({ config }) {
  const { title, subtitle, breadcrumb, stats = [], sections = [], activity = [], aside = [] } = config;

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        actions={
          <>
            <Button size="sm" variant="bordered">Edit</Button>
            <Button size="sm" color="primary">Primary action</Button>
          </>
        }
      />

      {stats.length > 0 && (
        <StatGroup className="mb-5" cols={stats.length === 3 ? 3 : 4}>
          {stats.map((s) => (
            <Surface key={s.label}>
              <Stat {...s} />
            </Surface>
          ))}
        </StatGroup>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {sections.map((section, i) => (
            <Surface key={i}>
              <CardHeader title={section.title} divider />
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {section.rows.map((row) => (
                  <div key={row.label} className={cx(row.full && "sm:col-span-2")}>
                    <dt className="text-[11.5px] uppercase tracking-[0.04em]" style={{ color: "var(--app-fg-subtle)" }}>
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[13.5px]" style={{ color: "var(--app-fg-strong)" }}>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Surface>
          ))}
        </div>

        <div className="space-y-5">
          {aside.map((block, i) => (
            <Surface key={i}>
              <CardHeader title={block.title} divider />
              <dl className="space-y-3">
                {block.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3 text-[12.5px]">
                    <dt style={{ color: "var(--app-fg-muted)" }}>{row.label}</dt>
                    <dd className="text-right font-medium" style={{ color: "var(--app-fg-strong)" }}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Surface>
          ))}
          {activity.length > 0 && (
            <Surface>
              <CardHeader title="Activity" divider />
              <Timeline items={activity} />
            </Surface>
          )}
        </div>
      </div>
    </div>
  );
}
