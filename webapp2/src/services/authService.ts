import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../models/test/IUser'
import { RootState } from '../store/store'

// export interface User {
//   first_name: string
//   last_name: string
// }

export interface UserResponse {
  user: IUser
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

export interface RegistrationRequest {
  "lastname": string
  "firstname": string
  "patronymic": string
  "email": string
  "resident": true,
  "individual": true,
  "org_fullname": string
  "org_shortname": string
  "org_telephone": string
  "org_email": string
  "password": string
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
    loginCode: builder.mutation<UserResponse, LoginCodeRequest>({
      query: (credentials) => ({
        url: 'http://109.195.85.121:5010/auth/registerCode',
        method: 'POST',
        body: credentials,
      }),
    }),
    registration: builder.mutation<UserResponse, RegistrationRequest>({
      query: (body) => ({
        url: 'http://109.195.85.121:5010/auth/registration',
        method: 'POST',
        body: body,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'http://109.195.85.121:5010/users',
    }),
  }),
})

export const { useLoginMutation, useLoginCodeMutation, useRegistrationMutation, useProtectedMutation } = authService
