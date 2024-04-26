import { IOrganization } from "./IOrganization";

export interface IPet {
    id?: string;
    type: string;
    name: string;
    age: string;
    gender: string;
    size: string;
    photo: string;
    isAdopt: boolean;
    personality: string[];
    organization?: IOrganization;
    organizationId?: string;
    createdAt?: Date;
}