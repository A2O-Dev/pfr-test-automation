describe('Call the scheduled contact', () => {
    it('Login', async() => {
      await browser.url('http://localhost:8181/auth/login')  
      await browser.pause(3000)
      await browser.maximizeWindow()
         
      await expect($('#username')).toBeExisting()
      await expect($('#password')).toBeExisting()
      
      await $('#username').setValue('siteadmin1')
      await $('#password').setValue('admin')
      await $('input[type="submit"]').click()
    })

    it('Call a scheduled contact', async() => {

      await $('.dropdown=Caller').click()
      await browser.pause(1000)
      await $('.dropdown').$('//nav/div/div[2]/ul[2]/li[3]/ul/li[3]').click()
      await browser.pause(2000)

      const companyContactTable = await $('//table/tbody[1]/tr/td[1]')
      const nameContactTable = await $('//table/tbody[1]/tr/td[2]')
      const btnCall = await $('//table/tbody[1]/tr/td[9]/a') 
      const companyContText = companyContactTable.getText()
      const nameContText = nameContactTable.getText()

      $(btnCall).click()

      const companyCall = await $('.nameAndCompany .company').getText()
      const nameCall = await $('.donorName').getText()   

      await expect($('h1=Call')).toBeExisting()
      expect (companyContText).toHaveTextContaining(companyCall)
      expect (nameContText).toHaveText(nameCall)    
      await browser.pause(4000)

    })
})
