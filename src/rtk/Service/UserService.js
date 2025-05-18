import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/user' }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUsers:build.query({
            query: () => ({
                url: `/`,
              }),
              providesTags: ['User'],
        }),
     
        getUserAuth:build.mutation({
            query:(LoginData)=>({
                url:'/login',
                method:'POST',
                body:LoginData,
                credentials: 'include',
            }),
            invalidatesTags:['User']
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: '/regist',  // Убедитесь, что путь совпадает с серверным эндпоинтом
                method: 'POST',
                body: user,
                credentials: 'include',  // Для отправки кук (если используется JWT в httpOnly)
              
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: build.mutation({
            query:(id)=>{
                console.log(id)
               return {url:`/${id}`,
                metod:'DELETE',}

            },
            invalidatesTags:['User']
        })
    })

})

// export const {useGetUsersQuery,useCreateUserMutation}=UserApi
