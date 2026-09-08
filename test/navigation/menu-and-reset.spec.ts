import { test, expect } from '../../fixture/test';
import { products } from '../../testdata/products';
import { loginAsStandardUser } from '../../utils/login';

test('resets app state from the navigation menu', async ({ page, inventoryPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.addProduct(products.backpack);
  await inventoryPage.menu.open();
  await inventoryPage.menu.resetAppState();
  await page.reload();

  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  await expect(inventoryPage.product(products.backpack).getByRole('button', { name: 'Add to cart' })).toBeVisible();
});

test('logs out and returns to the login page', async ({ page, inventoryPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.menu.open();
  await inventoryPage.menu.logout();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});