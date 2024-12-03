import { test, expect } from '@playwright/test';

test('Portfolio homepage should load', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("Marko Avram | Portfolio");
});
