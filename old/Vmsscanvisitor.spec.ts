import VMSDashboardPage from '../test/pageobjects/mobilepageobjects/MyDashboardPOM';
import VMSMobilePage from './scanvisitor';

describe('VMS Mobile Application Test', () => {
  
    it('Login and scan visitor successfully', async () => {

        await VMSMobilePage.login(
            'frontdesk@4thfloor',
            'Dt@12345678'
        );

        await VMSMobilePage.verifyHomeScreen();
       await VMSMobilePage.navigateToMyVisitors();
        // await VMSMobilePage.openScanner();
        await VMSMobilePage.viewVisitor();
        await VMSMobilePage.verifyVisitorCard();
        await VMSMobilePage.viewLivePhotos();
        await VMSMobilePage.capturePhotoWithOverride();
        await browser.pause(5000); // wait before verifying documents
        await VMSMobilePage.capturePhotoWithOverride();
        await VMSMobilePage.verifyDocuments();
        await VMSMobilePage.assignVisitorTag('12345');

        console.log('✅ Visitor scan and check-in completed successfully');
    });

});
