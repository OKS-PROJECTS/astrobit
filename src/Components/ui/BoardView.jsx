import { MoreHorizontal, Plus } from "lucide-react";
import { Avatar, AvatarGroup, Badge, Button, Chip } from "oks-ui";
import { Surface } from "./Surface";
import { cx } from "../../lib/cx";

/**
 * Kanban / board layout — oks-ui ships none. Flex columns + Surface cards +
 * Badge counts. Logged in OKS-UI-FEEDBACK.md.
 *
 * columns: [{ key, title, tone, cards: [{ id, title, tag, tagTone, assignees, meta }] }]
 */
export function BoardView({ columns = [], onAddCard }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {columns.map((col) => (
        <div key={col.key} className="flex w-[300px] shrink-0 flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: `var(--app-${col.tone || "accent"})` }}
              />
              <span className="text-[13px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
                {col.title}
              </span>
              <Badge content={col.cards.length} variant="soft" color="default" size="sm" />
            </div>
            <Button size="xs" variant="ghost" isIconOnly aria-label={`Add card to ${col.title}`} onPress={() => onAddCard?.(col.key)}>
              <Plus size={14} />
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {col.cards.map((card) => (
              <Surface key={card.id} padded="sm" interactive className="cursor-grab active:cursor-grabbing">
                <div className="flex items-start justify-between gap-2">
                  {card.tag && (
                    <Chip size="xs" variant="soft" color={card.tagTone || "primary"}>
                      {card.tag}
                    </Chip>
                  )}
                  <MoreHorizontal size={15} style={{ color: "var(--app-fg-subtle)" }} />
                </div>
                <p className="mt-2 text-[13px] font-medium leading-snug" style={{ color: "var(--app-fg-strong)" }}>
                  {card.title}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] tnum" style={{ color: "var(--app-fg-subtle)" }}>
                    {card.meta}
                  </span>
                  {card.assignees?.length ? (
                    <AvatarGroup max={3} size="sm" classNames={{ base: "[&_*]:!h-6 [&_*]:!w-6" }}>
                      {card.assignees.map((a) => (
                        <Avatar key={a} name={a} classNames={{ base: "!h-6 !w-6 !text-[9px]" }} />
                      ))}
                    </AvatarGroup>
                  ) : null}
                </div>
              </Surface>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { cx };
