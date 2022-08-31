export interface ISampNew {
    kp_sample_guid: string,
    link: string,
    konkurs_id: string,
    konkurs_name: string,
    lot_id: string,
    lot_name: string,
    waers: string,
    kp_accep_date: string,
    kp_send_date: string,
    usl_period_end: string,
    links: ILink,
    stags: IStag[],
}

export interface ILink {
    link: string,
    info_ka_email: string,
    info_ka_name: string,
    kp_offer_expire_date: string | null,
    travel_exp: string | null,
    travel_exp_comm: string | null
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