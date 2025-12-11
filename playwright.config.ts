import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    // Directory containing test files
    testDir: './src/e2e',

    // Match test files with this pattern
    testMatch: '**/*.e2e-spec.ts',

    // Run tests in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry failed tests on CI
    retries: process.env.CI ? 2 : 0,

    // Number of parallel workers
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        ['html', { open: 'never' }],
        ['list']
    ],

    // Shared settings for all projects
    use: {
        // Base URL for navigation - mock app runs on port 3000
        baseURL: 'http://localhost:3000',

        // Collect trace when retrying a failed test
        trace: 'on-first-retry',

        // Take screenshot on failure
        screenshot: 'only-on-failure',

        // Record video on failure
        video: 'on-first-retry',

        // Viewport size
        viewport: { width: 1280, height: 720 },

        // Timeout for each action
        actionTimeout: 10000,
    },

    // Timeout for each test
    timeout: 30000,

    // Configure projects for different browsers
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    // Auto-start mock Next.js app before running tests
    webServer: {
        command: 'npm run dev',
        cwd: './mock-app',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
