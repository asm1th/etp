import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./dashData"


export const dashSlice = createSlice({
    name: 'dashData',
    initialState,
    reducers: {
        
    },
    extraReducers: {},
})

export default dashSlice.reducer;