import { Progress } from "oks-ui";
import { cx } from "../../lib/cx";

/**
 * Progress bar / meter — now backed by oks-ui `Progress` (shipped in 1.1.0).
 * Astrobit keeps the `Meter` + `MeterList` names and the `tone` vocabulary so
 * call sites stay stable.
 */
const TONE = {
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
};

export function Meter({ value, max = 100, tone = "primary", className, size = "sm" }) {
  return (
    <Progress
      value={value}
      maxValue={max}
      color={TONE[tone] || "primary"}
      size={size}
      aria-label="Progress"
      className={cx("w-full", className)}
    />
  );
}

/** A labelled list of meters — traffic sources, device split, category share, … */
export function MeterList({ items = [], className, showValue = true }) {
  return (
    <ul className={cx("space-y-3.5", className)}>
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2" style={{ color: "var(--app-fg)" }}>
              {it.dot && <span className="h-2 w-2 rounded-full" style={{ background: it.color || "var(--app-accent)" }} />}
              {it.label}
            </span>
            {showValue && (
              <span className="tnum font-medium" style={{ color: "var(--app-fg-muted)" }}>
                {it.display ?? `${it.value}%`}
              </span>
            )}
          </div>
          <Meter value={it.value} max={it.max ?? 100} tone={it.tone || "primary"} />
        </li>
      ))}
    </ul>
  );
}
