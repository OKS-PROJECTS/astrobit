import { cx } from "../../lib/cx";

/**
 * Card / surface container. oks-ui ships no Card primitive — this is the
 * composed replacement (a div + --app-* tokens). Logged in OKS-UI-FEEDBACK.md.
 *
 * props: as, padded (bool | "sm"), interactive (hover lift), tone ("plain"|"inset")
 */
export function Surface({
  as: Tag = "div",
  padded = true,
  interactive = false,
  tone = "plain",
  className,
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cx(
        "relative rounded-[var(--app-card-radius)] border transition-shadow duration-200",
        padded === "sm" ? "p-4" : padded ? "p-5" : "p-0",
        interactive && "hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none",
        className
      )}
      style={{
        background: tone === "inset" ? "var(--app-surface-inset)" : "var(--app-surface)",
        borderColor: "var(--app-border)",
        boxShadow: tone === "inset" ? "none" : "var(--app-card-shadow)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Card header: title + optional description on the left, actions on the right. */
export function CardHeader({ title, description, actions, divider = false, className }) {
  return (
    <div
      className={cx(
        "flex items-start justify-between gap-3",
        divider && "border-b pb-4 mb-4",
        className
      )}
      style={divider ? { borderColor: "var(--app-border)" } : undefined}
    >
      <div className="min-w-0">
        {title && (
          <h3 className="text-[15px] font-semibold leading-tight" style={{ color: "var(--app-fg-strong)" }}>
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1 text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Small uppercase eyebrow used above sub-sections. */
export function SectionTitle({ children, className }) {
  return (
    <p
      className={cx("text-[10.5px] font-bold uppercase tracking-[0.06em]", className)}
      style={{ color: "var(--app-fg-subtle)" }}
    >
      {children}
    </p>
  );
}
