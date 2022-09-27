// todo get auth code from here  https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/authentication-with-extrareducers?from-embed=&file=/src/features/auth/authSlice.tsx
// todo auth https://codevoweb.com/react-redux-toolkit-refresh-token-authentication/

import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'
import { IRegData } from '../store/reducers/reg/IRegistration'

export interface RegResponse {
    // не понятно что в ответе?
    // user: IUser
    // token: string
    data: {
        message: string
        statusCode: number
    },
    status: number
}

export interface UserResponse {
    //user: IUser
    token: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginCodeRequest {
    num1: string
    num2: string
    num3: string
    num4: string
}

export interface CustomError {
    data: {
        message: string,
        status: string
    }
    status: string
}

export const authService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).authReducer.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    //}),

    }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: `http://${process.env.REACT_APP_API_ENDPOINT}:5010/auth/login`,
                method: 'POST',
                body: credentials,
            }),
        }),
        loginCode: builder.mutation<UserResponse, LoginCodeRequest>({
            query: (credentials) => ({
                url: `http://${process.env.REACT_APP_API_ENDPOINT}:5010/auth/registerCode`,
                method: 'POST',
                body: credentials,
            }),
        }),
        registration: builder.mutation<RegResponse, IRegData>({
            query: (body) => ({
                url: `http://${process.env.REACT_APP_API_ENDPOINT}:5010/auth/registration`,
                method: 'POST',
                body: body,
                //responseHandler: (response) => response.text()
                //validateStatus: (response, result) => response.status === 200 && !result.isError
            }),
            invalidatesTags: ['Auth']
        }),
        //test
        protected: builder.mutation<{ message: string }, void>({
            query: () => `http://${process.env.REACT_APP_API_ENDPOINT}:5010/users`,
        }),
    }),
})

export const { 
    useLoginMutation, 
    useLoginCodeMutation, 
    useRegistrationMutation, 
    useProtectedMutation 
} = authService
