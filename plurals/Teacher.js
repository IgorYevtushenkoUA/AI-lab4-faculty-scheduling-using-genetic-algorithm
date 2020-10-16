export class Teacher {
    constructor(teacherId, teacherName, teacherSubjectList, whatDo) {
        this._teacherId = teacherId;
        this._teacherName = teacherName;
        this._subjectList = teacherSubjectList
        this._whatTeacherDo = whatDo
    }

    getTeacherID = function ()          {return this._teacherId;}
    getTeacherName = function ()        {return this._teacherName;}
    getTeacherSubjects = function ()    {return this._subjectList}
    getTeacherWhatDo()                  {return this._whatTeacherDo}

    setTeacherID = function (teacherId)         {this._teacherId = teacherId}
    setTeacherName = function (teacherName)     {this._teacherName = teacherName;}
    setTeacherSubjects = function (subjects)    {this._subjectList = subjects;}
    setTeacherWhatDo(activities)                {this._whatTeacherDo = activities}
}
