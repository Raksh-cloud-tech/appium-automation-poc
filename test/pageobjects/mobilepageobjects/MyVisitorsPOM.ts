import BaseLoginPage from "./VmsBaseclass";

export default class MyVisitorspage extends BaseLoginPage {

    private myVisitorsHeader = '//android.view.View[contains(@content-desc,"My Visitors")]';
    private searchBar = '//android.widget.EditText';
    private filterButton = '//android.widget.Button[contains(@content-desc,"Filters")]';
    private editcontactbutton = '//android.widget.Button[@content-desc="Edit contact information"]';
    private editemailbutton = "//android.view.View[@content-desc='Email']/following-sibling::android.widget.EditText[1]";
    private editphonebutton = "//android.view.View[@content-desc='Phone']/following-sibling::android.widget.EditText[2]";
    private visitorsSelector = '//android.widget.ImageView[@content-desc]';
    private savebutton = '//android.widget.Button[@content-desc="Save"]';
    private collectvisitortag = '//android.widget.Button[@content-desc="Collect Visitor Tag"]';
    private visitortagIdNo = '//android.view.View[contains(@content-desc,"Visitor Tag ID")]'; // Tag ID is in content-desc
    private IdtagCollectioncheckbox = '//android.view.View[contains(@content-desc,"ID Tag Collected")]'; // Checkbox for ID Tag Collected
    private cancelbutton = '//android.widget.Button[@content-desc="Cancel"]';
    private completecheckoutbutton = '//android.widget.Button[@content-desc="Complete Check-Out"]';
    private filterName = (filterName: string) =>
        `//android.view.View[contains(@content-desc,"${filterName}")]`;
    // private applyFilterButton = '//android.widget.Button[@content-desc="Apply Filters"]';
    private menuButton = 'android=new UiSelector().className("android.widget.Button").clickable(true).instance(0)';
    private myVisitorsTab = '~My Visitors';
    get visitors() {
        return $$(this.visitorsSelector);
    }
    get applyFilterButton() {
        return $('android=new UiScrollable(new UiSelector().scrollable(true))' + '.scrollIntoView(new UiSelector().description("Apply Filters"))');
    }
    get visitorCard() {
        return $('//android.view.View[@content-desc="Visit Details"]');
    }
    get livePhoto() {
        return $('//android.view.View[@content-desc="Click to enlarge"]');
    }
    get secondImage() {
        return $('((//android.view.View[@content-desc="Click to enlarge"])[2])');
    }
    get cancelImageButton() {
        return $('//android.widget.Button');
    }
    get captureButton() {
        return $('//android.widget.Button[@content-desc="Capture"]');
    }
    get cameraClick() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]');
    }
    get overrideButton() {
        return $('//android.widget.Button[@content-desc="Override"]');
    }
    get documentVerified() {
        return $('//android.view.View[contains(@content-desc,"Document Type Verified")]');
    }
    get photoVerified() {
        return $('//android.view.View[contains(@content-desc,"Photo Matches")]');
    }
    get nameVerified() {
        return $('//android.view.View[contains(@content-desc,"Name Matches")]');
    }
    private get assignTagButton() {
        return $('//android.widget.Button[@content-desc="Assign Visitor Tag"]');
    }
    get tagNumberInput() {
        return $('//android.widget.EditText');
    }
    get completeCheckInButton() {
        return $('//android.widget.Button[@content-desc="Complete Check-In"]');
    }
    async searchvisitors(visitorName: string) {
        await $(this.myVisitorsHeader).waitForDisplayed({ timeout: 10000 });
        await expect($(this.myVisitorsHeader)).toBeDisplayed();
        console.log("My Visitors header verified successfully");
        await $(this.searchBar).waitForDisplayed({ timeout: 10000 });
        await expect($(this.searchBar)).toBeDisplayed();
        await $(this.searchBar).click();
        await $(this.searchBar).setValue(visitorName);
        await $(this.searchBar).clearValue();
        await browser.pause(2000);
        console.log("Search bar functionality verified successfully");
    }
    async Myvisitorsfilter(Filtername: string) {
        await $(this.filterButton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.filterButton)).toBeDisplayed();
        await $(this.filterButton).click();
        console.log("Filter button clicked successfully");
        await $(this.filterName(Filtername)).waitForDisplayed({ timeout: 10000 });
        await expect($(this.filterName(Filtername))).toBeDisplayed();
        await $(this.filterName(Filtername)).click();
        console.log("Approved filter selected successfully");
        const scrollView = await $('//android.widget.ScrollView');
        await scrollView.waitForExist({ timeout: 10000 });
        await browser.execute('mobile: scrollGesture', {
            elementId: scrollView.elementId,
            direction: 'down',
            percent: 2
        });
        await this.applyFilterButton.waitForDisplayed({ timeout: 10000 });
        await this.applyFilterButton.click();
        console.log("Apply Filter button clicked successfully");
        await browser.pause(5000);
        await $(this.visitorsSelector).waitForDisplayed({ timeout: 10000 });
        await expect($(this.visitorsSelector)).toBeDisplayed();
        console.log("Visitors verified successfully");
    }
    async viewVisitor() {
        await browser.waitUntil(
            async () => (await this.visitors.length) > 0,
            {
                timeout: 10000,
                timeoutMsg: 'No visitors found in the list'
            }
        );
        const visitorCard = this.visitors[0];
        await visitorCard.waitForDisplayed({ timeout: 10000 });
        await expect(visitorCard).toBeDisplayed();
        await visitorCard.click();
        console.log('First visitor selected successfully');
    }
    async verifyVisitorCard() {
        await this.visitorCard.waitForDisplayed({ timeout: 20000 });
        await this.scrollGesture('down');
    }

    async viewLivePhotos() {
        await this.livePhoto.waitForDisplayed({ timeout: 10000 });
        await this.livePhoto.click();
        await this.cancelImageButton.click();
        await this.scrollGesture('down', 0.5);

        await this.secondImage.waitForDisplayed({ timeout: 15000 });
        await this.secondImage.click();
        await this.cancelImageButton.click();
        await this.scrollGesture('down', 0.5);

    }
    async capturePhotoWithOverride() {
        const captureButtonSelector = 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Capture"))';
        await $(captureButtonSelector).waitForDisplayed({ timeout: 30000 });
        await this.captureButton.waitForDisplayed({ timeout: 15000 });
        await this.captureButton.click();
        await this.cameraClick.waitForDisplayed({ timeout: 15000 });
        await this.cameraClick.click();
        await browser.pause(15000);
         const RetakeButtonSelector = 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Retake"))';
        await $(RetakeButtonSelector).waitForDisplayed({ timeout: 30000 });
        const isOverrideVisible = await this.overrideButton.isDisplayed().catch(() => false);
        if (isOverrideVisible) {
            await this.overrideButton.click();
            await this.overrideButton.click();
        }
        // Wait for the page to stabilize after capture
        await this.scrollGesture('down', 0.5);

    }
    async captureIdWithOverride() {
        // Scroll down until the capture button is visible
        const captureButtonSelector = 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Capture"))';
        await $(captureButtonSelector).waitForDisplayed({ timeout: 30000 });
        await this.captureButton.waitForDisplayed({ timeout: 15000 });
        await this.captureButton.click();
        await this.cameraClick.waitForDisplayed({ timeout: 15000 });
        await this.cameraClick.click();
        await browser.pause(15000);
        const RetakeButtonSelector = 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Retake"))';
        await $(RetakeButtonSelector).waitForDisplayed({ timeout: 30000 });
        const isOverrideVisible = await this.overrideButton.isDisplayed().catch(() => false);
        if (isOverrideVisible) {
            await this.overrideButton.click();
            await this.overrideButton.click();
        }
        // Wait for the page to stabilize after capture
        await this.scrollGesture('down', );
    }
    async verifyDocuments() {
        const verificationButton = 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Verification"))';
        await $(verificationButton).waitForDisplayed({ timeout: 30000 });
        await this.documentVerified.waitForDisplayed({ timeout: 10000 });
        const docChecked = await this.documentVerified.getAttribute('checked') === 'true';
        if (!docChecked) {
            await this.documentVerified.click();
        }
        await this.photoVerified.waitForDisplayed({ timeout: 10000 });
        const photoChecked = await this.photoVerified.getAttribute('checked') === 'true';
        if (!photoChecked) {
            await this.photoVerified.click();
        }
        await this.nameVerified.waitForDisplayed({ timeout: 10000 });
        await this.nameVerified.click();
        await this.scrollGesture('down', 0.5);
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
    async assignVisitorTag(tag: string) {
        await this.assignTagButton.click();
        await this.tagNumberInput.waitForDisplayed({ timeout: 10000 });
        await this.tagNumberInput.click();
        await this.tagNumberInput.setValue(tag);
        await this.completeCheckInButton.waitForDisplayed({ timeout: 10000 });
        await this.completeCheckInButton.click();
        await browser.pause(5000); // Wait for the assignment to process
        console.log("Visitor tag assigned and check-in completed successfully");
    }

    async editContactInformation(phoneNumber: string, emailAddress: string) {
        await $(this.editcontactbutton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.editcontactbutton)).toBeDisplayed();
        await $(this.editcontactbutton).click();
        console.log("Edit contact information button clicked successfully");

        await $(this.editphonebutton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.editphonebutton)).toBeDisplayed();
        await $(this.editphonebutton).click();
        await $(this.editphonebutton).setValue(phoneNumber);
        console.log("Phone number set successfully");

        await $(this.editemailbutton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.editemailbutton)).toBeDisplayed();
        await $(this.editemailbutton).click();
        await $(this.editemailbutton).setValue(emailAddress);
        console.log("Email address set successfully");

        await $(this.savebutton).waitForDisplayed({ timeout: 10000 });
        await expect($(this.savebutton)).toBeDisplayed();
        await $(this.savebutton).click();
        console.log("Save button clicked successfully");
        // Wait for the page to stabilize after saving
        await this.visitorCard.waitForDisplayed({ timeout: 20000 });
    }

    async completeVisitorCheckout() {
        const collectButton = $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Collect Visitor Tag"))');
        await collectButton.waitForDisplayed({ timeout: 10000 });
        await collectButton.click();
        console.log("Collect Visitor Tag button clicked successfully");

        await browser.pause(3000); // Wait for popup to load

        // Verify popup is displayed
        const popupView = $('//android.view.View[contains(@content-desc,"Visitor Tag Collection")]');
        await popupView.waitForDisplayed({ timeout: 10000 });
        console.log("Popup displayed successfully");

        await browser.pause(2000); // Additional pause to ensure popup is stable

        // Click the ID Tag Collection checkbox
        await $(this.IdtagCollectioncheckbox).waitForDisplayed({ timeout: 10000 });
        await $(this.IdtagCollectioncheckbox).click();
        console.log("ID Tag Collection checkbox clicked successfully");

        await browser.pause(1000); // Pause after checkbox click

        // Click Complete Check-Out button
        await $(this.completecheckoutbutton).waitForDisplayed({ timeout: 10000 });
        await $(this.completecheckoutbutton).click();
        console.log("Complete Check-Out button clicked successfully");
    }

    async scrollGesture(direction: 'up' | 'down' | 'left' | 'right', percent: number = 0.5) {
        const scrollView = await $('//android.widget.ScrollView');
        if (await scrollView.isDisplayed().catch(() => false)) {
            await browser.execute('mobile: scrollGesture', {
                elementId: scrollView.elementId,
                direction: direction,
                percent: percent
            });
        } else {
            const { width, height } = await browser.getWindowSize();
            await browser.execute('mobile: scrollGesture', {
                left: 0,
                top: 0,
                width: width,
                height: height,
                direction: direction,
                percent: percent
            });
        }
    }


}