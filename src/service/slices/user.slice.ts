import { createSlice } from '@reduxjs/toolkit';
import { getLoginData, getUser } from '../Asyncs/login';
import { getRegisterData } from '../Asyncs/register';

export type TUser = {
  id?: string;
  email: string;
  name: string;
  status: string;
};

export type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  isLoginLoading: boolean;
  isLoginError: string;
  isRegisterLoading: boolean;
  isRegisterError: string;
};

export const initialState: TUserState = {
  user: null,
  isAuth: false,
  isLoginLoading: false,
  isLoginError: '',
  isRegisterLoading: false,
  isRegisterError: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuth = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginData.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(getLoginData.rejected, (state, action) => {
        state.isLoginLoading = false;
        try {
          const payload =
            typeof action.payload === 'object'
              ? action.payload
              : JSON.parse(JSON.stringify(action.payload));
          state.isLoginError = payload.message;
        } catch (e) {
          state.isLoginError = 'Parsing error: invalid JSON';
        }
      })
      .addCase(getLoginData.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(getRegisterData.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(getRegisterData.rejected, (state, action) => {
        state.isRegisterLoading = false;
        try {
          const payload =
            typeof action.payload === 'object'
              ? action.payload
              : JSON.parse(JSON.stringify(action.payload));
          state.isRegisterError = payload.message;
        } catch (e) {
          state.isRegisterError = 'Parsing error: invalid JSON';
        }
      })
      .addCase(getRegisterData.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        console.log(action);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
  selectors: {
    getRegisterLoading: (state) => state.isRegisterLoading,
    getLoginLoading: (state) => state.isLoginLoading,
    getAuthUser: (state) => state.isAuth,
    getUserData: (state) => state.user,
    getUserEmail: (state) => state.user?.email,
    getUserID: (state) => state.user?.id
  }
});

export const { reducer } = userSlice;
export const { authChecked } = userSlice.actions;
export const {
  getRegisterLoading,
  getLoginLoading,
  getAuthUser,
  getUserData,
  getUserEmail,
  getUserID
} = userSlice.selectors;
