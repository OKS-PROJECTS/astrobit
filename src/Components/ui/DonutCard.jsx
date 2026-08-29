import { Chart } from "oks-ui";
import { Surface, CardHeader } from "./Surface";

/**
 * Donut with a custom centre value. oks-ui `<Chart type="donut">` renders its
 * own centre total with no slot / opt-out (logged, major) — so we render a
 * `pie` chart with a large inner ratio and overlay our own centre label.
 *
 * data: [{ label, value, color? }]
 */
export function DonutCard({ title, description, actions, data = [], centerValue, centerLabel, height = 260, legend }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <Surface className="flex flex-col">
      {(title || actions) && <CardHeader title={title} description={description} actions={actions} />}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 py-1">
        <div className="donut-no-center relative shrink-0" style={{ width: height, height }}>
          <Chart
            type="donut"
            height={height}
            data={data}
            x="label"
            series="value"
            pie={{ donut: true }}
            pieStyle={{ innerRatio: 0.74, padAngleDeg: 1.5, borderWidth: 0 }}
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
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[19px] font-bold leading-none tnum" style={{ color: "var(--app-fg-strong)" }}>
              {centerValue ?? total.toLocaleString()}
            </span>
            <span className="mt-1 text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>
              {centerLabel ?? "Total"}
            </span>
          </div>
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
