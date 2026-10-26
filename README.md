# SIPCA – Frontend

## Stack

- **Vite** + **React 19** + **TypeScript** (strict)
- **TanStack Router** – file-based routing in `src/routes` (route tree is generated into `src/routeTree.gen.ts` by the Vite plugin; don't edit it)
- **TanStack Query** – server state; `queryClient` is passed into the router context so loaders can prefetch with `ensureQueryData`
- **TanStack Table v9** – headless tables, rendered with shadcn `Table`
- **TanStack Charts** (`@tanstack/charts`, React entry `@tanstack/charts/react`) – palette mapped to the shadcn `--chart-*` tokens in `index.css`
- **shadcn/ui** (Radix) + **Tailwind CSS v4**
- **Orval** – generates typed axios calls, TanStack Query hooks/`queryOptions`, MSW mocks and Zod schemas from the backend OpenAPI spec
- **MSW** – API mocks in dev (on by default; `VITE_ENABLE_MOCKS=false` to disable)
- **Paraglide JS** – i18n (Italian default, French), type-safe compiled messages
- **TanStack Form** – forms, validated with the Orval-generated Zod schemas
- **Vitest** (unit + Browser Mode) and **Playwright** (E2E) – tests
- **Biome** – lint + format

## Getting started

Requirements: **Node 24** (see `.nvmrc`; `nvm use` / `fnm use`) and **pnpm 10**.
`pnpm install` refuses other Node versions.

```bash
pnpm install      # also installs the git hooks
pnpm e2e:install  # once per machine: Chromium for browser tests
pnpm dev
```

### Git hooks (lefthook)

- **pre-commit**: Biome formats, lints and sorts imports on staged files, re-staging fixes.
  Commits with lint errors are blocked.
- **pre-push**: `typecheck` + `test`.
- Skip once with `--no-verify`. Config: `lefthook.yml`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Typecheck and build for production |
| `pnpm preview` | Serve the production build |
| `pnpm typecheck` | TypeScript only |
| `pnpm api:gen` | Regenerate the API client from the OpenAPI spec |
| `pnpm test` / `pnpm test:watch` | All Vitest tests (unit + browser) |
| `pnpm test:unit` / `pnpm test:browser` | One Vitest project only |
| `pnpm test:coverage` | Vitest with v8 coverage (`coverage/`) |
| `pnpm e2e` / `pnpm e2e:ui` | Playwright end-to-end tests |
| `pnpm e2e:install` | Download Playwright's Chromium (once per machine) |
| `pnpm check` / `pnpm check:fix` | Biome lint + format + import sorting |

## API client (Orval)

The app calls the API under **`/api`** (same origin). In dev, MSW answers it;
to use a real backend instead, set `VITE_ENABLE_MOCKS=false` and
`API_PROXY_TARGET=http://localhost:8080` in `.env.local` (Vite proxies `/api`).
In production the reverse proxy (nginx etc.) must forward `/api` to the backend.

1. Copy `.env.example` to `.env.local` and set `OPENAPI_URL` to the backend spec
   (e.g. `http://localhost:8080/v3/api-docs`). Without it, `openapi/sample.yaml` is used.
2. Run `pnpm api:gen`. Output goes to `src/api/generated/` – never edit it by hand.
3. Use the generated code:

```tsx
// in a route loader
loader: ({ context }) =>
  context.queryClient.ensureQueryData(getGetOrderSuspenseQueryOptions(params.orderId))

// in a component
const { data } = useGetOrderSuspense(orderId)
const createOrder = useCreateOrder()
```

All requests go through `src/api/client.ts` (axios instance + `customInstance`
mutator): put base URL, auth headers and error handling there.

Zod schemas for request/response validation are in `src/api/generated/zod/`.

### Mocks

In dev, MSW serves every
endpoint with Faker data. Override specific endpoints with realistic data in
`src/mocks/handlers.ts`. Set `VITE_ENABLE_MOCKS=false` in `.env.local` to hit the real backend.

## i18n (Paraglide)

Languages: **Italian** (base) and **French**. Locale = saved choice → browser
language → Italian. The switcher in the header saves it and reloads the page.

- Texts live in `messages/it.json` and `messages/fr.json` (same keys in both;
  a unit test fails if they drift). Placeholders: `"order_created": "Ordine per {customer} creato."`.
- Use them via `m` – fully typed, a missing key or param is a type error:

```tsx
import { m } from '@/lib/i18n'
<h1>{m.order_new_title()}</h1>
<p>{m.order_created({ customer: order.customer })}</p>
```

- Numbers/currency: `formatCurrency` / `formatNumber` from `@/lib/format` (it-IT / fr-FR).
- Zod (form validation) messages follow the locale automatically.
- API calls send `Accept-Language: it|fr`.
- Generated code goes to `src/paraglide/` (git-ignored, rebuilt by `pnpm install`,
  `pnpm dev` and `pnpm build`; or run `pnpm i18n:compile`).
- Add a language: add it to `locales` in `project.inlang/settings.json`, create
  `messages/<locale>.json`, add its Intl tag/name in `src/lib/i18n.ts`.

## Forms

Use `useAppForm` from `@/components/form`: it has the shadcn-styled field
components built in, so every form looks and behaves the same.

```tsx
const form = useAppForm({
  defaultValues: { customer: '', total: undefined as number | undefined },
  validators: { onChange: CreateOrderBody }, // generated Zod schema
  onSubmit: async ({ value }) => createOrder.mutateAsync({ data: CreateOrderBody.parse(value) }),
})

<form.AppField name="customer">
  {(field) => <field.TextField label="Customer" />}
</form.AppField>
<form.AppForm><form.SubmitButton>Save</form.SubmitButton></form.AppForm>
```

- Errors show after a field is left or a submit is attempted.
- New reusable inputs (select, date picker, …) go in `src/components/form/fields.tsx`
  and get registered in `src/components/form/index.ts`.
- Full example: `src/features/orders/create-order-form.tsx` (route `/orders/new`).

## Testing

First time on a machine: `pnpm e2e:install` (Chromium for both Vitest Browser Mode and Playwright).

| Kind | File pattern | Runs in | Use for |
| --- | --- | --- | --- |
| Unit | `src/**/*.test.ts` | Node | utils, formatters, schemas, pure logic |
| Component / route | `src/**/*.test.tsx` | Real Chromium (Vitest Browser Mode) | components, tables, charts, whole routes |
| E2E | `e2e/*.spec.ts` | Playwright against the dev server | critical user journeys |

- Browser tests use the same MSW handlers as dev. Override per test with
  `worker.use(getXxxMockHandler(data))`; handlers reset after each test.
- `src/test/render.tsx` has `renderWithQuery(ui)` for components and
  `renderRoute('/path')` to render the real app (router + loaders) at a URL.
- Page tests live in the feature (`features/<x>/pages/*.test.tsx`) and use `renderRoute`.
  Never put test files in `src/routes/` (they would become routes).
- E2E starts `pnpm dev` (mocks on) automatically. Set `E2E_BASE_URL` to run
  against a deployed environment instead.
- If the Chromium download is blocked (corporate network/CI image), set
  `PW_CHROMIUM_EXECUTABLE_PATH` to an existing Chrome/Chromium binary.

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add dialog dropdown-menu input
```

## Structure

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for the folder map, layers
(route → page → container → component), rules and a new-page checklist.
Reference feature: `src/features/anagrafica`.
