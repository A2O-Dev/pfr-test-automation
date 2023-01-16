describe('Login like a caller', () => {
    it('should have a complete UI', async () => {
      await browser.url('http://15.229.7.239/auth/login')
      
      await expect($('#username')).toBeExisting()
      await expect($('#password')).toBeExisting()
    })
    it('loging', async () => {
      await browser.url('http://15.229.7.239/auth/login')
  
      await $('#username').setValue('swalter')
      await $('#password').setValue('admin')
      await $('input[type="submit"]').click()
  
      //await expect($('.wpcf7-response-output')).toBeExisting()
      //await expect($('.wpcf7-response-output')).toHaveTextContaining('Thank you for your message. It has been sent.')
    })
  })