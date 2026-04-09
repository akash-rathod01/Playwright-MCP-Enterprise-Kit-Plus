
import { defineConfig, devices } from '@playwright/test';
import { PlaywrightReportPortal } from '@reportportal/agent-js-playwright';

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
    [
      '@reportportal/agent-js-playwright',
      {
        endpoint: process.env.RP_ENDPOINT || 'https://your-reportportal-server/api/v1',
        token: process.env.RP_TOKEN || 'YOUR_REPORTPORTAL_TOKEN',
        project: process.env.RP_PROJECT || 'your_project',
        launch: process.env.RP_LAUNCH || 'playwright_launch',
        description: 'Playwright E2E Tests',
        attributes: [{ key: 'env', value: process.env.NODE_ENV || 'dev' }],
      },
    ],
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
