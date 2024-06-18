import CalendarCollection from "./Collection";
import CalendarFormater from "./Formater";

/**
 * Class for performing calendar calculations.
 * @extends CalendarFormatter
 */
export class CalendarCalculator extends CalendarFormater {
    /**
     * Global calendar collection.
     * @type {CalendarCollection}
     * @protected
     */
    protected readonly globalCalendar: CalendarCollection = new CalendarCollection();
  
    /**
     * Creates an instance of CalendarCalculator.
     * @param {Intl.DateTimeFormatOptions['calendar']} calendar - The calendar type to use.
     */
    constructor(calendar: Intl.DateTimeFormatOptions['calendar']) {
      super(calendar);
    }
  
    /**
     * Generates calendar for the current year.
     * @private
     */
    private calculateCurrentYear() {
      this.calculateDates('before');
      this.calculateDates('after');
    }
  
    /**
     * Generates calendar for a given year.
     * @param {string | number} targetYear - The year for which to generate the calendar.
     * @protected
     */
    protected calculateCalendarForAyear(targetYear: string | number) {

      targetYear = Number(targetYear);
      const currentYear = Number(this.getCurrentYear());
    
      if (targetYear === currentYear) {
        this.calculateCurrentYear();
        return;
      }
    
      const timeDifference = 86400000 * 365 * Math.abs(currentYear - targetYear);
      const targetInMilliseconds = targetYear < currentYear ? new Date().getTime() - timeDifference : new Date().getTime() + timeDifference;
    
      this.calculateDates('after', targetInMilliseconds);
      this.calculateDates('before', targetInMilliseconds);
    }
  
    /**
     * Calculates year dates before or after a start time.
     * @param {'before' | 'after'} direction - The direction of calculation.
     * @param {Date | number} [startTime=new Date()] - The start time for calculation.
     * @private
     */
    private calculateDates(direction: 'before' | 'after', startTime: Date | number = new Date()) {
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
     * Sets data for a date in the global calendar.
     * @param {string} year - The year of the date.
     * @param {string} month - The month of the date.
     * @param {string} day - The day of the date.
     * @param {any} data - The data to set for the date.
     * @private
     */
    private setCalendarData(year: string, month: string, day: string, data: any) {
      this.globalCalendar[year][month][day] = data;
    }
  }