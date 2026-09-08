import { expect, type Locator, type Page } from '@playwright/test';
import { AppMenu } from './AppMenu';

export class InventoryPage {
  readonly page: Page;
  readonly products: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly menu: AppMenu;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.sortSelect = page.locator('.product_sort_container');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menu = new AppMenu(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html$/);
    await expect(this.page.locator('.title')).toHaveText('Products');
    await expect(this.products).toHaveCount(6);
  }

  product(name: string): Locator {
    return this.products.filter({ hasText: name });
  }

  productLink(name: string): Locator {
    return this.product(name).locator('[data-test$="-title-link"]');
  }

  async addProduct(name: string): Promise<void> {
    await this.product(name).getByRole('button', { name: /Add to cart/i }).click();
  }

  async removeProduct(name: string): Promise<void> {
    await this.product(name).getByRole('button', { name: /Remove/i }).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(value);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async productNames(): Promise<string[]> {
    return this.products.locator('.inventory_item_name').allTextContents();
  }

  async productPrices(): Promise<number[]> {
    const prices = await this.products.locator('.inventory_item_price').allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }
}