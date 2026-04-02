import { Locator, Page } from '@playwright/test';

const clickIfVisible = async (locator: Locator) => {
  try {
    if (await locator.isVisible()) {
      await locator.click();
    }
  } catch {
    /* swallow */
  }
};

export const dismissPostLoginOverlays = async (page: Page): Promise<void> => {
  await clickIfVisible(page.getByRole('button', { name: /Not Now/i }));

  const recoveryRegion = page.getByRole('region', { name: /Your Session Has Been Recovered/i });
  if (await recoveryRegion.isVisible()) {
    await clickIfVisible(recoveryRegion.getByRole('button', { name: /Not Now/i }));
  }

  const closeEnvBanner = page.getByRole('button', { name: /close environment banner/i });
  await clickIfVisible(closeEnvBanner);

  const skipToMainContent = page.getByRole('button', { name: /Skip to main content/i });
  await clickIfVisible(skipToMainContent);
};
