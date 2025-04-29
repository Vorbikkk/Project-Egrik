import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const ExerciseApi = createApi({
    reducerPath: 'ExerciseApiApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Exercise'],
    endpoints: (build) => ({
        getExercise:build.query({
            query: () => ({
                url: `/exerciseMark`,
              }),
              providesTags: ['Exercise'],
        }),
        createExercise: build.mutation({
            query: (exercise) => ({
                url: '/exerciseMark/',
                method: 'POST',
                body: exercise,
            }),
            invalidatesTags: ['Exercise']
        }),
    })

})

   export const {useCreateExerciseMutation,useGetExerciseQuery}=ExerciseApi