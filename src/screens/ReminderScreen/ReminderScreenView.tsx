import React, { memo, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useReminderScreenViewModel } from './ReminderScreenViewModel';
import { reminderScreenStyles } from './ReminderScreenStyles';

const ReminderScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const { goBack } = useReminderScreenViewModel();

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={[reminderScreenStyles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={reminderScreenStyles.container} showsVerticalScrollIndicator={false}>
        <View style={reminderScreenStyles.header}>
          <TouchableOpacity onPress={handleBack} style={reminderScreenStyles.backButton} accessibilityRole="button" accessibilityLabel="Back to home">
            <Text style={[reminderScreenStyles.backText, { color: colors.textPrimary }]}>← Home</Text>
          </TouchableOpacity>
          <Text style={[reminderScreenStyles.title, { color: colors.textPrimary }]}>Reminders</Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>This is your reminders screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
});

ReminderScreenView.displayName = 'ReminderScreenView';

export default ReminderScreenView;
