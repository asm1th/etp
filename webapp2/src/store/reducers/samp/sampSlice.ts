import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./sampData"
import { sampAPI } from '../../../services/SampService'
import { ICostArray, ICostBtrip, ICostDepreciation, ICostOther, ICostOtherBfoh, ICostOverhead, ISalary, ISamp, IStag, IUnit, IUsrp } from "../../../models/ISamp";
import { format } from "date-fns";
import { numberWithSpaces } from "../../../helpers";


const findStage = (stags: IStag[], kp_stage_guid: string) => {
    return stags[stags.findIndex(stag => stag.kp_stage_guid === kp_stage_guid)]
}

const findUnit = (units: IUnit[], kp_unit_guid: string) => {
    return units[units.findIndex(unit => unit.kp_unit_guid === kp_unit_guid)]
}

const findUsrps = (usrps: IUsrp[], link_id: string) => {
    return usrps[usrps.findIndex(usrps => usrps.link_id === link_id)]
}

type IUnitFinder = {
    kp_stage_guid: string
    kp_unit_guid: string
    link_id: string
}

type IUnitStringPayload = {
    UnitFinder: IUnitFinder
    value: string
}

const getUnit = (stags: IStag[], UnitFinder: IUnitFinder) => {
    const thisStage = findStage(stags, UnitFinder.kp_stage_guid)
    const thisUnit = findUnit(thisStage.units, UnitFinder.kp_unit_guid)
    return thisUnit
}
const getUspsr = (stags: IStag[], UnitFinder: IUnitFinder) => {
    const thisUnit = getUnit(stags, UnitFinder)
    const thisUsrp = findUsrps(thisUnit.usrps, UnitFinder.link_id)
    return thisUsrp
}

const setPayload = (payload: ISamp) => {
    if (payload.links && (payload.links.travel_exp !== "0.00" || payload.links.travel_exp_comm)) {
        payload.isTravel = true
    } else {
        payload.isTravel = false
    }

    payload.stags.forEach((stag, i) => {
        let isNoNdsFlag = true
        let isValid = true
        stag.units.forEach(unit => {
            let thisUsrps = unit.usrps.filter(usrp => usrp.link_id === payload.link)[0];
            calcSumm(thisUsrps)
            stag.nds_comm = thisUsrps.nds_comm
            if (thisUsrps.vat_rate !== "NN") {
                isNoNdsFlag = false
                stag.nds_comm = ""
            }
            if (parseFloat(thisUsrps.prices_user) === 0 || thisUsrps.prices_user === '') {
                isValid = thisUsrps.isValid = false
            }
            if (thisUsrps.alt_name_unit) {
                thisUsrps.isSubToggle = true
            }
        })
        stag.isNoNds = isNoNdsFlag
        stag.isValid = isValid
        calcStageSumm(payload, stag, payload.link)
    })

    return payload
}

const calcSumm = (thisUsrp: IUsrp) => {
    let summ = (parseFloat(thisUsrp.nsu_menge) * parseFloat(thisUsrp.prices_user))

    thisUsrp.summ = numberWithSpaces(summ.toFixed(10))
    thisUsrp.summ_nds = numberWithSpaces((summ + summ * (!thisUsrp.vat_rate || thisUsrp.vat_rate == "NN" ? 0 : parseFloat(thisUsrp.vat_rate)) / 100).toFixed(10))
}

const calcKPSumm = (state: ISamp, travel_exp: string) => {
    let kp_summ = 0
    let kp_summ_nds = 0
    state.stags.forEach(stag => {
        kp_summ += parseFloat(stag.stagSumm && stag.stagSumm.replace(/\s/g, '')) || 0
        kp_summ_nds += parseFloat(stag.stagSumm_nds && stag.stagSumm_nds.replace(/\s/g, '')) || 0
    })

    /// S200001501-1942
    let travel_expN = 0
    if (!travel_exp) {
        if (state.links && state.links.travel_exp) {
            travel_expN = parseFloat(state.links.travel_exp)
        }
    } else {
        travel_expN = parseFloat(travel_exp)
    }
    kp_summ = (kp_summ + travel_expN)
    kp_summ_nds = kp_summ_nds + travel_expN + travel_expN * 0.2

    state.kp_summ = numberWithSpaces(kp_summ.toFixed(10))
    state.kp_summ_nds = numberWithSpaces(kp_summ_nds.toFixed(10))
}

