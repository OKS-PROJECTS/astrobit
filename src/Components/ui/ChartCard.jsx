import { Chart } from "oks-ui";
import { Surface, CardHeader } from "./Surface";

/**
 * ChartCard — a Surface wrapper around oks-ui `<Chart>` (the only charting tool).
 * Keeps chart cards visually consistent: shared header + a themed default set.
 * Line / area charts render clean (no gridlines, no Y-axis, no point markers) to
 * match the reference; bar / column keep a subtle horizontal grid + axis.
 */
export function ChartCard({ title, description, actions, height = 280, children, chartProps, footer }) {
  // Chart draws its own title/description block — strip them so the card header
  // is the single source of truth.
  const { title: _t, description: _d, ...chart } = chartProps || {};
  const isLiney = chart.type === "line" || chart.type === "area";

  const merged = isLiney
    ? {
        ...chart,
        grid: { show: false, ...chart.grid },
        axisY: { show: false, ...chart.axisY },
        line: { curve: "smooth", markers: { size: 0 }, ...chart.line },
        padding: { top: 8, right: 6, bottom: 0, left: 0, ...chart.padding },
      }
    : {
        grid: { horizontal: true, vertical: false, lineOpacity: 0.35 },
        ...chart,
      };

  return (
    <Surface className="flex flex-col">
      {(title || actions) && <CardHeader title={title} description={description} actions={actions} />}
      <div className="mt-2 flex-1">
        {chartProps ? (
          <Chart
            height={height}
            palette={{ roles: ["primary", "info", "success", "warning", "danger"] }}
            legend={chart.legend ?? false}
            tooltip={chart.tooltip ?? { showTotal: true }}
            {...merged}
          />
        ) : (
          children
        )}
      </div>
      {footer && (
        <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--app-border)" }}>
          {footer}
        </div>
      )}
    </Surface>
  );
}
