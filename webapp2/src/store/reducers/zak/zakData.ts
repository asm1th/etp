import { IZak, IProc, ILot, IFile, IZakForm } from "./IZak"


export const files: IFile[] = [{
    fileName: "Приложение №2 Техническое задание.7z",
    fileExtension: "zip",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
},{
    fileName: "Извещение-48-ОНПЗ.doxc",
    fileExtension: "doc",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
},{
    fileName: "Приложение №1 Проект формы договора.7z",
    fileExtension: "zip",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
},{
    fileName: "Информационное письмо-48-ОНПЗ.pdf",
    fileExtension: "pdf",
    fileDescription: "1,5 Mб  21.02.2019, 14:12"
}]

export const lots: ILot[] = [{
    id: "10000042873",
    title: "Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»",
    descr: "Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»",
    status: "ЗАЯВКА НЕ ПОДАНА",
    num: "1",
    price: "111",
    price_nds: "112",
    full_price: "113",
    waers: "RUB",
    closed: false,
    start_date: "11.02.2020",
    start_time: "9:10",
    files: files
},{
    id: "10000042874",
    title: "лот 2",
    descr: "Описания лота 2",
    status: "ЗАЯВКА ПОДАНА",
    num: "2",
    price: "111",
    price_nds: "112",
    full_price: "113",
    waers: "RUB",
    closed: true,
    start_date: "11.02.2020",
    start_time: "9:10",
    files: files
}]

export const procList: IProc[] = [{
        id: '10000042371',
        title: 'АО «Газпромнефть-ОНПЗ»',
        num: '01-0017504-300-2020',
        desc: 'Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»',
        date_start: '17.02.2020',
        date_start_time: '12:00',
        date_end: '03.03.2020',
        date_end_time: '12:00',
        status: 'Заявка не подана',
        lots: lots
    }, {
        id: '10000042372',
        title: 'АО «Газпромнефть МЗСМ»',
        num: '01-0089872-309-2022',
        desc: 'Оказание консультационных услуг по доработке действующей системы энергетического менеджмента на соответствие требованиям меж...',
        date_start: '01.03.2022',
        date_start_time: '12:00',
        date_end: '03.03.2020',
        date_end_time: '12:00',
        status: 'Заявка не подана',
        lots: lots
    }, {
        id: '10000042373',
        title: 'ПАО «Газпромнефть»',
        num: '01-0082996-204-2021',
        desc: 'Открытый двухэтапный конкурентный отбор в электронной форме на право заключения договора на выполнение работ по услуге 11037...',
        date_start: '11.11.2021',
        date_start_time: '12:00',
        date_end: '03.03.2020',
        date_end_time: '12:00',
        status: 'Заявка не подана',
        lots: lots
}]

export const zakForm: IZakForm = {
    fio: "",
    phone: "",
    address: "",
    email: ""
}

export const initialState: IZak = {
    procList: procList,
    zakForm: zakForm
}