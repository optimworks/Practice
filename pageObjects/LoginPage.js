const { expect } = require('@playwright/test')

class LoginPage {
    constructor(page) {
        this.page = page
        this.userName = page.locator('#email')
        this.password = page.locator('#password')
        this.proceedButton = page.locator(".q-btn__content")
        this.loginButton = page.locator('text=Login')
        this.logo = page.locator('img.q-mb-xl')
    }

    async launchUrl(testURL) {
        await this.page.goto(testURL);
        const url = await this.page.url();
        await expect(url).toContain("emlen");
    }

    async verifyEmlenLogoIsDisplayed() {
        await expect(this.logo).toBeVisible()
    }

    async verifyEmailInputFieldIsDisplayed() {
        await expect(this.userName).toBeVisible();
    }

    async verifyPasswordInputFieldIsDisplayed() {
        await expect(this.password).toBeVisible();
    }

    async enterEmailId(emailID) {
        await this.userName.fill(emailID)
    }

    async enterPassword(pwd) {
        await this.password.fill(pwd)
    }

    async clickProceed() {
        await this.proceedButton.click()
        await this.page.waitForLoadState('networkidle')
    }

    async clickLogin() {
        await this.loginButton.click()
        await this.page.waitForLoadState('networkidle')
    }
}
module.exports = { LoginPage }