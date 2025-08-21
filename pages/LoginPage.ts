import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  username = this.page.locator('[data-test="username"]');
  password = this.page.locator('[data-test="password"]');
  loginBtn = this.page.locator('[data-test="login-button"]');
  errorMsg = this.page.locator('[data-test="error"]');

  async goto() {
    await this.page.goto('/');
    await expect(this.username).toBeVisible();
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}
