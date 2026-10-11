import { test, expect } from '@playwright/test';

test('încarcă două fișiere în UI Testing Playground', async ({ page }) => { await page.goto('https://uitestingplayground.com/upload', { waitUntil: 'domcontentloaded', });

const uploadFrame = page.frameLocator('iframe'); const fileInput = uploadFrame.locator('input[type="file"]');

await fileInput.setInputFiles([ { name: 'fisier1.txt', mimeType: 'text/plain', buffer: Buffer.from('Primul fisier de test'), }, { name: 'fisier2.txt', mimeType: 'text/plain', buffer: Buffer.from('Al doilea fisier de test'), }, ]);

const fileCount = await fileInput.evaluate( (element: HTMLInputElement) => element.files?.length ?? 0 );

expect(fileCount).toBe(2);

console.log(`Număr de fișiere selectate: ${fileCount}`); });