// Import the Calendar class
const Calendar = require('./Calendar');

// Test case for creating a calendar with default values
test('Create calendar with default values', () => {
  const calendar = new Calendar();
  expect(calendar).toBeDefined();
});

// Test case for creating a calendar with specific calendar type and years
test('Create calendar with specific calendar type and years', () => {
  const calendar = new Calendar('gregory', [2022, 2023]);
  expect(calendar).toBeDefined();
});

// Test case for getting the current date
test('Get current date', () => {
  const calendar = new Calendar();
  const currentDate = calendar.getCurrentDate();
  expect(currentDate).toBeDefined();
  expect(currentDate.year).toBeDefined();
  expect(currentDate.month).toBeDefined();
  expect(currentDate.day).toBeDefined();
});

// Test case for getting the calendar of a specific year
test('Get calendar for a specific year', () => {
  const calendar = new Calendar();
  const year = 2022;
  const calendarOfYear = calendar.getCalendarForYear(year);
  expect(calendarOfYear).toBeDefined();
});

// Test case for getting the calendar of a specific month of a specific year
test('Get calendar for a specific month of a specific year', () => {
  const calendar = new Calendar();
  const year = 2022;
  const month = 1; // January
  const calendarOfMonth = calendar.getCalendarOfMonth(year, month);
  expect(calendarOfMonth).toBeDefined();
});

// Test case for getting the UTC timestamp of a specific date in the calendar
test('Get UTC timestamp of a specific date in the calendar', () => {
  const calendar = new Calendar();
  const year = 2022;
  const month = 1; // January
  const day = 1;
  const dateUTC = calendar.getDateUTC(year, month, day);
  expect(dateUTC).toBeDefined();
});

// Test case for generating a calendar for a specific year
test('Generate calendar for a specific year', () => {
  const calendar = new Calendar();
  const year = 2022;
  calendar.generateYear(year);
  const calendarOfYear = calendar.getCalendarForYear(year);
  expect(calendarOfYear).toBeDefined();
});

// Test case for getting the list of supported calendars
test('Get list of supported calendars', () => {
  const calendar = new Calendar();
  const supportedCalendars = calendar.getSupportedCalanders();
  expect(supportedCalendars).toBeDefined();
  expect(Array.isArray(supportedCalendars)).toBe(true);
});