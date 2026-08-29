import { cx } from "../../lib/cx";

/** Shimmer placeholder — oks-ui ships none. div + animate-pulse + surface-2 token. Logged. */
export function Skeleton({ className, rounded = "rounded-md", style }) {
  return (
    <div
      className={cx("animate-pulse motion-reduce:animate-none", rounded, className)}
      style={{ background: "var(--app-surface-2)", ...style }}
    />
  );
}

export function TableSkeleton({ rows = 6, cols = 4 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 shrink-0" rounded="rounded-full" />
          {Array.from({ length: cols - 1 }).map((_, c) => (
            <Skeleton key={c} className="h-3.5 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
