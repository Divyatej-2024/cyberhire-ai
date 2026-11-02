import { expect, test } from '@playwright/test';

test('home route responds and renders a document', async ({ page }) => {
  const response = await page.goto('/');
  expect(response, 'navigation should produce an HTTP response').not.toBeNull();
  expect(response!.status()).toBeLessThan(500);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', /.+/);
});

test('layout remains within mobile, tablet and desktop viewports', async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1365, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.document,
      `horizontal overflow at ${viewport.width}px: ${JSON.stringify(dimensions)}`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
  }
});

test('initial page load has no uncaught browser exceptions', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
