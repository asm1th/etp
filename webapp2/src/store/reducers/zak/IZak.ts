export interface IZak {
    procList: IProc[]
    zakForm: IZakForm
    criterions: IZakCriterionsRow[]
    docs: IDocsRow[]
    formPrice: IFormPrice
}

export interface IProc {
    id: string
    title: string
    num: string
    status: string
    desc: string
    date_start: string
    date_start_time: string
    date_end: string
    date_end_time: string
    lots: ILot[]
}

export interface ILot {
    id: string
    title: string
    descr: string
    status: string
    num: string
    price: string
    price_nds: string
    full_price: string
    waers: string
    closed: boolean
    start_date: string,
    start_time: string
    files: IFile[]
}

export interface IFile {
    fileName: string
    fileExtension: string
    fileDescription: string
}

export interface IZakForm {
    fio: string
    phone: string
    address: string
    email: string
}

export interface IZakCriterionsRow {
    id: string
    num: string
    name: string
    critNum: string
    status: boolean
    menge: string
    treb: string
    docs: string
    answer: string
    answer_descr: string
    action: boolean
    rows: IZakCriterionsRow[]
}

export interface IDocFile {
    fileName: string
    fileExtension: string
    fileBody: string
    fileCreated: string
    fileUser: string
}

export interface IDocsRow {
    id: string
    num: string
    reqired: boolean
    title: string
    ki: boolean
    format: string
    fileName: string
    file: IDocFile[]
    action: boolean
}

export interface IFormPrice {
   waers: string
   price: string
}