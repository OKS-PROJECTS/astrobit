# Astrobit

An admin dashboard template built **entirely with [oks-ui](https://www.npmjs.com/package/oks-ui)** —
every button, input, chart, menu and table cell is an oks-ui primitive or
composed from oks-ui primitives. No second UI library, no second charting
library.

**Repository:** <https://github.com/OKS-PROJECTS/astrobit>

- **Stack:** Vite + React 19 · react-router-dom v7 · Tailwind v4 (layout only) ·
  lucide-react · oks-ui
- **Theme:** dark-first, light included, one `src/styles/theme.css`
- **Data:** deterministic mock data in `src/data/` — there is no backend

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # oxlint
npm run preview  # preview the production build
```

## How the `ui/` layer works

oks-ui is a primitives + fields + charts library — it ships no application
scaffolding. `src/Components/ui/` fills that gap: `Surface` (card), `DataTable`,
`Pagination`, `Breadcrumbs`, `Sidebar`, `Timeline`, `EmptyState`, `Skeleton`,
`MeterList`, `BoardView` and more, each composed only from oks-ui primitives and
the `--app-*` design tokens. Composed pieces are labelled as such in the
component gallery (`/components`).

Most screens are **config objects, not bespoke components**. A list, form,
detail view, settings panel, board or report is an entry in `src/data/*.jsx`
consumed by an archetype component in `src/Pages/InnerPages/`. Bespoke screens
(chat, email, calendar, file manager, gantt, heatmap, …) live under
`src/Pages/InnerPages/` too. Every route in the sidebar resolves to a real page.

## Theming

Edit `src/styles/theme.css`. Repoint the brand ramp and the `--app-*` layer;
light, dark and every component follow automatically.

See [CHANGELOG.md](./CHANGELOG.md) for release history and the compatible oks-ui
range.
