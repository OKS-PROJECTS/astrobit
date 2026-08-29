import { seeded } from "../lib/cx";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** A smooth-ish monthly series, deterministic. */
export function series(base, growth, spread, offset = 0) {
  return MONTHS.map((m, i) => ({
    month: m,
    value: Math.round(base + growth * i + (seeded(i + offset, spread) - spread / 2)),
  }));
}

export function multiSeries(defs) {
  return MONTHS.map((m, i) => {
    const row = { month: m };
    defs.forEach((d) => {
      row[d.key] = Math.round(d.base + d.growth * i + (seeded(i + d.offset, d.spread) - d.spread / 2));
    });
    return row;
  });
}

export const spark = (base, spread, offset, trend = 1) =>
  Array.from({ length: 14 }, (_, i) => {
    const wobble = (seeded(i + offset, 100) / 100 - 0.5) * spread * 0.5;
    const wave = Math.sin((i + offset) * 0.7) * spread * 0.28;
    return Math.round(base + i * (spread / 20) * trend + wave + wobble);
  });

export const REVENUE_TREND = multiSeries([
  { key: "revenue", base: 32000, growth: 5200, spread: 8000, offset: 1 },
  { key: "orders", base: 18000, growth: 2600, spread: 5000, offset: 4 },
  { key: "sessions", base: 41000, growth: 3100, spread: 9000, offset: 9 },
]);

export const TRAFFIC_SOURCES = [
  { label: "Organic search", value: 38, color: "var(--app-accent)" },
  { label: "Direct", value: 27, color: "var(--app-ok)" },
  { label: "Social", value: 21, color: "var(--app-warn)" },
  { label: "Referral", value: 14, color: "var(--app-info)" },
];

export const DEVICE_SPLIT = [
  { label: "Desktop", value: 58, dot: true, color: "var(--app-accent)" },
  { label: "Mobile", value: 34, dot: true, color: "var(--app-info)" },
  { label: "Tablet", value: 8, dot: true, color: "var(--app-ok)" },
];

export const FUNNEL = [
  { label: "Visitors", value: 84200, tone: "primary" },
  { label: "Signups", value: 32100, tone: "info" },
  { label: "Trials", value: 14800, tone: "warning" },
  { label: "Customers", value: 6420, tone: "success" },
];

export const TOP_PRODUCTS = [
  { id: "p1", name: "Halo Wireless Earbuds", sku: "AB-2281", channel: "Online store", units: 1204, revenue: 54180, status: "In stock" },
  { id: "p2", name: "Lumen Desk Lamp", sku: "AB-1042", channel: "Marketplace", units: 986, revenue: 28400, status: "Low stock" },
  { id: "p3", name: "Trek 30L Daypack", sku: "AB-3390", channel: "Online store", units: 842, revenue: 37890, status: "In stock" },
  { id: "p4", name: "Pulse Fitness Band", sku: "AB-4471", channel: "Retail partner", units: 631, revenue: 18930, status: "In stock" },
  { id: "p5", name: "Klack Mechanical Keyboard", sku: "AB-5029", channel: "Marketplace", units: 410, revenue: 22550, status: "Out of stock" },
];
