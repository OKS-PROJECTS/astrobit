import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "oks-ui";

/**
 * Pagination — oks-ui ships none. `Button isIconOnly` + a numbered range +
 * a "showing X–Y of Z" summary. Logged in OKS-UI-FEEDBACK.md.
 */
export function Pagination({ page, pageCount, total, pageSize, onPage }) {
  if (pageCount <= 1 && !total) return null;
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages = [];
  const push = (p) => pages.push(p);
  push(1);
  for (let p = page - 1; p <= page + 1; p++) if (p > 1 && p < pageCount) push(p);
  if (pageCount > 1) push(pageCount);
  const uniq = [...new Set(pages)].sort((a, b) => a - b);
  const withGaps = [];
  uniq.forEach((p, i) => {
    if (i > 0 && p - uniq[i - 1] > 1) withGaps.push("…");
    withGaps.push(p);
  });

  return (
    <div
      className="flex flex-col-reverse items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row"
      style={{ borderColor: "var(--app-border)" }}
    >
      <p className="text-[12px] tnum" style={{ color: "var(--app-fg-muted)" }}>
        Showing {from}–{to} of {total.toLocaleString()}
      </p>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="bordered"
          isIconOnly
          isDisabled={page <= 1}
          onPress={() => onPage(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </Button>
        {withGaps.map((p, i) =>
          p === "…" ? (
            <span key={`g${i}`} className="px-1.5 text-[12px]" style={{ color: "var(--app-fg-subtle)" }}>
              …
            </span>
          ) : (
            <Button
              key={p}
              size="sm"
              variant={p === page ? "solid" : "bordered"}
              color={p === page ? "primary" : "default"}
              onPress={() => onPage(p)}
              className="min-w-8 tnum"
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Button>
          )
        )}
        <Button
          size="sm"
          variant="bordered"
          isIconOnly
          isDisabled={page >= pageCount}
          onPress={() => onPage(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </Button>
      </div>
    </div>
  );
}
