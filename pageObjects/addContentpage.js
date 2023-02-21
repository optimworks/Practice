const { expect } = require("@playwright/test")
class addContentPage{
    constructor(page){
        this.page=page
        this.addContentButton= page.locator('[id="content.create"]')
    }

    async clickAddContentButton(){
        await
    }
}