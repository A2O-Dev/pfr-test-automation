import { login, scheduled } from '../../dictionaries/selectors/index.ts'
import * as dotenv from 'dotenv'
import { menuadmin, navegationadmin } from '../../dictionaries/selectors/navegationadmin.js';

const envFound = dotenv.config();
const env = process.env

describe('Login like a siteadmin', () => {
  const url = env.PFR_URL + 'auth/login'
  it('verifying payment', async () => {
    await browser.url(url)
    await browser.maximizeWindow()
    await $(login.userName).setValue(env.SITEADMIN_USERNAME)
    await $(login.password).setValue(env.SITEADMIN_PASSWORD)
    await $(login.btnLogin).click()
    await $(navegationadmin.menuConfirm).click()
  })
  
})