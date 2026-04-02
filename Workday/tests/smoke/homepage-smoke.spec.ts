import { test, expect } from '@playwright/test';
import { getWorkdayCredentials, loginToWorkday } from '../../utils/auth';
import { dismissPostLoginOverlays } from '../../utils/ui';
import { startProxyForUser } from '../../utils/proxy';

const creds = getWorkdayCredentials();

test.describe('Workday smoke suite', () => {
  test.skip(!creds.username || !creds.password, 'Set WORKDAY_USERNAME and WORKDAY_PASSWORD env variables.');

  test.beforeEach(async ({ page }) => {
    await loginToWorkday(page, creds);
    await dismissPostLoginOverlays(page);
  });

  test('dashboard shows key cards', async ({ page }) => {
    await dismissPostLoginOverlays(page);
    await expect(page).not.toHaveURL(/login/i);

    await expect(page.getByText(/Accessibility Overview/i)).toBeVisible();
    await expect(page.getByText(/Implementation Preview/i)).toBeVisible();
    await expect(page.getByText(/Awaiting Your Action/i)).toBeVisible();
    await expect(page.getByText(/Timely Suggestions/i)).toBeVisible();
    await expect(page.getByText(/Recommended for You/i)).toBeVisible();
  });

  test('quick actions are accessible', async ({ page }) => {
    await dismissPostLoginOverlays(page);

    await expect(page.getByRole('button', { name: /Enter Time for Worker/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('button', { name: /Review Time/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('button', { name: /Edit and Approve Time/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('button', { name: /Feedback on My Team/i })).toBeVisible({ timeout: 15_000 });
  });

  test('start proxy for Camille Sunga', async ({ page, context }) => {
    await startProxyForUser(page, context);
  });
});
