import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';


export const VideoClipApi = createApi({
    reducerPath: 'VideoClipApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/VideoClip' }),
    tagTypes: ['VideoClip'],
    endpoints: (build) => ({
     
        createVideoClip: build.mutation({
            query: (VideoClip) => {
             return   {
                 url: '/',  
                method: 'POST',
                body: VideoClip,
               }
              
            },
            invalidatesTags: ['VideoClip']
        }),
        getAllVideoClips:build.query({
            query:({limit,offset})=>{
                console.log(limit,offset)
              return {url:`/?limit=${limit}&page=${offset}`}
            },
            providesTags:['VideoClip']
        })
    })

})

export const {useCreateVideoClipMutation,useGetAllVideoClipsQuery}=VideoClipApi
