export default class CalendarFormater {
    
  private static _formatingOptionsInit: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    calendar: "gregory",
    numberingSystem: "latn",
  };
  formatHandeler: Intl.DateTimeFormat;

  constructor(calendar: Intl.DateTimeFormatOptions['calendar']) {
    this.formatHandeler = new Intl.DateTimeFormat("en-US", {
      ...CalendarFormater._formatingOptionsInit,
      ...{ calendar },
    });
  }

  destructIntParts(timeStamp: Date = new Date()) {

    const parts = this.formatHandeler.formatToParts(timeStamp);

    let result = {
      day: "",
      era: "",
      month: "",
      timestamp: timeStamp,
      year: "",
    } as any

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type !== "literal") {
        result[parts[i].type] = parts[i].value;
      }
    }

    return result;
  }

  getCurrentYear() {
    return this.destructIntParts().year;
  }
}
