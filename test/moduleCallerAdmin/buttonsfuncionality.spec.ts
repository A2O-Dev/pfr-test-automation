import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const env = process.env
describe('Login like a siteadmin', () => {
const url = env.PFR_URL + 'auth/login'
    it('login', async () => {
      await browser.url(url)
      await browser.pause(3000)
      await browser.maximizeWindow()
      await $('#username').setValue(env.CALLER_USERNAME)
      await $('#password').setValue(env.CALLER_PASSWORD)
      await $('input[type="submit"]').click()    
      await browser.pause(6000)
    })
    it('Call buttons funcionality', async () => {
      const btno_answer = await $$('[type="button"]')[3]
      const btcontacout = await $('//*[@id="callActions"]/button[3]')
      const btdisconnected = await $('//*[@id="callActions"]/button[4]')
      const btrejected = await $('//*[@id="callActions"]/button[5]')
      const btnocall = await $('//*[@id="callActions"]/button[6]')
      //const button = await $("[id='takePledgeButton']")
     // const amount = await $("[placeholder='Amount']")
      //const in_Kind_Pledge = await $("[value='1']")
      //const method = $("[value='Mail']")
      //const save_pledge = await $$('button[type="submit"]')[2]
      //const confirm = await $('aria/Submit Pledge')
      //await button.click()
     // await amount.waitForDisplayed()
      await btno_answer.click()
      await browser.pause(10000)
      await btcontacout.click()
      await browser.pause(10000)
      await btdisconnected.click()
      await browser.pause(4000)
      await browser.acceptAlert()
      await browser.pause(10000)
      await btrejected.click()
      await browser.pause(10000)
      await btnocall.click()
      await browser.pause(10000)
      await browser.acceptAlert()
      await browser.pause(4000)
      await browser.acceptAlert()
      await browser.pause(4000)      
            
    })
    
  })