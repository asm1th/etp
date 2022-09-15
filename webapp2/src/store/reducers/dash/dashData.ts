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
        url: "/etp/rnmc?kp_sample_guid=0050569CDC861EED87DD0FCCDBEA808C",
        chart: []
    }, {
        id: 2,
        label: "Закупки",
        num: 2245,
        status: "down",
        percent: 5,
        period: "За год",
        url: "/etp/zak",
        chart: [
            { parameter: 'Параметр 1', number: 1234 },
            { parameter: 'Параметр 2', number: 1083 },
            { parameter: 'Параметр 3', number: 672 },
            { parameter: 'Параметр 4', number: 301 },
            { parameter: 'Параметр 5', number: 167 }]
    }]
}
