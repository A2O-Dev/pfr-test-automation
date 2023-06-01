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
        await callbackRequestButton.waitForClickable()
        await callbackRequestButton.click()
        await $('.xdsoft_datetimepicker').waitForClickable()
        expect(await $('.xdsoft_datetimepicker')).toBeExisting()
      
        const today = new Date()
        const todayDate = today.getDate()
        const todayCell = await $(`td[data-date="${todayDate}"].xdsoft_today`)
        await todayCell.click()
        await browser.waitUntil(async () => await $('.xdsoft_today_button').isExisting(), {
            timeout: 5000,
            timeoutMsg: 'The "Today" button did not appear'
          })

        const buttonSubmit = await $(scheduled.buttonSubmit)
        buttonSubmit.click()
      })
})