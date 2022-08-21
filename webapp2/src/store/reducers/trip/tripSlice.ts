import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type trip = boolean

interface tripState {
    trip: trip,
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
    reducers: {
        createTrip(state, action) {},
        toggleChecked: (state, action: PayloadAction<boolean>) => {
            const isChecked = state.trip === action.payload;
            if (isChecked) {
              state.trip = false; // uncheck
            } else {
              state.trip = action.payload; // check
            }
          },
    },
})

export default tripSlice.reducer;