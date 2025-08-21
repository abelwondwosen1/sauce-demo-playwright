# Playwright E2E Test Suite — Sauce Demo

## 📌 Overview
This project is a Playwright end-to-end (E2E) test suite for the [Sauce Labs demo store](https://www.saucedemo.com).  
It validates **core user journeys** (login, sorting, purchase flow) and includes **advanced scenarios** for problematic and slow user accounts.  

The goal is to demonstrate a **scalable, maintainable, and reliable** test architecture that can support a team for the next 5+ years.  

---

## 🚀 Setup Instructions
### 1. Clone the repository
```bash
git clone https://github.com/<abelwondwosen1>/sauce-demo-playwright.git
cd sauce-demo-playwright
2. Install dependencies
npm install

3. Run Playwright tests
npx playwright test

4. Open the Playwright report
npx playwright show-report

🏗 Project Architecture

The project is structured for long-term maintainability using the Page Object Model (POM), fixtures, and utilities.
├── pages/               # Page Objects (POM)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
│
├── fixtures/            # Shared test states
│   ├── auth.ts          # loginAs fixture
│   └── baseline.ts      # image baseline fixture
│
├── utils/               # Reusable helpers
│   ├── hash.ts          # SHA256 hashing for images
│   ├── selectors.ts     # Centralized selectors
│   └── priceCalculator.ts # Price calculation logic
│
├── tests/               # Test specs
│   ├── auth.spec.ts
│   ├── sorting.spec.ts
│   ├── purchase.spec.ts
│   ├── problem-user.spec.ts
│   └── perf-glitch-user.spec.ts
│
├── playwright.config.ts # Playwright configuration
├── package.json
└── tsconfig.json
✅ Test Scenarios
Part 1 — Foundational Scenarios

Authentication

Standard user logs in successfully

Locked-out user shows correct error

Wrong password shows error

Inventory & Sorting

Sort by Price (low → high)

Sort by Price (high → low)

Full Purchase Flow

Login → Add items → Checkout → Finish order

Validate that Item Total + Tax = Displayed Total

Part 2 — Advanced Scenarios

Problem User

Detects wrong product images using hashing vs baseline

Visual snapshot fallback for UI regressions

Performance Glitch User

Handles slow UI with expect.poll and state-based waits

No brittle page.waitForTimeout()

🎯 Strategic Decisions

Page Object Model (POM): Keeps page locators and actions separate from test logic.

Fixtures: Reusable test states (loginAs, baseline) reduce duplication.

Utils: Centralized helpers like hashing and price calculation keep code clean.

Data-test selectors only: Ensures stability against UI changes.

Robust waits: Used expect.poll and locator assertions instead of fixed sleeps.

Image validation: Deterministic SHA256 hash comparison plus visual fallback.

Price validation: Independent calculation ensures accurate totals.

🔑 Demo Credentials

Available on the login page:

standard_user / secret_sauce

locked_out_user / secret_sauce

problem_user / secret_sauce

performance_glitch_user / secret_sauce