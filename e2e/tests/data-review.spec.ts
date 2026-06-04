import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const seed = JSON.parse(readFileSync(new URL('../.seed.json', import.meta.url), 'utf8')) as {
  callId: number;
  callName: string;
  startName: string;
  seqName: string;
};
const { callId, callName, startName, seqName } = seed;

test('menu lists reviewable tables and links to Calls', async ({ page }) => {
  await page.goto('/reference');
  await expect(page.getByRole('heading', { name: 'Reference' })).toBeVisible();
  await page.locator('a[href="/reference/calls"]').click(); // the menu card (sidebar "Reference" points at the index)
  await expect(page).toHaveURL(/\/reference\/calls$/);
  await expect(page.getByRole('heading', { name: 'Calls' })).toBeVisible();
});

test('search filters rows', async ({ page }) => {
  await page.goto('/reference/calls');
  const rowsBefore = await page.locator('tbody tr').count();
  await page.locator('input[type="search"]').fill(callName);
  await expect(page.getByRole('row', { name: callName })).toBeVisible();
  const rowsAfter = await page.locator('tbody tr').count();
  expect(rowsAfter).toBeLessThan(rowsBefore);
});

test('clicking a sortable header reorders rows', async ({ page }) => {
  await page.goto('/reference/calls');
  const nameCell = page.locator('tbody tr').first().locator('td').nth(2);
  const ascFirst = await nameCell.innerText();
  await page.locator('thead th', { hasText: 'Name' }).first().click(); // default is asc → toggles to desc
  await expect(nameCell).not.toHaveText(ascFirst);
});

test('accordion expands a call to show its FASR child table', async ({ page }) => {
  await page.goto('/reference/calls');
  const row = page.getByRole('row', { name: callName });
  await row.getByRole('button', { name: 'Expand row' }).click();
  await expect(page.getByText(startName, { exact: false }).first()).toBeVisible();
});

test('FK cross-link navigates and highlights the target row', async ({ page }) => {
  await page.goto('/reference/call-formations');
  await page.getByRole('link', { name: callName }).first().click();
  await expect(page).toHaveURL(/\/reference\/calls\?focus=\d+&on=callId/);
  await expect(page.locator('tr.bg-yellow-100')).toHaveCount(1);
});

test('drill-in link navigates to teach orders and back returns to programs', async ({ page }) => {
  await page.goto('/reference/programs');
  // Only programs with teach orders show the link (gated); click the first one that does.
  await page.getByRole('link', { name: 'Drill in' }).first().click();
  await expect(page).toHaveURL(/\/reference\/programs\/\d+\/teach-orders/);
  await page.goBack();
  await expect(page).toHaveURL(/\/reference\/programs$/);
});

test('teach orders table drills into its entries', async ({ page }) => {
  await page.goto('/reference/teach-orders');
  await expect(page.getByRole('heading', { name: 'Teach Orders' })).toBeVisible();
  await page.getByRole('link', { name: 'Drill in' }).first().click();
  await expect(page).toHaveURL(/\/reference\/teach-orders\/\d+\/entries/);
  await expect(page.locator('tbody tr').first()).toBeVisible();
});

test('entries page shows a sticky parent header that expands to the field list', async ({ page }) => {
  await page.goto('/reference/teach-orders');
  await page.getByRole('link', { name: 'Drill in' }).first().click();
  await expect(page).toHaveURL(/\/reference\/teach-orders\/\d+\/entries/);

  const header = page.getByRole('button', { name: 'Toggle details' });
  await expect(header).toHaveAttribute('aria-expanded', 'false'); // collapsed by default
  await expect(page.locator('dl dt')).toHaveCount(0); // field list hidden while collapsed

  await header.click();
  await expect(header).toHaveAttribute('aria-expanded', 'true');
  // Expanded → labelled field list; Program/Name lead, plus the detail fields.
  const labels = page.locator('dl dt');
  await expect(labels.nth(0)).toHaveText('Program');
  await expect(labels.nth(1)).toHaveText('Name');
  const dl = page.locator('dl');
  await expect(dl.getByText('Source', { exact: true })).toBeVisible();
  await expect(dl.getByText('Calls', { exact: true })).toBeVisible();
  await expect(dl.getByText('Entries', { exact: true })).toBeVisible();

  // Collapse cycle: clicking again hides the field list.
  await header.click();
  await expect(header).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('dl dt')).toHaveCount(0);
});

test('namespaced ?focus= targets the matching table and ignores other tables', async ({ page }) => {
  // Addressed to this table → the legacy bare behavior, but via the `<tableId>:` form.
  await page.goto(`/reference/calls?focus=call:${callId}&on=call:callId`);
  await expect(page.locator('tr.bg-yellow-100')).toHaveCount(1);

  // Addressed to a different table → this table ignores it, nothing highlighted.
  await page.goto(`/reference/calls?focus=program:${callId}&on=program:programId`);
  await expect(page.locator('tr.bg-yellow-100')).toHaveCount(0);

  // A non-table prefix is part of the value, not a namespace → must NOT strip to the bare id.
  await page.goto(`/reference/calls?focus=notatable:${callId}&on=callId`);
  await expect(page.locator('tr.bg-yellow-100')).toHaveCount(0);
});

test('modal opens with the sequence step list and closes', async ({ page }) => {
  await page.goto('/reference/sequences');
  const row = page.getByRole('row', { name: seqName });
  await row.getByRole('button', { name: 'Expand row' }).click();
  await expect(page.getByText('Heads')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByText('Heads')).toHaveCount(0);
});
