const { expect } = require("@playwright/test")

class DashboardPage {

    constructor(page) {
        this.page = page
        this.header = this.page.locator('.current-page-title')
        this.dashBoardUserName = page.locator('.dashboard-user-name')
        this.contentDropdown = page.locator('text=Content')
        this.contentListOptions = page.locator('.q-list')

    }

    getDashboardHeader() {
        return this.header
    }

    getDashboardUserName(_userName) {
        return this.page.locator('.dashboard-user-name:has-text("' + _userName + '")')
    }

    isContentPopUpIsDisplayed() {
        return this.page.isVisible('.q-list')
    }

    async clickContentDropdown(tab_name) {
        this.contentTab = this.page.locator('.q-tab__label:has-text("' + tab_name + '")').first()
        await this.contentTab.click()
    }

    async goToContentHub(option) {
        this.contentHub = this.page.locator('.q-item__section:has-text("' + option + '")')
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.contentHub.click()
        ])
    }

}
module.exports = { DashboardPage }