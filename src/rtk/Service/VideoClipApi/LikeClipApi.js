import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const LikeClipApi = createApi({
    reducerPath: 'LikeClipApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/LikeClip' }),
    tagTypes: ['LikeClip'],
    endpoints: (build) => ({
     
        createLikeClip: build.mutation({
            query: (LikeClip) => {
             return   {
                 url: '/',  
                method: 'POST',
                body: LikeClip,
               }
              
            },
            invalidatesTags: ['LikeClip']
        }),
        getLikeClip:build.query({
            query:({userId,videoId})=>{
              return {url:`/?userId=${userId}&videoId=${videoId}`}
            },
            providesTags:['LikeClip']
        }),
        deleteLikeClip: build.mutation({
            query:(id)=>{
                console.log(id)
               return {
                url:`/${id}`,
                method:'DELETE',
            }

            },
            invalidatesTags:['LikeClip']
        })
    })

})

export const {useCreateLikeClipMutation,useGetLikeClipQuery,useDeleteLikeClipMutation}=LikeClipApi

