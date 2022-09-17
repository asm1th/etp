export interface IZak {
    procList: IProc[]
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
