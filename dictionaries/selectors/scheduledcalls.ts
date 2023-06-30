const today = new Date()
const todayDate = today.getDate()
export const scheduled = {
    companyContactTable  :'#donors tbody tr:first-child',
    firstChildCompany    :'td:nth-child(1)',
    nameContactTable     :'#donors tbody tr:first-child',
    firstchildName       :'td:nth-child(2)',
    nameCompany          :'.nameAndCompany .company',
    nameLead             :'.donorName',
    buttonCall           :'=Call',
    scheduledCallButton  :'a[href="/caller/scheduled-calls"]',
    scheduledCallTitle   :'h1=Scheduled Calls',
    scheduledCallerTable :'#donors',
    callBackRequestButton:'#callbackRequestedButton',
    buttonSubmit         :'.btn-primary=Submit',   
    calendar             :'.xdsoft_datetimepicker',
    todayCell            :`td[data-date="${todayDate}"].xdsoft_today`,
    todayButton          :'.xdsoft_today_button'

}