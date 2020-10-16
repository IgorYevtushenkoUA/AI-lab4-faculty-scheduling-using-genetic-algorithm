// Chromosome === Lesson

export class Lesson {
    constructor(id, disciplineName, disciplineType, teacherName, group, auditoryName, day, pair) {
        this._lessonID = id
        this._lessonDiscipline = disciplineName
        this._lessonDisciplineType = disciplineType
        this._lessonTeacher = teacherName
        this._lessonGroup = group
        this._lessonAuditory = auditoryName
        this._lessonDay = day
        this._lessonPair = pair
    }

    get getLessonId()               {return this._lessonID}
    get getLessonDiscipline()       {return this._lessonDiscipline}
    get getLessonDisciplineType()   {return this._lessonDisciplineType}
    get getLessonGroup()            {return this._lessonGroup}
    get getLessonTeacher()          {return this._lessonTeacher}
    get getLessonAuditory()         {return this._lessonAuditory}
    get getLessonDay()              {return this._lessonDay}
    get getLessonPair()             {return this._lessonPair}

    set setLessonId(id)                 {this._lessonID = id}
    set setLessonDiscipline(discipline) {this._lessonDiscipline = discipline}
    set setLessonDisciplineType(type)   {this._lessonDisciplineType = type}
    set setLessonGroup(group)           {this._lessonGroup = group}
    set setLessonTeacher(teacher)       {this._lessonTeacher = teacher}
    set setLessonAuditory(auditory)     {this._lessonAuditory = auditory}
    set setLessonDay(day)               {this._lessonDay = day}
    set setLessonPair(pair)             {this._lessonPair = pair}
}
