import {data_discipline_arr} from "./data/data_discipline.js";
import {data_teachers_arr} from "./data/data_teacher.js";
import {data_course_arr, data_course_map} from "./data/data_course.js";
import {data_auditory_arr} from "./data/data_auditory.js";
import {Discipline} from "./plurals/Discipline.js";
import {Lesson} from "./plurals/Lesson.js";
import {StudentsGroup} from "./plurals/StudentsGroup.js";
import {TimeInterval} from "./plurals/TimeInterval.js";
import {Schedule} from "./plurals/Schedule.js";
import {Fine} from "./Fine.js"


'use strict'

let schedulesList = []
let fines = new Map()
const OFFSETS = 10
const BEST_OFFSETS = OFFSETS / 2
const GENERATION_EVOLUTION = 10

/**
 * @param {[]} data
 * @returns {number}
 */
function getRandomElem(data) {
    return Math.floor(Math.random() * data.length)
}

/**
 * @param {number} num
 * @returns {number}
 */
function getRandomNum(num) {
    return Math.floor(Math.random() * num)
}


/** generate first generation chromosome looks like [disciplineName, {p or l}, teacher, group, auditory, timeInterval] */
function generateFirstGeneration() {
    for (let offset = 0; offset < OFFSETS; offset++) {
        let schedule = []
        for (let i = 0; i < data_discipline_arr.length; i++) {
            let id = i
            // Discipline
            let disciplineName = data_discipline_arr[i].getDisciplineName()
            let numOfDisciplineLecture = data_discipline_arr[i].getNumOfDisciplineLecture()
            let numOfDisciplineLecturePerWeek = data_discipline_arr[i].getNumOfDisciplineLecturePerWeek()
            let numOfDisciplinePractice = data_discipline_arr[i].getNumOfDisciplinePractice()
            let numOfDisciplinePracticePerWeek = data_discipline_arr[i].getNumOfDisciplinePracticePerWeek()
            let discipline = new Discipline(id, disciplineName, numOfDisciplineLecture, numOfDisciplineLecturePerWeek, numOfDisciplinePractice, numOfDisciplinePracticePerWeek);
            /** to generate different variants for lecture and practice DisciplineType */
            for (let j = 0; j < 2; j++) {
                let disciplineType = j == 0 ? "l" : "p"
                // Teacher
                let teacher = data_teachers_arr[getRandomElem(data_teachers_arr)]
                // Group
                let groupName = disciplineName + "(" + disciplineType + ") - " + id
                let groupCourseName = data_course_arr[getRandomElem(data_course_arr)].getCourseName
                let groupSize = data_course_map[groupCourseName].getCourseSize
                let group = new StudentsGroup(id, groupName, groupSize, groupCourseName)
                // Auditory
                let auditory = data_auditory_arr[getRandomElem(data_auditory_arr)]
                // TimeInterval
                let week = Math.floor(Math.random() * 6)
                let pair = Math.floor(Math.random() * 7)
                let timeInterval = new TimeInterval(1, week, pair)
                // Lesson
                let lesson = new Lesson(id, disciplineName, disciplineType, teacher.getTeacherName, group, auditory.getAuditoryName, timeInterval.getWeekDay, timeInterval.getMaxDayLessons)
                //Schedule
                // console.log(lesson)
                schedule.push(new Schedule(id, lesson))
            }
        }
        schedulesList.push(schedule)
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

/** count fitness in schedule to know how bad schedule at the moment */
function countFitness() {
    for (let i = 0; i < schedulesList.length; i++) {
        let fine = new Fine()
        let schedule = schedulesList[i]
        let carma = 0
        for (let j = 0; j < schedule.length; j++) {
            let lesson = schedule[i].getScheduleLessons
            carma += fine.isCorrectTeacherForDiscipline(lesson) ? 1 : -1
            carma += fine.isCorrectTeacherForTypeOfDiscipline(lesson) ? 1 : -1
            carma += fine.isCorrectAuditoryTypeForDisciplineType(lesson) ? 1 : -1
            carma += fine.isCorrectAuditorySizeForStudentsGroupSize(lesson) ? 1 : -1
            carma += fine.isCorrectDisciplineForStudentGroup(lesson) ? 1 : -1
            // todo check  {schedule[i].length or schedule.length}
            for (let k = 0; k < schedule.length - 1; k++) {
                let lesson2 = schedule[k]
                if (fine.isSameLesson(lesson, lesson2)) continue
                carma += fine.isUniqueAuditoryForDisciplineAtPairOnDay(lesson, lesson2) ? 1 : -1
            }
        }
        fines.set(i, carma)
    }
    for (let i of fines) {
        console.log(i)
    }
}

/** @returns {Map<index, carma{fitness}>} */
function sortFines() {
    return new Map([...fines.entries()].sort((a, b) => -1 * (a[1] - b[1])))
}

/** Відбираємо найкращі екземпляри */
function findBestOffSpring() {
    fines = sortFines()
    let bestOffset = []
    for (let i = 0; i < BEST_OFFSETS; i++) {
        let indexOfBestOffset = Array.from(fines)[i][0]
        bestOffset.push(schedulesList[indexOfBestOffset])
    }
    schedulesList = bestOffset
}

/**
 * Змішати 2 розклади
 * @param {number} schedulesListLength
 * @returns {any[] | string}
 */
function mixLessonsInSchedule(schedulesListLength = schedulesList.length) {
    let random1 = getRandomNum(schedulesList.length)
    let random2 = getRandomNum(schedulesList.length)
    let schedule1 = schedulesList[random1]
    let schedule2 = schedulesList[random2]
    // todo check let "l1 = getRandomNum(schedulesList[i].length)"
    let l1 = getRandomNum(schedulesListLength)
    schedule1 = schedule1.slice(0, l1)
    schedule2 = schedule2.slice(l1, schedulesListLength)
    schedule1 = schedule1.concat(schedule2)
    return schedule1
}

/** Схрещування найкращих екземплярів */
function scheduleCrossbreeding() {
    let newScheduleList = []
    let scheduleIndex = 0;
    let schedulesListLength = schedulesList[0].length
    for (let i = 0; i < OFFSETS; i++) {
        if (getRandomNum(3) === 0) {
            if (scheduleIndex < schedulesList.length)
                newScheduleList.push(schedulesList[scheduleIndex++])
            else {
                newScheduleList.push(mixLessonsInSchedule(schedulesListLength))
            }
        } else {
            newScheduleList.push(mixLessonsInSchedule(schedulesListLength))
        }
    }
    schedulesList = newScheduleList
    // console.log("scheduleCrossbreeding")
    // console.log(schedulesList)
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

/** Мутація */
function scheduleMutation() {
    /**
     * @param {Schedule} schedule
     */
    function mutation(schedule) {
        let fine = new Fine()
        for (let i = 0; i < schedule[i].length; i++) {
            let lesson = schedule[i].getScheduleLessons
            // console.log(lesson)
            if (getRandomNum(3) !== 0) {
                if (!fine.isCorrectTeacherForDiscipline(lesson)) {
                    let newTeacher = data_teachers_arr[getRandomElem(data_teachers_arr)].getTeacherName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, newTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectTeacherForTypeOfDiscipline) {
                    let newTeacher = data_teachers_arr[getRandomElem(data_teachers_arr)].getTeacherName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, newTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectAuditoryTypeForDisciplineType) {
                    let newAuditory = data_auditory_arr[getRandomElem(data_auditory_arr)].getAuditoryName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, newAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectAuditorySizeForStudentsGroupSize) {
                    let newAuditory = data_auditory_arr[getRandomElem(data_auditory_arr)].getAuditoryName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, newAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectDisciplineForStudentGroup) {
                    let newDiscipline = data_discipline_arr[getRandomElem(data_discipline_arr)].getDisciplineName()
                    lesson = new Lesson(lesson.getLessonId, newDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else {
                    for (let j = 0; j < schedule.length - 1; j++) {
                        let lesson2 = schedule[j]
                        if (fine.isSameLesson(lesson, lesson2)) continue
                        else if (fine.isUniqueAuditoryForDisciplineAtPairOnDay(lesson, lesson2)) {
                            if (!fine.isDifferentDay(lesson, lesson2)) {
                                let newDay = getRandomNum(6)
                                lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, newDay, lesson.getLessonPair)
                            } else if (!fine.isDifferentPair(lesson, lesson2)) {
                                let newPair = getRandomNum(7)
                                lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, newPair)
                            }
                        }
                    }
                }
                // console.log(lesson)
                schedule[i] = lesson
            }
        }
        return schedule
    }

    for (let i = 0; i < schedulesList.length; i++) {
        if (getRandomNum(10) % 3 === 0) {
            schedulesList[i] = mutation(schedulesList[i])
        }
    }
}


generateFirstGeneration()
for (let i = 0; i < GENERATION_EVOLUTION; i++) {
countFitness()
console.log("Generation ::" + i  + ") fines :: " + Array.from(fines)[0])
findBestOffSpring()

scheduleCrossbreeding()
scheduleMutation()
console.log("≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈")
}
countFitness()
console.log("The best schedule has VALUE{FITNESS} :: " + Array.from(fines)[0][1])
let bestSchedule = schedulesList[Array.from(fines)[0][0]]
console.log(123)

console.log(bestSchedule)


console.log(123)


