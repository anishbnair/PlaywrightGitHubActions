import { test } from '../../fixture/test';
import { checkoutCustomer, products } from '../../testdata/products';
import { loginAsStandardUser } from '../../utils/login';

test('completes an order and shows the confirmation page', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.addProduct(products.backpack);
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutPage.expectInformationStep();
  await checkoutPage.fillInformation(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    checkoutCustomer.postalCode,
  );
  await checkoutPage.continue();
  await checkoutPage.expectOverview();
  await checkoutPage.finish();
  await checkoutPage.expectComplete();
});