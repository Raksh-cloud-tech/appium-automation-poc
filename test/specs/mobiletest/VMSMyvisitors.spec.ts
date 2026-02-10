import VMSDashboardPage from '../../pageobjects/mobilepageobjects/MyDashboardPOM';
import MyVisitorspage from '../../pageobjects/mobilepageobjects/MyVisitorsPOM';

describe('VMS Mobile App checkin scenarios', () => {

    let dashboard: VMSDashboardPage;
    let myvisitor: MyVisitorspage
    before(async () => {
        dashboard = new VMSDashboardPage();
        myvisitor = new MyVisitorspage();
        await dashboard.login('frontdesk@4thfloor', 'Dt@12345678');
        await dashboard.verifyHomeScreen();
        await dashboard.navigateToMyVisitors();

    });

    it('Verify myvisitors details, assign tagId and complete checkin', async () => {
        await myvisitor.searchvisitors("Rakshith");
        await myvisitor.Myvisitorsfilter("Approved");
        await myvisitor.viewVisitor();
        await myvisitor.editContactInformation("1234567890", "Rakshith@Yopmail.com");
        await myvisitor.verifyVisitorCard();
        await myvisitor.viewLivePhotos();
        await myvisitor.capturePhotoWithOverride();
        await browser.pause(5000); // wait before verifying documents
        await myvisitor.captureIdWithOverride();
        await browser.pause(5000); // wait before verifying documents
        await myvisitor.verifyDocuments();
        console.log(' My visitors flow completed successfully');
        await myvisitor.assignVisitorTag('12345');
        await browser.pause(5000);
    });
});
