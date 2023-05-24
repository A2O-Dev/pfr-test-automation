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
        const callbackRequestButton = await $(scheduled.callBackRequestButton);
        await callbackRequestButton.click()
        await browser.waitUntil(async () => await $('.xdsoft_datetimepicker').isExisting(), {
            timeout: 5000,
            timeoutMsg: 'La ventana emergente de selección de fecha no apareció'
          })

        const today = new Date()
        const todayDate = today.getDate()
        const todayCell = await $(`td[data-date="${todayDate}"].xdsoft_today`)
        await todayCell.click()
        await browser.waitUntil(async () => await $('.xdsoft_today_button').isExisting(), {
            timeout: 5000,
            timeoutMsg: 'El botón "Hoy" no apareció'
          })

        const buttonSubmit = await $(scheduled.buttonSubmit)
        buttonSubmit.click()
      })
})