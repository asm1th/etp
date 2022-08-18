import { IMainData } from "../../../models/IMainData"
import { IEtap } from "../../../models/IMainData"
import { IEtapItem } from "../../../models/IMainData"

export const EtapItems: IEtapItem[] = [{
    id: 1,
    name: "Архитектор",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "50",
    ei_price: "3500",
    nds: 10,
    nds_text: "10%",
    summ: "0",
    summ_nds: "0",
    sub: {
        isSub: false,
        name: "",
        statia: "",
    }
}, {
    id: 2,
    name: "Бизнес аналитик",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "50",
    ei_price: "3100",
    nds: 20,
    nds_text: "20%",
    summ: "0",
    summ_nds: "0",
    sub: {
        isSub: false,
        name: "",
        statia: "12",
    }
}, {
    id: 3,
    name: "Руководитель проекта",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "150",
    ei_price: "3000",
    nds: 10,
    nds_text: "10%",
    summ: "0",
    summ_nds: "0",
    sub: {
        isSub: false,
        name: "",
        statia: "12",
    }
}, {
    id: 4,
    name: "Разработчик",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "100",
    ei_price: "2600",
    nds: 10,
    nds_text: "10%",
    summ: "0",
    summ_nds: "0",
    sub: {
        isSub: false,
        name: "",
        statia: "12",
    }
}, {
    id: 5,
    name: "Технический писатель",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "100",
    ei_price: "2100",
    nds: 10,
    nds_text: "10%",
    summ: "0",
    summ_nds: "0",
    sub: {
        isSub: false,
        name: "",
        statia: "12",
    }
}, {
    id: 6,
    name: "Системный аналитик",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "100",
    ei_price: "2700",
    nds: 10,
    nds_text: "10%",
    summ: "0",
    summ_nds: "0",
    sub: {
        isSub: false,
        name: "",
        statia: "12",
    }
}]

export const Etaps: IEtap[] = [{
    id: 1,
    etapItems: EtapItems,
    summEtap: "0",
    summEtap_nds: "0",
}]

export const initialState: IMainData = {
    lot: "Разработка системы по проведению Закупочных процедур",
    participant_name: "АО “Софлайн Солюшн”",
    valuta: "RUB",
    dateStartKP: new Date(2022, 8, 1),
    dateEndKP: new Date(2022, 9, 10),

    trip: {
        isTrip: false,
        tripPrice: "",
        tripComment: "Тест",
    },
    dateContract: new Date(2022, 9, 17),
    dateKP: new Date(2022, 8, 17),
    valutaKP: null,

    etaps: EtapItems,
    etapsSumms: Etaps,

    summKP: "0",
    summKP_nds: "0",
    noNds: false,
    noNdsStatia: "",

    isLoading: false,
    error: ''
}