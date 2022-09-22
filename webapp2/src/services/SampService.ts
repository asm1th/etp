import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { json } from "stream/consumers";
import { ISampNew, ILink, IUsrp } from "../models/ISamp";
import { RootState } from '../store/store'

export const sampAPI = createApi({
    reducerPath: "sampAPI",

    baseQuery: fetchBaseQuery({
        //baseUrl: 'http://sapdp7.gazprom-neft.local:50000/NDI_EPCOMMON_D~gzpn~kp~service~rs~gazprom-neft.ru/rs/kp/',
        baseUrl: `http://${process.env.REACT_APP_API_ENDPOINT}:5010/`,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).authReducer.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                //headers.set('content-type','application/json;charset=UTF-8')
            }
            return headers
        },
    }),
    tagTypes: ['Samp'],

    endpoints: (builder) => ({
        fetchSamp: builder.query<ISampNew, any>({
            query: (kp_sample_guid: any) => ({
                url: `/samp/${kp_sample_guid}`,
            }),
            providesTags: result => ['Samp'],
        }),
        updateLink: builder.mutation<ILink, ILink>({
            query: (linkBody) => ({
                url: `/link`,
                method: 'PUT',
                body: linkBody 
                //body: encodeURI(JSON.stringify(linkBody))
            }),
            invalidatesTags: ['Samp']
        }),
        updateUsrp: builder.mutation<IUsrp, IUsrp>({
            query: (usrpBody) => ({
                url: `/usrp`,
                method: 'PUT',
                body: usrpBody
            }),
            invalidatesTags: ['Samp']
        }),
        // deletePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts/${post.id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['Post']
        // }),
    })
})

export const {
    useFetchSampQuery,
    useUpdateUsrpMutation,
    useUpdateLinkMutation
} = sampAPI