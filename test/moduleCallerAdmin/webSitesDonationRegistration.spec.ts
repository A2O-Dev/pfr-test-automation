import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Login like a siteadmin', () => {
  //Login
  const url = env.PFR_URL + 'auth/login'
  it('login', async () => {
    await browser.url(url)
    await browser.pause(3000)
    await browser.maximizeWindow()
    await $('#username').setValue(env.CALLER_USERNAME1)
    await $('#password').setValue(env.CALLER_PASSWORD1)
    await $('input[type="submit"]').click()
    await browser.pause(5000)
  })

  //Call take pledge

  it('Call Save the Pledge', async () => {
    const button = await $('#takePledgeButton')
    const amount = await $('//*[@id="donorInformationForm"]/div/div/div/div/div/div/div/div/input')
    const website = await $('//*[@id="donorInformationForm"]/div[2]/div/div[1]/div/div[1]/div[3]/select/option[6]')
    const savepledge = await $('//*[@id="donorInformationForm"]/div[3]/button[2]')
    const buttonconfirm = await $('//*[@id="pledgeConfirmationLightbox"]/div/div/div/button[2]')
    const logout = await $('//*[@id="navbar"]/ul[1]/li[2]/a')

    await button.click()
    await browser.pause(2000)
    await amount.setValue(env.CALLER_AMOUNT)
    await browser.pause(2000)
    await browser.pause(2000)
    await website.click()
    await browser.pause(2000)
    await savepledge.click()
    await browser.pause(2000)
    await buttonconfirm.click()
    await logout.click()
    await browser.pause(2000)
  })

  //Login Admin

  it('Useradmin', async () => {
    await browser.url(url)
    await browser.pause(3000)
    await browser.maximizeWindow()
    await $('#username').setValue(env.SITEADMIN_USERNAME)
    await $('#password').setValue(env.SITEADMIN_PASSWORD)
    await $('input[type="submit"]').click()
    await browser.pause(3000)


  })
  // Confirm 

  it('confirm donation', async () => {
    await $('//*[@id="navbar"]/ul[2]/li[1]/a').click()
    await browser.pause(3000)
    await expect($('/html/body/div[1]/div/form/div/div[2]/table/tbody/tr[1]/td[5]/div')).toBeExisting()
    await browser.pause(3000)
    await $('//*[@id="view-pledge-146"]').click()
    await browser.pause(3000)
    await $('#driver_instructions').setValue('Prueba1')
    await browser.pause(3000)
    await $('//*[@id="confirm"]').click()
    await browser.pause(3000)
    await $('//*[@id="navbar"]/ul[1]/li[2]/a').click()
  })

  //Login call 2do

  it.only('login', async () => {
    await browser.url(url)
    await browser.pause(3000)
    await browser.maximizeWindow()
    await $('#username').setValue(env.CALLER_USERNAME1)
    await $('#password').setValue(env.CALLER_PASSWORD1)
    await $('input[type="submit"]').click()
    await browser.pause(3000)
     //verificar Caller Pledge Log
    await $('//*[@id="navbar"]/ul[2]/li[6]/a').click()
    await browser.pause(3000)
    await $('//*[@id="navbar"]/ul[2]/li[6]/ul/li[2]/a').click()
    await browser.pause(3000)
  })
})