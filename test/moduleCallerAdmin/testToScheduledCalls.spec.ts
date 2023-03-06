import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Test to Callback Requested', () => {
    const url = env.PFR_URL + 'auth/login'
    it('login, and CallBack', async () => {
      await browser.url(url)
      await browser.maximizeWindow()
      await $('#username').setValue(env.CALLER_USERNAME)
      await $('#password').setValue(env.CALLER_PASSWORD)
      await $('input[type="submit"]').click()  
      await browser.pause(5000)
      const name = $('//*[@id="donorView"]/div[1]/div[1]')
      const callBackButton = await $('//*[@id="callbackRequestedButton"]')
      const buttonSubmit = await $('//*[@id="callbackRequestedLightbox"]/div/div/form/div[3]/button[2]')
      const date = await $('/html/body/div[2]/div[1]/div[2]/table/tbody/tr[1]/td[3]')
      const scheduledCalls = await $('//*[@id="navbar"]/ul[2]/li[3]/a')
      
      callBackButton.click()
      name.getValue()
      await browser.pause(5000)
      date.click()
      await browser.pause(5000)
      buttonSubmit.click()
      await browser.pause(5000)
      scheduledCalls.click()
      await browser.pause(5000)
      expect(name.getValue).toBeExisting()
    })
  })