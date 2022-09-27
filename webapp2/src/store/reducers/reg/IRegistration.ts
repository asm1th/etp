export interface IRegData {
    lastname: string
    firstname: string
    patronymic: string
    email: string
    org_fullname: string
    org_shortname: string
    org_telephone: string
    org_email: string
    password: string
    inn: string
    kpp: string
    isResident: boolean
    isIndividual: boolean
    isToken: boolean
    isSmsp: boolean

    regnum: string
    country: string
}

export interface IFormErrors {
    "lastname": string
    "firstname": string
    "patronymic": string
    "email": string
    "org_fullname": string
    "org_shortname": string
    "org_telephone": string
    "org_email": string
    "password": string
    "inn": string
    "kpp": string
    "isResident": string
    "isIndividual": string
    "isToken": string
    "isSmsp": string

    "regnum": string
    "country": string
}

export const regData: IRegData = {
    "lastname": "aa",
    "firstname": "aa",
    "patronymic": "aa",
    "email": "aa@aa.aa",
    "org_fullname": "aa",
    "org_shortname": "aa",
    "org_telephone": "+7",
    "org_email": "aa@aa.aa",
    "password": "1",
    "inn": "5504036333",
    "kpp": "111111111",
    "isResident": false,
    "isIndividual": false,
    "isToken": false,
    "isSmsp": false,

    "regnum": "",
    "country": ""
}