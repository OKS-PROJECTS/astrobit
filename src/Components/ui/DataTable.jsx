import { useMemo, useState } from "react";
import { Table } from "oks-ui";
import { Pagination } from "./Pagination";

/**
 * DataTable — now backed by oks-ui `Table` (shipped in 1.1.0, the blocker in
 * OKS-UI-FEEDBACK.md). Astrobit keeps the thin `DataTable` wrapper so call sites
 * stay stable: it drives sorting in controlled mode and paginates *after* the
 * sort (Table does not bundle pagination), and maps Astrobit's `align: "right"`
 * to the component's `"end"`.
 *
 * columns: [{ key, header, align?, sortable?, sortValue?(row), render?(row), width? }]
 */
const ALIGN = { left: "start", right: "end", center: "center" };

export function DataTable({
  columns,
  rows,
  getRowKey = (r, i) => r.id ?? i,
  pageSize = 10,
  selectable = false,
  loading = false,
  emptyContent,
  onRowClick,
  initialSort,
  stickyHeader = true,
  dense = false,
  ariaLabel = "Data table",
}) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(
    initialSort
      ? { column: initialSort.key, direction: initialSort.dir === "desc" ? "descending" : "ascending" }
      : null
  );

  const cols = useMemo(
    () =>
      columns.map((c) => ({
        ...c,
        align: c.align ? ALIGN[c.align] ?? c.align : undefined,
        render: c.render ? (row) => c.render(row) : undefined,
      })),
    [columns]
  );

  const sorted = useMemo(() => {
    if (!sort) return rows || [];
    const col = columns.find((c) => c.key === sort.column);
    const val = col?.sortValue || ((r) => r[sort.column]);
    const dir = sort.direction === "ascending" ? 1 : -1;
    return [...(rows || [])].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [rows, sort, columns]);

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageRows = useMemo(
    () => sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
    [sorted, safePage, pageSize]
  );

  return (
    <Table
      aria-label={ariaLabel}
      columns={cols}
      rows={pageRows}
      getRowKey={getRowKey}
      sortDescriptor={sort}
      onSortChange={(descriptor) => {
        setSort(descriptor);
        setPage(1);
      }}
      selectionMode={selectable ? "multiple" : "none"}
      isLoading={loading}
      loadingRowCount={pageSize}
      isCompact={dense}
      stickyHeader={stickyHeader}
      emptyContent={emptyContent}
      onRowAction={onRowClick ? (_key, row) => onRowClick(row) : undefined}
      removeWrapper
      bottomContent={
        total > pageSize ? (
          <Pagination
            page={safePage}
            pageCount={pageCount}
            total={total}
            pageSize={pageSize}
            onPage={setPage}
          />
        ) : null
      }
    />
  );
}
