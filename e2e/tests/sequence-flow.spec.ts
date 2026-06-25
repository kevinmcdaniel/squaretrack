import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const seed = JSON.parse(readFileSync(new URL('../.seed.json', import.meta.url), 'utf8')) as {
  draftPresentationId: number;
};
const { draftPresentationId } = seed;

test('import page is bulk-only — no single paste-and-resolve editor', async ({ page }) => {
  await page.goto('/sequences/import');
  await expect(page.getByRole('button', { name: 'Split & Preview' })).toBeVisible();
  // The single-sequence editor (MetaForm) must not be here anymore.
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveCount(0);
});

test('a draft links to its edit page and offers delete', async ({ page }) => {
  await page.goto('/sequences');
  const editLink = page.locator(`a[href="/sequences/${draftPresentationId}/edit"]`).first();
  await expect(editLink).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();

  await editLink.click();
  await expect(page).toHaveURL(new RegExp(`/sequences/${draftPresentationId}/edit$`));
  // Editor runs at the new route, parse-on-load intact.
  await expect(page.getByRole('heading', { name: 'Step review' })).toBeVisible();
});

test('a draft can be deleted from the list', async ({ page }) => {
  const name = `_e2e_del_${Date.now()}`;

  // Create a throwaway draft via the bulk-import flow (self-contained isolation).
  await page.goto('/sequences/import');
  await page.locator('textarea').fill(`[${name}]\nCircle Left\nAllemande Left`);
  await page.getByRole('button', { name: 'Split & Preview' }).click();
  await page.getByRole('button', { name: /Save \d+ as draft/ }).click();

  await page.goto('/sequences');
  const row = page.locator('li', { hasText: name });
  await expect(row).toBeVisible();

  page.on('dialog', (d) => d.accept()); // accept the confirm
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('li', { hasText: name })).toHaveCount(0);
});
