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
import type { SignupFormValues, StoredUser } from './SignupScreenModel';

interface UseSignupScreenViewModelReturn {
  isLoading: boolean;
  error: string | null;
  signup: (values: SignupFormValues) => Promise<void>;
  clearError: () => void;
}

export const useSignupScreenViewModel = (): UseSignupScreenViewModelReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const signup = useCallback(
    async ({
      name,
      email,
      password,
      confirmPassword,
    }: SignupFormValues): Promise<void> => {
      if (password !== confirmPassword) {
        dispatch(setError('Passwords do not match.'));
        return;
      }

      if (password.length < 6) {
        dispatch(setError('Password must be at least 6 characters.'));
        return;
      }

      dispatch(setLoading(true));
      try {
        const existing = await storage.getObject<StoredUser>(
          ASYNC_STORAGE_KEYS.USER,
        );

        if (
          existing &&
          existing.email.toLowerCase() === email.trim().toLowerCase()
        ) {
          dispatch(setError('An account with this email already exists.'));
          return;
        }

        const newUser: StoredUser = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        };

        await storage.setObject<StoredUser>(ASYNC_STORAGE_KEYS.USER, newUser);
        await storage.set(ASYNC_STORAGE_KEYS.IS_LOGGED_IN, 'true');
        dispatch(setLoggedIn({ name: newUser.name, email: newUser.email }));
      } catch (err) {
        logger.error('signup failed', err);
        dispatch(setError('Something went wrong. Please try again.'));
      }
    },
    [dispatch],
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return { isLoading, error, signup, clearError: handleClearError };
};
