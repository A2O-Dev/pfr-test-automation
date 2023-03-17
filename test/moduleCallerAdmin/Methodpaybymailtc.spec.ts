import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const env = process.env
describe('Login like a siteadmin', () => {
    const url = env.PFR_URL + 'auth/login'
    it('should have a complete UI', async () => {
      await browser.url(url)
      
      await expect($('#username')).toBeExisting()
      await expect($('#password')).toBeExisting()
    })
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
      const button = await $('#takePledgeButton') 
      await button.click()
      await browser.pause(2000)
      await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/div/div/input').setValue(env.CALLER_AMOUNT)
      await browser.pause(2000)
      await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/div/label/input').click()
      await browser.pause(2000)
      await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/select/option[5]').click()
      await browser.pause(2000)
      await $('//*[@id="donorInformationForm"]/div/button[2]').click()
      await browser.pause(2000)
      await $('//*[@id="pledgeConfirmationLightbox"]/div/div/div/button[2]').click()
      await $('//*[@id="navbar"]/ul[1]/li[2]/a').click()
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