class Calendar {
    constructor(year,calendar) {
      this.globalCalander = {},
      this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.formatter = new Intl.DateTimeFormat('en-US',{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        calendar: calendar,
        locale:"en-US",
        numberingSystem:"latn",
       });
       this.getCalanderFromYear(year)
    }
    destructParts(parts) {
        let res = {}
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].type != 'literal') {
                res[parts[i].type] = parts[i].value
            }
        }
        return res
    }
    clacAfter(startTime = new Date()) {
        let currentTime = new Date(startTime).setHours(0, 0, 0, 0)
        let yearD = this.destructParts(this.formatter.formatToParts(currentTime)).year
        for (let i = 0; i < 380; i++) {
            const y = this.destructParts(this.formatter.formatToParts(currentTime));
            if (yearD != y.year) break;
            yearD = y.year
            this.globalCalander[y.year] ? null : this.globalCalander[y.year] = {};
            this.globalCalander[y.year][y.month] ? null : this.globalCalander[y.year][y.month] = {}
            this.globalCalander[y.year][y.month][y.day] ? null : this.globalCalander[y.year][y.month][y.day] = currentTime
            currentTime += 86400000
        }
    }
    clacBefore(startTime = new Date()) {
        let currentTime = new Date(startTime).setHours(0, 0, 0, 0)
        let yearD = this.destructParts(this.formatter.formatToParts(currentTime)).year
        for (let i = 380; i > 0; i--) {
            const y = this.destructParts(this.formatter.formatToParts(currentTime));
            if (yearD != y.year) break;
            yearD = y.year
            this.globalCalander[y.year] ? null : this.globalCalander[y.year] = {};
            this.globalCalander[y.year][y.month] ? null : this.globalCalander[y.year][y.month] = {}
            this.globalCalander[y.year][y.month][y.day] ? null : this.globalCalander[y.year][y.month][y.day] = currentTime
            currentTime -= 86400000
        }
    }
    getCalanderFromYear(year) {
        const targetYear = Number(year)
        const formatedYearNow = Number(this.destructParts(this.formatter.formatToParts(new Date())).year)
        if (targetYear === formatedYearNow) {
            this.clacAfter()
            this.clacBefore()
        } else {
            let diff = 0;
            let targetInMillisec = 0
            if (targetYear < formatedYearNow) {
                diff = 86400000 * 365 * (formatedYearNow - targetYear)
                targetInMillisec = new Date().getTime() - diff
            }else{
                diff = 86400000 * 365 * (targetYear - formatedYearNow )
                targetInMillisec = new Date().getTime() + diff
            }
            const delta = 356
            for(let i=2;i<10;i++){
                const formatedTarget = Number(this.destructParts(this.formatter.formatToParts(new Date(targetInMillisec))).year)
                if (formatedTarget === targetYear) break
                if (formatedTarget > targetYear) {
                    targetInMillisec = targetInMillisec - 86400000 * delta / i
                } else if (formatedTarget < targetYear) {
                    targetInMillisec = targetInMillisec + 86400000 * delta / i
                }
            }
            this.clacAfter(targetInMillisec)
            this.clacBefore(targetInMillisec)
        }
    }
    changeTimezone(date) {
        var invdate = new Date(date.toLocaleString('en-US', {
          timeZone: this.timeZone
        }));
        var diff = date.getTime() - invdate.getTime();
        return new Date(date.getTime() - diff).getTime(); // needs to substract
      }
  }
export default Calendar
