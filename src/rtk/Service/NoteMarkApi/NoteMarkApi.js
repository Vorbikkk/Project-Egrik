import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const NoteMarkApi = createApi({
    reducerPath: 'NoteMarkApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/noteMark' }),
    tagTypes: ['NoteMark'],
    endpoints: (build) => ({
        getNoteMark: build.query({
            query: (params) => ({
                url: `/?page=${params.page}&limit=${params.limit}`,
            }),
            providesTags: (result) =>
                result?.rows
                  ? [
                      ...result.rows.map(({ id }) => ({ type: 'NoteMark', id })),
                      { type: 'NoteMark', id: 'LIST' },
                    ]
                  : [{ type: 'NoteMark', id: 'LIST' }],
            }),
        createNoteMark: build.mutation({
            query: (NoteMark) => ({
                url: '/',
                method: 'POST',
                body: NoteMark,
            }),
            invalidatesTags: ['NoteMark']
        }),
        deleteNoteMark: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['NoteMark']
        }),
        updateNoteMark: build.mutation({
            query: ({id,...body}) => {
                return {
                    url: `/${id}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'NoteMark', id },
                { type: 'NoteMark', id: 'LIST' },
              ],
        })
    })

})

export const { useCreateNoteMarkMutation, useGetNoteMarkQuery,
    useDeleteNoteMarkMutation, useUpdateNoteMarkMutation } = NoteMarkApi

