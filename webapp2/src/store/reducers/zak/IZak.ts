export interface IProc {
    id: string
    title: string
    num: string
    status: string
    desc: string
    date_start: string
    date_end: string
}

export interface IZak {
    procList: IProc[]
}