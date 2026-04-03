import React, { memo, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNoteScreenViewModel } from './NoteScreenViewModel';
import { noteScreenStyles } from './NoteScreenStyles';

const NoteScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const { goBack } = useNoteScreenViewModel();

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={[noteScreenStyles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={noteScreenStyles.container} showsVerticalScrollIndicator={false}>
        <View style={noteScreenStyles.header}>
          <TouchableOpacity onPress={handleBack} style={noteScreenStyles.backButton} accessibilityRole="button" accessibilityLabel="Back to home">
            <Text style={[noteScreenStyles.backText, { color: colors.textPrimary }]}>← Home</Text>
          </TouchableOpacity>
          <Text style={[noteScreenStyles.title, { color: colors.textPrimary }]}>Notes</Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>This is your notes screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
});

NoteScreenView.displayName = 'NoteScreenView';

export default NoteScreenView;
