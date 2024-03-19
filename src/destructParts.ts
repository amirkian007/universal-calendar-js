interface DateObject {
    day:string
    era:string
    month:string
    timestamp:number
    year:string
}
 /**
  * Destructs parts of a date into an object of year, month, and day.
  */
export function destructParts(parts:Intl.DateTimeFormatPart[]):DateObject {

    let result:any = {
        day:'',
        era:'',
        month:'',
        timestamp:0,
        year:''
    };

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].type !== 'literal') {
            result[parts[i].type] = parts[i].value;
        }
    }

    return result;
}
 