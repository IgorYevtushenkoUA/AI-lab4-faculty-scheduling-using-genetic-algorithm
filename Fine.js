import {data_teachers_map} from "./data/data_teacher.js";
import {data_auditory_map} from "./data/data_auditory.js";
import {data_course_map} from "./data/data_course.js";

export class Fine {
    /**
     * @param {Lesson} l1
     * @param {Lesson} l2
     * @returns {boolean}
     */
    isSameLesson(l1, l2) {
        if (
            l1.getLessonDiscipline === l2.getLessonDiscipline &&
            l1.getLessonDisciplineType === l2.getLessonDisciplineType &&
            l1.getLessonTeacher === l2.getLessonTeacher &&
            // l1.getLessonGroup === l2.getLessonGroup &&
            l1.getLessonAuditory === l2.getLessonAuditory &&
            l1.getLessonDay === l2.getLessonDay &&
            l1.getLessonPair === l2.getLessonPair) {
            return true
        } else if (l1.getLessonId === l2.getLessonId) return true
        return false
    }

    /**
     * @param {Lesson} l1
     */
    isCorrectTeacherForDiscipline(l1) {
        let teacherName = l1.getLessonTeacher
        let disciplineName = l1.getLessonDiscipline
        console.log(data_teachers_map[teacherName])

        return data_teachers_map[teacherName].getTeacherSubjects.includes(disciplineName)
    }

    /**
     * @param {Lesson} l1
     */
    isCorrectTeacherForTypeOfDiscipline(l1) {
        let teacherName = l1.getLessonTeacher
        let teacherType = data_teachers_map[teacherName].getTeacherWhatDo
        if (teacherType === "l/p") return true

        let disciplineType = l1.getLessonDisciplineType
        return teacherType === disciplineType
    }

    /**
     * @param {Lesson} l1
     */
    isCorrectAuditoryTypeForDisciplineType(l1) {
        let auditory = data_auditory_map[l1.getLessonAuditory]
        let disciplineType = l1.getLessonDisciplineType
        let auditoryType = auditory.getAuditoryType
        if (auditoryType === "l/p") return true
        return auditoryType === disciplineType
    }

    /**
     * @param {Lesson} l1
     */
    isCorrectAuditorySizeForStudentsGroupSize(l1) {
        let auditory = data_auditory_map[l1.getLessonAuditory]
        let studentGroup = l1.getLessonGroup
        let auditorySize = auditory.getAuditoryCapacity
        return studentGroup.getStudentGroupSize <= auditorySize
    }

    /**
     * @param {Lesson} l1
     */
    isCorrectDisciplineForStudentGroup(l1) {
        let studentGroup = l1.getLessonGroup
        let disciplineName = l1.getLessonDiscipline

        let course = data_course_map[studentGroup.getStudentGroupCourseName]
        return course.getCourseDisciplines.includes(disciplineName)
    }  // depend on students group course

    /**
     * @param {Lesson} l1
     * @param {Lesson} l2
     */
    isUniqueAuditoryForDisciplineAtPairOnDay(l1, l2) {
        return !(l1.getLessonAuditory === l2.getLessonAuditory &&
                l1.getLessonDay === l2.getLessonDay &&
                l1.getLessonPair === l2.getLessonPair)

    }
}
