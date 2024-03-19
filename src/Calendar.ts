import CalendarCollection from "./Collection";
import { destructParts } from "./destructParts";

class Calendar {
    
  private readonly formatter: Intl.DateTimeFormat;
  private readonly selectedYears: Array<string | number>;
  public readonly timeZone: string;
  public readonly globalCalendar: CalendarCollection = new CalendarCollection();

  /**
   * constructor to create a calendar.
   */
  constructor(calendar = "gregory", years: Array<string | number> = []) {
    this.selectedYears = years;
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      calendar,
      numberingSystem: "latn",
    });

    if (years.length === 0) {
      this.selectedYears.push(this.formateDate().year);
    }

    for (let i = 0; i < years.length; i++) {
      this.generateCllendarForAyear(years[i]);
    }
    
  }
  /**
   * Calculates year dates for the current yaer.
   */
  private generateCurrentYear() {
    this.calculateAfterDate();
    this.calculateBeforeDate();
  }
  /**
   * generates calendar for a give year.
   */
  private generateCllendarForAyear(targetYear: string | number) {
    // Convert year to a number
    targetYear = Number(targetYear);

    // Get the current year as a number
    const currentYear = Number(
      destructParts(this.formatter.formatToParts(new Date())).year
    );

    // Check if the target year is the current year
    if (targetYear === currentYear) {
      // If the target year is the current year, calculate both clacAfter and clacBefore
      this.generateCurrentYear();
    } else {
      let timeDifference = 0;
      let targetInMilliseconds = 0;

      // Check if the target year is earlier than the current year
      if (targetYear < currentYear) {
        // Calculate the time difference in milliseconds
        timeDifference = 86400000 * 365 * (currentYear - targetYear);
        targetInMilliseconds = new Date().getTime() - timeDifference;
      } else {
        // Calculate the time difference in milliseconds
        timeDifference = 86400000 * 365 * (targetYear - currentYear);
        targetInMilliseconds = new Date().getTime() + timeDifference;
      }

      const delta = 356;
      for (let i = 2; i < 10; i++) {
        // Get the year as a number from the date in milliseconds
        const yearInMilliseconds = Number(
          destructParts(
            this.formatter.formatToParts(new Date(targetInMilliseconds))
          ).year
        );
        // Check if the year in milliseconds is equal to the target year
        if (yearInMilliseconds === targetYear) {
          break;
        }

        // Check if the year in milliseconds is greater than the target year
        if (yearInMilliseconds > targetYear) {
          targetInMilliseconds = targetInMilliseconds - 86400000 * (delta / i);
        } else if (yearInMilliseconds < targetYear) {
          // Check if the year in milliseconds is less than the target year
          targetInMilliseconds = targetInMilliseconds + 86400000 * (delta / i);
        }
      }
      // Calculate clacAfter and clacBefore with the target date in milliseconds
      this.calculateAfterDate(targetInMilliseconds);
      this.calculateBeforeDate(targetInMilliseconds);
    }
  }
  /**
   * Calculates year dates before a start time.
   */
  private calculateBeforeDate(startTime: Date | number = new Date()) {
    // set the current time to the start of the day (midnight)
    let currentDate = new Date(startTime);
    currentDate.setHours(0, 0, 0, 0);
    let currentYear = this.formateDate(currentDate).year;

    // loop backwards from 380 days ago to today
    for (let i = 380; i > 0; i--) {
      const dateParts = this.formateDate(currentDate);
      if (currentYear != dateParts.year) break; // stop when year changes
      currentYear = dateParts.year;
      // initialize year, month, and day in the globalCalendar object if they don't exist

      this.setCalendarData(
        dateParts.year,
        dateParts.month,
        dateParts.day,
        dateParts
      );
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }
  /**
   * Calculates year dates after a start time.
   */
  private calculateAfterDate(startTime: Date | number = new Date()) {
    let currentTime = new Date(startTime);
    currentTime.setHours(0, 0, 0, 0);
    let currentYear = this.formateDate(currentTime).year;

    for (let i = 0; i < 380; i++) {
      const dateParts = this.formateDate(currentTime);
      if (currentYear !== dateParts.year) break;
      currentYear = dateParts.year;

      this.setCalendarData(
        dateParts.year,
        dateParts.month,
        dateParts.day,
        dateParts
      );
      currentTime.setDate(currentTime.getDate() + 1);
    }
  }
  /**
   * sets data for a date
   */
  private setCalendarData(year: string, month: string, day: string, data: any) {
    this.globalCalendar[year][month][day] = data;
  }
  /**
   * formats date to information parts.
   */
  public formateDate(date: Date | number = new Date()) {
    return {
      ...destructParts(this.formatter.formatToParts(date)),
      ...{ timestamp: new Date(date) },
    };
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
