import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CommandPalette as OksCommandPalette } from "oks-ui";
import { NAV, ROUTE_LABEL } from "../../data/nav";

/**
 * Command palette (⌘K) — now the real oks-ui `CommandPalette` (shipped in
 * 1.1.0: combobox/listbox ARIA, arrow-key nav, focus trap + restore). Replaces
 * the Modal-with-hidden-header workaround from OKS-UI-FEEDBACK.md.
 */
function buildEntries() {
  const out = [];
  const walk = (items, trail) => {
    for (const n of items) {
      if (n.children) walk(n.children, [...trail, n.label]);
      else if (n.to) {
        out.push({
          id: n.to,
          label: n.label,
          description: trail.join(" / ") || undefined,
          group: trail[0],
          keywords: trail,
        });
      }
    }
  };
  NAV.forEach((s) => walk(s.items, []));
  return out;
}

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const items = useMemo(() => buildEntries(), []);

  return (
    <OksCommandPalette
      isOpen={open}
      onClose={onClose}
      items={items}
      placeholder="Search pages and actions…"
      emptyMessage="No matching pages."
      size="lg"
      onSelect={(item) => {
        onClose();
        navigate(item.id);
      }}
    />
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
