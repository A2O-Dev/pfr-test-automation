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
    // Nav
    await $('//nav/div/div[2]/ul[2]/li[3]/a').click()
    await expect($('h1=Scheduled Calls')).toBeExisting()
    await browser.pause(2000)
    // Call
    const companyContactTable = await $('//table/tbody[1]/tr/td[1]')
    const nameContactTable = await $('.donorName')
    const companyContText = await companyContactTable.getText()
    const nameContText = await nameContactTable.getText()

    await browser.pause(3000)
    await $('.btn-primary').click()
    await browser.pause(3000)

    const companyCall = await $('//div[@id="donorView"]/div[1]/div[2]')
    const nameCall = await $('.donorName')

    await expect($('h1=Call')).toBeExisting()
    await expect(companyCall).toHaveText(companyContText)
    await expect(nameCall).toHaveText(nameContText)
  })

})