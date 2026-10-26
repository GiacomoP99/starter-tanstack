import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

// Optional: use a system/CI Chromium instead of Playwright's download
// (useful when the corporate network blocks the browser download).
const executablePath = process.env.PW_CHROMIUM_EXECUTABLE_PATH

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        coverage: {
          provider: 'v8',
          include: ['src/**/*.{ts,tsx}'],
          exclude: [
            'src/api/generated/**',
            'src/routeTree.gen.ts',
            'src/mocks/**',
            'src/test/**',
            'src/main.tsx',
            '**/*.d.ts',
          ],
        },
        projects: [
          {
            // Pure logic: utils, formatters, schemas. Runs in Node, very fast.
            extends: true,
            test: {
              name: 'unit',
              environment: 'node',
              include: ['src/**/*.test.ts'],
            },
          },
          {
            // Components and routes in a real Chromium (layout, SVG, events).
            extends: true,
            test: {
              name: 'browser',
              include: ['src/**/*.test.tsx'],
              setupFiles: ['./src/test/setup-browser.ts'],
              browser: {
                enabled: true,
                headless: true,
                provider: playwright({
                  launchOptions: executablePath ? { executablePath } : {},
                }),
                instances: [{ browser: 'chromium' }],
              },
            },
          },
        ],
      },
    }),
  ),
)
