export interface IUser {
    id?: string;
    name: string;
    cpf: string;
    birthdate: Date;
    gender: string;
    email: string;
    password: string;
    phone: string;
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    type?: string;
}