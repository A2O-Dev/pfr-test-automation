import { login, navigationAdmin } from '../../dictionaries/selectors/index.ts'
import * as dotenv from 'dotenv'
const envFound = dotenv.config();
const env = process.env

describe('Login like a siteadmin', () => {
  const url = env.PFR_URL + 'auth/login'
  it('verifying payment', async () => {
    await browser.url(url)
    await browser.maximizeWindow()
    const name= await $(login.userName)
    const password= await $(login.password)
    await $(name).setValue(env.SITEADMIN_USERNAME)
    await expect(name).toBeExisting()
    await $(password).setValue(env.SITEADMIN_PASSWORD)
    await expect(password).toBeExisting()
    await $(login.btnLogin).click()
    await $(navigationAdmin.confirmations).click()
  })
})