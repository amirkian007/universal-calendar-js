export default class CalendarCollection {
    [key: string] : CalendarCollection | any

    constructor() {
         
        return new Proxy(this, {

            get(target, key: string, receiver: any) {
                if (!(key in target)) {
                    Reflect.set(target, key, new CalendarCollection(), receiver)
                }
                return Reflect.get(target, key, receiver)
            },

            set(target, key: string, value: any,receiver) {
                return Reflect.set(target, key, value, receiver)
            }
        })
    }
}