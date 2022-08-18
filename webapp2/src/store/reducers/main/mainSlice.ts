import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IMainData } from "../../../models/IMainData"
// import { IEtap } from "../../../models/IMainData"
// import { IEtapItem } from "../../../models/IMainData"

import { initialState } from "./etapData"

export const mainSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        createTrip(state, action) { },
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
            state.etaps[action.payload].sub.isSub = !state.etaps[action.payload].sub.isSub;
        },
        setEtapEIValue: (state, action: PayloadAction<any>) => {
            const {etapIndex, value } = action.payload
            state.etaps[etapIndex].ei_value= value
        },
        setEtapEIPRICEValue: (state, action: PayloadAction<any>) => {
            const {etapIndex, value } = action.payload
            state.etaps[etapIndex].ei_price= value
        },
    },
})

export default mainSlice.reducer;