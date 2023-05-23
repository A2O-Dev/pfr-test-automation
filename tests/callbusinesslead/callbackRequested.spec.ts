import { scheduled, login  } from '../../dictionaries/selectors/index.ts'
import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Reschedule a callback to a Donor', () => {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const url = env.PFR_URL + 'auth/login'

    it('Login', async () => {
        await browser.url(url)
        await $(login.userName).setValue(env.CALLER_USERNAME)
        await $(login.password).setValue(env.CALLER_PASSWORD)
        await $(login.btnLogin).click()
        await browser.url(env.PFR_URL + 'caller/find-lead')
    })

    it('Wait between tests', async () => {
        await wait(3000);
    })

    it('Callback Requested', async () => {
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