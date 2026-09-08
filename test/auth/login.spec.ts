import { test, expect } from '../../fixture/test';
import { users } from '../../testdata/users';
import { routes } from '../../utils/routes';

test.describe('Authentication', () => {
  test('logs in with a standard user', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(new RegExp(`${routes.inventory}$`));
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('rejects a locked-out user', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(page).toHaveURL(new RegExp(`${routes.login}$`));
    await loginPage.expectError('Epic sadface: Sorry, this user has been locked out.');
  });
});