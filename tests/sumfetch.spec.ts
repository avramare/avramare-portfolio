import { test, expect } from '@playwright/test';

test('sumfetch cmd test should display summary', async ({ page }) => {
  //loading the page
  await page.goto('/');

  //locating the command line
  await page.locator('label').getByText('welcome').click();
  await page.locator('label').getByText('@').click();
  await page.locator('label').getByText('marko-avram-terminal-portfolio').click();
  await page.locator('label').getByText(':$ ~').click();

  //passing sumfetch cmd
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').fill('sumfetch');
  await page.getByLabel('welcome@marko-avram-terminal-').click();
  await page.getByLabel('welcome@marko-avram-terminal-').press('Enter');

  //sumfetch cmd response, sumfetch displayed
  await page.getByText('@@@@@@@@@@@@@  sumfetch:').click();


});