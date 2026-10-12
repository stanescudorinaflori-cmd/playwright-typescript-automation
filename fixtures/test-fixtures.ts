import { test as base, expect } from '@playwright/test'; import { InventoryPage } from '../pages/saucedemo/inventory.page'; import { CheckoutPage } from '../pages/saucedemo/checkout.page';

type TestFixtures = { inventoryPage: InventoryPage; checkoutPage: CheckoutPage; };

export const test = base.extend<TestFixtures>({ inventoryPage: async ({ page }, use) => { const inventoryPage = new InventoryPage(page);

await use(inventoryPage); },

checkoutPage: async ({ page }, use) => { const checkoutPage = new CheckoutPage(page);

await use(checkoutPage); }, });

export { expect };