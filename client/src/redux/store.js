import { configureStore } from '@reduxjs/toolkit'
import { nonantumGalleryApi } from './nonantumGalleryApi'
import tokenSlice from './tokenSlice'

export const store = configureStore({
    reducer: {
        state: tokenSlice,
        [nonantumGalleryApi.reducerPath]: nonantumGalleryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nonantumGalleryApi.middleware)
})