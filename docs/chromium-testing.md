# Chromium browser testing

CyberHire AI already includes `@playwright/test` as a development dependency. This configuration uses its Chromium project to test the existing Next.js application; it does not add a second browser automation stack.

## Coverage

- Home-route response and document rendering.
- Mobile, tablet, and desktop horizontal-overflow checks.
- Uncaught JavaScript exception detection during initial page load.

## Run locally

```bash
npm install
npx playwright install chromium
npm run e2e
```

Set `CYBERHIRE_BASE_URL` to use a different local application URL. The Playwright web server starts the Next.js development server automatically when one is not already running.

The GitHub Actions workflow `.github/workflows/chromium.yml` runs these checks on pull requests, pushes to `main`, and manual dispatch. These are browser smoke tests, not a penetration test, accessibility certification, or complete verification of authenticated job-search and resume workflows.