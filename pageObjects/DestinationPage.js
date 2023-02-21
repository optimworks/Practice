const { expect } = require("@playwright/test")

class DestinationPage {
    constructor(page1) {
        this.page1 = page1
        this.acceptAndAccessButton = this.page1.locator('.block:has-text("Accept and access")')
        this.rejectButton = this.page1.locator('.block:has-text("Reject")')
        this.documentName = this.page1.locator('div h1:has-text("Sell the way your future customers love")')
        this.video = this.page1.locator('.file-player video')
        this.destinationUserName = this.page1.locator('h1.title')
        this.downArrow = this.page1.locator('.page-selector .q-btn').nth(1)
        this.pdfContent = '.content-area .content-item'
        this.framePage = this.page1.frameLocator('iframe.col-grow')
        this.pdfFileHeader = this.page1.locator('span:has-text("The Scrum Guide")').first()
        this.destinationPdfFile = this.page1.locator('.vue-pdf')
        this.destinationImage = this.page1.locator('.textLayer')
        this.destinationHtmlDoc = this.page1.locator('.content-area')
        this.footer = this.page1.locator('.footer-wrapper')
        this.ownerName = this.page1.locator('.owner-identity')
    }

    async launchDestinationUrl(_url) {
        await this.page1.goto(_url)
        const url = await this.page1.url();
        await expect(url).toContain("emlen");
    }

    async verifyDestinationPopupIsDisplayed() {
        await this.page1.waitForSelector('.q-card')
    }

    async verifyDestinationUserNameIsDisplayed() {
        return this.destinationUserName.textContent()
    }

    async verifyAcceptAndRejectButtonsDisplayed() {
        await expect(this.acceptAndAccessButton).toBeVisible()
        await expect(this.rejectButton).toBeVisible()
    }

    async clickAccept() {
        await Promise.all([
            this.page1.waitForLoadState('networkidle'),
            this.acceptAndAccessButton.click()
        ])
    }

    isOwnerNameDisplayed() {
        return this.ownerName
    }

    isImageDisplayed(img) {
        return this.page1.locator('.content-item-title:has-text("' + img + '")')
    }

    isHTMLDocumentDisplayed(html_doc) {
        return this.page1.locator('.content-item-title:has-text("' + html_doc + '")')
    }

    isVideoFileDisplayed(_video_file) {
        return this.page1.locator('.content-item-title:has-text("' + _video_file + '")')
    }

    isPdfFileDisplayed(_pdf_file) {
        return this.page1.locator('.content-item-title:has-text("' + _pdf_file + '")')
    }

    async openPdfFile(_pdf_file) {
        await Promise.all([
            this.page1.waitForLoadState('networkidle'),
            this.page1.click('.content-item-title:has-text("' + _pdf_file + '")')
        ])
        await expect(this.pdfFileHeader).toBeHidden()
        await this.page1.hover(this.pdfContent)
        for (let i = 0; i <= 4; i++) {
            await this.downArrow.click()
        }
        await this.page1.waitForTimeout(2000)
    }

    async openHTMLDocumement(html_doc) {
        await Promise.all([
            this.page1.waitForLoadState('networkidle'),
            this.page1.click('.content-item-title:has-text("' + html_doc + '")')
        ])
        await expect(this.page1.locator('.q-spinner')).toBeVisible()
        await this.framePage.locator('.text-span').nth(0).scrollIntoViewIfNeeded()
        await this.page1.waitForTimeout(2000)
    }

    async openImage(img) {
        await Promise.all([
            this.page1.waitForLoadState('networkidle'),
            this.page1.click('.content-item-title:has-text("' + img + '")')
        ])
        await this.page1.waitForTimeout(2000)
    }

    verifyDestinationPdfFileIsOpen() {
        return this.destinationPdfFile
    }

    verifyDestinationImageIsOpen() {
        return this.destinationImage.screenshot()
    }

    getDestinationHTMLDocument() {
        this.page1.waitForSelector('.content-area')
        return this.destinationHtmlDoc
    }

    async verifyHTMLDocFooterIsDisplayed() {
        await this.footer.scrollIntoViewIfNeeded()
    }

    async openVideoFile(_video_file) {
        await Promise.all([
            this.page1.waitForLoadState('networkidle'),
            this.page1.click('.content-item-title:has-text("' + _video_file + '")')
        ])
    }

    async verifyVideoIsLoaded() {
        this.videoFile = this.page1.locator('.video-renderer').isVisible()
        return this.video
    }
}
module.exports = { DestinationPage }