import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Login like a siteadmin', () => {
  //Login
  const url = env.PFR_URL + 'auth/login'
  it('login', async () => {
    await browser.url(url)
    await browser.pause(3000)
    await browser.maximizeWindow()
    await $('#username').setValue(env.CALLER_USERNAME)
    await $('#password').setValue(env.CALLER_PASSWORD)
    await $('input[type="submit"]').click()
    await browser.pause(5000)
  })

  //Call take pledge

  it('Call Save the Pledge', async () => {
    const button = await $('#takePledgeButton')
    const amount = await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/div/div/input')
    const methoddespligue = await $('//*[@id="donorInformationForm"]/div[2]/div/div[1]/div/div[1]/div[3]/select') 
    const website = await $('//*[@id="donorInformationForm"]/div[2]/div/div[1]/div/div[1]/div[3]/select/option[6]')
    const savepledge = await $('//*[@id="donorInformationForm"]/div[3]/button[2]')
    const buttonconfirm = await $('//*[@id="pledgeConfirmationLightbox"]/div/div/div/button[2]')

    await button.click()
    await browser.pause(2000)
    await amount.setValue(env.CALLER_AMOUNT)
    await methoddespligue.click()
    await browser.pause(2000)
    await website.click()
    await browser.pause(2000)
    await savepledge.click()
    await browser.pause(2000)
    await buttonconfirm.click()

  })
})
