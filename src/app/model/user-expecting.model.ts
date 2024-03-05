import { Expecting } from "./expecting.model";
import { User } from "./user.model";

export class UserExpecting {
    id: number;
    expecting: Expecting;
    user: User;
    choose: boolean;
  
    constructor(userExpecting) {
      this.id = userExpecting.id;
      this.expecting = userExpecting.expecting; 
      this.user = userExpecting.user;  
      this.choose = userExpecting.choose;
    }
  }
  