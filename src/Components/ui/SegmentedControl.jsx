import { SegmentedControl as OksSegmentedControl } from "oks-ui";

/**
 * SegmentedControl — now the real oks-ui `SegmentedControl` (shipped in 1.1.0,
 * theme-aware track — replaces the `Tabs variant="solid"` + `.astro-seg`
 * re-skin from OKS-UI-FEEDBACK.md B12). Astrobit keeps the string-array
 * `options` shape used by the dashboards.
 */
export function SegmentedControl({ options = [], value, onChange, size = "sm" }) {
  const opts = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  return (
    <OksSegmentedControl
      options={opts}
      value={value}
      onChange={onChange}
      size={size}
      aria-label="View"
      className="w-max shrink-0 self-start"
    />
  );
}
