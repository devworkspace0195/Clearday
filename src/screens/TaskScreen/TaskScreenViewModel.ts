import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppDispatch, RootState } from '../../store/store';
import {
  addTask as addTaskAction,
  deleteTask as deleteTaskAction,
  setTasks,
  toggleTask as toggleTaskAction,
} from '../../store/slices/tasksSlice';
import { storage } from '../../utils/storage';
import { ASYNC_STORAGE_KEYS } from '../../constants';
import logger from '../../utils/logger';
import { RootStackParamList } from '../../navigation/AppNavigator';
import type { Task, TaskFilter } from './TaskScreenModel';

type TaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Task'>;

interface UseTaskScreenViewModelReturn {
  tasks: Task[];
  filteredTasks: Task[];
  searchQuery: string;
  activeFilter: TaskFilter;
  newTaskTitle: string;
  pendingImageUri: string | undefined;
  selectedDate: Date | undefined;
  showDatePicker: boolean;
  activeCount: number;
  completedCount: number;
  setSearchQuery: (q: string) => void;
  setActiveFilter: (f: TaskFilter) => void;
  setNewTaskTitle: (t: string) => void;
  addTask: () => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  pickFromGallery: () => Promise<void>;
  takePhoto: () => Promise<void>;
  removePendingImage: () => void;
  toggleDatePicker: () => void;
  clearDate: () => void;
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
  goBack: () => void;
}

export const useTaskScreenViewModel = (): UseTaskScreenViewModelReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<TaskScreenNavigationProp>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [pendingImageUri, setPendingImageUri] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load persisted tasks on mount
  useEffect(() => {
    const loadTasks = async (): Promise<void> => {
      try {
        const stored = await storage.getObject<Task[]>(ASYNC_STORAGE_KEYS.TASKS);
        if (stored && stored.length > 0) {
          dispatch(setTasks(stored));
        }
      } catch (err) {
        logger.error('loadTasks failed', err);
      }
    };
    loadTasks();
  }, [dispatch]);

  // Persist tasks whenever they change
  useEffect(() => {
    storage.setObject(ASYNC_STORAGE_KEYS.TASKS, tasks).catch(err =>
      logger.error('saveTasks failed', err),
    );
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (activeFilter === 'active') {
      result = result.filter(t => !t.completed);
    } else if (activeFilter === 'completed') {
      result = result.filter(t => t.completed);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q));
    }
    return result;
  }, [tasks, activeFilter, searchQuery]);

  const activeCount = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks],
  );

  const completedCount = useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks],
  );

  const addTask = useCallback(() => {
    const title = newTaskTitle.trim();
    if (!title) {
      return;
    }
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title,
      completed: false,
      imageUri: pendingImageUri,
      dueDate: selectedDate?.getTime(),
      createdAt: Date.now(),
    };
    dispatch(addTaskAction(newTask));
    setNewTaskTitle('');
    setPendingImageUri(undefined);
    setSelectedDate(undefined);
    setShowDatePicker(false);
  }, [newTaskTitle, pendingImageUri, selectedDate, dispatch]);

  const toggleDatePicker = useCallback(() => {
    setShowDatePicker(prev => !prev);
  }, []);

  const clearDate = useCallback(() => {
    setSelectedDate(undefined);
    setShowDatePicker(false);
  }, []);

  const onDateChange = useCallback((event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type !== 'dismissed' && date) {
      setSelectedDate(date);
    }
  }, []);

  const toggleTask = useCallback(
    (id: string) => {
      dispatch(toggleTaskAction(id));
    },
    [dispatch],
  );

  const deleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTaskAction(id));
    },
    [dispatch],
  );

  const pickFromGallery = useCallback(async (): Promise<void> => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        setPendingImageUri(uri);
      }
    } catch (err) {
      logger.error('pickFromGallery failed', err);
    }
  }, []);

  const takePhoto = useCallback(async (): Promise<void> => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: false,
      });
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        setPendingImageUri(uri);
      }
    } catch (err) {
      logger.error('takePhoto failed', err);
    }
  }, []);

  const removePendingImage = useCallback(() => {
    setPendingImageUri(undefined);
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    tasks,
    filteredTasks,
    searchQuery,
    activeFilter,
    newTaskTitle,
    pendingImageUri,
    selectedDate,
    showDatePicker,
    activeCount,
    completedCount,
    setSearchQuery,
    setActiveFilter,
    setNewTaskTitle,
    addTask,
    toggleTask,
    deleteTask,
    pickFromGallery,
    takePhoto,
    removePendingImage,
    toggleDatePicker,
    clearDate,
    onDateChange,
    goBack,
  };
};
