import { Music } from "./music.model";
import { User } from "./user.model";

export class UserMusic {
  id: number;
  music: Music;
  user: User;
  choose: boolean;

  constructor(userMusic) {
    this.id = userMusic.id;
    this.music = userMusic.music; 
    this.user = userMusic.user;  
    this.choose = userMusic.choose;
  }
}
