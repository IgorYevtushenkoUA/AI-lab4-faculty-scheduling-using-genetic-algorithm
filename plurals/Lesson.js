// Chromosome === Lesson

export class Lesson {
    constructor(id, discipline, disciplineType,teacher, group, auditory, timeInterval) {
        this._lessonID = id
        this._lessonDiscipline = discipline
        this._lessonDisciplineType = disciplineType
        this._lessonTeacher = teacher
        this._lessonGroup = group
        this._lessonAuditory = auditory
        this._lessonTimeInterval = timeInterval
    }

    get getLessonId()               {return this._lessonID}
    get getLessonDiscipline()       {return this._lessonDiscipline}
    get getLessonDisciplineType()   {return this._lessonDisciplineType}
    get getLessonGroup()            {return this._lessonGroup}
    get getLessonTeacher()          {return this._lessonTeacher}
    get getLessonAuditory()         {return this._lessonAuditory}
    get getLessonTimeInterval()     {return this._lessonTimeInterval}

    set setLessonId(id)                 {this._lessonID = id}
    set setLessonDiscipline(discipline) {this._lessonDiscipline = discipline}
    set setLessonDisciplineType(type)   {this._lessonDisciplineType = type}
    set setLessonGroup(group)           {this._lessonGroup = group}
    set setLessonTeacher(teacher)       {this._lessonTeacher = teacher}
    set setLessonAuditory(auditory)     {this._lessonAuditory = auditory}
    set setLessonTimeInterval(time)     {this._lessonTimeInterval = time}
}
