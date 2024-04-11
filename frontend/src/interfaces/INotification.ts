import { IFormAdoption } from "./IFormAdoption";

export interface INotification {
    id?: string;
    idReceiver: string;
    type: string;
    formAdoption?: IFormAdoption;
    formAdoptionId?: string;
    isViewed?: boolean;
    createdAt?: Date;
    wasApproved?: boolean
    message?: string;
}