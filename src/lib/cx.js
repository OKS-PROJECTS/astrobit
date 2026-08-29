import { clsx } from "clsx";

/** Thin wrapper so call sites read `cx(...)`. Layout classes only — never colour. */
export function cx(...args) {
  return clsx(...args);
}

/** Deterministic mock-data helpers (no Math.random anywhere in the template). */
export function seeded(i, mod, offset = 0) {
  const x = Math.sin(i * 12.9898 + offset * 78.233) * 43758.5453;
  return Math.floor((x - Math.floor(x)) * mod);
}

export function money(n, { compact = false, decimals } = {}) {
  const maximumFractionDigits = decimals ?? (compact ? 1 : 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits,
  }).format(n);
}

export function number(n, { compact = false } = {}) {
  const out = new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(n);
  // match the reference's lowercase compact suffix ("84.2k", not "84.2K")
  return compact ? out.replace(/K$/, "k") : out;
}

export function percent(n, decimals = 1) {
  return `${n.toFixed(decimals)}%`;
}
