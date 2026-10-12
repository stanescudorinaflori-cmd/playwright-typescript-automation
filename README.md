Playwright TypeScript Automation

Automated UI testing project built with Playwright and TypeScript for Sauce Demo and UI Testing Playground.

The project covers e-commerce workflows and common UI interactions, including dynamic product selection, sorting, scrolling, file uploads, dropdown controls, and iframe interactions.

Table of Contents
Project Overview
Applications Under Test
Technologies
Test Scenarios
Prerequisites
Installation
Running Tests
Test Reports
Project Structure
Design Principles
Continuous Integration
Repository
Project Overview

The goal of this project is to automate six UI testing scenarios using Playwright and TypeScript.

The tests focus on validating user workflows, interacting with web elements, verifying application behavior, and checking expected results.

The project is designed with maintainability and code reusability in mind.

Applications Under Test
Sauce Demo

Website: https://www.saucedemo.com/

Scenarios covered:

Checkout with the three most expensive products.
Product sorting by price in ascending and descending order.
UI Testing Playground

Website: https://uitestingplayground.com/

Scenarios covered:

Clicking buttons after scrolling.
Uploading multiple files.
Selecting values from different controls.
Interacting with buttons inside frames.
Technologies
Playwright Test — browser automation and test execution.
TypeScript — programming language used for test implementation.
Node.js and npm — runtime and dependency management.
Git and GitHub — version control and source code hosting.
GitHub Actions — continuous integration workflow.
Test Scenarios
Scenario 1: Checkout with the Three Most Expensive Products

The test automates the checkout process on Sauce Demo.

Steps:

Log in to the application.
Retrieve the available products and their prices dynamically.
Identify the three most expensive products without hardcoding their names or prices.
Add the selected products to the shopping cart.
Verify the products and their prices in the cart.
Proceed to checkout and validate the item subtotal.
Complete the order and verify the success message: Thank you for your order!.
Click Back Home to return to the inventory page.
Scenario 2: Product Sorting

The test validates product sorting by price.

Steps:

Log in to Sauce Demo.
Sort products by price in ascending order.
Verify that the displayed prices are in ascending order.
Sort products by price in descending order.
Verify that the displayed prices are in descending order.
Scenario 3: Scroll To Click

Website: https://uitestingplayground.com/scrolltoclick

Steps:

Open the Scroll To Click page.
Scroll to the required elements when necessary.
Click all four available buttons.
Verify the message: Buttons clicked: 4 / 4.
Scenario 4: File Upload

Website: https://uitestingplayground.com/upload

Steps:

Open the Upload page.
Upload two files.
Verify the message: 2 file(s) selected.
Scenario 5: Select Controls

Website: https://uitestingplayground.com/select

Steps:

Select the required language, city, product, color, and fruit.
Verify the displayed result against the expected values:

selectLanguage: JavaScript | selectCity: New York | selectProduct: Release 3.0 Beta | selectColors: Purple | selectFruits: Date

Scenario 6: Frames

Website: https://uitestingplayground.com/frames

Steps:

Access each available frame containing the required button.
Click the button inside each frame.
Verify the text displayed in the Button Pressed area after each click.
Prerequisites

Before running the tests, install:

Node.js — an LTS version is recommended.
npm — included with Node.js.
Git.
Installation
1. Clone the repository
git clone https://github.com/stanescudorinaflori-cmd/playwright-typescript-automation.git

2. Open the project directory
cd playwright-typescript-automation

3. Install dependencies
npm install

4. Install Playwright browsers
npx playwright install


On Linux environments that require additional browser dependencies, use:

npx playwright install --with-deps

Running Tests

Run all automated tests:

npm test


Run tests using Chromium:

npm run test:chromium


Run Sauce Demo tests:

npm run test:saucedemo


Run UI Testing Playground tests:

npm run test:uitesting


Run tests with the browser visible:

npx playwright test --headed


Run tests in debug mode:

npx playwright test --debug

Test Reports

Playwright can generate an HTML report after test execution.

Open the report:

npm run report


If the report is unavailable, run the tests first and check the Playwright reporter configuration.

Project Structure

The project is organized to separate test scenarios, page objects, configuration, and automation workflows.

playwright-typescript-automation/
├── .github/
│   └── workflows/
├── pages/
│   └── saucedemo/
├── tests/
│   ├── saucedemo/
│   └── uitesting/
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md


The structure above illustrates the main project areas. Additional files and folders may be present depending on the implementation.

pages/ — page objects and reusable page interactions.
tests/ — automated test scenarios.
.github/workflows/ — GitHub Actions configuration.
playwright.config.ts — Playwright test configuration.
package.json — project metadata, dependencies, and npm scripts.
package-lock.json — records the resolved npm dependency versions.
README.md — project documentation.
Design Principles
Page Object Model (POM)

The Page Object Model separates page-specific locators and interactions from test scenarios. This helps improve readability, maintainability, and reuse.

DRY (Don't Repeat Yourself)

Common functionality should be implemented once and reused wherever possible to reduce duplicated code.

Test Fixtures

Fixtures can provide reusable test setup and shared objects, such as page objects or authenticated sessions, where appropriate.

Continuous Integration

The repository includes a GitHub Actions workflow intended to support automated test execution.

To review workflow results:

Open the GitHub repository.
Select the Actions tab.
Open the latest workflow run.
Review the job status and test output.

Repository: https://github.com/stanescudorinaflori-cmd/playwright-typescript-automation

Repository

The source code is available on GitHub:

playwright-typescript-automation

Author

Dorina Stănescu