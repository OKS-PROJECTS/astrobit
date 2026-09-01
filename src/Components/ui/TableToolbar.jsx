import { Search } from "lucide-react";
import { Button, Chip, TextField } from "oks-ui";
import { cx } from "../../lib/cx";

/**
 * SearchInput — oks-ui 1.1.0 added the borderless `filled` TextField variant
 * (OKS-UI-FEEDBACK.md B5): no border at rest, subtle fill, border + ring on focus.
 */
export function SearchInput({ value, onChange, placeholder = "Search…", className }) {
  return (
    <TextField
      type="search"
      variant="filled"
      size="sm"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      startIcon={<Search size={15} />}
      className={cx("w-full sm:w-64", className)}
      aria-label={placeholder}
    />
  );
}

/**
 * TableToolbar — search on the left, filter chips + actions on the right.
 * Sits above a DataTable inside a Surface.
 */
export function TableToolbar({ search, onSearch, filters = [], activeFilter, onFilter, actions, children }) {
  return (
    <div
      className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: "var(--app-border)" }}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {onSearch && <SearchInput value={search} onChange={onSearch} />}
        {filters.map((f) => (
          <Chip
            key={f.key}
            size="sm"
            variant={activeFilter === f.key ? "solid" : "bordered"}
            color={activeFilter === f.key ? "primary" : "default"}
            selected={activeFilter === f.key}
            onSelectedChange={() => onFilter?.(activeFilter === f.key ? null : f.key)}
            className="cursor-pointer"
          >
            {f.label}
          </Chip>
        ))}
        {children}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export { Button as ToolbarButton };
