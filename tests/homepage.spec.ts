import { test, expect } from '@playwright/test';

test('homepage should load', async ({ page }) => {

  //loading the page
  await page.goto('https://marko-avram-terminal-portfolio.vercel.app/');

  //loading homepage element and first response
  await page.getByText('welcome').first().click();
  await page.getByText('@').first().click();
  await page.getByText('marko-avram-terminal-portfolio').first().click();
  await page.getByText(':$ ~').first().click();
  await page.locator('.flex-grow').first().click();
  //banner
  await page.getByRole('paragraph').click();
  await page.getByRole('img').click();
  await page.getByText('███╗ ███╗ █████╗ ██████╗ ██╗ ██╗ ██████╗ █████╗ ██╗ ██╗██████╗ █████╗ ███╗ ███╗ ').click();
  await page.getByRole('paragraph').click();

  //loading the command line
  await page.locator('label').getByText('welcome').click();
  await page.locator('label').getByText('@').click();
  await page.locator('label').getByText('marko-avram-terminal-portfolio').click();
  await page.locator('label').getByText(':$ ~').click();
  await page.getByLabel('welcome@marko-avram-terminal-').click();

});