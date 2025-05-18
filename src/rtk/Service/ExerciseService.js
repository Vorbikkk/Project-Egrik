import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const ExerciseApi = createApi({
    reducerPath: 'ExerciseApi',
    keepUnusedDataFor:60*2,
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/exercise' }),
    tagTypes: ['Exercise'],
    endpoints: (build) => ({
        getExercises:build.query({
            query: ({params,dataFilter}) => ({
                url: `/?page=${params.page}&limit=${params.limit}&metod=${dataFilter.method}&text=${dataFilter.text}`,
              }),
              providesTags: ['Exercise'],
        }),
        getOneExercise:build.query({
            query: (id) => ({
                url: `/${id}`,
              }),
              providesTags: ['Exercise'],
        }),
        createExercise: build.mutation({
            query: (exercise) => ({
                url: '/',
                method: 'POST',
                body: exercise,
            }),
            invalidatesTags: ['Exercise']
        }),
        deleteExercise: build.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:'DELETE',

            }),
            invalidatesTags: ['Exercise']

        })
    })

})

 


   export const {useCreateExerciseMutation,useGetExercisesQuery,useGetOneExerciseQuery,useDeleteExerciseMutation}=ExerciseApi