import { test, expect } from '../fixtures/auth';

test.describe('Inventory Sorting', () => {
  test('should sort items by price low to high', async ({ loginAs, page }) => {
    await loginAs('standard_user');

    await page.locator('[data-test="product_sort_container"]').selectOption('lohi');

    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));

    const sorted = [...priceNumbers].sort((a, b) => a - b);
    expect(priceNumbers).toEqual(sorted);
  });

  test('should sort items by price high to low', async ({ loginAs, page }) => {
    await loginAs('standard_user');

    await page.locator('[data-test="product_sort_container"]').selectOption('hilo');

    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));

    const sorted = [...priceNumbers].sort((a, b) => b - a);
    expect(priceNumbers).toEqual(sorted);
  });
});
