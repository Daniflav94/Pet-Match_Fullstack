import { IOrganization } from "./IOrganization";

export interface IPet {
    id?: string;
    type: "dog" | "cat";
    name: string;
    age: string;
    gender: string;
    size: string;
    photo: string;
    isAdopt: boolean;
    personality: string[];
    organization: IOrganization;
    createdAt?: Date;
}