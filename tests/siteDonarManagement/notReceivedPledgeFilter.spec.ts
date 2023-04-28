import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Not received Pledge filter test', () => {
    const url = env.PFR_URL + 'auth/login'
    const donorManagementUrl = env.PFR_URL +'donor-management'
    it('filter test', async () => {
        await browser.url(url)
        await $('#username').setValue(env.SITEADMIN_USERNAME)
        await $('#password').setValue(env.SITEADMIN_PASSWORD)
        await $('input[type="submit"]').click()
        await browser.url(donorManagementUrl)
        

        const pledgeCriterialLink = await $('.q-item__label=Pledge Criteria')
        const selectYesElement =await $('//*[@id="app"]/div/div/div/div/div[2]/main/div/div[2]/div/div[3]/div/div[2]/div/div[4]/div[2]/div/div[2]')        
        const selectNoElement =await $('//*[@id="app"]/div/div/div/div/div[2]/main/div/div[2]/div/div[3]/div/div[2]/div/div[4]/div[3]/div/div[2]')
        const searchButton =await $('//*[@id="app"]/div/div/div/div/div[2]/main/div/div[2]/div/div[3]/div/div[2]/div/div[5]/button')

        pledgeCriterialLink.click()
        await browser.pause(3000)

        ///when the filter is yes

        selectYesElement.click()
        await browser.pause(3000)
        searchButton.click()
        await browser.pause(3000)
        
        const tableRowsYes = await $('table.q-table tbody').$$('tr').length
        for (let index = 1; index <= tableRowsYes ; index++) {
            expect($(`//*[@id="app"]/div/div/div/div/div[2]/main/div/div[4]/div/div/div[1]/table/tbody/tr[${index}]/td[7]`)).not.toBeNull()            
        }

        /// when the filter is no

        selectNoElement.click()
        await browser.pause(3000)
        searchButton.click()
        await browser.pause(3000)

        //the objective is compare the dates of the lastpledge with last donation for verify if the donor have a pledge pendient

        const tableRowsNo = await $('table.q-table tbody').$$('tr').length
        for (let index = 1; index <= tableRowsNo; index++) {
            const lastPledge = new Date(await $(`//*[@id="app"]/div/div/div/div/div[2]/main/div/div[4]/div/div/div[1]/table/tbody/tr[${index}]/td[6]`).getValue()) 
            const lastDonation = new Date(await $(`//*[@id="app"]/div/div/div/div/div[2]/main/div/div[4]/div/div/div[1]/table/tbody/tr[${index}]/td[9]`).getValue())  
            const diff = (lastDonation.getTime() - lastPledge.getTime()) / (86400000)
            const result = diff <= 0 ? 'pass' : 'fail'   
            expect(result).toHaveTextContaining('pass')   
        }       
    })
})