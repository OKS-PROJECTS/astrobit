export const APP_VERSION = "1.0.0";

export const NOTIFICATIONS = [
  { id: "n1", title: "Priya Raman published the Q3 revenue report.", time: "12 minutes ago", unread: true },
  { id: "n2", title: "Automated check flagged a spike in refund volume.", time: "48 minutes ago", unread: true },
  { id: "n3", title: "Theo Lindqvist closed the autumn launch campaign.", time: "2 hours ago", unread: true },
  { id: "n4", title: "Mara Devlin invited 3 teammates to the Growth workspace.", time: "5 hours ago", unread: false },
  { id: "n5", title: "Warehouse sync completed — 1,204 SKUs updated.", time: "Yesterday", unread: false },
];

export const ACTIVITY = [
  { id: "a1", name: "Priya Raman", avatar: "https://i.pravatar.cc/120?img=5", title: "Priya Raman published a new revenue report.", time: "12m ago", tone: "primary" },
  { id: "a2", name: null, title: "System flagged a spike in checkout errors.", time: "48m ago", tone: "danger" },
  { id: "a3", name: "Theo Lindqvist", avatar: "https://i.pravatar.cc/120?img=12", title: "Theo Lindqvist closed the autumn launch campaign.", time: "2h ago", tone: "success" },
  { id: "a4", name: "Mara Devlin", avatar: "https://i.pravatar.cc/120?img=32", title: "Mara Devlin invited 3 new teammates to the workspace.", time: "5h ago", tone: "info" },
  { id: "a5", name: "Ivan Petrov", avatar: "https://i.pravatar.cc/120?img=51", title: "Ivan Petrov updated the pricing page layout.", time: "8h ago", tone: "default" },
];

export const FIRST_NAMES = [
  "Priya", "Theo", "Mara", "Ivan", "Nadia", "Kenji", "Lena", "Omar", "Sofia", "Diego",
  "Ada", "Malik", "Yuki", "Hana", "Noah", "Elif", "Bruno", "Carmen", "Anders", "Rosa",
];
export const LAST_NAMES = [
  "Raman", "Lindqvist", "Devlin", "Petrov", "Okafor", "Tan", "Fischer", "Haddad", "Rossi", "Marin",
  "Novak", "Bright", "Sato", "Kwon", "Bauer", "Demir", "Costa", "Reyes", "Holm", "Vega",
];

export const person = (i) => `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 7) % LAST_NAMES.length]}`;
export const email = (i) => `${FIRST_NAMES[i % FIRST_NAMES.length].toLowerCase()}.${LAST_NAMES[(i * 7) % LAST_NAMES.length].toLowerCase()}@astrobit.app`;

/**
 * Deterministic portrait for a person, keyed by a stable seed. Uses the public
 * pravatar.cc photo set (70 images). oks-ui `Avatar` falls back to initials if
 * the request fails (offline / CSP), so this degrades gracefully.
 *
 * This is the template's only external runtime dependency — replace this one
 * function with local `/avatars/*` assets or a data-URI generator to make the
 * build fully self-contained.
 */
export const avatarUrl = (seed) => {
  const s = typeof seed === "string"
    ? [...seed].reduce((a, c) => a + c.charCodeAt(0), 0)
    : seed;
  return `https://i.pravatar.cc/120?img=${(Math.abs(s) % 70) + 1}`;
};
