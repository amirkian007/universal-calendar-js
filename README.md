# universal-calendar-js

Module providing functionality to generate calendar objects for any calendar type and year fast and lightweight, without any dependencies or third-party libraries.
supported calendars :

`buddhist`, `chinese`, `coptic`, `dangi`, `ethioaa`, `ethiopic`, `gregory`, `hebrew`, `indian`, `islamic`, `islamic-civil`, `islamic-rgsa`, `islamic-tbla`, `islamic-umalqura`, `iso8601`, `japanese`, `persian`, `roc`

## Table of Contents
- [Introduction](#introduction)
- [Introduction](#example-usage)
- [Class: Calendar](#class-calendar)
  - [Constructor](#constructor)
  - [Methods](#methods)

## installation
```
npm i universal-calendar-js
```
or
```
pnpm i universal-calendar-js
```
## Example usage

```javascript
import { Calendar } from 'universal-calendar-js';

// Create a Calendar instance
const persianCalendar = new Calendar('persian',[1380,1392]);

// Get calendar data for the year 1380
const calendarDataYear1380 = persianCalendar.getYearCalendar('1380');
// result : 
// calendarDataYear1380[monthNumber][Daynumber]
// year 1380:
// {
//     month number
//     1:{
//         day number
//         1:{
//             year: "1380"
//             month:"1"
//             day:"1",
//             era:"AP"
//             timestamp: Wed Mar 21 2001 01:00:00 GMT+0330 (Iran Standard Time)
//         },
//         ...,
//     },
//     2:{
//     },
//     ...
//     12:{
//          ... days object
//     }
// }

// Get calendar data for Mordad  1380
const mordadData = persianCalendar.getMonthCalendar('1380', '5');

// Get calendar data for Mordad 18th, 2024
const mordad18ThData = persianCalendar.getDate('1380', '5', '18');

// return current date in the selected calendar. in this case persian calendar
const mordad18ThData = persianCalendar.getDate(); // currently 1403-1-2

// Add year 1395 to the selected years
persianCalendar.addYear(1395);

// Add current year to the selected years
calendar.addYear();

// return the current year in the selected calendar.
calendar.getCalendarCurrentYear();// currently 1403

calendar.getCalendarCurrentMonth();// currently 1

calendar.getCalendarCurrentDay();// currently 2

// Retrieve list supported calendars
const supportedCalendars = calendar.getSupportedCalendars();
```

## Class: Calendar

### Constructor

#### `constructor(calendar, years)`

Creates an instance of Calendar.

- `calendar` (optional): The calendar type to use. Default is "gregory".
- `years` (optional): The years to generate the calendar for. Default is an empty array which means current year.

### Methods

#### `getYearCalendar(year: string = 'current') → object`
- `year`: The year to retrieve calendar data for. defaults to current year in the selected calendar.

Retrieves calendar data for a year.defaults to current year.


#### `getMonthCalendar(year: string  = 'current', month: string  = 'current') → object`
- `year`: The year of the month.
- `month`: The month to retrieve calendar data for.

Retrieves calendar data for a month. defaults to current month.


#### `getDate(year: string = 'current', month: string = 'current', day: string = 'current') → object`
- `year`: The year of the date. 
- `month`: The month of the date.  
- `day`: The day to retrieve calendar data for.

Retrieves calendar data for a date. defaults to current date.


#### `addYear(year: string | number = 'current')`
- `year`: The year to add.

Adds a year to the selected years and generates its calendar data. defaults to current year.


#### `getCalendarcurrent() → string`

returns current year calenar for a the selected calendar

#### `getCalendarCurrentMonth() → string`

returns current month calenar for a the selected calendar

#### `getCalendarCurrentDay() → string`

returns current day calenar for a the selected calendar

#### `getSupportedCalendars() → Array<string>`

Retrieves supported calendars.
