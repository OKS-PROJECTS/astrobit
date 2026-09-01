# Changelog

All notable changes to Astrobit are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project adheres to
[Semantic Versioning](https://semver.org/).

> Requires oks-ui ^1.1.2

## [1.1.0] — 2026-09-01

### Changed

- **Adopted the oks-ui 1.1 application layer.** oks-ui 1.1.0 shipped the 17
  components Astrobit had been composing by hand. Every `src/Components/ui/*`
  piece is now a thin wrapper over the real export (same props, so call sites
  are unchanged) and the shell uses the shipped components directly:
  - `Surface` → `Card`; `DataTable` → `Table`; `Pagination` → `Pagination` +
    `PaginationSummary`; `Breadcrumbs` → `Breadcrumbs` + `BreadcrumbItem`;
    `KpiCard`/`Stat` → `Stat` + `StatGroup`; `EmptyState` → `EmptyState`;
    `Skeleton` → `Skeleton`; `Timeline` → `Timeline` + `TimelineItem`;
    `Meter`/`MeterList` → `Progress`; `Accordion` → `Accordion` +
    `AccordionItem`; `BoardView` → `Board`; `SegmentedControl` → the real
    `SegmentedControl`.
  - `Sidebar` is now the oks-ui `Nav` (multi-level tree, single-open, collapsed
    icon rail + hover flyout) driven through `renderItem` for router links.
  - The ⌘K palette is the real `CommandPalette`.
  - Heatmaps page uses `Chart type="heatmap"` instead of a div grid.
- Removed every `theme.css` oks-ui component override:
  - B1 (donut centre), B11 (chart `<figure>` frame — now `unstyled`), B12 (solid
    tab track — now a theme-aware `SegmentedControl`) — removed with the 1.1.0 layer.
  - B14 (`Button` bordered/ghost `default` contrast) — removed once **oks-ui
    1.1.2** lifted the resting label to `--oks-color-default-700` in both themes.
  `theme.css` now carries **zero `.oks*` selectors** — only token values.
- Added `--oks-color-border` to both themes; `TextField` toolbar search uses the
  new borderless `filled` variant.
- **oks-ui 1.1.2 follow-up:** its token blocks became zero-specificity
  (`:where()`), so Astrobit's bare-`:root` semantic ramps started winning in dark
  for the stops it hadn't re-declared — soft `Chip` / `Alert` text rendered
  dark-on-dark. Fixed by completing the reversed dark ramp
  (`--oks-palette-{success,warning,danger,info,brand}-{50,100,200,300,400,700,800,900,950}`)
  in the `:root[data-theme="dark"]` block.
- Bumped the oks-ui dependency to `^1.1.2`.

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

### Fixed

- **Mobile layout**: responsive grids now declare a base `grid-cols-1` so wide
  children (tables, charts) no longer force the content area past the viewport —
  every route is horizontal-scroll-free down to 320px.
- `Button variant="bordered"/"ghost"` with the default colour was near-invisible
  on the dark background — repointed at the readable `--app-*` text/border tokens.
- KPI cards are 2-up on phones (sparkline hidden) and 4-up from `lg`.
- Settings side-nav switches from a vertical rail to a horizontal tab bar on
  narrow screens.
- Email / chat list rows truncate the subject and preview on their own lines.

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
