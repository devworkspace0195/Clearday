import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppDispatch, RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { setLoggedOut } from '../../store/slices/authSlice';
import { useTheme } from '../../context/ThemeContext';
import { storage } from '../../utils/storage';
import { ASYNC_STORAGE_KEYS } from '../../constants';
import logger from '../../utils/logger';
import type { ProfileUser } from './ProfileScreenModel';

interface UseProfileScreenViewModelReturn {
  user: ProfileUser | null;
  isDarkMode: boolean;
  isLoading: boolean;
  toggleTheme: () => void;
  logout: () => Promise<void>;
  goBack: () => void;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export const useProfileScreenViewModel = (): UseProfileScreenViewModelReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const { isDark, toggleTheme } = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const logout = useCallback(async (): Promise<void> => {
    try {
      await storage.remove(ASYNC_STORAGE_KEYS.IS_LOGGED_IN);
      dispatch(setLoggedOut());
    } catch (err) {
      logger.error('logout failed', err);
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const profileUser: ProfileUser | null = useMemo(
    () =>
      user
        ? {
            name: user.name,
            email: user.email,
          }
        : null,
    [user],
  );

  return {
    user: profileUser,
    isDarkMode: isDark,
    isLoading,
    toggleTheme,
    logout,
    goBack,
  };
};
