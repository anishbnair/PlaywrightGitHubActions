import { expect, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText(name);
    await expect(this.page.getByRole('button', { name: /Add to cart|Remove/i })).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  async backToProducts(): Promise<void> {
    await this.page.getByRole('button', { name: 'Back to products' }).click();
  }
}