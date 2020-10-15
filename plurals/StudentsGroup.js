class StudentsGroup {
    constructor(id, name, size, courseName) {
        this._studentGroupID = id
        this._studentGroupName = name;
        this._studentGroupSize = size;
        this._studentGroupCourseName = courseName
    }

    get getStudentGroupID() {
        return this._studentGroupID
    }

    get getStudentGroupName() {
        return this._studentGroupName
    }

    get getStudentGroupSize() {
        return this._studentGroupSize
    }

    get getStudentGroupCourseName() {
        return this._studentGroupCourseName
    }

    set setStudentGroupID(id) {
        this._studentGroupID = id
    }

    set setStudentGroupName(name) {
        this._studentGroupName = name
    }

    set setStudentGroupSize(size) {
        this._studentGroupSize = size
    }

    set setStudentGroupCourseName(name) {
        this._studentGroupCourseName = name
    }
}
