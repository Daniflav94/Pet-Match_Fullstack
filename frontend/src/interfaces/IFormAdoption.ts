import { IPet } from "./IPet";

export interface IFormAdoption {
  uid?: string;
  name: string;
  birthdate: string;
  email: string;
  state: string;
  city: string;
  liveIn: string;
  children: string;
  isFirstPet: string;
  pets: string;
  describePets?: string;
  pet: IPet;
  uidUser: string;
}
