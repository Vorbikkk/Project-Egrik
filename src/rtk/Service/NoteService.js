import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const NoteApi = createApi({
    reducerPath: 'NoteApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/note' }),
    tagTypes: ['Note'],
    endpoints: (build) => ({
        getNote: build.query({
            query: (params) => ({
                url: `/?page=${params.page}&limit=${params.limit}`,
            }),
            providesTags: (result) =>
                result?.rows
                  ? [
                      ...result.rows.map(({ id }) => ({ type: 'Note', id })),
                      { type: 'Note', id: 'LIST' },
                    ]
                  : [{ type: 'Note', id: 'LIST' }],
            }),
        createNote: build.mutation({
            query: (Note) => ({
                url: '/',
                method: 'POST',
                body: Note,
            }),
            invalidatesTags: ['Note']
        }),
        deleteNote: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note']
        }),
        updateNote: build.mutation({
            query: ({id,...body}) => {
                return {
                    url: `/${id}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Note', id },
                { type: 'Note', id: 'LIST' },
              ],
        })
    })

})

export const { useCreateNoteMutation, useGetNoteQuery,
    useDeleteNoteMutation, useUpdateNoteMutation } = NoteApi