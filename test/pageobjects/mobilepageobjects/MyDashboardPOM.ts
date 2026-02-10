import BaseLoginPage from './VmsBaseclass';

export default class VMSDashboardPage extends BaseLoginPage {

    /* ===== Locators ===== */

    private homeScreenText = '//android.view.View[@content-desc="Hi Amithab, here\'s today\'s visitor summary"]';
    private scanQrButton = '//android.widget.Button[@content-desc="Scan QR"]';
    private upcomingvisitorsSection = '//android.view.View[@content-desc="Upcoming Visitors"]';
    private totalinvitsent = '//android.view.View[@content-desc="Total Invite Sent"]';
    private currentlycheckedin = '//android.view.View[@content-desc="Currently Checked-In"]';
    private upcomingschedules = '//android.view.View[@content-desc="Upcoming Schedule"]';
    private calenderbutton = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[14]';
    private calenderwidget = '//android.view.View[contains(@content-desc,"Selected Date")]'
    private userprofile = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]';
    private logoutbutton = '//android.view.View[@content-desc="Logout"]';
    private menuButton = 'android=new UiSelector().className("android.widget.Button").clickable(true).instance(0)';
    private myVisitorsTab = '~My Visitors';
    private scannerbackbutton = '//android.widget.Button[@content-desc="Back"]';
    private calendercancel = '(//android.view.View[contains(@content-desc,"Selected Date")]//android.widget.Button)[1]';
    
    async verifyHomeScreen() {
        await $(this.homeScreenText).waitForDisplayed({ timeout: 20000 });
        await expect($(this.homeScreenText)).toBeDisplayed();
        console.log("Home screen verified successfully");
    }
    async openScanner() {
        await $(this.scanQrButton).waitForDisplayed({ timeout: 10000 });
        await $(this.scanQrButton).click();
        await browser.pause(10000);
        console.log("Scan QR button clicked successfully");
    }
    async navigateToMyVisitors() {
        await $(this.menuButton).waitForDisplayed({ timeout: 10000 });
        await $(this.menuButton).click();
        console.log("Menu button clicked successfully");
        await $(this.myVisitorsTab).waitForDisplayed({ timeout: 10000 });
        await $(this.myVisitorsTab).click();
        console.log("My Visitors tab clicked successfully");
        await browser.pause(5000);
    }

    async verifyDashboardElements() {
        // Verify main dashboard elements are displayed
        await $(this.homeScreenText).waitForDisplayed({ timeout: 10000 });
        await expect($(this.homeScreenText)).toBeExisting();

        await $(this.scanQrButton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.scanQrButton)).toBeDisplayed();

        await $(this.upcomingvisitorsSection).waitForDisplayed({ timeout: 10000 });
        await expect($(this.upcomingvisitorsSection)).toBeDisplayed();

        await $(this.totalinvitsent).waitForDisplayed({ timeout: 10000 });
        await expect($(this.totalinvitsent)).toBeDisplayed();

        await $(this.currentlycheckedin).waitForDisplayed({ timeout: 10000 });
        await expect($(this.currentlycheckedin)).toBeDisplayed();

        await $(this.upcomingschedules).waitForDisplayed({ timeout: 10000 });
        await expect($(this.upcomingschedules)).toBeDisplayed();

        console.log("All dashboard elements verified successfully");
    }

    async verifyCalendarFunctionality() {
        // Open calendar
        await $(this.calenderbutton).waitForDisplayed({ timeout: 10000 });
        await $(this.calenderbutton).click();
        console.log("Calendar button clicked successfully");

        // Verify calendar widget appears
        await $(this.calenderwidget).waitForDisplayed({ timeout: 10000 });
        await expect($(this.calenderwidget)).toBeDisplayed();
        console.log("Calendar widget verified successfully");

        // Close calendar
        await $(this.calendercancel).click();
        console.log("Calendar closed successfully");
    }

    async verifyUserProfileAndLogout() {
        // Open user profile
        await $(this.userprofile).waitForDisplayed({ timeout: 10000 });
        await $(this.userprofile).click();
        console.log("User profile button clicked successfully");

        // Verify logout button is displayed
        await $(this.logoutbutton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.logoutbutton)).toBeDisplayed();
        console.log("Logout button verified successfully");

        // Close user profile (click again)
        await $(this.userprofile).click();
        console.log("User profile closed successfully");
    }

    async verifyMenuNavigation() {
        // Open menu
        await $(this.menuButton).waitForDisplayed({ timeout: 10000 });
        await $(this.menuButton).click();
        console.log("Menu button clicked successfully");

        // Verify My Visitors tab is displayed
        await $(this.myVisitorsTab).waitForDisplayed({ timeout: 10000 });
        await expect($(this.myVisitorsTab)).toBeDisplayed();
        console.log("My Visitors tab verified successfully");

        // Close menu by clicking My Visitors (navigation will happen)
        await $(this.myVisitorsTab).click();
        console.log("Navigated to My Visitors successfully");
    }

    async verifyQRScannerOpens() {
        // Click scan QR button
        await $(this.scanQrButton).waitForDisplayed({ timeout: 10000 });
        await $(this.scanQrButton).click();
        console.log("Scan QR button clicked successfully");

        // Wait for scanner to open (you might need to adjust this based on actual behavior)
        await browser.pause(5000);
        await $(this.scannerbackbutton).waitForDisplayed({ timeout: 10000 });
        await $(this.scannerbackbutton).click();
        // Note: Actual scanner verification would depend on the app's behavior
        // This is a placeholder for scanner opening verification
        console.log("QR scanner opened successfully");
    }
}

// export default new VMSDashboardPage();