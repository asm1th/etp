export interface IEtapItem {
    id: number,
    etapId: number,
    name: string,
    ei_id: number,
    ei_name: string,
    ei_value: string,
    ei_price: string,
    ei_name_disable: boolean,
    ei_value_disable: boolean,
    nds: number,
    nds_text: string,
    nds_statia: string,
    summ: string,
    summ_nds: string,
    sub: {
        isSub: boolean,
        name: string,
    }
}
export interface IEtap {
    id: number,
    name: string,
    //etapItems: IEtapItem[]
    etapSumm: string,
    etapSumm_nds: string,
    noNds: true,
    noNdsStatia: string,
}
export interface ISamp {
    kp_sample_guid: string,
    lot_id: number,
    lot_name: string,
    participant_name: string,
    valuta: string,
    dateStartKP: number | Date,
    dateEndKP: number | Date,
    trip: {
        isTrip: boolean,
        tripPrice: string,
        tripComment: string,
    },
    dateContract: number | Date,
    dateKP: Date | null,
    valutaKP: number | null,
    etapItems: IEtapItem[],
    etapsSumms: IEtap[],
    summKP: string,
    summKP_nds: string,
    isLoading: boolean,
    error: string
}

//===================


export interface ISampNew {
    kp_sample_guid: string,
    link: string,
    konkurs_id: string,
    konkurs_name: string,
    lot_id: string,
    lot_name: string,
    waers: string,
    kp_accep_date: null | string | number | Date,
    kp_send_date: null | string | number | Date,
    links: ILink,
    stags: IStag[],
}

export interface ILink {
    link: string,
    info_ka_email: string,
    info_ka_name: string,
    kp_offer_expire_date: null | string | number | Date,
    travel_exp: number | string,
    travel_exp_comm: string
}

export interface IStag {
    kp_stage_guid: string,
    kp_sample_guid: string,
    opr_usl_stage_id: string,
    opr_usl_stage: string,
    opr_usl_stage_num: number | string,
    units: IUnit[]
}

export interface IUnit {
    kp_unit_guid: string,
    kp_stage_guid: string,
    opr_usl_unit_id: string,
    usl_quan_unit: string,
    opr_usl_unit: string,
    nsu_menge: number | string,
    vat_rate: string,
    opr_usl_unit_restr_quan: string,
    opr_usl_unit_restr_menge: string,
    usrps: IUsrp[]
}


export interface IUsrp {
    kp_unit_guid: string,
    link_id: string,
    prices_user: number | string,
    usl_quan_unit: string,
    nsu_menge: number | string,
    vat_rate: string,
    alt_name_unit: string,
    nds_comm: string
}