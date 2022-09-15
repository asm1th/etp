import { IZak, IProc } from "./IZak"

export const procList: IProc[] = [{
        id: '10000042371',
        title: 'АО «Газпромнефть-ОНПЗ»',
        num: '01-0017504-300-2020',
        desc: 'Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»',
        date_start: '17.02.2020',
        date_end: '03.03.2020',
        status: ''
    }, {
        id: '10000042372',
        title: 'АО «Газпромнефть МЗСМ»',
        num: '01-0089872-309-2022',
        desc: 'Оказание консультационных услуг по доработке действующей системы энергетического менеджмента на соответствие требованиям меж...',
        date_start: '01.03.2022',
        date_end: '16.03.2022',
        status: ''
    }, {
        id: '10000042373',
        title: 'ПАО «Газпромнефть»',
        num: '01-0082996-204-2021',
        desc: 'Открытый двухэтапный конкурентный отбор в электронной форме на право заключения договора на выполнение работ по услуге 11037...',
        date_start: '11.11.2021',
        date_end: '01.12.2021',
        status: ''
}]

export const initialState: IZak = {
    procList: procList
}
