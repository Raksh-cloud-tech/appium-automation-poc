import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './test/web',
    timeout: 30000,

    // reporter: [
    //     ['html', { outputFolder: 'reports/playwright-html' }],
    //     ['allure-playwright', { outputFolder: 'reports/allure/web' }]
    // ],
    reporter: [
        ['list'],

        ['allure-playwright', {
            outputFolder: 'allure-results/web'
        }],
        ["html", { outputFolder: "myHtmlReport" }],
    ],
    use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    }
});
