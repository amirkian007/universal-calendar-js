import { CalendarCalulator } from "./CalendarCalculator";
import CalendarCollection from "./Collection";

class Calendar extends CalendarCalulator {
  private readonly selectedYears: Array<string | number>;
  public readonly globalCalendar: CalendarCollection = new CalendarCollection();

  /**
   * constructor to create a calendar.
   */
  constructor(calendar = "gregory", years: Array<string | number> = []) {
    super(calendar);
    this.selectedYears = years;

    if (years.length === 0) {
      this.selectedYears.push(this.getCurrentYear());
    }
    this.generateSelectedYearsCalendar();
  }

  /**
   * generate calendar for the selected years
   */
  private generateSelectedYearsCalendar() {
    for (let i = 0; i < this.selectedYears.length; i++) {
      this.generateCllendarForAyear(this.selectedYears[i]);
    }
  }

  /**
   * get calendar data for a month.
   */

  public getMonthCalendar(year: string, month: string) {
    if (!this.globalCalendar[year]) {
      this.generateCllendarForAyear(year);
    }
    return this.globalCalendar[year][month];
  }
  /**
   * get calendar data for a month.
   */
  public getDate(year: string, month: string, day: string) {
    const monthCalendar = this.getMonthCalendar(year, month);
    return monthCalendar[day];
  }
  /**
   * get date data for a date.
   */
  public addYear(year: string) {
    this.generateCllendarForAyear(year);
  }
  /**
   * get supported calendars.
   */
  public getSupportedCalanders() {
    //@ts-ignore
    return Intl.supportedValuesOf("calendar");
  }
}

export default Calendar;
