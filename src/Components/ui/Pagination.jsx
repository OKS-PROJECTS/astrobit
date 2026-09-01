import { Pagination as OksPagination, PaginationSummary } from "oks-ui";

/**
 * Pagination — now backed by oks-ui `Pagination` + `PaginationSummary`
 * (shipped in 1.1.0). Astrobit keeps the `{ page, pageCount, total, pageSize,
 * onPage }` signature so the DataTable footer stays stable.
 */
export function Pagination({ page, pageCount, total, pageSize, onPage }) {
  if (pageCount <= 1 && !total) return null;
  return (
    <div
      className="flex flex-col-reverse items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row"
      style={{ borderColor: "var(--app-border)" }}
    >
      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total ?? 0}
        className="text-[12px] tnum"
        style={{ color: "var(--app-fg-muted)" }}
      />
      <OksPagination
        page={page}
        pageCount={pageCount}
        total={total}
        pageSize={pageSize}
        onChange={onPage}
        size="sm"
        showEdges={false}
      />
    </div>
  );
}
