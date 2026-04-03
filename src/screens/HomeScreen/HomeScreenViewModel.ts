import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { isToday, isTomorrow } from '../../utils/dateUtils';
import type { Task } from '../TaskScreen/TaskScreenModel';
import type { HomeUser, StatItem } from './HomeScreenModel';

interface UseHomeScreenViewModelReturn {
  user: HomeUser | null;
  greeting: string;
  avatarInitial: string;
  stats: StatItem[];
  tasksDueToday: Task[];
  tasksDueTomorrow: Task[];
  navigateToProfile: () => void;
  navigateToSection: (section: 'Tasks' | 'Notes' | 'Reminders') => void;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const { user } = useSelector((state: RootState) => state.auth);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
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

  const activeTaskCount = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks],
  );

  const stats = useMemo<StatItem[]>(
    () => [
      { emoji: '✅', value: String(activeTaskCount), label: 'Tasks' },
      { emoji: '📝', value: '0', label: 'Notes' },
      { emoji: '🎯', value: '0', label: 'Reminders' },
    ],
    [activeTaskCount],
  );

  const tasksDueToday = useMemo(
    () => tasks.filter(t => !t.completed && t.dueDate !== undefined && isToday(t.dueDate)),
    [tasks],
  );

  const tasksDueTomorrow = useMemo(
    () => tasks.filter(t => !t.completed && t.dueDate !== undefined && isTomorrow(t.dueDate)),
    [tasks],
  );

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToSection = useCallback(
    (section: 'Tasks' | 'Notes' | 'Reminders') => {
      if (section === 'Tasks') {
        navigation.navigate('Task');
      } else if (section === 'Notes') {
        navigation.navigate('Note');
      } else {
        navigation.navigate('Reminder');
      }
    },
    [navigation],
  );

  return {
    user,
    greeting,
    avatarInitial,
    stats,
    tasksDueToday,
    tasksDueTomorrow,
    navigateToProfile,
    navigateToSection,
  };
};
