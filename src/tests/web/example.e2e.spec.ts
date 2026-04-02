
import { test } from '@playwright/test';
import { HomePage } from '../../framework/pages/HomePage';
import { MOCK_HOMEPAGE_HTML } from '../../framework/utils/mockHomepage';

test('Homepage title contains text', async ({ page }) => {
  await page.route('https://example.com/', async route => {
    await route.fulfill({ status: 200, contentType: 'text/html', body: MOCK_HOMEPAGE_HTML });
  });

  const home = new HomePage(page);
  await home.goto();
  await home.assertTitleContains('Example Domain');
});
