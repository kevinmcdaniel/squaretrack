import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const seed = JSON.parse(readFileSync(new URL('../.seed.json', import.meta.url), 'utf8')) as {
  draftPresentationId: number;
};
const { draftPresentationId } = seed;

test('opening a draft auto-parses so step review shows without a manual click', async ({ page }) => {
  await page.goto(`/sequences/import?presentationId=${draftPresentationId}`);

  // Parse-on-load: the step-review section and at least one call step row appear
  // without the user clicking Parse.
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
  await expect(page.locator('[data-unresolved]').first()).toBeVisible();
});
