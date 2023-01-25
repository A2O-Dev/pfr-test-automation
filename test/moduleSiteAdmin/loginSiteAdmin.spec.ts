import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Login like a caller', () => {
    const url = env.PFR_URL + 'auth/login'
    it('should have a complete UI', async () => {
      await browser.url(url)
      
      await expect($('#username')).toBeExisting()
      await expect($('#password')).toBeExisting()
    })
    it('login', async () => {
      await browser.url(url)
      await $('#username').setValue(env.SITEADMIN_USERNAME)
      await $('#password').setValue(env.SITEADMIN_PASSWORD)
      await $('input[type="submit"]').click()    
    })
  })