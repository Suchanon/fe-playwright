import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object Model for the Login/Sign-In page.
 * Maps to: /sign-in route in moz-client-hub
 */
export class LoginPage extends BasePage {
    // Page URL
    readonly url = '/sign-in';

    // Locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly googleLoginButton: Locator;
    readonly facebookLoginButton: Locator;
    readonly createAccountLink: Locator;
    readonly forgotPasswordLink: Locator;
    readonly logo: Locator;

    constructor(page: Page) {
        super(page);

        // Input fields - using name attribute based on SignIn.tsx
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');

        // Login button - the submit button
        this.loginButton = page.locator('button').filter({ hasText: /เข้าสู่ระบบ|Login|Sign in/i });

        // Social login buttons
        this.googleLoginButton = page.locator('button').filter({ hasText: /Google/i });
        this.facebookLoginButton = page.locator('button').filter({ hasText: /Facebook/i });

        // Links
        this.createAccountLink = page.locator('a[href="/create-account"]');
        this.forgotPasswordLink = page.locator('a[href="/forgot-password"]');

        // Logo
        this.logo = page.locator('img[src="/images/logo.svg"]');
    }

    /**
     * Navigate to the login page
     */
    async goto() {
        await this.navigate(this.url);
        await this.waitForPageLoad();
    }

    /**
     * Fill the email input field
     */
    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    /**
     * Fill the password input field
     */
    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await this.loginButton.click();
    }

    /**
     * Perform complete login flow
     */
    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Check if login button is disabled
     */
    async isLoginButtonDisabled(): Promise<boolean> {
        return await this.loginButton.isDisabled();
    }

    /**
     * Get error message text (if displayed)
     */
    async getErrorMessage(): Promise<string | null> {
        // Error text is shown below password input based on SignIn.tsx
        const errorElement = this.page.locator('[class*="error"]').first();
        if (await errorElement.isVisible()) {
            return await errorElement.textContent();
        }
        return null;
    }

    /**
     * Check if the login page is displayed
     */
    async isDisplayed(): Promise<boolean> {
        return await this.emailInput.isVisible();
    }

    /**
     * Click the forgot password link
     */
    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    /**
     * Click the create account link
     */
    async clickCreateAccount() {
        await this.createAccountLink.click();
    }

    /**
     * Wait for the login page to be fully loaded
     */
    async waitForReady() {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.loginButton.waitFor({ state: 'visible' });
    }
}
