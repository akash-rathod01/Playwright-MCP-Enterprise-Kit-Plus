import { BrowserContext, expect, Locator, Page } from '@playwright/test';
import { dismissPostLoginOverlays } from './ui';

const DEFAULT_PROXY_CANDIDATES = [
  process.env.WORKDAY_PROXY_TARGET,
  'Camille Sunga (sunga.173)',
  'Camille Sunga (5639329)',
  'Camille Sunga',
].filter(Boolean) as string[];

const FIRST_TARGET = DEFAULT_PROXY_CANDIDATES[0] ?? 'Camille Sunga';

const getSearchBox = (page: Page): Locator =>
  page
    .locator('[role="search"] input, [role="searchbox"], input[placeholder*="search" i], input[type="search"]')
    .first();

export const startProxyForUser = async (
  page: Page,
  context: BrowserContext,
  candidates: string[] = DEFAULT_PROXY_CANDIDATES,
): Promise<void> => {
  await dismissPostLoginOverlays(page);

  const searchBox = getSearchBox(page);
  await searchBox.waitFor({ state: 'visible', timeout: 15_000 });
  await searchBox.click();
  await searchBox.fill('Start Proxy');

  const startProxyOption = page.getByRole('option', { name: /^Start Proxy$/i }).first();
  let target = page;

  try {
    await startProxyOption.waitFor({ state: 'visible', timeout: 6_000 });
    const maybeNewPagePromise = context.waitForEvent('page', { timeout: 10_000 }).catch(() => null);
    await startProxyOption.click();
    const proxyPage = await maybeNewPagePromise;
    target = proxyPage ?? page;
    if (proxyPage) {
      await proxyPage.waitForLoadState('domcontentloaded');
    }
  } catch {
    await searchBox.press('Enter');
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);

    const startProxyLink = page.getByRole('link', { name: /^Start Proxy$/i }).first();
    await startProxyLink.waitFor({ state: 'visible', timeout: 15_000 });

    const maybeNewPagePromise = context.waitForEvent('page', { timeout: 10_000 }).catch(() => null);
    await startProxyLink.click();

    const proxyPage = await maybeNewPagePromise;
    target = proxyPage ?? page;
    if (proxyPage) {
      await proxyPage.waitForLoadState('domcontentloaded');
    }
  }

  await handleProxyDialog(target, candidates);
};

const handleProxyDialog = async (target: Page, candidates: string[]) => {
  const dialogHeading = target.getByRole('heading', { name: /Start Proxy/i });
  await dialogHeading.waitFor({ state: 'visible', timeout: 15_000 });

  const workerInput = target.getByRole('textbox', { name: /User to Proxy As/i }).first();
  await workerInput.waitFor({ state: 'visible', timeout: 15_000 });

  const removeExisting = target.getByRole('button', { name: /Remove .*Camille/i });
  if (await removeExisting.count()) {
    await removeExisting.first().click();
  }

  const firstTarget = candidates[0] ?? FIRST_TARGET;
  await workerInput.fill(firstTarget);

  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  let optionSelected = false;
  for (const candidate of candidates) {
    const option = target.getByRole('option', { name: new RegExp(escapeRegExp(candidate), 'i') }).first();
    if (await option.count()) {
      await option.click();
      optionSelected = true;
      break;
    }
  }

  if (!optionSelected) {
    try {
      await workerInput.press('ArrowDown');
      await workerInput.press('Enter');
      optionSelected = true;
    } catch {
      // Swallow and let validation surface if no option found.
    }
  }

  const selectedOption = target.getByRole('option', { name: /Camille Sunga/i }).first();
  await expect(selectedOption).toBeVisible();

  const okButton = target.getByRole('button', { name: /^ok$/i }).first();
  await okButton.waitFor({ state: 'visible', timeout: 10_000 });
  await okButton.click();

  await expect(dialogHeading).not.toBeVisible({ timeout: 20_000 });
};
