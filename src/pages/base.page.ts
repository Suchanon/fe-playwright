import { Page } from '@playwright/test';

/**
 * Base page class that all page objects extend from.
 * Contains common methods and utilities for interacting with pages.
 */
export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific path relative to base URL
     */
    async navigate(path: string = '/') {
        await this.page.goto(path);
    }

    /**
     * Wait for the page to be fully loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Get the current page URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * Wait for navigation to a specific URL pattern
     */
    async waitForUrl(urlPattern: string | RegExp) {
        await this.page.waitForURL(urlPattern);
    }

    /**
     * Take a screenshot of the current page
     */
    async screenshot(name: string) {
        await this.page.screenshot({ path: `./test-results/${name}.png` });
    }

    /**
     * Wait for a specific amount of time (use sparingly)
     */
    async wait(ms: number) {
        await this.page.waitForTimeout(ms);
    }

    /**
     * Check for "Session Timeout" modal and handle it by clicking "Sign in".
     * Returns true if timeout was detected and handled.
     */
    async handleSessionTimeout(): Promise<boolean> {
        const modalHeader = this.page.getByText('หมดเวลาการใช้งาน'); // Session Timeout
        if (await modalHeader.isVisible({ timeout: 2000 })) { // Quick check
            console.log('Session Timeout Modal detected. Clicking "Sign In"...');
            await this.page.screenshot({ path: 'test-reports/screenshots/session-timeout.png' });

            // Click "Sign in" (ลงชื่อเข้าใช้) - try/catch to avoid strict action timeout
            try {
                await this.page.getByRole('button', { name: 'ลงชื่อเข้าใช้' }).click({ force: true, timeout: 5000 });
            } catch (e) {
                console.log('Session Timeout: Clicked Sign In (potentially timed out waiting for action to complete, continuing anyway).');
            }
            return true;
        }
        return false;
    }
}
