import { defineConfig, devices } from '@playwright/test'

const PORT = 4300
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`

// Optional: use a system/CI Chromium instead of Playwright's download.
const executablePath = process.env.PW_CHROMIUM_EXECUTABLE_PATH

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL,
    // Base locale; the app falls back to Italian for unsupported languages anyway.
    locale: 'it-IT',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: executablePath ? { executablePath } : {},
      },
    },
  ],
  // Starts the dev server (MSW mocks on) unless E2E_BASE_URL points elsewhere,
  // e.g. a deployed test environment with the real backend.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `pnpm dev --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
