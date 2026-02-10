import VMSDashboardPage from '../../pageobjects/mobilepageobjects/MyDashboardPOM';

describe('VMS Mobile App - Dashboard Scenarios', () => {

    let dashboard: VMSDashboardPage;

    before(async () => {
        dashboard = new VMSDashboardPage();
        await dashboard.login('frontdesk@4thfloor', 'Dt@12345678');
    });

    afterEach(async () => {
        // Reset to dashboard after each test if needed
        await browser.pause(1000);
    });

    it('Verify dashboard home screen elements are displayed', async () => {
        console.log('Starting dashboard home screen elements verification');
        await dashboard.verifyDashboardElements();
        console.log('Dashboard home screen elements verification completed successfully');
    });

    it('Verify calendar functionality opens and closes properly', async () => {
        console.log('Starting calendar functionality verification');
        await dashboard.verifyCalendarFunctionality();
        console.log('Calendar functionality verification completed successfully');
    });

    it('Verify user profile and logout functionality', async () => {
        console.log('Starting user profile and logout functionality verification');
        await dashboard.verifyUserProfileAndLogout();
        console.log('User profile and logout functionality verification completed successfully');
    });

    it('Verify QR scanner button functionality', async () => {
        console.log('Starting QR scanner button functionality verification');
        await dashboard.verifyQRScannerOpens();
        console.log('QR scanner button functionality verification completed successfully');
    });

    it('Verify dashboard statistics sections are present', async () => {
        console.log('Starting dashboard statistics sections verification');
        // Statistics verification is included in verifyDashboardElements
        await dashboard.verifyDashboardElements();
        console.log('Dashboard statistics sections verification completed successfully');
    });
    it('Verify menu navigation to My Visitors', async () => {
        console.log('Starting menu navigation to My Visitors verification');
        await dashboard.verifyMenuNavigation();
        console.log('Menu navigation to My Visitors verification completed successfully');
    });
});
