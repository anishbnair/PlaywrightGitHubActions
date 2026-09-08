import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async expectInformationStep(): Promise<void> {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Your Information');
  }

  async expectOverview(): Promise<void> {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectComplete(): Promise<void> {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}