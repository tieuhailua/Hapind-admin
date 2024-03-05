import { Pet } from "./pet.model";
import { User } from "./user.model";

export class UserPet {
  id: number;
  pet: Pet;
  user: User;
  choose: boolean;

  constructor(userPet) {
    this.id = userPet.id;
    this.pet = userPet.pet; 
    this.user = userPet.user;  
    this.choose = userPet.choose;
  }
}
