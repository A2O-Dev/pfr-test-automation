import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Potential Duplicates Test', () => {
    const url = env.PFR_URL + 'auth/login'
    it('Potential Duplicate', async () => {
      await browser.url(url)
      await $('#username').setValue(env.SITEADMIN_USERNAME)
      await $('#password').setValue(env.SITEADMIN_PASSWORD)
      await $('input[type="submit"]').click()
      
      await browser.pause(3000)
      const Site = await $('//*[@id="navbar"]/ul[2]/li[4]/a')
      const LeadsDonors = await $('//*[@id="navbar"]/ul[2]/li[4]/ul/li[5]/a')
      const View = await $('//*[@id="donors"]/tbody/tr[1]/td[4]/button')
      const ClickHere = await $('/html/body/div/div/div[2]/div[3]/div[5]/div/div[2]/p/a')
      
      Site.click()
      await browser.pause(3000)
      LeadsDonors.click()
      await browser.pause(3000)
      View.click()
      await browser.pause(3000)
      expect(await $('h1=Donor Details')).toBeExisting()

      ClickHere.click()
      
    })
  })