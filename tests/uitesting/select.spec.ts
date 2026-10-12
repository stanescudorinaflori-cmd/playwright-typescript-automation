import { test, expect } from '@playwright/test';

test('selectează valorile cerute în UI Testing Playground', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/select');

  const selects = page.locator('select');

  // Selectăm valorile cerute în cele cinci controale.
  await selects.nth(0).selectOption({ label: 'JavaScript' });
 const citySelect = page.locator('#selectCity');

const cityValue = await citySelect.locator('option').evaluateAll(
  (options) => {
    const city = options.find(
      (option) =>
        option.textContent?.replace(/\u00A0/g, ' ').trim() === 'New York'
    );

    return city instanceof HTMLOptionElement ? city.value : undefined;
  }
);

expect(cityValue).toBeDefined();
await citySelect.selectOption(cityValue!);
  await selects.nth(2).selectOption({ label: 'Release 3.0 Beta' });
  await selects.nth(3).selectOption({ label: 'Purple' });
  await selects.nth(4).selectOption({ label: 'Date' });

  // Verificăm rezultatul afișat în pagină.
  await expect(page.locator('body')).toContainText(
    'selectLanguage: JavaScript'
  );
  await expect(page.locator('body')).toContainText(
    'selectCity: New York'
  );
  await expect(page.locator('body')).toContainText(
    'selectProduct: Release 3.0 Beta'
  );
  await expect(page.locator('body')).toContainText(
    'selectColors: Purple'
  );
  await expect(page.locator('body')).toContainText(
    'selectFruits: Date'
  );

  console.log(
    'selectLanguage: JavaScript | selectCity: New York | ' +
    'selectProduct: Release 3.0 Beta | selectColors: Purple | ' +
    'selectFruits: Date'
  );
});