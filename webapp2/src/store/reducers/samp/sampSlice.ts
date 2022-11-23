import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./sampData"
import { sampAPI } from '../../../services/SampService'
import { ICostArray, ICostDepreciation, ICostOther, ICostOtherBfoh, ICostOverhead, ISalary, ISamp, IStag, IUnit, IUsrp } from "../../../models/ISamp";
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

const calcSumm = (thisUsrp: IUsrp) => {
    let summ = (parseFloat(thisUsrp.nsu_menge) * parseFloat(thisUsrp.prices_user))

    thisUsrp.summ = numberWithSpaces(summ.toFixed(2))
    thisUsrp.summ_nds = numberWithSpaces((summ + summ * (!thisUsrp.vat_rate || thisUsrp.vat_rate == "NN" ? 0 : parseFloat(thisUsrp.vat_rate)) / 100).toFixed(2))
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

    state.kp_summ = numberWithSpaces(kp_summ.toFixed(2))
    state.kp_summ_nds = numberWithSpaces(kp_summ_nds.toFixed(2))
}

const calcStageSumm = (state: ISamp, thisStag: IStag, link_id: string) => {
    let stagSumm = 0
    let stagSumm_nds = 0

    thisStag.units.forEach(unit => {
        const usrp = unit.usrps.filter(usrp => usrp.link_id === link_id);
        stagSumm += parseFloat(usrp[0].summ && usrp[0].summ.replace(/\s/g, '')) || 0
        stagSumm_nds += parseFloat(usrp[0].summ_nds && usrp[0].summ_nds.replace(/\s/g, '')) || 0
    });

    thisStag.stagSumm = numberWithSpaces(stagSumm.toFixed(2))
    thisStag.stagSumm_nds = numberWithSpaces(stagSumm_nds.toFixed(2))

    calcKPSumm(state, "")
}

// cost
const sumDisability = (state: ISamp) => {
    let sum_cntrb_oms = 0
    let sum_cntrb_pension = 0
    let sum_cntrb_disability = 0
    state.salary.forEach(salary => {
        sum_cntrb_oms = sum_cntrb_oms + parseFloat(salary.cntrb_oms)
        sum_cntrb_pension = sum_cntrb_pension + parseFloat(salary.cntrb_pension)
        sum_cntrb_disability = sum_cntrb_disability + parseFloat(salary.cntrb_disability)
    })
    state.cost_sums.cost_insurance.sum_cntrb_oms = (sum_cntrb_oms).toFixed(2)
    state.cost_sums.cost_insurance.sum_cntrb_pension = (sum_cntrb_pension).toFixed(2)
    state.cost_sums.cost_insurance.sum_cntrb_disability = (sum_cntrb_disability).toFixed(2)

    calcCostSumm(state)
}

const calcCurStageSummCost = (thiStage: IStag) => {
    let stage_laboriousness = 0
    thiStage.units.forEach(unit => {
        stage_laboriousness = stage_laboriousness + parseFloat(unit.laboriousness)
    });
    thiStage.stage_laboriousness = stage_laboriousness.toFixed(2)
}

