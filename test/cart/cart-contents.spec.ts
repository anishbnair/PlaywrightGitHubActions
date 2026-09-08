import { test, expect } from '../../fixture/test';
import { products } from '../../testdata/products';
import { loginAsStandardUser } from '../../utils/login';

test('shows selected products and removes only the requested item', async ({ page, inventoryPage, cartPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.addProduct(products.backpack);
  await inventoryPage.addProduct(products.bikeLight);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();

  await expect(cartPage.items).toHaveCount(2);
  await expect(cartPage.item(products.backpack)).toBeVisible();
  await cartPage.removeProduct(products.backpack);

  await expect(cartPage.items).toHaveCount(1);
  await expect(cartPage.item(products.bikeLight)).toBeVisible();
});

test('continues shopping without losing cart contents', async ({ page, inventoryPage, cartPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.addProduct(products.backpack);
  await inventoryPage.openCart();
  await cartPage.continueShoppingButton.click();

  await inventoryPage.expectLoaded();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});