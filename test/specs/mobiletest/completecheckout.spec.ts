import VMSDashboardPage from '../../pageobjects/mobilepageobjects/MyDashboardPOM';
import MyVisitorspage from '../../pageobjects/mobilepageobjects/MyVisitorsPOM';

describe('VMS Mobile App checkout flow', () => {

    let dashboard: VMSDashboardPage;
    let myvisitor: MyVisitorspage
    before(async () => {
        dashboard = new VMSDashboardPage();
        myvisitor = new MyVisitorspage();
        await dashboard.login('frontdesk@4thfloor', 'Dt@12345678');
        await dashboard.verifyHomeScreen();
        await dashboard.navigateToMyVisitors();

    });

    it('Verify myvisitors details and complete check-out', async () => {
        await myvisitor.searchvisitors("Rakshith");
        await myvisitor.Myvisitorsfilter("Checked-In");
        await myvisitor.viewVisitor();
        await myvisitor.verifyVisitorCard();
        await myvisitor.viewLivePhotos();
        await myvisitor.completeVisitorCheckout();
        console.log(' My visitors checkout flow completed successfully');
        await browser.pause(5000);

    });
});
