import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./zakData"


export const zakSlice = createSlice({
    name: 'zakData',
    initialState,
    reducers: {
        setToggleSidebar: (state) => {
            
        },
        setZakForm: (state, action: PayloadAction<any>) => {
            let prop: any = action.payload.prop
            let zakForm: any = state.zakForm
            zakForm[prop] = action.payload.value;
        },
    },
    extraReducers: {},
})

export default zakSlice.reducer;