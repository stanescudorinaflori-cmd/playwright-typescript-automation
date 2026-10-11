import { test, expect } from '@playwright/test';

test('apasă butoanele din ambele frame-uri și verifică rezultatul', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/frames');

  const outerFrame = page.frameLocator('iframe').first();
  const innerFrame = outerFrame.frameLocator('iframe');

  const frames = [
    { name: 'Outer Frame', frame: outerFrame },
    { name: 'Inner Frame', frame: innerFrame },
  ];

  for (const { name, frame } of frames) {
    console.log(`Verificăm: ${name}`);

    // 1. Selectare după atributul data-action
    await frame.locator('[data-action="edit"]').click();
    console.log('Apăsat Edit');

    // 2. Selectare după text
    await frame.getByText('Submit', { exact: true }).click();
    console.log('Apăsat Submit');

    // 3. Selectare după atributul name
    await frame.locator('[name="my-button"]').click();
    console.log('Apăsat Click me');

    // 4. Selectare după clasă
    await frame.locator('.btn-class').click();
    console.log('Apăsat Primary');

    // Verificăm mesajul afișat după apăsarea butonului
    await expect(frame.locator('body')).toContainText(
      'Button pressed: Primary'
    );

    console.log(`${name}: mesajul a fost verificat cu succes.`);
  }
});