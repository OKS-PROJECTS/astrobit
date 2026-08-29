import { cx } from "../../lib/cx";

/**
 * Progress bar / meter — oks-ui ships no progress primitive. A div bar +
 * --app-* tokens. Logged in OKS-UI-FEEDBACK.md.
 */
export function Meter({ value, max = 100, tone = "primary", className, height = 8 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color = {
    primary: "var(--app-accent)",
    success: "var(--app-ok)",
    warning: "var(--app-warn)",
    danger: "var(--app-bad)",
    info: "var(--app-info)",
  }[tone];
  return (
    <div
      className={cx("w-full overflow-hidden rounded-full", className)}
      style={{ background: "var(--app-surface-2)", height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
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
