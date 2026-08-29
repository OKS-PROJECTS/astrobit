import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Subscribe to a CSS media query (SSR-safe — server snapshot is `false`). */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined" || !window.matchMedia) return noop();
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false),
    () => false
  );
}

/** True at Tailwind's `lg` breakpoint and up. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
