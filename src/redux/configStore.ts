import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducer/projectReducer';
import accountReducer from './reducer/accountReducer';
import userReducer from './reducer/userReducer';
import taskReducer from './reducer/taskReducer';
export const store = configureStore({
   reducer: {
      projectReducer,
      accountReducer,
      userReducer,
      taskReducer
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
