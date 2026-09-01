import { Avatar, Timeline as OksTimeline, TimelineItem } from "oks-ui";

/**
 * Vertical activity feed. Now backed by oks-ui `Timeline` + `TimelineItem`
 * (shipped in 1.1.0). Astrobit keeps the `items` array API so call sites stay
 * stable; each entry maps onto a `<TimelineItem>`.
 *
 * items: [{ id, title, meta, time, icon, avatar, name, tone }]
 */
const TONE = {
  default: "default",
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
};

export function Timeline({ items = [], className }) {
  return (
    <OksTimeline className={className}>
      {items.map((it) => {
        const Icon = it.icon;
        const marker =
          it.avatar || it.name ? (
            <Avatar size={24} src={it.avatar} name={it.name} />
          ) : Icon ? (
            <Icon size={12} />
          ) : undefined;
        return (
          <TimelineItem
            key={it.id}
            title={<span className="text-[12.5px] leading-snug">{it.title}</span>}
            time={it.time}
            icon={marker}
            color={TONE[it.tone] || "default"}
          >
            {it.meta && (
              <span className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>
                {it.meta}
              </span>
            )}
          </TimelineItem>
        );
      })}
    </OksTimeline>
  );
}
