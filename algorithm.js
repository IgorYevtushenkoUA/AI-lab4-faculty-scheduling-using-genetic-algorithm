import {data_discipline_arr} from "./data/data_discipline.js";
import {data_teachers_arr} from "./data/data_teacher.js";
import {data_course_arr} from "./data/data_course.js";
import {data_auditory_arr} from "./data/data_auditory.js";
import {Discipline} from "./plurals/Discipline.js";
import {Lesson} from "./plurals/Lesson.js";
import {StudentsGroup} from "./plurals/StudentsGroup.js";
import {TimeInterval} from "./plurals/TimeInterval.js";
import {Schedule} from "./plurals/Schedule.js";

'use strict'
let schedulesList = []
let fines = []
const OFFSETS = 2
const GENERATION = 100

// let teacher = data_teachers_arr[]
function getRandomElem(data) {
    return Math.floor(Math.random() * data.length)
}

/**
 * generate first generation
 * chromosome looks like [disciplineName, {p or l}, teacher, group, auditory, timeInterval]
  */
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
                let group = new StudentsGroup(id, groupName, 30, data_course_arr[getRandomElem(data_course_arr)].getCourseName)
                // Auditory
                let auditory = data_auditory_arr[getRandomElem(data_auditory_arr)]
                // TimeInterval
                let week = Math.floor(Math.random() * 6)
                let pair = Math.floor(Math.random() * 7)
                let timeInterval = new TimeInterval(1, week, pair)
                // Lesson
                let lesson = new Lesson(id, disciplineName, disciplineType, teacher.getTeacherName, group, auditory.getAuditoryName, timeInterval.getWeekDay, timeInterval.getMaxDayLessons)
                //Schedule
                console.log(lesson)
                schedule.push(new Schedule(id, lesson))
            }
        }
        schedulesList.push(schedule)
    }
}

/**
 * count fines in schedule to know how bad schedule at the moment */
function countFines() {
    for (let i = 0 ; i < schedulesList.length; i++){

    }
}

generateFirstGeneration()


function findBestOffSpring() {
}

function multiply() {
}

function mutation() {
}

function selection() {
}
