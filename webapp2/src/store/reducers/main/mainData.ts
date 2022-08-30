import { ISamp } from "../../../models/ISamp"
import { IEtap } from "../../../models/ISamp"
import { IEtapItem } from "../../../models/ISamp"
import { ISampNew } from "../../../models/ISamp"

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

export const initialState: ISamp = {
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

export const initialStateNew: ISampNew = {
        "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
        "link": "0050569CDC861EDD87F2DC5C6EC0CFA1",
        "konkurs_id": "100000037153",
        "konkurs_name": "Аренда недвижимости_test",
        "lot_id": "100000037154",
        "lot_name": "Аренда недвижимости",
        "waers": "RUB",
        "kp_accep_date": "2022-08-18",
        "kp_send_date": "2022-08-10",
        "links": {
          "link": "0050569CDC861EDD87F2DC5C6EC0CFA1",
          "info_ka_email": "test@adsdddd.com",
          "info_ka_name": "Петр Петров Петрович",
          "kp_offer_expire_date": null,
          "travel_exp": "0.00",
          "travel_exp_comm": ""
        },
        "stags": [
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEAA08C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "7",
            "opr_usl_stage": "ПриобретениеАЗСиземли",
            "opr_usl_stage_num": 1,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEAC08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEAA08C",
                "opr_usl_unit_id": "28",
                "usl_quan_unit": "OBJ",
                "opr_usl_unit": "Стоимость земельного участка",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEAC08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "OBJ",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEAC08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "OBJ",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEAE08C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "11",
            "opr_usl_stage": "Арендаземли",
            "opr_usl_stage_num": 2,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB008C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEAE08C",
                "opr_usl_unit_id": "68",
                "usl_quan_unit": "HAR",
                "opr_usl_unit": "Стоимость права аренды земельного участка",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB008C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "HAR",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB008C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "HAR",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB208C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEAE08C",
                "opr_usl_unit_id": "68",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Стоимость права аренды земельного участка",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB208C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB208C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB408C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEAE08C",
                "opr_usl_unit_id": "68",
                "usl_quan_unit": "TAG",
                "opr_usl_unit": "Стоимость права аренды земельного участка",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB408C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "TAG",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB408C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "TAG",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "12",
            "opr_usl_stage": "Аренданежилыхпомещений",
            "opr_usl_stage_num": 3,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB808C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "M2 ",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB808C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEB808C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEBA08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "MON",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEBA08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "MON",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEBA08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "MON",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEBC08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEBC08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEBC08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEC408C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "73",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "Аренда офисного помещения",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEC408C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEC408C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEC608C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "254",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "Аренда складских помещений",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEC608C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEC608C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87E2678541A2EC19",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "69",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "Переменная часть арендной платы",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87E2678541A2EC19",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87E2678541A2EC19",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87E2678541A30C19",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "69",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Переменная часть арендной платы",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87E2678541A30C19",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87E2678541A30C19",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87E2678541A32C19",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEB608C",
                "opr_usl_unit_id": "70",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "Постоянная часть арендной платы",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87E2678541A32C19",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87E2678541A32C19",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEC808C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "25",
            "opr_usl_stage": "Арендапарковочныхмест",
            "opr_usl_stage_num": 4,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBECA08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEC808C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "ST",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBECA08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "ST",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBECA08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "ST",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBECC08C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "44",
            "opr_usl_stage": "Расходынасодержаниеофисов",
            "opr_usl_stage_num": 5,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBECE08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBECC08C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBECE08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBECE08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED008C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBECC08C",
                "opr_usl_unit_id": "566",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "Коммунальные услуги (в т.ч. электроэнергия, водоотведение и водоснабжение, теплоснабжение, вывоз мусора, холодоснабжение)",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED008C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED008C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "63",
            "opr_usl_stage": "Арендаподъездногожелезнодорожногопути",
            "opr_usl_stage_num": 6,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED408C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
                "opr_usl_unit_id": "134",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Текущий ремонт",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED408C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED408C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED608C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
                "opr_usl_unit_id": "135",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Амортизация",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED608C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED608C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED808C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
                "opr_usl_unit_id": "136",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Техническое обслуживание",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED808C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBED808C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDA08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
                "opr_usl_unit_id": "137",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Налог на землю",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDA08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDA08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDC08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
                "opr_usl_unit_id": "138",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Налог на имущество",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDC08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDC08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              },
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDE08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBED208C",
                "opr_usl_unit_id": "139",
                "usl_quan_unit": "SRV",
                "opr_usl_unit": "Прочие эксплуатационные расходы",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDE08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEDE08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "SRV",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEE008C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "64",
            "opr_usl_stage": "АрендаАЗС",
            "opr_usl_stage_num": 7,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEE208C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEE008C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "MON",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEE208C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "MON",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEE208C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "MON",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEE408C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "490",
            "opr_usl_stage": "Арендалесногоучастка",
            "opr_usl_stage_num": 8,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEE608C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEE408C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "ST",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEE608C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "ST",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEE608C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "ST",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEE808C",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "491",
            "opr_usl_stage": "Арендаоткрытойстоянки",
            "opr_usl_stage_num": 9,
            "units": [
              {
                "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEEA08C",
                "kp_stage_guid": "0050569CDC861EED87DD0FCCDBEE808C",
                "opr_usl_unit_id": "1",
                "usl_quan_unit": "M2",
                "opr_usl_unit": "-",
                "nsu_menge": "0.000",
                "vat_rate": "",
                "opr_usl_unit_restr_quan": "",
                "opr_usl_unit_restr_menge": "",
                "usrps": [
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEEA08C",
                    "link_id": "0050569CDC861EDD87F2DE202ED7AFAB",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  },
                  {
                    "kp_unit_guid": "0050569CDC861EED87DD0FCCDBEEA08C",
                    "link_id": "0050569CDC861EDD87F2DC5C6EC0CFA1",
                    "prices_user": "0.00",
                    "usl_quan_unit": "M2",
                    "nsu_menge": "0.000",
                    "vat_rate": "",
                    "alt_name_unit": "",
                    "nds_comm": "22.08.2022"
                  }
                ]
              }
            ]
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD401C771320EC",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "0",
            "opr_usl_stage": "",
            "opr_usl_stage_num": 12,
            "units": []
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD1C6DB84B80A3",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "0",
            "opr_usl_stage": "",
            "opr_usl_stage_num": 10,
            "units": []
          },
          {
            "kp_stage_guid": "0050569CDC861EED87DD4016380D60EC",
            "kp_sample_guid": "0050569CDC861EED87DD0FCCDBEA808C",
            "opr_usl_stage_id": "0",
            "opr_usl_stage": "",
            "opr_usl_stage_num": 11,
            "units": []
          }
        ]
      
}