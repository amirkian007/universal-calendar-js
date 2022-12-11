
let globalCalander = {}

function destructParts(parts) {
    let res = {}
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].type != 'literal') {
            res[parts[i].type] = parts[i].value
        }
    }
    return res
}

const formatter = new Intl.DateTimeFormat('us-EN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    calendar: 'persian',
});

function clacAfter(startTime = new Date()){
    let currentTime = new Date(startTime).setHours(0, 0, 0, 0)
    for (let i = 0; i < 1800; i++) {
        const y = destructParts(formatter.formatToParts(currentTime));
        globalCalander[y.year] ? null : globalCalander[y.year] = {};
        globalCalander[y.year][y.month] ? null : globalCalander[y.year][y.month]= {}
        globalCalander[y.year][y.month][y.day]? null : globalCalander[y.year][y.month][y.day] = currentTime
        currentTime += 86400000
    }
}

function clacBefore(startTime = new Date()){
    let currentTime = new Date(startTime).setHours(0, 0, 0, 0)
    for (let i = 3; i > 0; i--) {
        const y = destructParts(formatter.formatToParts(currentTime));
        globalCalander[y.year] ? null : globalCalander[y.year] = {};
        globalCalander[y.year][y.month] ? null : globalCalander[y.year][y.month]= {}
        globalCalander[y.year][y.month][y.day]? null : globalCalander[y.year][y.month][y.day] = currentTime
        currentTime -= 86400000
    }
}

function getCalanderFromYear(year){
    const formatedYear = Number(destructParts(formatter.formatToParts(new Date(year))).year)
    const formatedYearNow = Number(destructParts(formatter.formatToParts(new Date())).year)
    console.log(formatedYear,formatedYearNow)
}

// new Calander('persian',1401)

console.time()
clacAfter()
clacBefore()
console.timeEnd()
getCalanderFromYear(1584390600000)
console.log(globalCalander)

// console.log(formatter.format(date))
// const y = destructParts(formatter.formatToParts(date));
// const convertedDate = y
// globalCalander[y.year] = {}
// globalCalander[y.year][y.month]= {}
// globalCalander[y.year][y.month][y.day]=
// console.log(globalCalander)
// console.log(destructParts(y))