import { test, expect } from '@playwright/test';

test('help cmd should display all avaible commands', async ({ page }) => {
  //loading the page
  await page.goto('https://marko-avram-terminal-portfolio.vercel.app/');

  // //locating command line
  // await page.locator('label').getByText('welcome').click();
  // await page.locator('label').getByText('@').click();
  // await page.locator('label').getByText('marko-avram-terminal-portfolio').click();
  // await page.locator('label').getByText(':$ ~').click();

  //passing help command
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').fill('help');
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').press('Enter');

  //all avaible commmands will be desplayed
  await page.getByText('Welcome! Here are all the');

});