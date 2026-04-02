# Workday Playwright Scenarios

## Login smoke test

1. Export credentials (recommended to avoid hardcoding):
   ```powershell
   setx WORKDAY_URL "https://impl.workday.com/wday/authgwy/onetp4/login.htmld?redirect=n"
   setx WORKDAY_USERNAME "Testinguser"
   setx WORKDAY_PASSWORD "Workday@123"
   ```
   Restart the terminal to pick up `setx` changes. Alternatively, use `set WORKDAY_USERNAME=...` for the current session.
2. Run the dedicated spec:
   ```bash
   npx playwright test --config=Workday/playwright.workday.config.ts --project=chromium --headed
   ```
3. If selectors differ for your tenant’s branding, adjust the locators in `Workday/tests/workday-login.spec.ts` accordingly.

## Smoke suite

- Location: `Workday/tests/smoke/homepage-smoke.spec.ts`
- Execute the full smoke pack (login + dashboard checks):
   ```bash
   npx playwright test --config=Workday/playwright.workday.config.ts --project=chromium --headed
   ```
- The smoke tests reuse the login flow and assert that key dashboard cards and quick actions render after authentication.

### Smoke-only runner

If you want to run just the smoke subset without the standalone login spec, point Playwright at the smoke config:

```bash
npx playwright test --config=Workday/playwright.workday.smoke.config.ts --project=chromium --headed
```

> The suite falls back to the sample credentials above, but storing secrets in environment variables is safer for CI/CD.
