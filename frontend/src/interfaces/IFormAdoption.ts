import { IPet } from "./IPet";
import { IUser } from "./IUser";

export interface IFormAdoption {
  id?: string;
  user?: IUser;
  userId?: string;
  liveIn: string;
  children: boolean;
  isFirstPet: boolean;
  pets: boolean;
  describePets?: string;
  pet: IPet;
  createdAt?: Date;
}
