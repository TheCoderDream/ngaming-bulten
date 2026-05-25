# Nesine Bulletin Case Study

React + Webpack + TypeScript bulletin app that renders ~3000 events from static JSON with virtualized scrolling and click-to-add coupon (sepet).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Architecture

- **Data**: `public/nesine-data.json` served as static file (`fetch('/nesine-data.json')`)
- **Bulletin**: `@tanstack/react-virtual` renders only visible rows (~15–25 at a time)
- **Coupon**: Zustand store keyed by event code (one selection per match); total = product of odds × 1 TL
- **Styling**: SCSS Modules + BEM conventions

## Key decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Research backend | Static JSON in `/public` | Case study simplicity; no server process |
| Row virtualization | `@tanstack/react-virtual` | 3k rows without pagination |
| Selection state | Zustand + per-cell boolean selector | Only clicked cell re-renders |
| Stake | Fixed 1 TL | Matches reference screenshots |
| Column layout | Full bulletin columns; empty cells where JSON has no data | Groups 1, 2, 5 only in dataset |

## Project structure

```
src/
  app/           App shell, providers
  features/
    bulletin/    Fetch, normalize, virtualized table
    coupon/      Store, panel, total calculation
  shared/        OddCell, Skeleton, utils
  styles/        Global tokens, mixins, reset
public/
  nesine-data.json
```

## Performance

Measured locally (3000 events, ~2.6MB JSON):

| Step | Time |
|------|------|
| JSON parse | ~45ms |
| Normalize to indexed cells | ~16ms |
| **Total data ready** | **~60ms** |

Rendering uses `@tanstack/react-virtual` — only ~15–25 rows in DOM at once. Coupon selection uses Zustand per-cell boolean selectors so toggling one odd does not re-render other rows.
