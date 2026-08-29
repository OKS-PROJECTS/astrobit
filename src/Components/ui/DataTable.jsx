import { useMemo, useState } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Checkbox } from "oks-ui";
import { cx } from "../../lib/cx";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import { TableSkeleton } from "./Skeleton";

/**
 * DataTable — oks-ui ships NO table (blocker in OKS-UI-FEEDBACK.md). Composed
 * from a semantic <table>, oks-ui Checkbox, the composed Pagination, EmptyState
 * and Skeleton.
 *
 * columns: [{ key, header, align?, sortable?, sortValue?(row), render?(row), width? }]
 */
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
}) {
  const [sort, setSort] = useState(initialSort || null); // { key, dir }
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(() => new Set());

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const val = col.sortValue || ((r) => r[sort.key]);
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [rows, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageRows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (key) => {
    setPage(1);
    setSort((s) => {
      if (!s || s.key !== key) return { key, dir: "asc" };
      if (s.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r, i) => selected.has(getRowKey(r, i)));
  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) pageRows.forEach((r, i) => next.delete(getRowKey(r, i)));
      else pageRows.forEach((r, i) => next.add(getRowKey(r, i)));
      return next;
    });
  };

  const cellPad = dense ? "px-4 py-2.5" : "px-4 py-3.5";

  if (loading) return <TableSkeleton rows={pageSize} cols={columns.length} />;

  if (!rows.length) {
    return emptyContent || <EmptyState title="No records" description="There's nothing to show here yet." />;
  }

  return (
    <div className="flex flex-col">
      {selectable && selected.size > 0 && (
        <div
          className="flex items-center gap-3 border-b px-4 py-2.5 text-[12.5px]"
          style={{ borderColor: "var(--app-border)", background: "var(--app-accent-soft)", color: "var(--app-fg-strong)" }}
        >
          <strong className="tnum">{selected.size}</strong> selected
        </div>
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr
              className={cx("border-b", stickyHeader && "sticky top-0 z-10")}
              style={{ borderColor: "var(--app-border)", background: "var(--app-surface)" }}
            >
              {selectable && (
                <th className={cx(cellPad, "w-10")}>
                  <Checkbox
                    aria-label="Select all rows on this page"
                    checked={allOnPageSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const active = sort?.key === col.key;
                return (
                  <th
                    key={col.key}
                    className={cx(
                      cellPad,
                      "text-[10.5px] font-bold uppercase tracking-[0.05em] whitespace-nowrap",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center"
                    )}
                    style={{ color: "var(--app-fg-subtle)", width: col.width }}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key)}
                        className={cx(
                          "inline-flex items-center gap-1 uppercase transition-colors hover:text-[var(--app-fg)]",
                          col.align === "right" && "flex-row-reverse"
                        )}
                        style={active ? { color: "var(--app-fg-strong)" } : undefined}
                      >
                        {col.header}
                        {active ? (
                          sort.dir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        ) : (
                          <ChevronsUpDown size={12} className="opacity-50" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => {
              const key = getRowKey(row, i);
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cx(
                    "border-b transition-colors last:border-0",
                    onRowClick && "cursor-pointer"
                  )}
                  style={{ borderColor: "var(--app-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--app-surface-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {selectable && (
                    <td className={cellPad} onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        aria-label={`Select row ${i + 1}`}
                        checked={selected.has(key)}
                        onChange={() =>
                          setSelected((prev) => {
                            const next = new Set(prev);
                            if (next.has(key)) next.delete(key);
                            else next.add(key);
                            return next;
                          })
                        }
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cx(
                        cellPad,
                        "text-[13px] align-middle",
                        col.align === "right" && "text-right tnum",
                        col.align === "center" && "text-center"
                      )}
                      style={{ color: "var(--app-fg)" }}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        page={safePage}
        pageCount={pageCount}
        total={sorted.length}
        pageSize={pageSize}
        onPage={setPage}
      />
    </div>
  );
}
