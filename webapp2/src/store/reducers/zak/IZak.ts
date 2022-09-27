export interface IZak {
    procList: IProc[]
    zakForm: IZakForm
    zakFormErrors: IZakFormErrors
    zakFormTabs: IZakFormTab[]
    zakFormCurrentTab: IZakFormTab
    criterions: IZakCriterionsRow[]
    docs: IDocsRow[]
    zakPrice: IZakPrice
    isZakReadyToSend: boolean
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
    start_date: string
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

export interface IZakFormErrors {
    fio: string
    phone: string
    address: string
    email: string
}

export interface IZakFormTab {
    name: string
    isValid: boolean
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

export interface IZakPrice {
   waers: string
   price: string
   price_vat: string
   date_start_from: string
   date_start_to: string
   date_end_from: string
   date_end_to: string
   vat: string
   is_vat: boolean
   full_price: string
   full_price_vat: string
}