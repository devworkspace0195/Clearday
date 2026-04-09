import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setLoggedIn, setLoading } from '../store/slices/authSlice';
import { setTasks } from '../store/slices/tasksSlice';
import { setNotes } from '../store/slices/notesSlice';
import { setReminders } from '../store/slices/remindersSlice';
import { storage } from '../utils/storage';
import { ASYNC_STORAGE_KEYS } from '../constants';
import logger from '../utils/logger';
import type { Task } from '../screens/TaskScreen/TaskScreenModel';
import type { Note } from '../screens/NoteScreen/NoteScreenModel';
import type { Reminder } from '../screens/ReminderScreen/ReminderScreenModel';

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

interface UseRestoreSessionReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const useRestoreSession = (): UseRestoreSessionReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const restoreSession = async (): Promise<void> => {
      try {
        // Restore auth
        const flag = await storage.get(ASYNC_STORAGE_KEYS.IS_LOGGED_IN);
        if (flag === 'true') {
          const user = await storage.getObject<StoredUser>(ASYNC_STORAGE_KEYS.USER);
          if (user) {
            dispatch(setLoggedIn({ name: user.name, email: user.email }));
          } else {
            dispatch(setLoading(false));
          }
        } else {
          dispatch(setLoading(false));
        }

        // Restore tasks
        const storedTasks = await storage.getObject<Task[]>(ASYNC_STORAGE_KEYS.TASKS);
        if (storedTasks && storedTasks.length > 0) {
          dispatch(setTasks(storedTasks));
        }

        // Restore notes
        const storedNotes = await storage.getObject<Note[]>(ASYNC_STORAGE_KEYS.NOTES);
        if (storedNotes && storedNotes.length > 0) {
          dispatch(setNotes(storedNotes));
        }

        // Restore reminders
        const storedReminders = await storage.getObject<Reminder[]>(ASYNC_STORAGE_KEYS.REMINDERS);
        if (storedReminders && storedReminders.length > 0) {
          dispatch(setReminders(storedReminders));
        }
      } catch (err) {
        logger.error('restoreSession failed', err);
        dispatch(setLoading(false));
      }
    };

    restoreSession();
  }, [dispatch]);

  return { isLoggedIn, isLoading };
};
