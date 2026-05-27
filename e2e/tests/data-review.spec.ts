import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const seed = JSON.parse(readFileSync(new URL('../.seed.json', import.meta.url), 'utf8')) as {
  callId: number;
  callName: string;
  startName: string;
  seqName: string;
};
const { callName, startName, seqName } = seed;

test('menu lists reviewable tables and links to Calls', async ({ page }) => {
  await page.goto('/data');
  await expect(page.getByRole('heading', { name: 'Data Review' })).toBeVisible();
  await page.locator('a[href="/data/calls"]').click(); // the menu card (sidebar "Calls" points elsewhere)
  await expect(page).toHaveURL(/\/data\/calls$/);
  await expect(page.getByRole('heading', { name: 'Calls' })).toBeVisible();
});

test('search filters rows', async ({ page }) => {
  await page.goto('/data/calls');
  const rowsBefore = await page.locator('tbody tr').count();
  await page.locator('input[type="search"]').fill(callName);
  await expect(page.getByRole('row', { name: callName })).toBeVisible();
  const rowsAfter = await page.locator('tbody tr').count();
  expect(rowsAfter).toBeLessThan(rowsBefore);
});

test('clicking a sortable header reorders rows', async ({ page }) => {
  await page.goto('/data/calls');
  const nameCell = page.locator('tbody tr').first().locator('td').nth(2);
  const ascFirst = await nameCell.innerText();
  await page.locator('thead th', { hasText: 'Name' }).first().click(); // default is asc → toggles to desc
  await expect(nameCell).not.toHaveText(ascFirst);
});

test('accordion expands a call to show its FASR child table', async ({ page }) => {
  await page.goto('/data/calls');
  const row = page.getByRole('row', { name: callName });
  await row.getByRole('button', { name: 'Expand row' }).click();
  await expect(page.getByText(startName, { exact: false }).first()).toBeVisible();
});

test('FK cross-link navigates and highlights the target row', async ({ page }) => {
  await page.goto('/data/call-formations');
  await page.getByRole('link', { name: callName }).first().click();
  await expect(page).toHaveURL(/\/data\/calls\?focus=\d+&on=callId/);
  await expect(page.locator('tr.bg-yellow-100')).toHaveCount(1);
});

test('drill-in link navigates to teach orders and back returns to programs', async ({ page }) => {
  await page.goto('/data/programs');
  // Only programs with teach orders show the link (gated); click the first one that does.
  await page.getByRole('link', { name: 'Drill in' }).first().click();
  await expect(page).toHaveURL(/\/data\/programs\/\d+\/teach-orders/);
  await page.goBack();
  await expect(page).toHaveURL(/\/data\/programs$/);
});

test('teach orders table drills into its entries', async ({ page }) => {
  await page.goto('/data/teach-orders');
  await expect(page.getByRole('heading', { name: 'Teach Orders' })).toBeVisible();
  await page.getByRole('link', { name: 'Drill in' }).first().click();
  await expect(page).toHaveURL(/\/data\/teach-orders\/\d+\/entries/);
  await expect(page.locator('tbody tr').first()).toBeVisible();
});

test('modal opens with the sequence step list and closes', async ({ page }) => {
  await page.goto('/data/sequences');
  const row = page.getByRole('row', { name: seqName });
  await row.getByRole('button', { name: 'Expand row' }).click();
  await expect(page.getByText('Heads')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByText('Heads')).toHaveCount(0);
});
