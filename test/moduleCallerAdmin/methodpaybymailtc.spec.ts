import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const env = process.env
describe('Login like a siteadmin', () => {
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

    //Method of payment by "Mail"
    it('Call Save the Pledge', async () => {
      const button = await $("[id='takePledgeButton']")
      const amount = await $("[placeholder='Amount']")
      const in_Kind_Pledge = await $("[value='1']")
      const method = $("[value='Mail']")
      const save_pledge = await $$('button[type="submit"]')[2]
      const confirm = await $('aria/Submit Pledge')
      await button.click()
      await amount.waitForDisplayed()
      await amount.setValue(env.CALLER_AMOUNT)
      await in_Kind_Pledge.waitForDisplayed()
      await in_Kind_Pledge.click()
      await method.waitForDisplayed()
      await method.click()
      await save_pledge.click()
      await confirm.waitForDisplayed()
      await confirm.click()
    })
  })