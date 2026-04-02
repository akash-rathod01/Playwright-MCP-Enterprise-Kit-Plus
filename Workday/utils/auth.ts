import { Page } from '@playwright/test';

export type WorkdayCredentials = {
  url: string;
  username: string;
  password: string;
};

export const getWorkdayCredentials = (): WorkdayCredentials => ({
  url: process.env.WORKDAY_URL ?? 'https://impl.workday.com/wday/authgwy/onetp4/login.htmld?redirect=n',
  username: process.env.WORKDAY_USERNAME ?? 'Testinguser',
  password: process.env.WORKDAY_PASSWORD ?? 'Workday@123',
});

export const loginToWorkday = async (page: Page, creds: WorkdayCredentials): Promise<void> => {
  await page.goto(creds.url, { waitUntil: 'domcontentloaded' });

  const usernameField = page.getByRole('textbox', { name: /username/i });
  await usernameField.waitFor({ state: 'visible', timeout: 15_000 });
  await usernameField.fill(creds.username);

  const passwordField = page.getByLabel(/password/i);
  await passwordField.waitFor({ state: 'visible', timeout: 15_000 });
  await passwordField.fill(creds.password);

  await page.getByRole('button', { name: /(sign|log) in/i }).click();

  const rememberDeviceSkip = page.getByRole('link', { name: /skip/i });
  try {
    await rememberDeviceSkip.waitFor({ state: 'visible', timeout: 5_000 });
    await rememberDeviceSkip.click();
  } catch {
    // Optional flow did not show up.
  }

  await page.waitForLoadState('networkidle');
};
