import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ReminderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reminder'>;

export const useReminderScreenViewModel = () => {
  const navigation = useNavigation<ReminderScreenNavigationProp>();
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return { goBack };
};
