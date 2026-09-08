import { expect, type Locator, type Page } from '@playwright/test';

export class AppMenu {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly menu: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: /Open Menu/i });
    this.menu = page.locator('.bm-menu-wrap');
    this.allItemsLink = page.getByRole('link', { name: 'All Items' });
    this.aboutLink = page.getByRole('link', { name: 'About' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.resetLink = page.getByRole('link', { name: 'Reset App State' });
    this.closeButton = page.getByRole('button', { name: /Close Menu/i });
  }

  async open(): Promise<void> {
    await this.menuButton.click();
    await expect(this.menu).toBeVisible();
  }

  async resetAppState(): Promise<void> {
    await this.resetLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}