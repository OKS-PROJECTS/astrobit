import { Inbox } from "lucide-react";
import { EmptyState as OksEmptyState } from "oks-ui";

/**
 * "Nothing here" placeholder. Now backed by oks-ui `EmptyState` (shipped in
 * 1.1.0). Astrobit keeps the `icon` (component) + `action` + `compact` props so
 * call sites stay stable, and maps them onto the real component's API.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  action,
  className,
  compact = false,
}) {
  return (
    <OksEmptyState
      title={title}
      description={description}
      icon={Icon ? <Icon size={22} /> : undefined}
      actions={action}
      size={compact ? "sm" : "md"}
      className={className}
    />
  );
}
