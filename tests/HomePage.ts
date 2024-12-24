import { Page, Locator } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly usernamePs1: Locator;
    readonly hostnamePs1: Locator;
    readonly homepageBanner: Locator;
    readonly bannerImg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernamePs1 = page.locator('label').getByText('welcome').first();
        this.hostnamePs1 = page.locator('label').getByText('marko-avram-terminal-portfolio').first();
        this.homepageBanner = page.locator("id=banner");
        this.bannerImg = page.getByRole('img')
    }

    async openApplication() {
        await this.page.goto('https://marko-avram-terminal-portfolio.vercel.app/');
    }
}