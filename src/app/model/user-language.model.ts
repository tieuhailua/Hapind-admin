import { Language } from "./language.model";
import { User } from "./user.model";

export class UserLanguage {
  id: number;
  language: Language;
  user: User;
  choose: boolean;

  constructor(userLanguage) {
    this.id = userLanguage.id;
    this.language = userLanguage.language; 
    this.user = userLanguage.user;  
    this.choose = userLanguage.choose;
  }
}
