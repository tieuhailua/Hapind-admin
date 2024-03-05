import { Family } from "src/app/model/family.model";
import { Drinking } from "src/app/model/drinking.model";
import { Work } from "src/app/model/work.model";
import { Smoking } from "src/app/model/smoking.model";
import { Purpose } from "src/app/model/purpose.model";
import { Literacy } from "src/app/model/literacy.model";
import { Habit } from "src/app/model/habit.model";
import { Status } from "./status.model";


export class User {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    family: Family;
    drinking: Drinking;
    work: Work;
    smoking: Smoking;
    purpose: Purpose;
    literacy: Literacy;
    habit: Habit;
    status: Status;
    weight: number;
    height: number;
    description: number;
    school: string;
    password: string;
    lastLogin: string;
    createTime: string;
    zodiac: string;
    finding: string;


    constructor(user) {
        this.id = user.id;
        this.fullname = user.fullname;
        this.email = user.email;
        this.phone = user.phone;
        this.dob = new Date(user.dob).toISOString().split('T')[0];
        this.gender = user.gender;
        this.address = user.address;
        // this.family = user.family.name;
        // this.drinking = user.drinking.name;
        // this.work = user.work.name;
        // this.smoking = user.smoking.name;
        // this.purpose = user.purpose.name;
        // this.literacy = user.literacy.name;
        // this.habit = user.habit.name;
        // this.status = user.status.name;
        this.family = user.family ? user.family.name : null;
        this.drinking = user.drinking ? user.drinking.name : null;
        this.work = user.work ? user.work.name : null;
        this.smoking = user.smoking ? user.smoking.name : null;
        this.purpose = user.purpose ? user.purpose.name : null;
        this.literacy = user.literacy ? user.literacy.name : null;
        this.habit = user.habit ? user.habit.name : null;
        this.status = user.status ? user.status.name : null;
        this.weight = user.weight;
        this.height = user.height;
        this.description = user.description;
        this.school = user.school;
        this.password = user.password;
        this.lastLogin = user.lastLogin;
        this.createTime = user.createTime;
        this.zodiac = user.zodiac;
        this.finding = user.finding;

    }
}