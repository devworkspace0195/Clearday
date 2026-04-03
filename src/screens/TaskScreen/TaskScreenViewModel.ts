import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type TaskScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Task'>;

export const useTaskScreenViewModel = () => {
  const navigation = useNavigation<TaskScreenNavigationProp>();
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return { goBack };
};
