export class Course {
    constructor(id, name, size, disciplines) {
        this._courseID = id;
        this._courseName = name;
        this._courseSize = size;
        this._coursedisciplines = disciplines
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

    get getCourseDisciplines() {
        return this._coursedisciplines
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

    set setCourseDisciplines(disciplines) {
        this._coursedisciplines = disciplines
    }
}
