import { Skeleton as OksSkeleton } from "oks-ui";
import { cx } from "../../lib/cx";

/**
 * Shimmer placeholder. Now a thin pass-through to oks-ui `Skeleton`
 * (shipped in 1.1.0). Kept as a local export so call sites don't churn and
 * the template keeps one skeleton vocabulary.
 */
export function Skeleton({ className, rounded, style, variant, width, height, lines }) {
  return (
    <OksSkeleton
      variant={variant}
      width={width}
      height={height}
      lines={lines}
      className={cx(rounded, className)}
      style={style}
    />
  );
}

/** Row-shaped skeleton block used as the DataTable / list loading state. */
export function TableSkeleton({ rows = 6, cols = 4 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4">
          <OksSkeleton variant="circle" width={32} height={32} className="shrink-0" />
          {Array.from({ length: cols - 1 }).map((_, c) => (
            <OksSkeleton key={c} variant="rect" height={14} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
