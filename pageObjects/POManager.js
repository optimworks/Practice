
const { LoginPage } = require("../pageObjects/LoginPage")
const { DashboardPage } = require('./DashboardPage')
const { ContentHubPage } = require('../pageObjects/ContentHubPage')
const { DistributeContentPage } = require("../pageObjects/DistributeContentPage")

class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page)
        this.contentHubPage = new ContentHubPage(this.page)
        this.distributeContentPage = new DistributeContentPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboardPage
    }

    getContentHubPage() {
        return this.contentHubPage
    }

    getDistributeContentPage() {
        return this.distributeContentPage
    }

    getDestinationPage() {
        return this.destinationPage
    }

    getScripts() {
        return this.scripts
    }
}
module.exports = { POManager }