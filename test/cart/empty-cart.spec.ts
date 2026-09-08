import { test, expect } from '../../fixture/test';
import { loginAsStandardUser } from '../../utils/login';

test('opens an empty cart without stale items', async ({ page, inventoryPage, cartPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();

  await expect(cartPage.items).toHaveCount(0);
  await expect(cartPage.continueShoppingButton).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
});