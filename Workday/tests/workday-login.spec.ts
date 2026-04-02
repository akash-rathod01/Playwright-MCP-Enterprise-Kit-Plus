import { test, expect } from '@playwright/test';
import { getWorkdayCredentials, loginToWorkday } from '../utils/auth';

// This spec exercises the Workday login flow end-to-end against the provided tenant.
test('Workday login navigates to homepage', async ({ page }) => {
  const creds = getWorkdayCredentials();
  test.skip(!creds.username || !creds.password, 'Set WORKDAY_USERNAME and WORKDAY_PASSWORD env variables.');

  await loginToWorkday(page, creds);

  // Workday tenants typically redirect to a homepage containing "Home" or a dashboard panel.
  await expect(page).not.toHaveURL(/login/i);
});
