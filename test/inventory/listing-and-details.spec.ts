import { test, expect } from '../../fixture/test';
import { products } from '../../testdata/products';
import { loginAsStandardUser } from '../../utils/login';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';

test.describe('Inventory and product details', () => {
  test('shows six products and opens a product detail page', async ({ page, inventoryPage }) => {
    await loginAsStandardUser(page);
    await inventoryPage.expectLoaded();

    await expect(inventoryPage.products).toHaveCount(6);
    await expect(inventoryPage.product(products.backpack)).toContainText(products.backpack);
    await inventoryPage.productLink(products.backpack).click();

    await new ProductDetailsPage(page).expectProduct(products.backpack);
  });

  test('retains a product added from its detail page', async ({ page, inventoryPage }) => {
    await loginAsStandardUser(page);
    await inventoryPage.productLink(products.backpack).click();

    const detailsPage = new ProductDetailsPage(page);
    await detailsPage.addToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await detailsPage.backToProducts();
    await expect(inventoryPage.product(products.backpack).getByRole('button', { name: 'Remove' })).toBeVisible();
  });
});