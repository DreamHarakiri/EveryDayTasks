import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComments } from '../slices/comments.slice';
import { addComments, getComments } from '../../utils/everydayToDo-api';

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: IComments, { rejectWithValue }) => {
    try {
      const response = await addComments(data);
      console.log(response);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getComment = createAsyncThunk(
  'comments/getComment',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await getComments(taskId);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
