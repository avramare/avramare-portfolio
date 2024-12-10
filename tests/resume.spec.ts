import { test, expect } from '@playwright/test';

test('resume command opens GitHub repository', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://marko-avram-terminal-portfolio.vercel.app/');

  // Input
  const commandInput = page.getByRole('textbox', { name: /welcome@marko-avram-terminal-/i });
  
  // Type and submit command
  await commandInput.click();
  await commandInput.fill('resume');
  await commandInput.press('Enter');
  
  // Response with assertions
  await expect(page.getByText('Opening resume...', { exact: false }))
    .toBeVisible({ timeout: 5000 });
});