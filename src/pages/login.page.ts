import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object Model for the Login page.
 * Maps to: /sign-in route
 */
export class LoginPage extends BasePage {
    // Page URL
    readonly url = '/sign-in';

    // Locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly googleButton: Locator;
    readonly facebookButton: Locator;
    readonly createAccountLink: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.getByRole('textbox', { name: 'อีเมล' });
        this.passwordInput = page.getByRole('textbox', { name: 'รหัสผ่าน' });
        this.loginButton = page.getByRole('button', { name: 'ลงชื่อเข้าใช้' });

        // Social Login
        this.googleButton = page.getByRole('button', { name: 'ดำเนินการต่อด้วย Google' });
        this.facebookButton = page.getByRole('button', { name: 'ดำเนินการต่อด้วย Facebook' });

        // Links
        this.createAccountLink = page.getByRole('link', { name: 'สร้างบัญชีใหม่' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'คลิกที่นี่' });
    }

    /**
     * Navigate to the login page
     */
    async goto() {
        await this.navigate(this.url);
        await this.waitForPageLoad();
    }

    /**
     * Perform login
     */
    async login(email: string, pass: string) {
        try {
            await this.emailInput.fill(email, { timeout: 5000 });
        } catch (e) {
            console.log('Login fill failed, checking for Session Timeout...');
            const handled = await this.handleSessionTimeout();
            if (handled) {
                console.log('Session Timeout handled, retrying login...');
                await this.emailInput.fill(email);
            } else {
                throw e; // Rethrow if not a session timeout
            }
        }
        await this.passwordInput.fill(pass);
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
    }
}
