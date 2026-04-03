import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Note'>;

export const useNoteScreenViewModel = () => {
  const navigation = useNavigation<NoteScreenNavigationProp>();
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return { goBack };
};
