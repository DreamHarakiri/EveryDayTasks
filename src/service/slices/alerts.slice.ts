import { createSlice } from '@reduxjs/toolkit';

export type TAlert = {
  id: number;
  type: 'success' | 'warning' | 'neutrall';
  header: string;
  text: string;
  time: number;
  isVisible: boolean | false;
};

export type TAlertState = {
  alert: TAlert[];
};

export const initialState: TAlertState = {
  alert: []
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alert.push(action.payload);
    },
    hideAlert: (state, action) => {
      const alert = state.alert.find((a) => a.id === action.payload);
      if (alert) {
        alert.isVisible = false;
      }
    }
  }
});

export const { reducer } = alertSlice;
export const { addAlert, hideAlert } = alertSlice.actions;

export const getAlerts = (state: { alertList: TAlertState }) =>
  state.alertList.alert;
