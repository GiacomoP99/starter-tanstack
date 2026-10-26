# Architecture

How the frontend is organised and where new code goes. Reference
implementation: **`src/features/anagrafica`** – copy its patterns.

## Folder map

```
src/
  routes/              URL layer only (TanStack Router file routes). Thin.
  features/<feature>/  Everything that belongs to one business area.
  components/
    ui/                shadcn primitives (button, card, dialog, …). No business logic.
    common/            Reusable app components (QueryBoundary, LinkCard, QuickOpenField, …).
    layout/            App shell: sidebar, header, breadcrumbs, search, locale switcher.
    form/              useAppForm + shared form fields (TanStack Form).
  hooks/               Shared React hooks (useHotkey, usePersistedState).
  lib/                 Shared non-React code: i18n, formatters, queryClient, session, cn().
  config/              App-wide static config (navigation).
  api/
    client.ts          axios instance + Orval mutator (base URL, headers, auth).
    generated/         Orval output from the OpenAPI spec. Never edit.
  mocks/
    handlers.ts        MSW handlers (generated + overrides).
    fixtures/          Realistic mock data per feature, shared by dev and tests.
  test/                Test helpers (renderRoute, renderWithQuery, setup).
  paraglide/           Compiled translations. Generated, git-ignored.
messages/              Translations: it.json (base), fr.json.
openapi/               Placeholder spec until the backend URL is configured.
```

## Inside a feature

```
features/anagrafica/
  index.ts             Public API. The ONLY file other code may import.
  types.ts             Feature-local types (API types come from api/generated/model).
  api/
    queries.ts         queryOptions for the feature + loader prefetch. Wraps generated code.
  pages/               One component per route. Layout + composition only.
  containers/          Connect data to components: run queries, mutations, navigation.
  components/          Presentational: props in, JSX out. No queries, no navigation calls.
  modals/              Dialogs. Own their open-on-demand queries.
  hooks/               Feature-specific hooks (useOpenSection).
  utils/               Pure functions: enum → label maps, formatters, guards. Unit-tested.
```

Create only the folders a feature needs. A small feature can be `pages/` +
`components/` (see `features/orders`).

## Layers and data flow

```
route (URL, params, search, loader)
  └─ page            (layout; wraps each container in <QueryBoundary>)
       └─ container  (useSuspenseQuery(featureQueries.x()), useMutation, navigate)
            └─ component (props only)
```

- **Routes** declare URL concerns only: `params.parse`, `validateSearch` (Zod),
  `loader` (calls the feature's `prefetch…`), `staticData.title` (breadcrumb),
  and the page component. No JSX beyond that, no data code.
- **Pages** decide layout. Every data-driven block is a container inside its own
  `<QueryBoundary fallback={…}>` so one slow/failing endpoint never breaks the page.
- **Containers** are the only place that calls queries/mutations. They always use
  `featureQueries.x()` from `api/queries.ts` – the loader uses the same functions,
  so cache keys always match.
- **Components** receive plain data and callbacks. Easy to test and reuse.

## Rules

1. **Import direction:** `routes → features → components/hooks/lib/config → api`.
   Never the other way. `components/` must not import from `features/`.
2. **Features don't reach into each other.** Import another feature only through its
   `index.ts`. If two features need the same thing, move it to `components/common`,
   `hooks/` or `lib/`.
3. **No hand-written HTTP.** Use the Orval-generated functions/options. Don't import
   `axios` outside `src/api/client.ts`.
4. **No hard-coded UI text.** Every string goes in `messages/it.json` **and**
   `messages/fr.json`; use `m.key()`. Backend enums are mapped to labels in
   `features/<x>/utils/labels.ts`.
5. **Links are typed.** Use `<Link>` / `TextLink` / `ArrowLink` / `LinkCard` with
   `to` + `params` + `search`. Never build URL strings.
6. **Loaders use `prefetchQuery`** (doesn't throw) so errors stay inside sections.
   Use `ensureQueryData` only when the page can't render at all without the data.
7. **Shared state** lives in the URL (search params) or TanStack Query. Add a global
   store only if neither fits.

## Where does it go?

| I'm adding…                                | Put it in                                   |
| ------------------------------------------ | ------------------------------------------- |
| a new page/URL                             | `routes/` (thin) + `features/<x>/pages/`    |
| a card/list only this feature uses         | `features/<x>/components/`                  |
| something that fetches or navigates        | `features/<x>/containers/`                  |
| a dialog                                   | `features/<x>/modals/`                      |
| a component two features need             | `components/common/`                        |
| a shadcn component                         | `components/ui/` (`pnpm dlx shadcn add …`)  |
| a pure helper for one feature              | `features/<x>/utils/`                       |
| a pure helper for the whole app            | `lib/`                                      |
| a hook for the whole app                   | `hooks/`                                    |
| a sidebar entry                            | `config/navigation.ts`                      |
| a new endpoint                             | backend spec → `pnpm api:gen` → `features/<x>/api/queries.ts` |
| mock data for an endpoint                  | `mocks/fixtures/<x>.ts` + override in `mocks/handlers.ts` |

## Naming

- Files and folders: `kebab-case` (`attention-list.tsx`). Components: `PascalCase`.
- One main export per file; file name = component name in kebab-case.
- Tests next to the file: `x.test.ts` (Node) or `x.test.tsx` (browser).
  Page tests use `renderRoute('/path')`.
- Hooks start with `use`. Query factories: `<feature>Queries.<name>()`.

## Checklist: new feature page

1. Endpoints exist in the spec → `pnpm api:gen`.
2. `features/<x>/api/queries.ts`: query options + `prefetch<X>()`.
3. Mock data in `mocks/fixtures/<x>.ts`, override in `mocks/handlers.ts`.
4. Components (props only) → containers (data) → page (layout + `QueryBoundary`).
5. Route file: `loader`, `staticData.title`, `component`; validate params/search.
6. Strings in `it.json` + `fr.json`.
7. `features/<x>/index.ts` exports the page (and prefetch).
8. Sidebar entry in `config/navigation.ts` if needed.
9. Tests: utils (unit), page (`renderRoute`), one E2E journey.
10. `pnpm typecheck && pnpm check && pnpm test`.
