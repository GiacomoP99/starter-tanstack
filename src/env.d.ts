interface ImportMetaEnv {
  /** Base URL prepended to every API call. Defaults to `/api` (same origin). */
  readonly VITE_API_BASE_URL?: string
  /** "false" to disable MSW mocks in dev (on by default) */
  readonly VITE_ENABLE_MOCKS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
