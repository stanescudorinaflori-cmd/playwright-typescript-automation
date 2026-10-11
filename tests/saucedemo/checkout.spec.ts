import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/saucedemo/inventory.page';

test('cumpără cele mai scumpe trei produse', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  // 1. Deschidem aplicația și ne autentificăm
  await inventoryPage.open();
  await inventoryPage.login();

  // 2. Extragem toate produsele și prețurile
  const products = await inventoryPage.getAllProducts();

  console.log('Produse disponibile:', products);

  // 3. Selectăm dinamic cele mai scumpe trei produse
  const mostExpensive = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  console.log('Cele mai scumpe trei produse:', mostExpensive);

  // 4. Adăugăm produsele în coș
  for (const product of mostExpensive) {
    const item = page.locator('.inventory_item').filter({
      has: page.locator('.inventory_item_name', {
        hasText: product.name,
      }),
    });

    await item.locator('button').click();
  }

  // 5. Verificăm numărul produselor din coș
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  // 6. Deschidem coșul și verificăm produsele și prețurile
  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item')).toHaveCount(3);

  let expectedSubtotal = 0;

  for (const product of mostExpensive) {
    const item = page.locator('.cart_item').filter({
      has: page.locator('.inventory_item_name', {
        hasText: product.name,
      }),
    });

    await expect(item).toHaveCount(1);
    await expect(item.locator('.inventory_item_price'))
      .toHaveText(`$${product.price.toFixed(2)}`);

    expectedSubtotal += product.price;
  }

  // 7. Continuăm către checkout
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('User');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  // 8. Verificăm subtotalul calculat de aplicație
  await expect(page.locator('.summary_subtotal_label'))
    .toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);

  // 9. Plasăm comanda
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');

  // 10. Revenim la inventar
  await page.locator('[data-test="back-to-products"]').click();

  await expect(page.locator('.title')).toHaveText('Products');
});