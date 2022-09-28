import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISampNew, ILink, IUsrp, IFileKP, IFileTZ } from "../models/ISamp";
import { RootState } from '../store/store'

export const sampAPI = createApi({
    reducerPath: "sampAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://sapdp7.gazprom-neft.local:50000/NDI_EPCOMMON_D~gzpn~kp~service~rs~gazprom-neft.ru/rs/kp/',
        //baseUrl: `http://${process.env.REACT_APP_API_ENDPOINT}:5010/`,
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
        updateFile: builder.mutation<IFileKP, IFileKP>({
            query: (file) => ({
                url: `/file`,
                method: 'PUT',
                body: file
            }),
            invalidatesTags: ['Samp']
        }),
        //kp/link/0050569CDC861EDD8EE3805C575DA0E2/docid/BDS_LOC1  0050569CDC861EED8FE26A52FE10A606
        // fetchFile: builder.query<IFileKP, any>({
        //     query: ({link_id, file_docid}) => ({
        //         url: `/link/${link_id}/docid/${file_docid}`,
        //     })
        // }),

        // delete: build.mutation<IUsrp, IUsrp>({
        //     query: (usrp) => ({
        //         url: `/usrp/${usrp.id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['Samp']
        // }),
    })
})

export const {
    useFetchSampQuery,
    useUpdateUsrpMutation,
    useUpdateLinkMutation,
    useUpdateFileMutation
} = sampAPI