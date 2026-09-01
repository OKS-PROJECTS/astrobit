import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Chart, Stat as OksStat, StatGroup as OksStatGroup } from "oks-ui";
import { cx } from "../../lib/cx";
import { Surface } from "./Surface";

const TONE = {
  primary: { fg: "var(--app-accent)", soft: "var(--app-accent-soft)", role: "primary" },
  info: { fg: "var(--app-info)", soft: "var(--app-info-soft)", role: "info" },
  success: { fg: "var(--app-ok)", soft: "var(--app-ok-soft)", role: "success" },
  warning: { fg: "var(--app-warn)", soft: "var(--app-warn-soft)", role: "warning" },
  danger: { fg: "var(--app-bad)", soft: "var(--app-bad-soft)", role: "danger" },
};

/** Trend pill — up/down arrow + delta. Kept: it encodes Astrobit's `positiveIsGood`
 *  convention, which the component's `trend` prop (pure up/down colour) can't. */
export function TrendChip({ value, suffix = "%", positiveIsGood = true, className }) {
  const up = value >= 0;
  const good = up === positiveIsGood;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tnum",
        className
      )}
      style={{
        color: good ? "var(--app-ok)" : "var(--app-bad)",
        background: good ? "var(--app-ok-soft)" : "var(--app-bad-soft)",
      }}
    >
      <Icon size={12} />
      {Math.abs(value)}
      {suffix}
    </span>
  );
}

/**
 * KPI / stat card — now the real oks-ui `Stat` (shipped in 1.1.0) wrapped in a
 * Surface (Stat brings no surface of its own). Astrobit keeps the `tone` icon
 * tint, the `positiveIsGood` trend pill and the sparkline recipe.
 */
export function KpiCard({
  label,
  value,
  delta,
  deltaSuffix = "%",
  positiveIsGood = true,
  icon: Icon,
  spark,
  tone = "primary",
  sparkRole,
  hint,
}) {
  const t = TONE[tone] || TONE.primary;
  const role = sparkRole || t.role;
  return (
    <Surface padded="sm" className="sm:!p-5">
      <OksStat
        label={label}
        value={<span className="tnum">{value}</span>}
        help={hint}
        icon={
          Icon ? (
            <span
              className="grid h-8 w-8 place-items-center rounded-[10px] sm:h-9 sm:w-9"
              style={{ background: t.soft, color: t.fg }}
            >
              <Icon size={17} />
            </span>
          ) : undefined
        }
        delta={
          typeof delta === "number" ? (
            <TrendChip value={delta} suffix={deltaSuffix} positiveIsGood={positiveIsGood} />
          ) : (
            delta
          )
        }
        spark={
          spark ? (
            <Chart
              unstyled
              type="line"
              height={34}
              data={spark.map((y, x) => ({ x, y }))}
              x="x"
              series={[{ key: "y", name: label }]}
              palette={{ roles: [role] }}
              grid={{ show: false }}
              axisX={{ show: false }}
              axisY={{ show: false }}
              legend={false}
              tooltip={false}
              line={{ curve: "smooth", strokeWidth: 2, markers: { size: 0 } }}
              padding={{ top: 4, right: 2, bottom: 2, left: 2 }}
            />
          ) : undefined
        }
      />
    </Surface>
  );
}

/** Responsive row of KPI cards. Now the real oks-ui `StatGroup` grid. */
export function StatGroup({ children, cols = 4, className }) {
  return (
    <OksStatGroup columns={cols} className={cx("gap-3 sm:gap-4 xl:gap-5", className)}>
      {children}
    </OksStatGroup>
  );
}

/** Compact label/value stat for use inside cards. */
export function Stat({ label, value, delta }) {
  return (
    <OksStat
      label={label}
      value={<span className="tnum">{value}</span>}
      delta={typeof delta === "number" ? <TrendChip value={delta} /> : delta}
      size="sm"
    />
  );
}
