import { CalendarCalculator } from "./CalendarCalculator";
import { numberMap } from "./NumberMao";

class Calendar extends CalendarCalculator {
  private selectedYears: Array<number>;

  /**
   * Creates an instance of Calendar.
   * @param {Intl.DateTimeFormatOptions["calendar"]} [calendar="gregory"] - The calendar type to use. Default is "gregory".
   * @param {Array<string | number>} [years=[]] - The years to generate the calendar for. Default is an empty array.
   */
  constructor(
    calendar: Intl.DateTimeFormatOptions["calendar"] = "gregory",
    years: Array<string | number> = []
  ) {
    super(calendar);
    this.selectedYears = numberMap(years);

    if (years.length === 0) {
      this.selectedYears.push(+this.getCurrentYear());
    }
    this.generateSelectedYearsCalendar();
  }

  /**
   * Generates calendar for the selected years.
   * @private
   */
  private generateSelectedYearsCalendar() {
    for (let i = 0; i < this.selectedYears.length; i++) {
      this.generateCllendarForAyear(this.selectedYears[i]);
    }
  }
  /**
   * Checks if the calendar data for a year is available, generates if not.
   * @param {string | number} year - The year to check.
   * @private
   */
  private checkYearAvalibality(year: string | number) {
    console.log("checkYearAvalibality : ", year, !!this.globalCalendar[year]);

    if (!this.selectedYears.includes(+year)) {
      this.generateCllendarForAyear(year);
      this.selectedYears.push(+year);
    }
  }
  /**
   * Retrieves calendar data for a year.
   * @param {string} [year='currentYear'] - The year to retrieve calendar data for.
   * @returns {object} - Calendar data for the specified year.
   */
  public getYearCalendar(year: string = this.getCalendarCurrentYear()) {
    this.checkYearAvalibality(year);
    return this.globalCalendar[year];
  }
  /**
   * Retrieves calendar data for a month.
   * @param {string} [year='currentYear'] - The year of the month.
   * @param {string} [month='currentMonth'] - The month to retrieve calendar data for.
   * @returns {object} - Calendar data for the specified month.
   */
  public getMonthCalendar(
    year: string = this.getCurrentYear(),
    month: string = this.getCurrentMonth()
  ) {
    return this.getYearCalendar(year)[month];
  }
  /**
   * Retrieves calendar data for a date.
   * @param {string} [year='currentYear'] - The year of the date.
   * @param {string} [month='currentMonth'] - The month of the date.
   * @param {string} [day='currentDay'] - The day to retrieve calendar data for.
   * @returns {object} - Calendar data for the specified date.
   */
  public getDate(
    year: string = this.getCurrentYear(),
    month: string = this.getCurrentMonth(),
    day: string = this.getCurrentDay()
  ) {
    return this.getMonthCalendar(year, month)[day];
  }
  /**
   * Adds a year to the selected years and generates its calendar data.
   * @param {string | number} [year='currentYear'] - The year to add.
   */
  public addYear(year: string | number = this.getCurrentYear()) {
    this.checkYearAvalibality(year);
  }
  /**
   * returns current year calenar for a the selected calendar.
   * @returns {string} - the year in string.
   */
  public getCalendarCurrentYear() {
    return this.getCurrentYear();
  }
  /**
   * returns current month calenar for a the selected calendar.
   * @returns {string} - the year in string.
   */
  public getCalendarCurrentMonth() {
    return this.getCurrentMonth();
  }
  /**
   * returns current dat calenar for a the selected calendar.
   * @returns {string} - the year in string.
   */
  public getCalendarCurrentDay() {
    return this.getCurrentDay();
  }
  /**
   * Retrieves supported calendars.
   * @returns {Array<string>} - An array of supported calendar types.
   */
  public getSupportedCalanders() {
    //@ts-ignore
    return Intl.supportedValuesOf("calendar");
  }
}

export default Calendar;
