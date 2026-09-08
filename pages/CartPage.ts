import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
  }

  item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async removeProduct(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: /Remove/i }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}