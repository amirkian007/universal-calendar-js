import Calendar from "./src/Calendar2"

const calendar = new Calendar('persian',['1380','1379'])
console.time('generated in :')
console.log(calendar)
console.timeEnd('generated in :')
