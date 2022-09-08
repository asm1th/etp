import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISampNew, ILink, IUsrp } from "../models/ISamp";
import { RootState } from '../store/store'

export const sampAPI = createApi({
    reducerPath: "sampAPI",
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://109.195.85.121:5010/',
        //baseUrl: `http://${process.env.REACT_APP_API_ENDPOINT}:5010/`,
        prepareHeaders: (headers, { getState }) => {
          // By default, if we have a token in the store, let's use that for authenticated requests
          const token = (getState() as RootState).authReducer.token
          if (token) {
            headers.set('authorization', `Bearer ${token}`)
          }
          return headers
        },
      }),
    tagTypes: ['Samp'],

    endpoints: (builder) => ({
        fetchSamp: builder.query<ISampNew, string>({
            query: (kp_sample_guid: string) => ({
                url: `/samp/${kp_sample_guid}`,
            }),
            providesTags: result => ['Samp'],
        }),
        updateLink: builder.mutation<ILink, ILink>({
            query: (linkBody) => ({
                url: `/link`,
                method: 'PUT',
                body: linkBody
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