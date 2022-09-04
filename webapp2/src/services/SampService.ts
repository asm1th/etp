import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISampNew } from "../models/ISampServer";
import { RootState } from '../store/store'

export const sampAPI = createApi({
    reducerPath: "sampAPI",
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://109.195.85.121:5010/',
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
            // transformResponse: (response: { data: ISampNew }, meta, arg) => {
              
            //   return response.data
            // }
        }),

        // createPost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: '/posts',
        //         method: 'POST',
        //         body: post
        //     }),
        //     invalidatesTags: ['Post']
        // }),
        // updatePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts/${post.id}`,
        //         method: 'PUT',
        //         body: post
        //     }),
        //     invalidatesTags: ['Post']
        // }),
        // deletePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts/${post.id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['Post']
        // }),
    })
})

//export const { useFetchSampMutation } = sampAPI
export const { 
  useFetchSampQuery 
} = sampAPI