import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const ExerciseMarkApi = createApi({
    reducerPath: 'ExerciseMarkApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/exerciseMark' }),
    tagTypes: ['ExerciseMark'],
    endpoints: (build) => ({
        getExerciseMark:build.query({
            query: (params) => {
                console.log(params)
               return  {url: `/?page=${params.page}&limit=${params.limit}`}
              },
              providesTags: ['ExerciseMark'],
        }),
        createExerciseMark: build.mutation({
            query: (exercise) => ({
                url: '/',
                method: 'POST',
                body: exercise,
            }),
            invalidatesTags: ['ExerciseMark']
        }),
    })

})

   export const {useCreateExerciseMarkMutation,useGetExerciseMarkQuery}=ExerciseMarkApi