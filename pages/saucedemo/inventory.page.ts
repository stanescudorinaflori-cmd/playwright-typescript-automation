import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login() {
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="login-button"]').click();

    await expect(this.page).toHaveURL(/inventory/);
  }

  async getAllProducts() {
    const count = await this.products.count();
    const items = [];

    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);

      const name = await product.locator('.inventory_item_name').innerText();
      const priceText = await product.locator('.inventory_item_price').innerText();
      const price = Number(priceText.replace('$', ''));

      items.push({ name, price });
    }

    return items;
  }
}