import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const env = process.env

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


    it('Check Phone number Donation extract', async () => {
        //Nav
        await $('.dropdown=Site').click()
        await browser.pause(1000)
        //await $('//nav/div/div[2]/ul[2]/li[3]/ul/li[3]/a').click()
        await $('=Donor Management').click()
        await browser.pause(2000)

        // 
        const donorName = await $('//*[@id="app"]/div/div/div/div/div[2]/main/div/div[4]/div/div/div/table/tbody/tr/td[3]/a')
        //const company =await $('//*[@id="app"]/div/div/div/div/div[2]/main/div/div[4]/div/div/div/table/tbody/tr/td[4]/a')
        //const prevPledge = await $('//table/tbody/tr[1]/td[1]/a')
        //const printReceipt = await $('[role=button]')

        await donorName.click()
        await browser.pause(3000)
        //await expect ('h1=Donor Details').toBeExisting()
        console.log(browser.getUrl())
        /*
        await prevPledge.click()
        await browser.pause(3000)
        await printReceipt.click()
        await browser.pause(3000)
        */
    })
})