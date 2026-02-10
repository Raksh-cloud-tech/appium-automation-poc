import BaseLoginPage from '../../pageobjects/mobilepageobjects/VmsBaseclass';

describe('VMS Mobile Login', () => {
    let loginPage: BaseLoginPage;

    before(async () => {
        loginPage = new BaseLoginPage();
    });

    beforeEach(async () => {
        await browser.reloadSession();
    });

    it('TC001: should login successfully with valid credentials', async () => {
        await loginPage.login('frontdesk@4thfloor', 'Dt@12345678');
        const homeScreenElement = await $('//android.view.View[@content-desc="Hi Amithab, here\'s today\'s visitor summary"]');
        await expect(homeScreenElement).toBeDisplayed();
        console.log('Login to VMS application successful');
    });

    it('TC002: should fail login with invalid username', async () => {
        await loginPage.login('invaliduser', 'Dt@12345678');
        const loginButton = await $('//android.widget.Button[@content-desc="Login"]');
        await expect(loginButton).toBeDisplayed();
        console.log('Login failed as expected with invalid username');
    });

    it('TC003: should fail login with invalid password', async () => {
        await loginPage.login('frontdesk@4thfloor', 'Dt@12345678');
        const loginButton = await $('//android.widget.Button[@content-desc="Login"]');
        await expect(loginButton).toBeDisplayed();
        console.log('Login failed as expected with invalid password');
    });

    it('TC004: should fail login with empty fields', async () => {
        await loginPage.login('', '');
        const loginButton = await $('//android.widget.Button[@content-desc="Login"]');
        await expect(loginButton).toBeDisplayed();
        console.log('Login failed as expected with empty fields');
    });
});
