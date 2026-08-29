import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Chart } from "oks-ui";
import { cx } from "../../lib/cx";
import { Surface } from "./Surface";

const TONE = {
  primary: { fg: "var(--app-accent)", soft: "var(--app-accent-soft)", role: "primary" },
  info: { fg: "var(--app-info)", soft: "var(--app-info-soft)", role: "info" },
  success: { fg: "var(--app-ok)", soft: "var(--app-ok-soft)", role: "success" },
  warning: { fg: "var(--app-warn)", soft: "var(--app-warn-soft)", role: "warning" },
  danger: { fg: "var(--app-bad)", soft: "var(--app-bad-soft)", role: "danger" },
};

/** Trend pill — up/down arrow + delta. Composed (oks-ui Chip lacks a paired icon+sign convention). */
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
 * KPI / stat card. oks-ui ships no Stat card — composed from Surface + TrendChip
 * + an optional Chart sparkline. Logged in OKS-UI-FEEDBACK.md.
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
    <Surface className="flex flex-col">
      <div className="flex items-start justify-between">
        {Icon && (
          <span
            className="grid h-9 w-9 place-items-center rounded-[10px]"
            style={{ background: t.soft, color: t.fg }}
          >
            <Icon size={17} />
          </span>
        )}
        {typeof delta === "number" && (
          <TrendChip value={delta} suffix={deltaSuffix} positiveIsGood={positiveIsGood} />
        )}
      </div>
      <p className="mt-4 text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>
        {label}
      </p>
      <p className="mt-1 text-[26px] font-bold leading-none tnum" style={{ color: "var(--app-fg-strong)" }}>
        {value}
      </p>
      {hint && (
        <p className="mt-1.5 text-[11.5px]" style={{ color: "var(--app-fg-subtle)" }}>
          {hint}
        </p>
      )}
      {spark && (
        <div className="mt-3 -mx-1">
          <Chart
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
        </div>
      )}
    </Surface>
  );
}

/** Responsive row of KPI cards. */
export function StatGroup({ children, cols = 4, className }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 xl:grid-cols-4" };
  return <div className={cx("grid grid-cols-1 gap-4 xl:gap-5", map[cols] || map[4], className)}>{children}</div>;
}

/** Compact label/value stat for use inside cards. */
export function Stat({ label, value, delta }) {
  return (
    <div>
      <p className="text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>{label}</p>
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="text-[18px] font-semibold tnum" style={{ color: "var(--app-fg-strong)" }}>{value}</span>
        {typeof delta === "number" && <TrendChip value={delta} />}
      </div>
    </div>
  );
}
