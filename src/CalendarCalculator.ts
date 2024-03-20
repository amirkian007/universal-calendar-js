import CalendarCollection from "./Collection";
import CalendarFormater from "./Formater";

export class CalendarCalulator extends CalendarFormater {
  protected readonly globalCalendar: CalendarCollection =
    new CalendarCollection();
  // private readonly formatHandeler: CalendarFormater;

  constructor(calendar: string) {
    super(calendar);
    // this = new CalendarFormater(calendar)
  }

  /**
   * generates calendar for a give year.
   */
  private generateCurrentYear() {
    this.calculateAfterDate();
    this.calculateBeforeDate();
  }
  protected generateCllendarForAyear(targetYear: string | number) {
    // Convert year to a number
    targetYear = Number(targetYear);

    // Get the current year as a number
    const currentYear = Number(this.getCurrentYear());

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
        const yearInMilliseconds = +this.destructIntParts(
          new Date(targetInMilliseconds)
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
    let currentYear = this.destructIntParts(currentDate).year;

    // loop backwards from 380 days ago to today
    for (let i = 380; i > 0; i--) {
      const dateParts = this.destructIntParts(currentDate);
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
    let currentYear = this.destructIntParts(currentTime).year;

    for (let i = 0; i < 380; i++) {
      const dateParts = this.destructIntParts(currentTime);
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
}