const calcStageSumm = (state: ISamp, thisStag: IStag, link_id: string) => {
    let stagSumm = 0
    let stagSumm_nds = 0

    thisStag.units.forEach(unit => {
        const usrp = unit.usrps.filter(usrp => usrp.link_id === link_id);
        stagSumm += parseFloat(usrp[0].summ && usrp[0].summ.replace(/\s/g, '')) || 0
        stagSumm_nds += parseFloat(usrp[0].summ_nds && usrp[0].summ_nds.replace(/\s/g, '')) || 0
    });

    thisStag.stagSumm = numberWithSpaces(stagSumm.toFixed(10))
    thisStag.stagSumm_nds = numberWithSpaces(stagSumm_nds.toFixed(10))

    calcKPSumm(state, "")
}

//
//
// cost metod
const getOverhead = (state: ISamp, opr_usl_unit: string) => {
    let salaryItem_cost_overhead_sum = 0
    let salaryItem = state.costs.salary[state.costs.salary.findIndex((List) => List.cost_name === opr_usl_unit)]

    state.costs.cost_overhead.forEach((element: ICostOverhead) => {
        let calcedValue = salaryItem.kp_unit_salary && element.cost_value ? (parseFloat(salaryItem.kp_unit_salary) * parseFloat(element.cost_value) / 100) : 0
        if (element.cost_array.length > 0 && element.cost_array.findIndex((List: ICostArray) => List.cost_name === salaryItem.cost_name) >= 0) {
            let thisCost_array = element.cost_array[element.cost_array.findIndex((List: ICostArray) => List.cost_name === salaryItem.cost_name)]
            thisCost_array.value = calcedValue.toFixed(10)
        } else {
            element.cost_array.push({
                "cost_name": salaryItem.cost_name,
                "value": calcedValue.toFixed(10)
            })
        }
        salaryItem_cost_overhead_sum = salaryItem_cost_overhead_sum + calcedValue
    });

    return salaryItem_cost_overhead_sum
}

const calcCostSumm = (state: ISamp) => {
    let kp_price_ei = 0
    let kp_price = 0
    let kp_price_nds = 0
    //insurance
    let sum_cntrb_oms = 0
    let sum_cntrb_pension = 0
    let sum_cntrb_disability = 0
    //
    let sum_profitability = 0

    state.stags.forEach(stag => {
        let cost_stage_price_ei = 0
        let cost_stage_price = 0
        let cost_stage_price_nds = 0
        stag.units.forEach(unit => {
            const usrp = unit.usrps.filter(usrp => usrp.link_id === state.link)[0];

            if (usrp) {
                unit.work_days = (usrp.nsu_menge && parseFloat(usrp.nsu_menge) != 0) && (usrp.prices_user && parseFloat(usrp.prices_user) != 0) ?
                    (parseFloat(usrp.prices_user) / parseFloat(usrp.nsu_menge)).toFixed(10) : "0.00"

                // calc Tabs
                let salaryItem = state.costs.salary[state.costs.salary.findIndex(salary => salary.kp_unit_guid === usrp.kp_unit_guid)]

                salaryItem.cntrb_oms = (parseFloat(state.costs.cntrb_oms) * parseFloat(salaryItem.kp_unit_salary) / 100).toFixed(10)
                salaryItem.cntrb_pension = (parseFloat(state.costs.cntrb_pension) * parseFloat(salaryItem.kp_unit_salary) / 100).toFixed(10)
                salaryItem.cntrb_disability = (parseFloat(state.costs.cntrb_disability) * parseFloat(salaryItem.kp_unit_salary) / 100).toFixed(10)
                salaryItem.profitability = (parseFloat(state.costs.profitability) * parseFloat(salaryItem.kp_unit_salary) / 100).toFixed(10)
                
                salaryItem.cost_overhead = getOverhead(state, unit.opr_usl_unit).toFixed(10)
                salaryItem.cost_time_per_month = usrp.prices_user
                salaryItem.rate_per_month = unit.sum_price_ei
                salaryItem.rate_per_day = unit.sum_price_ei

                //insurance
                sum_cntrb_oms = sum_cntrb_oms + parseFloat(salaryItem.cntrb_oms)
                sum_cntrb_pension = sum_cntrb_pension + parseFloat(salaryItem.cntrb_pension)
                sum_cntrb_disability = sum_cntrb_disability + parseFloat(salaryItem.cntrb_disability)
                //profitability
                sum_profitability = sum_profitability + parseFloat(salaryItem.profitability)

                //Summ from tabs
                let sum_price_ei =
                    parseFloat(salaryItem.kp_unit_salary)
                    + parseFloat(salaryItem.cntrb_oms)
                    + parseFloat(salaryItem.cntrb_pension)
                    + parseFloat(salaryItem.cntrb_disability)
                    + parseFloat(salaryItem.profitability)
                    + parseFloat(salaryItem.cost_overhead)

                let sum_price = parseFloat(unit.work_days) * sum_price_ei
                let sum_price_nds = sum_price + sum_price * (!usrp.vat_rate || usrp.vat_rate == "NN" ? 0 : parseFloat(usrp.vat_rate)) / 100

                //
                unit.sum_price_ei = (sum_price_ei ?? 0).toFixed(10)
                unit.sum_price = (sum_price ?? 0).toFixed(10)
                unit.sum_price_nds = (sum_price_nds ?? 0).toFixed(10)

                //stage
                cost_stage_price_ei = cost_stage_price_ei + parseFloat(usrp.prices_user)
                cost_stage_price = cost_stage_price + sum_price
                cost_stage_price_nds = cost_stage_price_nds + sum_price_nds
            }
        })

        //insurance
        state.cost_sums.cost_insurance.sum_cntrb_oms = (sum_cntrb_oms).toFixed(10)
        state.cost_sums.cost_insurance.sum_cntrb_pension = (sum_cntrb_pension).toFixed(10)
        state.cost_sums.cost_insurance.sum_cntrb_disability = (sum_cntrb_disability).toFixed(10)

        // profitability
        state.cost_sums.cost_profitability = sum_profitability.toFixed(10)

        //stage
        stag.cost_stage_price_ei = (cost_stage_price_ei ?? 0).toFixed(10)
        stag.cost_stage_price = (cost_stage_price ?? 0).toFixed(10)
        stag.cost_stage_price_nds = (cost_stage_price_nds ?? 0).toFixed(10)

        //all kp
        kp_price_ei = kp_price_ei + cost_stage_price_ei
        kp_price = kp_price + cost_stage_price
        kp_price_nds = kp_price_nds + cost_stage_price_nds
    })

    state.costs.cost_result.kp_price_ei = kp_price_ei.toFixed(2)
    state.costs.cost_result.kp_price = kp_price.toFixed(2)
    state.costs.cost_result.kp_price_nds = kp_price_nds.toFixed(2)

    //state.cost_sums.cost_overhead
    //state.cost_sums.cost_profitability
}


