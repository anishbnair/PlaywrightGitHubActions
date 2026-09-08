import { test, expect } from '../../fixture/test';
import { products } from '../../testdata/products';
import { loginAsStandardUser } from '../../utils/login';

test('adds and removes products from inventory', async ({ page, inventoryPage }) => {
  await loginAsStandardUser(page);

  await inventoryPage.addProduct(products.backpack);
  await inventoryPage.addProduct(products.bikeLight);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await inventoryPage.removeProduct(products.backpack);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(inventoryPage.product(products.bikeLight).getByRole('button', { name: 'Remove' })).toBeVisible();

  await inventoryPage.removeProduct(products.bikeLight);
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
});