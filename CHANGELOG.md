# Changelog

All notable changes to Astrobit are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project adheres to
[Semantic Versioning](https://semver.org/).

> Requires oks-ui ^1.0.3

## [1.0.0] — 2026-08-29

### Added

- App shell composed from oks-ui primitives: recursive collapsible sidebar with
  single-open accordion groups and a mini-rail hover flyout, sticky blurred
  header with ⌘K command palette, theme toggle, notifications and account menus,
  mobile drawer navigation, and a footer.
- Dark-first theme system in one `src/styles/theme.css`: a violet brand ramp
  repointed onto oks-ui's `primary`, semantic role ramps, and an `--app-*`
  semantic layer that every composed component reads. Light and dark both
  designed; the choice persists to `localStorage`.
- `src/Components/ui/` composition layer (built entirely from oks-ui primitives
  + tokens): `Surface`/`CardHeader`, `PageHeader`/`Breadcrumbs`, `KpiCard`/
  `StatGroup`/`TrendChip`, `DataTable` (sort, row-select, pagination, sticky
  header, empty & loading states), `Pagination`, `TableToolbar`/`SearchInput`,
  `StatusChip`/`EntityCell`, `Timeline`, `ChartCard`, `DonutCard`, `Meter`/
  `MeterList`, `BoardView`, `Accordion`, `EmptyState`, `Skeleton`.
- Bespoke Analytics dashboard at full fidelity, plus config-driven dashboards
  for CRM, Ecommerce, Finance, Sales, Projects, SaaS, Marketing, Logistics and
  Business Intelligence.
- Config-driven archetypes: `ListPage`, `FormPage`, `DetailPage`, `SettingsPage`,
  `BoardPage`, `ReportPage` — one manifest each, wired by route.
- ~20 list/CRUD routes through `ListPage`, worked examples of every other
  archetype, and a full component gallery (`/components`, `/components/:slug`,
  `/components/kitchen-sink`).
- Standalone pages: split-screen Sign In / Sign Up / Forgot Password / Lock,
  and 404 / 500 / Maintenance.
- **Every navigation route is a real page** — 167 routes, no `ComingSoon`
  placeholders. This includes the deep app pages (Chat, Group Chat, Email,
  Calendar, Contacts, Notes, File Manager, Help Desk), all content pages
  (changelog, roadmap, docs, help center, knowledge base…), every form
  showcase, the extra chart pages (Statistics, KPI Analytics, Heatmaps), and
  the remaining bespoke screens (Permissions matrix, Budget, Sales Funnel,
  Customer Journey, Project Timeline, Gantt).
- Scroll position resets to the top of the content on every route change.
- `--app-primary/-success/-warning/-danger` semantic alias tokens.

### Notes

- Charts are oks-ui `<Chart>` only. No second UI, charting, form, validation or
  data-fetching library is present.
- All data is deterministic mock data in `src/data/`.
- KPI cards, sparklines, charts, the segmented control, the conversion funnel
  and the donut cards were tuned in a design-fidelity pass across every
  dashboard; `SegmentedControl` re-skins oks-ui `Tabs variant="solid"` so it
  reads in dark mode; `ChartCard` renders line/area charts without gridlines,
  Y-axis or point markers.
- Avatars use deterministic portrait photos (with an initials fallback); a
  single `avatarUrl()` helper is the only external runtime dependency.
