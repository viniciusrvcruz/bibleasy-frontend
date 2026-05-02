# AGENTS.md — Bibleasy Frontend

Guidance for AI coding agents and contributors working on this codebase. Follow these conventions so new work stays consistent with existing patterns.

## Product context

- **Bibleasy** (`bibleasy-frontend` in `package.json`) is a **Nuxt 4** web app for reading the Bible online.
- **Primary locale for copy and SEO** is **pt-BR** (UI strings, meta descriptions, schema.org). Technical docs and this file are in English by convention for tooling.
- **Code comments** must be in **English**.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Nuxt 4](https://nuxt.com/) (Vue 3, `<script setup>`, Composition API) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (Vite plugin), [DaisyUI](https://daisyui.com/) themes |
| Components | PrimeVue (Aura preset via `@primeuix/themes`), local Vue SFCs |
| State | Pinia (`@pinia/nuxt`) |
| HTTP | `$fetch` wrapper (`app/plugins/api.ts`) exposed as `useNuxtApp().$api` |
| Validation / API shapes | Zod (`zod` v4) |
| Icons | `@nuxt/icon` — registered component name **`NuxtIcon`** (`nuxt.config.ts`: `icon.componentName`) |
| SEO | `@nuxtjs/seo`, PWA (`@vite-pwa/nuxt`), analytics hooks as configured in `nuxt.config.ts` |

There is **no ESLint config** in-repo at the time of writing; rely on TypeScript and match surrounding style.

## Repository layout

```
app/
  assets/css/main.css    # Tailwind entry + DaisyUI + shared @utility rules
  components/            # Vue SFCs grouped by domain (see below)
  composables/           # Shared composition logic (+ bible/, services/)
  data/                  # Static TS data (e.g. verse of the day)
  layouts/default.vue    # Shell: versions/books bootstrap, header, modals
  pages/                 # File-based routes
  plugins/               # Nuxt plugins (*.client.ts where needed)
  stores/                # Pinia stores (defineStore)
  types/<entity>/        # Zod schemas (*.schema.ts) + inferred types (*.type.ts)
  utils/                 # env parsing, errors, helpers, bible/* book metadata
  app.vue                # Root: NuxtLayout + NuxtPage
server/
  api/                   # Nitro routes (e.g. sitemap URL source)
nuxt.config.ts           # Modules, runtimeConfig, SEO, PWA, PrimeVue, color-mode
```

### `components/` grouping

Use the same buckets when adding UI:

- **`bible/`** — Reader: chapter view, verse selector, search, modals tied to reading.
- **`home/`** — Marketing / landing sections.
- **`help/`** — Help center, FAQ, support forms.
- **`layout/header/`** — Global chrome (theme, user/help menus).
- **`shared/`** — Cross-cutting small widgets (e.g. social links).

Nested folders often expose a **folder component** via `index.vue` (e.g. `bible/chapter/index.vue` registers as **`BibleChapter`** in templates).

## Naming conventions

- **Files**: `useSomething.ts` composables; `somethingStore.ts` stores; `Something.vue` or `index.vue` inside a PascalCase-friendly path for components.
- **Pinia**: store ids like `'version'`; usage **`useVersionStore()`** (auto-imported from `stores/versionStore.ts`).
- **API path helpers**: **`useChapterService`**, **`useBookService`**, etc. — factories returning **`useShow`**, **`useIndex`**, etc., built on **`useApiFetch`** / **`useApi`**.
- **REST path segments** in composables: mirror backend resources (e.g. `versions/${version_id}/books/${book}/chapters/${chapter}`) — note **`version_id`** snake_case when matching API fields.

## Data fetching

1. **Declarative SSR/data** — Prefer **`useApiFetch<T>(url)`** (`app/composables/useApiFetch.ts`): wraps `useFetch` with **`key: url`** and **`$fetch: useNuxtApp().$api`**. Use this from pages/services for GETs that should participate in SSR and dedupe.

2. **Imperative JSON/Form calls** — **`useApi()`** (`app/composables/useApi.ts`): typed **`get` / `post` / `put` / `del`** on the same `$api` instance.

3. **API base URL** — Plugin sets **`baseURL`** to **`${runtimeConfig.apiBaseUrl}/api/`** on server and **`${public.apiBaseUrl}/api/`** on client (`app/plugins/api.ts`). Server requests attach **`X-Api-Key`** from **`runtimeConfig.apiKey`**.

4. **Bootstrap** — Global versions/books loading lives in **`layouts/default.vue`**; chapter route **`pages/bible/[reference]/index.vue`** loads chapter data and coordinates stores.

## Types and validation

- Per entity under **`app/types/<name>/`**:
  - **`*Schema.ts`** — Zod schemas (export `somethingSchema`).
  - **`*type.ts`** — `export type Something = z.infer<typeof somethingSchema>` (and related inferred types).
- Reuse schemas across nested objects (e.g. `chapterSchema` imports `bookSchema`, `verseSchema`).
- Bible book enums/metadata live in **`app/utils/bible/book.ts`** — use them for routing and sitemap generation, not ad-hoc strings.

## Errors

- Use **`createAppError(message, statusCode?)`** from **`app/utils/errors.ts`** for user-facing failures (wraps Nuxt **`createError`**; **`fatal`** is tied to client).

## Environment

- **`app/utils/env.ts`** parses **`import.meta.env`** with Zod (`NUXT_PUBLIC_API_BASE_URL`, `NUXT_API_KEY`, etc.).
- **`nuxt.config.ts`** reads **`env`** for **`runtimeConfig`** — keep new secrets/public vars consistent with that pattern.

## Styling and theming

- Global styles: **`app/assets/css/main.css`** — `@import "tailwindcss"`, DaisyUI `@plugin`, CSS variables (e.g. **`--h-header`**), **`@utility`** helpers (`h-header`, `top-header`, `h-screen-header`), **`color-scheme`** rules per DaisyUI theme.
- Prefer **DaisyUI semantic classes** (`bg-base-100`, `btn`, etc.) and Tailwind utilities already used nearby.
- **Color mode**: `@nuxtjs/color-mode` with cookie storage key **`theme`** (`dataValue: 'theme'`).

## Routing

- Bible reader URLs: **`/bible/[reference]`** where **`reference`** encodes book + chapter (e.g. `gn.1`) — see **`useBibleReference`** and **`useNavigateToBible`**.
- **`server/api/__sitemap__/urls.ts`** generates chapter URLs from **`BOOKS`** metadata — keep in sync if URL patterns change.

## What agents should do

- **Match domain boundaries**: API glue in **`composables/services/`**, reader behavior in **`composables/bible/`**, pure helpers in **`utils/`**.
- **Add or extend Zod schemas** when API payloads or forms gain fields; infer types from schemas rather than duplicating interfaces.
- **Use existing Bootstrap flows**: do not bypass `$api` for same-origin API calls; respect server-only headers.
- **Preserve pt-BR** for visible strings and SEO unless explicitly asked otherwise.
- **Write code comments in English.**
- **Keep changes scoped** — follow the same file placement and naming as neighboring features.

## What agents should avoid

- Introducing a second HTTP client for the main API without strong reason.
- Hardcoding API URLs outside **`runtimeConfig`** / **`env`** validation.
- Adding duplicate type definitions that drift from Zod schemas.
- Large unrelated refactors mixed with feature work.

---

When in doubt, open the closest existing feature (same folder and file type) and mirror its structure.
