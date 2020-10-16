//l - lecture | p-practice
import {Auditory} from "../plurals/Auditory.js";

export const data_auditory_arr = [
    new Auditory(0, "2-225", 40,"l"),
    new Auditory(1, "3-313", 80, "l/p"),
    new Auditory(2 ,"1-114", 25, "p"),
    new Auditory(3, "3-308", 15, "p"),
    new Auditory(4, "2-212", 25, "l"),
]

export const data_auditory_map = {
    "2-225" : new Auditory(0, "2-225", 40, "l"),
    "3-313" : new Auditory(1, "3-313", 80, "l/p"),
    "1-114" : new Auditory(2, "1-114", 25, "p"),
    "3-308" : new Auditory(3, "3-308", 15, "p"),
    "2-212" : new Auditory(4, "2-212", 25, "l"),
}
