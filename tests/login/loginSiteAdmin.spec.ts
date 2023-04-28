import { login } from '../../dictionaries/selectors/index.ts'
import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

describe('Login like a siteadmin', () => {
  // Login
  const url = env.PFR_URL + 'auth/login'

  it('Login', async () => {
    await browser.url(url)
    await browser.maximizeWindow()
    const name = await $(login.userName)
    const password = await $(login.password)
    await $(name).setValue(env.SITEADMIN_USERNAME)
    await $(password).setValue(env.SITEADMIN_PASSWORD)
    await $(login.btnLogin).click()
  })
})  