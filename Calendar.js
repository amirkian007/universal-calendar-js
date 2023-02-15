class Calendar {
    #formatter;
    /**
    * constructor to create a calendar.
    * @param {Array} calendar calendar type to generate dafaults to gregory.
    * @param {Array} years years to generate a calendar for - defaults to current year.
    */
    constructor(calendar = 'gregory', years = []) {
        this.globalCalendar = {};
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.#formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            calendar: calendar,
            numberingSystem: 'latn'
        });
        if (years.length === 0) {
            years.push(this.getCurrentDate().year)
        }
        for (let i = 0; i < years.length; i++) {
            this.#getCalendarForYear(years[i]);
        }
    }
    /**
    * Destructs parts of a date into an object of year, month, and day.
    * @param {Array} parts The parts of a date to destruct.
    * @returns {Object} An object with year, month, and day properties.
    */
    #destructParts(parts) {
        let result = {};
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].type !== 'literal') {
                result[parts[i].type] = parts[i].value;
            }
        }
        return result;
    }
    /**
      * Calculates dates after a start time.
      * @param {Date} startTime The start time to calculate from (defaults to current date).
      */
    #calculateAfter(startTime = new Date()) {
        let currentTime = new Date(startTime).setHours(0, 0, 0, 0);
        let year = this.#destructParts(this.#formatter.formatToParts(currentTime)).year;
        for (let i = 0; i < 380; i++) {
            const date = this.#destructParts(this.#formatter.formatToParts(currentTime));
            if (year !== date.year) break;
            year = date.year;
            this.globalCalendar[date.year] = this.globalCalendar[date.year] || {};
            this.globalCalendar[date.year][date.month] = this.globalCalendar[date.year][date.month] || {};
            this.globalCalendar[date.year][date.month][date.day] = this.globalCalendar[date.year][date.month][date.day] || currentTime;
            currentTime += 86400000;
        }
    }
    /**
     * function to calculate time before a given start time
     * @param {Date} startTime The start time to calculate from (defaults to current date).
     */
    #calculateBefore(startTime = new Date()) {
        // set the current time to the start of the day (midnight)
        let currentDate = new Date(startTime);
        currentDate.setHours(0, 0, 0, 0);
        let currentYear = this.#destructParts(this.#formatter.formatToParts(currentDate)).year;

        // loop backwards from 380 days ago to today
        for (let i = 380; i > 0; i--) {
            const dateParts = this.#destructParts(this.#formatter.formatToParts(currentDate));
            if (currentYear != dateParts.year) break; // stop when year changes
            currentYear = dateParts.year;
            // initialize year, month, and day in the globalCalendar object if they don't exist
            this.globalCalendar[dateParts.year] = this.globalCalendar[dateParts.year] || {};
            this.globalCalendar[dateParts.year][dateParts.month] = this.globalCalendar[dateParts.year][dateParts.month] || {};
            this.globalCalendar[dateParts.year][dateParts.month][dateParts.day] = {...dateParts,...{timestamp : new Date(currentDate).getTime()}};
            currentDate.setDate(currentDate.getDate() - 1);
        }
    }

    // Function to get calendar data for a specific year
    #getCalendarForYear(targetYear) {
        // Convert year to a number
        targetYear = Number(targetYear);

        // Get the current year as a number
        const currentYear = Number(this.#destructParts(this.#formatter.formatToParts(new Date())).year);

        // Check if the target year is the current year
        if (targetYear === currentYear) {
            // If the target year is the current year, calculate both clacAfter and clacBefore
            this.#calculateAfter();
            this.#calculateBefore();
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
                const yearInMilliseconds = Number(this.#destructParts(this.#formatter.formatToParts(new Date(targetInMilliseconds))).year);
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
            this.#calculateAfter(targetInMilliseconds);
            this.#calculateBefore(targetInMilliseconds);
        }
    }
    /**
     * function to get the cuurent date object.
     * @returns {Object} An object with year, month, and day properties.
     */
    getCurrentDate() {
        return this.#destructParts(this.#formatter.formatToParts(new Date()))
    }
    /**
    * function to get the calendar of a year.
    * @param {number} year The year time to return the calendar.
    * @returns {Object} An object with year, month, and day properties.
    */
    getCalendarForYear(year) {
        return this.globalCalendar[year] ?? {}
    }
    /**
    * function to get the calendar of a month of a year.
    * @param {number} year The year time to return the calendar.
    * @param {number} month The month time to return the calendar.
    * @returns {Object} An object month, and day properties.
    */
    getCalendarOfMonth(year, month) {
        if (!this.globalCalendar[year]) return {}
        return this.globalCalendar[year][month] ?? {}
    }
    /**
     * function to get the utc time of a day in a calendar.
     * @param {number} year The year time to return the date.
     * @param {number} month The month time to return the date.
     * @param {number} day The day time to return the date.
     * @returns {number} utc timestamp of the date in the calnedar.
     */
    getDateUTC(year, month, day) {
        if (!this.globalCalendar[year]) return {}
        if (!this.globalCalendar[year][month]) return {}
        return this.globalCalendar[year][month][day] ?? {}
    }
    /**
        * generate a calendar for a year and add it to the calendar object.
        * @param {number} year The year time to generate.
        */
    generateYear(year) {
        this.getCalendarForYear(year)
    }
    /**
     * get list of supported calendars.
     * @returns {Array} list of supported calendars.
     */
    getSupportedCalanders() {
        return Intl.supportedValuesOf('calendar')
    }
}

export default Calendar
