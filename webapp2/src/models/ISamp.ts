export interface ISamp {
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
    saveDate: string
    isValidateOn: boolean

    sample_type: string

    //costmetod
    "full_laboriousness": string
    costs: ICosts

    cost_sums: {
        "cost_insurance": {
            "sum_cntrb_oms": string
            "sum_cntrb_pension": string
            "sum_cntrb_disability": string
        }
        "cost_depreciation": {
            "sum_price_per_month": string
            "sum_price": string
            "sum_price_per_user": string
            "sum_cost_meins_price": string
        }
        "cost_other_bfoh": {
            "sum_full_price": string
            "sum_user_per_month": string
            "sum_price_per_user_per_month": string
        }
        "cost_overhead": string[]
        "cost_profitability": string
        "cost_other": {
            "sum_full_price": string
            "sum_user_per_month": string
            "sum_price_per_user_per_month": string
        }
        "cost_btrip": {
            "sum_full_price": "0",
            "sum_user_per_month": "0",
            "sum_price_per_user_per_month": "0",
        }
    }
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

export interface  IFileId  {
    file_guid: string
    bsid: string
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
    isValid: boolean
    nds_comm: string
    //cost
    cost_stage_price_ei: string
    cost_stage_price: string
    cost_stage_price_nds: string
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

    //cost
    work_days: string
    sum_price_ei: string
    sum_price: string
    sum_price_nds: string
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


//Заработная плата
export interface ISalary {
    "kp_unit_guid": string //GUID КР
    "kp_unit_salary": string  //Заработная плата

    //for app
    "cost_name": string
    "usl_quan_unit": string
    "cntrb_oms": string
    "cntrb_pension": string
    "cntrb_disability": string
    "profitability": string

    "cost_overhead": string
    "cost_time_per_month": string
    "rate_per_month": string
    "rate_per_day": string
}

//Амортизация
export interface ICostDepreciation {
    "kp_cost_guid": string  //GUID затраты
    "cost_type": string  //1
    "cost_name": string //Наименование
    "cost_menge": string //Количество ЕИ
    "cost_months_use": string  //Кол-во месяцев использования
    "cost_months_useful": string //Срок полезного использования
    "cost_meins_price": string //Стоимость ЕИ
    "cost_per_month": string  //Кол-во чел\мес

    "key": number
    "price_per_month": string
    "price": string
    "price_per_user_per_month": string
}

//Накладные расходы(2 таблицы: Наименование затры и %)
export interface ICostOverhead {
    "cost_id": string //ID
    "cost_description": string //Наименование
    "cost_value": string //Значение

    //
    "cost_array": ICostArray[]
    "required": boolean
    "summ_cost": string
}

export interface ICostArray {
    "cost_name": string
    "value": string
}

//Прочие до НР
export interface ICostOtherBfoh {
    "kp_cost_guid": string //GUID затраты
    "cost_type": number  //2
    "cost_name": string //Наименование
    "cost_meins": string //ЕИ
    "cost_menge": string //Количество ЕИ
    "cost_month": string //Количество месяцев
    "cost_price": string //Цена

    "key": number
    "user_per_month": string
    "full_price": string
    "price_per_user_per_month": string
}

//Иные затраты
export interface ICostOther {
    "kp_cost_guid": string //GUID затраты
    "cost_type": number  //3
    "cost_name": string //Наименование
    "cost_meins": string //ЕИ
    "cost_menge": string //Количество ЕИ
    "cost_month": string //Количество месяцев
    "cost_price": string //Цена

    "key": number
    "user_per_month": string
    "full_price": string
    "price_per_user_per_month": string
}

//Командировочные расходы(по специалистам)
export interface ICostBtrip {
    "kp_btrip_guid": string //GUID командировочных расходов 
    "kp_unit_guid": string //GUID КР
    "pers_count": string //Количество человек
    "btrip_days": string //Количество дней
    "btrip_cost": string //Проезд в одну сторону
    "btrip_day_cost": string //Проживание в 1 сутки
    "btrip_day_allow": string //Суточные
    //added
    "key": number
    "cost_name": string
    "full_price": string
    "user_per_day": string
    "user_per_month": string
    "price_per_user_per_month": string
}

export interface ICosts {
    "cntrb_oms": string  //Взносы в фонд ОМС
    "cntrb_pension": string //Взносы в ПФ
    "cntrb_disability": string//Отчисления по временной нетрудоспособности
    "profitability": string //Рентабельность
    "salary": ISalary[]
    "cost_depreciation": ICostDepreciation[]
    "cost_overhead": ICostOverhead[]
    "btrip_price": string //Командировочные расходы(общая)
    "cost_other_bfoh": ICostOtherBfoh[]
    "cost_other": ICostOther[]
    "cost_btrip": ICostBtrip[]
    "cost_result": {
        "kp_price_ei": string
        "kp_price": string
        "kp_price_nds": string
    }

    //added
    "link": string
    "kp_stage_guid": string
}
