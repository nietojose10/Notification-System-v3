import { configureStore } from '@reduxjs/toolkit';
import { authSlice, broadcastMessageSlice } from './';

export const store = configureStore({
    reducer: {
        broadcastMessage: broadcastMessageSlice.reducer,
        auth: authSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type IRootState = ReturnType<typeof store.getState>;