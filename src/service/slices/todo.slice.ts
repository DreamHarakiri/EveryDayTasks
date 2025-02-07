import { createSlice, nanoid } from '@reduxjs/toolkit';
import { addTodoData, getTodoData } from '../Asyncs/todo';
import { checkTaskUser } from '../Asyncs/task';

export type TListTodo = {
  id: string;
  title: string;
  parent: string;
  checked: boolean;
  created: string;
};

export interface ITodo {
  todo: TListTodo[];
  isLoading: boolean;
}

const initialState: ITodo = {
  todo: [],
  isLoading: false
};

export const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    removeTodo: (state) => {
      state.todo = [];
    }
  },
  selectors: {
    getTodoList: (state) => state.todo
  },
  extraReducers(builder) {
    builder
      .addCase(addTodoData.pending, (state, action) => {
        //console.log('Добавление туду пендинг');
      })

      .addCase(addTodoData.fulfilled, (state, action) => {
        state.todo.push(action.meta.arg);
      })
      .addCase(getTodoData.pending, (state, action) => {
        //console.log('pending');
      })
      .addCase(getTodoData.fulfilled, (state, action) => {
        //console.log(action.payload);

        const listTodos = (action.payload as TListTodo[]).filter(
          (newListTodo) =>
            !state.todo.some((todoList) => todoList.id === newListTodo.id)
        );
        state.todo = [...state.todo, ...listTodos];
      });
  }
});

export const { reducer } = todoSlice;
export const { removeTodo } = todoSlice.actions;
export const { getTodoList } = todoSlice.selectors;