const calcCostSumm = (state: ISamp) => {
    let kp_price_ei = 0
    let kp_price = 0
    let kp_price_nds = 0
    state.stags.forEach(stag => {
        let stage_price_ei = 0
        let stage_price = 0
        let stage_price_nds = 0
        stag.units.forEach(unit => {
            unit.usrps.forEach(usrp => {
                let unit_salary = state.salary[state.salary.findIndex(salary => salary.kp_unit_guid === usrp.kp_unit_guid)].unit_salary
                let cntrb_oms = state.salary[state.salary.findIndex(salary => salary.kp_unit_guid === usrp.kp_unit_guid)].cntrb_oms
                let cntrb_pension = state.salary[state.salary.findIndex(salary => salary.kp_unit_guid === usrp.kp_unit_guid)].cntrb_pension
                let cntrb_disability = state.salary[state.salary.findIndex(salary => salary.kp_unit_guid === usrp.kp_unit_guid)].cntrb_disability

                let sum_price_ei = parseFloat(unit_salary) +  parseFloat(cntrb_oms) + parseFloat(cntrb_pension) + parseFloat(cntrb_disability)
                let sum_price = sum_price_ei * parseFloat(unit.work_days)
                let sum_price_nds = sum_price + sum_price * (!usrp.vat_rate || usrp.vat_rate == "NN" ? 0 : parseFloat(usrp.vat_rate)) / 100

                unit.sum_price_ei = (sum_price_ei).toFixed(2)
                unit.sum_price = (sum_price).toFixed(2)
                unit.sum_price_nds = (sum_price_nds).toFixed(2)

                stage_price_ei = stage_price_ei+sum_price_ei
                stage_price = stage_price+sum_price
                stage_price_nds = stage_price_nds+sum_price_nds
            })
        })

        stag.stage_price_ei =  (stage_price_ei).toFixed(2)
        stag.stage_price =  (stage_price).toFixed(2)
        stag.stage_price_nds =  (stage_price_nds).toFixed(2)

        kp_price_ei = kp_price_ei + stage_price_ei
        kp_price = kp_price + stage_price
        kp_price_nds = kp_price_nds + stage_price_nds
    })

    state.cost.kp_price_ei = kp_price_ei.toFixed(2)
    state.cost.kp_price = kp_price.toFixed(2)
    state.cost.kp_price_nds = kp_price_nds.toFixed(2)
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
            calcCostSumm(state)
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
            thisUnit.man_number = action.payload.value

            thisUnit.work_days = (parseFloat(thisUnit.laboriousness) / parseFloat(action.payload.value)).toFixed(2)

            thiStage.isValid = !(action.payload.value === "")
            calcCurStageSummCost(thiStage)
            calcCostSumm(state)
        },
        setLaboriousness: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUnit.laboriousness = action.payload.value
            thisUnit.work_days = (parseFloat(action.payload.value) / parseFloat(thisUnit.man_number)).toFixed(2)

            thiStage.isValid = !(action.payload.value === "")
            calcCurStageSummCost(thiStage)

            let full_laboriousness = 0
            state.stags.forEach(stag => {
                full_laboriousness = stag.stage_laboriousness ? full_laboriousness + parseFloat(stag.stage_laboriousness) : full_laboriousness
            })
            state.full_laboriousness = full_laboriousness.toFixed(2)

            calcCostSumm(state)
        },

        setUnitSalary: (state, action: PayloadAction<{ kp_unit_guid: string, unit_salary: string }>) => {
            state.salary[state.salary.findIndex(salary => salary.kp_unit_guid === action.payload.kp_unit_guid)].unit_salary = action.payload.unit_salary
            sumDisability(state)
        },
        setCntrbOms: (state, action: PayloadAction<{ cntrb_oms: string }>) => {
            state.cntrb_oms = action.payload.cntrb_oms
            state.salary.forEach(salary => { salary.cntrb_oms = (parseFloat(salary.unit_salary) * parseFloat(action.payload.cntrb_oms) / 100).toFixed(2) })
            sumDisability(state)
        },
        setPension: (state, action: PayloadAction<{ cntrb_pension: string }>) => {
            state.cntrb_pension = action.payload.cntrb_pension
            state.salary.forEach(salary => { salary.cntrb_pension = (parseFloat(salary.unit_salary) * parseFloat(action.payload.cntrb_pension) / 100).toFixed(2) })
            sumDisability(state)
        },
        setDisability: (state, action: PayloadAction<{ cntrb_disability: string }>) => {
            state.cntrb_disability = action.payload.cntrb_disability
            state.salary.forEach(salary => { salary.cntrb_disability = (parseFloat(salary.unit_salary) * parseFloat(action.payload.cntrb_disability) / 100).toFixed(2) })
            sumDisability(state)
        },
        //
        addDepreciation: (state, action: PayloadAction<ICostDepreciation>) => {
            state.cost_depreciation.push(action.payload)
        },
        delDepreciation: (state, action: PayloadAction<number | null>) => {
            let itemList = state.cost_depreciation
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostDepreciation) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setDepreciationProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.cost_depreciation.findIndex((List: ICostDepreciation) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.cost_depreciation[index]
            obj[prop] = action.payload.value

            state.cost_depreciation.forEach(item => {
                item.price_per_month = parseFloat(item.cost_months_useful) != 0 ? (parseFloat(item.cost_meins_price) / parseFloat(item.cost_months_useful)).toFixed(2) : "0.00"
                item.price = (parseFloat(item.cost_menge) * parseFloat(item.price_per_month) * parseFloat(item.cost_months_use)).toFixed(2)
                item.price_per_user_per_month = (parseFloat(item.price) * parseFloat(item.cost_per_month)).toFixed(2)
            })

            let sum_price_per_month = 0
            let sum_price = 0
            let sum_price_per_user = 0
            let sum_cost_meins_price = 0
            state.cost_depreciation.forEach(cost_depreciation => {
                sum_price_per_month = sum_price_per_month + parseFloat(cost_depreciation.price_per_month)
                sum_price = sum_price + parseFloat(cost_depreciation.price)
                sum_price_per_user = sum_price_per_user + parseFloat(cost_depreciation.price_per_user_per_month)

                sum_cost_meins_price = sum_cost_meins_price + parseFloat(cost_depreciation.cost_meins_price)
            })
            state.cost_sums.cost_depreciation.sum_price_per_month = (sum_price_per_month).toFixed(2)
            state.cost_sums.cost_depreciation.sum_price = (sum_price).toFixed(2)
            state.cost_sums.cost_depreciation.sum_price_per_user = (sum_price_per_user).toFixed(2)
            state.cost_sums.cost_depreciation.sum_cost_meins_price = (sum_cost_meins_price).toFixed(2)

            calcCostSumm(state)
        },
        //
        addCostOtherBfoh: (state, action: PayloadAction<ICostOtherBfoh>) => {
            state.cost_other_bfoh.push(action.payload)
        },
        delCostOtherBfoh: (state, action: PayloadAction<number | null>) => {
            let itemList = state.cost_other_bfoh
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostOtherBfoh) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setCostOtherBfohProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.cost_other_bfoh.findIndex((List: ICostOtherBfoh) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.cost_other_bfoh[index]
            obj[prop] = action.payload.value

            state.cost_other_bfoh.forEach(item => {
                item.full_price = (parseFloat(item.cost_menge) * parseFloat(item.cost_month) * parseFloat(item.cost_price)).toFixed(2)
                item.price_per_user_per_month = (parseFloat(state.full_laboriousness) * parseFloat(item.full_price)).toFixed(2)
            })

            let sum_full_price = 0
            let sum_user_per_month = 0
            let sum_price_per_user_per_month = 0
            state.cost_other_bfoh.forEach(cost_other_bfoh => {
                sum_full_price = sum_full_price + parseFloat(cost_other_bfoh.full_price)
                sum_user_per_month = sum_user_per_month + parseFloat(state.full_laboriousness) / (164.4 / 8)
                sum_price_per_user_per_month = sum_price_per_user_per_month + parseFloat(cost_other_bfoh.price_per_user_per_month)
            })
            state.cost_sums.cost_other_bfoh.sum_full_price = (sum_full_price).toFixed(2)
            state.cost_sums.cost_other_bfoh.sum_user_per_month = (sum_user_per_month).toFixed(2)
            state.cost_sums.cost_other_bfoh.sum_price_per_user_per_month = (sum_price_per_user_per_month).toFixed(2)

            calcCostSumm(state)
        },

        addCostOther: (state, action: PayloadAction<ICostOther>) => {
            state.cost_other.push(action.payload)

        },
        delCostOther: (state, action: PayloadAction<number | null>) => {
            let itemList = state.cost_other
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostOther) => List.key === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setCostOtherProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.cost_other.findIndex((List: ICostOtherBfoh) => List.key === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.cost_other[index]
            obj[prop] = action.payload.value

            state.cost_other.forEach(item => {
                item.full_price = (parseFloat(item.cost_menge) * parseFloat(item.cost_month) * parseFloat(item.cost_price)).toFixed(2)
                item.price_per_user_per_month = (parseFloat(state.full_laboriousness) * parseFloat(item.full_price)).toFixed(2)
            })

            let sum_full_price = 0
            let sum_user_per_month = 0
            let sum_price_per_user_per_month = 0
            state.cost_other.forEach(cost_other => {
                sum_full_price = sum_full_price + parseFloat(cost_other.full_price)
                sum_user_per_month = sum_user_per_month + parseFloat(state.full_laboriousness) / (164.4 / 8)
                sum_price_per_user_per_month = sum_price_per_user_per_month + parseFloat(cost_other.price_per_user_per_month)
            })
            state.cost_sums.cost_other.sum_full_price = (sum_full_price).toFixed(2)
            state.cost_sums.cost_other.sum_user_per_month = (sum_user_per_month).toFixed(2)
            state.cost_sums.cost_other.sum_price_per_user_per_month = (sum_price_per_user_per_month).toFixed(2)

            calcCostSumm(state)
        },

        addCostOverhead: (state, action: PayloadAction<ICostOverhead>) => {
            state.cost_overhead.push(action.payload)
        },
        delCostOverhead: (state, action: PayloadAction<number | null>) => {
            let itemList = state.cost_overhead
            if (itemList.length > 0) {
                const index = itemList.findIndex((List: ICostOverhead) => List.cost_id === action.payload)
                itemList.splice(index, 1)
            }
            calcCostSumm(state)
        },
        setCostOverheadProp: (state, action: PayloadAction<{ key: number, name: string, value: string }>) => {
            let prop = action.payload.name
            let index = state.cost_overhead.findIndex((List: ICostOverhead) => List.cost_id === action.payload.key)
            interface GenericObject {
                [key: string]: any
            }
            let obj: GenericObject = state.cost_overhead[index]
            obj[prop] = action.payload.value

            let thisCost_array = state.cost_overhead[index].cost_array
            //debugger
            state.salary.forEach(salary => {
                let CAindex = thisCost_array.findIndex((List: ICostArray) => List.cost_name === salary.cost_name)
                if(thisCost_array.length > 0 && CAindex > 0){
                    thisCost_array[CAindex].value = (parseFloat(salary.unit_salary)*parseFloat(action.payload.value)/100).toFixed(2)
                } else {
                    thisCost_array.push({
                        "cost_name" : salary.cost_name,
                        "value" : (parseFloat(salary.unit_salary)*parseFloat(action.payload.value)/100).toFixed(2)
                    })
                }
            })
            calcCostSumm(state)
        },

        setProfitability: (state, action: PayloadAction<{ profitability: string }>) => {
            state.cost.profitability = action.payload.profitability
            state.salary.forEach(salary => { salary.profitability = (parseFloat(salary.unit_salary) * parseFloat(action.payload.profitability) / 100).toFixed(2) })
        },
        ///
    },


    extraReducers: (builder) => {
        builder
            .addMatcher(
                sampAPI.endpoints.fetchSamp.matchFulfilled,
                (state, { payload }) => {
                    //debugger
                    console.warn(payload);

                    if (payload) {
                        if (payload.stags && payload.stags.length > 0) {

                            // costmetod
                            payload.salary = []
                            payload.cost_depreciation = []
                            payload.cost_overhead = []
                            payload.cost_other_bfoh = []
                            payload.cost_other = []
                            payload.cost_btrip = []
                            
                            // .costmetod

                            payload.stags.forEach(stag => {
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

                                    //cost
                                    unit.work_days = "0.00"
                                    unit.man_number = "0"
                                    unit.laboriousness = "0"
                                    unit.sum_price_ei = "0.00"
                                    unit.sum_price = "0.00"
                                    unit.sum_price_nds = "0.00"

                                    //.cost
                                })
                                stag.isNoNds = isNoNdsFlag
                                stag.isValid = isValid
                                calcStageSumm(payload, stag, payload.link)

                                stag.units.forEach(curUnit => {
                                    let newItem: ISalary = {
                                        "kp_unit_guid": curUnit.kp_unit_guid,
                                        "unit_salary": "1000.00",
                                        //added for app
                                        "cost_name": curUnit.opr_usl_unit,
                                        "usl_quan_unit": curUnit.usl_quan_unit,
                                        "cntrb_oms": "0.00",
                                        "cntrb_pension": "0.00",
                                        "cntrb_disability": "0.00",
                                        "profitability": "0.00",
                                    }

                                    payload.salary.push(newItem)
                                })
                                //cost
                                stag.stage_laboriousness = "0.00"
                                stag.stage_price_ei = "0.00"
                                stag.stage_price = "0.00"
                                stag.stage_price_nds = "0.00"
                                ///
                            })

                            /// costmetod 
                            payload.cntrb_oms = "0.00"
                            payload.cntrb_pension = "0.00"
                            payload.cntrb_disability = "0.00"
                            payload.cost = {
                                "cntrb_oms": "0.00",  //Взносы в фонд ОМС
                                "cntrb_pension": "0.00", //Взносы в ПФ
                                "cntrb_disability": "0.00",//Отчисления по временной нетрудоспособности
                                "profitability": "0.00", //Рентабельность
                                "salary": [],
                                "cost_depreciation": [],
                                "cost_overhead": [],
                                "btrip_price":"0.00",
                                "cost_other_bfoh": [],
                                "cost_other": [],
                                "cost_btrip": [],

                                "kp_price_ei": "0.00",
                                "kp_price": "0.00",
                                "kp_price_nds": "0.00"
                            }
                            payload.cost.kp_price_ei = "0"
                            payload.cost.kp_price = "0"
                            payload.cost.kp_price_nds = "0"
                               
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
                                "cost_overhead": {

                                },
                                "cost_profitability": "0",
                                "cost_other": {
                                    "sum_full_price": "0",
                                    "sum_user_per_month": "0",
                                    "sum_price_per_user_per_month": "0",
                                },
                                "cost_btrip": {

                                }
                            }
                            payload.cost_overhead = [{
                                "cost_id": 0,
                                "cost_description": "Заработная плата, обучение и содержание административно-управленческого аппарата",
                                "cost_value": "0",
                                "cost_array": [],
                                "requered": true
                            }, {
                                "cost_id": 1,
                                "cost_description": "Арендная плата за офис, склад, в т.ч. текущий ремонт зданий сооружений, оборудования",
                                "cost_value": "0",
                                "cost_array": [],
                                "requered": true
                            }, {
                                "cost_id": 2,
                                "cost_description": "Содержание офиса, оплата коммунальных услуг",
                                "cost_value": "0",
                                "cost_array": [],
                                "requered": true
                            }, {
                                "cost_id": 3,
                                "cost_description": "Расходы на услуги связи (телефон, интернет), покупка компьютеров, канцелярии и расходные материалы, расходы на офисные потребности, лицензии ПО и пр.",
                                "cost_value": "0",
                                "cost_array": [],
                                "requered": true
                            }, {
                                "cost_id": 4,
                                "cost_description": "Медицинское страхование",
                                "cost_value": "0",
                                "cost_array": [],
                                "requered": true
                            }]
                            // // .costmetod

                            calcCostSumm(payload)

                            payload.stags.sort((a, b) => a.opr_usl_stage_num - b.opr_usl_stage_num);
                        }

                        if (payload.links && (payload.links.travel_exp !== "0.00" || payload.links.travel_exp_comm)) {
                            payload.isTravel = true
                        } else {
                            payload.isTravel = false
                        }
                    }

                    //server data to reducer
                    return payload
                }
            )
    },


})

export default sampSlice.reducer;