
import { defineConfig, devices } from '@playwright/test';

// Allow optional slow motion to make headed runs easier to follow.
const resolvedSlowMoEnv = process.env.PW_SLOWMO || process.env.PLAYWRIGHT_SLOWMO;
const parsedSlowMo = resolvedSlowMoEnv ? Number(resolvedSlowMoEnv) : 0;
const slowMo = Number.isFinite(parsedSlowMo) && parsedSlowMo > 0 ? parsedSlowMo : 0;

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true, suiteTitle: true }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: slowMo ? { slowMo } : undefined,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
