import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const seed = JSON.parse(readFileSync(new URL('../.seed.json', import.meta.url), 'utf8')) as {
  draftPresentationId: number;
  presentationId: number;
  presentationName: string;
  callName: string;
};
const { draftPresentationId, presentationId, presentationName, callName } = seed;

test('opening a draft auto-parses so step review shows without a manual click', async ({ page }) => {
  await page.goto(`/sequences/${draftPresentationId}/edit`);

  // Parse-on-load: the step-review section and at least one call step row appear
  // without the user clicking Parse.
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
  await expect(page.locator('[data-unresolved]').first()).toBeVisible();
});

test('splitting a line in the editor produces separate steps', async ({ page }) => {
  await page.goto(`/sequences/${draftPresentationId}/edit`);
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();

  const rows = page.locator('[data-unresolved]');
  const before = await rows.count();

  await rows.first().getByRole('button', { name: 'Split line' }).click();
  await page.getByRole('textbox', { name: 'Split into calls' }).fill('first call\nsecond call');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();

  await expect(page.locator('[data-unresolved]')).toHaveCount(before + 1);
});

test('parse-on-load fills the title and activator from the source text', async ({ page }) => {
  await page.goto(`/sequences/${draftPresentationId}/edit`);
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('E2E Draft Title');
  await expect(page.getByRole('combobox', { name: 'Activator' })).toHaveValue('heads');
});

test('removing a step drops it from the review', async ({ page }) => {
  await page.goto(`/sequences/${draftPresentationId}/edit`);
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
  const rows = page.locator('[data-unresolved]');
  const before = await rows.count();
  await rows.first().getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('[data-unresolved]')).toHaveCount(before - 1);
});

test('un-split merges a step into the previous one', async ({ page }) => {
  await page.goto(`/sequences/${draftPresentationId}/edit`);
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
  const rows = page.locator('[data-unresolved]');
  const before = await rows.count();
  await rows.nth(1).getByRole('button', { name: 'Un-split' }).click();
  await expect(page.locator('[data-unresolved]')).toHaveCount(before - 1);
});

test('opening a linked sequence hydrates it with calls locked', async ({ page }) => {
  await page.goto(`/sequences/${presentationId}/edit`);

  // Hydrated from the saved presentation: step review + the saved call + metadata.
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
  await expect(page.getByText(callName, { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue(presentationName);

  // Linked → choreography locked: no call resolver, no "change" button, and the raw
  // paste box is hidden (you don't re-parse a linked sequence).
  await expect(page.getByPlaceholder('Search calls…')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'change' })).toHaveCount(0);
  await expect(page.getByLabel('Calling text')).toHaveCount(0);

  // A locked editor still offers Save as copy (revision).
  await expect(page.getByRole('button', { name: 'Save as copy' })).toBeVisible();
});
