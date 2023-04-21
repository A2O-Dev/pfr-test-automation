// @ts-ignore
import { selectors } from '../dictionaries/selectors.ts'
import * as dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const env = process.env
describe('Login like a siteadmin', () => {
  const url = env.PFR_URL + 'auth/login'
  it('should have a complete UI', async () => {
    await browser.url(url)
    await browser.maximizeWindow()
    await expect($(selectors.userName)).toBeExisting()
    await expect($(selectors.password)).toBeExisting()
  })
  it('login', async () => {
    await browser.url(url)

    await $(selectors.userName).setValue(env.SITEADMIN_USERNAME)
    await $(selectors.password).setValue(env.SITEADMIN_PASSWORD)
    await $(selectors.btnLogin).click()
  })
})