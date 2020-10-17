export class Discipline {
    constructor(disciplineId, disciplineName, numOfDisciplineLecture, numOfDisciplineLecturePerWeek, numOfDisciplinePractice, numOfDisciplinePracticePerWeek) {
        this._disciplineId = disciplineId;
        this._disciplineName = disciplineName
        this._numOfDisciplineLecture = numOfDisciplineLecture
        this._numOfDisciplineLecturePerWeek = numOfDisciplineLecturePerWeek
        this._numOfDisciplinePractice = numOfDisciplinePractice
        this._numOfDisciplinePracticePerWeek = numOfDisciplinePracticePerWeek
    }

    getDisciplineID() {return this._disciplineId}

    getDisciplineName()                 {return this._disciplineName}
    getNumOfDisciplineLecture()         {return this._numOfDisciplineLecture}
    getNumOfDisciplineLecturePerWeek()  {return this._numOfDisciplineLecturePerWeek}
    getNumOfDisciplinePractice()        {return this._numOfDisciplinePractice}
    getNumOfDisciplinePracticePerWeek() {return this._numOfDisciplinePracticePerWeek}

    setDisciplineID(id)                     {this._disciplineId = id}
    setDisciplineName(name)                 {this._disciplineName = name}
    setNumOfDisciplineLecture(num)          {this._numOfDisciplineLecture = num}
    setNumOfDisciplineLecturePerWeek(num)   {this._numOfDisciplineLecturePerWeek = num}
    setNumOfDisciplinePractice(num)         {this._numOfDisciplinePractice = num}
    setNumOfDisciplinePracticePerWeek(num)  {this._numOfDisciplinePracticePerWeek = num}
}
