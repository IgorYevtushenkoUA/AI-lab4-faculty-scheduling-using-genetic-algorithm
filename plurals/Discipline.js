export class Discipline {
    constructor(disciplineId, disciplineName, numOfDisciplineLecture, numOfDisciplineLecturePerWeek, numOfDisciplinePractice, numOfDisciplinePracticePerWeek) {
        this._disciplineId = disciplineId;
        this._disciplineName = disciplineName
        this._numOfDisciplineLecture = numOfDisciplineLecture
        this._numOfDisciplineLecturePerWeek = numOfDisciplineLecturePerWeek
        this._numOfDisciplinePractice = numOfDisciplinePractice
        this._numOfDisciplinePracticePerWeek = numOfDisciplinePracticePerWeek
    }

    getDisciplineID() {
        return this._disciplineId
    }

    setDisciplineID(id) {
        this._disciplineId = id
    }

    getDisciplineName() {
        return this._disciplineName
    }

    setDisciplineName(name) {
        this._disciplineName = name
    }

    getNumOfDisciplineLecture() {
        return this._numOfDisciplineLecture
    }

    setNumOfDisciplineLecture(num) {
        this._numOfDisciplineLecture = num
    }

    getNumOfDisciplineLecturePerWeek() {
        return this._numOfDisciplineLecturePerWeek
    }

    setNumOfDisciplineLecturePerWeek(num) {
        this._numOfDisciplineLecturePerWeek = num
    }

    getNumOfDisciplinePractice() {
        return this._numOfDisciplinePractice
    }

    setNumOfDisciplinePractice(num) {
        this._numOfDisciplinePractice = num
    }

    getNumOfDisciplinePracticePerWeek() {
        return this._numOfDisciplinePracticePerWeek
    }

    setNumOfDisciplinePracticePerWeek(num) {
        this._numOfDisciplinePracticePerWeek = num
    }


}
