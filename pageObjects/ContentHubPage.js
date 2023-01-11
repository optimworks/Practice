const { expect } = require("@playwright/test")

class ContentHubPage {
    constructor(page) {
        this.page = page
        this.header = page.locator('[data-cy="header-title"]')
        this.card1 = this.page.locator('xpath=(//*[@data-cy="content-card-hover"])[1]/descendant::i').nth(0)
        this.card2 = this.page.locator('xpath=(//*[@data-cy="content-card-hover"])[2]/descendant::i').nth(0)
        this.card3 = this.page.locator('xpath=(//*[@data-cy="content-card-hover"])[2]/descendant::i').nth(0)
    }

    getContentHubHeader() {
        return this.page.locator('.current-page-title')
    }

    getSelectedCardsCount(_count) {
        return this.count = this.page.locator('.count-icon:has-text("' + _count + '")')
    }

    async selectImage() {
        this.image = '[data-cy="content-card"]'
        await this.page.hover(this.image)
        await this.page.locator('.icon-wrapper.is-transparent').nth(0).click()
        await expect(this.card1).toHaveAttribute('class', 'icon yule-icon-success-2')
    }

    async selectHTMLDocument() {
        this.htmlDoc = "xpath=(//*[@data-cy='content-card'])[2]"
        await this.page.hover(this.htmlDoc)
        await this.page.locator('.icon-wrapper.is-transparent').nth(0).click()
        await expect(this.card2).toHaveAttribute('class', 'icon yule-icon-success-2')
    }

    async selectVideo() {
        this.video = "xpath=(//*[@data-cy='content-card'])[3]"
        await this.page.hover(this.video)
        await this.page.locator('.icon-wrapper.is-transparent').nth(0).click()
        await expect(this.card3).toHaveAttribute('class', 'icon yule-icon-success-2')
    }

    async clickCreateDestination(btn) {
        this.createDestinationButton = this.page.locator('.q-tab__label:has-text("' + btn + '")').nth(0)
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.createDestinationButton.click()
        ])
    }
}
module.exports = { ContentHubPage }