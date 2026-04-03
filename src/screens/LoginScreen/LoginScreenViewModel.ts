import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  clearError,
  setError,
  setLoggedIn,
  setLoading,
} from '../../store/slices/authSlice';
import { storage } from '../../utils/storage';
import { ASYNC_STORAGE_KEYS } from '../../constants';
import logger from '../../utils/logger';
import type { LoginFormValues, StoredUser } from './LoginScreenModel';

interface UseLoginScreenViewModelReturn {
  isLoading: boolean;
  error: string | null;
  login: (values: LoginFormValues) => Promise<void>;
  clearError: () => void;
}

export const useLoginScreenViewModel = (): UseLoginScreenViewModelReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const login = useCallback(
    async ({ email, password }: LoginFormValues): Promise<void> => {
      dispatch(setLoading(true));
      try {
        const stored = await storage.getObject<StoredUser>(
          ASYNC_STORAGE_KEYS.USER,
        );

        if (!stored) {
          dispatch(setError('No account found. Please sign up first.'));
          return;
        }

        const emailMatch =
          stored.email.toLowerCase() === email.trim().toLowerCase();
        const passwordMatch = stored.password === password;

        if (!emailMatch || !passwordMatch) {
          dispatch(setError('Incorrect email or password.'));
          return;
        }

        await storage.set(ASYNC_STORAGE_KEYS.IS_LOGGED_IN, 'true');
        dispatch(setLoggedIn({ name: stored.name, email: stored.email }));
      } catch (err) {
        logger.error('login failed', err);
        dispatch(setError('Something went wrong. Please try again.'));
      }
    },
    [dispatch],
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return { isLoading, error, login, clearError: handleClearError };
};
