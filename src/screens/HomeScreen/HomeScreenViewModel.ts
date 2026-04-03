import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setLoggedOut } from '../../store/slices/authSlice';
import { storage } from '../../utils/storage';
import { ASYNC_STORAGE_KEYS } from '../../constants';
import logger from '../../utils/logger';
import type { HomeUser, StatItem } from './HomeScreenModel';

interface UseHomeScreenViewModelReturn {
  user: HomeUser | null;
  greeting: string;
  avatarInitial: string;
  stats: StatItem[];
  isLoading: boolean;
  logout: () => Promise<void>;
}

const STATS: StatItem[] = [
  { emoji: '✅', value: '0', label: 'Tasks' },
  { emoji: '📝', value: '0', label: 'Notes' },
  { emoji: '🎯', value: '0', label: 'Goals' },
];

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) { return 'Good morning'; }
    if (hour < 17) { return 'Good afternoon'; }
    return 'Good evening';
  }, []);

  const avatarInitial = useMemo(
    () => (user?.name ? user.name.charAt(0).toUpperCase() : '?'),
    [user],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await storage.remove(ASYNC_STORAGE_KEYS.IS_LOGGED_IN);
      dispatch(setLoggedOut());
    } catch (err) {
      logger.error('logout failed', err);
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  return { user, greeting, avatarInitial, stats: STATS, isLoading, logout };
};
