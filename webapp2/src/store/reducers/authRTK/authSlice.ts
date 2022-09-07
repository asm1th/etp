import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../models/test/IUser'
import { authService } from '../../../services/authService'
import type { RootState } from '../../../store/store'

type AuthState = {
    isAuth: boolean
    user: IUser | null
    token: string | null
    kp_sample_guid: string | null
}

// const getLocalIsAuth = () => {
//     if (localStorage.getItem('isAuth')) {
//         return JSON.parse(window.localStorage.getItem('isAuth') ?? '',)
//     } else {
//         return false
//     }
// }

const initialState = {
    isAuth: false, // getLocalIsAuth(), // отключение auth = false \ true 
    user: null, 
    token: null,
    kp_sample_guid: ""
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState as AuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addMatcher(
            authService.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                debugger
                state.isAuth = true
                state.token = payload.token

                //state.user = payload.user
            }
        )
    },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user
