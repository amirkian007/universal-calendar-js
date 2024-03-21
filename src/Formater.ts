/**
 * Class for formatting calendar dates.
 */
export default class CalendarFormatter {
    private static _formattingOptionsInit: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      calendar: "gregory",
      numberingSystem: "latn",
    };
    formatHandler: Intl.DateTimeFormat;
  
    /**
     * Creates an instance of CalendarFormatter.
     * @param {Intl.DateTimeFormatOptions["calendar"]} calendar - The calendar type to use.
     */
    constructor(calendar: Intl.DateTimeFormatOptions["calendar"]) {
      this.formatHandler = new Intl.DateTimeFormat("en-US", {
        ...CalendarFormatter._formattingOptionsInit,
        ...{ calendar },
      });
    }
  
    /**
     * Destructs the formatted timestamp into its parts.
     * @param {Date} [timestamp=new Date()] - The timestamp to destructure.
     * @returns {object} - An object containing the destructured parts of the timestamp.
     */
    protected destructIntParts(timestamp: Date = new Date()) {
      const parts = this.formatHandler.formatToParts(timestamp);
  
      interface FormatResult {
        day: string;
        era: string;
        month: string;
        timestamp: Date;
        year: string;
        [key: string]: any;
      }
  
      let result: FormatResult = {
        day: "",
        era: "",
        month: "",
        timestamp: new Date(timestamp),
        year: "",
      } as const;
  
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].type !== "literal") {
          result[parts[i].type] = parts[i].value;
        }
      }
  
      return result;
    }
  
    /**
     * Retrieves the current year from the formatted timestamp.
     * @returns {string} - The current year.
     */
    protected getCurrentYear() {
      return this.destructIntParts().year;
    }
  
    /**
     * Retrieves the current month from the formatted timestamp.
     * @returns {string} - The current month.
     */
    protected getCurrentMonth() {
      return this.destructIntParts().month;
    }
  
    /**
     * Retrieves the current day from the formatted timestamp.
     * @returns {string} - The current day.
     */
    protected getCurrentDay() {
      return this.destructIntParts().day;
    }
  }
  