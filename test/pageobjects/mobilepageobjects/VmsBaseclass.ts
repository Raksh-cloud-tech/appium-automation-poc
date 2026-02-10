export default class BaseLoginPage {

    protected get usernameField() {
        return $('//android.widget.EditText[1]');
    }
    protected get passwordField() {
        return $('//android.widget.EditText[@hint="Enter password"]');
    }
    protected get loginButton() {
        return $('//android.widget.Button[@content-desc="Login"]');
    }
    async login(username: string, password: string) {
        await this.usernameField.waitForDisplayed({ timeout: 10000 });
        await this.usernameField.click();
        await this.usernameField.setValue(username);
        await this.passwordField.waitForDisplayed({ timeout: 10000 });
        await this.passwordField.click();
        await this.passwordField.setValue(password);
        await this.loginButton.waitForDisplayed({ timeout: 10000 });
        await this.loginButton.click();

        console.log('Login successful');
    }
}
