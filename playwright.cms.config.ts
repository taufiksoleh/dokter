import { defineConfig, devices } from '@playwright/test'

const port = 4174

/** Tes panel admin (Paket Mandiri) terhadap build produksi dengan database sementara. */
export default defineConfig({
  testDir: './tests/cms-browser',
  workers: 1,
  use: {
    baseURL: `http://localhost:${port}`,
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/cms-test-server.mjs',
    env: { PORT: String(port) },
    url: `http://localhost:${port}`,
    timeout: 300_000,
    reuseExistingServer: false,
  },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }],
})
