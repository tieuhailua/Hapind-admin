import { Hobby } from "./hobby.model";
import { User } from "./user.model";

export class UserHobby {
    id: number;
    hobby: Hobby;
    user: User;
    choose: boolean;
  
    constructor(userHobby) {
      this.id = userHobby.id;
      this.hobby = userHobby.hobby; 
      this.user = userHobby.user;  
      this.choose = userHobby.choose;
    }
  }
  