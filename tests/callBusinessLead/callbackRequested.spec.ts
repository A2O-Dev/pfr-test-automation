import { scheduled, login  } from '../../dictionaries/selectors/index.ts'
import { urls, credentials } from '../../dictionaries/config/index.ts'

describe('Reschedule a callback to a Donor', () => { 
    before('Login', async () => {
        await browser.url(urls.login)
        await $(login.userName).setValue(credentials.caller.username)
        await $(login.password).setValue(credentials.caller.password)
        await $(login.btnLogin).click()
        
    })

    it('Callback Requested', async () => {
        await browser.url(urls.callerFindLead)     
        const callbackRequestButton = await $(scheduled.callBackRequestButton)
        const calendar = await $(scheduled.calendar)
        await callbackRequestButton.waitForClickable()
        await callbackRequestButton.click()
        await $(calendar).waitForClickable()
        await expect(calendar).toBeExisting()
      
        
        const todayCell = await $(scheduled.todayCell)
        await todayCell.click()
        await browser.waitUntil(async () => await $(scheduled.todayButton).isExisting(), {
            timeout: 5000,
            timeoutMsg: 'The "Today" button did not appear'
          })

        const buttonSubmit = await $(scheduled.buttonSubmit)
        await buttonSubmit.click()
      })
})
