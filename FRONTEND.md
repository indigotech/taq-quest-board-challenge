# Quest Board — Frontend

React/Vite web app for the Quest Board challenge: a single-screen quest board consuming the backend REST
API from `apps/rest-server`. Built on Taqtile's internal React Web template (design system, tooling
conventions), with the GraphQL/Firebase/auth pieces of that template removed — this app talks to a plain
REST API and has no authentication.

## Stack

- [Vite](https://vite.dev/) — dev server and bundler
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + `tailwind-variants` — styling
- `src/atomic/` — Taqtile's Atomic Design system (Button, Card, Badge, Form fields, Modal, Pagination...)
- [Vitest](https://vitest.dev/) + Testing Library — unit/component tests
- [Storybook](https://storybook.js.org/) — isolated component development

## Setup

```bash
cd apps/web
```

Point the app at the backend by setting `VITE_API_URL` — copy `.env.sample` to `.env`:

```bash
# apps/web/.env
VITE_API_URL=http://localhost:3000
```

Make sure the backend is running first — see [`BACKEND.md`](BACKEND.md). Dependencies are installed from
the repo root (`bun install`), as part of the Nx/bun workspace.

## Running

```bash
bun run dev                      # from the repo root — runs every app's dev target
bunx nx dev @repo/web            # just this app
# or, from apps/web/:
bun run dev                      # Vite dev server at http://localhost:4000
```

## Testing

```bash
bunx nx test @repo/web           # from the repo root
# or, from apps/web/:
bun run test                     # Vitest
bun run storybook                # isolated component development, http://localhost:6006
```

## Code quality

```bash
bun run typecheck                # tsc -b
```

Lint/format run through the same root-level `oxlint`/`oxfmt` as the backend (`bun run lint` at the repo
root). `src/atomic/` and `.storybook/` are excluded from both — that's Taqtile's own design-system template
code, vendored as-is, not something this project's lint rules should reformat.

## Architecture

Layers under `apps/web/src/`, following Taqtile's internal React Web template conventions — sibling
folders, each with its own path alias:

- **`atomic/`** — the design system: pure, business-rule-free UI components (`atm.*`/`mol.*`/`obj.*`/
  `org.*` prefixes), each with its own `.component.tsx` + `.component.style.tsx` + `.stories.tsx`.
- **`core/http/`** — the REST client (`http-client.ts`, a thin `fetch` wrapper).
- **`domain/model/`** — shared domain types (`quest.model.ts`).
- **`domain/quests/`** — use-case hooks (`use-list-quests.use-case.ts`, `use-create-quest.use-case.ts`)
  that own loading/error state and call the datasource.
- **`data/quests/`** — the quests datasource (`GET /quests`, `POST /quests`) and the zod schema that
  validates the response before it's trusted as a `Quest`.
- **`components/quests/`** — the actual screen: `quest-board.page.tsx`, `quest-card.component.tsx`,
  `create-quest-modal.component.tsx`, presentation helpers (status/difficulty labels, column definitions).

Path aliases (`@atomic`, `@components`, `@core`, `@data`, `@domain`, `@utils`, `@assets`) are configured in
`tsconfig.app.json`/`vite.config.ts` — import through them across folders instead of relative paths.
There's no `@app` alias: the template reserves `src/app` for Expo-Router-style routes, and this app has no
router (a single screen, rendered directly from `App.tsx`).

There is no router and no authentication: this is a deliberately single-screen app, matching the scope of
the challenge.

## Quest board feature

A 3-column kanban board (Pergaminhos Novos / Em Jornada / Lendas Concluídas), one column per real quest
status, with a modal to create new quests. Moving a quest between columns is
client-side only — the backend doesn't expose `PATCH /quests/:id` yet (see the root [`README.md`](README.md)
TODOs). Difficulty and XP reward are read-only, set by the backend — the frontend has no say in either.
