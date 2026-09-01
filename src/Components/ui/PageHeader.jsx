import { Link } from "react-router-dom";
import { Breadcrumbs as OksBreadcrumbs, BreadcrumbItem } from "oks-ui";
import { cx } from "../../lib/cx";

/**
 * Breadcrumbs — now the real oks-ui `Breadcrumbs` + `BreadcrumbItem`
 * (shipped in 1.1.0). Astrobit keeps the `{ trail, current }` shape used by
 * every PageHeader; router links go through `as={Link}`.
 */
export function Breadcrumbs({ trail = [], current }) {
  return (
    <OksBreadcrumbs aria-label="Breadcrumb">
      {trail.map((c, i) =>
        c.to ? (
          <BreadcrumbItem key={i} as={Link} to={c.to}>
            {c.label}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={i}>{c.label}</BreadcrumbItem>
        )
      )}
      <BreadcrumbItem isCurrent>{current}</BreadcrumbItem>
    </OksBreadcrumbs>
  );
}

/**
 * Page-header band: breadcrumb + title + subtitle + actions cluster.
 */
export function PageHeader({ title, subtitle, breadcrumb, actions, className }) {
  return (
    <header className={cx("mb-6", className)}>
      {breadcrumb && <Breadcrumbs trail={breadcrumb.trail} current={breadcrumb.current} />}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1
            className="text-[26px] font-bold leading-tight tracking-[-0.02em] sm:text-[28px]"
            style={{ color: "var(--app-fg-strong)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-[13px]" style={{ color: "var(--app-fg-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
