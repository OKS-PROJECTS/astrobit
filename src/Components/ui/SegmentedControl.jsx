import { Tab, Tabs } from "oks-ui";

/**
 * SegmentedControl — a thin wrapper around oks-ui `Tabs` (`variant="solid"`)
 * for the "Revenue / Orders / Sessions" style toggle used on dashboards and
 * chart cards. Kept as a named component so call sites read cleanly.
 */
export function SegmentedControl({ options = [], value, onChange, size = "sm" }) {
  return (
    <div className="astro-seg w-max shrink-0 self-start">
      <Tabs
        size={size}
        variant="solid"
        color="default"
        radius="lg"
        selectedKey={value}
        onSelectionChange={(k) => onChange?.(k)}
        aria-label="View"
      >
        {options.map((o) => (
          <Tab key={o} title={o} />
        ))}
      </Tabs>
    </div>
  );
}
