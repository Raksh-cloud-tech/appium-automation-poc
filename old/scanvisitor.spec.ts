describe("VMS Mobile Application Test", () => {
    it("Login to VMS application test and scan visitor", async () => {
        // Wait for username field and enter username
        const usernameField = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]');
        await usernameField.waitForDisplayed({ timeout: 10000 });
        await usernameField.click();
        await usernameField.setValue('frontdesk@4thfloor');
        // Wait for password field and enter password
        const passwordField = await $('//android.widget.EditText[@hint="Enter password"]');
        await passwordField.waitForDisplayed({ timeout: 10000 });
        await passwordField.click();
        await passwordField.setValue('Dt@12345678');
        // Click on login button
        const loginButton = await $('//android.widget.Button[@content-desc="Login"]');
        await loginButton.waitForDisplayed({ timeout: 10000 });
        await loginButton.click();
        console.log("Login action performed successfully");


         const homeScreenElement = await $('//android.view.View[@content-desc="Hi Amithab, here\'s today\'s visitor summary"]');
        await homeScreenElement.waitForDisplayed({ timeout: 3000 });
        await expect(homeScreenElement).toBeDisplayed();
        console.log("Home screen verified successfully");

        const scannerButton = await $('//android.widget.Button[@content-desc="Scan QR"]');
        await scannerButton.waitForDisplayed({ timeout: 10000 });
        await scannerButton.click();
        console.log("Visitor scan button clicked successfully");

        browser.pause(10000); // wait for scanner to open

        const visitorcard = await $('//android.view.View[@content-desc="Visit Details"]');
        await visitorcard.waitForDisplayed({ timeout: 20000 });
        console.log("Scanner opened and visitor card displayed successfully");

        browser.pause(5000); // wait for scanning process
         // Live photo
        const livePhoto = await $('//android.view.View[@content-desc="Click to enlarge"]');
        await livePhoto.waitForDisplayed({ timeout: 10000 });
        await livePhoto.click();
        const cancelimage = await $('//android.widget.Button');
        await cancelimage.waitForDisplayed({ timeout: 15000 });
        await cancelimage.click();
        await scrollGesture();
        const imageView = await $('(//android.view.View[@content-desc="Click to enlarge"])[2]');
        await imageView.waitForDisplayed({ timeout: 15000 });
        await expect(imageView).toBeDisplayed();
        await imageView.click();
        await cancelimage.waitForDisplayed({ timeout: 15000 });
        await cancelimage.click();
        const capturedPhoto = await $('//android.widget.Button[@content-desc="Capture"]');
        await capturedPhoto.waitForDisplayed({ timeout: 15000 });
        await capturedPhoto.click();
        const clickphoto = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]');
        await clickphoto.waitForDisplayed({ timeout: 15000 });
        await clickphoto.click();
        await browser.pause(5000); // long wait
        await scrollGesture();
        const overridebutton = await $('//android.widget.Button[@content-desc="Override"]');
        const isOverrideVisible = await overridebutton.isDisplayed().catch(() => false);
        if (await isOverrideVisible) {
            await overridebutton.waitForDisplayed({ timeout: 15000 });
            await overridebutton.click();
            await overridebutton.waitForDisplayed({ timeout: 15000 });
            await overridebutton.click();
            console.log("Visitor details and live photo verified successfully");
        }
        else {
            console.log("No override button displayed, proceeding without override.");
        }
        await scrollGesture();
        const capturedPhoto1 = await $('//android.widget.Button[@content-desc="Capture"]');
        await capturedPhoto1.waitForDisplayed({ timeout: 15000 });
        // await capturedPhoto1.scrollIntoView();
        await capturedPhoto1.click();
        await browser.pause(1000);
        await clickphoto.waitForDisplayed({ timeout: 15000 });
        await clickphoto.click();
        await browser.pause(5000);
        const overridebutton1 = await $('//android.widget.Button[@content-desc="Override"]');
        const isOverrideVisible1 = await overridebutton1.isDisplayed().catch(() => false);
        if (await isOverrideVisible1) {
            await overridebutton1.waitForDisplayed({ timeout: 15000 });
            await overridebutton1.click();
            await overridebutton1.waitForDisplayed({ timeout: 15000 });
            await overridebutton1.click();
        }
        else {
            console.log("No override button displayed, proceeding without override.");
        }
        // await scrollGesture("down", 0.4);
        const docVerified = await $('//android.view.View[contains(@content-desc,"Document Type Verified")]');
        const photoVerified = await $('//android.view.View[contains(@content-desc,"Photo Matches")]');
        const nameverified = await $('//android.view.View[contains(@content-desc,"Name Matches")]');
        await docVerified.waitForDisplayed({ timeout: 10000 });
        await docVerified.click();
        await photoVerified.waitForDisplayed({ timeout: 10000 });
        await photoVerified.click();
        await nameverified.waitForDisplayed({ timeout: 10000 });
        await nameverified.click();
        console.log("Verification details clicked successfully");
        await scrollGesture();
        const assigntagbutton = await $('//android.widget.Button[@content-desc="Assign Visitor Tag"]');
        await assigntagbutton.waitForDisplayed({ timeout: 10000 });
        await assigntagbutton.click();
        await browser.pause(3000);
        const tagnumber = await $('//android.widget.EditText');
        const completeassign = await $('//android.widget.Button[@content-desc="Complete Check-In"]');
        await tagnumber.waitForDisplayed({ timeout: 10000 });
        await tagnumber.click();
        await tagnumber.setValue('12345');
        await completeassign.waitForDisplayed({ timeout: 10000 });
        await completeassign.click();
        console.log("Visitor tag assigned and check-in completed successfully");
    });
    async function scrollGesture() {
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
);
