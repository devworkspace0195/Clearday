import React, { memo, useCallback } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useHomeScreenViewModel } from './HomeScreenViewModel';
import { homeScreenStyles } from './HomeScreenStyles';

const HomeScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const { user, greeting, avatarInitial, stats, tasksDueToday, tasksDueTomorrow, navigateToProfile, navigateToSection } =
    useHomeScreenViewModel();

  const handleProfilePress = useCallback(() => {
    navigateToProfile();
  }, [navigateToProfile]);

  return (
    <SafeAreaView
      style={[homeScreenStyles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={homeScreenStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={homeScreenStyles.header}>
          <View>
            <Text style={[homeScreenStyles.greeting, { color: colors.textSecondary }]}>
              {greeting} 👋
            </Text>
            <Text style={[homeScreenStyles.userName, { color: colors.textPrimary }]}>
              {user?.name ?? 'User'}
            </Text>
          </View>
          <TouchableOpacity
            style={[homeScreenStyles.avatarButton, { backgroundColor: colors.primary }]}
            onPress={handleProfilePress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
          >
            <Text style={[homeScreenStyles.avatarInitial, { color: colors.white }]}>
              {avatarInitial}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={homeScreenStyles.statsRow}>
          {stats.map(stat => (
            <TouchableOpacity
              key={stat.label}
              style={[homeScreenStyles.statCard, { backgroundColor: colors.surface }]}
              onPress={() => navigateToSection(stat.label as 'Tasks' | 'Notes' | 'Reminders')}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={`Open ${stat.label}`}
            >
              <Text style={homeScreenStyles.statEmoji}>{stat.emoji}</Text>
              <Text style={[homeScreenStyles.statValue, { color: colors.textPrimary }]}> 
                {stat.value}
              </Text>
              <Text style={[homeScreenStyles.statLabel, { color: colors.textSecondary }]}> 
                {stat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tasksDueToday.length > 0 ? (
          <View style={homeScreenStyles.dueTomorrowSection}>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              Due Today
            </Text>
            {tasksDueToday.map(task => (
              <View
                key={task.id}
                style={[homeScreenStyles.dueTomorrowItem, { backgroundColor: colors.surface }]}
              >
                <Text style={homeScreenStyles.dueTomorrowItemEmoji}>📅</Text>
                <Text
                  style={[homeScreenStyles.dueTomorrowItemText, { color: colors.textPrimary }]}
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {tasksDueTomorrow.length > 0 ? (
          <View style={homeScreenStyles.dueTomorrowSection}>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              Due Tomorrow
            </Text>
            {tasksDueTomorrow.map(task => (
              <View
                key={task.id}
                style={[homeScreenStyles.dueTomorrowItem, { backgroundColor: colors.surface }]}
              >
                <Text style={homeScreenStyles.dueTomorrowItemEmoji}>📅</Text>
                <Text
                  style={[homeScreenStyles.dueTomorrowItemText, { color: colors.textPrimary }]}
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {tasksDueToday.length === 0 && tasksDueTomorrow.length === 0 ? (
          <>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              Today's overview
            </Text>
            <View style={[homeScreenStyles.welcomeCard, { backgroundColor: colors.primary }]}>
              <Text style={[homeScreenStyles.welcomeTitle, { color: colors.white }]}>
                You're all set! ☀️
              </Text>
              <Text style={[homeScreenStyles.welcomeSubtitle, { color: `${colors.white}CC` }]}>
                There is nothing due today. Take a moment to relax or plan for tomorrow. You've got this! 💪
              </Text>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
});

HomeScreenView.displayName = 'HomeScreenView';

export default HomeScreenView;
