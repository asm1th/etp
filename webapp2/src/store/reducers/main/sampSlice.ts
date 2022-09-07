import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./sampData"
import { sampAPI } from '../../../services/SampService'
import { ISampNew, IStag, IUnit, IUsrp } from "../../../models/ISamp";


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
    let summ = parseFloat(thisUsrp.nsu_menge) * parseFloat(thisUsrp.prices_user)
    thisUsrp.summ = (summ).toString()
    if (thisUsrp.vat_rate) {
        thisUsrp.summ_nds = (summ + summ * parseFloat(thisUsrp.vat_rate) / 100).toString()
    } else {
        thisUsrp.summ_nds = summ.toString()
    }
}

const calcStageSumm = (state: ISampNew, thisStag: IStag, link_id: string) => {
    let stagSumm = 0
    let stagSumm_nds = 0

    thisStag.units.forEach(unit => {
        const usrp = unit.usrps.filter(usrp => usrp.link_id === link_id);
        stagSumm += parseFloat(usrp[0].summ) || 0
        stagSumm_nds += parseFloat(usrp[0].summ_nds) || 0
    });

    thisStag.stagSumm = stagSumm.toString()
    thisStag.stagSumm_nds = stagSumm_nds.toString()

    let kp_summ = 0
    let kp_summ_nds = 0
    state.stags.forEach(stag => {
        kp_summ += parseFloat(stag.stagSumm) || 0
        kp_summ_nds += parseFloat(stag.stagSumm_nds) || 0
    })
    state.kp_summ = kp_summ.toString()
    state.kp_summ_nds = kp_summ_nds.toString()
}

export const sampSlice = createSlice({
    name: 'sampData',
    initialState,
    reducers: {
        setKp_offer_expire_date: (state, action: PayloadAction<string>) => {
            state.links.kp_offer_expire_date = action.payload
        },
        setTripPrice: (state, action: PayloadAction<string>) => {
            state.links.travel_exp = action.payload;
        },
        setTripComment: (state, action: PayloadAction<string>) => {
            state.links.travel_exp_comm = action.payload;
        },
        toggleEtapRowSub: (state, action: PayloadAction<IUnitFinder>) => {
            const thisUsrp = getUspsr(state.stags, action.payload)
            thisUsrp.isSubToggle = !thisUsrp.isSubToggle;
        },
        setAlt_name_unit: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.alt_name_unit = action.payload.value;
        },
        setUsl_quan_unit: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUnit.usl_quan_unit = action.payload.value;
            thisUsrp.usl_quan_unit = action.payload.value;
        },
        setNsu_menge: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUnit = getUnit(state.stags, action.payload.UnitFinder)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUnit.nsu_menge = action.payload.value;
            thisUsrp.nsu_menge = action.payload.value;
            calcSumm(thisUsrp)
            calcStageSumm(state, thiStage, action.payload.UnitFinder.link_id)
        },
        setPrices_user: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.prices_user = action.payload.value;
            calcSumm(thisUsrp)
            calcStageSumm(state, thiStage, action.payload.UnitFinder.link_id)
        },
        setVat_rate: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thiStage = findStage(state.stags, action.payload.UnitFinder.kp_stage_guid)
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.vat_rate = action.payload.value;
            calcSumm(thisUsrp)
            calcStageSumm(state, thiStage, action.payload.UnitFinder.link_id)
        },
        setNds_comm: (state, action: PayloadAction<IUnitStringPayload>) => {
            const thisUsrp = getUspsr(state.stags, action.payload.UnitFinder)
            thisUsrp.nds_comm = action.payload.value;
        },

        setStageNoNds: (state, action: PayloadAction<any>) => {
            const index = state.stags.findIndex(stage => stage.opr_usl_stage_num === action.payload.etapId)
            state.stags[index].isNoNds = action.payload.checked;
        },
        setStageNoNdsComm: (state, action: PayloadAction<any>) => {
            const index = state.stags.findIndex(stage => stage.opr_usl_stage_num === action.payload.etapId)
            state.stags[index].units.forEach(unit => {
                let thisUsrps = unit.usrps[unit.usrps.findIndex(usrp => usrp.link_id === state.link)]
                thisUsrps.nds_comm = action.payload.value
            })
            
        },
        setStageSumm: (state, action: PayloadAction<any>) => {
            const index = state.stags.findIndex(stage => stage.opr_usl_stage_id === action.payload.opr_usl_stage_id)
            state.stags[index].stagSumm_nds = action.payload.value.summ
            state.stags[index].stagSumm_nds = action.payload.value.summ_nds
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                sampAPI.endpoints.fetchSamp.matchFulfilled,
                (state, { payload }) => {
                    //debugger
                    console.warn(payload);


                    payload.stags.forEach( stag => {
                        stag.units.forEach( unit => {
                            let thisUsrps = unit.usrps.filter(usrp => usrp.link_id === payload.link)[0];
                            calcSumm(thisUsrps)
                        })
                        calcStageSumm(payload, stag, payload.link)
                    })

                    
                    //server data to reducer
                    return payload
                }
            )
    },


})

export default sampSlice.reducer;