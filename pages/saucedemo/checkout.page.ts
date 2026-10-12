import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async verifyProductsInCart(
    expectedProducts: { name: string; price: number }[],
  ): Promise<void> {
    const cartItems = this.page.locator('.cart_item');
    await expect(cartItems).toHaveCount(expectedProducts.length);

    for (const product of expectedProducts) {
      const item = cartItems.filter({
        has: this.page.locator('.inventory_item_name', {
          hasText: product.name,
        }),
      });

      await expect(item).toHaveCount(1);
      await expect(item.locator('.inventory_item_price')).toHaveText(
        `$${product.price.toFixed(2)}`,
      );
    }
  }

  async startCheckout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async fillCustomerInformation(): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill('Test');
    await this.page.locator('[data-test="lastName"]').fill('User');
    await this.page.locator('[data-test="postalCode"]').fill('12345');
    await this.page.locator('[data-test="continue"]').click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async verifySubtotal(expectedSubtotal: number): Promise<void> {
    await expect(this.page.locator('.summary_subtotal_label')).toHaveText(
      `Item total: $${expectedSubtotal.toFixed(2)}`,
    );
  }

  async finishOrder(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
    await expect(this.page.locator('.complete-header')).toHaveText(
      'Thank you for your order!',
    );
  }

  async backHome(): Promise<void> {
    await this.page.locator('[data-test="back-to-products"]').click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
