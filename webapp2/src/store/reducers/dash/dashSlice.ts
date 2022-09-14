import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./dashData"


export const dashSlice = createSlice({
    name: 'dashData',
    initialState,
    reducers: {
        setToggleSidebar: (state) => {
            state.isToggleSidebar = !state.isToggleSidebar;
        }
    },
    extraReducers: {},
})

export default dashSlice.reducer;