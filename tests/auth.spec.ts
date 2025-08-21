import { test, expect } from '../fixtures/auth';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication', () => {
  test('Successful login with standard_user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Locked out user shows correct error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorMsg).toHaveText(/locked out/i);
  });

  test('Invalid password shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_password');
    await expect(login.errorMsg).toHaveText(/do not match any user/i);
  });
});
