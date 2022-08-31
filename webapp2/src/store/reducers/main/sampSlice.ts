import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./sampData"
import { MainService } from '../../../services/MainService'
import { format, parseISO } from "date-fns";

export const sampSlice = createSlice({
    name: 'sampData',
    initialState,
    reducers: {
        //     toggleChecked: (state, action: PayloadAction<boolean>) => {
        //         const isChecked = state.trip.isTrip === action.payload;
        //         if (isChecked) {
        //             state.trip.isTrip = false;
        //         } else {
        //             state.trip.isTrip = action.payload;
        //         }
        //     },

        //     toggleEtapRowSub: (state, action: PayloadAction<number>) => {
        //         state.etapItems[action.payload].sub.isSub = !state.etapItems[action.payload].sub.isSub;
        //     },
        //     setEtapEI: (state, action: PayloadAction<any>) => {
        //         const { etapItemId, value } = action.payload
        //         const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
        //         state.etapItems[etapItemIndex].ei_id = value.id
        //         state.etapItems[etapItemIndex].ei_name = value.label
        //     },
        //     setEtapEIValue: (state, action: PayloadAction<any>) => {
        //         const { etapItemId, value } = action.payload
        //         const ei_value = parseFloat(value)
        //         const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
        //         const summ = ei_value * parseFloat(state.etapItems[etapItemIndex].ei_price)
        //         const nds = state.etapItems[etapItemIndex].nds

        //         state.etapItems[etapItemIndex].ei_value = value
        //         state.etapItems[etapItemIndex].summ = (summ || "-- --").toString()
        //         state.etapItems[etapItemIndex].summ_nds = (summ + summ * nds / 100 || "-- --").toString()
        //     },
        //     setEtapEIPrice: (state, action: PayloadAction<any>) => {
        //         const { etapItemId, value } = action.payload
        //         const ei_price = parseFloat(value)
        //         const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
        //         const summ = ei_price * parseFloat(state.etapItems[etapItemIndex].ei_value)
        //         const nds = state.etapItems[etapItemIndex].nds

        //         state.etapItems[etapItemIndex].ei_price = value
        //         state.etapItems[etapItemIndex].summ = (summ || "-- --").toString()
        //         state.etapItems[etapItemIndex].summ_nds = (summ + summ * nds / 100 || "-- --").toString()
        //     },
        //     setEtapNDS: (state, action: PayloadAction<any>) => {
        //         const { etapItemId, value } = action.payload
        //         const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
        //         const summ = parseFloat(state.etapItems[etapItemIndex].ei_price) * parseFloat(state.etapItems[etapItemIndex].ei_value)

        //         state.etapItems[etapItemIndex].nds = value.value
        //         state.etapItems[etapItemIndex].nds_text = value.label
        //         state.etapItems[etapItemIndex].summ = (summ || "-- --").toString()
        //         state.etapItems[etapItemIndex].summ_nds = (summ + summ * value.value / 100 || "-- --").toString()
        //     },
        //     setEtapSumm: (state, action: PayloadAction<any>) => {
        //         let etapSumm = 0
        //         let etapSumm_nds = 0
        //         const etapId = action.payload.etapId
        //         const etapsSumms = state.etapsSumms
        //         const etapItemIndexCurrent = etapsSumms.findIndex(etapsSumms => etapsSumms.id === etapId)
        //         const etapItemsCurrent: any[] = []

        //         state.etapItems.forEach((e: any) => {
        //             if (e.etapId === etapId) {
        //                 etapItemsCurrent.push(e)
        //             }
        //         })

        //         etapItemsCurrent.forEach((element: { summ: string, summ_nds: string }) => {
        //             etapSumm += !isNaN(parseFloat(element.summ)) ? parseFloat(element.summ) : 0
        //             etapSumm_nds += !isNaN(parseFloat(element.summ_nds)) ? parseFloat(element.summ_nds) : 0
        //         });

        //         state.etapsSumms[etapItemIndexCurrent].etapSumm = etapSumm.toString()
        //         state.etapsSumms[etapItemIndexCurrent].etapSumm_nds = etapSumm_nds.toString()
        //     },
        //     setSummKP: (state, action: PayloadAction<any>) => {
        //         let summKP = 0
        //         let summKP_nds = 0
        //         state.etapsSumms.forEach((element: { etapSumm: string, etapSumm_nds: string }) => {
        //             summKP += !isNaN(parseFloat(element.etapSumm)) ? parseFloat(element.etapSumm) : 0
        //             summKP_nds += !isNaN(parseFloat(element.etapSumm_nds)) ? parseFloat(element.etapSumm_nds) : 0
        //         });
        //         state.summKP = summKP.toString()
        //         state.summKP_nds = summKP_nds.toString()
        //     },
        //     setNoNds: (state, action: PayloadAction<any>) => {
        //         const etapsSumms = state.etapsSumms
        //         const etapItemIndexCurrent = etapsSumms.findIndex(etapsSumms => etapsSumms.id === action.payload.etapId)
        //         state.etapsSumms[etapItemIndexCurrent].noNds = action.payload.checked;
        //     },
        //     setNoNdsStatia: (state, action: PayloadAction<any>) => {
        //         const etapsSumms = state.etapsSumms
        //         const etapItemIndexCurrent = etapsSumms.findIndex(etapsSumms => etapsSumms.id === action.payload.etapId)
        //         state.etapsSumms[etapItemIndexCurrent].noNdsStatia = action.payload.value;
        //     }

        setKp_offer_expire_date: (state, action: PayloadAction<string>) => {
            state.links.kp_offer_expire_date = action.payload
        },
        setTripPrice: (state, action: PayloadAction<string | null>) => {
            state.link.travel_exp = action.payload;
        },
        setTripComment: (state, action: PayloadAction<string>) => {
            //state.link.travel_exp_comm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                MainService.endpoints.fetchSamp.matchFulfilled,
                (state, { payload }) => {
                    debugger
                    console.warn(payload);
                    //state.dateKP = payload.kp_accep_date;
                    //state.dateKP = payload.
                }
            )
    },


})

export default sampSlice.reducer;