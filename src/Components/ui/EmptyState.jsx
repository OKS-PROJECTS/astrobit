import { Inbox } from "lucide-react";
import { cx } from "../../lib/cx";

/**
 * EmptyState — oks-ui ships none. icon + title + description + optional action.
 * Logged in OKS-UI-FEEDBACK.md.
 */
export function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", description, action, className, compact = false }) {
  return (
    <div className={cx("flex flex-col items-center justify-center text-center", compact ? "py-10" : "py-16", className)}>
      <span
        className="grid place-items-center rounded-2xl"
        style={{ height: 48, width: 48, background: "var(--app-surface-2)", color: "var(--app-fg-subtle)" }}
      >
        <Icon size={22} />
      </span>
      <p className="mt-3 text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-sm text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
