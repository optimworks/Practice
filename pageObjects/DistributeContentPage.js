const { expect } = require("@playwright/test")

class DistributeContentPage {
    constructor(page) {
        this.page = page
        this.personalizationDropdown = this.page.locator('text=Personalization').nth(0)
        this.nameInputField = this.page.locator('[data-cy="-field"]').nth(0)
        this.shareButton = this.page.locator('text=Share')
        this.modalPopup = this.page.locator('.modal-title:has-text("Share link")')
        this.destinationLink = this.page.locator('.process.success :first-child')
        this.copyUrl = this.page.locator('.q-icon:has-text("link")')
        this.doneButton = this.page.locator('[data-cy="modal-save-button"]')
        this.successStrip = this.page.locator('.toast__type').last()
    }

    getDistributeContentHeader() {
        return this.page.getByText('Distribute content')
    }

    getContentToDistributeItemIsSelected(_name) {
        this.name = this.page.locator('.title:has-text("' + _name + '")')
        return this.name
    }

    async selectContentToDistribute(item_text) {
        this.item = this.page.locator('.q-item__label:has-text("' + item_text + '")').nth(0)
        await this.item.click()
        await this.page.waitForSelector('#add-folder-to-destination')
    }

    async enterContact(_name) {
        await this.page.waitForSelector('#destination-contact-selection')
        this.contactName = this.page.locator('input[type="search"]').nth(0)
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.contactName.fill(_name, { delay: 100 })
        ])
    }

    async enterDestinationName(_name) {
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            this.personalizationDropdown.click()
        ])
        //await expect(this.name.isEditable()).toBeTruthy()
        await this.nameInputField.click()
        await this.nameInputField.fill(_name)
    }

    async clickShare() {
        await this.shareButton.click()
        await this.page.waitForSelector('.option-title:has-text("Generate emlen Link")')
    }

    async generateEmlenLink(_link) {
        this.generateLink = this.page.locator('.option-title:has-text("' + _link + '")')
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.generateLink.click()
        ])
    }

    getModelPopupTitle() {
        return this.modalPopup
    }

    async getDestinationLink() {
        return this.destinationLink.textContent()
    }

    async copyDestinationUrl() {
        await this.copyUrl.click()
        await this.doneButton.click()
    }

    getLinkIsCopiedMessage() {
        return this.successStrip
    }

    async bringFront() {
        await this.page.bringToFront();
    }
}
module.exports = { DistributeContentPage }