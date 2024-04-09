export interface IOrganization {
    id?: string;
    email: string;
    password: string;
    phone?: string;
    cel: string;
    cnpj: string;
    name: string;
    photo?: string;
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    number: string;
    openingHours: string;
    type?: string;
}