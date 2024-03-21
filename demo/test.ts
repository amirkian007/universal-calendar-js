import {Calendar} from "../src/index"


const persianCalendar = new Calendar("persian");

 
// Add year 1395 to the selected years
// persianCalendar.addYear(1395);
const curretnYear = persianCalendar.getCalendarCurrentYear()

// Retrieve supported calendars
const supportedCalendars = persianCalendar.getSupportedCalanders();
console.log(persianCalendar.getCalendarCurrentYear())
console.log(persianCalendar.getCalendarCurrentMonth())
console.log(persianCalendar.getCalendarCurrentDay())

// const calendar = new Calendar('persian',['1380','1379'])
console.time('generated in :')
console.log(persianCalendar)
console.log(supportedCalendars)
console.timeEnd('generated in :')
