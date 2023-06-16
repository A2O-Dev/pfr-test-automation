import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const env = process.env
describe('Login like a siteadmin', () => {
const url = env.PFR_URL + 'auth/login'
    
  //Logging in as Caller user
  it('login', async () => {
    await browser.url(url)
    await browser.pause(3000)
    await browser.maximizeWindow()
    await $('#username').setValue(env.CALLER_USERNAME)
    await $('#password').setValue(env.CALLER_PASSWORD)
    await $('input[type="submit"]').click()    
    await browser.pause(6000)
  })

  //Call buttons funcionality
  it('No answer button', async () => {
    const btno_answer = await $$('[type="button"]')[4]
    await btno_answer.click() 
  })

  it('Contact Out button', async () => {
    const btcontacout = await $$('[type="button"]')[5]
    await btcontacout.click()            
  })

  it('Disconnected button', async () => {
    const btdisconnected = await $$('[type="button"]')[6]
    
    await btdisconnected.click()
    await browser.acceptAlert()
  })

  it('Turned Down button', async () => {
    const btrejected = await $$('[type="button"]')[7]
    await btrejected.click()
  })

 /* it('Do Not Call List button', async () => {
    const btnocall = await $$('[type="button"]')[8]
    await btnocall.click()
    await browser.acceptAlert()
    await browser.pause(1000)
    await browser.acceptAlert()    
  })*/

})