const setSalaryItem = (curUnit: IUnit, kp_unit_salary: string) => {
    return {
        "kp_unit_guid": curUnit.kp_unit_guid,
        "kp_unit_salary": kp_unit_salary,
        //added for app
        "cost_name": curUnit.opr_usl_unit,
        "usl_quan_unit": curUnit.usl_quan_unit,
        "cntrb_oms": "",
        "cntrb_pension": "",
        "cntrb_disability": "",
        "profitability": "",
        "cost_overhead": "",

        "cost_time_per_month": "",
        "rate_per_month": "",
        "rate_per_day": ""
    }
}


const setItemBtrip = (curUnit: IUnit, i: number) => {
    return {
        "kp_unit_guid": curUnit.kp_unit_guid,
        "kp_btrip_guid": "",
        "pers_count": "0",
        "btrip_days": "0",
        "btrip_cost": "0.00",
        "btrip_day_cost": "0.00",
        "btrip_day_allow": "0.00",

        //added
        "key": i,
        "cost_name": curUnit.opr_usl_unit,
        "full_price": "0.00",
        "user_per_day": "0.00",
        "user_per_month": "0.00",
        "price_per_user_per_month": "0.00"
    }
}

const setPayloadCost = (payload: ISamp) => {
    payload.stags.forEach((stag, i) => {
        stag.units.forEach(curUnit => {

            if( payload.costs.salary && payload.costs.salary.length > 0) {
                let indexSalary = payload.costs.salary.findIndex(salary => salary.kp_unit_guid === curUnit.kp_unit_guid)
                if (indexSalary >= 0) {
                    //added for app
                    payload.costs.salary[indexSalary].cost_name = curUnit.opr_usl_unit
                    payload.costs.salary[indexSalary].usl_quan_unit = curUnit.usl_quan_unit
                    payload.costs.salary[indexSalary].cntrb_oms = "0.00"
                    payload.costs.salary[indexSalary].cntrb_pension = "0.00"
                    payload.costs.salary[indexSalary].cntrb_disability = "0.00"
                    payload.costs.salary[indexSalary].profitability = "0.00"

                } else {
                    let kp_unit_salary = "0.00"
                    payload.costs.salary.push(setSalaryItem(curUnit, kp_unit_salary))
                }
            } else {
                let kp_unit_salary = "0.00"
                payload.costs.salary = []
                payload.costs.salary.push(setSalaryItem(curUnit, kp_unit_salary))
            }

            if( payload.costs.cost_btrip && payload.costs.cost_btrip.length > 0) {
                let indexBtrip = payload.costs.cost_btrip.findIndex(cost_btrip => cost_btrip.kp_unit_guid === curUnit.kp_unit_guid)
                if (indexBtrip >= 0) {
                    //added for app
                    payload.costs.cost_btrip[indexBtrip].key = i
                    payload.costs.cost_btrip[indexBtrip].cost_name = curUnit.opr_usl_unit
                    payload.costs.cost_btrip[indexBtrip].full_price = "0.00"
                    payload.costs.cost_btrip[indexBtrip].user_per_day = "0.00"
                    payload.costs.cost_btrip[indexBtrip].user_per_month = "0.00"
                    payload.costs.cost_btrip[indexBtrip].price_per_user_per_month = "0.00"
                }
                payload.costs.cost_btrip.push(setItemBtrip(curUnit, i))
            } else {
                payload.costs.cost_btrip = []
                payload.costs.cost_btrip.push(setItemBtrip(curUnit, i))
            }

        })

        // todo move to sums
        stag.cost_stage_price_ei = "0.00"
        stag.cost_stage_price = "0.00"
        stag.cost_stage_price_nds = "0.00"
    })

    payload.costs.cntrb_oms = payload.costs.cntrb_oms || "0.00"
    payload.costs.cntrb_pension = payload.costs.cntrb_pension || "0.00"
    payload.costs.cntrb_disability = payload.costs.cntrb_disability || "0.00"
    payload.costs.profitability = payload.costs.profitability || "0.00"
    payload.costs.btrip_price = payload.costs.btrip_price || "0.00"

    payload.costs.salary = payload.costs.salary || []
    payload.costs.cost_depreciation = payload.costs.cost_depreciation || []
    payload.costs.cost_overhead = payload.costs.cost_overhead || []
    payload.costs.cost_other_bfoh = payload.costs.cost_other_bfoh || []
    payload.costs.cost_other = payload.costs.cost_other || []
    payload.costs.cost_btrip = payload.costs.cost_btrip || []

    //payload.costs.cost_result.kp_price_ei = "0.00"
    //payload.costs.cost_result.kp_price = "0.00"
    //payload.costs.cost_result.kp_price_nds = "0.00"

    //added 
    payload.costs.link = payload.link
    //payload.costs.kp_stage_guid = payload.kp_sample_guid

    const cost_overhead_default = [{
        "cost_id": "0",
        "cost_description": "Заработная плата, обучение и содержание административно-управленческого аппарата",
        "cost_value": "0",
        "cost_array": [],
        "required": true,
        "summ_cost": "0",
    }, {
        "cost_id": "1",
        "cost_description": "Арендная плата за офис, склад, в т.ч. текущий ремонт зданий сооружений, оборудования",
        "cost_value": "0",
        "cost_array": [],
        "required": true,
        "summ_cost": "0",
    }, {
        "cost_id": "2",
        "cost_description": "Содержание офиса, оплата коммунальных услуг",
        "cost_value": "0",
        "cost_array": [],
        "required": true,
        "summ_cost": "0",
    }, {
        "cost_id": "3",
        "cost_description": "Расходы на услуги связи (телефон, интернет), покупка компьютеров, канцелярии и расходные материалы, расходы на офисные потребности, лицензии ПО и пр.",
        "cost_value": "0",
        "cost_array": [],
        "required": true,
        "summ_cost": "0",
    }, {
        "cost_id": "4",
        "cost_description": "Медицинское страхование",
        "cost_value": "0",
        "cost_array": [],
        "required": true,
        "summ_cost": "0",
    }]

    if (payload.costs.cost_overhead.length > 0) {
        payload.costs.cost_overhead.forEach(element => {
            element.cost_array = []
            element.required = true
            element.summ_cost = "0"
            let index = cost_overhead_default.findIndex(arr => arr.cost_id === element.cost_id
                )
            if (index >= 0) {
                cost_overhead_default.splice(index, 1)
            }

        });
        payload.costs.cost_overhead = [...payload.costs.cost_overhead, ...cost_overhead_default]
    } else {
        payload.costs.cost_overhead = cost_overhead_default
    }

    payload.cost_sums = {
        "cost_insurance": {
            "sum_cntrb_oms": "0",
            "sum_cntrb_pension": "0",
            "sum_cntrb_disability": "0",
        },
        "cost_depreciation": {
            "sum_price_per_month": "0",
            "sum_price": "0",
            "sum_price_per_user": "0",
            "sum_cost_meins_price": "0",
        },
        "cost_other_bfoh": {
            "sum_full_price": "0",
            "sum_user_per_month": "0",
            "sum_price_per_user_per_month": "0",
        },
        "cost_overhead": [],
        "cost_profitability": "0",
        "cost_other": {
            "sum_full_price": "0",
            "sum_user_per_month": "0",
            "sum_price_per_user_per_month": "0",
        },
        "cost_btrip": {
            "sum_full_price": "0",
            "sum_user_per_month": "0",
            "sum_price_per_user_per_month": "0",
        }
    }

    calcCostSumm(payload)

    return payload
}

