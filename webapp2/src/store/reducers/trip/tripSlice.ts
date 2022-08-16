import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tripState {
    trip: boolean,
    isLoading: boolean,
    error: string
}

const initialState: tripState = {
    trip: false,
    isLoading: false,
    error: ''
}

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {},
    extraReducers:{
       
    }
})

export default tripSlice.reducer;