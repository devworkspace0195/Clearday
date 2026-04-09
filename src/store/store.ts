import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import notesReducer from './slices/notesSlice';
import remindersReducer from './slices/remindersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    reminders: remindersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
