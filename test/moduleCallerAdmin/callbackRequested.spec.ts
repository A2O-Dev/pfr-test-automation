import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Reschedule a callback to a Donor', () => {
    // Login
    const url = env.PFR_URL + 'auth/login'

    it('Login', async () => {
        await browser.url(url)
        await browser.pause(3000)
        await browser.maximizeWindow()
        await $('#username').setValue(env.CALLER_USERNAME)
        await $('#password').setValue(env.CALLER_PASSWORD)
        await $('input[type="submit"]').click()
        await browser.pause(3000)
    })

    // Callback Requested

    it('Callback Requested', async () => {
        await $('//nav/div/div[2]/ul[2]/li[3]/a').click()
        await expect($('h1=Scheduled Calls')).toBeExisting()
        await browser.pause(2000)
        // Call
        await $('.btn-primary').click()
        await browser.pause(5000)
        // Callback Time
        await $('#callbackRequestedButton').click()
        await browser.pause(3000)
        await $('.xdsoft_next').click()
        await $('.xdsoft_day_of_week6').click()
        await browser.pause(3000)
        await $('.btn-primary=Submit').click()
        await browser.pause(3000)
        await expect($('h1=Scheduled Calls')).toBeExisting()
        await browser.pause(2000)
    })
})