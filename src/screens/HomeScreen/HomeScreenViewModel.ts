import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppDispatch, RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import type { HomeUser, StatItem } from './HomeScreenModel';

interface UseHomeScreenViewModelReturn {
  user: HomeUser | null;
  greeting: string;
  avatarInitial: string;
  stats: StatItem[];
  navigateToProfile: () => void;
}

const STATS: StatItem[] = [
  { emoji: '✅', value: '0', label: 'Tasks' },
  { emoji: '📝', value: '0', label: 'Notes' },
  { emoji: '🎯', value: '0', label: 'Goals' },
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return { user, greeting, avatarInitial, stats: STATS, navigateToProfile };
};
