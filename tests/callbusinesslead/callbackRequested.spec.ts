import { scheduled, login  } from '../../dictionaries/selectors/index.ts'
import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Reschedule a callback to a Donor', () => {
    // Wait between tests
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Login
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

    // Callback Requested

    it('Callback Requested', async () => {
        const callbackRequestButton = await $(scheduled.callBackRequestButton);
        await callbackRequestButton.click()
        await browser.waitUntil(async () => await $('.xdsoft_datetimepicker').isExisting(), {
            timeout: 5000,
            timeoutMsg: 'La ventana emergente de selección de fecha no apareció'
          })
      
        // Seleccionar y hacer clic en la fecha de hoy
        const today = new Date()
        const todayDate = today.getDate()
        const todayCell = await $(`td[data-date="${todayDate}"].xdsoft_today`)
        await todayCell.click()
        await browser.waitUntil(async () => await $('.xdsoft_today_button').isExisting(), {
            timeout: 5000,
            timeoutMsg: 'El botón "Hoy" no apareció'
          })

        // Click en el boton submit
        const buttonSubmit = await $(scheduled.buttonSubmit)
        buttonSubmit.click()          
      })     
})
//await expect ($('.btn-primary')).toBeExisting()
        //await browser.pause(5000)
        // Callback Time
        
        //await expect ($('.xdsoft_next')).toBeExisting()
        //await expect($('.xdsoft_day_of_week6')).toBeExisting()
        //await browser.pause(3000)
        //await expect($('.btn-primary=Submit')).toBeExisting()
        //await browser.pause(3000)