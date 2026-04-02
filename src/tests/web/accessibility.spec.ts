
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { MOCK_HOMEPAGE_HTML } from '../../framework/utils/mockHomepage';

test('No WCAG A/AA violations on homepage', async ({ page }, testInfo) => {
  await page.route('https://example.com/', async route => {
    await route.fulfill({ status: 200, contentType: 'text/html', body: MOCK_HOMEPAGE_HTML });
  });

  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  await testInfo.attach('axe-results.json', { body: Buffer.from(JSON.stringify(results,null,2)), contentType: 'application/json' });
  expect(results.violations).toEqual([]);
});
