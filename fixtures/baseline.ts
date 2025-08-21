import { test as base } from '@playwright/test';
import { sha256 } from '../utils/hash';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export const test = base.extend<{ baseline: Map<string, string> }>({
  baseline: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    const inventory = new InventoryPage(page);
    await inventory.assertLoaded();

    const skus = await page.locator('[data-test="inventory-item"]').evaluateAll(els =>
      els.map(el => (el as HTMLElement).getAttribute('data-sku') || '')
    );
    const urls = await page.locator('[data-test="inventory-item"] [data-test="item-image"]').evaluateAll(imgs =>
      imgs.map(el => (el as HTMLImageElement).getAttribute('src') || '')
    );

    const map = new Map<string, string>();
    for (let i = 0; i < skus.length; i++) {
      if (!skus[i] || !urls[i]) continue;
      const resp = await page.request.get(urls[i]!);
      const body = await resp.body();
      const hash = await sha256(Buffer.from(body));
      map.set(skus[i]!, hash);
    }
    await use(map);
  }
});
