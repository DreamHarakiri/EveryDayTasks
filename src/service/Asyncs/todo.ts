import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo, TListTodo } from '../slices/todo.slice';
import { createTodoData, fetchGetTodoData } from '../../utils/everydayToDo-api';

export const addTodoData = createAsyncThunk(
  'todo/addTodoData',
  async (data: TListTodo, { rejectWithValue }) => {
    try {
      const response = await createTodoData(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTodoData = createAsyncThunk(
  'todo/getTodoData',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await fetchGetTodoData(projectId);
      return response.todoList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
