import { test, expect } from '../fixtures/auth';
import { calculateTotal } from '../utils/priceCalculator';

test.describe('E2E Purchase Flow', () => {
  test('should complete a purchase and validate total price', async ({ loginAs, page }) => {
    await loginAs('standard_user');

    const items = page.locator('[data-test="inventory-item"]');
    const firstItem = items.nth(0);
    const secondItem = items.nth(1);

    const firstPrice = parseFloat((await firstItem.locator('[data-test="inventory-item-price"]').textContent())!.replace('$', ''));
    const secondPrice = parseFloat((await secondItem.locator('[data-test="inventory-item-price"]').textContent())!.replace('$', ''));

    await firstItem.locator('[data-test="add-to-cart"]').click();
    await secondItem.locator('[data-test="add-to-cart"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('User');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    const displayedItemTotal = parseFloat((await page.locator('[data-test="subtotal-label"]').textContent())!.replace('Item total: $', ''));
    const displayedTax = parseFloat((await page.locator('[data-test="tax-label"]').textContent())!.replace('Tax: $', ''));
    const displayedTotal = parseFloat((await page.locator('[data-test="total-label"]').textContent())!.replace('Total: $', ''));

    const { itemTotal, tax, total } = calculateTotal([firstPrice, secondPrice], displayedTax / displayedItemTotal);

    expect(displayedItemTotal).toBeCloseTo(itemTotal, 2);
    expect(displayedTax).toBeCloseTo(tax, 2);
    expect(displayedTotal).toBeCloseTo(total, 2);

    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
