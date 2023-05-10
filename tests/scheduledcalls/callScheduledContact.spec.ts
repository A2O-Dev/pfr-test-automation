import { scheduled, login  } from '../../dictionaries/selectors/index.ts'
import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Call the scheduled contact', () => {
  // Wait between tests
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Login
  const url = env.PFR_URL + 'auth/login'

  it('Login', async () => {
    await browser.url(url)
    await $('#username').setValue(env.CALLER_USERNAME)
    await $('#password').setValue(env.CALLER_PASSWORD)
    await $('input[type="submit"]').click()
    await browser.url(env.PFR_URL + 'caller/find-lead')
  })

  it('Wait between tests', async () => {
    await wait(3000);
  });

  // Call a scheduled contact

  it('Call a scheduled contact', async () => {
    //Nav
    const scheduledCallsButton = await $(scheduled.scheduledCallButton)
    const companyContactTable = await $(scheduled.companyContactTable)
    const nameContactTable = await $(scheduled.nameContactTable)
    const buttonCall = await $(scheduled.buttonCall)
    const companyContText = await companyContactTable.getText()
    const nameContText = await nameContactTable.getText()
    
    await scheduledCallsButton.click()
    await expect($(scheduled.scheduledCallTitle)).toBeExisting()
    await expect($(scheduled.scheduledCallerTable)).toBeExisting()
    
    buttonCall.click()
    const companyCall = await $('.nameAndCompany .company').getText()
    const nameCall = await $('.donorName').getText()

    await expect($('h1=Call')).toBeExisting()
    expect(companyContText).toHaveTextContaining(companyCall)
    expect(nameContText).toHaveText(nameCall)
  })
})