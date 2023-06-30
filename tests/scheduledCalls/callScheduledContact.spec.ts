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
    const buttonCall = await $(scheduled.buttonCall)
    
    await scheduledCallsButton.waitForClickable()
    await scheduledCallsButton.click()
    await expect($(scheduled.scheduledCallTitle)).toBeExisting()
    await expect($(scheduled.scheduledCallerTable)).toBeExisting()
    
    const companyContactTable = await $(scheduled.companyContactTable).$(scheduled.firstChildCompany)
    const nameContactTable = await $(scheduled.nameContactTable).$(scheduled.firstchildName)
    const companyContText = await companyContactTable.getText()
    const nameContText = await nameContactTable.getText()
    
    await buttonCall.waitForClickable()
    await buttonCall.click()
    await browser.waitUntil(async () => {
      return (await $(scheduled.nameCompany).isDisplayed())
    }, { timeout: 5000 })
    
    await expect($('h1=Call')).toBeExisting() 
    await expect($(scheduled.nameCompany)).toHaveTextContaining(companyContText)
    await expect($(scheduled.nameLead)).toHaveTextContaining(nameContText)
  })
})