import { test, expect } from '../../fixtures/test-fixtures';

test('produsele se sortează corect după preț', async ({ page, inventoryPage }) => {
  // Deschidem aplicația și ne autentificăm
  await inventoryPage.open();
  await inventoryPage.login();

  // Selectăm meniul de sortare după preț crescător
  const sortDropdown = page.locator('[data-test="product-sort-container"]');

  await sortDropdown.selectOption('lohi');

  // Citim prețurile afișate
  const pricesAscending = await page.locator('.inventory_item_price').allInnerTexts();
  const ascendingNumbers = pricesAscending.map(price =>
    Number(price.replace('$', ''))
  );

  // Verificăm ordinea crescătoare
  expect(ascendingNumbers).toEqual(
    [...ascendingNumbers].sort((a, b) => a - b)
  );

  // Selectăm sortarea descrescătoare
  await sortDropdown.selectOption('hilo');

  // Citim din nou prețurile
  const pricesDescending = await page.locator('.inventory_item_price').allInnerTexts();
  const descendingNumbers = pricesDescending.map(price =>
    Number(price.replace('$', ''))
  );

  // Verificăm ordinea descrescătoare
  expect(descendingNumbers).toEqual(
    [...descendingNumbers].sort((a, b) => b - a)
  );
});