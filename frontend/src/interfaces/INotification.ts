import { IFormAdoption } from "./IFormAdoption";

export interface INotification {
    uid?: string;
    uidReceiver: string;
    type: string;
    formAdoption?: IFormAdoption;
    isViewed: boolean;
    createdAt: string;
    wasApproved?: boolean
    message?: string;
}