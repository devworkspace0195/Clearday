import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Geolocation from 'react-native-geolocation-service';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { formatDueDate, formatTime, isToday, isTomorrow } from '../../utils/dateUtils';
import { fetchWeather, fetchForecastSlots, findSlotForTime, type ForecastSlot } from '../../utils/weatherApi';
import { STRINGS } from '../../constants';
import logger from '../../utils/logger';
import type { HomeUser, StatItem, TodayReminder, UpcomingTask, WeatherState, WeatherSuggestion } from './HomeScreenModel';

interface UseHomeScreenViewModelReturn {
  user: HomeUser | null;
  greeting: string;
  avatarInitial: string;
  stats: StatItem[];
  upcomingTasks: UpcomingTask[];
  todayReminders: TodayReminder[];
  weather: WeatherState;
  weatherSuggestions: WeatherSuggestion[];
  navigateToProfile: () => void;
  navigateToSection: (section: 'Tasks' | 'Notes' | 'Reminders') => void;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const { user } = useSelector((state: RootState) => state.auth);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const reminders = useSelector((state: RootState) => state.reminders.reminders);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [weather, setWeather] = useState<WeatherState>({ status: 'idle' });
  const [forecastSlots, setForecastSlots] = useState<ForecastSlot[]>([]);

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
      { emoji: '🎯', value: String(reminders.filter(r => !r.completed).length), label: 'Reminders' },
    ],
    [activeTaskCount, notes.length, reminders],
  );

  const upcomingTasks = useMemo(
    () =>
      tasks.reduce<UpcomingTask[]>((acc, t) => {
        if (
          !t.completed &&
          t.dueDate !== undefined &&
          (isToday(t.dueDate) || isTomorrow(t.dueDate))
        ) {
          acc.push({
            id: t.id,
            title: t.title,
            dateLabel: formatDueDate(t.dueDate),
            timeLabel: t.dueTime ? formatTime(t.dueTime) : undefined,
          });
        }
        return acc;
      }, []),
    [tasks],
  );

  const weatherSuggestions = useMemo<WeatherSuggestion[]>(() => {
    if (!forecastSlots.length) { return []; }
    return tasks.reduce<WeatherSuggestion[]>((acc, t) => {
      if (!t.completed && t.dueDate && isToday(t.dueDate) && t.dueTime) {
        const slot = findSlotForTime(forecastSlots, t.dueTime);
        if (slot) {
          acc.push({
            taskId: t.id,
            taskTitle: t.title,
            taskTimeLabel: formatTime(t.dueTime),
            weatherDescription: slot.description,
            weatherEmoji: slot.emoji,
            isRain: slot.isRain,
          });
        }
      }
      return acc;
    }, []);
  }, [tasks, forecastSlots]);

  const todayReminders = useMemo(
    () =>
      reminders.reduce<TodayReminder[]>((acc, r) => {
        if (isToday(r.dateTime)) {
          const timeLabel = new Date(r.dateTime).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          });
          acc.push({ id: r.id, title: r.title, timeLabel, completed: r.completed });
        }
        return acc;
      }, []),
    [reminders],
  );

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async (): Promise<void> => {
      setWeather({ status: 'loading' });

      const status = await Geolocation.requestAuthorization('whenInUse');

      if (status !== 'granted') {
        if (!cancelled) {
          setWeather({ status: 'error', message: STRINGS.WEATHER.LOCATION_DENIED });
          Alert.alert(STRINGS.WEATHER.LOCATION_DENIED, STRINGS.WEATHER.LOCATION_DENIED_MSG);
        }
        return;
      }

      Geolocation.getCurrentPosition(
        async position => {
          if (cancelled) { return; }
          try {
            const [data, slots] = await Promise.all([
              fetchWeather(position.coords.latitude, position.coords.longitude),
              fetchForecastSlots(position.coords.latitude, position.coords.longitude).catch(err => {
                logger.error('fetchForecastSlots failed', err);
                return [] as ForecastSlot[];
              }),
            ]);
            if (!cancelled) {
              setWeather({ status: 'success', data });
              setForecastSlots(slots);
            }
          } catch (err) {
            logger.error('fetchWeather failed', err);
            if (!cancelled) {
              setWeather({ status: 'error', message: STRINGS.WEATHER.ERROR });
            }
          }
        },
        error => {
          logger.error('Geolocation error', error);
          if (!cancelled) {
            setWeather({ status: 'error', message: STRINGS.WEATHER.ERROR });
          }
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 },
      );
    };

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, []);

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
    todayReminders,
    weather,
    weatherSuggestions,
    navigateToProfile,
    navigateToSection,
  };
};
