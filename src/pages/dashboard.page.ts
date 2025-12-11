import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object Model for the Dashboard page.
 * Used to verify successful login by checking dashboard elements.
 * Maps to: /dashboard route in moz-client-hub
 */
export class DashboardPage extends BasePage {
    // Page URL
    readonly url = '/dashboard';

    // Locators for dashboard elements
    readonly sidebar: Locator;
    readonly header: Locator;
    readonly mainContent: Locator;

    constructor(page: Page) {
        super(page);

        // Common dashboard elements to verify login success
        // These selectors may need adjustment based on actual dashboard structure
        this.sidebar = page.locator('[class*="sidebar"], nav');
        this.header = page.locator('header, [class*="header"]');
        this.mainContent = page.locator('main, [class*="main"], [class*="content"]');
    }

    /**
     * Navigate to the dashboard page directly
     */
    async goto() {
        await this.navigate(this.url);
    }

    /**
     * Check if the dashboard is loaded (indicates successful login)
     */
    async isLoaded(): Promise<boolean> {
        const url = await this.getCurrentUrl();
        return url.includes('/dashboard');
    }

    /**
     * Wait for dashboard to be loaded after login
     */
    async waitForDashboard() {
        await this.waitForUrl(/\/dashboard/);
        await this.waitForPageLoad();
    }

    /**
     * Check if user is authenticated by verifying dashboard access
     */
    async isAuthenticated(): Promise<boolean> {
        try {
            await this.waitForUrl(/\/dashboard/,);
            return true;
        } catch {
            return false;
        }
    }
}
