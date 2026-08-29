import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "oks-ui";
import { NAV } from "../../data/nav";
import { cx } from "../../lib/cx";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------ *
 * oks-ui ships no Sidebar / nav-tree. This recursive component + data/nav.js
 * is the composed replacement (logged in OKS-UI-FEEDBACK.md).
 *
 * Split by node type so hooks never sit after an early return:
 *   NavLeaf  — no hooks
 *   NavGroup — owns nothing; open state is lifted to Sidebar (single-open)
 *   NavNode  — dispatcher
 * ------------------------------------------------------------------ */

const rowBase =
  "group flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[12.5px] font-medium transition-colors";

function NavLeaf({ node, depth, collapsed, onNavigate }) {
  return (
    <NavLink
      to={node.to}
      end={node.to === "/"}
      onClick={onNavigate}
      className={() =>
        cx(rowBase, depth > 0 && !collapsed && "pl-3.5", collapsed && "justify-center px-0")
      }
      style={({ isActive }) => ({
        color: isActive ? "var(--app-menu-active-fg)" : "var(--app-menu-fg)",
        background: isActive ? "var(--app-menu-active-bg)" : "transparent",
      })}
      onMouseEnter={(e) => {
        if (!e.currentTarget.getAttribute("aria-current"))
          e.currentTarget.style.background = "var(--app-menu-hover-bg)";
      }}
      onMouseLeave={(e) => {
        if (!e.currentTarget.getAttribute("aria-current")) e.currentTarget.style.background = "transparent";
      }}
      title={collapsed ? node.label : undefined}
    >
      {({ isActive }) => (
        <>
          {node.icon ? (
            <node.icon size={17} className="shrink-0" />
          ) : depth > 0 && !collapsed ? (
            <span
              className="ml-1 mr-1 h-1.5 w-1.5 shrink-0 rounded-full transition-colors"
              style={{ background: isActive ? "var(--app-menu-active-fg)" : "var(--app-menu-fg-muted)" }}
            />
          ) : null}
          {!collapsed && <span className="truncate">{node.label}</span>}
        </>
      )}
    </NavLink>
  );
}

function NavGroup({ node, depth, collapsed, open, onToggle, onNavigate }) {
  const { pathname } = useLocation();
  const pathActive = node.children.some((c) => c.to && pathname.startsWith(c.to));
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const Icon = node.icon;

  if (collapsed && depth === 0) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setFlyoutOpen(true)}
        onMouseLeave={() => setFlyoutOpen(false)}
      >
        <button
          type="button"
          className={cx(rowBase, "w-full justify-center px-0")}
          style={{ color: pathActive ? "var(--app-menu-active-fg)" : "var(--app-menu-fg)" }}
          aria-label={node.label}
        >
          {Icon && <Icon size={17} />}
        </button>
        {flyoutOpen && (
          <div
            className="absolute left-full top-0 z-50 ml-2 min-w-52 rounded-[13px] border p-2 shadow-xl"
            style={{ background: "var(--app-surface)", borderColor: "var(--app-border)" }}
          >
            <p className="px-2 pb-1.5 pt-1 text-[10.5px] font-bold uppercase tracking-[0.05em]" style={{ color: "var(--app-menu-heading)" }}>
              {node.label}
            </p>
            {node.children.map((c) => (
              <NavNode key={c.label} node={c} depth={1} collapsed={false} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cx(rowBase, "w-full", depth > 0 && "pl-9")}
        style={{ color: "var(--app-menu-fg)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--app-menu-hover-bg)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {Icon && <Icon size={17} className="shrink-0" />}
        <span className="flex-1 truncate text-left text-[13px] font-semibold">{node.label}</span>
        <ChevronRight
          size={14}
          className={cx("shrink-0 transition-transform duration-200 motion-reduce:transition-none", open && "rotate-90")}
        />
      </button>
      <div
        className={cx(
          "grid transition-all duration-200 motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-0.5 space-y-0.5 pb-1">
            {node.children.map((c) => (
              <NavNode key={c.label} node={c} depth={depth + 1} collapsed={false} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavNode(props) {
  return props.node.children ? <NavGroup {...props} /> : <NavLeaf {...props} />;
}

export function Sidebar({ collapsed = false, onNavigate }) {
  const { pathname } = useLocation();
  const items = NAV[0].items;

  const activeGroup = items.find((n) => n.children?.some((c) => c.to && pathname.startsWith(c.to)));
  const [openKey, setOpenKey] = useState(activeGroup ? activeGroup.label : items[0].label);

  return (
    <aside
      className="flex h-full flex-col border-r"
      style={{
        width: collapsed ? "var(--app-sidebar-w-mini)" : "var(--app-sidebar-w)",
        background: "var(--app-menu-bg)",
        borderColor: "var(--app-menu-border)",
      }}
    >
      <div className={cx("flex h-[61px] shrink-0 items-center border-b px-4", collapsed && "justify-center px-0")} style={{ borderColor: "var(--app-menu-border)" }}>
        <Logo compact={collapsed} />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((section) => (
          <div key={section.heading} className="mb-1">
            {!collapsed && (
              <p className="px-2.5 pb-2 pt-1 text-[10.5px] font-bold uppercase tracking-[0.05em]" style={{ color: "var(--app-menu-heading)" }}>
                {section.heading}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((node) => (
                <NavNode
                  key={node.label}
                  node={node}
                  depth={0}
                  collapsed={collapsed}
                  open={openKey === node.label}
                  onToggle={() => setOpenKey((k) => (k === node.label ? null : node.label))}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="shrink-0 p-3">
          <div
            className="rounded-[14px] border p-4"
            style={{ background: "var(--app-surface-2)", borderColor: "var(--app-border)" }}
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-[10px]"
              style={{ background: "var(--app-accent-soft)", color: "var(--app-accent)" }}
            >
              <Sparkles size={16} />
            </span>
            <p className="mt-2.5 text-[13px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
              Go further with Astrobit
            </p>
            <p className="mt-1 text-[11.5px] leading-snug" style={{ color: "var(--app-fg-muted)" }}>
              Explore the full component gallery and archetype system.
            </p>
            <Button as={NavLink} to="/components" size="sm" color="primary" fullWidth className="mt-3">
              Open gallery
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
