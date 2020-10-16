export class Teacher {
    constructor(teacherId, teacherName, teacherSubjectList, whatDo) {
        this._teacherId = teacherId;
        this._teacherName = teacherName;
        this._subjectList = teacherSubjectList
        this._whatTeacherDo = whatDo
    }

    get getTeacherID ()          {return this._teacherId;}
    get getTeacherName ()        {return this._teacherName;}
    get getTeacherSubjects ()    {return this._subjectList}
    get getTeacherWhatDo()       {return this._whatTeacherDo}

    set setTeacherID (teacherId)         {this._teacherId = teacherId}
    set setTeacherName (teacherName)     {this._teacherName = teacherName;}
    set setTeacherSubjects (subjects)    {this._subjectList = subjects;}
    set setTeacherWhatDo(activities)     {this._whatTeacherDo = activities}
}
