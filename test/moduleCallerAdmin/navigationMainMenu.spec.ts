import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Navigation test in the main menu of a Caller user', () => {
    // Login
    const url = env.PFR_URL + 'auth/login'

    it('Login', async () => {
        await browser.url(url)
        await browser.pause(3000)
        await browser.maximizeWindow()
        await $('#username').setValue(env.CALLER_USERNAME)
        await $('#password').setValue(env.CALLER_PASSWORD)
        await $('input[type="submit"]').click()
        await browser.pause(4000)
    })
    it('Navigation in the main menu', async () => {

        const busLead = await $('a[href="/caller/find-business-lead"]')
        const resLead = await $('a[href="/caller/find-residential-lead"]')
        const scheduledCalls = await $('a[href="/caller/scheduled-calls"]')
        const donors = await $('a[href="/caller/donors"]')
        const resets = await $('a[href="/caller/resets"]')
        const reports = await $('=Reports')
        const reportsDonation = await $('a[href="/reports/caller-donation-log"]')
        const reportsPledge = await $('a[href="/reports/caller-pledge-log"]')

        // Res. Lead
        await resLead.click()
        await browser.pause(3000)

        const titleResLead = await $('h1=Residential Leads')
        const inputSearch = await $('#menu-input-text')
        const buttonSearch = await $('.btn-default')

        await expect(browser).toHaveUrl(env.PFR_URL + 'caller/find-residential-lead')
        await expect(titleResLead).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

        // Scheduled Calls
        await scheduledCalls.click()
        await browser.pause(3000)

        const titleScheduled = await $('h1=Scheduled Calls')

        await expect(browser).toHaveUrl(env.PFR_URL + 'caller/scheduled-calls')
        await expect(titleScheduled).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

        // Donors
        await donors.click()
        await browser.pause(3000)

        const titleDonors = await $('h1=Donors')

        await expect(browser).toHaveUrl(env.PFR_URL + 'caller/donors')
        await expect(titleDonors).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

        // Resets
        await resets.click()
        await browser.pause(3000)

        const titleResets = await $('h1=Resets')

        await expect(browser).toHaveUrl(env.PFR_URL + 'caller/resets')
        await expect(titleResets).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

        // Reports
        await reports.click()
        await browser.pause(3000)
        await expect(reportsDonation).toBeExisting()
        await expect(reportsPledge).toBeExisting()

        // Donation Log
        await reportsDonation.click()
        await browser.pause(3000)

        const titleDonationLog = await $('h1=Caller Donation Log')

        await expect(browser).toHaveUrl(env.PFR_URL + 'reports/caller-donation-log/6')
        await expect(titleDonationLog).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

        // Pledge Log
        await reports.click()
        await browser.pause(3000)
        await reportsPledge.click()
        await browser.pause(3000)

        const titlePledgeLog = await $('h1=Caller Pledge Log')

        await expect(browser).toHaveUrl(env.PFR_URL + 'reports/caller-pledge-log/6')
        await expect(titlePledgeLog).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

        // Bus. Lead
        await busLead.click()
        await browser.pause(4000)

        const titleBusLead = await $('h1=Call')

        await expect(browser).toHaveUrl(env.PFR_URL + 'caller/find-business-lead')
        await expect(titleBusLead).toBeExisting()
        await expect(inputSearch).toBeExisting()
        await expect(buttonSearch).toBeExisting()

    })
})