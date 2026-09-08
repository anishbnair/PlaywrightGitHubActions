import { test, expect } from '../../fixture/test';
import { products } from '../../testdata/products';
import { loginAsStandardUser } from '../../utils/login';

test('validates required checkout information', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.addProduct(products.backpack);
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.expectInformationStep();
  await checkoutPage.continue();

  await expect(page.getByRole('heading', { name: 'Error: First Name is required' })).toBeVisible();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
});