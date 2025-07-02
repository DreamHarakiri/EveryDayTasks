import { createSlice } from '@reduxjs/toolkit';
import {
  addTaskData,
  checkTaskUser,
  editTaskContent,
  getTaskData
} from '../Asyncs/task';

export type TListTask = {
  id: string;
  title: string;
  description: string;
  parent: string;
  color: string | undefined;
  date: string | null;
  checked: boolean;
  tags: string[] | undefined;
};

export interface ITask {
  task: TListTask[];
  loading: boolean;
}

const initialState: ITask = {
  task: [],
  loading: false
};

export const taskSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    changeChecked: (state, { payload: { id } }) => {
      const task = state.task.find((item) => item.id === id);
      console.log(state.task);

      if (task) {
        task.checked = !task.checked;
      }
    },
    clearStoreTask: (state) => {
      state.task = [];
    }
  },
  selectors: {
    getTaskList: (state) => state.task,
    getLoadingTask: (state) => state.loading
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskData.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTaskData.fulfilled, (state, action) => {
        //получение листа

        const listTask = (action.payload as TListTask[]).filter(
          (newTaskTodo) =>
            !state.task.some((todoList) => todoList.id === newTaskTodo.id)
        );

        state.task = [...state.task, ...listTask];

        state.loading = false;
      })

      .addCase(addTaskData.pending, (state, action) => {
        //pending
      })
      .addCase(addTaskData.fulfilled, (state, action) => {
        state.task.push(action.meta.arg);
      })
      .addCase(checkTaskUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkTaskUser.fulfilled, (state, action) => {
        console.log(action.payload);

        state.task.push(...action.payload);
        state.loading = false;
      })

      .addCase(editTaskContent.pending, (state) => {
        console.log('edit task loading');
      })
      .addCase(editTaskContent.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(editTaskContent.fulfilled, (state, action) => {
        state.task = state.task.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                title: action.payload.title,
                description: action.payload.description,
                tags: action.payload.tags
              }
            : item
        );
      });
  }
});

export const { changeChecked, clearStoreTask } = taskSlice.actions;
export const { getTaskList, getLoadingTask } = taskSlice.selectors;
export const { reducer } = taskSlice;
