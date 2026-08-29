import { cx } from "../../lib/cx";

/** Astrobit wordmark. The mark is an original triangular glyph, not a reference logo. */
export function Logo({ compact = false, className }) {
  return (
    <span className={cx("flex items-center gap-2 select-none", className)}>
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]"
        style={{ background: "var(--app-accent)", color: "var(--app-accent-contrast)" }}
      >
        <svg width="17" height="17" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M16 5l10 18H6L16 5z" fill="currentColor" opacity="0.95" />
          <circle cx="16" cy="21" r="3.4" fill="var(--app-accent)" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[17px] font-extrabold tracking-[-0.02em]" style={{ color: "var(--app-fg-strong)" }}>
          Astrobit
        </span>
      )}
    </span>
  );
}
