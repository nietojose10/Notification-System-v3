import { createSlice } from '@reduxjs/toolkit';
import { LogHistory, MessageType } from '../../interfaces/interfaces';
export const broadcastMessageSlice = createSlice({
    name: 'broadcastMessage',
    initialState: {
        isSaving: false,
        logHistory: [] as LogHistory[],
        categories: [] as MessageType[]
    },
    reducers: {
        onSavingNotification: ( state ) => {
            state.isSaving = true;
        },
        onLoadCategories: ( state, { payload }) => {
            state.categories = payload;
        },
        onAddMessage: ( state, { payload } ) => {
            state.logHistory.push( ...payload );
        },
        onLoadLogHistory: ( state, { payload }) => {
            payload.map( (message: LogHistory) => {
                const exists = state.logHistory.some( dbMessage => dbMessage.id === message.id );
                if( !exists ) state.logHistory.push( message );
            });
        },
        onClearSaving: ( state ) => {
            state.isSaving = false;
        },
    }
});
export const { onSavingNotification, onLoadCategories, onLoadLogHistory, onClearSaving, onAddMessage } = broadcastMessageSlice.actions;