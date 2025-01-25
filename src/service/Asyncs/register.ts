import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const getRegisterData = createAsyncThunk(
  'auth/registerUser',
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await fetch(
        'http://192.168.0.11:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result;
    } catch (error) {
      console.error('Error during fetch:', error);
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
