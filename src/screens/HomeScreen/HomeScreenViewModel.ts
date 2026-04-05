import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { formatDueDate, isToday, isTomorrow } from '../../utils/dateUtils';
import type { HomeUser, StatItem, UpcomingTask } from './HomeScreenModel';


interface UseHomeScreenViewModelReturn {
  user: HomeUser | null;
  greeting: string;
  avatarInitial: string;
  stats: StatItem[];
  upcomingTasks: UpcomingTask[];
  navigateToProfile: () => void;
  navigateToSection: (section: 'Tasks' | 'Notes' | 'Reminders') => void;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const { user } = useSelector((state: RootState) => state.auth);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const notes = useSelector((state: RootState) => state.notes.notes);
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
      { emoji: '📝', value: String(notes.length), label: 'Notes' },
      { emoji: '🎯', value: '0', label: 'Reminders' },
    ],
    [activeTaskCount, notes.length],
  );

  const upcomingTasks = useMemo(
    () => tasks.reduce<UpcomingTask[]>((acc, t) => {
      if (
        !t.completed &&
        t.dueDate !== undefined &&
        (isToday(t.dueDate) || isTomorrow(t.dueDate))
      ) {
        acc.push({ id: t.id, title: t.title, dateLabel: formatDueDate(t.dueDate) });
      }
      return acc;
    }, []),
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
    upcomingTasks,
    navigateToProfile,
    navigateToSection,
  };
};
