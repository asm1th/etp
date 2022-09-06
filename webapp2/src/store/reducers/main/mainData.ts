import { IMain, IEtap, IEtapItem } from "../../../models/IMain"

export const EtapItems: IEtapItem[] = [{
    id: 1,
    etapId: 1,
    name: "Архитектор",
    ei_id: 2,
    ei_name: "Ч/Д",
    ei_value: "10",
    ei_price: "10",
    ei_name_disable: true,
    ei_value_disable: true,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: true,
        name: "Специалист по документации"
    }
}, {
    id: 2,
    etapId: 1,
    name: "Бизнес аналитик",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_name_disable: true,
    ei_value_disable: true,
    nds: 20,
    nds_text: "20%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 3,
    etapId: 1,
    name: "Руководитель проекта",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_name_disable: false,
    ei_value_disable: false,
    nds: 0,
    nds_text: "Без НДС",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 4,
    etapId: 1,
    name: "Разработчик",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 5,
    etapId: 1,
    name: "Технический писатель",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 6,
    etapId: 1,
    name: "Системный аналитик",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 7,
    etapId: 4,
    name: "Консультант",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 8,
    etapId: 4,
    name: "Аналитик данных (Data Scientist)",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 9,
    etapId: 4,
    name: "Менеджер проекта",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 10,
    etapId: 2,
    name: "Менеджер проекта",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}, {
    id: 11,
    etapId: 3,
    name: "Менеджер проекта",
    ei_id: 1,
    ei_name: "Ч/Ч",
    ei_value: "10",
    ei_price: "10",
    ei_value_disable: false,
    ei_name_disable: false,
    nds: 10,
    nds_text: "10%",
    nds_statia: "",
    summ: "-- --",
    summ_nds: "-- --",
    sub: {
        isSub: false,
        name: ""
    }
}]

export const Etaps: IEtap[] = [{
    id: 1,
    //etapItems: EtapItems,
    name: "Разработка документации",
    etapSumm: "-- --",
    etapSumm_nds: "-- --",
    noNds: true,
    noNdsStatia: "15",
},{
    id: 2,
    //etapItems: EtapItems,
    name: "MVP",
    etapSumm: "-- --",
    etapSumm_nds: "-- --",
    noNds: true,
    noNdsStatia: "15",
},{
    id: 3,
    //etapItems: EtapItems,
    name: "Тестирование",
    etapSumm: "-- --",
    etapSumm_nds: "-- --",
    noNds: true,
    noNdsStatia: "15",
},{
    id: 4,
    //etapItems: EtapItems,
    name: "Консультационные услуги",
    etapSumm: "-- --",
    etapSumm_nds: "-- --",
    noNds: true,
    noNdsStatia: "15",
}]

export const initialState: IMain = {
    kp_sample_guid: "0050569CDC861EED87DD0FCCDBEA808C",

    lot_id: 1,
    lot_name: "Разработка системы по проведению Закупочных процедур",
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

    etapItems: EtapItems,
    etapsSumms: Etaps,

    summKP: "-- --",
    summKP_nds: "-- --",

    isLoading: false,
    error: ""
}
