import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  TLoginData
} from '../../utils/everydayToDo-api';
import { authChecked, getAuthUser } from '../slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const getLoginData = createAsyncThunk(
  'login/getLoginData',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkUserData = createAsyncThunk(
  'user/checkUserData',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);
