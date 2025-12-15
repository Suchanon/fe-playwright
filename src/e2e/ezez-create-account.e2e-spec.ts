import { test, expect } from '@playwright/test';

/**
 * Sign Up Flow Tests for Real Test Environment (ezez.lol)
 */
test.describe('Sign Up Flow - Real Test Environment (ezez.lol)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/sign-in');
    });

    test('should successfully create a new account with email', async ({ page }) => {
        // 1. Click "Create new account" (สร้างบัญชีใหม่)
        await page.getByRole('link', { name: 'สร้างบัญชีใหม่' }).click();
        await expect(page).toHaveURL(/\/create-account/);

        // 2. Click "Continue with Email" (ดำเนินการต่อด้วย อีเมล)
        await page.getByRole('button', { name: 'ดำเนินการต่อด้วย อีเมล' }).click();
        await expect(page).toHaveURL(/\/create-account\/email/);

        // 3. Fill in the form
        // We append a timestamp to the email to ensure it is unique for every test run.
        // This prevents the "Email already exists" error.
        const timestamp = Date.now();
        const testEmail = `feplaywirghttesting${timestamp}@comfythings.com`;
        const testName = 'feplaywirghttesting1';
        const testPassword = '1';

        // Name
        await page.getByRole('textbox', { name: 'ชื่อ' }).fill(testName);

        // Email
        await page.getByRole('textbox', { name: 'อีเมล' }).fill(testEmail);

        // Password & Confirm Password
        await page.getByRole('textbox', { name: 'รหัสผ่าน' }).first().fill(testPassword);
        await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill(testPassword);

        // 4. Accept Terms
        // The checkbox is often generic, locating by label text near it is safer if role 'checkbox' is ambiguous or hidden.
        // Based on snapshot, 'checkbox' role exists.
        await page.getByRole('checkbox').check();

        // 5. Submit
        const createBtn = page.getByRole('button', { name: 'สร้างบัญชี' });
        await expect(createBtn).toBeEnabled();

        // Screenshot: Filled Form
        await page.screenshot({ path: 'test-results/screenshots/create-account-form.png' });

        await createBtn.click();

        await createBtn.click();

        // Expect to be redirected or see a success message.
        // For now, we wait for URL change or a specific element that appears after login/signup.
        // Assuming redirection to /dashboard or similar, or just away from create-account
        // Increasing timeout to 10s to handle network latency or verifying email redirects
        await expect(page).not.toHaveURL(/\/create-account\/email/, { timeout: 10000 });

        // Screenshot: Account Created
        await page.screenshot({ path: 'test-results/screenshots/create-account-success.png' });

        // Log the created email for potential manual verification/cleanup
        console.log(`Created account with email: ${testEmail}`);
    });
});
