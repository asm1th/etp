import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../models/test/IUser'
import { authService } from '../../../services/authService'
import type { RootState } from '../../../store/store'

type AuthState = {
    isAuth: boolean
    user: IUser | null
    token: string | null
}

const initialState = {
    isAuth: false, 
    user: null, 
    token: null
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState as AuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authService.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = true
                state.token = payload.token
                //state.user = payload.user
            }
        )
    },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user
