import { test, expect } from '@playwright/test';
import { CreateAccountPage } from '../pages';

/**
 * Sign Up Flow Tests for Real Test Environment (ezez.lol)
 */
test.describe('Sign Up Flow - Real Test Environment (ezez.lol)', () => {



    test('should successfully create a new account with email', async ({ page }) => {
        test.setTimeout(60000); // Increase test timeout to 60s due to potential slow network/env
        const createAccountPage = new CreateAccountPage(page);

        // 1. Generate dynamic test data
        const timestamp = Date.now();
        const testEmail = `feplaywirghttesting${timestamp}@comfythings.com`;
        const testName = 'feplaywirghttesting1';
        const testPassword = '1';

        // 2. Navigation
        await createAccountPage.goto();

        // 3. Fill Form
        // This includes taking the "Filled Form" screenshot internally
        await createAccountPage.fillForm(testName, testEmail, testPassword);

        // 4. Submit
        // This includes taking the success screenshot internally
        await createAccountPage.submit();

        // 5. Verify
        await createAccountPage.verifySuccess();

        // Log the created email for potential manual verification/cleanup
        console.log(`Created account with email: ${testEmail}`);
    });
});
