import { Avatar, Chip } from "oks-ui";
import { cx } from "../../lib/cx";

/**
 * Status chip — maps a status string to an oks-ui Chip colour + soft variant.
 * Wraps oks-ui `Chip` (which exists) with the template's shared status vocabulary.
 */
const STATUS_TONE = {
  active: "success", online: "success", "in stock": "success", paid: "success",
  completed: "success", delivered: "success", approved: "success", won: "success",
  published: "success", success: "success", open: "info", "in progress": "info",
  processing: "info", pending: "warning", "low stock": "warning", invited: "warning",
  trial: "warning", review: "warning", draft: "default", offline: "default",
  archived: "default", inactive: "default", failed: "danger", "out of stock": "danger",
  suspended: "danger", cancelled: "danger", overdue: "danger", lost: "danger", blocked: "danger",
};

export function StatusChip({ status, size = "sm" }) {
  const key = String(status || "").toLowerCase();
  const color = STATUS_TONE[key] || "default";
  const text = String(status);
  const label = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  return (
    <Chip size={size} variant="soft" color={color}>
      {label}
    </Chip>
  );
}

/**
 * Entity cell — avatar + primary line + secondary line. oks-ui has no table,
 * so this is the shared "person / product / company" cell renderer. Logged.
 */
export function EntityCell({ name, sub, src, initials, square = false, icon }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <Avatar
        size="sm"
        src={src}
        name={name}
        radius={square ? "md" : "full"}
        icon={icon}
        className="shrink-0"
        classNames={{ base: "!h-8 !w-8" }}
      >
        {initials}
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium leading-tight" style={{ color: "var(--app-fg-strong)" }}>
          {name}
        </p>
        {sub && (
          <p className="truncate text-[11.5px] leading-tight" style={{ color: "var(--app-fg-subtle)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

/** Tiny coloured dot + label. */
export function DotLabel({ color = "var(--app-accent)", children, className }) {
  return (
    <span className={cx("inline-flex items-center gap-2 text-[12.5px]", className)} style={{ color: "var(--app-fg)" }}>
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}
