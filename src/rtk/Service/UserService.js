import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUsers:build.query({
            query: () => ({
                url: `/`,
              }),
              providesTags: ['User'],
        }),
        getUser:build.query({
            query: () => ({
                url: `/user`,
              }),
              providesTags: ['User'],
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: '/api/user/regist',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User']
        }),
    })

})

// export const {useGetUsersQuery,useCreateUserMutation}=UserApi
