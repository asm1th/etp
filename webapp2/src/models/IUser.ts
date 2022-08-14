export interface IUser {
    id: number;
    lastname: string;
    firstname: string;
    patronymic: string;
    email: string;
    username: string;
    password: string;
    resident: true;
    individual: true;
    org_fullname: string;
    org_shortname: string;
    org_telephone: string;
    org_email: string;
}