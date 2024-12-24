import { test, expect } from '@playwright/test';
import { TerminalPage } from './TerminalPage';
import { HomePage } from './HomePage';

test('Homepage loading', async ({ page }) => {

    const homePageObj = new HomePage(page);
    await homePageObj.openApplication();

    // banner and input filed
    await expect(homePageObj.usernamePs1).toContainText("welcome");
    await expect(homePageObj.hostnamePs1).toContainText("marko-avram-terminal-portfolio");
    await expect(homePageObj.homepageBanner).toBeVisible({ timeout: 10000 });
    await expect(homePageObj.bannerImg).toBeVisible({ timeout: 10000 });

})

test.describe('Testing command line arguments from homepage', async () => {

    test('Inputting commands and clearing terminal tests', async ({ page }) => {
    
            const terminalPageObj = new TerminalPage(page);
            await terminalPageObj.openApplication();
            
            // help 
            await terminalPageObj.executeCommand('help');
            await expect(page.getByText('Welcome! Here are all the', { exact: false }))
                .toBeVisible({ timeout: 5000 });
            await terminalPageObj.clearTerminal();
    
            // repo
            await terminalPageObj.executeCommand('repo');
            await expect(page.getByText('Opening Github repository...', { exact: false }))
                .toBeVisible({ timeout: 5000 });
            await terminalPageObj.clearTerminal();
    
            // resume
            await terminalPageObj.executeCommand('resume');
            await expect(page.getByText('Opening resume...', { exact: false }))
                .toBeVisible({ timeout: 5000 });
            await terminalPageObj.clearTerminal();
    
            // sumfetch
            await terminalPageObj.executeCommand('sumfetch');
            await expect(page.getByText('@@@@@@@@@@@@@  sumfetch:', { exact: false }))
                .toBeVisible({ timeout: 5000 });
            await terminalPageObj.clearTerminal();
        });

})