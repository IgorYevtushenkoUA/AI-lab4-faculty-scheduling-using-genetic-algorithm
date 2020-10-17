export class Schedule {

    constructor(id,lessons) {
        this._scheduleID = id;
        this._scheduleLessons = lessons
    }

    get getScheduleID()             {return this._scheduleID}
    get getScheduleLessons()        {return this._scheduleLessons}
    set setScheduleID(id)           {this._scheduleID = id}
    setScheduleLessons(lessons) {this._scheduleLessons = lessons}

}
