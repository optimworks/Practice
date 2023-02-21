const { test, expect } = require("@playwright/test")
const { POManager } = require("../pageObjects/POManager")
const testData = require('../fixtures/testData.json')
const envData = require("../fixtures/env.json")
const nodemailer = require('nodemailer')
const { DestinationPage } = require("../pageObjects/DestinationPage")

var context, page, poManager, loginPage, dashboardPage, contentHubPage, distributeContentPage,
    destinationPage, newLink, page1

test.describe.configure({ mode: 'serial' });

test.describe("Sending documents to destination user functionality:", () => {

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

    test("Select the cards and verify", async () => {
        await contentHubPage.selectImage()
        await contentHubPage.selectHTMLDocument()
        await contentHubPage.selectVideo()
        await expect(contentHubPage.getSelectedCardsCount('3')).toBeVisible()
    })

    test("Distribute content and verify", async () => {
        await contentHubPage.clickCreateDestination(testData.createButton)
        await expect(distributeContentPage.getDistributeContentHeader()).toHaveText('Distribute content')
        await expect(distributeContentPage.getContentToDistributeItemIsSelected(testData.image)).toHaveText(testData.image)
        await expect(distributeContentPage.getContentToDistributeItemIsSelected(testData.htmlDocument)).toHaveText(testData.htmlDocument)
        await expect(distributeContentPage.getContentToDistributeItemIsSelected(testData.videoFile)).toHaveText(testData.videoFile)
        await distributeContentPage.selectContentToDistribute(testData.pdfFile)
        await expect(distributeContentPage.getContentToDistributeItemIsSelected(testData.pdfFile)).toHaveText(testData.pdfFile)
        await distributeContentPage.enterContact(testData.contactName)
        await distributeContentPage.enterDestinationName(testData.destinationName)
    })

    test("Generate emlen distribution link and verify", async () => {
        await distributeContentPage.clickShare()
        await distributeContentPage.generateEmlenLink('Generate emlen Link')
        await expect(distributeContentPage.getModelPopupTitle()).toHaveText("Share link")
        newLink = await distributeContentPage.getDestinationLink()
        await distributeContentPage.copyDestinationUrl()
        await expect(distributeContentPage.getLinkIsCopiedMessage()).toHaveText('The link has been copied to clipboard')
    })

    test("Launch destination url and verify", async () => {
        page1 = await context.newPage()
        destinationPage = new DestinationPage(page1)
        await destinationPage.launchDestinationUrl(newLink)
        await destinationPage.verifyDestinationPopupIsDisplayed()
        let userName = await destinationPage.verifyDestinationUserNameIsDisplayed()
        await expect(userName).toEqual(testData.destinationUserName)
        await destinationPage.verifyAcceptAndRejectButtonsDisplayed()
    })

    test("Accept popup and verify", async () => {
        await destinationPage.clickAccept()
        const ownerName = await destinationPage.isOwnerNameDisplayed().textContent()
        await expect(ownerName).toEqual(testData.destinationUserName)
        await expect(destinationPage.isImageDisplayed(testData.image)).toHaveText(testData.image)
        await expect(destinationPage.isHTMLDocumentDisplayed(testData.htmlDocument)).toHaveText(testData.htmlDocument)
        await expect(destinationPage.isVideoFileDisplayed(testData.videoFile)).toHaveText(testData.videoFile)
        await expect(destinationPage.isPdfFileDisplayed(testData.pdfFile)).toHaveText(testData.pdfFile)
    })

    // test("Open pdf file and verify", async () => {
    //     await destinationPage.openPdfFile(testData.pdfFile)
    //     await expect(destinationPage.verifyDestinationPdfFileIsOpen()).toBeVisible()
    // })

    test("Open html document and verify", async () => {
        await destinationPage.openHTMLDocumement(testData.htmlDocument)
        expect(await destinationPage.getDestinationHTMLDocument().isVisible()).toBeTruthy()
    })

    test("Open video and verify", async () => {
        await destinationPage.openVideoFile(testData.videoFile)
        await expect(destinationPage.verifyVideoIsLoaded()).toBeTruthy()
    })

    // test("Open Image and verify", async () => {
    //     await destinationPage.openImage(testData.image)
    //     expect(await destinationPage.verifyDestinationImageIsOpen()).toMatchSnapshot();
    // })


    test.afterAll(async ({ browser }) => {
        await browser.close()
        return new Promise(function (fulfill, reject) {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'demo4playwright@gmail.com',//sender mail id
                    pass: 'aybuhmuxamijgflz'//sender mail access password
                }
            });
            var mailOptions = {
                from: 'demo4playwright@gmail.com',//sender mail id
                to: 'akhil.thokala@optimworks.com',//receipient mail id
                subject: 'Emlen - Playwright Test Execution Report',
                text: 'Test_Report for Playwright tests',
                attachments: [{
                    'path': 'playwright-report/index.html',
                }]
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                    return console.log(error);
                }
                console.log('Mail sent: ' + info.response);
                fulfill(info);
            });
        });
    })

})