export interface ISampNew {
    kp_sample_guid: string

    konkurs_id: string
    konkurs_name: string
    lot_id: string
    lot_name: string
    waers: string
    kp_accep_date: string
    kp_send_date: string
    links: ILink
    stags: IStag[]
    files: IFileKP[]
    // no in portal /samp/ service
    link: string
    usl_period_end: string
    // added
    kp_summ: string
    kp_summ_nds: string
    isTravel: boolean
}

export interface IFileKP {
    "file_mime_type": string
    "file_body": string
    "file_size": string
    "description": string
    "file_guid": string
    "file_name": string
    "file_type": string
    "file_docid": string
}


export interface ILink {
    link: string
    info_ka_email: string
    info_ka_name: string
    kp_offer_expire_date: string | null
    travel_exp: string | null
    travel_exp_comm: string | null
    //added
    kp_sample_guid: string
}

export interface IStag {
    kp_stage_guid: string
    kp_sample_guid: string
    opr_usl_stage_id: string
    opr_usl_stage: string
    opr_usl_stage_num: number
    units: IUnit[]
    // added
    isNoNds: boolean
    stagSumm: string
    stagSumm_nds: string
}

export interface IUnit {
    kp_unit_guid: string
    kp_stage_guid: string
    opr_usl_unit_id: string
    usl_quan_unit: string
    opr_usl_unit: string
    nsu_menge: string
    vat_rate: string
    opr_usl_unit_restr_quan: string
    opr_usl_unit_restr_menge: string
    usrps: IUsrp[]
}

export interface IUsrp {
    kp_unit_guid: string
    kp_usrp_guid: string
    link_id: string
    prices_user: string
    usl_quan_unit: string
    usl_quan_unit_txt: string
    nsu_menge: string
    vat_rate: string
    alt_name_unit: string
    nds_comm: string
    // added
    isSubToggle: boolean
    summ: string
    summ_nds: string
    isValid: boolean
    price_date: string //YYYYMMDD
    price_time: string //HHMMSS
}


export interface IFileTZ {
    file_guid: string
    file_name: string
    file_type: string
    file_size: number
    file_mime_type: string
    file_body: string
    description: string
}
