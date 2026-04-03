import React, { memo, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useTaskScreenViewModel } from './TaskScreenViewModel';
import { taskScreenStyles } from './TaskScreenStyles';

const TaskScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const { goBack } = useTaskScreenViewModel();

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={[taskScreenStyles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={taskScreenStyles.container} showsVerticalScrollIndicator={false}>
        <View style={taskScreenStyles.header}>
          <TouchableOpacity onPress={handleBack} style={taskScreenStyles.backButton} accessibilityRole="button" accessibilityLabel="Back to home">
            <Text style={[taskScreenStyles.backText, { color: colors.textPrimary }]}>← Home</Text>
          </TouchableOpacity>
          <Text style={[taskScreenStyles.title, { color: colors.textPrimary }]}>Tasks</Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>This is your tasks screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
});

TaskScreenView.displayName = 'TaskScreenView';

export default TaskScreenView;
