import { test, expect } from '@playwright/test';

test('apasă toate cele patru butoane după derulare', async ({ page }) => {
  await page.goto('https://uitestingplayground.com/scrolltoclick');

  // Butonul 1: derulare în pagină
  const button1 = page.locator('#scrollTarget1');
  await button1.scrollIntoViewIfNeeded();
  await button1.click();

  // Butonul 2: derulare în container
  const button2 = page.locator('#scrollTarget2');
  await button2.scrollIntoViewIfNeeded();
  await button2.click();

  // Butonul 3: derulare în containere imbricate
  const button3 = page.locator('#scrollTarget3');
  await button3.scrollIntoViewIfNeeded();
  await button3.click();

  // Butonul 4: apare la hover peste rândul părinte
  const button4 = page.locator('#scrollTarget4');
  await button4.scrollIntoViewIfNeeded();
  await button4.locator('..').hover();
  await expect(button4).toBeVisible();
  await button4.click();

  // Verificăm finalizarea provocării
  await expect(page.getByText('All buttons clicked!')).toBeVisible();
});