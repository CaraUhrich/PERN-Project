import { configureStore } from '@reduxjs/toolkit'
import { nonantumGalleryApi } from './nonantumGalleryApi'

export const store = configureStore({
    reducer: {
        [nonantumGalleryApi.reducerPath]: nonantumGalleryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nonantumGalleryApi.middleware)
})