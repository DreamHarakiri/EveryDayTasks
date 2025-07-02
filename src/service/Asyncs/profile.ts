import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../slices/user.slice';
import { profileLoad } from '../../utils/everydayToDo-api';
import { showAlert } from '../../utils/alerts';

export const getProfileData = createAsyncThunk(
  'profile/getProfileData',
  async (data: { userId: string | number }, { rejectWithValue }) => {
    try {
      const response = await profileLoad(data);
      return response;
    } catch (error) {
      showAlert(
        'error',
        'Этого аккаунта не существует либо проблемы на стороне сервера',
        5
      );
    }
  }
);

// #TODO: Дописать запрос профиля, апи написано
