import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Potential Duplicates Test', () => {
    const url = env.PFR_URL + 'auth/login'
    const LeadsAndDonors = env.PFR_URL +'donors'
    it('Potential Duplicate - Not Found Duplicate ', async () => {     
      await browser.url(url)
      await $('#username').setValue(env.SITEADMIN_USERNAME)
      await $('#password').setValue(env.SITEADMIN_PASSWORD)
      await $('input[type="submit"]').click()
      await browser.url(LeadsAndDonors)
      await browser.pause(3000)
      
      const View = await $('//*[@id="donors"]/tbody/tr[1]/td[4]/button')
      const ClickHere = await $('=Click here')
      View.click()
      await browser.pause(3000)
      expect(await $('h1=Donor Details')).toBeExisting()
      
      ClickHere.click()
      await browser.pause(3000)
      await expect(ClickHere).toBeExisting()
      await expect($('/html/body/div/div/div[2]/div[3]/div[5]/div/div[2]/p')).toBeExisting()
    })
  })