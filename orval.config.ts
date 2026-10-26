import { defineConfig } from 'orval'

// Pick up OPENAPI_URL from .env.local if present (works on every OS/shell).
try {
  process.loadEnvFile('.env.local')
} catch {
  // no .env.local, rely on the shell environment
}

/**
 * OpenAPI source: set OPENAPI_URL in .env.local, e.g.
 *   OPENAPI_URL=http://localhost:8080/v3/api-docs
 * Falls back to the local placeholder spec.
 */
const input = process.env.OPENAPI_URL ?? './openapi/sample.yaml'

export default defineConfig({
  api: {
    input: { target: input },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/endpoints',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      formatter: 'biome',
      // Mocks answer under the same /api prefix the app calls (see src/api/client.ts).
      mock: {
        generators: [{ type: 'msw', baseUrl: '/api', delay: 200 }],
        indexMockFiles: true,
      },
      override: {
        mutator: {
          path: 'src/api/client.ts',
          name: 'customInstance',
        },
        query: {
          useSuspenseQuery: true,
          // queryOptions getters are exported, use them in route loaders
          shouldExportKeys: true,
          signal: true,
        },
      },
    },
  },
  apiZod: {
    input: { target: input },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/zod',
      client: 'zod',
      fileExtension: '.zod.ts',
      clean: true,
      formatter: 'biome',
    },
  },
})
