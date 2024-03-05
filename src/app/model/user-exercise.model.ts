import { Exercise } from "./exercise.model";
import { User } from "./user.model";

export class UserExercise {
    id: number;
    exercise: Exercise;
    user: User;
    choose: boolean;
  
    constructor(userExercise) {
      this.id = userExercise.id;
      this.exercise = userExercise.exercise; 
      this.user = userExercise.user;  
      this.choose = userExercise.choose;
    }
  }