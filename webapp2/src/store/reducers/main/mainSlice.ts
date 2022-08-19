import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./etapData"

const calcSummKP = (state: any) => {
    let etapSumm = 0
    state.etapItems.forEach((element: { summ: any; }) => {
        //const etapItemIndex = element.findIndex(state.etapItems => state.etapItems.id === element.id)
        etapSumm += ParseFloat(element.summ)
    });

    state.etapsSumms[0].etapSumm = etapSumm.toString()
    //state.etapsSumms[0].etapSumm_nds = "200"
}

export const mainSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        toggleChecked: (state, action: PayloadAction<boolean>) => {
            const isChecked = state.trip.isTrip === action.payload;
            if (isChecked) {
                state.trip.isTrip = false;
            } else {
                state.trip.isTrip = action.payload;
            }
        },
        setTripPrice: (state, action: PayloadAction<string>) => {
            state.trip.tripPrice = action.payload;
        },
        setTripComment: (state, action: PayloadAction<string>) => {
            state.trip.tripComment = action.payload;
        },
        setDateKP: (state, action: PayloadAction<Date>) => {
            state.dateKP = action.payload;
        },
        toggleEtapRowSub: (state, action: PayloadAction<number>) => {
            state.etapItems[action.payload].sub.isSub = !state.etapItems[action.payload].sub.isSub;
        },

        setEtapEI: (state, action: PayloadAction<any>) => {
            const { etapItemId, value } = action.payload
            const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)

            state.etapItems[etapItemIndex].ei_id = value.id
            state.etapItems[etapItemIndex].ei_name = value.label
        },
        setEtapEIValue: (state, action: PayloadAction<any>) => {
            const { etapItemId, value } = action.payload
            const ei_value = parseFloat(value)
            const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
            const summ = ei_value * parseFloat(state.etapItems[etapItemIndex].ei_price)
            const nds = state.etapItems[etapItemIndex].nds

            state.etapItems[etapItemIndex].ei_value = value
            state.etapItems[etapItemIndex].summ = (summ || "-- --").toString()
            state.etapItems[etapItemIndex].summ_nds = (summ + summ * nds / 100 || "-- --").toString()
        },
        setEtapEIPrice: (state, action: PayloadAction<any>) => {
            const { etapItemId, value } = action.payload
            const ei_price = parseFloat(value)
            const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
            const summ = ei_price * parseFloat(state.etapItems[etapItemIndex].ei_value)
            const nds = state.etapItems[etapItemIndex].nds

            state.etapItems[etapItemIndex].ei_price = value
            state.etapItems[etapItemIndex].summ = (summ || "-- --").toString()
            state.etapItems[etapItemIndex].summ_nds = (summ + summ * nds / 100 || "-- --").toString()
        },
        setEtapNDS: (state, action: PayloadAction<any>) => {
            const { etapItemId, value } = action.payload
            const etapItemIndex = state.etapItems.findIndex(etapItems => etapItems.id === etapItemId)
            const summ = parseFloat(state.etapItems[etapItemIndex].ei_price) * parseFloat(state.etapItems[etapItemIndex].ei_value)

            state.etapItems[etapItemIndex].nds = value.value
            state.etapItems[etapItemIndex].nds_text = value.label
            state.etapItems[etapItemIndex].summ = (summ || "-- --").toString()
            state.etapItems[etapItemIndex].summ_nds = (summ + summ * value.value / 100 || "-- --").toString()

            calcSummKP(state)
        }
    },
})

export default mainSlice.reducer;