export default class CalendarFormater {
  private static _formatingOptionsInit: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    calendar: "gregory",
    numberingSystem: "latn",
  };
  formatHandeler: Intl.DateTimeFormat;

  constructor(calendar: Intl.DateTimeFormatOptions["calendar"]) {
    this.formatHandeler = new Intl.DateTimeFormat("en-US", {
      ...CalendarFormater._formatingOptionsInit,
      ...{ calendar },
    });
  }

  protected destructIntParts(timeStamp: Date = new Date()) {
    const parts = this.formatHandeler.formatToParts(timeStamp);
    interface foramtResult {
      day: string;
      era: string;
      month: string;
      timestamp: Date;
      year: string;
      [key: string]: any;
    }

    let result: foramtResult = {
      day: "",
      era: "",
      month: "",
      timestamp: new Date(timeStamp),
      year: "",
    } as const;

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type !== "literal") {
        result[parts[i].type] = parts[i].value;
      }
    }

    return result;
  }

  protected getCurrentYear() {
    return this.destructIntParts().year;
  }
}
