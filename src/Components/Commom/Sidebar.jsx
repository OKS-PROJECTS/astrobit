import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button, Nav } from "oks-ui";
import { NAV } from "../../data/nav";
import { cx } from "../../lib/cx";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------ *
 * Sidebar — now the real oks-ui `Nav` (shipped in 1.1.0: multi-level tree,
 * single-open accordion, collapsed icon rail + hover flyout, `renderItem` for
 * router links). Replaces the recursive NavLeaf/NavGroup/NavNode workaround
 * logged in OKS-UI-FEEDBACK.md. `data/nav.js` still owns the tree.
 * ------------------------------------------------------------------ */

function toNavItems(items) {
  return items.map((n) => {
    const Icon = n.icon;
    return {
      key: n.to || n.label,
      label: n.label,
      href: n.to,
      icon: Icon ? <Icon size={17} /> : undefined,
      children: n.children ? toNavItems(n.children) : undefined,
    };
  });
}

export function Sidebar({ collapsed = false, onNavigate }) {
  const { pathname } = useLocation();
  const sourceItems = NAV[0].items;
  const items = useMemo(() => toNavItems(sourceItems), [sourceItems]);

  const isItemActive = (item) =>
    !!item.href && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));

  const activeGroup = sourceItems.find((n) =>
    n.children?.some((c) => c.to && pathname.startsWith(c.to))
  );
  const defaultExpandedKeys = activeGroup
    ? [activeGroup.to || activeGroup.label]
    : [sourceItems[0].to || sourceItems[0].label];

  return (
    <aside
      className="flex h-full flex-col border-r"
      style={{
        width: collapsed ? "var(--app-sidebar-w-mini)" : "var(--app-sidebar-w)",
        background: "var(--app-menu-bg)",
        borderColor: "var(--app-menu-border)",
      }}
    >
      <div
        className={cx("flex h-[61px] shrink-0 items-center border-b px-4", collapsed && "justify-center px-0")}
        style={{ borderColor: "var(--app-menu-border)" }}
      >
        <Logo compact={collapsed} />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <p
            className="px-2.5 pb-2 pt-1 text-[10.5px] font-bold uppercase tracking-[0.05em]"
            style={{ color: "var(--app-menu-heading)" }}
          >
            {NAV[0].heading}
          </p>
        )}
        <Nav
          aria-label="Primary"
          items={items}
          isCollapsed={collapsed}
          expansionMode="single"
          defaultExpandedKeys={defaultExpandedKeys}
          isItemActive={isItemActive}
          renderItem={({ item, hasChildren, content, props }) =>
            hasChildren || !item.href ? (
              <button type="button" {...props}>
                {content}
              </button>
            ) : (
              <NavLink
                to={item.href}
                end={item.href === "/"}
                className={props.className}
                aria-current={props["aria-current"]}
                onClick={() => {
                  props.onClick?.();
                  onNavigate?.();
                }}
                title={collapsed ? String(item.label) : undefined}
              >
                {content}
              </NavLink>
            )
          }
        />
      </div>

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
