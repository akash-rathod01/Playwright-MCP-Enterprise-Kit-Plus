import { test } from '@playwright/test';
import { getWorkdayCredentials, loginToWorkday } from '../../utils/auth';
import { startProxyForUser } from '../../utils/proxy';

const creds = getWorkdayCredentials();

test.describe('Start proxy smoke', () => {
  test.skip(!creds.username || !creds.password, 'Set WORKDAY_USERNAME and WORKDAY_PASSWORD env variables.');

  test('launch proxy for Camille Sunga', async ({ page, context }) => {
    await loginToWorkday(page, creds);
    await startProxyForUser(page, context);
  });
});
