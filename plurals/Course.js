class Course {
    constructor(id, name, size, subjects) {
        this._courseID = id;
        this._courseName = name;
        this._courseSize = size;
        this._courseSubjects = subjects
    }

    get getCourseID() {
        return this._courseID
    }

    get getCourseName() {
        return this._courseName
    }

    get getCourseSize() {
        return this._courseSize
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

    set setCourseSize(size) {
        this._courseSize = size;
    }

    set setCourseSubjects(subjects) {
        this._courseSubjects = subjects
    }
}
