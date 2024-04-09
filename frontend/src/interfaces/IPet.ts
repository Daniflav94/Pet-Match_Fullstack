import { IOrganization } from "./IOrganization";

export interface IPet {
    uid?: string;
    type: "dog" | "cat";
    name: string;
    age: string;
    gender: string;
    size: string;
    photo: string;
    isAdopt: boolean;
    personality: string[];
    organization: IOrganization;
}