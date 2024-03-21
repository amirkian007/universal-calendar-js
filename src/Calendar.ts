import { CalendarCalulator } from "./CalendarCalculator";

class Calendar extends CalendarCalulator {
  private selectedYears: Array<string | number>;

  /**
   * constructor to create a calendar.
   */
  constructor(
    calendar: Intl.DateTimeFormatOptions["calendar"] = "gregory",
    years: Array<string | number> = []
  ) {
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
  private checkYearAvalibality(year: string) {
    if (!this.globalCalendar[year]) {
      this.generateCllendarForAyear(year);
    }
  }
  /**
   * get calendar data for a month.
   */
  public getYearCalendar(year: string) {
    this.checkYearAvalibality(year);
    return this.globalCalendar[year];
  }
  public getMonthCalendar(year: string, month: string) {
    return this.getYearCalendar(year)[month];
  }
  /**
   * get calendar data for a month.
   */
  public getDate(year: string, month: string, day: string) {
    return this.getMonthCalendar(year, month)[day];
  }
  /**
   * get date data for a date.
   */
  public addYear(year: string | number) {
    this.selectedYears.push(year)
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