export const sampSlice = createSlice({
    name: 'sampData',
    initialState,
    reducers: {
        setTravelChecked: (state, action: PayloadAction<boolean>) => {
            state.isTravel = action.payload;
            if (!state.isTravel) {
                state.links.travel_exp = "";
                state.links.travel_exp_comm = "";
            }
        },
        setKp_offer_expire_date: (state, action: PayloadAction<string>) => {
            state.links.kp_offer_expire_date = action.payload
        },
        setTravelPrice: (state, action: PayloadAction<string>) => {
            state.links.travel_exp = action.payload

            calcKPSumm(state, action.payload)
        },
        setTravelComment: (state, action: PayloadAction<string>) => {
            state.links.travel_exp_comm = action.payload || ""
        },
        toggleEtapRowSub: (state, action: PayloadAction<IUnitFinder>) => {
            const thisUsrp = getUspsr(state.stags, action.payload)
            thisUsrp.isSubToggle = !thisUsrp.isSubToggle
        },
        setAlt_name_unit: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.alt_name_unit = action.payload.value || ""
        },
        setUsl_quan_unit: (state, action: PayloadAction<any>) => {
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUnit.usl_quan_unit = action.payload.value
            thisUsrp.usl_quan_unit = action.payload.value
            thisUsrp.usl_quan_unit_txt = action.payload.label
        },
        setNsu_menge: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUnit.nsu_menge = action.payload.value
            thisUsrp.nsu_menge = action.payload.value
            thiStage.isValid = !(action.payload.value === "")
            calcSumm(thisUsrp)
            calcStageSumm(state, thiStage, action.payload.UnitFinder.link_id)
        },
        setPrices_user: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.prices_user = action.payload.value
            thisUsrp.price_date = format(new Date(), 'yyyy-MM-dd')
            thisUsrp.price_time = format(new Date(), 'HHmmss')
            thiStage.isValid = !(action.payload.value === "")
            calcSumm(thisUsrp)
            calcStageSumm(state, thiStage, action.payload.UnitFinder.link_id)
        },
        setVat_rate: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.vat_rate = action.payload.value
            calcSumm(thisUsrp)
            calcStageSumm(state, thiStage, action.payload.UnitFinder.link_id)

            // check NDS of stage
            let isNoNdsFlag = true
            thiStage.units.forEach(unit => {
                let thisUsrps = unit.usrps.filter(usrp => usrp.link_id === action.payload.UnitFinder.link_id)[0];
                if (thisUsrps.vat_rate !== "NN") {
                    isNoNdsFlag = false
                }
            })
            thiStage.isNoNds = isNoNdsFlag

            // cost
            if(state.sample_type === "C"){
                calcCostSumm(state)
            }
        },
        setNds_comm: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.nds_comm = action.payload.value || ""
        },
        setStageNoNds: (state, action: PayloadAction<any>) => {
            const index = state.stags.findIndex(stage => stage.opr_usl_stage_num === action.payload.etapId)
            state.stags[index].isNoNds = action.payload.checked;
            if (action.payload.checked) {
                state.stags[index].units.forEach(unit => {
                    let thisUsrps = unit.usrps[unit.usrps.findIndex(usrp => usrp.link_id === state.link)]
                    thisUsrps.vat_rate = "NN"
                    thisUsrps.nds_comm = ""
                })
            }
        },
        setStageNoNdsComm: (state, action: PayloadAction<any>) => {
            const index = state.stags.findIndex(stage => stage.opr_usl_stage_num === action.payload.etapId)
            state.stags[index].units.forEach(unit => {
                let thisUsrps = unit.usrps[unit.usrps.findIndex(usrp => usrp.link_id === state.link)]
                thisUsrps.nds_comm = action.payload.value
            })
            state.stags[index].nds_comm = action.payload.value
            state.stags[index].isValid = !(action.payload.value === "")
        },
        setStageSumm: (state, action: PayloadAction<any>) => {
            const index = state.stags.findIndex(stage => stage.opr_usl_stage_id === action.payload.opr_usl_stage_id)
            state.stags[index].stagSumm_nds = action.payload.value.summ
            state.stags[index].stagSumm_nds = action.payload.value.summ_nds
        },
        isValid: (state, action: PayloadAction<any>) => {
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)

            thisUsrp.isValid = action.payload.value
            thiStage.isValid = action.payload.value
        },
        setSavedDate: (state, action: PayloadAction<any>) => {
            state.saveDate = action.payload.saveDate
        },
        setValidateOn: (state, action: PayloadAction<any>) => {
            state.isValidateOn = action.payload.value
        },

        //
        //
        // cost metod
        setManNumber: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.nsu_menge = action.payload.value
            thiStage.isValid = !(action.payload.value === "")

            calcCostSumm(state)
        },

        setPricesUser: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.prices_user = action.payload.value
            thiStage.isValid = !(action.payload.value === "")

            calcCostSumm(state)
        },

        setUnitSalary: (state, action: PayloadAction<{ kp_unit_guid: string, kp_unit_salary: string }>) => {
            state.costs.salary[state.costs.salary.findIndex(salary => salary.kp_unit_guid === action.payload.kp_unit_guid)].kp_unit_salary = action.payload.kp_unit_salary
            calcCostSumm(state)
        },
        setCntrbOms: (state, action: PayloadAction<{ cntrb_oms: string }>) => {
            state.costs.cntrb_oms = action.payload.cntrb_oms
            state.costs.salary.forEach(salary => { salary.cntrb_oms = (parseFloat(salary.kp_unit_salary) * parseFloat(action.payload.cntrb_oms) / 100).toFixed(10) })
            calcCostSumm(state)
        },
        setPension: (state, action: PayloadAction<{ cntrb_pension: string }>) => {
            state.costs.cntrb_pension = action.payload.cntrb_pension
            state.costs.salary.forEach(salary => { salary.cntrb_pension = (parseFloat(salary.kp_unit_salary) * parseFloat(action.payload.cntrb_pension) / 100).toFixed(10) })
            calcCostSumm(state)
        },
        setDisability: (state, action: PayloadAction<{ cntrb_disability: string }>) => {
            state.costs.cntrb_disability = action.payload.cntrb_disability
            state.costs.salary.forEach(salary => { salary.cntrb_disability = (parseFloat(salary.kp_unit_salary) * parseFloat(action.payload.cntrb_disability) / 100).toFixed(10) })
            calcCostSumm(state)
        },
        //
        addDepreciation: (state, action: PayloadAction<ICostDepreciation>) => {
            state.costs.cost_depreciation.push(action.payload)
        },
        delDepreciation: (state, action: PayloadAction<number | null>) => {
            let itemList = state.costs.cost_depreciation
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostDepreciation) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setDepreciationProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.costs.cost_depreciation.findIndex((List: ICostDepreciation) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.costs.cost_depreciation[index]
            obj[prop] = action.payload.value

            state.costs.cost_depreciation.forEach(item => {
                item.price_per_month = parseFloat(item.cost_months_useful) != 0 ? (parseFloat(item.cost_meins_price) / parseFloat(item.cost_months_useful)).toFixed(10) : "0.00"
                item.price = (parseFloat(item.cost_menge) * parseFloat(item.price_per_month) * parseFloat(item.cost_months_use)).toFixed(10)
                item.price_per_user_per_month = (parseFloat(item.price) * parseFloat(item.cost_per_month)).toFixed(10)
            })

            let sum_price_per_month = 0
            let sum_price = 0
            let sum_price_per_user = 0
            let sum_cost_meins_price = 0
            state.costs.cost_depreciation.forEach(cost_depreciation => {
                sum_price_per_month = sum_price_per_month + parseFloat(cost_depreciation.price_per_month)
                sum_price = sum_price + parseFloat(cost_depreciation.price)
                sum_price_per_user = sum_price_per_user + parseFloat(cost_depreciation.price_per_user_per_month)

                sum_cost_meins_price = sum_cost_meins_price + parseFloat(cost_depreciation.cost_meins_price)
            })
            state.cost_sums.cost_depreciation.sum_price_per_month = (sum_price_per_month).toFixed(10)
            state.cost_sums.cost_depreciation.sum_price = (sum_price).toFixed(10)
            state.cost_sums.cost_depreciation.sum_price_per_user = (sum_price_per_user).toFixed(10)
            state.cost_sums.cost_depreciation.sum_cost_meins_price = (sum_cost_meins_price).toFixed(10)

            calcCostSumm(state)
        },
        //
        addCostOtherBfoh: (state, action: PayloadAction<ICostOtherBfoh>) => {
            state.costs.cost_other_bfoh.push(action.payload)
        },
        delCostOtherBfoh: (state, action: PayloadAction<number | null>) => {
            let itemList = state.costs.cost_other_bfoh
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostOtherBfoh) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setCostOtherBfohProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.costs.cost_other_bfoh.findIndex((List: ICostOtherBfoh) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.costs.cost_other_bfoh[index]
            obj[prop] = action.payload.value

            state.costs.cost_other_bfoh.forEach(item => {
                item.full_price = (parseFloat(item.cost_menge) * parseFloat(item.cost_month) * parseFloat(item.cost_price)).toFixed(10)
                item.price_per_user_per_month = (parseFloat(state.full_laboriousness) * parseFloat(item.full_price)).toFixed(10)
            })

            let sum_full_price = 0
            let sum_user_per_month = 0
            let sum_price_per_user_per_month = 0
            state.costs.cost_other_bfoh.forEach(cost_other_bfoh => {
                sum_full_price = sum_full_price + parseFloat(cost_other_bfoh.full_price)
                sum_user_per_month = sum_user_per_month + parseFloat(state.full_laboriousness) / (164.4 / 8)
                sum_price_per_user_per_month = sum_price_per_user_per_month + parseFloat(cost_other_bfoh.price_per_user_per_month)
            })
            state.cost_sums.cost_other_bfoh.sum_full_price = (sum_full_price).toFixed(10)
            state.cost_sums.cost_other_bfoh.sum_user_per_month = (sum_user_per_month).toFixed(10)
            state.cost_sums.cost_other_bfoh.sum_price_per_user_per_month = (sum_price_per_user_per_month).toFixed(10)

            calcCostSumm(state)
        },

        addCostOther: (state, action: PayloadAction<ICostOther>) => {
            state.costs.cost_other.push(action.payload)
        },
        delCostOther: (state, action: PayloadAction<number | null>) => {
            let itemList = state.costs.cost_other
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostOther) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setCostOtherProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.costs.cost_other.findIndex((List: ICostOtherBfoh) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.costs.cost_other[index]
            obj[prop] = action.payload.value

            state.costs.cost_other.forEach(item => {
                item.full_price = (parseFloat(item.cost_menge) * parseFloat(item.cost_month) * parseFloat(item.cost_price)).toFixed(10)
                item.price_per_user_per_month = (parseFloat(state.full_laboriousness) * parseFloat(item.full_price)).toFixed(10)
            })

            let sum_full_price = 0
            let sum_user_per_month = 0
            let sum_price_per_user_per_month = 0
            state.costs.cost_other.forEach(cost_other => {
                sum_full_price = sum_full_price + parseFloat(cost_other.full_price)
                sum_user_per_month = sum_user_per_month + parseFloat(state.full_laboriousness) / (164.4 / 8)
                sum_price_per_user_per_month = sum_price_per_user_per_month + parseFloat(cost_other.price_per_user_per_month)
            })
            state.cost_sums.cost_other.sum_full_price = (sum_full_price).toFixed(10)
            state.cost_sums.cost_other.sum_user_per_month = (sum_user_per_month).toFixed(10)
            state.cost_sums.cost_other.sum_price_per_user_per_month = (sum_price_per_user_per_month).toFixed(10)

            calcCostSumm(state)
        },

        addCostOverhead: (state, action: PayloadAction<ICostOverhead>) => {
            state.costs.cost_overhead.push(action.payload)
        },
        delCostOverhead: (state, action: PayloadAction<string | null>) => {
            let itemList = state.costs.cost_overhead
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostOverhead) => List.cost_id === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setCostOverheadProp: (state, action: PayloadAction<{ key: string, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.costs.cost_overhead.findIndex((List: ICostOverhead) => List.cost_id === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.costs.cost_overhead[index]
            obj[prop] = action.payload.value

            let thisCost_array = state.costs.cost_overhead[index].cost_array
            //debugger

            let cost_summ = 0
            state.costs.salary.forEach(salary => {

                let calcedValue = (parseFloat(salary.kp_unit_salary) * parseFloat(action.payload.value) / 100)
                cost_summ = cost_summ + calcedValue
                if (thisCost_array.length > 0 && thisCost_array.findIndex((List: ICostArray) => List.cost_name === salary.cost_name) >= 0) {
                    let CAindex = thisCost_array.findIndex((List: ICostArray) => List.cost_name === salary.cost_name)
                    thisCost_array[CAindex].value = calcedValue.toFixed(10)
                } else {
                    thisCost_array.push({
                        "cost_name": salary.cost_name,
                        "value": calcedValue.toFixed(10)
                    })
                }
            })

            if (state.cost_sums.cost_overhead.length > 0) {
                state.cost_sums.cost_overhead[index] = cost_summ.toFixed(10)
            } else {
                state.cost_sums.cost_overhead.push(cost_summ.toFixed(10))
            }

            calcCostSumm(state)
        },

        setProfitability: (state, action: PayloadAction<{ profitability: string }>) => {
            state.costs.profitability = action.payload.profitability
            let sum_profitability = 0
            state.costs.salary.forEach(salary => {
                let calc = parseFloat(salary.kp_unit_salary) * parseFloat(action.payload.profitability) / 100
                salary.profitability = calc.toFixed(10)
                sum_profitability = sum_profitability + calc
            })
            state.cost_sums.cost_profitability = sum_profitability.toFixed(10)
            calcCostSumm(state)
        },

        setBtrip: (state, action: PayloadAction<{ btrip_price: string }>) => {
            state.costs.btrip_price = action.payload.btrip_price
            state.costs.salary.forEach(salary => { salary.cntrb_oms = (parseFloat(salary.kp_unit_salary) * parseFloat(action.payload.btrip_price) / 100).toFixed(10) })
            calcCostSumm(state)
        },

        addBtrip: (state, action: PayloadAction<ICostBtrip>) => {
            state.costs.cost_btrip.push(action.payload)
        },

        delBtrip: (state, action: PayloadAction<number | null>) => {
            let itemList = state.costs.cost_btrip
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostBtrip) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },

        setBtripProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.costs.cost_btrip.findIndex((List: ICostBtrip) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.costs.cost_btrip[index]
            obj[prop] = action.payload.value

            state.costs.cost_btrip.forEach(item => {
                item.full_price = ((parseFloat(item.btrip_cost) * 2 + parseFloat(item.btrip_day_allow) * parseFloat(item.btrip_days) + parseFloat(item.btrip_days) * parseFloat(item.btrip_day_cost)) * parseFloat(item.pers_count)).toFixed(10)
                item.user_per_day = "0"
                item.user_per_month = "0"
                item.price_per_user_per_month = "0"


                //item.full_price = parseFloat(item.cost_months_useful) != 0 ? (parseFloat(item.cost_meins_price) / parseFloat(item.cost_months_useful)).toFixed(10) : "0.00"
            })

            calcCostSumm(state)
        },
        ///
    },


    extraReducers: (builder) => {
        builder
            .addMatcher(
                sampAPI.endpoints.fetchSamp.matchFulfilled,
                (state, { payload }) => {
                    console.warn(payload);

                    // prepare payload for in app Calculations
                    let pyloadMod
                    if (payload) {
                        if (payload.stags && payload.stags.length > 0) {
                            payload.stags.sort((a, b) => a.opr_usl_stage_num - b.opr_usl_stage_num);

                            if (payload.sample_type === "A") {
                                pyloadMod = setPayload(payload)
                            } else if (payload.sample_type === "C") {
                                let pyload1 = setPayload(payload)
                                pyloadMod = setPayloadCost(pyload1)
                            } else {
                                alert("No sample_type in payload")
                            }
                        }
                    }

                    //server data to reducer
                    return pyloadMod
                }
            )
    },

})

export default sampSlice.reducer;