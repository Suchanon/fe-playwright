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
        await this.page.waitForLoadState('networkidle');
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
}
