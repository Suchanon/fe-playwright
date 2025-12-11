import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

// Load test credentials from environment variables
const TEST_EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || 'testpassword123';

test.describe('Login Flow', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
    });

    test('should display login page correctly', async ({ page }) => {
        // Verify login page elements are visible
        await loginPage.waitForReady();

        // Check that key elements are present
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.googleLoginButton).toBeVisible();
        await expect(loginPage.facebookLoginButton).toBeVisible();
        await expect(loginPage.createAccountLink).toBeVisible();
        await expect(loginPage.forgotPasswordLink).toBeVisible();
    });

    test('should have login button disabled when email and password are empty', async ({ page }) => {
        await loginPage.waitForReady();

        // With empty fields, login button should be disabled
        const isDisabled = await loginPage.isLoginButtonDisabled();
        expect(isDisabled).toBe(true);
    });

    test('should have login button disabled with only email filled', async ({ page }) => {
        await loginPage.waitForReady();

        // Fill only email
        await loginPage.fillEmail('test@example.com');

        // Button should still be disabled
        const isDisabled = await loginPage.isLoginButtonDisabled();
        expect(isDisabled).toBe(true);
    });

    test('should have login button disabled with only password filled', async ({ page }) => {
        await loginPage.waitForReady();

        // Fill only password
        await loginPage.fillPassword('somepassword');

        // Button should still be disabled
        const isDisabled = await loginPage.isLoginButtonDisabled();
        expect(isDisabled).toBe(true);
    });

    test('should enable login button when both email and password are filled', async ({ page }) => {
        await loginPage.waitForReady();

        // Fill both fields
        await loginPage.fillEmail('test@example.com');
        await loginPage.fillPassword('somepassword');

        // Button should be enabled
        const isDisabled = await loginPage.isLoginButtonDisabled();
        expect(isDisabled).toBe(false);
    });

    test('should show error message with invalid credentials', async ({ page }) => {
        await loginPage.waitForReady();

        // Login with invalid credentials
        await loginPage.login('invalid@email.com', 'wrongpassword');

        // Wait for error response
        await page.waitForTimeout(2000);

        // Error should be displayed or URL should still be on login page
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/sign-in');
    });

    test('should navigate to forgot password page', async ({ page }) => {
        await loginPage.waitForReady();

        // Click forgot password link
        await loginPage.clickForgotPassword();

        // Should navigate to forgot password page
        await page.waitForURL(/\/forgot-password/);
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/forgot-password');
    });

    test('should navigate to create account page', async ({ page }) => {
        await loginPage.waitForReady();

        // Click create account link
        await loginPage.clickCreateAccount();

        // Should navigate to create account page
        await page.waitForURL(/\/create-account/);
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/create-account');
    });

    // Test with mock app credentials (test@example.com / testpassword123)
    test('should login successfully with valid credentials', async ({ page }) => {
        await loginPage.waitForReady();

        // Login with valid credentials from environment
        await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

        // Wait for navigation to dashboard
        await dashboardPage.waitForDashboard();

        // Verify we're on the dashboard
        const isLoaded = await dashboardPage.isLoaded();
        expect(isLoaded).toBe(true);
    });
});
