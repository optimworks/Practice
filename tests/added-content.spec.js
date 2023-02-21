const { test, expect } = require("@playwright/test")
const { POManager } = require("../pageObjects/POManager")
const testData = require('../fixtures/testData.json')
const envData = require("../fixtures/env.json")
const nodemailer = require('nodemailer')
const { DestinationPage } = require("../pageObjects/DestinationPage")

var context, page, poManager, loginPage, dashboardPage, contentHubPage, distributeContentPage,
    destinationPage, newLink, page1

test.describe.configure({ mode: 'serial' });

test.describe("@Smoke Sending documents to destination user functionality:", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            httpCredentials: {
                username: "jax",
                password: "likesfood"
            }
        })
        await context.grantPermissions(['notifications'], { origin: envData.baseURL })
        page = await context.newPage()
        poManager = new POManager(page)
        loginPage = poManager.getLoginPage()
        dashboardPage = poManager.getDashboardPage()
        contentHubPage = poManager.getContentHubPage()
        distributeContentPage = poManager.getDistributeContentPage()
    })

    test("Launch the emlen application and verify", async () => {
        await loginPage.launchUrl(envData.baseURL)
        await loginPage.verifyEmlenLogoIsDisplayed()
        await loginPage.verifyEmailInputFieldIsDisplayed()
    })

    test("Login with user and verify", async () => {
        await loginPage.enterEmailId(envData.login_credentials.userName)
        await loginPage.clickProceed()
        await loginPage.verifyPasswordInputFieldIsDisplayed()
        await loginPage.enterPassword(envData.login_credentials.password)
        await loginPage.clickLogin()
        await expect(dashboardPage.getDashboardHeader()).toHaveText('Dashboard')
        await expect(dashboardPage.getDashboardUserName(testData.dashboardUserName)).toHaveText(testData.dashboardUserName)
    })

    test("Go to content hub and verify", async () => {
        await dashboardPage.clickContentDropdown(testData.contentTab)
        await expect(dashboardPage.isContentPopUpIsDisplayed()).toBeTruthy()
        await dashboardPage.goToContentHub(testData.contentHub)
        await expect(contentHubPage.getContentHubHeader()).toHaveText('Content Hub')
    })
    test("Test1", async () => {
        
    })
    test("Test2", async () => {
        
    })
    test("Test3", async () => {
        
    })
})