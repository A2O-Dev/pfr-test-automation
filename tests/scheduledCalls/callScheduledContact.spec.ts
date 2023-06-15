import { scheduled, login  } from '../../dictionaries/selectors/index.ts'
import { urls, credentials } from '../../dictionaries/config/index.ts'

describe('Call the scheduled contact', () => {
 
  before('Login', async () => {
    await browser.url(urls.login)
    await $(login.userName).setValue(credentials.caller.username)
    await $(login.password).setValue(credentials.caller.password)
    await $(login.btnLogin).click()
    
})


  it('Call a scheduled contact', async () => {
    await browser.url(urls.callerFindLead) 
    await new Promise(resolve => setTimeout(resolve, 3000))
    const scheduledCallsButton = await $(scheduled.scheduledCallButton)
    const companyContactTable = await $(scheduled.companyContactTable)
    const nameContactTable = await $(scheduled.nameContactTable)
    const buttonCall = await $(scheduled.buttonCall)
    const companyContText = await companyContactTable.getText()
    const nameContText = await nameContactTable.getText()
    await scheduledCallsButton.waitForClickable()
    await scheduledCallsButton.click()
    await expect($(scheduled.scheduledCallTitle)).toBeExisting()
    await expect($(scheduled.scheduledCallerTable)).toBeExisting()
    await buttonCall.waitForClickable()
    await buttonCall.click()

    await browser.waitUntil(async () => {
      return (await $('.nameAndCompany .company').isDisplayed())
    }, { timeout: 5000 })

    const companyCall = await $('.nameAndCompany .company').getText()
    const nameCall = await $('.donorName').getText()
    
    await expect($('h1=Call')).toBeExisting()
    expect(companyContText).toHaveTextContaining(companyCall)
    expect(nameContText).toHaveTextContaining(nameCall)
  })
})