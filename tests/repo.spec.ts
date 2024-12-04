import { test, expect } from '@playwright/test';

test('repo cmd test and link opening', async ({ page }) => {
  
  //loading the page
  await page.goto('/');

  //locating the command line
  await page.locator('label').getByText('welcome').click();
  await page.locator('label').getByText('@').click();
  await page.locator('label').getByText('marko-avram-terminal-portfolio').click();
  await page.locator('label').getByText(':$ ~').click();

  //passing resume cmd
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').fill('repo');
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').press('Enter');
  
  // repo command respond, link opened and response visible
  await expect(page.getByText('Opening Github repository...')).toBeVisible();
  
  
});