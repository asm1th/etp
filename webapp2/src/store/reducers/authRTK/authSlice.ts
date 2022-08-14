import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../models/IUser'
import { authService } from '../../../services/auth'
import type { RootState } from '../../../store/index'

type AuthState = {
    isAuth: boolean
    user: IUser | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { isAuth: false, user: null, token: null } as AuthState,
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
