import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IOffer } from "../../models/models"

interface Offer {
    loading: boolean,
    error: string,
    offers: IOffer[]
}

const initialState: Offer = {
    loading: false,
    error: '',
    offers: []
}

export const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSuccess(state, action: PayloadAction<IOffer[]>) {
            state.loading = false
            state.offers = action.payload
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default offerSlice.reducer