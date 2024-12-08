import { test, expect } from '@playwright/test';

test('help command shows avaible commands', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://marko-avram-terminal-portfolio.vercel.app/');

  // Input
  const commandInput = page.getByRole('textbox', { name: /welcome@marko-avram-terminal-/i });
  
  // Type and submit command
  await commandInput.click();
  await commandInput.fill('help');
  await commandInput.press('Enter');
  
  // Response with assertions
  await expect(page.getByText('Welcome! Here are all the', { exact: false }))
    .toBeVisible({ timeout: 5000 });
});