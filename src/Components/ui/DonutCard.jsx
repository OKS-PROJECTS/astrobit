import { Chart } from "oks-ui";
import { Surface, CardHeader } from "./Surface";

/**
 * Donut with a custom centre value. oks-ui 1.1.0 added `pie.center` /
 * `pie.renderCenter` (OKS-UI-FEEDBACK.md B1), so the CSS hack + HTML overlay
 * are gone — the centre label is now a real chart slot.
 *
 * data: [{ label, value, color? }]
 */
export function DonutCard({ title, description, actions, data = [], centerValue, centerLabel, height = 260, legend }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <Surface className="flex flex-col">
      {(title || actions) && <CardHeader title={title} description={description} actions={actions} />}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 py-1">
        <div className="shrink-0" style={{ width: height, height }}>
          <Chart
            unstyled
            type="donut"
            height={height}
            data={data}
            x="label"
            series="value"
            pie={{
              donut: true,
              donutInnerRadiusRatio: 0.74,
              renderCenter: () => (
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-[19px] font-bold leading-none tnum" style={{ color: "var(--app-fg-strong)" }}>
                    {centerValue ?? total.toLocaleString()}
                  </span>
                  <span className="mt-1 text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>
                    {centerLabel ?? "Total"}
                  </span>
                </div>
              ),
            }}
            palette={{
              colors: data.map(
                (d, i) =>
                  d.color ||
                  ["var(--app-accent)", "var(--app-info)", "var(--app-ok)", "var(--app-warn)", "var(--app-bad)"][i % 5]
              ),
            }}
            legend={false}
            tooltip={{ show: true }}
            showLabels={{ show: false }}
          />
        </div>
        {legend !== false && (
          <ul className="min-w-[140px] flex-1 space-y-2.5">
            {data.map((d, i) => (
              <li key={d.label} className="flex items-center justify-between gap-3 text-[12px]">
                <span className="flex items-center gap-2 whitespace-nowrap" style={{ color: "var(--app-fg-muted)" }}>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background:
                        d.color ||
                        ["var(--app-accent)", "var(--app-info)", "var(--app-ok)", "var(--app-warn)", "var(--app-bad)"][i % 5],
                    }}
                  />
                  {d.label}
                </span>
                <span className="tnum font-semibold" style={{ color: "var(--app-fg-strong)" }}>
                  {d.display ?? `${Math.round((d.value / total) * 100)}%`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Surface>
  );
}
