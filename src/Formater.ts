export default class CalendarFormater {
  static formatingOptions: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    calendar: "gregory",
    numberingSystem: "latn",
  };
  formatHandeler: Intl.DateTimeFormat;

  constructor(calendar: string) {
    this.formatHandeler = new Intl.DateTimeFormat("en-US", {
      ...CalendarFormater.formatingOptions,
      ...{ calendar },
    });
  }

  destructIntParts(timeStamp: Date = new Date()) {
    const parts = this.formatHandeler.formatToParts(timeStamp);
    let result: any = {
      day: "",
      era: "",
      month: "",
      timestamp: timeStamp,
      year: "",
    };

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
