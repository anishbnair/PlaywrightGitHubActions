import { test, expect } from '../../fixture/test';
import { loginAsStandardUser } from '../../utils/login';

for (const viewport of [
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
]) {
  test(`keeps inventory usable at ${viewport.name} size`, async ({ page, inventoryPage }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await loginAsStandardUser(page);
    await inventoryPage.expectLoaded();

    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth).toBeLessThanOrEqual(viewport.width);
    await expect(inventoryPage.cartLink).toBeVisible();
    await expect(inventoryPage.menu.menuButton).toBeVisible();
  });
}