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
const OFFSETS = 4
const BEST_OFFSETS = OFFSETS / 2
const GENERATION_EVOLUTION = 100

function getDay(num) {
    switch (num) {
        case 0 :
            return "Monday"
        case 1 :
            return "Tuesday"
        case 2 :
            return "Wednesday"
        case 3 :
            return "Thursday"
        case 4 :
            return "Friday"
        case 5 :
            return "Saturday"
    }
}

function getPair(num) {
    switch (num) {
        case 0 :
            return "Para 1"
        case 1 :
            return "Para 2"
        case 2 :
            return "Para 3"
        case 3 :
            return "Para 4"
        case 4 :
            return "Para 5"
        case 5 :
            return "Para 6"
        case 6 :
            return "Para 7"
    }
}

function printSchedule(schedule) {
    let lessons = schedule.getScheduleLessons
    for (let course = 0; course < data_course_arr.length; course++) {
        console.log( "\n" + data_course_arr[course].getCourseName)
        for (let day = 0; day < 6; day++) {
            console.log(getDay(day))
            for (let pair = 0; pair < 7; pair++) {
                let auditory = "~~~"
                let discipline = "~~~"
                for (let lesson = 0; lesson < lessons.length ; lesson++){
                    if (lessons[lesson].getLessonGroup.getStudentGroupCourseName === data_course_arr[course].getCourseName) {
                        if (lessons[lesson].getLessonDay === day){
                            if (lessons[lesson].getLessonPair === pair){
                                auditory = lessons[lesson].getLessonAuditory
                                discipline = lessons[lesson].getLessonDiscipline + " - (" + lessons[lesson].getLessonDisciplineType + ")"
                                console.log(getPair(pair) + " | Auditory :: " + auditory + "\t| Discipline :: " + discipline)
                            }
                        }
                    }
                }
            }
        }
    }
}

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
        let schedule;
        let lessonsList = []
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
                lessonsList.push(lesson)
                // schedule.push(new Schedule(id, lesson))
            }
        }
        schedulesList.push(new Schedule(offset, lessonsList))
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

/** count fitness in schedule to know how bad schedule at the moment */
function countFitness() {
    let maxCarma = 0
    for (let i = 0; i < schedulesList.length; i++) {
        maxCarma = 0
        let fine = new Fine()
        let lessons = schedulesList[i].getScheduleLessons
        let carma = 0
        for (let j = 0; j < lessons.length; j++) {
            let lesson = lessons[j]
            carma += fine.isCorrectTeacherForDiscipline(lesson) ? 1 : -1
            carma += fine.isCorrectTeacherForTypeOfDiscipline(lesson) ? 1 : -1
            carma += fine.isCorrectAuditoryTypeForDisciplineType(lesson) ? 1 : -1
            carma += fine.isCorrectAuditorySizeForStudentsGroupSize(lesson) ? 1 : -1
            carma += fine.isCorrectDisciplineForStudentGroup(lesson) ? 1 : -1
            maxCarma += 5
            // todo check  {schedule[i].length or schedule.length}
            for (let k = 0; k < lessons.length - 1; k++) {
                let lesson2 = lessons[k]
                // if (fine.isSameLesson(lesson, lesson2)) continue
                carma += fine.isUniqueAuditoryForDisciplineAtPairOnDay(lesson, lesson2) ? 1 : -1
                maxCarma++
            }
        }
        fines.set(i, carma)
    }
    console.log("MAX FINE :: " + maxCarma)
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
    let les1 = schedule1.getScheduleLessons.slice(0, l1)
    let les2 = schedule2.getScheduleLessons.slice(l1, schedulesListLength)
    les1 = les1.concat(les2)
    let newMixedSchedule = new Schedule(schedule1.getScheduleID, les1)
    return newMixedSchedule
}

/** Схрещування найкращих екземплярів */
function scheduleCrossbreeding() {
    let newScheduleList = []
    let scheduleIndex = 0;
    let schedulesListLength = schedulesList[0].getScheduleLessons.length
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
        let lessons = schedule.getScheduleLessons
        for (let i = 0; i < lessons.length; i++) {
            let lesson = lessons[i]
            let zone  = 0
            if (getRandomNum(3) !== 0) {
                if (!fine.isCorrectTeacherForDiscipline(lesson)) {
                    zone = 0
                    let newTeacher = data_teachers_arr[getRandomElem(data_teachers_arr)].getTeacherName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, newTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectTeacherForTypeOfDiscipline) {
                    zone = 1
                    let newTeacher = data_teachers_arr[getRandomElem(data_teachers_arr)].getTeacherName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, newTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectAuditoryTypeForDisciplineType) {
                    zone = 2
                    let newAuditory = data_auditory_arr[getRandomElem(data_auditory_arr)].getAuditoryName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, newAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectAuditorySizeForStudentsGroupSize) {
                    zone = 4
                    let newAuditory = data_auditory_arr[getRandomElem(data_auditory_arr)].getAuditoryName
                    lesson = new Lesson(lesson.getLessonId, lesson.getLessonDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, newAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else if (!fine.isCorrectDisciplineForStudentGroup) {
                    zone = 5
                    let newDiscipline = data_discipline_arr[getRandomElem(data_discipline_arr)].getDisciplineName()
                    lesson = new Lesson(lesson.getLessonId, newDiscipline, lesson.getLessonDisciplineType, lesson.getLessonTeacher, lesson.getLessonGroup, lesson.getLessonAuditory, lesson.getLessonDay, lesson.getLessonPair)
                } else {
                    zone = 6
                    for (let j = 0; j < lessons.length - 1; j++) {
                        let lesson2 = lessons[j]
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
                lessons[i] = lesson
            }
        }
        return new Schedule(schedule.getScheduleID, lessons)
    }

    for (let i = 0; i < schedulesList.length; i++) {
        if (getRandomNum(10) % 3 === 0) {
            schedulesList[i] = mutation(schedulesList[i])
        }
    }
}

/** do genetic algorithm  */
function geneticAlgorithm() {
    generateFirstGeneration()
    for (let i = 0; i < GENERATION_EVOLUTION; i++) {
        countFitness()
        findBestOffSpring()
        console.log("Generation ::" + i + ") fines :: " + Array.from(fines)[0])

        scheduleCrossbreeding()
        scheduleMutation()
        console.log("≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈")
    }
    countFitness()
    console.log("The best schedule has VALUE{FITNESS} :: " + Array.from(fines)[0][1])
    let bestSchedule = schedulesList[Array.from(fines)[0][0]]

    printSchedule (bestSchedule)

    // let lessons = bestSchedule.getScheduleLessons
    // for(let i = 0 ; i < lessons.length; i++)
    //     console.log(lessons[i])
}

geneticAlgorithm()
