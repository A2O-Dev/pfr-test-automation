import * as dotenv from 'dotenv'
import * as fs from 'fs';
import * as pdf from 'text-from-pdf'

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const env = process.env
const pathToChromeDownloads = './testDownloads';
let pdfFile = ''
let phoneNumber = '';

describe('Check the phone number on the donation extract ', () => {

    // Login
    const url = env.PFR_URL + 'auth/login'

    it('Login', async () => {
        await browser.url(url)
        await browser.pause(3000)
        await browser.maximizeWindow()
        await $('#username').setValue(env.SITEADMIN_USERNAME)
        await $('#password').setValue(env.SITEADMIN_PASSWORD)
        await $('input[type="submit"]').click()
        await browser.pause(3000)
    })

    it('Download pdf file', async () => {
        //Nav
        await $('.dropdown=Site').click()
        await browser.pause(1000)
        await $('=Donor Management').click()
        await browser.pause(2000)

        const donorName = await $('//*[@id="app"]/div/div/div/div/div[2]/main/div/div[4]/div/div/div/table/tbody/tr[1]/td[3]/a')
        const prevPledge = await $('//table/tbody/tr[1]/td[1]/a')
        const printReceipt = await $('.btn-info')

        await donorName.click()
        await browser.pause(3000)

        // New page
        await browser.switchWindow('Outreach Marketing, LLC')
        await browser.pause(3000)

        const pageHeader = await $('.page-header').$('h1=Donor Details')

        phoneNumber = await $('#phone').getValue()
        await expect(pageHeader).toBeExisting()
        await prevPledge.click()
        await browser.pause(3000)
        await expect(printReceipt).toBeExisting()
        await printReceipt.click()  // download
        await browser.pause(3000)
    })
    it('Verify the file is downloaded', async () => {
        const files = await fs.promises.readdir(pathToChromeDownloads);
        pdfFile = files[0]
        await expect(files[0].includes('-receipt.pdf')).toBe(true)
    });
    it('Extract pdf data', async () => {
        const data = await pdf.pdfToText(pathToChromeDownloads + '/' + pdfFile)
    })
    it('it should contain phone number', async () => {
        const data = await pdf.pdfToText(pathToChromeDownloads + '/' + pdfFile)
        await expect(data.includes('Phone Number:')).toBe(true)
        await expect(data.includes(phoneNumber)).toBe(true)
    })

})