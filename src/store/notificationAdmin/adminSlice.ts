import { createSlice } from '@reduxjs/toolkit';
import { AdminReportInterface } from '../../interfaces/interfaces';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        // isSaving: false,
        users: [] as AdminReportInterface[],
        adminFormStatus: false,
    },
    reducers: {
        // onSavingAdmin: ( state ) => {
        //     state.isSaving = true;
        // },
        // onClearSavingAdmin: ( state ) => {
        //     state.isSaving = false;
        // },
        onLoadUsers: (state, { payload } ) => {
            state.users = payload ;
        },
        onEnableAdminForm: ( state ) => {
            state.adminFormStatus = true
        },
        onDisableAdminForm: ( state ) => {
            state.adminFormStatus = false
        }
    }
});

export const { onLoadUsers, onEnableAdminForm, onDisableAdminForm } = adminSlice.actions;