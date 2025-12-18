import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

/**
 * Login Flow Tests for Dev Environment
 *
 * These tests are designed for the Dev Environment
 */
test.describe('Login Flow - Dev Environment', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/sign-in');
    });

    test('should display login page heading', async ({ page }) => {
        // Page title
        await expect(page.getByText('ลงชื่อเข้าใช้').first()).toBeVisible();
    });

    test('should display Google login button', async ({ page }) => {
        const googleBtn = page.getByRole('button', { name: 'ดำเนินการต่อด้วย Google' });
        await expect(googleBtn).toBeVisible();
    });

    test('should display Facebook login button', async ({ page }) => {
        const facebookBtn = page.getByRole('button', { name: 'ดำเนินการต่อด้วย Facebook' });
        await expect(facebookBtn).toBeVisible();
    });

    test('should display email and password fields', async ({ page }) => {
        await expect(page.getByRole('textbox', { name: 'อีเมล' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'รหัสผ่าน' })).toBeVisible();
    });

    test('should have login button disabled when fields are empty', async ({ page }) => {
        const loginBtn = page.getByRole('button', { name: 'ลงชื่อเข้าใช้' });
        await expect(loginBtn).toBeDisabled();
    });

    test('should display and click Create Account link (สร้างบัญชีใหม่)', async ({ page }) => {
        // Find the Create Account link
        const createAccountLink = page.getByRole('link', { name: 'สร้างบัญชีใหม่' });

        // Assert it's visible
        await expect(createAccountLink).toBeVisible();

        // Click it
        await createAccountLink.click();

        // Verify navigation to create account page
        await page.waitForURL(/\/create-account/);
        expect(page.url()).toContain('/create-account');
    });

    test('should display and click Forgot Password link (คลิกที่นี่)', async ({ page }) => {
        // Find the Forgot Password link
        const forgotPasswordLink = page.getByRole('link', { name: 'คลิกที่นี่' });

        // Assert it's visible
        await expect(forgotPasswordLink).toBeVisible();

        // Click it
        await forgotPasswordLink.click();

        // Verify navigation to forgot password page
        await page.waitForURL(/\/forgot-password/);
        expect(page.url()).toContain('/forgot-password');
    });

});
