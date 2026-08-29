import { seeded } from "../lib/cx";
import { person } from "./app";

const crumb = (trail, current) => ({ trail: trail.map((t) => ({ label: t })), current });

const TASKS = [
  "Draft checkout copy", "Wire the payment step", "QA mobile nav", "Migrate legacy invoices",
  "Design empty states", "Set up analytics events", "Write API docs", "Fix flaky test suite",
  "Localize onboarding", "Review partner contract", "Ship pricing page", "Audit accessibility",
  "Refactor auth guard", "Add rate limiting", "Compress hero images", "Plan Q4 roadmap",
];
const TAGS = [
  ["Design", "primary"], ["Engineering", "info"], ["Content", "success"], ["Ops", "warning"], ["Research", "danger"],
];

function column(key, title, tone, count, offset) {
  return {
    key,
    title,
    tone,
    cards: Array.from({ length: count }, (_, i) => {
      const idx = i + offset;
      const [tag, tagTone] = TAGS[seeded(idx, TAGS.length, 1)];
      return {
        id: `${key}-${idx}`,
        title: TASKS[idx % TASKS.length],
        tag,
        tagTone,
        meta: `AB-${120 + idx}`,
        assignees: [person(idx), person(idx + 4)].slice(0, 1 + seeded(idx, 2, 3)),
      };
    }),
  };
}

const columns = [
  column("backlog", "Backlog", "fg-subtle", 4, 0),
  column("progress", "In progress", "info", 3, 4),
  column("review", "In review", "warn", 2, 7),
  column("done", "Done", "ok", 3, 9),
];

export const BOARD_CONFIGS = {
  "/projects/kanban": {
    title: "Kanban board",
    subtitle: "Delivery flow for the checkout redesign.",
    breadcrumb: crumb(["Projects"], "Kanban View"),
    columns,
  },
  "/projects/sprint-board": {
    title: "Sprint board",
    subtitle: "Sprint 24 · closes in 6 days.",
    breadcrumb: crumb(["Projects"], "Sprint Board"),
    columns,
  },
  "/projects/team-board": {
    title: "Team board",
    subtitle: "Work in flight across the whole team.",
    breadcrumb: crumb(["Projects"], "Team Board"),
    columns,
  },
  "/apps/task-manager": {
    title: "Task manager",
    subtitle: "Your personal board across every project.",
    breadcrumb: crumb(["Apps"], "Task Manager"),
    columns,
  },
  "/crm/deals-pipeline": {
    title: "Deals pipeline",
    subtitle: "Open opportunities by stage.",
    breadcrumb: crumb(["CRM"], "Deals Pipeline"),
    columns: [
      column("qualify", "Qualification", "fg-subtle", 4, 1),
      column("discover", "Discovery", "info", 3, 5),
      column("propose", "Proposal", "warn", 3, 8),
      column("won", "Closed won", "ok", 2, 11),
    ],
  },
};
