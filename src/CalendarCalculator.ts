import CalendarCollection from "./Collection";
import CalendarFormater from "./Formater";

export class CalendarCalulator extends CalendarFormater {
  protected readonly globalCalendar: CalendarCollection = new CalendarCollection();

  constructor(calendar: Intl.DateTimeFormatOptions['calendar']) {
    super(calendar);
  }
  /**
   * generates calendar for a give year.
   */
  private generateCurrentYear() {
    this.calculateDates('before');
    this.calculateDates('after');
  }
  /**
   * Calculates year dates before a start time.
   */
  protected generateCllendarForAyear(targetYear: string | number) {
    // Convert year to a number
    targetYear = Number(targetYear);
  
    // Get the current year as a number
    const currentYear = Number(this.getCurrentYear());
  
    if (targetYear === currentYear) {
      // If the target year is the current year, calculate both clacAfter and clacBefore
      this.generateCurrentYear();
      return;
    }
  
    // Calculate the time difference in milliseconds
    const timeDifference = 86400000 * 365 * Math.abs(currentYear - targetYear);
    const targetInMilliseconds = targetYear < currentYear ? new Date().getTime() - timeDifference : new Date().getTime() + timeDifference;
  
    // Calculate clacAfter and clacBefore with the target date in milliseconds
    this.calculateDates('after', targetInMilliseconds);
    this.calculateDates('before', targetInMilliseconds);
  }
  /**
   * Calculates year dates before a start time.
   */

  private calculateDates( direction: 'before' | 'after',startTime: Date | number = new Date()) {
    let currentDate = new Date(startTime);
    currentDate.setHours(0, 0, 0, 0);
    let currentYear = this.destructIntParts(currentDate).year;
  
    const increment = direction === 'before' ? -1 : 1;
    const limit = direction === 'before' ? 380 : -380;
  
    for (let i = 0; i < Math.abs(limit); i++) {
      const dateParts = this.destructIntParts(currentDate);
      if (currentYear !== dateParts.year) break;
      currentYear = dateParts.year;
  
      this.setCalendarData(
        dateParts.year,
        dateParts.month,
        dateParts.day,
        dateParts
      );
      currentDate.setDate(currentDate.getDate() + increment);
    }
  }

  /**
   * sets data for a date
   */
  private setCalendarData(year: string, month: string, day: string, data: any) {
    this.globalCalendar[year][month][day] = data;
  }
}
