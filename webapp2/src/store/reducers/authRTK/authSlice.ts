import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './IUser'
import { authService } from '../../../services/authService'
import type { RootState } from '../../../store/store'

type AuthState = {
    isAuth: boolean
    user: IUser | null
    token: string | null
    kp_sample_guid: string | null
    link_id: string | null
}

// const getLocalIsAuth = () => {
//     if (localStorage.getItem('isAuth')) {
//         return JSON.parse(window.localStorage.getItem('isAuth') ?? '',)
//     } else {
//         return false
//     }
// }

const initialState = {
    isAuth: true, // getLocalIsAuth(), // отключение auth = false \ true 
    user: null, 
    token: null,
    kp_sample_guid: "",
    link_id: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState as AuthState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
        },
        setKp_sample_guid: (state, action: PayloadAction<string>) => {
            state.kp_sample_guid = action.payload;
        },
        setLink_id: (state, action: PayloadAction<string>) => {
            state.link_id = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            authService.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                //debugger
                state.isAuth = true
                state.token = payload.token

                //state.user = payload.user
            }
        )
    },
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.authReducer.user
