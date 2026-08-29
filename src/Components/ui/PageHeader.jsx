import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cx } from "../../lib/cx";

/**
 * Breadcrumbs — oks-ui ships none. `nav > ol` + Link + separator. Logged.
 */
export function Breadcrumbs({ trail = [], current }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12px]">
        {trail.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {c.to ? (
              <Link
                to={c.to}
                className="transition-colors hover:underline"
                style={{ color: "var(--app-fg-muted)" }}
              >
                {c.label}
              </Link>
            ) : (
              <span style={{ color: "var(--app-fg-muted)" }}>{c.label}</span>
            )}
            <ChevronRight size={13} style={{ color: "var(--app-fg-subtle)" }} />
          </li>
        ))}
        <li aria-current="page" style={{ color: "var(--app-fg-strong)" }} className="font-medium">
          {current}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Page-header band: breadcrumb + title + subtitle + actions cluster.
 * Composed from oks-ui typography conventions + tokens.
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
