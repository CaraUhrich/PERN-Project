import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const nonantumGalleryApi = createApi({
    reducerPath: 'nonantumGalleryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8080/api`,
        prepareHeaders(headers) {
            headers.set('Content-type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['User', 'Comments', 'Saves'],
    endpoints: (builder) => ({
        getPaintings: builder.query({
            query: () => '/paintings'
        }),
        getSinglePainting: builder.query({
            query: (id) => `/paintings/${id}`,
            providesTags: ['Saves']
        }),
        getArtists: builder.query({
            query: () => '/artists'
        }),
        getSingleArtist: builder.query({
            query: (id) => `/artists/${id}`
        }),
        getCollections: builder.query({
            query: () => '/collections'
        }),
        getSingleCollection: builder.query({
            query: (id) => `/collections/${id}`
        }),
        getPaintingComments: builder.query({
            query: (paintingId) => `/comments/${[paintingId]}`,
            providesTags: ['Comments']
        }),
        getUserSaves: builder.query({
            query: (token) => ({
                url: `/saves`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ['User', 'Saves'] 
        }),
        getCurrentUser: builder.query({
            query: (token) => ({
                url: '/users',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ['User']
        }),
        createSave: builder.mutation({
            query: (data) => ({
                url: '/saves',
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ['Saves']
        }),
        deleteSave: builder.mutation({
            query: (id) => ({
                url: `/saves/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Saves']
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: '/users/register',
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/users/login',
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ['User']
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url: '/comments',
                method: 'POST',
                body: {...data},
            }),
            invalidatesTags: ['Comments']
        }),
        updateComment: builder.mutation({
            query: (id, data) => ({
                url: `/comments/${id}`,
                method: 'PUT',
                body: {...data},
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/comments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments']
        })
    })
})

export const {
    useGetPaintingsQuery,
    useGetSinglePaintingQuery,
    useGetArtistsQuery,
    useGetSingleArtistQuery,
    useGetCollectionsQuery,
    useGetSingleCollectionQuery,
    useGetPaintingCommentsQuery,
    useGetUserSavesQuery,
    useGetCurrentUserQuery,
    useCreateSaveMutation,
    useDeleteSaveMutation,
    useCreateUserMutation,
    useLoginUserMutation,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = nonantumGalleryApi