import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as TodoReducer } from './slices/todo.slice';
import { reducer as ProjectReducer } from './slices/project.slice';
import { reducer as UserReducer } from './slices/user.slice';
import { reducer as TaskReducer } from './slices/task.slice';
import { reducer as CommentsReducer } from './slices/comments.slice';

export const rootReducer = combineReducers({
  todoList: TodoReducer,
  projectList: ProjectReducer,
  user: UserReducer,
  taskList: TaskReducer,
  commentsList: CommentsReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
