    import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type UserType = 'standard_user' | 'locked_out_user' | 'problem_user' | 'performance_glitch_user';

export const test = base.extend<{
  loginAs: (user: UserType) => Promise<InventoryPage>;
}>({
  loginAs: async ({ page }, use) => {
    async function loginAs(user: UserType) {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(user, 'secret_sauce');
      const inventory = new InventoryPage(page);
      await inventory.assertLoaded();
      return inventory;
    }
    await use(loginAs);
  }
});

export { expect } from '@playwright/test';
