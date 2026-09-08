import { test, expect } from '../../fixture/test';
import { loginAsStandardUser } from '../../utils/login';

test('exposes named controls and visible keyboard focus', async ({ page, inventoryPage }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Username')).toHaveAccessibleName('Username');
  await expect(page.getByPlaceholder('Password')).toHaveAccessibleName('Password');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  await loginAsStandardUser(page);
  await inventoryPage.expectLoaded();
  await inventoryPage.menu.menuButton.focus();
  await expect(inventoryPage.menu.menuButton).toBeFocused();
  await inventoryPage.menu.open();
  await expect(inventoryPage.menu.closeButton).toBeVisible();
});