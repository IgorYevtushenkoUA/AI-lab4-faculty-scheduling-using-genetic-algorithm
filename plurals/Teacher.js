export class Teacher {
    constructor(teacherId, teacherName, teacherSubjectList, whatDo) {
        this._teacherId = teacherId;
        this._teacherName = teacherName;
        this._subjectList = teacherSubjectList
        this._whatTeacherDo = whatDo
    }

    getTeacherID = function () {
        return this._teacherId;
    }
    setTeacherID = function (teacherId) {
        this._teacherId = teacherId
    }

    getTeacherName = function () {
        return this._teacherName;
    }
    setTeacherName = function (teacherName) {
        this._teacherName = teacherName;
    }

    getTeacherSubjects = function () {
        return this._subjectList
    }
    setTeacherSubjects = function (subjects) {
        this._subjectList = subjects;
    }

    getTeacherWhatDo() {
        return this._whatTeacherDo
    }

    setTeacherWhatDo(activities) {
        this._whatTeacherDo = activities
    }

}
