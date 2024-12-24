import { test, expect } from "@playwright/test";
import { TerminalPage } from "./TerminalPage";

test.describe('Other commands that needs to be finished', async () => {    

    test('Secondary commands testing', async ({ page }) => {

        const terminalPageObj = new TerminalPage(page);
        await terminalPageObj.openApplication();

        // about
        await terminalPageObj.executeCommand('about');
        await expect(page.getByText('Hi, I am Marko Avram', { exact: false }))
            .toBeVisible({ timeout: 5000 });
        await terminalPageObj.clearTerminal();

        // banner
        await terminalPageObj.executeCommand('banner');
        await terminalPageObj.clearTerminal();

        // bing
        await terminalPageObj.executeCommand('bing');
        await terminalPageObj.clearTerminal();

        // cd 
        await terminalPageObj.executeCommand('cd');
        await terminalPageObj.clearTerminal();

        // date
        await terminalPageObj.executeCommand('date');
        await terminalPageObj.clearTerminal();

        // duckduckgo
        await terminalPageObj.executeCommand('duckduckgo');
        await terminalPageObj.clearTerminal();

        // echo
        await terminalPageObj.executeCommand('echo');
        await terminalPageObj.clearTerminal();

        // emacs
        await terminalPageObj.executeCommand('emacs');
        await terminalPageObj.clearTerminal();

        // email
        await terminalPageObj.executeCommand('email');
        await terminalPageObj.clearTerminal();

        // github
        await terminalPageObj.executeCommand('github');
        await terminalPageObj.clearTerminal();

        // google
        await terminalPageObj.executeCommand('google');
        await terminalPageObj.clearTerminal();

        // linkedin
        await terminalPageObj.executeCommand('linkedin');
        await terminalPageObj.clearTerminal();

        // morse
        await terminalPageObj.executeCommand('morse');
        await terminalPageObj.clearTerminal();

        // nvim
        await terminalPageObj.executeCommand('nvim');
        await terminalPageObj.clearTerminal();

        // projects
        await terminalPageObj.executeCommand('projects');
        await terminalPageObj.clearTerminal();

        // readme
        await terminalPageObj.executeCommand('readme');
        await terminalPageObj.clearTerminal();

        // reddit
        await terminalPageObj.executeCommand('reddit');
        await terminalPageObj.clearTerminal();

        // sudo
        await terminalPageObj.executeCommand('sudo');
        await terminalPageObj.clearTerminal();

        // vi
        await terminalPageObj.executeCommand('vi');
        await terminalPageObj.clearTerminal();

        // vim
        await terminalPageObj.executeCommand('vim');
        await terminalPageObj.clearTerminal();

        // weather
        await terminalPageObj.executeCommand('weather');
        await terminalPageObj.clearTerminal();

        // whoami
        await terminalPageObj.executeCommand('whoami');
        await terminalPageObj.clearTerminal();
    })

})