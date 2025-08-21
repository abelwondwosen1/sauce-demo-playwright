import { expect } from '@playwright/test';
import { test as auth } from '../fixtures/auth';
import { test as withBaseline } from '../fixtures/baseline';

const test = withBaseline.extend(auth);

test('flags mismatched product images for problem_user', async ({ loginAs, page, baseline }) => {
  await loginAs('problem_user');

  const items = page.locator('[data-test="inventory-item"]');
  const count = await items.count();
  const mismatches: string[] = [];

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);
    const sku = (await item.getAttribute('data-sku')) || `idx-${i}`;
    const img = item.locator('[data-test="item-image"]');
    const url = await img.getAttribute('src');
    if (!url) continue;
    const resp = await page.request.get(url);
    const { sha256 } = await import('../utils/hash');
    const hash = await sha256(Buffer.from(await resp.body()));
    const baselineHash = baseline.get(sku);

    if (!baselineHash || baselineHash !== hash) {
      mismatches.push(sku);
    }
  }

  expect(mismatches, `Mismatched/unknown image hashes: ${mismatches.join(', ')}`).toHaveLength(0);
});

