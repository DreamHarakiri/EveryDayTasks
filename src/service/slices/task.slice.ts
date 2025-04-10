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
        console.log('i job it');

        const updateData = action.payload;
        
        // Проверка входных данных
        console.log("Обновляемые данные (updateData):", updateData);
        if (!updateData || !updateData.id || !updateData.title || !updateData.description || !Array.isArray(updateData.tags)) {
            console.error("Некорректные данные в payload:", updateData);
            return;
        }
    
        // Лог текущего состояния задач
        console.log("Состояние задач до обновления:", state.task);
    
        // Убедимся, что task массив
        if (!Array.isArray(state.task)) {
            console.error("Ошибка: state.task не является массивом.");
            return;
        }
    
        // Обновление задач
        state.task = state.task.map((item) =>
            item.id === updateData.id
                ? {
                    ...item,
                    title: updateData.title,
                    description: updateData.description,
                    tags: updateData.tags
                }
                : item
        );
    
        // Лог результата
        console.log("Состояние задач после обновления:", state.task);
    
        // Проверка, обновился ли элемент
        const updatedItem = state.task.find(item => item.id === updateData.id);
        if (!updatedItem) {
            console.error("Ошибка: задача с id", updateData.id, "не была найдена.");
        } else {
            console.log("Успешно обновленная задача:", updatedItem);
        }
    });
    
  }
});

export const { changeChecked, clearStoreTask } = taskSlice.actions;
export const { getTaskList, getLoadingTask } = taskSlice.selectors;
export const { reducer } = taskSlice;
