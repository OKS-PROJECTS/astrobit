import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerDownLeft, Search } from "lucide-react";
import { Modal, TextField } from "oks-ui";
import { NAV, ROUTE_LABEL } from "../../data/nav";
import { cx } from "../../lib/cx";

/**
 * Command palette (⌘K) — oks-ui ships none. Modal (header hidden) + a filtered
 * list + a hotkey hook. Logged in OKS-UI-FEEDBACK.md (nice-to-have).
 */
const ENTRIES = (() => {
  const out = [];
  const walk = (items, trail) => {
    for (const n of items) {
      if (n.children) walk(n.children, [...trail, n.label]);
      else if (n.to) out.push({ to: n.to, label: n.label, trail: trail.join(" / ") });
    }
  };
  NAV.forEach((s) => walk(s.items, []));
  return out;
})();

function PaletteBody({ onClose }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = term
      ? ENTRIES.filter((e) => e.label.toLowerCase().includes(term) || e.trail.toLowerCase().includes(term))
      : ENTRIES.slice(0, 8);
    return list.slice(0, 12);
  }, [q]);

  const go = (to) => {
    onClose();
    navigate(to);
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
        if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
        if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].to); }
      }}
    >
      <div className="border-b p-3" style={{ borderColor: "var(--app-border)" }}>
        <TextField
          autoFocus
          variant="soft"
          value={q}
          onChange={(v) => { setQ(v); setActive(0); }}
          placeholder="Search pages and actions…"
          startIcon={<Search size={16} />}
          aria-label="Search"
        />
      </div>
      <ul className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-3 py-6 text-center text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>
            No matches for “{q}”.
          </li>
        )}
        {results.map((r, i) => (
          <li key={r.to}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.to)}
              className={cx("flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-2 text-left")}
              style={{ background: i === active ? "var(--app-menu-hover-bg)" : "transparent" }}
            >
              <span>
                <span className="text-[13px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.label}</span>
                {r.trail && <span className="ml-2 text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>{r.trail}</span>}
              </span>
              {i === active && <CornerDownLeft size={13} style={{ color: "var(--app-fg-subtle)" }} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CommandPalette({ open, onClose }) {
  return (
    <Modal isOpen={open} onClose={onClose} size="lg" classNames={{ header: "!hidden", body: "!p-0" }} aria-label="Command palette">
      {open && <PaletteBody onClose={onClose} />}
    </Modal>
  );
}

/** ⌘K / Ctrl+K global hotkey. */
export function useCommandHotkey(setOpen) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);
}

export { ROUTE_LABEL };
