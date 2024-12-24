import { Page, Locator } from "@playwright/test";

export class TerminalPage {

    readonly page: Page;
    readonly inputCommand: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputCommand = page.locator("id=prompt");
    }

    async openApplication() {
        await this.page.goto('https://marko-avram-terminal-portfolio.vercel.app/');
    }

    async executeCommand(command: string) {
        await this.inputCommand.fill(command);
        await this.inputCommand.press('Enter');
    }

    async clearTerminal() {
        await this.executeCommand('clear');
    }
}