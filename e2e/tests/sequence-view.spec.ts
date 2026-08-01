import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const seed = JSON.parse(readFileSync(new URL('../.seed.json', import.meta.url), 'utf8')) as {
  callName: string;
  presentationId: number;
  presentationName: string;
};
const { callName, presentationId, presentationName } = seed;

test('view page shows cueing text on the left and choreo on the right', async ({ page }) => {
  await page.goto(`/sequences/${presentationId}`);
  await expect(page.getByRole('heading', { name: presentationName })).toBeVisible();

  // The activator text item ('Heads') renders in the cueing (left) column.
  await expect(page.locator('[data-col="text"]').filter({ hasText: 'Heads' })).toBeVisible();

  // Within the module_ref step row, the cueing text sits left of the call name.
  const textCell = page.locator('[data-col="text"]').filter({ hasText: 'Easy' }).first();
  const choreoCell = page.locator('[data-col="choreo"]').filter({ hasText: callName }).first();
  await expect(textCell).toBeVisible();
  await expect(choreoCell).toBeVisible();

  const textBox = await textCell.boundingBox();
  const choreoBox = await choreoCell.boundingBox();
  expect(textBox).not.toBeNull();
  expect(choreoBox).not.toBeNull();
  expect(textBox!.x).toBeLessThan(choreoBox!.x); // text column is left of choreo column
});

test('sequences list links to the view page', async ({ page }) => {
  await page.goto('/sequences');
  const link = page.locator(`a[href="/sequences/${presentationId}"]`).first();
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(new RegExp(`/sequences/${presentationId}$`));
  await expect(page.getByRole('heading', { name: presentationName })).toBeVisible();
});
