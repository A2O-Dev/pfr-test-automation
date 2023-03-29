import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const env = process.env
describe('Logging in to the system', () => { 
const url = env.PFR_URL + 'auth/login'

    //Login with swalter user to the system
    it('login', async () => {
      await browser.url(url)
      await browser.maximizeWindow()
      await $('#username').setValue(env.CALLER_USERNAME)
      await $('#password').setValue(env.CALLER_PASSWORD)
      await $('input[type="submit"]').click()    
      await browser.pause(6000)
    })

    //Method of payment by "Drop off"
    it('Call Save the Pledge', async () => {
      const button = await $("[id='takePledgeButton']")
      const amount = await $("[placeholder='Amount']")
      const in_Kind_Pledge = await $("[value='1']")
      const method = await $("[value='Drop off']")
      const savepledge = await $('//*[@id="donorInformationForm"]/div[3]/button[2]')
      const buttonconfirm = await $('//*[@id="pledgeConfirmationLightbox"]/div/div/div[3]/button[2]')
      await button.click()
      await amount.waitForDisplayed()
      await amount.setValue(env.CALLER_AMOUNT)
      await in_Kind_Pledge.waitForDisplayed()
      await in_Kind_Pledge.click()
      await method.waitForDisplayed()
      await method.click()
      await savepledge.click()
      await buttonconfirm.waitForDisplayed()
      await buttonconfirm.click()
    })
  })