# Astrobit

An admin dashboard template built **entirely with [oks-ui](https://www.npmjs.com/package/oks-ui)** —
every button, input, chart, table, nav tree, board and command palette is an
oks-ui component, used as shipped. `src/styles/theme.css` contains **zero `.oks*`
selectors** — no overrides, no `!important`. The only thing assembled by hand is
the app shell (sidebar + header + content frame + mobile drawer). No second UI
library, no second charting library.

**Live demo:** <https://oks-projects.github.io/astrobit/> · **Repository:** <https://github.com/OKS-PROJECTS/astrobit>

[![Astrobit — analytics dashboard](.github/media/dashboard-dark.png)](https://oks-projects.github.io/astrobit/)

- **Stack:** Vite + React 19 · react-router-dom v7 · Tailwind v4 (layout only) ·
  lucide-react · `oks-ui ^1.1.2`
- **Theme:** dark-first, light included, one `src/styles/theme.css`
- **Data:** deterministic mock data in `src/data/` — there is no backend
- **Routes:** every entry in the sidebar (~167) resolves to a real page

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # oxlint
npm run preview  # preview the production build
```

## oks-ui vs. hand-built

As of oks-ui 1.1 the library ships the whole application layer — `Card`, `Table`,
`Pagination`, `Nav`, `Breadcrumbs`, `Board`, `Timeline`, `EmptyState`,
`Skeleton`, `Progress`, `CircularProgress`, `Accordion`, `SegmentedControl`,
`CommandPalette`, `Calendar`, `SplitLayout`, `Message`, `Chart type="heatmap"` —
on top of the buttons / forms / overlays / charts it already had.

| Layer | What it is |
| --- | --- |
| `src/Components/ui/` | **Thin adapters** (~15–40 lines each). `Surface` → `Card`, `DataTable` → `Table`, `MeterList` → `Progress`, `BoardView` → `Board`, … — they rename props to Astrobit's vocabulary and wire the `--app-*` tokens, then delegate. Kept so the ~23 call sites stay terse and stable. |
| `src/Components/Commom/` | The **app shell** — `Sidebar` (oks-ui `Nav` + `renderItem` for router links), `Header` (⌘K `CommandPalette`, theme toggle), `InnerTemplate` (responsive frame + mobile `Drawer`), `Footer`. The one genuinely composed piece; oks-ui deliberately doesn't ship an `AppShell`. |
| `src/Pages/InnerPages/` + `src/data/*.jsx` | **Config-driven archetypes.** A list, form, detail view, settings panel, board or report is a config object consumed by an archetype component. Add an entry, wire the route, done. Bespoke screens (chat, email, calendar, file manager, gantt, heatmap) live here too. |

## Theming

Edit `src/styles/theme.css`:

- **Rebrand:** repoint the brand ramp (`--oks-palette-brand-*`) and the `--app-*`
  layer. Light, dark and every component follow automatically.
- **Two blocks:** `:root` is light, `:root[data-theme="dark"]` is dark. The dark
  block re-declares the full reversed semantic ramp
  (`--oks-palette-{success,warning,danger,info,brand}-50…950`) plus the surface,
  border and form-field tokens.

> **On an oks-ui upgrade:** run a quick dark-mode visual pass (soft `Chip` /
> `Alert` / `Badge` / overlay panels). oks-ui's token blocks are
> zero-specificity (`:where()`), so any semantic stop this template's dark block
> doesn't re-declare falls through to the light ramp. Keep the dark ramp
> complete when the library's palette changes.

See [CHANGELOG.md](./CHANGELOG.md) for release history and the compatible oks-ui range.

## Notes

- **Avatars** use `avatarUrl()` → i.pravatar.cc (deterministic by seed, falls
  back to initials on any load error). This is the one external runtime
  dependency — swap it for local assets or a data-URI generator for a real
  deployment.

## Screenshots

| Component gallery | Team members (list archetype) |
| --- | --- |
| ![Component gallery](.github/media/components.png) | ![Team members list](.github/media/users.png) |

## License

[MIT](./LICENSE) © OKS-PROJECTS
