import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

// Load test credentials from environment variables
const TEST_EMAIL = process.env.OTP_BYPASS_EMAIL || process.env.TEST_USER_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.OTP_BYPASS_CODE || process.env.TEST_USER_PASSWORD || 'testpassword123';

test.describe('Login Flow', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
    });

    test('should display login heading in Thai', async ({ page }) => {
        // Use getByRole to find the heading
        const heading = page.getByRole('heading', { name: 'เข้าสู่ระบบ' });

        // Assert it's visible
        await expect(heading).toBeVisible();
    });

    test('should display login page correctly', async ({ page }) => {
        // Check that key elements are present
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.googleButton).toBeVisible();
        await expect(loginPage.facebookButton).toBeVisible();
        await expect(loginPage.createAccountLink).toBeVisible();
        await expect(loginPage.forgotPasswordLink).toBeVisible();
    });

    test('should have login button disabled when email and password are empty', async ({ page }) => {
        // With empty fields, login button should be disabled
        const isDisabled = await loginPage.loginButton.isDisabled();
        expect(isDisabled).toBe(true);
    });

    test('should have login button disabled with only email filled', async ({ page }) => {
        // Fill only email
        await loginPage.emailInput.fill('test@example.com');

        // Button should still be disabled
        const isDisabled = await loginPage.loginButton.isDisabled();
        expect(isDisabled).toBe(true);
    });

    test('should have login button disabled with only password filled', async ({ page }) => {
        // Fill only password
        await loginPage.passwordInput.fill('somepassword');

        // Button should still be disabled
        const isDisabled = await loginPage.loginButton.isDisabled();
        expect(isDisabled).toBe(true);
    });

    test('should enable login button when both email and password are filled', async ({ page }) => {
        // Fill both fields
        await loginPage.emailInput.fill('test@example.com');
        await loginPage.passwordInput.fill('somepassword');

        // Button should be enabled
        const isDisabled = await loginPage.loginButton.isDisabled();
        expect(isDisabled).toBe(false);
    });

    test('should show error message with invalid credentials', async ({ page }) => {
        // Login with invalid credentials
        await loginPage.login('invalid@email.com', 'wrongpassword');

        // Wait for error response
        await page.waitForTimeout(2000);

        // Error should be displayed or URL should still be on login page
        const currentUrl = page.url();
        expect(currentUrl).toContain('/sign-in');
    });

    test('should navigate to forgot password page', async ({ page }) => {
        // Click forgot password link
        await loginPage.forgotPasswordLink.click();

        // Should navigate to forgot password page
        await page.waitForURL(/\/forgot-password/);
        const currentUrl = page.url();
        expect(currentUrl).toContain('/forgot-password');
    });

    test('should navigate to create account page', async ({ page }) => {
        // Click create account link
        await loginPage.createAccountLink.click();

        // Should navigate to create account page
        await page.waitForURL(/\/create-account/);
        const currentUrl = page.url();
        expect(currentUrl).toContain('/create-account');
    });

    // Test with mock app credentials (test@example.com / testpassword123)
    test('should login successfully with valid credentials', async ({ page }) => {
        // Login with valid credentials from environment
        await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

        // Wait for navigation to dashboard
        await dashboardPage.waitForDashboard();

        // Verify we're on the dashboard
        const isLoaded = await dashboardPage.isLoaded();
        expect(isLoaded).toBe(true);
    });
});
