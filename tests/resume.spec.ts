import { test, expect } from '@playwright/test';

test('resume cmd test and link opening', async ({ page }) => {

  //loading the page
  await page.goto('https://marko-avram-terminal-portfolio.vercel.app/');

 //locating command line
  // await page.locator('label').getByText('welcome').click();
  // await page.locator('label').getByText('@').click();
  // await page.locator('label').getByText('marko-avram-terminal-portfolio').click();
  // await page.locator('label').getByText(':$ ~').click();

  //passing resume cmd
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').fill('resume');
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').press('Enter');

  //resume command response, link opened and content loaded
  await expect(page.getByText('Opening resume...')).toBeVisible();

});