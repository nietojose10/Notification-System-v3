import { createSlice } from '@reduxjs/toolkit';
import { MessageType, NotificationType } from '../../interfaces/interfaces';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isSaving: false,
        categories: [] as MessageType[],
        channels: [] as NotificationType[]
    },
    reducers: {
        onSavingUser: ( state ) => {
            state.isSaving = true;
        },
        onClearSavingUser: ( state ) => {
            state.isSaving = false
        },
        onLoadCategoriesUser: ( state, { payload }) => {
            state.categories = payload;
        },
        onLoadChannelsUser: ( state, { payload } ) => {
            state.channels = payload;
        },
    }
});

export const { onSavingUser, onClearSavingUser, onLoadCategoriesUser, onLoadChannelsUser } = authSlice.actions;