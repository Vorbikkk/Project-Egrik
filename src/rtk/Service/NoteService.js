import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';

export const NoteApi = createApi({
    reducerPath: 'NoteApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/note' }),
    tagTypes: ['Note', 'PinNotes'],
    endpoints: (build) => ({
        getNote: build.query({
            query: (params) => {

                let {page,limit,...options}=params

              return {url:`/?page=${page}&limit=${limit}&options=${JSON.stringify(options)}`}

            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {

                return `${endpointName}-${queryArgs.noteMarkId || 'all'}-${queryArgs.note_priority || 'all'}`
            },
            merge: (currentCache, newItems,{arg}) => {

                 console.log('merge',newItems)  

                if(arg?.note_priority!==null){
                    
                    newItems=newItems.rows.length > 0 ? newItems :currentCache 
                    
                    return {
                        count:newItems.count,
                        rows:[...newItems.rows]
                    }
                }
                
                let count = currentCache && currentCache.count
                const newIds = new Set(newItems.rows.map(item => item.id))
                const filteredCurrent = newIds ? currentCache.rows.filter(item => !newIds.has(item.id)) : currentCache.rows
                
                return {
                    count: count || newItems.count,
                    rows: [...filteredCurrent || [], ...newItems.rows]
                }

            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            providesTags: (result) => [
                ...(result?.rows?.map(({ id }) => ({ type: 'Note', id })) || []),
                { type: 'Note', id: 'PARTIAL-LIST' }
            ],
        }),

        //поулчение закрепленных заметок
        getPinNotes: build.query({
            query: ({ noteMarkId = null } = {}) => ({
                url: '/pin_notes',
                params: noteMarkId ? { noteMarkId } : {}
            }),
            providesTags: (result) => [
                ...(result?.rows?.map(({ id }) => ({ type: 'PinNotes', id })) || []),
                { type: 'PinNotes', id: 'LIST' }
            ],
        }),
       
       

        createNote: build.mutation({
            query: (note) => ({
                url: '/',
                method: 'POST',
                body: note,
            }),
            invalidatesTags: [{ type: 'Note', id: 'PARTIAL-LIST' }],
            async onQueryStarted(newNote, { dispatch, queryFulfilled, getState }) {
                // 1. Получаем параметры всех закэшированных запросов
                const cachedArgs = NoteApi.util.selectCachedArgsForQuery(getState(), 'getNote');

                try {
                    const { data: createdNote } = await queryFulfilled;

                    // 2. Добавляем во все существующие кэши
                    cachedArgs.forEach(args => {
                        dispatch(
                            NoteApi.util.updateQueryData('getNote', args, (draft) => {
                                // Для первой страницы - добавляем в начало
                                draft.rows.push(createdNote);
                                if (args.page === 1) {
                                    draft.count += 1;
                                }
                                // Для остальных - только увеличиваем счётчик
                                else if (draft.count !== undefined) {
                                    draft.count += 1;
                                }
                            })
                        );
                    });

                } catch { } // Откат не требуется - изменения только после успешного запроса
            }
        }),

        deleteNote: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Note', id },
                { type: 'Note', id: 'PARTIAL-LIST' },
                { type: 'PinNotes', id },
            ],
            async onQueryStarted(params,args ) {
                  console.log(params,args)

                let {id}=params
                let { dispatch, queryFulfilled, getState }=args
                // 1. Оптимистичное удаление из getNote
                const cachedArgs = NoteApi.util.selectCachedArgsForQuery(getState(), 'getNote');

                const patches = cachedArgs.map(args =>
                    dispatch(
                        NoteApi.util.updateQueryData('getNote', args, draft => {
                            draft.rows = draft.rows.filter(note => note.id !== id);
                            if (draft.count) draft.count -= 1;
                        })
                    )
                );

                // 2. Оптимистичное удаление из pinNotes
                const pinNotesPatch = dispatch(
                    NoteApi.util.updateQueryData('getPinNotes', {}, draft => {
                        draft.rows = draft.rows?.filter(note => note.id !== id) || [];
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Откатываем все изменения при ошибке
                    patches.forEach(patch => patch.undo());
                    pinNotesPatch.undo();
                }
            }
        }),

        updateNote: build.mutation({
            query: ({ id, ...body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Note', id },
                { type: 'Note', id: 'PARTIAL-LIST' },
                { type: 'PinNotes', id },
            ],
            // Дополнительно ручное обновление
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {



                const patchResult = dispatch(
                    NoteApi.util.updateQueryData('getNote', { page: 2, noteMarkId: 2 }, (draft) => {
                        const note = draft.rows.find((n) => n.id === id);
                        if (note) {
                            Object.assign(note, patch)
                            if(patch.note_is_completed){
                                draft.rows=draft.rows.filter(note=>note.id !== id)
                            }
                        }
                        ;
                    })
                );
                console.log("patchResult", patchResult)
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useCreateNoteMutation,
    useGetNoteQuery,
    useGetPinNotesQuery,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useGetCompleteNotesQuery
} = NoteApi;