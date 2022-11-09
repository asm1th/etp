import { IDash } from "./IDash"

export const initialState: IDash = {
    isToggleSidebar: true,
    dashItems: [{
        id: 1,
        label: "Расценки от контрагентов",
        num: 44,
        status: "up",
        percent: 7,
        period: "За неделю",
        url: "/etp/rnmc?samp=0050569CDC861EED87DD0FCCDBEA808C",
        chart_type: "column" ,
        chart: []
    }, {
        id: 2,
        label: "Заявки на участие в процедуре",
        num: 2245,
        status: "down",
        percent: 5,
        period: "За год",
        url: "/etp/zak",
        chart_type: "column" ,
        chart: [
            { parameter: 'Параметр 1', number: 1234 },
            { parameter: 'Параметр 2', number: 1083 },
            { parameter: 'Параметр 3', number: 672 },
            { parameter: 'Параметр 4', number: 301 },
            { parameter: 'Параметр 5', number: 167 }]
    }, {
        id: 3,
        label: "Счет-фактуры",
        num: 23,
        status: "up",
        percent: 1,
        period: "За неделю",
        url: "/etp/zak",
        chart_type: "column" ,
        chart: [
            { parameter: 'Параметр 1', number: 12 },
            { parameter: 'Параметр 2', number: 16 },
            { parameter: 'Параметр 3', number: 11 },
            { parameter: 'Параметр 4', number: 12 },
            { parameter: 'Параметр 5', number: 21 },
            { parameter: 'Параметр 6', number: 21 },
            { parameter: 'Параметр 7', number: 23 }]
    }, {
        id: 4,
        label: "Предквалификация",
        num: 2245,
        status: "down",
        percent: 5,
        period: "За год",
        url: "/etp/zak",
        chart_type: "column" ,
        chart: []
    }, {
        id: 5,
        label: "Отборы по НСУ",
        num: 142,
        status: "down",
        percent: 5,
        period: "За год",
        url: "/etp/zak",
        chart_type: "column" ,
        chart: [
            { parameter: 'Параметр 1', number: 1233 },
            { parameter: 'Параметр 2', number: 4533 },
            { parameter: 'Параметр 3', number: 3456 },
            { parameter: 'Параметр 4', number: 2346 },
            { parameter: 'Параметр 5', number: 1231 }]
    }, 
    // {
    //     id: 6,
    //     label: "Управление выполнением работ",
    //     num: 83,
    //     status: "down",
    //     percent: 5,
    //     period: "За год",
    //     url: "/etp/zak",
    //     chart_type: "column" ,
    //     chart: [
    //         { parameter: 'Параметр 1', number: 33 },
    //         { parameter: 'Параметр 2', number: 23 },
    //         { parameter: 'Параметр 3', number: 62 },
    //         { parameter: 'Параметр 4', number: 31 },
    //         { parameter: 'Параметр 5', number: 16 }]
    // }, {
    //     id: 7,
    //     label: "Поставщик МТР",
    //     num: 456,
    //     status: "down",
    //     percent: 5,
    //     period: "За год",
    //     url: "/etp/zak",
    //     chart_type: "column" ,
    //     chart: []
    // }, 
    // {
    //     id: 8,
    //     label: "Личный кабинет КА",
    //     num: 42,
    //     status: "down",
    //     percent: 1,
    //     period: "За год",
    //     url: "/etp/zak",
    //     chart_type: "column" ,
    //     chart: []
    // }, {
    //     id: 9,
    //     label: "Сфера ПРО",
    //     num: 14,
    //     status: "up",
    //     percent: 2,
    //     period: "За год",
    //     url: "/etp/zak",
    //     chart_type: "column" ,
    //     chart: [
    //         { parameter: 'Параметр 1', number: 2563 },
    //         { parameter: 'Параметр 2', number: 2383 },
    //         { parameter: 'Параметр 3', number: 2345 },
    //         { parameter: 'Параметр 4', number: 301 },
    //         { parameter: 'Параметр 5', number: 2345 }]
    // }, {
    //     id: 10,
    //     label: "Закупочные процедуры",
    //     num: 22,
    //     status: "up",
    //     percent: 1,
    //     period: "За неделю",
    //     url: "/etp/zak",
    //     chart_type: "column" ,
    //     chart: [
    //         { parameter: 'Параметр 1', number: 1234 },
    //         { parameter: 'Параметр 2', number: 1083 },
    //         { parameter: 'Параметр 3', number: 672 },
    //         { parameter: 'Параметр 4', number: 301 },
    //         { parameter: 'Параметр 5', number: 167 }]
    // }
]
}



