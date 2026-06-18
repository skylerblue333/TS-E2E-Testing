// Mock Playwright test structure
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://example.com/login');
    
    // Fill out the form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'securepassword123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify successful login (redirected to dashboard)
    await expect(page).toHaveURL('https://example.com/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('shows error message on invalid credentials', async ({ page }) => {
    await page.goto('https://example.com/login');
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    
    // Verify error message
    const errorMsg = page.locator('.error-message');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Invalid credentials');
  });
});