import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./zakData"


export const zakSlice = createSlice({
    name: 'zakData',
    initialState,
    reducers: {
        setToggleSidebar: (state) => {
            
        }
    },
    extraReducers: {},
})

export default zakSlice.reducer;