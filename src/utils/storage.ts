import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from './logger';

export const storage = {
  set: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      logger.error('storage.set failed', error);
      throw error;
    }
  },

  get: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      logger.error('storage.get failed', error);
      throw error;
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      logger.error('storage.remove failed', error);
      throw error;
    }
  },

  setObject: async <T>(key: string, value: T): Promise<void> => {
    await storage.set(key, JSON.stringify(value));
  },

  getObject: async <T>(key: string): Promise<T | null> => {
    const raw = await storage.get(key);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
};
