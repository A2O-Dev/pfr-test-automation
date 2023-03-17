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

    // Call Take Pledge
    

})