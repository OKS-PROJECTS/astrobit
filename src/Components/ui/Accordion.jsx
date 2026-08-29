import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "../../lib/cx";

/**
 * Accordion / collapse — oks-ui ships none. button[aria-expanded] + a height
 * transition. Logged in OKS-UI-FEEDBACK.md.
 *
 * items: [{ id, question/title, answer/content }]
 */
export function Accordion({ items = [], defaultOpen = [], single = false }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const toggle = (id) =>
    setOpen((prev) => {
      const next = single ? new Set() : new Set(prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="divide-y" style={{ borderColor: "var(--app-border)" }}>
      {items.map((it) => {
        const isOpen = open.has(it.id);
        return (
          <div key={it.id} style={{ borderColor: "var(--app-border)" }} className="border-b last:border-0">
            <button
              type="button"
              onClick={() => toggle(it.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[13.5px] font-medium" style={{ color: "var(--app-fg-strong)" }}>
                {it.title || it.question}
              </span>
              <ChevronDown
                size={16}
                className={cx("shrink-0 transition-transform duration-200 motion-reduce:transition-none", isOpen && "rotate-180")}
                style={{ color: "var(--app-fg-subtle)" }}
              />
            </button>
            <div
              className={cx("grid transition-all duration-200 motion-reduce:transition-none", isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden text-[12.5px] leading-relaxed" style={{ color: "var(--app-fg-muted)" }}>
                {it.content || it.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
