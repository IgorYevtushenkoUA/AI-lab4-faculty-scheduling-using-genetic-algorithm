export class TimeInterval {
    constructor(weekNum, weekDay, maxDayLessons) {
        this._weekNum = weekNum
        this._weekDay = weekDay
        this._maxDayLessons = maxDayLessons
    }

    get getWeekNum()        {return this._weekNum}
    get getWeekDay()        {return this._weekDay}
    get getMaxDayLessons()  {return this._maxDayLessons}

    set setWeekNum(weekNum)     {this._weekNum = weekNum}
    set setWeekDay(dayNum)      {this._weekDay = dayNum}
    set setMaxDayLessons(num)   {this._maxDayLessons = num}
}
