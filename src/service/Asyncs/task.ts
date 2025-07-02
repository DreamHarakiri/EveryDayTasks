import { createAsyncThunk } from '@reduxjs/toolkit';
import { TListTask } from '../slices/task.slice';
import {
  checkTaskPermission,
  createTask,
  editTaskData,
  getTaskList,
  setChecked
} from '../../utils/everydayToDo-api';
import { showAlert } from '../../utils/alerts';

export interface ICheckedTask {
  id: string;
  checked: boolean | undefined;
}

export const addTaskData = createAsyncThunk(
  'task/addTaskData',
  async (data: TListTask, { rejectWithValue }) => {
    try {
      const response = await createTask(data);
      console.log('i job');

      showAlert('success', 'Задача была добавлена', 5);

      return response;
    } catch (error) {
      console.log(error);

      showAlert(
        'error',
        'Произошла ошибка, попробуйте создать задачу заново',
        5
      );
      console.log('i job');

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
      console.log(data);

      // return rejectWithValue(error);
    }
  }
);

interface ICheckUserTask {
  user: string;
  task: string;
  project: string;
}

export const checkTaskUser = createAsyncThunk(
  'task/checkedTaskData',
  async (data: ICheckUserTask, { rejectWithValue }) => {
    try {
      const response = await checkTaskPermission(data);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editTaskContent = createAsyncThunk(
  'task/editTaskData',
  async (
    data: {
      id: string | undefined;
      title: string | undefined;
      description: string | undefined;
      tags: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await editTaskData(data);
      console.log('Ошибки нет, данные:', response);
      showAlert('success', 'Задача успешно обновлена', 5);

      return response; // Здесь обязательно нужно возвращать результат
    } catch (error) {
      console.log('Ошибка:', error);
      showAlert('error', 'Произошла ошибка, задача не была отредактирована', 5);

      return rejectWithValue(error || 'Неизвестная ошибка');
    }
  }
);
