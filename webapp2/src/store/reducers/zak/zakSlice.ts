import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./zakData"


export const zakSlice = createSlice({
    name: 'zakData',
    initialState,
    reducers: {
        setToggleSidebar: (state) => {
            
        },
        setZayavka: (state, action: PayloadAction<any>) => {
           // state.links.kp_offer_expire_date = action.payload
        },
    },
    extraReducers: {},
})

export default zakSlice.reducer;