import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  items: Locator = this.page.locator('[data-test="inventory-item"]');
  cartBadge: Locator = this.page.locator('[data-test="shopping-cart-badge"]');

  async assertLoaded() {
    await expect(this.items.first()).toBeVisible({ timeout: 15000 });
  }

  async addToCartFirst() {
    const item = this.items.first();
    const addBtn = item.locator('[data-test="add-to-cart"]');
    await addBtn.click();
    await expect(addBtn).toHaveText(/remove/i, { timeout: 15000 });
  }
}
