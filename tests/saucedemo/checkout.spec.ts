import { test, expect } from '../../fixtures/test-fixtures';

test('cumpără cele mai scumpe trei produse', async ({ page, inventoryPage, checkoutPage, }) => { await inventoryPage.open(); await inventoryPage.login();

const products = await inventoryPage.getAllProducts(); console.log('Produse disponibile:', products);

const mostExpensive = [...products] .sort((a, b) => b.price - a.price) .slice(0, 3);

console.log('Cele mai scumpe trei produse:', mostExpensive);

for (const product of mostExpensive) { const item = page.locator('.inventory_item').filter({ has: page.locator('.inventory_item_name', { hasText: product.name, }), });

await item.locator('button').click(); }

await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

await checkoutPage.openCart(); await checkoutPage.verifyProductsInCart(mostExpensive);

const expectedSubtotal = mostExpensive.reduce( (total, product) => total + product.price, 0, );

await checkoutPage.startCheckout(); await checkoutPage.fillCustomerInformation(); await checkoutPage.verifySubtotal(expectedSubtotal); await checkoutPage.finishOrder(); await checkoutPage.backHome();

await expect(page.locator('.title')).toHaveText('Products'); });