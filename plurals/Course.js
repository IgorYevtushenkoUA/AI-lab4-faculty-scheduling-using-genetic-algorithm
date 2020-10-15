class Course {
    constructor(id, name, subjects) {
        this._courseID = id;
        this._courseName = name;
        this._courseSubjects = subjects
    }

    get getCourseID() {
        return this._courseID
    }

    get getCourseName() {
        return this._courseName
    }

    get getCourseSubjects() {
        return this._courseSubjects
    }

    set setCourseID(id) {
        this._courseID = id
    }

    set setCourseName(name) {
        this._courseName = name
    }

    set setCourseSubjects(subjects) {
        this._courseSubjects = subjects
    }
}
