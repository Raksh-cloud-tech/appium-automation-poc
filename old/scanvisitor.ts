class VMSMobilePage {

    private visitorsSelector = '//android.widget.ImageView[@content-desc]';
    private menuButton = 'android=new UiSelector().className("android.widget.Button").clickable(true).instance(0)';
    private myVisitorsTab = '~My Visitors';
    get visitors() {
        return $$(this.visitorsSelector);
    }
    get usernameField() {
        return $('//android.widget.EditText[1]');
    }
    get passwordField() {
        return $('//android.widget.EditText[@hint="Enter password"]');
    }
    get loginButton() {
        return $('//android.widget.Button[@content-desc="Login"]');
    }
    get homeScreenText() {
        return $('//android.view.View[@content-desc="Hi Amithab, here\'s today\'s visitor summary"]');
    }
    get scanQrButton() {
        return $('//android.widget.Button[@content-desc="Scan QR"]');
    }
    get visitorCard() {
        return $('//android.view.View[@content-desc="Visit Details"]');
    }
    get livePhoto() {
        return $('//android.view.View[@content-desc="Click to enlarge"]');
    }
    get secondImage() {
        return $('(//android.view.View[@content-desc="Click to enlarge"])[2]');
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

    /* =====================
       Actions
    ====================== */

    async login(username: string, password: string) {
        await this.usernameField.waitForDisplayed({ timeout: 10000 });
        await this.usernameField.click();
        await this.usernameField.setValue(username);

        await this.passwordField.waitForDisplayed({ timeout: 10000 });
        await this.passwordField.click();
        await this.passwordField.setValue(password);

        await this.loginButton.click();
    }

    async verifyHomeScreen() {
        await this.homeScreenText.waitForDisplayed({ timeout: 10000 });
        await expect(this.homeScreenText).toBeDisplayed();
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
    async openScanner() {
        await this.scanQrButton.waitForDisplayed({ timeout: 10000 });
        await this.scanQrButton.click();
        await browser.pause(10000);
    }

    async verifyVisitorCard() {
        await this.visitorCard.waitForDisplayed({ timeout: 20000 });
    }

    async viewLivePhotos() {
        await this.livePhoto.waitForDisplayed({ timeout: 10000 });
        await this.livePhoto.click();
        await this.cancelImageButton.click();

        await this.scrollDown();

        await this.secondImage.waitForDisplayed({ timeout: 15000 });
        await this.secondImage.click();
        await this.cancelImageButton.click();
    }

    async capturePhotoWithOverride() {
        await this.captureButton.waitForDisplayed({ timeout: 15000 });
        await this.captureButton.click();

        await this.cameraClick.waitForDisplayed({ timeout: 15000 });
        await this.cameraClick.click();

        await browser.pause(5000);

        const isOverrideVisible = await this.overrideButton.isDisplayed().catch(() => false);
        if (isOverrideVisible) {
            await this.overrideButton.click();
            await this.overrideButton.click();
        }
    }

    async verifyDocuments() {
        await this.documentVerified.click();
        await this.photoVerified.click();
        await this.nameVerified.click();
    }

    async assignVisitorTag(tag: string) {
        await this.assignTagButton.click();
        await this.tagNumberInput.setValue(tag);
        await this.completeCheckInButton.click();
    }

    async scrollDown() {
        await browser.execute('mobile: scrollGesture', {
            left: 100,
            top: 100,
            width: 800,
            height: 1600,
            direction: 'down',
            percent: 0.8
        });
    }
}

export default new VMSMobilePage();
