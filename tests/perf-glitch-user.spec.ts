import { test, expect } from '../fixtures/auth';

test.describe('Performance glitch user', () => {
  test('can add to cart without hard waits', async ({ loginAs }) => {
    const inventory = await loginAs('performance_glitch_user');

    await inventory.addToCartFirst();

    const badge = inventory.cartBadge;
    await expect.poll(
      async () => (await badge.textContent())?.trim() || '0',
      { timeout: 15000, intervals: [250, 500, 750, 1000] }
    ).toBe('1');
  });
});
