import { test, expect } from '../../fixture/test';
import { loginAsStandardUser } from '../../utils/login';

test('sorts inventory by name and price', async ({ page, inventoryPage }) => {
  await loginAsStandardUser(page);
  await inventoryPage.expectLoaded();

  const names = await inventoryPage.productNames();
  expect(names).toEqual([...names].sort());

  await inventoryPage.sortBy('za');
  expect(await inventoryPage.productNames()).toEqual([...names].sort().reverse());

  await inventoryPage.sortBy('lohi');
  const lowToHigh = await inventoryPage.productPrices();
  expect(lowToHigh).toEqual([...lowToHigh].sort((first, second) => first - second));

  await inventoryPage.sortBy('hilo');
  const highToLow = await inventoryPage.productPrices();
  expect(highToLow).toEqual([...highToLow].sort((first, second) => second - first));
});