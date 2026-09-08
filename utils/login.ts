import type { Page } from '@playwright/test';
import { users } from '../testdata/users';
import { LoginPage } from '../pages/LoginPage';

export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
}