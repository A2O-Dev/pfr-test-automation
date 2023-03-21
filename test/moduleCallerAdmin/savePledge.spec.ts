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
      await browser.pause(5000)
    })
    it('Call Save the Pledge', async () => {
      //await expect($('#takePledgeButton')).toBeExisting()
      const button = await $('#takePledgeButton') 
      const amount = await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/div/div/input')
      const in_Kind_Pledge = await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/div/label/input')
      const method = await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/select/option[4]')
      const savepledge = await $('//*[@id="donorInformationForm"]/div/button[2]')
      const buttonconfirm = await $('//*[@id="pledgeConfirmationLightbox"]/div/div/div/button[2]')
      const logout = await $('//*[@id="navbar"]/ul[1]/li[2]/a')
      await button.click()
      await browser.pause(2000)
      await amount.setValue(env.CALLER_AMOUNT)
      await browser.pause(2000)
      await in_Kind_Pledge.click()
      await browser.pause(2000)
      await method.click()
      await browser.pause(2000)
      await savepledge.click()
      await browser.pause(2000)
      await buttonconfirm.click()
      await logout.click()
      await browser.pause(2000)
    })
    it('Useradmin', async () => {
      await browser.url(url)
      await browser.pause(3000)
      await browser.maximizeWindow()
      await $('#username').setValue(env.SITEADMIN_USERNAME)
      await $('#password').setValue(env.SITEADMIN_PASSWORD)
      await $('input[type="submit"]').click()    
      await browser.pause(5000)
      await $('//*[@id="navbar"]/ul[2]/li[1]/a').click() 
      await browser.pause(5000)
    })
  })