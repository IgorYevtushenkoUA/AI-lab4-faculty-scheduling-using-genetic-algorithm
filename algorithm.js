import {discipline_data_arr} from "./data/discipline_data.js";
import {Discipline} from "./plurals/Discipline.js";
import {Lesson} from "./plurals/Lesson.js";

'use strict'
let schedules = []


function generateFirstPlural() {

    for (let i = 0; i < discipline_data_arr.length; i++) {
        let disciplineId = discipline_data_arr[i].getDisciplineID()
        let disciplineName = discipline_data_arr[i].getDisciplineName()
        let numOfDisciplineLecture = discipline_data_arr[i].getNumOfDisciplineLecture()
        let numOfDisciplineLecturePerWeek = discipline_data_arr[i].getNumOfDisciplineLecturePerWeek()
        let numOfDisciplinePractice = discipline_data_arr[i].getNumOfDisciplinePractice()
        let numOfDisciplinePracticePerWeek = discipline_data_arr[i].getNumOfDisciplinePracticePerWeek()
        let discipline = new Discipline(disciplineId, disciplineName, numOfDisciplineLecture, numOfDisciplineLecturePerWeek, numOfDisciplinePractice, numOfDisciplinePracticePerWeek);

        let lesson = new Lesson(discipline)

    }
}

function findBestOffSpring() {
}

function multiply() {
}

function mutation() {
}

function selection() {
}
