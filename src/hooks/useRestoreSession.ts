import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setLoggedIn, setLoading } from '../store/slices/authSlice';
import { storage } from '../utils/storage';
import { ASYNC_STORAGE_KEYS } from '../constants';
import logger from '../utils/logger';

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
        const flag = await storage.get(ASYNC_STORAGE_KEYS.IS_LOGGED_IN);
        if (flag === 'true') {
          const user = await storage.getObject<StoredUser>(
            ASYNC_STORAGE_KEYS.USER,
          );
          if (user) {
            dispatch(setLoggedIn({ name: user.name, email: user.email }));
            return;
          }
        }
        dispatch(setLoading(false));
      } catch (err) {
        logger.error('restoreSession failed', err);
        dispatch(setLoading(false));
      }
    };

    restoreSession();
  }, [dispatch]);

  return { isLoggedIn, isLoading };
};
