import { Avatar } from "oks-ui";
import { cx } from "../../lib/cx";

/**
 * Timeline / activity feed — oks-ui ships none. A rail with dot markers +
 * optional avatars. Logged in OKS-UI-FEEDBACK.md.
 *
 * items: [{ id, title, meta, time, icon, avatar, name, tone }]
 */
const TONE = {
  default: "var(--app-fg-subtle)",
  primary: "var(--app-accent)",
  success: "var(--app-ok)",
  warning: "var(--app-warn)",
  danger: "var(--app-bad)",
  info: "var(--app-info)",
};

export function Timeline({ items = [], className }) {
  return (
    <ol className={cx("relative space-y-5", className)}>
      <span
        className="absolute left-[11px] top-1 bottom-1 w-px"
        style={{ background: "var(--app-border-strong)" }}
        aria-hidden
      />
      {items.map((it) => (
        <li key={it.id} className="relative flex gap-3">
          <span className="relative z-10 mt-0.5 shrink-0">
            {it.avatar || it.name ? (
              <Avatar size="sm" src={it.avatar} name={it.name} classNames={{ base: "!h-6 !w-6 !text-[10px]" }} />
            ) : (
              <span
                className="grid h-6 w-6 place-items-center rounded-full border"
                style={{
                  borderColor: "var(--app-border-strong)",
                  background: "var(--app-surface)",
                  color: TONE[it.tone] || TONE.default,
                }}
              >
                {it.icon ? <it.icon size={12} /> : <span className="h-2 w-2 rounded-full" style={{ background: TONE[it.tone] || TONE.default }} />}
              </span>
            )}
          </span>
          <div className="min-w-0 flex-1 pb-1">
            <p className="text-[12.5px] leading-snug" style={{ color: "var(--app-fg)" }}>
              {it.title}
            </p>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>
              {it.meta ? `${it.meta} · ` : ""}
              {it.time}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
