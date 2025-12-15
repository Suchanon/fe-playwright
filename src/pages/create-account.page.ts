import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object Model for the Create Account page.
 * Maps to: /create-account route (and /create-account/email)
 */
export class CreateAccountPage extends BasePage {
    // Page URL
    readonly url = '/create-account/email';

    // Locators
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly submitButton: Locator;
    readonly termsCheckbox: Locator;
    readonly createAccountLink: Locator; // Link from other pages if needed

    constructor(page: Page) {
        super(page);

        // Input fields based on ezez-create-account.e2e-spec.ts findings
        this.nameInput = page.getByRole('textbox', { name: 'ชื่อ' });
        this.emailInput = page.getByRole('textbox', { name: 'อีเมล' });
        // Use .first() as per original test to safely pick the first "Password" field (ignoring Confirm Password)
        this.passwordInput = page.getByRole('textbox', { name: 'รหัสผ่าน' }).first();
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' });

        // Terms Checkbox
        this.termsCheckbox = page.getByRole('checkbox');

        // Link - initializing to satisfy TS, though mostly used on login page
        this.createAccountLink = page.getByRole('link', { name: 'สมัครสมาชิก' });

        // Submit button
        this.submitButton = page.getByRole('button', { name: 'สร้างบัญชี' });
    }

    /**
     * Navigate to the create account email page directly
     */
    async goto() {
        await this.navigate(this.url);
        await this.waitForPageLoad();
    }

    /**
     * Fill the entire registration form
     */
    async fillForm(name: string, email: string, password: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.termsCheckbox.check();
    }

    /**
     * Click the submit (create account) button
     */
    async submit() {
        await expect(this.submitButton).toBeEnabled();

        // Take screenshot of filled form before submitting (as per user request feature)
        await this.page.screenshot({ path: 'test-reports/screenshots/create-account-form.png' });

        await this.submitButton.click();
    }

    /**
     * Verify successful creation (based on current logic of checking URL change)
     */
    async verifySuccess() {
        // Increasing timeout to 10s as per e2e spec fix
        await expect(this.page).not.toHaveURL(/\/create-account\/email/, { timeout: 10000 });

        // Take success screenshot
        await this.page.screenshot({ path: 'test-reports/screenshots/create-account-success.png' });
    }
}
