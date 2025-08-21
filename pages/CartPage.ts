import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  checkoutBtn = this.page.locator('[data-test="checkout"]');

  async assertLoaded() {
    await expect(this.checkoutBtn).toBeVisible();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
