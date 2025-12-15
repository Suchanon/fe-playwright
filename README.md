# FE Playwright E2E Testing

> **Last Updated:** 2025-12-15 | **Maintained By:** Suchanon

A self-contained Playwright E2E testing project for frontend testing, featuring a mock Next.js login app.

## Project Structure

```
fe-playwright/
├── package.json              # Playwright dependencies
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript config
├── .env.example              # Environment template
├── README.md                 # This file
│
├── mock-app/                 # Mock Next.js frontend app
│   ├── package.json
│   ├── src/app/
│   │   ├── sign-in/page.tsx      # Login page
│   │   ├── dashboard/page.tsx    # Dashboard (post-login)
│   │   ├── create-account/page.tsx
│   │   └── forgot-password/page.tsx
│   └── ...
│
└── src/
    ├── pages/                # Page Object Model (POM)
    │   ├── base.page.ts
    │   ├── login.page.ts
    │   └── dashboard.page.ts
    └── e2e/                  # Test specs
        └── login.e2e-spec.ts
```

## Quick Start

### 1. Install Dependencies

```bash
# Install Playwright dependencies
npm install

# Install mock app dependencies
cd mock-app && npm install && cd ..

# Install Playwright browsers
npx playwright install chromium
```

### 2. Run Tests

```bash
# Run all tests (auto-starts mock app)
npm test

# Run with visible browser
npm run test:headed

# Run with Playwright UI
npm run test:ui

# Debug mode
npm run test:debug
```

### 3. View Report

```bash
npm run report
```

## Mock App Credentials

The mock login app accepts these credentials:

| Email | Password |
|-------|----------|
| `test@example.com` | `testpassword123` |

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Open Playwright UI |
| `npm run test:debug` | Run in debug mode |
| `npm run report` | View HTML report |

## Running Mock App Separately

```bash
# Start mock app manually
cd mock-app
npm run dev

# App runs at http://localhost:3000
```

## Test Cases

The login flow tests cover:

- ✅ Login page renders correctly
- ✅ Login button disabled when fields empty
- ✅ Login button enabled when fields filled
- ✅ Error message on invalid credentials
- ✅ Navigation to forgot password page
- ✅ Navigation to create account page
- ✅ Successful login redirects to dashboard

## EZez.lol Live Tests (Real Environment)

We have added E2E tests that run against the live `https://ezez.lol` environment.

### ⚠️ Important Warning
**The Create Account test creates REAL accounts in the production system.**
- It generates a unique email every time: `feplaywirghttesting<timestamp>@comfythings.com`.
- This ensures tests pass reliably but will accumulate test users in the database.

### Running Live Tests

```bash
# Run Create Account Test
npx playwright test src/e2e/ezez-create-account.e2e-spec.ts --project=chromium --headed

# Run Onboarding Test
npx playwright test src/e2e/ezez-onboarding.e2e-spec.ts --project=chromium --headed

# Run Both
npx playwright test src/e2e/ezez-*.e2e-spec.ts --project=chromium --headed
```

### Test Reports
Visual test reports with screenshots are generated after runs.
- **Location**: `test-reports/`
- **Main Report**: [ezez-create-account-onboarding-report.md](test-reports/ezez-create-account-onboarding-report.md)
- **Screenshots**: `test-reports/screenshots/`

## Extending Tests

### Add New Page Object

1. Create new file in `src/pages/`
2. Extend `BasePage` class
3. Export from `src/pages/index.ts`

### Add New Test

1. Create new `.e2e-spec.ts` file in `src/e2e/`
2. Import page objects
3. Write tests using Playwright assertions

## Learn More

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
