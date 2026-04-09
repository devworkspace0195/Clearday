import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { addReminder, deleteReminder, setReminders, toggleReminder } from '../../store/slices/remindersSlice';
import {
  cancelReminderNotification,
  requestNotificationPermission,
  scheduleReminderNotification,
} from '../../utils/reminderNotifications';
import { ASYNC_STORAGE_KEYS, STRINGS } from '../../constants';
import { storage } from '../../utils/storage';
import logger from '../../utils/logger';
import type { Reminder } from './ReminderScreenModel';

type ReminderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reminder'>;

interface ComposeState {
  isOpen: boolean;
  titleDraft: string;
  dateDraft: Date;
  showDatePicker: boolean;
  showTimePicker: boolean;
}

const nextHour = (): Date => {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  return d;
};

interface UseReminderScreenViewModelReturn {
  reminders: Reminder[];
  filteredReminders: Reminder[];
  searchQuery: string;
  reminderCount: number;
  compose: ComposeState;
  setSearchQuery: (q: string) => void;
  openCompose: () => void;
  closeCompose: () => void;
  setTitleDraft: (text: string) => void;
  setDateDraft: (updater: Date | ((prev: Date) => Date)) => void;
  openDatePicker: () => void;
  openTimePicker: () => void;
  closePickers: () => void;
  saveReminder: () => void;
  removeReminder: (id: string) => void;
  completeReminder: (id: string) => void;
  goBack: () => void;
}

export const useReminderScreenViewModel = (): UseReminderScreenViewModelReturn => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ReminderScreenNavigationProp>();
  const reminders = useSelector((state: RootState) => state.reminders.reminders);

  const [searchQuery, setSearchQuery] = useState('');
  const [compose, setCompose] = useState<ComposeState>({
    isOpen: false,
    titleDraft: '',
    dateDraft: nextHour(),
    showDatePicker: false,
    showTimePicker: false,
  });

  // Load persisted reminders on mount
  useEffect(() => {
    storage.getObject<Reminder[]>(ASYNC_STORAGE_KEYS.REMINDERS)
      .then(stored => {
        if (stored && stored.length > 0) { dispatch(setReminders(stored)); }
      })
      .catch(err => logger.error('loadReminders failed', err));
  }, [dispatch]);

  // Persist reminders on every change
  useEffect(() => {
    storage.setObject(ASYNC_STORAGE_KEYS.REMINDERS, reminders)
      .catch(err => logger.error('saveReminders failed', err));
  }, [reminders]);

  const filteredReminders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { return reminders; }
    return reminders.filter(r => r.title.toLowerCase().includes(q));
  }, [reminders, searchQuery]);

  const reminderCount = useMemo(() => reminders.length, [reminders]);

  const openCompose = useCallback(() => {
    setCompose({
      isOpen: true,
      titleDraft: '',
      dateDraft: nextHour(),
      showDatePicker: false,
      showTimePicker: false,
    });
  }, []);

  const closeCompose = useCallback(() => {
    setCompose(prev => ({
      ...prev,
      isOpen: false,
      showDatePicker: false,
      showTimePicker: false,
    }));
  }, []);

  const setTitleDraft = useCallback((text: string) => {
    setCompose(prev => ({ ...prev, titleDraft: text }));
  }, []);

  const setDateDraft = useCallback((updater: Date | ((prev: Date) => Date)) => {
    setCompose(prev => ({
      ...prev,
      dateDraft: typeof updater === 'function' ? updater(prev.dateDraft) : updater,
    }));
  }, []);

  const openDatePicker = useCallback(() => {
    setCompose(prev => ({ ...prev, showDatePicker: true, showTimePicker: false }));
  }, []);

  const openTimePicker = useCallback(() => {
    setCompose(prev => ({ ...prev, showTimePicker: true, showDatePicker: false }));
  }, []);

  const closePickers = useCallback(() => {
    setCompose(prev => ({ ...prev, showDatePicker: false, showTimePicker: false }));
  }, []);

  const saveReminder = useCallback(async () => {
    if (!compose.titleDraft.trim()) { return; }

    const reminderTime = compose.dateDraft.getTime();
    if (reminderTime <= Date.now()) {
      Alert.alert('Invalid time', 'Please choose a future date and time.');
      return;
    }

    const granted = await requestNotificationPermission();
    if (!granted) {
      Alert.alert(
        STRINGS.REMINDER.PERMISSION_DENIED_TITLE,
        STRINGS.REMINDER.PERMISSION_DENIED_MSG,
      );
      return;
    }

    const id = `reminder_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    try {
      const notificationId = await scheduleReminderNotification(
        id,
        compose.titleDraft.trim(),
        reminderTime,
      );

      const newReminder: Reminder = {
        id,
        title: compose.titleDraft.trim(),
        dateTime: reminderTime,
        notificationId,
        completed: false,
        createdAt: Date.now(),
      };

      dispatch(addReminder(newReminder));
      closeCompose();
    } catch (err) {
      logger.error('scheduleReminderNotification failed', err);
      Alert.alert('Error', 'Could not schedule the reminder. Please try again.');
    }
  }, [compose, dispatch, closeCompose]);

  const removeReminder = useCallback(
    async (id: string) => {
      const reminder = reminders.find(r => r.id === id);
      if (reminder) {
        try {
          await cancelReminderNotification(reminder.notificationId);
        } catch (err) {
          logger.error('cancelReminderNotification failed', err);
        }
      }
      dispatch(deleteReminder(id));
    },
    [reminders, dispatch],
  );

  const completeReminder = useCallback(
    async (id: string) => {
      const reminder = reminders.find(r => r.id === id);
      if (reminder && !reminder.completed) {
        try {
          await cancelReminderNotification(reminder.notificationId);
        } catch (err) {
          logger.error('cancelReminderNotification on complete failed', err);
        }
      }
      dispatch(toggleReminder(id));
    },
    [reminders, dispatch],
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    reminders,
    filteredReminders,
    searchQuery,
    reminderCount,
    compose,
    setSearchQuery,
    openCompose,
    closeCompose,
    setTitleDraft,
    setDateDraft,
    openDatePicker,
    openTimePicker,
    closePickers,
    saveReminder,
    removeReminder,
    completeReminder,
    goBack,
  };
};
