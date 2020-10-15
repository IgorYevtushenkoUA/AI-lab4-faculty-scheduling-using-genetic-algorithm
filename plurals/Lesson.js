// Chromosome === Lesson

export class Lesson {
    constructor(id, discipline, disciplineType,teacher, group, auditory, weekDay, pairTime) {
        this._lessonID = id
        this._lessonDiscipline = discipline
        this._lessonDisciplineType = disciplineType
        this._lessonTeacher = teacher
        this._lessonGroup = group
        this._lessonAuditory = auditory
        this._lessonWeekDay = weekDay
        this._lessonPair = pairTime
    }

    get getLessonId()               {return this._lessonID}
    get getLessonDiscipline()       {return this._lessonDiscipline}
    get getLessonDisciplineType()   {return this._lessonDisciplineType}
    get getLessonGroup()            {return this._lessonGroup}
    get getLessonTeacher()          {return this._lessonTeacher}
    get getLessonAuditory()         {return this._lessonAuditory}
    get getLessonWeekDay()          {return this._lessonWeekDay}
    get getLessonPair()             {return this._lessonPair}

    set setLessonId(id)                 {this._lessonID = id}
    set setLessonDiscipline(discipline) {this._lessonDiscipline = discipline}
    set setLessonDisciplineType(type)   {this._lessonDisciplineType = type}
    set setLessonGroup(group)           {this._lessonGroup = group}
    set setLessonTeacher(teacher)       {this._lessonTeacher = teacher}
    set setLessonAuditory(auditory)     {this._lessonAuditory = auditory}
    set setLessonWeekDay(day)           {this._lessonWeekDay = day}
    set setLessonPair(pair)             {this._lessonPair = pair}
}
