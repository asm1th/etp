import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../models/IUser'
import { RootState } from '../store'

// export interface User {
//   first_name: string
//   last_name: string
// }

export interface UserResponse {
  user: IUser
  token: string
}

export interface LoginRequest {
  //username: string
  email: string
  password: string
}

export interface LoginRequestCode {
  num1: string
  num2: string
  num3: string
  num4: string
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
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'http://109.195.85.121:5010/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    loginCode: builder.mutation<UserResponse, LoginRequestCode>({
      query: (credentials) => ({
        url: 'http://109.195.85.121:5010/auth/registerCode',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'http://109.195.85.121:5010/users',
    }),
  }),
})

export const { useLoginMutation, useLoginCodeMutation, useProtectedMutation } = authService
