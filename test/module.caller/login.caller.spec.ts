import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Login like a caller', () => {
    it('should have a complete UI', async () => {
      await browser.url(env.PFR_URL_LOCAL)
      
      await expect($('#username')).toBeExisting()
      await expect($('#password')).toBeExisting()
    })
    it('loging', async () => {
      await browser.url(env.PFR_URL_LOCAL)
      await $('#username').setValue(env.CALLER_USERNAME)
      await $('#password').setValue(env.CALLER_PASSWORD)
      await $('input[type="submit"]').click()    
    })
  })