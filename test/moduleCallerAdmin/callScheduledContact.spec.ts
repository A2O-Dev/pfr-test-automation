import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Call the scheduled contact', () => {
  // Login
  const url = env.PFR_URL + 'auth/login'

  it('Login', async () => {
    await browser.url(url)
    await browser.pause(3000)
    await $('#username').setValue(env.SITEADMIN_USERNAME)
    await $('#password').setValue(env.SITEADMIN_PASSWORD)
    await $('input[type="submit"]').click()
  })

  // Call a scheduled contact

  it('Call a scheduled contact', async () => {
    //Nav
    await $('.dropdown=Caller').click()
    await browser.pause(1000)
    await $('.dropdown').$('//nav/div/div[2]/ul[2]/li[3]/ul/li[3]').click()
    await browser.pause(2000)

    const companyContactTable = await $('//table/tbody[1]/tr/td[1]')
    const nameContactTable = await $('//table/tbody[1]/tr/td[2]')
    const btnCall = await $('//table/tbody[1]/tr/td[9]/a')
    const companyContText = companyContactTable.getText()
    const nameContText = nameContactTable.getText()

    $(btnCall).click()

    const companyCall = await $('.nameAndCompany .company').getText()
    const nameCall = await $('.donorName').getText()

    await expect($('h1=Call')).toBeExisting()
    expect(companyContText).toHaveTextContaining(companyCall)
    expect(nameContText).toHaveText(nameCall)
    await browser.pause(3000)

  })
})