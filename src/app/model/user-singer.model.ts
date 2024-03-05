import { User } from "./user.model";
import { Singer } from "./singer.model";

export class UserSinger {
  id: number;
  singer: Singer;
  user: User;
  choose: boolean;

  constructor(userSinger) {
    this.id = userSinger.id;
    this.singer = userSinger.singer; 
    this.user = userSinger.user;  
    this.choose = userSinger.choose;
  }
}
