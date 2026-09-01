import { useEffect, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { Avatar, AvatarGroup, Board, Button, Chip } from "oks-ui";

/**
 * Kanban / board layout — now the real oks-ui `Board` (shipped in 1.1.0):
 * dependency-free drag-and-drop (pointer / touch / keyboard), WIP limits,
 * insertion line. Astrobit keeps the `{ columns: [{ key, title, tone, cards }] }`
 * shape; the wrapper flattens cards into Board's `items` model and tracks moves.
 *
 * columns: [{ key, title, tone, cards: [{ id, title, tag, tagTone, assignees, meta }] }]
 */
export function BoardView({ columns = [], onAddCard }) {
  const flatten = () =>
    columns.flatMap((col) => col.cards.map((c) => ({ ...c, __col: col.key })));
  const [items, setItems] = useState(flatten);

  // Re-sync when the source config changes (route switch).
  useEffect(() => {
    setItems(flatten());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const boardColumns = columns.map((col) => ({
    id: col.key,
    title: (
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${col.tone || "accent"})` }} />
        {col.title}
      </span>
    ),
    footer: (
      <Button
        size="xs"
        variant="ghost"
        fullWidth
        startContent={<Plus size={14} />}
        onPress={() => onAddCard?.(col.key)}
      >
        Add card
      </Button>
    ),
  }));

  const applyMove = ({ itemId, to }) => {
    setItems((prev) => {
      const moving = prev.find((it) => it.id === itemId);
      if (!moving) return prev;
      const rest = prev.filter((it) => it.id !== itemId);
      const inTarget = rest.filter((it) => it.__col === to.columnId);
      const others = rest.filter((it) => it.__col !== to.columnId);
      inTarget.splice(to.index, 0, { ...moving, __col: to.columnId });
      return [...others, ...inTarget];
    });
  };

  return (
    <Board
      aria-label="Board"
      columns={boardColumns}
      items={items}
      getItemId={(it) => it.id}
      getItemColumn={(it) => it.__col}
      onItemMove={applyMove}
      columnWidth={300}
      renderCard={(card) => (
        <div
          className="rounded-[12px] border p-3"
          style={{ background: "var(--app-surface)", borderColor: "var(--app-border)" }}
        >
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
              <AvatarGroup max={3} size={24}>
                {card.assignees.map((a) => (
                  <Avatar key={a} name={a} size={24} />
                ))}
              </AvatarGroup>
            ) : null}
          </div>
        </div>
      )}
    />
  );
}
