import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISamp } from "../models/ISamp";


export const postAPI = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://109.195.85.121:5010/samp' }),
    tagTypes: ['Post'],

    endpoints: (build) => ({
        fetchAllPosts: build.query<ISamp[], string>({
            query: (kp_stage_guid: string) => ({
                url: `/stage/${kp_stage_guid}`,
                // params: {
                //     _limit: limit
                // }
            }),
            providesTags: result => ['Post']
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