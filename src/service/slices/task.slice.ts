import { createSlice } from '@reduxjs/toolkit';
import { addTaskData, getTaskData } from '../Asyncs/task';

export type TListTask = {
  id: string;
  title: string;
  description: string;
  parent: string;
  color: string;
  date: string | null;
  checked: boolean;
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
      });
  }
});

export const { changeChecked } = taskSlice.actions;
export const { getTaskList, getLoadingTask } = taskSlice.selectors;
export const { reducer } = taskSlice;
