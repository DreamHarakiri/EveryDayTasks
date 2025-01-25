import { createAsyncThunk } from '@reduxjs/toolkit';
import { TListTask } from '../slices/task.slice';
import {
  createTask,
  getTaskList,
  setChecked
} from '../../utils/everydayToDo-api';

export interface ICheckedTask {
  id: string;
  checked: boolean | undefined;
}

export const addTaskData = createAsyncThunk(
  'task/addTaskData',
  async (data: TListTask, { rejectWithValue }) => {
    try {
      const response = await createTask(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTaskData = createAsyncThunk(
  'todo/getTaskData',
  async (todoId: string, { rejectWithValue }) => {
    try {
      const response = await getTaskList(todoId);
      return response.taskList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkedTaskData = createAsyncThunk(
  'todo/checkedTaskData',
  async (data: ICheckedTask, { rejectWithValue }) => {
    try {
      const response = await setChecked(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
